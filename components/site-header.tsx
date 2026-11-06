"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { BrandMark } from "@/components/brand-mark";

const links = [
  { label: "Overview", href: "/" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Technologies", href: "/technologies" },
  { label: "Career centre", href: "/career-center" },
  { label: "Resources", href: "/resources" },
  { label: "Schedule", href: "/schedule" }
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)} aria-label="SysAdmin Roadmap home">
          <span className="brand-mark"><BrandMark /></span><span className="brand-name">SYSADMIN<span>.</span></span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">{links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}</nav>
        <div className="header-actions">
          <Link className="header-cta" href="/roadmap">View roadmap <ArrowUpRight size={15} /></Link>
          <ThemeToggle />
          <button className="icon-button mobile-menu-button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" type="button" onClick={() => setOpen((value) => !value)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </div>
      <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!open}>{[...links, { label: "Labs & projects", href: "/roadmap#stages" }].map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}</nav>
    </header>
  );
}
