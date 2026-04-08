import React, { useState } from 'react';
import { QuizQuestion } from '../types';

interface QuizProps {
  questions: QuizQuestion[];
  onFinish: () => void;
}

export const Quiz: React.FC<QuizProps> = ({ questions, onFinish }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const handleOptionClick = (idx: number) => {
    if (showFeedback) return;
    setSelectedOption(idx);
  };

  const handleTrueFalseClick = (answer: boolean) => {
    if (showFeedback) return;
    setSelectedOption(answer);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    
    const currentQuestion = questions[currentIdx];
    let isCorrect = false;
    
    if (currentQuestion.type === 'multiple-choice') {
      isCorrect = selectedOption === currentQuestion.correctAnswerIndex;
    } else if (currentQuestion.type === 'true-false') {
      isCorrect = selectedOption === currentQuestion.correctAnswer;
    }
    
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
      <div className="text-center p-10 bg-hueso dark:bg-gray-800 rounded-3xl border border-principal/10 dark:border-gray-600 animate-fade shadow-xl max-w-xl mx-auto">
        <div className={`mb-6 inline-flex p-6 rounded-full ${isPassed ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}>
          {isPassed ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          )}
        </div>
        <h3 className="text-3xl font-black mb-2 text-principal tracking-tight">{isPassed ? '¡Excelente Trabajo!' : 'Sigue Practicando'}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg font-medium">
          Obtuviste <span className="font-black text-principal text-3xl">{percentage}%</span> ({score}/{questions.length})
        </p>
        
        {isPassed && (
          <p className="text-green-600 mb-8 font-black uppercase tracking-widest text-xs">
            ¡Has completado este tema exitosamente!
          </p>
        )}

        <div className="flex justify-center">
          <button 
            onClick={() => onFinish()}
            className="px-10 py-4 bg-principal hover:bg-black text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-lg active:scale-95"
          >
            Finalizar Evaluación
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentIdx];

  return (
    <div className="bg-white dark:bg-gray-800 p-5 sm:p-10 rounded-3xl border border-principal/10 dark:border-gray-600 relative overflow-hidden max-w-3xl mx-auto shadow-xl">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-100 dark:bg-gray-700">
        <div 
          className="h-full bg-gradient-to-r from-principal to-blue-400 transition-all duration-700 ease-out"
          style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 mt-2 gap-2">
        <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">PREGUNTA {currentIdx + 1} / {questions.length}</span>
        <span className="text-xs font-black text-principal bg-principal/5 px-4 py-1.5 rounded-full border border-principal/10">Puntos: {score}</span>
      </div>

      <h3 className="text-xl sm:text-2xl font-extrabold text-principal mb-10 leading-tight tracking-tight">
        {question.question}
      </h3>

      {question.type === 'multiple-choice' ? (
        <div className="space-y-3 mb-10">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionClick(idx)}
              className={`w-full text-left p-5 rounded-2xl border-2 transition-all group ${
                selectedOption === idx
                  ? showFeedback
                    ? idx === question.correctAnswerIndex
                      ? 'bg-green-50 border-green-500 text-green-700'
                      : 'bg-red-50 border-red-500 text-red-700'
                    : 'bg-principal/5 border-principal text-principal'
                  : 'bg-gray-50 dark:bg-gray-700 border-gray-100 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-600 hover:border-principal/30 hover:shadow-md'
              } ${showFeedback ? 'cursor-not-allowed opacity-90' : 'cursor-pointer active:scale-[0.99]'}`}
              disabled={showFeedback}
            >
              <div className="flex items-center gap-4">
                <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                  selectedOption === idx
                    ? showFeedback
                      ? idx === question.correctAnswerIndex
                        ? 'border-green-500 bg-green-500'
                        : 'border-red-500 bg-red-500'
                      : 'border-principal bg-principal'
                    : 'border-gray-300 dark:border-gray-500 group-hover:border-principal/50'
                }`}>
                  {selectedOption === idx && (
                    <div className="w-2 h-2 rounded-full bg-white shadow-sm"></div>
                  )}
                </div>
                <span className={`flex-1 font-bold ${selectedOption === idx ? '' : 'text-gray-600 dark:text-gray-300'}`}>{option}</span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <button
            onClick={() => handleTrueFalseClick(true)}
            className={`p-8 rounded-2xl border-2 transition-all font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 ${
              selectedOption === true
                ? showFeedback
                  ? question.correctAnswer === true
                    ? 'bg-green-50 border-green-500 text-green-700'
                    : 'bg-red-50 border-red-500 text-red-700'
                  : 'bg-principal/5 border-principal text-principal'
                : 'bg-gray-50 dark:bg-gray-700 border-gray-100 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-600 hover:border-principal/30 hover:shadow-md'
            } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer active:scale-95'}`}
            disabled={showFeedback}
          >
            <span>Verdadero</span>
          </button>
          
          <button
            onClick={() => handleTrueFalseClick(false)}
            className={`p-8 rounded-2xl border-2 transition-all font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 ${
              selectedOption === false
                ? showFeedback
                  ? question.correctAnswer === false
                    ? 'bg-green-50 border-green-500 text-green-700'
                    : 'bg-red-50 border-red-500 text-red-700'
                  : 'bg-principal/5 border-principal text-principal'
                : 'bg-gray-50 dark:bg-gray-700 border-gray-100 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-600 hover:border-principal/30 hover:shadow-md'
            } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer active:scale-95'}`}
            disabled={showFeedback}
          >
            <span>Falso</span>
          </button>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 border-t border-gray-50 dark:border-gray-700 pt-8 mt-2">
        <div className="text-center sm:text-left min-h-[1.5rem]">
          {showFeedback && (
            <span className={`text-xs font-black uppercase tracking-[0.2em] animate-fade ${
              question.type === 'multiple-choice' 
                ? (selectedOption === question.correctAnswerIndex ? 'text-green-600' : 'text-red-500')
                : (selectedOption === question.correctAnswer ? 'text-green-600' : 'text-red-500')
            }`}>
              {question.type === 'multiple-choice' 
                ? (selectedOption === question.correctAnswerIndex ? '¡Correcto!' : 'Respuesta Incorrecta')
                : (selectedOption === question.correctAnswer ? '¡Correcto!' : 'Respuesta Incorrecta')
              }
            </span>
          )}
        </div>
        <div className="flex gap-4">
          {!showFeedback ? (
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className="w-full sm:w-auto px-8 py-4 bg-principal hover:bg-black disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-black uppercase tracking-widest text-[10px] rounded-xl transition-all shadow-lg active:scale-95"
            >
              Comprobar
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full sm:w-auto px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-black uppercase tracking-widest text-[10px] rounded-xl transition-all shadow-lg active:scale-95 animate-fade"
            >
              {currentIdx < questions.length - 1 ? 'Siguiente' : 'Ver Resultados'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
