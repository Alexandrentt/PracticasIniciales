import React, { useState } from 'react';
import { Module, UserProgress } from '../types';
import { COURSE_MODULES } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  user: UserProgress | null;
  onLogout: () => void;
  onLoginClick?: () => void;
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  currentTopicId?: string;
  onNavigateToTopic?: (module: Module, topicId: string) => void;
  showContentTitle?: boolean;
  topicAuthor?: string;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  user, 
  onLogout,
  onLoginClick,
  title, 
  subtitle, 
  onBack,
  currentTopicId,
  onNavigateToTopic,
  showContentTitle = true,
  topicAuthor
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return true; // Predeterminado: modo oscuro
    }
    return true;
  });

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const calculateProgress = () => {
    if (!user) return 0;
    const totalTopics = COURSE_MODULES.reduce((acc, m) => acc + m.topics.length, 0);
    return Math.round((user.completedTopics.length / totalTopics) * 100);
  };

  return (
    <div className="min-h-screen bg-crema dark:bg-gray-900 text-carbon dark:text-gray-100 font-sans selection:bg-principal selection:text-white pb-20 flex">
      {/* Background Accents */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-principal/5 dark:bg-principal/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-bosque/5 dark:bg-bosque/10 rounded-full blur-[100px]" />
      </div>

      {/* Sidebar (Desktop) */}
      <aside className={`fixed lg:sticky top-0 h-screen w-80 sm:w-72 bg-crema dark:bg-marino text-carbon dark:text-white shadow-xl z-40 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="mb-8 flex items-center justify-between gap-3">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl bg-marino dark:bg-white/10 border border-marino dark:border-white/20 flex items-center justify-center font-bold text-lg shadow-lg shadow-black/20 text-white dark:text-white">
                 PI
               </div>
               <div className="leading-tight">
                 <h1 className="font-bold text-marino dark:text-white tracking-tight">Prácticas Iniciales</h1>
                 <span className="text-[10px] text-marino/70 dark:text-blue-200 uppercase font-black tracking-widest">Ingeniería USAC</span>
               </div>
             </div>
             
             {/* Theme Toggle Switch */}
             <div className="flex items-center gap-2">
               <span className="text-[10px] font-medium text-carbon/70 dark:text-white/70">Claro</span>
               <button 
                 onClick={toggleTheme}
                 className="relative w-12 h-6 bg-marino/20 dark:bg-white/20 border border-marino/30 dark:border-white/30 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-marino/50 dark:focus:ring-white/50"
                 aria-label="Toggle dark mode"
               >
                 <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white dark:bg-marino rounded-full transition-transform duration-300 flex items-center justify-center ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`}>
                   {isDarkMode ? (
                     <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                   ) : (
                     <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                   )}
                 </span>
               </button>
               <span className="text-[10px] font-medium text-carbon/70 dark:text-white/70">Oscuro</span>
             </div>
          </div>

          {user && (
            <div className="mb-8 p-4 bg-marino/5 dark:bg-white/5 rounded-xl border border-marino/20 dark:border-white/20">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-marino dark:text-blue-50">{user.name}</span>
                <span className="bg-marino dark:bg-white/20 text-white dark:text-white px-2 py-0.5 rounded-full text-xs font-bold">{calculateProgress()}%</span>
              </div>
              <div className="w-full bg-marino/20 dark:bg-black/20 rounded-full h-2 overflow-hidden border border-marino/10 dark:border-white/10">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-green-400 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${calculateProgress()}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto pr-2 space-y-6 no-scrollbar">
             {COURSE_MODULES.map(mod => (
               <div key={mod.id}>
                 <h3 className="text-[10px] font-black text-marino/70 dark:text-blue-300 uppercase tracking-[0.2em] mb-3 px-2">
                   Módulo {mod.id}
                 </h3>
                 <div className="space-y-1">
                   {mod.topics.map(topic => {
                     const isCompleted = user?.completedTopics.includes(topic.id);
                     const isActive = currentTopicId === topic.id;
                     
                     return (
                       <button
                         key={topic.id}
                         onClick={() => {
                           if (onNavigateToTopic) onNavigateToTopic(mod, topic.id);
                           setSidebarOpen(false);
                         }}
                         className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all flex items-center justify-between group translate-z-0 ${
                           isActive 
                             ? 'bg-marino text-white font-bold shadow-lg scale-105 dark:bg-white dark:text-principal' 
                             : 'text-marino/70 hover:text-marino dark:text-blue-100/70 dark:hover:text-white hover:bg-marino/10 dark:hover:bg-white/10 hover:translate-x-1'
                         }`}
                       >
                         <span className="truncate">{topic.id} {topic.title}</span>
                         {isCompleted && (
                           <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-green-400'} shadow-sm shadow-black/20`} />
                         )}
                       </button>
                     );
                   })}
                 </div>
               </div>
             ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/10">
            {user ? (
              <button 
                onClick={onLogout}
                className="flex items-center gap-2 text-white/60 hover:text-red-300 text-xs font-bold uppercase tracking-widest transition-colors w-full px-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                Cerrar Sesión
              </button>
            ) : (
               <button 
                onClick={onLoginClick}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-widest transition-all w-full px-4 py-3 rounded-xl border border-white/20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                Iniciar Sesión
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="sticky top-0 z-30 bg-principal text-white lg:hidden px-4 h-16 flex items-center justify-between shadow-md">
           <button 
             onClick={() => setSidebarOpen(true)} 
             className="p-2 -ml-2 text-white hover:bg-white/10 rounded-full transition-all active:scale-90"
             aria-label="Abrir menú"
           >
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
           </button>
           <span className="font-bold text-lg truncate max-w-[70%]">
             {title || 'Prácticas Iniciales'}
           </span>
           <div className="w-10"></div> {/* Spacer */}
        </header>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-principal/60 backdrop-blur-md z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 p-3 sm:p-6 lg:p-10 max-w-6xl mx-auto w-full relative z-10">
          {(showContentTitle && (title || subtitle)) && (
            <div className="mb-10 animate-fade">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                {onBack && (
                  <button 
                    onClick={onBack}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-principal/20 hover:border-principal/40 transition-all text-principal hover:translate-y-[-2px] shadow-sm active:scale-95"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                  </button>
                )}
                {title && <h1 className="text-3xl sm:text-4xl font-extrabold text-principal tracking-tight">{title}</h1>}
              </div>
              {subtitle && <p className="text-lg text-principal/80 font-medium max-w-3xl leading-relaxed">{subtitle}</p>}
              <div className="h-1 w-20 bg-principal/10 rounded-full mt-6" />
            </div>
          )}
          
          <div className="animate-fade">
            {children}
          </div>
        </main>

        {/* Simple Academic Footer */}
        <footer className="mt-auto relative overflow-hidden bg-principal text-white py-8 px-6 border-t border-white/10">
          <div className="max-w-6xl mx-auto relative z-10 text-center">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center font-bold text-lg">
                  PI
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Prácticas Iniciales</h3>
                  <p className="text-[10px] text-white/70">Facultad de Ingeniería CUNOC</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <a 
                  href="http://ingenieria.cunoc.usac.edu.gt/portal/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
                  aria-label="Website"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                </a>
                <a 
                  href="https://www.facebook.com/DivisionIngenieriaCunoc/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
                  aria-label="Facebook"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
              </div>
            </div>
            
            <div className="grid lg:grid-cols-12 gap-12 mb-12 text-left pt-12 border-t border-white/10">
              <div className="lg:col-span-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white text-principal flex items-center justify-center font-black text-xl shadow-2xl rotate-3">
                    PI
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-xl uppercase tracking-tighter leading-none">Prácticas Iniciales</h3>
                    <p className="text-[10px] text-white/50 font-black uppercase tracking-[0.3em] mt-1">Facultad de Ingeniería • CUNOC</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="px-4 py-2 bg-white/10 rounded-lg border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/80">
                    Edición 2026
                  </div>
                  <div className="px-4 py-2 bg-white/10 rounded-lg border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/80">
                    Ingeniería Mecánica
                  </div>
                </div>
              </div>

              <div className="lg:col-span-12">
                <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10">
                  <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><circle cx="19" cy="11" r="2"/></svg>
                    {topicAuthor ? 'Autor de Investigación' : 'Equipo de Investigación Académica'}
                  </h4>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-3">
                    {topicAuthor ? (
                      <div className="col-span-3 py-4 border-b border-white/10">
                         <p className="text-xl sm:text-2xl font-black text-blue-300 heading-serif italic leading-tight text-center">
                           {topicAuthor}
                         </p>
                      </div>
                    ) : (
                      [
                        { name: "Ángel Saul Rios Guzmán", id: "202432128" },
                        { name: "Aneth Alejandra Avila Morales", id: "202531107" },
                        { name: "Antony Edilsar Gómez Sánchez", id: "202430069" },
                        { name: "Carlos Guillermo Obregón Custodio", id: "202231034" },
                        { name: "Cecilia Mariann Alejandra López Estacuy", id: "202530214" },
                        { name: "Edgar Daniel Sierra Mantanico", id: "202330517" },
                        { name: "Fernando Josué Mejía Tezó", id: "202330526" },
                        { name: "Gonzalo Antonio Tamat Gramajo", id: "202430045" },
                        { name: "Henry Estuardo Estrada Rojas", id: "202430144" },
                        { name: "Horacio Caín Barrios Barrios", id: "202430626" },
                        { name: "José Mario Roberto Rodríguez Figueroa", id: "202431192" },
                        { name: "Mynor Estuardo Ruano García", id: "202330066" },
                        { name: "Stivenn Raúl Fuentes Pérez", id: "202331882" },
                        { name: "Willy Alexander López Gómez", id: "202330360" },
                        { name: "Marbella Isabel Aguilar Tuc", id: "201830286" }
                      ].map((student, i) => (
                        <div key={i} className="flex justify-between items-center text-[10px] sm:text-[11px] border-b border-white/5 py-2 hover:bg-white/5 transition-colors px-2 rounded-lg group">
                          <span className="font-bold text-white/80 truncate mr-2 group-hover:text-white transition-colors">{student.name}</span>
                          <span className="font-black text-blue-300/60 font-mono tracking-tighter flex-shrink-0">{student.id}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};