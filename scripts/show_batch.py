import json
import re

def normalize(text):
    text = text.strip().lower()
    text = re.sub(r'\s+', ' ', text)
    text = text.replace('"', "'").replace('"', "'")
    return text

with open(r'I:\新概念英语练习王\scripts\batch_data.json', 'r', encoding='utf-8') as f:
    batch_data = json.load(f)

# Filter to real diffs only
real_diffs = [item for item in batch_data 
              if item['category'] == 'major_diff' 
              and not item['is_empty'] 
              and not item['is_garbage']
              and not (item['existing_count'] <= 3 and item['pdf_count'] > 5)]

# Show batch 1
batch_num = 1
start = 0
end = min(10, len(real_diffs))

print(f"=== 第{batch_num}批 (共{len(real_diffs)}课需要修复，显示第{start+1}-{end}课) ===\n")

for item in real_diffs[start:end]:
    ln = item['lesson']
    print(f"--- Lesson {ln}: {item['title']} ---")
    print(f"  代码 ({item['existing_count']}行) vs PDF ({item['pdf_count']}行)")
    
    existing = item['existing']
    pdf = item['pdf']
    
    max_lines = min(6, max(len(existing), len(pdf)))
    for i in range(max_lines):
        e = existing[i] if i < len(existing) else '(无)'
        p = pdf[i] if i < len(pdf) else '(无)'
        
        if len(e) > 50: e = e[:47] + '...'
        if len(p) > 50: p = p[:47] + '...'
        
        match = '✓' if normalize(e) == normalize(p) else '✗'
        if match == '✗':
            print(f"  {match} 代码: {e}")
            print(f"    PDF:  {p}")
        else:
            print(f"  {match} {e}")
    
    if len(existing) > max_lines or len(pdf) > max_lines:
        print(f"  ... (代码还有{max(0,len(existing)-max_lines)}行, PDF还有{max(0,len(pdf)-max_lines)}行)")
    print()
