import React, { useState, useRef, useCallback } from 'react';
import { speakWord, speakSentence } from '../../services/tts';
import { playCorrectSound, playWrongSound, playStreakSound } from '../../services/soundEffects';
import { startSpeechEvaluation } from '../../services/speechRecognition';
import type { SpeechEvalResult, SpeechEvaluationSession } from '../../services/speechRecognition';
import { logger } from '../../utils/logger';
import type { PracticeType } from './PracticeMenu';
import type { Exercise } from '../../types/lesson';

export interface PracticeFinishData {
  score: number;
  totalScore: number;
  timeSpent: number;
  practiceType: PracticeType;
  maxStreak: number;
  correctCount: number;
}

function getEncouragement(streak: number, isCorrect: boolean): string {
  if (!isCorrect) {
    const wrong = ['没关系，再试试！', '差一点点！', '加油，你可以的！', '别灰心！'];
    return wrong[Math.floor(Math.random() * wrong.length)];
  }
  if (streak >= 10) return '🌟 10连对！超级天才！';
  if (streak >= 5) return '⚡ 5连对！太厉害了！';
  if (streak >= 3) return '🔥 3连对！保持住！';
  const correct = ['太棒了！', '答对了！', '真聪明！', '非常好！', '厉害！'];
  return correct[Math.floor(Math.random() * correct.length)];
}

interface PracticeEngineProps {
  exercises: Exercise[];
  practiceType: PracticeType;
  onFinish: (data: PracticeFinishData) => void;
  onBack: () => void;
}

