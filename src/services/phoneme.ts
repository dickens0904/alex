/**
 * 音素级发音诊断（纯逻辑，无副作用，便于单测）
 *
 * 目标：把「读得不太好」拆成「哪个词、哪个音素没读对」。
 *
 * 音素来源有两条路径，且**两侧必须走同一条口径**，否则会出现"目标用词典音、
 * 孩子用规则音"这种必然对不上的假报错。统一口径为：
 *   - 每个音素一个 token，只允许单字符 IPA 符号；
 *   - 长音记号 ː 是独立 token（/miː/ → ['m','i','ː']）；
 *   - 双元音/塞擦音拆开（/aɪ/ → ['a','ɪ']，/tʃ/ → ['t','ʃ']）。
 *   词典侧 parseIpa 与规则侧 englishG2P 都遵守，对齐才有效。
 *
 * 音素来源：
 *   1. 词典优先：课内生词的 IPA 就写在课程数据里（vocabulary[].phonetic），
 *      这是真人注音，最可靠；
 *   2. 规则兜底：词典没有的词走英文 grapheme→phoneme 规则 + 高频不规则词表。
 *
 * 说明：这里做的是「音素对齐诊断」，不是声学强制对齐（forced alignment）。
 * 后者需要发音评估声学模型，体积数百 MB，与本软件「离线随包分发」的约束冲突；
 * 前者用识别文本 + 发音词典就能定位到具体音素，足够回答"孩子哪里没读对"。
 * 声学层面的补充（停顿、语速、音量稳定性）见 analyzeAcoustics。
 */

import { fluencyScore, type FluencyResult } from './acoustics';

/** 音素符号（IPA，与课程数据里的注音一致） */
export type Phoneme = string;

/** 词条音素字典：小写词 → 音素序列（已去重音符号，保留 ː 长音记号） */
export type PhonemeDict = Map<string, Phoneme[]>;

// ---------------------------------------------------------------------------
// 1. IPA 解析：把 "/ɪkˈskjuːz/" 变成 ['ɪ','k','s','k','j','u','ː','z']
// ---------------------------------------------------------------------------

/** 需要剔除的附加符号：主/次重音、半长音、注记符。注意 ː 不在此列（长音要保留） */
const DIACRITICS = ['ˈ', 'ˌ', 'ˑ', '⁎', '⁻', '̪', '̺', '̻'];

const LONG_MARK = 'ː';

/**
 * 解析一条 IPA 注音为音素数组。
 * 容忍：首尾斜杠、重音记号、空格、中文括号备注；保留 ː 作为独立 token。
 */
export function parseIpa(raw: string): Phoneme[] {
  if (!raw) return [];
  let s = raw.trim();
  // 先去掉括号里的备注（如 /ˈveri/（英）），否则备注挡在尾部会让斜杠去不干净
  s = s.replace(/[（(][^）)]*[）)]/g, '');
  // 再去掉首尾斜杠
  s = s.replace(/^\/+/, '').replace(/\/+$/, '');
  // 去掉重音等附加符号
  for (const d of DIACRITICS) s = s.replace(new RegExp(escapeRegExp(d), 'g'), '');

  const out: Phoneme[] = [];
  let pendingLong = false;
  for (const ch of s) {
    if (ch === LONG_MARK) {
      // ː 归属于前一个音素，但作为独立 token 保留（与 g2p 输出同口径）
      if (out.length > 0) {
        pendingLong = true;
      }
      continue;
    }
    if (pendingLong) {
      out.push(LONG_MARK);
      pendingLong = false;
    }
    if (ch.trim()) out.push(ch);
  }
  if (pendingLong) out.push(LONG_MARK);
  return out;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * 从课程词汇表构建音素字典。
 * 同名词只保留第一次出现的注音（同一课内重复词注音一致）。
 */
export function buildPhonemeDict(
  vocabulary: Array<{ word: string; phonetic?: string }>
): PhonemeDict {
  const dict = new Map<string, Phoneme[]>();
  for (const v of vocabulary) {
    const key = v.word.trim().toLowerCase();
    if (!key || dict.has(key)) continue;
    const phonemes = parseIpa(v.phonetic ?? '');
    if (phonemes.length > 0) dict.set(key, phonemes);
  }
  return dict;
}

// ---------------------------------------------------------------------------
// 2. 规则 G2P（词典未收录的词）
// ---------------------------------------------------------------------------

/**
 * 高频不规则词表：这些词走规则必然读错，而它们恰恰是第一册最高频的词
 * （多为功能词，常不在课内生词表里，词典兜不住），读错会造成大面积假报错。
 * 全部使用与词典一致的单字符 token 口径。
 */
