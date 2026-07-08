import json
import re

# Load OCR output
with open(r'I:\新概念英语练习王\scripts\ocr_output.json', 'r', encoding='utf-8') as f:
    all_pages = json.load(f)

page_dict = {p['page']: p['lines'] for p in all_pages}

# Better lesson extraction: for each lesson, find ALL content pages
lesson_content_pages = {}
for page_data in all_pages:
    page_num = page_data['page']
    lines = page_data['lines']
    
    if page_num <= 4:
        continue
    
    for line in lines:
        m = re.match(r'^Lesson\s+(\d+)', line)
        if m:
            ln = int(m.group(1))
            if ln not in lesson_content_pages:
                lesson_content_pages[ln] = []
            if page_num not in lesson_content_pages[ln]:
                lesson_content_pages[ln].append(page_num)

def extract_dialogue_properly(lesson_num):
    """Extract dialogue from the lesson's first content page (dialogue page)."""
    if lesson_num not in lesson_content_pages:
        return []
    
    pages = lesson_content_pages[lesson_num]
    # The dialogue page is usually the first content page
    for page_num in pages:
        lines = page_dict.get(page_num, [])
        full_text = ' '.join(lines)
        
        # This is the dialogue page if it has "Listen to the tape" or dialogue content
        if 'Listen to the tape' in full_text or 'listen to the tape' in full_text.lower() or 'Listen to the' in full_text:
            dialogue = []
            in_dialogue = False
            
            for line in lines:
                if 'Listen to the tape' in line or 'listen to the tape' in line.lower() or '回答问题' in line:
                    in_dialogue = True
                    continue
                
                if in_dialogue:
                    # Stop at non-dialogue sections
                    if re.match(r'^(New words|Written|Notes|Lesson \d+$|课文注释|生词|书面|参考译文|Key structures|Special difficulties|Multiple choice)', line):
                        break
                    
                    line = line.strip()
                    if not line:
                        continue
                    
                    # Skip OCR noise: numbers, labels, artifacts
                    if re.match(r'^\d+$', line):
                        continue
                    if re.match(r'^[A-Z\s]+$', line) and len(line) < 3:
                        continue
                    
                    dialogue.append(line)
            
            return dialogue
    
    return []

# Now extract ALL lesson dialogues from PDF
pdf_lessons = {}
for ln in range(1, 145):
    dialogue = extract_dialogue_properly(ln)
    if dialogue:
        pdf_lessons[ln] = dialogue

print(f"Extracted dialogue for {len(pdf_lessons)} lessons from PDF")

# Load existing completeLessons.ts
with open(r'I:\新概念英语练习王\src\data\lessons\completeLessons.ts', 'r', encoding='utf-8') as f:
    ts_content = f.read()

# Extract paragraphs from each lesson
existing_lessons = {}
lesson_pattern = re.compile(r'id:\s*(\d+),\s*\n\s*title:\s*[\'"]([^\'"]+)[\'"]')
lesson_starts = [(m.start(), int(m.group(1)), m.group(2)) for m in lesson_pattern.finditer(ts_content)]

for i, (pos, lesson_id, title) in enumerate(lesson_starts):
    if i + 1 < len(lesson_starts):
        end_pos = lesson_starts[i + 1][0]
    else:
        end_pos = len(ts_content)
    
    lesson_block = ts_content[pos:end_pos]
    para_matches = re.findall(
        r'\{\s*speaker:\s*[\'"]([^\'"]+)[\'"],\s*content:\s*[\'"]([^\'"]+)[\'"]\s*\}',
        lesson_block
    )
    existing_lessons[lesson_id] = {
        'title': title,
        'paragraphs': [c for _, c in para_matches]
    }

print(f"Loaded {len(existing_lessons)} lessons from completeLessons.ts")

# Detailed comparison
def normalize(text):
    text = text.strip()
    text = re.sub(r'\s+', ' ', text)
    text = text.replace('"', "'").replace('"', "'").replace('"', '"').replace('"', '"')
    text = text.replace('…', '...').replace('…', '...')
    text = text.replace(''', "'").replace(''', "'")
    return text.lower()

# Categorize differences
categories = {
    'perfect_match': [],      # Exact match
    'contraction_diff': [],   # Only contractions differ (He is vs He's)
    'line_split_diff': [],    # Lines split differently
    'content_diff': [],       # Actual content differences
    'major_diff': [],         # Completely different content
    'missing_in_ts': [],      # In PDF but not in completeLessons.ts
    'missing_in_pdf': [],     # In completeLessons.ts but not in PDF
}

