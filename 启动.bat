@echo off
echo ========================================
echo NCE Practice King - Quick Start
echo ========================================
echo.

echo [1/3] Checking dependencies...
if not exist "node_modules" (
    echo node_modules not found, installing...
    call npm install
) else (
    echo Dependencies OK
)

echo.
echo [2/3] Starting dev server + Electron app...
echo.

call npm run dev

pause
