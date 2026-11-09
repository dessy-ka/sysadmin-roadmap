import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="container footer-main">
      <div className="footer-brand-block"><Link href="/" className="brand"><span className="brand-mark"><BrandMark /></span><span className="brand-name">SYSADMIN<span>.</span></span></Link><p>A practical guide to the systems, tools and infrastructure that power modern IT.</p></div>
      <div className="footer-links">
        <div><span className="footer-heading">Explore</span><Link href="/roadmap">The roadmap</Link><Link href="/technologies">Technologies & tools</Link><Link href="/career-center/certifications">Certifications</Link><Link href="/career-center/career-paths">Career paths</Link><Link href="/roadmap#stages">Labs & projects</Link></div>
        <div><span className="footer-heading">Reference</span><Link href="/resources">Learning resources</Link><Link href="/schedule">Interactive study schedule</Link><Link href="/career-center/portfolio-proof">Portfolio proof</Link><Link href="/career-center/interview-preparation">Interview preparation</Link></div>
      </div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} SysAdmin Roadmap. A technical knowledge guide.</span><Link href="/">Back to top <ArrowUpRight size={14} /></Link></div>
  </footer>;
}
