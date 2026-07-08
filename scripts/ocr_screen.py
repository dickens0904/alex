"""快速 OCR 屏幕截图"""
import sys
from PIL import Image
import pytesseract

img_path = sys.argv[1] if len(sys.argv) > 1 else r"C:\Users\dicke\AppData\Local\Temp\codex-shot-2026-06-29_06-52-24.png"
img = Image.open(img_path)
print(f"Image size: {img.size}")

text = pytesseract.image_to_string(img, lang='chi_sim+eng')
print("=== OCR Result ===")
print(text)
