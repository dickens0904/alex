@echo off
echo ========================================
echo 新概念英语练习王 - 快速启动
echo ========================================
echo.

echo [1/3] 检查依赖...
if not exist "node_modules" (
    echo 未找到node_modules，正在安装依赖...
    call npm install
) else (
    echo 依赖已安装
)

echo.
echo [2/3] 启动开发服务器...
echo 这将启动Webpack开发服务器和Electron应用
echo.

echo [3/3] 启动应用...
call npm run dev

pause
