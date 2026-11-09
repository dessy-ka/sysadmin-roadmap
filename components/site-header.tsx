"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { BrandMark } from "@/components/brand-mark";

const links = [
  { label: "Overview", href: "/" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Technologies", href: "/technologies" },
  { label: "Resources", href: "/resources" },
  { label: "Schedule", href: "/schedule" }
];

const careerLinks = [
  { label: "Certifications", href: "/career-center/certifications" },
  { label: "Career paths", href: "/career-center/career-paths" },
  { label: "Portfolio proof", href: "/career-center/portfolio-proof" },
  { label: "Interview preparation", href: "/career-center/interview-preparation" }
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [careerOpen, setCareerOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!careerOpen) return;
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) setCareerOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCareerOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [careerOpen]);

  const closeMenus = () => {
    setOpen(false);
    setCareerOpen(false);
  };

  return (
    <header className="site-header" ref={headerRef}>
      <div className="container header-inner">
        <Link href="/" className="brand" onClick={closeMenus} aria-label="SysAdmin Roadmap home">
          <span className="brand-mark"><BrandMark /></span><span className="brand-name">SYSADMIN<span>.</span></span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.slice(0, 3).map((link) => <Link key={link.href} href={link.href} onClick={closeMenus}>{link.label}</Link>)}
          <div className="career-nav-dropdown">
            <button type="button" className="career-nav-trigger" aria-haspopup="true" aria-expanded={careerOpen} aria-controls="career-nav-menu" onClick={() => setCareerOpen((value) => !value)}>Career Center <ChevronDown size={14} /></button>
            {careerOpen && <div id="career-nav-menu" className="career-nav-menu">{careerLinks.map((link) => <Link key={link.href} href={link.href} onClick={closeMenus}>{link.label}</Link>)}</div>}
          </div>
          {links.slice(3).map((link) => <Link key={link.href} href={link.href} onClick={closeMenus}>{link.label}</Link>)}
        </nav>
        <div className="header-actions">
          <Link className="header-cta" href="/roadmap">View roadmap <ArrowUpRight size={15} /></Link>
          <ThemeToggle />
          <button className="icon-button mobile-menu-button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" type="button" onClick={() => { setOpen((value) => !value); setCareerOpen(false); }}>{open ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </div>
      <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!open}>
        {links.slice(0, 3).map((link) => <Link key={link.href} href={link.href} onClick={closeMenus}>{link.label}</Link>)}
        <button type="button" className="mobile-nav-parent" aria-expanded={careerOpen} aria-controls="mobile-career-subnav" onClick={() => setCareerOpen((value) => !value)}>Career Center <ChevronDown size={16} /></button>
        {careerOpen && <div id="mobile-career-subnav" className="mobile-career-subnav">{careerLinks.map((link) => <Link key={link.href} href={link.href} onClick={closeMenus}>{link.label}</Link>)}</div>}
        {links.slice(3).map((link) => <Link key={link.href} href={link.href} onClick={closeMenus}>{link.label}</Link>)}
        <Link href="/roadmap#stages" onClick={closeMenus}>Labs &amp; projects</Link>
      </nav>
    </header>
  );
}
