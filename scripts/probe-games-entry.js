/** 趣味练习入口链路验证：node scripts/probe-games-entry.js */
const http = require('http');
const WebSocket = require('ws');
function fj(u) { return new Promise((res, rej) => { http.get(u, (r) => { let d = ''; r.on('data', (c) => (d += c)); r.on('end', () => res(JSON.parse(d))); }).on('error', rej); }); }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const t = await fj('http://127.0.0.1:9222/json');
  const p = t.find((x) => x.type === 'page' && /index\.html/.test(x.url));
  const ws = new WebSocket(p.webSocketDebuggerUrl, { perMessageDeflate: false });
  let id = 0;
  const pend = new Map();
  const results = [];
  const ok = (n, pass, d = '') => results.push(`${pass ? 'PASS' : 'FAIL'} ${n}${d ? '：' + d : ''}`);
  ws.on('open', async () => {
    const send = (m, pa = {}) => new Promise((res, rej) => {
      const i = ++id; pend.set(i, { res, rej });
      ws.send(JSON.stringify({ id: i, method: m, params: pa }));
      setTimeout(() => { if (pend.has(i)) { pend.delete(i); rej(new Error('CDP 超时')); } }, 8000);
    });
    ws.on('message', (raw) => { const g = JSON.parse(raw.toString()); if (g.id && pend.has(g.id)) { const { res, rej } = pend.get(g.id); pend.delete(g.id); g.error ? rej(new Error(JSON.stringify(g.error))) : res(g.result); } });
    const ev = async (e) => (await send('Runtime.evaluate', { expression: e, awaitPromise: true, returnByValue: true })).result.value;

    // 回首页
    await ev(`location.hash='#/'; undefined`);
    await sleep(1200);

    // ① 点「趣味练习」→ 课程列表应显示趣味练习标题与提示
    await ev(`[...document.querySelectorAll('button')].find(e => e.textContent.includes('趣味练习'))?.click()`);
    await sleep(800);
    ok('路由到 /lessons', (await ev('location.hash')) === '#/lessons');
    ok('标题变为趣味练习', (await ev("document.querySelector('.page-title')?.textContent ?? ''")).includes('趣味练习'));
    ok('提示语出现', ((await ev("document.querySelector('.progress-summary-text')?.textContent ?? ''")) || '').includes('射击'));

    // ② 点第一课 → 应直接落在练习页签（游戏卡片可见）
    await ev(`document.querySelector('.lesson-card')?.click()`);
    await sleep(1200);
    ok('进入课程详情', ((await ev('location.hash')) || '').startsWith('#/lesson/1'));
    ok('练习页签激活', (await ev("document.querySelector('.tabs .tab.active')?.textContent")) === '练习');
    ok('游戏卡片可见', (await ev("document.body.innerText.includes('单词射击')")) === true);

    // ③ 返回首页 → 点「开始学习」→ 应照旧落在单词学习页签
    await ev(`history.back(); history.back(); undefined`);
    await sleep(900);
    await ev(`[...document.querySelectorAll('button')].find(e => e.textContent.includes('开始学习'))?.click()`);
    await sleep(700);
    await ev(`document.querySelector('.lesson-card')?.click()`);
    await sleep(1200);
    ok('开始学习仍落在单词学习', (await ev("document.querySelector('.tabs .tab.active')?.textContent")) === '单词学习');

    console.log(results.join('\n'));
    process.exit(results.some((r) => r.startsWith('FAIL')) ? 1 : 0);
  });
})().catch((e) => { console.error('ERR', e.message); process.exit(1); });
