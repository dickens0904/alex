/**
 * grammarCategories 题池与解锁逻辑单测
 */
// Mock localStorage（jest node 环境无该全局对象）
const localStorageMock: Record<string, string> = {};
(global as any).localStorage = {
  getItem: (key: string) => localStorageMock[key] || null,
  setItem: (key: string, value: string) => {
    localStorageMock[key] = value;
  },
  removeItem: (key: string) => {
    delete localStorageMock[key];
  },
  clear: () => {
    for (const key in localStorageMock) delete localStorageMock[key];
  },
};

import {
  getCategoryPools,
  getVocabPools,
  getDrillCursor,
  advanceDrillCursor,
  takeDrillSet,
  CATEGORY_DEFS,
} from '../../src/data/grammarCategories';

describe('grammarCategories - 题池构建', () => {
  it('题池非空且只含 choice 题', () => {
    const pools = getCategoryPools();
    expect(pools.length).toBeGreaterThan(5);
    const total = pools.reduce((s, p) => s + p.all.length, 0);
    expect(total).toBeGreaterThan(1000);
    for (const p of pools) {
      for (const q of p.all) {
        expect(q.exercise.type || 'choice').toBe('choice');
        expect(q.exercise.options!.length).toBeGreaterThanOrEqual(2);
        expect(q.lessonId).toBeGreaterThanOrEqual(1);
        expect(q.lessonId).toBeLessThanOrEqual(144);
      }
    }
  });

  it('每个范畴的题目按课号升序（难度从易到难）', () => {
    for (const p of getCategoryPools()) {
      for (let i = 1; i < p.all.length; i++) {
        expect(p.all[i].lessonId).toBeGreaterThanOrEqual(p.all[i - 1].lessonId);
      }
    }
  });

  it('核心范畴都有题：时态/疑问句/代词/介词', () => {
    const pools = getCategoryPools();
    const names = pools.map((p) => p.def.name);
    expect(names).toContain('be 动词与一般现在时');
    expect(names).toContain('一般过去时');
    expect(names).toContain('代词');
    expect(names).toContain('介词');
    expect(names).toContain('疑问句');
  });

  it('范畴定义 id 唯一', () => {
    const ids = CATEGORY_DEFS.map((d) => d.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('grammarCategories - 游标与出题', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('游标默认 0，取第一组题', () => {
    const pools = getCategoryPools();
    const pool = pools[0];
    const set = takeDrillSet(pool, 10);
    expect(set).toHaveLength(Math.min(10, pool.all.length));
    expect(getDrillCursor(pool.def.id)).toBe(0);
  });

  it('完成一组后游标推进，下次取下一组（不重复）', () => {
    const pools = getCategoryPools();
    const pool = pools[0];
    const first = takeDrillSet(pool, 10);
    advanceDrillCursor(pool.def.id, first.length);
    expect(getDrillCursor(pool.def.id)).toBe(first.length);
    const second = takeDrillSet(pool, 10);
    // 同一道题（对象引用）不应在相邻两组重复出现（数据里存在同模板不同题，
    // question 文本相同，必须用引用判断）
    const firstRefs = new Set(first.map((q) => q.exercise));
    for (const q of second) expect(firstRefs.has(q.exercise)).toBe(false);
  });

  it('游标越界时收敛到池长度（返回空组表示做完）', () => {
    const pools = getCategoryPools();
    const small = pools.find((p) => p.all.length < 15) ?? pools[pools.length - 1];
    advanceDrillCursor(small.def.id, small.all.length + 50);
    expect(takeDrillSet(small, 10)).toHaveLength(0);
  });
});

describe('grammarCategories - 单词/词组专项', () => {
  it(
    '词表题池：单词/词组两池，词义选择题结构完整',
    async () => {
      const pools = await getVocabPools();
      expect(pools).toHaveLength(2);
      const [words, phrases] = pools;
      expect(words.def.id).toBe('vocab-words');
      expect(words.all.length).toBeGreaterThan(500); // 去重后词表主体
      expect(phrases.def.id).toBe('vocab-phrases');
      expect(phrases.all.length).toBeGreaterThan(30); // 含空格词组

      const q = words.all[0].exercise;
      expect(q.question).toContain('的意思是');
      expect(q.options!.length).toBe(4);
      expect(q.optionNotes!.length).toBe(4);
      expect(q.optionNotes![q.answer as number]).toBeUndefined(); // 正确项无错因
      expect(q.explanation).toBeTruthy();
    },
    30000
  );

  it(
    '词组题去重：同一词不出两次，按课号升序',
    async () => {
      const pools = await getVocabPools();
      for (const p of pools) {
        const qs = p.all.map((q) => q.exercise.question);
        expect(new Set(qs).size).toBe(qs.length);
        for (let i = 1; i < p.all.length; i++) {
          expect(p.all[i].lessonId).toBeGreaterThanOrEqual(p.all[i - 1].lessonId);
        }
      }
    },
    30000
  );
});
