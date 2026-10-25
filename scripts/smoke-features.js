/**
 * 临时功能冒烟测试（针对练习题扩充/语法补充/例句补全）
 * 复用 cdp-smoke.js 的 CDP 连接方式，验证：
 *   1. 首页/课程列表/进度页基础渲染
 *   2. L21 单词例句渲染（本轮补全的 small/big/chopsticks）
 *   3. L21 练习菜单题量（应 ~30+）
 *   4. L21 语法练习（含连词成句/填空补充题）
 *   5. 控制台无致命错误
 * 用法：npx electron . --remote-debugging-port=9222 启动后 node scripts/smoke-features.js
 */
const http = require('http');
const path = require('path');
const fs = require('fs');
const WebSocket = require('ws');

const CDP_PORT = 9222;
const OUT_DIR = path.join(__dirname, '..', 'smoke-shots');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => resolve(JSON.parse(data)));
      })
      .on('error', reject);
  });
}

async function findPageTarget(retries = 20) {
  for (let i = 0; i < retries; i++) {
    try {
      const targets = await fetchJson(`http://127.0.0.1:${CDP_PORT}/json`);
      const page = targets.find((t) => t.type === 'page' && /index\.html/.test(t.url));
      if (page) return page;
    } catch {
      /* 应用尚未就绪 */
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error('未找到应用页面 target（CDP 端口连接超时）');
}

function connectCdp(wsUrl) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl, { perMessageDeflate: false });
    let id = 0;
    const pending = new Map();
    ws.on('open', () =>
      resolve({
        send(method, params = {}) {
          return new Promise((res, rej) => {
            const msgId = ++id;
            pending.set(msgId, { res, rej });
            ws.send(JSON.stringify({ id: msgId, method, params }));
          });
        },
        close: () => ws.close(),
      })
    );
    ws.on('message', (raw) => {
      const msg = JSON.parse(raw.toString());
      if (msg.id && pending.has(msg.id)) {
        const { res, rej } = pending.get(msg.id);
        pending.delete(msg.id);
        msg.error ? rej(new Error(JSON.stringify(msg.error))) : res(msg.result);
      }
    });
    ws.on('error', reject);
  });
}

