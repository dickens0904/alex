"""
新概念英语练习王 - 课文对话音频生成（SSML方式）
一次生成完整音频，带角色区分和停顿
"""
import asyncio
import edge_tts
import os
import sys

VOICES = {
    "male": "en-US-GuyNeural",
    "female": "en-US-JennyNeural",
}

OUTPUT_DIR = r"I:\新概念英语练习王\src\assets\audio\lessons"

# Lesson 1: 男士捡到包，女士是失主
# A=男士, B=女士
LESSON_1_DIALOGUE = [
    {"role": "male", "text": "Excuse me!"},
    {"role": "female", "text": "Yes?"},
    {"role": "male", "text": "Is this your handbag?"},
    {"role": "female", "text": "Pardon?"},
    {"role": "male", "text": "Is this your handbag?"},
    {"role": "female", "text": "Yes, it is."},
    {"role": "female", "text": "Thank you very much."},
]

async def generate_full_audio(lesson_id: int, dialogue: list):
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    segments = []
    for i, line in enumerate(dialogue):
        voice = VOICES[line["role"]]
        text = line["text"]
        seg_path = os.path.join(OUTPUT_DIR, f"_seg_{lesson_id}_{i:02d}.mp3")
        communicate = edge_tts.Communicate(text, voice)
        await communicate.save(seg_path)
        segments.append(seg_path)
        print(f"  [{line['role']}] {text}")
    
    # 拼接MP3 + 句间停顿
    silence_frame = bytes([0xFF, 0xFB, 0x90, 0x00]) + bytes(413)
    silence_block = silence_frame * 30  # ~800ms
    
    full_path = os.path.join(OUTPUT_DIR, f"lesson-{lesson_id}.mp3")
    with open(full_path, 'wb') as out_f:
        for i, seg_path in enumerate(segments):
            with open(seg_path, 'rb') as f:
                out_f.write(f.read())
            if i < len(segments) - 1:
                out_f.write(silence_block)
    
    for seg_path in segments:
        os.remove(seg_path)
    
    size_kb = os.path.getsize(full_path) / 1024
    print(f"\n✅ {full_path} ({size_kb:.0f} KB)")

async def main():
    lesson_id = int(sys.argv[1]) if len(sys.argv) > 1 else 1
    print(f"🎵 Lesson {lesson_id} 对话音频\n")
    await generate_full_audio(lesson_id, LESSON_1_DIALOGUE)

if __name__ == "__main__":
    asyncio.run(main())
