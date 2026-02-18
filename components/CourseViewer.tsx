import React, { useState, useEffect } from 'react';
import { Layout } from './Layout';
import { UserProfile, CourseInstance } from '../types';
import { getCourseById } from '../services/courseService';

interface CourseViewerProps {
    user: UserProfile;
    courseId: string;
    onLogout: () => void;
    onBack: () => void;
}

export const CourseViewer: React.FC<CourseViewerProps> = ({ user, courseId, onLogout, onBack }) => {
    const [course, setCourse] = useState<CourseInstance | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCourse();
    }, [courseId]);

    const loadCourse = async () => {
        setLoading(true);
        const data = await getCourseById(courseId);
        setCourse(data);
        setLoading(false);
    };

    if (loading) return <Layout user={user} onLogout={onLogout}><div className="text-white">Cargando...</div></Layout>;
    if (!course) return <Layout user={user} onLogout={onLogout}><div className="text-white">Curso no encontrado.</div></Layout>;

    return (
        <Layout user={user} onLogout={onLogout} onBack={onBack} title={course.title} subtitle={`${course.section}`}>
            <div className="space-y-8 animate-fade-in">

                {/* Announcements */}
                <div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                        Anuncios
                    </h3>
                    <div className="space-y-4">
                        {course.announcements && course.announcements.length > 0 ? (
                            course.announcements.map((ann, idx) => (
                                <div key={idx} className="bg-slate-800/50 rounded-xl border border-white/10 p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="text-white font-bold">{ann.title}</h4>
                                        <span className="text-xs text-slate-500">{new Date(ann.date).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-slate-300 text-sm whitespace-pre-wrap">{ann.content}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-slate-500 italic">No hay anuncios publicados.</p>
                        )}
                    </div>
                </div>

                {/* Course Modules (Placeholder for now, usually linked to Template's modules) */}
                <div>
                    <h3 className="text-xl font-bold text-white mb-4">Contenido del Curso</h3>
                    <div className="bg-slate-800/50 rounded-xl border border-white/10 p-6 text-center">
                        <p className="text-slate-400 mb-4">El contenido de los módulos se cargará desde la plantilla.</p>
                        <p className="text-sm text-slate-500">(Función en desarrollo: unir `templateId` con la vista de módulos)</p>
                    </div>
                </div>

                {/* Assignments (Placeholder) */}
                <div>
                    <h3 className="text-xl font-bold text-white mb-4">Tareas</h3>
                    <div className="text-slate-500 italic">No hay tareas asignadas.</div>
                </div>

            </div>
        </Layout>
    );
};
