"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    document.title = "SYSADMIN. | Error";
    // Keep the error visible to the hosting platform's runtime diagnostics.
    console.error("SysAdmin Roadmap page error:", error);
  }, [error]);

  return (
    <main id="main-content" className="inner-page status-page">
      <div className="container status-page-content">
        <Link href="/" className="brand status-page-brand" aria-label="SYSADMIN. home">
          <span className="brand-mark"><BrandMark /></span><span className="brand-name">SYSADMIN<span>.</span></span>
        </Link>
        <div className="status-page-icon status-page-icon-warning"><AlertTriangle size={26} /></div>
        
        <h1>Something interrupted this page.</h1>
        <p>Your saved roadmap and schedule progress remain in this browser. Try loading the page again.</p>
        {error.digest && <small className="error-digest">Reference: {error.digest}</small>}
        <div className="status-page-actions">
          <button className="button button-primary" type="button" onClick={() => reset()}><RefreshCw size={15} /> Try again</button>
          <Link className="status-page-back" href="/">Return to homepage</Link>
        </div>
      </div>
    </main>
  );
}
