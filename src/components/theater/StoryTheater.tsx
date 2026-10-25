import React, { useState, useEffect, useRef, useCallback } from 'react';
import { speakTheaterLine, getTheaterVoiceOptions, stopSpeaking } from '../../services/tts';
import { buildLessonVoiceMap, buildCastVoiceMap } from '../../data/voiceAssignment';
import { startSpeechEvaluation } from '../../services/speechRecognition';
import type { SpeechEvalResult, SpeechEvaluationSession } from '../../services/speechRecognition';
import { playCorrectSound } from '../../services/soundEffects';
import { logger } from '../../utils/logger';
import { getStageConfig, sceneAt, type LineAction } from './scenes';
import TheaterStage from './TheaterStage';
import {
  STYLE_ORDER,
  STYLE_THEMES,
  recommendStyle,
  getUserStyle,
  saveUserStyle,
  clearUserStyle,
  type StyleId,
} from '../../data/theater/theaterStyles';
import { ROLE_VOICE_KIND } from '../../data/theater/theaterScripts';
import './theater.css';

const MODULE = 'StoryTheater';

interface TheaterText {
  title: string;
  paragraphs: Array<{ speaker?: string; content: string }>;
  translation: string[];
}

interface StoryTheaterProps {
  lessonId: number;
  text: TheaterText;
  onClose: () => void;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * 情景剧场播放器：消费 144 课剧本数据（theaterScripts）
 * - 逐句驱动：TTS 播完一句进下一句（音频与动画天然同步）
 * - 中断安全：sessionRef 代数取代旧循环，stopSpeaking 兜底
 * - 旁白句（key=N）由说书人朗读，气泡用暖色区分
 */
const StoryTheater: React.FC<StoryTheaterProps> = ({ lessonId, text, onClose }) => {
  const config = getStageConfig(lessonId);
  const [curIdx, setCurIdx] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(false);
  const [speakerKey, setSpeakerKey] = useState<string | null>(null);
  const sessionRef = useRef(0);
  // 画风：默认用本课推荐风格；用户手动选择后全局记忆
  const [theme, setTheme] = useState<StyleId>(() => getUserStyle() ?? recommendStyle(lessonId));
  const [customPicked, setCustomPicked] = useState(() => getUserStyle() != null);

  // ---- 跟读模式：每句 TTS 播完 → 孩子跟读 → 离线识别打分 → 过关自动下一句 ----
  const [repeatMode, setRepeatMode] = useState(
    () => localStorage.getItem('theater-repeat-mode') === '1'
  );
  const repeatModeRef = useRef(repeatMode); // 播放循环内读 ref，切换开关即时生效
  const [listening, setListening] = useState(false); // 正在录音
  const [scoredResult, setScoredResult] = useState<SpeechEvalResult | null>(null); // 本句评分
  const [lineScores, setLineScores] = useState<Record<number, number>>({}); // 各句得分（进度条染色）
  const evalSessionRef = useRef<SpeechEvaluationSession | null>(null);
  const waitNextRef = useRef<((action: 'retry' | 'advance') => void) | null>(null);
  const micBarRef = useRef<HTMLDivElement | null>(null); // 音量条（rAF 直改样式避免重渲染）

  const handlePickStyle = (id: StyleId) => {
    setTheme(id);
    setCustomPicked(true);
    saveUserStyle(id);
  };
  const handleFollowRecommend = () => {
    setCustomPicked(false);
    clearUserStyle();
    setTheme(recommendStyle(lessonId));
  };

  // ---- 跟读模式控制 ----

  /** 取消进行中的录音/等待并唤醒播放循环（循环内会话代数校验会自行退出） */
  const cancelEval = useCallback(() => {
    evalSessionRef.current?.stop();
    evalSessionRef.current = null;
    const wake = waitNextRef.current;
    waitNextRef.current = null;
    wake?.('advance');
  }, []);

  const handleToggleRepeat = () => {
    const next = !repeatModeRef.current;
    repeatModeRef.current = next;
    setRepeatMode(next);
    localStorage.setItem('theater-repeat-mode', next ? '1' : '0');
    if (!next) {
      // 关闭跟读：结束本句录音/放行等待中的循环，后续句子不再跟读
      cancelEval();
      setListening(false);
      setScoredResult(null);
    }
    logger.info(MODULE, '跟读模式', next ? '开启' : '关闭');
  };

  const handleRetryLine = () => {
    const wake = waitNextRef.current;
    waitNextRef.current = null;
    setScoredResult(null);
    wake?.('retry');
  };

  const handleSkipLine = () => {
    const wake = waitNextRef.current;
    waitNextRef.current = null;
    setScoredResult(null);
    wake?.('advance');
  };

  // 卸载兜底：停止朗读与录音
  useEffect(() => {
    const session = sessionRef; // 捕获 ref 对象，避免 cleanup 读值警告
    const evalRef = evalSessionRef;
    return () => {
      session.current++;
      evalRef.current?.stop();
      stopSpeaking();
    };
  }, []);

  const play = useCallback(
    async (from: number) => {
      if (!config) return;
      const mySession = ++sessionRef.current;
      stopSpeaking();
      setFinished(false);
      setPlaying(true);
      logger.info(MODULE, '开始播放', `第 ${from + 1} 句起（L${lessonId}）`);
      // 声音分配（每次播放按当前口音预设重建）：
      //   句子带课文 speaker（A/B/人名…）→ 与课文页同一分配表（预生成缓存必命中、性别已校准）
      //   空段落（旁白/展示台句）→ cast key 按画面原型性别分配（cast key 跨课复用不能查全局表）
      // default* 表忽略用户自定义：自定义声音缓存 miss 时兜底用（预生成按默认分配）
      const opts = getTheaterVoiceOptions();
      const textMap = buildLessonVoiceMap(text.paragraphs, opts);
      const castMap = buildCastVoiceMap(
        config.roles.map((r) => {
          const kind = ROLE_VOICE_KIND[config.roleById[r.key]] ?? ROLE_VOICE_KIND.man1;
          return { key: r.key, gender: kind.gender, age: kind.age };
        }),
        opts
      );
      const noCustomOpts = { ...opts, userVoices: {} };
      const defaultTextMap = buildLessonVoiceMap(text.paragraphs, noCustomOpts);
      const defaultCastMap = buildCastVoiceMap(
        config.roles.map((r) => {
          const kind = ROLE_VOICE_KIND[config.roleById[r.key]] ?? ROLE_VOICE_KIND.man1;
          return { key: r.key, gender: kind.gender, age: kind.age };
        }),
        noCustomOpts
      );
      const total = Math.min(config.lineActions.length, text.paragraphs.length);
      for (let i = from; i < total; i++) {
        if (sessionRef.current !== mySession) return; // 被跳转/停止/退出取代
        const para = text.paragraphs[i];
        const actions = config.lineActions[i] ?? {};
        setCurIdx(i);
        setSpeakerKey(Object.keys(actions)[0] ?? null);
        setScoredResult(null);
        // 台词声音：优先课文 speaker 标识，否则画面原型（旁白句走说书人）
        const paraKey = para.speaker?.trim() ? para.speaker.toUpperCase() : null;
        const castKey = Object.keys(actions)[0] ?? null;
        const voice =
          (paraKey ? textMap.get(paraKey) : undefined) ??
          (castKey ? castMap.get(castKey.toUpperCase()) : undefined) ??
          opts.defaultFemale;
        const fallbackVoice =
          (paraKey ? defaultTextMap.get(paraKey) : undefined) ??
          (castKey ? defaultCastMap.get(castKey.toUpperCase()) : undefined);
        try {
          await speakTheaterLine(para.content, voice, fallbackVoice);
        } catch (e) {
          logger.warn(MODULE, '台词朗读失败', String(e));
        }
        if (sessionRef.current !== mySession) return;

        // 跟读模式：录一句评一句，过关（≥70 分）才往下走
        if (repeatModeRef.current) {
          await sleep(500); // 留给孩子反应时间，也避开 TTS 尾音
          if (sessionRef.current !== mySession) return;
          setListening(true);
          const result = await new Promise<SpeechEvalResult>((resolve) => {
            const session = startSpeechEvaluation(para.content, 12000, (level) => {
              if (micBarRef.current) {
                micBarRef.current.style.transform = `scaleY(${Math.max(0.08, Math.min(1, level))})`;
              }
            });
            evalSessionRef.current = session;
            void session.promise.then(resolve);
          });
          evalSessionRef.current = null;
          if (sessionRef.current !== mySession) return;
          setListening(false);
          setScoredResult(result);
          setLineScores((prev) => ({ ...prev, [i]: result.score }));
          logger.info(MODULE, '跟读评分', `第 ${i + 1} 句 ${result.score} 分（${result.mode}）`);
          if (result.score >= 70) {
            playCorrectSound();
            await sleep(1300); // 亮分庆祝后自动下一句
            if (sessionRef.current !== mySession) return;
          } else {
            // 未达标：停在得分面板，等「再读一遍」或「跳过」
            const action = await new Promise<'retry' | 'advance'>((resolve) => {
              waitNextRef.current = resolve;
            });
            waitNextRef.current = null;
            if (sessionRef.current !== mySession) return;
            if (action === 'retry') {
              i -= 1; // 重播这句（先示范朗读再录音）
              continue;
            }
          }
        }

        await sleep(430);
      }
      if (sessionRef.current !== mySession) return;
      // 剧终：全体挥手谢幕
      setListening(false);
      setScoredResult(null);
      setPlaying(false);
      setFinished(true);
      logger.info(MODULE, '播放完成', text.title);
    },
    [config, lessonId, text]
  );

  const handleStop = () => {
    sessionRef.current++;
    cancelEval();
    stopSpeaking();
    setPlaying(false);
    setSpeakerKey(null);
    setListening(false);
    setScoredResult(null);
  };

  const handleJump = (i: number) => {
    void play(i);
  };

  if (!config) return null;

  const curPara = curIdx >= 0 ? text.paragraphs[curIdx] : null;
  const curTranslation = curIdx >= 0 ? text.translation[curIdx] ?? '' : '';
  const bubbleText = curPara?.content ?? '';
  const curLineActions = curIdx >= 0 ? config.lineActions[curIdx] ?? {} : {};
  const curSpeakerKey = speakerKey ?? (Object.keys(curLineActions)[0] ?? null);
  // 剧终谢幕：全体挥手（speakerKey 置空让镜头回全景）
  const allWave: Record<string, LineAction> = {};
  config.roles.forEach((r) => {
    allWave[r.key] = 'wave';
  });
  // 累积动作：表情/手势（raise/wave/point/nod/shake/smile/angry/sad/surprised）
  // 持续到该角色的下一动作（爬树的手要一直举着）；walkin/walkout/talk 为瞬态不累积。
  // 直接计算（组件可能在此前 early return，hook 顺序受限；循环开销可忽略）
  const accumulatedActions: Array<Record<string, LineAction>> = [];
  {
    let cur: Record<string, LineAction> = {};
    for (let i = 0; i < config.lineActions.length; i++) {
      cur = { ...cur };
      for (const [k, v] of Object.entries(config.lineActions[i])) {
        if (v !== 'walkin' && v !== 'walkout' && v !== 'talk') cur[k] = v;
      }
      accumulatedActions[i] = cur;
    }
  }
  const stageActions =
    finished
      ? allWave
      : curIdx >= 0
        ? { ...(accumulatedActions[curIdx] ?? {}), ...curLineActions }
        : {};
  // 当前场：标题地点随剧情切换（分场课）
  const scene = sceneAt(config, Math.max(0, curIdx));

  return (
    <div className="theater-overlay">
      <div className="theater-header">
        <div className="theater-title">
          🎬 情景剧场 · {config.script.scene}
          <span className="theater-place">（{scene.place}）</span>
        </div>
        <button className="theater-close" onClick={onClose} title="退出剧场">
          ✕
        </button>
      </div>

      {/* 画风选择条 */}
      <div className="theater-stylebar">
        {STYLE_ORDER.map((id) => {
          const th = STYLE_THEMES[id];
          const rec = recommendStyle(lessonId) === id;
          return (
            <button
              key={id}
              className={`theater-style-btn ${theme === id ? 'active' : ''}`}
              onClick={() => handlePickStyle(id)}
              title={`${th.desc}${rec ? '（本课推荐）' : ''}`}
            >
              {th.icon} {th.name}
              {rec && <i className="rec-dot" />}
            </button>
          );
        })}
        {customPicked && (
          <button
            className="theater-style-recbtn"
            onClick={handleFollowRecommend}
            title={`恢复本课推荐：${STYLE_THEMES[recommendStyle(lessonId)].name}`}
          >
            ↺ 本课推荐
          </button>
        )}
      </div>

      <div className="theater-stage-wrap">
        <TheaterStage
          config={config}
          curIdx={curIdx}
          curActions={stageActions}
          bubbleText={bubbleText}
          speakerKey={finished || !playing ? null : curSpeakerKey}
          theme={theme}
        />
      </div>

      {/* 字幕条 */}
      <div className="theater-subtitle">
        {curPara ? (
          <>
            <div className="theater-subtitle-en">
              <span className="theater-speaker-tag">
                {config.keyToRole[curSpeakerKey ?? '']?.name ?? '旁白'}
              </span>
              {curPara.content}
            </div>
            {curTranslation && <div className="theater-subtitle-zh">{curTranslation}</div>}
          </>
        ) : (
          <div className="theater-subtitle-hint">点击 ▶ 开始演出</div>
        )}
      </div>

      {/* 跟读面板：录音中 / 亮分反馈 */}
      {(listening || scoredResult) && (
        <div className={`theater-repeat-panel ${listening ? 'listening' : ''}`}>
          {listening ? (
            <>
              <span className="theater-repeat-mic">🎤</span>
              <div className="theater-repeat-hint">
                <b>轮到你啦！大声跟读：</b>
                <span className="theater-repeat-target">{curPara?.content}</span>
              </div>
              <div className="theater-repeat-level">
                <i ref={micBarRef} />
              </div>
            </>
          ) : scoredResult ? (
            <>
              <span
                className={`theater-repeat-face ${
                  scoredResult.score >= 90 ? 'great' : scoredResult.score >= 70 ? 'good' : 'poor'
                }`}
              >
                {scoredResult.score >= 90 ? '🌟' : scoredResult.score >= 70 ? '👍' : '💪'}
              </span>
              <div className="theater-repeat-score">
                <b>{scoredResult.score}分</b>
                <span>
                  {scoredResult.micError
                    ? '麦克风不可用，检查后点「再读一遍」'
                    : scoredResult.score >= 90
                      ? '读得真棒！'
                      : scoredResult.score >= 70
                        ? '很好，继续加油！'
                        : '再试一次会更棒'}
                </span>
                {scoredResult.transcript && (
                  <i className="theater-repeat-heard">听到：{scoredResult.transcript}</i>
                )}
              </div>
              {scoredResult.score < 70 && (
                <div className="theater-repeat-actions">
                  <button className="theater-btn primary" onClick={handleRetryLine}>
                    🔁 再读一遍
                  </button>
                  <button className="theater-btn" onClick={handleSkipLine}>
                    跳过这句 ⏭
                  </button>
                </div>
              )}
            </>
          ) : null}
        </div>
      )}

      {/* 台词进度条 */}
      <div className="theater-lines">
        {text.paragraphs.map((p, i) => (
          <button
            key={i}
            className={`theater-line-chip ${i === curIdx ? 'active' : ''} ${
              i < curIdx ? 'done' : ''
            } ${
              lineScores[i] != null ? (lineScores[i] >= 70 ? 'pass' : 'fail') : ''
            }`}
            onClick={() => handleJump(i)}
            title="跳到这句"
          >
            {config.lineActions[i] ? Object.keys(config.lineActions[i])[0] : '•'}
          </button>
        ))}
      </div>

      {/* 控制 */}
      <div className="theater-controls">
        <button
          className={`theater-btn ${repeatMode ? 'repeat-on' : ''}`}
          onClick={handleToggleRepeat}
          title="每句读完由你跟读，离线识别打分（≥70 分过关）"
        >
          🎤 跟读模式{repeatMode ? '：开' : ''}
        </button>
        <button className="theater-btn" onClick={() => handleJump(0)} title="从头播放">
          ⏮ 从头演
        </button>
        {playing ? (
          <button className="theater-btn primary" onClick={handleStop}>
            ⏹ 停止
          </button>
        ) : (
          <button
            className="theater-btn primary"
            onClick={() => void play(finished || curIdx < 0 ? 0 : curIdx)}
            title="从当前句继续"
          >
            ▶ {finished ? '再演一遍' : curIdx < 0 ? '开始演出' : '继续'}
          </button>
        )}
        {curIdx >= 0 && !playing && (
          <button className="theater-btn" onClick={() => handleJump(curIdx)} title="重播本句">
            🔁 重播本句
          </button>
        )}
      </div>

      {finished && <div className="theater-curtain">🎉 剧终！</div>}
    </div>
  );
};

export default StoryTheater;
