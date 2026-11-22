"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle2,
  CheckCheck,
  Clock3,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Flag,
  Gauge,
  RotateCcw,
  Sparkles,
  Target,
  Upload,
  Zap,
} from "lucide-react";
import { studySchedule, type StudyMonth } from "@/data/schedule";
import { resources, type LearningResource } from "@/data/resources";
import { getStageBySlug } from "@/data/roadmap";

const STORAGE_KEY = "sysadmin-study-schedule-v1";
type StoredSchedule = { completed: Record<string, boolean>; weeklyHours: number };
const allTasks = studySchedule.flatMap((month) => month.weeks.flatMap((week) => week.tasks.map((_, index) => `${week.id}-t${index + 1}`)));
const validTaskIds = new Set(allTasks);

const PACE_PRESETS = [
  { label: "Casual", hours: 5, icon: Clock3 },
  { label: "Balanced", hours: 8, icon: Gauge },
  { label: "Accelerated", hours: 15, icon: Zap },
] as const;

function getPhaseInfo(monthNumber: number) {
  if (monthNumber <= 3) {
    return {
      phase: 1,
      name: "Phase 1: IT & Network Foundations",
      tag: "Phase 1 · Foundations",
    };
  }
  if (monthNumber <= 6) {
    return {
      phase: 2,
      name: "Phase 2: Systems, Storage & Security",
      tag: "Phase 2 · Systems",
    };
  }
  if (monthNumber <= 9) {
    return {
      phase: 3,
      name: "Phase 3: Automation & Cloud",
      tag: "Phase 3 · Automation",
    };
  }
  return {
    phase: 4,
    name: "Phase 4: Containers & Capstone",
    tag: "Phase 4 · Reliability",
  };
}

function generateMonthMarkdown(month: StudyMonth, completedMap: Record<string, boolean>) {
  let md = `# Month ${String(month.number).padStart(2, "0")}: ${month.title}\n\n`;
  md += `> **Stage**: ${month.stageLabel}  \n`;
  md += `> **Summary**: ${month.summary}  \n`;
  md += `> **Milestone**: ${month.milestone}\n\n`;

  for (let w = 0; w < month.weeks.length; w++) {
    const week = month.weeks[w];
    md += `## Week ${String(w + 1).padStart(2, "0")}: ${week.title}\n\n`;
    md += `- **Suggested Study Time**: ${week.hours} hrs\n`;
    md += `- **Focus**: ${week.focus}\n`;
    md += `- **Deliverable**: ${week.deliverable}\n\n`;
    md += `### Practical Tasks\n`;
    for (let t = 0; t < week.tasks.length; t++) {
      const taskId = `${week.id}-t${t + 1}`;
      const isDone = Boolean(completedMap[taskId]);
      md += `- [${isDone ? "x" : " "}] Task ${t + 1}: ${week.tasks[t]}\n`;
    }
    md += `\n`;
  }
  return md;
}

function generateFullScheduleMarkdown(completedMap: Record<string, boolean>) {
  let md = `# SysAdmin Complete 12-Month Study Curriculum & Checklist\n\n`;
  md += `> Exported from SysAdmin Roadmap on ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}\n\n`;
  for (const month of studySchedule) {
    md += generateMonthMarkdown(month, completedMap);
    md += `---\n\n`;
  }
  return md;
}

