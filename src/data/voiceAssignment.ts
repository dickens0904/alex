/**
 * 角色→音色分配纯逻辑模块（零浏览器/零 Electron 依赖）
 *
 * 被两处共用，保证"预生成 MP3 缓存"与"在线朗读"使用同一套角色方案：
 *  - src/services/tts.ts（运行时在线朗读）
 *  - scripts/generate-tts-cache.ts（离线预生成兜底 MP3）
 *
 * 分配优先级：用户自定义 > 人设音色（SPEAKER_VOICE_HINTS，仅美式）>
 * 同组（性别×年龄段）错开分配 > hash 兜底。
 */

import { getSpeakerGender, SPEAKER_VOICE_HINTS } from './speakerGender';

/**
 * 同性别多角色声音池：多人对话时多个男/女角色按角色名稳定分配池中不同声音，
 * 避免"所有男角色一个声音"。池第 0 位为该口音的默认声。
 * 角色名 → hash → 池索引，同名角色跨课声音一致。
 */
export const VOICE_POOLS: Record<
  string,
  { adult: { male: string[]; female: string[] }; child: { male: string[]; female: string[] }; elder: { male: string[]; female: string[] } }
> = {
  us: {
    adult: {
      male: ['en-US-GuyNeural', 'en-US-ChristopherNeural', 'en-US-EricNeural', 'en-US-AndrewNeural', 'en-US-BrianNeural', 'en-US-RogerNeural'],
      female: ['en-US-AriaNeural', 'en-US-JennyNeural', 'en-US-MichelleNeural', 'en-US-AvaNeural', 'en-US-EmmaNeural', 'en-US-AvaMultilingualNeural'],
    },
    child: {
      male: ['en-US-BrianNeural'], // Edge 暂无英语男童声，用最年轻的休闲男声替代
      female: ['en-US-AnaNeural'],
    },
    elder: {
      male: ['en-US-ChristopherNeural'],
      female: ['en-US-AvaNeural'],
    },
  },
  uk: {
    adult: {
      male: ['en-GB-RyanNeural', 'en-GB-ThomasNeural'],
      female: ['en-GB-SoniaNeural', 'en-GB-LibbyNeural', 'en-GB-MaisieNeural'],
    },
    child: {
      male: ['en-GB-ThomasNeural'], // Edge 暂无英语男童声
      female: ['en-GB-MaisieNeural'],
    },
    elder: {
      male: ['en-GB-RyanNeural'],
      female: ['en-GB-SoniaNeural'],
    },
  },
  cn: {
    adult: {
      male: ['zh-CN-YunxiNeural', 'zh-CN-YunjianNeural'],
      female: ['zh-CN-XiaoxiaoNeural', 'zh-CN-XiaoyiNeural'],
    },
    child: {
      male: ['zh-CN-YunxiNeural'],
      female: ['zh-CN-XiaoyiNeural'],
    },
    elder: {
      male: ['zh-CN-YunjianNeural'],
      female: ['zh-CN-XiaoxiaoNeural'],
    },
  },
  hk: {
    adult: {
      male: ['zh-HK-WanLungNeural'],
      female: ['zh-HK-HiuMaanNeural'],
    },
    child: {
      male: ['zh-HK-WanLungNeural'],
      female: ['zh-HK-HiuGaaiNeural'],
    },
    elder: {
      male: ['zh-HK-WanLungNeural'],
      female: ['zh-HK-HiuMaanNeural'],
    },
  },
};

/** 儿童角色（用童声池） */
export const CHILD_SPEAKERS = new Set([
  'BOY', 'GIRL', 'SON', 'DAUGHTER', 'CHILD', 'KID', 'LITTLE BOY', 'LITTLE GIRL', 'BOYS', 'GIRLS',
]);

/** 长辈角色（用沉稳声池） */
export const ELDER_SPEAKERS = new Set([
  'GRANDFATHER', 'GRANDMOTHER', 'OLD MAN', 'OLD WOMAN', 'GRANDPA', 'GRANDMA',
]);

/** 判断角色的声音年龄段：child（儿童）/ elder（长辈）/ adult（成人） */
export function getSpeakerVoiceAge(speakerKey: string): 'child' | 'elder' | 'adult' {
  if (CHILD_SPEAKERS.has(speakerKey)) return 'child';
  if (ELDER_SPEAKERS.has(speakerKey)) return 'elder';
  return 'adult';
}

/** 角色名稳定 hash（djb2）：同名角色永远得到同一声音 */
export function speakerHash(speaker: string): number {
  let h = 5381;
  for (let i = 0; i < speaker.length; i++) {
    h = (((h << 5) + h + speaker.charCodeAt(i)) >>> 0);
  }
  return h;
}

/** 获取指定性别+年龄段的声音池（无配置时回退预设默认声） */
export function getVoicePool(
  presetId: string,
  gender: 'male' | 'female',
  age: 'child' | 'elder' | 'adult',
  defaultMale: string,
  defaultFemale: string
): string[] {
  const pool = VOICE_POOLS[presetId]?.[age]?.[gender];
  return pool && pool.length > 0 ? pool : [gender === 'male' ? defaultMale : defaultFemale];
}

