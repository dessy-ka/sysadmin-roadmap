import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/site-url";

type PageMetadataInput = {
  title: string;
  description: string;
  pathname: string;
};

export function createPageMetadata({ title, description, pathname }: PageMetadataInput): Metadata {
  const canonical = getCanonicalUrl(pathname);
  const imageAlt = `SYSADMIN. — ${title}`;
  const openGraphImage = {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: imageAlt
  };
  const twitterImage = {
    url: "/twitter-image",
    width: 1200,
    height: 630,
    alt: imageAlt
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
      images: [openGraphImage],
      ...(canonical ? { url: canonical } : {})
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [twitterImage]
    }
  };
}
