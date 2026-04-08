
export interface Topic {
  id: string;
  title: string;
  author?: string;
}

export interface Module {
  id: number;
  title: string;
  topics: Topic[];
}

export type QuestionType = 'multiple-choice' | 'true-false';

export interface QuizQuestion {
  question: string;
  type: QuestionType;
  options?: string[]; // Opcional para true-false
  correctAnswerIndex?: number; // Para multiple-choice
  correctAnswer?: boolean; // Para true-false
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
  author?: string;
}

export interface UserProgress {
  uid: string;
  email: string | null;
  name: string | null;
  completedTopics: string[]; // List of Topic IDs
}
