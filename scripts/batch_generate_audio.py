"""
新概念英语练习王 - 批量课文对话音频生成 v4
修复: 双引号内容提取
"""
import asyncio
import edge_tts
import os
import re
import sys
import time

VOICES = {
    "male": "en-US-GuyNeural",
    "female": "en-US-JennyNeural",
    "narrator": "en-US-ChristopherNeural",
}

FEMALE_KW = ['MRS','MS','WOMAN','GIRL','MOTHER','MUM','PENNY','HELEN','SOPHIE',
    'NAOKO','XIAOHUI','JANE','ANN','LOUISE','KATE','LIZ','JULIE','CAROL','PAT',
    'JILL','LUCY','SUSAN','CATHERINE','JENNY','LADY','NURSE','MAY','AMY',
    'CHRISTINE','GRANDMOTHER','MARY','JEAN','NICOLA','CLAIRE','TAYLOR']
MALE_KW = ['MR','MAN','BOY','FATHER','DAD','SAM','TOM','TIM','DAVE','STEVEN',
    'HANS','DIMITRI','GEORGE','DAN','BOB','IAN','NIGEL','KEN','GARY','ROY',
    'BRIAN','BILL','JIM','ROBERT','CONDUCTOR','ATTENDANT','ASSISTANT',
    'MANAGER','POLICEMAN','DOCTOR','REPORTER','CUSTOMER','JACK','BLAKE',
    'BAKER','SHORT','JONES','TURNER','SMITH','WILLIAMS']
NARRATOR_KW = ['NARRATOR','STUDENTS']

def guess_gender(speaker):
    s = speaker.upper().strip()
    for kw in NARRATOR_KW:
        if kw in s: return 'narrator'
    for kw in FEMALE_KW:
        if kw in s: return 'female'
    for kw in MALE_KW:
        if kw in s: return 'male'
    if s == 'A': return 'male'
    if s == 'B': return 'female'
    return 'narrator'

def extract_lessons(ts_path):
    with open(ts_path, 'r', encoding='utf-8') as f:
        content = f.read()
    lessons = []
    blocks = re.split(r'//\s*Lesson\s+(\d+):', content)
    for i in range(1, len(blocks), 2):
        lid = int(blocks[i])
        block = blocks[i+1]
        title_match = re.search(r"title:\s*'([^']+)'", block)
        title = title_match.group(1) if title_match else f"Lesson {lid}"
        # 匹配单引号和双引号的内容
        paras = re.findall(r"""speaker:\s*['"]([^'"]+)['"],\s*content:\s*["'](.+?)["']\s*[,}]""", block)
        dialogue = []
        for speaker, text in paras:
            text = text.replace("\\'", "'").replace('\\"', '"')
            dialogue.append({
                'speaker': speaker,
                'text': text,
                'voice': VOICES[guess_gender(speaker)]
            })
        lessons.append({'id': lid, 'title': title, 'dialogue': dialogue})
    return lessons

async def generate_with_timeout(text, voice, path, timeout=30):
    try:
        communicate = edge_tts.Communicate(text, voice)
        await asyncio.wait_for(communicate.save(path), timeout=timeout)
        return True
    except asyncio.TimeoutError:
        print(f"    timeout: {text[:30]}...")
        return False
    except Exception as e:
        print(f"    err: {e}")
        return False

async def generate_lesson(lesson, output_dir, pause_ms=800):
    lid = lesson['id']
    dialogue = lesson['dialogue']
    if not dialogue:
        return None
    os.makedirs(output_dir, exist_ok=True)
    segments = []
    for i, line in enumerate(dialogue):
        seg_path = os.path.join(output_dir, f"_seg_{lid}_{i:03d}.mp3")
        ok = await generate_with_timeout(line['text'], line['voice'], seg_path)
        if ok:
            segments.append(seg_path)
    if not segments:
        return None
    silence_frame = bytes([0xFF, 0xFB, 0x90, 0x00]) + bytes(413)
    silence_block = silence_frame * 30
    output_path = os.path.join(output_dir, f"lesson-{lid}.mp3")
    with open(output_path, 'wb') as out_f:
        for i, seg_path in enumerate(segments):
            with open(seg_path, 'rb') as f:
                out_f.write(f.read())
            if i < len(segments) - 1:
                out_f.write(silence_block)
    for seg_path in segments:
        try: os.remove(seg_path)
        except: pass
    size_kb = os.path.getsize(output_path) / 1024
    return {'path': output_path, 'size_kb': size_kb, 'lines': len(segments)}

async def main():
    ts_path = r'I:\新概念英语练习王\src\data\lessons\completeLessons.ts'
    output_dir = r'I:\新概念英语练习王\src\assets\audio\lessons'
    start_id = int(sys.argv[1]) if len(sys.argv) > 1 else 1
    end_id = int(sys.argv[2]) if len(sys.argv) > 2 else 144
    
    print(f"Reading lessons...")
    lessons = extract_lessons(ts_path)
    lessons = [l for l in lessons if start_id <= l['id'] <= end_id]
    total_lines = sum(len(l['dialogue']) for l in lessons)
    print(f"  {len(lessons)} lessons, {total_lines} lines, ~{total_lines * 3 / 60:.0f}min")
    print()
    
    results = []
    start_time = time.time()
    
    for idx, lesson in enumerate(lessons):
        lid = lesson['id']
        n = len(lesson['dialogue'])
        speakers = set(d['speaker'] for d in lesson['dialogue'])
        vg = {s: guess_gender(s) for s in speakers}
        
        print(f"[{idx+1}/{len(lessons)}] L{lid}: {lesson['title'][:50]}")
        print(f"  {n}L | {', '.join(f'{s}({v})' for s,v in vg.items())}")
        
        result = await generate_lesson(lesson, output_dir)
        if result:
            elapsed = time.time() - start_time
            eta = elapsed / (idx + 1) * (len(lessons) - idx - 1)
            print(f"  OK {result['size_kb']:.0f}KB {result['lines']}/{n} | ETA:{eta/60:.1f}m")
            results.append(result)
        else:
            print(f"  FAIL")
        print()
    
    elapsed = time.time() - start_time
    total_size = sum(r['size_kb'] for r in results) / 1024
    print(f"{'='*60}")
    print(f"Done: {len(results)}/{len(lessons)} | {total_size:.1f}MB | {elapsed/60:.1f}min")

if __name__ == "__main__":
    asyncio.run(main())
