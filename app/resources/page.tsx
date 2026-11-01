import type { Metadata } from "next";
import { ResourcesDirectory } from "@/components/roadmap/resources-directory";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "SysAdmin Learning Resources | SysAdmin Roadmap",
  description: "Search a curated library of official documentation, technical references and learning resources for System Administration."
};

export default function ResourcesPage() {
  return <><SiteHeader /><ResourcesDirectory /><SiteFooter /></>;
}
