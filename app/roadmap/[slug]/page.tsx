import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { roadmapStages, getStageBySlug } from "@/data/roadmap";
import { StageDetail } from "@/components/roadmap/stage-detail";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return roadmapStages.map((stage) => ({ slug: stage.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const stage = getStageBySlug(slug);
  if (!stage) return { title: "Roadmap stage not found | SysAdmin Roadmap" };
  return {
    title: `${stage.title} | SysAdmin Roadmap`,
    description: stage.summary
  };
}

export default async function RoadmapStagePage({ params }: PageProps) {
  const { slug } = await params;
  const index = roadmapStages.findIndex((stage) => stage.slug === slug);
  if (index < 0) notFound();
  const stage = roadmapStages[index];
  const previous = index > 0 ? roadmapStages[index - 1] : undefined;
  const next = index < roadmapStages.length - 1 ? roadmapStages[index + 1] : undefined;

  return <><SiteHeader /><StageDetail stage={stage} previous={previous} next={next} /><SiteFooter /></>;
}
