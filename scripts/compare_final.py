import json
import re

# Load OCR-extracted PDF dialogues
with open(r'I:\新概念英语练习王\scripts\ocr_output.json', 'r', encoding='utf-8') as f:
    all_pages = json.load(f)

page_dict = {p['page']: p['lines'] for p in all_pages}

# Build dialogue page mapping
lesson_dialogue_pages = {}
for page_data in all_pages:
    page_num = page_data['page']
    lines = page_data['lines']
    full_text = ' '.join(lines)
    if page_num <= 4:
        continue
    lesson_match = re.search(r'Lesson\s+(\d+)', full_text)
    if not lesson_match:
        continue
    lesson_num = int(lesson_match.group(1))
    if 'Listen to the tape' in full_text or 'listen to the tape' in full_text.lower() or 'Listen to the' in full_text:
        if lesson_num not in lesson_dialogue_pages:
            lesson_dialogue_pages[lesson_num] = page_num

def clean_line(line):
    """Clean OCR artifacts from a line."""
    # Remove speaker labels like "MR. BLAKE :" -> keep content after
    # But also keep the speaker info for comparison
    line = line.strip()
    # Remove trailing numbers (page numbers)
    line = re.sub(r'\s+\d+$', '', line)
    # Normalize whitespace
    line = re.sub(r'\s+', ' ', line)
    return line

def extract_pdf_dialogue(lesson_num):
    """Extract clean dialogue from PDF OCR for a lesson."""
    if lesson_num not in lesson_dialogue_pages:
        return []
    
    page_num = lesson_dialogue_pages[lesson_num]
    lines = page_dict.get(page_num, [])
    
    dialogue_lines = []
    in_dialogue = False
    
    for line in lines:
        if 'Listen to the tape' in line or 'listen to the tape' in line.lower() or '回答问题' in line:
            in_dialogue = True
            continue
        if in_dialogue:
            if re.match(r'^(New words|Written|Notes on|Exercise|Lesson \d+$|课文注释|生词|书面|参考译文)', line):
                break
            line = clean_line(line)
            if not line or line.startswith('?') or line.startswith('？'):
                continue
            # Skip lines that are just the question
            if re.match(r'^[A-Z\s]+\?$', line):
                continue
            dialogue_lines.append(line)
    
    return dialogue_lines

# Extract dialogue from completeLessons.ts
with open(r'I:\新概念英语练习王\src\data\lessons\completeLessons.ts', 'r', encoding='utf-8') as f:
    ts_content = f.read()

# Parse paragraphs using regex
# Pattern: { speaker: 'XXX', content: 'YYY' }
existing_lessons = {}
# Find all lesson blocks
lesson_pattern = re.compile(
    r'id:\s*(\d+),\s*\n\s*title:\s*[\'"]([^\'"]+)[\'"]',
)
lesson_starts = [(m.start(), int(m.group(1)), m.group(2)) for m in lesson_pattern.finditer(ts_content)]

for i, (pos, lesson_id, title) in enumerate(lesson_starts):
    # Find the end of this lesson block
    if i + 1 < len(lesson_starts):
        end_pos = lesson_starts[i + 1][0]
    else:
        end_pos = len(ts_content)
    
    lesson_block = ts_content[pos:end_pos]
    
    # Extract paragraphs
    para_matches = re.findall(
        r'\{\s*speaker:\s*[\'"]([^\'"]+)[\'"],\s*content:\s*[\'"]([^\'"]+)[\'"]\s*\}',
        lesson_block
    )
    
    existing_lessons[lesson_id] = {
        'title': title,
        'paragraphs': [(s, c) for s, c in para_matches]
    }

print(f"Loaded {len(existing_lessons)} lessons from completeLessons.ts")
print(f"Found dialogue pages for {len(lesson_dialogue_pages)} lessons in PDF")

# Now compare!
print("\n" + "="*70)
print("COMPARISON: PDF (OCR) vs completeLessons.ts")
print("="*70)

mismatches = []
missing_pdf = []
good_matches = 0
minor_diffs = 0

for lesson_id in sorted(existing_lessons.keys()):
    if lesson_id > 144:
        continue
    
    existing = existing_lessons[lesson_id]
    pdf_lines = extract_pdf_dialogue(lesson_id)
    
    if not pdf_lines:
        missing_pdf.append(lesson_id)
        continue
    
    # Get existing content lines (just the content, not speakers)
    existing_content = [c for _, c in existing['paragraphs']]
    
    # Compare: normalize both sides
    def normalize(text):
        text = text.strip()
        text = re.sub(r'\s+', ' ', text)
        text = text.replace('"', "'").replace('"', "'").replace('"', '"').replace('"', '"')
        text = text.replace('...', '…')
        return text.lower()
    
    existing_norm = [normalize(c) for c in existing_content]
    
    # Clean PDF lines: extract just the dialogue content (remove speaker labels for comparison)
    pdf_dialogue_only = []
    for line in pdf_lines:
        # Remove speaker label patterns like "MR. BLAKE :" or "JACK :"
        cleaned = re.sub(r'^[A-Z\s\.]+:\s*', '', line)
        cleaned = re.sub(r'^[A-Z\s\.]+:\s*', '', cleaned)
        if cleaned.strip():
            pdf_dialogue_only.append(cleaned.strip())
    
    pdf_norm = [normalize(l) for l in pdf_dialogue_only]
    
    # Simple comparison: check if content lines match
    if len(existing_norm) != len(pdf_norm):
        mismatches.append({
            'lesson': lesson_id,
            'title': existing['title'],
            'issue': f'Line count differs: existing={len(existing_norm)}, PDF={len(pdf_norm)}',
            'existing': existing_content[:5],
            'pdf': pdf_dialogue_only[:5]
        })
    else:
        # Check each line
        line_diffs = []
        for j, (e, p) in enumerate(zip(existing_norm, pdf_norm)):
            if e != p:
                # Check similarity
                if e.replace(' ', '') == p.replace(' ', ''):
                    continue  # Just spacing difference
                line_diffs.append((j, existing_content[j], pdf_dialogue_only[j]))
        
        if line_diffs:
            minor_diffs += 1
            if len(line_diffs) <= 3:
                mismatches.append({
                    'lesson': lesson_id,
                    'title': existing['title'],
                    'issue': f'{len(line_diffs)} line(s) differ',
                    'diffs': [(j, e, p) for j, e, p in line_diffs]
                })
        else:
            good_matches += 1

print(f"\nResults:")
print(f"  Good matches: {good_matches}")
print(f"  Minor differences: {minor_diffs}")
print(f"  Significant mismatches: {len(mismatches)}")
print(f"  No PDF dialogue found: {len(missing_pdf)}")
print(f"  Missing lessons in PDF: {sorted(missing_pdf)}")

if mismatches:
    print(f"\n{'='*70}")
    print("MISMATCHES DETAIL:")
    print("="*70)
    for m in mismatches:
        print(f"\nLesson {m['lesson']}: {m['title']}")
        print(f"  Issue: {m['issue']}")
        if 'diffs' in m:
            for j, e, p in m['diffs']:
                print(f"  Line {j}:")
                print(f"    Existing: {e}")
                print(f"    PDF:      {p}")
        elif 'existing' in m:
            print(f"  Existing (first 5): {m['existing']}")
            print(f"  PDF (first 5):      {m['pdf']}")
