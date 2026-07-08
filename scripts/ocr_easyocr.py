"""使用 easyocr 进行屏幕截图 OCR"""
import sys
import easyocr

img_path = sys.argv[1] if len(sys.argv) > 1 else r"C:\Users\dicke\AppData\Local\Temp\codex-shot-2026-06-29_06-52-24.png"

reader = easyocr.Reader(['ch_sim', 'en'], gpu=False, verbose=False)
results = reader.readtext(img_path, detail=0)

print("=== OCR Result ===")
for line in results:
    print(line)
