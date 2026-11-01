# Changelog
## [0.2.3] - 2026-11-01

### Fixed
- Moved the `minimatch` dependency override from the deprecated `package.json#pnpm` field into `pnpm-workspace.yaml`, as required by pnpm 11 and later.
- Updated the Docker dependency stage to copy `pnpm-workspace.yaml` before installing dependencies so the override is applied in container builds.
- Updated the Windows setup helper to invoke `pnpm.cmd` and `npm.cmd` directly instead of PowerShell shims, avoiding stderr warnings being treated as terminating PowerShell errors.
- Added explicit native-command exit-code handling and version-output parsing to the Windows setup helper.
- Added QA checks for the pnpm workspace override configuration.
- Made both setup helpers refresh an older lockfile once when it does not yet record the active workspace override; subsequent installs remain frozen.

## [0.2.2] - 2026-11-01

### Added
- Added `scripts/setup.sh` for Linux and macOS Bash environments.
- Added user-level pnpm installation fallback for Linux/macOS systems where the global npm prefix is not writable.
- Updated the Windows PowerShell helper to install pnpm under the current user profile without administrator access.
- Added Node.js version checks and frozen-lockfile installs to both setup helpers.
- Documented Linux/macOS setup alongside the Windows PowerShell helper.

### Changed
- Both setup helpers validate Node.js, pin pnpm 12.16.1, import an existing npm lockfile when appropriate, and use frozen installs when a pnpm lockfile already exists.


## 0.2.1 — pnpm and dependency hardening

- Standardised the project on pnpm 12.16.1 and documented direct global installation; Corepack is no longer required for local setup or Docker builds.
- Added a Windows PowerShell setup helper that installs pnpm, imports an existing npm lockfile when available, and generates or updates `pnpm-lock.yaml`.
- Added a targeted pnpm override to resolve affected `minimatch` 10.x dependency paths to patched 11.0.1.
- Made Docker builds use a frozen pnpm lockfile and fail clearly when the lockfile has not yet been generated.
- Added npm lockfiles to `.gitignore` so pnpm remains the single committed lockfile format.
- A complete `pnpm-lock.yaml` cannot be generated in this environment because the package registry is unreachable and no npm lockfile was included with the project archive. Run `scripts/setup.ps1` on Windows or `scripts/setup.sh` on Linux/macOS to generate it from actual registry metadata.

## 0.1.1 — 2026-11-01

### Fixed

- Added the explicit Framer Motion `Variants` type to the shared homepage reveal animation, resolving the easing-type errors reported by TypeScript.
- Rebuilt restored roadmap progress as a typed completion map instead of passing an `Object.fromEntries` result with an inferred unknown value type.
- Ignored unknown roadmap topic IDs when toggling progress so only valid roadmap topics are stored.

### Dependencies and deployment

- Replaced floating `latest` dependency tags with exact, compatible package versions.
- Updated the lint toolchain to ESLint 10 and the matching Next.js 16.4.3 ESLint configuration. ESLint 9 is end-of-life, and the selected Next.js configuration supports ESLint 10.
- Declared Node.js 22.13 or later to satisfy the ESLint 10 runtime requirement.
- Added `npm run audit` for dependency vulnerability checks.
- Updated the Docker dependency stage to use `npm ci` when a lockfile exists, with an install fallback for a fresh source archive.
- Updated setup, audit and deployment documentation.

### Validation

- Offline QA passed: 34 TypeScript/TSX files, local imports, internal routes, anchors, external-link safety and cross-linked content.
- Full semantic typecheck, ESLint, `npm audit`, production build and live browser testing still need to be run on a machine with npm registry access. This editing environment could not resolve `registry.npmjs.org`, and the source archive did not contain installed dependencies or a lockfile.

## 0.2.0 — Visual refresh

- Refined the visual system with a calmer, more restrained colour palette and softer surfaces.
- Increased typography sizes across the homepage, roadmap, technology guides, resources, schedule and career centre.
- Improved navigation, buttons, card spacing, border radii and responsive layouts for a cleaner reading experience.
- Preserved the existing roadmap content, progress tracking, learning schedule, technology guides, resources and career tools.
