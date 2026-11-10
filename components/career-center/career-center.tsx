"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight, ArrowUpRight, Award, BookOpen,
  CheckCircle2, ChevronDown, Cloud, ExternalLink, GraduationCap, Network,
  Search, ShieldCheck, Terminal, X
} from "lucide-react";
import {
  careerPaths, certifications, interviewQuestions, portfolioProjects,
  type CertificationTrack
} from "@/data/career-center";
import { roadmapStages } from "@/data/roadmap";

const tracks: (CertificationTrack | "All tracks")[] = [
  "All tracks", "Foundations", "Networking", "Linux", "Security", "Cloud & automation"
];

const questionCategories = [
  "All questions", "Linux", "Windows & identity", "Networking",
  "Virtualisation & storage", "Security", "Troubleshooting", "Behavioural"
] as const;

const trackIcons: Record<CertificationTrack, LucideIcon> = {
  Foundations: GraduationCap,
  Networking: Network,
  Linux: Terminal,
  Security: ShieldCheck,
  "Cloud & automation": Cloud
};

export type CareerCenterSection = "certifications" | "career-paths" | "portfolio-proof" | "interview-preparation";

const sectionDetails: Record<CareerCenterSection, { label: string; description: string }> = {
  certifications: { label: "Certifications", description: "Compare credentials by focus and level, then choose one that supports the skills you are building." },
  "career-paths": { label: "Career paths", description: "Explore common infrastructure roles, skill progressions and certifications related to each direction." },
  "portfolio-proof": { label: "Portfolio proof", description: "Turn lab work into clear evidence that shows how you plan, build, test and improve systems." },
  "interview-preparation": { label: "Interview preparation", description: "Practise explaining your troubleshooting process and technical decisions with structured prompts." }
};