/** buildLessonVoiceMap 的选项（把运行时状态显式传入，保持模块纯净） */
export interface LessonVoiceMapOptions {
  /** 口音预设 id（us/uk/cn/hk）；人设 hint 仅 us 生效 */
  presetId: string;
  /** 该预设默认男声（池缺失时兜底） */
  defaultMale: string;
  /** 该预设默认女声（池缺失时兜底，neutral 角色也用它） */
  defaultFemale: string;
  /** 用户自定义音色（speaker 大写键 → voiceId），最优先 */
  userVoices?: Record<string, string>;
}

/**
 * 构建本篇朗读的角色→声音分配表。
 * 按"性别 × 年龄段"分组（男/女 × 成人/儿童/长辈），同组内多个角色按名字 hash
 * 排序后依次从声音池取不同声音——多男多女角色互不撞声；
 * 同名角色跨课声音一致（hash 稳定），用户手动指定的音色始终最优先。
 */
export function buildLessonVoiceMap(
  paragraphs: Array<{ speaker?: string; content: string }>,
  options: LessonVoiceMapOptions
): Map<string, string> {
  const { presetId, defaultMale, defaultFemale, userVoices = {} } = options;
  const map = new Map<string, string>();
  const groups = new Map<string, string[]>(); // key: `${gender}:${age}`
  const seen = new Set<string>();
  for (const p of paragraphs) {
    if (!p.speaker) continue;
    const key = p.speaker.toUpperCase();
    if (seen.has(key)) continue;
    seen.add(key);
    if (userVoices[key]) {
      map.set(key, userVoices[key]); // 用户自定义最优先
      continue;
    }
    const gender = getSpeakerGender(p.speaker);
    const age = getSpeakerVoiceAge(key);
    const gk = `${gender}:${age}`;
    if (!groups.has(gk)) groups.set(gk, []);
    groups.get(gk)!.push(key);
  }
  for (const [gk, names] of groups) {
    const [gender, age] = gk.split(':') as ['male' | 'female' | 'neutral', 'child' | 'elder' | 'adult'];
    const pool =
      gender === 'male' || gender === 'female'
        ? getVoicePool(presetId, gender, age, defaultMale, defaultFemale)
        : [defaultFemale]; // neutral（旁白/复数）用默认女声
    names.sort((a, b) => speakerHash(a) - speakerHash(b));
    // 人设音色优先：按角色身份/性格分配符合课文的声音（仅美式预设），
    // hint 声音被本组占用时回退到组内错开分配，保证同课不撞声
    const used = new Set<string>();
    const rest: string[] = [];
    for (const name of names) {
      const hint = presetId === 'us' ? SPEAKER_VOICE_HINTS[name] : undefined;
      if (hint && pool.includes(hint) && !used.has(hint)) {
        map.set(name, hint);
        used.add(hint);
      } else {
        rest.push(name);
      }
    }
    const free = pool.filter((v) => !used.has(v));
    rest.forEach((name, i) => {
      const target = free.length > 0 ? free : pool;
      map.set(name, target[i % target.length]);
    });
  }
  return map;
}

/** 剧场 cast 成员（性别/年龄由画面原型决定，而非 GENDER_MAP——cast key 跨课复用且性别不同） */
export interface CastMember {
  /** 大写后的 cast key（如 'A'、'N'） */
  key: string;
  gender: 'male' | 'female' | 'neutral';
  age: 'child' | 'elder' | 'adult';
}

/**
 * 剧场专用：按画面原型性别构建 cast key → 声音分配表。
 * 与 buildLessonVoiceMap 同款"同组错开"逻辑，但性别/年龄段显式传入——
 * 剧本 cast key（A/B/C…）跨课复用且性别各异，无法进全局映射表。
 */
export function buildCastVoiceMap(
  cast: CastMember[],
  options: Pick<LessonVoiceMapOptions, 'presetId' | 'defaultMale' | 'defaultFemale' | 'userVoices'>
): Map<string, string> {
  const { presetId, defaultMale, defaultFemale, userVoices = {} } = options;
  const map = new Map<string, string>();
  const groups = new Map<string, string[]>();
  for (const m of cast) {
    const key = m.key.toUpperCase();
    if (!key || map.has(key)) continue;
    if (userVoices[key]) {
      map.set(key, userVoices[key]);
      continue;
    }
    const gk = `${m.gender}:${m.age}`;
    if (!groups.has(gk)) groups.set(gk, []);
    groups.get(gk)!.push(key);
  }
  for (const [gk, names] of groups) {
    const [gender, age] = gk.split(':') as ['male' | 'female' | 'neutral', 'child' | 'elder' | 'adult'];
    const pool =
      gender === 'male' || gender === 'female'
        ? getVoicePool(presetId, gender, age, defaultMale, defaultFemale)
        : [defaultFemale]; // neutral（旁白）用默认女声，与预生成缓存一致
    names.sort((a, b) => speakerHash(a) - speakerHash(b));
    names.forEach((name, i) => {
      map.set(name, pool[i % pool.length]);
    });
  }
  return map;
}
