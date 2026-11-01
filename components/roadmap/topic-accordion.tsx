"use client";

import { useState } from "react";
import { Check, ChevronDown, Circle, ClipboardCheck, TerminalSquare } from "lucide-react";
import type { RoadmapTopic } from "@/data/roadmap";
import { useRoadmapProgress } from "@/components/roadmap/use-roadmap-progress";

export function TopicAccordion({ topics }: { topics: RoadmapTopic[] }) {
  const [expanded, setExpanded] = useState<string[]>([]);
  const { isComplete, toggleTopic } = useRoadmapProgress();

  const toggleExpanded = (id: string) => {
    setExpanded((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  if (!topics.length) return <div className="topic-empty">No topics match this search. Try another keyword.</div>;

  return (
    <div className="topic-list">
      {topics.map((topic, index) => {
        const open = expanded.includes(topic.id);
        const complete = isComplete(topic.id);
        return (
          <article className={`topic-card ${open ? "is-open" : ""} ${complete ? "is-complete" : ""}`} key={topic.id}>
            <div className="topic-card-head">
              <button className="topic-expand" onClick={() => toggleExpanded(topic.id)} aria-expanded={open} aria-controls={`topic-${topic.id}`}>
                <span className="topic-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="topic-title-copy"><strong>{topic.title}</strong><small>{topic.summary}</small></span>
                <ChevronDown className={`topic-chevron ${open ? "rotated" : ""}`} size={18} />
              </button>
              <label className="topic-complete-control" title={complete ? "Mark as not complete" : "Mark topic as complete"}>
                <input type="checkbox" checked={complete} onChange={() => toggleTopic(topic.id)} />
                <span className="topic-check-ui">{complete ? <Check size={13} /> : <Circle size={13} />}</span>
                <span className="sr-only">Mark {topic.title} complete</span>
              </label>
            </div>
            {open && (
              <div className="topic-expanded" id={`topic-${topic.id}`}>
                <div className="topic-expanded-label"><ClipboardCheck size={14} /> WHAT TO UNDERSTAND</div>
                <ul>{topic.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                {topic.commandExample && (
                  <div className="topic-command-wrap">
                    <div className="topic-expanded-label"><TerminalSquare size={14} /> COMMAND EXAMPLE</div>
                    <pre><code>{topic.commandExample}</code></pre>
                  </div>
                )}
                {topic.task && <div className="topic-task"><strong>Try it:</strong> {topic.task}</div>}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
