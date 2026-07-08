import json
import re

with open(r'I:\新概念英语练习王\scripts\parsed_dialogues_v2.json', 'r', encoding='utf-8') as f:
    pdf_data = json.load(f)

with open(r'I:\新概念英语练习王\src\data\lessons\completeLessons.ts', 'r', encoding='utf-8') as f:
    ts_content = f.read()

# Extract existing lesson paragraphs
existing_lessons = {}
lesson_pattern = re.compile(r'id:\s*(\d+),\s*\n\s*title:\s*[\'"]([^\'"]+)[\'"]')
lesson_starts = [(m.start(), int(m.group(1)), m.group(2)) for m in lesson_pattern.finditer(ts_content)]
for i, (pos, lesson_id, title) in enumerate(lesson_starts):
    end_pos = lesson_starts[i + 1][0] if i + 1 < len(lesson_starts) else len(ts_content)
    lesson_block = ts_content[pos:end_pos]
    para_matches = re.findall(r'\{\s*speaker:\s*[\'"]([^\'"]+)[\'"],\s*content:\s*[\'"]([^\'"]+)[\'"]\s*\}', lesson_block)
    existing_lessons[lesson_id] = {'title': title, 'paragraphs': [c for _, c in para_matches]}

def normalize(text):
    text = text.strip().lower()
    text = re.sub(r'\s+', ' ', text)
    text = text.replace('"', "'").replace('"', "'")
    return text

def expand_contractions(text):
    pairs = [
        (" he's ", " he is "), (" she's ", " she is "), (" it's ", " it is "),
        (" i'm ", " i am "), (" you're ", " you are "), (" we're ", " we are "),
        (" they're ", " they are "), (" that's ", " that is "), (" what's ", " what is "),
        (" where's ", " where is "), (" who's ", " who is "), (" there's ", " there is "),
        (" isn't ", " is not "), (" aren't ", " are not "), (" don't ", " do not "),
        (" doesn't ", " does not "), (" didn't ", " did not "), (" can't ", " cannot "),
        (" won't ", " will not "), (" wouldn't ", " would not "), (" shouldn't ", " should not "),
        (" haven't ", " have not "), (" hasn't ", " has not "), (" hadn't ", " had not "),
        (" wasn't ", " was not "), (" weren't ", " were not "), (" let's ", " let us "),
        (" he'd ", " he would "), (" she'd ", " she would "), (" i'd ", " i would "),
        (" you'd ", " you would "), (" we'd ", " we would "), (" they'd ", " they would "),
        (" he'll ", " he will "), (" she'll ", " she will "), (" i'll ", " i will "),
        (" you'll ", " you will "), (" we'll ", " we will "), (" they'll ", " they will "),
    ]
    for old, new in pairs:
        text = text.replace(old, new)
    return text

# Categorize all lessons
batch_data = []

for ln in range(1, 145):
    ln_str = str(ln)
    
    if ln not in existing_lessons:
        continue
    if ln_str not in pdf_data:
        continue
    
    existing_paras = existing_lessons[ln]['paragraphs']
    pdf_lines = [item['content'] for item in pdf_data[ln_str]]
    
    e_norm = [normalize(p) for p in existing_paras]
    p_norm = [normalize(l) for l in pdf_lines]
    
    # Check if PDF has garbage data (exercise tables)
    is_garbage = False
    if len(pdf_lines) == 1 and len(pdf_lines[0]) > 200:
        is_garbage = True
    if any(re.search(r'(1st|2nd|3rd|4th|5th)', line) and re.search(r'(6th|7th|8th|9th|10th)', line) for line in pdf_lines):
        is_garbage = True
    
    # Determine category
    if e_norm == p_norm:
        category = 'exact_match'
    elif len(e_norm) == len(p_norm):
        e_exp = [expand_contractions(e) for e in e_norm]
        p_exp = [expand_contractions(p) for p in p_norm]
        if e_exp == p_exp:
            category = 'contraction_diff'
        else:
            diffs = sum(1 for e, p in zip(e_exp, p_exp) if e != p)
            category = 'minor_diff' if diffs <= 2 else 'major_diff'
    else:
        e_joined = ' '.join(e_norm)
        p_joined = ' '.join(p_norm)
        e_exp = expand_contractions(e_joined)
        p_exp = expand_contractions(p_joined)
        if e_exp == p_exp or e_exp.replace(' ', '') == p_exp.replace(' ', ''):
            category = 'contraction_diff'
        else:
            category = 'major_diff'
    
    # Check if existing has empty/very short dialogue
    is_empty = len(existing_paras) == 0
    is_very_short = len(existing_paras) <= 3 and len(pdf_lines) > 5
    
    batch_data.append({
        'lesson': ln,
        'title': existing_lessons[ln]['title'],
        'category': category,
        'existing_count': len(existing_paras),
        'pdf_count': len(pdf_lines),
        'is_empty': is_empty,
        'is_very_short': is_very_short,
        'is_garbage': is_garbage,
        'existing': existing_paras,
        'pdf': pdf_lines
    })

# Print summary
print("="*70)
print("完整分类统计")
print("="*70)

cats = {}
for item in batch_data:
    cat = item['category']
    if cat not in cats:
        cats[cat] = []
    cats[cat].append(item)

for cat in ['exact_match', 'contraction_diff', 'minor_diff', 'major_diff']:
    items = cats.get(cat, [])
    print(f"\n{cat}: {len(items)}课")
    if cat == 'major_diff':
        # Sub-categorize major diffs
        empty = [i for i in items if i['is_empty']]
        very_short = [i for i in items if i['is_very_short'] and not i['is_empty']]
        garbage = [i for i in items if i['is_garbage']]
        real_diff = [i for i in items if not i['is_empty'] and not i['is_very_short'] and not i['is_garbage']]
        
        print(f"  - 对话为空: {len(empty)}课 (Lessons: {[i['lesson'] for i in empty]})")
        print(f"  - 对话极短(<=3行)但PDF有更多: {len(very_short)}课")
        print(f"  - PDF为OCR垃圾数据: {len(garbage)}课")
        print(f"  - 真正的内容差异: {len(real_diff)}课")
        
        # Show real diffs
        print(f"\n  真正需要修复的课程:")
        for item in real_diff[:20]:
            print(f"    L{item['lesson']}: existing={item['existing_count']}行, PDF={item['pdf_count']}行 - {item['title']}")

# Save full data
with open(r'I:\新概念英语练习王\scripts\batch_data.json', 'w', encoding='utf-8') as f:
    json.dump(batch_data, f, ensure_ascii=False, indent=2)

print(f"\n详细数据已保存到 batch_data.json")
