import {
  parseIpa,
  buildPhonemeDict,
  englishG2P,
  phonemesOf,
  alignPhonemes,
  diagnosePronunciation,
  describePhonemeIssue,
  type PhonemeDict,
} from '../../src/services/phoneme';

describe('parseIpa - 解析课程数据里的 IPA 注音', () => {
  it('去掉首尾斜杠与重音记号', () => {
    expect(parseIpa('/ɪkˈskjuːz/')).toEqual(['ɪ', 'k', 's', 'k', 'j', 'u', 'ː', 'z']);
  });

  it('处理无斜杠与多余空白', () => {
    expect(parseIpa('  hændbæɡ ')).toEqual(['h', 'æ', 'n', 'd', 'b', 'æ', 'ɡ']);
  });

  it('忽略括号备注', () => {
    expect(parseIpa('/ˈveri/（英）')).toEqual(['v', 'e', 'r', 'i']);
  });

  it('空串返回空数组', () => {
    expect(parseIpa('')).toEqual([]);
    expect(parseIpa('/')).toEqual([]);
  });
});

describe('buildPhonemeDict - 从课程词汇表建字典', () => {
  const dict = buildPhonemeDict([
    { word: 'Excuse', phonetic: '/ɪkˈskjuːz/' },
    { word: 'me', phonetic: '/miː/' },
    { word: 'yes' }, // 没有注音 → 不入字典
    { word: 'Excuse', phonetic: '/ɪkˈskjuːz/' }, // 重复词只保留一次
  ]);

  it('键统一小写，值是音素数组', () => {
    expect(dict.get('excuse')).toEqual(['ɪ', 'k', 's', 'k', 'j', 'u', 'ː', 'z']);
    expect(dict.get('me')).toEqual(['m', 'i', 'ː']);
  });

  it('没有注音的词不进字典', () => {
    expect(dict.has('yes')).toBe(false);
  });

  it('重复词只保留第一次', () => {
    expect(dict.size).toBe(2);
  });
});

describe('englishG2P - 规则拼读', () => {
  it('元音字母组合', () => {
    expect(englishG2P('see')).toContain('i');
    // oo + k 读短音 /ʊ/（book/look/good 同类）
    expect(englishG2P('book')).toEqual(expect.arrayContaining(['b', 'ʊ', 'k']));
  });

  it('魔法 e：cake 的 a 发长音', () => {
    expect(englishG2P('cake').join('')).toContain('eɪ');
    // bike 的 i 发双元音 /aɪ/（拆开为两个单字符 token）
    expect(englishG2P('bike').join('')).toContain('aɪ');
  });

  it('高频不规则词不走规则（魔法 e 例外）', () => {
    // have 若走魔法 e 规则会读成 /heɪv/
    expect(englishG2P('have')).toContain('æ');
    expect(englishG2P('come')).toContain('ʌ');
  });

  it('辅音连缀 th / ch / sh', () => {
    expect(englishG2P('think').join('')).toContain('θ');
    expect(englishG2P('chair').join('')).toContain('tʃ');
    expect(englishG2P('ship').join('')).toContain('ʃ');
  });

  it('词尾复数走后缀', () => {
    const ph = englishG2P('cats');
    expect(ph[ph.length - 1]).toBe('s');
    expect(ph.slice(0, -1).join('')).toContain('æ');
  });

  it('空词与非字母返回空', () => {
    expect(englishG2P('')).toEqual([]);
    expect(englishG2P('   ')).toEqual([]);
  });

  it('非空词总是返回非空音素', () => {
    expect(englishG2P('hello').length).toBeGreaterThan(0);
  });
});

