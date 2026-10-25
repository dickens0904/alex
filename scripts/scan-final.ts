/**
 * 终扫描：①cast 性别画像（课文称谓 Mr./Mrs./Miss 对照 画面原型性别）
 *          ②情绪词（ill/poor/sad/careful/worried/tired）↔ 表情编排
 */
import { LESSON_SCRIPTS, parseScriptLines, ROLE_PRESETS } from '../src/data/theater/theaterScripts';
import { completeLessons } from '../src/data/lessons/completeLessons';

/** 画面原型 → 性别 */
const PRESET_GENDER: Record<string, string> = {
  man1: 'male', man2: 'male', man3: 'male',
  woman1: 'female', woman2: 'female', woman3: 'female',
  boy: 'child', girl: 'child',
  elderM: 'elderM', elderF: 'elderF',
  teacher: 'male', police: 'male', doctor: 'male', assistant: 'female', nurse: 'female',
  narrator: 'male',
};

const textOf = (id: number) =>
  (completeLessons.find((l) => l.id === id)?.content.text.paragraphs as Array<{ content: string }> | undefined)
    ?.map((p) => p.content).join(' ') ?? '';

console.log('---- 1) cast 性别画像（人工核对称谓课） ----');
for (let id = 1; id <= 144; id++) {
  const script = LESSON_SCRIPTS[id];
  if (!script || script.type === 'narrative') continue;
  const text = textOf(id);
  const profile = script.cast
    .map(([key, name, preset]) => `${key}(${name}:${PRESET_GENDER[preset] ?? preset})`)
    .join(' ');
  // 自动提示：称谓证据与原型性别冲突
  const warnings: string[] = [];
  for (const [key, name, preset] of script.cast) {
    const g = PRESET_GENDER[preset];
    if (/(Mrs\.|Miss\.|夫人|太太)/.test(text) && (name.includes('夫人') || name.includes('太太') || name.includes('小姐')) && g === 'male') {
      warnings.push(`${key}(${name}) 原型是男性但课文称谓是女性`);
    }
    if (/Mr\./.test(text) && name.includes('先生') && g === 'female') {
      warnings.push(`${key}(${name}) 原型是女性但课文称谓是男性`);
    }
  }
  console.log(`L${id} [${script.type}] ${profile}${warnings.length ? '  ⚠ ' + warnings.join(';') : ''}`);
}

console.log('\n---- 2) 情绪词 ↔ 表情编排 ----');
const EMOTION_RE = /\bill\b|\bsad\b|\bpoor\b|\bworried\b|\btired\b|\bcareful\b|\bupset\b/g;
for (let id = 1; id <= 144; id++) {
  const script = LESSON_SCRIPTS[id];
  if (!script) continue;
  const text = textOf(id);
  EMOTION_RE.lastIndex = 0;
  const emotions = text.match(EMOTION_RE) ?? [];
  if (emotions.length === 0) continue;
  const tokens = parseScriptLines(script.lines).map((a) => a.action);
  const hasEmotion = tokens.some((t) => t === 'sad' || t === 'angry' || t === 'smile' || t === 'surprised');
  if (!hasEmotion) {
    console.log(`L${id} [${script.type}] 情绪词: ${[...new Set(emotions)].join('/')} → 无表情编排`);
  }
}
console.log('扫描完成');
