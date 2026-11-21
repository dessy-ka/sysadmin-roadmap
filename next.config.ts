import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content-Security-Policy rollout.
 *
 * Start in "report-only": the browser logs what the policy WOULD block in the
 * devtools console but blocks nothing. Browse every page, check the console for
 * "[Report Only]" messages, then change this to "enforce" once it is clean.
 *
 * Why 'unsafe-inline' for scripts and styles: this site is statically generated,
 * and Next.js emits small inline scripts (the React flight payload, theme
 * bootstrap) whose contents differ on every page, so no single hash covers them.
 * Two ways to drop 'unsafe-inline' for scripts exist, each with a cost: a nonce
 * forces every page to render dynamically (no static pages or CDN caching), and
 * Next's experimental `sri` option generates per-page hashes but is still
 * experimental, so this config does not use it yet.
 * Inline `style` attributes (Framer Motion, React style props) also need
 * 'unsafe-inline' for styles. Everything else is locked to same-origin.
 */
const cspMode = "report-only" as "report-only" | "enforce";

const cspDirectives = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`, // React needs eval for dev-only debugging
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  // Ignored by browsers in report-only mode; X-Frame-Options: DENY below already covers framing until then.
  ...(cspMode === "enforce" ? ["frame-ancestors 'none'"] : [])
];

const contentSecurityPolicy = {
  key: cspMode === "enforce" ? "Content-Security-Policy" : "Content-Security-Policy-Report-Only",
  value: cspDirectives.join("; ")
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: "standalone",
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          contentSecurityPolicy,
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }
        ]
      }
    ];
  }
};

export default nextConfig;