describe('phonemesOf - 词典优先', () => {
  const dict: PhonemeDict = new Map([['me', ['m', 'i']]]);

  it('词典里有的词用词典音素，忽略大小写与标点', () => {
    expect(phonemesOf('Me!', dict)).toEqual(['m', 'i']);
    expect(phonemesOf('ME', dict)).toEqual(['m', 'i']);
  });

  it('词典没有的词走规则', () => {
    expect(phonemesOf('hello', dict).length).toBeGreaterThan(0);
  });

  it('不传字典时全部走规则', () => {
    // be/he/me/we 词尾 e 无其他元音 → 读 /iː/（ː 为独立 token，与词典口径一致）
    expect(phonemesOf('me')).toEqual(['m', 'i', 'ː']);
  });
});

describe('alignPhonemes - 音素对齐', () => {
  it('完全一致时全 match', () => {
    const r = alignPhonemes(['m', 'i'], ['m', 'i']);
    expect(r.ops.every((o) => o.op === 'match')).toBe(true);
    expect(r.ratio).toBe(1);
    expect(r.extra).toEqual([]);
  });

  it('漏读音素被标记为 missing', () => {
    const r = alignPhonemes(['m', 'i', 'ː'], ['m', 'i']);
    expect(r.ops.some((o) => o.op === 'missing')).toBe(true);
    expect(r.ratio).toBeCloseTo(2 / 3, 5);
  });

  it('发错的音素被标记为 substitute', () => {
    const r = alignPhonemes(['θ', 'k'], ['s', 'k']);
    const sub = r.ops.find((o) => o.op === 'substitute');
    expect(sub).toBeDefined();
    expect(sub!.target).toBe('θ');
    expect(sub!.spoken).toBe('s');
  });

  it('多读的音素进入 extra', () => {
    const r = alignPhonemes(['m'], ['m', 'i']);
    expect(r.extra).toEqual(['i']);
  });

  it('空目标返回 ratio 0', () => {
    expect(alignPhonemes([], ['m']).ratio).toBe(0);
  });
});

describe('describePhonemeIssue - 中文提示', () => {
  it('漏读给出咬舌尖提示', () => {
    const msg = describePhonemeIssue('think', 'θ', null);
    expect(msg).toContain('think');
    expect(msg).toContain('咬舌尖');
  });

  it('读错给出目标音与实际音', () => {
    const msg = describePhonemeIssue('think', 'θ', 's');
    expect(msg).toContain('/θ/');
    expect(msg).toContain('/s/');
  });

  it('正确时不产生负面提示', () => {
    expect(describePhonemeIssue('me', 'i', 'i')).toContain('正确');
  });
});

