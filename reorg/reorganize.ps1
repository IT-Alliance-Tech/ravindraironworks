# reorg/reorganize.ps1 - PowerShell reorganizer
# Usage: .\reorg\reorganize.ps1

param(
    [switch]$NoBuild
)

$ErrorActionPreference = 'Stop'

# Determine script directory robustly across invocation methods
$ScriptPath = $PSCommandPath
if (-not $ScriptPath) { $ScriptPath = $MyInvocation.MyCommand.Definition }
$ScriptDir = Split-Path -Parent $ScriptPath
$RepoRoot = Split-Path -Parent $ScriptDir
$MappingFile = Join-Path $RepoRoot 'reorg\mapping.json'
$MovesLog = Join-Path $RepoRoot 'reorg\moves.log'
$ChangesLog = Join-Path $RepoRoot 'reorg\changes.log'
$ManualReview = Join-Path $RepoRoot 'reorg\REORG_MANUAL_REVIEW.md'

Write-Host "Reorg PowerShell script starting..."
Write-Host "ScriptDir: $ScriptDir"
Write-Host "RepoRoot: $RepoRoot"
Write-Host "MappingFile: $MappingFile"

function Abort($msg) {
    Write-Host "ERROR: $msg" -ForegroundColor Red
    exit 1
}

# Check git
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Abort 'git not found on PATH. Install Git and try again.'
}

# Check mapping file
if (-not (Test-Path $MappingFile)) {
    Abort "Mapping file not found: $MappingFile"
}

# Ensure working tree is clean
$porcelain = git status --porcelain 2>$null
if (-not [string]::IsNullOrWhiteSpace($porcelain)) {
    Write-Host "Working tree is not clean. Please commit or stash changes before running." -ForegroundColor Yellow
    git status --porcelain
    Abort 'Aborting due to unclean working tree.'
}

# Read mapping.json
$mappingJson = Get-Content $MappingFile -Raw | ConvertFrom-Json
if (-not $mappingJson) { Abort 'Mapping JSON is empty or invalid.' }

# Prepare logs
if (-not (Test-Path (Join-Path $RepoRoot 'reorg'))) { New-Item -ItemType Directory -Path (Join-Path $RepoRoot 'reorg') | Out-Null }
"# Moves log generated: $(Get-Date -Format o)" | Out-File -FilePath $MovesLog -Encoding utf8
"# Changes log generated: $(Get-Date -Format o)" | Out-File -FilePath $ChangesLog -Encoding utf8
"# Manual review generated: $(Get-Date -Format o)" | Out-File -FilePath $ManualReview -Encoding utf8

# Perform moves
$movedCount = 0
foreach ($pair in $mappingJson.PSObject.Properties) {
    $old = $pair.Name
    $new = $pair.Value

    $oldPath = Join-Path $RepoRoot $old
    $newPath = Join-Path $RepoRoot $new
    $newDir = Split-Path -Parent $newPath

    if (-not (Test-Path $oldPath)) {
        Write-Host "WARN: Source not found, skipping: $old" -ForegroundColor Yellow
        Add-Content -Path $MovesLog -Value "WARN: Source not found, skipping: $old"
        continue
    }
    if (Test-Path $newPath) {
        Write-Host "ERROR: Target already exists: $new" -ForegroundColor Red
        Add-Content -Path $MovesLog -Value "ERROR: Target already exists: $new"
        Abort "Target already exists: $new"
    }

    if (-not (Test-Path $newDir)) { New-Item -ItemType Directory -Path $newDir -Force | Out-Null }

    # run git mv
    Write-Host "git mv '$old' '$new'"
    git mv -- "$old" "$new"
    Add-Content -Path $MovesLog -Value "git mv '$old' '$new'"
    $movedCount++
}

Write-Host "Moves complete. Files moved: $movedCount"

# Run Node import updater
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js not found on PATH. Skipping import update. Please run 'node reorg/update-imports.js' manually after installing Node.js." -ForegroundColor Yellow
} else {
    Write-Host "Running import updater: node reorg/update-imports.js"
    node reorg/update-imports.js
}

# Append the import-updater log to reorg/changes.log if exists
if (Test-Path $ChangesLog) {
    Write-Host "Updates logged to: $ChangesLog"
}
if (Test-Path $ManualReview) { Write-Host "Manual review file: $ManualReview" }

# Attempt build unless NoBuild set
if (-not $NoBuild) {
    # prefer npm run build if package.json has a build script
    $pkg = Join-Path $RepoRoot 'package.json'
    $hasBuild = $false
    if (Test-Path $pkg) {
        $pkgJson = Get-Content $pkg -Raw | ConvertFrom-Json
        if ($pkgJson.scripts -and $pkgJson.scripts.build) { $hasBuild = $true }
    }

    if ($hasBuild) {
        Write-Host "Running: npm run build"
        $buildResult = npm run build 2>&1
        Write-Host $buildResult
        if ($LASTEXITCODE -ne 0) {
            Write-Host "Build failed. See output above. Check .bak files and $ManualReview for manual fixes." -ForegroundColor Red
            exit 2
        }
    } else {
        # try next build
        Write-Host "No npm build script found. Attempting: npx next build"
        $buildResult = npx next build 2>&1
        Write-Host $buildResult
        if ($LASTEXITCODE -ne 0) {
            Write-Host "Build failed or next not available. Check .bak files and $ManualReview for manual fixes." -ForegroundColor Red
            exit 3
        }
    }
}

Write-Host "Reorganization finished successfully. See $MovesLog, $ChangesLog, and $ManualReview" -ForegroundColor Green

exit 0
