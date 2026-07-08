/**
 * TTS 语音合成服务（Edge TTS 版本）
 *
 * 使用 Microsoft Edge TTS 提供高质量语音
 * 支持根据对话角色(A/B)自动切换男女声音
 * 支持每个角色独立选择声音
 * 支持每个单词独立选择声音
 */

import { getSpeakerGender } from '../data/speakerGender';
import { logger } from '../utils/logger';

const MODULE = 'TTS';

export type SpeechRate = 'slow' | 'normal' | 'fast';

const RATE_MAP: Record<SpeechRate, number> = {
  slow: 0.8,
  normal: 1.0,
  fast: 1.2,
};

let currentRate: SpeechRate = 'normal';
let edgeTtsAvailable = false;

// 音频播放器
let currentAudio: HTMLAudioElement | null = null;
// 当前 Blob URL（需要在播放完成后释放）
let currentBlobUrl: string | null = null;
// TTS 请求计数器（用于防止并发请求干扰）
let ttsRequestGeneration = 0;
// 正在等待的 TTS Promise resolve 函数（用于取消时正确解决旧请求）
let pendingTtsResolve: ((value: boolean) => void) | null = null;

/**
 * 将 data URL 或 base64 字符串转换为 Blob URL
 * Electron Chromium 对 data URL 音频支持不完善，需要转为 Blob URL
 */
function dataUrlToBlobUrl(dataUrl: string): string {
  try {
    // 提取 base64 数据部分
    const base64Data = dataUrl.includes(',') ? dataUrl.split(',')[1] : dataUrl;
    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: 'audio/mpeg' });
    return URL.createObjectURL(blob);
  } catch (e) {
    logger.error(MODULE, '音频转换', `data URL 转 Blob URL 失败: ${e}`);
    // 降级：直接返回原始 data URL
    return dataUrl;
  }
}

/**
 * 释放当前 Blob URL 内存
 */
function revokeCurrentBlobUrl(): void {
  if (currentBlobUrl) {
    try {
      URL.revokeObjectURL(currentBlobUrl);
    } catch {
      /* ignore */
    }
    currentBlobUrl = null;
  }
}

// ==================== 单词声音配置 ====================

/** 单词发音声音配置 */
interface WordVoiceConfig {
  voiceId?: string;
  rate?: SpeechRate;
}

/** 单词声音配置存储（单词 -> 声音配置） */
let wordVoiceConfigs: Record<string, WordVoiceConfig> = {};

/** 加载单词声音配置 */
function loadWordVoiceConfigs(): void {
  try {
    const saved = localStorage.getItem('word-voice-configs');
    if (saved) {
      wordVoiceConfigs = JSON.parse(saved);
    }
  } catch {
    wordVoiceConfigs = {};
  }
}

/** 保存单词声音配置 */
function saveWordVoiceConfigs(): void {
  try {
    localStorage.setItem('word-voice-configs', JSON.stringify(wordVoiceConfigs));
  } catch {
    /* ignore */
  }
}

/** 获取单词的声音配置 */
export function getWordVoiceConfig(word: string): WordVoiceConfig {
  const key = word.toLowerCase();
  return wordVoiceConfigs[key] || { rate: 'slow' };
}

/** 设置单词的声音配置 */
export function setWordVoiceConfig(word: string, config: WordVoiceConfig): void {
  const key = word.toLowerCase();
  wordVoiceConfigs[key] = config;
  saveWordVoiceConfigs();
}

/** 获取单词发音使用的声音 */
export function getWordVoice(word: string): string {
  const config = getWordVoiceConfig(word);
  return config.voiceId || currentPreset.female;
}

/** 重置单词声音配置 */
export function resetWordVoiceConfig(word: string): void {
  const key = word.toLowerCase();
  delete wordVoiceConfigs[key];
  saveWordVoiceConfigs();
}

/** 重置所有单词声音配置 */
export function resetAllWordVoiceConfigs(): void {
  wordVoiceConfigs = {};
  saveWordVoiceConfigs();
}

// ==================== 声音定义 ====================

/** Edge TTS 可用声音（从后端获取） */
export interface EdgeVoice {
  id: string;
  name: string;
  lang: string;
  gender: 'male' | 'female';
  accent: string;
  desc: string;
}

/** 口音预设（美式/英式） */
export interface VoicePreset {
  id: string;
  name: string;
  accent: string;
  male: string;
  female: string;
}

export const VOICE_PRESETS: VoicePreset[] = [
  { id: 'us', name: '美式英语', accent: '🇺🇸', male: 'en-US-GuyNeural', female: 'en-US-AriaNeural' },
  {
    id: 'uk',
    name: '英式英语',
    accent: '🇬🇧',
    male: 'en-GB-RyanNeural',
    female: 'en-GB-SoniaNeural',
  },
  {
    id: 'cn',
    name: '普通话',
    accent: '🇨🇳',
    male: 'zh-CN-YunxiNeural',
    female: 'zh-CN-XiaoxiaoNeural',
  },
  {
    id: 'hk',
    name: '粤语',
    accent: '🇭🇰',
    male: 'zh-HK-WanLungNeural',
    female: 'zh-HK-HiuMaanNeural',
  },
];

// ==================== 中文声音定义 ====================

/** 中文声音信息 */
export interface ChineseVoice {
  id: string;
  name: string;
  gender: 'male' | 'female';
  desc: string;
  tags: string[]; // 特性标签，如"温柔"、"活泼"、"新闻"等
}