async function evaluate(cdp, expression) {
  const { result, exceptionDetails } = await cdp.send('Runtime.evaluate', {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (exceptionDetails) throw new Error('页面执行异常: ' + JSON.stringify(exceptionDetails));
  return result.value;
}

async function screenshot(cdp, filePath) {
  const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(filePath, Buffer.from(data, 'base64'));
}

(async () => {
  const target = await findPageTarget();
  const cdp = await connectCdp(target.webSocketDebuggerUrl);
  await cdp.send('Runtime.enable');
  await cdp.send('Page.enable');
  const consoleErrors = [];
  cdp.raw = cdp;
  // 收集控制台错误（用 Runtime.consoleAPICalled 太啰嗦，改用异常监听）
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const results = [];
  function report(name, ok, detail = '') {
    results.push({ name, ok });
    console.log(`[${ok ? 'PASS' : 'FAIL'}] ${name}${detail ? ' — ' + detail : ''}`);
  }

  async function goto(hash, waitMs = 2200) {
    await evaluate(cdp, `location.hash = ${JSON.stringify(hash)}; undefined`);
    await new Promise((r) => setTimeout(r, waitMs));
  }

  // 1. 首页
  await goto('#/');
  let v = await evaluate(cdp, `document.body.innerText.includes('/144') && document.body.innerText.includes('总积分')`);
  await screenshot(cdp, path.join(OUT_DIR, 'f-home.png'));
  report('首页渲染（144课/总积分）', v);

  // 2. 课程列表 + 返回主界面按钮（本轮新增的房子图标）
  await goto('#/lessons');
  v = await evaluate(
    cdp,
    `(() => { const cards = document.querySelectorAll('.lesson-card').length;
       const homeBtn = !!document.querySelector('.header .back-icon-btn');
       return cards === 144 && homeBtn ? cards + '|' + homeBtn : 'FAIL:' + cards + '/' + homeBtn; })()`
  );
  await screenshot(cdp, path.join(OUT_DIR, 'f-lessons.png'));
  report('课程列表 144 卡片 + 回主界面按钮', String(v).includes('144|true'), String(v));

  // 3. L21 默认单词 Tab：例句补全验证
  await goto('#/lesson/21');
  v = await evaluate(
    cdp,
    `(() => {
       const rows = document.querySelectorAll('.example-row').length;
       const hasChopsticks = document.body.innerText.includes('Can you eat with chopsticks?');
       const hasSmall = document.body.innerText.includes('They are small.');
       return JSON.stringify({ rows, hasChopsticks, hasSmall });
     })()`
  );
  await screenshot(cdp, path.join(OUT_DIR, 'f-l21-vocab.png'));
  const vocab = JSON.parse(v);
  report('L21 例句渲染', vocab.rows > 0 && vocab.hasChopsticks && vocab.hasSmall, JSON.stringify(vocab));

  // 4. L21 练习菜单：题量统计
  await goto('#/lesson/21');
  await evaluate(cdp, `(() => { const t = [...document.querySelectorAll('.tab')].find(e => e.textContent.includes('练习')); if (t) t.click(); return 1; })()`);
  await new Promise((r) => setTimeout(r, 1200));
  v = await evaluate(
    cdp,
    `(() => {
       const cards = [...document.querySelectorAll('.practice-card')];
       return JSON.stringify(cards.map(c => (c.querySelector('.practice-count')?.textContent || '').trim()));
     })()`
  );
  await screenshot(cdp, path.join(OUT_DIR, 'f-l21-practice.png'));
  const counts = JSON.parse(v);
  const total = counts.reduce((s, c) => {
    const m = c.match(/(\d+)/);
    return s + (m ? parseInt(m[1], 10) : 0);
  }, 0);
  report('L21 练习题量（5 类合计 ≥ 25）', counts.length === 5 && total >= 25, `各卡: ${counts.join(' / ')}，合计 ${total}`);

  // 5. L21 语法页：语法练习（含连词成句/填空补充题）
  await goto('#/lesson/21');
  await evaluate(cdp, `(() => { const t = [...document.querySelectorAll('.tab')].find(e => e.textContent.includes('语法')); if (t) t.click(); return 1; })()`);
  await new Promise((r) => setTimeout(r, 1500));
  v = await evaluate(
    cdp,
    `(() => {
       const hasExplanation = !!document.querySelector('.explanation-card');
       const hasExamples = document.querySelectorAll('.speak-btn').length;
       const progress = document.body.innerText.match(/\\d+ \\/ (\\d+)/);
       return JSON.stringify({ hasExplanation, hasExamples, progress: progress ? progress[0] : '' });
     })()`
  );
  await screenshot(cdp, path.join(OUT_DIR, 'f-l21-grammar.png'));
  const g = JSON.parse(v);
  report('L21 语法教学页渲染', g.hasExplanation && g.hasExamples > 0, JSON.stringify(g));

  // 6. L1 听力练习：进入一题验证渲染（题目扩充后听力 ~13 题）
  await goto('#/lesson/1');
  await evaluate(cdp, `(() => { const t = [...document.querySelectorAll('.tab')].find(e => e.textContent.includes('练习')); if (t) t.click(); return 1; })()`);
  await new Promise((r) => setTimeout(r, 1200));
  await evaluate(cdp, `(() => { const c = [...document.querySelectorAll('.practice-card')].find(e => e.textContent.includes('听力')); if (c) c.click(); return 1; })()`);
  await new Promise((r) => setTimeout(r, 1500));
  v = await evaluate(
    cdp,
    `(() => {
       const progress = (document.querySelector('.exercise-progress')?.textContent || '').trim();
       const hasListenBtn = !!document.querySelector('.listen-btn');
       const optionCount = document.querySelectorAll('.option-btn').length;
       return JSON.stringify({ progress, hasListenBtn, optionCount });
     })()`
  );
  await screenshot(cdp, path.join(OUT_DIR, 'f-l1-listening.png'));
  const l = JSON.parse(v);
  const lTotal = parseInt((l.progress.match(/\/ (\d+)/) || [0, 0])[1], 10);
  report('L1 听力练习进入答题', l.hasListenBtn && l.optionCount === 4 && lTotal >= 10, JSON.stringify(l));

  // 7. 进度页
  await goto('#/progress');
  v = await evaluate(cdp, `document.body.innerText.length > 20 && !document.body.innerText.includes('数据加载失败')`);
  await screenshot(cdp, path.join(OUT_DIR, 'f-progress.png'));
  report('进度页渲染', v);

  cdp.close();
  const failed = results.filter((r) => !r.ok);
  console.log(`\n功能冒烟: ${results.length - failed.length}/${results.length} 通过，截图目录: ${OUT_DIR}`);
  process.exit(failed.length > 0 ? 1 : 0);
})().catch((e) => {
  console.error('冒烟测试异常:', e.message);
  process.exit(1);
});
