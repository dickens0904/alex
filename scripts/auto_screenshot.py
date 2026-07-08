"""自动截屏 + OCR：前置 Electron 窗口，截屏，OCR 识别"""
import ctypes
import ctypes.wintypes
import time
import struct
import os

user32 = ctypes.windll.user32
gdi32 = ctypes.windll.gdi32

def find_electron_hwnd():
    """找到标题为'新概念英语练习王'的 Electron 窗口"""
    result_hwnd = None
    def callback(hwnd, lParam):
        nonlocal result_hwnd
        if user32.IsWindowVisible(hwnd):
            title = ctypes.create_unicode_buffer(512)
            user32.GetWindowTextW(hwnd, title, 512)
            if "新概念英语练习王" in title.value:
                result_hwnd = hwnd
        return True
    WNDENUMPROC = ctypes.WINFUNCTYPE(ctypes.wintypes.BOOL, ctypes.wintypes.HWND, ctypes.wintypes.LPARAM)
    user32.EnumWindows(WNDENUMPROC(callback), 0)
    return result_hwnd

def main():
    hwnd = find_electron_hwnd()
    if not hwnd:
        print("ERROR: Electron window not found!")
        return
    print(f"Found window: hwnd={hwnd}")

    # 前置
    user32.ShowWindow(hwnd, 9)  # SW_RESTORE
    time.sleep(0.3)
    user32.BringWindowToTop(hwnd)
    user32.SetForegroundWindow(hwnd)
    time.sleep(0.8)

    fg = user32.GetForegroundWindow()
    print(f"Foreground match: {fg == hwnd}")

    # 获取窗口区域
    rect = ctypes.wintypes.RECT()
    user32.GetWindowRect(hwnd, ctypes.byref(rect))
    x, y = rect.left, rect.top
    w = rect.right - rect.left
    h = rect.bottom - rect.top
    print(f"Window rect: {x},{y} {w}x{h}")

    # 截屏（整个屏幕）
    screen_w = user32.GetSystemMetrics(0)
    screen_h = user32.GetSystemMetrics(1)

    hdc_screen = user32.GetDC(0)
    hdc_mem = gdi32.CreateCompatibleDC(hdc_screen)
    hbitmap = gdi32.CreateCompatibleBitmap(hdc_screen, screen_w, screen_h)
    gdi32.SelectObject(hdc_mem, hbitmap)
    gdi32.BitBlt(hdc_mem, 0, 0, screen_w, screen_h, hdc_screen, 0, 0, 0x00CC0020)

    timestamp = time.strftime("%Y%m%d_%H%M%S")
    img_path = os.path.join(os.environ['TEMP'], f"electron_screen_{timestamp}.png")

    from PIL import Image

    bmi = struct.pack('IiiHHIIiiII', 40, screen_w, -screen_h, 1, 32, 0, 0, 0, 0, 0, 0)
    bmi_buf = ctypes.create_string_buffer(bmi)
    buf = ctypes.create_string_buffer(screen_w * screen_h * 4)
    gdi32.GetDIBits(hdc_mem, hbitmap, 0, screen_h, buf, bmi_buf, 0)

    img = Image.frombuffer('RGBA', (screen_w, screen_h), buf, 'raw', 'BGRA', 0, 1)
    img.save(img_path)
    print(f"Screenshot: {img_path}")

    gdi32.DeleteObject(hbitmap)
    gdi32.DeleteDC(hdc_mem)
    user32.ReleaseDC(0, hdc_screen)

    # 裁剪到 Electron 窗口区域
    crop = img.crop((x, y, x + w, y + h))
    crop_path = os.path.join(os.environ['TEMP'], f"electron_crop_{timestamp}.png")
    crop.save(crop_path)
    print(f"Cropped: {crop_path}")

    # OCR
    from rapidocr_onnxruntime import RapidOCR
    ocr = RapidOCR()
    result, _ = ocr(crop_path)
    if result:
        sorted_items = sorted(result, key=lambda x: x[0][0][1])
        lines = []
        for item in sorted_items:
            text = item[1]
            item_y = item[0][0][1]
            item_x = item[0][0][0]
            lines.append(f"[y={int(item_y):4d} x={int(item_x):4d}] {text}")
        ocr_text = '\n'.join(lines)
    else:
        ocr_text = "No text detected"

    print(f"\n=== OCR Result ===\n{ocr_text}")

    result_path = os.path.join(os.environ['TEMP'], f"ocr_result_{timestamp}.txt")
    with open(result_path, 'w', encoding='utf-8') as f:
        f.write(ocr_text)
    print(f"\nSaved: {result_path}")

if __name__ == '__main__':
    main()