/** 中文普通话声音列表 */
export const CHINESE_VOICES: ChineseVoice[] = [
  // 女声
  {
    id: 'zh-CN-XiaoxiaoNeural',
    name: '晓晓',
    gender: 'female',
    desc: '温柔亲切，适合通用场景',
    tags: ['温柔', '通用'],
  },
  {
    id: 'zh-CN-XiaoyiNeural',
    name: '晓伊',
    gender: 'female',
    desc: '活泼可爱，适合儿童教育',
    tags: ['活泼', '儿童'],
  },
  {
    id: 'zh-CN-XiaochenNeural',
    name: '晓辰',
    gender: 'female',
    desc: '专业严谨，适合新闻播报',
    tags: ['专业', '新闻'],
  },
  {
    id: 'zh-CN-XiaohanNeural',
    name: '晓涵',
    gender: 'female',
    desc: '温暖细腻，适合有声读物',
    tags: ['温暖', '有声书'],
  },
  {
    id: 'zh-CN-XiaomoNeural',
    name: '晓墨',
    gender: 'female',
    desc: '沉稳大气，适合正式场合',
    tags: ['沉稳', '正式'],
  },
  {
    id: 'zh-CN-XiaoruiNeural',
    name: '晓睿',
    gender: 'female',
    desc: '知性优雅，适合教育讲解',
    tags: ['知性', '教育'],
  },
  {
    id: 'zh-CN-XiaoshuangNeural',
    name: '晓双',
    gender: 'female',
    desc: '清新自然，适合日常对话',
    tags: ['清新', '对话'],
  },
  {
    id: 'zh-CN-XiaoxuanNeural',
    name: '晓萱',
    gender: 'female',
    desc: '甜美活泼，适合轻松场景',
    tags: ['甜美', '轻松'],
  },
  {
    id: 'zh-CN-XiaoyouNeural',
    name: '晓悠',
    gender: 'female',
    desc: '轻松自在，适合休闲内容',
    tags: ['轻松', '休闲'],
  },
  {
    id: 'zh-CN-XiaozhenNeural',
    name: '晓甄',
    gender: 'female',
    desc: '真诚可信，适合客服场景',
    tags: ['真诚', '客服'],
  },
  // 男声
  {
    id: 'zh-CN-YunxiNeural',
    name: '云希',
    gender: 'male',
    desc: '阳光活力，适合年轻用户',
    tags: ['阳光', '年轻'],
  },
  {
    id: 'zh-CN-YunjianNeural',
    name: '云健',
    gender: 'male',
    desc: '沉稳有力，适合新闻播报',
    tags: ['沉稳', '新闻'],
  },
  {
    id: 'zh-CN-YunzeNeural',
    name: '云泽',
    gender: 'male',
    desc: '成熟稳重，适合正式场合',
    tags: ['成熟', '正式'],
  },
  {
    id: 'zh-CN-YunfengNeural',
    name: '云枫',
    gender: 'male',
    desc: '温和亲切，适合有声读物',
    tags: ['温和', '有声书'],
  },
  {
    id: 'zh-CN-YunhaoNeural',
    name: '云皓',
    gender: 'male',
    desc: '热情开朗，适合广告配音',
    tags: ['热情', '广告'],
  },
  {
    id: 'zh-CN-YunxiaNeural',
    name: '云夏',
    gender: 'male',
    desc: '青春阳光，适合学生场景',
    tags: ['青春', '学生'],
  },
  {
    id: 'zh-CN-YunyangNeural',
    name: '云扬',
    gender: 'male',
    desc: '专业权威，适合新闻播报',
    tags: ['专业', '新闻'],
  },
];

/** 粤语声音列表 */
export const CANTONESE_VOICES: ChineseVoice[] = [
  {
    id: 'zh-HK-HiuMaanNeural',
    name: '晓曼',
    gender: 'female',
    desc: '温柔甜美',
    tags: ['温柔', '甜美'],
  },
  {
    id: 'zh-HK-HiuGaaiNeural',
    name: '晓佳',
    gender: 'female',
    desc: '活泼可爱',
    tags: ['活泼', '可爱'],
  },
  {
    id: 'zh-HK-WanLungNeural',
    name: '云龙',
    gender: 'male',
    desc: '沉稳大气',
    tags: ['沉稳', '大气'],
  },
  {
    id: 'zh-HK-WatSamNeural',
    name: '云森',
    gender: 'male',
    desc: '成熟稳重',
    tags: ['成熟', '稳重'],
  },
];

// 当前口音预设
let currentPreset: VoicePreset = (() => {
  const saved = localStorage.getItem('voice-preset');
  return VOICE_PRESETS.find((p) => p.id === saved) || VOICE_PRESETS[0];
})();

