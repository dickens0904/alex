/**
 * sherpa 识别质量实测：node scripts/test-asr-quality.js
 * 用 dist 里的课文朗读音频（英文 TTS）直接喂 sherpa，验证转写是否正确。
 */
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const modelsRoot = path.resolve(__dirname, '../models');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const asr = require('../dist/electron/electron/asrBinding.js');

function decodeToPcm(audioPath) {
  return new Promise((resolve, reject) => {
    const installer = require('@ffmpeg-installer/ffmpeg');
    const ff = spawn(installer.path, ['-i', audioPath, '-f', 's16le', '-ar', '16000', '-ac', '1', 'pipe:1'], { stdio: ['pipe', 'pipe', 'pipe'] });
    const chunks = [];
    const errs = [];
    ff.stderr.on('data', (c) => errs.push(c));
    ff.stdout.on('data', (c) => chunks.push(c));
    ff.on('error', reject);
    ff.stdin.on('error', () => { /* 写端错误：等 close 时统一用 stderr 报告 */ });
    ff.on('close', (code) => {
      if (code !== 0 || chunks.length === 0) {
        reject(new Error(`ffmpeg code=${code}: ${Buffer.concat(errs).toString('utf8').slice(-400)}`));
        return;
      }
      resolve(Buffer.concat(chunks));
    });
    ff.stdin.write(fs.readFileSync(audioPath));
    ff.stdin.end();
  });
}

(async () => {
  const avail = asr.voskAvailability(modelsRoot);
  console.log('可用性:', JSON.stringify(avail));
  if (!avail.available) process.exit(1);

  // 取第 1 课的几句音频（缓存目录按句哈希寻址，直接扫前几个 mp3）
  const audioDir = path.resolve(__dirname, '../dist/renderer/assets/audio/lessons');
  const files = fs.readdirSync(audioDir).filter((f) => f.endsWith('.mp3')).slice(0, 5);
  console.log(`取 ${files.length} 个课文音频测试`);

  for (const f of files) {
    const start = Date.now();
    const startOk = asr.voskStart(modelsRoot);
    if (!startOk.ok) { console.log(`  ${f}: 会话建立失败 ${startOk.error}`); continue; }
    const pcm = await decodeToPcm(path.join(audioDir, f));
    asr.voskChunk(pcm);
    const text = asr.voskFinish();
    const ms = Date.now() - start;
    console.log(`  ${f} → "${text}"（音频时长约 ${Math.round(pcm.length / 32)}ms，识别耗时 ${ms}ms）`);
  }
  process.exit(0);
})().catch((e) => { console.error('ERR', e); process.exit(1); });
