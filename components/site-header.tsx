"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
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
  const pathname = usePathname();
  // The button points at /roadmap, so it is redundant on the home page (its hero has the same action) and on /roadmap itself.
  const showRoadmapCta = pathname !== "/" && pathname !== "/roadmap";

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const closeMenus = () => {
    setOpen(false);
    setCareerOpen(false);
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" onClick={closeMenus} aria-label="SysAdmin Roadmap home">
          <span className="brand-mark"><BrandMark /></span><span className="brand-name">SYSADMIN<span>.</span></span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.slice(0, 3).map((link) => (
            <Link key={link.href} href={link.href} onClick={closeMenus} className={isLinkActive(link.href) ? "is-active" : ""}>
              {link.label}
            </Link>
          ))}
          <div className="career-nav-dropdown">
            <DropdownMenu.Root open={careerOpen} onOpenChange={setCareerOpen}>
              <DropdownMenu.Trigger asChild>
                <button
                  type="button"
                  className={`career-nav-trigger ${pathname.startsWith("/career-center") ? "is-active" : ""}`}
                  aria-haspopup="true"
                  aria-expanded={careerOpen}
                  aria-controls="career-nav-menu"
                >
                  Career Centre <ChevronDown size={14} />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content id="career-nav-menu" className="career-nav-menu" sideOffset={12} align="center">
                  {careerLinks.map((link) => (
                    <DropdownMenu.Item key={link.href} asChild>
                      <Link href={link.href} onClick={closeMenus} className={pathname === link.href ? "is-active" : ""}>
                        {link.label}
                      </Link>
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
          {links.slice(3).map((link) => (
            <Link key={link.href} href={link.href} onClick={closeMenus} className={isLinkActive(link.href) ? "is-active" : ""}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          {showRoadmapCta && <Link className="header-cta" href="/roadmap">View roadmap <ArrowRight size={15} /></Link>}
          <ThemeToggle />
          <button className="icon-button mobile-menu-button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" type="button" onClick={() => { setOpen((value) => !value); setCareerOpen(false); }}>{open ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </div>
      <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!open}>
        {links.slice(0, 3).map((link) => <Link key={link.href} href={link.href} onClick={closeMenus} className={isLinkActive(link.href) ? "is-active" : ""}>{link.label}</Link>)}
        <button type="button" className={`mobile-nav-parent ${pathname.startsWith("/career-center") ? "is-active" : ""}`} aria-expanded={careerOpen} aria-controls="mobile-career-subnav" onClick={() => setCareerOpen((value) => !value)}>Career Centre <ChevronDown size={16} /></button>
        {careerOpen && <div id="mobile-career-subnav" className="mobile-career-subnav">{careerLinks.map((link) => <Link key={link.href} href={link.href} onClick={closeMenus} className={pathname === link.href ? "is-active" : ""}>{link.label}</Link>)}</div>}
        {links.slice(3).map((link) => <Link key={link.href} href={link.href} onClick={closeMenus} className={isLinkActive(link.href) ? "is-active" : ""}>{link.label}</Link>)}
        <Link href="/roadmap#stages" onClick={closeMenus}>Labs &amp; projects</Link>
      </nav>
    </header>
  );
}