// 每个角色独立的声音选择（从 localStorage 恢复）
let speakerVoices: Record<string, string> = (() => {
  try {
    const saved = localStorage.getItem('speaker-voices');
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
})();

// 完整声音列表缓存
let cachedEdgeVoices: EdgeVoice[] | null = null;

/**
 * 获取当前口音预设
 */
export function getCurrentPreset(): VoicePreset {
  return currentPreset;
}

/**
 * 设置口音预设
 */
export function setVoicePreset(presetId: string): void {
  const preset = VOICE_PRESETS.find((p) => p.id === presetId);
  if (preset) {
    currentPreset = preset;
    localStorage.setItem('voice-preset', presetId);
    // 切换口音时清除角色自定义声音，让预设立即生效
    speakerVoices = {};
    try {
      localStorage.removeItem('speaker-voices');
    } catch {
      /* ignore */
    }
  }
}

/**
 * 获取某个角色当前使用的声音ID
 * 使用 speakerGender 数据库判断角色性别
 */
export function getSpeakerVoice(speaker: string): string {
  const key = speaker.toUpperCase();
  if (speakerVoices[key]) return speakerVoices[key];
  const gender = getSpeakerGender(speaker);
  return gender === 'male' ? currentPreset.male : currentPreset.female;
}

/**
 * 设置某个角色的声音
 */
export function setSpeakerVoice(speaker: string, voiceId: string): void {
  const key = speaker.toUpperCase();
  speakerVoices[key] = voiceId;
  try {
    localStorage.setItem('speaker-voices', JSON.stringify(speakerVoices));
  } catch {
    /* ignore */
  }
}

/**
 * 获取角色默认声音（根据当前预设）
 * 使用 speakerGender 数据库判断角色性别，自动选择男声/女声
 */
function getDefaultVoiceForSpeaker(speaker?: string): string {
  if (!speaker) return currentPreset.female;
  const key = speaker.toUpperCase();
  // 优先使用用户自定义
  if (speakerVoices[key]) return speakerVoices[key];
  // 使用性别映射数据库判断
  const gender = getSpeakerGender(speaker);
  return gender === 'male' ? currentPreset.male : currentPreset.female;
}

/**
 * 获取 Edge TTS 可用声音列表（缓存）
 */
export async function fetchEdgeVoices(): Promise<EdgeVoice[]> {
  if (cachedEdgeVoices) return cachedEdgeVoices;

  const electronAPI = window.electronAPI;
  if (electronAPI?.edgeTtsGetVoices) {
    try {
      const result = await electronAPI.edgeTtsGetVoices();
      // 兼容新格式 { voices, available } 和旧格式（直接数组）
      const voices: EdgeVoice[] = Array.isArray(result) ? result : (result?.voices ?? []);
      cachedEdgeVoices = voices;
      return cachedEdgeVoices;
    } catch {
      return [];
    }
  }
  return [];
}

/**
 * 初始化Edge TTS
 */
async function initEdgeTTS(): Promise<boolean> {
  logger.info(MODULE, '初始化Edge TTS', '开始初始化');

  try {
    const electronAPI = window.electronAPI;
    if (!electronAPI?.edgeTtsTest) {
      logger.warn(MODULE, '初始化Edge TTS', '非Electron环境，将使用Web Speech API');
      return false;
    }

    const result = await electronAPI.edgeTtsTest();
    edgeTtsAvailable = result.available;

    if (edgeTtsAvailable) {
      logger.success(MODULE, '初始化Edge TTS', 'Edge TTS 可用');
    } else {
      logger.warn(MODULE, '初始化Edge TTS', 'Edge TTS 不可用，将使用Web Speech API');
    }

    return edgeTtsAvailable;
  } catch (error) {
    logger.error(MODULE, '初始化Edge TTS', `初始化失败: ${error}`);
    return false;
  }
}

/**
 * 使用Edge TTS播放语音
 */
async function speakWithEdgeTTS(text: string, voice?: string, rate?: number): Promise<boolean> {
  // 递增请求计数器，用于检测并发请求
  const myGeneration = ++ttsRequestGeneration;

  try {
    const electronAPI = window.electronAPI;
    if (!electronAPI?.edgeTtsSpeak) {
      logger.warn(MODULE, 'Edge TTS播放', 'electronAPI.edgeTtsSpeak 不可用');
      return false;
    }

    // 清除旧音频的回调，防止旧 Audio 的 onerror 干扰新请求
    // 如果有正在等待的旧请求，正确解决它（标记为被取代）
    if (pendingTtsResolve) {
      pendingTtsResolve(false);
      pendingTtsResolve = null;
    }
    if (currentAudio) {
      currentAudio.onended = null;
      currentAudio.onerror = null;
      currentAudio.oncanplay = null;
      currentAudio.pause();
      currentAudio.src = '';
      currentAudio = null;
    }
    revokeCurrentBlobUrl();

    // 通知后端取消正在进行的 TTS 请求，避免并发冲突
    if (electronAPI.edgeTtsStop) {
      electronAPI.edgeTtsStop().catch(() => {});
    }

    const textPreview = text.length > 30 ? text.substring(0, 30) + '...' : text;
    logger.info(MODULE, 'Edge TTS播放', `文本: "${textPreview}", 声音: ${voice || '默认'}`);

    const result = await electronAPI.edgeTtsSpeak({
      text,
      voice: voice || 'en-female',
      rate: rate || RATE_MAP[currentRate],
    });

    // 如果已经有更新的请求，丢弃当前结果
    if (myGeneration !== ttsRequestGeneration) {
      logger.info(MODULE, 'Edge TTS播放', '请求已被更新的请求取代，丢弃结果');
      return false;
    }

    if (result.success && result.audio) {
      logger.success(MODULE, 'Edge TTS播放', '音频生成成功，开始播放');
      // 将 data URL 转为 Blob URL（Electron Chromium 对 data URL 音频支持不完善）
      const blobUrl = dataUrlToBlobUrl(result.audio);
      currentBlobUrl = blobUrl;
      // 创建音频播放器，等待 canplay 后再播放
      return new Promise<boolean>((resolve) => {
        // 保存 resolve 函数，以便在清理时正确解决
        pendingTtsResolve = resolve;
        let settled = false;
        const cleanup = () => {
          if (!settled) {
            settled = true;
            pendingTtsResolve = null;
            revokeCurrentBlobUrl();
          }
        };
        currentAudio = new Audio(blobUrl);
        currentAudio.preload = 'auto';
        currentAudio.oncanplay = () => {
          if (settled) return;
          currentAudio?.play().catch((err) => {
            logger.error(MODULE, 'Edge TTS播放', `播放失败: ${err}`);
            cleanup();
          });
        };
        currentAudio.onended = () => {
          if (settled) return;
          logger.info(MODULE, 'Edge TTS播放', '播放完成');
          cleanup();
          resolve(true);
        };
        currentAudio.onerror = (e) => {
          if (settled) return;
          logger.error(MODULE, 'Edge TTS播放', `播放出错: ${e}`);
          cleanup();
          resolve(false);
        };
        // 超时保护：如果 5 秒内没有 canplay 事件，尝试直接播放
        setTimeout(() => {
          if (!settled && currentAudio && currentAudio.readyState < 3) {
            logger.warn(MODULE, 'Edge TTS播放', '音频加载超时，尝试直接播放');
            currentAudio.play().catch(() => {
              cleanup();
              resolve(false);
            });
          }
        }, 5000);
      });
    }

    if (result.error !== '语音请求已取消') {
      logger.warn(MODULE, 'Edge TTS播放', `返回失败: ${result.error || '未知错误'}`);
    }
    return false;
  } catch (error) {
    logger.error(MODULE, 'Edge TTS播放', `播放异常: ${error}`);
    return false;
  }
}

// Web Speech API 语音缓存
let cachedMaleVoice: SpeechSynthesisVoice | null = null;
let cachedFemaleVoice: SpeechSynthesisVoice | null = null;

/**
 * 缓存Web Speech API的男女声音
 */
function cacheWebVoices(): void {
  if (!('speechSynthesis' in window)) return;

  const voices = window.speechSynthesis.getVoices();
  const englishVoices = voices.filter((v) => v.lang.startsWith('en'));

  // 男性声音关键词
  const maleKeywords = [
    'male',
    'david',
    'james',
    'daniel',
    'mark',
    'guy',
    'alex',
    'google uk english male',
  ];
  // 女性声音关键词
  const femaleKeywords = [
    'female',
    'zira',
    'hazel',
    'samantha',
    'victoria',
    'lisa',
    'karen',
    'sarah',
    'google uk english female',
    'aria',
  ];

  cachedMaleVoice =
    englishVoices.find((v) => maleKeywords.some((k) => v.name.toLowerCase().includes(k))) || null;

  cachedFemaleVoice =
    englishVoices.find((v) => femaleKeywords.some((k) => v.name.toLowerCase().includes(k))) || null;

  // 如果没找到特定性别声音，使用默认
  if (!cachedMaleVoice) {
    cachedMaleVoice =
      englishVoices.find((v) => v.name.includes('Google')) || englishVoices[0] || null;
  }
  if (!cachedFemaleVoice) {
    cachedFemaleVoice = cachedMaleVoice || englishVoices[0] || null;
  }

  console.log('[TTS] Web Speech API 语音缓存:', {
    male: cachedMaleVoice?.name,
    female: cachedFemaleVoice?.name,
  });
}

/**
 * 使用Web Speech API播放语音（降级方案）
 * @returns Promise，语音播放完成时resolve
 */
function speakWithWebSpeech(
  text: string,
  lang: string = 'en-US',
  voice?: SpeechSynthesisVoice | null,
  webRate?: number
): Promise<void> {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      resolve();
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = webRate ?? RATE_MAP[currentRate];
    utterance.pitch = 1;
    utterance.volume = 1;

    if (voice) {
      utterance.voice = voice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    window.speechSynthesis.speak(utterance);
  });
}

