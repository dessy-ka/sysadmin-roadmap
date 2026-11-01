#!/usr/bin/env bash
set -Eeuo pipefail

# Bootstrap the SysAdmin Roadmap project on Linux/macOS using the pinned pnpm release.
readonly REQUIRED_NODE_MAJOR=22
readonly REQUIRED_NODE_MINOR=13
readonly REQUIRED_PNPM_VERSION="12.16.1"
readonly USER_NPM_PREFIX="${HOME}/.local"

log() { printf '\n\033[1;36m[setup]\033[0m %s\n' "$*"; }
fail() { printf '\n\033[1;31m[setup] ERROR:\033[0m %s\n' "$*" >&2; exit 1; }

# Always run from the project root, regardless of the caller's current directory.
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd -- "${SCRIPT_DIR}/.." && pwd)"
cd "$PROJECT_ROOT"

command -v node >/dev/null 2>&1 || fail "Node.js was not found. Install Node.js 22.13 or later, then run this script again."
command -v npm >/dev/null 2>&1 || fail "npm was not found. Install Node.js 22.13 or later (which includes npm), then run this script again."

node_version="$(node --version | sed 's/^v//')"
IFS=. read -r node_major node_minor _ <<< "$node_version"
if [[ ! "$node_major" =~ ^[0-9]+$ || ! "$node_minor" =~ ^[0-9]+$ ]]; then
  fail "Could not parse Node.js version '$node_version'."
fi
if (( node_major < REQUIRED_NODE_MAJOR || (node_major == REQUIRED_NODE_MAJOR && node_minor < REQUIRED_NODE_MINOR) )); then
  fail "Node.js ${REQUIRED_NODE_MAJOR}.${REQUIRED_NODE_MINOR} or later is required; found ${node_version}."
fi

if [[ ! -f package.json ]]; then
  fail "package.json was not found. Run this script from a copy of the SysAdmin Roadmap project."
fi
if [[ ! -f pnpm-workspace.yaml ]]; then
  fail "pnpm-workspace.yaml is missing. Restore the project configuration file before running setup."
fi

current_pnpm_version=""
if command -v pnpm >/dev/null 2>&1; then
  current_pnpm_version="$(pnpm --version 2>/dev/null || true)"
fi

if [[ "$current_pnpm_version" != "$REQUIRED_PNPM_VERSION" ]]; then
  log "Installing the project's pinned pnpm ${REQUIRED_PNPM_VERSION} (Corepack is not required)."

  global_prefix="$(npm config get prefix 2>/dev/null || true)"
  global_bin="${global_prefix%/}/bin"
  if [[ -n "$global_prefix" && ( -w "$global_prefix" || -w "$global_bin" ) ]]; then
    if ! npm install --global "pnpm@${REQUIRED_PNPM_VERSION}"; then
      fail "Could not install pnpm globally. Check your npm permissions or use a user-level npm prefix."
    fi
    if [[ -x "${global_bin}/pnpm" ]]; then
      export PATH="${global_bin}:${PATH}"
    fi
  else
    log "The system npm directory is not writable; installing pnpm for this user under ${USER_NPM_PREFIX}."
    mkdir -p "$USER_NPM_PREFIX"
    npm install --global --prefix "$USER_NPM_PREFIX" "pnpm@${REQUIRED_PNPM_VERSION}"

    # Make user-level npm binaries available now and in future common Bash/Zsh sessions.
    export PATH="${USER_NPM_PREFIX}/bin:${PATH}"
    shell_name="$(basename "${SHELL:-bash}")"
    case "$shell_name" in
      zsh) shell_rc="${HOME}/.zshrc" ;;
      bash) shell_rc="${HOME}/.bashrc" ;;
      *) shell_rc="${HOME}/.profile" ;;
    esac
    path_line='export PATH="$HOME/.local/bin:$PATH"'
    touch "$shell_rc"
    if ! grep -Fqx "$path_line" "$shell_rc"; then
      {
        printf '\n# Added by the SysAdmin Roadmap setup script (user-level npm binaries).\n'
        printf '%s\n' "$path_line"
      } >> "$shell_rc"
    fi
  fi
fi

# Resolve the just-installed command even if the shell's PATH was not refreshed.
if ! command -v pnpm >/dev/null 2>&1 && [[ -x "${USER_NPM_PREFIX}/bin/pnpm" ]]; then
  export PATH="${USER_NPM_PREFIX}/bin:${PATH}"
fi
command -v pnpm >/dev/null 2>&1 || fail "pnpm was installed but is not on PATH. Open a new terminal and run this script again."
current_pnpm_version="$(pnpm --version)"
[[ "$current_pnpm_version" == "$REQUIRED_PNPM_VERSION" ]] || fail "Expected pnpm ${REQUIRED_PNPM_VERSION}, but found ${current_pnpm_version}. Check your PATH and remove conflicting pnpm installations."

if [[ -f package-lock.json && ! -f pnpm-lock.yaml ]]; then
  log "Found package-lock.json; importing it into pnpm format."
  pnpm import || fail "pnpm could not import package-lock.json. Review the npm lockfile before retrying."
fi

if [[ -f pnpm-lock.yaml ]] && grep -Fq 'minimatch@^10.0.0: 11.0.1' pnpm-lock.yaml; then
  log "Installing dependencies from the current pnpm lockfile."
  pnpm install --frozen-lockfile || fail "Dependency installation failed. Check the output above and verify that package.json, pnpm-workspace.yaml and pnpm-lock.yaml are in sync."
else
  if [[ -f pnpm-lock.yaml ]]; then
    log "The existing lockfile predates the active pnpm-workspace.yaml override; refreshing it."
  else
    log "No pnpm lockfile found; resolving dependencies and generating pnpm-lock.yaml."
  fi
  pnpm install || fail "Dependency installation failed. Check your internet connection and package registry access."
fi

[[ -f pnpm-lock.yaml ]] || fail "Installation finished without creating pnpm-lock.yaml. Check the pnpm output above."

log "Setup complete. Node.js ${node_version}; pnpm ${current_pnpm_version}."
printf 'Start the development server with: pnpm dev\n'
printf 'Run project checks with: pnpm run check\n'
