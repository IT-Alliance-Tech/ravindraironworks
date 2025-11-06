param(
    [bool]$AUTO_RUN_DESTRUCTIVE = $true
)

$log = "./reorg_install_debug.log"
$devlog = "./reorg_dev.log"

function Log { param($m) $t = Get-Date -Format o; $line = "[$t] $m"; $line | Out-File -FilePath $log -Append -Encoding utf8; Write-Host $line }

# Header
"===== reorg install debug run =====" | Out-File -FilePath $log -Encoding utf8
$(Get-Date) | Out-File -FilePath $log -Append -Encoding utf8

Log "Starting sanity checks"

# Sanity & setup
Log "PWD: $(pwd)"
Log "git --version: $(git --version 2>&1)"
Log "node --version: $(node --version 2>&1)"
Log "npm --version: $(npm --version 2>&1)"

Log "Repository root listing:" 
Get-ChildItem -Name | Out-File -FilePath $log -Append -Encoding utf8

# Check git state
$gitStatus = git status --porcelain
Log "git status --porcelain output:"; $gitStatus | Out-File -FilePath $log -Append -Encoding utf8

$backupBranchCreated = $false
$didStash = $false

if ($gitStatus) {
    # decide commit vs stash
    $staged = git diff --cached --name-only
    $changed = ($gitStatus | Measure-Object -Line).Lines
    if ($staged -or $changed -ge 5) {
        # create backup branch and commit
        $ts = Get-Date -Format "yyyyMMdd-HHmmss"
        $branch = "reorg/install-backup-$ts"
        Log "Creating backup branch $branch and committing current changes"
        git branch $branch 2>&1 | Out-File -FilePath $log -Append -Encoding utf8
        git add -A 2>&1 | Out-File -FilePath $log -Append -Encoding utf8
        git commit -m "backup: pre-install changes $ts" 2>&1 | Out-File -FilePath $log -Append -Encoding utf8
        $backupBranchCreated = $true
    } else {
        Log "Stashing WIP changes"
        git stash push -m "reorg/install-stash-$(Get-Date -Format 'yyyyMMdd-HHmmss')" 2>&1 | Out-File -FilePath $log -Append -Encoding utf8
        $didStash = $true
    }
} else {
    Log "Git working tree clean"
}

# Validate react-countup
$pkg = Get-Content package.json -Raw | ConvertFrom-Json
$rcNeeded = $false
if ($pkg.dependencies.PSObject.Properties.Name -contains 'react-countup') { $rcNeeded = $true }

if ($rcNeeded) {
    Log "react-countup entry found in package.json; querying npm registry for available versions"
    npm view react-countup versions --json 2>&1 | Out-File -FilePath .\reorg_npm_view.log -Encoding utf8
    try {
        $versions = (Get-Content .\reorg_npm_view.log -Raw) | ConvertFrom-Json
        $latest = $versions[-1]
        Log "Latest react-countup on registry: $latest"
    } catch {
        Log "Failed to parse registry response for react-countup"
        $versions = @()
    }

    $specified = $pkg.dependencies.'react-countup'
    Log "package.json specifies react-countup: $specified"

    $specifiedClean = $specified -replace '[^0-9\.\-]',''
    if ($versions -and -not ($versions -contains $specifiedClean)) {
        # pick latest or fallback
        if ($latest) { $chosen = $latest } else { $chosen = '6.3.2' }
        Log "Updating package.json react-countup to ^$chosen"
        $pkg.dependencies.'react-countup' = "^$chosen"
        $pkg | ConvertTo-Json -Depth 10 | Out-File -FilePath package.json -Encoding utf8
        git add package.json 2>&1 | Out-File -FilePath $log -Append -Encoding utf8
        git commit -m "chore: fix react-countup version for install" 2>&1 | Out-File -FilePath $log -Append -Encoding utf8
        Log "Committed package.json update"
    } else {
        Log "No change required for react-countup"
    }
} else {
    Log "react-countup not present in package.json"
}

# Attempt normal install
Log "Running npm install (first attempt)"
npm install 2>&1 | Tee-Object -FilePath $log -Append
$exit = $LASTEXITCODE
if ($exit -eq 0) {
    Log "npm install succeeded"
} else {
    Log "npm install failed with exit code $exit; checking for ETARGET or missing version errors"
    $text = Get-Content $log -Raw
    if ($text -match 'No matching version found|ETARGET') {
        Log "Detected ETARGET or no matching version in npm output"
        Log "Running npm cache clean --force and retrying"
        npm cache clean --force 2>&1 | Tee-Object -FilePath $log -Append
        npm install 2>&1 | Tee-Object -FilePath $log -Append
        if ($LASTEXITCODE -ne 0) {
            if ($AUTO_RUN_DESTRUCTIVE) {
                Log "Destructive mode enabled: removing node_modules and package-lock.json and retrying"
                if (Test-Path .\node_modules) { Remove-Item -Recurse -Force .\node_modules 2>&1 | Tee-Object -FilePath $log -Append }
                if (Test-Path .\package-lock.json) { Remove-Item -Force .\package-lock.json 2>&1 | Tee-Object -FilePath $log -Append }
                npm install 2>&1 | Tee-Object -FilePath $log -Append
                if ($LASTEXITCODE -ne 0) {
                    Log "npm install still failing after destructive cleanup. Stopping."
                    Get-Content $log -Tail 200 | Out-File -FilePath .\reorg_install_debug_tail.log -Encoding utf8
                    Log "Wrote last 200 lines to reorg_install_debug_tail.log"
                    exit 1
                }
            } else {
                Log "AUTO_RUN_DESTRUCTIVE is false; stopping before removing node_modules/package-lock.json"
                exit 1
            }
        }
    } else {
        Log "npm install failed for other reasons; attempting cache clean and retry"
        npm cache clean --force 2>&1 | Tee-Object -FilePath $log -Append
        npm install 2>&1 | Tee-Object -FilePath $log -Append
        if ($LASTEXITCODE -ne 0) {
            if ($AUTO_RUN_DESTRUCTIVE) {
                Log "Destructive mode enabled: removing node_modules and package-lock.json and retrying"
                if (Test-Path .\node_modules) { Remove-Item -Recurse -Force .\node_modules 2>&1 | Tee-Object -FilePath $log -Append }
                if (Test-Path .\package-lock.json) { Remove-Item -Force .\package-lock.json 2>&1 | Tee-Object -FilePath $log -Append }
                npm install 2>&1 | Tee-Object -FilePath $log -Append
                if ($LASTEXITCODE -ne 0) {
                    Log "npm install still failing after destructive cleanup. Stopping."
                    Get-Content $log -Tail 200 | Out-File -FilePath .\reorg_install_debug_tail.log -Encoding utf8
                    Log "Wrote last 200 lines to reorg_install_debug_tail.log"
                    exit 1
                }
            } else {
                Log "AUTO_RUN_DESTRUCTIVE is false; stopping before removing node_modules/package-lock.json"
                exit 1
            }
        }
    }
}

