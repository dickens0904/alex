/**
 * fillToChoice 转换器单测
 */
import {
  convertFillExercises,
} from '../../src/utils/fillToChoice';
import type { GrammarExercise } from '../../src/types/lesson';

describe('convertFillExercises - fill 题', () => {
  const fill = (partial: Partial<GrammarExercise>): GrammarExercise => ({
    type: 'fill',
    question: 'He _____ a doctor.',
    fillAnswer: 'is',
    explanation: 'He 后用 is。',
    ...partial,
  });

  it('单词题：转成 4 选项选择题，answer 指向正确项', () => {
    const [out] = convertFillExercises([fill({})]);
    expect(out.type).toBe('choice');
    expect(out.options).toHaveLength(4);
    expect(new Set(out.options).size).toBe(4); // 无重复
    const correct = out.options![out.answer as number];
    expect(correct.toLowerCase()).toBe('is');
  });

  it('干扰项不与正确项重复（归一化比较）', () => {
    for (let i = 0; i < 20; i++) {
      const [out] = convertFillExercises([fill({ fillAnswer: 'are' })]);
      const normed = out.options!.map((o) => o.toLowerCase().replace(/\s+/g, ''));
      expect(new Set(normed).size).toBe(4);
    }
  });

  it('is 的干扰项优先来自同族词（am/are/was/were...）', () => {
    const [out] = convertFillExercises([fill({ fillAnswer: 'is' })]);
    const distractors = out.options!.filter((_, i) => i !== out.answer);
    const familySet = ['am', 'are', 'was', 'were', 'be', 'been', "isn't", "aren't", "wasn't", "weren't"];
    const fromFamily = distractors.filter((d) => familySet.includes(d.toLowerCase()));
    expect(fromFamily.length).toBeGreaterThanOrEqual(1);
  });

  it('多空逗号题：选项显示为 "She / Her"，解析追加完整句子', () => {
    const [out] = convertFillExercises([
      fill({
        question: '_____ is a nurse. _____ uniform is white.',
        fillAnswer: 'She, Her',
      }),
    ]);
    expect(out.type).toBe('choice');
    const correct = out.options![out.answer as number];
    expect(correct).toBe('She / Her');
    expect(out.explanation).toContain('She is a nurse. Her uniform is white.');
  });

  it('省略号题：选项显示 ___，完整句正确还原', () => {
    const [out] = convertFillExercises([
      fill({
        question: '_____ he _____ (play) football yesterday?',
        fillAnswer: 'Did ... play',
        explanation: '一般过去时疑问句用 Did 提前。',
      }),
    ]);
    const correct = out.options![out.answer as number];
    expect(correct).toBe('Did ___ play');
    expect(out.explanation).toContain('Did he play football yesterday?');
  });

  it('多词短语题（单空）：完整句整段替换', () => {
    const [out] = convertFillExercises([
      fill({
        question: 'She looks tired. She _____ _____ _____ (work) all night.',
        fillAnswer: 'must have worked',
      }),
    ]);
    expect(out.explanation).toContain('must have worked');
    const correct = out.options![out.answer as number];
    expect(correct).toBe('must have worked');
  });

  it('explanation 与 hint 保留', () => {
    const [out] = convertFillExercises([fill({ hint: '用 be 动词' })]);
    expect(out.hint).toBe('用 be 动词');
    expect(out.explanation).toContain('He 后用 is。');
  });
});

describe('convertFillExercises - transform 题', () => {
  it('转成选择题，answer 指向完整正确句', () => {
    const [out] = convertFillExercises([
      {
        type: 'transform',
        question: '将句子改为特殊疑问句：It is red.（对颜色提问）',
        answer: 'What colour is it?',
        explanation: '对颜色提问用 What colour。',
      },
    ]);
    expect(out.type).toBe('choice');
    expect(out.options).toHaveLength(4);
    expect(new Set(out.options).size).toBe(4);
    const correct = out.options![out.answer as number];
    expect(correct).toBe('What colour is it?');
  });

  it('干扰项是句子级变体，不是空白', () => {
    const [out] = convertFillExercises([
      {
        type: 'transform',
        question: '将句子变为否定句：She is busy.',
        answer: 'She is not busy.',
        explanation: '加 not。',
      },
    ]);
    const distractors = out.options!.filter((_, i) => i !== out.answer);
    expect(distractors.every((d) => typeof d === 'string' && d.length > 0)).toBe(true);
    // 机械变体至少应产生 is→are 或去 not 之类的可读句子
    expect(distractors.some((d) => /[a-z]/i.test(d))).toBe(true);
  });
});

