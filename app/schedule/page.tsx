import type { Metadata } from "next";
import { SchedulePlanner } from "@/components/schedule/schedule-planner";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "SYSADMIN. | Schedule",
  description: "An interactive 12-month System Administration study schedule with weekly topics, practical tasks, milestones and curated resources."
};

export default function SchedulePage() {
  return <><SiteHeader /><SchedulePlanner /></>;
}
