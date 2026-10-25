/**
 * 剧场舞台物品 CDP 抽查：进课 → 开剧场 → 点到最后一句 → 统计舞台物品渲染数 → 截图
 * 用法：先 `npx electron . --remote-debugging-port=9222`，再 `node scripts/verify-theater-cdp.js`
 */
const http = require('http');
const path = require('path');
const fs = require('fs');
const WebSocket = require('ws');

const CDP_PORT = 9222;
const OUT_DIR = path.join(__dirname, '..', 'smoke-shots');
const LESSONS = [
  { id: 12, expect: 4 },
  { id: 29, expect: 4 },
  { id: 30, expect: 8 },
  { id: 41, expect: 9 },
  { id: 108, expect: 3 },
];

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => { let d = ''; res.on('data', (c) => (d += c)); res.on('end', () => resolve(JSON.parse(d))); }).on('error', reject);
  });
}

async function findPageTarget(retries = 20) {
  for (let i = 0; i < retries; i++) {
    try {
      const targets = await fetchJson(`http://127.0.0.1:${CDP_PORT}/json`);
      const page = targets.find((t) => t.type === 'page' && /index\.html/.test(t.url));
      if (page) return page;
    } catch { /* 重试 */ }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error('未找到应用页面 target');
}

function connectCdp(wsUrl) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl, { perMessageDeflate: false });
    let id = 0;
    const pending = new Map();
    ws.on('open', () => resolve({
      send(method, params = {}) {
        return new Promise((res, rej) => {
          const msgId = ++id;
          pending.set(msgId, { res, rej });
          ws.send(JSON.stringify({ id: msgId, method, params }));
        });
      },
      close: () => ws.close(),
    }));
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
  const { result, exceptionDetails } = await cdp.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (exceptionDetails) throw new Error('页面执行异常: ' + JSON.stringify(exceptionDetails));
  return result.value;
}

(async () => {
  const target = await findPageTarget();
  const cdp = await connectCdp(target.webSocketDebuggerUrl);
  await cdp.send('Runtime.enable');
  await cdp.send('Page.enable');
  fs.mkdirSync(OUT_DIR, { recursive: true });

  let pass = 0;
  for (const { id, expect } of LESSONS) {
    await evaluate(cdp, `location.hash = '#/lesson/${id}'; undefined`);
    await new Promise((r) => setTimeout(r, 1800));
    // 打开剧场
    const opened = await evaluate(cdp, `(async () => {
      const tab = [...document.querySelectorAll('button')].find((el) => el.textContent.includes('课文学习'));
      if (tab) { tab.click(); await new Promise((r) => setTimeout(r, 600)); }
      const btn = [...document.querySelectorAll('button')].find((el) => el.textContent.includes('情景剧场'));
      if (!btn) return 'no-btn';
      btn.click();
      await new Promise((r) => setTimeout(r, 1200));
      return 'ok';
    })()`);
    if (opened !== 'ok') { console.log(`L${id}: FAIL（${opened}）`); continue; }
    // 逐句点到最后（触发全部物品）
    await evaluate(cdp, `(async () => {
      const chips = [...document.querySelectorAll('.theater-line-chip')];
      for (const c of chips) { c.click(); await new Promise((r) => setTimeout(r, 90)); }
      await new Promise((r) => setTimeout(r, 900));
      return chips.length;
    })()`);
    const count = await evaluate(cdp, `document.querySelectorAll('.tf-item-appear').length`);
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(OUT_DIR, `theater-L${id}.png`), Buffer.from(data, 'base64'));
    const ok = count >= expect;
    if (ok) pass++;
    console.log(`L${id}: ${ok ? 'PASS' : 'FAIL'} 物品渲染 ${count}/${expect}`);
    // 关闭剧场
    await evaluate(cdp, `(async () => {
      const close = [...document.querySelectorAll('button')].find((el) => el.className.includes('theater-close') || el.textContent.includes('×'));
      if (close) { close.click(); await new Promise((r) => setTimeout(r, 500)); }
      return 'done';
    })()`);
  }
  cdp.close();
  console.log(`\n抽查: ${pass}/${LESSONS.length} 通过`);
  process.exit(pass === LESSONS.length ? 0 : 1);
})().catch((e) => { console.error('验证异常:', e.message); process.exit(1); });
