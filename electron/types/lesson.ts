export interface Vocabulary {
  word: string;
  phonetic: string;
  meaning: string;
  examples: string[];
  image?: string;
}

export interface Sentence {
  english: string;
  chinese: string;
  grammarPoints: string[];
}

export interface Paragraph {
  speaker?: string;
  content: string;
}

export interface TextContent {
  title: string;
  paragraphs: Paragraph[];
  translation: string[];
}

export interface ExerciseContent {
  question?: string;
  options?: string[];
  audioText?: string;
  sentence?: string;
  translation?: string;
  instruction?: string;
  hint?: string;
  meaning?: string;
  example?: string;
  passage?: string;
}

export interface Exercise {
  type: 'listening' | 'speaking' | 'reading' | 'writing' | 'spelling';
  content: ExerciseContent;
  answer: string;
  score: number;
}

export interface GrammarExample {
  english: string;
  chinese: string;
}

export interface GrammarExercise {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface GrammarDetail {
  title: string;
  explanation: string;
  rules: string[];
  examples: GrammarExample[];
  exercises: GrammarExercise[];
  tips?: string[];
}

export interface Lesson {
  id: number;
  title: string;
  type: 'new' | 'review';
  grammar: string;
  grammarDetail?: GrammarDetail;
  tense?: string;
  content: {
    vocabulary: Vocabulary[];
    sentences: Sentence[];
    text: TextContent;
    exercises: Exercise[];
  };
  illustration?: string;
}