const IRREGULAR_G2P: Record<string, Phoneme[]> = {
  // 功能词
  a: ['ə'], the: ['ð', 'ə'], to: ['t', 'u', 'ː'], do: ['d', 'u', 'ː'], who: ['h', 'u', 'ː'],
  you: ['j', 'u', 'ː'], your: ['j', 'ɔ', 'ː'], yours: ['j', 'ɔ', 'ː', 'z'],
  i: ['a', 'ɪ'], "i'm": ['a', 'ɪ', 'm'], "i've": ['a', 'ɪ', 'v'], "i'll": ['a', 'ɪ', 'l'],
  is: ['ɪ', 'z'], as: ['æ', 'z'], his: ['h', 'ɪ', 'z'], has: ['h', 'æ', 'z'],
  was: ['w', 'ɒ', 'z'], were: ['w', 'ɜ', 'ː'], are: ['ɑ', 'ː'],
  does: ['d', 'ʌ', 'z'], goes: ['ɡ', 'ə', 'ʊ', 'z'], said: ['s', 'e', 'd'], says: ['s', 'e', 'z'],
  "don't": ['d', 'ə', 'ʊ', 'n', 't'], "doesn't": ['d', 'ʌ', 'z', 'ə', 'n', 't'], "aren't": ['ɑ', 'ː', 'n', 't'],
  "he's": ['h', 'i', 'ː', 'z'], "she's": ['ʃ', 'i', 'ː', 'z'], "it's": ['ɪ', 't', 's'],
  "that's": ['ð', 'æ', 't', 's'], "there's": ['ð', 'e', 'ə', 'z'], "here's": ['h', 'ɪ', 'ə', 'z'], "what's": ['w', 'ɒ', 't', 's'],
  mr: ['m', 'ɪ', 's', 't', 'ə'], mrs: ['m', 'ɪ', 's', 'ɪ', 'z'],
  // 魔法 e 的例外（a/u 读短音）
  have: ['h', 'æ', 'v'], give: ['ɡ', 'ɪ', 'v'], live: ['l', 'ɪ', 'v'],
  come: ['k', 'ʌ', 'm'], some: ['s', 'ʌ', 'm'], done: ['d', 'ʌ', 'n'], gone: ['ɡ', 'ɒ', 'n'], love: ['l', 'ʌ', 'v'],
  one: ['w', 'ʌ', 'n'], two: ['t', 'u', 'ː'], eight: ['e', 'ɪ', 't'], four: ['f', 'ɔ', 'ː'],
  fourteen: ['f', 'ɔ', 'ː', 't', 'i', 'ː', 'n'],
  // wa- 读 /ɒ/
  what: ['w', 'ɒ', 't'], want: ['w', 'ɒ', 'n', 't'], watch: ['w', 'ɒ', 't', 'ʃ'], water: ['w', 'ɔ', 'ː', 't', 'ə'],
  // -ere/-air 与其他高频
  here: ['h', 'ɪ', 'ə'], hear: ['h', 'ɪ', 'ə'], there: ['ð', 'e', 'ə'], their: ['ð', 'e', 'ə'], where: ['w', 'e', 'ə'],
  friend: ['f', 'r', 'e', 'n', 'd'], again: ['ə', 'ɡ', 'e', 'n'], get: ['ɡ', 'e', 't'],
  any: ['e', 'n', 'i'], many: ['m', 'e', 'n', 'i'], every: ['e', 'v', 'r', 'i'], busy: ['b', 'ɪ', 'z', 'i'],
  these: ['ð', 'i', 'ː', 'z'], those: ['ð', 'ə', 'ʊ', 'z'],
  people: ['p', 'i', 'ː', 'p', 'l'], money: ['m', 'ʌ', 'n', 'i'], honey: ['h', 'ʌ', 'n', 'i'], only: ['ə', 'ʊ', 'n', 'l', 'i'],
  because: ['b', 'ɪ', 'k', 'ɒ', 'z'], hello: ['h', 'ə', 'l', 'ə', 'ʊ'], idea: ['a', 'ɪ', 'd', 'ɪ', 'ə'], eye: ['a', 'ɪ'], eyes: ['a', 'ɪ', 'z'], away: ['ə', 'w', 'e', 'ɪ'],
  young: ['j', 'ʌ', 'ŋ'], build: ['b', 'ɪ', 'l', 'd'], station: ['s', 't', 'e', 'ɪ', 'ʃ', 'ə', 'n'],
  // 家庭成员（th 浊音 + 短 u）
  mother: ['m', 'ʌ', 'ð', 'ə'], father: ['f', 'ɑ', 'ː', 'ð', 'ə'], brother: ['b', 'r', 'ʌ', 'ð', 'ə'],
  other: ['ʌ', 'ð', 'ə'], another: ['ə', 'n', 'ʌ', 'ð', 'ə'], together: ['t', 'ə', 'ɡ', 'e', 'ð', 'ə'],
  // ea 读 /e/ 的例外
  head: ['h', 'e', 'd'], bread: ['b', 'r', 'e', 'd'], dead: ['d', 'e', 'd'], ready: ['r', 'e', 'd', 'i'],
  heavy: ['h', 'e', 'v', 'i'], health: ['h', 'e', 'l', 'θ'], weather: ['w', 'e', 'ð', 'ə'],
  sweater: ['s', 'w', 'e', 't', 'ə'], breakfast: ['b', 'r', 'e', 'k', 'f', 'ə', 's', 't'], great: ['ɡ', 'r', 'e', 'ɪ', 't'],
  // -ow 读 /əʊ/ 的例外（其余 ow 默认 /aʊ/：now/how/down/town/brown）
  know: ['n', 'ə', 'ʊ'], snow: ['s', 'n', 'ə', 'ʊ'], show: ['ʃ', 'ə', 'ʊ'], slow: ['s', 'l', 'ə', 'ʊ'],
  grow: ['ɡ', 'r', 'ə', 'ʊ'], window: ['w', 'ɪ', 'n', 'd', 'ə', 'ʊ'], yellow: ['j', 'e', 'l', 'ə', 'ʊ'],
  tomorrow: ['t', 'ə', 'm', 'ɒ', 'r', 'ə', 'ʊ'], borrow: ['b', 'ɒ', 'r', 'ə', 'ʊ'], follow: ['f', 'ɒ', 'l', 'ə', 'ʊ'],
  // w+or 读 /ɜː/
  work: ['w', 'ɜ', 'ː', 'k'], word: ['w', 'ɜ', 'ː', 'd'], world: ['w', 'ɜ', 'ː', 'l', 'd'],
  // 其他
  shoe: ['ʃ', 'u', 'ː'], shoes: ['ʃ', 'u', 'ː', 'z'], house: ['h', 'a', 'ʊ', 's'],
  nose: ['n', 'ə', 'ʊ', 'z'], rose: ['r', 'ə', 'ʊ', 'z'], close: ['k', 'l', 'ə', 'ʊ', 'z'],
  beautiful: ['b', 'j', 'u', 'ː', 't', 'ɪ', 'f', 'l'], monkey: ['m', 'ʌ', 'ŋ', 'k', 'i'],
  policeman: ['p', 'ə', 'l', 'i', 'ː', 's', 'm', 'ə', 'n'], postman: ['p', 'ə', 'ʊ', 's', 't', 'm', 'ə', 'n'],
  housewife: ['h', 'a', 'ʊ', 's', 'w', 'a', 'ɪ', 'f'],
};

