import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CareerCenter, type CareerCenterSection } from "@/components/career-center/career-center";
import { SiteHeader } from "@/components/site-header";

const sections: CareerCenterSection[] = ["certifications", "career-paths", "portfolio-proof", "interview-preparation"];
const sectionTitles: Record<CareerCenterSection, string> = {
  certifications: "Certifications",
  "career-paths": "Career Paths",
  "portfolio-proof": "Portfolio Proof",
  "interview-preparation": "Interview Preparation"
};

type PageProps = { params: Promise<{ section: string }> };

export function generateStaticParams() {
  return sections.map((section) => ({ section }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { section } = await params;
  if (!sections.includes(section as CareerCenterSection)) return { title: "SYSADMIN. | Career Center" };
  const title = sectionTitles[section as CareerCenterSection];
  return { title: `SYSADMIN. | ${title}`, description: `${title} guidance for System Administration careers.` };
}

export default async function CareerCenterSectionPage({ params }: PageProps) {
  const { section } = await params;
  if (!sections.includes(section as CareerCenterSection)) notFound();

  return <><SiteHeader /><CareerCenter section={section as CareerCenterSection} /></>;
}
