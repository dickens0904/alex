import json
import re

with open(r'I:\新概念英语练习王\scripts\all_pdf_dialogues.json', 'r', encoding='utf-8') as f:
    all_dialogues = json.load(f)

def clean_dialogue_lines(lines):
    """Clean and parse dialogue lines into speaker/content pairs."""
    cleaned = []
    
    for line in lines:
        # Skip Chinese instruction lines
        if re.match(r'^[\u4e00-\u9fff]', line):
            continue
        # Skip the instruction question line (English question before dialogue)
        if re.match(r'^(Who|What|Where|When|How|Why|Is|Are|Do|Does|Did|Can|Could|Would|Should|Have|Has|Had)\b.*\?$', line):
            continue
        # Skip OCR artifacts
        if re.match(r'^[A-Z\s]{1,3}$', line.strip()):
            continue
        if re.match(r'^\d+$', line.strip()):
            continue
        # Skip lines like "back?" which are OCR fragments
        if re.match(r'^[a-z]+\?$', line.strip()):
            continue
        
        # Try to extract speaker label
        m = re.match(r'^([A-Z\s\.]+)\s*:\s*(.*)', line)
        if m:
            speaker = m.group(1).strip()
            content = m.group(2).strip()
            # Clean speaker name
            speaker = re.sub(r'\s+', ' ', speaker)
            if content:
                cleaned.append({'speaker': speaker, 'content': content})
        else:
            # No speaker label - this is a continuation or unlabeled line
            line = line.strip()
            if line and not re.match(r'^[A-Z\s\.]+$', line):  # Skip standalone labels
                cleaned.append({'speaker': '', 'content': line})
    
    # Merge continuation lines (no speaker label) with previous line
    merged = []
    for item in cleaned:
        if item['speaker'] == '' and merged:
            # Merge with previous
            prev = merged[-1]
            prev['content'] += ' ' + item['content']
        else:
            merged.append(item)
    
    return merged

# Process all dialogues
corrected = {}
for ln_str, data in all_dialogues.items():
    ln = int(ln_str)
    raw_lines = data['lines']
    
    parsed = clean_dialogue_lines(raw_lines)
    
    # Extract just the dialogue content (without speaker labels)
    content_lines = [p['content'] for p in parsed if p['content']]
    
    corrected[ln] = {
        'page': data['page'],
        'parsed': parsed,
        'content_lines': content_lines,
        'line_count': len(content_lines)
    }

print(f"Processed {len(corrected)} lessons")

# Now load existing data for comparison
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
    text = text.strip()
    text = re.sub(r'\s+', ' ', text)
    text = text.replace('"', "'").replace('"', "'").replace('"', '"').replace('"', '"')
    text = text.replace('…', '...').replace(''', "'").replace(''', "'")
    return text.lower()

# Detailed comparison
print("\n" + "="*70)
print("DETAILED COMPARISON")
print("="*70)

stats = {
    'match': 0,
    'contraction_only': 0,
    'line_split': 0,
    'partial_match': 0,
    'major_diff': 0,
    'missing_in_ts': 0,
    'missing_in_pdf': 0,
}

issues = []

for ln in range(1, 145):
    if ln not in existing_lessons:
        if ln in corrected:
            stats['missing_in_ts'] += 1
            issues.append(f"Lesson {ln}: EXISTS in PDF but MISSING in completeLessons.ts ({corrected[ln]['line_count']} lines)")
        continue
    
    if ln not in corrected:
        stats['missing_in_pdf'] += 1
        continue
    
    existing_paras = existing_lessons[ln]['paragraphs']
    pdf_lines = corrected[ln]['content_lines']
    
    existing_norm = [normalize(p) for p in existing_paras]
    pdf_norm = [normalize(l) for l in pdf_lines]
    
    if existing_norm == pdf_norm:
        stats['match'] += 1
        continue
    
    # Check contraction differences
    def expand_contractions(text):
        replacements = [
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
            ("'s ", " is "), ("'re ", " are "), ("'ve ", " have "), ("'ll ", " will "), ("'d ", " would "),
        ]
        for old, new in replacements:
            text = text.replace(old, new)
        return text
    
    if len(existing_norm) == len(pdf_norm):
        e_expanded = [expand_contractions(e) for e in existing_norm]
        p_expanded = [expand_contractions(p) for p in pdf_norm]
        
        if e_expanded == p_expanded:
            stats['contraction_only'] += 1
            continue
        
        # Check line by line
        diffs = []
        for j, (e, p) in enumerate(zip(e_expanded, p_expanded)):
            if e != p:
                diffs.append((j, existing_paras[j], pdf_lines[j]))
        
        if len(diffs) <= 2:
            stats['partial_match'] += 1
            issues.append(f"Lesson {ln}: {len(diffs)} line(s) differ (same count={len(existing_norm)})")
            for j, e, p in diffs:
                issues.append(f"  Line {j}: '{e}' -> '{p}'")
        else:
            stats['major_diff'] += 1
            issues.append(f"Lesson {ln}: MAJOR DIFF (same count={len(existing_norm)}, {len(diffs)} lines differ)")
    else:
        # Different line counts
        e_joined = ' '.join(existing_norm)
        p_joined = ' '.join(pdf_norm)
        
        e_exp = expand_contractions(e_joined)
        p_exp = expand_contractions(p_joined)
        
        if e_exp == p_exp:
            stats['line_split'] += 1
        elif e_exp.replace(' ', '') == p_exp.replace(' ', ''):
            stats['line_split'] += 1
        else:
            stats['major_diff'] += 1
            issues.append(f"Lesson {ln}: MAJOR DIFF (existing={len(existing_norm)} lines, PDF={len(pdf_norm)} lines)")
            # Show first few differences
            issues.append(f"  Existing first: {existing_paras[:3]}")
            issues.append(f"  PDF first:      {pdf_lines[:3]}")

print("\nStats:")
for k, v in stats.items():
    print(f"  {k}: {v}")

print(f"\nIssues ({len(issues)}):")
for issue in issues:
    print(f"  {issue}")

# Save the corrected dialogue data
with open(r'I:\新概念英语练习王\scripts\corrected_dialogues.json', 'w', encoding='utf-8') as f:
    json.dump(corrected, f, ensure_ascii=False, indent=2)

print(f"\nSaved corrected dialogues to corrected_dialogues.json")
