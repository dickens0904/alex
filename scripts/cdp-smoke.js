/**
 * 生产构建冒烟测试：通过 CDP（页面级 WebSocket）连接 Electron 窗口验证路由渲染与插图加载
 * 用法：先启动应用 `npx electron . --remote-debugging-port=9222`，再运行 `node scripts/cdp-smoke.js`
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
      /* 应用尚未就绪，重试 */
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
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const results = [];

  async function check(name, hash, expression) {
    await evaluate(cdp, `location.hash = ${JSON.stringify(hash)}; undefined`);
    await new Promise((r) => setTimeout(r, 2500));
    const ok = await evaluate(cdp, expression);
    await screenshot(cdp, path.join(OUT_DIR, `${name}.png`));
    results.push({ name, ok });
    console.log(`[${ok ? 'PASS' : 'FAIL'}] ${name}`);
  }

  // 1. 首页：统计显示 144 课总数（验证懒加载课程数据 chunk）
  await check('home', '#/', `document.body.innerText.includes('/144') && document.body.innerText.includes('总积分')`);

  // 2. 课程列表：144 张卡片渲染
  await check('lessons', '#/lessons', `document.querySelectorAll('.lesson-card').length === 144`);

  // 3. 课程详情：切到"课文学习" Tab 后插图真实加载（naturalWidth > 0，验证图片路径）
  await check(
    'lesson-1',
    '#/lesson/1',
    `(async () => {
       // 点击"课文学习" Tab 使插图渲染
       const tab = [...document.querySelectorAll('button, [role=tab], .tab, .tab-item')]
         .find((el) => el.textContent.includes('课文学习'));
       if (tab) tab.click();
       await new Promise((r) => setTimeout(r, 800));
       const img = document.querySelector('.text-illustration img');
       return !!img && img.naturalWidth > 0 && document.body.innerText.length > 50;
     })()`
  );

  // 4. 学习进度页：正常渲染且无错误提示
  await check('progress', '#/progress', `document.body.innerText.length > 20 && !document.body.innerText.includes('数据加载失败')`);

  cdp.close();

  const failed = results.filter((r) => !r.ok);
  console.log(`\n冒烟测试: ${results.length - failed.length}/${results.length} 通过，截图目录: ${OUT_DIR}`);
  process.exit(failed.length > 0 ? 1 : 0);
})().catch((e) => {
  console.error('冒烟测试异常:', e.message);
  process.exit(1);
});
