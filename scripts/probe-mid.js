/** 中景句物品可见性验证：node scripts/probe-mid.js <lessonId> <stopLine> */
const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');
const LESSON = Number(process.argv[2] || 41);
const STOP = Number(process.argv[3] || 9);

function fj(u) { return new Promise((res, rej) => { http.get(u, (r) => { let d = ''; r.on('data', (c) => (d += c)); r.on('end', () => res(JSON.parse(d))); }).on('error', rej); }); }

(async () => {
  const t = await fj('http://127.0.0.1:9222/json');
  const p = t.find((x) => x.type === 'page' && /index\.html/.test(x.url));
  const ws = new WebSocket(p.webSocketDebuggerUrl, { perMessageDeflate: false });
  let id = 0;
  const pend = new Map();
  ws.on('open', async () => {
    const send = (m, pa = {}) => new Promise((res, rej) => { const i = ++id; pend.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method: m, params: pa })); });
    ws.on('message', (raw) => { const g = JSON.parse(raw.toString()); if (g.id && pend.has(g.id)) { const { res, rej } = pend.get(g.id); pend.delete(g.id); g.error ? rej(new Error(JSON.stringify(g.error))) : res(g.result); } });
    await send('Page.enable');
    const ev = async (e) => (await send('Runtime.evaluate', { expression: e, awaitPromise: true, returnByValue: true })).result.value;
    await ev(`location.hash='#/lesson/${LESSON}'; undefined`);
    await new Promise((r) => setTimeout(r, 1800));
    await ev(`(async () => {
      const tb = [...document.querySelectorAll('button')].find(e => e.textContent.includes('课文学习'));
      if (tb) { tb.click(); await new Promise(r => setTimeout(r, 600)); }
      [...document.querySelectorAll('button')].find(e => e.textContent.includes('情景剧场')).click();
      await new Promise(r => setTimeout(r, 1200));
      const ch = [...document.querySelectorAll('.theater-line-chip')];
      for (let i = 0; i <= ${STOP} && i < ch.length; i++) { ch[i].click(); await new Promise(r => setTimeout(r, 80)); }
      await new Promise(r => setTimeout(r, 1600));
      return 'ok';
    })()`);
    const vb = await ev(`document.querySelector('.tf-stage-svg').getAttribute('viewBox')`);
    const n = await ev(`document.querySelectorAll('.tf-item-appear').length`);
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('smoke-shots/theater-mid.png', Buffer.from(shot.data, 'base64'));
    console.log(`L${LESSON} 停在第${STOP}句 viewBox:`, vb, '物品数:', n);
    ws.close();
    process.exit(0);
  });
})().catch((e) => { console.error(e.message); process.exit(1); });
