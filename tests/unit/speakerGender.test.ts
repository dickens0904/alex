/**
 * speakerGender 单元测试
 * 测试角色性别映射逻辑
 */

// Mock console.log to avoid noise
const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
afterAll(() => consoleSpy.mockRestore());

import { getSpeakerGender, getSpeakerInfo, isMaleSpeaker, isFemaleSpeaker } from '../../src/data/speakerGender';

describe('speakerGender', () => {
  describe('getSpeakerGender', () => {
    test('空字符串返回 neutral', () => {
      expect(getSpeakerGender('')).toBe('neutral');
    });

    test('角色 A 返回 male', () => {
      expect(getSpeakerGender('A')).toBe('male');
    });

    test('角色 B 返回 female', () => {
      expect(getSpeakerGender('B')).toBe('female');
    });

    test('MAN 返回 male', () => {
      expect(getSpeakerGender('MAN')).toBe('male');
    });

    test('WOMAN 返回 female', () => {
      expect(getSpeakerGender('WOMAN')).toBe('female');
    });

    test('BOY 返回 male', () => {
      expect(getSpeakerGender('BOY')).toBe('male');
    });

    test('GIRL 返回 female', () => {
      expect(getSpeakerGender('GIRL')).toBe('female');
    });

    test('大小写不敏感', () => {
      expect(getSpeakerGender('man')).toBe('male');
      expect(getSpeakerGender('Woman')).toBe('female');
      expect(getSpeakerGender('bOy')).toBe('male');
    });

    test('带空格的输入会 trim', () => {
      expect(getSpeakerGender('  A  ')).toBe('male');
      expect(getSpeakerGender('  B  ')).toBe('female');
    });

    test('未识别的 speaker 返回 neutral', () => {
      expect(getSpeakerGender('UNKNOWN_CHARACTER')).toBe('neutral');
    });
  });

  describe('getSpeakerInfo', () => {
    test('空字符串返回默认信息', () => {
      const info = getSpeakerInfo('');
      expect(info.gender).toBe('neutral');
      expect(info.note).toContain('旁白');
    });

    test('已知角色返回正确信息', () => {
      const info = getSpeakerInfo('A');
      expect(info.gender).toBe('male');
      expect(info.note).toBeDefined();
    });

    test('未收录角色返回推断信息', () => {
      const info = getSpeakerInfo('XYZ');
      expect(['male', 'female', 'neutral']).toContain(info.gender);
      expect(info.note).toContain('推断');
    });
  });

  describe('isMaleSpeaker / isFemaleSpeaker', () => {
    test('A 是男性', () => {
      expect(isMaleSpeaker('A')).toBe(true);
      expect(isFemaleSpeaker('A')).toBe(false);
    });

    test('B 是女性', () => {
      expect(isMaleSpeaker('B')).toBe(false);
      expect(isFemaleSpeaker('B')).toBe(true);
    });

    test('WOMAN 是女性', () => {
      expect(isFemaleSpeaker('WOMAN')).toBe(true);
      expect(isMaleSpeaker('WOMAN')).toBe(false);
    });

    test('MAN 是男性', () => {
      expect(isMaleSpeaker('MAN')).toBe(true);
      expect(isFemaleSpeaker('MAN')).toBe(false);
    });
  });
});
