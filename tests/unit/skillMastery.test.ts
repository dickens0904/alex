/** 分技能掌握度测试（注入 fake 存储，node 环境无 localStorage） */
import {
  recordSkillAnswer,
  getSkillMastery,
  getMasteryLevel,
  getAllSkillMastery,
  resetSkillMastery,
  emaUpdate,
  masteryLevel,
  setMasteryStorage,
} from '../../src/services/skillMastery';
import type { Exercise } from '../../src/types/lesson';

/** 简易内存存储 */
function fakeStorage() {
  const map = new Map<string, string>();
  return {
    getItem: (k: string) => map.get(k) ?? null,
    setItem: (k: string, v: string) => void map.set(k, v),
    removeItem: (k: string) => void map.delete(k),
  };
}

const easy: Exercise = {
  type: 'listening',
  content: { sentence: 'Is this your pen?', options: ['pen', 'book'] },
  answer: 'pen',
  score: 1,
};
const hard: Exercise = {
  type: 'listening',
  content: {
    passage:
      'The extraordinary photographer immediately accompanied everybody to the magnificent auditorium.',
    question: 'Who was there?',
    options: ['a', 'b', 'c', 'd', 'e', 'f'],
  },
  answer: 'a',
  score: 1,
};

beforeEach(() => {
  setMasteryStorage(fakeStorage());
  resetSkillMastery();
});

afterEach(() => setMasteryStorage(null));

describe('emaUpdate', () => {
  test('难题答对加分多于易题答对', () => {
    const hardGain = emaUpdate(0.5, true, 0.9);
    const easyGain = emaUpdate(0.5, true, 0.1);
    expect(hardGain).toBeGreaterThan(easyGain);
  });

  test('难题答错扣分少于易题答错', () => {
    const hardLoss = 0.5 - emaUpdate(0.5, false, 0.9);
    const easyLoss = 0.5 - emaUpdate(0.5, false, 0.1);
    expect(hardLoss).toBeLessThan(easyLoss);
  });

  test('结果始终在 0-1 内', () => {
    expect(emaUpdate(0, true, 1)).toBeLessThanOrEqual(1);
    expect(emaUpdate(1, false, 0)).toBeGreaterThanOrEqual(0);
  });
});

describe('masteryLevel', () => {
  test('EMA 分档边界', () => {
    expect(masteryLevel(0.1)).toBe(1);
    expect(masteryLevel(0.4)).toBe(2);
    expect(masteryLevel(0.6)).toBe(3);
    expect(masteryLevel(0.8)).toBe(4);
    expect(masteryLevel(0.95)).toBe(5);
  });
});

describe('recordSkillAnswer / getSkillMastery', () => {
  test('无记录时读取为 null / 1 档', () => {
    expect(getSkillMastery('listening')).toBeNull();
    expect(getMasteryLevel('listening')).toBe(1);
  });

  test('连续答对掌握度上升，答错回落', () => {
    recordSkillAnswer('listening', easy, true);
    recordSkillAnswer('listening', easy, true);
    recordSkillAnswer('listening', easy, true);
    const afterUp = getSkillMastery('listening')!;
    expect(afterUp.ema).toBeGreaterThan(0.5);
    expect(getMasteryLevel('listening')).toBeGreaterThanOrEqual(2);

    recordSkillAnswer('listening', hard, false);
    const afterDown = getSkillMastery('listening')!;
    expect(afterDown.ema).toBeLessThan(afterUp.ema);
    expect(afterDown.attempts).toBe(4);
    expect(afterDown.correct).toBe(3);
  });

  test('技能之间互相独立', () => {
    recordSkillAnswer('speaking', easy, true);
    expect(getSkillMastery('listening')).toBeNull();
    expect(getSkillMastery('speaking')!.attempts).toBe(1);
  });

  test('getAllSkillMastery 返回已记录技能', () => {
    recordSkillAnswer('spelling', easy, true);
    const all = getAllSkillMastery();
    expect(Object.keys(all)).toEqual(['spelling']);
  });
});
