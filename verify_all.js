/**
 * 全面应用验证脚本
 * 检查所有模块的结构、导入、导出、日志集成、编译产物
 */

const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'src');
let passed = 0;
let failed = 0;
let warnings = 0;
const errors = [];

function ok(name, detail) {
  passed++;
  console.log(`  [PASS] ${name}${detail ? ' - ' + detail : ''}`);
}
function fail(name, detail) {
  failed++;
  errors.push(`${name}: ${detail}`);
  console.log(`  [FAIL] ${name} - ${detail}`);
}
function warn(name, detail) {
  warnings++;
  console.log(`  [WARN] ${name} - ${detail}`);
}
function section(title) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`  ${title}`);
  console.log(`${'='.repeat(60)}`);
}

function readFile(relPath) {
  const full = path.join(SRC, relPath);
  if (!fs.existsSync(full)) return null;
  return fs.readFileSync(full, 'utf-8');
}

function fileExists(relPath) {
  return fs.existsSync(path.join(SRC, relPath));
}

// ============================================================
section('1. 编译产物检查');
// ============================================================
const bundlePath = path.join(__dirname, 'dist', 'renderer', 'bundle.js');
const cssPath = path.join(__dirname, 'dist', 'renderer', 'styles.css');
if (fs.existsSync(bundlePath)) {
  const size = (fs.statSync(bundlePath).size / 1024).toFixed(0);
  ok('bundle.js', `${size} KB`);
} else {
  fail('bundle.js', '编译产物不存在');
}
if (fs.existsSync(cssPath)) {
  const size = (fs.statSync(cssPath).size / 1024).toFixed(0);
  ok('styles.css', `${size} KB`);
} else {
  fail('styles.css', '样式产物不存在');
}

// ============================================================
section('2. 页面模块检查');
// ============================================================
const pages = [
  { path: 'pages/Home/index.tsx', name: '首页', checks: ['getStreakData', 'getStreakLevel', 'achievements', 'navigate'] },
  { path: 'pages/LessonList/index.tsx', name: '课程列表', checks: ['getLessonSummaries', 'navigate', 'electronAPI'] },
  { path: 'pages/LessonDetail/index.tsx', name: '课程详情', checks: ['PracticeEngine', 'ShootingGame', 'MemoryCardGame', 'AirplaneGame', 'Confetti', 'checkAchievements', 'recordStudy'] },
  { path: 'pages/Progress/index.tsx', name: '学习进度', checks: ['getUserStats', 'getAllProgress', 'totalLessons'] },
];

for (const page of pages) {
  const content = readFile(page.path);
  if (!content) {
    fail(page.name, `文件不存在: ${page.path}`);
    continue;
  }
  ok(page.name, '文件存在');
  for (const check of page.checks) {
    if (content.includes(check)) {
      ok(`${page.name}.${check}`, '已集成');
    } else {
      fail(`${page.name}.${check}`, '未找到引用');
    }
  }
  // 检查日志集成
  if (content.includes('logger')) {
    ok(`${page.name}.logger`, '已集成日志');
  } else {
    warn(`${page.name}.logger`, '未集成日志');
  }
}

// ============================================================
section('3. 游戏组件检查');
// ============================================================
const games = [
  {
    path: 'components/ShootingGame.tsx', name: '射击游戏',
    css: 'components/ShootingGame.css',
    checks: ['speakWord', 'playCorrectSound', 'playWrongSound', 'playStreakSound', 'onFinish', 'logger'],
    features: ['TARGET', 'bullets', 'CANNON', 'ROUND_TIME', 'streak', 'explosion'],
  },
  {
    path: 'components/MemoryCardGame.tsx', name: '记忆翻牌',
    css: 'components/MemoryCardGame.css',
    checks: ['playCorrectSound', 'playWrongSound', 'playStreakSound', 'onFinish', 'logger', 'shuffleArray'],
    features: ['Card', 'pairId', 'isFlipped', 'isMatched', 'MAX_PAIRS', 'streak'],
  },
  {
    path: 'components/AirplaneGame.tsx', name: '飞机大战',
    css: 'components/AirplaneGame.css',
    checks: ['playCorrectSound', 'playWrongSound', 'playStreakSound', 'onFinish', 'logger', 'requestAnimationFrame'],
    features: ['Enemy', 'Bullet', 'PLAYER_SPEED', 'ENEMY_BASE_SPEED', 'lives', 'streak', 'spawnEnemies'],
  },
];

