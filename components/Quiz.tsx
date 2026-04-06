import React, { useState } from 'react';
import { QuizQuestion } from '../types';

interface QuizProps {
  questions: QuizQuestion[];
  onFinish: () => void;
}

export const Quiz: React.FC<QuizProps> = ({ questions, onFinish }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const handleOptionClick = (idx: number) => {
    if (showFeedback) return;
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    
    const isCorrect = selectedOption === questions[currentIdx].correctAnswerIndex;
    if (isCorrect) setScore(s => s + 1);
    
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(curr => curr + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setIsFinished(true);
    }
  };

  const percentage = Math.round((score / questions.length) * 100);
  const isPassed = percentage >= 80;

  if (isFinished) {
    return (
      <div className="text-center p-6 sm:p-8 lg:p-10 bg-white rounded-2xl sm:rounded-3xl border border-[#003366]/20 animate-fade-in shadow-2xl max-w-lg mx-auto">
        <div className={`mb-4 sm:mb-6 inline-flex p-4 sm:p-6 rounded-full ${isPassed ? 'bg-[#228B22]/10 text-[#228B22]' : 'bg-red-500/10 text-red-600'}`}>
          {isPassed ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          )}
        </div>
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 text-[#003366]">{isPassed ? '¡Excelente Trabajo!' : 'Sigue Practicando'}</h3>
        <p className="text-[#333333] mb-6 sm:mb-8 text-base sm:text-lg">
          Obtuviste <span className="font-bold text-[#003366] text-xl sm:text-2xl">{percentage}%</span> ({score}/{questions.length})
        </p>
        
        {isPassed && (
          <p className="text-[#228B22] mb-6 sm:mb-8 font-medium animate-pulse text-sm sm:text-base">
            ¡Has completado este tema exitosamente!
          </p>
        )}

        <div className="flex justify-center gap-3 sm:gap-4">
          <button 
            onClick={() => {
              // If passed, trigger onFinish which marks completion in App
              // If failed, just go back (user can retry)
              if (isPassed) onFinish();
              else onFinish(); // Allow exit anyway
            }}
            className="px-6 sm:px-8 py-2.5 sm:py-3 bg-[#003366] hover:bg-[#00264d] text-white font-bold rounded-lg sm:rounded-xl transition-colors shadow-lg active:scale-95"
          >
            Volver al módulo
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentIdx];

  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-[#003366]/15 relative overflow-hidden max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-[#003366]/15">
        <div 
          className="h-full bg-[#228B22] transition-all duration-500"
          style={{ width: `${((currentIdx) / questions.length) * 100}%` }}
        ></div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 mt-2 gap-2">
        <span className="text-xs sm:text-sm font-bold text-[#555555] tracking-wider">PREGUNTA {currentIdx + 1} DE {questions.length}</span>
        <span className="text-xs font-mono text-[#003366] bg-[#003366]/5 px-2 sm:px-3 py-1 rounded-full border border-[#003366]/30">Puntos: {score}</span>
      </div>

      <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-[#003366] mb-6 sm:mb-8 leading-snug">
        {question.question}
      </h3>

      <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleOptionClick(idx)}
            disabled={showFeedback}
            className={`w-full text-left p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-200 ${
              selectedOption === idx
                ? showFeedback
                  ? idx === question.correctAnswerIndex
                    ? 'bg-[#228B22]/10 border-[#228B22] text-[#228B22]'
                    : 'bg-red-500/10 border-red-500 text-red-600'
                  : 'bg-[#003366]/10 border-[#003366] text-[#003366]'
                : 'bg-white border-[#003366]/20 text-[#333333] hover:bg-[#F5F5DC] hover:border-[#003366]/40'
            } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer active:scale-[0.98]'}`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-medium text-sm sm:text-base leading-relaxed">{option}</span>
              {showFeedback && idx === question.correctAnswerIndex && (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              )}
              {showFeedback && selectedOption === idx && idx !== question.correctAnswerIndex && (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="text-xs sm:text-sm text-[#555555] text-center sm:text-left">
          {showFeedback && (
            <span className={selectedOption === question.correctAnswerIndex ? 'text-[#228B22] font-medium' : 'text-red-600 font-medium'}>
              {selectedOption === question.correctAnswerIndex ? '¡Correcto!' : 'Incorrecto. Inténtalo de nuevo.'}
            </span>
          )}
        </div>
        
        <div className="flex justify-center sm:justify-end gap-2 sm:gap-3">
          {showFeedback && (
            <button
              onClick={handleNext}
              className="px-4 sm:px-6 py-2 sm:py-2.5 bg-[#003366] hover:bg-[#00264d] text-white font-medium rounded-lg sm:rounded-xl transition-colors shadow-lg active:scale-95"
            >
              {currentIdx < questions.length - 1 ? 'Siguiente' : 'Ver resultados'}
            </button>
          )}
          
          {!showFeedback && selectedOption !== null && (
            <button
              onClick={handleSubmit}
              className="px-4 sm:px-6 py-2 sm:py-2.5 bg-[#228B22] hover:bg-[#1f7a1f] text-white font-medium rounded-lg sm:rounded-xl transition-colors shadow-lg active:scale-95"
            >
              Enviar respuesta
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
