import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { ModuleCard } from './components/ModuleCard';
import { TopicViewer } from './components/TopicViewer';
import { LoginModal } from './components/Login';
import { COURSE_MODULES } from './constants';
import { Module, Topic, UserProgress } from './types';
import { auth, googleProvider, db } from './firebaseConfig';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  arrayUnion 
} from 'firebase/firestore';

// Simple router state
type ViewState = 
  | { type: 'DASHBOARD' }
  | { type: 'MODULE'; module: Module }
  | { type: 'TOPIC'; module: Module; topic: Topic };

function App() {
  const [user, setUser] = useState<UserProgress | null>(null);
  const [viewState, setViewState] = useState<ViewState>({ type: 'DASHBOARD' });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingCompletedTopicId, setPendingCompletedTopicId] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  // Monitor Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch user progress from Firestore
        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        let completedTopics: string[] = [];
        
        if (userSnap.exists()) {
          // User exists in DB, load data
          completedTopics = userSnap.data().completedTopics || [];
        } else {
          // New user, create record in DB
          await setDoc(userRef, {
            email: firebaseUser.email,
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0],
            completedTopics: []
          });
        }
        
        setUser({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Estudiante',
          email: firebaseUser.email,
          completedTopics: completedTopics
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Save progress to Firestore
  const saveProgressToFirestore = async (uid: string, topicId: string) => {
    try {
      const userRef = doc(db, "users", uid);
      
      // Use arrayUnion to add only unique values atomically
      await updateDoc(userRef, {
        completedTopics: arrayUnion(topicId)
      });

      // Update local state locally to reflect immediate change
      setUser(prev => {
        if (!prev) return null;
        if (prev.completedTopics.includes(topicId)) return prev;
        return {
          ...prev,
          completedTopics: [...prev.completedTopics, topicId]
        };
      });

    } catch (error) {
      console.error("Error updating progress in Firestore:", error);
    }
  };

  const processPendingCompletion = (uid: string) => {
    if (pendingCompletedTopicId) {
      saveProgressToFirestore(uid, pendingCompletedTopicId);
      setPendingCompletedTopicId(null);
    }
  };

  const handleGoogleLogin = async () => {
    setAuthError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setShowLoginModal(false);
      processPendingCompletion(result.user.uid);
    } catch (error: any) {
      console.error("Google Login failed", error);
      setAuthError("Error al iniciar sesión con Google. Intenta nuevamente.");
    }
  };

  const handleEmailLogin = async (email: string, pass: string, isRegister: boolean) => {
    setAuthError(null);
    try {
      let result;
      if (isRegister) {
        result = await createUserWithEmailAndPassword(auth, email, pass);
      } else {
        result = await signInWithEmailAndPassword(auth, email, pass);
      }
      setShowLoginModal(false);
      processPendingCompletion(result.user.uid);
    } catch (error: any) {
      console.error("Email Login failed", error);
      if (error.code === 'auth/email-already-in-use') {
        setAuthError("Este correo ya está registrado.");
      } else if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        setAuthError("Correo o contraseña incorrectos.");
      } else if (error.code === 'auth/weak-password') {
        setAuthError("La contraseña debe tener al menos 6 caracteres.");
      } else {
        setAuthError("Ocurrió un error. Verifica tus datos.");
      }
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setViewState({ type: 'DASHBOARD' });
  };

  const handleTopicCompletion = (topicId: string) => {
    if (user) {
      saveProgressToFirestore(user.uid, topicId);
      // Return to module view after completion
      if (viewState.type === 'TOPIC') {
        setViewState({ type: 'MODULE', module: viewState.module });
      }
    } else {
      // Prompt for login if user completes a topic but isn't logged in
      setPendingCompletedTopicId(topicId);
      setShowLoginModal(true);
    }
  };

  const navigateToModule = (module: Module) => {
    setViewState({ type: 'MODULE', module });
  };

  const navigateToTopic = (module: Module, topic: Topic) => {
    setViewState({ type: 'TOPIC', module, topic });
  };

  const handleSidebarNavigation = (module: Module, topicId: string) => {
    const topic = module.topics.find(t => t.id === topicId);
    if (topic) {
      setViewState({ type: 'TOPIC', module, topic });
    }
  };

  const goBack = () => {
    if (viewState.type === 'TOPIC') {
      setViewState({ type: 'MODULE', module: viewState.module });
    } else if (viewState.type === 'MODULE') {
      setViewState({ type: 'DASHBOARD' });
    }
  };

  const renderContent = () => {
    switch (viewState.type) {
      case 'DASHBOARD':
        return (
          <Layout 
            user={user}
            onLogout={handleLogout}
            onLoginClick={() => setShowLoginModal(true)}
            title="Módulos de Aprendizaje" 
            subtitle="Selecciona un módulo para comenzar tu ruta de aprendizaje."
            onNavigateToTopic={handleSidebarNavigation}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {COURSE_MODULES.map(module => (
                <ModuleCard 
                  key={module.id} 
                  module={module} 
                  onClick={() => navigateToModule(module)} 
                />
              ))}
            </div>
          </Layout>
        );

      case 'MODULE':
        return (
          <Layout 
            user={user}
            onLogout={handleLogout}
            onLoginClick={() => setShowLoginModal(true)}
            title={viewState.module.title}
            subtitle="Explora los temas de este módulo."
            onBack={goBack}
            onNavigateToTopic={handleSidebarNavigation}
          >
            <div className="space-y-4 max-w-4xl mx-auto">
              {viewState.module.topics.map((topic) => {
                const isCompleted = user?.completedTopics.includes(topic.id);
                return (
                  <div 
                    key={topic.id}
                    onClick={() => navigateToTopic(viewState.module, topic)}
                    className="group flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 cursor-pointer transition-all duration-300 relative overflow-hidden"
                  >
                     {/* Progress bar background for completed items */}
                    {isCompleted && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500"></div>
                    )}

                    <div className="flex items-center gap-6">
                      <div className={`w-12 h-12 flex items-center justify-center rounded-xl text-lg font-bold border ${isCompleted ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                        {isCompleted ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        ) : (
                          topic.id
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-medium text-slate-200 group-hover:text-white transition-colors">
                          {topic.title}
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                          {isCompleted ? 'Completado' : 'Pendiente'}
                        </p>
                      </div>
                    </div>
                    <div className="text-slate-600 group-hover:text-cyan-400 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </div>
                  </div>
                );
              })}
            </div>
          </Layout>
        );

      case 'TOPIC':
        return (
          <Layout 
            user={user}
            onLogout={handleLogout}
            onLoginClick={() => setShowLoginModal(true)}
            onBack={goBack}
            onNavigateToTopic={handleSidebarNavigation}
            currentTopicId={viewState.topic.id}
          >
            <TopicViewer 
              topic={viewState.topic} 
              module={viewState.module}
              onFinishTopic={() => handleTopicCompletion(viewState.topic.id)}
              isCompleted={!!user?.completedTopics.includes(viewState.topic.id)}
            />
          </Layout>
        );
    }
  };

  return (
    <>
      {renderContent()}
      {showLoginModal && (
        <LoginModal 
          onLoginGoogle={handleGoogleLogin} 
          onLoginEmail={handleEmailLogin}
          onCancel={() => setShowLoginModal(false)}
          error={authError}
          onClearError={() => setAuthError(null)}
        />
      )}
    </>
  );
}

export default App;