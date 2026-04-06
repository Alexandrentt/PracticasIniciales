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
      className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#003366]/10 bg-white p-4 sm:p-6 lg:p-8 hover:bg-[#F5F5DC] transition-all duration-300 cursor-pointer hover:border-[#003366] hover:shadow-2xl hover:shadow-[#003366]/20 flex flex-col h-full active:scale-[0.98]"
    >
      <div className="flex items-start justify-between mb-4 sm:mb-6">
        <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#003366]/10 text-[#003366] font-bold border border-[#003366]/40 text-sm sm:text-lg shadow-lg shadow-[#003366]/20">
          {module.id}
        </div>
        <div className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs font-bold bg-[#003366] text-[#F5F5DC] border border-[#003366] tracking-wide uppercase">
          {module.topics.length} temas
        </div>
      </div>
      
      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#003366] mb-3 sm:mb-4 group-hover:text-[#228B22] transition-colors leading-tight">
        {module.title}
      </h3>
      
      <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 flex-1">
        {module.topics.slice(0, 3).map(topic => (
          <div key={topic.id} className="text-xs sm:text-sm text-[#333333] truncate flex items-center gap-2 sm:gap-3">
            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#228B22]/40 group-hover:bg-[#228B22] transition-colors flex-shrink-0"></span>
            <span className="truncate">{topic.title}</span>
          </div>
        ))}
        {module.topics.length > 3 && (
          <div className="text-xs text-[#555555] mt-1 sm:mt-2 pl-3 sm:pl-4 italic">
            + {module.topics.length - 3} más...
          </div>
        )}
      </div>

      <div className="flex items-center text-xs sm:text-sm font-medium text-[#555555] group-hover:text-[#003366] transition-colors mt-auto">
        Ver Contenido 
        <svg className="ml-1.5 sm:ml-2 w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#003366] via-[#228B22] to-[#003366] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  );
};