for (const game of games) {
  const content = readFile(game.path);
  if (!content) {
    fail(game.name, `文件不存在: ${game.path}`);
    continue;
  }
  ok(game.name, '组件文件存在');

  // CSS 检查
  if (fileExists(game.css)) {
    const css = readFile(game.css);
    const cssSize = css.length;
    ok(`${game.name}.CSS`, `${cssSize} 字符`);
  } else {
    fail(`${game.name}.CSS`, '样式文件不存在');
  }

  // 核心检查
  for (const check of game.checks) {
    if (content.includes(check)) {
      ok(`${game.name}.${check}`, '已实现');
    } else {
      fail(`${game.name}.${check}`, '未找到');
    }
  }

  // 功能特性检查
  for (const feat of game.features) {
    if (content.includes(feat)) {
      ok(`${game.name}[${feat}]`, '存在');
    } else {
      warn(`${game.name}[${feat}]`, '未找到');
    }
  }

  // 接口检查
  if (content.includes('Vocabulary') && content.includes('onFinish') && content.includes('onBack')) {
    ok(`${game.name}.接口`, 'Props接口完整');
  } else {
    fail(`${game.name}.接口`, 'Props接口不完整');
  }
}

// ============================================================
section('4. 服务模块检查');
// ============================================================
const services = [
  { path: 'services/tts.ts', name: 'TTS语音', checks: ['speakWord', 'speakSentence', 'preloadVoices', 'VOICE_PRESETS', 'isEdgeTTSAvailable'] },
  { path: 'services/soundEffects.ts', name: '音效系统', checks: ['playCorrectSound', 'playWrongSound', 'playStreakSound', 'playAchievementSound', 'AudioContext'] },
  { path: 'services/achievement.ts', name: '成就系统', checks: ['ALL_ACHIEVEMENTS', 'checkAchievements', 'getUnlockedAchievements', 'spelling_master', 'streak_30_days'] },
  { path: 'services/dailyStreak.ts', name: '连续学习', checks: ['getStreakData', 'recordStudy', 'getStreakLevel', 'hasStudiedToday', 'currentStreak'] },
  { path: 'services/eyeProtection.ts', name: '护眼系统', checks: ['EyeProtectionSettings', 'checkNeedBreak', 'recordBreak', 'applyBlueLightFilter'] },
  { path: 'services/lesson.ts', name: '课程服务', checks: ['getLessonById', 'getLessonSummaries', 'getAllLessons', 'getTotalLessonCount'] },
  { path: 'services/speechRecognition.ts', name: '语音识别', checks: ['evaluateSpeech'] },
];

for (const svc of services) {
  const content = readFile(svc.path);
  if (!content) {
    fail(svc.name, `文件不存在: ${svc.path}`);
    continue;
  }
  ok(svc.name, '文件存在');
  for (const check of svc.checks) {
    if (content.includes(check)) {
      ok(`${svc.name}.${check}`, '已导出/定义');
    } else {
      fail(`${svc.name}.${check}`, '未找到');
    }
  }
}

