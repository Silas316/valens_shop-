# Script de lancement du serveur local - Valens Shop
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force -ErrorAction SilentlyContinue
$ErrorActionPreference = "Continue"

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "       LANCEMENT DU SERVEUR LOCAL VALENS SHOP           " -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""

Set-Location -Path $PSScriptRoot

# 1. Configuration des chemins Node.js et fnm
$nodeInstallDir = "$env:APPDATA\fnm\node-versions\v26.13.0\installation"
if (Test-Path "$nodeInstallDir\node.exe") {
    if ($env:PATH -notlike "*$nodeInstallDir*") {
        $env:PATH = "$nodeInstallDir;$env:PATH"
    }
}

$fnmDir = "$env:LOCALAPPDATA\Microsoft\WinGet\Packages\Schniz.fnm_Microsoft.Winget.Source_8wekyb3d8bbwe"
if (Test-Path "$fnmDir\fnm.exe") {
    if ($env:PATH -notlike "*$fnmDir*") {
        $env:PATH = "$fnmDir;$env:PATH"
    }
}

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "[ERREUR] Node.js introuvable." -ForegroundColor Red
    Write-Host "Veuillez télécharger et installer Node.js depuis https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Appuyez sur Entrée pour quitter..."
    Exit 1
}

$nodeVer = node -v
Write-Host "[OK] Node.js détecté : $nodeVer" -ForegroundColor Green

# 2. Vérification de pnpm
if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
    Write-Host "[INFO] Installation de pnpm..." -ForegroundColor Yellow
    npm install -g pnpm@10.34.3 --allow-scripts=pnpm
}

$pnpmVer = pnpm -v
Write-Host "[OK] pnpm détecté : $pnpmVer" -ForegroundColor Green
Write-Host ""

# 3. Vérification des dépendances (Next.js)
if (-not (Test-Path "node_modules\.bin\next.cmd")) {
    Write-Host "[INFO] Premier lancement : Installation des dépendances du projet..." -ForegroundColor Yellow
    Write-Host "Cela peut prendre quelques instants selon votre connexion Internet..." -ForegroundColor Yellow
    Write-Host ""
    & pnpm.cmd install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERREUR] L'installation des dépendances a échoué." -ForegroundColor Red
        Read-Host "Appuyez sur Entrée pour quitter..."
        Exit 1
    }
}

# 4. Lancement du serveur et ouverture du navigateur
Write-Host ""
Write-Host "========================================================" -ForegroundColor Green
Write-Host " Serveur en cours de démarrage sur http://localhost:3000 " -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Green
Write-Host ""

Start-Process "http://localhost:3000"
& pnpm.cmd dev

Read-Host "Appuyez sur Entrée pour fermer..."
