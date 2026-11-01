/**
 * Resolve the canonical public origin without guessing a production domain.
 * Set NEXT_PUBLIC_SITE_URL for a custom domain. Vercel's deployment URL is
 * used as a safe fallback for preview and production deployments.
 */
export function getSiteUrl(): URL | null {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  const candidate = configured || (vercelHost ? `https://${vercelHost}` : undefined);

  if (!candidate) return null;

  try {
    const parsed = new URL(candidate);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;
    return new URL(parsed.origin);
  } catch {
    return null;
  }
}
