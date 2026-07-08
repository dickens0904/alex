"""列出所有可见窗口的类名和标题"""
import ctypes
import ctypes.wintypes

user32 = ctypes.windll.user32

windows = []
def callback(hwnd, lParam):
    if user32.IsWindowVisible(hwnd):
        pid = ctypes.wintypes.DWORD()
        user32.GetWindowThreadProcessId(hwnd, ctypes.byref(pid))
        cls = ctypes.create_unicode_buffer(256)
        user32.GetClassNameW(hwnd, cls, 256)
        title = ctypes.create_unicode_buffer(512)
        user32.GetWindowTextW(hwnd, title, 512)
        rect = ctypes.wintypes.RECT()
        user32.GetWindowRect(hwnd, ctypes.byref(rect))
        w = rect.right - rect.left
        h = rect.bottom - rect.top
        if w > 100 and h > 100:
            windows.append((hwnd, pid.value, cls.value, title.value, w, h))
    return True

WNDENUMPROC = ctypes.WINFUNCTYPE(ctypes.wintypes.BOOL, ctypes.wintypes.HWND, ctypes.wintypes.LPARAM)
user32.EnumWindows(WNDENUMPROC(callback), 0)

print(f"Found {len(windows)} visible windows:\n")
for hwnd, pid, cls, title, w, h in windows:
    print(f"hwnd={hwnd} pid={pid} class={cls} size={w}x{h}")
    print(f"  title: {title[:80]}")
    print()
