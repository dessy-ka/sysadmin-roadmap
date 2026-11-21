import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Career Centre",
  description: "Explore certifications, career paths, portfolio projects and interview preparation for System Administration."
};

export default function CareerCenterPage() {
  redirect("/career-center/certifications");
}
