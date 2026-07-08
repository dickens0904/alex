"""
新概念英语练习王 - 课文对话音频生成
使用 edge-tts 为每课生成带角色区分的对话音频
"""
import asyncio
import edge_tts
import os
import json
import sys
from pathlib import Path

# ======== 声音配置 ========
# 英语男声/女声，区分对话角色
VOICES = {
    "male": "en-US-GuyNeural",      # 男声 - 温和自然
    "female": "en-US-JennyNeural",  # 女声 - 清晰友好
}

# 角色映射：不同课文的A/B可能是不同性别
# NCE Book 1 大部分对话：A=男，B=女（或反过来）
ROLE_VOICE_MAP = {
    "A": "male",
    "B": "female",
}

OUTPUT_DIR = r"I:\新概念英语练习王\src\assets\audio\lessons"

async def generate_line(text: str, voice: str, output_path: str):
    """生成单句音频"""
    communicate = edge_tts.Communicate(text, voice)
    await communicate.save(output_path)
    print(f"  ✓ {output_path}")

async def generate_lesson_audio(lesson_id: int, dialogue: list, pause_ms: int = 500):
    """
    为一课生成完整音频
    dialogue: [{"role": "A", "text": "Excuse me!"}, ...]
    """
    lesson_dir = os.path.join(OUTPUT_DIR, f"lesson-{lesson_id}")
    os.makedirs(lesson_dir, exist_ok=True)
    
    # 1. 生成每句单独音频
    segments = []
    for i, line in enumerate(dialogue):
        role = line["role"]
        text = line["text"]
        voice_type = ROLE_VOICE_MAP.get(role, "male")
        voice = VOICES[voice_type]
        
        seg_path = os.path.join(lesson_dir, f"seg_{i:02d}.mp3")
        await generate_line(text, voice, seg_path)
        segments.append(seg_path)
    
    # 2. 合并为完整音频（用 pydub 或 ffmpeg）
    try:
        from pydub import AudioSegment
        from pydub.utils import which
        
        # 确保 ffmpeg 可用
        AudioSegment.converter = which("ffmpeg") or "ffmpeg"
        
        combined = AudioSegment.empty()
        pause = AudioSegment.silent(duration=pause_ms)
        
        for seg_path in segments:
            audio = AudioSegment.from_mp3(seg_path)
            combined += audio + pause
        
        # 输出完整音频
        full_path = os.path.join(OUTPUT_DIR, f"lesson-{lesson_id}.mp3")
        combined.export(full_path, format="mp3", bitrate="192k")
        print(f"\n✅ 完整音频: {full_path}")
        print(f"   时长: {len(combined)/1000:.1f}秒")
        
        # 清理分段文件
        for seg_path in segments:
            os.remove(seg_path)
        os.rmdir(lesson_dir)
        
        return full_path
    except ImportError:
        print(f"\n⚠️  pydub 未安装，分段音频保存在: {lesson_dir}")
        return lesson_dir

# ======== Lesson 1 对话数据 ========
LESSON_1_DIALOGUE = [
    {"role": "A", "text": "Excuse me!"},
    {"role": "B", "text": "Yes?"},
    {"role": "A", "text": "Is this your handbag?"},
    {"role": "B", "text": "Pardon?"},
    {"role": "A", "text": "Is this your handbag?"},
    {"role": "B", "text": "Yes, it is."},
    {"role": "A", "text": "Thank you very much."},
]

async def main():
    lesson_id = int(sys.argv[1]) if len(sys.argv) > 1 else 1
    
    print(f"🎵 生成 Lesson {lesson_id} 对话音频...")
    print(f"   男声: {VOICES['male']}")
    print(f"   女声: {VOICES['female']}")
    print()
    
    await generate_lesson_audio(lesson_id, LESSON_1_DIALOGUE)

if __name__ == "__main__":
    asyncio.run(main())
