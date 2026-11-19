import { TechnologyDirectory } from "@/components/technologies/technology-directory";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Technologies",
  description: "Explore practical SysAdmin technology guides for Linux, Windows Server, networking, Proxmox, Docker, Kubernetes, Ansible, monitoring, databases and cloud platforms.",
  pathname: "/technologies"
});

export default function TechnologiesPage() {
  return <><SiteHeader /><TechnologyDirectory /></>;
}
