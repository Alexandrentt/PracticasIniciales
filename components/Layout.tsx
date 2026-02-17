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
  onNavigateToTopic
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const calculateProgress = () => {
    if (!user) return 0;
    const totalTopics = COURSE_MODULES.reduce((acc, m) => acc + m.topics.length, 0);
    return Math.round((user.completedTopics.length / totalTopics) * 100);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans selection:bg-cyan-500 selection:text-white pb-20 flex">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-cyan-600/10 rounded-full blur-[100px]" />
      </div>

      {/* Sidebar (Desktop) */}
      <aside className={`fixed lg:sticky top-0 h-screen w-80 bg-slate-900/95 backdrop-blur-xl border-r border-white/10 z-40 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="mb-8 flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-purple-500/20">
               PI
             </div>
             <div className="leading-tight">
               <h1 className="font-bold text-white tracking-tight">Prácticas Iniciales</h1>
               <span className="text-xs text-slate-400">Ingeniería USAC</span>
             </div>
          </div>

          {user && (
            <div className="mb-8 p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-200">{user.name}</span>
                <span className="text-xs text-cyan-400 font-bold">{calculateProgress()}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${calculateProgress()}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar">
             {COURSE_MODULES.map(mod => (
               <div key={mod.id}>
                 <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-2">
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
                         className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between group ${
                           isActive 
                             ? 'bg-cyan-500/10 text-cyan-400 font-medium' 
                             : 'text-slate-400 hover:text-white hover:bg-white/5'
                         }`}
                       >
                         <span className="truncate">{topic.id} {topic.title}</span>
                         {isCompleted && (
                           <svg className="w-4 h-4 text-green-500 flex-shrink-0 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
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
                className="flex items-center gap-2 text-slate-400 hover:text-red-400 text-sm transition-colors w-full px-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                Cerrar Sesión
              </button>
            ) : (
               <button 
                onClick={onLoginClick}
                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm transition-colors w-full px-2 font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                Iniciar Sesión
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-md border-b border-white/10 lg:hidden px-4 h-16 flex items-center justify-between">
           <button onClick={() => setSidebarOpen(true)} className="p-2 text-slate-400 hover:text-white">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
           </button>
           <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Prácticas Iniciales</span>
           <div className="w-8"></div> {/* Spacer */}
        </header>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-6xl mx-auto w-full">
          {(title || subtitle) && (
            <div className="mb-10 animate-fade-in">
              <div className="flex items-center gap-4 mb-4">
                {onBack && (
                  <button 
                    onClick={onBack}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-slate-300 hover:text-white group"
                  >
                    <svg className="group-hover:-translate-x-0.5 transition-transform" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                  </button>
                )}
                {title && <h1 className="text-3xl md:text-4xl font-bold text-white">{title}</h1>}
              </div>
              {subtitle && <p className="text-lg text-slate-400 max-w-3xl ml-1">{subtitle}</p>}
            </div>
          )}
          
          <div className="animate-fade-in-up">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};