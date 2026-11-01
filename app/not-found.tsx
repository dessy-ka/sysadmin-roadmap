import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="inner-page status-page">
        <div className="container status-page-content">
          <div className="status-page-icon"><Compass size={26} /></div>
          <span className="eyebrow">404 / PAGE NOT FOUND</span>
          <h1>This page isn't on the map.</h1>
          <p>The address may have changed, or the page may no longer exist. You can return to the roadmap and continue exploring.</p>
          <div className="status-page-actions">
            <Link className="button button-primary" href="/roadmap">Explore the roadmap</Link>
            <Link className="status-page-back" href="/"><ArrowLeft size={15} /> Back to homepage</Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
