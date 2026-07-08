import json
import re

with open(r'I:\新概念英语练习王\scripts\ocr_output.json', 'r', encoding='utf-8') as f:
    all_pages = json.load(f)

page_dict = {p['page']: p['lines'] for p in all_pages}

# Build lesson->pages mapping
lesson_all_pages = {}
for page_data in all_pages:
    page_num = page_data['page']
    lines = page_data['lines']
    if page_num <= 4:
        continue
    for line in lines:
        m = re.match(r'^Lesson\s+(\d+)', line)
        if m:
            ln = int(m.group(1))
            if ln not in lesson_all_pages:
                lesson_all_pages[ln] = []
            if page_num not in lesson_all_pages[ln]:
                lesson_all_pages[ln].append(page_num)

def clean_line(line):
    """Clean a single OCR line."""
    line = line.strip()
    # Remove trailing page numbers (1-3 digit numbers at end)
    line = re.sub(r'\s+\d{1,3}$', '', line)
    # Remove OCR garbage
    line = re.sub(r'[·•○●□■△▲◇◆★☆]', '', line)
    # Remove standalone numbers
    if re.match(r'^\d{1,3}$', line):
        return ''
    # Remove very short all-caps fragments (OCR noise)
    if re.match(r'^[A-Z\s]{1,2}$', line):
        return ''
    return line.strip()

def is_speaker_label(line):
    """Check if a line is a speaker label like 'JEAN :' or 'MR. BLAKE :'"""
    return bool(re.match(r'^[A-Z\s\.]+\s*:\s*$', line.strip()))

def extract_speaker_and_content(line):
    """Extract speaker and content from 'JEAN : Where's Sally?'"""
    m = re.match(r'^([A-Z\s\.]+)\s*:\s*(.+)', line)
    if m:
        return m.group(1).strip(), m.group(2).strip()
    return None, None

def split_sentences(text):
    """Split merged text into individual sentences."""
    # Split on sentence-ending punctuation followed by space or end
    # But be careful with abbreviations and contractions
    sentences = []
    current = ''
    
    i = 0
    while i < len(text):
        current += text[i]
        if text[i] in '.!?' and (i + 1 >= len(text) or text[i + 1] in ' \n'):
            sentences.append(current.strip())
            current = ''
            i += 1
            # Skip spaces after punctuation
            while i < len(text) and text[i] == ' ':
                i += 1
            continue
        i += 1
    
    if current.strip():
        sentences.append(current.strip())
    
    return sentences

def parse_lesson_dialogue(lesson_num):
    """Parse dialogue for a lesson, returning speaker/content pairs."""
    if lesson_num not in lesson_all_pages:
        return []
    
    pages = lesson_all_pages[lesson_num]
    
    for page_num in pages:
        lines = page_dict.get(page_num, [])
        full_text = ' '.join(lines)
        
        has_listen = 'Listen to the tape' in full_text or 'Listen to the' in full_text
        has_answer = '回答问题' in full_text
        
        if not (has_listen or has_answer):
            continue
        
        # Collect raw dialogue lines
        raw_lines = []
        in_dialogue = False
        
        for line in lines:
            if 'Listen to the tape' in line or 'Listen to the' in line or '回答问题' in line:
                in_dialogue = True
                continue
            
            if in_dialogue:
                if re.match(r'^(New words|Written|Notes|课文注释|生词|书面|参考译文|Key structures|Special difficulties|Multiple choice|Lesson \d+\s*$)', line):
                    break
                
                cleaned = clean_line(line)
                if cleaned:
                    raw_lines.append(cleaned)
        
        if not raw_lines:
            continue
        
        # Now parse into speaker/content pairs
        result = []
        current_speaker = ''
        buffer = ''
        
        for line in raw_lines:
            # Skip Chinese lines
            if re.match(r'^[\u4e00-\u9fff]', line):
                continue
            # Skip the question line (English question before dialogue)
            if not result and not buffer and re.match(r'^(Who|What|Where|When|How|Why|Is|Are|Do|Does|Did|Can|Could|Would|Should|Have|Has|Had)\b.*\?$', line):
                continue
            # Skip OCR artifacts
            if re.match(r'^[A-Z\s]{1,3}$', line):
                continue
            
            # Check if this line has a speaker label embedded
            speaker, content = extract_speaker_and_content(line)
            if speaker:
                # Save buffer
                if buffer:
                    # Split buffer into sentences
                    for sent in split_sentences(buffer):
                        if sent:
                            result.append({'speaker': current_speaker, 'content': sent})
                    buffer = ''
                current_speaker = speaker
                buffer = content
            elif is_speaker_label(line):
                # Just a speaker label on its own line
                if buffer:
                    for sent in split_sentences(buffer):
                        if sent:
                            result.append({'speaker': current_speaker, 'content': sent})
                    buffer = ''
                current_speaker = line.strip().rstrip(':').strip()
            else:
                # Content line
                if buffer:
                    buffer += ' ' + line
                else:
                    buffer = line
        
        # Flush buffer
        if buffer:
            for sent in split_sentences(buffer):
                if sent:
                    result.append({'speaker': current_speaker, 'content': sent})
        
        return result
    
    return []

# Extract all dialogues
all_parsed = {}
for ln in range(1, 145):
    parsed = parse_lesson_dialogue(ln)
    if parsed:
        all_parsed[ln] = parsed

print(f"Extracted dialogue for {len(all_parsed)} lessons")
missing = sorted(set(range(1, 145)) - set(all_parsed.keys()))
print(f"Missing: {missing}")

# Print samples
for ln in [1, 3, 5, 7, 9, 11, 21, 31, 51, 71, 91, 101, 111, 121, 131, 141, 143]:
    if ln in all_parsed:
        print(f"\nLesson {ln} ({len(all_parsed[ln])} lines):")
        for item in all_parsed[ln][:8]:
            sp = f"[{item['speaker']}] " if item['speaker'] else ''
            print(f"  {sp}{item['content']}")
        if len(all_parsed[ln]) > 8:
            print(f"  ... ({len(all_parsed[ln]) - 8} more)")

# Save
with open(r'I:\新概念英语练习王\scripts\parsed_dialogues_v2.json', 'w', encoding='utf-8') as f:
    json.dump(all_parsed, f, ensure_ascii=False, indent=2)

print(f"\nSaved to parsed_dialogues_v2.json")
