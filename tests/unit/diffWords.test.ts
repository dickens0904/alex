/**
 * 词级发音差异（diffWords）单元测试
 */
import { diffWords } from '../../src/services/speechRecognition';

describe('diffWords', () => {
  it('完全一致时无漏读', () => {
    const d = diffWords('This is my book', 'This is my book');
    expect(d.missed).toEqual([]);
    expect(d.extra).toEqual([]);
    expect(d.matchedRatio).toBe(1);
  });

  it('漏读单词能被指出', () => {
    const d = diffWords('this is book', 'This is my book');
    expect(d.missed).toEqual(['my']);
    expect(d.matched.length).toBe(3);
  });

  it('多读的单词计入 extra', () => {
    const d = diffWords('this is my big book', 'this is my book');
    expect(d.missed).toEqual([]);
    expect(d.extra).toEqual(['big']);
  });

  it('大小写与标点不影响匹配', () => {
    const d = diffWords('THIS IS MY BOOK!', 'this, is my book');
    expect(d.missed).toEqual([]);
    expect(d.matchedRatio).toBe(1);
  });

  it('空识别结果全部算漏读', () => {
    const d = diffWords('', 'this is my book');
    expect(d.missed.length).toBe(4);
    expect(d.matchedRatio).toBe(0);
  });
});
