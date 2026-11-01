import type { Metadata } from "next";
import { SchedulePlanner } from "@/components/schedule/schedule-planner";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "12-Month SysAdmin Study Schedule | SysAdmin Roadmap",
  description: "An interactive 12-month System Administration study schedule with weekly topics, practical tasks, milestones and curated resources."
};

export default function SchedulePage() {
  return <><SiteHeader /><SchedulePlanner /><SiteFooter /></>;
}
