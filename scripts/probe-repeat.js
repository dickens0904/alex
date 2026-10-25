/** 跟读模式状态机验证：node scripts/probe-repeat.js [lessonId] */
const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');
const LESSON = Number(process.argv[2] || 1);

function fj(u) { return new Promise((res, rej) => { http.get(u, (r) => { let d = ''; r.on('data', (c) => (d += c)); r.on('end', () => res(JSON.parse(d))); }).on('error', rej); }); }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const t = await fj('http://127.0.0.1:9222/json');
  const p = t.find((x) => x.type === 'page' && /index\.html/.test(x.url));
  const ws = new WebSocket(p.webSocketDebuggerUrl, { perMessageDeflate: false });
  let id = 0;
  const pend = new Map();
  const errors = [];
  const results = [];
  const ok = (name, pass, detail = '') => { results.push(`${pass ? 'PASS' : 'FAIL'} ${name}${detail ? '：' + detail : ''}`); };

  ws.on('open', async () => {
    const send = (m, pa = {}) => new Promise((res, rej) => { const i = ++id; pend.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method: m, params: pa })); });
    ws.on('message', (raw) => {
      const g = JSON.parse(raw.toString());
      if (g.id && pend.has(g.id)) { const { res, rej } = pend.get(g.id); pend.delete(g.id); g.error ? rej(new Error(JSON.stringify(g.error))) : res(g.result); return; }
      if (g.method === 'Runtime.consoleAPICalled' && g.params.type === 'error') errors.push(g.params.args.map((a) => a.value ?? a.description ?? '').join(' '));
      if (g.method === 'Runtime.exceptionThrown') errors.push(g.params.exceptionDetails.exception?.description ?? g.params.exceptionDetails.text ?? 'exception');
    });
    // 注意：不要调 Page.enable——本机 DevTools 附着下 Page 域 enable 会挂起（Runtime 域正常）
    await send('Runtime.enable');
    const ev = async (e) => (await send('Runtime.evaluate', { expression: e, awaitPromise: true, returnByValue: true })).result.value;
    /** 轮询等待页面条件成立（毫秒） */
    const waitFor = async (expr, timeoutMs) => {
      const deadline = Date.now() + timeoutMs;
      while (Date.now() < deadline) {
        const v = await ev(expr);
        if (v) return v;
        await sleep(400);
      }
      return null;
    };
    const shot = async (name) => {
      try {
        const s = await send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(`smoke-shots/${name}.png`, Buffer.from(s.data, 'base64'));
      } catch { /* 截图失败不阻塞验证 */ }
    };

    // 进课 → 打开剧场
    await ev(`location.hash='#/lesson/${LESSON}'; undefined`);
    await sleep(1800);
    await ev(`(async () => {
      const tb = [...document.querySelectorAll('button')].find(e => e.textContent.includes('课文学习'));
      if (tb) { tb.click(); await new Promise(r => setTimeout(r, 600)); }
      [...document.querySelectorAll('button')].find(e => e.textContent.includes('情景剧场')).click();
      await new Promise(r => setTimeout(r, 1200));
    })()`);

    // ① 跟读开关：点击 → repeat-on 样式 + localStorage 持久化
    await ev(`[...document.querySelectorAll('.theater-controls .theater-btn')].find(e => e.textContent.includes('跟读模式')).click()`);
    await sleep(300);
    const onCls = await ev(`!!document.querySelector('.theater-btn.repeat-on')`);
    const stored = await ev(`localStorage.getItem('theater-repeat-mode')`);
    ok('跟读开关开启', onCls && stored === '1', `repeat-on=${onCls} localStorage=${stored}`);

    // ② 开始演出 → 等第一句 TTS 播完出现「轮到你啦」录音面板
    await ev(`[...document.querySelectorAll('.theater-controls .theater-btn')].find(e => e.textContent.includes('开始演出')).click()`);
    const listen1 = await waitFor(`!!document.querySelector('.theater-repeat-panel.listening')`, 40000);
    ok('录音面板出现', !!listen1);
    const hint = await ev(`document.querySelector('.theater-repeat-target')?.textContent ?? ''`);
    ok('跟读目标句显示', !!hint, hint);
    await shot('repeat-listening');

    // ③ 等评分结果：录音 12s + ffmpeg 解码最长 ~10s，放宽到 45s
    const scored = await waitFor(`!!document.querySelector('.theater-repeat-score')`, 45000);
    ok('评分面板出现', !!scored);
    const scoreTxt = await ev(`document.querySelector('.theater-repeat-score b')?.textContent ?? ''`);
    const hasActions = await ev(`!!document.querySelector('.theater-repeat-actions')`);
    ok('得分与操作按钮', hasActions, `得分=${scoreTxt} 按钮=${hasActions}`);
    await shot('repeat-scored');

    // ④ 点「跳过这句」→ 下一句进入录音（chip 前进 + listening 面板再现）
    const activeBefore = await ev(`[...document.querySelectorAll('.theater-line-chip')].findIndex(e => e.classList.contains('active'))`);
    await ev(`[...document.querySelectorAll('.theater-repeat-actions .theater-btn')].find(e => e.textContent.includes('跳过')).click()`);
    const listen2 = await waitFor(`!!document.querySelector('.theater-repeat-panel.listening')`, 40000);
    const activeAfter = await ev(`[...document.querySelectorAll('.theater-line-chip')].findIndex(e => e.classList.contains('active'))`);
    ok('跳过后下一句录音', !!listen2 && activeAfter === activeBefore + 1, `chip ${activeBefore}→${activeAfter}`);

    // ⑤ 停止 → 面板消失
    await ev(`[...document.querySelectorAll('.theater-controls .theater-btn')].find(e => e.textContent.includes('停止')).click()`);
    await sleep(600);
    const gone = await ev(`!document.querySelector('.theater-repeat-panel')`);
    ok('停止后面板消失', gone);

    // ⑥ 关闭跟读开关
    await ev(`[...document.querySelectorAll('.theater-controls .theater-btn')].find(e => e.textContent.includes('跟读模式')).click()`);
    await sleep(300);
    const offCls = await ev(`!document.querySelector('.theater-btn.repeat-on') && localStorage.getItem('theater-repeat-mode') === '0'`);
    ok('跟读开关关闭', offCls);

    console.log(results.join('\n'));
    console.log(`渲染端异常 ${errors.length} 条` + (errors.length ? '：\n' + errors.slice(0, 5).join('\n---\n') : '（无）'));
    ws.close();
    process.exit(results.some((r) => r.startsWith('FAIL')) || errors.length ? 1 : 0);
  });
})().catch((e) => { console.error(e.message); process.exit(1); });
