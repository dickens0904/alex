import json
import re

# Load replacements
with open(r'I:\新概念英语练习王\scripts\replacements.json', 'r', encoding='utf-8') as f:
    replacements = json.load(f)

# Load completeLessons.ts
with open(r'I:\新概念英语练习王\src\data\lessons\completeLessons.ts', 'r', encoding='utf-8') as f:
    content = f.read()

def escape_ts_string(s):
    """Escape a string for TypeScript single-quoted string."""
    s = s.replace("\\", "\\\\")
    s = s.replace("'", "\\'")
    s = s.replace('"', '\\"')
    return s

def format_paragraphs(paragraphs):
    """Format paragraphs as TypeScript array content."""
    lines = []
    for p in paragraphs:
        speaker = escape_ts_string(p['speaker'])
        text = escape_ts_string(p['content'])
        if speaker:
            lines.append(f"          {{ speaker: '{speaker}', content: '{text}' }},")
        else:
            lines.append(f"          {{ speaker: '', content: '{text}' }},")
    return '\n'.join(lines)

# Process each lesson replacement
applied = 0
failed = []

for lesson_id_str, paragraphs in replacements.items():
    lesson_id = int(lesson_id_str)
    
    # Find the lesson block in the file
    # Pattern: id: N, (where N is the lesson id)
    # We need to find the paragraphs: [ ... ], within this lesson's block
    
    # Find the lesson's position by searching for "id: N,"
    id_pattern = re.compile(r'(\s*id:\s*' + str(lesson_id) + r',)')
    match = id_pattern.search(content)
    
    if not match:
        failed.append(f"Lesson {lesson_id}: could not find id")
        continue
    
    start_pos = match.start()
    
    # Find the next lesson's id or end of array to delimit this lesson's block
    next_lesson_pattern = re.compile(r'\n\s*// Lesson \d+:')
    next_match = next_lesson_pattern.search(content, match.end())
    if next_match:
        end_pos = next_match.start()
    else:
        # Last lesson - find end of array
        end_pos = content.find('];', match.end())
        if end_pos == -1:
            end_pos = len(content)
    
    lesson_block = content[start_pos:end_pos]
    
    # Find the paragraphs: [ ... ], within this block
    # The paragraphs section starts with "paragraphs: [" and ends with "],"
    para_start = lesson_block.find('paragraphs: [')
    if para_start == -1:
        failed.append(f"Lesson {lesson_id}: could not find paragraphs")
        continue
    
    # Find the matching closing bracket
    bracket_start = lesson_block.find('[', para_start)
    bracket_count = 0
    para_end = bracket_start
    for i in range(bracket_start, len(lesson_block)):
        if lesson_block[i] == '[':
            bracket_count += 1
        elif lesson_block[i] == ']':
            bracket_count -= 1
            if bracket_count == 0:
                para_end = i + 1
                break
    
    # Build the new paragraphs section
    new_para_text = format_paragraphs(paragraphs)
    new_section = f"paragraphs: [\n{new_para_text}\n        ]"
    
    # Replace in the lesson block
    new_block = lesson_block[:para_start] + new_section + lesson_block[para_end:]
    
    # Replace in the full content
    content = content[:start_pos] + new_block + content[end_pos:]
    
    applied += 1

print(f"Applied replacements to {applied} lessons")
if failed:
    print(f"Failed ({len(failed)}):")
    for f in failed:
        print(f"  {f}")

# Write back
output_path = r'I:\新概念英语练习王\src\data\lessons\completeLessons.ts'
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\nWritten to {output_path}")

# Verify by checking a few lessons
print("\nVerification (first 3 fixed lessons):")
for ln in [3, 7, 13]:
    ln_str = str(ln)
    if ln_str in replacements:
        # Find the lesson in the updated content
        pattern = re.compile(r'id:\s*' + str(ln) + r',.*?paragraphs:\s*\[(.*?)\]', re.DOTALL)
        m = pattern.search(content)
        if m:
            para_text = m.group(1)
            count = para_text.count("content:")
            print(f"  Lesson {ln}: {count} paragraphs")
        else:
            print(f"  Lesson {ln}: NOT FOUND")
