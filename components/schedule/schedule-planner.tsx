"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowRight, ArrowUpRight, BookOpen, CalendarDays, Check, CheckCircle2, Clock3, ExternalLink, Flag, Gauge, RotateCcw, Target } from "lucide-react";
import { studySchedule } from "@/data/schedule";
import { resources } from "@/data/resources";
import { getStageBySlug } from "@/data/roadmap";

const STORAGE_KEY = "sysadmin-study-schedule-v1";
type StoredSchedule = { completed: Record<string, boolean>; weeklyHours: number };
const allTasks = studySchedule.flatMap((month) => month.weeks.flatMap((week) => week.tasks.map((_, index) => `${week.id}-t${index + 1}`)));
const validTaskIds = new Set(allTasks);

export function SchedulePlanner() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [weeklyHours, setWeeklyHours] = useState(7);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [filter, setFilter] = useState("All months");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const stored = JSON.parse(raw) as StoredSchedule;
        if (stored && typeof stored === "object") {
          if (stored.completed && typeof stored.completed === "object" && !Array.isArray(stored.completed)) {
            const validEntries = Object.entries(stored.completed).filter(([id, value]) => validTaskIds.has(id) && value === true);
            setCompleted(Object.fromEntries(validEntries));
          }
          if (typeof stored.weeklyHours === "number" && stored.weeklyHours >= 2 && stored.weeklyHours <= 20) setWeeklyHours(stored.weeklyHours);
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

  function resetProgress() {
    if (!window.confirm("Reset all completed schedule tasks? This cannot be undone.")) return;
    setCompleted({});
  }

  function chooseMonth(monthNumber: number) {
    setSelectedMonth(monthNumber);
    setSelectedWeek(1);
  }

  return (
    <main id="main-content" className="inner-page schedule-page">
      <div className="container">
        <div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><span>Study schedule</span></div>

        <motion.section className="schedule-hero" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="schedule-hero-copy">
            <span className="eyebrow"><CalendarDays size={13} /> THE 12-MONTH STUDY PLAN</span>
            <h1>Build your SysAdmin skills, <span>one week at a time.</span></h1>
            <p>A practical sequence that takes you from IT fundamentals to advanced infrastructure engineering. Each week combines focused learning, hands-on work and a tangible outcome you can add to your technical portfolio.</p>
            <div className="schedule-hero-actions"><a className="button button-primary" href="#month-plan">Explore the schedule <ArrowDownRight size={16} /></a><Link className="button button-secondary" href="/roadmap">View complete roadmap <ArrowUpRight size={15} /></Link></div>
            <div className="schedule-flex-note"><Gauge size={16} /><span>Suggested pace, not a deadline. Adjust the hours and timeline to suit your experience and availability.</span></div>
          </div>
          <div className="schedule-progress-card">
            <div className="schedule-progress-top"><span>YOUR SCHEDULE PROGRESS</span><span className="schedule-live-dot" /></div>
            <div className="schedule-progress-number">{overallProgress}<small>%</small></div>
            <div className="schedule-progress-track"><span style={{ width: `${overallProgress}%` }} /></div>
            <div className="schedule-progress-bottom"><span>{completedCount} of {allTasks.length} tasks completed</span><span>{12 - studySchedule.filter((month) => month.weeks.every((week) => week.tasks.every((_, index) => completed[`${week.id}-t${index + 1}`]))).length} months to go</span></div>
            <div className="schedule-progress-divider" />
            <label className="study-hours-control" htmlFor="weekly-hours"><span><Clock3 size={15} /> Weekly study time</span><strong>{weeklyHours} hrs</strong></label>
            <input id="weekly-hours" type="range" min="2" max="20" step="1" value={weeklyHours} onChange={(event) => setWeeklyHours(Number(event.target.value))} />
            <div className="schedule-hours-scale"><span>2 hrs</span><span>20 hrs</span></div>
            <p className="schedule-pace-estimate">At {weeklyHours} hours per week, allow approximately <strong>{Math.ceil((12 * 7) / weeklyHours)} months</strong> for this plan.</p>
            <small className="schedule-local-note"><CheckCircle2 size={12} /> Progress is saved in this browser.</small>
          </div>
        </motion.section>

        <section className="schedule-metrics" aria-label="Schedule overview">
          <div><span>01</span><strong>12 months</strong><small>Structured progression</small></div>
          <div><span>02</span><strong>48 weeks</strong><small>Focused learning blocks</small></div>
          <div><span>03</span><strong>Hands-on</strong><small>Labs and deliverables</small></div>
          <div><span>04</span><strong>Portfolio-ready</strong><small>Evidence of practical skills</small></div>
        </section>

        <section className="schedule-month-section" id="month-plan">
          <div className="schedule-section-heading">
            <div><span className="eyebrow">01 / THE LEARNING TIMELINE</span><h2>Choose your month.</h2><p>Explore the monthly focus areas and select a month to open its weekly plan.</p></div>
            <div className="schedule-filter" aria-label="Filter months">{["All months", "Not started", "In progress", "Completed"].map((item) => <button type="button" key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div>
          </div>
          <div className="schedule-month-grid">
            {visibleMonths.map((month) => {
              const taskCount = month.weeks.reduce((sum, week) => sum + week.tasks.length, 0);
              const doneCount = month.weeks.reduce((sum, week) => sum + week.tasks.filter((_, index) => completed[`${week.id}-t${index + 1}`]).length, 0);
              const progress = Math.round((doneCount / taskCount) * 100);
              const isSelected = selectedMonth === month.number;
              return (
                <button type="button" key={month.number} className={`schedule-month-card ${isSelected ? "selected" : ""}`} onClick={() => chooseMonth(month.number)} aria-pressed={isSelected}>
                  <span className="schedule-month-card-top"><small>MONTH {String(month.number).padStart(2, "0")}</small>{progress === 100 ? <CheckCircle2 size={16} /> : <span className="schedule-month-progress-label">{progress}%</span>}</span>
                  <strong>{month.title}</strong>
                  <span className="schedule-month-stage">{month.stageLabel}</span>
                  <span className="schedule-month-progress"><i style={{ width: `${progress}%` }} /></span>
                  <span className="schedule-month-card-bottom"><small>{doneCount}/{taskCount} tasks</small><ArrowUpRight size={15} /></span>
                </button>
              );
            })}
          </div>
          {!visibleMonths.length && <div className="topic-empty">No months match this filter yet.</div>}
        </section>

        <section className="schedule-week-section" aria-labelledby="week-plan-title">
          <div className="schedule-week-heading">
            <div><span className="eyebrow">02 / WEEK-BY-WEEK PLAN</span><h2 id="week-plan-title">Month {String(currentMonth.number).padStart(2, "0")}: {currentMonth.title}</h2><p>{currentMonth.summary}</p></div>
            <div className="schedule-month-completion"><strong>{Math.round((monthDone / monthTotal) * 100)}%</strong><span>MONTH COMPLETE</span><div><i style={{ width: `${(monthDone / monthTotal) * 100}%` }} /></div></div>
          </div>
          <div className="schedule-stage-reference"><span><Flag size={15} /> {currentMonth.stageLabel}</span>{selectedStage && <Link href={`/roadmap/${currentMonth.stageSlug}`}>Explore this roadmap stage <ArrowUpRight size={14} /></Link>}</div>
          <div className="schedule-week-layout">
            <nav className="schedule-week-nav" aria-label="Weeks in selected month">
              {currentMonth.weeks.map((week, index) => {
                const done = week.tasks.filter((_, taskIndex) => completed[`${week.id}-t${taskIndex + 1}`]).length;
                const isDone = done === week.tasks.length;
                return <button type="button" key={week.id} className={selectedWeek === index + 1 ? "active" : ""} onClick={() => setSelectedWeek(index + 1)}><span className="schedule-week-nav-number">WEEK 0{index + 1}</span><strong>{week.title}</strong><small>{isDone ? "Completed" : `${done}/${week.tasks.length} tasks`}</small>{isDone && <Check size={14} />}</button>;
              })}
            </nav>
            <motion.article key={currentWeek.id} className="schedule-week-detail" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
              <div className="schedule-week-detail-top"><div><span>MONTH {String(currentMonth.number).padStart(2, "0")} / WEEK 0{selectedWeek}</span><h3>{currentWeek.title}</h3></div><span className="schedule-week-hours"><Clock3 size={14} /> {currentWeek.hours} hrs suggested</span></div>
              <p className="schedule-week-focus">{currentWeek.focus}</p>
              <div className="schedule-task-heading"><strong>Learning & practical tasks</strong><span>{weekDone}/{currentWeek.tasks.length} complete</span></div>
              <div className="schedule-task-list">
                {currentWeek.tasks.map((task, index) => {
                  const id = weekTaskIds[index];
                  return <label key={id} className={`schedule-task ${completed[id] ? "done" : ""}`}><input type="checkbox" checked={Boolean(completed[id])} onChange={() => toggleTask(id)} /><span className="schedule-task-check"><Check size={13} /></span><span className="schedule-task-copy"><small>TASK 0{index + 1}</small>{task}</span></label>;
                })}
              </div>
              <div className="schedule-deliverable"><span><Target size={16} /> WEEKLY DELIVERABLE</span><p>{currentWeek.deliverable}</p></div>
              <div className="schedule-related-resources"><div><BookOpen size={15} /><strong>Recommended resources</strong></div><div className="schedule-resource-links">{currentWeek.resourceIds.map((id) => resources.find((resource) => resource.id === id)).filter((resource) => Boolean(resource)).map((resource) => <a key={resource!.id} href={resource!.url} target="_blank" rel="noopener noreferrer">{resource!.name}<ExternalLink size={12} /></a>)}</div></div>
              <div className="schedule-week-footer"><button type="button" className="schedule-week-change" disabled={selectedWeek === 1} onClick={() => setSelectedWeek((value) => Math.max(1, value - 1))}>Previous week</button><button type="button" className="schedule-week-next" disabled={selectedWeek === 4} onClick={() => setSelectedWeek((value) => Math.min(4, value + 1))}>Next week <ArrowRight size={14} /></button></div>
            </motion.article>
          </div>
          <div className="schedule-month-milestone"><div><Flag size={17} /><span>MONTH-END MILESTONE</span></div><p>{currentMonth.milestone}</p></div>
        </section>

        <section className="schedule-guidance">
          <div className="schedule-guidance-icon"><Gauge size={21} /></div>
          <div><h3>Make the schedule work for your situation.</h3><p>Some topics will take longer depending on your previous experience, equipment and access to lab environments. Spend time practising and documenting what you build. Move forward when you can explain the concepts and complete the practical work—not simply when a week ends.</p></div>
          <button type="button" onClick={resetProgress}><RotateCcw size={14} /> Reset progress</button>
        </section>

        <div className="schedule-bottom-links"><Link href="/roadmap">Explore all roadmap stages <ArrowUpRight size={14} /></Link><Link href="/resources">Browse the full resource library <ArrowUpRight size={14} /></Link></div>
      </div>
    </main>
  );
}