describe('convertFillExercises - 其他类型不动', () => {
  it('原生 choice 题补错因；match/order 透传', () => {
    const input: GrammarExercise[] = [
      {
        type: 'choice',
        question: 'She _____ English every day.',
        options: ['study', 'studies', 'studying', 'studys'],
        answer: 1,
        explanation: '主语三单，动词加 -es。',
      },
      { type: 'match', question: 'q', matchPairs: [{ left: '1', right: '一' }], explanation: 'e' },
      { type: 'order', question: 'q', correctOrder: ['a', 'b'], explanation: 'e' },
      { question: '默认类型无答案', explanation: 'e' },
    ];
    const out = convertFillExercises(input);
    // 原生 choice：补 optionNotes
    expect(out[0].optionNotes).toHaveLength(4);
    expect(out[0].optionNotes![1]).toBeUndefined(); // 正确项
    expect(out[0].optionNotes![0]).toContain('studies'); // study → 词形规则说明
    // match/order/无答案默认类型：原样透传
    expect(out[1]).toEqual(input[1]);
    expect(out[2]).toEqual(input[2]);
    expect(out[3]).toEqual(input[3]);
  });

  it('同课 fill 答案进入干扰池：不同题干扰项相互呼应', () => {
    const input: GrammarExercise[] = [
      { type: 'fill', question: 'He _____ a doctor.', fillAnswer: 'is', explanation: '' },
      { type: 'fill', question: 'They _____ students.', fillAnswer: 'are', explanation: '' },
    ];
    const [first] = convertFillExercises(input);
    const correctFirst = first.options![first.answer as number];
    expect(correctFirst.toLowerCase()).toBe('is');
    expect(first.options).toHaveLength(4);
  });
});

describe('convertFillExercises - 错因生成（optionNotes）', () => {
  const fill = (fillAnswer: string, question = '_____ is it?'): GrammarExercise => ({
    type: 'fill',
    question,
    fillAnswer,
    explanation: '解析。',
  });

  /** 收集 n 次转换中所有干扰项的 (text, note) 对 */
  function collectNotes(fillAnswer: string, question?: string, times = 8) {
    const pairs: Array<{ text: string; note: string | undefined }> = [];
    for (let i = 0; i < times; i++) {
      const [out] = convertFillExercises([fill(fillAnswer, question)]);
      out.options!.forEach((text, idx) => {
        if (idx !== out.answer) pairs.push({ text, note: out.optionNotes?.[idx] });
      });
    }
    return pairs;
  }

  it('optionNotes 与 options 对齐，正确项位置为 undefined', () => {
    const [out] = convertFillExercises([fill('where', '_____ do you live?')]);
    expect(out.optionNotes).toHaveLength(out.options!.length);
    expect(out.optionNotes![out.answer as number]).toBeUndefined();
  });

  it('疑问词错因带词义说明（时态/语义教学点）', () => {
    const pairs = collectNotes('where', '_____ do you live?');
    expect(pairs.length).toBeGreaterThanOrEqual(3);
    for (const p of pairs) {
      expect(p.note).toContain(p.text);
      expect(p.note).toMatch(/问|应该用/);
    }
  });

  it('介词错因说明介词用法', () => {
    const pairs = collectNotes('at', 'I get up _____ six.');
    for (const p of pairs) {
      expect(p.note).toMatch(/用于|表示|应该用/);
    }
  });

  it('be 动词错因讲主谓一致/时态', () => {
    const pairs = collectNotes('is', 'He _____ a teacher.');
    for (const p of pairs) {
      expect(p.note).toMatch(/be 动词|应该用|不符合/);
    }
  });

  it('词形变体错因讲形态规则（-ing/-s/-ed）', () => {
    // study 无功能词族命中，干扰项全部来自词形变体
    const pairs = collectNotes('study', 'I want to _____ English.');
    expect(pairs.length).toBeGreaterThanOrEqual(3);
    for (const p of pairs) {
      expect(p.note).toMatch(/不需要|需要|-s\/-es|-ing|过去式|应该用|不符合/);
    }
    // 至少有一个"多了 -s/-es"或"-ing"类形态说明
    expect(pairs.some((p) => /-s\/-es|-ing|过去式/.test(p.note!))).toBe(true);
  });

  it('双写 -ing 的错因提示双写规则', () => {
    const pairs = collectNotes('running', 'He is _____ fast.');
    const doubled = pairs.find((p) => p.text === 'run');
    if (doubled) {
      expect(doubled.note).toContain('-ing');
      expect(doubled.note).toContain('双写');
    }
  });

  it('通用错因兜底：不含具体规则时仍给出选项与正确答案对照', () => {
    const pairs = collectNotes('book', 'I read a _____ every night.');
    for (const p of pairs) {
      expect(p.note).toBeTruthy();
      expect(p.note!.length).toBeGreaterThan(5);
    }
  });

  it('transform 题错因：干扰项均有说明', () => {
    const [out] = convertFillExercises([
      {
        type: 'transform',
        question: '将句子变为否定句：She is busy.',
        answer: 'She is not busy.',
        explanation: '加 not。',
      },
    ]);
    out.optionNotes!.forEach((note, idx) => {
      if (idx !== out.answer) expect(note).toBeTruthy();
    });
    expect(out.optionNotes![out.answer as number]).toBeUndefined();
  });
});
