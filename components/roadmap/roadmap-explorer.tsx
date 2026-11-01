"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Boxes, Cloud, Monitor, Network, Search, Server, ShieldCheck, Terminal } from "lucide-react";
import { getAllTopicIds, roadmapStages } from "@/data/roadmap";
import { useRoadmapProgress } from "@/components/roadmap/use-roadmap-progress";

const iconByStage = [Monitor, Network, Terminal, Server, Boxes, ShieldCheck, Cloud, Cloud];

export function RoadmapExplorer() {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("All levels");
  const { isComplete } = useRoadmapProgress();
  const allTopicIds = getAllTopicIds();
  const totalTopics = allTopicIds.length;
  const completedCount = allTopicIds.filter((id) => isComplete(id)).length;
  const overallProgress = totalTopics ? Math.round((completedCount / totalTopics) * 100) : 0;

  const filteredStages = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return roadmapStages.filter((stage) => {
      const matchesLevel = level === "All levels" || stage.level.toLowerCase().includes(level.toLowerCase());
      const searchable = [stage.title, stage.summary, stage.objective, ...stage.sections.map((section) => section.title), ...stage.sections.flatMap((section) => section.topics.map((topic) => `${topic.title} ${topic.summary} ${topic.details.join(" ")}`))].join(" ").toLowerCase();
      return matchesLevel && (!normalized || searchable.includes(normalized));
    });
  }, [query, level]);

  return (
    <main id="main-content" className="inner-page roadmap-index-page">
      <div className="container">
        <div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><span>Complete roadmap</span></div>
        <div className="roadmap-index-hero">
          <div><span className="eyebrow">THE PROFESSIONAL JOURNEY / 00—07</span><h1>The complete <span>SysAdmin roadmap.</span></h1><p>Explore the full progression from IT fundamentals to advanced infrastructure engineering. Every stage includes concepts, practical labs, portfolio projects, exit criteria and relevant learning references.</p></div>
          <div className="overall-progress-card"><span>YOUR LEARNING PROGRESS</span><strong>{overallProgress}%</strong><div className="progress-track"><span style={{ width: `${overallProgress}%` }} /></div><small>{completedCount} of {totalTopics} topics marked complete</small><small className="progress-storage-note">Saved locally in this browser</small></div>
        </div>

        <div className="roadmap-controls">
          <label className="roadmap-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search stages, topics or technologies..." aria-label="Search roadmap" /></label>
          <div className="level-filters" aria-label="Filter by level">{["All levels", "Beginner", "Intermediate", "Advanced"].map((item) => <button key={item} className={level === item ? "active" : ""} onClick={() => setLevel(item)}>{item}</button>)}</div>
        </div>

        <div className="roadmap-stage-list">
          {filteredStages.map((stage, index) => {
            const Icon = iconByStage[roadmapStages.indexOf(stage)] ?? Server;
            const topics = stage.sections.flatMap((section) => section.topics);
            const done = topics.filter((topic) => isComplete(topic.id)).length;
            const progress = topics.length ? Math.round((done / topics.length) * 100) : 0;
            return (
              <motion.article key={stage.slug} className="roadmap-stage-row" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.45, delay: index * 0.035 }}>
                <div className="roadmap-stage-number">{stage.number}</div>
                <div className="roadmap-stage-icon"><Icon size={22} /></div>
                <div className="roadmap-stage-content"><div className="roadmap-stage-meta"><span>{stage.level}</span><span>{stage.duration}</span></div><h2>{stage.title}</h2><p>{stage.summary}</p><div className="roadmap-stage-topics">{stage.sections.flatMap((section) => section.topics).slice(0, 5).map((topic) => <span key={topic.id}>{topic.title}</span>)}{topics.length > 5 && <span>+{topics.length - 5} more topics</span>}</div></div>
                <div className="roadmap-stage-progress"><strong>{progress}%</strong><div className="progress-track"><span style={{ width: `${progress}%` }} /></div><small>{done}/{topics.length} topics</small></div>
                <Link href={`/roadmap/${stage.slug}`} className="roadmap-stage-open" aria-label={`Explore ${stage.title}`}><ArrowRight size={19} /></Link>
              </motion.article>
            );
          })}
        </div>
        {!filteredStages.length && <div className="topic-empty">No stages or topics match your search. Try another keyword or level.</div>}
        <div className="roadmap-index-note"><ShieldCheck size={18} /><p>This is a learning reference, not a fixed certification checklist. The suggested durations are estimates; move forward when you can explain the concepts and complete the practical work confidently.</p></div>
      </div>
    </main>
  );
}
