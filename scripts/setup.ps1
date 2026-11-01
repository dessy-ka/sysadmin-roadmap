$ErrorActionPreference = "Stop"
$requiredPnpmVersion = "12.16.1"
$minimumNodeVersion = [version]"22.13.0"

# PowerShell 7.3+ can optionally turn native stderr into terminating errors.
# We handle native exit codes explicitly, so disable that preference when available.
if (Test-Path variable:PSNativeCommandUseErrorActionPreference) {
  $PSNativeCommandUseErrorActionPreference = $false
}

# Always run from the project root, regardless of the caller's current directory.
$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

function Invoke-NativeCommand {
  param(
    [Parameter(Mandatory = $true)][string]$FilePath,
    [Parameter(Mandatory = $true)][string[]]$Arguments,
    [Parameter(Mandatory = $true)][string]$FailureMessage
  )

  # Native tools may write warnings to stderr. Keep the script running and
  # rely on LASTEXITCODE rather than treating stderr text as a PowerShell failure.
  $previousErrorActionPreference = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  try {
    & $FilePath @Arguments
    $nativeExitCode = $LASTEXITCODE
  } finally {
    $ErrorActionPreference = $previousErrorActionPreference
  }

  if ($nativeExitCode -ne 0) {
    throw "$FailureMessage (exit code $nativeExitCode)."
  }
}

function Get-NativeCommandOutput {
  param(
    [Parameter(Mandatory = $true)][string]$FilePath,
    [Parameter(Mandatory = $true)][string[]]$Arguments,
    [Parameter(Mandatory = $true)][string]$FailureMessage
  )

  $previousErrorActionPreference = $ErrorActionPreference
  $ErrorActionPreference = "Continue"
  try {
    $nativeOutput = @(& $FilePath @Arguments 2>&1)
    $nativeExitCode = $LASTEXITCODE
  } finally {
    $ErrorActionPreference = $previousErrorActionPreference
  }

  if ($nativeExitCode -ne 0) {
    throw "$FailureMessage (exit code $nativeExitCode)."
  }

  return @($nativeOutput | ForEach-Object { $_.ToString() })
}

function Resolve-PnpmCmd {
  $command = Get-Command "pnpm.cmd" -ErrorAction SilentlyContinue
  if ($command -and $command.Source) { return $command.Source }

  if ($env:APPDATA) {
    $userPnpmCmd = Join-Path (Join-Path $env:APPDATA "npm") "pnpm.cmd"
    if (Test-Path $userPnpmCmd) { return $userPnpmCmd }
  }

  return $null
}

function Get-PnpmVersion {
  param([Parameter(Mandatory = $true)][string]$PnpmCmd)
  $output = Get-NativeCommandOutput -FilePath $PnpmCmd -Arguments @("--version") -FailureMessage "Could not read the installed pnpm version."
  $versionLine = @($output | Where-Object { $_ -match '^\s*v?\d+\.\d+\.\d+\s*$' } | Select-Object -Last 1)
  if ($versionLine.Count -eq 0) { throw "pnpm did not return a readable version. Output: $($output -join ' | ')" }
  return $versionLine[0].Trim().TrimStart('v')
}

$nodeCommand = Get-Command "node.exe" -ErrorAction SilentlyContinue
if (-not $nodeCommand) {
  throw "Node.js was not found. Install Node.js 22.13 or later, then reopen PowerShell."
}

$nodeVersionOutput = Get-NativeCommandOutput -FilePath $nodeCommand.Source -Arguments @("--version") -FailureMessage "Could not read the Node.js version."
$nodeVersionText = ($nodeVersionOutput | Select-Object -Last 1).Trim().TrimStart('v')
try {
  $nodeVersion = [version]$nodeVersionText
} catch {
  throw "Could not parse Node.js version '$nodeVersionText'."
}
if ($nodeVersion -lt $minimumNodeVersion) {
  throw "Node.js 22.13.0 or later is required; found $nodeVersionText."
}

$npmCommand = Get-Command "npm.cmd" -ErrorAction SilentlyContinue
if (-not $npmCommand) {
  throw "npm was not found. Reinstall Node.js 22.13 or later, then reopen PowerShell."
}

if (-not (Test-Path "package.json")) {
  throw "package.json was not found. This script must be part of the SysAdmin Roadmap project."
}
if (-not (Test-Path "pnpm-workspace.yaml")) {
  throw "pnpm-workspace.yaml is missing. Restore the project configuration file before running setup."
}

