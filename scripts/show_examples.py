import json
import re

with open(r'I:\新概念英语练习王\scripts\parsed_dialogues_v2.json', 'r', encoding='utf-8') as f:
    pdf_data = json.load(f)

with open(r'I:\新概念英语练习王\src\data\lessons\completeLessons.ts', 'r', encoding='utf-8') as f:
    ts_content = f.read()

existing_lessons = {}
lesson_pattern = re.compile(r'id:\s*(\d+),\s*\n\s*title:\s*[\'"]([^\'"]+)[\'"]')
lesson_starts = [(m.start(), int(m.group(1)), m.group(2)) for m in lesson_pattern.finditer(ts_content)]
for i, (pos, lesson_id, title) in enumerate(lesson_starts):
    end_pos = lesson_starts[i + 1][0] if i + 1 < len(lesson_starts) else len(ts_content)
    lesson_block = ts_content[pos:end_pos]
    para_matches = re.findall(r'\{\s*speaker:\s*[\'"]([^\'"]+)[\'"],\s*content:\s*[\'"]([^\'"]+)[\'"]\s*\}', lesson_block)
    existing_lessons[lesson_id] = {'title': title, 'paragraphs': [c for _, c in para_matches]}

# Category 1: Dialogue very incomplete (existing << PDF)
print("="*70)
print("类型1: 代码中对话严重不完整（PDF有更多内容）")
print("="*70)

examples_1 = [31, 52, 101, 129, 131, 141]
for ln in examples_1:
    ln_str = str(ln)
    print(f"\n--- Lesson {ln}: {existing_lessons.get(ln, {}).get('title', 'N/A')} ---")
    
    if ln in existing_lessons:
        print(f"  代码中 ({len(existing_lessons[ln]['paragraphs'])} 行):")
        for p in existing_lessons[ln]['paragraphs'][:4]:
            print(f"    {p}")
        if len(existing_lessons[ln]['paragraphs']) > 4:
            print(f"    ... (共{len(existing_lessons[ln]['paragraphs'])}行)")
    
    if ln_str in pdf_data:
        pdf_lines = [item['content'] for item in pdf_data[ln_str]]
        print(f"  PDF中 ({len(pdf_lines)} 行):")
        for p in pdf_lines[:4]:
            print(f"    {p}")
        if len(pdf_lines) > 4:
            print(f"    ... (共{len(pdf_lines)}行)")

# Category 2: Content completely different
print("\n" + "="*70)
print("类型2: 内容完全不同")
print("="*70)

examples_2 = [7, 119, 143]
for ln in examples_2:
    ln_str = str(ln)
    print(f"\n--- Lesson {ln}: {existing_lessons.get(ln, {}).get('title', 'N/A')} ---")
    
    if ln in existing_lessons:
        print(f"  代码中:")
        for p in existing_lessons[ln]['paragraphs'][:3]:
            print(f"    {p}")
    
    if ln_str in pdf_data:
        pdf_lines = [item['content'] for item in pdf_data[ln_str]]
        print(f"  PDF中:")
        for p in pdf_lines[:3]:
            print(f"    {p}")

# Category 3: Minor differences
print("\n" + "="*70)
print("类型3: 微小差异（缩写形式、行拆分等）")
print("="*70)

examples_3 = [5, 9, 13]
for ln in examples_3:
    ln_str = str(ln)
    print(f"\n--- Lesson {ln}: {existing_lessons.get(ln, {}).get('title', 'N/A')} ---")
    
    if ln in existing_lessons and ln_str in pdf_data:
        existing = existing_lessons[ln]['paragraphs']
        pdf_lines = [item['content'] for item in pdf_data[ln_str]]
        
        print(f"  代码 vs PDF (前5行):")
        for i in range(min(5, max(len(existing), len(pdf_lines)))):
            e = existing[i] if i < len(existing) else '(缺失)'
            p = pdf_lines[i] if i < len(pdf_lines) else '(缺失)'
            match = '✓' if e.lower().replace("'", "").replace('"', '') == p.lower().replace("'", "").replace('"', '') else '✗'
            if match == '✗':
                print(f"    {match} 代码: {e}")
                print(f"      PDF:  {p}")
            else:
                print(f"    {match} {e}")

# Category 4: Missing in TS
print("\n" + "="*70)
print("类型4: 代码中完全缺失的课程（示例）")
print("="*70)

missing_in_ts = [20, 24, 39, 57, 64, 69, 72, 85, 87, 105, 109, 113, 123, 125, 127, 135, 137, 139]
for ln in missing_in_ts[:8]:
    ln_str = str(ln)
    if ln_str in pdf_data:
        pdf_lines = [item['content'] for item in pdf_data[ln_str]]
        print(f"\n  Lesson {ln}: PDF中有 {len(pdf_lines)} 行对话")
        for p in pdf_lines[:3]:
            print(f"    {p}")
        if len(pdf_lines) > 3:
            print(f"    ... (共{len(pdf_lines)}行)")
