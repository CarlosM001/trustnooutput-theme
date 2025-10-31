@echo off
REM =====================================================
REM TRUST.NO.OUTPUT - Development Environment Test
REM =====================================================

echo.
echo =====================================
echo TRUST.NO.OUTPUT Dev Environment Test
echo =====================================
echo.

echo [1/5] Checking Shopify Theme Connection...
curl -s -o nul -w "Shopify Dev Server: %%{http_code}\n" http://127.0.0.1:9292 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Shopify dev server not responding on port 9292
) else (
    echo SUCCESS: Shopify dev server is running!
)
echo.

echo [2/5] Checking BrowserSync...
curl -s -o nul -w "BrowserSync Proxy: %%{http_code}\n" http://localhost:3000 2>nul
if %errorlevel% neq 0 (
    echo ERROR: BrowserSync not responding on port 3000
) else (
    echo SUCCESS: BrowserSync is running!
)
echo.

echo [3/5] Checking Theme Files...
set missing=0
if not exist assets\custom.css (
    echo MISSING: assets\custom.css
    set missing=1
)
if not exist assets\custom.js (
    echo MISSING: assets\custom.js
    set missing=1
)
if not exist sections\motion-hero-tno.liquid (
    echo MISSING: sections\motion-hero-tno.liquid
    set missing=1
)
if %missing%==0 (
    echo SUCCESS: All critical theme files present!
)
echo.

echo [4/5] Checking Node Modules...
if exist node_modules (
    echo SUCCESS: Node modules installed
) else (
    echo WARNING: Node modules not found. Run: npm install
)
echo.

echo [5/5] Testing File Watch...
echo.
echo =====================================
echo LIVE RELOAD TEST
echo =====================================
echo.
echo 1. Open http://localhost:3000 in your browser
echo 2. Make a small change to assets\custom.css
echo    (like changing a color value)
echo 3. Save the file
echo 4. Browser should auto-reload within 2 seconds
echo.
echo =====================================
echo.
echo Your development URLs:
echo - Shopify Dev: http://127.0.0.1:9292
echo - BrowserSync: http://localhost:3000
echo - BrowserSync UI: http://localhost:3001
echo - Theme Preview: https://9csvgi-16.myshopify.com/?preview_theme_id=186444382583
echo.
pause
