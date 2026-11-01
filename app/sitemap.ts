import type { MetadataRoute } from "next";
import { roadmapStages } from "@/data/roadmap";
import { technologies } from "@/data/technologies";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return [];

  const staticPages: MetadataRoute.Sitemap = [
    { url: new URL("/", siteUrl).toString(), changeFrequency: "weekly", priority: 1 },
    { url: new URL("/roadmap", siteUrl).toString(), changeFrequency: "monthly", priority: 0.9 },
    { url: new URL("/technologies", siteUrl).toString(), changeFrequency: "monthly", priority: 0.9 },
    { url: new URL("/career-center", siteUrl).toString(), changeFrequency: "monthly", priority: 0.8 },
    { url: new URL("/resources", siteUrl).toString(), changeFrequency: "monthly", priority: 0.8 },
    { url: new URL("/schedule", siteUrl).toString(), changeFrequency: "monthly", priority: 0.8 }
  ];

  const roadmapPages: MetadataRoute.Sitemap = roadmapStages.map((stage) => ({
    url: new URL(`/roadmap/${stage.slug}`, siteUrl).toString(),
    changeFrequency: "monthly",
    priority: 0.7
  }));

  const technologyPages: MetadataRoute.Sitemap = technologies.map((technology) => ({
    url: new URL(`/technologies/${technology.slug}`, siteUrl).toString(),
    changeFrequency: "monthly",
    priority: 0.7
  }));

  return [...staticPages, ...roadmapPages, ...technologyPages];
}
