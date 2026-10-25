/**
 * Edge TTS 预生成缓存脚本（离线兜底 MP3）
 *
 * 为全部课程的句子与单词预生成 MP3，供在线 Edge TTS 失败（429 限流/断网）时兜底播放。
 * 角色音色方案与运行时完全一致：共用 src/data/voiceAssignment.ts 的分配逻辑
 * （用户自定义 > 人设 hint > 同组错开 > hash），按美式预设、无用户自定义生成。
 *
 * 用法：
 *   npx tsx scripts/generate-tts-cache.ts                 # 全量
 *   npx tsx scripts/generate-tts-cache.ts --lesson 1,2,3  # 只生成指定课
 *   npx tsx scripts/generate-tts-cache.ts --limit 30      # 限制任务数（试跑）
 *
 * 断点续传：完成记录写入 tts-cache/done.json，重跑自动跳过已完成任务。
 */
import { createHash } from 'crypto';
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import { completeLessons } from '../src/data/lessons/completeLessons';
import { buildLessonVoiceMap, buildCastVoiceMap } from '../src/data/voiceAssignment';
import { LESSON_SCRIPTS, parseScriptLines, ROLE_VOICE_KIND } from '../src/data/theater/theaterScripts';
import { grammarDataEnhanced } from '../src/data/lessons/grammarDataEnhanced';
import { grammarData } from '../src/data/lessons/grammarData';

const ROOT = path.resolve(__dirname, '..');
const CACHE_DIR = path.join(ROOT, 'tts-cache');
const DONE_FILE = path.join(CACHE_DIR, 'done.json');

// 语速与运行时对齐：全文朗读 rate = RATE_MAP.normal * 0.9 → -10%；单词发音 slow → -20%
const SENTENCE_RATE = '-10%';
const WORD_RATE = '-20%';
const WORD_VOICE = 'en-US-AriaNeural'; // 美式预设默认女声（getWordVoice 的默认值）
const UK_WORD_VOICE = 'en-GB-SoniaNeural'; // 英式对照女声（双口音第二遍）

// 限速参数：约 1.7 请求/秒；429 按 30s×次数 退避
const REQUEST_INTERVAL_MS = 600;
const BACKOFF_BASE_MS = 30_000;
const MAX_RETRY = 5;

interface Task {
  kind: 'sentences' | 'words';
  relPath: string;
  text: string;
  voice: string;
  rate: string;
}

function sha116(text: string): string {
  return createHash('sha1').update(text, 'utf8').digest('hex').slice(0, 16);
}

