import fitz
from rapidocr_onnxruntime import RapidOCR
import json
import time

pdf_path = r'I:\新概念英语练习王\新概念英语（第一册） (路易·亚历山大).pdf'
output_path = r'I:\新概念英语练习王\scripts\ocr_output.json'

doc = fitz.open(pdf_path)
total_pages = len(doc)
print(f'Total pages: {total_pages}')

ocr = RapidOCR()

all_pages = []
start_time = time.time()

for page_idx in range(total_pages):
    page = doc[page_idx]
    pix = page.get_pixmap(dpi=150)
    img_bytes = pix.tobytes("png")
    
    result, _ = ocr(img_bytes)
    
    lines = []
    if result:
        lines = [line[1] for line in result]
    
    all_pages.append({
        "page": page_idx + 1,
        "lines": lines
    })
    
    if (page_idx + 1) % 10 == 0:
        elapsed = time.time() - start_time
        pages_done = page_idx + 1
        eta = elapsed / pages_done * (total_pages - pages_done)
        print(f'  Processed {pages_done}/{total_pages} pages ({elapsed:.0f}s elapsed, ~{eta:.0f}s remaining)')

doc.close()

# Save to JSON
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(all_pages, f, ensure_ascii=False, indent=2)

elapsed = time.time() - start_time
print(f'\nDone! {total_pages} pages processed in {elapsed:.0f}s')
print(f'Saved to {output_path}')
