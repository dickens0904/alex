import re

with open(r'I:\新概念英语练习王\src\data\lessons\completeLessons.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Find dialogue section for lesson 1
# Look for pattern like: dialogue: [...] or sentences: [...]
for keyword in ['dialogue', 'sentences', 'conversation', 'text:']:
    idx = content.find(keyword)
    if idx > 0:
        print(f'=== Found "{keyword}" at position {idx} ===')
        print(content[idx:idx+2000])
        print()
        break

# Also search for "Excuse me" to find the actual text
idx = content.find('Excuse me')
if idx > 0:
    print('=== Found "Excuse me" ===')
    print(content[max(0,idx-200):idx+800])