const PracticeEngine: React.FC<PracticeEngineProps> = ({
  exercises,
  practiceType,
  onFinish,
  onBack,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [_totalScore, setTotalScore] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [speechFeedback, setSpeechFeedback] = useState<SpeechEvalResult | null>(null);
  const [streak, setStreak] = useState(0);
  const [encouragement, setEncouragement] = useState('');

  // 使用 ref 追踪最新的分数值，避免闭包捕获旧 state
  const scoreRef = useRef(0);
  const totalScoreRef = useRef(0);
  const maxStreakRef = useRef(0);
  const correctCountRef = useRef(0);

  // 口语评测会话与波形绘制
  const evalSessionRef = useRef<SpeechEvaluationSession | null>(null);
  const waveCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const waveLevelsRef = useRef<number[]>([]);
  // 每题已给分（重试覆盖而非重复累计）：key=题目索引, value=已计入 score 的分数
  const awardedRef = useRef<Record<number, number>>({});

  const updateScore = (delta: number) => {
    setScore((prev) => {
      const next = prev + delta;
      scoreRef.current = next;
      return next;
    });
  };

  const updateTotalScore = (delta: number) => {
    setTotalScore((prev) => {
      const next = prev + delta;
      totalScoreRef.current = next;
      return next;
    });
  };

  const startTimeRef = useRef<number>(Date.now());

  // 组件卸载时中止进行中的口语评测（会话代数防护，防泄漏）
  React.useEffect(() => {
    return () => {
      evalSessionRef.current?.stop();
      evalSessionRef.current = null;
    };
  }, []);

  /** 绘制滚动音量柱状波形（绿→橙→红 随音量变化，直观显示是否采集到声音） */
  const drawWave = useCallback(() => {
    const canvas = waveCanvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);
    const levels = waveLevelsRef.current;
    const barCount = 48;
    const barW = width / barCount;
    for (let i = 0; i < levels.length; i++) {
      const h = Math.max(3, levels[i] * (height - 8));
      const x = width - (levels.length - i) * barW;
      ctx.fillStyle = levels[i] > 0.6 ? '#e53935' : levels[i] > 0.25 ? '#fb8c00' : '#66bb6a';
      ctx.fillRect(x, height - h, barW * 0.7, h);
    }
  }, []);

  const currentExercise = exercises[currentIndex];
  const isLastQuestion = currentIndex >= exercises.length - 1;
  const nextButtonLabel = isLastQuestion ? '查看结果' : '下一题';

  // ---- Answer submission ----

  const handleSubmitAnswer = useCallback(() => {
    const exercise = exercises[currentIndex];
    let correct = false;

    if (practiceType === 'spelling') {
      correct = userAnswer.toLowerCase().trim() === exercise.answer.toLowerCase();
    } else {
      correct = userAnswer === exercise.answer;
    }

    setIsCorrect(correct);
    if (correct) {
      updateScore(exercise.score);
      correctCountRef.current += 1;
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreakRef.current) maxStreakRef.current = newStreak;
      logger.success('PracticeEngine', '答对', `第${currentIndex + 1}题 | 连击: ${newStreak}`);
      playCorrectSound();
      if (newStreak >= 3 && newStreak % 3 === 0) playStreakSound(newStreak);
      setEncouragement(getEncouragement(newStreak, true));
    } else {
      setStreak(0);
      logger.warn('PracticeEngine', '答错', `第${currentIndex + 1}题`);
      playWrongSound();
      setEncouragement(getEncouragement(0, false));
    }
    updateTotalScore(exercise.score);
    setShowResult(true);
  }, [currentIndex, exercises, practiceType, userAnswer, streak]);

  // ---- Speaking: 一次录音完成采集+波形+评分 ----

  const handleEvalResult = useCallback(
    (exercise: Exercise, result: SpeechEvalResult) => {
      const correct = result.score >= 70;
      setSpeechFeedback(result);

      // 计分：重试覆盖该题已给分（差值更新），满分池每题只计一次
      const newAwarded = Math.round((result.score / 100) * exercise.score);
      const prevAwarded = awardedRef.current[currentIndex] ?? 0;
      awardedRef.current[currentIndex] = newAwarded;
      const delta = newAwarded - prevAwarded;
      if (delta !== 0) updateScore(delta);
      if (prevAwarded === 0) {
        // 首次评分（含首次 0 分）占住满分池，重试不再累计
        updateTotalScore(exercise.score);
      }

      if (correct) {
        correctCountRef.current += 1;
        const newStreak = streak + 1;
        setStreak(newStreak);
        if (newStreak > maxStreakRef.current) maxStreakRef.current = newStreak;
        playCorrectSound();
        if (newStreak >= 3 && newStreak % 3 === 0) playStreakSound(newStreak);
        setEncouragement(getEncouragement(newStreak, true));
      } else {
        setStreak(0);
        playWrongSound();
        setEncouragement(getEncouragement(0, false));
      }
      logger.info(
        'PracticeEngine',
        '口语评分',
        `第${currentIndex + 1}题 | 模式: ${result.mode} | 得分: ${result.score} | 计分: ${newAwarded}/${exercise.score}`
      );
      setIsCorrect(correct);
      setShowResult(true);
    },
    [currentIndex, streak]
  );

  const startRecording = useCallback(() => {
    const exercise = exercises[currentIndex];
    if (!exercise) return;
    const targetText = exercise.content.sentence ?? '';

    waveLevelsRef.current = [];
    setSpeechFeedback(null);

    // 会话代数：先置 null 再挂新会话，避免旧回调误判
    evalSessionRef.current = null;
    const session = startSpeechEvaluation(targetText, 10000, (level) => {
      const levels = waveLevelsRef.current;
      levels.push(level);
      if (levels.length > 48) levels.shift();
      drawWave();
    });
    evalSessionRef.current = session;
    setIsRecording(true);
    logger.info('PracticeEngine', '开始录音', `第${currentIndex + 1}题`);

    session.promise.then((result) => {
      // 过期会话检查：只有当前挂着的会话才驱动 UI
      if (evalSessionRef.current !== session) return;
      evalSessionRef.current = null;
      setIsRecording(false);
      handleEvalResult(exercise, result);
    });
  }, [currentIndex, exercises, drawWave, handleEvalResult]);

  const stopRecording = useCallback(() => {
    evalSessionRef.current?.stop();
  }, []);

  // ---- Navigation ----

  const handleNext = useCallback(() => {
    if (isLastQuestion) {
      const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
      logger.info(
        'PracticeEngine',
        '练习完成',
        `得分: ${scoreRef.current}/${totalScoreRef.current} | 最大连击: ${maxStreakRef.current} | 用时: ${timeSpent}秒`
      );
      onFinish({
        score: scoreRef.current,
        totalScore: totalScoreRef.current,
        timeSpent,
        practiceType,
        maxStreak: maxStreakRef.current,
        correctCount: correctCountRef.current,
      });
    } else {
      setCurrentIndex((prev) => prev + 1);
      setUserAnswer('');
      setShowResult(false);
      setSpeechFeedback(null);
    }
  }, [isLastQuestion, onFinish, practiceType]);

  // ---- Shared: option button renderer ----

  const renderOptions = (options: string[]) => (
    <div className="options">
      {options.map((option, index) => (
        <button
          key={index}
          className={`option-btn ${userAnswer === option ? 'selected' : ''} ${
            showResult && option === currentExercise.answer ? 'correct' : ''
          } ${
            showResult && userAnswer === option && option !== currentExercise.answer ? 'wrong' : ''
          }`}
          onClick={() => !showResult && setUserAnswer(option)}
          disabled={showResult}
        >
          {option}
        </button>
      ))}
    </div>
  );

  // ---- Shared: submit / next buttons ----

  const renderActions = (submitDisabled: boolean) => (
    <>
      {!showResult ? (
        <button className="submit-btn" onClick={handleSubmitAnswer} disabled={submitDisabled}>
          提交答案
        </button>
      ) : (
        <button className="next-btn" onClick={handleNext}>
          {nextButtonLabel}
        </button>
      )}
    </>
  );

  // ---- Shared: result feedback ----

  const renderResultFeedback = (correctMsg: string, wrongMsg: string) =>
    showResult && (
      <div className={`result ${isCorrect ? 'correct' : 'wrong'}`}>
        <div className="result-main">{isCorrect ? correctMsg : wrongMsg}</div>
        {encouragement && <div className="encouragement-text">{encouragement}</div>}
        {streak >= 3 && <div className="streak-badge">🔥 连对{streak}题！</div>}
      </div>
    );

  // ---- Exercise type label ----

  const TYPE_LABELS: Record<PracticeType, string> = {
    listening: '🎧 听力练习',
    speaking: '🎤 口语练习',
    spelling: '✏️ 拼写练习',
    writing: '📝 填空练习',
    reading: '📖 阅读理解',
    vocabStructure: '🔤 词汇与结构专项',
  };

  // ---- Renderers per exercise type ----

  const renderListening = () => (
    <div className="exercise-content">
      <div className="question">{currentExercise.content.question}</div>
      <button
        className="listen-btn"
        onClick={() => speakWord(currentExercise.content.audioText || currentExercise.answer)}
      >
        🔊 听录音
      </button>
      {renderOptions(currentExercise.content.options ?? [])}
      {renderResultFeedback('✅ 回答正确！', `❌ 回答错误！正确答案是：${currentExercise.answer}`)}
      {renderActions(!userAnswer)}
    </div>
  );

  const renderSpeaking = () => {
    const feedback = speechFeedback;
    const isZh2En = currentExercise.content.mode === 'zh2en';
    const isWord = currentExercise.content.mode === 'word';
    // 出分后才揭示英文（中译英模式）
    const revealEnglish = !isZh2En || showResult;
    const speakDemo = () =>
      isWord
        ? speakWord(currentExercise.content.sentence ?? '')
        : speakSentence(currentExercise.content.sentence ?? '');
    return (
      <div className="exercise-content">
        <div className="instruction">{currentExercise.content.instruction}</div>
        {revealEnglish && (
          <div className="sentence-to-speak">{currentExercise.content.sentence}</div>
        )}
        {currentExercise.content.translation && (
          <div className="sentence-translation">
            {isZh2En && !showResult
              ? `中文：${currentExercise.content.translation}`
              : currentExercise.content.translation}
          </div>
        )}
        {revealEnglish && (
          <button className="listen-btn" onClick={speakDemo}>
            🔊 听示范发音
          </button>
        )}
        {!showResult && !isRecording && (
          <div className="recording-section">
            <button className="record-btn" onClick={startRecording}>
              🎤 开始录音
            </button>
            <div className="recording-tip">
              点击后朗读句子，波形会实时显示麦克风采集到的声音
            </div>
          </div>
        )}
        {isRecording && (
          <div className="recording-section">
            <div className="speech-wave-box">
              <canvas
                ref={waveCanvasRef}
                className="speech-wave-canvas"
                width={480}
                height={64}
              />
            </div>
            <button className="record-btn recording" onClick={stopRecording}>
              ⏹ 完成录音
            </button>
            <div className="recording-tip">正在录音…读完后点击按钮结束（最长 10 秒）</div>
          </div>
        )}
        {showResult && feedback && (
          <div className="speaking-result">
            <div className="speaking-score">
              {feedback.mode === 'vosk' && (
                <>
                  发音得分: {feedback.score} 分
                  <span className="speech-mode-badge recognized">离线识别评分</span>
                </>
              )}
              {feedback.mode === 'recognized' && (
                <>
                  发音得分: {feedback.score} 分
                  <span className="speech-mode-badge recognized">识别评分</span>
                </>
              )}
              {feedback.mode === 'energy' && (
                <>
                  开口练习分: {feedback.score} 分
                  <span className="speech-mode-badge energy">识别服务不可达，按声音评估</span>
                </>
              )}
              {feedback.mode === 'silent' && (
                <>
                  {feedback.micError ? '麦克风不可用' : '未检测到声音'}
                  <span className="speech-mode-badge silent">
                    {feedback.micError ? '请检查麦克风权限或是否被占用' : '请对着麦克风大声读'}
                  </span>
                </>
              )}
            </div>
            {feedback.transcript && (
              <div className="speech-transcript">识别结果：{feedback.transcript}</div>
            )}
            <div className={`result ${isCorrect ? 'correct' : 'wrong'}`}>
              {feedback.mode === 'silent'
                ? '🎙️ 没听到你的声音，再试一次吧！'
                : isCorrect
                  ? '✅ 发音很棒！'
                  : '💪 继续练习，多读几遍会更好！'}
            </div>
          </div>
        )}
        {showResult && (
          <div className="speaking-actions">
            <button
              className="retry-btn"
              onClick={() => {
                setShowResult(false);
                startRecording();
              }}
            >
              🔄 再试一次
            </button>
            <button className="next-btn" onClick={handleNext}>
              {nextButtonLabel}
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderSpelling = () => (
    <div className="exercise-content">
      <div className="instruction">{currentExercise.content.instruction}</div>
      <div className="spelling-hints">
        <div className="hint">音标: {currentExercise.content.hint}</div>
        <div className="hint">含义: {currentExercise.content.meaning}</div>
        {currentExercise.content.example && (
          <div className="hint example">
            例句: {currentExercise.content.example}
            <button
              className="speak-sentence-btn small"
              onClick={() => speakSentence(currentExercise.content.example ?? '')}
            >
              🔊
            </button>
          </div>
        )}
      </div>
      <input
        type="text"
        className="spelling-input"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="输入单词拼写"
        disabled={showResult}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && userAnswer.trim()) handleSubmitAnswer();
        }}
      />
      {renderResultFeedback('✅ 拼写正确！', `❌ 拼写错误！正确答案是：${currentExercise.answer}`)}
      {renderActions(!userAnswer.trim())}
    </div>
  );

  const renderWriting = () => (
    <div className="exercise-content">
      <div className="question">{currentExercise.content.question}</div>
      <div className="fill-sentence">
        {currentExercise.content.sentence}
        <button
          className="speak-sentence-btn small"
          onClick={() => speakSentence(currentExercise.content.sentence ?? '')}
          title="朗读句子"
        >
          🔊
        </button>
      </div>
      <div className="fill-translation">翻译：{currentExercise.content.translation}</div>
      {renderOptions(currentExercise.content.options ?? [])}
      {renderResultFeedback('✅ 回答正确！', `❌ 回答错误！正确答案是：${currentExercise.answer}`)}
      {renderActions(!userAnswer)}
    </div>
  );

  const renderReading = () => (
    <div className="exercise-content">
      {currentExercise.content.passage && (
        <div className="reading-passage">
          <div className="passage-label">课文内容：</div>
          <div className="passage-text">
            {currentExercise.content.passage}
            <button
              className="speak-sentence-btn small"
              onClick={() => speakSentence(currentExercise.content.passage ?? '')}
              title="朗读课文"
            >
              🔊
            </button>
          </div>
        </div>
      )}
      <div className="question">
        {currentExercise.content.question}
        <button
          className="speak-sentence-btn small"
          onClick={() => speakSentence(currentExercise.content.question ?? '')}
          title="朗读问题"
        >
          🔊
        </button>
      </div>
      {renderOptions(currentExercise.content.options ?? [])}
      {renderResultFeedback('✅ 回答正确！', `❌ 回答错误！正确答案是：${currentExercise.answer}`)}
      {renderActions(!userAnswer)}
    </div>
  );

  const renderVocabStructure = () => (
    <div className="exercise-content">
      <div className="question">{currentExercise.content.question}</div>
      <div className="fill-sentence">
        {currentExercise.content.sentence}
        <button
          className="speak-sentence-btn small"
          onClick={() => speakSentence(currentExercise.content.sentence ?? '')}
          title="朗读句子"
        >
          🔊
        </button>
      </div>
      <div className="fill-translation">翻译：{currentExercise.content.translation}</div>
      {renderOptions(currentExercise.content.options ?? [])}
      {renderResultFeedback('✅ 回答正确！', `❌ 回答错误！正确答案是：${currentExercise.answer}`)}
      {renderActions(!userAnswer)}
    </div>
  );

  const RENDERERS: Record<PracticeType, () => React.ReactNode> = {
    listening: renderListening,
    speaking: renderSpeaking,
    spelling: renderSpelling,
    writing: renderWriting,
    reading: renderReading,
    vocabStructure: renderVocabStructure,
  };

  if (!currentExercise) {
    return (
      <div className="exercise-container">
        <div className="exercise-header">
          <button className="back-btn small" onClick={onBack}>
            ← 返回
          </button>
          <div className="exercise-progress">0 / 0</div>
          <div className="exercise-score">得分: 0</div>
        </div>
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
          <p style={{ fontSize: '18px' }}>该类型暂无练习题</p>
          <p style={{ fontSize: '14px', marginTop: '8px' }}>请先完成单词学习后再来练习</p>
        </div>
      </div>
    );
  }

  return (
    <div className="exercise-container">
      <div className="exercise-header">
        <button className="back-btn small" onClick={onBack}>
          ← 返回
        </button>
        <div className="exercise-progress">
          {currentIndex + 1} / {exercises.length}
        </div>
        <div className="exercise-score">得分: {score}</div>
      </div>

      <div className="exercise-type-label">{TYPE_LABELS[practiceType]}</div>

      {RENDERERS[practiceType]()}
    </div>
  );
};

export default PracticeEngine;
