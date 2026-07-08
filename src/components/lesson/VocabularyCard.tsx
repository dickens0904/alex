import React from 'react';
import { speakWord, speakSentence } from '../../services/tts';

export interface VocabularyItem {
  word: string;
  phonetic: string;
  meaning: string;
  examples: string[];
}

interface VocabularyCardProps {
  item: VocabularyItem;
}

const VocabularyCard: React.FC<VocabularyCardProps> = ({ item }) => {
  return (
    <div className="vocabulary-card">
      <div className="vocab-header">
        <span className="vocab-word">{item.word}</span>
        <div className="vocab-actions">
          <button className="speak-word-btn" onClick={() => speakWord(item.word)} title="朗读单词">
            🔊
          </button>
        </div>
      </div>
      <div className="vocab-phonetic">{item.phonetic}</div>
      <div className="vocab-meaning">{item.meaning}</div>
      <div className="vocab-examples">
        {item.examples.map((ex, i) => (
          <div key={i} className="example-row">
            <span className="example-text">{ex}</span>
            <div className="example-actions">
              <button
                className="speak-sentence-btn"
                onClick={() => speakSentence(ex)}
                title="朗读例句"
              >
                🔊
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VocabularyCard;
