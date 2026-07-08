/**
 * TTS 语音合成服务单元测试
 *
 * 测试纯函数、常量、以及通过 mock Web Speech API / Electron API 测试异步函数
 */

// 必须在 require tts 模块之前设置好全局 mock，
// 因为 tts 模块在加载时有模块级 IIFE 会访问 localStorage
const localStorageMock: Record<string, string> = {};
(global as any).localStorage = {
  getItem: (key: string) => localStorageMock[key] || null,
  setItem: (key: string, value: string) => { localStorageMock[key] = value; },
  removeItem: (key: string) => { delete localStorageMock[key]; },
};

// Mock Web Speech API
const mockGetVoices = jest.fn().mockReturnValue([
  { name: 'Google US English', lang: 'en-US', voiceURI: '' },
  { name: 'Google UK English Male', lang: 'en-GB', voiceURI: '' },
  { name: 'Google UK English Female', lang: 'en-GB', voiceURI: '' },
]);
const mockSpeechCancel = jest.fn();
const mockSpeechSpeak = jest.fn().mockImplementation((utterance: any) => {
  // 模拟语音播放完成，触发 onend 回调以 resolve Promise
  if (utterance.onend) {
    utterance.onend({} as any);
  }
});
(global as any).window = {
  speechSynthesis: {
    getVoices: mockGetVoices,
    cancel: mockSpeechCancel,
    speak: mockSpeechSpeak,
  },
};
(global as any).SpeechSynthesisUtterance = jest.fn().mockImplementation((text: string) => ({
  text,
  lang: '',
  rate: 1,
  pitch: 1,
  volume: 1,
  voice: null as any,
  onend: null as any,
  onerror: null as any,
}));

// Mock Audio（支持 onended 回调以模拟播放完成）
const mockAudioInstances: any[] = [];
(global as any).Audio = jest.fn().mockImplementation((src: string) => {
  const instance: any = {
    src,
    pause: jest.fn(),
    currentTime: 0,
    load: jest.fn(),
    onended: null,
    onerror: null,
  };
  instance.play = jest.fn().mockImplementation(async () => {
    // 模拟播放完成，触发 onended 回调
    await Promise.resolve();
    if (instance.onended) instance.onended({});
  });
  mockAudioInstances.push(instance);
  return instance;
});

// 使用 require 在 mock 设置后再加载模块（tts 有模块级副作用）
const tts = require('../../src/services/tts');
const {
  VOICE_PRESETS,
  CHINESE_VOICES,
  CANTONESE_VOICES,
  EMOTION_DESCRIPTIONS,
  splitMixedText,
  getSpeechRate,
  setSpeechRate,
  getWordVoiceConfig,
  setWordVoiceConfig,
  resetWordVoiceConfig,
  resetAllWordVoiceConfigs,
  getWordVoice,
  getCurrentPreset,
  setVoicePreset,
  getSpeakerVoice,
  setSpeakerVoice,
  getCurrentChineseVoice,
  setChineseVoice,
  getCurrentChineseRate,
  setChineseRate,
  getCurrentChineseEmotion,
  setChineseEmotion,
  stopSpeaking,
  isTTSAvailable,
  isEdgeTTSAvailable,
  speakEnglish,
  speakWord,
  speakSentence,
  speakWordWithVoice,
  speakSentenceWithVoice,
  speakChinese,
  speakChineseSentence,
  speakChineseParagraph,
  speakChineseWithEmotion,
  speakWithDifferentEmotions,
  speakMixedText,
  speakExampleWithTranslation,
  speakGrammarContent,
  speakWithVoice,
  speakText,
  fetchEdgeVoices,
  getAvailableVoices,
  preloadVoices,
} = tts;

