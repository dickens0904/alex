import json
import re

# Load OCR output
with open(r'I:\新概念英语练习王\scripts\ocr_output.json', 'r', encoding='utf-8') as f:
    all_pages = json.load(f)

# Build a page lookup
page_dict = {p['page']: p['lines'] for p in all_pages}

# For each lesson, extract dialogue from the content pages
# The pattern is: lesson page N has dialogue, page N+1 has vocabulary
# We need to skip page 1 (TOC) and page 2-4 (intro)

# First, let's understand which pages contain which lessons
# We'll look for "Lesson N" followed by the title on the same or next line
# Then extract dialogue lines that follow

def extract_lesson_dialogue(lesson_num):
    """Extract dialogue lines for a given lesson from OCR pages."""
    # Find the page that has the lesson dialogue
    # Typically: the page with "Lesson N" title followed by the dialogue
    # Skip TOC page (1) and look for content pages
    
    for page_data in all_pages:
        page_num = page_data['page']
        lines = page_data['lines']
        
        # Skip TOC pages and vocabulary/exercise pages
        if page_num <= 4:
            continue
            
        # Look for the lesson header
        found_lesson = False
        for i, line in enumerate(lines):
            # Match "Lesson N" at start of line (not in TOC)
            m = re.match(r'^Lesson\s+' + str(lesson_num) + r'\b', line)
            if m:
                found_lesson = True
                break
        
        if found_lesson:
            # Check if this is the dialogue page (has "Listen to the tape" or dialogue content)
            has_listen = any('Listen to the tape' in l or 'listen to the tape' in l.lower() for l in lines)
            has_dialogue = any(re.match(r'^(Excuse|Sorry|Yes|No|This is|Here|My|Is this|Is it|How|What|Where|Good|Thank|Pardon|Number|Open|Shut|Come|Meet|How|Nice|What|Look|Are|Am|Whose|Which|Give|Show|Which|Must|It\'s|I\'m|He\'s|She\'s|They\'re|We\'re|You\'re)', l) for l in lines)
            
            if has_listen or has_dialogue:
                return page_num, lines
    
    return None, []

# Let's look at a few lessons to understand the dialogue structure
for ln in [1, 3, 5, 21, 31, 51, 71, 101, 141]:
    page_num, lines = extract_lesson_dialogue(ln)
    if lines:
        print(f"\n=== Lesson {ln} (page {page_num}) ===")
        # Find dialogue lines (after "Listen to the tape" section)
        in_dialogue = False
        dialogue_lines = []
        for line in lines:
            if 'Listen to the tape' in line or 'listen to the tape' in line.lower():
                in_dialogue = True
                continue
            if in_dialogue:
                # Skip empty lines and instruction lines
                if line.strip() and not re.match(r'^(New words|Written|Notes|Exercise|Lesson|Listen|课文|生词|书面|课文注释|参考译文)', line):
                    dialogue_lines.append(line.strip())
        
        # Print dialogue
        if dialogue_lines:
            for dl in dialogue_lines[:15]:
                print(f"  {dl}")
        else:
            print("  [No dialogue extracted]")
            # Print all lines for debugging
            for l in lines[:20]:
                print(f"  >> {l}")
    else:
        print(f"\n=== Lesson {ln}: NOT FOUND ===")
