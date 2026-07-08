Add-Type -Name Win32 -Namespace Native -MemberDefinition '
[DllImport("user32.dll")]
public static extern bool SetForegroundWindow(IntPtr hWnd);
[DllImport("user32.dll")]
public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
[DllImport("user32.dll")]
public static extern void SwitchToThisWindow(IntPtr hWnd, bool fUnknown);
[DllImport("user32.dll")]
public static extern IntPtr GetForegroundWindow();
[DllImport("user32.dll")]
public static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint lpdwProcessId);
[DllImport("kernel32.dll")]
public static extern uint GetCurrentThreadId();
[DllImport("user32.dll")]
public static extern bool AttachThreadInput(uint idAttach, uint idAttachTo, bool fAttach);
[DllImport("user32.dll")]
public static extern bool BringWindowToTop(IntPtr hWnd);
'

# Get all electron processes
$procs = Get-Process -Name electron -ErrorAction SilentlyContinue
$target = $null
foreach ($p in $procs) {
    if ($p.MainWindowHandle -ne 0) {
        $target = $p
        break
    }
}

if (-not $target) {
    Write-Host "No electron window found"
    exit 1
}

$hwnd = $target.MainWindowHandle
Write-Host "Target HWND: $hwnd PID: $($target.Id)"

# Show and restore
[Native.Win32]::ShowWindow($hwnd, 9) | Out-Null  # SW_RESTORE
Start-Sleep -Milliseconds 200

# Attach thread input to allow SetForegroundWindow
$fgHwnd = [Native.Win32]::GetForegroundWindow()
$fgPid = 0
$fgThread = [Native.Win32]::GetWindowThreadProcessId($fgHwnd, [ref]$fgPid)
$myThread = [Native.Win32]::GetCurrentThreadId()

if ($fgThread -ne $myThread) {
    [Native.Win32]::AttachThreadInput($myThread, $fgThread, $true) | Out-Null
}

[Native.Win32]::BringWindowToTop($hwnd) | Out-Null
[Native.Win32]::SetForegroundWindow($hwnd) | Out-Null

if ($fgThread -ne $myThread) {
    [Native.Win32]::AttachThreadInput($myThread, $fgThread, $false) | Out-Null
}

Start-Sleep -Milliseconds 800

$nowFg = [Native.Win32]::GetForegroundWindow()
Write-Host "Foreground window: $nowFg (target: $hwnd)"
Write-Host "Match: $($nowFg -eq $hwnd)"