describe('TTS Service', () => {
  beforeEach(() => {
    for (const key in localStorageMock) delete localStorageMock[key];
    mockSpeechCancel.mockClear();
    mockSpeechSpeak.mockClear();
    mockGetVoices.mockClear();
    mockAudioInstances.length = 0;
  });

  // ==================== 常量测试 ====================
  describe('VOICE_PRESETS', () => {
    test('包含美式和英式预设', () => {
      const ids = VOICE_PRESETS.map((p: any) => p.id);
      expect(ids).toContain('us');
      expect(ids).toContain('uk');
    });

    test('包含中文和粤语预设', () => {
      const ids = VOICE_PRESETS.map((p: any) => p.id);
      expect(ids).toContain('cn');
      expect(ids).toContain('hk');
    });

    test('每个预设都有必要字段', () => {
      for (const preset of VOICE_PRESETS) {
        expect(preset.id).toBeDefined();
        expect(preset.name).toBeDefined();
        expect(preset.accent).toBeDefined();
        expect(preset.male).toBeDefined();
        expect(preset.female).toBeDefined();
        expect(typeof preset.male).toBe('string');
        expect(typeof preset.female).toBe('string');
      }
    });

    test('美式预设使用 en-US 声音', () => {
      const us = VOICE_PRESETS.find((p: any) => p.id === 'us');
      expect(us.male).toContain('en-US');
      expect(us.female).toContain('en-US');
    });

    test('英式预设使用 en-GB 声音', () => {
      const uk = VOICE_PRESETS.find((p: any) => p.id === 'uk');
      expect(uk.male).toContain('en-GB');
      expect(uk.female).toContain('en-GB');
    });
  });

  describe('CHINESE_VOICES', () => {
    test('包含中文声音列表', () => {
      expect(CHINESE_VOICES.length).toBeGreaterThan(0);
    });

    test('每个声音都有必要字段', () => {
      for (const voice of CHINESE_VOICES) {
        expect(voice.id).toBeDefined();
        expect(voice.name).toBeDefined();
        expect(voice.gender).toBeDefined();
        expect(voice.desc).toBeDefined();
        expect(voice.tags).toBeDefined();
        expect(Array.isArray(voice.tags)).toBe(true);
        expect(['male', 'female']).toContain(voice.gender);
      }
    });

    test('包含男声和女声', () => {
      const males = CHINESE_VOICES.filter((v: any) => v.gender === 'male');
      const females = CHINESE_VOICES.filter((v: any) => v.gender === 'female');
      expect(males.length).toBeGreaterThan(0);
      expect(females.length).toBeGreaterThan(0);
    });

    test('声音ID使用 zh-CN 前缀', () => {
      for (const voice of CHINESE_VOICES) {
        expect(voice.id).toMatch(/^zh-CN-/);
      }
    });
  });

  describe('CANTONESE_VOICES', () => {
    test('包含粤语声音列表', () => {
      expect(CANTONESE_VOICES.length).toBeGreaterThan(0);
    });

    test('声音ID使用 zh-HK 前缀', () => {
      for (const voice of CANTONESE_VOICES) {
        expect(voice.id).toMatch(/^zh-HK-/);
      }
    });

    test('每个声音都有必要字段', () => {
      for (const voice of CANTONESE_VOICES) {
        expect(voice.id).toBeDefined();
        expect(voice.name).toBeDefined();
        expect(['male', 'female']).toContain(voice.gender);
        expect(Array.isArray(voice.tags)).toBe(true);
      }
    });
  });

  describe('EMOTION_DESCRIPTIONS', () => {
    test('包含所有情感类型', () => {
      expect(EMOTION_DESCRIPTIONS.neutral).toBeDefined();
      expect(EMOTION_DESCRIPTIONS.happy).toBeDefined();
      expect(EMOTION_DESCRIPTIONS.sad).toBeDefined();
      expect(EMOTION_DESCRIPTIONS.angry).toBeDefined();
      expect(EMOTION_DESCRIPTIONS.fearful).toBeDefined();
      expect(EMOTION_DESCRIPTIONS.gentle).toBeDefined();
      expect(EMOTION_DESCRIPTIONS.serious).toBeDefined();
      expect(EMOTION_DESCRIPTIONS.cheerful).toBeDefined();
      expect(EMOTION_DESCRIPTIONS.affectionate).toBeDefined();
      expect(EMOTION_DESCRIPTIONS.lyrical).toBeDefined();
    });

    test('每个情感都有 name、emoji 和 desc', () => {
      for (const key of Object.keys(EMOTION_DESCRIPTIONS)) {
        const emotion = EMOTION_DESCRIPTIONS[key as keyof typeof EMOTION_DESCRIPTIONS];
        expect(emotion.name).toBeDefined();
        expect(emotion.emoji).toBeDefined();
        expect(emotion.desc).toBeDefined();
        expect(typeof emotion.name).toBe('string');
        expect(typeof emotion.emoji).toBe('string');
        expect(typeof emotion.desc).toBe('string');
      }
    });
  });

  // ==================== splitMixedText ====================
  describe('splitMixedText', () => {
    test('纯中文文本', () => {
      const segments = splitMixedText('你好世界');
      expect(segments).toHaveLength(1);
      expect(segments[0].text).toBe('你好世界');
      expect(segments[0].type).toBe('chinese');
    });

    test('纯英文文本', () => {
      const segments = splitMixedText('Hello World');
      expect(segments).toHaveLength(2);
      expect(segments[0].text).toBe('Hello');
      expect(segments[0].type).toBe('english');
      expect(segments[1].text).toBe('World');
      expect(segments[1].type).toBe('english');
    });

    test('数字', () => {
      const segments = splitMixedText('123');
      expect(segments).toHaveLength(1);
      expect(segments[0].text).toBe('123');
      expect(segments[0].type).toBe('number');
    });

    test('标点符号', () => {
      const segments = splitMixedText('!@#');
      for (const seg of segments) {
        expect(seg.type).toBe('punctuation');
      }
    });

    test('中英文混合文本', () => {
      const segments = splitMixedText('Hello你好World');
      const types = segments.map((s: any) => s.type);
      expect(types).toContain('english');
      expect(types).toContain('chinese');
    });

    test('包含数字的混合文本', () => {
      const segments = splitMixedText('第1课');
      const types = segments.map((s: any) => s.type);
      expect(types).toContain('chinese');
      expect(types).toContain('number');
    });

    test('空字符串返回空数组', () => {
      const segments = splitMixedText('');
      expect(segments).toHaveLength(0);
    });

    test('中英文标点混合', () => {
      const segments = splitMixedText('你好,Hello!');
      expect(segments.length).toBeGreaterThan(1);
      const types = segments.map((s: any) => s.type);
      expect(types).toContain('chinese');
      expect(types).toContain('english');
    });
  });

  // ==================== getSpeechRate / setSpeechRate ====================
  describe('speechRate', () => {
    test('默认语速为 slow', () => {
      expect(getSpeechRate()).toBe('slow');
    });

    test('可以设置语速为 normal', () => {
      setSpeechRate('normal');
      expect(getSpeechRate()).toBe('normal');
    });

    test('可以设置语速为 fast', () => {
      setSpeechRate('fast');
      expect(getSpeechRate()).toBe('fast');
    });

    test('设置后可切换回 slow', () => {
      setSpeechRate('fast');
      setSpeechRate('slow');
      expect(getSpeechRate()).toBe('slow');
    });
  });

  // ==================== getWordVoiceConfig / setWordVoiceConfig ====================
  describe('wordVoiceConfig', () => {
    test('未设置时返回默认配置', () => {
      const config = getWordVoiceConfig('hello');
      expect(config).toEqual({ rate: 'slow' });
    });

    test('可以设置单词声音配置', () => {
      setWordVoiceConfig('hello', { voiceId: 'test-voice', rate: 'normal' });
      const config = getWordVoiceConfig('hello');
      expect(config.voiceId).toBe('test-voice');
      expect(config.rate).toBe('normal');
    });

    test('单词配置不区分大小写', () => {
      setWordVoiceConfig('Hello', { voiceId: 'test-voice' });
      const config = getWordVoiceConfig('hello');
      expect(config.voiceId).toBe('test-voice');
      const config2 = getWordVoiceConfig('HELLO');
      expect(config2.voiceId).toBe('test-voice');
    });

    test('保存到 localStorage', () => {
      setWordVoiceConfig('test', { voiceId: 'voice-1', rate: 'fast' });
      expect(localStorageMock['word-voice-configs']).toBeDefined();
      const saved = JSON.parse(localStorageMock['word-voice-configs']);
      expect(saved.test.voiceId).toBe('voice-1');
    });

    test('resetWordVoiceConfig 重置单个单词配置', () => {
      setWordVoiceConfig('hello', { voiceId: 'test-voice' });
      resetWordVoiceConfig('hello');
      const config = getWordVoiceConfig('hello');
      expect(config).toEqual({ rate: 'slow' });
    });

    test('resetAllWordVoiceConfigs 重置所有配置', () => {
      setWordVoiceConfig('hello', { voiceId: 'v1' });
      setWordVoiceConfig('world', { voiceId: 'v2' });
      resetAllWordVoiceConfigs();
      expect(getWordVoiceConfig('hello')).toEqual({ rate: 'slow' });
      expect(getWordVoiceConfig('world')).toEqual({ rate: 'slow' });
    });
  });

  // ==================== getCurrentPreset / setVoicePreset ====================
  describe('voicePreset', () => {
    test('默认预设为美式英语', () => {
      const preset = getCurrentPreset();
      expect(preset.id).toBe('us');
    });

    test('可以切换到英式预设', () => {
      setVoicePreset('uk');
      const preset = getCurrentPreset();
      expect(preset.id).toBe('uk');
      expect(preset.name).toBe('英式英语');
    });

    test('可以切换到中文预设', () => {
      setVoicePreset('cn');
      const preset = getCurrentPreset();
      expect(preset.id).toBe('cn');
      expect(preset.name).toBe('普通话');
    });

    test('无效预设 ID 不改变当前预设', () => {
      setVoicePreset('us');
      setVoicePreset('invalid-id');
      const preset = getCurrentPreset();
      expect(preset.id).toBe('us');
    });

    test('切换预设保存到 localStorage', () => {
      setVoicePreset('uk');
      expect(localStorageMock['voice-preset']).toBe('uk');
    });

    test('切换预设时清除角色自定义声音', () => {
      setSpeakerVoice('A', 'custom-voice');
      setVoicePreset('uk');
      expect(localStorageMock['speaker-voices']).toBeUndefined();
    });
  });

  // ==================== getSpeakerVoice / setSpeakerVoice ====================
  describe('speakerVoice', () => {
    test('未设置角色声音时使用预设默认声音', () => {
      setVoicePreset('us');
      const voice = getSpeakerVoice('A');
      expect(typeof voice).toBe('string');
      expect(voice.length).toBeGreaterThan(0);
    });

    test('设置角色声音后返回自定义声音', () => {
      setSpeakerVoice('A', 'custom-voice-id');
      const voice = getSpeakerVoice('A');
      expect(voice).toBe('custom-voice-id');
    });

    test('角色标识不区分大小写', () => {
      setSpeakerVoice('a', 'custom-voice');
      const voice = getSpeakerVoice('A');
      expect(voice).toBe('custom-voice');
    });

    test('保存到 localStorage', () => {
      setSpeakerVoice('B', 'voice-b');
      expect(localStorageMock['speaker-voices']).toBeDefined();
      const saved = JSON.parse(localStorageMock['speaker-voices']);
      expect(saved.B).toBe('voice-b');
    });
  });

  // ==================== 中文声音配置 ====================
  describe('中文声音配置', () => {
    test('默认中文声音', () => {
      expect(getCurrentChineseVoice()).toBe('zh-CN-XiaoxiaoNeural');
    });

    test('设置中文声音', () => {
      setChineseVoice('zh-CN-YunxiNeural');
      expect(getCurrentChineseVoice()).toBe('zh-CN-YunxiNeural');
    });

    test('设置中文声音保存到 localStorage', () => {
      setChineseVoice('zh-CN-YunxiNeural');
      expect(localStorageMock['chinese-voice']).toBe('zh-CN-YunxiNeural');
    });

    test('默认中文语速', () => {
      expect(getCurrentChineseRate()).toBe('slow');
    });

    test('设置中文语速', () => {
      setChineseRate('fast');
      expect(getCurrentChineseRate()).toBe('fast');
    });

    test('设置中文语速保存到 localStorage', () => {
      setChineseRate('normal');
      expect(localStorageMock['chinese-rate']).toBe('normal');
    });
  });

  // ==================== 中文情感配置 ====================
  describe('中文情感配置', () => {
    test('默认情感为 neutral', () => {
      expect(getCurrentChineseEmotion()).toBe('neutral');
    });

    test('可以设置情感', () => {
      setChineseEmotion('happy');
      expect(getCurrentChineseEmotion()).toBe('happy');
    });

    test('设置情感保存到 localStorage', () => {
      setChineseEmotion('sad');
      expect(localStorageMock['chinese-emotion']).toBe('sad');
    });

    test('切换不同情感', () => {
      setChineseEmotion('angry');
      expect(getCurrentChineseEmotion()).toBe('angry');
      setChineseEmotion('gentle');
      expect(getCurrentChineseEmotion()).toBe('gentle');
    });
  });

  // ==================== getWordVoice ====================
  describe('getWordVoice', () => {
    test('未配置单词时返回预设女声', () => {
      setVoicePreset('us');
      const voice = getWordVoice('unknown');
      expect(typeof voice).toBe('string');
      expect(voice.length).toBeGreaterThan(0);
    });

    test('配置了自定义声音时返回自定义声音', () => {
      setWordVoiceConfig('hello', { voiceId: 'custom-voice' });
      const voice = getWordVoice('hello');
      expect(voice).toBe('custom-voice');
    });

    test('不区分大小写', () => {
      setWordVoiceConfig('test', { voiceId: 'test-voice' });
      expect(getWordVoice('TEST')).toBe('test-voice');
      expect(getWordVoice('Test')).toBe('test-voice');
    });
  });

  // ==================== TTS 可用性检查 ====================
  describe('TTS 可用性', () => {
    test('isEdgeTTSAvailable 返回 boolean', () => {
      expect(typeof isEdgeTTSAvailable()).toBe('boolean');
    });

    test('isTTSAvailable 返回 true（有 speechSynthesis）', () => {
      expect(isTTSAvailable()).toBe(true);
    });
  });

  // ==================== stopSpeaking ====================
  describe('stopSpeaking', () => {
    test('调用 speechSynthesis.cancel', () => {
      stopSpeaking();
      expect(mockSpeechCancel).toHaveBeenCalled();
    });
  });

  // ==================== 英文朗读函数（Web Speech API fallback）====================
  describe('英文朗读', () => {
    test('speakEnglish 使用 Web Speech API', async () => {
      setVoicePreset('us');
      await speakEnglish('Hello', 'slow');
      expect(mockSpeechCancel).toHaveBeenCalled();
      expect(mockSpeechSpeak).toHaveBeenCalled();
    });

    test('speakWord 朗读单词', async () => {
      await speakWord('test');
      expect(mockSpeechSpeak).toHaveBeenCalled();
    });

    test('speakSentence 朗读句子', async () => {
      await speakSentence('Hello World');
      expect(mockSpeechSpeak).toHaveBeenCalled();
    });

    test('speakWordWithVoice 使用指定声音', async () => {
      await speakWordWithVoice('hello', 'en-US-AriaNeural', 'slow');
      expect(mockSpeechSpeak).toHaveBeenCalled();
    });

    test('speakSentenceWithVoice 使用指定声音', async () => {
      await speakSentenceWithVoice('Hello World', 'en-US-AriaNeural', 'normal');
      expect(mockSpeechSpeak).toHaveBeenCalled();
    });

    test('speakEnglish 带角色', async () => {
      setVoicePreset('us');
      await speakEnglish('Hello', 'normal', 'A');
      expect(mockSpeechSpeak).toHaveBeenCalled();
    });
  });

  // ==================== 中文朗读函数 ====================
  describe('中文朗读', () => {
    test('speakChinese 使用 Web Speech API', async () => {
      await speakChinese('你好');
      expect(mockSpeechCancel).toHaveBeenCalled();
      expect(mockSpeechSpeak).toHaveBeenCalled();
    });

    test('speakChineseSentence 朗读句子', async () => {
      await speakChineseSentence('你好世界');
      expect(mockSpeechSpeak).toHaveBeenCalled();
    });

    test('speakChineseParagraph 朗读段落', async () => {
      await speakChineseParagraph('这是一段话');
      expect(mockSpeechSpeak).toHaveBeenCalled();
    });

    test('speakChineseWithEmotion neutral 情感', async () => {
      await speakChineseWithEmotion('你好', 'neutral');
      expect(mockSpeechSpeak).toHaveBeenCalled();
    });

    test('speakChineseWithEmotion happy 情感', async () => {
      await speakChineseWithEmotion('你好', 'happy');
      expect(mockSpeechSpeak).toHaveBeenCalled();
    });

    test('speakWithDifferentEmotions 多情感朗读', async () => {
      await speakWithDifferentEmotions('你好', ['neutral', 'happy']);
      // 每个情感调用一次 speak
      expect(mockSpeechSpeak).toHaveBeenCalledTimes(2);
    });
  });

  // ==================== 混合文本朗读 ====================
  describe('混合文本朗读', () => {
    test('speakMixedText 混合中英文', async () => {
      await speakMixedText('Hello你好World');
      expect(mockSpeechSpeak).toHaveBeenCalled();
    });

    test('speakExampleWithTranslation 朗读例句和翻译', async () => {
      await speakExampleWithTranslation('Hello', '你好');
      expect(mockSpeechSpeak).toHaveBeenCalled();
    });

    test('speakGrammarContent 朗读语法讲解', async () => {
      await speakGrammarContent('This is主语');
      expect(mockSpeechSpeak).toHaveBeenCalled();
    });
  });

  // ==================== 指定声音朗读 ====================
  describe('指定声音朗读', () => {
    test('speakWithVoice 使用指定声音', async () => {
      await speakWithVoice('Hello', 'en-US-AriaNeural', 'normal');
      expect(mockSpeechSpeak).toHaveBeenCalled();
    });

    test('speakWithVoice 默认语速', async () => {
      await speakWithVoice('Hello', 'en-US-AriaNeural');
      expect(mockSpeechSpeak).toHaveBeenCalled();
    });
  });

  // ==================== fetchEdgeVoices ====================
  describe('fetchEdgeVoices', () => {
    test('无 electronAPI 时返回空数组', async () => {
      const result = await fetchEdgeVoices();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  // ==================== getAvailableVoices ====================
  describe('getAvailableVoices', () => {
    test('使用 Web Speech API 降级', async () => {
      const voices = await getAvailableVoices();
      expect(Array.isArray(voices)).toBe(true);
    });
  });

  // ==================== preloadVoices ====================
  describe('preloadVoices', () => {
    test('不抛出异常', async () => {
      await expect(preloadVoices()).resolves.toBeUndefined();
    });
  });

  // ==================== Edge TTS 路径测试 ====================
  describe('Edge TTS 路径', () => {
    const mockEdgeTtsSpeak = jest.fn().mockResolvedValue({ success: true, audio: 'data:audio/mp3;base64,abc' });
    const mockEdgeTtsTest = jest.fn().mockResolvedValue({ available: true });
    const mockEdgeTtsStop = jest.fn().mockResolvedValue(undefined);
    const mockEdgeTtsGetVoices = jest.fn().mockResolvedValue([
      { id: 'en-US-AriaNeural', name: 'Aria', lang: 'en-US', gender: 'female', accent: 'US', desc: '' },
    ]);
    const mockEdgeTtsSpeakSSML = jest.fn().mockResolvedValue({ success: true, audio: 'data:audio/mp3;base64,ssml' });

    beforeEach(() => {
      (global as any).window = {
        ...window,
        speechSynthesis: {
          getVoices: mockGetVoices,
          cancel: mockSpeechCancel,
          speak: mockSpeechSpeak,
        },
        electronAPI: {
          edgeTtsSpeak: mockEdgeTtsSpeak,
          edgeTtsTest: mockEdgeTtsTest,
          edgeTtsStop: mockEdgeTtsStop,
          edgeTtsGetVoices: mockEdgeTtsGetVoices,
          edgeTtsSpeakSSML: mockEdgeTtsSpeakSSML,
        },
      };
      mockEdgeTtsSpeak.mockClear();
      mockEdgeTtsTest.mockClear();
      mockEdgeTtsGetVoices.mockClear();
      mockEdgeTtsSpeakSSML.mockClear();
      mockAudioInstances.length = 0;
    });

    test('preloadVoices 初始化 Edge TTS', async () => {
      localStorageMock['word-voice-configs'] = JSON.stringify({ hello: { voiceId: 'v1' } });
      await preloadVoices();
      expect(mockEdgeTtsTest).toHaveBeenCalled();
    });

    test('fetchEdgeVoices 返回声音列表', async () => {
      // 先初始化 Edge TTS
      await preloadVoices();
      const voices = await fetchEdgeVoices();
      expect(voices).toHaveLength(1);
      expect(voices[0].id).toBe('en-US-AriaNeural');
    });

    test('speakEnglish 使用 Edge TTS', async () => {
      await preloadVoices();
      await speakEnglish('Hello', 'slow');
      expect(mockEdgeTtsSpeak).toHaveBeenCalled();
    });

    test('speakWord 使用 Edge TTS', async () => {
      await preloadVoices();
      await speakWord('test');
      expect(mockEdgeTtsSpeak).toHaveBeenCalled();
    });

    test('speakSentence 使用 Edge TTS', async () => {
      await preloadVoices();
      await speakSentence('Hello World');
      expect(mockEdgeTtsSpeak).toHaveBeenCalled();
    });

    test('speakChinese 使用 Edge TTS', async () => {
      await preloadVoices();
      await speakChinese('你好');
      expect(mockEdgeTtsSpeak).toHaveBeenCalled();
    });

    test('speakChineseWithEmotion neutral 情感使用普通朗读', async () => {
      await preloadVoices();
      await speakChineseWithEmotion('你好', 'neutral');
      expect(mockEdgeTtsSpeak).toHaveBeenCalled();
    });

    test('speakChineseWithEmotion happy 情感使用 SSML', async () => {
      await preloadVoices();
      await speakChineseWithEmotion('你好', 'happy');
      // SSML 接口应该被调用（如果可用），否则降级到普通接口
      expect(mockEdgeTtsSpeakSSML).toHaveBeenCalled();
    });

    test('speakText 逐句朗读', async () => {
      await preloadVoices();
      await speakText([{ speaker: 'A', content: 'Hello' }, { speaker: 'B', content: 'World' }]);
      expect(mockEdgeTtsSpeak).toHaveBeenCalledTimes(2);
    });

    test('speakWithVoice 使用 Edge TTS', async () => {
      await preloadVoices();
      await speakWithVoice('Hello', 'en-US-AriaNeural', 'normal');
      expect(mockEdgeTtsSpeak).toHaveBeenCalled();
    });

    test('getAvailableVoices 使用 Edge TTS', async () => {
      await preloadVoices();
      const voices = await getAvailableVoices();
      expect(voices).toHaveLength(1);
    });

    test('stopSpeaking 停止 Edge TTS', async () => {
      await preloadVoices();
      // 先播放一个音频
      await speakWord('test');
      stopSpeaking();
      expect(mockSpeechCancel).toHaveBeenCalled();
    });
  });
});
