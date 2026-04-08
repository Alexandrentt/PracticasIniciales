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
            subtitle="Selecciona un módulo para comenzar tu ruta de aprendizaje académica."
            onNavigateToTopic={handleSidebarNavigation}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            subtitle="Explora los temas de este módulo académico."
            onBack={goBack}
            onNavigateToTopic={handleSidebarNavigation}
          >
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="space-y-4">
                {viewState.module.topics.map((topic) => {
                  const isCompleted = user?.completedTopics.includes(topic.id);
                  return (
                    <div 
                      key={topic.id}
                      onClick={() => navigateToTopic(viewState.module, topic)}
                      className="bg-hueso dark:bg-gray-700 group flex items-center justify-between p-5 cursor-pointer transition-all duration-300 relative overflow-hidden rounded-xl border border-gray-300 dark:border-gray-600 shadow-sm hover:shadow-md active:scale-[0.99]"
                    >
                      {isCompleted && (
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-green-500"></div>
                      )}

                      <div className="flex items-center gap-6">
                        <div className={`w-12 h-12 flex items-center justify-center rounded-full text-lg font-bold border-2 ${
                          isCompleted 
                            ? 'bg-green-500 border-green-600 text-white' 
                            : 'bg-white dark:bg-gray-600 border-principal text-principal dark:text-blue-300'
                        }`}>
                          {isCompleted ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          ) : (
                            topic.id
                          )}
                        </div>
                        <div>
                          <h3 className="text-xl text-principal font-bold transition-colors">
                            {topic.title}
                          </h3>
                          <p className={`text-xs font-bold uppercase tracking-widest ${isCompleted ? 'text-green-600' : 'text-gray-500 dark:text-gray-400'}`}>
                            {isCompleted ? 'Completado' : 'Por estudiar'}
                          </p>
                        </div>
                      </div>
                      <div className="text-principal opacity-40 group-hover:opacity-100 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-center pt-4">
                <button
                  onClick={goBack}
                  className="academic-button flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                  Volver al módulo
                </button>
              </div>
            </div>
          </Layout>
        );

      case 'TOPIC':
        return (
          <Layout 
            user={user}
            onLogout={handleLogout}
            onLoginClick={() => setShowLoginModal(true)}
            title={viewState.topic.title}
            showContentTitle={false}
            onBack={goBack}
            onNavigateToTopic={handleSidebarNavigation}
            currentTopicId={viewState.topic.id}
            topicAuthor={viewState.topic.author}
          >
            <TopicViewer 
              topic={viewState.topic} 
              module={viewState.module}
              onFinishTopic={() => handleTopicCompletion(viewState.topic.id)}
              isCompleted={!!user?.completedTopics.includes(viewState.topic.id)}
              onBackToModule={goBack}
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