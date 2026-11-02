import type { Metadata } from "next";
import { CareerCenter } from "@/components/career-center/career-center";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "SYSADMIN. | Career Center",
  description: "Compare SysAdmin certifications, explore infrastructure career paths, build a practical portfolio and prepare for Linux, Windows, networking, cloud and systems administration interviews."
};

export default function CareerCenterPage() {
  return <><SiteHeader /><CareerCenter /><SiteFooter /></>;
}
