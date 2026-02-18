import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { doc, setDoc, serverTimestamp, writeBatch } from 'firebase/firestore';
import { COURSE_MODULES, TOPIC_CONTENT_DATA } from '../constants';
import { CourseTemplate } from '../types';

export const MigrationScript = () => {
    const [status, setStatus] = useState<string>('Ready to migrate');
    const [isMigrating, setIsMigrating] = useState(false);

    const migrateData = async () => {
        setIsMigrating(true);
        setStatus('Starting migration...');

        try {
            const batch = writeBatch(db);

            // 1. Create Course Template
            const templateId = 'ingenieria-proyectos-master';
            const templateRef = doc(db, 'course_templates', templateId);

            const templateData: CourseTemplate = {
                id: templateId,
                title: 'Planificación de Proyectos de Ingeniería',
                description: 'Curso fundamental sobre gestión y planificación de proyectos de ingeniería, cubriendo desde la conceptualización hasta la implementación y cierre.',
                modules: COURSE_MODULES,
                defaultResources: [], // Can be populated later
                createdBy: 'admin',
                createdAt: serverTimestamp()
            };

            batch.set(templateRef, templateData);

            // 2. Create Content Sub-collection
            // Note: Batches are limited to 500 ops. We have ~20 topics so it's fine.
            Object.entries(TOPIC_CONTENT_DATA).forEach(([topicId, content]) => {
                const contentRef = doc(db, 'course_templates', templateId, 'content', topicId);
                batch.set(contentRef, content);
            });

            await batch.commit();
            setStatus('Migration Successful! Data written to Firestore.');
            console.log('Migration completed successfully');

        } catch (error: any) {
            console.error('Migration failed:', error);
            setStatus(`Migration Failed: ${error.message}`);
        } finally {
            setIsMigrating(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 bg-slate-900 p-6 rounded-xl border border-white/10 shadow-2xl z-50 max-w-sm">
            <h3 className="text-xl font-bold text-white mb-2">Admin Migration Tool</h3>
            <p className="text-slate-400 mb-4 text-sm">{status}</p>
            <button
                onClick={migrateData}
                disabled={isMigrating}
                className={`w-full py-2 rounded-lg font-bold transition-all ${isMigrating
                        ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-lg shadow-cyan-500/20'
                    }`}
            >
                {isMigrating ? 'Migrating...' : 'Run Migration'}
            </button>
        </div>
    );
};
