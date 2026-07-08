import React, { useState, useRef, useEffect } from 'react';
import {
  CHINESE_VOICES,
  CANTONESE_VOICES,
  ChineseVoice,
  getCurrentChineseVoice,
  setChineseVoice,
  speakChinese,
  stopSpeaking,
  isChinesePlaying,
  replayLastChinese,
} from '../../services/tts';
import './ChineseVoiceSelector.css';

interface ChineseVoiceSelectorProps {
  onVoiceChange?: (voiceId: string) => void;
}

const ChineseVoiceSelector: React.FC<ChineseVoiceSelectorProps> = ({ onVoiceChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentVoiceId, setCurrentVoiceId] = useState(getCurrentChineseVoice());
  const [activeTab, setActiveTab] = useState<'female' | 'male'>('female');
  const [activeRegion, setActiveRegion] = useState<'cn' | 'hk'>('cn');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentVoiceId(getCurrentChineseVoice());
  }, []);

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

  const voices = activeRegion === 'cn' ? CHINESE_VOICES : CANTONESE_VOICES;
  const filteredVoices = voices.filter((v) => {
    const genderMatch = v.gender === activeTab;
    if (!searchText) return genderMatch;
    const searchLower = searchText.toLowerCase();
    return (
      genderMatch &&
      (v.name.toLowerCase().includes(searchLower) ||
        v.desc.toLowerCase().includes(searchLower) ||
        v.tags.some((t) => t.includes(searchLower)))
    );
  });

  const currentVoiceInfo = [...CHINESE_VOICES, ...CANTONESE_VOICES].find(
    (v) => v.id === currentVoiceId
  );

  const handleSelect = async (voiceId: string) => {
    setChineseVoice(voiceId);
    setCurrentVoiceId(voiceId);
    setIsOpen(false);
    onVoiceChange?.(voiceId);
    // 如果正在播放中文，用新声音重播
    if (isChinesePlaying()) {
      await replayLastChinese();
    }
  };

  const handlePreview = async (e: React.MouseEvent, voice: ChineseVoice) => {
    e.stopPropagation();
    if (playingId === voice.id) {
      stopSpeaking();
      setPlayingId(null);
    } else {
      setPlayingId(voice.id);
      const previewText =
        voice.gender === 'female'
          ? '你好，我是' + voice.name + '，很高兴认识你！'
          : '大家好，我是' + voice.name + '，今天一起来学习吧！';
      await speakChinese(previewText, voice.id);
      setPlayingId(null);
    }
  };

  return (
    <div className="chinese-voice-selector" ref={dropdownRef}>
      <button
        className={`voice-trigger-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="选择中文声音"
      >
        <span className="voice-icon">🗣️</span>
        <span className="voice-name">{currentVoiceInfo?.name || '中文声音'}</span>
        <span className="voice-region">{activeRegion === 'cn' ? '🇨🇳' : '🇭🇰'}</span>
        <span className="voice-dropdown-arrow">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="voice-dropdown">
          {/* 地区切换 */}
          <div className="region-tabs">
            <button
              className={`region-tab ${activeRegion === 'cn' ? 'active' : ''}`}
              onClick={() => setActiveRegion('cn')}
            >
              🇨🇳 普通话
            </button>
            <button
              className={`region-tab ${activeRegion === 'hk' ? 'active' : ''}`}
              onClick={() => setActiveRegion('hk')}
            >
              🇭🇰 粤语
            </button>
          </div>

          {/* 性别切换 */}
          <div className="gender-tabs">
            <button
              className={`gender-tab ${activeTab === 'female' ? 'active' : ''}`}
              onClick={() => setActiveTab('female')}
            >
              👩 女声
            </button>
            <button
              className={`gender-tab ${activeTab === 'male' ? 'active' : ''}`}
              onClick={() => setActiveTab('male')}
            >
              👨 男声
            </button>
          </div>

          {/* 搜索框 */}
          <div className="search-box">
            <input
              type="text"
              placeholder="搜索声音..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="search-input"
            />
          </div>

          {/* 声音列表 */}
          <div className="voice-list">
            {filteredVoices.map((voice) => (
              <div
                key={voice.id}
                className={`voice-item ${voice.id === currentVoiceId ? 'selected' : ''}`}
                onClick={() => handleSelect(voice.id)}
              >
                <div className="voice-item-main">
                  <span className="voice-item-name">{voice.name}</span>
                  <span className="voice-item-desc">{voice.desc}</span>
                </div>
                <div className="voice-item-tags">
                  {voice.tags.map((tag, i) => (
                    <span key={i} className="voice-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  className={`voice-preview-btn ${playingId === voice.id ? 'playing' : ''}`}
                  onClick={(e) => handlePreview(e, voice)}
                  title="试听"
                >
                  {playingId === voice.id ? '⏹' : '▶'}
                </button>
              </div>
            ))}
            {filteredVoices.length === 0 && <div className="no-voices">未找到匹配的声音</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChineseVoiceSelector;
