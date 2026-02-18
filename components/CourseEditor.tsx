import React, { useState, useEffect } from 'react';
import { Layout } from './Layout';
import { UserProfile, CourseInstance } from '../types';
import { getCourseById, addAnnouncement, togglePublishCourse } from '../services/courseService';

interface CourseEditorProps {
    user: UserProfile;
    courseId: string;
    onLogout: () => void;
    onBack: () => void;
}

export const CourseEditor: React.FC<CourseEditorProps> = ({ user, courseId, onLogout, onBack }) => {
    const [course, setCourse] = useState<CourseInstance | null>(null);
    const [loading, setLoading] = useState(true);
    const [showAddAnnouncement, setShowAddAnnouncement] = useState(false);
    const [announcementTitle, setAnnouncementTitle] = useState('');
    const [announcementContent, setAnnouncementContent] = useState('');

    useEffect(() => {
        loadCourse();
    }, [courseId]);

    const loadCourse = async () => {
        setLoading(true);
        const data = await getCourseById(courseId);
        setCourse(data);
        setLoading(false);
    };

    const handleAddAnnouncement = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!announcementTitle.trim() || !announcementContent.trim()) return;

        try {
            await addAnnouncement(courseId, announcementTitle, announcementContent);
            setAnnouncementTitle('');
            setAnnouncementContent('');
            setShowAddAnnouncement(false);
            loadCourse();
        } catch (error) {
            console.error("Error adding announcement:", error);
        }
    };

    const handleTogglePublish = async () => {
        if (!course) return;
        try {
            await togglePublishCourse(courseId, !course.isPublished);
            loadCourse();
        } catch (error) {
            console.error("Error toggling publish status:", error);
        }
    };

    if (loading) return <Layout user={user} onLogout={onLogout}><div className="text-white">Cargando...</div></Layout>;
    if (!course) return <Layout user={user} onLogout={onLogout}><div className="text-white">Curso no encontrado.</div></Layout>;

    return (
        <Layout user={user} onLogout={onLogout} onBack={onBack} title={`Gestionar: ${course.title}`} subtitle={`${course.section} - Código: ${courseId}`}>
            <div className="space-y-8">

                {/* Course Status */}
                <div className="bg-slate-800 p-6 rounded-2xl border border-white/10 flex justify-between items-center">
                    <div>
                        <h3 className="text-white font-bold mb-1">Estado del Curso</h3>
                        <p className="text-slate-400 text-sm">
                            {course.isPublished
                                ? "El curso está publicado y visible para los estudiantes."
                                : "El curso está oculto (borrador)."}
                        </p>
                    </div>
                    <button
                        onClick={handleTogglePublish}
                        className={`px-4 py-2 rounded-lg font-bold transition-colors ${course.isPublished ? 'bg-amber-600 hover:bg-amber-500 text-white' : 'bg-green-600 hover:bg-green-500 text-white'}`}
                    >
                        {course.isPublished ? 'Despublicar' : 'Publicar Curso'}
                    </button>
                </div>

                {/* Announcements */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-white">Anuncios</h3>
                        <button
                            onClick={() => setShowAddAnnouncement(true)}
                            className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 rounded text-white text-sm font-medium transition-colors"
                        >
                            + Nuevo Anuncio
                        </button>
                    </div>

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

                {/* Students (Read-only for now) */}
                <div>
                    <h3 className="text-xl font-bold text-white mb-4">Estudiantes Inscritos</h3>
                    <div className="bg-slate-800/50 rounded-xl border border-white/10 p-4">
                        {course.students && course.students.length > 0 ? (
                            <ul className="list-disc list-inside text-slate-300">
                                {course.students.map((stu, i) => <li key={i}>{stu}</li>)}
                            </ul>
                        ) : (
                            <p className="text-slate-500 italic">No hay estudiantes inscritos aún.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Add Announcement Modal */}
            {showAddAnnouncement && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-md">
                        <h3 className="text-lg font-bold text-white mb-4">Nuevo Anuncio</h3>
                        <form onSubmit={handleAddAnnouncement}>
                            <div className="mb-4">
                                <label className="block text-sm text-slate-400 mb-1">Título</label>
                                <input
                                    type="text"
                                    value={announcementTitle}
                                    onChange={e => setAnnouncementTitle(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                                    autoFocus
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm text-slate-400 mb-1">Contenido</label>
                                <textarea
                                    value={announcementContent}
                                    onChange={e => setAnnouncementContent(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500 h-32 resize-none"
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => setShowAddAnnouncement(false)} className="px-3 py-1 text-slate-400 hover:text-white">Cancelar</button>
                                <button type="submit" className="px-4 py-1 bg-cyan-600 rounded text-white font-medium">Publicar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
};
