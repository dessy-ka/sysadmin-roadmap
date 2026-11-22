"use client";

import { useState } from "react";
import { Check, ChevronDown, Circle, ClipboardCheck, Copy } from "lucide-react";
import type { RoadmapTopic } from "@/data/roadmap";
import { useRoadmapProgress } from "@/components/roadmap/use-roadmap-progress";

export function TopicAccordion({ topics }: { topics: RoadmapTopic[] }) {
  const [expanded, setExpanded] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { isComplete, toggleTopic } = useRoadmapProgress();

  const toggleExpanded = (id: string) => {
    setExpanded((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const handleCopy = (id: string, text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedId(id);
        setTimeout(() => setCopiedId((current) => (current === id ? null : current)), 2000);
      }).catch(() => { });
    }
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
                    <div className="terminal-header">
                      <div className="terminal-dots" aria-hidden="true">
                        <span className="terminal-dot terminal-dot-red" />
                        <span className="terminal-dot terminal-dot-yellow" />
                        <span className="terminal-dot terminal-dot-green" />
                      </div>
                      <span className="terminal-title">Terminal</span>
                      <button
                        type="button"
                        className="terminal-copy-btn"
                        onClick={() => handleCopy(topic.id, topic.commandExample!)}
                        aria-label={copiedId === topic.id ? "Command copied" : "Copy command to clipboard"}
                      >
                        {copiedId === topic.id ? (
                          <>
                            <Check size={13} /> <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} /> <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
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
