"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { getAllTopicIds } from "@/data/roadmap";

const STORAGE_KEY = "sysadmin-roadmap-progress-v1";
const validTopicIds = new Set(getAllTopicIds());
type CompletionMap = Record<string, boolean>;
type RoadmapProgressValue = {
  completed: CompletionMap;
  completedIds: string[];
  completedCount: number;
  isComplete: (topicId: string) => boolean;
  toggleTopic: (topicId: string) => void;
  ready: boolean;
};

const RoadmapProgressContext = createContext<RoadmapProgressValue | null>(null);

export function RoadmapProgressProvider({ children }: { children: ReactNode }) {
  const [completed, setCompleted] = useState<CompletionMap>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Record<string, unknown>;
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
          const restored: CompletionMap = {};
          for (const [id, value] of Object.entries(parsed)) {
            if (validTopicIds.has(id) && value === true) restored[id] = true;
          }
          // Restore local storage after hydration so server and client markup match.
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setCompleted(restored);
        }
      }
    } catch {
      // If browser storage is unavailable or malformed, progress starts fresh.
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
    } catch {
      // The roadmap remains usable even when browser storage is unavailable.
    }
  }, [completed, ready]);

  const toggleTopic = useCallback((topicId: string) => {
    if (!validTopicIds.has(topicId)) return;
    setCompleted((current) => ({ ...current, [topicId]: !current[topicId] }));
  }, []);
  const isComplete = useCallback((topicId: string) => Boolean(completed[topicId]), [completed]);
  const completedIds = useMemo(() => Object.keys(completed).filter((id) => completed[id]), [completed]);
  const value = useMemo(() => ({ completed, completedIds, completedCount: completedIds.length, isComplete, toggleTopic, ready }), [completed, completedIds, isComplete, toggleTopic, ready]);

  return <RoadmapProgressContext.Provider value={value}>{children}</RoadmapProgressContext.Provider>;
}

export function useRoadmapProgress() {
  const context = useContext(RoadmapProgressContext);
  if (!context) throw new Error("useRoadmapProgress must be used inside RoadmapProgressProvider");
  return context;
}
