"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Search, SlidersHorizontal } from "lucide-react";
import { resources, resourceCategories } from "@/data/resources";

const stagePaths: Record<string, string> = {
  "0": "it-fundamentals",
  "1": "networking",
  "2": "linux-windows-administration",
  "3": "enterprise-administration",
  "4": "infrastructure-operations",
  "5": "security-automation",
  "6": "cloud-hybrid",
  "7": "advanced-engineering"
};

export function ResourcesDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [cost, setCost] = useState("All access types");
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return resources.filter((resource) => {
      const matchesCategory = category === "All" || resource.category === category;
      const matchesCost = cost === "All access types" || (cost === "Free" ? resource.cost === "Free" : cost === "Mixed" ? resource.cost === "Mixed" : resource.cost === "Paid" || resource.cost === "Free prep / paid exam");
      const searchable = `${resource.name} ${resource.category} ${resource.description} ${resource.startHere}`.toLowerCase();
      return matchesCategory && matchesCost && (!normalized || searchable.includes(normalized));
    });
  }, [query, category, cost]);

  return (
    <main id="main-content" className="inner-page resources-page">
      <div className="container">
        <div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><span>Learning resources</span></div>
        <div className="resources-hero"><h1>A curated library of <span>SysAdmin resources.</span></h1><p>Find official documentation, guided learning paths and practical references mapped to the roadmap. Use these alongside hands-on labs, not as a replacement for practice.</p><div className="resource-library-stats"><div><strong>{resources.length}+</strong><span>Resources</span></div><div><strong>{resourceCategories.length - 1}</strong><span>Categories</span></div><div><strong>8</strong><span>Roadmap stages</span></div></div></div>
        <div className="resource-controls">
          <label className="roadmap-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search documentation, tools or topics..." aria-label="Search learning resources" /></label>
          <label className="resource-select"><SlidersHorizontal size={15} /><select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter by category">{resourceCategories.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="resource-select"><select value={cost} onChange={(event) => setCost(event.target.value)} aria-label="Filter by access type"><option>All access types</option><option>Free</option><option>Mixed</option><option>Paid</option></select></label>
        </div>
        <div className="resource-results-bar"><span>{filtered.length} resources found</span><span>Access labels describe the linked learning resource; related exams or cloud services may cost extra.</span></div>
        <div className="resource-directory-grid">
          {filtered.map((resource, index) => <motion.article key={resource.id} className="resource-directory-card" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: (index % 8) * 0.025 }}>
            <div className="resource-directory-top"><span>{resource.category}</span><span className={`resource-access access-${resource.cost.toLowerCase().replace(/[^a-z]+/g, "-")}`}>{resource.cost}</span></div>
            <h2>{resource.name}</h2><p>{resource.description}</p>
            <div className="resource-start"><strong>Recommended starting point</strong><span>{resource.startHere}</span></div>
            <div className="resource-stage-tags">{resource.stages.map((stage) => <Link href={`/roadmap/${stagePaths[stage] ?? ""}`} key={stage}>Stage {stage}</Link>)}</div>
            <a className="resource-directory-link" href={resource.url} target="_blank" rel="noopener noreferrer">Open resource <ExternalLink size={14} /></a>
          </motion.article>)}
        </div>
        {!filtered.length && <div className="topic-empty">No resources match those filters. Try another search or access type.</div>}
        <div className="resource-disclaimer"><strong>Keep links current.</strong><p>Providers can reorganise pages, change course availability or update exam versions. If a link moves, use the provider&apos;s own learning catalogue and search for the resource title. Always confirm certification and pricing details before making a purchase.</p></div>
      </div>
    </main>
  );
}
