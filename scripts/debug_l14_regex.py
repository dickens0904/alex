import re

with open(r'I:\新概念英语练习王\src\data\lessons\completeLessons.ts', 'r', encoding='utf-8') as f:
    content = f.read()

blocks = re.split(r'//\s*Lesson\s+(\d+):', content)
for i in range(1, len(blocks), 2):
    lid = int(blocks[i])
    if lid == 14:
        block = blocks[i+1]
        
        # Try the v4 regex
        paras = re.findall(r"""speaker:\s*['"]([^'"]+)['"],\s*content:\s*["'](.+?)["']\s*[,}]""", block)
        print(f"v4 regex found: {len(paras)} paragraphs")
        for s, c in paras:
            print(f"  [{s}] {c}")
        
        # Try a more flexible regex
        paras2 = re.findall(r"speaker:\s*['\"]([^'\"]+)['\"],\s*content:\s*['\"](.+?)['\"]", block)
        print(f"\nflexible regex found: {len(paras2)} paragraphs")
        for s, c in paras2:
            print(f"  [{s}] {c}")
        
        # Show raw paragraphs section
        idx = block.find('paragraphs:')
        if idx > 0:
            print(f"\nRaw paragraphs:")
            print(block[idx:idx+1500])
        break