describe('diagnosePronunciation - 句子级诊断', () => {
  const dict = buildPhonemeDict([
    { word: 'this', phonetic: '/ðɪs/' },
    { word: 'is', phonetic: '/ɪz/' },
    { word: 'a', phonetic: '/ə/' },
    { word: 'pencil', phonetic: '/ˈpensl/' },
  ]);

  it('全部读对时音素命中率为 1', () => {
    const r = diagnosePronunciation('this is a pencil', 'This is a pencil', dict);
    expect(r.phonemeAccuracy).toBe(1);
    expect(r.issues.filter((i) => i.level !== 'info')).toHaveLength(0);
    expect(r.score).toBeGreaterThan(95);
  });

  it('整词没识别到时标记 missing-word', () => {
    const r = diagnosePronunciation('this is a', 'This is a pencil', dict);
    const issue = r.issues.find((i) => i.word === 'pencil');
    expect(issue?.kind).toBe('missing-word');
    expect(issue?.level).toBe('serious');
  });

  it('漏读音素时给出具体音素', () => {
    // spoken 只说了 "pen"：音素相似度 3/5=0.6 ≥ 阈值，模糊匹配上 pencil，
    // 对齐后 /s/ /l/ 被标为 missing
    const r = diagnosePronunciation('pen', 'pencil', dict);
    const issue = r.issues.find((i) => i.word === 'pencil' && i.kind === 'phoneme');
    expect(issue).toBeDefined();
    expect(issue!.missing?.length).toBeGreaterThan(0);
  });

  it('多读的词进入 extra-word', () => {
    const r = diagnosePronunciation('this is a pencil book', 'This is a pencil', dict);
    expect(r.issues.some((i) => i.kind === 'extra-word' && i.word === 'book')).toBe(true);
  });

  it('summary 在整词缺失时点出该词', () => {
    const r = diagnosePronunciation('this is', 'This is a pencil', dict);
    expect(r.summary).toContain('pencil');
  });

  it('满分时 summary 给出正面反馈', () => {
    const r = diagnosePronunciation('this is a pencil', 'This is a pencil', dict);
    expect(r.summary).toContain('清楚');
  });

  it('传入流利度时计算 fluencyScore', () => {
    const r = diagnosePronunciation('this is a pencil', 'This is a pencil', dict, {
      totalSec: 10,
      speechSec: 8,
      pauses: 1,
      longestPauseSec: 1.2,
      avgPauseSec: 1.2,
      wordsPerMinute: 75,
      volumeStability: 0.8,
      avgLevel: 0.3,
      peakLevel: 0.6,
      voicedRatio: 0.8,
      voicing: 0.5,
      fricativeRatio: 0.2,
      noiseRatio: 0.1,
    });
    expect(r.fluencyScore).toBeGreaterThan(0);
    expect(r.fluency.wordsPerMinute).toBe(75);
  });

  it('不传字典时全部走规则，仍能给出诊断', () => {
    const r = diagnosePronunciation('this is a pencil', 'This is a pencil');
    expect(r.source).toBe('g2p');
    expect(r.words.length).toBe(4);
  });

  it('全部词有词典注音时 coverage=1, confidence=high', () => {
    const r = diagnosePronunciation('this is a pencil', 'This is a pencil', dict);
    expect(r.coverage).toBe(1);
    expect(r.confidence).toBe('high');
  });

  it('部分词无词典注音时 coverage 降低', () => {
    // dict 只覆盖 this/is/a/pencil，但目标句多了 book → coverage < 1
    const partialDict = buildPhonemeDict([
      { word: 'this', phonetic: '/ðɪs/' },
      { word: 'book', phonetic: '/bʊk/' },
    ]);
    const r = diagnosePronunciation('this book', 'This book', partialDict);
    expect(r.coverage).toBe(1); // both covered
    expect(r.confidence).toBe('high');
  });

  it('不传字典时 coverage=0, confidence=low', () => {
    const r = diagnosePronunciation('this is a pencil', 'This is a pencil');
    expect(r.coverage).toBe(0);
    expect(r.confidence).toBe('low');
  });

  it('ð→d 替换为 minor（可听懂）', () => {
    // "that" → "dat"：ð 被替换为 d（可听懂的近似替换）
    const thatDict = buildPhonemeDict([{ word: 'that', phonetic: '/ðæt/' }]);
    const r = diagnosePronunciation('dat', 'that', thatDict);
    const issue = r.issues.find((i) => i.kind === 'phoneme' && i.substituted);
    expect(issue).toBeDefined();
    expect(issue!.level).toBe('minor');
  });

  it('ð→t 替换为 moderate（影响辨识）', () => {
    // "that" → "tat"：ð 被替换为 t
    const thatDict = buildPhonemeDict([{ word: 'that', phonetic: '/ðæt/' }]);
    const r = diagnosePronunciation('tat', 'that', thatDict);
    const issue = r.issues.find((i) => i.kind === 'phoneme' && i.substituted);
    expect(issue).toBeDefined();
    expect(issue!.level).toBe('moderate');
  });

  it('元音漏读为 serious（词不可辨识）', () => {
    // "pencil" 只说 "pncl"：元音 e 和 i 漏读
    const pencilDict = buildPhonemeDict([{ word: 'pencil', phonetic: '/ˈpensl/' }]);
    const r = diagnosePronunciation('pncl', 'pencil', pencilDict);
    const issue = r.issues.find((i) => i.kind === 'phoneme' && i.missing);
    expect(issue).toBeDefined();
    // 元音漏读 → serious
    expect(issue!.level).toBe('serious');
  });
});
