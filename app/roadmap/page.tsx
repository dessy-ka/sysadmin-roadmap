import type { Metadata } from "next";
import { RoadmapExplorer } from "@/components/roadmap/roadmap-explorer";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Complete SysAdmin Roadmap | SysAdmin Roadmap",
  description: "Explore the complete System Administration roadmap from IT fundamentals and networking to Linux, Windows, enterprise infrastructure, security, automation, cloud and SRE."
};

export default function RoadmapPage() {
  return <><SiteHeader /><RoadmapExplorer /><SiteFooter /></>;
}
