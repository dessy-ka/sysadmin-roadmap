import type { Metadata } from "next";
import { TechnologyDirectory } from "@/components/technologies/technology-directory";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "SYSADMIN. | Technologies",
  description: "Explore practical SysAdmin technology guides for Linux, Windows Server, networking, Proxmox, Docker, Kubernetes, Ansible, monitoring, databases and cloud platforms."
};

export default function TechnologiesPage() {
  return <><SiteHeader /><TechnologyDirectory /></>;
}
