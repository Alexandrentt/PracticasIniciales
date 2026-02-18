import { db } from '../firebaseConfig';
import { collection, getDocs, query, where, doc, getDoc, addDoc, updateDoc, arrayUnion, documentId } from 'firebase/firestore';
import { CourseTemplate, CourseInstance } from '../types';

export const getTemplates = async (): Promise<CourseTemplate[]> => {
    const q = query(collection(db, "course_templates"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as CourseTemplate));
};

export const getTemplateById = async (templateId: string): Promise<CourseTemplate | null> => {
    const docRef = doc(db, "course_templates", templateId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as CourseTemplate;
    } else {
        return null;
    }
};

export const instantiateCourse = async (
    templateId: string,
    professorId: string,
    section: string,
    title: string
): Promise<string> => {
    const instanceData = {
        templateId,
        professorId,
        section,
        title,
        announcements: [],
        assignments: [],
        students: [],
        isPublished: false,
        createdAt: new Date()
    };

    const docRef = await addDoc(collection(db, "courses"), instanceData);
    return docRef.id;
};

export const getProfessorCourses = async (professorId: string): Promise<CourseInstance[]> => {
    const q = query(collection(db, "courses"), where("professorId", "==", professorId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as CourseInstance));
};

export const getCourseById = async (courseId: string): Promise<CourseInstance | null> => {
    const docRef = doc(db, "courses", courseId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as CourseInstance;
    }
    return null;
};

export const addAnnouncement = async (courseId: string, title: string, content: string) => {
    const courseRef = doc(db, "courses", courseId);
    await updateDoc(courseRef, {
        announcements: arrayUnion({
            id: Date.now().toString(),
            title,
            content,
            date: new Date().toISOString()
        })
    });
};

export const togglePublishCourse = async (courseId: string, isPublished: boolean) => {
    const courseRef = doc(db, "courses", courseId);
    await updateDoc(courseRef, { isPublished });
};

export const getStudentCourses = async (courseIds: string[]): Promise<CourseInstance[]> => {
    if (!courseIds || courseIds.length === 0) return [];

    // Firestore 'in' query supports up to 10 items. For more, we need to batch or split.
    // For this MVP, we'll assume < 10 courses or handle simple slicing.
    const chunks = [];
    for (let i = 0; i < courseIds.length; i += 10) {
        chunks.push(courseIds.slice(i, i + 10));
    }

    let allCourses: CourseInstance[] = [];

    for (const chunk of chunks) {
        const q = query(collection(db, "courses"), where(documentId(), "in", chunk));
        const querySnapshot = await getDocs(q);
        const chunkCourses = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as CourseInstance));
        allCourses = [...allCourses, ...chunkCourses];
    }

    return allCourses;
};
