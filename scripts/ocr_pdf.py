import fitz
from rapidocr_onnxruntime import RapidOCR
import sys

pdf_path = r'I:\新概念英语练习王\新概念英语（第一册） (路易·亚历山大).pdf'
doc = fitz.open(pdf_path)
print(f'Total pages: {len(doc)}')

# Initialize OCR
ocr = RapidOCR()

# Test with page 1 (cover page) and page 5 (should have lesson content)
test_pages = [0, 4, 5, 6, 7, 8]  # 0-indexed

for page_idx in test_pages:
    page = doc[page_idx]
    # Render page to image
    pix = page.get_pixmap(dpi=150)
    img_bytes = pix.tobytes("png")
    
    # OCR
    result, _ = ocr(img_bytes)
    
    print(f'\n=== Page {page_idx + 1} ===')
    if result:
        for line in result[:20]:  # First 20 lines
            print(f'  {line[1]}')
    else:
        print('  [No text detected]')

doc.close()
