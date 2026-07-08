Add-Type -Name Win32 -Namespace Native -MemberDefinition '
[DllImport("user32.dll")]
public static extern bool SetForegroundWindow(IntPtr hWnd);
[DllImport("user32.dll")]
public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
'

$electron = Get-Process -Name electron -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowHandle -ne 0 } | Select-Object -First 1

if ($electron) {
    [Native.Win32]::ShowWindow($electron.MainWindowHandle, 9)  # SW_RESTORE
    Start-Sleep -Milliseconds 500
    [Native.Win32]::SetForegroundWindow($electron.MainWindowHandle)
    Start-Sleep -Milliseconds 500
    Write-Host "Electron window focused: PID=$($electron.Id)"

    # Take screenshot
    $timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
    $outPath = "$env:TEMP\electron-shot-$timestamp.png"
    powershell -ExecutionPolicy Bypass -File "C:\Users\dicke\.trae-cn\skills\screenshot\scripts\take_screenshot.ps1" -Mode temp -Path $outPath
    Write-Host "Screenshot saved to: $outPath"
} else {
    Write-Host "Electron process not found or has no window"
}
