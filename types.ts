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

export interface UserProgress {
  uid: string;
  email: string | null;
  name: string | null;
  completedTopics: string[]; // List of Topic IDs
}