$pnpmCmd = Resolve-PnpmCmd
$currentPnpmVersion = ""
if ($pnpmCmd) {
  try { $currentPnpmVersion = Get-PnpmVersion -PnpmCmd $pnpmCmd } catch { $currentPnpmVersion = "" }
}

if ($currentPnpmVersion -ne $requiredPnpmVersion) {
  if (-not $env:APPDATA) {
    throw "APPDATA is not set, so a per-user pnpm installation path could not be determined."
  }

  # Use the standard per-user npm global directory to avoid writing to Program Files.
  $userNpmPrefix = Join-Path $env:APPDATA "npm"
  New-Item -ItemType Directory -Force -Path $userNpmPrefix | Out-Null

  Write-Host "Installing pnpm $requiredPnpmVersion for the current user (Corepack and administrator access are not required)..." -ForegroundColor Cyan
  Invoke-NativeCommand -FilePath $npmCommand.Source -Arguments @("install", "--global", "--prefix", $userNpmPrefix, "pnpm@$requiredPnpmVersion") -FailureMessage "Could not install pnpm into '$userNpmPrefix'. Check your internet connection and npm output."

  # Make pnpm available in this terminal immediately.
  $env:Path = "$userNpmPrefix;$env:Path"

  # Persist the user-level PATH entry for future terminals.
  $userPath = [Environment]::GetEnvironmentVariable("Path", "User")
  $pathEntries = @($userPath -split ';' | Where-Object { $_ })
  if (-not ($pathEntries | Where-Object { $_.TrimEnd('\') -ieq $userNpmPrefix.TrimEnd('\') })) {
    $newUserPath = if ([string]::IsNullOrWhiteSpace($userPath)) { $userNpmPrefix } else { "$userNpmPrefix;$userPath" }
    [Environment]::SetEnvironmentVariable("Path", $newUserPath, "User")
  }
}

$pnpmCmd = Resolve-PnpmCmd
if (-not $pnpmCmd -and $env:APPDATA) {
  $userPnpmCmd = Join-Path (Join-Path $env:APPDATA "npm") "pnpm.cmd"
  if (Test-Path $userPnpmCmd) { $pnpmCmd = $userPnpmCmd }
}
if (-not $pnpmCmd) {
  throw "pnpm was installed but pnpm.cmd is not on PATH. Close and reopen PowerShell, then run this script again."
}

$currentPnpmVersion = Get-PnpmVersion -PnpmCmd $pnpmCmd
if ($currentPnpmVersion -ne $requiredPnpmVersion) {
  throw "Expected pnpm $requiredPnpmVersion but found '$currentPnpmVersion'. Check your PATH and remove conflicting pnpm installations."
}

if ((Test-Path "package-lock.json") -and -not (Test-Path "pnpm-lock.yaml")) {
  Write-Host "Found package-lock.json. Importing it into pnpm format..." -ForegroundColor Cyan
  Invoke-NativeCommand -FilePath $pnpmCmd -Arguments @("import") -FailureMessage "pnpm could not import package-lock.json. Review the lockfile before retrying."
}

Write-Host "Installing project dependencies..." -ForegroundColor Cyan
$lockfileIsCurrent = $false
if (Test-Path "pnpm-lock.yaml") {
  $lockfileText = Get-Content "pnpm-lock.yaml" -Raw
  $lockfileIsCurrent = $lockfileText.Contains("minimatch@^10.0.0: 11.0.1")
}

if ($lockfileIsCurrent) {
  Invoke-NativeCommand -FilePath $pnpmCmd -Arguments @("install", "--frozen-lockfile") -FailureMessage "pnpm install failed. Review the error output above."
} else {
  if (Test-Path "pnpm-lock.yaml") {
    Write-Host "The existing lockfile predates the active pnpm-workspace.yaml override; refreshing it..." -ForegroundColor Yellow
  }
  Invoke-NativeCommand -FilePath $pnpmCmd -Arguments @("install") -FailureMessage "pnpm install failed. Review the error output above."
}

if (-not (Test-Path "pnpm-lock.yaml")) {
  throw "pnpm install completed but pnpm-lock.yaml was not created. Check the install output above."
}

Write-Host "`nSetup complete. Node.js $nodeVersionText; pnpm $currentPnpmVersion." -ForegroundColor Green
Write-Host "Start the website with: pnpm dev"
