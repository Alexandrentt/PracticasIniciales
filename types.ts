import { Type } from "@google/genai";

export interface Topic {
  id: string;
  title: string;
}

export interface Module {
  id: number;
  title: string;
  topics: Topic[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface Flashcard {
  term: string;
  definition: string;
}

export interface TopicContent {
  summary: string;
  keyPoints: string[];
  realWorldExample: string;
  quiz: QuizQuestion[];
  flashcards: Flashcard[];
  mindMapUrl: string;
  infographicUrl: string;
  presentationUrl: string;
}

export interface UserProfile {
  uid: string;
  email: string | null;
  name: string | null;
  role: 'admin' | 'professor' | 'student';
  completedTopics: string[];
  enrolledCourses: string[];
}

export interface Resource {
  id: string;
  title: string;
  url: string;
  type: 'pdf' | 'link';
}

export interface CourseTemplate {
  id: string;
  title: string;
  description: string;
  modules: Module[];
  defaultResources: Resource[];
  createdBy: string;
  createdAt: any; // Timestamp
}

export interface CourseInstance {
  id: string;
  templateId: string;
  professorId: string;
  title: string;
  section: string;
  isPublished: boolean;
  students: string[]; // UIDs
}
