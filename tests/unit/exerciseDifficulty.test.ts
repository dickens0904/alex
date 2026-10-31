/** 题目难度自动推导测试 */
import {
  estimateExerciseDifficulty,
  DIFFICULTY_LABELS,
} from '../../src/services/exerciseDifficulty';
import type { Exercise } from '../../src/types/lesson';

const make = (over: Partial<Exercise['content']> & { type?: Exercise['type'] }): Exercise => ({
  type: over.type ?? 'writing',
  content: { ...over } as Exercise['content'],
  answer: '',
  score: 1,
});

describe('estimateExerciseDifficulty', () => {
  test('短句双选听力应为第 1 档', () => {
    const d = estimateExerciseDifficulty(
      make({ type: 'listening', sentence: 'Is this your pen?', options: ['pen', 'book'] })
    );
    expect(d.level).toBe(1);
    expect(d.label).toBe(DIFFICULTY_LABELS[1]);
    expect(d.score).toBeLessThan(0.2);
  });

  test('看中文学英文（zh2en）比单词跟读难', () => {
    const sentence = 'This is his umbrella.';
    const word = estimateExerciseDifficulty(
      make({ type: 'speaking', mode: 'word', sentence })
    );
    const zh2en = estimateExerciseDifficulty(
      make({ type: 'speaking', mode: 'zh2en', sentence })
    );
    expect(zh2en.score).toBeGreaterThan(word.score);
  });

  test('长句 + 难词 + 多选项应落在第 4/5 档', () => {
    const d = estimateExerciseDifficulty(
      make({
        sentence:
          'The extraordinary photographer immediately accompanied everybody to the magnificent auditorium.',
        options: ['a', 'b', 'c', 'd', 'e', 'f'],
      })
    );
    expect(d.level).toBeGreaterThanOrEqual(4);
  });

  test('阅读短文拉高难度（passage 参与 text 选取）', () => {
    const withPassage = estimateExerciseDifficulty(
      make({
        type: 'reading',
        passage: 'The wonderful musician played beautifully and everybody applauded immediately.',
        question: 'Who played?',
        options: ['Tom', 'Jerry'],
      })
    );
    const noPassage = estimateExerciseDifficulty(
      make({ type: 'reading', question: 'Who played?', options: ['Tom', 'Jerry'] })
    );
    expect(withPassage.score).toBeGreaterThan(noPassage.score);
  });

  test('无选项题（拼写/口语）选项因子取默认 0.4', () => {
    const d = estimateExerciseDifficulty(make({ type: 'spelling', sentence: 'pen' }));
    expect(d.factors.optionCount).toBe(0.4);
  });

  test('score 与 level 一致（level 由 score 分档）', () => {
    for (let i = 0; i < 20; i++) {
      const d = estimateExerciseDifficulty(
        make({
          sentence: 'word '.repeat(i + 1) + 'extraordinary',
          options: ['a', 'b', 'c', 'd', 'e', 'f'].slice(0, (i % 5) + 2),
        })
      );
      const expected = Math.max(1, Math.min(5, 1 + Math.floor(d.score * 5)));
      expect(d.level).toBe(expected);
    }
  });
});
