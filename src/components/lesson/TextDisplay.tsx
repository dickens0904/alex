import React, { useState, useEffect, useRef, useCallback } from 'react';
import { speakSentence, speakText, stopSpeaking } from '../../services/tts';
import VoiceSelector from './VoiceSelector';

interface Paragraph {
  speaker?: string;
  content: string;
}

interface TextData {
  title: string;
  paragraphs: Paragraph[];
  translation: string[];
}

interface TextDisplayProps {
  text: TextData;
  illustration?: string;
  autoPlay?: boolean;
}

/** 获取有效的 speaker 标识，空的也返回一个默认值 */
function getEffectiveSpeaker(speaker?: string): string {
  return speaker && speaker.trim() ? speaker.trim() : 'N';
}

const TextDisplay: React.FC<TextDisplayProps> = ({ text, illustration, autoPlay }) => {
  // 用于触发声音变更后的刷新
  const [, setRefreshKey] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const autoPlayRef = useRef(false);
  const mountedRef = useRef(false);

  const handleSpeakSentence = (content: string, speaker?: string) => {
    const effectiveSpeaker = getEffectiveSpeaker(speaker);
    speakSentence(content, effectiveSpeaker);
  };

  const handleSpeakAll = useCallback(() => {
    // 朗读全文时，将空 speaker 替换为 'N' 以便使用已选择的声音
    const normalizedParagraphs = text.paragraphs.map((p) => ({
      ...p,
      speaker: getEffectiveSpeaker(p.speaker),
    }));
    speakText(normalizedParagraphs);
  }, [text.paragraphs]);

  // 自动播放逻辑：进入课文 tab 后自动朗读全文
  useEffect(() => {
    if (autoPlay && !mountedRef.current) {
      mountedRef.current = true;
      const timer = setTimeout(() => {
        autoPlayRef.current = true;
        setIsAutoPlaying(true);
        handleSpeakAll();
        // 简单估算朗读结束后恢复状态
        const estDuration = text.paragraphs.length * 2500;
        setTimeout(() => {
          setIsAutoPlaying(false);
          autoPlayRef.current = false;
        }, estDuration);
      }, 800);
      return () => {
        clearTimeout(timer);
        stopSpeaking();
      };
    }
    return () => {
      stopSpeaking();
    };
  }, [autoPlay, handleSpeakAll, text.paragraphs.length]);

  return (
    <div className="text-section">
      <div className="text-title">{text.title}</div>
      {illustration && (
        <div className="text-illustration">
          <img
            src={illustration}
            alt={`${text.title} 场景图`}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}
      <div className="text-content">
        {text.paragraphs.map((para, index) => {
          const effectiveSpeaker = getEffectiveSpeaker(para.speaker);
          const hasExplicitSpeaker = !!para.speaker && para.speaker.trim() !== '';
          return (
            <div key={index} className="paragraph">
              <div className="paragraph-main">
                {hasExplicitSpeaker && <span className="speaker">{para.speaker}: </span>}
                <span className="english">{para.content}</span>
                <button
                  className="speak-sentence-btn small"
                  onClick={() => handleSpeakSentence(para.content, para.speaker)}
                  title={`朗读这句${hasExplicitSpeaker ? ` (${para.speaker})` : ''}`}
                >
                  🔊
                </button>
              </div>
              {/* 声音选择器：每行都显示 */}
              <div className="paragraph-voice-selector">
                <VoiceSelector
                  speaker={effectiveSpeaker}
                  previewText={para.content}
                  onVoiceChange={() => setRefreshKey((k) => k + 1)}
                />
              </div>
              <div className="translation">{text.translation[index] || ''}</div>
            </div>
          );
        })}
      </div>
      <div className="text-actions">
        <button
          className={`speak-all-btn ${isAutoPlaying ? 'playing' : ''}`}
          onClick={handleSpeakAll}
        >
          {isAutoPlaying ? '🔊 朗读中...' : '🔊 朗读全文'}
        </button>
      </div>
    </div>
  );
};

export default TextDisplay;
