# Changelog
## [Unreleased]

### Changed
- All stylesheets now sit in named CSS cascade layers (`base`, `roadmap`, `schedule`, `technologies`, `career`, `a11y`, `refresh`, `overrides`), declared once at the top of `app/globals.css`. A later layer now beats an earlier one regardless of selector specificity, so the visual refresh no longer relies on being loaded last. Rendering is unchanged: computed styles were compared against the previous build across every page, three viewport widths, both themes, and click, hover and keyboard-focus states.
- Added `app/styles/overrides.css` for the four rules that used to win on specificity over a generic `visual-refresh.css` rule. Each is commented with the rule it beats.

## [0.2.4] - 2026-11-19

### Security
- Upgraded `next` and `eslint-config-next` from 16.4.3 to 16.4.5, which resolves two moderate advisories (GHSA-mfr8-8qww-v76h and GHSA-vc7v-qv4w-wrv8). `pnpm audit` now reports no known vulnerabilities.
- Pinned `geist` to an exact version (1.9.1) to match the other dependencies.

### Fixed
- Resource stage keys now use the same 1–8 numbering as the roadmap stages (they were 0–7 with a +1 applied when displayed). This fixes `pnpm run check`, which was failing in the QA step.
- The QA script validated the stage route map inside the per-resource loop, repeating each error 45 times. It now validates the map once and also checks that every number matches the stage that owns the slug.
- The roadmap level filter no longer hides Stage 03 and Stage 04. Stages now carry a structured `levels` list (checked by QA) instead of matching free-text display copy.
- Saved progress no longer flashes as 0% on first load; progress widgets stay hidden until browser progress has been restored.

### Accessibility
- Framer Motion animations now honour `prefers-reduced-motion` through `MotionConfig`.
- Filter buttons on the roadmap, schedule and career centre expose their state with `aria-pressed` (and explicit `type="button"`).
- The stage detail panel no longer re-announces its whole content on every selection; a short status message announces the selected topic instead.

### Documentation and tooling
- README stage routes now match the 01–08 numbering, and the stale release-validation status was replaced with the current checks.
- Added a GitHub Actions workflow that runs check, audit and build on every push and pull request.

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
