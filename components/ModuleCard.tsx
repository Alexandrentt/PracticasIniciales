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
      className="bg-hueso dark:bg-gray-700 group relative overflow-hidden rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 cursor-pointer flex flex-col h-full active:scale-[0.98] border border-gray-300 dark:border-gray-600 shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4 sm:mb-6">
        <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-principal text-white font-bold border border-white/20 text-sm sm:text-lg shadow-md">
          {module.id}
        </div>
        <div className="bg-principal/10 text-principal border border-principal/20 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs font-bold tracking-wide uppercase">
          {module.topics.length} temas
        </div>
      </div>
      
      <h3 className="text-xl sm:text-2xl text-principal font-bold mb-3 sm:mb-4 leading-tight">
        {module.title}
      </h3>
      
      <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 flex-1">
        {module.topics.slice(0, 4).map(topic => (
          <div key={topic.id} className="text-sm text-gray-700 dark:text-gray-200 truncate flex items-center gap-2 sm:gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-principal/40 group-hover:bg-principal transition-colors flex-shrink-0"></span>
            <span className="truncate">{topic.title}</span>
          </div>
        ))}
        {module.topics.length > 4 && (
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 sm:mt-2 pl-4 italic">
            + {module.topics.length - 4} más...
          </div>
        )}
      </div>

      <div className="flex items-center text-sm font-bold text-principal/60 group-hover:text-principal transition-colors mt-auto">
        Comenzar Estudio
        <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </div>

      <div className="absolute top-0 right-0 w-32 h-32 bg-principal/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500" />
    </div>
  );
};
