import React, { useState, useEffect } from 'react';
import { Layout } from './Layout';
import { UserProfile, CourseInstance } from '../types';
import { getStudentCourses } from '../services/courseService';

interface StudentDashboardProps {
    user: UserProfile;
    onLogout: () => void;
    onNavigate: (view: any) => void;
    onLoginClick: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, onLogout, onNavigate, onLoginClick }) => {
    const [courses, setCourses] = useState<CourseInstance[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && user.enrolledCourses && user.enrolledCourses.length > 0) {
            loadCourses();
        } else {
            setLoading(false);
        }
    }, [user]);

    const loadCourses = async () => {
        try {
            const data = await getStudentCourses(user.enrolledCourses);
            // Filter only published courses for students
            setCourses(data.filter(c => c.isPublished));
        } catch (error) {
            console.error("Error loading student courses:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout
            user={user}
            onLogout={onLogout}
            onLoginClick={onLoginClick}
            title="Mis Cursos"
            subtitle="Accede a tus cursos inscritos."
        >
            {loading ? (
                <div className="text-white text-center py-10">Cargando cursos...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                    {courses.map(course => (
                        <div
                            key={course.id}
                            onClick={() => onNavigate({ type: 'COURSE_VIEWER', courseId: course.id })} // We need a viewer for students
                            className="bg-slate-800 p-6 rounded-2xl border border-white/10 hover:border-cyan-500/30 hover:bg-white/5 transition-all group relative cursor-pointer"
                        >
                            <div className="absolute top-4 right-4 text-xs font-bold px-2 py-1 bg-cyan-900/50 text-cyan-300 rounded uppercase">
                                {course.section}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{course.title}</h3>
                            <div className="flex items-center justify-between text-xs text-slate-500 border-t border-white/10 pt-4 mt-auto">
                                <span>{course.announcements?.length || 0} Anuncios</span>
                                <span className="flex items-center gap-1 text-cyan-500">
                                    Entrar <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                </span>
                            </div>
                        </div>
                    ))}

                    {courses.length === 0 && (
                        <div className="col-span-full py-12 text-center text-slate-500 bg-white/5 rounded-2xl border border-dashed border-white/10">
                            <p className="mb-4">No estás inscrito en ningún curso activo.</p>
                            <p className="text-sm">Contacta a tu profesor para obtener el código de inscripción.</p>
                        </div>
                    )}
                </div>
            )}
        </Layout>
    );
};
