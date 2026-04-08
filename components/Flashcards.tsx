import React, { useState } from 'react';
import { Flashcard } from '../types';

interface FlashcardsProps {
  cards: Flashcard[];
}

export const Flashcards: React.FC<FlashcardsProps> = ({ cards }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIdx((prev) => (prev + 1) % cards.length);
    }, 300);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIdx((prev) => (prev - 1 + cards.length) % cards.length);
    }, 300);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto py-6 sm:py-10 px-2 sm:px-4">
      <div 
        className="relative w-full aspect-[4/5] xs:aspect-[3/2] sm:aspect-[16/9] lg:aspect-[21/9] cursor-pointer perspective-1000 group"
        onClick={handleFlip}
      >
        <div className={`w-full h-full duration-700 preserve-3d absolute transition-transform ease-out-expo ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* Front */}
          <div className="absolute w-full h-full backface-hidden bg-hueso flex flex-col items-center justify-center p-4 sm:p-8 shadow-xl rounded-2xl sm:rounded-3xl border-2 border-principal/10 overflow-hidden">
            <div className="absolute inset-0 bg-principal/5 opacity-0 group-hover:opacity-10 transition-opacity rounded-3xl"></div>
            <span className="absolute top-4 left-4 sm:top-6 sm:left-6 text-[8px] sm:text-[10px] font-black principal uppercase tracking-[0.2em] border border-principal/20 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full z-10 bg-white">Concepto</span>
            
            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-principal text-center z-10 tracking-tight leading-tight px-4 sm:px-6 select-none">
              {cards[currentIdx].term}
            </h3>
            
            <div className="absolute bottom-4 sm:bottom-6 flex items-center gap-2 text-principal/40 text-[9px] sm:text-xs font-bold uppercase tracking-widest z-10 group-hover:text-principal/80 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
              <span>Click para ver definición</span>
            </div>
          </div>

          {/* Back */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white flex flex-col items-center justify-center p-4 sm:p-8 shadow-xl rounded-2xl sm:rounded-3xl border-2 border-green-500/20 overflow-hidden">
            <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-10 transition-opacity rounded-3xl"></div>
            <span className="absolute top-4 left-4 sm:top-6 sm:left-6 text-[8px] sm:text-[10px] font-black text-green-600 uppercase tracking-[0.2em] border border-green-500/20 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full z-10 bg-green-50">Definición</span>
            
            <p className="text-base sm:text-2xl text-gray-700 text-center font-medium z-10 leading-relaxed px-4 sm:px-6 select-none max-w-3xl overflow-y-auto no-scrollbar max-h-[70%]">
              {cards[currentIdx].definition}
            </p>
            
            <div className="absolute bottom-4 sm:bottom-6 flex items-center gap-2 text-green-600/40 text-[9px] sm:text-xs font-bold uppercase tracking-widest z-10 group-hover:text-green-600/80 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
              <span>Click para volver</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-8 mt-12 bg-white p-4 rounded-2xl shadow-lg border border-gray-100">
        <button 
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className="p-4 rounded-xl bg-gray-50 text-principal hover:bg-principal hover:text-white transition-all active:scale-95 border border-gray-100"
          aria-label="Anterior"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        
        <div className="flex flex-col items-center min-w-[100px]">
          <span className="text-2xl font-black text-principal tabular-nums">{currentIdx + 1} <span className="text-gray-300 font-light">/</span> {cards.length}</span>
          <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest mt-1">Tarjetas</span>
        </div>
        
        <button 
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="p-4 rounded-xl bg-gray-50 text-principal hover:bg-principal hover:text-white transition-all active:scale-95 border border-gray-100"
          aria-label="Siguiente"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  );
};
