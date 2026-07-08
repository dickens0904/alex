import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { pathToFileURL as _pathToFileURL } from 'url';
import { webcrypto } from 'crypto';
import { initDatabase, getDatabase, isDatabaseAvailable } from './database/init';

// msedge-tts 需要 crypto 模块
if (!globalThis.crypto) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).crypto = webcrypto;
}

// Edge TTS 相关（使用 msedge-tts 替代旧的 edge-tts）
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let edgeTTSModule: any = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let msEdgeTTS: any = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let outputFormatMP3: any = null;

// 当前正在进行的 TTS 请求控制器（用于取消旧请求）
let currentTtsAbortController: AbortController | null = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let currentTtsStream: any = null;

// 尝试加载 msedge-tts
async function loadEdgeTTS() {
  try {
    // 优先使用 msedge-tts（更新、更稳定）
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
    msEdgeTTS = new MsEdgeTTS();
    outputFormatMP3 = OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3;
    console.log('[Edge TTS] msedge-tts 模块加载成功');
    return true;
  } catch (error) {
    console.error('[Edge TTS] msedge-tts 加载失败，尝试旧版 edge-tts:', error);
    try {
      // 降级到旧版 edge-tts（使用 require 直接加载）
      const edgeTtsOutPath = path.resolve(__dirname, '../../../node_modules/edge-tts/out/index.js');
      edgeTTSModule = require(edgeTtsOutPath);
      console.log('[Edge TTS] 旧版 edge-tts 模块加载成功');
      return true;
    } catch (error2) {
      console.error('[Edge TTS] 所有 TTS 模块加载失败:', error2);
      return false;
    }
  }
}

let mainWindow: BrowserWindow | null = null;

// ==================== 单实例锁：防止多开 ====================
let gotTheLock = false;
let isSandboxEnv = false;
try {
  gotTheLock = app.requestSingleInstanceLock();
  // 检查 lockfile 是否真的存在（沙箱可能阻止了创建）
  if (!gotTheLock) {
    const lockfilePath = path.join(app.getPath('userData'), 'lockfile');
    if (!fs.existsSync(lockfilePath)) {
      // lockfile 不存在，说明是沙箱阻止了创建，不是真的有另一个实例
      isSandboxEnv = true;
      gotTheLock = true;
    }
  }
} catch (e) {
  isSandboxEnv = true;
  gotTheLock = true;
}

