import type { Metadata } from "next";
import { ResourcesDirectory } from "@/components/roadmap/resources-directory";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "SYSADMIN. | Resources",
  description: "Search a curated library of official documentation, technical references and learning resources for System Administration."
};

export default function ResourcesPage() {
  return <><SiteHeader /><ResourcesDirectory /></>;
}
