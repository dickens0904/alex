import { contextBridge, ipcRenderer } from 'electron';

interface LessonSeed {
  id: number;
  title: string;
  type: string;
  grammar: string;
  content: unknown;
}

interface ProgressData {
  lesson_id: number;
  user_id: number;
  completed: boolean;
  score: number;
  time_spent: number;
}

// 向渲染进程暴露安全的API
contextBridge.exposeInMainWorld('electronAPI', {
  // 课程相关
  getLesson: (lessonId: number) => ipcRenderer.invoke('get-lesson', lessonId),
  getAllLessons: () => ipcRenderer.invoke('get-all-lessons'),
  seedLessons: (lessons: LessonSeed[]) => ipcRenderer.invoke('seed-lessons', lessons),

  // 进度相关
  saveProgress: (progress: ProgressData) => ipcRenderer.invoke('save-progress', progress),
  getProgress: (lessonId: number) => ipcRenderer.invoke('get-progress', lessonId),
  getAllProgress: () => ipcRenderer.invoke('get-all-progress'),

  // 统计相关
  getUserStats: () => ipcRenderer.invoke('get-user-stats'),

  // 成就相关
  getAchievements: () => ipcRenderer.invoke('get-achievements'),
  addAchievement: (achievement: { type: string; name: string }) =>
    ipcRenderer.invoke('add-achievement', achievement),

  // Edge TTS 相关
  edgeTtsSpeak: (options: { text: string; voice?: string; rate?: number; pitch?: number }) =>
    ipcRenderer.invoke('edge-tts-speak', options),
  edgeTtsGetVoices: () => ipcRenderer.invoke('edge-tts-get-voices'),
  edgeTtsTest: () => ipcRenderer.invoke('edge-tts-test'),
  edgeTtsStop: () => ipcRenderer.invoke('edge-tts-stop'),
  // 本地 TTS 缓存兜底（预生成 MP3）
  ttsCacheGet: (relPath: string) => ipcRenderer.invoke('tts-cache-get', relPath),
  // 本地 TTS 缓存自愈回写（在线合成成功后保存 MP3）
  ttsCachePut: (relPath: string, dataUrl: string) =>
    ipcRenderer.invoke('tts-cache-put', relPath, dataUrl),

  // vosk 离线语音识别（口语练习打分）
  voskCheck: () => ipcRenderer.invoke('vosk-check'),
  voskStart: () => ipcRenderer.invoke('vosk-start'),
  // 16kHz Int16 PCM 音频块（结构化克隆传输 ArrayBuffer）
  voskChunk: (pcm: ArrayBuffer) => ipcRenderer.send('vosk-chunk', pcm),
  // MediaRecorder webm/opus 录音 → 主进程 ffmpeg 解码 16k PCM → 喂识别器
  voskDecode: (recording: ArrayBuffer) => ipcRenderer.invoke('vosk-decode', recording),
  voskFinish: () => ipcRenderer.invoke('vosk-finish'),
  voskAbort: () => ipcRenderer.send('vosk-abort'),

  // 平台信息
  platform: process.platform,

  // 日志文件
  writeLogFile: (logLine: string) => ipcRenderer.invoke('write-log-file', logLine),
  getLogFilePath: () => ipcRenderer.invoke('get-log-file-path'),
});
