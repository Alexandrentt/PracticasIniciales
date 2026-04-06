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
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto py-6 sm:py-8 lg:py-10 px-4">
      <div 
        className="relative w-full aspect-[3/2] sm:aspect-[4/3] lg:aspect-[3/2] cursor-pointer perspective-1000 group"
        onClick={handleFlip}
      >
        <div className={`w-full h-full duration-700 preserve-3d absolute transition-transform ease-out-expo ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* Front */}
          <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-[#003366] to-[#001a33] border border-[#F5F5DC]/15 rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 shadow-2xl backdrop-blur-md">
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity rounded-2xl sm:rounded-3xl"></div>
            <span className="absolute top-3 sm:top-4 lg:top-6 left-3 sm:left-4 lg:left-6 text-xs font-bold text-[#F5F5DC] uppercase tracking-widest border border-[#F5F5DC]/40 px-2 sm:px-3 py-1 rounded-full z-10">Concepto</span>
            
            <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-5xl font-bold text-white text-center z-10 drop-shadow-lg select-none leading-tight px-2">
              {cards[currentIdx].term}
            </h3>
            
            <div className="absolute bottom-3 sm:bottom-4 lg:bottom-6 flex items-center gap-1 sm:gap-2 text-[#F5F5DC] text-xs sm:text-sm z-10 animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
              <span className="hidden sm:inline">Click para ver definición</span>
              <span className="sm:hidden">Click</span>
            </div>
          </div>

          {/* Back */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-[#228B22] to-[#004011] border border-[#228B22]/60 rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 shadow-2xl">
            <span className="absolute top-3 sm:top-4 lg:top-6 left-3 sm:left-4 lg:left-6 text-xs font-bold text-[#F5F5DC] uppercase tracking-widest border border-[#F5F5DC]/40 px-2 sm:px-3 py-1 rounded-full z-10">Definición</span>
            
            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-white text-center leading-relaxed font-light z-10 select-none px-2">
              {cards[currentIdx].definition}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 mt-6 sm:mt-8 lg:mt-10">
        <button 
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className="p-3 sm:p-4 rounded-full bg-white border border-[#003366]/20 hover:bg-[#F5F5DC] transition-all text-[#003366] hover:text-[#003366] hover:scale-110 active:scale-95 shadow-lg"
          aria-label="Anterior"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        
        <div className="flex flex-col items-center">
          <span className="font-mono text-lg sm:text-xl lg:text-2xl text-[#003366] tracking-widest font-bold">{currentIdx + 1}</span>
          <span className="text-xs text-[#555555] uppercase tracking-wider">de {cards.length}</span>
        </div>
        
        <button 
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="p-3 sm:p-4 rounded-full bg-white border border-[#003366]/20 hover:bg-[#F5F5DC] transition-all text-[#003366] hover:text-[#003366] hover:scale-110 active:scale-95 shadow-lg"
          aria-label="Siguiente"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  );
};