export function CareerCenter({ section }: { section: CareerCenterSection }) {
  const [certQuery, setCertQuery] = useState("");
  const [certTrack, setCertTrack] = useState<(typeof tracks)[number]>("All tracks");
  const [selectedCertIds, setSelectedCertIds] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [expandedCertId, setExpandedCertId] = useState<string | null>(null);
  const objectiveDialogRef = useRef<HTMLDialogElement>(null);
  const [questionQuery, setQuestionQuery] = useState("");
  const [questionCategory, setQuestionCategory] = useState<(typeof questionCategories)[number]>("All questions");
  const [expandedQuestionIds, setExpandedQuestionIds] = useState<string[]>([]);

  const filteredCertifications = useMemo(() => {
    const normalized = certQuery.trim().toLowerCase();
    return certifications.filter((certification) => {
      const matchesTrack = certTrack === "All tracks" || certification.track === certTrack;
      const searchable = [
        certification.name, certification.provider, certification.track,
        certification.examCode, certification.bestFor, certification.summary,
        ...certification.domains.map((domain) => `${domain.title} ${domain.detail}`)
      ].join(" ").toLowerCase();
      return matchesTrack && (!normalized || searchable.includes(normalized));
    });
  }, [certQuery, certTrack]);

  const selectedCertifications = certifications.filter((certification) => selectedCertIds.includes(certification.id));
  const expandedCertification = certifications.find((certification) => certification.id === expandedCertId) ?? null;

  useEffect(() => {
    const dialog = objectiveDialogRef.current;
    if (!dialog) return;

    if (expandedCertId && !dialog.open) dialog.showModal();
    if (!expandedCertId && dialog.open) dialog.close();
  }, [expandedCertId]);

  const filteredQuestions = useMemo(() => {
    const normalized = questionQuery.trim().toLowerCase();
    return interviewQuestions.filter((question) => {
      const matchesCategory = questionCategory === "All questions" || question.category === questionCategory;
      const searchable = [question.question, question.category, question.level, question.why, ...question.answerFramework, question.followUp].join(" ").toLowerCase();
      return matchesCategory && (!normalized || searchable.includes(normalized));
    });
  }, [questionQuery, questionCategory]);

  function toggleCertification(id: string) {
    setSelectedCertIds((current) => current.includes(id)
      ? current.filter((item) => item !== id)
      : current.length < 3 ? [...current, id] : current);
  }

  function toggleQuestion(id: string) {
    setExpandedQuestionIds((current) => current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id]);
  }

  return (
    <main id="main-content" className="inner-page career-center-page">
      <div className="container">
        <div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><Link href="/career-center/certifications">Career centre</Link><span>/</span><span>{sectionDetails[section].label}</span></div>
        <section className="career-hero career-subpage-hero">
          <div className="career-hero-copy"><h1>{sectionDetails[section].label}</h1><p>{sectionDetails[section].description}</p></div>
        </section>
        {section === "certifications" && <section id="certifications" className="career-content-section" aria-labelledby="certification-heading">
          <div className="career-section-heading">
            <div><h2 id="certification-heading">Choose a credential that supports your direction.</h2><p>Compare the purpose and exam focus of recognised infrastructure certifications. Select up to three to view them side by side.</p></div>
            <div className="career-section-count"><strong>{certifications.length.toString().padStart(2, "0")}</strong><span>REFERENCE PATHS</span></div>
          </div>

          <div className="certification-guidance">
            <div className="guidance-mark"><Award size={20} /></div>
            <div><strong>Do not collect certifications without a target role.</strong><p>Choose one credential that matches the skills you are building now. Create a small lab project alongside your study so you can demonstrate the same concepts in practice.</p></div>
          </div>

          <div className="certification-toolbar">
            <label className="roadmap-search career-search"><Search size={17} /><input value={certQuery} onChange={(event) => setCertQuery(event.target.value)} placeholder="Search Linux, networking, cloud, exam code..." aria-label="Search certifications" /></label>
          </div>
          <div className="career-track-filters" aria-label="Filter certifications by track">
            {tracks.map((track) => <button key={track} type="button" className={certTrack === track ? "active" : ""} onClick={() => setCertTrack(track)}>{track}<span>{track === "All tracks" ? certifications.length : certifications.filter((certification) => certification.track === track).length}</span></button>)}
          </div>

          <div className="certification-compare-bar">
            <div><strong>{selectedCertIds.length} / 3 selected for comparison</strong><span>{selectedCertIds.length < 2 ? "Select at least two certifications to compare." : "Your comparison is ready."}</span></div>
            <div className="certification-compare-actions">
              <button type="button" className="career-text-button" onClick={() => { setSelectedCertIds([]); setShowComparison(false); }}>Clear selection</button>
              <button type="button" className="button button-primary" disabled={selectedCertIds.length < 2} onClick={() => setShowComparison((current) => !current)}>{showComparison ? "Hide comparison" : "Compare selected"} <ArrowRight size={15} /></button>
            </div>
          </div>

          {showComparison && selectedCertifications.length >= 2 && <div className="certification-comparison" aria-label="Certification comparison">
            <div className="comparison-heading"><div><h3>Compare your selected paths.</h3></div><button type="button" className="icon-button" aria-label="Close comparison" onClick={() => setShowComparison(false)}><X size={17} /></button></div>
            <div className="comparison-table-wrap"><table className="comparison-table"><thead><tr><th>Comparison</th>{selectedCertifications.map((certification) => <th key={certification.id}>{certification.name}</th>)}</tr></thead><tbody>
              <tr><th>Provider</th>{selectedCertifications.map((certification) => <td key={certification.id}>{certification.provider}</td>)}</tr>
              <tr><th>Track</th>{selectedCertifications.map((certification) => <td key={certification.id}>{certification.track}</td>)}</tr>
              <tr><th>Level</th>{selectedCertifications.map((certification) => <td key={certification.id}>{certification.level}</td>)}</tr>
              <tr><th>Exam</th>{selectedCertifications.map((certification) => <td key={certification.id}>{certification.examCode}</td>)}</tr>
              <tr><th>Format</th>{selectedCertifications.map((certification) => <td key={certification.id}>{certification.format}</td>)}</tr>
              <tr><th>Best for</th>{selectedCertifications.map((certification) => <td key={certification.id}>{certification.bestFor}</td>)}</tr>
            </tbody></table></div>
          </div>}

          {filteredCertifications.length > 0 ? <div className="certification-grid">
            {filteredCertifications.map((certification) => {
              const Icon = trackIcons[certification.track];
              const selected = selectedCertIds.includes(certification.id);
              const expanded = expandedCertId === certification.id;
              return <article className={`certification-card${selected ? " is-selected" : ""}`} id={`cert-${certification.id}`} key={certification.id}>
                <div className="certification-card-top"><span className="certification-track-label"><Icon size={13} /> {certification.track}</span><span className={`certification-level certification-level-${certification.level.toLowerCase()}`}>{certification.level}</span></div>
                <h3>{certification.name}</h3>
                <div className="certification-provider">{certification.provider}</div>
                <div className="certification-exam-code"><span>EXAM / SERIES</span><strong>{certification.examCode}</strong></div>
                <p className="certification-summary">{certification.summary}</p>
                <div className="certification-best-for"><span>BEST FOR</span><p>{certification.bestFor}</p></div>
                <div className="certification-card-actions">
                  <button type="button" className="certification-expand-button" aria-expanded={expanded} aria-controls="certification-objective-dialog" onClick={() => setExpandedCertId(expanded ? null : certification.id)}>{expanded ? "Hide objective map" : "View objective map"}<ChevronDown size={15} className={expanded ? "rotated" : ""} /></button>
                  <label className="certification-select"><input type="checkbox" checked={selected} disabled={!selected && selectedCertIds.length >= 3} onChange={() => toggleCertification(certification.id)} /><span>Compare</span></label>
                </div>
              </article>;
            })}
          </div> : <div className="career-empty-state">No certifications match that search. Try another keyword or select a different track.</div>}
          <dialog
            ref={objectiveDialogRef}
            id="certification-objective-dialog"
            className="certification-objective-dialog"
            aria-label="Certification objective map"
            onCancel={() => setExpandedCertId(null)}
            onClose={() => setExpandedCertId(null)}
            onClick={(event) => { if (event.target === objectiveDialogRef.current) setExpandedCertId(null); }}
          >
            {expandedCertification && <div className="certification-objective-dialog-content">
              <header className="certification-objective-dialog-header">
                <div><span>{expandedCertification.track} · {expandedCertification.level}</span><h2 id="certification-objective-heading">{expandedCertification.name} objective map</h2></div>
                <button type="button" className="icon-button" aria-label="Close objective map" onClick={() => setExpandedCertId(null)}><X size={18} /></button>
              </header>
              <div className="certification-expanded">
                <div className="certification-exam-note"><strong>Version note</strong><p>{expandedCertification.versionNote}</p></div>
                <div className="certification-detail-block"><strong>Recommended starting point</strong><p>{expandedCertification.prerequisites}</p><p className="certification-format"><b>Exam format:</b> {expandedCertification.format}</p></div>
                <div className="certification-objectives"><strong>Exam objective areas</strong>{expandedCertification.domains.map((domain) => <div key={domain.title}><span>{domain.title}{domain.weight ? <b>{domain.weight}</b> : null}</span><p>{domain.detail}</p></div>)}</div>
                <div className="certification-proof"><strong>Practical evidence to build</strong>{expandedCertification.practicalProof.map((item) => <p key={item}><CheckCircle2 size={14} />{item}</p>)}</div>
                <div className="certification-official-links"><a href={expandedCertification.officialUrl} target="_blank" rel="noopener noreferrer">Vendor certification page <ExternalLink size={13} /></a><a href={expandedCertification.objectivesUrl} target="_blank" rel="noopener noreferrer">Exam objectives / study guide <ExternalLink size={13} /></a></div>
                <div className="certification-stage-links"><span>RELATED ROADMAP STAGES</span>{expandedCertification.roadmapStages.map((slug) => { const stage = roadmapStages.find((item) => item.slug === slug); return stage ? <Link key={slug} href={`/roadmap/${slug}`}>{stage.shortTitle}<ArrowUpRight size={11} /></Link> : null; })}</div>
              </div>
            </div>}
          </dialog>
          <p className="career-content-disclaimer">Exam codes, objectives, prices, languages and retirement dates can change. This directory intentionally avoids fixed exam fees because local pricing and taxes vary. Always confirm the live details with the issuing organisation before paying for an exam.</p>
        </section>}

        {section === "career-paths" && <section id="career-paths" className="career-content-section career-paths-section" aria-labelledby="career-paths-heading">
          <div className="career-section-heading">
            <div><h2 id="career-paths-heading">Choose a direction, then build depth.</h2><p>There is no single ladder into infrastructure work. These are common progressions; actual job titles and responsibilities vary by organisation.</p></div>
            <div className="career-section-count"><strong>{careerPaths.length.toString().padStart(2, "0")}</strong><span>CAREER DIRECTIONS</span></div>
          </div>
          <div className="career-path-grid">
            {careerPaths.map((path, index) => <article className="career-path-card" key={path.id}>
              <div className="career-path-card-top"><span>PATH {String(index + 1).padStart(2, "0")}</span><span>{path.progression.length} CAREER LEVELS</span></div>
              <h3>{path.title}</h3><p className="career-path-summary">{path.summary}</p>
              <div className="career-progression-list">{path.progression.map((step, stepIndex) => <div key={step.role}><span>{String(stepIndex + 1).padStart(2, "0")}</span><div><strong>{step.role}</strong><p>{step.focus}</p></div></div>)}</div>
              <div className="career-path-skill-block"><strong>CORE SKILLS TO DEVELOP</strong><div>{path.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div>
              <div className="career-path-certifications"><strong>RELATED CERTIFICATIONS</strong><div>{path.certifications.map((id) => { const certification = certifications.find((item) => item.id === id); return certification ? <Link key={id} href={`/career-center/certifications#cert-${id}`}>{certification.name}<ArrowUpRight size={11} /></Link> : null; })}</div></div>
            </article>)}
          </div>
        </section>}

        {section === "portfolio-proof" && <section id="portfolio" className="career-content-section portfolio-section" aria-labelledby="portfolio-heading">
          <div className="career-section-heading">
            <div><h2 id="portfolio-heading">Make your experience visible.</h2><p>A small, well-documented lab can give an interviewer better evidence than a long list of tools on a CV.</p></div>
          </div>
          <div className="portfolio-intro"><div><ShieldCheck size={21} /><strong>Show the outcome, not just the screenshot.</strong></div><p>For every project, explain the problem, design choices, configuration, test results, failure handling and what you would improve. Remove passwords, public IPs, personal data and other sensitive details before sharing.</p></div>
          <div className="portfolio-grid">{portfolioProjects.map((project, index) => <article className="portfolio-card" key={project.title}><span>PROJECT {String(index + 1).padStart(2, "0")}</span><h3>{project.title}</h3><p>{project.focus}</p><ul>{project.evidence.map((item) => <li key={item}><CheckCircle2 size={14} />{item}</li>)}</ul></article>)}</div>
        </section>}

        {section === "interview-preparation" && <section id="interview-prep" className="career-content-section interview-section" aria-labelledby="interview-heading">
          <div className="career-section-heading">
            <div><h2 id="interview-heading">Practise explaining how you think.</h2><p>These are original practice prompts, not leaked or reproduced employer questions. Expand each one for an answer framework and a useful follow-up.</p></div>
            <div className="career-section-count"><strong>{interviewQuestions.length.toString().padStart(2, "0")}</strong><span>PRACTICE QUESTIONS</span></div>
          </div>
          <div className="interview-method-card"><div className="interview-method-icon"><BookOpen size={19} /></div><div><strong>A reliable structure for scenario questions</strong><p><b>Clarify</b> the impact → <b>Gather</b> evidence → <b>Isolate</b> the fault → <b>Change</b> safely → <b>Verify</b> recovery → <b>Document</b> what happened.</p></div></div>
          <div className="interview-controls">
            <label className="roadmap-search career-search"><Search size={17} /><input value={questionQuery} onChange={(event) => setQuestionQuery(event.target.value)} placeholder="Search a question, tool or concept..." aria-label="Search interview questions" /></label>
          </div>
          <div className="interview-category-filters" aria-label="Filter interview questions by topic">{questionCategories.map((category) => <button key={category} type="button" className={questionCategory === category ? "active" : ""} onClick={() => setQuestionCategory(category)}>{category}</button>)}</div>
          <div className="interview-question-list">
            {filteredQuestions.map((question, index) => {
              const expanded = expandedQuestionIds.includes(question.id);
              return <article className={`interview-question-card${expanded ? " is-expanded" : ""}`} key={question.id}>
                <button type="button" className="interview-question-trigger" aria-expanded={expanded} aria-controls={`interview-answer-${question.id}`} onClick={() => toggleQuestion(question.id)}>
                  <span className="interview-question-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="interview-question-copy"><span className="interview-question-meta"><b>{question.category}</b><i />{question.level}</span><strong>{question.question}</strong></span>
                  <ChevronDown size={18} className={expanded ? "rotated" : ""} />
                </button>
                {expanded && <div id={`interview-answer-${question.id}`} className="interview-answer-framework"><div className="interview-why"><strong>WHAT THE INTERVIEWER IS TESTING</strong><p>{question.why}</p></div><strong className="answer-framework-title">A strong answer should cover</strong><ol>{question.answerFramework.map((point) => <li key={point}>{point}</li>)}</ol><div className="interview-follow-up"><span>FOLLOW-UP TO PRACTISE</span><p>{question.followUp}</p></div></div>}
              </article>;
            })}
            {filteredQuestions.length === 0 && <div className="career-empty-state">No questions match that search. Try another topic or keyword.</div>}
          </div>
        </section>}
      </div>
    </main>
  );
}
