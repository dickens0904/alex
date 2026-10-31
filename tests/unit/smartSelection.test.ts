/** 智能选题引擎测试 */
import {
  selectSmartExercises,
  rankExercises,
  levelToTargetScore,
} from '../../src/services/smartSelection';
import { setMasteryStorage } from '../../src/services/skillMastery';
import type { Exercise } from '../../src/types/lesson';

afterEach(() => setMasteryStorage(null));

const ex = (sentence: string, type: Exercise['type'] = 'writing'): Exercise => ({
  type,
  content: { sentence, options: ['a', 'b'] },
  answer: 'a',
  score: 1,
});

/** 构造不同难度的题：短句易、长难句难 */
const pool: Exercise[] = [
  ex('Is this your pen?'),
  ex('Give me that book.'),
  ex('The man is reading a newspaper in the living room quietly.'),
  ex(
    'The extraordinary photographer immediately accompanied everybody to the magnificent auditorium yesterday afternoon.'
  ),
  ex('Sit down, please.'),
];

describe('levelToTargetScore', () => {
  test('1 档 → 0.1，5 档 → 0.9，越界收敛', () => {
    expect(levelToTargetScore(1)).toBeCloseTo(0.1);
    expect(levelToTargetScore(5)).toBeCloseTo(0.9);
    expect(levelToTargetScore(0)).toBeCloseTo(0.1);
    expect(levelToTargetScore(9)).toBeCloseTo(0.9);
  });
});

describe('rankExercises', () => {
  test('每题都带难度标注', () => {
    const ranked = rankExercises(pool);
    expect(ranked).toHaveLength(pool.length);
    for (const r of ranked) {
      expect(r.difficulty.level).toBeGreaterThanOrEqual(1);
      expect(r.difficulty.level).toBeLessThanOrEqual(5);
    }
  });
});

describe('selectSmartExercises', () => {
  test('空池/单题原样返回', () => {
    expect(selectSmartExercises([], 'listening')).toEqual([]);
    const single = [pool[0]];
    expect(selectSmartExercises(single, 'listening')).toEqual(single);
  });

  test('低掌握（1 档）排在最前的题比高掌握（5 档）时容易', () => {
    const easyFirst = selectSmartExercises(pool, 'listening', { targetLevel: 1 });
    const hardFirst = selectSmartExercises(pool, 'listening', { targetLevel: 5 });
    const scoreOf = (e: Exercise) =>
      rankExercises([e])[0].difficulty.score;
    expect(scoreOf(easyFirst[0])).toBeLessThanOrEqual(scoreOf(hardFirst[0]));
  });

  test('整体构成由易到难爬坡（预热段 ≤ 主练段 ≤ 挑战段的平均值关系）', () => {
    const ordered = selectSmartExercises(pool, 'listening', { targetLevel: 2 });
    const scores = rankExercises(ordered).map((r) => r.difficulty.score);
    // 前半平均分 ≤ 后半平均分（爬坡）
    const half = Math.floor(scores.length / 2);
    const front = scores.slice(0, half);
    const back = scores.slice(half);
    const avg = (a: number[]) => a.reduce((s, v) => s + v, 0) / Math.max(1, a.length);
    expect(avg(front)).toBeLessThanOrEqual(avg(back));
  });

  test('count 截断保留离目标最近的题', () => {
    const target = 1;
    const picked = selectSmartExercises(pool, 'listening', { targetLevel: target, count: 2 });
    expect(picked).toHaveLength(2);
    const all = selectSmartExercises(pool, 'listening', { targetLevel: target });
    // 与全量序列的前 2 题一致（最近目标优先保留）
    expect(picked).toEqual(all.slice(0, 2));
  });

  test('不改变题池内容，只重排', () => {
    const ordered = selectSmartExercises(pool, 'reading', { targetLevel: 3 });
    // 用唯一键（句子）排序后比较，验证是同一批题
    const bySentence = (a: Exercise, b: Exercise) =>
      (a.content.sentence ?? '').localeCompare(b.content.sentence ?? '');
    expect([...ordered].sort(bySentence)).toEqual([...pool].sort(bySentence));
  });
});
