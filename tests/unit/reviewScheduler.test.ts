/**
 * 错题本间隔重复调度单元测试
 */
import {
  nextSchedule,
  isDue,
  makeExerciseKey,
  REVIEW_INTERVAL_DAYS,
  MASTERED_LEVEL,
} from '../../src/services/reviewScheduler';

const DAY = 24 * 60 * 60 * 1000;
const NOW = 1700000000000;

describe('nextSchedule 答错', () => {
  it('等级 0 答错仍是 0，次日到期', () => {
    const r = nextSchedule(0, false, NOW);
    expect(r.level).toBe(0);
    expect(r.dueAt).toBe(NOW + DAY);
    expect(r.mastered).toBe(false);
  });

  it('等级 3 答错回退到 2，次日到期', () => {
    const r = nextSchedule(3, false, NOW);
    expect(r.level).toBe(2);
    expect(r.dueAt).toBe(NOW + DAY);
  });
});

describe('nextSchedule 答对', () => {
  it('逐级升级并按间隔延长', () => {
    expect(nextSchedule(0, true, NOW).level).toBe(1);
    expect(nextSchedule(0, true, NOW).dueAt).toBe(NOW + REVIEW_INTERVAL_DAYS[1] * DAY);
    expect(nextSchedule(1, true, NOW).dueAt).toBe(NOW + REVIEW_INTERVAL_DAYS[2] * DAY);
    expect(nextSchedule(2, true, NOW).dueAt).toBe(NOW + REVIEW_INTERVAL_DAYS[3] * DAY);
  });

  it('达到最高等级视为掌握', () => {
    const maxLevel = MASTERED_LEVEL - 1;
    const r = nextSchedule(maxLevel, true, NOW);
    expect(r.mastered).toBe(true);
    expect(r.level).toBe(MASTERED_LEVEL);
  });

  it('越界等级被夹取到合法范围', () => {
    expect(nextSchedule(-1, true, NOW).level).toBe(1);
    expect(nextSchedule(99, true, NOW).mastered).toBe(true);
  });
});

describe('isDue', () => {
  it('到期时间早于当前即到期', () => {
    expect(isDue(NOW - 1, NOW)).toBe(true);
    expect(isDue(NOW, NOW)).toBe(true);
    expect(isDue(NOW + DAY, NOW)).toBe(false);
  });
});

describe('makeExerciseKey', () => {
  it('同课程同类型同题干生成相同 key', () => {
    const ex = { content: { question: 'Q1' }, answer: 'A' };
    expect(makeExerciseKey(1, 'listening', ex)).toBe(makeExerciseKey(1, 'listening', ex));
  });

  it('不同题干 / 不同类型 / 不同课程生成不同 key', () => {
    const a = { content: { question: 'Q1' }, answer: 'A' };
    const b = { content: { question: 'Q2' }, answer: 'B' };
    expect(makeExerciseKey(1, 'listening', a)).not.toBe(makeExerciseKey(1, 'listening', b));
    expect(makeExerciseKey(1, 'listening', a)).not.toBe(makeExerciseKey(1, 'reading', a));
    expect(makeExerciseKey(1, 'listening', a)).not.toBe(makeExerciseKey(2, 'listening', a));
  });
});
