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
      <div className="text-center p-10 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-white/10 animate-fade-in shadow-2xl">
        <div className={`mb-6 inline-flex p-6 rounded-full ${isPassed ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
          {isPassed ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          )}
        </div>
        <h3 className="text-3xl font-bold mb-2 text-white">{isPassed ? '¡Excelente Trabajo!' : 'Sigue Practicando'}</h3>
        <p className="text-slate-300 mb-8 text-lg">
          Obtuviste <span className="font-bold text-white text-2xl">{percentage}%</span> ({score}/{questions.length})
        </p>
        
        {isPassed && (
          <p className="text-cyan-400 mb-8 font-medium animate-pulse">
            ¡Has completado este tema exitosamente!
          </p>
        )}

        <div className="flex justify-center gap-4">
          <button 
            onClick={() => {
              // If passed, trigger onFinish which marks completion in App
              // If failed, just go back (user can retry)
              if (isPassed) onFinish();
              else onFinish(); // Allow exit anyway
            }}
            className="px-8 py-3 bg-white hover:bg-slate-200 text-slate-900 font-bold rounded-xl transition-colors shadow-lg"
          >
            Volver al módulo
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentIdx];

  return (
    <div className="bg-white/5 p-6 md:p-8 rounded-3xl border border-white/10 relative overflow-hidden">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
        <div 
          className="h-full bg-cyan-500 transition-all duration-500"
          style={{ width: `${((currentIdx) / questions.length) * 100}%` }}
        ></div>
      </div>

      <div className="flex justify-between items-center mb-6 mt-2">
        <span className="text-sm font-bold text-slate-400 tracking-wider">PREGUNTA {currentIdx + 1} DE {questions.length}</span>
        <span className="text-xs font-mono text-cyan-400 bg-cyan-900/30 px-3 py-1 rounded-full border border-cyan-500/30">Puntos: {score}</span>
      </div>

      <h3 className="text-xl md:text-2xl font-medium text-white mb-8 leading-snug">
        {question.question}
      </h3>

      <div className="space-y-3 mb-10">
        {question.options.map((option, idx) => {
          let btnClass = "w-full text-left p-5 rounded-xl border-2 transition-all duration-200 relative overflow-hidden group ";
          
          if (showFeedback) {
            if (idx === question.correctAnswerIndex) {
              btnClass += "bg-green-500/10 border-green-500 text-white";
            } else if (idx === selectedOption) {
              btnClass += "bg-red-500/10 border-red-500 text-red-100";
            } else {
              btnClass += "bg-white/5 border-transparent text-slate-500 opacity-50";
            }
          } else {
            if (selectedOption === idx) {
              btnClass += "bg-cyan-600/20 border-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.2)]";
            } else {
              btnClass += "bg-white/5 border-transparent hover:bg-white/10 hover:border-white/20 text-slate-300";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleOptionClick(idx)}
              className={btnClass}
              disabled={showFeedback}
            >
              <div className="flex items-center relative z-10">
                <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 text-sm font-bold mr-4 transition-colors ${
                  selectedOption === idx || (showFeedback && idx === question.correctAnswerIndex) 
                    ? 'border-current bg-current text-slate-900' 
                    : 'border-slate-600 text-slate-500 group-hover:border-slate-400 group-hover:text-slate-300'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </div>
                {option}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-end h-12">
        {!showFeedback ? (
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className="px-8 bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cyan-500 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-cyan-500/25"
          >
            Confirmar Respuesta
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-8 bg-white text-slate-900 hover:bg-slate-200 rounded-xl font-bold transition-colors flex items-center gap-2 shadow-lg animate-fade-in"
          >
            {currentIdx === questions.length - 1 ? "Ver Resultados" : "Siguiente Pregunta"}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
        )}
      </div>
    </div>
  );
};
