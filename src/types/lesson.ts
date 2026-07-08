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

// 语法示例
export interface GrammarExample {
  english: string;
  chinese: string;
  grammarPoint?: string; // 语法点标记
  audio?: string; // 音频文件
}

// 语法练习题类型
export type GrammarExerciseType = 'choice' | 'fill' | 'match' | 'order' | 'transform';

// 语法练习题
export interface GrammarExercise {
  type?: GrammarExerciseType; // 练习类型（向后兼容，不填默认为'choice'）
  question: string;
  options?: string[]; // 选择题选项
  answer?: string | number; // 正确答案（填空题可选，可通过fillAnswer推断）
  explanation: string; // 解释
  hint?: string; // 提示
  fillAnswer?: string; // 填空题答案（自动作为answer使用）
  correctOrder?: string[]; // 排序题正确顺序
  matchPairs?: { left: string; right: string }[]; // 配对题
}

// 语法可视化规则
export interface GrammarRuleVisual {
  type: 'formula' | 'table' | 'diagram' | 'comparison';
  content: Record<string, unknown>;
}

// 语法详情
export interface GrammarDetail {
  title: string; // 语法标题，如"be动词的用法"
  subtitle?: string; // 副标题
  explanation: string; // 语法讲解（中文）
  visualRules?: GrammarRuleVisual[]; // 可视化规则
  rules: string[]; // 语法规则列表
  examples: GrammarExample[]; // 语法例句（增强版）
  exercises: GrammarExercise[]; // 语法练习题（增强版）
  tips?: string[]; // 学习技巧/注意事项
  relatedLessons?: number[]; // 相关课程
  difficulty?: 'easy' | 'medium' | 'hard'; // 难度等级
  keywords?: string[]; // 关键词汇
}

export interface Lesson {
  id: number;
  title: string;
  type: 'new' | 'review';
  grammar: string;
  grammarDetail?: GrammarDetail; // 详细语法讲解
  tense?: string;
  content: {
    vocabulary: Vocabulary[];
    sentences: Sentence[];
    text: TextContent;
    exercises: Exercise[];
  };
  illustration?: string;
}
