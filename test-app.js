const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const http = require('http');

const LOG_FILE = 'I:\\新概念英语练习王\\dist\\logs\\app-test.log';
const CDP_PORT = 9222;

// 测试结果统计
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

/**
 * 记录测试结果
 */
function report(testName, passed, detail) {
  totalTests++;
  if (passed) {
    passedTests++;
    console.log(`  ✅ PASS: ${testName}${detail ? ' - ' + detail : ''}`);
  } else {
    failedTests++;
    console.log(`  ❌ FAIL: ${testName}${detail ? ' - ' + detail : ''}`);
  }
}

/**
 * 连接到已运行的 Electron 应用
 */
async function connectToElectron() {
  console.log('🔗 正在连接 Electron 应用 (CDP 端口 9222)...');

  // 使用 http 模块获取 targets（兼容旧版 Node.js）
  const targets = await new Promise((resolve, reject) => {
    http.get(`http://localhost:${CDP_PORT}/json`, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });

  // 查找标题包含"新概念英语"的页面 target
  const pageTarget = targets.find(
    (t) => t.type === 'page' && t.title && t.title.includes('新概念英语')
  );

  if (!pageTarget) {
    // 如果找不到，列出所有可用 target 帮助调试
    console.log('可用的 targets:');
    targets.forEach((t) => console.log(`  - [${t.type}] ${t.title} | ${t.url}`));
    throw new Error('未找到"新概念英语练习王"页面 target，请确认应用已启动');
  }

  console.log(`  找到页面: "${pageTarget.title}"`);
  console.log(`  WebSocket: ${pageTarget.webSocketDebuggerUrl}`);

  // 使用 browser 级别的 WebSocket 连接
  const versionResponse = await new Promise((resolve, reject) => {
    http.get(`http://localhost:${CDP_PORT}/json/version`, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });

  const browserWSEndpoint = versionResponse.webSocketDebuggerUrl;
  console.log(`  Browser WS: ${browserWSEndpoint}`);

  const browser = await puppeteer.connect({
    browserWSEndpoint,
    defaultViewport: null,
  });

  // 找到目标页面
  const pages = await browser.pages();
  let page = pages.find(p => p.url().includes('index.html'));
  if (!page) page = pages[0] || await browser.newPage();
  return { browser, page };
}

/**
 * 辅助：等待指定毫秒
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 辅助：安全地等待选择器，超时返回 null
 */
async function waitSafe(page, selector, timeout = 5000) {
  try {
    return await page.waitForSelector(selector, { timeout });
  } catch {
    return null;
  }
}

/**
 * 辅助：通过文本内容查找按钮
 */
async function findButtonByText(page, text) {
  return await page.evaluateHandle((txt) => {
    const buttons = document.querySelectorAll('button');
    for (const btn of buttons) {
      if (btn.textContent && btn.textContent.includes(txt)) return btn;
    }
    return null;
  }, text);
}

// ============================================================
//  测试模块
// ============================================================

/**
 * 1. 首页测试
 */
async function testHome(page) {
  console.log('\n📋 [模块 1] 首页 (Home)');

  // 导航到首页
  await page.goto('file:///I:/新概念英语练习王/dist/renderer/index.html#/', {
    waitUntil: 'domcontentloaded',
  });
  await sleep(2000);

  // 1.1 检查页面标题存在
  const titleEl = await waitSafe(page, '.title');
  if (titleEl) {
    const titleText = await page.evaluate((el) => el.textContent, titleEl);
    report('页面标题存在', titleText && titleText.includes('新概念英语练习王'), `标题: "${titleText}"`);
  } else {
    report('页面标题存在', false, '未找到 .title 元素');
  }

  // 1.2 检查"开始学习"按钮可点击
  const startBtn = await findButtonByText(page, '开始学习');
  if (startBtn) {
    const isDisabled = await page.evaluate((el) => el.disabled, startBtn);
    report('"开始学习"按钮可点击', !isDisabled);
  } else {
    report('"开始学习"按钮可点击', false, '未找到"开始学习"按钮');
  }

  // 1.3 检查连续学习天数卡片显示
  const streakCard = await waitSafe(page, '.streak-card', 3000);
  if (streakCard) {
    const streakText = await page.evaluate((el) => el.textContent, streakCard);
    report('连续学习天数卡片显示', streakText && streakText.includes('连续学习天数'), `内容: "${streakText}"`);
  } else {
    report('连续学习天数卡片显示', false, '未找到 .streak-card 元素');
  }

  // 1.4 检查成就/徽章数量显示
  const statItems = await page.$$('.stat-item');
  const hasBadgeStat = await page.evaluate(() => {
    const items = document.querySelectorAll('.stat-item');
    for (const item of items) {
      if (item.textContent && item.textContent.includes('获得徽章')) return true;
    }
    return false;
  });
  report('成就数量显示', statItems.length >= 3 && hasBadgeStat, `找到 ${statItems.length} 个统计项`);
}

/**
 * 2. 课程列表测试
 */
async function testLessonList(page) {
  console.log('\n📋 [模块 2] 课程列表 (LessonList)');

  // 导航到课程列表页
  await page.goto('file:///I:/新概念英语练习王/dist/renderer/index.html#/lessons', {
    waitUntil: 'domcontentloaded',
  });
  await sleep(3000);

  // 2.1 检查课程卡片是否加载
  const lessonCards = await page.$$('.lesson-card');
  report('课程卡片加载', lessonCards.length > 0, `找到 ${lessonCards.length} 个课程卡片`);

  // 2.2 检查页面标题
  const pageTitle = await waitSafe(page, '.page-title', 3000);
  if (pageTitle) {
    const titleText = await page.evaluate((el) => el.textContent, pageTitle);
    report('课程列表页标题', titleText && titleText.includes('选择课程'), `标题: "${titleText}"`);
  } else {
    report('课程列表页标题', false, '未找到页面标题');
  }

  // 2.3 检查第一课可点击
  if (lessonCards.length > 0) {
    const firstCard = lessonCards[0];
    const isClickable = await page.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.cursor === 'pointer' && !el.classList.contains('disabled');
    }, firstCard);
    report('第一课卡片可点击', isClickable);
  } else {
    report('第一课卡片可点击', false, '没有课程卡片');
  }
}

