/**
 * 句型探索：让语法"看得见、点得动"
 *
 * 针对儿童的三步设计（全部从现有 grammar 数据自动推导，无需新增数据）：
 * 1. 句子积木——例句拆成单词块，点击听发音，孩子把句子"拆开看"
 * 2. 魔法词高亮——从 keywords / grammarPoint 提取本课语法结构词，
 *    在例句中彩色高亮，孩子直观看到 "什么时候用 Does、什么时候用 Do"
 * 3. 遮词小挑战——把例句中的魔法词遮住，从候选词块里点选还原，
 *    答对播放音效落位，用互动确认规律
 */
import React, { useMemo, useState } from 'react';
import type { GrammarDetail } from '../../types/lesson';
import { speakWord, speakEnglish } from '../../services/tts';
import { playCorrectSound, playWrongSound, playPerfectSound } from '../../services/soundEffects';
import './PatternExplorer.css';

/** 句子分词：英文词（含撇号缩写）为一个 token，其余连续字符（标点）为普通块 */
function tokenizeSentence(sentence: string): string[] {
  return sentence.match(/[A-Za-z]+(?:'[A-Za-z]+)?|[^\sA-Za-z]+/g) ?? [];
}

/** 判断是否英文词 token */
function isWordToken(token: string): boolean {
  return /^[A-Za-z]+(?:'[A-Za-z]+)?$/.test(token);
}

const norm = (w: string) => w.toLowerCase();

/** 从 keywords / grammarPoint 提取英文词（如 Does / doesn't / What is） */
function extractEnglishTokens(text: string): string[] {
  return (text.match(/[A-Za-z]+(?:'[A-Za-z]+)?/g) ?? []).map(norm);
}

/** 遮词挑战：一条例句出题 */
interface BlankChallenge {
  exampleIndex: number;
  blankTokenIndex: number;
  answer: string;
  options: string[];
}

interface PatternExplorerProps {
  grammar: GrammarDetail;
}

const PatternExplorer: React.FC<PatternExplorerProps> = ({ grammar }) => {
  // ------------------------------------------------------------------
  // 1. 魔法词集合：keywords 英文词 ∪ grammarPoint 英文词，且在例句中真实出现
  // ------------------------------------------------------------------
  const { magicSet, magicList } = useMemo(() => {
    /** 从候选词集合中筛出例句里真实出现的词，按例句出现顺序去重 */
    const pickMagic = (candidates: Set<string>): string[] => {
      const list: string[] = [];
      grammar.examples.forEach((e) =>
        tokenizeSentence(e.english).forEach((t) => {
          if (!isWordToken(t)) return;
          const n = norm(t);
          if (candidates.has(n) && !list.some((x) => norm(x) === n)) list.push(t);
        })
      );
      return list;
    };

    // 优先用 keywords（人工精选的结构词），避免 grammarPoint 里的实词稀释"魔法词"概念
    const fromKeywords = new Set<string>();
    (grammar.keywords ?? []).forEach((k) =>
      extractEnglishTokens(k).forEach((t) => fromKeywords.add(t))
    );
    let list = pickMagic(fromKeywords);
    if (list.length < 2) {
      // 回退：合并 grammarPoint 里的英文词
      grammar.examples.forEach((e) => {
        if (e.grammarPoint) extractEnglishTokens(e.grammarPoint).forEach((t) => fromKeywords.add(t));
      });
      list = pickMagic(fromKeywords);
    }
    return { magicSet: fromKeywords, magicList: list };
  }, [grammar]);

  /** token 是否为魔法词 */
  const isMagic = (token: string) => isWordToken(token) && magicSet.has(norm(token));

  // ------------------------------------------------------------------
  // 2. 遮词小挑战：每个含魔法词的例句遮第一个魔法词，干扰项取其他魔法词
  // ------------------------------------------------------------------
  const baseChallenges = useMemo<BlankChallenge[]>(() => {
    const result: BlankChallenge[] = [];
    grammar.examples.forEach((example, exampleIndex) => {
      const tokens = tokenizeSentence(example.english);
      const blankIdx = tokens.findIndex((t) => isMagic(t));
      if (blankIdx < 0) return;
      const answer = tokens[blankIdx];
      const distractors = magicList.filter((w) => norm(w) !== norm(answer));
      if (distractors.length === 0) return; // 没有干扰项，出题无意义
      const picked = [...distractors].sort(() => Math.random() - 0.5).slice(0, 2);
      result.push({
        exampleIndex,
        blankTokenIndex: blankIdx,
        answer,
        options: [answer, ...picked].sort(() => Math.random() - 0.5),
      });
    });
    // 控制在 6 题以内，避免挑战太长
    return result.slice(0, 6);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grammar, magicSet, magicList]);

  const [round, setRound] = useState(0); // 重玩轮次（重建挑战列表触发洗牌）
  const challengeList = useMemo(() => {
    void round; // round 变化时重新洗牌选项顺序
    return baseChallenges.map((c) => ({
      ...c,
      options: [...c.options].sort(() => Math.random() - 0.5),
    }));
  }, [baseChallenges, round]);

  const [challengeStep, setChallengeStep] = useState(0);
  const [solved, setSolved] = useState(false);
  const [shakeOption, setShakeOption] = useState<string | null>(null);
  const [stars, setStars] = useState(0);
  const [allDone, setAllDone] = useState(false);

  const current = challengeList[challengeStep] ?? null;

  const handleOptionClick = (option: string) => {
    if (!current || solved) return;
    if (option === current.answer) {
      playCorrectSound();
      setSolved(true);
      setStars((s) => s + 1);
      if (challengeStep === challengeList.length - 1) {
        setAllDone(true);
        playPerfectSound();
      }
    } else {
      playWrongSound();
      setShakeOption(option);
      setTimeout(() => setShakeOption(null), 600);
    }
  };

  const nextChallenge = () => {
    setChallengeStep((s) => s + 1);
    setSolved(false);
  };

  const resetChallenges = () => {
    setRound((r) => r + 1);
    setChallengeStep(0);
    setSolved(false);
    setStars(0);
    setAllDone(false);
  };

  // ------------------------------------------------------------------
  // 渲染：词块行（挑战模式下 blankIdx 位置渲染为遮词块）
  // ------------------------------------------------------------------
  const renderTokens = (english: string, blankIdx?: number) => {
    const tokens = tokenizeSentence(english);
    return tokens.map((token, i) => {
      if (blankIdx !== undefined && i === blankIdx) {
        return (
          <span key={i} className={`pattern-word magic blank ${solved ? 'filled' : ''}`}>
            {solved && current ? current.answer : '?'}
          </span>
        );
      }
      if (!isWordToken(token)) {
        return (
          <span key={i} className="pattern-word plain">
            {token}
          </span>
        );
      }
      return (
        <button
          key={i}
          className={`pattern-word ${isMagic(token) ? 'magic' : 'normal'}`}
          onClick={() => speakWord(token)}
          title={`听发音: ${token}`}
        >
          {token}
        </button>
      );
    });
  };

  return (
    <div className="pattern-explorer">
      {/* 魔法词总览 */}
      {magicList.length > 0 && (
        <div className="magic-words-card">
          <h3>✨ 本课魔法词</h3>
          <p className="magic-hint">
            这些词是句子的『魔法开关』，点一点听发音，找找它们出现的规律！
          </p>
          <div className="magic-words-row">
            {magicList.map((w, i) => (
              <button key={i} className="magic-word-chip" onClick={() => speakWord(w)}>
                ✨ {w}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 句子积木 */}
      <div className="pattern-sentences">
        <h3>🧱 句子积木</h3>
        <p className="magic-hint">点击每个单词听发音，彩色的词就是魔法词，仔细看看它们的位置！</p>
        {grammar.examples.map((example, idx) => (
          <div key={idx} className="pattern-sentence-card">
            <div className="pattern-tokens">{renderTokens(example.english)}</div>
            <div className="pattern-meta">
              <span className="pattern-chinese">{example.chinese}</span>
              <button
                className="pattern-play-btn"
                onClick={() => speakEnglish(example.english)}
                title="听整句"
              >
                🔊 听整句
              </button>
            </div>
            {example.grammarPoint && <div className="pattern-point">📌 {example.grammarPoint}</div>}
          </div>
        ))}
      </div>

      {/* 遮词小挑战 */}
      {challengeList.length > 0 && (
        <div className="pattern-challenge">
          <h3>🎯 遮词小挑战</h3>
          {!allDone && current && (
            <>
              <div className="challenge-progress">
                第 {challengeStep + 1} / {challengeList.length} 题
                <span className="challenge-stars">{'⭐'.repeat(stars)}</span>
              </div>
              <p className="magic-hint">句子里藏起来了一个魔法词，从下面选出正确的词吧！</p>
              <div className="challenge-sentence">
                {renderTokens(grammar.examples[current.exampleIndex].english, current.blankTokenIndex)}
              </div>
              <div className="challenge-options">
                {current.options.map((opt, i) => (
                  <button
                    key={i}
                    className={`challenge-option ${solved && opt === current.answer ? 'correct' : ''} ${
                      shakeOption === opt ? 'shake' : ''
                    }`}
                    onClick={() => handleOptionClick(opt)}
                    disabled={solved}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {solved && (
                <div className="challenge-solved">
                  🎉 答对啦！
                  {challengeStep < challengeList.length - 1 && (
                    <button className="challenge-next-btn" onClick={nextChallenge}>
                      下一题 →
                    </button>
                  )}
                </div>
              )}
            </>
          )}
          {allDone && (
            <div className="challenge-done">
              <div className="challenge-done-stars">{'⭐'.repeat(Math.min(stars, 6))}</div>
              <p>太棒了！魔法词全部找回来了！</p>
              <button className="challenge-retry-btn" onClick={resetChallenges}>
                🔄 再玩一次
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PatternExplorer;
