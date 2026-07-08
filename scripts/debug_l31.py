import re
with open(r'I:\新概念英语练习王\src\data\lessons\completeLessons.ts', 'r', encoding='utf-8') as f:
    content = f.read()

blocks = re.split(r'//\s*Lesson\s+(\d+):', content)
for i in range(1, len(blocks), 2):
    lid = int(blocks[i])
    if lid == 31:
        block = blocks[i+1]
        paras = re.findall(r"speaker:\s*'([^']+)',\s*content:\s*'([^']+)'", block)
        print(f"Found {len(paras)} paragraphs")
        for s, c in paras:
            print(f"  [{s}] {c}")
        
        # Also check with double quotes
        paras2 = re.findall(r'speaker:\s*["\']([^"\']+)["\'],\s*content:\s*["\']([^"\']+)["\']', block)
        print(f"\nWith flexible quotes: {len(paras2)} paragraphs")
        for s, c in paras2:
            print(f"  [{s}] {c}")
        
        # Show raw paragraphs section
        idx = block.find('paragraphs:')
        if idx > 0:
            print(f"\nRaw paragraphs section:")
            print(block[idx:idx+2000])
        break
