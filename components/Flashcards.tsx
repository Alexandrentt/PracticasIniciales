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
          <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 rounded-3xl flex flex-col items-center justify-center p-8 shadow-2xl backdrop-blur-md">
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-10 transition-opacity rounded-3xl"></div>
            <span className="absolute top-6 left-6 text-xs font-bold text-cyan-400 uppercase tracking-widest border border-cyan-500/30 px-3 py-1 rounded-full z-10">Concepto</span>
            
            <h3 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 text-center z-10 drop-shadow-lg select-none">
              {cards[currentIdx].term}
            </h3>
            
            <div className="absolute bottom-6 flex items-center gap-2 text-slate-500 text-sm z-10 animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
              <span>Click para ver definición</span>
            </div>
          </div>

          {/* Back */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-cyan-900/30 to-slate-900 border border-cyan-500/30 rounded-3xl flex flex-col items-center justify-center p-8 shadow-2xl">
            <span className="absolute top-6 left-6 text-xs font-bold text-purple-400 uppercase tracking-widest border border-purple-500/30 px-3 py-1 rounded-full z-10">Definición</span>
            
            <p className="text-xl md:text-2xl text-slate-100 text-center leading-relaxed font-light z-10 select-none">
              {cards[currentIdx].definition}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-8 mt-10">
        <button 
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className="p-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-slate-300 hover:text-white hover:scale-110 active:scale-95 shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        
        <div className="flex flex-col items-center">
          <span className="font-mono text-xl text-white tracking-widest font-bold">{currentIdx + 1}</span>
          <span className="text-xs text-slate-500 uppercase tracking-wider">de {cards.length}</span>
        </div>
        
        <button 
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="p-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-slate-300 hover:text-white hover:scale-110 active:scale-95 shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  );
};
