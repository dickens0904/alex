/** 游戏修复验证：node scripts/probe-games.js（射击弹道 + 飞机点击发射） */
const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');
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
    const waitFor = async (expr, ms) => { const dl = Date.now() + ms; while (Date.now() < dl) { if (await ev(expr)) return true; await sleep(60); } return false; };
    const shot = async (n) => { try { const s = await send('Page.captureScreenshot', { format: 'png' }); fs.writeFileSync(`smoke-shots/${n}.png`, Buffer.from(s.data, 'base64')); } catch { /* 忽略 */ } };

    // 进课 → 练习 tab
    await ev(`location.hash='#/lesson/1'; undefined`);
    await sleep(1600);
    await ev(`[...document.querySelectorAll('.tabs .tab')].find(e => e.textContent.includes('练习'))?.click()`);
    await sleep(400);

    // ===== 单词射击 =====
    await ev(`[...document.querySelectorAll('div')].find(e => e.textContent.trim() === '单词射击')?.click()`);
    await sleep(400);
    await ev(`[...document.querySelectorAll('button')].find(e => e.textContent.includes('开始游戏'))?.click()`);
    await sleep(800);
    const area = await ev(`(() => { const a = document.querySelector('.shooting-game-container .game-area'); if (!a) return null; const r = a.getBoundingClientRect(); return { w: r.width, cx: r.left + r.width / 2 }; })()`);
    ok('射击区宽 700px', !!area && Math.abs(area.w - 700) < 2, JSON.stringify(area));
    const cannonX = await ev(`(() => { const c = document.querySelector('.shooting-game-container .cannon'); if (!c) return null; const r = c.getBoundingClientRect(); return r.left + r.width / 2; })()`);
    ok('炮台居中（与炮弹出生点对齐）', !!area && !!cannonX && Math.abs(cannonX - area.cx) < 3, `炮台x=${cannonX?.toFixed(1)} 区中x=${area?.cx?.toFixed(1)}`);
    // 悬停目标 → 瞄准虚线
    await ev(`document.querySelector('.shooting-game-container .target')?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))`);
    const aimOk = await waitFor(`!!document.querySelector('.shooting-game-container .aim-line')`, 2000);
    ok('悬停瞄准虚线出现', aimOk);
    // 点击目标 → 轨迹虚线（子弹飞行约 200ms）
    await ev(`document.querySelector('.shooting-game-container .target')?.click()`);
    const trailOk = await waitFor(`!!document.querySelector('.shooting-game-container .trail-line')`, 2500);
    ok('射击轨迹虚线出现', trailOk);
    await shot('game-shooting');

    // ===== 飞机大战 =====
    await ev(`[...document.querySelectorAll('.airplane-game-container .back-btn, .shooting-game-container .back-btn')].find(e => e.textContent.includes('返回'))?.click()`);
    await sleep(500);
    await ev(`[...document.querySelectorAll('div')].find(e => e.textContent.trim() === '飞机大战')?.click()`);
    await sleep(400);
    await ev(`[...document.querySelectorAll('button')].find(e => e.textContent.includes('开始战斗'))?.click()`);
    await sleep(800);
    const apArea = await ev(`(() => { const a = document.querySelector('.airplane-game-container .game-area'); if (!a) return null; const r = a.getBoundingClientRect(); return { w: r.width }; })()`);
    ok('飞机区宽 700px', !!apArea && Math.abs(apArea.w - 700) < 2, JSON.stringify(apArea));
    // 1.6 秒无点击 → 不应有子弹（旧版自动射击 0.5s 一发）
    await sleep(1600);
    const autoBullets = await ev(`document.querySelectorAll('.airplane-game-container .bullet').length`);
    ok('无自动射击', autoBullets === 0, `静置子弹数=${autoBullets}`);
    // 点击 → 发射
    await ev(`document.querySelector('.airplane-game-container .game-area')?.click()`);
    const fired = await waitFor(`document.querySelectorAll('.airplane-game-container .bullet').length > 0`, 2000);
    ok('点击发射子弹', fired);
    await shot('game-airplane');

    console.log(results.join('\n'));
    process.exit(results.some((r) => r.startsWith('FAIL')) ? 1 : 0);
  });
})().catch((e) => { console.error('ERR', e.message); process.exit(1); });
