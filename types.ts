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

export interface FAQ {
  question: string;
  answer: string;
}

export interface Reference {
  citation: string;
  url?: string;
}

export interface TopicContent {
  summary: string;
  keyPoints: string[];
  realWorldExample: string;
  faqs: FAQ[];
  references: Reference[];
  quiz: QuizQuestion[];
  flashcards: Flashcard[];
  infographicUrl: string;
}

export interface UserProgress {
  uid: string;
  email: string | null;
  name: string | null;
  completedTopics: string[]; // List of Topic IDs
}