/** th 读浊音 ð 的功能词/常用词（其余 th 读清音 θ） */
const VOICED_TH_WORDS = new Set([
  'the', 'this', 'that', 'these', 'those', 'they', 'them', 'then', 'than', 'there', 'their',
  'with', 'without', 'weather', 'whether', 'either', 'neither', 'rather', 'although', 'other', 'brother',
]);

/** 三字母及以上组合（rest 前缀匹配；只保留「拆成单字母会读错」的组合） */
const TRI_RULES: Array<[string, Phoneme[]]> = [
  ['igh', ['a', 'ɪ']],
  ['air', ['e', 'ə']],
  ['ear', ['ɪ', 'ə']],
  ['eer', ['ɪ', 'ə']],
  ['oor', ['ɔ', 'ː']],
  ['our', ['a', 'ʊ', 'ə']],
  ['ure', ['j', 'ʊ', 'ə']],
  ['tion', ['ʃ', 'ə', 'n']],
  ['sion', ['ʒ', 'ə', 'n']],
  ['tch', ['t', 'ʃ']],
  ['dge', ['d', 'ʒ']],
  ['ght', ['t']],
  ['sch', ['s', 'k']],
  ['all', ['ɔ', 'ː', 'l']],
  ['alk', ['ɔ', 'ː', 'k']],
];

/** 两字母组合（th 与 oo 单独处理，不在此表） */
const DI_RULES: Array<[string, Phoneme[]]> = [
  // 元音组合
  ['ee', ['i', 'ː']], ['ea', ['i', 'ː']], ['ou', ['a', 'ʊ']],
  ['ow', ['a', 'ʊ']], ['ai', ['e', 'ɪ']], ['ay', ['e', 'ɪ']], ['oa', ['ə', 'ʊ']],
  ['ie', ['a', 'ɪ']], ['ei', ['e', 'ɪ']], ['ey', ['i', 'ː']], ['ue', ['j', 'u', 'ː']],
  ['ui', ['u', 'ː']], ['au', ['ɔ', 'ː']], ['aw', ['ɔ', 'ː']], ['oi', ['ɔ', 'ɪ']], ['oy', ['ɔ', 'ɪ']],
  // r 组合
  ['ar', ['ɑ', 'ː']], ['er', ['ə']], ['ir', ['ɜ', 'ː']], ['or', ['ɔ', 'ː']], ['ur', ['ɜ', 'ː']],
  // 辅音组合
  ['ch', ['t', 'ʃ']], ['sh', ['ʃ']], ['ph', ['f']], ['wh', ['w']], ['ck', ['k']],
  ['ng', ['ŋ']], ['qu', ['k', 'w']], ['wr', ['r']], ['kn', ['n']], ['gn', ['n']],
  ['mb', ['m']], ['mn', ['n']], ['ps', ['s']], ['sc', ['s', 'k']], ['ew', ['j', 'u', 'ː']],
  // 叠音辅音只发一次（little / lesson / happy）
  ['ss', ['s']], ['ll', ['l']], ['tt', ['t']], ['dd', ['d']], ['pp', ['p']], ['bb', ['b']],
  ['ff', ['f']], ['mm', ['m']], ['nn', ['n']], ['rr', ['r']], ['gg', ['ɡ']], ['zz', ['z']],
];

/**
 * 英文拼写 → IPA 音素（规则近似）。
 *
 * 覆盖 New Concept 第一册的核心拼读模式：元音字母组合、魔法 e、常见辅音组合。
 * 不是完整英文 G2P——未覆盖的罕见组合会退化为"单字母常规音"，
 * 结果是"诊断不出精细差异"，不会给出错误的具体结论；高频例外词走 IRREGULAR_G2P。
 */
