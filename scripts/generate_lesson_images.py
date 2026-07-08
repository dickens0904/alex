"""
新概念英语练习王 - 批量课文配图生成
使用 sn-image-base 为每课生成卡通水彩风格插图
"""
import sys
import os
import json
import re
import asyncio
import time
import argparse

sys.path.insert(0, os.path.join(os.path.expanduser('~'), '.qclaw', 'skills', 'sn-image-base', 'scripts'))

from sn_agent_runner import run_image_generate, build_parser

# 课文数据
LESSON_TITLES = {}
LESSON_SCENES = {}

def load_lesson_data():
    """从 completeLessons.ts 提取课文标题和对话场景"""
    ts_path = r'I:\新概念英语练习王\src\data\lessons\completeLessons.ts'
    with open(ts_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    blocks = re.split(r'//\s*Lesson\s+(\d+):', content)
    for i in range(1, len(blocks), 2):
        lid = int(blocks[i])
        block = blocks[i+1]
        
        title_match = re.search(r"title:\s*'([^']+)'", block)
        title = title_match.group(1) if title_match else f"Lesson {lid}"
        LESSON_TITLES[lid] = title
        
        # 提取对话
        paras = re.findall(r"""speaker:\s*['"]([^'"]+)['"],\s*content:\s*["'](.+?)["']\s*[,}]""", block)
        dialogue = [f"{s}: {c}" for s, c in paras]
        LESSON_SCENES[lid] = dialogue

def generate_prompt(lid: int) -> str:
    """为指定课程生成图像提示词"""
    title = LESSON_TITLES.get(lid, f"Lesson {lid}")
    dialogue = LESSON_SCENES.get(lid, [])
    
    # 提取英文标题
    en_title = re.sub(r'Lesson \d+:\s*', '', title)
    en_title = re.sub(r'\s*[\u4e00-\u9fff].*', '', en_title).strip()
    
    # 从对话中提取场景描述
    scene_lines = dialogue[:6]  # 取前6句
    scene_text = ' '.join(scene_lines)
    
    prompt = f"""Children's English textbook illustration for New Concept English.
Style: Cute cartoon watercolor, bright colors, child-friendly, educational.
Scene: {en_title}
Dialogue context: {scene_text}
Characters should be expressive and the scene should clearly represent the dialogue content.
No text overlays, clean background, 16:9 aspect ratio."""
    
    return prompt

async def generate_image(lid: int, output_dir: str) -> dict:
    """生成单课配图"""
    prompt = generate_prompt(lid)
    output_path = os.path.join(output_dir, f"lesson-{lid}.jpg")
    
    # 跳过已存在的真实图片（>200KB视为已生成）
    if os.path.exists(output_path):
        size = os.path.getsize(output_path)
        if size > 200000:
            return {'id': lid, 'status': 'skipped', 'reason': 'exists'}
    
    try:
        # 构建参数
        parser = build_parser()
        args = parser.parse_args([
            'sn-image-generate',
            '--prompt', prompt,
            '--image-size', '2k',
            '--aspect-ratio', '16:9',
            '--save-path', output_path
        ])
        
        # 设置API key
        if not args.api_key:
            args.api_key = os.environ.get('SN_API_KEY', '')
        
        result, exit_code = await run_image_generate(args)
        
        if exit_code == 0:
            return {'id': lid, 'status': 'ok', 'path': output_path}
        else:
            error = result.get('error', 'Unknown error')
            return {'id': lid, 'status': 'error', 'error': str(error)[:100]}
    except Exception as e:
        return {'id': lid, 'status': 'error', 'error': str(e)[:100]}

async def main():
    output_dir = r'I:\新概念英语练习王\src\assets\images\lessons'
    os.makedirs(output_dir, exist_ok=True)
    
    start_id = int(sys.argv[1]) if len(sys.argv) > 1 else 1
    end_id = int(sys.argv[2]) if len(sys.argv) > 2 else 144
    
    print(f"Loading lesson data...")
    load_lesson_data()
    
    lesson_ids = [lid for lid in range(start_id, end_id + 1) if lid in LESSON_TITLES]
    print(f"  {len(lesson_ids)} lessons to process")
    print(f"  Output: {output_dir}")
    print()
    
    results = []
    start_time = time.time()
    
    for idx, lid in enumerate(lesson_ids):
        print(f"[{idx+1}/{len(lesson_ids)}] Lesson {lid}: {LESSON_TITLES.get(lid, '')[:50]}")
        
        result = await generate_image(lid, output_dir)
        results.append(result)
        
        if result['status'] == 'ok':
            elapsed = time.time() - start_time
            eta = elapsed / (idx + 1) * (len(lesson_ids) - idx - 1)
            print(f"  OK | ETA: {eta/60:.1f}min")
        elif result['status'] == 'skipped':
            print(f"  Skipped: {result['reason']}")
        else:
            print(f"  Error: {result['error'][:60]}")
        print()
    
    elapsed = time.time() - start_time
    ok_count = sum(1 for r in results if r['status'] == 'ok')
    skip_count = sum(1 for r in results if r['status'] == 'skipped')
    err_count = sum(1 for r in results if r['status'] == 'error')
    
    print(f"{'='*60}")
    print(f"Done: {ok_count} generated, {skip_count} skipped, {err_count} errors")
    print(f"Time: {elapsed/60:.1f} min")

if __name__ == '__main__':
    asyncio.run(main())