/**
 * 根据角色获取Web Speech API语音（降级方案）
 * 使用 speakerGender 数据库判断角色性别
 */
function getWebVoiceBySpeaker(speaker?: string): SpeechSynthesisVoice | null {
  if (!speaker) return cachedFemaleVoice;
  try {
    const gender = getSpeakerGender(speaker);
    return gender === 'male'
      ? cachedMaleVoice || cachedFemaleVoice
      : cachedFemaleVoice || cachedMaleVoice;
  } catch {
    return cachedFemaleVoice;
  }
}

// ==================== 公开API ====================

/**
 * 内部通用朗读函数（Edge TTS 优先，Web Speech API 降级）
 * @param text 要朗读的文本
 * @param rate 语速
 * @param voiceId Edge TTS 声音ID（直接传给后端，不做角色映射）
 * @param lang Web Speech API 语言代码
 * @param webVoice Web Speech API 声音对象
 */
async function speakInternal(
  text: string,
  rate: number,
  voiceId: string,
  lang: string = 'en-US',
  webVoice?: SpeechSynthesisVoice | null
): Promise<void> {
  if (edgeTtsAvailable) {
    const success = await speakWithEdgeTTS(text, voiceId, rate);
    if (success) return;
  }
  await speakWithWebSpeech(text, lang, webVoice);
}

/**
 * 朗读英文文本
 * @param text 要朗读的文本
 * @param rate 语速
 * @param speaker 角色标识（'A'/'B'），用于根据角色选择声音
 */
export async function speakEnglish(
  text: string,
  rate?: SpeechRate,
  speaker?: string
): Promise<void> {
  const textPreview = text.length > 30 ? text.substring(0, 30) + '...' : text;
  logger.info(
    MODULE,
    '朗读英文',
    `文本: "${textPreview}", 语速: ${rate || currentRate}, 角色: ${speaker || '默认'}`
  );

  const voiceId = getDefaultVoiceForSpeaker(speaker);
  const webVoice = getWebVoiceBySpeaker(speaker);
  await speakInternal(text, RATE_MAP[rate || currentRate], voiceId, 'en-US', webVoice);
}

/**
 * 朗读单词（英文，使用全局口音预设）
 */
export async function speakWord(word: string): Promise<void> {
  await speakEnglish(word, 'slow');
}

/**
 * 朗读句子（英文，正常速度，可指定角色）
 */
export async function speakSentence(sentence: string, speaker?: string): Promise<void> {
  await speakEnglish(sentence, 'normal', speaker);
}

/**
 * 使用指定声音朗读单词（忽略角色预设）
 */
export async function speakWordWithVoice(
  word: string,
  voiceId: string,
  rate: SpeechRate = 'slow'
): Promise<void> {
  await speakInternal(word, RATE_MAP[rate], voiceId);
}

/**
 * 使用指定声音朗读句子（忽略角色预设）
 */
export async function speakSentenceWithVoice(
  sentence: string,
  voiceId: string,
  rate: SpeechRate = 'normal'
): Promise<void> {
  await speakInternal(sentence, RATE_MAP[rate], voiceId);
}

