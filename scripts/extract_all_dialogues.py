import json
import re

with open(r'I:\新概念英语练习王\scripts\ocr_output.json', 'r', encoding='utf-8') as f:
    all_pages = json.load(f)

page_dict = {p['page']: p['lines'] for p in all_pages}

# Build lesson->pages mapping (all pages that mention a lesson)
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

def clean_ocr_line(line):
    """Clean OCR artifacts from a line."""
    line = line.strip()
    # Remove trailing page numbers
    line = re.sub(r'\s+\d{1,3}$', '', line)
    # Remove OCR garbage characters
    line = re.sub(r'[·•○●□■△▲◇◆★☆]', '', line)
    # Remove lone numbers that are likely page numbers
    if re.match(r'^\d{1,3}$', line):
        return ''
    # Remove common OCR artifacts
    if re.match(r'^[A-Z\s]{1,3}$', line) and len(line.strip()) <= 2:
        return ''
    # Clean up
    line = line.strip()
    return line

def extract_speaker_content(line):
    """Extract speaker and content from a line like 'JEAN : Where's Sally?'"""
    m = re.match(r'^([A-Z\s\.]+)\s*:\s*(.*)', line)
    if m:
        speaker = m.group(1).strip()
        content = m.group(2).strip()
        return speaker, content
    return None, line

def merge_split_lines(lines):
    """Merge lines that are split across multiple OCR lines."""
    merged = []
    current = ''
    
    for line in lines:
        if not line:
            if current:
                merged.append(current)
                current = ''
            continue
        
        # If line starts with a speaker label, it's a new dialogue line
        speaker, content = extract_speaker_content(line)
        if speaker:
            if current:
                merged.append(current)
            current = line
        else:
            # Continuation of previous line
            if current:
                # Check if previous line ends with punctuation or is complete
                if current.endswith(('.', '!', '?', "'", '"')):
                    merged.append(current)
                    current = line
                else:
                    current += ' ' + line
            else:
                current = line
    
    if current:
        merged.append(current)
    
    return merged

def extract_dialogue_for_lesson(lesson_num):
    """Extract dialogue for a specific lesson from PDF OCR."""
    if lesson_num not in lesson_all_pages:
        return None, []
    
    pages = lesson_all_pages[lesson_num]
    
    for page_num in pages:
        lines = page_dict.get(page_num, [])
        full_text = ' '.join(lines)
        
        # Check if this is a dialogue page
        has_listen = 'Listen to the tape' in full_text or 'listen to the tape' in full_text.lower() or 'Listen to the' in full_text
        has_answer = '回答问题' in full_text
        
        if not (has_listen or has_answer):
            continue
        
        # Extract dialogue
        dialogue_raw = []
        in_dialogue = False
        question_line = ''
        
        for line in lines:
            # Start collecting after instruction
            if 'Listen to the tape' in line or 'listen to the tape' in line.lower() or 'Listen to the' in line:
                in_dialogue = True
                continue
            if '回答问题' in line and not in_dialogue:
                in_dialogue = True
                continue
            
            if in_dialogue:
                # Stop at non-dialogue sections
                if re.match(r'^(New words|Written|Notes|课文注释|生词|书面|参考译文|Key structures|Special difficulties|Multiple choice|Lesson \d+\s*$)', line):
                    break
                
                cleaned = clean_ocr_line(line)
                if cleaned:
                    dialogue_raw.append(cleaned)
        
        if dialogue_raw:
            # Remove the question line (first line that ends with ?)
            filtered = []
            found_question = False
            for line in dialogue_raw:
                if not found_question and (line.endswith('?') or line.endswith('？')):
                    # This is likely the question, skip it
                    found_question = True
                    # But if it's also dialogue content, keep going
                    # Some questions are part of dialogue
                    if re.match(r'^(Who|What|Where|When|How|Why|Is|Are|Do|Does|Did|Can|Could|Would|Should|Have|Has|Had)\b', line):
                        continue
                    else:
                        filtered.append(line)
                else:
                    filtered.append(line)
            
            # Merge split lines
            merged = merge_split_lines(filtered)
            
            return page_num, merged
    
    return None, []

# Extract all dialogues
all_dialogues = {}
for ln in range(1, 145):
    page_num, dialogue = extract_dialogue_for_lesson(ln)
    if dialogue:
        all_dialogues[ln] = {
            'page': page_num,
            'lines': dialogue,
            'line_count': len(dialogue)
        }

print(f"Extracted dialogue for {len(all_dialogues)} lessons")
missing = sorted(set(range(1, 145)) - set(all_dialogues.keys()))
print(f"Missing lessons: {missing}")

# Print samples
print("\n=== SAMPLE DIALOGUES ===")
for ln in [1, 3, 5, 7, 9, 11, 13, 15, 21, 31, 41, 51, 61, 71, 81, 91, 101, 111, 121, 131, 141, 143]:
    if ln in all_dialogues:
        d = all_dialogues[ln]
        print(f"\nLesson {ln} (page {d['page']}, {d['line_count']} lines):")
        for line in d['lines'][:8]:
            print(f"  {line}")
        if d['line_count'] > 8:
            print(f"  ... ({d['line_count'] - 8} more lines)")

# Save to JSON
with open(r'I:\新概念英语练习王\scripts\all_pdf_dialogues.json', 'w', encoding='utf-8') as f:
    json.dump(all_dialogues, f, ensure_ascii=False, indent=2)

print(f"\nSaved to all_pdf_dialogues.json")