for ln in range(1, 145):
    if ln not in existing_lessons:
        if ln in pdf_lessons:
            categories['missing_in_ts'].append(ln)
        continue
    
    if ln not in pdf_lessons:
        categories['missing_in_pdf'].append(ln)
        continue
    
    existing_paras = existing_lessons[ln]['paragraphs']
    pdf_lines = pdf_lessons[ln]
    
    # Clean PDF lines: remove speaker labels for content comparison
    pdf_clean = []
    for line in pdf_lines:
        # Remove speaker label patterns
        cleaned = re.sub(r'^[A-Z\s\.]+:\s*', '', line)
        cleaned = cleaned.strip()
        if cleaned:
            pdf_clean.append(cleaned)
    
    existing_norm = [normalize(p) for p in existing_paras]
    pdf_norm = [normalize(l) for l in pdf_clean]
    
    # Compare
    if existing_norm == pdf_norm:
        categories['perfect_match'].append(ln)
    elif len(existing_norm) == len(pdf_norm):
        # Same number of lines, check individual diffs
        contractions_only = True
        for e, p in zip(existing_norm, pdf_norm):
            if e != p:
                # Check if it's just contractions
                e_no_contract = e.replace(" he's ", " he is ").replace(" she's ", " she is ").replace(" it's ", " it is ").replace(" i'm ", " i am ").replace(" you're ", " you are ").replace(" we're ", " we are ").replace(" they're ", " they are ").replace(" that's ", " that is ").replace(" what's ", " what is ").replace(" where's ", " where is ").replace(" who's ", " who is ").replace(" there's ", " there is ").replace(" isn't ", " is not ").replace(" aren't ", " are not ").replace(" don't ", " do not ").replace(" doesn't ", " does not ").replace(" didn't ", " did not ").replace(" can't ", " cannot ").replace(" won't ", " will not ").replace(" wouldn't ", " would not ").replace(" shouldn't ", " should not ").replace(" haven't ", " have not ").replace(" hasn't ", " has not ").replace(" hadn't ", " had not ").replace(" wasn't ", " was not ").replace(" weren't ", " were not ").replace(" let's ", " let us ")
                p_no_contract = p.replace(" he's ", " he is ").replace(" she's ", " she is ").replace(" it's ", " it is ").replace(" i'm ", " i am ").replace(" you're ", " you are ").replace(" we're ", " we are ").replace(" they're ", " they are ").replace(" that's ", " that is ").replace(" what's ", " what is ").replace(" where's ", " where is ").replace(" who's ", " who is ").replace(" there's ", " there is ").replace(" isn't ", " is not ").replace(" aren't ", " are not ").replace(" don't ", " do not ").replace(" doesn't ", " does not ").replace(" didn't ", " did not ").replace(" can't ", " cannot ").replace(" won't ", " will not ").replace(" wouldn't ", " would not ").replace(" shouldn't ", " should not ").replace(" haven't ", " have not ").replace(" hasn't ", " has not ").replace(" hadn't ", " had not ").replace(" wasn't ", " was not ").replace(" weren't ", " were not ").replace(" let's ", " let us ")
                if e_no_contract != p_no_contract:
                    contractions_only = False
                    break
        
        if contractions_only:
            categories['contraction_diff'].append(ln)
        else:
            categories['content_diff'].append(ln)
    else:
        # Different line counts
        # Check if it's just line splitting
        existing_joined = ' '.join(existing_norm)
        pdf_joined = ' '.join(pdf_norm)
        
        if existing_joined == pdf_joined:
            categories['line_split_diff'].append(ln)
        elif existing_joined.replace(" ", "") == pdf_joined.replace(" ", ""):
            categories['line_split_diff'].append(ln)
        else:
            # Check similarity
            # Remove spaces and compare
            e_chars = existing_joined.replace(' ', '')
            p_chars = pdf_joined.replace(' ', '')
            
            # Simple similarity: check if shorter is contained in longer
            if e_chars in p_chars or p_chars in e_chars:
                categories['line_split_diff'].append(ln)
            else:
                categories['major_diff'].append(ln)

# Print summary
print("\n" + "="*70)
print("COMPARISON SUMMARY")
print("="*70)
for cat, items in categories.items():
    print(f"\n{cat}: {len(items)} lessons")
    if items and len(items) <= 20:
        print(f"  Lessons: {items}")
    elif items:
        print(f"  First 10: {items[:10]}")

# Save detailed report
report = {
    'summary': {cat: len(items) for cat, items in categories.items()},
    'details': {cat: items for cat, items in categories.items()}
}

with open(r'I:\新概念英语练习王\scripts\comparison_report.json', 'w', encoding='utf-8') as f:
    json.dump(report, f, ensure_ascii=False, indent=2)

print(f"\nReport saved to comparison_report.json")