// ==================== 中文朗读功能 ====================

/** 中文语速配置 */
export type ChineseSpeechRate = 'slow' | 'normal' | 'fast';

const CHINESE_RATE_MAP: Record<ChineseSpeechRate, string> = {
  slow: '-20%',
  normal: '+0%',
  fast: '+20%',
};

const CHINESE_RATE_NUMBER_MAP: Record<ChineseSpeechRate, number> = {
  slow: 0.8,
  normal: 1.0,
  fast: 1.2,
};

let currentChineseVoice: string = 'zh-CN-XiaoxiaoNeural';
let currentChineseRate: ChineseSpeechRate = 'normal';

// 记录最后一次中文播放的内容（用于语速/声音变化时重播）
let lastChineseText: string | null = null;
let _lastChineseVoice: string | null = null;
let _lastChineseRate: ChineseSpeechRate | null = null;

/**
 * 获取当前中文声音
 */
export function getCurrentChineseVoice(): string {
  return currentChineseVoice;
}

/**
 * 设置中文声音
 */
export function setChineseVoice(voiceId: string): void {
  currentChineseVoice = voiceId;
  localStorage.setItem('chinese-voice', voiceId);
}

/**
 * 获取当前中文语速
 */
export function getCurrentChineseRate(): ChineseSpeechRate {
  return currentChineseRate;
}

/**
 * 设置中文语速
 */
export function setChineseRate(rate: ChineseSpeechRate): void {
  currentChineseRate = rate;
  localStorage.setItem('chinese-rate', rate);
}

/**
 * 检查是否有中文音频正在播放
 */
export function isChinesePlaying(): boolean {
  return currentAudio !== null && currentAudio.src !== '' && !currentAudio.paused;
}

/**
 * 用当前的语速和声音重播最后一次中文内容
 * @returns 是否成功重播（如果没有上次内容则返回 false）
 */
export async function replayLastChinese(): Promise<boolean> {
  if (!lastChineseText) {
    logger.info(MODULE, '重播中文', '没有上次播放的内容');
    return false;
  }

  logger.info(MODULE, '重播中文', `使用新参数重播: 声音=${currentChineseVoice}, 语速=${currentChineseRate}`);
  // 先停止当前播放
  stopSpeaking();
  // 等待一小段时间确保音频资源释放
  await new Promise((resolve) => setTimeout(resolve, 100));
  // 用当前参数重新播放
  await speakChinese(lastChineseText);
  return true;
}

/**
 * 朗读中文文本（使用指定声音和语速）
 */
export async function speakChinese(
  text: string,
  voiceId?: string,
  rate?: ChineseSpeechRate
): Promise<void> {
  const voice = voiceId || currentChineseVoice;
  const speechRate = rate || currentChineseRate;

  // 记录本次播放内容（用于实时反馈重播）
  lastChineseText = text;
  _lastChineseVoice = voice;
  _lastChineseRate = speechRate;

  const textPreview = text.length > 30 ? text.substring(0, 30) + '...' : text;
  logger.info(MODULE, '朗读中文', `文本: "${textPreview}", 声音: ${voice}, 语速: ${speechRate}`);

  // 使用 Edge TTS
  if (edgeTtsAvailable) {
    const electronAPI = window.electronAPI;
    try {
      // 递增请求计数器，用于检测并发请求
      const myGeneration = ++ttsRequestGeneration;

      // 清除旧音频的回调，防止旧 Audio 的 onerror 干扰新请求
      if (pendingTtsResolve) {
        pendingTtsResolve(false);
        pendingTtsResolve = null;
      }
      if (currentAudio) {
        currentAudio.onended = null;
        currentAudio.onerror = null;
        currentAudio.oncanplay = null;
        currentAudio.pause();
        currentAudio.src = '';
        currentAudio = null;
      }
      revokeCurrentBlobUrl();

      // 通知后端取消正在进行的 TTS 请求
      if (electronAPI.edgeTtsStop) {
        electronAPI.edgeTtsStop().catch(() => {});
      }

      logger.info(MODULE, '朗读中文', `调用IPC: voice=${voice}, rate=${CHINESE_RATE_NUMBER_MAP[speechRate]}`);
      const result = await electronAPI.edgeTtsSpeak({
        text,
        voice,
        rate: CHINESE_RATE_NUMBER_MAP[speechRate],
      });

      // 如果已经有更新的请求，丢弃当前结果
      if (myGeneration !== ttsRequestGeneration) {
        logger.info(MODULE, '朗读中文', '请求已被更新的请求取代，丢弃结果');
        return;
      }

      if (result.success && result.audio) {
        logger.success(MODULE, '朗读中文', 'Edge TTS 音频生成成功');
        // 将 data URL 转为 Blob URL
        const blobUrl = dataUrlToBlobUrl(result.audio);
        currentBlobUrl = blobUrl;

        // 创建音频播放器，等待 canplay 后再播放
        await new Promise<void>((resolve) => {
          let settled = false;
          const cleanup = () => {
            if (!settled) {
              settled = true;
              pendingTtsResolve = null;
              revokeCurrentBlobUrl();
            }
          };
          currentAudio = new Audio(blobUrl);
          currentAudio.preload = 'auto';
          currentAudio.oncanplay = () => {
            if (settled) return;
            currentAudio?.play().catch((err) => {
              logger.error(MODULE, '朗读中文', `播放失败: ${err}`);
              cleanup();
              resolve();
            });
          };
          currentAudio.onended = () => {
            if (settled) return;
            logger.info(MODULE, '朗读中文', '播放完成');
            cleanup();
            resolve();
          };
          currentAudio.onerror = (e) => {
            if (settled) return;
            logger.error(MODULE, '朗读中文', `播放出错: ${typeof e === 'string' ? e : e.type}`);
            cleanup();
            resolve();
          };
          // 超时保护：如果 5 秒内没有 canplay 事件，尝试直接播放
          setTimeout(() => {
            if (!settled && currentAudio && currentAudio.readyState < 3) {
              logger.warn(MODULE, '朗读中文', '音频加载超时，尝试直接播放');
              currentAudio.play().catch(() => {
                cleanup();
                resolve();
              });
            }
          }, 5000);
        });
        return;
      }

      if (result.error !== '语音请求已取消') {
        logger.warn(MODULE, '朗读中文', `返回失败: ${result.error || '未知错误'}`);
      }
    } catch (e) {
      logger.warn(MODULE, '朗读中文', `Edge TTS 失败，降级到 Web Speech: ${e}`);
    }
  }

  // 降级到 Web Speech API
  logger.info(MODULE, '朗读中文', '使用 Web Speech API');
  const webChineseRate = CHINESE_RATE_NUMBER_MAP[speechRate];
  await speakWithWebSpeech(text, 'zh-CN', null, webChineseRate);
}

