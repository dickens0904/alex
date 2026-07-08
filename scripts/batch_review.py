import json
import re

with open(r'I:\新概念英语练习王\scripts\parsed_dialogues_v2.json', 'r', encoding='utf-8') as f:
    pdf_data = json.load(f)

with open(r'I:\新概念英语练习王\src\data\lessons\completeLessons.ts', 'r', encoding='utf-8') as f:
    ts_content = f.read()

existing_ids = set()
for m in re.finditer(r'id:\s*(\d+)', ts_content):
    existing_ids.add(int(m.group(1)))

# Get missing lessons
missing = []
for ln in range(1, 145):
    ln_str = str(ln)
    if ln not in existing_ids and ln_str in pdf_data:
        lines = [item['content'] for item in pdf_data[ln_str]]
        # Filter out OCR garbage (review lessons with exercise tables)
        # Check if content looks like real dialogue vs exercise data
        is_garbage = False
        if len(lines) == 1:
            line = lines[0]
            # Exercise tables often have numbers, dates, or vocabulary lists
            if re.match(r'^\d', line) and len(line) > 100:
                is_garbage = True
            if re.search(r'(1st|2nd|3rd|4th|5th|6th|7th|8th|9th|10th)', line):
                is_garbage = True
        
        missing.append({
            'lesson': ln,
            'line_count': len(lines),
            'lines': lines,
            'is_garbage': is_garbage
        })

# Print batch 1: Missing lessons (first 15)
print("="*70)
print("第1批：缺失课程（共{}课）".format(len(missing)))
print("="*70)

for item in missing:
    ln = item['lesson']
    lines = item['lines']
    flag = ' [OCR垃圾数据-建议跳过]' if item['is_garbage'] else ''
    print(f"\nLesson {ln} ({item['line_count']}行){flag}:")
    for line in lines[:5]:
        print(f"  {line}")
    if len(lines) > 5:
        print(f"  ... (共{len(lines)}行)")
