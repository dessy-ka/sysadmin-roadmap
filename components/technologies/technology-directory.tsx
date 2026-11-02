"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Activity, ArrowRight, Boxes, Cloud, Code2, Database, GitBranch, Network, Package, Search, Server, Terminal, Users, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { technologies } from "@/data/technologies";

const iconMap: Record<string, LucideIcon> = {
  terminal: Terminal,
  server: Server,
  code: Code2,
  users: Users,
  network: Network,
  boxes: Boxes,
  package: Package,
  workflow: Workflow,
  "git-branch": GitBranch,
  activity: Activity,
  chart: Activity,
  database: Database,
  cloud: Cloud
};

const categories = ["All technologies", ...Array.from(new Set(technologies.map((technology) => technology.category)))];

export function TechnologyDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All technologies");
  const [level, setLevel] = useState("All levels");

  const filteredTechnologies = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return technologies.filter((technology) => {
      const matchesCategory = category === "All technologies" || technology.category === category;
      const matchesLevel = level === "All levels" || technology.level === level;
      const searchable = [technology.name, technology.shortName, technology.category, technology.tagline, technology.summary, ...technology.concepts, ...technology.relatedTools].join(" ").toLowerCase();
      return matchesCategory && matchesLevel && (!normalized || searchable.includes(normalized));
    });
  }, [query, category, level]);

  return (
    <main id="main-content" className="inner-page technology-directory-page">
      <div className="container">
        <div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><span>Technologies & tools</span></div>

        <section className="technology-index-hero">
          <div className="technology-hero-copy">
            
            <h1>Know the tools.<br /><span>Understand the infrastructure.</span></h1>
            <p>Explore the platforms and technologies used to operate real IT environments. Each guide connects the tool to its purpose, infrastructure role, key concepts, practical labs and official documentation.</p>
            <div className="technology-hero-stats">
              <div><strong>{technologies.length}</strong><span>TECHNOLOGY GUIDES</span></div>
              <div><strong>{categories.length - 1}</strong><span>TECHNICAL AREAS</span></div>
              <div><strong>100%</strong><span>PRACTICE-ORIENTED</span></div>
            </div>
          </div>
          <div className="technology-hero-panel">
            
            <div className="technology-stack">
              <div><span className="stack-index">01</span><div><strong>Compute & operating systems</strong><small>Linux · Windows Server · Virtualisation</small></div><Server size={18} /></div>
              <div><span className="stack-index">02</span><div><strong>Network & identity</strong><small>TCP/IP · DNS · Active Directory</small></div><Network size={18} /></div>
              <div><span className="stack-index">03</span><div><strong>Services & containers</strong><small>Docker · Kubernetes · Databases</small></div><Boxes size={18} /></div>
              <div><span className="stack-index">04</span><div><strong>Automation & observability</strong><small>Ansible · Terraform · Monitoring</small></div><Activity size={18} /></div>
              <div><span className="stack-index">05</span><div><strong>Cloud & hybrid platforms</strong><small>Azure · AWS · Connected infrastructure</small></div><Cloud size={18} /></div>
            </div>
            <p className="technology-panel-note">Tools are grouped by the job they help an administrator perform—not by popularity alone.</p>
          </div>
        </section>

        <section className="technology-directory-section" aria-labelledby="technology-directory-title">
          <div className="technology-section-heading">
            <div><h2 id="technology-directory-title">Explore the technology directory.</h2><p>Search by product, discipline or capability. Open a guide for practical context and a path into the official documentation.</p></div>
            <span className="technology-total"><strong>{filteredTechnologies.length.toString().padStart(2, "0")}</strong> / {technologies.length} GUIDES</span>
          </div>

          <div className="technology-controls">
            <label className="roadmap-search technology-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Linux, Docker, monitoring, identity..." aria-label="Search technologies" /></label>
            <label className="technology-level-select"><span>Experience</span><select value={level} onChange={(event) => setLevel(event.target.value)} aria-label="Filter by experience level"><option>All levels</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></label>
          </div>

          <div className="technology-category-filters" aria-label="Filter by technology category">
            {categories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}<span>{item === "All technologies" ? technologies.length : technologies.filter((technology) => technology.category === item).length}</span></button>)}
          </div>

          {filteredTechnologies.length ? <div className="technology-card-grid">
            {filteredTechnologies.map((technology, index) => {
              const Icon = iconMap[technology.icon] ?? Server;
              return <Link href={`/technologies/${technology.slug}`} className="technology-card" key={technology.slug}>
                <div className="technology-card-top"><span className="technology-card-category">{technology.category}</span><span className={`technology-level level-${technology.level.toLowerCase()}`}>{technology.level}</span></div>
                <div className="technology-card-icon"><Icon size={22} /></div>
                <h3>{technology.name}</h3>
                <p>{technology.tagline}</p>
                <div className="technology-card-concepts">{technology.relatedTools.slice(0, 4).map((tool) => <span key={tool}>{tool}</span>)}</div>
                <div className="technology-card-bottom"><span>Open technology guide</span><ArrowRight size={16} /></div>
                <span className="technology-card-number">{String(index + 1).padStart(2, "0")}</span>
              </Link>;
            })}
          </div> : <div className="topic-empty">No technology guides match those filters. Try a different keyword or category.</div>}
        </section>

        <section className="technology-guidance-note"><div><h3>Understand the job before memorising the tool.</h3></div><p>Start with the infrastructure problem—identity, connectivity, compute, storage, automation or availability. Then learn the tool that solves it. Use an isolated lab, follow the vendor documentation and practise recovery as well as deployment.</p></section>
        <div className="technology-bottom-links"><Link href="/roadmap">Explore the complete roadmap <ArrowRight size={15} /></Link><Link href="/resources">Browse all learning resources <ArrowRight size={15} /></Link><Link href="/schedule">Open the 12-month schedule <ArrowRight size={15} /></Link></div>
      </div>
    </main>
  );
}
