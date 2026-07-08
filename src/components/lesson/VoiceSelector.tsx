import React, { useState, useEffect, useRef } from 'react';
import {
  EdgeVoice,
  fetchEdgeVoices,
  getSpeakerVoice,
  setSpeakerVoice,
  speakWithVoice,
  stopSpeaking,
} from '../../services/tts';

interface VoiceSelectorProps {
  /** 角色标识（'A' / 'B' 等） */
  speaker: string;
  /** 试听文本 */
  previewText?: string;
  /** 声音变更回调 */
  onVoiceChange?: (voiceId: string) => void;
}

const VoiceSelector: React.FC<VoiceSelectorProps> = ({
  speaker,
  previewText = 'Hello, this is a test.',
  onVoiceChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [voices, setVoices] = useState<EdgeVoice[]>([]);
  const [currentVoiceId, setCurrentVoiceId] = useState(getSpeakerVoice(speaker));
  const [activeTab, setActiveTab] = useState<'male' | 'female'>('female');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 加载声音列表
  useEffect(() => {
    fetchEdgeVoices().then((list) => {
      if (list.length > 0) {
        setVoices(list);
        // 根据当前声音判断默认 tab
        const cur = getSpeakerVoice(speaker);
        const found = list.find((v) => v.id === cur);
        if (found) {
          setActiveTab(found.gender === 'male' ? 'male' : 'female');
        }
      }
    });
    setCurrentVoiceId(getSpeakerVoice(speaker));
  }, [speaker]);

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // 当前选中声音的信息
  const currentVoiceInfo = voices.find((v) => v.id === currentVoiceId);

  // 筛选当前性别的声音
  const filteredVoices = voices.filter((v) => v.gender === activeTab);

  const handleSelect = (voiceId: string) => {
    setSpeakerVoice(speaker, voiceId);
    setCurrentVoiceId(voiceId);
    setIsOpen(false);
    onVoiceChange?.(voiceId);
  };

  const handlePreview = async (e: React.MouseEvent, voiceId: string) => {
    e.stopPropagation();
    if (playingId === voiceId) {
      stopSpeaking();
      setPlayingId(null);
    } else {
      setPlayingId(voiceId);
      await speakWithVoice(previewText, voiceId);
      setPlayingId(null);
    }
  };

  return (
    <div className="voice-selector-inline" ref={dropdownRef}>
      {/* 触发按钮 */}
      <button
        className={`voice-trigger-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title={`${speaker} 的声音：${currentVoiceInfo?.name || currentVoiceId}`}
      >
        <span className="voice-gender-icon">
          {currentVoiceInfo?.gender === 'female' ? '👩' : '👨'}
        </span>
        <span className="voice-name-short">{currentVoiceInfo?.name || '选择声音'}</span>
        <span className="voice-dropdown-arrow">{isOpen ? '▲' : '▼'}</span>
      </button>

      {/* 下拉面板 */}
      {isOpen && (
        <div className="voice-dropdown">
          {/* 性别切换标签 */}
          <div className="voice-tabs">
            <button
              className={`voice-tab ${activeTab === 'male' ? 'active' : ''}`}
              onClick={() => setActiveTab('male')}
            >
              👨 男声
            </button>
            <button
              className={`voice-tab ${activeTab === 'female' ? 'active' : ''}`}
              onClick={() => setActiveTab('female')}
            >
              👩 女声
            </button>
          </div>

          {/* 声音列表 */}
          <div className="voice-list">
            {filteredVoices.map((voice) => (
              <div
                key={voice.id}
                className={`voice-item ${voice.id === currentVoiceId ? 'selected' : ''}`}
                onClick={() => handleSelect(voice.id)}
              >
                <div className="voice-item-info">
                  <span className="voice-item-name">{voice.name}</span>
                  <span className="voice-item-accent">{voice.accent}</span>
                  <span className="voice-item-desc">{voice.desc}</span>
                </div>
                <button
                  className={`voice-preview-btn ${playingId === voice.id ? 'playing' : ''}`}
                  onClick={(e) => handlePreview(e, voice.id)}
                  title="试听"
                >
                  {playingId === voice.id ? '⏹' : '▶'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceSelector;
