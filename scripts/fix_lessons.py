import json
import re

# Load PDF dialogues
with open(r'I:\新概念英语练习王\scripts\parsed_dialogues_v2.json', 'r', encoding='utf-8') as f:
    pdf_data = json.load(f)

# Load batch data for comparison
with open(r'I:\新概念英语练习王\scripts\batch_data.json', 'r', encoding='utf-8') as f:
    batch_data = json.load(f)

# Load completeLessons.ts
with open(r'I:\新概念英语练习王\src\data\lessons\completeLessons.ts', 'r', encoding='utf-8') as f:
    ts_content = f.read()

def clean_ocr_artifacts(text):
    """Clean OCR artifacts from text."""
    # Remove common OCR garbage
    text = re.sub(r'^[A-Z\s]{1,3}$', '', text)
    # Remove patterns like "UVOVOVOVOVOV"
    text = re.sub(r'^[A-Z]{5,}$', '', text)
    # Remove standalone numbers
    if re.match(r'^\d{1,3}$', text.strip()):
        return ''
    # Remove "back?" style artifacts (lowercase word + ?)
    if re.match(r'^[a-z]+\?$', text.strip()):
        return ''
    # Remove OCR noise like "HETPSUNNY"
    if re.match(r'^[A-Z]{6,}$', text.strip()):
        return ''
    # Clean up "S0A" style artifacts
    text = re.sub(r'\b[A-Z][0-9][A-Z]\b', '', text)
    # Remove "·" and similar
    text = re.sub(r'[·•○●]', '', text)
    return text.strip()

def should_fix_lesson(item):
    """Determine if a lesson needs fixing."""
    if item['category'] != 'major_diff':
        return False
    if item['is_garbage']:
        return False
    if item['is_empty']:
        return True
    
    # Skip if only contraction differences
    existing_paras = item['existing']
    pdf_lines = item['pdf']
    
    def normalize(text):
        text = text.strip().lower()
        text = re.sub(r'\s+', ' ', text)
        return text
    
    def expand(text):
        pairs = [
            (" he's ", " he is "), (" she's ", " she is "), (" it's ", " it is "),
            (" i'm ", " i am "), (" you're ", " you are "), (" we're ", " we are "),
            (" they're ", " they are "), (" that's ", " that is "), (" what's ", " what is "),
            (" where's ", " where is "), (" who's ", " who is "), (" there's ", " there is "),
            (" isn't ", " is not "), (" aren't ", " are not "), (" don't ", " do not "),
            (" doesn't ", " does not "), (" didn't ", " did not "), (" can't ", " cannot "),
            (" won't ", " will not "), (" wasn't ", " was not "), (" weren't ", " were not "),
            (" let's ", " let us "), ("'s ", " is "), ("'re ", " are "), ("'ve ", " have "),
            ("'ll ", " will "), ("'d ", " would "),
        ]
        for old, new in pairs:
            text = text.replace(old, new)
        return text
    
    # If same number of lines and only contractions differ, skip
    if len(existing_paras) == len(pdf_lines):
        e_norm = [expand(normalize(p)) for p in existing_paras]
        p_norm = [expand(normalize(l)) for l in pdf_lines]
        if e_norm == p_norm:
            return False
    
    # Check if existing is significantly shorter (missing content)
    if len(existing_paras) < len(pdf_lines) * 0.7:
        return True
    
    # Check if content is substantially different
    e_joined = ' '.join([normalize(p) for p in existing_paras])
    p_joined = ' '.join([normalize(l) for l in pdf_lines])
    e_exp = expand(e_joined)
    p_exp = expand(p_joined)
    
    if e_exp == p_exp or e_exp.replace(' ', '') == p_exp.replace(' ', ''):
        return False
    
    return True

# Find lessons that need fixing
lessons_to_fix = []
for item in batch_data:
    if should_fix_lesson(item):
        lessons_to_fix.append(item['lesson'])

print(f"Lessons to fix: {len(lessons_to_fix)}")
print(f"Lesson IDs: {lessons_to_fix}")

# For each lesson to fix, generate the replacement paragraphs
replacements = {}
for lesson_id in lessons_to_fix:
    ln_str = str(lesson_id)
    if ln_str not in pdf_data:
        continue
    
    pdf_items = pdf_data[ln_str]
    
    # Clean and format as paragraphs
    paragraphs = []
    for item in pdf_items:
        content = item['content']
        speaker = item.get('speaker', '')
        
        # Clean OCR artifacts
        content = clean_ocr_artifacts(content)
        if not content:
            continue
        
        # Skip Chinese lines
        if re.match(r'^[\u4e00-\u9fff]', content):
            continue
        # Skip question lines
        if re.match(r'^(Who|What|Where|When|How|Why|Is|Are|Do|Does|Did|Can|Could|Would|Should|Have|Has|Had)\b.*\?$', content) and not paragraphs:
            continue
        
        # Clean speaker name
        if speaker:
            speaker = re.sub(r'\s+', ' ', speaker).strip()
        
        paragraphs.append({
            'speaker': speaker if speaker else '',
            'content': content
        })
    
    if paragraphs:
        replacements[lesson_id] = paragraphs

print(f"\nGenerated replacements for {len(replacements)} lessons")

# Show what we're replacing
for ln in sorted(replacements.keys())[:10]:
    paras = replacements[ln]
    print(f"\nLesson {ln} ({len(paras)} paragraphs):")
    for p in paras[:4]:
        sp = f"[{p['speaker']}] " if p['speaker'] else ''
        print(f"  {sp}{p['content']}")
    if len(paras) > 4:
        print(f"  ... ({len(paras)} total)")

# Save replacements for review
with open(r'I:\新概念英语练习王\scripts\replacements.json', 'w', encoding='utf-8') as f:
    json.dump(replacements, f, ensure_ascii=False, indent=2)

print(f"\nSaved replacements to replacements.json")
