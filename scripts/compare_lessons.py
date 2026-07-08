import json
import re

# Load OCR output
with open(r'I:\新概念英语练习王\scripts\ocr_output.json', 'r', encoding='utf-8') as f:
    all_pages = json.load(f)

# Build page lookup
page_dict = {p['page']: p['lines'] for p in all_pages}

# First, let's build a mapping: lesson_num -> dialogue_page
# The dialogue page is the one with "Listen to the tape" instruction
lesson_dialogue_pages = {}
lesson_vocab_pages = {}

for page_data in all_pages:
    page_num = page_data['page']
    lines = page_data['lines']
    full_text = ' '.join(lines)
    
    # Skip intro/TOC pages
    if page_num <= 4:
        continue
    
    # Find lesson number
    lesson_match = re.search(r'Lesson\s+(\d+)', full_text)
    if not lesson_match:
        continue
    
    lesson_num = int(lesson_match.group(1))
    
    # Check if this is a dialogue page (has "Listen to the tape")
    if 'Listen to the tape' in full_text or 'listen to the tape' in full_text.lower() or 'Listen to the' in full_text:
        if lesson_num not in lesson_dialogue_pages:
            lesson_dialogue_pages[lesson_num] = page_num
    # Check if this is a vocabulary page (has "New words and expressions")
    elif 'New words and expressions' in full_text or 'New words and expressions' in full_text:
        if lesson_num not in lesson_vocab_pages:
            lesson_vocab_pages[lesson_num] = page_num

print(f"Found dialogue pages for {len(lesson_dialogue_pages)} lessons")
print(f"Found vocab pages for {len(lesson_vocab_pages)} lessons")

# Check which lessons are missing
all_lessons = set(range(1, 145))
missing_dialogue = all_lessons - set(lesson_dialogue_pages.keys())
print(f"\nLessons missing dialogue pages: {sorted(missing_dialogue)}")

# For lessons with dialogue pages, extract the dialogue text
def extract_dialogue_from_page(page_num, lesson_num):
    """Extract clean dialogue lines from a page."""
    lines = page_dict.get(page_num, [])
    dialogue_lines = []
    in_dialogue = False
    
    for line in lines:
        # Start after the question/instruction
        if 'Listen to the tape' in line or 'listen to the tape' in line.lower():
            in_dialogue = True
            continue
        if '回答问题' in line:
            in_dialogue = True
            continue
            
        if in_dialogue:
            # Stop at vocabulary/notes section
            if re.match(r'^(New words|Written|Notes on|Exercise|Lesson \d+$|课文注释|生词|书面|参考译文)', line):
                break
            # Skip empty and instruction lines
            line = line.strip()
            if not line:
                continue
            # Skip the question line itself
            if line.startswith('?') or line.startswith('？'):
                continue
            dialogue_lines.append(line)
    
    return dialogue_lines

# Now let's extract dialogues for all lessons
print("\n" + "="*60)
print("EXTRACTING DIALOGUES FROM PDF (OCR)")
print("="*60)

pdf_dialogues = {}
for lesson_num in sorted(lesson_dialogue_pages.keys()):
    page_num = lesson_dialogue_pages[lesson_num]
    dialogue = extract_dialogue_from_page(page_num, lesson_num)
    pdf_dialogues[lesson_num] = dialogue

# Print a few samples
for ln in [1, 5, 31, 51, 71, 101, 141]:
    if ln in pdf_dialogues:
        print(f"\n--- Lesson {ln} ---")
        for line in pdf_dialogues[ln]:
            print(f"  {line}")

# Now load the existing lesson data from completeLessons.ts
# We need to parse the TypeScript file
print("\n" + "="*60)
print("LOADING EXISTING LESSON DATA")
print("="*60)

# Read the completeLessons.ts file
with open(r'I:\新概念英语练习王\src\data\lessons\completeLessons.ts', 'r', encoding='utf-8') as f:
    ts_content = f.read()

# Also check realLessons.ts
real_lessons_content = ""
try:
    with open(r'I:\新概念英语练习王\src\data\lessons\realLessons.ts', 'r', encoding='utf-8') as f:
        real_lessons_content = f.read()
    print(f"realLessons.ts loaded: {len(real_lessons_content)} chars")
except:
    print("realLessons.ts not found or empty")

print(f"completeLessons.ts loaded: {len(ts_content)} chars")

# Save PDF dialogues for later comparison
with open(r'I:\新概念英语练习王\scripts\pdf_dialogues.json', 'w', encoding='utf-8') as f:
    json.dump(pdf_dialogues, f, ensure_ascii=False, indent=2)

print(f"\nSaved PDF dialogues to pdf_dialogues.json")
print(f"Total lessons with extracted dialogue: {len(pdf_dialogues)}")

# Now let's extract the dialogue text from completeLessons.ts
# The text is stored as paragraphs in lesson.content.text.paragraphs
# Let's use a regex to extract paragraphs arrays

# Find all lesson blocks
lesson_blocks = re.findall(
    r'id:\s*(\d+),\s*title:\s*["\']([^"\']+)["\'],.*?text:\s*\{(.*?)\}\s*,\s*exercises:',
    ts_content,
    re.DOTALL
)

print(f"\nFound {len(lesson_blocks)} lesson blocks in completeLessons.ts")

# Extract paragraphs from each lesson
existing_dialogues = {}
for block in lesson_blocks:
    lesson_id = int(block[0])
    text_section = block[2]
    
    # Extract paragraphs array
    para_match = re.search(r'paragraphs:\s*\[(.*?)\]', text_section, re.DOTALL)
    if para_match:
        para_text = para_match.group(1)
        # Extract individual paragraph strings
        paragraphs = re.findall(r'"([^"]*)"', para_text)
        existing_dialogues[lesson_id] = paragraphs

print(f"Extracted paragraphs from {len(existing_dialogues)} lessons")

# Print samples
for ln in [1, 5, 31, 51, 71, 101, 141]:
    if ln in existing_dialogues:
        print(f"\n--- Lesson {ln} (existing) ---")
        for line in existing_dialogues[ln]:
            print(f"  {line}")
