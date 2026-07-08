import json
import re

# Load parsed dialogues
with open(r'I:\新概念英语练习王\scripts\parsed_dialogues_v2.json', 'r', encoding='utf-8') as f:
    pdf_data = json.load(f)

# Load existing
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

def normalize(text):
    text = text.strip().lower()
    text = re.sub(r'\s+', ' ', text)
    text = text.replace('"', "'").replace('"', "'").replace('"', '"').replace('"', '"')
    text = text.replace('…', '...').replace(''', "'").replace(''', "'")
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

# Categorize
categories = {
    'exact_match': [],
    'contraction_diff': [],  # Content identical except contractions
    'minor_diff': [],        # Small differences (1-2 lines)
    'major_diff': [],        # Significant differences
    'missing_in_ts': [],     # In PDF but not in completeLessons.ts
    'missing_in_pdf': [],    # In completeLessons.ts but no PDF dialogue
}

details = []

for ln in range(1, 145):
    ln_str = str(ln)
    
    if ln not in existing_lessons:
        if ln_str in pdf_data:
            categories['missing_in_ts'].append(ln)
        continue
    
    if ln_str not in pdf_data:
        categories['missing_in_pdf'].append(ln)
        continue
    
    existing_paras = existing_lessons[ln]['paragraphs']
    pdf_lines = [item['content'] for item in pdf_data[ln_str]]
    
    e_norm = [normalize(p) for p in existing_paras]
    p_norm = [normalize(l) for l in pdf_lines]
    
    # Exact match
    if e_norm == p_norm:
        categories['exact_match'].append(ln)
        continue
    
    # Same length - check if contraction difference
    if len(e_norm) == len(p_norm):
        e_exp = [expand_contractions(e) for e in e_norm]
        p_exp = [expand_contractions(p) for p in p_norm]
        
        if e_exp == p_exp:
            categories['contraction_diff'].append(ln)
            continue
        
        # Count differing lines
        diffs = sum(1 for e, p in zip(e_exp, p_exp) if e != p)
        if diffs <= 2:
            categories['minor_diff'].append(ln)
        else:
            categories['major_diff'].append(ln)
            details.append(f"L{ln}: same count={len(e_norm)}, {diffs} lines differ")
    else:
        # Different line counts
        e_joined = ' '.join(e_norm)
        p_joined = ' '.join(p_norm)
        e_exp = expand_contractions(e_joined)
        p_exp = expand_contractions(p_joined)
        
        if e_exp == p_exp or e_exp.replace(' ', '') == p_exp.replace(' ', ''):
            categories['contraction_diff'].append(ln)
        else:
            categories['major_diff'].append(ln)
            details.append(f"L{ln}: existing={len(e_norm)} lines, PDF={len(p_norm)} lines")

# Print summary
print("="*60)
print("FINAL COMPARISON REPORT")
print("="*60)

total = sum(len(v) for v in categories.values())
print(f"\nTotal lessons analyzed: {total}")
print(f"\nCategory breakdown:")
for cat, items in categories.items():
    pct = len(items) / total * 100 if total > 0 else 0
    print(f"  {cat}: {len(items)} ({pct:.1f}%)")
    if items and len(items) <= 15:
        print(f"    Lessons: {items}")

print(f"\n--- Detailed Issues ({len(details)}) ---")
for d in details[:50]:
    print(f"  {d}")

# Save report
report = {
    'summary': {cat: len(items) for cat, items in categories.items()},
    'details': {
        'exact_match': categories['exact_match'],
        'contraction_diff': categories['contraction_diff'],
        'minor_diff': categories['minor_diff'],
        'major_diff': categories['major_diff'],
        'missing_in_ts': categories['missing_in_ts'],
        'missing_in_pdf': categories['missing_in_pdf'],
    },
    'issues': details
}

with open(r'I:\新概念英语练习王\scripts\final_report.json', 'w', encoding='utf-8') as f:
    json.dump(report, f, ensure_ascii=False, indent=2)

print(f"\nReport saved to final_report.json")
