import React, { useEffect, useState, JSX } from 'react';
import { Topic, TopicContent, Module } from '../types';
import { getTopicContent } from '../services/geminiService';
import { Quiz } from './Quiz';
import { Flashcards } from './Flashcards';
import { YouTubePlayer } from './YouTubePlayer';

interface TopicViewerProps {
  topic: Topic;
  module: Module;
  onFinishTopic: () => void;
  isCompleted: boolean;
  onBackToModule: () => void;
  onNavigateToTopic?: (module: Module, topicId: string) => void;
}

type TabType = 'investigacion' | 'ejemploreal' | 'flashcards' | 'infografia' | 'video' | 'mindmap' | 'glosario' | 'referencias' | 'quiz';

export const TopicViewer: React.FC<TopicViewerProps> = ({ topic, module, onFinishTopic, isCompleted, onBackToModule, onNavigateToTopic }) => {
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

  const navigateToPreviousTopic = () => {
    if (!onNavigateToTopic) return;
    
    const currentTopicIndex = module.topics.findIndex(t => t.id === topic.id);
    if (currentTopicIndex > 0) {
      const previousTopic = module.topics[currentTopicIndex - 1];
      onNavigateToTopic(module, previousTopic.id);
    }
  };

  const navigateToNextTopic = () => {
    if (!onNavigateToTopic) return;
    
    const currentTopicIndex = module.topics.findIndex(t => t.id === topic.id);
    if (currentTopicIndex < module.topics.length - 1) {
      const nextTopic = module.topics[currentTopicIndex + 1];
      onNavigateToTopic(module, nextTopic.id);
    }
  };

  const renderInlineMarkdown = (line: string) => {
    // Handle both bold (**text**), italic (*text*), and links ([text](url))
    // Use an approach that can handle nested or multiple styles in one line
    const parts = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g);
    
    return parts.map((part, idx) => {
      // Bold
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={idx} className="font-bold text-gray-900 dark:text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      // Italic
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <em key={idx} className="italic text-gray-700 dark:text-gray-200">
            {part.slice(1, -1)}
          </em>
        );
      }
      // Links [text](url)
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        return (
          <a 
            key={idx} 
            href={linkMatch[2]} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 hover:text-blue-800 underline decoration-blue-500/30 hover:decoration-blue-500 transition-all font-medium"
          >
            {linkMatch[1]}
          </a>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  const stripEmojis = (text: string) => {
    if (!text) return "";
    return text.replace(/\p{Extended_Pictographic}/gu, '');
  };

  const renderMarkdown = (text: string) => {
    const lines = text.split('\n');
    const elements: JSX.Element[] = [];

    let currentTable: string[][] = [];
    let isInsideTable = false;
    let skipSection = false;

    lines.forEach((rawLine, index) => {
      // Remover EMOJIS de forma global usando el helper
      const lineWithoutEmojis = stripEmojis(rawLine);
      
      const line = lineWithoutEmojis.trimEnd();
      const trimmedLine = line.trim();
      const lowerLine = trimmedLine.toLowerCase();

      const redundantPatterns = [
        /Realizado por:/i,
        /Nombre:/i,
        /Carn[ée]:/i,
        /\d{9}/, // Carnets
        /Universidad de San Carlos/i,
        /Facultad de Ingeniería/i,
        /Centro Universitario de Occidente/i,
        /CUNOC/i,
        /USAC/i,
        /Investigador:/i,
        // Lista completa de investigadores del proyecto para eliminación global
        /Aneth Alejandra Avila Morales/i,
        /Antony Edilsar Gómez Sánchez/i,
        /Carlos Guillermo Obregón Custodio/i,
        /Cecilia Mariann Alejandra López Estacuy/i,
        /Edgar Daniel Sierra Mantanico/i,
        
        /Fernando Josué Mejía Tezó/i,
        /Gonzalo Antonio Tamat Gramajo/i,
        /Henry Estuardo Estrada Rojas/i,
        /Horacio Caín Barrios Barrios/i,
        /José Mario Roberto Rodríguez Figueroa/i,
        /Mynor Estuardo Ruano García/i,
        /Stivenn Raúl Fuentes Pérez/i,
        /Willy Alexander López Gómez/i
      ];

      // Section Skipper Logic: If we hit a heading that goes to its own tab, skip its entire content
      if (trimmedLine.startsWith('#')) {
        if (
          lowerLine.includes('glosario') ||
          lowerLine.includes('bibliograf') ||
          lowerLine.includes('referencias') ||
          lowerLine.includes('ejemplo pr') ||
          lowerLine.includes('preguntas frecuentes') ||
          lowerLine.includes('palabras clave')
        ) {
          skipSection = true;
          return;
        } else {
          skipSection = false; // Normal heading, resume rendering
        }
      }

      if (skipSection) return;

      // GLOBAL FILTER: Remove redundant attribution lines, duplicative titles, and carnets
      if (
        redundantPatterns.some(pattern => pattern.test(trimmedLine)) ||
        lowerLine.includes('realizado por') || // Captura variaciones sin importar mayúsculas o símbolos extra
        lowerLine.replace(/[^a-z]/g, '').includes('realizadopor') || // Super-filtro normalize

        (trimmedLine.startsWith('# ') && (
          lowerLine.includes(topic.title.toLowerCase().substring(0, 15)) || 
          topic.title.toLowerCase().includes(trimmedLine.toLowerCase().replace(/#\s+/, '').substring(0, 15)) ||
          (trimmedLine.match(/^\#\s+\d+(\.\d+)*/) && lowerLine.includes(topic.id)) // Matches "1.1" etc.
        )) ||
        /\d{9}/.test(trimmedLine) || // Any 9-digit sequence (carnets) 
        /20\d{7}/.test(trimmedLine)   // USAC specific carnet pattern (20XXXXXXX)
      ) {
        return;
      }

      // Table Detection
      if (trimmedLine.startsWith('|') && trimmedLine.endsWith('|')) {
        const cells = line.split('|').filter(cell => cell.trim() !== '' || line.startsWith('|') && cell === '').map(c => c.trim());
        
        // Skip separator line |---|---|
        if (cells.every(c => c.match(/^:?-+:?$/))) {
          isInsideTable = true;
          return;
        }

        if (!isInsideTable) {
           currentTable = [cells];
           isInsideTable = true;
        } else {
           currentTable.push(cells);
        }
        return;
      } else if (isInsideTable) {
        // Render the table collected so far
        if (currentTable.length > 0) {
            elements.push(
                <div key={`table-${index}`} className="overflow-x-auto my-8 border border-principal/20 rounded-lg shadow-sm">
                    <table className="min-w-full divide-y divide-principal/20 bg-white dark:bg-gray-800">
                        <thead className="bg-principal/5">
                            <tr>
                                {currentTable[0].map((header, hIdx) => (
                                    <th key={hIdx} className="px-4 py-3 text-left text-sm font-bold text-principal uppercase tracking-wider border-r border-principal/10 last:border-0 italic">
                                        {renderInlineMarkdown(header)}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-600">
                            {currentTable.slice(1).map((row, rIdx) => (
                                <tr key={rIdx} className="hover:bg-hueso/30 dark:hover:bg-gray-700 transition-colors">
                                    {row.map((cell, cIdx) => (
                                        <td key={cIdx} className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200 border-r border-gray-100 dark:border-gray-600 last:border-0">
                                            {renderInlineMarkdown(cell)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }
        currentTable = [];
        isInsideTable = false;
        if (line.trim() === '') return;
      }

      if (line.trim() === '') {
        elements.push(<div key={`sp-${index}`} className="h-2" />);
        return;
      }

      // Horizontal Rule - Suppress if it's leading or trailing attribution
      if (trimmedLine === '---' || trimmedLine === '***' || trimmedLine === '___') {
        const remainingLines = lines.slice(index + 1);
        
        // Suppress if it's at the very beginning (after filtering titles/names)
        const isLeading = elements.filter(el => el.type !== 'div').length === 0;

        const isTrailingAttribution = remainingLines.every(futureLine => {
          const t = futureLine.trim();
          const low = t.toLowerCase();
          return t === '' || 
            low.includes('realizado por') || 
            low.includes('investigador') ||
            (low.includes('centro universitario') && low.includes('occidente')) || 
            (low.includes('universidad de san carlos') && low.includes('guatemala')) ||
            /\d{9}/.test(t);
        });

        if (isLeading || isTrailingAttribution) return;

        elements.push(<hr key={`hr-${index}`} className="my-8 border-t-2 border-principal/10" />);
        return;
      }

      // Headings
      if (line.startsWith('###### ')) {
        elements.push(
          <h6 key={`h6-${index}`} className="text-sm font-bold text-gray-600 heading-serif mt-2 mb-1 uppercase tracking-tight">
            {renderInlineMarkdown(line.replace(/^######\s+/, ''))}
          </h6>
        );
      } else if (line.startsWith('##### ')) {
        elements.push(
          <h5 key={`h5-${index}`} className="text-base font-bold text-gray-700 heading-serif mt-3 mb-1 uppercase tracking-tight">
            {renderInlineMarkdown(line.replace(/^#####\s+/, ''))}
          </h5>
        );
      } else if (line.startsWith('#### ')) {
        elements.push(
          <h4 key={`h4-${index}`} className="text-lg font-bold text-gray-700 heading-serif mt-4 mb-2">
            {renderInlineMarkdown(line.replace(/^####\s+/, ''))}
          </h4>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={`h3-${index}`} className="text-xl font-bold text-principal heading-serif mt-6 mb-3 flex items-center gap-3">
             <div className="w-4 h-4 bg-principal flex-shrink-0" />
            {renderInlineMarkdown(line.replace(/^###\s+/, ''))}
          </h3>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={`h2-${index}`} className="text-2xl font-black text-principal heading-serif mt-8 mb-4 flex items-center gap-3 border-b-2 border-principal/10 pb-2">
             <div className="w-5 h-5 bg-principal flex-shrink-0" />
            {renderInlineMarkdown(line.replace(/^##\s+/, ''))}
          </h2>
        );
      } else if (line.startsWith('# ')) {
        const headline = line.replace(/^#\s+/, '');
        elements.push(
          <h1 key={`h1-${index}`} className="text-3xl sm:text-5xl font-black text-principal heading-serif mt-4 mb-10 text-center relative pb-6 group">
            {renderInlineMarkdown(headline)}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-principal rounded-full group-hover:w-32 transition-all duration-500" />
          </h1>
        );

      } else if (line.startsWith('> ')) {
        elements.push(
          <div
            key={`bq-${index}`}
            className="academic-quote my-6 p-6 border-l-4 border-principal bg-white/50 dark:bg-gray-800/50 italic text-principal/80"
          >
            {renderInlineMarkdown(line.replace(/^>\s+/, ''))}
          </div>
        );
      } else if (line.trim().match(/^\d+\.\s+/)) {
        // Numbered List
        const num = line.trim().match(/^(\d+)\.\s+/);
        elements.push(
          <div key={`ol-${index}`} className="flex gap-3 mb-2 pl-4">
            <span className="font-bold text-principal min-w-[1.2rem] mt-1 text-sm">{num![1]}.</span>
            <p className="text-body text-gray-800 dark:text-gray-100 leading-relaxed text-justify flex-1">
              {renderInlineMarkdown(line.trim().replace(/^\d+\.\s+/, ''))}
            </p>
          </div>
        );
      } else if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
         elements.push(
           <div key={`li-${index}`} className="flex gap-3 mb-2 pl-4">
             <div className="w-1.5 h-1.5 rounded-full bg-principal mt-2 flex-shrink-0" />
             <p className="text-body text-gray-800 dark:text-gray-100 leading-relaxed text-justify flex-1">
               {renderInlineMarkdown(line.trim().replace(/^[-*]\s+/, ''))}
             </p>
           </div>
         );
      } else {
        elements.push(
          <p key={`p-${index}`} className="text-body text-gray-800 dark:text-gray-100 leading-relaxed mb-4 text-justify">
            {renderInlineMarkdown(line)}
          </p>
        );
      }
    });

    // Final check for trailing table
    if (isInsideTable && currentTable.length > 0) {
        elements.push(
            <div key="table-final" className="overflow-x-auto my-8 border border-principal/20 rounded-lg shadow-sm">
                <table className="min-w-full divide-y divide-principal/20 bg-white dark:bg-gray-800">
                    <thead className="bg-principal/5">
                        <tr>
                            {currentTable[0].map((header, hIdx) => (
                                <th key={hIdx} className="px-4 py-3 text-left text-sm font-bold text-principal uppercase tracking-wider border-r border-principal/10 last:border-0 italic">
                                    {renderInlineMarkdown(header)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-600">
                        {currentTable.slice(1).map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-hueso/30 dark:hover:bg-gray-700 transition-colors">
                                {row.map((cell, cIdx) => (
                                    <td key={cIdx} className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200 border-r border-gray-100 dark:border-gray-600 last:border-0">
                                        {renderInlineMarkdown(cell)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

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
    <div className="flex flex-col items-center gap-1 group mb-1 flex-shrink-0 animate-fade">
      <button
        onClick={() => setActiveTab(id)}
        title={label}
        className={`
          w-9 h-9 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-md active:scale-90
          ${activeTab === id 
            ? 'bg-principal text-white scale-110 shadow-lg ring-4 ring-principal/10' 
            : 'bg-white dark:bg-card-bg text-principal dark:text-principal/90 hover:bg-crema dark:hover:bg-gray-600 hover:scale-105 border border-principal/20 dark:border-gray-500'}
        `}
      >
        <span className="w-4 h-4 sm:w-5 sm:h-5">{icon}</span>
      </button>
      <span className={`text-[8px] sm:text-[9px] lg:text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${activeTab === id ? 'text-principal' : 'text-gray-400 dark:text-gray-500'}`}>
        {label}
      </span>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade pb-10">
      {/* Navbar Style Header */}
      <div className="bg-principal text-white -mx-3 sm:-mx-8 -mt-8 mb-8 p-4 flex items-center gap-4 shadow-xl sticky top-0 z-30 sm:rounded-b-xl border-b border-white/10">
        <button onClick={onBackToModule} className="p-2 hover:bg-white/10 rounded-full transition-colors active:scale-90">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <div className="flex-1 truncate">
          <span className="text-[10px] opacity-70 uppercase tracking-[0.2em] font-black">Tema {topic.id}</span>
          <h2 className="text-sm sm:text-lg font-black truncate leading-tight tracking-tight uppercase">{topic.title}</h2>
        </div>
        {isCompleted && (
          <div className="bg-green-500 text-white p-1.5 rounded-full shadow-lg border border-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
        )}
      </div>

      {/* Navigation Tabs - Circular Design */}
      <div className="flex justify-start sm:justify-center items-start gap-3 sm:gap-6 lg:gap-8 pb-2 overflow-x-auto no-scrollbar py-2 px-3 sm:px-4 lg:px-0">
        <TabButton 
          id="investigacion" 
          label="Estudio" 
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>}
        />
        {content.videoUrl && (
          <TabButton 
            id="video" 
            label="Video" 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>}
          />
        )}
        <TabButton 
          id="ejemploreal" 
          label="Ejemplo" 
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>}
        />
        <TabButton 
          id="infografia" 
          label="Visual" 
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>}
        />
        {content?.mindmapUrl && (
          <TabButton 
            id="mindmap" 
            label="Mapa" 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m4.22-13.22 4.24 4.24M1.54 8.76l4.24 4.24M20.46 8.76l-4.24 4.24M1.54 15.24l4.24-4.24"/></svg>}
          />
        )}
        <TabButton 
          id="flashcards" 
          label="Repaso" 
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>}
        />
        <TabButton 
          id="glosario" 
          label="Glosario" 
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-5"/><path d="M15 13 20 8M15 18h3M15 8h3"/></svg>}
        />
        <TabButton 
          id="referencias" 
          label="Citas" 
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>}
        />
        <TabButton 
          id="quiz" 
          label="Test" 
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>}
        />
      </div>

      {/* Content Area - Bone Card Style */}
      <div className="bg-crema dark:bg-card-bg border border-principal/20 dark:border-gray-600 rounded-2xl sm:rounded-3xl shadow-2xl p-3 sm:p-6 lg:p-10 min-h-[400px] animate-fade relative overflow-hidden">
        {activeTab === 'investigacion' && (
          <div className="space-y-12 animate-fade-in-up">
            {/* Header Section from Image */}
            <div className="flex flex-col sm:flex-row items-baseline gap-4 border-b-2 border-principal/20 pb-4 mb-8">
               <h1 className="text-3xl sm:text-4xl font-black text-principal tracking-tight uppercase">
                 {topic.id}. {topic.title}
               </h1>
            </div>

            {/* Summary Section */}
            <div className="space-y-6">
              <div className="bg-white/80 dark:bg-card-bg/90 p-6 sm:p-8 rounded-2xl border border-principal/20 dark:border-white/30 shadow-inner">
                {renderMarkdown(content.summary)}
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-4 border-l-4 border-principal pl-4">
                <h3 className="text-3xl font-black text-principal dark:text-blue-400 heading-serif">
                  Puntos Estratégicos
                </h3>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {content.keyPoints.slice(0, 6).map((point, idx) => (
                  <div key={idx} className="group relative bg-white dark:bg-card-bg border-b-4 border-r-4 border-principal/10 dark:border-blue-500/30 rounded-2xl p-8 hover:border-principal/30 dark:hover:border-blue-400/50 hover:scale-[1.02] transition-all duration-300 shadow-sm hover:shadow-xl overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-principal dark:bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10 flex flex-col h-full">
                      <p className="text-gray-800 dark:text-white leading-relaxed font-semibold text-lg">
                        {stripEmojis(point)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-12">
               <button 
                onClick={() => setActiveTab('ejemploreal')}
                className="bg-white dark:bg-gray-800 border border-[#003366]/20 dark:border-gray-600 text-[#003366] dark:text-white font-bold px-10 py-5 rounded-xl transition-all shadow-lg hover:shadow-xl hover:bg-[#F5F5DC] dark:hover:bg-gray-700 flex items-center gap-3 text-lg"
               >
                 Ver Ejemplo Real
                 <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
               </button>
            </div>
          </div>
        )}

        {activeTab === 'ejemploreal' && (
          <div className="space-y-12 animate-fade-in-up">
            <h3 className="text-3xl font-black text-principal heading-serif flex items-center gap-3 pb-4 border-b-2 border-principal/10">
              <div className="w-8 h-8 bg-principal flex-shrink-0" />
              Ejemplificación Práctica
            </h3>
            <div className="bg-gradient-to-br from-principal to-principal/80 p-0.5 rounded-2xl shadow-2xl">
              <div className="bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-2xl">
                {renderMarkdown(content.realWorldExample)}
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-8">
               <div className="bg-crema dark:bg-gray-700 p-6 rounded-2xl border border-principal/10 dark:border-principal/20 italic text-carbon dark:text-gray-200">
                  "El análisis de casos reales permite cerrar la brecha entre la teoría académica y la práctica profesional en ingeniería."
               </div>
               <div className="flex items-center justify-center">
                  <button 
                    onClick={() => setActiveTab('flashcards')}
                    className="bg-white dark:bg-gray-800 border border-[#003366]/20 dark:border-gray-600 text-[#003366] dark:text-white font-bold w-full py-5 rounded-xl transition-all shadow-lg hover:shadow-xl hover:bg-[#F5F5DC] dark:hover:bg-gray-700 flex items-center justify-center gap-3"
                  >
                    Ir al Diagnóstico
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                  </button>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'flashcards' && (
          <div className="animate-fade-in-up">
            <Flashcards cards={content.flashcards} />
          </div>
        )}

        {activeTab === 'video' && (
          <div className="animate-fade-in-up space-y-8">
            <h3 className="text-3xl font-black text-principal heading-serif mb-8 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
              Videos Explicativos
            </h3>
            
            {/* Mostrar videos múltiples para tema 3.1 */}
            {topic.id === '3.1' && content.additionalVideos ? (
              <div className="space-y-6">
                <div className="bg-white/70 dark:bg-card-bg border border-principal/15 dark:border-gray-500 rounded-2xl p-4 sm:p-6 shadow-xl relative group">
                  <h4 className="text-xl font-bold text-principal mb-4 heading-serif">Video 3.1: Administración Estratégica por Casos</h4>
                  <YouTubePlayer 
                    videoId={content.videoUrl} 
                    title="Video 3.1: Administración Estratégica por Casos"
                  />
                </div>
                
                <div className="bg-white/70 dark:bg-card-bg border border-principal/15 dark:border-gray-500 rounded-2xl p-4 sm:p-6 shadow-xl relative group">
                  <h4 className="text-xl font-bold text-principal mb-4 heading-serif">Video 3.2: Metodología Ágil</h4>
                  <YouTubePlayer 
                    videoId={content.additionalVideos[0]} 
                    title="Video 3.2: Metodología Ágil"
                  />
                </div>
              </div>
            ) : (
              /* Video único para otros temas */
              <div className="bg-white/70 dark:bg-card-bg border border-principal/15 dark:border-gray-500 rounded-2xl p-4 sm:p-6 shadow-xl relative group">
                {content.videoUrl ? (
                  <YouTubePlayer 
                    videoId={content.videoUrl} 
                    title={`Video del tema ${topic.id}`}
                  />
                ) : (
                  <div className="aspect-video bg-principal/5 rounded-xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-principal/5 z-0" />
                    <div className="relative z-10 text-center max-w-sm px-4">
                      <div className="w-20 h-20 bg-principal text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="8 5 19 12 8 19 8 5"/></svg>
                      </div>
                      <h4 className="text-xl font-bold text-principal mb-2 heading-serif uppercase tracking-tight">Clase Magistral: Tema {topic.id}</h4>
                      <p className="text-carbon/70 dark:text-gray-300 text-sm italic mb-6">Visualiza la explicación detallada del contenido para profundizar en los conceptos teóricos.</p>
                    </div>
                  </div>
                )}
              </div>
            )}

                      </div>
        )}

        {activeTab === 'infografia' && (
          <div className="animate-fade-in-up space-y-8">
            <h3 className="text-3xl font-black text-principal heading-serif mb-8 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
              Recurso Infográfico
            </h3>
            
            <div className="bg-white/70 dark:bg-card-bg border border-principal/15 dark:border-gray-500 rounded-2xl p-4 sm:p-6 shadow-xl">
              <div className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-2xl relative group bg-slate-900 aspect-[4/5] sm:aspect-auto">
                 <div className="absolute inset-0 bg-gradient-to-br from-principal/10 to-transparent z-0" />
                 <img 
                   src={content.infographicUrl} 
                   alt="Infografía Académica" 
                   className="w-full h-full object-contain sm:object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
                 />
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center mt-8 gap-4 px-4">
                <a 
                  href={content.infographicUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center justify-center gap-3 text-white dark:text-white border border-gray-600 dark:border-gray-500 px-8 py-3 rounded-full hover:bg-gray-700 dark:hover:bg-gray-600 transition-all text-sm font-bold uppercase tracking-widest"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Descargar Infografía
                </a>
                <button 
                  onClick={() => window.open(content.infographicUrl, '_blank')}
                  className="flex items-center justify-center gap-3 text-white dark:text-white border border-gray-600 dark:border-gray-500 px-8 py-3 rounded-full hover:bg-gray-700 dark:hover:bg-gray-600 transition-all text-sm font-bold uppercase tracking-widest"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  Vista Pantalla Completa
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'mindmap' && content?.mindmapUrl && (
          <div className="animate-fade-in-up space-y-8">
            <h3 className="text-3xl font-black text-principal heading-serif mb-8 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m4.22-13.22 4.24 4.24M1.54 8.76l4.24 4.24M20.46 8.76l-4.24 4.24M1.54 15.24l4.24-4.24"/></svg>
              Mapa Mental del Tema
            </h3>
            
            <div className="bg-white/70 dark:bg-slate-900 border border-principal/15 dark:border-principal/20 rounded-2xl p-4 sm:p-6 shadow-xl">
              <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl relative group bg-white dark:bg-slate-800">
                <div className="absolute inset-0 bg-gradient-to-br from-principal/5 to-transparent z-0" />
                <div className="w-full h-full min-h-[500px] flex items-center justify-center p-8 relative">
                  {content.mindmapUrl.includes('<svg') ? (
                    <div 
                      className="w-full h-full"
                      dangerouslySetInnerHTML={{ __html: content.mindmapUrl }}
                    />
                  ) : (
                    <img 
                      src={content.mindmapUrl} 
                      alt="Mapa Mental" 
                      className="w-full h-full object-contain max-w-full max-h-full"
                    />
                  )}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center mt-8 gap-4 px-4">
                <a 
                  href={content.mindmapUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center justify-center gap-3 text-principal border border-principal/30 px-8 py-3 rounded-full hover:bg-principal/5 transition-all text-sm font-bold uppercase tracking-widest"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Descargar Mapa Mental
                </a>
                <button className="flex items-center justify-center gap-3 text-white border border-gray-600 px-8 py-3 rounded-full hover:bg-gray-700 transition-all text-sm font-bold uppercase tracking-widest">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  Vista Pantalla Completa
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'glosario' && (
          <div className="animate-fade-in-up space-y-8">
            <h3 className="text-3xl font-black text-principal heading-serif mb-8 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
              Glosario de Términos
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {content.flashcards.map((card, idx) => (
                <div key={idx} className="bg-white/70 dark:bg-card-bg p-6 rounded-2xl border border-principal/15 dark:border-gray-500 shadow-md hover:shadow-lg transition-all">
                  <h4 className="font-bold text-principal text-lg mb-2 heading-serif border-b border-principal/15 dark:border-gray-500 pb-2">{stripEmojis(card.term)}</h4>
                  <p className="text-carbon dark:text-gray-200 text-sm leading-relaxed">{stripEmojis(card.definition)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'referencias' && (
          <div className="animate-fade-in-up space-y-8">
            <h3 className="text-3xl font-black text-principal heading-serif mb-8 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
              Referencias Bibliográficas
            </h3>
            <div className="space-y-6">
              {content.references.map((ref, idx) => (
                <div key={idx} className="bg-white/70 dark:bg-card-bg p-6 rounded-2xl border border-principal/10 dark:border-gray-500 flex gap-5 group hover:bg-white dark:hover:bg-gray-600 hover:border-principal/25 transition-all">
                  <div className="text-principal/20 font-black text-2xl mt-1 select-none">{String(idx + 1).padStart(2, '0')}</div>
                  <div className="flex-1">
                    <p className="text-carbon dark:text-gray-200 text-base leading-relaxed pl-4 -indent-4 heading-serif italic">
                      {stripEmojis(ref.citation)}
                    </p>
                    {ref.url && (
                      <a 
                        href={ref.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 text-[11px] font-black uppercase tracking-[0.2em] mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-full group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors"
                      >
                        <span>Consultar Fuente</span>
                        <svg className="group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      </a>
                    )}
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="space-y-8 animate-fade-in-up">
            <Quiz questions={content.quiz} onFinish={onFinishTopic} />
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 pt-3 sm:pt-4">
        {/* Navegación entre temas */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={navigateToPreviousTopic}
            disabled={!onNavigateToTopic || module.topics.findIndex(t => t.id === topic.id) === 0}
            className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[#003366]/40 bg-white dark:bg-gray-800 hover:bg-[#F5F5DC] dark:hover:bg-gray-700 text-[#003366] dark:text-white font-medium text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Tema anterior
          </button>
          
          <button
            onClick={navigateToNextTopic}
            disabled={!onNavigateToTopic || module.topics.findIndex(t => t.id === topic.id) === module.topics.length - 1}
            className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[#003366]/40 bg-white dark:bg-gray-800 hover:bg-[#F5F5DC] dark:hover:bg-gray-700 text-[#003366] dark:text-white font-medium text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            Tema siguiente
          </button>
        </div>

        {/* Botón volver al módulo */}
        <button
          onClick={onBackToModule}
          className="bg-white dark:bg-gray-800 border border-[#003366]/20 dark:border-gray-600 text-[#003366] dark:text-white font-bold px-4 py-2 sm:px-6 sm:py-3 rounded-xl transition-all shadow-lg hover:shadow-xl hover:bg-[#F5F5DC] dark:hover:bg-gray-700 flex items-center gap-2 sm:gap-3 text-base sm:text-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Volver al módulo
        </button>
      </div>
    </div>
  );
};

const styles = `
  @keyframes fade {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fade {
    animation: fade 0.5s ease-out;
  }
  
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  /* Asegurar que el scroll funcione bien en móviles */
  .overflow-x-auto {
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
  }
  
  /* Espaciado adicional para las últimas pestañas */
  .overflow-x-auto > :last-child {
    margin-right: 1rem;
  }
`;