export function SchedulePlanner() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [weeklyHours, setWeeklyHours] = useState(8);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [filter, setFilter] = useState("All months");
  const [ready, setReady] = useState(false);
  const [copiedMonth, setCopiedMonth] = useState(false);
  const [restoreNotice, setRestoreNotice] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const stored = JSON.parse(raw) as StoredSchedule;
        if (stored && typeof stored === "object") {
          if (stored.completed && typeof stored.completed === "object" && !Array.isArray(stored.completed)) {
            const validEntries = Object.entries(stored.completed).filter(([id, value]) => validTaskIds.has(id) && value === true);
            // Restore browser-only progress after hydration to avoid markup mismatch.
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setCompleted(Object.fromEntries(validEntries));
          }
          if (typeof stored.weeklyHours === "number" && stored.weeklyHours >= 2 && stored.weeklyHours <= 20) {
            setWeeklyHours(stored.weeklyHours);
          }
        }
      }
    } catch {
      // The schedule remains available if browser storage is unavailable.
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ completed, weeklyHours } satisfies StoredSchedule));
    } catch {
      // Progress is still usable for the current session if storage is unavailable.
    }
  }, [completed, weeklyHours, ready]);

  const completedCount = allTasks.filter((id) => completed[id]).length;
  const overallProgress = Math.round((completedCount / allTasks.length) * 100);
  const currentMonth = studySchedule[selectedMonth - 1];
  const currentWeek = currentMonth.weeks[selectedWeek - 1];
  const selectedStage = getStageBySlug(currentMonth.stageSlug);
  const weekTaskIds = currentWeek.tasks.map((_, index) => `${currentWeek.id}-t${index + 1}`);
  const weekDone = weekTaskIds.filter((id) => completed[id]).length;
  const monthDone = currentMonth.weeks.reduce((sum, week) => sum + week.tasks.filter((_, index) => completed[`${week.id}-t${index + 1}`]).length, 0);
  const monthTotal = currentMonth.weeks.reduce((sum, week) => sum + week.tasks.length, 0);

  const totalCurriculumHours = useMemo(() => {
    return studySchedule.reduce((sum, month) => sum + month.weeks.reduce((wSum, week) => wSum + week.hours, 0), 0);
  }, []);

  const remainingHours = useMemo(() => {
    const incompleteTasks = allTasks.filter((id) => !completed[id]).length;
    return Math.round((incompleteTasks / allTasks.length) * totalCurriculumHours);
  }, [completed, totalCurriculumHours]);

  const estimatedCompletion = useMemo(() => {
    if (completedCount === allTasks.length) {
      return { isFinished: true, dateStr: "Curriculum Complete!", remainingWeeks: 0 };
    }
    const remainingWeeks = Math.max(1, Math.ceil(remainingHours / weeklyHours));
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + remainingWeeks * 7);
    return {
      isFinished: false,
      dateStr: new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(targetDate),
      remainingWeeks,
      remainingHours,
    };
  }, [completedCount, remainingHours, weeklyHours]);

  const visibleMonths = useMemo(() => studySchedule.filter((month) => {
    const done = month.weeks.reduce((sum, week) => sum + week.tasks.filter((_, index) => completed[`${week.id}-t${index + 1}`]).length, 0);
    const total = month.weeks.reduce((sum, week) => sum + week.tasks.length, 0);
    if (filter === "Completed") return done === total;
    if (filter === "In progress") return done > 0 && done < total;
    if (filter === "Not started") return done === 0;
    return true;
  }), [completed, filter]);

  function toggleTask(id: string) {
    setCompleted((current) => ({ ...current, [id]: !current[id] }));
  }

  function toggleEntireWeek() {
    const allWeekDone = weekDone === currentWeek.tasks.length;
    setCompleted((current) => {
      const next = { ...current };
      for (const id of weekTaskIds) {
        if (allWeekDone) {
          delete next[id];
        } else {
          next[id] = true;
        }
      }
      return next;
    });
  }

  function resetProgress() {
    if (!window.confirm("Reset all completed schedule tasks? This cannot be undone.")) return;
    setCompleted({});
  }

  function handleBackupProgress() {
    const data = {
      app: "sysadmin-roadmap",
      version: 1,
      exportedAt: new Date().toISOString(),
      weeklyHours,
      completed,
      summary: {
        completedTasks: completedCount,
        totalTasks: allTasks.length,
        progressPercentage: overallProgress,
      },
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sysadmin-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleRestoreFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsed = JSON.parse(text);
        if (!parsed || typeof parsed !== "object") throw new Error("Invalid format");
        const nextCompleted: Record<string, boolean> = {};
        if (parsed.completed && typeof parsed.completed === "object" && !Array.isArray(parsed.completed)) {
          for (const [id, value] of Object.entries(parsed.completed)) {
            if (validTaskIds.has(id) && value === true) {
              nextCompleted[id] = true;
            }
          }
        }
        setCompleted(nextCompleted);
        if (typeof parsed.weeklyHours === "number" && parsed.weeklyHours >= 2 && parsed.weeklyHours <= 20) {
          setWeeklyHours(parsed.weeklyHours);
        }
        setRestoreNotice("Progress successfully restored!");
        setTimeout(() => setRestoreNotice(null), 3500);
      } catch {
        setRestoreNotice("Failed to restore: Invalid backup file format.");
        setTimeout(() => setRestoreNotice(null), 4000);
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  }

  async function copyMonthMarkdown() {
    const md = generateMonthMarkdown(currentMonth, completed);
    try {
      await navigator.clipboard.writeText(md);
      setCopiedMonth(true);
      setTimeout(() => setCopiedMonth(false), 2500);
    } catch {
      // Browser permissions or headless environment fallback
    }
  }

  function downloadFullMarkdown() {
    const md = generateFullScheduleMarkdown(completed);
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sysadmin-12month-checklist.md";
    a.click();
    URL.revokeObjectURL(url);
  }

  function chooseMonth(monthNumber: number) {
    setSelectedMonth(monthNumber);
    setSelectedWeek(1);
  }

  function goToPrevWeek() {
    if (selectedWeek > 1) {
      setSelectedWeek((w) => w - 1);
    } else if (selectedMonth > 1) {
      setSelectedMonth((m) => m - 1);
      setSelectedWeek(4);
    }
    const el = document.getElementById("week-plan-title");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function goToNextWeek() {
    if (selectedWeek < 4) {
      setSelectedWeek((w) => w + 1);
    } else if (selectedMonth < 12) {
      setSelectedMonth((m) => m + 1);
      setSelectedWeek(1);
    }
    const el = document.getElementById("week-plan-title");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main id="main-content" className="inner-page schedule-page" data-progress-ready={ready ? "true" : "false"}>
      <div className="container">
        <div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><span>Study schedule</span></div>

        <motion.section className="schedule-hero" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="schedule-hero-copy">
            <h1>Build your SysAdmin skills, <span>one week at a time.</span></h1>
            <p>A practical sequence that takes you from IT fundamentals to advanced infrastructure engineering. Each week combines focused learning, hands-on work and a tangible outcome you can add to your technical portfolio.</p>
            <div className="schedule-hero-actions">
              <a className="button button-primary" href="#month-plan">Explore the schedule <ArrowDown size={16} /></a>
              <Link className="button button-secondary" href="/roadmap">View complete roadmap <ArrowRight size={15} /></Link>
            </div>
            <div className="schedule-flex-note">
              <Gauge size={16} />
              <span>Suggested pace, not a deadline. Adjust the hours and timeline to suit your experience and availability.</span>
            </div>
          </div>

          <div className="schedule-progress-card">
            <div className="schedule-progress-top">
              <span>YOUR SCHEDULE PROGRESS</span>
              <span className="schedule-live-dot" />
            </div>
            <div className="schedule-progress-number">{overallProgress}<span className="schedule-progress-unit">%</span></div>
            <div className="schedule-progress-track"><span style={{ width: `${overallProgress}%` }} /></div>
            <div className="schedule-progress-bottom">
              <span>{completedCount} of {allTasks.length} tasks completed</span>
              <span>{12 - studySchedule.filter((month) => month.weeks.every((week) => week.tasks.every((_, index) => completed[`${week.id}-t${index + 1}`]))).length} months to go</span>
            </div>

            <div className="schedule-progress-divider" />

            {/* Study Pace Presets */}
            <div className="schedule-pace-section">
              <div className="schedule-pace-heading">
                <span><Clock3 size={14} /> Weekly Study Pace</span>
                <strong>{weeklyHours} hrs / week</strong>
              </div>
              <div className="schedule-pace-presets" role="group" aria-label="Study pace presets">
                {PACE_PRESETS.map((preset) => {
                  const Icon = preset.icon;
                  const isActive = weeklyHours === preset.hours;
                  return (
                    <button
                      key={preset.label}
                      type="button"
                      className={`schedule-preset-btn ${isActive ? "active" : ""}`}
                      onClick={() => setWeeklyHours(preset.hours)}
                      aria-pressed={isActive}
                    >
                      <Icon size={12} />
                      <span>{preset.label}</span>
                      <small>{preset.hours}h</small>
                    </button>
                  );
                })}
              </div>
            </div>

            <label className="study-hours-control" htmlFor="weekly-hours">
              <span>Custom fine-tune</span>
              <strong>{weeklyHours} hrs</strong>
            </label>
            <input
              id="weekly-hours"
              type="range"
              min="2"
              max="20"
              step="1"
              value={weeklyHours}
              onChange={(event) => setWeeklyHours(Number(event.target.value))}
            />
            <div className="schedule-hours-scale"><span>2 hrs</span><span>20 hrs</span></div>

            {/* Target Date Estimator */}
            <div className="schedule-pace-estimate">
              <div className="schedule-estimate-row">
                <span><CalendarDays size={14} /> Estimated Completion:</span>
                <strong>{estimatedCompletion.dateStr}</strong>
              </div>
              {!estimatedCompletion.isFinished && (
                <small className="schedule-estimate-sub">
                  ~{estimatedCompletion.remainingWeeks} study weeks remaining ({estimatedCompletion.remainingHours} hrs at {weeklyHours}h/wk)
                </small>
              )}
            </div>

            {/* Data Portability: Backup & Restore */}
            <div className="schedule-portability-row">
              <button
                type="button"
                className="schedule-portability-btn"
                onClick={handleBackupProgress}
                title="Download your progress as a JSON backup file"
              >
                <Download size={13} /> Backup
              </button>
              <button
                type="button"
                className="schedule-portability-btn"
                onClick={() => fileInputRef.current?.click()}
                title="Restore your progress from a previous JSON backup file"
              >
                <Upload size={13} /> Restore
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleRestoreFile}
                style={{ display: "none" }}
                aria-label="Restore progress from JSON"
              />
            </div>
            {restoreNotice && (
              <div className="schedule-restore-notice" role="status">
                <CheckCircle2 size={13} /> {restoreNotice}
              </div>
            )}

            <small className="schedule-local-note"><CheckCircle2 size={12} /> Progress auto-saved locally in this browser.</small>
          </div>
        </motion.section>

        <section className="schedule-metrics" aria-label="Schedule overview">
          <div><span>01</span><strong>12 months</strong><small>4 sequential phases</small></div>
          <div><span>02</span><strong>48 weeks</strong><small>Focused learning blocks</small></div>
          <div><span>03</span><strong>144 labs</strong><small>Hands-on deliverables</small></div>
          <div><span>04</span><strong>Portable</strong><small>Backup & export anytime</small></div>
        </section>

        <section className="schedule-month-section" id="month-plan">
          <div className="schedule-section-heading">
            <div>
              <h2>Choose your month.</h2>
              <p>Explore the monthly focus areas grouped across 4 quarterly phases, and select a month to open its weekly plan.</p>
            </div>
            <div className="schedule-filter" aria-label="Filter months">
              {["All months", "Not started", "In progress", "Completed"].map((item) => (
                <button
                  type="button"
                  key={item}
                  className={filter === item ? "active" : ""}
                  aria-pressed={filter === item}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="schedule-month-grid">
            {visibleMonths.map((month) => {
              const taskCount = month.weeks.reduce((sum, week) => sum + week.tasks.length, 0);
              const doneCount = month.weeks.reduce((sum, week) => sum + week.tasks.filter((_, index) => completed[`${week.id}-t${index + 1}`]).length, 0);
              const progress = Math.round((doneCount / taskCount) * 100);
              const isSelected = selectedMonth === month.number;
              const isDone = progress === 100;
              const phaseInfo = getPhaseInfo(month.number);

              return (
                <button
                  type="button"
                  key={month.number}
                  className={`schedule-month-card ${isSelected ? "selected" : ""} ${isDone ? "is-completed" : ""}`}
                  onClick={() => chooseMonth(month.number)}
                  aria-pressed={isSelected}
                >
                  <span className="schedule-month-card-top">
                    <span className="schedule-month-phase-tag">{phaseInfo.tag}</span>
                    {isDone ? (
                      <span className="schedule-month-done-badge"><CheckCircle2 size={14} /> Done</span>
                    ) : (
                      <span className="schedule-month-progress-label">{progress}%</span>
                    )}
                  </span>
                  <div className="schedule-month-card-mid">
                    <small className="schedule-month-code">MONTH {String(month.number).padStart(2, "0")}</small>
                    <strong>{month.title}</strong>
                  </div>
                  <span className="schedule-month-stage">{month.stageLabel}</span>
                  <span className="schedule-month-progress"><i style={{ width: `${progress}%` }} /></span>
                  <span className="schedule-month-card-bottom">
                    <small>{doneCount}/{taskCount} tasks</small>
                    <ArrowRight size={15} />
                  </span>
                </button>
              );
            })}
          </div>
          {!visibleMonths.length && <div className="topic-empty">No months match this filter yet.</div>}
        </section>

        <section className="schedule-week-section" aria-labelledby="week-plan-title">
          <div className="schedule-week-heading">
            <div>
              <div className="schedule-phase-breadcrumb">
                <span className="schedule-phase-pill">{getPhaseInfo(currentMonth.number).name}</span>
              </div>
              <h2 id="week-plan-title">Month {String(currentMonth.number).padStart(2, "0")}: {currentMonth.title}</h2>
              <p>{currentMonth.summary}</p>
            </div>
            <div className="schedule-week-heading-actions">
              <div className="schedule-month-completion">
                <strong>{Math.round((monthDone / monthTotal) * 100)}%</strong>
                <span>MONTH COMPLETE</span>
                <div><i style={{ width: `${(monthDone / monthTotal) * 100}%` }} /></div>
              </div>
            </div>
          </div>

          {/* Month Completion Celebration Banner */}
          {monthDone === monthTotal && (
            <motion.div
              className="schedule-month-celebration"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Sparkles size={20} className="schedule-celebrate-icon" />
              <div>
                <strong>Month {String(currentMonth.number).padStart(2, "0")} Completed!</strong>
                <p>Outstanding! You have completed all 4 deliverables and 12 hands-on tasks for this stage. Your practical portfolio is growing.</p>
              </div>
            </motion.div>
          )}

          <div className="schedule-stage-reference">
            <div className="schedule-stage-ref-left">
              <span><Flag size={15} /> {currentMonth.stageLabel}</span>
              {selectedStage && <Link href={`/roadmap/${currentMonth.stageSlug}`}>Explore this roadmap stage <ArrowRight size={14} /></Link>}
            </div>
            {/* Markdown Export Actions */}
            <div className="schedule-export-actions">
              <button
                type="button"
                className="schedule-export-btn"
                onClick={copyMonthMarkdown}
                title="Copy current month checklist as Markdown (great for Notion or Obsidian)"
              >
                {copiedMonth ? <Check size={13} /> : <Copy size={13} />}
                <span>{copiedMonth ? "Copied Month Notes!" : "Copy Month (MD)"}</span>
              </button>
              <button
                type="button"
                className="schedule-export-btn"
                onClick={downloadFullMarkdown}
                title="Download complete 12-month curriculum as a Markdown checklist"
              >
                <FileText size={13} />
                <span>Full Checklist (.md)</span>
              </button>
            </div>
          </div>

          <div className="schedule-week-layout">
            <nav className="schedule-week-nav" aria-label="Weeks in selected month">
              {currentMonth.weeks.map((week, index) => {
                const done = week.tasks.filter((_, taskIndex) => completed[`${week.id}-t${taskIndex + 1}`]).length;
                const isDone = done === week.tasks.length;
                return (
                  <button
                    type="button"
                    key={week.id}
                    className={selectedWeek === index + 1 ? "active" : ""}
                    onClick={() => setSelectedWeek(index + 1)}
                  >
                    <span className="schedule-week-nav-number">WEEK 0{index + 1}</span>
                    <strong>{week.title}</strong>
                    <small>{isDone ? "Completed" : `${done}/${week.tasks.length} tasks`}</small>
                    {isDone && <Check size={14} />}
                  </button>
                );
              })}
            </nav>

            <motion.article
              key={currentWeek.id}
              className="schedule-week-detail"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
            >
              <div className="schedule-week-detail-top">
                <div>
                  <span>MONTH {String(currentMonth.number).padStart(2, "0")} / WEEK 0{selectedWeek}</span>
                  <h3>{currentWeek.title}</h3>
                </div>
                <span className="schedule-week-hours"><Clock3 size={14} /> {currentWeek.hours} hrs suggested</span>
              </div>
              <p className="schedule-week-focus">{currentWeek.focus}</p>

              <div className="schedule-task-heading">
                <div className="schedule-task-heading-left">
                  <strong>Learning & practical tasks</strong>
                  <span>{weekDone}/{currentWeek.tasks.length} complete</span>
                </div>
                <button
                  type="button"
                  className={`schedule-week-quick-toggle ${weekDone === currentWeek.tasks.length ? "is-complete" : ""}`}
                  onClick={toggleEntireWeek}
                >
                  <CheckCheck size={14} />
                  <span>{weekDone === currentWeek.tasks.length ? "Mark week incomplete" : "Complete entire week"}</span>
                </button>
              </div>

              <div className="schedule-task-list">
                {currentWeek.tasks.map((task, index) => {
                  const id = weekTaskIds[index];
                  return (
                    <label key={id} className={`schedule-task ${completed[id] ? "done" : ""}`}>
                      <input
                        type="checkbox"
                        checked={Boolean(completed[id])}
                        onChange={() => toggleTask(id)}
                      />
                      <span className="schedule-task-check"><Check size={13} /></span>
                      <span className="schedule-task-copy">
                        <small>TASK 0{index + 1}</small>
                        {task}
                      </span>
                    </label>
                  );
                })}
              </div>

              <div className="schedule-deliverable">
                <span><Target size={16} /> WEEKLY DELIVERABLE</span>
                <p>{currentWeek.deliverable}</p>
              </div>

              <div className="schedule-related-resources">
                <div><BookOpen size={15} /><strong>Recommended resources for this week</strong></div>
                <div className="schedule-resource-links">
                  {currentWeek.resourceIds
                    .map((id) => resources.find((resource) => resource.id === id))
                    .filter((resource): resource is LearningResource => Boolean(resource))
                    .map((resource) => (
                      <a
                        key={resource.id}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="schedule-resource-card"
                      >
                        <div className="schedule-resource-card-header">
                          <span className="schedule-resource-cat">{resource.category}</span>
                          <span className="schedule-resource-cost">{resource.cost}</span>
                        </div>
                        <div className="schedule-resource-card-name">
                          <strong>{resource.name}</strong>
                          <ExternalLink size={12} />
                        </div>
                      </a>
                    ))}
                </div>
              </div>

              {/* Continuous Cross-Month Navigation Footer */}
              <div className="schedule-week-footer">
                <button
                  type="button"
                  className="schedule-week-change"
                  disabled={selectedMonth === 1 && selectedWeek === 1}
                  onClick={goToPrevWeek}
                >
                  {selectedWeek === 1 && selectedMonth > 1
                    ? `← Month ${String(selectedMonth - 1).padStart(2, "0")}, Week 4`
                    : "← Previous week"}
                </button>

                <div className="schedule-week-indicator">
                  Week {selectedWeek} of 4
                </div>

                <button
                  type="button"
                  className="schedule-week-next"
                  disabled={selectedMonth === 12 && selectedWeek === 4}
                  onClick={goToNextWeek}
                >
                  {selectedWeek === 4 && selectedMonth < 12
                    ? `Month ${String(selectedMonth + 1).padStart(2, "0")}, Week 1 →`
                    : <>Next week <ArrowRight size={14} /></>}
                </button>
              </div>
            </motion.article>
          </div>

          <div className="schedule-month-milestone">
            <div><Flag size={17} /><span>MONTH-END MILESTONE</span></div>
            <p>{currentMonth.milestone}</p>
          </div>
        </section>

        <section className="schedule-guidance">
          <div className="schedule-guidance-icon"><Gauge size={21} /></div>
          <div>
            <h3>Make the schedule work for your situation.</h3>
            <p>Some topics will take longer depending on your previous experience, equipment and access to lab environments. Spend time practising and documenting what you build. Move forward when you can explain the concepts and complete the practical work—not simply when a week ends.</p>
          </div>
          <div className="schedule-guidance-actions">
            <button type="button" className="schedule-guidance-backup" onClick={handleBackupProgress}>
              <Download size={13} /> Backup progress
            </button>
            <button type="button" className="schedule-guidance-reset" onClick={resetProgress}>
              <RotateCcw size={14} /> Reset progress
            </button>
          </div>
        </section>

        <div className="schedule-bottom-links">
          <Link href="/roadmap">Explore all roadmap stages <ArrowRight size={14} /></Link>
          <Link href="/resources">Browse the full resource library <ArrowRight size={14} /></Link>
        </div>
      </div>
    </main>
  );
}
