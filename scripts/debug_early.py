import json
import re

with open(r'I:\新概念英语练习王\scripts\ocr_output.json', 'r', encoding='utf-8') as f:
    all_pages = json.load(f)

page_dict = {p['page']: p['lines'] for p in all_pages}

lesson_pages = {}
for page_data in all_pages:
    page_num = page_data['page']
    lines = page_data['lines']
    if page_num <= 4:
        continue
    for line in lines:
        m = re.match(r'^Lesson\s+(\d+)', line)
        if m:
            ln = int(m.group(1))
            if ln not in lesson_pages:
                lesson_pages[ln] = []
            if page_num not in lesson_pages[ln]:
                lesson_pages[ln].append(page_num)

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

for ln in [3, 5, 7, 9, 11, 13, 15, 21, 31, 41]:
    print(f"\n{'='*60}")
    print(f"LESSON {ln}")
    if ln in lesson_pages:
        for p in lesson_pages[ln]:
            lines = page_dict.get(p, [])
            full = ' '.join(lines)
            if 'Listen to the tape' in full or 'Listen to the' in full or '回答问题' in full:
                print(f"PDF (page {p}):")
                in_d = False
                for line in lines:
                    if 'Listen to the tape' in line or 'Listen to the' in line or '回答问题' in line:
                        in_d = True
                        continue
                    if in_d:
                        if re.match(r'^(New words|Written|Notes|课文注释|生词|书面|参考译文|Key structures|Lesson \d+$)', line):
                            break
                        line = line.strip()
                        if line and not re.match(r'^\d+$', line):
                            print(f"  {line}")
                break
    if ln in existing_lessons:
        print(f"\nExisting:")
        for p in existing_lessons[ln]['paragraphs']:
            print(f"  {p}")