/**
 * 朗读中文句子（简单接口）
 */
export async function speakChineseSentence(sentence: string): Promise<void> {
  await speakChinese(sentence);
}

/**
 * 朗读中文段落（带停顿）
 */
export async function speakChineseParagraph(text: string): Promise<void> {
  await speakChinese(text);
}

/**
 * 加载中文声音配置
 */
function loadChineseVoiceConfig(): void {
  try {
    const savedVoice = localStorage.getItem('chinese-voice');
    if (savedVoice) {
      currentChineseVoice = savedVoice;
    }
    const savedRate = localStorage.getItem('chinese-rate') as ChineseSpeechRate;
    if (savedRate && ['slow', 'normal', 'fast'].includes(savedRate)) {
      currentChineseRate = savedRate;
    }
  } catch {
    // ignore
  }
}

// 初始化时加载配置
loadChineseVoiceConfig();

// 加载英文语速配置
try {
  const savedEngRate = localStorage.getItem('english-rate') as SpeechRate;
  if (savedEngRate && ['slow', 'normal', 'fast'].includes(savedEngRate)) {
    currentRate = savedEngRate;
  }
} catch {
  // ignore
}

// ==================== 中文情感控制 ====================

/** 中文情感类型 */
export type ChineseEmotion =
  | 'neutral' // 中性
  | 'happy' // 开心
  | 'sad' // 悲伤
  | 'angry' // 生气
  | 'fearful' // 恐惧
  | 'gentle' // 温柔
  | 'serious' // 严肃
  | 'cheerful' // 愉快
  | 'affectionate' // 亲切
  | 'lyrical'; // 抒情

/** 情感描述 */
export const EMOTION_DESCRIPTIONS: Record<
  ChineseEmotion,
  { name: string; emoji: string; desc: string }
> = {
  neutral: { name: '中性', emoji: '😐', desc: '自然平和的语调' },
  happy: { name: '开心', emoji: '😊', desc: '愉悦欢快的语调' },
  sad: { name: '悲伤', emoji: '😢', desc: '低沉忧伤的语调' },
  angry: { name: '生气', emoji: '😠', desc: '严肃有力的语调' },
  fearful: { name: '恐惧', emoji: '😨', desc: '紧张害怕的语调' },
  gentle: { name: '温柔', emoji: '🥰', desc: '轻柔温暖的语调' },
  serious: { name: '严肃', emoji: '😤', desc: '庄重正式的语调' },
  cheerful: { name: '愉快', emoji: '😄', desc: '轻松愉快的语调' },
  affectionate: { name: '亲切', emoji: '🤗', desc: '和蔼可亲的语调' },
  lyrical: { name: '抒情', emoji: '🎶', desc: '富有感情的语调' },
};

/** 当前中文情感 */
let currentChineseEmotion: ChineseEmotion = 'neutral';

/**
 * 获取当前中文情感
 */
export function getCurrentChineseEmotion(): ChineseEmotion {
  return currentChineseEmotion;
}

/**
 * 设置中文情感
 */
export function setChineseEmotion(emotion: ChineseEmotion): void {
  currentChineseEmotion = emotion;
  localStorage.setItem('chinese-emotion', emotion);
}

/**
 * 构建带情感的 SSML
 */
function buildEmotionSSML(
  text: string,
  voice: string,
  rate: string,
  emotion: ChineseEmotion
): string {
  // Edge TTS 支持的表达式标签
  const expressionMap: Record<ChineseEmotion, string> = {
    neutral: '',
    happy: '<msty:express-as style="cheerful">',
    sad: '<msty:express-as style="sad">',
    angry: '<msty:express-as style="angry">',
    fearful: '<msty:express-as style="fearful">',
    gentle: '<msty:express-as style="gentle">',
    serious: '<msty:express-as style="serious">',
    cheerful: '<msty:express-as style="cheerful">',
    affectionate: '<msty:express-as style="affectionate">',
    lyrical: '<msty:express-as style="lyrical">',
  };

  const expression = expressionMap[emotion];
  const textContent = expression ? `${expression}${text}</msty:express-as>` : text;

  return `<speak xmlns:msty="https://speech.microsoft.com/msty/1" version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="zh-CN"><voice name="${voice}"><prosody rate="${rate}">${textContent}</prosody></voice></speak>`;
}

/**
 * 朗读中文文本（支持情感控制）
 */
