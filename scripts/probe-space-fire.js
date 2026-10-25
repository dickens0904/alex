/** 空格发射验证：node scripts/probe-space-fire.js */
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
    const bulletCount = () => ev(`document.querySelectorAll('.airplane-game-container .bullet').length`);

    await ev(`location.hash='#/lesson/1'; undefined`);
    await sleep(1500);
    await ev(`[...document.querySelectorAll('.tabs .tab')].find(e => e.textContent.includes('练习'))?.click()`);
    await sleep(400);
    await ev(`[...document.querySelectorAll('div')].find(e => e.textContent.trim() === '飞机大战')?.click()`);
    await sleep(400);
    // 就绪页还在时查提示语
    ok('提示语含空格', ((await ev("document.body.innerText")) || '').includes('空格发射'));
    await ev(`[...document.querySelectorAll('button')].find(e => e.textContent.includes('开始战斗'))?.click()`);
    await sleep(900);
    // 静置无子弹
    await sleep(1200);
    ok('无自动射击', (await bulletCount()) === 0, `静置子弹=${await bulletCount()}`);
    // 空格发射
    await ev(`window.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', code: 'Space' })); undefined`);
    await sleep(150);
    const afterSpace = await bulletCount();
    ok('空格发射子弹', afterSpace >= 1, `空格后子弹=${afterSpace}`);
    // e.repeat 防机关枪：repeat:true 不应再发射
    const before = await bulletCount();
    await ev(`window.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', code: 'Space', repeat: true })); undefined`);
    await sleep(150);
    const afterRepeat = await bulletCount();
    ok('按住空格不连发', afterRepeat === before, `repeat前=${before} repeat后=${afterRepeat}`);

    console.log(results.join('\n'));
    process.exit(results.some((r) => r.startsWith('FAIL')) ? 1 : 0);
  });
})().catch((e) => { console.error('ERR', e.message); process.exit(1); });
