import { ResourcesDirectory } from "@/components/roadmap/resources-directory";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Resources",
  description: "Search a curated library of official documentation, technical references and learning resources for System Administration.",
  pathname: "/resources"
});

export default function ResourcesPage() {
  return <><SiteHeader /><ResourcesDirectory /></>;
}
