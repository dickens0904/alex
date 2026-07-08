/**
 * 日志测试脚本
 * 用于验证应用的日志功能是否正常工作
 */

const http = require('http');

const BASE_URL = 'http://localhost:3000';

function makeRequest(path) {
  return new Promise((resolve, reject) => {
    const url = `${BASE_URL}${path}`;
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          data: data,
        });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function testApplication() {
  console.log('=== 新概念英语练习王 - 日志测试 ===\n');
  
  try {
    // 测试1: 检查应用是否可访问
    console.log('测试1: 检查应用是否可访问');
    const homeResponse = await makeRequest('/');
    if (homeResponse.statusCode === 200) {
      console.log('✓ 应用可访问，状态码: 200');
    } else {
      console.log('✗ 应用访问失败，状态码:', homeResponse.statusCode);
      return;
    }

    // 测试2: 检查HTML内容
    console.log('\n测试2: 检查HTML内容');
    if (homeResponse.data.includes('新概念英语')) {
      console.log('✓ HTML内容包含应用标题');
    } else {
      console.log('✗ HTML内容不包含应用标题');
    }

    // 测试3: 检查bundle.js是否可访问
    console.log('\n测试3: 检查bundle.js是否可访问');
    const bundleResponse = await makeRequest('/bundle.js');
    if (bundleResponse.statusCode === 200) {
      console.log('✓ bundle.js可访问，大小:', bundleResponse.data.length, '字节');
    } else {
      console.log('✗ bundle.js访问失败，状态码:', bundleResponse.statusCode);
    }

    // 测试4: 检查styles.css是否可访问
    console.log('\n测试4: 检查styles.css是否可访问');
    const cssResponse = await makeRequest('/styles.css');
    if (cssResponse.statusCode === 200) {
      console.log('✓ styles.css可访问，大小:', cssResponse.data.length, '字节');
    } else {
      console.log('✗ styles.css访问失败，状态码:', cssResponse.statusCode);
    }

    // 测试5: 检查日志相关代码是否包含在bundle中
    console.log('\n测试5: 检查日志相关代码是否包含在bundle中');
    if (bundleResponse.data.includes('logger') || bundleResponse.data.includes('LogViewer')) {
      console.log('✓ 日志相关代码已包含在bundle中');
    } else {
      console.log('✗ 日志相关代码未包含在bundle中');
    }

    // 测试6: 检查TTS相关代码
    console.log('\n测试6: 检查TTS相关代码');
    if (bundleResponse.data.includes('speakEnglish') || bundleResponse.data.includes('speakChinese')) {
      console.log('✓ TTS相关代码已包含在bundle中');
    } else {
      console.log('✗ TTS相关代码未包含在bundle中');
    }

    // 测试7: 检查语法讲解相关代码
    console.log('\n测试7: 检查语法讲解相关代码');
    if (bundleResponse.data.includes('GrammarCard') || bundleResponse.data.includes('语法讲解')) {
      console.log('✓ 语法讲解相关代码已包含在bundle中');
    } else {
      console.log('✗ 语法讲解相关代码未包含在bundle中');
    }

    console.log('\n=== 测试完成 ===');
    console.log('\n要查看日志，请在浏览器中打开应用，然后点击右下角的日志按钮。');

  } catch (error) {
    console.error('测试过程中发生错误:', error);
  }
}

// 运行测试
testApplication();
