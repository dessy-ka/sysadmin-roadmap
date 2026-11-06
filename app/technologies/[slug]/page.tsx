import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTechnologyBySlug, technologies } from "@/data/technologies";
import { TechnologyDetail } from "@/components/technologies/technology-detail";
import { SiteHeader } from "@/components/site-header";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return technologies.map((technology) => ({ slug: technology.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const technology = getTechnologyBySlug(slug);
  if (!technology) return { title: "SYSADMIN. | Technology Not Found" };
  return { title: `SYSADMIN. | ${technology.name}`, description: technology.summary };
}

export default async function TechnologyPage({ params }: PageProps) {
  const { slug } = await params;
  const index = technologies.findIndex((technology) => technology.slug === slug);
  if (index < 0) notFound();
  return <><SiteHeader /><TechnologyDetail technology={technologies[index]} previous={index > 0 ? technologies[index - 1] : undefined} next={index < technologies.length - 1 ? technologies[index + 1] : undefined} /></>;
}
