#!/usr/bin/env python3
"""Verify all fixed lessons have matching paragraphs/translation lengths"""
import re

fp = r'I:\新概念英语练习王\src\data\lessons\completeLessons.ts'
with open(fp, 'r', encoding='utf-8') as f:
    content = f.read()

# Lessons to check
lessons = [110, 112, 114, 115, 119, 120, 121, 124, 128, 129, 130, 131, 132, 133, 136, 138, 141]

all_ok = True
for lid in lessons:
    # Find the lesson block
    pattern = rf"id: {lid},"
    match = re.search(pattern, content)
    if not match:
        print(f"Lesson {lid}: NOT FOUND in file!")
        all_ok = False
        continue

    # Find the text section after this lesson's id
    start = match.start()
    # Find the next lesson or end of file
    next_lesson = re.search(r"id: \d+,", content[start + 10:])
    if next_lesson:
        block = content[start:start + 10 + next_lesson.start()]
    else:
        block = content[start:]

    # Count paragraphs: { speaker: ..., content: ... }
    para_count = len(re.findall(r"\{ speaker:", block))

    # Count translation items
    trans_match = re.search(r"translation: \[(.*?)\]", block, re.DOTALL)
    if trans_match:
        trans_str = trans_match.group(1)
        # Count items by splitting on ', ' (but be careful with commas inside strings)
        # Simple approach: count the number of quoted strings
        trans_items = re.findall(r"'(?:[^'\\]|\\.)*'", trans_str)
        trans_count = len(trans_items)
    else:
        trans_count = 0

    status = "OK" if para_count == trans_count else "MISMATCH"
    if para_count != trans_count:
        all_ok = False
    print(f"Lesson {lid}: paragraphs={para_count}, translation={trans_count} [{status}]")

if all_ok:
    print("\nAll lessons have matching paragraph/translation counts!")
else:
    print("\nSome lessons have mismatches - needs fixing!")
