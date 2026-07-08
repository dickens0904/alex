# 自动前置 Electron 窗口并截屏
Add-Type -Name Win32 -Namespace Native -MemberDefinition '
[DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
[DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
[DllImport("user32.dll")] public static extern bool BringWindowToTop(IntPtr hWnd);
[DllImport("user32.dll")] public static extern IntPtr GetForegroundWindow();
[DllImport("user32.dll")] public static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint pid);
[DllImport("kernel32.dll")] public static extern uint GetCurrentThreadId();
[DllImport("user32.dll")] public static extern bool AttachThreadInput(uint a, uint b, bool c);
'

$procs = Get-Process -Name electron -ErrorAction SilentlyContinue
$target = $null
foreach ($p in $procs) {
    if ($p.MainWindowHandle -ne 0) { $target = $p; break }
}
if (-not $target) { Write-Host "NO_ELECTRON_WINDOW"; exit 1 }

$hwnd = $target.MainWindowHandle
[Native.Win32]::ShowWindow($hwnd, 9) | Out-Null
Start-Sleep -Milliseconds 200
$fg = [Native.Win32]::GetForegroundWindow()
$fgPid = 0; $fgTh = [Native.Win32]::GetWindowThreadProcessId($fg, [ref]$fgPid)
$myTh = [Native.Win32]::GetCurrentThreadId()
if ($fgTh -ne $myTh) { [Native.Win32]::AttachThreadInput($myTh, $fgTh, $true) | Out-Null }
[Native.Win32]::BringWindowToTop($hwnd) | Out-Null
[Native.Win32]::SetForegroundWindow($hwnd) | Out-Null
if ($fgTh -ne $myTh) { [Native.Win32]::AttachThreadInput($myTh, $fgTh, $false) | Out-Null }
Start-Sleep -Milliseconds 800

$nowFg = [Native.Win32]::GetForegroundWindow()
Write-Host "FOCUSED: $($nowFg -eq $hwnd)"
