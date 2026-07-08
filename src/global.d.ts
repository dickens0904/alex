export {};

interface ProgressRecord {
  lesson_id: number;
  lesson_title?: string;
  completed: boolean;
  score: number;
  time_spent: number;
  created_at: string;
}

interface UserStats {
  totalScore: number;
  completedLessons: number;
  totalPracticeTime: number;
  achievementCount: number;
  dbAvailable: boolean;
}

interface EdgeVoiceInfo {
  id: string;
  name: string;
  lang: string;
  gender: 'male' | 'female';
  accent: string;
  desc: string;
}

interface VoiceListResult {
  voices: EdgeVoiceInfo[];
  available: boolean;
}

interface TtsSpeakResult {
  success: boolean;
  audio?: string;
  error?: string;
}

declare global {
  interface Window {
    electronAPI: {
      // 课程相关
      getLesson: (lessonId: number) => Promise<unknown>;
      getAllLessons: () => Promise<unknown[]>;
      seedLessons: (
        lessons: unknown[]
      ) => Promise<{ success: boolean; count?: number; error?: string }>;

      // 进度相关
      saveProgress: (progress: {
        lesson_id: number;
        user_id: number;
        completed: boolean;
        score: number;
        time_spent: number;
      }) => Promise<unknown>;
      getProgress: (lessonId: number) => Promise<ProgressRecord[]>;
      getAllProgress: () => Promise<ProgressRecord[]>;

      // 统计相关
      getUserStats: () => Promise<UserStats>;

      // 成就相关
      getAchievements: () => Promise<
        { achievement_type: string; achievement_name: string; earned_at: string }[]
      >;
      addAchievement: (achievement: {
        type: string;
        name: string;
      }) => Promise<{ success: boolean; reason?: string }>;

      // Edge TTS 相关
      edgeTtsSpeak: (options: {
        text: string;
        voice?: string;
        rate?: number;
        pitch?: number;
      }) => Promise<TtsSpeakResult>;
      edgeTtsGetVoices: () => Promise<VoiceListResult>;
      edgeTtsTest: () => Promise<{ available: boolean; error?: string }>;
      edgeTtsStop: () => Promise<{ success: boolean }>;
      edgeTtsSpeakSSML?: (ssml: string) => Promise<TtsSpeakResult>;

      // 平台信息
      platform: string;

      // 日志文件
      writeLogFile: (logLine: string) => Promise<{ success: boolean; error?: string }>;
      getLogFilePath: () => Promise<string>;
    };
  }
}
