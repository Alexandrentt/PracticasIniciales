import React, { useEffect, useState } from 'react';
import { Topic, TopicContent, Module } from '../types';
import { getTopicContent } from '../services/geminiService';
import { Quiz } from './Quiz';
import { Flashcards } from './Flashcards';

interface TopicViewerProps {
  topic: Topic;
  module: Module;
  onFinishTopic: () => void;
  isCompleted: boolean;
  onBackToModule: () => void;
}

type TabType = 'investigacion' | 'flashcards' | 'infografia' | 'quiz';

export const TopicViewer: React.FC<TopicViewerProps> = ({ topic, module, onFinishTopic, isCompleted, onBackToModule }) => {
  const [content, setContent] = useState<TopicContent | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('investigacion');

  useEffect(() => {
    let isMounted = true;
    
    const fetchContent = async () => {
      // Reset tab when topic changes
      setActiveTab('investigacion');
      const data = await getTopicContent(topic.id);
      if (isMounted) {
        setContent(data);
      }
    };

    fetchContent();
    return () => { isMounted = false; };
  }, [topic.id]);

  const renderInlineMarkdown = (line: string) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={idx}>
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  const renderMarkdown = (text: string) => {
    const lines = text.split('\n');
    const elements: JSX.Element[] = [];

    lines.forEach((rawLine, index) => {
      const line = rawLine.trimEnd();

      if (line.trim() === '') {
        elements.push(<div key={`sp-${index}`} className="h-2" />);
        return;
      }

      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={`h3-${index}`} className="text-lg font-semibold text-[#003366] mt-4 mb-2">
            {renderInlineMarkdown(line.replace(/^###\s+/, ''))}
          </h3>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={`h2-${index}`} className="text-xl font-bold text-[#003366] mt-5 mb-3">
            {renderInlineMarkdown(line.replace(/^##\s+/, ''))}
          </h2>
        );
      } else if (line.startsWith('# ')) {
        elements.push(
          <h1 key={`h1-${index}`} className="text-2xl md:text-3xl font-extrabold text-[#003366] mt-2 mb-4">
            {renderInlineMarkdown(line.replace(/^#\s+/, ''))}
          </h1>
        );
      } else if (line.startsWith('> ')) {
        elements.push(
          <div
            key={`bq-${index}`}
            className="mt-4 mb-2 border-l-4 border-[#228B22] bg-[#228B22]/5 px-4 py-3 rounded-r-2xl text-[#333333] text-sm md:text-base"
          >
            {renderInlineMarkdown(line.replace(/^>\s+/, ''))}
          </div>
        );
      } else {
        elements.push(
          <p key={`p-${index}`} className="text-base md:text-lg leading-relaxed text-[#333333]">
            {renderInlineMarkdown(line)}
          </p>
        );
      }
    });

    return <>{elements}</>;
  };

  if (!content) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-12 h-12 border-4 border-[#003366]/30 border-t-[#003366] rounded-full animate-spin"></div>
      </div>
    );
  }

  const TabButton = ({ id, label, icon }: { id: TabType, label: string, icon: React.ReactNode }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`
        flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border whitespace-nowrap
        ${activeTab === id 
          ? 'bg-[#003366] border-[#003366] text-white shadow-[0_0_15px_rgba(0,51,102,0.3)]' 
          : 'bg-white border-transparent text-[#555555] hover:bg-[#F5F5DC] hover:border-[#003366]/40 hover:text-[#003366]'}
      `}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header with status */}
      <div className="flex justify-between items-center border-b border-[#003366]/20 pb-6">
         <div>
           <h2 className="text-lg md:text-xl font-bold text-[#003366]">
             TEMA {topic.id} · {topic.title}
           </h2>
         </div>
         {isCompleted && (
           <div className="flex items-center gap-2 px-4 py-2 bg-[#228B22]/10 border border-[#228B22]/30 rounded-full text-[#228B22] text-sm font-bold shadow-[0_0_10px_rgba(34,139,34,0.3)]">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
             <span className="hidden sm:inline">COMPLETADO</span>
           </div>
         )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap md:flex-nowrap md:overflow-x-auto pb-4 gap-3 no-scrollbar md:mask-gradient-right">
        <TabButton 
          id="investigacion" 
          label="Investigación" 
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>}
        />
        <TabButton 
          id="flashcards" 
          label="Flashcards" 
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>}
        />
        <TabButton 
          id="quiz" 
          label="Evaluación" 
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>}
        />
        <TabButton 
          id="infografia" 
          label="Infografía" 
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>}
        />
      </div>

      {/* Content Area */}
      <div className="min-h-[400px]">
        {activeTab === 'investigacion' && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="bg-white border border-[#003366]/15 rounded-3xl p-8 shadow-2xl">
              <div className="space-y-2 font-normal">
                {renderMarkdown(content.summary)}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-[#003366]/15 rounded-3xl p-8">
                <h3 className="text-xl font-bold text-[#003366] mb-4 flex items-center gap-2">Puntos Clave</h3>
                <ul className="space-y-4">
                  {content.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex gap-4 items-start">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#228B22]/10 text-[#228B22] text-xs font-bold flex items-center justify-center mt-0.5">{idx + 1}</span>
                      <span className="text-[#333333]">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-[#228B22]/20 rounded-3xl p-8">
                <h3 className="text-xl font-bold text-[#228B22] mb-4">Ejemplo Real</h3>
                <div className="text-[#333333]">{renderMarkdown(content.realWorldExample)}</div>
              </div>
            </div>

            {/* FAQs Section */}
            {content.faqs && content.faqs.length > 0 && (
              <div className="bg-white border border-[#003366]/15 rounded-3xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-[#003366] mb-6 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  Preguntas Frecuentes
                </h3>
                <div className="space-y-4">
                  {content.faqs.map((faq, idx) => (
                    <div key={idx} className="border-l-4 border-[#228B22] bg-[#F5F5DC]/50 p-4 rounded-r-lg">
                      <h4 className="font-semibold text-[#003366] mb-2">{faq.question}</h4>
                      <p className="text-[#333333] text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* References Section */}
            {content.references && content.references.length > 0 && (
              <div className="bg-white border border-[#003366]/15 rounded-3xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-[#003366] mb-6 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                  Referencias Bibliográficas
                </h3>
                <ul className="space-y-3">
                  {content.references.map((ref, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#003366]/10 text-[#003366] text-xs font-bold flex items-center justify-center">{idx + 1}</span>
                      <div className="text-[#333333] text-sm leading-relaxed">
                        {ref.url ? (
                          <a href={ref.url} target="_blank" rel="noreferrer" className="text-[#003366] hover:text-[#228B22] hover:underline">
                            {ref.citation}
                          </a>
                        ) : (
                          <span>{ref.citation}</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-center mt-12">
               <button 
                onClick={() => setActiveTab('quiz')}
                className="group px-8 py-4 bg-[#003366] hover:bg-[#00264d] text-white font-bold rounded-full transition-all flex items-center gap-2 shadow-xl hover:shadow-2xl hover:-translate-y-1"
               >
                 Ir a la Evaluación
                 <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
               </button>
            </div>
          </div>
        )}

        {activeTab === 'flashcards' && (
          <div className="animate-fade-in-up">
            <Flashcards cards={content.flashcards} />
          </div>
        )}

        {activeTab === 'infografia' && (
          <div className="animate-fade-in-up bg-white rounded-3xl p-4 border border-[#003366]/10 flex flex-col items-center">
            <div className="w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl relative group bg-slate-900">
               <div className="absolute inset-0 bg-[#228B22]/25 z-0"></div>
               <img src={content.infographicUrl} alt="Infografía" className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex justify-center mt-6">
              <a href={content.infographicUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#228B22] hover:text-[#003366] transition-colors border border-[#228B22]/40 px-6 py-2 rounded-full hover:bg-[#228B22]/5">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Abrir / Descargar
              </a>
            </div>
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="space-y-8 animate-fade-in-up">
            <Quiz questions={content.quiz} onFinish={onFinishTopic} />
          </div>
        )}
      </div>

      <div className="flex justify-center pt-4">
        <button
          onClick={onBackToModule}
          className="px-6 py-3 rounded-full border border-[#003366]/40 bg-white hover:bg-[#F5F5DC] text-[#003366] font-medium text-sm flex items-center gap-2 transition-all shadow-sm hover:shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Volver al módulo
        </button>
      </div>
    </div>
  );
};
