import React, { useState, useEffect } from 'react';
import { Layout } from './Layout';
import { UserProfile, CourseInstance, CourseTemplate } from '../types';
import { getTemplates, getProfessorCourses, instantiateCourse } from '../services/courseService';

interface ProfessorDashboardProps {
    user: UserProfile;
    onLogout: () => void;
    onNavigate: (view: any) => void;
}

export const ProfessorDashboard: React.FC<ProfessorDashboardProps> = ({ user, onLogout, onNavigate }) => {
    const [activeTab, setActiveTab] = useState<'my-courses' | 'create'>('my-courses');
    const [myCourses, setMyCourses] = useState<CourseInstance[]>([]);
    const [templates, setTemplates] = useState<CourseTemplate[]>([]);

    // Creation form state
    const [selectedTemplate, setSelectedTemplate] = useState<string>('');
    const [section, setSection] = useState('');
    const [customTitle, setCustomTitle] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        loadMyCourses();
        loadTemplates();
    }, [user.uid]);

    const loadMyCourses = async () => {
        try {
            const courses = await getProfessorCourses(user.uid);
            setMyCourses(courses);
        } catch (error) {
            console.error("Error loading courses:", error);
        }
    };

    const loadTemplates = async () => {
        try {
            const data = await getTemplates();
            setTemplates(data);
        } catch (error) {
            console.error("Error loading templates:", error);
        }
    };

    const handleCreateCourse = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedTemplate || !section || !customTitle) return;

        setIsCreating(true);
        try {
            await instantiateCourse(selectedTemplate, user.uid, section, customTitle);

            // Reset form and switch to list
            setSelectedTemplate('');
            setSection('');
            setCustomTitle('');
            setIsCreating(false);
            setActiveTab('my-courses');
            loadMyCourses();
        } catch (error) {
            console.error("Error creating course instance:", error);
            setIsCreating(false);
        }
    };

    const onSelectTemplate = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const tmplId = e.target.value;
        setSelectedTemplate(tmplId);
        if (tmplId) {
            const tmpl = templates.find(t => t.id === tmplId);
            if (tmpl) setCustomTitle(tmpl.title); // Default title
        }
    };

    return (
        <Layout user={user} onLogout={onLogout} title="Panel de Profesor" subtitle="Gestiona tus cursos e instancias.">

            {/* Tabs */}
            <div className="flex space-x-4 mb-6 border-b border-white/10 pb-1">
                <button
                    onClick={() => setActiveTab('my-courses')}
                    className={`px-4 py-2 font-medium transition-colors ${activeTab === 'my-courses' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-400 hover:text-white'}`}
                >
                    Mis Cursos Activos
                </button>
                <button
                    onClick={() => setActiveTab('create')}
                    className={`px-4 py-2 font-medium transition-colors ${activeTab === 'create' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-400 hover:text-white'}`}
                >
                    Crear Nuevo Curso
                </button>
            </div>

            {activeTab === 'my-courses' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                    {myCourses.map(course => (
                        <div key={course.id} className="bg-slate-800 p-6 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all group relative">
                            <div className="absolute top-4 right-4 text-xs font-bold px-2 py-1 bg-cyan-900/50 text-cyan-300 rounded uppercase">
                                {course.section}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors pr-12">{course.title}</h3>
                            <p className="text-slate-400 text-sm mb-4">Código: <span className="font-mono text-slate-500">{course.id.substring(0, 8)}...</span></p>

                            <div className="flex items-center justify-between text-xs text-slate-500 border-t border-white/10 pt-4 mt-auto">
                                <span>{course.students?.length || 0} Estudiantes</span>
                                <span className={course.isPublished ? "text-green-500" : "text-amber-500"}>{course.isPublished ? "Publicado" : "Borrador"}</span>
                            </div>
                            {/* Navigate to Course Editor */}
                            <button
                                className="absolute inset-0 w-full h-full cursor-pointer focus:outline-none"
                                onClick={() => onNavigate({ type: 'COURSE_EDITOR', courseId: course.id })}
                            ></button>
                        </div>
                    ))}

                    {myCourses.length === 0 && (
                        <div className="col-span-full py-12 text-center text-slate-500 bg-white/5 rounded-2xl border border-dashed border-white/10">
                            <p className="mb-4">No tienes cursos asignados.</p>
                            <button onClick={() => setActiveTab('create')} className="text-cyan-400 hover:underline">Crear uno ahora</button>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'create' && (
                <div className="max-w-2xl mx-auto bg-slate-900 border border-white/10 rounded-2xl p-8 animate-fade-in">
                    <h2 className="text-2xl font-bold text-white mb-6">Instanciar Nuevo Curso</h2>
                    <form onSubmit={handleCreateCourse} className="space-y-6">

                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Seleccionar Plantilla Base</label>
                            <select
                                value={selectedTemplate}
                                onChange={onSelectTemplate}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 mb-1"
                            >
                                <option value="">-- Seleccionar --</option>
                                {templates.map(t => (
                                    <option key={t.id} value={t.id}>{t.title} ({t.modules?.length || 0} Módulos)</option>
                                ))}
                            </select>
                            <p className="text-xs text-slate-500">El curso heredará todos los módulos y recursos de la plantilla.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Sección / Período</label>
                                <input
                                    type="text"
                                    value={section}
                                    onChange={e => setSection(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                                    placeholder="Ej. Sec. A - 2024"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Título del Curso</label>
                                <input
                                    type="text"
                                    value={customTitle}
                                    onChange={e => setCustomTitle(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                                    placeholder="Nombre visible para alumnos"
                                />
                            </div>
                        </div>

                        <div className="pt-6 flex justify-end gap-4 border-t border-white/10">
                            <button
                                type="button"
                                onClick={() => setActiveTab('my-courses')}
                                className="px-6 py-2 text-slate-400 hover:text-white transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isCreating}
                                className="px-8 py-2 bg-cyan-600 rounded-xl text-white font-bold hover:bg-cyan-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isCreating ? 'Creando...' : 'Crear Curso'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

        </Layout>
    );
};