export async function speakChineseWithEmotion(
  text: string,
  emotion?: ChineseEmotion,
  voiceId?: string,
  rate?: ChineseSpeechRate
): Promise<void> {
  const voice = voiceId || currentChineseVoice;
  const speechRate = rate || currentChineseRate;
  const speechEmotion = emotion || currentChineseEmotion;

  // 使用 Edge TTS
  if (edgeTtsAvailable) {
    const electronAPI = window.electronAPI;
    try {
      // 递增请求计数器，用于检测并发请求
      const myGeneration = ++ttsRequestGeneration;

      // 清除旧音频的回调
      if (pendingTtsResolve) {
        pendingTtsResolve(false);
        pendingTtsResolve = null;
      }
      if (currentAudio) {
        currentAudio.onended = null;
        currentAudio.onerror = null;
        currentAudio.oncanplay = null;
        currentAudio.pause();
        currentAudio.src = '';
        currentAudio = null;
      }
      revokeCurrentBlobUrl();

      // 通知后端取消正在进行的 TTS 请求
      if (electronAPI.edgeTtsStop) {
        electronAPI.edgeTtsStop().catch(() => {});
      }

      let result;
      // 如果有情感，使用 SSML
      if (speechEmotion !== 'neutral') {
        const ssml = buildEmotionSSML(text, voice, CHINESE_RATE_MAP[speechRate], speechEmotion);
        // 调用 SSML 接口（需要后端支持），否则降级到普通朗读
        result =
          (await electronAPI.edgeTtsSpeakSSML?.(ssml)) ||
          (await electronAPI.edgeTtsSpeak({
            text,
            voice,
            rate: CHINESE_RATE_NUMBER_MAP[speechRate],
          }));
      } else {
        result = await electronAPI.edgeTtsSpeak({
          text,
          voice,
          rate: CHINESE_RATE_NUMBER_MAP[speechRate],
        });
      }

      // 如果已经有更新的请求，丢弃当前结果
      if (myGeneration !== ttsRequestGeneration) {
        return;
      }

      if (result?.success && result.audio) {
        const blobUrl = dataUrlToBlobUrl(result.audio);
        currentBlobUrl = blobUrl;

        await new Promise<void>((resolve) => {
          let settled = false;
          const cleanup = () => {
            if (!settled) {
              settled = true;
              pendingTtsResolve = null;
              revokeCurrentBlobUrl();
            }
          };
          currentAudio = new Audio(blobUrl);
          currentAudio.preload = 'auto';
          currentAudio.oncanplay = () => {
            if (settled) return;
            currentAudio?.play().catch(() => {
              cleanup();
              resolve();
            });
          };
          currentAudio.onended = () => {
            if (settled) return;
            cleanup();
            resolve();
          };
          currentAudio.onerror = () => {
            if (settled) return;
            cleanup();
            resolve();
          };
          // 超时保护
          setTimeout(() => {
            if (!settled && currentAudio && currentAudio.readyState < 3) {
              currentAudio.play().catch(() => {
                cleanup();
                resolve();
              });
            }
          }, 5000);
        });
        return;
      }
    } catch (e) {
      console.warn('Edge TTS 中文情感朗读失败，降级到普通朗读:', e);
    }
  }

  // 降级到 Web Speech API
  const webChineseRate = CHINESE_RATE_NUMBER_MAP[speechRate];
  await speakWithWebSpeech(text, 'zh-CN', null, webChineseRate);
}

/**
 * 朗读不同情感的句子（用于教学场景）
 */
export async function speakWithDifferentEmotions(
  text: string,
  emotions: ChineseEmotion[] = ['neutral', 'happy', 'sad']
): Promise<void> {
  for (const emotion of emotions) {
    await speakChineseWithEmotion(text, emotion);
    await new Promise((resolve) => setTimeout(resolve, 800));
  }
}

// 加载情感配置
function loadChineseEmotionConfig(): void {
  try {
    const saved = localStorage.getItem('chinese-emotion') as ChineseEmotion;
    if (saved && EMOTION_DESCRIPTIONS[saved]) {
      currentChineseEmotion = saved;
    }
  } catch {
    // ignore
  }
}

// 初始化时加载情感配置
loadChineseEmotionConfig();

// ==================== 中英文混合文本智能分段朗读 ====================

/** 文本片段类型 */
interface TextSegment {
  text: string;
  type: 'chinese' | 'english' | 'number' | 'punctuation';
}

/**
 * 智能分段中英文混合文本
 * 将混合文本分割成中文、英文、数字等片段
 */
