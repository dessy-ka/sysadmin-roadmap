import { SchedulePlanner } from "@/components/schedule/schedule-planner";
import { SiteHeader } from "@/components/site-header";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Schedule",
  description: "An interactive 12-month System Administration study schedule with weekly topics, practical tasks, milestones and curated resources.",
  pathname: "/schedule"
});

export default function SchedulePage() {
  return <><SiteHeader /><SchedulePlanner /></>;
}
