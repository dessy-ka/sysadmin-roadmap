import Link from "next/link";
import { Activity, ArrowLeft, ArrowRight, BookOpen, Boxes, CheckCircle2, Cloud, Code2, Database, ExternalLink, GitBranch, Network, Package, Server, ShieldCheck, Terminal, Users, Workflow, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Technology } from "@/data/technologies";
import { roadmapStages } from "@/data/roadmap";
import { resources } from "@/data/resources";

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

export function TechnologyDetail({ technology, previous, next }: { technology: Technology; previous?: Technology; next?: Technology }) {
  const Icon = iconMap[technology.icon] ?? Server;
  const relatedStages = roadmapStages.filter((stage) => technology.roadmapStages.includes(stage.slug));
  const relatedResources = resources.filter((resource) => technology.resourceIds.includes(resource.id));

  return (
    <main id="main-content" className="inner-page technology-detail-page">
      <div className="container">
        <div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><Link href="/technologies">Technologies</Link><span>/</span><span>{technology.shortName}</span></div>

        <section className="technology-detail-hero">
          <div className="technology-detail-copy">
            <span className="eyebrow">{technology.category.toUpperCase()} / FIELD GUIDE</span>
            <div className="technology-detail-title-row"><div className="technology-detail-icon"><Icon size={28} /></div><span className={`technology-level level-${technology.level.toLowerCase()}`}>{technology.level}</span></div>
            <h1>{technology.name}</h1>
            <p>{technology.summary}</p>
            <div className="technology-detail-meta"><span><BookOpen size={15} /> {technology.concepts.length} core concepts</span><span><Wrench size={15} /> {technology.labs.length} practical labs</span><span><ShieldCheck size={15} /> {relatedStages.length} roadmap stages</span></div>
          </div>
          <aside className="technology-detail-sidecard"><span className="eyebrow">THE ROLE IN A STACK</span><h2>{technology.tagline}</h2><p>{technology.infrastructureFit}</p><div className="technology-sidecard-footer"><span>SYSADMIN FIELD GUIDE</span><span>{technology.shortName.toUpperCase()}</span></div></aside>
        </section>

        <div className="technology-detail-layout">
          <div className="technology-detail-main">
            <section className="technology-info-grid">
              <article className="technology-info-card"><span className="eyebrow">01 / DEFINITION</span><h2>What it is</h2><p>{technology.whatItIs}</p></article>
              <article className="technology-info-card"><span className="eyebrow">02 / PURPOSE</span><h2>Why SysAdmins use it</h2><p>{technology.whyAdminsUseIt}</p></article>
            </section>

            <section className="technology-detail-section">
              <div className="technology-detail-section-heading"><div><span className="eyebrow">03 / CORE KNOWLEDGE</span><h2>Concepts to understand</h2><p>Build a working mental model of these areas before moving into complex deployments.</p></div><div className="detail-icon"><BookOpen size={20} /></div></div>
              <div className="technology-concept-grid">{technology.concepts.map((concept, index) => <div key={concept}><span>{String(index + 1).padStart(2, "0")}</span><p>{concept}</p></div>)}</div>
            </section>

            <section className="technology-detail-section">
              <div className="technology-detail-section-heading"><div><span className="eyebrow">04 / FIRST STEPS</span><h2>How to get started</h2><p>A safe sequence for exploring the technology in a controlled lab environment.</p></div><div className="detail-icon"><Terminal size={20} /></div></div>
              <ol className="technology-start-steps">{technology.gettingStarted.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><p>{step}</p></li>)}</ol>
              <div className="technology-lab-requirements"><strong><Wrench size={15} /> Suggested lab setup</strong><p>{technology.labRequirements}</p></div>
            </section>

            <section className="technology-detail-section">
              <div className="technology-detail-section-heading"><div><span className="eyebrow">05 / HANDS-ON PRACTICE</span><h2>Practical labs</h2><p>Use these exercises to turn the concepts into demonstrable administration skills.</p></div><div className="detail-icon"><Activity size={20} /></div></div>
              <div className="technology-labs-grid">{technology.labs.map((lab, index) => <article key={lab.title}><span>LAB {String(index + 1).padStart(2, "0")}</span><h3>{lab.title}</h3><p>{lab.description}</p></article>)}</div>
            </section>

            <section className="technology-detail-section technology-practices-section">
              <span className="eyebrow">06 / OPERATIONAL DISCIPLINE</span><h2>Good administration practices</h2>
              <div className="technology-practice-list">{technology.practices.map((practice) => <div key={practice}><CheckCircle2 size={17} /><p>{practice}</p></div>)}</div>
            </section>

            <section className="technology-detail-section technology-resource-section">
              <div className="technology-detail-section-heading"><div><span className="eyebrow">07 / CONTINUE LEARNING</span><h2>Official documentation & references</h2><p>Use vendor and project documentation as the primary source of truth. Product interfaces and versions change, so check the current guidance.</p></div><div className="detail-icon"><BookOpen size={20} /></div></div>
              <div className="technology-official-links">{technology.resources.map((resource) => <a key={resource.url} href={resource.url} target="_blank" rel="noopener noreferrer"><span><small>{resource.type}</small><strong>{resource.label}</strong></span><ExternalLink size={16} /></a>)}</div>
              {relatedResources.length > 0 && <div className="technology-library-links"><span>Also in the resource library</span>{relatedResources.map((resource) => <a key={resource.id} href={resource.url} target="_blank" rel="noopener noreferrer">{resource.name} <ExternalLink size={12} /></a>)}</div>}
            </section>
          </div>

          <aside className="technology-detail-sidebar">
            <div className="technology-sidebar-card"><span className="eyebrow">ROADMAP CONNECTIONS</span><h3>Where this fits in the journey</h3><div className="technology-stage-links">{relatedStages.map((stage) => <Link href={`/roadmap/${stage.slug}`} key={stage.slug}><span><small>STAGE {stage.number}</small><strong>{stage.shortTitle}</strong></span><ArrowRight size={14} /></Link>)}</div><Link className="technology-sidebar-all" href="/roadmap">View complete roadmap <ArrowRight size={14} /></Link></div>
            <div className="technology-sidebar-card"><span className="eyebrow">RELATED TOOLING</span><h3>Technologies you may encounter</h3><div className="technology-related-tags">{technology.relatedTools.map((tool) => <span key={tool}>{tool}</span>)}</div></div>
            <div className="technology-sidebar-card technology-safety-card"><span className="eyebrow">LAB SAFETY</span><h3>Experiment without risking production.</h3><p>Use disposable virtual machines, isolated networks and non-sensitive test data. Take backups or snapshots before destructive exercises and verify recovery afterwards.</p></div>
          </aside>
        </div>

        <nav className="technology-detail-pagination" aria-label="Browse technology guides"><Link href="/technologies"><ArrowLeft size={15} /> All technologies</Link><div>{previous && <Link href={`/technologies/${previous.slug}`}><small>PREVIOUS GUIDE</small><strong>{previous.shortName}</strong></Link>}{next && <Link href={`/technologies/${next.slug}`}><small>NEXT GUIDE</small><strong>{next.shortName} <ArrowRight size={13} /></strong></Link>}</div></nav>
      </div>
    </main>
  );
}
