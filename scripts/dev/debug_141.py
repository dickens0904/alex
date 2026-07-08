#!/usr/bin/env python3
"""Debug Lesson 141 translation mismatch"""
fp = r'I:\新概念英语练习王\src\data\lessons\completeLessons.ts'
with open(fp, 'r', encoding='utf-8') as f:
    c = f.read()

# Find the translation line for lesson 141
idx = c.find("translation: ['\u4e0a\u5468")
if idx < 0:
    print("Not found")
    exit()

# Extract the translation line (until the closing ],)
end = c.find("],", idx)
actual = c[idx:end+2]
print("Actual length:", len(actual))

# Build the expected old string
old = "translation: ['\u4e0a\u5468\uff0c\u6211\u56db\u5c81\u7684\u5973\u513f\u8428\u8389\u88ab\u9080\u8bf7\u53c2\u52a0\u4e00\u4e2a\u513f\u7ae5\u805a\u4f1a\u3002', '\u6211\u51b3\u5b9a\u5e26\u5979\u5750\u706b\u8f66\u53bb\u3002', '\u8428\u8389\u975e\u5e38\u5174\u594b\uff0c\u56e0\u4e3a\u5979\u4ee5\u524d\u4ece\u672a\u5750\u8fc7\u706b\u8f66\u3002', '\u5979\u5750\u5728\u7a97\u8fb9\uff0c\u95ee\u5979\u770b\u5230\u7684\u4e00\u5207\u95ee\u9898\u3002', '\u7a81\u7136\uff0c\u4e00\u4f4d\u4e2d\u5e74\u5973\u58eb\u4e0a\u4e86\u706b\u8f66\uff0c\u5750\u5728\u8428\u8389\u5bf9\u9762\u3002', '\u90a3\u4f4d\u5973\u58eb\u7a7f\u7740\u84dd\u8272\u5916\u5957\uff0c\u6234\u7740\u4e00\u9876\u53c8\u5927\u53c8\u6ed1\u7a3d\u7684\u5e3d\u5b50\u3002', '\u706b\u8f66\u79bb\u5f00\u8f66\u7ad9\u540e\uff0c\u90a3\u4f4d\u5973\u58eb\u6253\u5f00\u624b\u63d0\u5305\uff0c\u62ff\u51fa\u7c89\u76d2\u3002', '\u7136\u540e\u5979\u5f00\u59cb\u5316\u5986\u3002', '\u201c\u4f60\u4e3a\u4ec0\u4e48\u8981\u90a3\u6837\u505a\uff1f\u201d\u8428\u8389\u95ee\u3002', '\u201c\u4e3a\u4e86\u8ba9\u81ea\u5df1\u53d8\u6f02\u4eae\uff0c\u201d\u90a3\u4f4d\u5973\u58eb\u56de\u7b54\u3002', '\u5979\u6536\u8d77\u7c89\u76d2\uff0c\u548c\u853c\u5730\u7b11\u4e86\u7b11\u3002', '\u201c\u4f46\u4f60\u8fd8\u662f\u5f88\u4e11\uff0c\u201d\u8428\u8389\u8bf4\u3002', '', '', ''],"
print("Old length:", len(old))

# Compare
if actual == old:
    print("MATCH!")
else:
    print("MISMATCH")
    # Find first difference
    for i in range(min(len(actual), len(old))):
        if actual[i] != old[i]:
            print(f"First diff at pos {i}: actual={repr(actual[i])} (U+{ord(actual[i]):04X}) vs old={repr(old[i])} (U+{ord(old[i]):04X})")
            print(f"Context actual: ...{repr(actual[max(0,i-10):i+10])}...")
            print(f"Context old:    ...{repr(old[max(0,i-10):i+10])}...")
            break
    if len(actual) != len(old):
        print(f"Length diff: actual={len(actual)}, old={len(old)}")
