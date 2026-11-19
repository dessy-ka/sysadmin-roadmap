import { RoadmapExplorer } from "@/components/roadmap/roadmap-explorer";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Roadmap",
  description: "Explore the complete System Administration roadmap from IT fundamentals and networking to Linux, Windows, enterprise infrastructure, security, automation, cloud and SRE.",
  pathname: "/roadmap"
});

export default function RoadmapPage() {
  return <><SiteHeader /><RoadmapExplorer /></>;
}