export function englishG2P(word: string): Phoneme[] {
  const w = word.toLowerCase().replace(/[^a-z']/g, '');
  if (!w) return [];

  // 高频不规则词直接查表（含 isn't / there's 等缩写形式）
  const irregular = IRREGULAR_G2P[w];
  if (irregular) return irregular.slice();

  // 复合词后缀 -man 弱读为 /mən/（milkman / German；woman / postman 已在上表）
  if (w.endsWith('man') && w.length > 3) {
    return g2pStem(w.slice(0, -3)).concat(['m', 'ə', 'n']);
  }

  // 词尾语法后缀：先剥后缀再拼词干，避免污染主干音素
  let stem = w;
  let tail: Phoneme[] = [];
  if (/(?:ches|shes|xes|zes|ses)$/.test(w)) {
    // watches / boxes / buses：-es 读 /ɪz/，ch/sh/x/z/s 本身留在词干里
    stem = w.slice(0, -2);
    tail = ['ɪ', 'z'];
  } else if (/ies$/.test(w)) {
    // ladies → lady + /z/
    stem = w.slice(0, -3) + 'y';
    tail = ['z'];
  } else if (/s$/.test(w) && !/ss$/.test(w)) {
    stem = w.slice(0, -1);
    // 复数 s 的清浊随词干尾音：dogs /z/，cats /s/
    tail = /[bdglmnrvaeiouy]$/.test(stem) ? ['z'] : ['s'];
  } else if (/ied$/.test(w)) {
    // cried → cry + /d/
    stem = w.slice(0, -3) + 'y';
    tail = ['d'];
  } else if (/ed$/.test(w) && w.length > 4 && !/e$/.test(w.slice(0, -2))) {
    // -ed 后缀（freed/agreed 这类词干本身以 e 结尾的不剥）
    const raw = w.slice(0, -2);
    if (/[td]$/.test(raw)) tail = ['ɪ', 'd'];          // wanted / needed
    else if (/[kfsθ]$/.test(raw)) tail = ['t'];        // liked / stopped
    else tail = ['d'];                                  // played / lived
    stem = raw;
  }

  return g2pStem(stem).concat(tail);
}

/** 词干拼读（不含词尾语法后缀） */
function g2pStem(w: string): Phoneme[] {
  const out: Phoneme[] = [];
  let i = 0;
  const n = w.length;

  // 魔法 e 按位置判定：元音 + 单辅音 + 词尾 e（cake / name / bike / note / cute）。
  // 位置关系必须是 i + 2 === n - 1，否则 "here"（r 后不构成）等会被误判。
  const magicVowel = (idx: number): boolean => {
    if (idx + 2 !== n - 1 || w[n - 1] !== 'e') return false;
    if (!/[aeiou]/.test(w[idx])) return false;
    const c = w[idx + 1];
    if (/[aeiou]/.test(c)) return false;
    // r / w / h 后面的元音不构成魔法 e（care / low / the 类）
    if (c === 'r' || c === 'w' || c === 'h') return false;
    return true;
  };

  while (i < n) {
    const rest = w.slice(i);
    const two = rest.slice(0, 2);
    const ch = w[i];
    const isLast = i === n - 1;
    const next = i + 1 < n ? w[i + 1] : '';

    // --- 三字母及以上组合 ---
    let matched = false;
    for (const [pat, ph] of TRI_RULES) {
      if (rest.startsWith(pat)) {
        out.push(...ph);
        i += pat.length;
        matched = true;
        break;
      }
    }
    if (matched) continue;

    // --- th 清浊 ---
    if (two === 'th') {
      out.push(VOICED_TH_WORDS.has(w) ? 'ð' : 'θ');
      i += 2;
      continue;
    }

    // --- oo 长短音：good/book/look/wood/foot 短，school/food/room 长 ---
    if (two === 'oo') {
      out.push(...(/[kdf]/.test(w[i + 2] ?? '') ? ['ʊ'] : ['u', 'ː']));
      i += 2;
      continue;
    }

    // --- 两字母组合 ---
    for (const [pat, ph] of DI_RULES) {
      if (two === pat) {
        out.push(...ph);
        i += pat.length;
        matched = true;
        break;
      }
    }
    if (matched) continue;

    // --- 单字母 ---
    if (ch === 'a') {
      if (magicVowel(i)) out.push('e', 'ɪ');
      else if (i > 0 && w[i - 1] === 'w') out.push('ɒ'); // want / wash / swan
      else if (isLast && (n >= 3 || n === 1)) out.push('ə'); // 词尾弱读：a / china / umbrella
      else out.push('æ');
    } else if (ch === 'e') {
      if (isLast && i > 0) {
        // 词尾 e：前面还有元音字母时几乎总是静音（name / here / more / table）；
        // 没有其他元音的是 be / he / me / we（读 iː）和 the（读 ə）
        if (!/[aeiouy]/.test(w.slice(0, i))) out.push(...(n >= 3 ? ['ə'] : ['i', 'ː']));
        // 有其他元音：静音，不发音
      } else {
        out.push('e');
      }
    } else if (ch === 'i') {
      if (magicVowel(i)) out.push('a', 'ɪ');
      else out.push('ɪ');
    } else if (ch === 'o') {
      if (magicVowel(i) || isLast) out.push('ə', 'ʊ');
      else out.push('ɒ');
    } else if (ch === 'u') {
      if (magicVowel(i)) out.push('j', 'u', 'ː');
      else if (isLast) out.push('u', 'ː');
      else out.push('ʌ');
    } else if (ch === 'y') {
      if (i === 0) out.push('j');
      else if (isLast) out.push(/[aeiou]/.test(w.slice(0, i)) ? 'i' : 'a', 'ɪ');
      else out.push('ɪ');
    } else if (ch === 'c') {
      out.push(/[eiy]/.test(next) ? 's' : 'k');
    } else if (ch === 'g') {
      // g 在 e/i/y 前通常读 dʒ，但 girl/gift 这类（i 后接辅音）读 ɡ
      const soft = /[eiy]/.test(next) && !(next === 'i' && w[i + 2] === 'r');
      out.push(...(soft ? ['d', 'ʒ'] : ['ɡ']));
    } else if (ch === 's') {
      // 元音之间的 s 读浊音（music / rose / please）
      const prevV = i > 0 && /[aeiou]/.test(w[i - 1]);
      const nextV = next !== '' && /[aeiou]/.test(next);
      out.push(prevV && nextV ? 'z' : 's');
    } else if (ch === 'x') {
      out.push('k', 's');
    } else if (ch === 'j') {
      out.push('d', 'ʒ');
    } else if (ch === 'h') {
      // 辅音前的 h 不发音，元音前正常发
      if (/[aeiou]/.test(next)) out.push('h');
    } else if (ch === "'") {
      // 缩写符号，跳过
    } else if (ch.trim()) {
      out.push(ch);
    }

    i++;
  }

  return out;
}

/**
 * 取一个词的音素序列：词典优先，规则兜底。
 */
export function phonemesOf(word: string, dict?: PhonemeDict): Phoneme[] {
  const key = word.trim().toLowerCase().replace(/[.,!?;:'"]/g, '');
  if (!key) return [];
  if (dict && dict.has(key)) return dict.get(key)!.slice();
  return englishG2P(key);
}

// ---------------------------------------------------------------------------
// 3. 音素对齐：找出漏读 / 发错的具体音素
// ---------------------------------------------------------------------------

export interface PhonemeAlignment {
  /** 对齐后的逐位置结果：spoken = null 表示漏读（孩子没读出来） */
  ops: Array<{ target: Phoneme; spoken: Phoneme | null; op: 'match' | 'substitute' | 'missing' }>;
  /** 孩子多读出来的音素 */
  extra: Phoneme[];
  /** 音素命中率 0-1（以目标音素数为分母） */
  ratio: number;
}

/**
 * 音素级编辑距离对齐（Levenshtein + 回溯）。
 * 目标侧音素是"应该读到的"，口语侧音素是"实际读到的"。
 */
export function alignPhonemes(
  target: Phoneme[],
  spoken: Phoneme[]
): PhonemeAlignment {
  const m = target.length;
  const n = spoken.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) dp[i][0] = i;
  for (let j = 1; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = target[i - 1] === spoken[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }

  const ops: PhonemeAlignment['ops'] = [];
  const extra: Phoneme[] = [];
  let i = m;
  let j = n;
  while (i > 0 || j > 0) {
    // 注意顺序：必须先判"两侧都还有"的分支，再判单侧耗尽的分支，
    // 否则 j 已耗尽时 dp[i][j-1] 会取到 dp[i][-1]（undefined），
    // 比较恒为 false 而走入 else 分支不断 j--，形成死循环。
    if (i > 0 && j > 0 && target[i - 1] === spoken[j - 1]) {
      ops.push({ target: target[i - 1], spoken: spoken[j - 1], op: 'match' });
      i--;
      j--;
    } else if (
      i > 0 &&
      j > 0 &&
      dp[i - 1][j - 1] + 1 <= dp[i - 1][j] &&
      dp[i - 1][j - 1] + 1 <= dp[i][j - 1]
    ) {
      ops.push({ target: target[i - 1], spoken: spoken[j - 1], op: 'substitute' });
      i--;
      j--;
    } else if (i > 0 && (j <= 0 || dp[i - 1][j] <= dp[i][j - 1])) {
      ops.push({ target: target[i - 1], spoken: null, op: 'missing' });
      i--;
    } else {
      extra.unshift(spoken[j - 1]);
      j--;
    }
  }
  ops.reverse();

  const hit = ops.filter((o) => o.op === 'match').length;
  return { ops, extra, ratio: m > 0 ? hit / m : 0 };
}

// ---------------------------------------------------------------------------
// 4. 中文提示：把音素差异翻译成孩子/家长能看懂的话
// ---------------------------------------------------------------------------

/** 常见易混音素的中文发音要领 */
const PHONEME_TIPS: Record<string, string> = {
  θ: '咬舌尖发音（th）',
  ð: '咬舌尖轻读音（th）',
  ʃ: '嘴唇收圆（sh）',
  t: '（tʃ 的一部分）先堵住气流再送气（ch）',
  d: '（dʒ 的一部分）先堵住气流再放开（j）',
  ŋ: '收尾要收住鼻腔（ng）',
  r: '舌尖卷起不要碰到牙齿',
  l: '舌尖顶住上牙齿后面',
  v: '上牙轻轻咬住下嘴唇',
  w: '双唇收圆向前突',
  j: '像"耶"的起始音',
  ə: '轻轻带过，不要丢掉',
};

/** 辅音 → 字母提示，方便孩子看"该读哪个字母" */
const PHONEME_TO_LETTER: Record<string, string> = {
  θ: 'th', ð: 'th', ʃ: 'sh', ŋ: 'ng',
  r: 'r', l: 'l', v: 'v', w: 'w', j: 'y', ə: '弱读',
};

/**
 * 易混音素对严重程度表。
 * 键为 `${target}→${spoken}`，值为严重级别。
 *
 * 设计原则：
 *   - minor：可听懂的近似替换（θ→s、v→w），不阻断理解
 *   - moderate：影响辨识但可推断（θ→k 塞音化、ʃ→t 塞擦化）
 *   - serious：完全改变词义或丢失关键音（θ→f 丢失舌尖音、元音→辅音）
 *
 * 未列出的替换默认 minor（可听懂的近似）。
 */
const SUBSTITUTION_SEVERITY: Record<string, 'minor' | 'moderate' | 'serious'> = {
  // th 清音 θ → s（常见，可听懂）
  'θ→s': 'minor',
  'θ→ʃ': 'minor',
  'θ→t': 'moderate',
  'θ→k': 'moderate',
  'θ→f': 'moderate',
  'θ→p': 'serious',
  'θ→z': 'moderate', // θ→z（浊化，部分可听懂）

  // th 浊音 ð → d（常见，可听懂）
  'ð→d': 'minor',
  'ð→z': 'minor',
  'ð→v': 'minor',
  'ð→t': 'moderate',
  'ð→s': 'moderate',
  'ð→k': 'serious',

  // ʃ → s（可听懂）
  'ʃ→s': 'minor',
  'ʃ→t': 'moderate',
  'ʃ→tʃ': 'moderate',
  'ʃ→f': 'minor',
  'ʃ→k': 'serious',

  // s → ʃ（可听懂）
  's→ʃ': 'minor',
  's→θ': 'minor',
  's→t': 'moderate',
  's→k': 'serious',

  // ŋ → n（常见，可听懂）
  'ŋ→n': 'minor',
  'ŋ→m': 'minor',
  'ŋ→ɡ': 'moderate',
  'ŋ→d': 'moderate',

  // v → w（常见，可听懂）
  'v→w': 'minor',
  'v→f': 'minor',
  'v→b': 'moderate',
  'v→p': 'serious',

  // w → v（可听懂）
  'w→v': 'minor',
  'w→f': 'minor',
  'w→b': 'moderate',

  // r → l（中文母语者常见）
  'r→l': 'minor',
  'r→ɹ': 'minor',
  'r→ʃ': 'moderate',
  'r→t': 'serious',

  // l → r
  'l→r': 'minor',
  'l→j': 'moderate',

  // 元音 → 辅音（严重：丢失元音导致词不可辨识）
  'a→k': 'serious', 'a→t': 'serious', 'a→p': 'serious', 'a→s': 'serious',
  'e→k': 'serious', 'e→t': 'serious', 'e→s': 'serious',
  'i→k': 'serious', 'i→t': 'serious', 'i→s': 'serious',
  'o→k': 'serious', 'o→t': 'serious', 'o→s': 'serious',
  'u→k': 'serious', 'u→t': 'serious', 'u→s': 'serious',
  'æ→k': 'serious', 'æ→t': 'serious', 'æ→s': 'serious',
  'ʌ→k': 'serious', 'ʌ→t': 'serious', 'ʌ→s': 'serious',
  'ɒ→k': 'serious', 'ɒ→t': 'serious', 'ɒ→s': 'serious',

  // 长音 ː → 丢失（中等：词义可能不变但节奏被破坏）
  'ː→(none)': 'moderate',
};

/**
 * 判断一个替换的严重程度。
 * @param target 目标音素
 * @param spoken 实际读出的音素（null 表示漏读）
 */
function substitutionSeverity(target: Phoneme, spoken: Phoneme | null): 'minor' | 'moderate' | 'serious' {
  if (!spoken) {
    // 漏读：辅音漏读 moderate，元音漏读 serious（元音丢失导致词不可辨识）
    if (/[ptkfvszθðʃtʃdʒŋlrwjmnbɡ]/.test(target)) return 'moderate';
    return 'serious';
  }
  const key = `${target}→${spoken}`;
  return SUBSTITUTION_SEVERITY[key] ?? 'minor';
}

/**
 * 生成一条中文诊断提示。
 * 例如：{"word":"umbrella","kind":"phoneme","message":"umbrella：/ʌ/ 读成了 /ʌː/"}
 */
export function describePhonemeIssue(
  word: string,
  target: Phoneme,
  spoken: Phoneme | null
): string {
  if (!spoken) {
    // TIPS 优先：它更具体（如 θ → 咬舌尖发音（th）），且已包含字母提示
    const tip = PHONEME_TIPS[target] ?? PHONEME_TO_LETTER[target];
    return tip ? `${word}：漏掉了 /${target}/（${tip}）` : `${word}：漏掉了 /${target}/`;
  }
  if (target === spoken) return `${word}：/${target}/ 正确`;

  const tip = PHONEME_TIPS[target];
  const letter = PHONEME_TO_LETTER[target];
  const raw = letter ? `（读作 ${letter}）` : '';
  return `${word}：/${target}/${raw} 读成了 /${spoken}/${tip ? `，${tip}` : ''}`;
}

// ---------------------------------------------------------------------------
// 5. 句子级诊断聚合
// ---------------------------------------------------------------------------

export interface WordPhonemeResult {
  word: string;
  /** 目标音素 */
  target: Phoneme[];
  /** 实际音素（识别文本里匹配到的） */
  spoken: Phoneme[];
  /** 识别文本里对应的那个词（可能与目标拼写不同，如 pencil → pensl） */
  spokenWord?: string;
  /** 音素级对齐 */
  alignment: PhonemeAlignment;
  /** 是否整词未识别 */
  missed: boolean;
  /** 多读出来的音素（该词范围内） */
  extra: Phoneme[];
  /** 音素级时间对齐（低精度：按帧比例映射，需 attachPhonemeTiming 填充） */
  timing?: PhonemeTiming[];
}

/** 音素级时间信息：某个音素在录音中的时间区间 */
export interface PhonemeTiming {
  /** 该音素在目标序列中的位置（从 0 开始） */
  index: number;
  /** 音素符号 */
  phoneme: Phoneme;
  /** 对齐结果（match/substitute/missing） */
  op: 'match' | 'substitute' | 'missing';
  /** 估计起始时间（秒，相对录音开始） */
  startSec: number;
  /** 估计结束时间（秒） */
  endSec: number;
  /** 该时间段内有声帧占比（低 = 可能读快了或漏了） */
  voicedRatio: number;
  /** 该时间段内是否检测到停顿（连续静音超过阈值） */
  hasPause: boolean;
}

export interface PronunciationIssue {
  word: string;
  kind: 'missing-word' | 'extra-word' | 'phoneme';
  level: 'info' | 'minor' | 'moderate' | 'serious';
  message: string;
  target?: Phoneme[];
  spoken?: Phoneme[];
  missing?: Phoneme[];
  substituted?: Array<{ target: Phoneme; spoken: Phoneme }>;
}

/** 流利度指标：定义见 acoustics.ts（此处别名导出，便于调用方只从本模块取） */
export type FluencyMetrics = FluencyResult;

export interface PronunciationReport {
  /** 音素级得分 0-100（与既有口语分同一口径，便于直接替换） */
  score: number;
  /** 音素命中率 0-1 */
  phonemeAccuracy: number;
  /** 流利度指标 */
  fluency: FluencyMetrics;
  /** 流利度得分 0-100（停顿/语速/音量稳定性） */
  fluencyScore: number;
  /** 逐词结果 */
  words: WordPhonemeResult[];
  /** 问题清单（按严重程度排序） */
  issues: PronunciationIssue[];
  /** 总体诊断结论 */
  summary: string;
  /** 诊断所用的音素来源：dict=词典 / g2p=规则 */
  source: 'dict' | 'g2p' | 'mixed';
  /** G2P 覆盖率 0-1：词典覆盖的词占比（高 = 音素诊断可靠） */
  coverage: number;
  /** 置信度：high = 词典覆盖充分，音素结论可靠；low = 大量走规则，音素结论仅供参考 */
  confidence: 'high' | 'medium' | 'low';
}

/** 词级模糊匹配阈值：音素命中率达到该值才把识别词与目标词视为同一个词 */
const WORD_MATCH_THRESHOLD = 0.55;

/**
 * 生成句子级发音诊断报告。
 *
 * 词级匹配分两步：
 *   1. 精确匹配（保序 DP，拼写完全一致）；
 *   2. 模糊兜底：识别文本常把词拼变形（pencil → pensl），对没精确匹配上的
 *      目标词，按音素相似度吸附到剩余口语词上（≥ WORD_MATCH_THRESHOLD）。
 *      没有这一步，"匹配上的词两侧音素必然相同"，音素级问题永远报不出来。
 *
 * @param spokenText 识别文本
 * @param targetText 目标文本
 * @param dict 音素字典（来自本课词汇表；不传则全走规则）
 * @param fluency 声学流利度指标（来自 analyzeAcoustics）
 */
export function diagnosePronunciation(
  spokenText: string,
  targetText: string,
  dict?: PhonemeDict,
  fluency?: FluencyMetrics
): PronunciationReport {
  const targetWords = splitWords(targetText);
  const spokenWords = splitWords(spokenText);

  const targetPhonemes = targetWords.map((w) => phonemesOf(w, dict));
  const spokenPhonemes = spokenWords.map((w) => phonemesOf(w, dict));

  // 词间相似度矩阵（整数权重：精确=100，模糊=音素命中率×100）
  const sim: number[][] = targetWords.map((tw, ti) =>
    spokenWords.map((sw, si) => {
      if (tw === sw) return 100;
      if (targetPhonemes[ti].length === 0 || spokenPhonemes[si].length === 0) return 0;
      return Math.round(alignPhonemes(targetPhonemes[ti], spokenPhonemes[si]).ratio * 100);
    })
  );
  const pairs = matchWordPairs(targetWords.length, spokenWords.length, sim);

  const words: WordPhonemeResult[] = [];
  let dictWords = 0;
  let ruleWords = 0;
  for (let ti = 0; ti < targetWords.length; ti++) {
    const w = targetWords[ti];
    const target = targetPhonemes[ti];
    if (dict?.has(w)) dictWords++;
    else ruleWords++;
    const si = pairs.get(ti);
    if (si !== undefined) {
      const spoken = spokenPhonemes[si];
      const alignment = alignPhonemes(target, spoken);
      words.push({
        word: w,
        target,
        spoken,
        spokenWord: spokenWords[si],
        alignment,
        missed: false,
        extra: alignment.extra,
      });
    } else {
      words.push({
        word: w,
        target,
        spoken: [],
        alignment: alignPhonemes(target, []),
        missed: true,
        extra: [],
      });
    }
  }

  const matchedSpoken = new Set(pairs.values());
  const wordMissed = words.filter((wd) => wd.missed).map((wd) => wd.word);
  const wordExtra = spokenWords.filter((_, si) => !matchedSpoken.has(si));

  // 汇总音素统计
  let totalTarget = 0;
  let totalHit = 0;
  for (const wd of words) {
    totalTarget += wd.target.length;
    totalHit += wd.alignment.ops.filter((o) => o.op === 'match').length;
  }
  const phonemeAccuracy = totalTarget > 0 ? totalHit / totalTarget : 0;

  const issues: PronunciationIssue[] = [];
  for (const wd of words) {
    if (wd.missed) {
      issues.push({
        word: wd.word,
        kind: 'missing-word',
        level: 'serious',
        message: `${wd.word} 没有识别到，请再读一遍`,
        target: wd.target,
      });
      continue;
    }
    const missing = wd.alignment.ops.filter((o) => o.op === 'missing').map((o) => o.target);
    const substituted = wd.alignment.ops
      .filter((o) => o.op === 'substitute')
      .map((o) => ({ target: o.target, spoken: o.spoken! }));
    if (missing.length > 0) {
      // 漏读严重程度按音素类型分级：元音漏读 serious，辅音漏读 moderate
      const missingSeverities = missing.map((p) => substitutionSeverity(p, null));
      const level = missingSeverities.includes('serious')
        ? 'serious'
        : missingSeverities.includes('moderate')
          ? 'moderate'
          : 'minor';
      issues.push({
        word: wd.word,
        kind: 'phoneme',
        level,
        message: `${wd.word}：漏读了 ${missing.map((p) => `/${p}/`).join(' ')}`,
        target: wd.target,
        spoken: wd.spoken,
        missing,
      });
    }
    if (substituted.length > 0) {
      // 替换严重程度按易混音素对表分级
      const subSeverities = substituted.map((s) => substitutionSeverity(s.target, s.spoken));
      const level = subSeverities.includes('serious')
        ? 'serious'
        : subSeverities.includes('moderate')
          ? 'moderate'
          : 'minor';
      issues.push({
        word: wd.word,
        kind: 'phoneme',
        level,
        message: describePhonemeIssue(wd.word, substituted[0].target, substituted[0].spoken),
        target: wd.target,
        spoken: wd.spoken,
        substituted,
      });
    }
    if (wd.extra.length > 0) {
      issues.push({
        word: wd.word,
        kind: 'phoneme',
        level: 'minor',
        message: `${wd.word}：多读了 ${wd.extra.map((p) => `/${p}/`).join(' ')}`,
        target: wd.target,
        spoken: wd.spoken,
        missing: wd.extra,
      });
    }
  }
  for (const w of wordExtra) {
    issues.push({
      word: w,
      kind: 'extra-word',
      level: 'info',
      message: `${w} 是多读出来的`,
    });
  }

  // 得分：音素命中率为主，词漏读加重惩罚
  const wordMissPenalty = wordMissed.length * 8;
  const raw = Math.round((phonemeAccuracy * 100 - wordMissPenalty) * 10) / 10;
  const score = Math.max(0, Math.min(100, raw));

  // G2P 覆盖率：词典覆盖的词数 / 总词数
  const totalWords = targetWords.length;
  const coverage = totalWords > 0 ? dictWords / totalWords : 0;
  const confidence: 'high' | 'medium' | 'low' =
    coverage >= 0.8 ? 'high' : coverage >= 0.5 ? 'medium' : 'low';

  const summary = buildSummary(score, phonemeAccuracy, issues, words, confidence);
  const resolvedFluency = fluency ?? emptyFluency();

  return {
    score,
    phonemeAccuracy,
    fluency: resolvedFluency,
    fluencyScore: resolvedFluency.speechSec > 0 ? fluencyScore(resolvedFluency) : 0,
    words,
    issues,
    summary,
    source:
      dictWords > 0 && ruleWords > 0
        ? 'mixed'
        : dictWords > 0
          ? 'dict'
          : 'g2p',
    coverage: Math.round(coverage * 100) / 100,
    confidence,
  };
}

/**
 * 词级保序匹配（加权 DP）：sim 为词间相似度（0-100 整数），
 * 达到阈值的配对按"总相似度最大"的方案取出。
 */
function matchWordPairs(m: number, n: number, sim: number[][]): Map<number, number> {
  const pairs = new Map<number, number>();
  if (m === 0 || n === 0) return pairs;

  const weight = (i: number, j: number): number => {
    const s = sim[i][j];
    return s >= Math.round(WORD_MATCH_THRESHOLD * 100) ? s : 0;
  };

  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1] + weight(i - 1, j - 1));
    }
  }

  let i = m;
  let j = n;
  while (i > 0 && j > 0) {
    const w = weight(i - 1, j - 1);
    if (w > 0 && dp[i][j] === dp[i - 1][j - 1] + w) {
      pairs.set(i - 1, j - 1);
      i--;
      j--;
    } else if (dp[i][j] === dp[i - 1][j]) {
      i--;
    } else {
      j--;
    }
  }
  return pairs;
}

