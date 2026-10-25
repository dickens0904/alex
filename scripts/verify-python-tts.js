/** 端到端验证：渲染端 IPC 调主进程 Python 管线合成（Edge TTS 在线链路恢复测试） */
const http = require('http');
const WebSocket = require('ws');
function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => { let d = ''; res.on('data', (c) => (d += c)); res.on('end', () => resolve(JSON.parse(d))); }).on('error', reject);
  });
}
(async () => {
  const targets = await fetchJson('http://127.0.0.1:9222/json');
  const page = targets.find((x) => x.type === 'page' && /index\.html/.test(x.url) && !x.url.startsWith('devtools://'));
  const ws = new WebSocket(page.webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise((r) => ws.on('open', r));
  let id = 0;
  const pend = new Map();
  ws.on('message', (raw) => {
    const m = JSON.parse(raw.toString());
    if (m.id && pend.has(m.id)) { pend.get(m.id)(m.result); pend.delete(m.id); }
  });
  const send = (method, params = {}) => new Promise((r, j) => {
    const i = ++id;
    pend.set(i, r);
    ws.send(JSON.stringify({ id: i, method, params }));
  });
  const r = await send('Runtime.evaluate', {
    expression: `(async () => {
      // 停掉页面自动朗读（L51 恢复路由会自动朗读，其 IPC 会 abort 测试请求）
      try { await window.electronAPI.edgeTtsStop(); } catch (e) {}
      const out = {};
      for (const [label, opts] of [
        ['aria', { text: 'The endpoint migration is fixed now.', voice: 'en-US-AriaNeural', rate: 1 }],
        ['guy', { text: 'Weather sounds help children remember words.', voice: 'en-US-GuyNeural', rate: 0.9 }],
      ]) {
        const t0 = Date.now();
        try {
          const r = await window.electronAPI.edgeTtsSpeak(opts);
          out[label] = {
            success: r.success,
            audioKB: r.audio ? Math.round(r.audio.length / 1024) : 0,
            error: r.error || '',
            ms: Date.now() - t0,
          };
        } catch (e) { out[label] = { error: String(e) }; }
      }
      return out;
    })()`,
    returnByValue: true,
    awaitPromise: true,
  });
  console.log(JSON.stringify(r.result.value, null, 2));
  ws.close();
  process.exit(0);
})().catch((e) => { console.error('失败:', e); process.exit(1); });
