"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, ChevronRight, Clock3, ExternalLink, Flag, ListChecks, Search, ShieldCheck, Wrench } from "lucide-react";
import type { RoadmapStage } from "@/data/roadmap";
import { resources } from "@/data/resources";
import { useRoadmapProgress } from "@/components/roadmap/use-roadmap-progress";

const stageViews = [
  { id: "__labs", label: "Practical labs" },
  { id: "__projects", label: "Projects" },
  { id: "__outcomes", label: "Skills to gain" },
  { id: "__checklist", label: "Completion checklist" }
];

export function StageDetail({ stage, previous, next }: { stage: RoadmapStage; previous?: RoadmapStage; next?: RoadmapStage }) {
  const firstTopicId = stage.sections[0]?.topics[0]?.id ?? stageViews[0].id;
  const [selection, setSelection] = useState({ stageSlug: stage.slug, content: firstTopicId, query: "" });
  const mainColumnRef = useRef<HTMLDivElement>(null);
  const selectionIsCurrent = selection.stageSlug === stage.slug;
  const query = selectionIsCurrent ? selection.query : "";
  const selectedContent = selectionIsCurrent ? selection.content : firstTopicId;
  const { isComplete, toggleTopic } = useRoadmapProgress();

  const selectContent = (content: string) => {
    setSelection({ stageSlug: stage.slug, content, query: "" });
    if (window.matchMedia("(max-width: 700px)").matches) {
      window.requestAnimationFrame(() => {
        mainColumnRef.current?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
          block: "start"
        });
      });
    }
  };

  const stageTopics = stage.sections.flatMap((section) => section.topics);
  const done = stageTopics.filter((topic) => isComplete(topic.id)).length;
  const progress = stageTopics.length ? Math.round((done / stageTopics.length) * 100) : 0;
  const selectedTopic = stageTopics.find((topic) => topic.id === selectedContent);

  const filteredSections = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return stage.sections;
    return stage.sections.map((section) => ({
      ...section,
      topics: section.topics.filter((topic) => [topic.title, topic.summary, ...topic.details, topic.task ?? ""].join(" ").toLowerCase().includes(normalized))
    })).filter((section) => section.topics.length > 0);
  }, [query, stage.sections]);

  const relatedResources = resources.filter((resource) => stage.resourceIds.includes(resource.id));
  const isStageView = stageViews.some((view) => view.id === selectedContent);
  const selectedStageView = stageViews.find((view) => view.id === selectedContent);

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
        </div>

        <div className="stage-detail-grid">
          <aside className="stage-topic-menu" aria-label="Stage topic menu">
            <div className="sidebar-card stage-topic-menu-card">
              <h2>Stage contents</h2>
              <label className="stage-menu-search"><Search size={15} /><input value={query} onChange={(event) => setSelection({ stageSlug: stage.slug, content: selectedContent, query: event.target.value })} placeholder="Find a topic" aria-label="Find a topic in this stage" /></label>
              <nav aria-label="Topics and stage sections">
                {filteredSections.map((section) => (
                  <div className="stage-menu-group" key={section.id}>
                    <h3>{section.title}</h3>
                    {section.topics.map((topic) => <button type="button" className="stage-menu-topic" key={topic.id} onClick={() => selectContent(topic.id)} aria-current={selectedContent === topic.id ? "true" : undefined}><span>{topic.title}</span>{isComplete(topic.id) && <CheckCircle2 size={14} aria-label="Complete" />}</button>)}
                  </div>
                ))}
                {filteredSections.length === 0 && <p className="stage-menu-empty">No topics match. Try another search.</p>}
                <div className="stage-menu-group stage-menu-extra-group">
                  <h3>Stage work</h3>
                  {stageViews.map((view) => <button type="button" className="stage-menu-topic" key={view.id} onClick={() => selectContent(view.id)} aria-current={selectedContent === view.id ? "true" : undefined}>{view.label}</button>)}
                </div>
              </nav>
            </div>
          </aside>

          <div className="stage-main-column" ref={mainColumnRef} aria-live="polite" tabIndex={-1}>
            {selectedTopic && (
              <article className="detail-section selected-topic-panel" key={selectedTopic.id}>
                <div className="selected-topic-heading">
                  <div><span className="eyebrow">LEARNING TOPIC</span><h2>{selectedTopic.title}</h2><p>{selectedTopic.summary}</p></div>
                  <button type="button" className={`selected-topic-complete ${isComplete(selectedTopic.id) ? "is-complete" : ""}`} onClick={() => toggleTopic(selectedTopic.id)} aria-pressed={isComplete(selectedTopic.id)}><CheckCircle2 size={17} />{isComplete(selectedTopic.id) ? "Completed" : "Mark complete"}</button>
                </div>
                <div className="selected-topic-details">
                  <h3>What to understand</h3>
                  <ul>{selectedTopic.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                </div>
                {selectedTopic.commandExample && <div className="selected-topic-command"><h3>Command example</h3><pre><code>{selectedTopic.commandExample}</code></pre></div>}
                {selectedTopic.task && <div className="selected-topic-task"><strong>Try it</strong><p>{selectedTopic.task}</p></div>}
                <div className="selected-topic-pagination">
                  {stageTopics.findIndex((topic) => topic.id === selectedTopic.id) > 0 && <button type="button" onClick={() => selectContent(stageTopics[stageTopics.findIndex((topic) => topic.id === selectedTopic.id) - 1].id)}><ArrowLeft size={15} /> Previous topic</button>}
                  {stageTopics.findIndex((topic) => topic.id === selectedTopic.id) < stageTopics.length - 1 && <button type="button" onClick={() => selectContent(stageTopics[stageTopics.findIndex((topic) => topic.id === selectedTopic.id) + 1].id)}>Next topic <ArrowRight size={15} /></button>}
                </div>
              </article>
            )}

            {!selectedTopic && isStageView && (
              <section className="detail-section selected-stage-view" key={selectedContent}>
                {selectedContent === "__labs" && <><div className="detail-section-heading"><div><span className="eyebrow">STAGE WORK</span><h2>Practical labs</h2><p>Use an isolated lab environment. Test failures safely and document what you learn.</p></div><div className="detail-icon"><Wrench size={21} /></div></div><ol className="numbered-labs">{stage.labs.map((lab, index) => <li key={lab}><span>{String(index + 1).padStart(2, "0")}</span><p>{lab}</p></li>)}</ol></>}
                {selectedContent === "__projects" && <><span className="eyebrow">STAGE WORK</span><h2>Projects to prove your skills</h2><div className="stage-project-grid">{stage.projects.map((project) => <article className="stage-project-card" key={project.title}><h3>{project.title}</h3><p>{project.description}</p><strong>Suggested deliverables</strong><ul>{project.deliverables.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div></>}
                {selectedContent === "__outcomes" && <><span className="eyebrow">STAGE WORK</span><h2>Skills to gain</h2><div className="outcome-grid">{stage.outcomes.map((outcome) => <div key={outcome}><CheckCircle2 size={16} /><span>{outcome}</span></div>)}</div></>}
                {selectedContent === "__checklist" && <><span className="eyebrow">STAGE WORK</span><h2>Stage completion checklist</h2><ul className="selected-stage-checklist">{stage.exitCriteria.map((item) => <li key={item}><ShieldCheck size={16} />{item}</li>)}</ul></>}
                {selectedStageView && <div className="selected-stage-view-footer"><span>{selectedStageView.label}</span></div>}
              </section>
            )}
          </div>

          <aside className="stage-sidebar" aria-label="Stage details and resources">
            <div className="stage-progress-panel">
              <div className="progress-panel-top"><span>YOUR STAGE PROGRESS</span><strong>{progress}%</strong></div>
              <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
              <p>{done} of {stageTopics.length} topics marked complete</p>
              <small>Progress is saved in this browser on this device.</small>
            </div>
            <div className="sidebar-card objective-panel"><h3>What you&apos;ll work towards</h3><p>{stage.objective}</p></div>
            <div className="sidebar-card prerequisites-panel"><h3><Flag size={17} /> Before you begin</h3><ul>{stage.prerequisites.map((item) => <li key={item}>{item}</li>)}</ul></div>
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
