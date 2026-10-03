/* =========================================================================
   AM RISK AND TRAINING — Aviation & ARFF Training Platform
   PROGRESS STORE
   -------------------------------------------------------------------------
   Offline-first. Everything lives in localStorage under one key so a learner's
   record can be exported as a single JSON file, carried on a USB stick to the
   instructor, imported into the roster, and exported again.

   There is no server dependency here on purpose. The platform must be fully
   usable with the network unplugged — that is the whole product.

   Storage shape:
     { v: 1, learner: string|null, progress: { [moduleId]: {done,at,seconds} },
       quizzes: { [courseId]: {attempts,best,lastAt} }, settings: {...} }
   ========================================================================= */

const KEY = 'amrisk.arff.v1';
const SCHEMA = 1;

/** Guard against a corrupt or partial record taking the app down on load. */
function blank() {
  return { v: SCHEMA, learner: null, progress: {}, quizzes: {}, settings: {} };
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return blank();
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || parsed.v !== SCHEMA) return blank();
    // Merge over a blank so a record written by an older build still boots.
    return { ...blank(), ...parsed };
  } catch {
    // Unparseable record: keep a copy for diagnosis, then start clean rather
    // than trapping the user in a broken app with no way back in.
    try { localStorage.setItem(KEY + '.corrupt.' + Date.now(), localStorage.getItem(KEY)); } catch {}
    return blank();
  }
}

let state = load();

const listeners = new Set();

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Out of quota or private-mode restriction. The in-memory state still
    // works for this session; the learner is told via the store error banner.
    window.dispatchEvent(new CustomEvent('amrisk:persist-failed'));
  }
}

function changed() {
  for (const fn of listeners) {
    try { fn(state); } catch (e) { console.error('store listener failed', e); }
  }
}

function commit() { persist(); changed(); }

/* ── Learner identity ────────────────────────────────────────────────── */

function getLearner() { return state.learner; }

function setLearner(name) {
  const clean = String(name || '').trim().slice(0, 80);
  state.learner = clean || null;
  commit();
  return state.learner;
}

/* ── Module progress ─────────────────────────────────────────────────── */

function isModuleDone(moduleId) {
  return Boolean(state.progress[moduleId]?.done);
}

/** Mark complete. Idempotent — re-completing keeps the ORIGINAL timestamp,
    because "when you first got this" is what a competency record means. */
function completeModule(moduleId, seconds = 0) {
  const existing = state.progress[moduleId];
  if (existing?.done) return;
  state.progress[moduleId] = { done: true, at: Date.now(), seconds: Math.round(seconds) };
  commit();
}

function uncompleteModule(moduleId) {
  delete state.progress[moduleId];
  commit();
}

function moduleMeta(moduleId) {
  return state.progress[moduleId] || null;
}

/** Reset one course's module completion, keeping quiz history. */
function resetCourse(courseId, moduleIds) {
  for (const id of moduleIds) delete state.progress[id];
  commit();
}

/* ── Quiz attempts ───────────────────────────────────────────────────── */

function recordQuizAttempt(courseId, scorePct) {
  const q = state.quizzes[courseId] || { attempts: 0, best: 0, lastAt: null };
  q.attempts += 1;
  // best is a high-water mark: a later worse attempt must not erase a pass,
  // because pass/fail is what gets recorded.
  q.best = Math.max(q.best, Math.round(scorePct));
  q.lastAt = Date.now();
  state.quizzes[courseId] = q;
  commit();
  return q;
}

function quizRecord(courseId) {
  return state.quizzes[courseId] || { attempts: 0, best: 0, lastAt: null };
}

function hasPassed(courseId, passMark) {
  return quizRecord(courseId).best >= passMark;
}

/* ── Aggregation ─────────────────────────────────────────────────────── */

/**
 * Progress across a whole course.
 * `done` counts modules only — a course is not complete until the assessment
 * is passed, which is the whole point of having an assessment.
 */
function courseProgress(course, passMark = course.assessment?.pass ?? 80) {
  const total = course.modules.length;
  const done = course.modules.filter((m) => isModuleDone(m.id)).length;
  const q = quizRecord(course.id);
  const modulesPct = total ? Math.round((done / total) * 100) : 0;
  const passed = hasPassed(course.id, passMark);
  // Course completion = all modules done AND assessment passed.
  const complete = done === total && passed;
  return {
    done, total, modulesPct, passed, complete,
    best: q.best, attempts: q.attempts, lastAt: q.lastAt,
    minutesDone: course.modules
      .filter((m) => isModuleDone(m.id))
      .reduce((n, m) => n + (m.minutes || 0), 0)
  };
}

/** Whole-catalogue summary for the home and progress views. */
function overallProgress(courses) {
  let doneModules = 0, totalModules = 0, minutesDone = 0, minutesTotal = 0;
  let passedCourses = 0, coursesTouched = 0;

  for (const c of courses) {
    const p = courseProgress(c);
    totalModules += p.total;
    doneModules += p.done;
    minutesTotal += c.minutes || 0;
    minutesDone += p.minutesDone;
    if (p.passed) passedCourses++;
    if (p.done > 0 || p.attempts > 0) coursesTouched++;
  }

  const modulePct = totalModules ? Math.round((doneModules / totalModules) * 100) : 0;
  const coursePct = courses.length ? Math.round((passedCourses / courses.length) * 100) : 0;

  return {
    doneModules, totalModules, modulePct,
    passedCourses, coursesTouched, courseTotal: courses.length, coursePct,
    minutesDone, minutesTotal,
    // The headline number blends module work and assessment, because a
    // learner with 25% of modules done has not "completed" a quarter of the
    // curriculum — they have started a quarter of it.
    headline: Math.round((modulePct + coursePct) / 2)
  };
}

/* ── Portability ─────────────────────────────────────────────────────── */

/** A dated, human-readable export. This file is the portable record. */
function exportRecord() {
  const payload = { ...state, exportedAt: new Date().toISOString() };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const stamp = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `arff-training-record-${stamp}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  // Revoke on the next tick; revoking synchronously can cancel the download in Safari.
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

/**
 * Merge an exported record into the current one.
 * Completed modules are a union — a module completed anywhere stays complete.
 * Quiz bests take the maximum, for the same reason a pass must not be lost.
 */
function importRecord(json) {
  let incoming;
  try {
    incoming = typeof json === 'string' ? JSON.parse(json) : json;
  } catch {
    throw new Error('That file is not valid JSON.');
  }
  if (!incoming || incoming.v !== SCHEMA) {
    throw new Error('That file is not an AM RISK training record.');
  }

  for (const [id, v] of Object.entries(incoming.progress || {})) {
    if (!v?.done) continue;
    const cur = state.progress[id];
    if (!cur?.done) state.progress[id] = v;
  }
  for (const [id, v] of Object.entries(incoming.quizzes || {})) {
    const cur = state.quizzes[id];
    state.quizzes[id] = cur
      ? { ...cur, best: Math.max(cur.best, v.best || 0), attempts: cur.attempts + (v.attempts || 0) }
      : { attempts: v.attempts || 0, best: v.best || 0, lastAt: v.lastAt || null };
  }
  if (incoming.learner && !state.learner) state.learner = incoming.learner;
  commit();
}

/** Wipe this learner's record. Irreversible — the UI confirms before calling. */
function clearAll() {
  state = blank();
  commit();
}

/* ── Subscription ────────────────────────────────────────────────────── */

/** Returns an unsubscribe function. */
function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** Read-only accessor for the views that want to render raw state. */
function snapshot() { return state; }