function emptyFluency(): FluencyMetrics {
  return {
    totalSec: 0,
    speechSec: 0,
    pauses: 0,
    longestPauseSec: 0,
    avgPauseSec: 0,
    wordsPerMinute: 0,
    volumeStability: 1,
    avgLevel: 0,
    peakLevel: 0,
    voicedRatio: 0,
    voicing: 0,
    fricativeRatio: 0,
    noiseRatio: 0,
  };
}

function buildSummary(
  score: number,
  accuracy: number,
  issues: PronunciationIssue[],
  words: WordPhonemeResult[],
  confidence: 'high' | 'medium' | 'low'
): string {
  if (accuracy >= 0.95 && issues.filter((i) => i.level !== 'info').length === 0) {
    return '发音很清楚，每个音素都读到了。';
  }
  const serious = issues.filter((i) => i.level === 'serious');
  if (serious.length > 0) {
    return `有 ${serious.length} 个词没读出来：${serious.map((i) => i.word).join('、')}。先慢慢把每个词读准。`;
  }
  const moderate = issues.filter((i) => i.level === 'moderate');
  if (moderate.length > 0 && accuracy < 0.8) {
    return `大部分词读对了，但 ${moderate.length} 个词漏掉了音素。点开下面的提示，一个音一个音地补。`;
  }
  if (moderate.length > 0) {
    return '词都读出来了，个别音素可以再准一点。看看下面标出来的那几个音。';
  }
  const minor = issues.filter((i) => i.level === 'minor');
  if (minor.length > 0) {
    return `音素都读到了，有 ${minor.length} 处发音可以更标准。`;
  }
  if (words.length === 0) {
    return '没有识别到内容，请检查麦克风后重试。';
  }
  if (confidence === 'low') {
    return score >= 70
      ? '读得不错。部分词汇未收录真人注音，音素诊断仅供参考，以词级反馈为主。'
      : '再读一遍。部分词汇未收录真人注音，音素诊断仅供参考，以词级反馈为主。';
  }
  return score >= 70 ? '读得不错，可以再练一遍让发音更稳。' : '再读一遍，注意把每个词读完整。';
}

/** 分词：保留撇号（缩写），去掉其余标点 */
function splitWords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9'’\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}
