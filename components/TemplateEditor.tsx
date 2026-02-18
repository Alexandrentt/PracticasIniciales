import React, { useState, useEffect } from 'react';
import { Layout } from './Layout';
import { UserProfile, CourseTemplate, Module, Topic } from '../types';
import { getTemplateById } from '../services/courseService';
import { addModuleToTemplate } from '../services/adminService';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Direct db access for sub-updates or move to service

interface TemplateEditorProps {
    user: UserProfile;
    templateId: string;
    onLogout: () => void;
    onBack: () => void;
}

export const TemplateEditor: React.FC<TemplateEditorProps> = ({ user, templateId, onLogout, onBack }) => {
    const [template, setTemplate] = useState<CourseTemplate | null>(null);
    const [loading, setLoading] = useState(true);
    const [showAddModule, setShowAddModule] = useState(false);
    const [newModuleTitle, setNewModuleTitle] = useState('');

    useEffect(() => {
        loadTemplate();
    }, [templateId]);

    const loadTemplate = async () => {
        setLoading(true);
        const data = await getTemplateById(templateId);
        setTemplate(data);
        setLoading(false);
    };

    const handleAddModule = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newModuleTitle.trim() || !template) return;

        const newModule: Module = {
            id: (template.modules?.length || 0) + 1,
            title: newModuleTitle,
            topics: []
        };

        try {
            await addModuleToTemplate(template.id, newModule);
            setNewModuleTitle('');
            setShowAddModule(false);
            loadTemplate();
        } catch (error) {
            console.error("Error adding module:", error);
        }
    };

    if (loading) return <Layout user={user} onLogout={onLogout}><div className="text-white">Cargando...</div></Layout>;
    if (!template) return <Layout user={user} onLogout={onLogout}><div className="text-white">Plantilla no encontrada.</div></Layout>;

    return (
        <Layout user={user} onLogout={onLogout} onBack={onBack} title={`Editar: ${template.title}`} subtitle="Agrega módulos y temas.">
            <div className="space-y-6">
                {/* Header Actions */}
                <div className="flex justify-end">
                    <button
                        onClick={() => setShowAddModule(true)}
                        className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white font-medium transition-colors flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
                        Agregar Módulo
                    </button>
                </div>

                {/* Modules List */}
                <div className="grid gap-6">
                    {template.modules?.map((module, index) => (
                        <div key={index} className="bg-slate-800 rounded-2xl border border-white/10 overflow-hidden">
                            <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
                                <h3 className="font-bold text-lg text-white">Módulo {module.id}: {module.title}</h3>
                                <span className="text-xs text-slate-400">{module.topics.length} Temas</span>
                            </div>
                            <div className="p-4 space-y-2">
                                {module.topics.map(topic => (
                                    <div key={topic.id} className="flex items-center gap-3 p-2 rounded bg-black/20 text-slate-300">
                                        <span className="text-cyan-500 font-mono text-xs">{topic.id}</span>
                                        <span>{topic.title}</span>
                                    </div>
                                ))}
                                {module.topics.length === 0 && <p className="text-slate-500 text-sm italic">Sin temas.</p>}

                                <button className="w-full py-2 mt-2 border border-dashed border-slate-600 rounded-lg text-slate-500 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors text-sm">
                                    + Agregar Tema
                                </button>
                            </div>
                        </div>
                    ))}
                    {(!template.modules || template.modules.length === 0) && (
                        <div className="text-center py-10 text-slate-500 bg-white/5 rounded-2xl border border-dashed border-white/10">
                            No hay módulos en esta plantilla.
                        </div>
                    )}
                </div>
            </div>

            {/* Add Module Modal */}
            {showAddModule && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-sm">
                        <h3 className="text-lg font-bold text-white mb-4">Nuevo Módulo</h3>
                        <form onSubmit={handleAddModule}>
                            <input
                                type="text"
                                value={newModuleTitle}
                                onChange={e => setNewModuleTitle(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 mb-4"
                                placeholder="Título del módulo"
                                autoFocus
                            />
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => setShowAddModule(false)} className="px-3 py-1 text-slate-400 hover:text-white">Cancelar</button>
                                <button type="submit" className="px-4 py-1 bg-cyan-600 rounded text-white font-medium">Agregar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
};