export function splitMixedText(text: string): TextSegment[] {
  const segments: TextSegment[] = [];
  // 匹配中文、英文单词、数字、标点
  const regex =
    /[\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef]+|[a-zA-Z]+(?:['-][a-zA-Z]+)*|\d+[\d,.]*|[^\w\u4e00-\u9fa5\s]/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const segment = match[0];
    let type: TextSegment['type'];

    if (/[\u4e00-\u9fa5]/.test(segment)) {
      type = 'chinese';
    } else if (/[a-zA-Z]/.test(segment)) {
      type = 'english';
    } else if (/\d/.test(segment)) {
      type = 'number';
    } else {
      type = 'punctuation';
    }

    segments.push({ text: segment, type });
  }

  return segments;
}

/**
 * 智能朗读中英文混合文本
 * 自动识别中英文，使用对应的声音朗读
 */
export async function speakMixedText(text: string): Promise<void> {
  const segments = splitMixedText(text);

  for (const segment of segments) {
    if (segment.type === 'chinese') {
      await speakChinese(segment.text);
    } else if (segment.type === 'english') {
      await speakEnglish(segment.text, 'normal');
    } else if (segment.type === 'number') {
      // 数字根据上下文选择语言（这里简单处理为英文）
      await speakEnglish(segment.text, 'normal');
    }
    // 标点符号跳过
  }
}

/**
 * 朗读带解释的英文例句
 * 英文用英文声音，中文翻译用中文声音
 */
export async function speakExampleWithTranslation(
  english: string,
  chinese: string,
  options?: {
    englishVoice?: string;
    chineseVoice?: string;
    pauseBetween?: number;
  }
): Promise<void> {
  // 先朗读英文
  await speakEnglish(english, 'normal', options?.englishVoice);

  // 停顿
  const pause = options?.pauseBetween ?? 500;
  await new Promise((resolve) => setTimeout(resolve, pause));

  // 再朗读中文翻译
  await speakChinese(chinese, options?.chineseVoice);
}

/**
 * 朗读语法讲解（中英文混合）
 * 智能分段，分别使用对应的声音
 */
export async function speakGrammarContent(text: string): Promise<void> {
  logger.info(MODULE, '朗读语法讲解', `开始朗读，文本长度: ${text.length}`);

  const segments = splitMixedText(text);
  logger.info(MODULE, '朗读语法讲解', `分段数量: ${segments.length}`);

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    const segmentPreview =
      segment.text.length > 20 ? segment.text.substring(0, 20) + '...' : segment.text;
    logger.info(
      MODULE,
      '朗读语法讲解',
      `段落 ${i + 1}/${segments.length}: [${segment.type}] "${segmentPreview}"`
    );

    if (segment.type === 'chinese') {
      await speakChinese(segment.text);
    } else if (segment.type === 'english') {
      await speakEnglish(segment.text, 'normal');
    }
    // 短暂间隔，让语音更自然
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  logger.success(MODULE, '朗读语法讲解', '朗读完成');
}

/**
 * 朗读课文全文（按对话角色切换声音）
 */
export async function speakText(
  paragraphs: Array<{ speaker?: string; content: string }>
): Promise<void> {
  if (!edgeTtsAvailable) {
    // Web Speech API：逐句朗读，根据角色切换声音，等待每句读完
    stopSpeaking();

    for (const para of paragraphs) {
      const webVoice = getWebVoiceBySpeaker(para.speaker);
      await speakWithWebSpeech(para.content, 'en-US', webVoice);
      // 等待一小段时间再朗读下一句
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
    return;
  }

  // 使用Edge TTS逐句朗读，支持声音切换
  stopSpeaking();
  // 等待一小段时间让旧音频完全停止
  await new Promise((resolve) => setTimeout(resolve, 200));

  for (const para of paragraphs) {
    const voice = getDefaultVoiceForSpeaker(para.speaker);
    await speakWithEdgeTTS(para.content, voice, RATE_MAP[currentRate] * 0.9);

    // 等待一小段时间再朗读下一句
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
}

/**
 * 使用指定的声音ID朗读文本（用于声音选择器试听）
 */
export async function speakWithVoice(
  text: string,
  voiceId: string,
  rate?: SpeechRate
): Promise<void> {
  stopSpeaking();

  if (edgeTtsAvailable) {
    const success = await speakWithEdgeTTS(
      text,
      voiceId,
      rate ? RATE_MAP[rate] : RATE_MAP[currentRate]
    );
    if (success) return;
  }

  // 降级到 Web Speech API
  speakWithWebSpeech(text, 'en-US', null);
}

/**
 * 停止朗读
 */
export function stopSpeaking(): void {
  // 如果有正在等待的 TTS Promise，正确解决它
  if (pendingTtsResolve) {
    pendingTtsResolve(false);
    pendingTtsResolve = null;
  }
  // 停止Edge TTS音频并释放内存
  if (currentAudio) {
    currentAudio.onended = null;
    currentAudio.onerror = null;
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio.src = '';
    currentAudio.load();
    currentAudio = null;
  }
  revokeCurrentBlobUrl();

  // 停止Web Speech API
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }

  // 通知后端取消正在进行的TTS请求
  const electronAPI = window.electronAPI;
  if (electronAPI?.edgeTtsStop) {
    electronAPI.edgeTtsStop().catch(() => {});
  }
}

/**
 * 设置全局英文朗读速度
 */
export function setSpeechRate(rate: SpeechRate): void {
  currentRate = rate;
  try {
    localStorage.setItem('english-rate', rate);
  } catch {
    // ignore
  }
}

/**
 * 获取当前英文朗读速度
 */
export function getSpeechRate(): SpeechRate {
  return currentRate;
}

/**
 * 检查是否支持TTS
 */
export function isTTSAvailable(): boolean {
  return edgeTtsAvailable || 'speechSynthesis' in window;
}

/**
 * 检查Edge TTS是否可用
 */
export function isEdgeTTSAvailable(): boolean {
  return edgeTtsAvailable;
}

/**
 * 预加载语音列表
 */
export async function preloadVoices(): Promise<void> {
  // 加载单词声音配置
  loadWordVoiceConfigs();

  // 初始化Edge TTS
  await initEdgeTTS();

  // 预加载Web Speech API语音
  if ('speechSynthesis' in window) {
    // 缓存男女声音
    cacheWebVoices();

    // 如果语音列表为空，等待加载（首次加载后自动移除监听）
    if (window.speechSynthesis.getVoices().length === 0) {
      const handleVoicesChanged = () => {
        cacheWebVoices();
        // 成功缓存后移除监听器
        if (cachedMaleVoice || cachedFemaleVoice) {
          window.speechSynthesis.onvoiceschanged = null;
        }
      };
      window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
    }
  }
}

/**
 * 获取可用的语音列表
 */
export async function getAvailableVoices(): Promise<EdgeVoice[]> {
  if (edgeTtsAvailable) {
    return fetchEdgeVoices();
  }

  // 降级到Web Speech API
  if ('speechSynthesis' in window) {
    const voices = window.speechSynthesis.getVoices();
    return voices
      .filter((v) => v.lang.startsWith('en'))
      .map((v) => ({
        id: v.name,
        name: v.name,
        lang: v.lang,
        gender: v.name.toLowerCase().includes('male') ? ('male' as const) : ('female' as const),
        accent: v.lang.includes('GB') ? '英式' : '美式',
        desc: '',
      }));
  }

  return [];
}