/**
 * 3. 课程详情测试
 */
async function testLessonDetail(page) {
  console.log('\n📋 [模块 3] 课程详情 (LessonDetail)');

  // 先导航到课程列表
  await page.goto('file:///I:/新概念英语练习王/dist/renderer/index.html#/lessons', {
    waitUntil: 'domcontentloaded',
  });
  await sleep(2000);

  // 点击第一课进入详情
  const firstCard = await waitSafe(page, '.lesson-card', 5000);
  if (firstCard) {
    await firstCard.click();
    await sleep(3000);
  } else {
    report('进入课程详情', false, '未找到课程卡片');
    return;
  }

  // 3.1 检查是否进入详情页
  const detailContainer = await waitSafe(page, '.lesson-detail-container', 5000);
  report('进入课程详情页', !!detailContainer);

  // 3.2 检查标签页存在
  const tabs = await page.$$('.tab');
  const tabTexts = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.tab')).map((t) => t.textContent.trim());
  });
  const hasExpectedTabs =
    tabTexts.includes('单词学习') &&
    tabTexts.includes('课文学习') &&
    tabTexts.includes('语法学习') &&
    tabTexts.includes('练习');
  report('标签页切换（单词/课文/语法/练习）', tabs.length >= 4 && hasExpectedTabs, `标签: [${tabTexts.join(', ')}]`);

  // 3.3 切换到"练习"标签页查看游戏入口
  const practiceTab = await findButtonByText(page, '练习');
  if (practiceTab) {
    await practiceTab.click();
    await sleep(1500);

    // 检查游戏入口卡片
    const gameNames = ['单词射击', '记忆翻牌', '飞机大战'];
    for (const gameName of gameNames) {
      const found = await page.evaluate((name) => {
        const elements = document.querySelectorAll('div');
        for (const el of elements) {
          if (el.textContent && el.textContent.includes(name) && el.children.length <= 3) {
            return true;
          }
        }
        return false;
      }, gameName);
      report(`游戏入口: ${gameName}`, found);
    }
  } else {
    report('切换到练习标签页', false, '未找到"练习"标签');
  }
}

/**
 * 4. 学习进度测试
 */
async function testProgress(page) {
  console.log('\n📋 [模块 4] 学习进度 (Progress)');

  // 导航到进度页
  await page.goto('file:///I:/新概念英语练习王/dist/renderer/index.html#/progress', {
    waitUntil: 'domcontentloaded',
  });
  await sleep(3000);

  // 4.1 检查进度页容器
  const progressContainer = await waitSafe(page, '.progress-container', 5000);
  report('进度页容器存在', !!progressContainer);

  // 4.2 检查统计概览区域
  const statsOverview = await waitSafe(page, '.stats-overview', 5000);
  if (statsOverview) {
    const statCards = await page.$$('.stat-card');
    const statLabels = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.stat-card-label')).map((l) => l.textContent.trim());
    });
    const hasExpectedStats =
      statLabels.includes('总积分') &&
      statLabels.includes('已完成课程') &&
      statLabels.includes('已尝试课程') &&
      statLabels.includes('总学习时长');
    report('统计数据区域存在', statCards.length >= 4 && hasExpectedStats, `统计项: [${statLabels.join(', ')}]`);
  } else {
    report('统计数据区域存在', false, '未找到 .stats-overview');
  }

  // 4.3 检查页面标题
  const pageTitle = await waitSafe(page, '.page-title', 3000);
  if (pageTitle) {
    const titleText = await page.evaluate((el) => el.textContent, pageTitle);
    report('进度页标题', titleText && titleText.includes('学习进度'), `标题: "${titleText}"`);
  } else {
    report('进度页标题', false, '未找到页面标题');
  }
}