// ============================================================
section('5. 工具与组件检查');
// ============================================================
const components = [
  { path: 'components/Confetti.tsx', name: '纸屑动画', checks: ['active', 'duration', 'Confetti'] },
  { path: 'components/EyeProtectionModal.tsx', name: '护眼弹窗', checks: ['EyeProtection', '20-20-20', 'blueLight', 'countdown'] },
  { path: 'components/ErrorBoundary.tsx', name: '错误边界', checks: ['componentDidCatch', 'ErrorBoundary'] },
  { path: 'components/LogViewer.tsx', name: '日志查看器', checks: ['LogViewer', 'logger', 'getLogs'] },
  { path: 'components/lesson/VocabularyCard.tsx', name: '词汇卡片', checks: ['Vocabulary', 'speak'] },
  { path: 'components/lesson/TextDisplay.tsx', name: '课文显示', checks: ['TextDisplay', 'paragraphs'] },
  { path: 'components/lesson/GrammarCardEnhanced.tsx', name: '语法卡片增强', checks: ['GrammarCard', 'exercise', 'streak', 'playCorrectSound'] },
  { path: 'components/practice/PracticeMenu.tsx', name: '练习菜单', checks: ['PracticeMenu', 'listening', 'speaking', 'spelling'] },
  { path: 'components/practice/PracticeEngine.tsx', name: '练习引擎', checks: ['PracticeEngine', 'PracticeFinishData', 'maxStreak', 'correctCount', 'playCorrectSound'] },
  { path: 'components/practice/PracticeResult.tsx', name: '练习结果', checks: ['PracticeResult', 'score', 'totalScore', 'Confetti'] },
  { path: 'utils/logger.ts', name: '日志工具', checks: ['Logger', 'logger', 'info', 'warn', 'error', 'success', 'getLogs', 'dump'] },
];

for (const comp of components) {
  const content = readFile(comp.path);
  if (!content) {
    fail(comp.name, `文件不存在: ${comp.path}`);
    continue;
  }
  ok(comp.name, '文件存在');
  for (const check of comp.checks) {
    if (content.includes(check)) {
      ok(`${comp.name}.${check}`, '已实现');
    } else {
      warn(`${comp.name}.${check}`, '未找到');
    }
  }
}

// ============================================================
section('6. 数据文件检查');
// ============================================================
const dataFiles = [
  { path: 'data/lessons/completeLessons.ts', name: '完整课程数据', minSize: 10000 },
  { path: 'data/lessons/grammarData.ts', name: '语法数据', minSize: 5000 },
  { path: 'data/lessons/grammarDataEnhanced.ts', name: '增强语法数据', minSize: 5000 },
  { path: 'data/lessons/generatedExercises.ts', name: '生成练习题', minSize: 5000 },
  { path: 'data/lessons/grammarEnhancedContent.ts', name: '增强语法内容', minSize: 1000 },
  { path: 'data/lessons/grammarExtraExercises.ts', name: '补充语法练习', minSize: 1000 },
  { path: 'data/lessons/grammarEnhancedBatch1.ts', name: '语法增强批次1', minSize: 1000 },
  { path: 'data/lessons/grammarEnhancedBatch2.ts', name: '语法增强批次2', minSize: 1000 },
  { path: 'data/lessons/grammarEnhancedBatch3.ts', name: '语法增强批次3', minSize: 1000 },
  { path: 'data/lessons/grammarEnhancedBatch4.ts', name: '语法增强批次4', minSize: 1000 },
  { path: 'data/speakerGender.ts', name: '说话人性别数据', minSize: 100 },
  { path: 'types/lesson.ts', name: '课程类型定义', minSize: 500 },
  { path: 'global.d.ts', name: '全局类型声明', minSize: 100 },
];

for (const df of dataFiles) {
  const content = readFile(df.path);
  if (!content) {
    fail(df.name, `文件不存在: ${df.path}`);
    continue;
  }
  const size = content.length;
  if (size >= df.minSize) {
    ok(df.name, `${(size / 1024).toFixed(1)} KB`);
  } else {
    warn(df.name, `文件较小: ${size} 字符 (期望 >= ${df.minSize})`);
  }
}

// ============================================================
section('7. App.tsx 入口检查');
// ============================================================
const appContent = readFile('App.tsx');
if (appContent) {
  const appChecks = [
    ['Router', '路由配置'],
    ['Home', '首页路由'],
    ['LessonList', '课程列表路由'],
    ['LessonDetail', '课程详情路由'],
    ['Progress', '进度路由'],
    ['LogViewer', '日志查看器'],
    ['EyeProtectionModal', '护眼提醒'],
    ['ErrorBoundary', '错误边界'],
    ['preloadVoices', '语音预加载'],
    ['logger', '日志系统'],
  ];
  for (const [check, desc] of appChecks) {
    if (appContent.includes(check)) {
      ok(`App.${desc}`, '已集成');
    } else {
      fail(`App.${desc}`, '未找到');
    }
  }
}