# Verify react-countup installed or add fallback
$rcPath = Join-Path -Path "node_modules" -ChildPath "react-countup"
if (Test-Path $rcPath) {
    Log "react-countup installed at $rcPath"
    $usedFallback = $false
} else {
    Log "react-countup not installed; adding CountUp fallback component"
    $fallbackPath = "components/shared/CountUpFallback.jsx"
    if (-not (Test-Path (Split-Path $fallbackPath -Parent))) { New-Item -ItemType Directory -Path (Split-Path $fallbackPath -Parent) -Force | Out-Null }
    @"
import React, { useEffect, useState, useRef } from 'react'

export default function CountUpFallback({ end = 0, duration = 2, decimals = 0, prefix = '', suffix = '' }) {
  const [value, setValue] = useState(0)
  const startRef = useRef(null)

  useEffect(() => {
    let raf;
    const start = performance.now();
    const from = 0;
    const to = Number(end) || 0;

    function tick(now) {
      if (!startRef.current) startRef.current = now
      const elapsed = (now - startRef.current) / 1000
      const t = Math.min(elapsed / duration, 1)
      const current = from + (to - from) * t
      setValue(Number(current.toFixed(decimals)))
      if (t < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [end, duration, decimals])

  return <span>{prefix}{value}{suffix}</span>
}
"@ | Out-File -FilePath $fallbackPath -Encoding utf8
    git add $fallbackPath 2>&1 | Tee-Object -FilePath $log -Append
    git commit -m "chore: add CountUp fallback" 2>&1 | Tee-Object -FilePath $log -Append
    $usedFallback = $true
}

# Start dev server and smoke test
Log "Starting dev server and capturing logs to $devlog"
# Start npm dev in background and append output to dev log
# Use Start-Process to avoid blocking; redirect output via cmd /c
Start-Process -FilePath cmd -ArgumentList "/c npm run dev 2>&1 | Tee-Object -FilePath $devlog -Append" -NoNewWindow
Start-Sleep -Seconds 4

if (Test-Path $devlog) { Get-Content $devlog -Tail 200 | Out-File -FilePath .\reorg_dev_tail.log -Encoding utf8 }

# Check for success markers
$devText = ""
if (Test-Path $devlog) { $devText = Get-Content $devlog -Raw }

if ($devText -match 'Compiled|ready|Starting...|Ready in') {
    Log "Dev server appears to have started and compiled pages"
    $serverStarted = $true
} else {
    Log "Dev server did not show expected startup/compile messages within initial window"
    $serverStarted = $false
}

# Basic runtime checks
try {
    $home = Invoke-WebRequest -Uri http://localhost:3000 -UseBasicParsing -ErrorAction SilentlyContinue
    $contact = Invoke-WebRequest -Uri http://localhost:3000/contact -UseBasicParsing -ErrorAction SilentlyContinue
    "$($home.StatusCode) home, $($contact.StatusCode) contact" | Out-File -FilePath $log -Append -Encoding utf8
} catch {
    Log "HTTP checks failed or connection refused"
    if (Test-Path $devlog) { Get-Content $devlog -Tail 200 | Out-File -FilePath .\reorg_install_debug_tail.log -Encoding utf8 }
    Log "Wrote last 200 lines of dev log to reorg_install_debug_tail.log"
    exit 1
}

# Cleanup: restore stash if used
if ($didStash) {
    Log "Restoring stashed changes"
    git stash pop 2>&1 | Tee-Object -FilePath $log -Append
}

# Final summary
Log "=== Final summary ==="
Log "Git branches: $(git branch --list)"
Log "npm --version: $(npm --version 2>&1)"
Log "node --version: $(node --version 2>&1)"
if ($usedFallback) { Log "react-countup not installed; used fallback CountUp at components/shared/CountUpFallback.jsx" } else { Log "react-countup available in node_modules" }

Log "Tail of reorg_install_debug.log (last 120 lines):"
Get-Content $log -Tail 120 | Out-File -FilePath .\reorg_install_debug_tail_120.log -Encoding utf8

# Print the last 120 lines to stdout as requested
Get-Content .\reorg_install_debug_tail_120.log -Raw