/**
 * 5. 日志验证
 */
function analyzeLogs() {
  console.log('\n📋 [模块 5] 日志验证');

  // 检查日志文件是否存在
  if (!fs.existsSync(LOG_FILE)) {
    report('日志文件存在', false, `文件不存在: ${LOG_FILE}`);
    return;
  }
  report('日志文件存在', true, LOG_FILE);

  // 读取并解析日志
  const content = fs.readFileSync(LOG_FILE, 'utf-8');
  const lines = content.split('\n').filter((line) => line.trim());

  // 日志格式: [timestamp][LEVEL][module] action - details
  const logPattern = /^\[([^\]]+)\]\[([^\]]+)\]\[([^\]]+)\]\s+(.+)$/;
  const validLogs = [];
  const invalidLines = [];

  for (const line of lines) {
    const match = line.match(logPattern);
    if (match) {
      validLogs.push({
        timestamp: match[1],
        level: match[2],
        module: match[3],
        message: match[4],
      });
    } else {
      invalidLines.push(line);
    }
  }

  report('日志格式有效', validLogs.length > 0, `有效日志 ${validLogs.length} 条, 无效 ${invalidLines.length} 条`);

  // 按模块统计
  const moduleCounts = {};
  for (const log of validLogs) {
    moduleCounts[log.module] = (moduleCounts[log.module] || 0) + 1;
  }

  // 按级别统计
  const levelCounts = {};
  for (const log of validLogs) {
    levelCounts[log.level] = (levelCounts[log.level] || 0) + 1;
  }

  // 输出日志报告
  console.log('\n  📊 日志统计报告:');
  console.log('  ─────────────────────────────────');
  console.log(`  总日志条数: ${validLogs.length}`);
  console.log('');
  console.log('  按模块统计:');
  for (const [mod, count] of Object.entries(moduleCounts).sort((a, b) => b[1] - a[1])) {
    console.log(`    [${mod}] ${count} 条`);
  }
  console.log('');
  console.log('  按级别统计:');
  for (const [level, count] of Object.entries(levelCounts)) {
    const icon = level === 'ERROR' ? '🔴' : level === 'WARN' ? '🟡' : level === 'SUCCESS' ? '🟢' : '🔵';
    console.log(`    ${icon} ${level}: ${count} 条`);
  }

  if (invalidLines.length > 0) {
    console.log(`\n  ⚠️  无效日志行 (前5条):`);
    invalidLines.slice(0, 5).forEach((line) => console.log(`    "${line}"`));
  }

  report('日志解析完成', validLogs.length > 0, `共 ${validLogs.length} 条有效日志`);
}

// ============================================================
//  主流程
// ============================================================

async function main() {
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║   新概念英语练习王 - 自动化测试脚本               ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log(`启动时间: ${new Date().toLocaleString('zh-CN')}`);

  let browser = null;

  try {
    // 连接 Electron 应用
    const connection = await connectToElectron();
    browser = connection.browser;
    const page = connection.page;
    console.log('  ✅ 连接成功\n');

    // 依次执行各模块测试
    await testHome(page);
    await testLessonList(page);
    await testLessonDetail(page);
    await testProgress(page);

    // 断开浏览器连接（不关闭应用）
    browser.disconnect();
    browser = null;
  } catch (error) {
    console.error(`\n💥 连接或测试出错: ${error.message}`);
    console.error(`   错误类型: ${error.constructor.name}`);
    console.error(`   堆栈: ${error.stack ? error.stack.split('\n').slice(0, 3).join('\n   ') : '无'}`);
    if (browser) {
      try { browser.disconnect(); } catch {}
    }
  }

  // 日志验证（不需要浏览器连接）
  analyzeLogs();

  // 输出总结
  console.log('\n╔══════════════════════════════════════════════════╗');
  console.log('║                    测试总结                       ║');
  console.log('╠══════════════════════════════════════════════════╣');
  console.log(`║  总测试数:  ${String(totalTests).padStart(3)}                                  ║`);
  console.log(`║  通过:      ${String(passedTests).padStart(3)}  ✅                             ║`);
  console.log(`║  失败:      ${String(failedTests).padStart(3)}  ${failedTests > 0 ? '❌' : '✅'}                             ║`);
  console.log(`║  通过率:    ${totalTests > 0 ? ((passedTests / totalTests) * 100).toFixed(1) : 0}%`.padEnd(51) + '║');
  console.log('╚══════════════════════════════════════════════════╝');

  if (failedTests > 0) {
    process.exit(1);
  }
}

main().catch(console.error);
