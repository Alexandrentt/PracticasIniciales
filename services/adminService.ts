import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { CourseTemplate, Module, Resource } from '../types';

export const createTemplate = async (
    title: string,
    description: string,
    adminUid: string
): Promise<string> => {
    const templateData = {
        title,
        description,
        modules: [],
        defaultResources: [],
        createdBy: adminUid,
        createdAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, "course_templates"), templateData);
    return docRef.id;
};

export const addModuleToTemplate = async (templateId: string, module: Module) => {
    const templateRef = doc(db, "course_templates", templateId);
    await updateDoc(templateRef, {
        modules: arrayUnion(module)
    });
};

export const addResourceToTemplate = async (templateId: string, resource: Resource) => {
    const templateRef = doc(db, "course_templates", templateId);
    await updateDoc(templateRef, {
        defaultResources: arrayUnion(resource)
    });
};
