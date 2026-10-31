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
  interface ReviewItemRow {
    key: string;
    lesson_id: number;
    practice_type: string;
    exercise: string;
    level: number;
    hits: number;
    misses: number;
    due_at: number;
    updated_at: string;
  }

  interface PracticeReport {
    overview: {
      sessions: number;
      score: number;
      totalScore: number;
      correct: number;
      totalCount: number;
      timeSpent: number;
    };
    skills: {
      type: string;
      sessions: number;
      correct: number;
      totalCount: number;
      accuracy: number;
    }[];
    days: { date: string; sessions: number; score: number; totalScore: number }[];
    review: { total: number; due: number };
  }

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

      // 错题本（间隔重复）
      reviewAll?: () => Promise<ReviewItemRow[]>;
      reviewSave?: (item: {
        key: string;
        lesson_id: number;
        practice_type: string;
        exercise: string;
        level: number;
        hits: number;
        misses: number;
        due_at: number;
      }) => Promise<{ success: boolean; error?: string }>;
      reviewDelete?: (key: string) => Promise<{ success: boolean; error?: string }>;
      reviewStats?: () => Promise<{ total: number; due: number }>;

      // 练习记录 / 学习报告
      logPractice?: (record: {
        lesson_id: number;
        practice_type: string;
        score: number;
        total_score: number;
        correct_count: number;
        total_count: number;
        duration_sec: number;
      }) => Promise<{ success: boolean; error?: string }>;
      getPracticeReport?: () => Promise<PracticeReport | null>;
      exportReport?: (
        format: 'pdf' | 'png'
      ) => Promise<{ success: boolean; path?: string; canceled?: boolean; error?: string }>;

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
      // 本地 TTS 缓存兜底（预生成 MP3，相对 tts-cache/ 的路径）
      ttsCacheGet: (relPath: string) => Promise<TtsSpeakResult>;
      // 本地 TTS 缓存自愈回写（在线合成成功后保存 MP3，相对 tts-cache/ 的路径）
      ttsCachePut?: (
        relPath: string,
        dataUrl: string
      ) => Promise<{ success: boolean; existed?: boolean; error?: string }>;

      // vosk 离线语音识别
      voskCheck?: () => Promise<{ available: boolean; reason: string }>;
      voskStart?: () => Promise<{ ok: boolean; error?: string }>;
      voskChunk?: (pcm: ArrayBuffer) => void;
      voskDecode?: (recording: ArrayBuffer) => Promise<{ ok: boolean; error?: string }>;
      voskFinish?: () => Promise<{ text: string; error?: string }>;
      voskAbort?: () => void;

      // 平台信息
      platform: string;

      // 日志文件
      writeLogFile: (logLine: string) => Promise<{ success: boolean; error?: string }>;
      getLogFilePath: () => Promise<string>;

      // 应用信息
      getAppVersion: () => Promise<string>;
    };
  }
}

// 静态图片资源以 import 方式引入（webpack file-loader 处理）
declare module '*.png' {
  const src: string;
  export default src;
}
declare module '*.jpg' {
  const src: string;
  export default src;
}
declare module '*.svg' {
  const src: string;
  export default src;
}
