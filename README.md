# SysAdmin Roadmap

A SysAdmin-focused knowledge and roadmap website — not an LMS, online course platform or user-generated learning management system.

## Current release

The website is now a multi-section System Administration knowledge and roadmap portal, with a roadmap explorer, detailed technology guides, a certification and career centre, a resource library and an interactive 12-month study plan. The 0.2.0 visual refresh introduces a calmer, more restrained interface, more generous spacing and larger, more readable typography throughout. This is a reference and planning website, not an LMS.

### Main experience

- Responsive homepage with a clean technical/editorial visual style, generous whitespace and clearer content hierarchy.
- Dark and light themes.
- Responsive desktop and mobile navigation.
- Animated infrastructure illustration and subtle section reveals.
- Eight roadmap stages from IT fundamentals to advanced infrastructure engineering.
- Detailed stage pages with objectives, prerequisites, learning topics, subtopics, labs, projects, outcomes, certification guidance and exit criteria.
- Expandable topic cards with optional command examples and practical tasks.
- Topic-level completion tracking, saved locally in the visitor's browser.
- Roadmap-wide search and level filters.
- Searchable resource directory with category and access-type filters.
- Dedicated Technologies & Tools Directory with 16 individual field guides across nine technical categories.
- Career Centre with a searchable certification directory, exam-objective maps, up-to-three certification comparison, role progression paths, portfolio evidence ideas and original technical interview practice questions.
- Technology guides explain what each platform is, why administrators use it, where it fits in infrastructure, core concepts, safe setup steps, lab requirements, practical exercises, operational practices and official documentation.
- Technology guides connect directly to relevant roadmap stages and the curated resource library.
- 45 curated learning resources mapped to relevant roadmap stages.
- Interactive 12-month study schedule with 48 weekly plans, 144 practical tasks, monthly milestones and linked learning resources.
- Adjustable weekly study-hour target and estimated timeline.
- Schedule task completion tracking, month filters and progress indicators saved locally in the visitor's browser.
- Homepage overview, infrastructure illustration, projects, technology disciplines and career direction preview.
- Accessible skip-to-content link, visible keyboard focus, custom 404 and recoverable page-error screen.
- Search-engine metadata, `robots.txt` and an environment-aware `sitemap.xml`.
- Security response headers, Next.js standalone output and Docker/Vercel deployment configuration.
- Offline QA script for TypeScript/TSX syntax, local imports, internal routes, anchors, external-link safety and cross-linked content.

## Technology

- Next.js App Router
- React and TypeScript
- Framer Motion
- Lucide React
- next-themes

## Run locally

**Requirements:** Node.js 22.13 or later and pnpm 12.16.1.

This project uses pnpm directly. Corepack is not required.

### Windows PowerShell

From the project root, run the setup helper:

```powershell
.\scripts\setup.ps1
```

The helper installs the pinned pnpm version into the current user’s npm directory (no administrator access or Corepack required), imports an existing `package-lock.json` when one is present, and creates `pnpm-lock.yaml`. If a current pnpm lockfile already exists, it installs from that lockfile without changing it. A lockfile created before the workspace override was moved is refreshed once so the security override is recorded.

### Linux (Bash) and macOS

From the project root, run the setup helper:

```bash
bash ./scripts/setup.sh
```

The helper checks that Node.js 22.13 or later is installed, installs the pinned pnpm 12.16.1 release without Corepack, and installs project dependencies. If the system-wide npm directory is not writable, it installs pnpm under `~/.local/bin` and adds that directory to the current user's Bash or Zsh startup file. If an existing `package-lock.json` is present and no pnpm lockfile exists, it imports the npm lockfile before installing. When `pnpm-lock.yaml` already exists, it uses a frozen install to protect reproducibility.

After a successful install, keep `pnpm-lock.yaml` in version control and remove any old npm lockfile from the repository. Do not run `npm install` for project dependencies.

Start the development server:

```bash
pnpm dev
```

Open http://localhost:3000.

## Project checks and production build

```bash
pnpm run check
pnpm run audit
pnpm run build
pnpm start
```

`pnpm run check` runs offline content/link QA, TypeScript type checking and ESLint. The production build is a separate required check. The root `pnpm-workspace.yaml` applies a targeted override that resolves affected `minimatch` 10.x dependency paths to patched `11.0.1`; pnpm 11 and later read project settings from this file rather than the `pnpm` field in `package.json`. Verify the complete dependency tree with `pnpm audit` after installation.

`pnpm qa` can be run independently and validates the content graph and local links; it does not test external URL availability or replace a production build.

## Routes

- `/` — homepage and overview
- `/roadmap` — complete roadmap explorer
- `/roadmap/it-fundamentals` — Stage 00
- `/roadmap/networking` — Stage 01
- `/roadmap/linux-windows-administration` — Stage 02
- `/roadmap/enterprise-administration` — Stage 03
- `/roadmap/infrastructure-operations` — Stage 04
- `/roadmap/security-automation` — Stage 05
- `/roadmap/cloud-hybrid` — Stage 06
- `/roadmap/advanced-engineering` — Stage 07
- `/technologies` — searchable technologies and tools directory
- `/career-center` — certification comparisons, career paths, portfolio guidance and interview preparation
- `/technologies/linux-server` — example Linux Server field guide (16 technology guides are available)
- `/resources` — searchable resource library
- `/schedule` — interactive 12-month study schedule

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for Vercel and Docker instructions, environment configuration, browser-progress behaviour and the release checklist. The project includes `.nvmrc`, `vercel.json`, a Dockerfile and an `.env.example` template. Set `NEXT_PUBLIC_SITE_URL` to the final public origin before deployment so metadata URL base and the sitemap use the correct host.

## Progress tracking

Topic completion is stored in the visitor's browser using local storage. It is not an account-based service and does not sync between devices or browsers.

## Content and accuracy notes

The detailed roadmap is based on the supplied 2026–2027 System Administrator Roadmap and its resource companion. Certification names, exam codes, pricing, cloud free tiers, course availability and external links can change. Verify current details with the issuing organisation or provider before paying or deploying paid cloud resources.

The roadmap is a learning guide, not a substitute for safe change control, vendor documentation, production security policies or supervised experience in a live environment.

## Release validation status

- Offline QA checks: passed.
- TypeScript/TSX syntax transpilation: passed.
- TypeScript fixes are applied to the shared animation variants and restored progress map. Full TypeScript semantic check, ESLint run, dependency audit, Next.js production build and live browser tests must still be run after installing dependencies in an environment with registry access. The lockfile must be generated locally (or imported from an existing npm lockfile) before reproducible deployment.
- External URL reachability: not checked; verify important vendor and certification links before release.