// ============================================================
section('8. CSS 样式文件检查');
// ============================================================
const cssFiles = [
  'styles/index.css',
  'pages/Home/Home.css',
  'pages/LessonList/LessonList.css',
  'pages/LessonDetail/LessonDetail.css',
  'pages/Progress/Progress.css',
  'components/ShootingGame.css',
  'components/MemoryCardGame.css',
  'components/AirplaneGame.css',
  'components/EyeProtectionModal.css',
  'components/Confetti.css',
  'components/lesson/GrammarCard.css',
];

for (const cssFile of cssFiles) {
  const content = readFile(cssFile);
  if (content) {
    ok(cssFile, `${(content.length / 1024).toFixed(1)} KB`);
  } else {
    warn(cssFile, '文件不存在');
  }
}

// ============================================================
section('9. 日志集成覆盖率');
// ============================================================
const allTsx = [];
function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) scanDir(full);
    else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      allTsx.push(full);
    }
  }
}
scanDir(SRC);

let withLogger = 0;
let withoutLogger = [];
for (const file of allTsx) {
  const content = fs.readFileSync(file, 'utf-8');
  const rel = path.relative(SRC, file);
  // 跳过类型定义、数据文件
  if (rel.startsWith('types\\') || rel.startsWith('data\\') || rel === 'global.d.ts' || rel === 'index.tsx') continue;
  if (content.includes("import.*logger") || content.includes("from.*logger") || content.includes("logger")) {
    withLogger++;
  } else {
    withoutLogger.push(rel);
  }
}
ok('已集成日志的模块', `${withLogger} 个`);
if (withoutLogger.length > 0) {
  warn('未集成日志', withoutLogger.join(', '));
} else {
  ok('日志覆盖率', '100%');
}

// ============================================================
section('10. LessonDetail 游戏集成检查');
// ============================================================
const ldContent = readFile('pages/LessonDetail/index.tsx');
if (ldContent) {
  const gameChecks = [
    ['ShootingGame', '射击游戏'],
    ['MemoryCardGame', '记忆翻牌'],
    ['AirplaneGame', '飞机大战'],
    ['setActiveGame', '游戏切换状态'],
    ['handleGameFinish', '游戏完成处理'],
    ['activeGame', '当前游戏状态'],
    ['recordStudy', '学习天数记录'],
    ['checkAchievements', '成就检查'],
    ['playAchievementSound', '成就音效'],
    ['Confetti', '纸屑庆祝'],
  ];
  for (const [check, desc] of gameChecks) {
    if (ldContent.includes(check)) {
      ok(`LessonDetail.${desc}`, '已集成');
    } else {
      fail(`LessonDetail.${desc}`, '未找到');
    }
  }
}

// ============================================================
section('11. 源码完整性统计');
// ============================================================
let totalLines = 0;
let totalSize = 0;
function countLines(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) { countLines(full); continue; }
    if (!entry.name.endsWith('.ts') && !entry.name.endsWith('.tsx') && !entry.name.endsWith('.css')) continue;
    const content = fs.readFileSync(full, 'utf-8');
    totalLines += content.split('\n').length;
    totalSize += content.length;
  }
}
countLines(SRC);
ok('源码总行数', totalLines.toLocaleString());
ok('源码总大小', `${(totalSize / 1024).toFixed(0)} KB`);
ok('源码文件数', allTsx.length + ' 个 TS/TSX 文件');

// ============================================================
// 总结
// ============================================================
console.log(`\n${'='.repeat(60)}`);
console.log(`  验证结果汇总`);
console.log(`${'='.repeat(60)}`);
console.log(`  [PASS] 通过: ${passed}`);
console.log(`  [FAIL] 失败: ${failed}`);
console.log(`  [WARN] 警告: ${warnings}`);
console.log(`  通过率: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);

if (errors.length > 0) {
  console.log(`\n  失败项:`);
  for (const e of errors) {
    console.log(`    - ${e}`);
  }
}

console.log(`\n${'='.repeat(60)}`);
if (failed === 0) {
  console.log('  所有验证通过！');
} else {
  console.log(`  有 ${failed} 项未通过，请检查。`);
}
console.log(`${'='.repeat(60)}\n`);

process.exit(failed > 0 ? 1 : 0);
