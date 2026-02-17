import React from 'react';
import { Module } from '../types';

interface ModuleCardProps {
  module: Module;
  onClick: () => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-all duration-300 cursor-pointer hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col h-full"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-cyan-300 font-bold border border-cyan-500/30 text-lg shadow-lg shadow-cyan-900/20">
          {module.id}
        </div>
        <div className="px-4 py-1.5 rounded-full text-xs font-bold bg-slate-800 text-slate-400 border border-slate-700 tracking-wide uppercase">
          {module.topics.length} temas
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors leading-tight">
        {module.title}
      </h3>
      
      <div className="space-y-2 mb-6 flex-1">
        {module.topics.slice(0, 3).map(topic => (
          <div key={topic.id} className="text-sm text-slate-400 truncate flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-cyan-500/80 transition-colors"></span>
            {topic.title}
          </div>
        ))}
        {module.topics.length > 3 && (
          <div className="text-xs text-slate-500 mt-2 pl-4 italic">
            + {module.topics.length - 3} más...
          </div>
        )}
      </div>

      <div className="flex items-center text-sm font-medium text-slate-500 group-hover:text-cyan-400 transition-colors mt-auto">
        Ver Contenido 
        <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  );
};
