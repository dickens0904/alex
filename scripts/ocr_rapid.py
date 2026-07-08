"""使用 RapidOCR 进行屏幕截图 OCR"""
import sys
from rapidocr_onnxruntime import RapidOCR

img_path = sys.argv[1]
output_path = sys.argv[2] if len(sys.argv) > 2 else None

ocr = RapidOCR()
result, _ = ocr(img_path)

lines = []
if result:
    for line in result:
        text = line[1]
        lines.append(text)
else:
    lines.append("No text detected")

output = "\n".join(lines)
if output_path:
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(output)
    print(f"Result saved to {output_path}")
else:
    print(output)
