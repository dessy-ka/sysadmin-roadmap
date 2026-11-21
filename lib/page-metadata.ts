import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/site-url";

// Bump when the social image artwork changes so link-preview caches fetch the new one.
const SOCIAL_IMAGE_VERSION = "2";

type PageMetadataInput = {
  title: string;
  description: string;
  pathname: string;
};

export function createPageMetadata({ title, description, pathname }: PageMetadataInput): Metadata {
  const canonical = getCanonicalUrl(pathname);
  const socialImage = {
    url: `/opengraph-image?v=${SOCIAL_IMAGE_VERSION}`,
    width: 1200,
    height: 630,
    alt: `SYSADMIN. — ${title}`
  };

  return {
    title,
    description,
    ...(canonical ? { alternates: { canonical } } : {}),
    openGraph: {
      type: "website",
      title,
      description,
      siteName: "SYSADMIN.",
      locale: "en_GB",
      images: [socialImage],
      ...(canonical ? { url: canonical } : {})
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage]
    }
  };
}
