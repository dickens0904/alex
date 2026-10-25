/** 探针：查 L108 剧场的 viewBox 与三只箱子的屏幕包围盒 */
const http = require('http');
const WebSocket = require('ws');
const CDP_PORT = 9222;

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => { let d = ''; res.on('data', (c) => (d += c)); res.on('end', () => resolve(JSON.parse(d))); }).on('error', reject);
  });
}
async function findPageTarget() {
  for (let i = 0; i < 20; i++) {
    try {
      const t = await fetchJson(`http://127.0.0.1:${CDP_PORT}/json`);
      const p = t.find((x) => x.type === 'page' && /index\.html/.test(x.url));
      if (p) return p;
    } catch {}
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error('no target');
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
(async () => {
  const target = await findPageTarget();
  const cdp = await connectCdp(target.webSocketDebuggerUrl);
  await cdp.send('Runtime.enable');
  await cdp.send('Page.enable');
  // 进指定课剧场并点到最后一句
  const LESSON = Number(process.argv[2] || 108);
  await cdp.send('Runtime.evaluate', { expression: `location.hash = '#/lesson/${LESSON}'; undefined` });
  await new Promise((r) => setTimeout(r, 1800));
  await cdp.send('Runtime.evaluate', { expression: `(async () => {
    const tab = [...document.querySelectorAll('button')].find((el) => el.textContent.includes('课文学习'));
    if (tab) { tab.click(); await new Promise((r) => setTimeout(r, 600)); }
    [...document.querySelectorAll('button')].find((el) => el.textContent.includes('情景剧场')).click();
    await new Promise((r) => setTimeout(r, 1200));
    const chips = [...document.querySelectorAll('.theater-line-chip')];
    for (const c of chips) { c.click(); await new Promise((r) => setTimeout(r, 80)); }
    await new Promise((r) => setTimeout(r, 1200));
    return 'ok';
  })()`, awaitPromise: true, returnByValue: true });
  const probe = await cdp.send('Runtime.evaluate', { expression: `(async () => {
    const svg = document.querySelector('.tf-stage-svg');
    const vb = svg.getAttribute('viewBox');
    const items = [...document.querySelectorAll('.tf-item-appear')].map((g) => {
      const r = g.getBoundingClientRect();
      const svgR = svg.getBoundingClientRect();
      return { x: Math.round(r.x - svgR.x), y: Math.round(r.y - svgR.y), w: Math.round(r.width), h: Math.round(r.height) };
    });
    const svgR = svg.getBoundingClientRect();
    return { viewBox: vb, svgSize: { w: Math.round(svgR.width), h: Math.round(svgR.height) }, items };
  })()`, awaitPromise: true, returnByValue: true });
  console.log(JSON.stringify(probe.result.value, null, 1));
  cdp.close();
})().catch((e) => { console.error('探针异常:', e.message); process.exit(1); });
