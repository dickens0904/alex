/**
 * 生成慢速版课文音频
 * 使用 edge-tts 生成 slow rate 的音频文件
 * 根据对话角色(A/B)区分男女声音
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const LESSONS_DIR = path.join(__dirname, '../src/assets/audio/lessons');
const SLOW_DIR = path.join(LESSONS_DIR, 'slow');

// 确保慢速目录存在
if (!fs.existsSync(SLOW_DIR)) {
  fs.mkdirSync(SLOW_DIR, { recursive: true });
}

// 语音配置
const VOICES = {
  male: 'en-US-GuyNeural',      // 男声
  female: 'en-US-AriaNeural',   // 女声
  default: 'en-US-AriaNeural'   // 默认女声
};

// 从课程数据中提取课文段落（带speaker）
function getLessonParagraphs(lessonId) {
  const lessonsDataPath = path.join(__dirname, '../src/data/lessons/completeLessons.ts');
  const lessonsContent = fs.readFileSync(lessonsDataPath, 'utf-8');
  
  // 匹配课文段落
  const regex = new RegExp(`id: ${lessonId}[\\s\\S]*?paragraphs: \\[([\\s\\S]*?)\\]`, 'g');
  const match = regex.exec(lessonsContent);
  
  if (!match) return [];
  
  const paragraphsStr = match[1];
  const paragraphs = [];
  
  // 提取 speaker 和 content 字段
  const paraRegex = /\{[^}]*speaker:\s*['"]([^'"]+)['"][^}]*content:\s*['"]([^'"]+)['"][^}]*\}/g;
  let paraMatch;
  while ((paraMatch = paraRegex.exec(paragraphsStr)) !== null) {
    paragraphs.push({
      speaker: paraMatch[1],
      content: paraMatch[2]
    });
  }
  
  return paragraphs;
}

// 根据speaker选择声音
function getVoiceBySpeaker(speaker) {
  if (!speaker) return VOICES.default;
  
  const upperSpeaker = speaker.toUpperCase();
  
  // A角色用男声
  if (upperSpeaker === 'A') return VOICES.male;
  // B角色用女声
  if (upperSpeaker === 'B') return VOICES.female;
  // NARRATOR用女声
  if (upperSpeaker === 'NARRATOR') return VOICES.female;
  
  // 其他角色默认女声
  return VOICES.default;
}

// 使用 edge-tts 生成慢速音频
function generateSlowAudio(lessonId) {
  const paragraphs = getLessonParagraphs(lessonId);
  if (paragraphs.length === 0) {
    console.log(`第 ${lessonId} 课没有找到课文内容`);
    return;
  }
  
  const outputFile = path.join(SLOW_DIR, `lesson-${lessonId}-slow.mp3`);
  
  // 检查是否需要为不同角色生成独立音频
  const hasMultipleSpeakers = paragraphs.some(p => p.speaker === 'A' || p.speaker === 'B');
  
  if (hasMultipleSpeakers) {
    // 对话课文：为每个角色生成独立音频
    const maleParts = paragraphs.filter(p => p.speaker === 'A').map(p => p.content).join('. ');
    const femaleParts = paragraphs.filter(p => p.speaker === 'B').map(p => p.content).join('. ');
    
    const maleFile = path.join(SLOW_DIR, `lesson-${lessonId}-slow-male.mp3`);
    const femaleFile = path.join(SLOW_DIR, `lesson-${lessonId}-slow-female.mp3`);
    
    // 生成男声部分
    if (maleParts) {
      try {
        const cmd = `edge-tts --voice "${VOICES.male}" --rate="-30%" --text "${maleParts.replace(/"/g, '\\"')}" --write-media "${maleFile}"`;
        console.log(`生成第 ${lessonId} 课慢速男声音频...`);
        execSync(cmd, { stdio: 'pipe' });
        console.log(`✓ 第 ${lessonId} 课男声完成`);
      } catch (error) {
        console.error(`✗ 第 ${lessonId} 课男声失败:`, error.message);
      }
    }
    
    // 生成女声部分
    if (femaleParts) {
      try {
        const cmd = `edge-tts --voice "${VOICES.female}" --rate="-30%" --text "${femaleParts.replace(/"/g, '\\"')}" --write-media "${femaleFile}"`;
        console.log(`生成第 ${lessonId} 课慢速女声音频...`);
        execSync(cmd, { stdio: 'pipe' });
        console.log(`✓ 第 ${lessonId} 课女声完成`);
      } catch (error) {
        console.error(`✗ 第 ${lessonId} 课女声失败:`, error.message);
      }
    }
    
    // 生成完整音频（女声朗读全部）
    try {
      const fullText = paragraphs.map(p => p.content).join('. ');
      const cmd = `edge-tts --voice "${VOICES.female}" --rate="-30%" --text "${fullText.replace(/"/g, '\\"')}" --write-media "${outputFile}"`;
      console.log(`生成第 ${lessonId} 课慢速完整音频...`);
      execSync(cmd, { stdio: 'pipe' });
      console.log(`✓ 第 ${lessonId} 课完整音频完成`);
    } catch (error) {
      console.error(`✗ 第 ${lessonId} 课完整音频失败:`, error.message);
    }
    
  } else {
    // 叙述课文：只生成一个音频
    try {
      const fullText = paragraphs.map(p => p.content).join('. ');
      const cmd = `edge-tts --voice "${VOICES.female}" --rate="-30%" --text "${fullText.replace(/"/g, '\\"')}" --write-media "${outputFile}"`;
      console.log(`生成第 ${lessonId} 课慢速音频...`);
      execSync(cmd, { stdio: 'pipe' });
      console.log(`✓ 第 ${lessonId} 课完成`);
    } catch (error) {
      console.error(`✗ 第 ${lessonId} 课失败:`, error.message);
    }
  }
}

// 获取需要生成的课程列表（1-144）
const lessons = [];
for (let i = 1; i <= 144; i++) {
  const slowFile = path.join(SLOW_DIR, `lesson-${i}-slow.mp3`);
  
  // 只处理慢速文件不存在的课程
  if (!fs.existsSync(slowFile)) {
    lessons.push(i);
  }
}

console.log(`需要生成慢速音频的课程: ${lessons.length} 课`);
console.log('课程列表:', lessons.join(', '));

// 批量生成
console.log('\n开始生成慢速音频（区分男女声）...\n');

lessons.forEach((lessonId) => {
  generateSlowAudio(lessonId);
});

console.log('\n生成完成！');
console.log(`慢速音频保存在: ${SLOW_DIR}`);
