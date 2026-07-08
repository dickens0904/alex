/**
 * 直接测试 Edge TTS 是否可用
 * 在 Electron main process 中运行
 */
const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');

async function test() {
  console.log('=== Edge TTS 直接测试 ===');
  try {
    const tts = new MsEdgeTTS();
    console.log('1. MsEdgeTTS 实例创建成功');
    
    await tts.setMetadata('en-US-AriaNeural', OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
    console.log('2. setMetadata 成功 (voice=en-US-AriaNeural)');
    
    const { audioStream } = tts.toStream('Hello, this is a test.', { rate: '+0%', pitch: '+0Hz' });
    console.log('3. toStream 成功，等待音频数据...');
    
    const chunks = [];
    await new Promise((resolve, reject) => {
      audioStream.on('data', (chunk) => {
        chunks.push(chunk);
        console.log(`4. 收到音频数据: ${chunk.length} bytes`);
      });
      audioStream.on('end', () => {
        console.log('5. 音频流结束');
        resolve();
      });
      audioStream.on('error', (err) => {
        console.error('5. 音频流错误:', err.message);
        reject(err);
      });
      // 超时保护
      setTimeout(() => {
        reject(new Error('超时: 10秒内未收到数据'));
      }, 10000);
    });
    
    const totalSize = chunks.reduce((sum, c) => sum + c.length, 0);
    console.log(`6. 总音频大小: ${totalSize} bytes`);
    console.log('=== Edge TTS 测试成功！ ===');
  } catch (error) {
    console.error('=== Edge TTS 测试失败 ===');
    console.error('错误:', error.message);
  }
}

test().then(() => process.exit(0));
