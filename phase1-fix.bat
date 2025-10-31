@echo off
REM =====================================================
REM TRUST.NO.OUTPUT - Phase 1 Quick Fix Implementation
REM =====================================================

echo.
echo ========================================
echo TRUST.NO.OUTPUT Theme - Phase 1 Fixes
echo ========================================
echo.

REM Check if we're in the right directory
if not exist "layout\theme.liquid" (
    echo ERROR: This script must be run from your theme root directory!
    echo Please navigate to your theme folder and run again.
    pause
    exit /b 1
)

echo This script will:
echo 1. Backup your current files
echo 2. Apply all Phase 1 fixes
echo 3. Prepare for Phase 2
echo.
echo Press CTRL+C to cancel, or
pause

REM Create backup directory
echo Creating backup...
mkdir backup-phase1 2>nul
copy assets\custom.css backup-phase1\custom.css.bak >nul 2>&1
copy assets\custom.js backup-phase1\custom.js.bak >nul 2>&1
if exist sections\section-test-motion.liquid (
    copy sections\section-test-motion.liquid backup-phase1\section-test-motion.liquid.bak >nul 2>&1
)
echo Backup created in backup-phase1\
echo.

REM Apply fixes
echo Applying fixes...
echo.

REM Note: You need to manually copy the fixed files from the review
echo TODO: Copy the following files from the review:
echo - custom.css to assets\custom.css
echo - custom.js to assets\custom.js
echo - motion-hero-tno.liquid to sections\motion-hero-tno.liquid
echo - package.json to root directory
echo - bs-config.js to root directory
echo.

REM Remove old section file if it exists
if exist sections\section-test-motion.liquid (
    echo Removing old section file...
    del sections\section-test-motion.liquid
)

REM Install npm packages if package.json exists
if exist package.json (
    echo.
    echo Installing npm packages...
    call npm install
    echo.
)

REM Create .env file if it doesn't exist
if not exist .env (
    echo Creating .env template...
    (
        echo SHOPIFY_CLI_THEME_5be784247b12216efa712b
        echo SHOPIFY_FLAG_STORE=9csvgi-16.myshopify.com
        echo SHOPIFY_CLI_TTY=1
    ) > .env
    echo .env file created - please add your token!
    echo.
)

REM Create .shopifyignore if it doesn't exist
if not exist .shopifyignore (
    echo Creating .shopifyignore...
    (
        echo node_modules/
        echo .env
        echo .env.*
        echo *.log
        echo .DS_Store
        echo Thumbs.db
        echo .vscode/
        echo package-lock.json
        echo backup-phase1/
    ) > .shopifyignore
    echo .shopifyignore created
    echo.
)

echo.
echo ========================================
echo Phase 1 Fix Implementation Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Copy the fixed files from the review to your theme
echo 2. Update .env with your Shopify token
echo 3. Run: shopify theme push
echo 4. Test in Theme Editor
echo.
echo To start development:
echo   npm run dev:windows
echo.
echo Good luck with Phase 2!
echo.
pause