if (!gotTheLock) {
  // 真的有另一个实例在运行
  console.log('[单实例] 检测到已有实例运行，当前实例退出');
  app.quit();
} else {
  if (isSandboxEnv) {
    console.warn('[单实例] 锁文件创建受限（沙箱环境），允许继续运行');
  }

  // 当第二个实例试图启动时，聚焦到第一个实例的窗口
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
      console.log('[单实例] 聚焦到已有窗口');
    }
  });

  const createWindow = (): void => {
    mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      minWidth: 1024,
      minHeight: 768,
      backgroundColor: '#FFF5E6',
      show: false,
      webPreferences: {
        contextIsolation: true,
        nodeIntegration: false,
        sandbox: true,
        preload: path.join(__dirname, 'preload.js'),
      },
    });

    // ==================== 日志文件写入 ====================
    const logFilePath = path.join(__dirname, '..', '..', 'logs', 'app-test.log');
    console.log('[日志] 日志文件路径:', logFilePath);

    // 确保目录存在
    try {
      const logDir = path.dirname(logFilePath);
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }
      fs.writeFileSync(logFilePath, '', { encoding: 'utf-8' });
      console.log('[日志] 日志文件创建成功');
    } catch (e) {
      console.error('[日志] 日志文件创建失败:', e);
    }

    ipcMain.handle('write-log-file', (_event, logLine: string) => {
      try {
        fs.appendFileSync(logFilePath, logLine + '\n', { encoding: 'utf-8' });
        return { success: true };
      } catch (error) {
        console.error('[日志] 写入失败:', error);
        return { success: false, error: String(error) };
      }
    });

    ipcMain.handle('get-log-file-path', () => {
      return logFilePath;
    });

    // 加载应用
    if (process.env.NODE_ENV === 'development') {
      mainWindow.loadURL('http://localhost:3000');
    } else {
      // 注意：__dirname 是 dist/electron/electron/，renderer 在 dist/renderer/
      const rendererPath = path.join(__dirname, '../../renderer/index.html');
      console.log('加载渲染器路径:', rendererPath);
      mainWindow.loadFile(rendererPath);
    }

    // 打开 DevTools 方便调试
    mainWindow.webContents.on('did-finish-load', () => {
      mainWindow?.webContents.openDevTools({ mode: 'bottom' });
    });

    // 拦截前端 TTS 日志输出到主进程控制台
    mainWindow.webContents.on('console-message', (event, level, message) => {
      if (message.startsWith('[TTS]')) {
        console.log(`[Renderer] ${message}`);
      }
    });

    // 窗口准备好后显示
    mainWindow.once('ready-to-show', () => {
      mainWindow?.show();
    });

    mainWindow.on('closed', () => {
      mainWindow = null;
    });
  };

  // 应用准备就绪
  app.whenReady().then(() => {
    // 初始化数据库
    try {
      initDatabase();
      console.log('数据库初始化成功');
    } catch (error) {
      console.error('数据库初始化失败:', error);
    }

    // 创建窗口
    createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  });

  // 所有窗口关闭时退出应用
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  // IPC通信处理
  ipcMain.handle('get-lesson', async (event, lessonId: number) => {
    // 从数据库获取课程数据
    const { getLessonById } = await import('./database/lessons');
    return getLessonById(lessonId);
  });

  ipcMain.handle('get-all-lessons', async () => {
    const { getAllLessons } = await import('./database/lessons');
    return getAllLessons();
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ipcMain.handle('save-progress', async (event, progress: any) => {
    const { saveProgress } = await import('./database/progress');
    return saveProgress(progress);
  });

  ipcMain.handle('get-progress', async (event, lessonId: number) => {
    const { getProgressByLesson } = await import('./database/progress');
    return getProgressByLesson(lessonId);
  });

  // 批量保存课程数据到数据库
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ipcMain.handle('seed-lessons', async (event, lessons: any[]) => {
    try {
      const { saveLessons } = await import('./database/lessons');
      saveLessons(lessons);
      console.log(`已保存 ${lessons.length} 课数据到数据库`);
      return { success: true, count: lessons.length };
    } catch (error) {
      console.error('课程数据保存失败:', error);
      return { success: false, error: String(error) };
    }
  });

  // 获取用户学习统计
  ipcMain.handle('get-user-stats', async () => {
    try {
      if (!isDatabaseAvailable()) {
        return {
          totalScore: 0,
          completedLessons: 0,
          totalPracticeTime: 0,
          achievementCount: 0,
          dbAvailable: false,
        };
      }
      const db = getDatabase();
      const totalScore = db
        .prepare('SELECT COALESCE(SUM(score), 0) as total FROM progress')
        .get() as { total: number };
      const completedLessons = db
        .prepare('SELECT COUNT(DISTINCT lesson_id) as count FROM progress WHERE completed = 1')
        .get() as { count: number };
      const totalPracticeTime = db
        .prepare('SELECT COALESCE(SUM(time_spent), 0) as total FROM progress')
        .get() as { total: number };
      const achievementCount = db
        .prepare('SELECT COUNT(*) as count FROM achievements WHERE user_id = 1')
        .get() as { count: number };
      return {
        totalScore: totalScore.total,
        completedLessons: completedLessons.count,
        totalPracticeTime: totalPracticeTime.total,
        achievementCount: achievementCount.count,
        dbAvailable: true,
      };
    } catch (error) {
      console.error('获取统计失败:', error);
      return {
        totalScore: 0,
        completedLessons: 0,
        totalPracticeTime: 0,
        achievementCount: 0,
        dbAvailable: false,
      };
    }
  });

  // 获取所有学习进度
  ipcMain.handle('get-all-progress', async () => {
    try {
      const db = getDatabase();
      return db
        .prepare(
          `
      SELECT p.*, l.title as lesson_title 
      FROM progress p 
      LEFT JOIN lessons l ON p.lesson_id = l.id 
      WHERE p.user_id = 1 
      ORDER BY p.created_at DESC
    `
        )
        .all();
    } catch (error) {
      console.error('获取进度失败:', error);
      return [];
    }
  });

  // 获取成就列表
  ipcMain.handle('get-achievements', async () => {
    try {
      const db = getDatabase();
      return db
        .prepare('SELECT * FROM achievements WHERE user_id = 1 ORDER BY earned_at DESC')
        .all();
    } catch (error) {
      console.error('获取成就失败:', error);
      return [];
    }
  });

  // 添加成就
  ipcMain.handle('add-achievement', async (event, achievement: { type: string; name: string }) => {
    try {
      const db = getDatabase();
      const existing = db
        .prepare('SELECT id FROM achievements WHERE user_id = 1 AND achievement_type = ?')
        .get(achievement.type);
      if (existing) return { success: false, reason: 'already_earned' };
      db.prepare(
        'INSERT INTO achievements (user_id, achievement_type, achievement_name) VALUES (1, ?, ?)'
      ).run(achievement.type, achievement.name);
      return { success: true };
    } catch (error) {
      console.error('添加成就失败:', error);
      return { success: false, error: String(error) };
    }
  });

  // ==================== Edge TTS 相关 IPC ====================

  // 可用的语音列表（扩展多角色声音）
  const VOICE_MAP: Record<string, string> = {
    // ===== 美式英语 =====
    // 女声
    'en-US-AriaNeural': 'en-US-AriaNeural',
    'en-US-JennyNeural': 'en-US-JennyNeural',
    'en-US-MichelleNeural': 'en-US-MichelleNeural',
    'en-US-MonicaNeural': 'en-US-MonicaNeural',
    'en-US-AnaNeural': 'en-US-AnaNeural',
    // 男声
    'en-US-GuyNeural': 'en-US-GuyNeural',
    'en-US-DavisNeural': 'en-US-DavisNeural',
    'en-US-TonyNeural': 'en-US-TonyNeural',
    'en-US-JasonNeural': 'en-US-JasonNeural',
    'en-US-SteffanNeural': 'en-US-SteffanNeural',
    // ===== 英式英语 =====
    // 女声
    'en-GB-SoniaNeural': 'en-GB-SoniaNeural',
    'en-GB-LibbyNeural': 'en-GB-LibbyNeural',
    'en-GB-MaisieNeural': 'en-GB-MaisieNeural',
    // 男声
    'en-GB-RyanNeural': 'en-GB-RyanNeural',
    'en-GB-ThomasNeural': 'en-GB-ThomasNeural',
    'en-GB-AlfieNeural': 'en-GB-AlfieNeural',
    // ===== 中文语音 =====
    'zh-CN-XiaoxiaoNeural': 'zh-CN-XiaoxiaoNeural',
    'zh-CN-XiaoyiNeural': 'zh-CN-XiaoyiNeural',
    'zh-CN-YunxiNeural': 'zh-CN-YunxiNeural',
    'zh-CN-YunyangNeural': 'zh-CN-YunyangNeural',

    // ===== 保留旧的别名映射（向后兼容） =====
    'en-female': 'en-US-AriaNeural',
    'en-male': 'en-US-GuyNeural',
    'en-female-uk': 'en-GB-SoniaNeural',
    'en-male-uk': 'en-GB-RyanNeural',
    'zh-female': 'zh-CN-XiaoxiaoNeural',
    'zh-male': 'zh-CN-YunxiNeural',
  };

  // 语音展示信息（供前端UI使用）
  const VOICE_DISPLAY_LIST = [
    // 美式女声
    {
      id: 'en-US-AriaNeural',
      name: 'Aria',
      lang: 'en-US',
      gender: 'female',
      accent: '美式',
      desc: '温暖自然',
    },
    {
      id: 'en-US-JennyNeural',
      name: 'Jenny',
      lang: 'en-US',
      gender: 'female',
      accent: '美式',
      desc: '活泼明亮',
    },
    {
      id: 'en-US-MichelleNeural',
      name: 'Michelle',
      lang: 'en-US',
      gender: 'female',
      accent: '美式',
      desc: '沉稳清晰',
    },
    {
      id: 'en-US-MonicaNeural',
      name: 'Monica',
      lang: 'en-US',
      gender: 'female',
      accent: '美式',
      desc: '柔和甜美',
    },
    {
      id: 'en-US-AnaNeural',
      name: 'Ana',
      lang: 'en-US',
      gender: 'female',
      accent: '美式',
      desc: '童声清脆',
    },
    // 美式男声
    {
      id: 'en-US-GuyNeural',
      name: 'Guy',
      lang: 'en-US',
      gender: 'male',
      accent: '美式',
      desc: '轻松友好',
    },
    {
      id: 'en-US-DavisNeural',
      name: 'Davis',
      lang: 'en-US',
      gender: 'male',
      accent: '美式',
      desc: '低沉磁性',
    },
    {
      id: 'en-US-TonyNeural',
      name: 'Tony',
      lang: 'en-US',
      gender: 'male',
      accent: '美式',
      desc: '活力阳光',
    },
    {
      id: 'en-US-JasonNeural',
      name: 'Jason',
      lang: 'en-US',
      gender: 'male',
      accent: '美式',
      desc: '成熟稳重',
    },
    {
      id: 'en-US-SteffanNeural',
      name: 'Steffan',
      lang: 'en-US',
      gender: 'male',
      accent: '美式',
      desc: '清晰标准',
    },
    // 英式女声
    {
      id: 'en-GB-SoniaNeural',
      name: 'Sonia',
      lang: 'en-GB',
      gender: 'female',
      accent: '英式',
      desc: '优雅纯正',
    },
    {
      id: 'en-GB-LibbyNeural',
      name: 'Libby',
      lang: 'en-GB',
      gender: 'female',
      accent: '英式',
      desc: '甜美可爱',
    },
    {
      id: 'en-GB-MaisieNeural',
      name: 'Maisie',
      lang: 'en-GB',
      gender: 'female',
      accent: '英式',
      desc: '活泼开朗',
    },
    // 英式男声
    {
      id: 'en-GB-RyanNeural',
      name: 'Ryan',
      lang: 'en-GB',
      gender: 'male',
      accent: '英式',
      desc: '绅士风度',
    },
    {
      id: 'en-GB-ThomasNeural',
      name: 'Thomas',
      lang: 'en-GB',
      gender: 'male',
      accent: '英式',
      desc: '庄重有力',
    },
    {
      id: 'en-GB-AlfieNeural',
      name: 'Alfie',
      lang: 'en-GB',
      gender: 'male',
      accent: '英式',
      desc: '年轻朝气',
    },
  ];

  // 清理当前 TTS 请求
  const cleanupTtsRequest = (): void => {
    if (currentTtsAbortController) {
      try {
        currentTtsAbortController.abort();
      } catch {
        /* ignore */
      }
      currentTtsAbortController = null;
    }
    if (currentTtsStream) {
      try {
        currentTtsStream.destroy();
      } catch {
        /* ignore */
      }
      currentTtsStream = null;
    }
  };

  // Edge TTS 生成音频（支持 msedge-tts 和旧版 edge-tts）
  ipcMain.handle(
    'edge-tts-speak',
    async (
      event,
      options: {
        text: string;
        voice?: string;
        rate?: number;
        pitch?: number;
      }
    ) => {
      try {
        // 取消上一个正在进行的 TTS 请求，避免并发冲突
        cleanupTtsRequest();

        if (!msEdgeTTS && !edgeTTSModule) {
          const loaded = await loadEdgeTTS();
          if (!loaded) {
            return { success: false, error: 'Edge TTS 模块加载失败' };
          }
        }

        const voiceKey = options.voice || 'en-female';
        const voiceName = VOICE_MAP[voiceKey] || voiceKey;

        const ratePercent = options.rate ? Math.round((options.rate - 1) * 100) : 0;
        const rateStr = ratePercent >= 0 ? `+${ratePercent}%` : `${ratePercent}%`;

        const pitchHz = options.pitch ? Math.round((options.pitch - 1) * 50) : 0;
        const pitchStr = pitchHz >= 0 ? `+${pitchHz}Hz` : `${pitchHz}Hz`;

        console.log(
          `[Edge TTS] 生成语音: "${options.text.substring(0, 30)}..." voice=${voiceName} rate=${rateStr}`
        );

        let audioBuffer: Buffer;
        const abortController = new AbortController();
        currentTtsAbortController = abortController;

        if (msEdgeTTS) {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const { MsEdgeTTS } = require('msedge-tts');
          const tts = new MsEdgeTTS();
          await tts.setMetadata(voiceName, outputFormatMP3, {});
          const { audioStream } = tts.toStream(options.text, {
            rate: rateStr,
            pitch: pitchStr,
          });
          currentTtsStream = audioStream;

          audioBuffer = await new Promise<Buffer>((resolve, reject) => {
            const chunks: Buffer[] = [];
            let completed = false;

            const finalize = () => {
              if (completed) return;
              completed = true;
              // 关闭 TTS WebSocket
              try { tts.close(); } catch (_) {}
              // 清除全局引用（仅当仍然是当前请求时）
              if (currentTtsStream === audioStream) {
                currentTtsStream = null;
              }
              if (currentTtsAbortController === abortController) {
                currentTtsAbortController = null;
              }
              resolve(Buffer.concat(chunks));
            };

            const fail = (err: Error) => {
              if (completed) return;
              completed = true;
              try { tts.close(); } catch (_) {}
              if (currentTtsStream === audioStream) {
                currentTtsStream = null;
              }
              if (currentTtsAbortController === abortController) {
                currentTtsAbortController = null;
              }
              reject(err);
            };

            audioStream.on('data', (chunk: Buffer) => {
              if (!completed && !abortController.signal.aborted) {
                chunks.push(chunk);
              }
            });
            audioStream.on('end', finalize);
            audioStream.on('close', finalize);
            audioStream.on('error', (err: Error) => {
              if (abortController.signal.aborted) {
                finalize();
              } else {
                fail(err);
              }
            });

            abortController.signal.addEventListener('abort', () => {
              fail(new Error('TTS_REQUEST_ABORTED'));
            });
          });
        } else if (edgeTTSModule) {
          audioBuffer = await edgeTTSModule.tts(options.text, {
            voice: voiceName,
            rate: rateStr,
            pitch: pitchStr,
          });
        } else {
          cleanupTtsRequest();
          return { success: false, error: '没有可用的 TTS 模块' };
        }

        cleanupTtsRequest();

        const base64Audio = audioBuffer.toString('base64');

        if (audioBuffer.length < 100) {
          return { success: false, error: '音频数据为空' };
        }

        return {
          success: true,
          audio: `data:audio/mpeg;base64,${base64Audio}`,
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        cleanupTtsRequest();
        if (error?.code === 'EPIPE' || error?.message?.includes('broken pipe')) {
          console.warn('[Edge TTS] 连接中断（可能是用户快速切换）:', error.message);
          return { success: false, error: '语音请求已取消' };
        }
        if (error?.name === 'AbortError' || error?.message === 'TTS_REQUEST_ABORTED') {
          console.warn('[Edge TTS] 请求已取消');
          return { success: false, error: '语音请求已取消' };
        }
        console.error('[Edge TTS] 生成失败:', error);
        return { success: false, error: String(error) };
      }
    }
  );

  // 停止当前 TTS 生成（用于用户主动停止）
  ipcMain.handle('edge-tts-stop', () => {
    cleanupTtsRequest();
    return { success: true };
  });

  // 获取可用的语音列表
  ipcMain.handle('edge-tts-get-voices', async () => {
    try {
      if (!msEdgeTTS && !edgeTTSModule) {
        const loaded = await loadEdgeTTS();
        if (!loaded) {
          return { voices: [], available: false };
        }
      }
      return { voices: VOICE_DISPLAY_LIST, available: true };
    } catch (error) {
      console.error('[Edge TTS] 获取语音列表失败:', error);
      return { voices: VOICE_DISPLAY_LIST, available: false };
    }
  });

  // 测试Edge TTS是否可用
  ipcMain.handle('edge-tts-test', async () => {
    try {
      if (!msEdgeTTS && !edgeTTSModule) {
        const loaded = await loadEdgeTTS();
        return { available: loaded };
      }
      return { available: true };
    } catch (error) {
      return { available: false, error: String(error) };
    }
  });
} // end of else (单实例锁)
