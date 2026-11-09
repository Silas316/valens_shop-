@echo off
setlocal EnableDelayedExpansion
chcp 65001 >nul
title Serveur Local - Valens Shop

echo ========================================================
echo        LANCEMENT DU SERVEUR LOCAL VALENS SHOP           
echo ========================================================
echo.

cd /d "%~dp0"

:: 1. Configuration des chemins Node.js et fnm
if exist "%APPDATA%\fnm\node-versions\v26.13.0\installation\node.exe" (
    set "PATH=%APPDATA%\fnm\node-versions\v26.13.0\installation;%PATH%"
)
if exist "%LOCALAPPDATA%\Microsoft\WinGet\Packages\Schniz.fnm_Microsoft.Winget.Source_8wekyb3d8bbwe\fnm.exe" (
    set "PATH=%LOCALAPPDATA%\Microsoft\WinGet\Packages\Schniz.fnm_Microsoft.Winget.Source_8wekyb3d8bbwe;%PATH%"
)

where node >nul 2>&1
if errorlevel 1 goto :no_node

echo [OK] Node.js detecte :
node -v
echo.

where pnpm >nul 2>&1
if errorlevel 1 goto :no_pnpm

echo [OK] pnpm detecte :
call pnpm.cmd -v
echo.

:: 3. Verifier si les dependances (Next.js) sont installees
if exist "node_modules\.bin\next.cmd" goto :deps_ready

echo [INFO] Premier lancement : Installation des dependances du projet...
echo Cela peut prendre quelques instants selon votre connexion Internet.
echo.
call pnpm.cmd install
if errorlevel 1 goto :install_error

:deps_ready
echo.
echo ========================================================
echo  Demarrage du serveur de developpement...
echo  L'application sera accessible sur : http://localhost:3000
echo ========================================================
echo.

start "" "http://localhost:3000"
call pnpm.cmd dev
goto :end

:no_node
echo.
echo [ERREUR] Node.js n'a pas pu etre detecte.
echo Veuillez telecharger et installer Node.js depuis https://nodejs.org/
goto :end

:no_pnpm
echo.
echo [INFO] Installation de pnpm...
call npm install -g pnpm@10.34.3 --allow-scripts=pnpm
if errorlevel 1 goto :end
echo [OK] pnpm installe avec succes.
goto :deps_ready

:install_error
echo.
echo [ERREUR] L'installation des dependances a echoue.
echo Verifiez votre connexion Internet et reessayez.
goto :end

:end
echo.
echo ========================================================
echo  Appuyez sur une touche pour fermer cette fenetre...
echo ========================================================
pause >nul
