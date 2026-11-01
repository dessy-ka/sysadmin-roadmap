# Deployment guide

This project is a Next.js App Router website. It does not require a database, account system or server-side user progress store.

## 1. Prepare the project

Use Node.js 22.13 or later. Run the setup helper for your operating system from the project root:

**Linux / macOS (Bash):**

```bash
bash ./scripts/setup.sh
```

**Windows PowerShell:**

```powershell
.\scripts\setup.ps1
```

Both helpers install the pinned pnpm 12.16.1 release without requiring Corepack or administrator access, import an existing npm lockfile when needed, and install dependencies. The Windows helper uses the current user’s `%APPDATA%\npm` directory; the Linux/macOS helper uses `~/.local/bin` when the system npm prefix is not writable. If the project already has a current `pnpm-lock.yaml`, the helpers use a frozen install to keep dependency installation reproducible. A lockfile created before the workspace override was moved is refreshed once so the override is recorded.

After the setup helper completes, run the project checks:

```bash
pnpm install
pnpm run check
pnpm run audit
pnpm run build
```

The `check` command runs the offline content/link checks, TypeScript type checking and ESLint. The production build is a separate required check.

The first successful install creates `pnpm-lock.yaml`. Commit that file and use `pnpm install --frozen-lockfile` for repeatable installs and deployment. The Dockerfile copies both `pnpm-workspace.yaml` and the lockfile before dependency installation; it requires the lockfile and fails fast if it is missing. Generate it locally before building the image. Do not use `npm install` for project dependencies.

## 2. Dependency and security review

Run `pnpm audit` (or `pnpm run audit`) after installation. The root `pnpm-workspace.yaml` includes a targeted override for affected `minimatch` 10.x paths, resolving them to patched `11.0.1`. pnpm 11 and later read this configuration from `pnpm-workspace.yaml`, not from `package.json`. Review the full advisory output and retest after any dependency update; avoid unrelated or broad dependency changes.

## 3. Deploy to Vercel

1. Push the project to a Git repository.
2. Import that repository into Vercel.
3. Keep the detected framework as **Next.js** and use the repository root as the project root.
4. Add the environment variable `NEXT_PUBLIC_SITE_URL` with the final public origin, for example `https://your-project.vercel.app` or your custom HTTPS domain. Do not add a trailing path.
5. Deploy using the standard Next.js build command: `pnpm run build`.
6. If using a custom domain, add it in the Vercel project settings and update `NEXT_PUBLIC_SITE_URL` to that domain, then redeploy.

Vercel deployment URLs are also detected as a fallback. Set `NEXT_PUBLIC_SITE_URL` before the build so page metadata uses the intended public domain. The sitemap and robots routes resolve the URL dynamically at request time.

After deployment, check:

- `/` — homepage
- `/roadmap` — roadmap explorer
- `/technologies` — technology directory
- `/career-center` — certification and career centre
- `/resources` — resource directory
- `/schedule` — interactive schedule
- `/robots.txt` — crawler rules
- `/sitemap.xml` — public page sitemap

## 4. Run with Docker

The included Dockerfile installs the pinned pnpm release directly with npm (no Corepack), requires `pnpm-lock.yaml` and uses frozen installs, uses Next.js standalone output, embeds the public origin during the build, runs the application as a non-root user and includes a container health check. Replace the example domain with the final HTTPS origin in both commands.

```bash
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=https://your-public-domain.example \
  -t sysadmin-roadmap .
docker run -d \
  --name sysadmin-roadmap \
  --restart unless-stopped \
  -p 3000:3000 \
  -e NEXT_PUBLIC_SITE_URL=https://your-public-domain.example \
  sysadmin-roadmap
```

Open `http://localhost:3000` on the Docker host. For public access, place the service behind a reverse proxy or hosting ingress that terminates HTTPS. Do not expose the Next.js development server to the public internet.

Useful container commands:

```bash
docker logs -f sysadmin-roadmap
docker restart sysadmin-roadmap
docker stop sysadmin-roadmap
docker rm sysadmin-roadmap
```

## 5. Browser progress and privacy

Roadmap topic completion and schedule task completion are stored in the visitor's browser using `localStorage`. This means:

- Progress is local to that browser and device.
- Clearing browser site data removes the saved progress.
- Progress does not sync across devices.
- The site does not currently provide accounts, server-side progress storage or analytics by default.

Do not describe the current progress feature as cloud-synchronised or account-backed.

## 6. Release checks

Before publishing a new version:

- Run `pnpm run check` and resolve all failures.
- Run `pnpm run build` with the same Node.js major version used in production.
- Test the homepage and every route on a narrow mobile viewport and a desktop viewport.
- Test dark/light theme switching, mobile navigation, filters, search, expandable content and progress persistence.
- Test the 404 page and the error recovery action.
- Confirm that `/robots.txt` and `/sitemap.xml` use the final public origin.
- Open the official documentation and certification links; providers may move pages or change exam details.
- Test keyboard-only navigation and reduced-motion settings.
- Review the browser console and hosting logs for runtime errors.

The offline QA script checks source syntax, local imports, hard-coded internal links, page anchors, new-tab link safety and data relationships. It does not test the live reachability of external websites or replace a production build and browser-based test pass.
