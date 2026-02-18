import React, { useState, useEffect } from 'react';
import { Layout } from './Layout';
import { UserProfile, CourseTemplate } from '../types';
import { getTemplates } from '../services/courseService';
import { createTemplate } from '../services/adminService';

interface AdminDashboardProps {
    user: UserProfile;
    onLogout: () => void;
    onNavigate: (view: any) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout, onNavigate }) => {
    const [templates, setTemplates] = useState<CourseTemplate[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newDesc, setNewDesc] = useState('');

    useEffect(() => {
        loadTemplates();
    }, []);

    const loadTemplates = async () => {
        try {
            const data = await getTemplates();
            setTemplates(data);
        } catch (error) {
            console.error("Error loading templates:", error);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle.trim()) return;

        try {
            await createTemplate(newTitle, newDesc, user.uid);
            setNewTitle('');
            setNewDesc('');
            setIsCreating(false);
            loadTemplates(); // Refresh list
        } catch (error) {
            console.error("Error creating template:", error);
        }
    };

    return (
        <Layout user={user} onLogout={onLogout} title="Panel de Administración" subtitle="Gestiona las plantillas de cursos.">

            {/* Action Bar */}
            <div className="flex justify-end mb-8">
                <button
                    onClick={() => setIsCreating(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-xl text-white font-bold hover:shadow-lg hover:shadow-cyan-500/20 transition-all transform hover:-translate-y-0.5"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
                    Nueva Plantilla
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map(template => (
                    <div key={template.id} className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-cyan-500/30 hover:bg-white/10 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg className="text-slate-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{template.title}</h3>
                        <p className="text-slate-400 text-sm line-clamp-3 mb-6">{template.description || "Sin descripción."}</p>

                        <div className="flex items-center justify-between text-xs text-slate-500 border-t border-white/10 pt-4 mt-auto">
                            <span className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
                                {template.modules?.length || 0} Módulos
                            </span>
                            <span className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                                {template.createdAt ? new Date(template.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                            </span>
                        </div>
                        {/* Click to edit */}
                        <button
                            className="absolute inset-0 w-full h-full cursor-pointer focus:outline-none"
                            onClick={() => onNavigate({ type: 'TEMPLATE_EDITOR', templateId: template.id })}
                        ></button>
                    </div>
                ))}

                {templates.length === 0 && (
                    <div className="col-span-full py-12 text-center text-slate-500">
                        <p>No hay plantillas creadas aún.</p>
                    </div>
                )}
            </div>

            {/* Basic Create Modal */}
            {isCreating && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl shadow-cyan-900/20">
                        <h2 className="text-xl font-bold text-white mb-6">Nueva Plantilla de Curso</h2>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Título</label>
                                <input
                                    type="text"
                                    value={newTitle}
                                    onChange={e => setNewTitle(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600"
                                    placeholder="Ej. Matemática Básica"
                                    autoFocus
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Descripción</label>
                                <textarea
                                    value={newDesc}
                                    onChange={e => setNewDesc(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600 h-32 resize-none"
                                    placeholder="Descripción breve del curso..."
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t border-white/10 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsCreating(false)}
                                    className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg text-white font-bold hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
                                >
                                    Crear Plantilla
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
};
