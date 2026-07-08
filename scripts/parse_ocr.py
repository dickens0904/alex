import json
import re

# Load OCR output
with open(r'I:\新概念英语练习王\scripts\ocr_output.json', 'r', encoding='utf-8') as f:
    all_pages = json.load(f)

# First, let's look at the structure to understand how lessons are laid out
# Print pages around lesson boundaries to understand the pattern
print("=== Examining PDF structure ===\n")

# Find all "Lesson N" markers
lesson_pages = {}
for page_data in all_pages:
    page_num = page_data['page']
    lines = page_data['lines']
    for line in lines:
        # Match "Lesson N" pattern
        m = re.match(r'^Lesson\s+(\d+)', line)
        if m:
            lesson_num = int(m.group(1))
            if lesson_num not in lesson_pages:
                lesson_pages[lesson_num] = []
            lesson_pages[lesson_num].append(page_num)

print(f"Found {len(lesson_pages)} lessons in PDF")
print(f"Lesson page mapping (first 20):")
for ln in sorted(lesson_pages.keys())[:20]:
    print(f"  Lesson {ln}: pages {lesson_pages[ln]}")
print(f"\nLesson page mapping (last 10):")
for ln in sorted(lesson_pages.keys())[-10:]:
    print(f"  Lesson {ln}: pages {lesson_pages[ln]}")
