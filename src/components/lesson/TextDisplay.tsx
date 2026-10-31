import React, { useState, useEffect, useRef, useCallback } from 'react';
import { speakSentence, speakText, stopSpeaking } from '../../services/tts';
import VoiceSelector from './VoiceSelector';
import { getStageConfig } from '../theater/scenes';
import StoryTheater from '../theater/StoryTheater';

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
  /** 课程 id：配置了剧场场景的课显示"情景剧场"入口 */
  lessonId?: number;
  /** 本课词汇表：剧场跟读评分用它构建音素字典（真人注音优先） */
  vocabulary?: Array<{ word: string; phonetic?: string }>;
}

/** 获取有效的 speaker 标识，空的也返回一个默认值 */
function getEffectiveSpeaker(speaker?: string): string {
  return speaker && speaker.trim() ? speaker.trim() : 'N';
}

const TextDisplay: React.FC<TextDisplayProps> = ({
  text,
  illustration,
  autoPlay,
  lessonId,
  vocabulary,
}) => {
  // 用于触发声音变更后的刷新
  const [, setRefreshKey] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [theaterOpen, setTheaterOpen] = useState(false);
  const autoPlayRef = useRef(false);
  const mountedRef = useRef(false);
  const hasTheater = lessonId != null && getStageConfig(lessonId) != null;

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

  // 仅在组件卸载时停止朗读（重渲染不应打断进行中的朗读）
  useEffect(() => {
    return () => {
      stopSpeaking();
      mountedRef.current = false;
    };
  }, []);

  // 自动播放逻辑：进入课文 tab 后自动朗读全文（组件挂载时触发一次）
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
      // 依赖变化时只取消尚未开始的定时器，不停正在进行的朗读
      return () => {
        clearTimeout(timer);
      };
    }
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
        {hasTheater && (
          <button
            className="theater-entry-btn"
            onClick={() => {
              stopSpeaking(); // 停掉课文自动朗读，把声音让给剧场
              setTheaterOpen(true);
            }}
          >
            🎬 情景剧场
          </button>
        )}
        <button
          className={`speak-all-btn ${isAutoPlaying ? 'playing' : ''}`}
          onClick={handleSpeakAll}
        >
          {isAutoPlaying ? '🔊 朗读中...' : '🔊 朗读全文'}
        </button>
      </div>

      {theaterOpen && (
        <StoryTheater
          lessonId={lessonId!}
          text={{ title: text.title, paragraphs: text.paragraphs, translation: text.translation }}
          vocabulary={vocabulary}
          onClose={() => {
            setTheaterOpen(false);
            setRefreshKey((k) => k + 1);
          }}
        />
      )}
    </div>
  );
};

export default TextDisplay;
