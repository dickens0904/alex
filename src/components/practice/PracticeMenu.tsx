import React from 'react';
import type { Exercise } from '../../types/lesson';

export type PracticeType = 'listening' | 'speaking' | 'spelling' | 'writing' | 'reading';

interface PracticeMenuProps {
  exercises: Exercise[];
  onStart: (type: PracticeType) => void;
}

const PRACTICE_TYPES: {
  type: PracticeType;
  icon: string;
  title: string;
  desc: string;
}[] = [
  { type: 'listening', icon: '🎧', title: '听力练习', desc: '听录音，选择正确的答案' },
  { type: 'speaking', icon: '🎤', title: '口语练习', desc: '跟读句子，提升口语能力' },
  { type: 'spelling', icon: '✏️', title: '拼写练习', desc: '根据提示拼写单词' },
  { type: 'writing', icon: '📝', title: '填空练习', desc: '选择正确的单词填入空白' },
  { type: 'reading', icon: '📖', title: '阅读理解', desc: '阅读课文，回答理解题' },
];

const PracticeMenu: React.FC<PracticeMenuProps> = ({ exercises, onStart }) => {
  const totalCount = exercises.length;
  const getCountByType = (type: PracticeType): number => {
    return exercises.filter((ex) => ex.type === type).length;
  };

  return (
    <div className="practice-section">
      {PRACTICE_TYPES.map(({ type, icon, title, desc }) => {
        const count = getCountByType(type);
        const isDisabled = count === 0;
        return (
          <div
            key={type}
            className={`practice-card ${isDisabled ? 'disabled' : ''}`}
            onClick={() => count > 0 && onStart(type)}
          >
            <div className="practice-icon">{isDisabled ? '🔒' : icon}</div>
            <h3>{title}</h3>
            <p>{desc}</p>
            <div className="practice-count">
              {count > 0 ? `共 ${count} 题` : totalCount === 0 ? '暂无题目' : '该类型暂无'}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PracticeMenu;
