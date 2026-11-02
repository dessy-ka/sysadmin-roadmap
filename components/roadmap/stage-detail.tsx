"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, ChevronRight, Clock3, ExternalLink, Flag, ListChecks, Search, ShieldCheck, Wrench } from "lucide-react";
import type { RoadmapStage } from "@/data/roadmap";
import { resources } from "@/data/resources";
import { TopicAccordion } from "@/components/roadmap/topic-accordion";
import { useRoadmapProgress } from "@/components/roadmap/use-roadmap-progress";

export function StageDetail({ stage, previous, next }: { stage: RoadmapStage; previous?: RoadmapStage; next?: RoadmapStage }) {
  const [query, setQuery] = useState("");
  const { isComplete } = useRoadmapProgress();

  const stageTopics = stage.sections.flatMap((section) => section.topics);
  const done = stageTopics.filter((topic) => isComplete(topic.id)).length;
  const progress = stageTopics.length ? Math.round((done / stageTopics.length) * 100) : 0;

  const filteredSections = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return stage.sections;
    return stage.sections.map((section) => ({
      ...section,
      topics: section.topics.filter((topic) => [topic.title, topic.summary, ...topic.details, topic.task ?? ""].join(" ").toLowerCase().includes(normalized))
    })).filter((section) => section.topics.length > 0);
  }, [query, stage.sections]);

  const relatedResources = resources.filter((resource) => stage.resourceIds.includes(resource.id));

  return (
    <main id="main-content" className="inner-page stage-detail-page">
      <div className="container">
        <div className="breadcrumbs"><Link href="/">Home</Link><ChevronRight size={13} /><Link href="/roadmap">Roadmap</Link><ChevronRight size={13} /><span>{stage.shortTitle}</span></div>
        <div className="stage-detail-hero">
          <div className="stage-detail-copy">
            
            <h1>{stage.title}</h1>
            <p>{stage.summary}</p>
            <div className="stage-detail-meta"><span><Clock3 size={15} /> {stage.duration}</span><span><ListChecks size={15} /> {stageTopics.length} learning topics</span><span><BookOpen size={15} /> {relatedResources.length} resources</span></div>
          </div>
          <div className="stage-progress-panel">
            <div className="progress-panel-top"><span>YOUR STAGE PROGRESS</span><strong>{progress}%</strong></div>
            <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
            <p>{done} of {stageTopics.length} topics marked complete</p>
            <small>Progress is saved in this browser on this device.</small>
          </div>
        </div>

        <div className="stage-detail-grid">
          <div className="stage-main-column">
            <section className="detail-section objective-panel">
              
              <h2>What you&apos;ll work towards</h2>
              <p>{stage.objective}</p>
            </section>

            <section className="detail-section prerequisites-panel">
              <h3><Flag size={17} /> Before you begin</h3>
              <ul>{stage.prerequisites.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>

            <section className="detail-section topics-section">
              <div className="detail-section-heading">
                <div><h2>Explore the topics</h2><p>Expand each topic to see the concepts to understand. Mark it complete as you gain confidence.</p></div>
                <label className="topic-search"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search this stage" aria-label="Search topics in this stage" /></label>
              </div>
              {filteredSections.length ? filteredSections.map((section) => (
                <div className="topic-section-group" key={section.id}>
                  <div className="topic-section-heading"><h3>{section.title}</h3>{section.intro && <p>{section.intro}</p>}</div>
                  <TopicAccordion topics={section.topics} />
                </div>
              )) : <div className="topic-empty">No topics match “{query}”. Try a different search.</div>}
            </section>

            <section className="detail-section labs-panel">
              <div className="detail-section-heading"><div><h2>Practical labs</h2><p>Use an isolated lab environment. Test failures safely and document what you learn.</p></div><div className="detail-icon"><Wrench size={21} /></div></div>
              <ol className="numbered-labs">{stage.labs.map((lab, index) => <li key={lab}><span>{String(index + 1).padStart(2, "0")}</span><p>{lab}</p></li>)}</ol>
            </section>

            <section className="detail-section projects-panel">
              <h2>Projects to prove your skills</h2>
              <div className="stage-project-grid">{stage.projects.map((project) => <article className="stage-project-card" key={project.title}><h3>{project.title}</h3><p>{project.description}</p><strong>Suggested deliverables</strong><ul>{project.deliverables.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
            </section>

            <section className="detail-section outcomes-panel">
              <h2>What you should be able to do</h2>
              <div className="outcome-grid">{stage.outcomes.map((outcome) => <div key={outcome}><CheckCircle2 size={16} /><span>{outcome}</span></div>)}</div>
            </section>

            <section className="detail-section exit-panel">
              <h2>Stage completion checklist</h2>
              <ul>{stage.exitCriteria.map((item) => <li key={item}><ShieldCheck size={16} />{item}</li>)}</ul>
            </section>
          </div>

          <aside className="stage-sidebar">
            <div className="sidebar-card">
              
              <h3>Learn from trusted sources</h3>
              <div className="related-resource-list">{relatedResources.map((resource) => <a href={resource.url} key={resource.id} target="_blank" rel="noopener noreferrer"><span><strong>{resource.name}</strong><small>{resource.category} · {resource.cost}</small></span><ExternalLink size={14} /></a>)}</div>
              <Link className="sidebar-all-link" href="/resources">Browse all resources <ArrowRight size={14} /></Link>
            </div>
            <div className="sidebar-card certification-card">
              
              <h3>Credentials to consider</h3>
              {stage.certifications.map((certification) => <div className="certification-item" key={certification.name}><strong>{certification.name}</strong><p>{certification.note}</p></div>)}
              <small>Certifications are optional. Practical skills and portfolio evidence matter too. Verify current exam details with the issuing organisation.</small>
            </div>
            <div className="sidebar-card next-stage-card">
              
              <h3>{next ? "Continue to the next stage" : "You've reached the advanced stage"}</h3>
              {next ? <><p>{next.title}</p><Link className="button button-primary button-full" href={`/roadmap/${next.slug}`}>Next: {next.shortTitle} <ArrowRight size={15} /></Link></> : <><p>Use the advanced engineering content to shape a deeper specialisation and professional development plan.</p><Link className="sidebar-all-link" href="/resources">Explore advanced resources <ArrowRight size={14} /></Link></>}
              {previous && <Link className="previous-stage-link" href={`/roadmap/${previous.slug}`}><ArrowLeft size={14} /> Previous: {previous.shortTitle}</Link>}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
