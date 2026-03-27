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
    <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto py-10">
      <div 
        className="relative w-full aspect-[3/2] cursor-pointer perspective-1000 group"
        onClick={handleFlip}
      >
        <div className={`w-full h-full duration-700 preserve-3d absolute transition-transform ease-out-expo ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* Front */}
          <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-[#003366] to-[#001a33] border border-[#F5F5DC]/15 rounded-3xl flex flex-col items-center justify-center p-8 shadow-2xl backdrop-blur-md">
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity rounded-3xl"></div>
            <span className="absolute top-6 left-6 text-xs font-bold text-[#F5F5DC] uppercase tracking-widest border border-[#F5F5DC]/40 px-3 py-1 rounded-full z-10">Concepto</span>
            
            <h3 className="text-3xl md:text-5xl font-bold text-white text-center z-10 drop-shadow-lg select-none">
              {cards[currentIdx].term}
            </h3>
            
            <div className="absolute bottom-6 flex items-center gap-2 text-[#F5F5DC] text-sm z-10 animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
              <span>Click para ver definición</span>
            </div>
          </div>

          {/* Back */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-[#228B22] to-[#004011] border border-[#228B22]/60 rounded-3xl flex flex-col items-center justify-center p-8 shadow-2xl">
            <span className="absolute top-6 left-6 text-xs font-bold text-[#F5F5DC] uppercase tracking-widest border border-[#F5F5DC]/40 px-3 py-1 rounded-full z-10">Definición</span>
            
            <p className="text-xl md:text-2xl text-white text-center leading-relaxed font-light z-10 select-none">
              {cards[currentIdx].definition}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-8 mt-10">
        <button 
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className="p-4 rounded-full bg-white border border-[#003366]/20 hover:bg-[#F5F5DC] transition-all text-[#003366] hover:text-[#003366] hover:scale-110 active:scale-95 shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        
        <div className="flex flex-col items-center">
          <span className="font-mono text-xl text-[#003366] tracking-widest font-bold">{currentIdx + 1}</span>
          <span className="text-xs text-[#555555] uppercase tracking-wider">de {cards.length}</span>
        </div>
        
        <button 
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="p-4 rounded-full bg-white border border-[#003366]/20 hover:bg-[#F5F5DC] transition-all text-[#003366] hover:text-[#003366] hover:scale-110 active:scale-95 shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  );
};