function wordSlug(word: string): string {
  return word.toLowerCase().replace(/[^a-z0-9']/g, '_');
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function log(msg: string): void {
  const t = new Date().toISOString().slice(11, 19);
  console.log(`[${t}] ${msg}`);
}

/** 收集任务：句子按（音色, 文本）去重，单词全局去重 */
function collectTasks(lessonFilter?: Set<number>): { sentences: Task[]; words: Task[] } {
  const sentenceMap = new Map<string, Task>();
  const wordMap = new Map<string, Task>();
  let lessonCount = 0;
  for (const lesson of completeLessons as unknown as Array<Record<string, any>>) {
    const id = Number(lesson.id);
    if (Number.isFinite(id) && lessonFilter && !lessonFilter.has(id)) continue;
    lessonCount++;
    const paragraphs: Array<{ speaker?: string; content: string }> =
      lesson?.content?.text?.paragraphs ?? [];
    // 与运行时一致：无 speaker 的段落归为 'N'（旁白，用默认女声）
    const normalized = paragraphs.map((p) => ({
      speaker: p.speaker?.trim() ? p.speaker : 'N',
      content: p.content,
    }));
    // 双口音预生成：美式 + 英式各一套，均按课内角色分配（与运行时 buildLessonVoiceMap 同一逻辑）
    const usVoiceMap = buildLessonVoiceMap(normalized, {
      presetId: 'us',
      defaultMale: 'en-US-GuyNeural',
      defaultFemale: 'en-US-AriaNeural',
      userVoices: {},
    });
    const ukVoiceMap = buildLessonVoiceMap(normalized, {
      presetId: 'uk',
      defaultMale: 'en-GB-RyanNeural',
      defaultFemale: 'en-GB-SoniaNeural',
      userVoices: {},
    });
    for (const p of normalized) {
      const text = (p.content || '').trim();
      if (!text) continue;
      const speakerKey = (p.speaker || 'N').toUpperCase();
      const voices = [
        usVoiceMap.get(speakerKey) || 'en-US-AriaNeural',
        ukVoiceMap.get(speakerKey) || 'en-GB-SoniaNeural',
      ];
      for (const voice of voices) {
        const key = `${voice}/${sha116(text)}`;
        if (!sentenceMap.has(key)) {
          sentenceMap.set(key, {
            kind: 'sentences',
            relPath: `sentences/${key}.mp3`,
            text,
            voice,
            rate: SENTENCE_RATE,
          });
        }
      }
    }
    // 剧场视角补充：空段落句子（旁白/展示台）在剧场里按"画面原型性别"分配主持人
    // 声音（buildCastVoiceMap，与 StoryTheater 运行时同构），与上面的 'N' 女声版是
    // 不同缓存键——为有剧本的课补生成 cast 分配的版本，否则剧场播放缓存 miss
    const script = LESSON_SCRIPTS[id];
    if (script) {
      const castMembers = script.cast
        .map(([key, , role]) => ({ key, ...(ROLE_VOICE_KIND[role] ?? ROLE_VOICE_KIND.man1) }));
      const parsedLines = parseScriptLines(script.lines);
      const theaterOpts = {
        presetId: 'us' as const,
        defaultMale: 'en-US-GuyNeural',
        defaultFemale: 'en-US-AriaNeural',
        userVoices: {},
      };
      const theaterUkOpts = {
        presetId: 'uk' as const,
        defaultMale: 'en-GB-RyanNeural',
        defaultFemale: 'en-GB-SoniaNeural',
        userVoices: {},
      };
      const usCastMap = buildCastVoiceMap(castMembers, theaterOpts);
      const ukCastMap = buildCastVoiceMap(castMembers, theaterUkOpts);
      paragraphs.forEach((p, i) => {
        if (p.speaker?.trim()) return; // 有 speaker 的句子已由上面任务覆盖
        const text = (p.content || '').trim();
        if (!text) return;
        const castKey = (parsedLines[i]?.key ?? '').toUpperCase();
        if (!castKey) return;
        for (const voice of [usCastMap.get(castKey), ukCastMap.get(castKey)]) {
          if (!voice) continue;
          const key = `${voice}/${sha116(text)}`;
          if (!sentenceMap.has(key)) {
            sentenceMap.set(key, {
              kind: 'sentences',
              relPath: `sentences/${key}.mp3`,
              text,
              voice,
              rate: SENTENCE_RATE,
            });
          }
        }
      });
    }
    const vocabulary: Array<{ word: string; examples?: string[] }> = lesson?.content?.vocabulary ?? [];
    for (const v of vocabulary) {
      const word = (v?.word || '').trim();
      if (!word) continue;
      // 每个单词生成美式+英式两套（speakWord 双口音对比朗读的缓存兜底）
      const key = `${WORD_VOICE}/${wordSlug(word)}`;
      if (!wordMap.has(key)) {
        wordMap.set(key, {
          kind: 'words',
          relPath: `words/${key}.mp3`,
          text: word,
          voice: WORD_VOICE,
          rate: WORD_RATE,
        });
      }
      const ukKey = `${UK_WORD_VOICE}/${wordSlug(word)}`;
      if (!wordMap.has(ukKey)) {
        wordMap.set(ukKey, {
          kind: 'words',
          relPath: `words/${ukKey}.mp3`,
          text: word,
          voice: UK_WORD_VOICE,
          rate: WORD_RATE,
        });
      }
      // 词表例句预生成：运行时 VocabularyCard 点读走 speakSentence(ex)，
      // 音色为当前口音预设的默认女声，缓存按 sentences/{voice}/{sha1}.mp3 寻址
      for (const ex of v?.examples ?? []) {
        const exText = (ex || '').trim();
        if (!exText) continue;
        for (const voice of [WORD_VOICE, UK_WORD_VOICE]) {
          const exKey = `${voice}/${sha116(exText)}`;
          if (!sentenceMap.has(exKey)) {
            sentenceMap.set(exKey, {
              kind: 'sentences',
              relPath: `sentences/${exKey}.mp3`,
              text: exText,
              voice,
              rate: SENTENCE_RATE,
            });
          }
        }
      }
    }
  }
  // 语法例句预生成：语法卡「朗读全部例句/听整句」走 speakEnglish(纯例句文本)，
  // 音色为当前口音预设的默认女声（美式 Aria / 英式 Sonia），缓存 sentences/{voice}/{sha1}.mp3。
  // 不预生成的话，Edge 在线被风控/限流时语法例句朗读会整轮降级系统音
  const grammarSources: Array<Record<string, any>> = [
    grammarDataEnhanced as unknown as Record<string, any>,
    grammarData as unknown as Record<string, any>,
  ];
  let grammarExampleTexts = 0;
  for (const source of grammarSources) {
    for (const key of Object.keys(source)) {
      const detail = source[Number(key)];
      const examples: Array<{ english?: string }> = detail?.examples ?? [];
      for (const ex of examples) {
        const text = (ex?.english || '').trim();
        if (!text) continue;
        grammarExampleTexts++;
        for (const voice of [WORD_VOICE, UK_WORD_VOICE]) {
          const gKey = `${voice}/${sha116(text)}`;
          if (!sentenceMap.has(gKey)) {
            sentenceMap.set(gKey, {
              kind: 'sentences',
              relPath: `sentences/${gKey}.mp3`,
              text,
              voice,
              rate: SENTENCE_RATE,
            });
          }
        }
      }
    }
  }
  log(
    `扫描课程 ${lessonCount} 课：句子 ${sentenceMap.size} 条（去重后，含语法例句 ${grammarExampleTexts} 条原文），单词 ${wordMap.size} 个`
  );
  return { sentences: [...sentenceMap.values()], words: [...wordMap.values()] };
}

function loadDone(): Record<string, number> {
  try {
    return JSON.parse(fs.readFileSync(DONE_FILE, 'utf8'));
  } catch {
    return {};
  }
}

function saveDone(done: Record<string, number>): void {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  fs.writeFileSync(DONE_FILE, JSON.stringify(done));
}

async function synthesize(task: Task): Promise<Buffer> {
  // 2026-10 微软 Akamai 反爬后 npm msedge-tts 2.1.0 全量 403/200，
  // 在线合成改走 Python edge-tts >= 7.3.1 子进程（GEC v2 令牌可用）
  const outPath = path.join(CACHE_DIR, `.tmp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.mp3`);
  const pyExe = process.platform === 'win32' ? 'python' : 'python3';
  const pyScript = path.resolve(__dirname, '../electron/edge_tts_py.py');
  try {
    execFileSync(
      pyExe,
      [pyScript, '--voice', task.voice, '--rate', task.rate, '--pitch', '+0Hz', '--out', outPath, '--text', task.text],
      { timeout: 60_000, stdio: ['ignore', 'ignore', 'pipe'], windowsHide: true }
    );
  } catch (e) {
    try { fs.unlinkSync(outPath); } catch { /* ignore */ }
    throw new Error(`edge-tts py 失败: ${String(e).slice(0, 150)}`);
  }
  const buf = fs.readFileSync(outPath);
  fs.unlinkSync(outPath);
  return buf;
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  let lessonFilter: Set<number> | undefined;
  let limit: number | undefined;
  const lessonIdx = args.indexOf('--lesson');
  if (lessonIdx !== -1 && args[lessonIdx + 1]) {
    lessonFilter = new Set(
      args[lessonIdx + 1]
        .split(',')
        .map((n) => parseInt(n, 10))
        .filter((n) => Number.isFinite(n))
    );
  }
  const limitIdx = args.indexOf('--limit');
  if (limitIdx !== -1 && args[limitIdx + 1]) limit = parseInt(args[limitIdx + 1], 10);

  const { sentences, words } = collectTasks(lessonFilter);
  // 先句子后单词（句子是主场景）；单词同 voice 排在一起
  let tasks: Task[] = [...sentences, ...words];
  if (limit && tasks.length > limit) tasks = tasks.slice(0, limit);

  // Edge 服务就绪预检：被风控时（WebSocket error 200）批量任务会全量空跑，
  // 等服务恢复后再开始（每 5 分钟探测一次，最多等 2 小时）
  const probe = async (): Promise<boolean> => {
    try {
      const buf = await synthesize({
        kind: 'sentences',
        relPath: '__probe__.mp3',
        text: 'Edge TTS availability probe.',
        voice: 'en-GB-SoniaNeural',
        rate: SENTENCE_RATE,
      });
      return buf.length > 100;
    } catch {
      return false;
    }
  };
  let probeWaited = 0;
  while (!(await probe())) {
    if (probeWaited >= 120 * 60_000) {
      log('等待 Edge 服务恢复超时（2 小时），退出——稍后重跑即可（断点续传）');
      process.exit(1);
    }
    if (probeWaited === 0) log('Edge 服务不可用（疑似风控），每 5 分钟探测直到恢复…');
    await sleep(5 * 60_000);
    probeWaited += 5 * 60_000;
    log(`已等待 ${probeWaited / 60_000} 分钟，再次探测…`);
  }
  log('Edge 服务就绪，开始批量生成');

  const done = loadDone();
  const total = tasks.length;
  log(`待生成 ${total} 条（已完成记录 ${Object.keys(done).length} 条）`);

  let success = 0;
  let skipped = 0;
  let failed = 0;
  let consecutiveFails = 0;
  const startedAt = Date.now();

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const outFile = path.join(CACHE_DIR, task.relPath);
    if (done[task.relPath] && fs.existsSync(outFile)) {
      skipped++;
      continue;
    }
    let ok = false;
    let attempt = 0;
    while (attempt <= MAX_RETRY && !ok) {
      attempt++;
      try {
        const buf = await synthesize(task);
        if (buf.length < 100) throw new Error(`音频过小(${buf.length}B)`);
        fs.mkdirSync(path.dirname(outFile), { recursive: true });
        fs.writeFileSync(outFile, buf);
        ok = true;
      } catch (e) {
        const msg = String(e);
        if (/429/.test(msg)) {
          const wait = BACKOFF_BASE_MS * attempt;
          log(`429 限流，退避 ${wait / 1000}s（第 ${attempt}/${MAX_RETRY} 次重试）`);
          await sleep(wait);
        } else if (attempt > MAX_RETRY) {
          failed++;
          log(`最终失败: ${task.relPath} — ${msg.slice(0, 150)}`);
        } else {
          log(`失败重试 ${attempt}/${MAX_RETRY}: ${msg.slice(0, 150)}`);
          await sleep(1500);
        }
      }
    }
    if (ok) {
      success++;
      consecutiveFails = 0;
      done[task.relPath] = Date.now();
      if (success % 10 === 0) saveDone(done);
    } else {
      consecutiveFails++;
      if (consecutiveFails >= 5) {
        log('连续 5 个任务失败，暂停 60s 后继续（疑似网络/风控问题）');
        await sleep(60_000);
        consecutiveFails = 0;
      }
    }
    if ((i + 1) % 20 === 0 || i === tasks.length - 1) {
      const elapsed = Math.round((Date.now() - startedAt) / 1000);
      const eta = success > 0 ? Math.round((elapsed / success) * (total - skipped - success)) : 0;
      log(
        `[进度] ${i + 1}/${total} 完成 ${success} 跳过 ${skipped} 失败 ${failed}` +
          ` | 用时 ${elapsed}s 剩余约 ${eta}s`
      );
      saveDone(done);
    }
    await sleep(REQUEST_INTERVAL_MS);
  }

  saveDone(done);
  log(`全部结束：完成 ${success}，跳过 ${skipped}，失败 ${failed}（缓存目录: ${CACHE_DIR}）`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error('脚本异常:', e);
  process.exit(1);
});
