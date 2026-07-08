import React, { useState, useRef, useCallback } from 'react';
import { speakWord, speakSentence } from '../../services/tts';
import { playCorrectSound, playWrongSound, playStreakSound } from '../../services/soundEffects';
import { evaluateSpeech } from '../../services/speechRecognition';
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
  const [speakingScore, setSpeakingScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [encouragement, setEncouragement] = useState('');

  // 使用 ref 追踪最新的分数值，避免闭包捕获旧 state
  const scoreRef = useRef(0);
  const totalScoreRef = useRef(0);
  const maxStreakRef = useRef(0);
  const correctCountRef = useRef(0);

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
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 清理录音定时器
  React.useEffect(() => {
    return () => {
      if (recordingTimerRef.current) {
        clearTimeout(recordingTimerRef.current);
      }
    };
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

  // ---- Speaking: recording & evaluation ----

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);

      // Auto-stop after 5 seconds，存储 timer ID 以便清理
      recordingTimerRef.current = setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
        }
        setIsRecording(false);
        recordingTimerRef.current = null;
      }, 5000);
    } catch {
      alert('无法访问麦克风，请检查权限设置');
    }
  }, []);

  const handleSpeakingSubmit = useCallback(async () => {
    const exercise = exercises[currentIndex];
    const targetText: string = exercise.content.sentence ?? '';

    try {
      const resultScore = await evaluateSpeech(targetText);
      setSpeakingScore(resultScore);
      setIsCorrect(resultScore >= 70);

      if (resultScore >= 70) {
        updateScore(exercise.score);
      }
      updateTotalScore(exercise.score);
    } catch {
      // Fallback: treat as failed attempt
      setSpeakingScore(0);
      setIsCorrect(false);
      updateTotalScore(exercise.score);
    }

    setShowResult(true);
    setIsRecording(false);
  }, [currentIndex, exercises]);

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
      setSpeakingScore(0);
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

  const renderSpeaking = () => (
    <div className="exercise-content">
      <div className="instruction">{currentExercise.content.instruction}</div>
      <div className="sentence-to-speak">{currentExercise.content.sentence}</div>
      {currentExercise.content.translation && (
        <div className="sentence-translation">{currentExercise.content.translation}</div>
      )}
      <button
        className="listen-btn"
        onClick={() => speakSentence(currentExercise.content.sentence ?? '')}
      >
        🔊 听示范发音
      </button>
      <div className="recording-section">
        <button
          className={`record-btn ${isRecording ? 'recording' : ''}`}
          onClick={startRecording}
          disabled={isRecording}
        >
          {isRecording ? '🔴 录音中...' : '🎤 开始录音'}
        </button>
        <div className="recording-tip">点击后说 &quot;{currentExercise.content.sentence}&quot;</div>
      </div>
      {showResult && (
        <div className="speaking-result">
          <div className="speaking-score">发音得分: {speakingScore}分</div>
          <div className={`result ${isCorrect ? 'correct' : 'wrong'}`}>
            {isCorrect ? '✅ 发音很棒！' : '💪 继续练习，多读几遍会更好！'}
          </div>
        </div>
      )}
      {!showResult && !isRecording && (
        <button className="submit-btn" onClick={handleSpeakingSubmit}>
          提交并评分
        </button>
      )}
      {showResult && (
        <button className="next-btn" onClick={handleNext}>
          {nextButtonLabel}
        </button>
      )}
    </div>
  );

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

  const RENDERERS: Record<PracticeType, () => React.ReactNode> = {
    listening: renderListening,
    speaking: renderSpeaking,
    spelling: renderSpelling,
    writing: renderWriting,
    reading: renderReading,
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
