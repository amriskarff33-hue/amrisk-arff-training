/* =========================================================================
   AM RISK AND TRAINING — Aviation & ARFF Training Platform
   APPLICATION
   -------------------------------------------------------------------------
   No framework, no build step, no dependencies. Hash routing so the platform
   runs identically from a web server, a USB stick, or a bare double-click of
   index.html.

   The Coach view is an OFF-LOCAL-INDEX search, not a language model. It reads
   the same curriculum data the rest of the app does, so it works with the
   network unplugged and cannot invent an answer that is not in the course
   material. Where a real model should plug in later, see answerFromIndex() —
   it is the single seam.
   ========================================================================= */

/* All three dependencies are loaded as classic scripts ahead of this file, so
   everything below shares one global scope. That is what keeps the platform
   working from a bare double-click of index.html — ES modules would be blocked
   by CORS over file://. Same reasoning as the marshalling signals app. */
const findCourse = course;

/* ── Utilities ───────────────────────────────────────────────────────── */

/** Escape every interpolated value. Course data is authored by hand and this
    is the boundary where that data becomes markup. */
function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

const view = document.getElementById('view');
const banner = document.getElementById('banner');
const navBack = document.getElementById('navBack');
const appbarSub = document.getElementById('appbarSub');

function fmtMinutes(m) {
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60), r = m % 60;
  return r ? `${h} h ${r} min` : `${h} h`;
}

function say(msg, kind = 'warn') {
  if (!msg) { banner.hidden = true; return; }
  banner.textContent = msg;
  banner.hidden = false;
  banner.style.background = kind === 'fail' ? 'var(--fail)' : 'var(--warn)';
  banner.style.color = kind === 'fail' ? '#fff' : '#1A1206';
}

window.addEventListener('amrisk:persist-failed', () =>
  say('Progress cannot be saved on this device. Export your record before you leave.'));

/* ── Theme ───────────────────────────────────────────────────────────── */

const THEME_KEY = 'amrisk.arff.theme';
function setTheme(t) {
  document.documentElement.dataset.theme = t;
  try { localStorage.setItem(THEME_KEY, t); } catch {}
}
setTheme((() => { try { return localStorage.getItem(THEME_KEY) || 'night'; } catch { return 'night'; } })());
document.getElementById('themeToggle').addEventListener('click', () =>
  setTheme(document.documentElement.dataset.theme === 'night' ? 'day' : 'night'));

/* ── Shared partials ─────────────────────────────────────────────────── */

function ring(pct, caption) {
  const R = 46, C = 2 * Math.PI * R;
  const off = C * (1 - Math.min(100, Math.max(0, pct)) / 100);
  return `
    <div class="ring__dial">
      <svg viewBox="0 0 108 108" aria-hidden="true">
        <circle class="ring__track" cx="54" cy="54" r="${R}"></circle>
        <circle class="ring__bar" cx="54" cy="54" r="${R}"
                stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}"></circle>
      </svg>
      <div class="ring__pct"><b>${Math.round(pct)}%</b><small>${esc(caption || 'complete')}</small></div>
    </div>`;
}

function meter(pct, passed) {
  return `<div class="meter${passed ? ' meter--pass' : ''}">
    <div class="meter__fill" style="width:${Math.min(100, Math.max(0, pct))}%"></div></div>`;
}

/* ── Views ───────────────────────────────────────────────────────────── */

function viewHome() {
  const o = overallProgress(CURRICULUM);
  const name = getLearner();
  const ready = contentReadiness();

  // Continue where they left off: first started-but-unfinished course.
  const resume = CURRICULUM.find((c) => {
    const p = courseProgress(c);
    return !p.complete && (p.done > 0 || p.attempts > 0);
  });

  return `
    <section class="hero">
      <img src="assets/logo.png" alt="AM Risk and Training" class="hero__logo" width="64" height="64">
      <div class="hero__eyebrow">ARFF Excellence · Semper Paratus</div>
      <h1 class="hero__title">Safer Skies ·<br>Stronger Tomorrow</h1>
      <p class="hero__sub">Real training. Real readiness. Real impact. Twenty-five aviation,
      airport rescue and fire fighting courses — fully offline.</p>
      <div class="hero__pillars">
        <span class="hero__pillar">Airports</span>
        <span class="hero__pillar">People</span>
        <span class="hero__pillar">Communities</span>
      </div>
    </section>

    <div class="card">
      <div class="ring">
        ${ring(o.headline, 'overall')}
        <div class="ring__meta">
          <strong>${name ? esc(name) : 'Welcome'}</strong>
          ${name
            ? `You're building a safer tomorrow.`
            : `Hi there — set your name in Progress and your record follows you.`}
          <br>${o.doneModules} of ${o.totalModules} lessons · ${o.passedCourses} of ${o.courseTotal} courses passed
          <br>${fmtMinutes(o.minutesDone)} of ${fmtMinutes(o.minutesTotal)} studied
        </div>
      </div>
      ${resume ? `<div class="btn-row">
        <button class="btn btn--primary btn--block" data-go="course:${resume.id}">
          Continue — ${esc(resume.code)}
        </button></div>` : ''}
    </div>

    <div class="stat-grid">
      <div class="stat"><b>${CURRICULUM.length}</b><small>Courses</small></div>
      <div class="stat"><b>${fmtMinutes(TOTAL_MINUTES).replace(' ', '&nbsp;')}</b><small>Curriculum</small></div>
      <div class="stat"><b>${ready.authored}<small style="font-size:.7rem">/${ready.total}</small></b><small>Lessons written</small></div>
      <div class="stat"><b>${CURRICULUM.length - PENDING_REVIEW.length}</b><small>SME approved</small></div>
    </div>

    <div class="card card--tight">
      <h3>Your training journey</h3>
      <p style="color:var(--text-2);font-size:.86rem;margin-bottom:0">
        Teach, assess, support. Every course carries its learning outcomes, the standards it
        rests on, and an assessment. Work through a course, sit the assessment, and your
        record is saved on this device — no internet, no account.
      </p>
    </div>

    <div class="section-title"><h2>Start here</h2><small>Foundation track</small></div>
    ${courseCard(CURRICULUM[0])}
    ${courseCard(CURRICULUM[1])}
    ${courseCard(CURRICULUM[2])}

    <div class="section-title"><h2>Browse all</h2><small>${CURRICULUM.length} courses</small></div>
    <div class="btn-row">
      <button class="btn btn--block" data-tab-go="learn">Open the catalogue</button>
    </div>`;
}

function viewLearn() {
  const groups = coursesByTrack();
  const chips = Object.entries(TRACKS).map(([k, t]) =>
    `<button class="chip" data-track-filter="${k}">${esc(t.name)} <span style="opacity:.6">${(groups[k] || []).length}</span></button>`).join('');

  return `
    <h1>Catalogue</h1>
    <input class="search" id="courseSearch" type="search" placeholder="Search courses, outcomes, standards…"
           autocomplete="off" aria-label="Search courses">
    <div class="filters" role="group" aria-label="Filter by track">
      <button class="chip is-on" data-track-filter="all">All ${CURRICULUM.length}</button>
      ${chips}
    </div>
    <div id="courseResults">${allCourses(groups)}</div>`;
}

function allCourses(groups, filterTrack = 'all', query = '') {
  const q = query.trim().toLowerCase();
  let out = '';

  for (const [trackKey, track] of Object.entries(TRACKS)) {
    if (filterTrack !== 'all' && trackKey !== filterTrack) continue;
    const list = (groups[trackKey] || []).filter((c) => !q || matches(c, q));
    if (!list.length) continue;

    out += `<section class="track">
      <div class="track__head">
        <span class="track__dot" style="--track:${track.colour}"></span>
        <div>
          <h2>${esc(track.name)}</h2>
          <p class="track__blurb">${esc(track.blurb)}</p>
        </div>
      </div>
      ${list.map(courseCard).join('')}
    </section>`;
  }

  if (!out) {
    out = `<div class="empty">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7"/><path d="M16.5 16.5L21 21" stroke-linecap="round"/></svg>
      <p>No course matches “${esc(query)}”.</p>
    </div>`;
  }
  return out;
}

function matches(c, q) {
  if (c.title.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)) return true;
  if (c.summary.toLowerCase().includes(q)) return true;
  if (c.outcomes.some((o) => o.toLowerCase().includes(q))) return true;
  if (c.standards.some((s) => s.toLowerCase().includes(q))) return true;
  return c.modules.some((m) => m.title.toLowerCase().includes(q));
}

function courseCard(c) {
  const p = courseProgress(c);
  const track = TRACKS[c.track];
  const done = p.complete;

  return `
    <button class="course" data-go="course:${c.id}" style="--track:${track.colour}">
      <div class="course__top">
        <span class="course__code">${esc(c.code)}</span>
        <span class="course__name">${esc(c.title)}</span>
      </div>
      <div class="course__meta">
        <span class="pill">${esc(c.level)}</span>
        <span class="pill">${fmtMinutes(c.minutes)}</span>
        <span class="pill">${p.total} lessons</span>
        ${done ? '<span class="pill pill--pass">Complete</span>'
               : p.passed ? '<span class="pill pill--pass">Assessment passed</span>' : ''}
        ${c.review !== 'reviewed' ? '<span class="pill pill--draft">Draft</span>' : ''}
      </div>
      ${meter(p.modulesPct, done)}
    </button>`;
}

function viewCourse(id) {
  const c = findCourse(id);
  if (!c) return notFound('That course does not exist.');

  const p = courseProgress(c);
  const track = TRACKS[c.track];
  // NB: arrow wrapper is required — .map passes (item, index, array), and
  // buildLesson takes a module id string, not the module object.
  const lessons = c.modules.map((m) => buildLesson(m.id));
  const stubs = lessons.filter((l) => l.isStub).length;

  return `
    <span class="detail__code" style="--track:${track.colour}">${esc(c.code)} · ${esc(track.name)}</span>
    <h1>${esc(c.title)}</h1>
    <div class="lesson__meta">
      <span class="pill">${esc(c.level)}</span>
      <span class="pill">${fmtMinutes(c.minutes)}</span>
      <span class="pill">${c.modules.length} lessons</span>
      <span class="pill">Pass mark ${c.assessment.pass}%</span>
      ${c.review !== 'reviewed' ? '<span class="pill pill--draft">Awaiting SME review</span>' : ''}
    </div>
    <p class="detail__summary">${esc(c.summary)}</p>

    <div class="card">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:12px">
        ${ring(p.modulesPct, 'lessons')}
        <div class="ring__meta" style="color:var(--text-2)">
          <strong style="color:var(--text)">${p.done} of ${p.total} lessons</strong>
          Best assessment ${p.best}%
          ${p.attempts ? `· ${p.attempts} attempt${p.attempts > 1 ? 's' : ''}` : '· not yet attempted'}
        </div>
      </div>
      ${p.complete
        ? `<div class="pill pill--pass" style="display:inline-block;padding:7px 14px">Course complete</div>`
        : `<button class="btn btn--primary btn--block" data-go="quiz:${c.id}">
             ${p.attempts ? 'Retake the assessment' : 'Take the assessment'}
           </button>
           <p style="font-size:.76rem;color:var(--text-3);margin:10px 0 0;text-align:center">
             All ${p.total} lessons complete ${p.done === p.total ? '✓' : `(${p.done}/${p.total})`}
           </p>`}
    </div>

    <div class="section-title"><h2>Learning outcomes</h2></div>
    <div class="card"><ul class="outcomes">
      ${c.outcomes.map((o) => `<li>${esc(o)}</li>`).join('')}
    </ul></div>

    <div class="section-title"><h2>Lessons</h2>
      <small>${lessons.length - stubs} written · ${stubs} awaiting SME</small></div>
    ${c.modules.map((m, i) => {
      const done = isModuleDone(m.id);
      return `<button class="module${done ? ' is-done' : ''}" data-go="lesson:${c.id}:${m.id}">
        <span class="module__num">${done ? '✓' : i + 1}</span>
        <span class="module__body">
          <span class="module__title">${esc(m.title)}</span>
          <span class="module__sub">${m.minutes} min${buildLesson(m.id).isStub ? ' · draft' : ''}</span>
        </span>
        <span class="module__go">›</span>
      </button>`;
    }).join('')}

    <div class="section-title"><h2>Standards</h2><small>Governing documents</small></div>
    <div class="card"><ul class="refs">
      ${c.standards.map((s) => `<li>${esc(s)}</li>`).join('')}
    </ul></div>

    ${courseVideoSection(c.id)}

    <div class="btn-row">
      <button class="btn btn--danger" data-reset-course="${esc(c.id)}">Reset this course</button>
    </div>`;
}

function viewLesson(courseId, moduleId) {
  const c = findCourse(courseId);
  if (!c) return notFound('That course does not exist.');

  const mod = c.modules.find((m) => m.id === moduleId);
  if (!mod) return notFound('That lesson does not exist.');

  const lesson = buildLesson(moduleId);
  const idx = c.modules.indexOf(mod);
  const prev = c.modules[idx - 1];
  const next = c.modules[idx + 1];
  const done = isModuleDone(moduleId);

  // Draft banner is the single most important safety affordance in the app.
  const draft = `
    <div class="draft">
      <svg class="draft__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
        <path d="M12 4.5l8.5 15h-17z" stroke-linejoin="round"/><path d="M12 10v4.2" stroke-linecap="round"/><path d="M12 17.1v.05" stroke-linecap="round"/>
      </svg>
      <div>
        <strong>${lesson.isStub ? 'Lesson not yet written' : 'Draft — pending SME sign-off'}</strong>
        <p>${lesson.isStub
            ? 'This lesson&rsquo;s body content has not been written yet. The learning outcomes and standards below are accurate and are what this lesson must deliver. Do not treat this page as operational guidance.'
            : 'The body content below has not yet been checked by a qualified subject-matter expert. Treat it as study material, never as approved procedure. Check against your controlled documents and your service SOP.'}</p>
      </div>
    </div>`;

  // Expand {{diagram:key}} and {{video:key}} placeholders before the body is
  // injected. A missing key renders a visible marker rather than vanishing.
  const body = lesson.body
    ? `<div class="prose">${renderVideos(renderPhotos(renderDiagrams(lesson.body)))}</div>`
    : `<div class="card"><h3>What this lesson must cover</h3>
        <p style="color:var(--text-2);font-size:.88rem">The body content for this lesson has not been written.
        An SME should cover, at minimum:</p>
        <ul class="outcomes" style="margin-bottom:0">
          ${(lesson.points.length ? lesson.points : c.outcomes.slice(0, 4))
            .map((pt) => `<li>${esc(pt)}</li>`).join('')}
        </ul>
        <p style="font-size:.8rem;color:var(--text-3);margin:14px 0 0">
          Add the lesson to <code>LESSON_OVERRIDES</code> in <code>js/lessons.js</code>, keyed
          <code>${esc(moduleId)}</code>.</p>
      </div>`;

  const points = lesson.points?.length
    ? `<div class="section-title"><h2>Key points</h2></div>
       <div class="card"><ul class="outcomes">${lesson.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul></div>`
    : '';

  const refs = (lesson.refs || c.standards).length
    ? `<div class="section-title"><h2>References</h2><small>Check these</small></div>
       <div class="card"><ul class="refs">${lesson.refs.map((r) => `<li>${esc(r)}</li>`).join('')}</ul></div>`
    : '';

  return `
    <span class="detail__code">${esc(c.code)} · Lesson ${idx + 1} of ${c.modules.length}</span>
    <h1>${esc(mod.title)}</h1>
    ${lesson.brief ? `<p class="detail__summary">${esc(lesson.brief)}</p>` : ''}
    <div class="lesson__meta">
      <span class="pill">${mod.minutes} min</span>
      ${done ? '<span class="pill pill--pass">Completed</span>' : ''}
    </div>
    ${draft}
    ${body}
    ${points}
    ${refs}

    <div class="btn-row">
      ${done
        ? `<button class="btn btn--ghost" data-uncomplete="${esc(moduleId)}">Mark not complete</button>`
        : `<button class="btn btn--primary btn--block" data-complete="${esc(moduleId)}">Mark lesson complete</button>`}
    </div>

    <div class="btn-row">
      ${prev ? `<button class="btn btn--ghost" data-go="lesson:${c.id}:${prev.id}">‹ ${esc(prev.title)}</button>` : ''}
      ${next ? `<button class="btn btn--ghost" data-go="lesson:${c.id}:${next.id}">${esc(next.title)} ›</button>`
             : `<button class="btn btn--primary" data-go="quiz:${c.id}">Take the assessment ›</button>`}
    </div>`;
}

function viewQuiz(id) {
  const c = findCourse(id);
  if (!c) return notFound('That course does not exist.');

  const qs = c.assessment.questions;
  return `
    <span class="detail__code">${esc(c.code)} · Assessment</span>
    <h1>${esc(c.title)}</h1>
    <p class="detail__summary">${qs.length} question${qs.length > 1 ? 's' : ''}.
    Pass mark ${c.assessment.pass}%. You can retake this as often as you need —
    your best score is what gets recorded.</p>

    ${c.review !== 'reviewed' ? `
      <div class="draft">
        <svg class="draft__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
          <path d="M12 4.5l8.5 15h-17z" stroke-linejoin="round"/><path d="M12 10v4.2" stroke-linecap="round"/><path d="M12 17.1v.05" stroke-linecap="round"/>
        </svg>
        <div>
          <strong>Assessment in draft</strong>
          <p>These questions have not been verified against the governing standard. Do not use
          this result as evidence of competence until an SME has signed it off.</p>
        </div>
      </div>` : ''}

    <div id="quizHost" data-course="${esc(c.id)}" data-pass="${c.assessment.pass}"></div>`;
}

function viewProgress() {
  const o = overallProgress(CURRICULUM);
  const name = getLearner() || '';
  const ready = contentReadiness();
  const pending = PENDING_REVIEW;

  const trackBars = Object.entries(TRACKS).map(([key, t]) => {
    const list = CURRICULUM.filter((c) => c.track === key);
    let d = 0, tt = 0;
    for (const c of list) { const p = courseProgress(c); d += p.done; tt += p.total; }
    const pct = tt ? Math.round((d / tt) * 100) : 0;
    return `<div class="bar-row">
      <span class="bar-row__label">${esc(t.name)}</span>
      <span class="bar-row__meter">${meter(pct, pct === 100)}</span>
      <span class="bar-row__val">${pct}%</span>
    </div>`;
  }).join('');

  const attempted = CURRICULUM.filter((c) => courseProgress(c).attempts > 0)
    .sort((a, b) => quizRecord(b.id).lastAt - quizRecord(a.id).lastAt);

  return `
    <h1>Your Progress</h1>

    <div class="card">
      <label for="learnerName" style="display:block;font-size:.74rem;letter-spacing:.1em;text-transform:uppercase;color:var(--text-3);font-weight:600;margin-bottom:7px">
        Learner name
      </label>
      <input class="search" id="learnerName" value="${esc(name)}" maxlength="80"
             placeholder="Your name" autocomplete="name" style="margin-bottom:0">
      <p style="font-size:.78rem;color:var(--text-3);margin:10px 0 0">
        Stored on this device only. No account, no server, no internet.
      </p>
    </div>

    <div class="stat-grid">
      <div class="stat"><b>${o.headline}%</b><small>Overall</small></div>
      <div class="stat"><b>${o.passedCourses}<small style="font-size:.8rem">/${o.courseTotal}</small></b><small>Passed</small></div>
      <div class="stat"><b>${o.doneModules}<small style="font-size:.8rem">/${o.totalModules}</small></b><small>Lessons</small></div>
      <div class="stat"><b>${Math.round(o.minutesDone / 60)}<small style="font-size:.8rem">h</small></b><small>Studied</small></div>
    </div>

    <div class="section-title"><h2>By track</h2></div>
    <div class="card">${trackBars}</div>

    ${attempted.length ? `
      <div class="section-title"><h2>Assessment history</h2><small>Most recent first</small></div>
      ${attempted.map((c) => {
        const q = quizRecord(c.id);
        const passed = q.best >= c.assessment.pass;
        const when = new Date(q.lastAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
        return `<button class="course" data-go="course:${c.id}" style="--track:${TRACKS[c.track].colour}">
          <div class="course__top">
            <span class="course__code">${esc(c.code)}</span>
            <span class="course__name">${esc(c.title)}</span>
          </div>
          <div class="course__meta">
            <span class="pill${passed ? ' pill--pass' : ''}">Best ${q.best}%</span>
            <span class="pill">${q.attempts} attempt${q.attempts > 1 ? 's' : ''}</span>
            <span class="pill">${esc(when)}</span>
          </div>
        </button>`;
      }).join('')}` : ''}

    <div class="section-title"><h2>Your record</h2><small>Portable</small></div>
    <div class="card">
      <p style="font-size:.87rem;color:var(--text-2)">
        Export your record as a single file. Carry it on a USB stick, hand it to your
        instructor, or import it on another device. Everything merges — nothing is lost.
      </p>
      <div class="btn-row">
        <button class="btn btn--primary" data-export>Export record</button>
        <button class="btn" data-import>Import record</button>
      </div>
      <input type="file" id="importFile" accept="application/json,.json" hidden>
    </div>

    <div class="section-title"><h2>Curriculum status</h2><small>Content readiness</small></div>
    <div class="card">
      <p style="font-size:.87rem;color:var(--text-2);margin-bottom:10px">
        ${ready.authored} of ${ready.total} lessons written ·
        ${CURRICULUM.length - pending.length} of ${CURRICULUM.length} courses SME approved.
      </p>
      ${meter(Math.round((ready.authored / ready.total) * 100))}
      <p style="font-size:.78rem;color:var(--text-3);margin:12px 0 0">
        Draft content is labelled as draft throughout the app and is never presented as
        approved procedure.
      </p>
    </div>

    <div class="btn-row">
      <button class="btn btn--danger btn--block" data-clear-all>Delete my record</button>
    </div>`;
}

function viewCoach() {
  return `
    <h1>Coach</h1>
    <div class="coach">
      <div class="coach__q">
        <h2 style="margin-bottom:6px">Ask the curriculum</h2>
        <p style="font-size:.86rem;color:var(--text-2);margin:0">
          Searches all 25 courses — outcomes, lessons and governing standards — and points you
          to what covers your question. Runs entirely on this device.
        </p>
      </div>

      <div class="coach__suggest">
        <button class="chip" data-suggest="foam">Foam</button>
        <button class="chip" data-suggest="SCBA">SCBA</button>
        <button class="chip" data-suggest="level determination">Level determination</button>
        <button class="chip" data-suggest="off-airport">Off-airport</button>
        <button class="chip" data-suggest="dangerous goods">Dangerous goods</button>
        <button class="chip" data-suggest="water supply">Water supply</button>
        <button class="chip" data-suggest="extrication">Extrication</button>
        <button class="chip" data-suggest="lithium">Lithium</button>
      </div>

      <textarea class="coach__input" id="coachInput" placeholder="e.g. What are the agent requirements for a higher level?"
                aria-label="Your question"></textarea>
      <button class="btn btn--primary btn--block" data-ask>Search the curriculum</button>
      <div id="coachOut" style="margin-top:16px"></div>

      <div class="coach__disclaimer">
        <strong>This is an offline index, not a language model.</strong> It can only find what is
        already written in the 25 courses — it will not reason, calculate or improvise, and it
        will never invent an answer. Most lessons are still drafts, so treat what it finds as
        study material. For operational decisions, use your controlled documents and SOPs.
      </div>
    </div>`;
}

function notFound(msg) {
  return `<div class="empty">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="8"/><path d="M12 8v5" stroke-linecap="round"/><path d="M12 16.2v.05" stroke-linecap="round"/></svg>
    <p>${esc(msg)}</p>
    <div class="btn-row"><button class="btn" data-tab-go="learn">Back to the catalogue</button></div>
  </div>`;
}

/* ── Coach search ────────────────────────────────────────────────────── */

/** The single seam where a real model would plug in later. */
function answerFromIndex(question) {
  const terms = question.toLowerCase().split(/[^a-z0-9]+/).filter((t) => t.length > 2);
  if (!terms.length) return [];

  const hits = [];
  for (const c of CURRICULUM) {
    const hay = [c.title, c.code, c.summary, ...c.outcomes, ...c.standards,
                 ...c.modules.map((m) => m.title)].join(' ').toLowerCase();
    let score = 0;
    const matched = [];
    for (const t of terms) {
      if (hay.includes(t)) { score += 1; matched.push(t); }
    }
    // A title hit is a much stronger signal than a passing standards mention.
    if (c.title.toLowerCase().includes(terms.join(' '))) score += 3;
    if (score) hits.push({ c, score, matched });
  }

  hits.sort((a, b) => b.score - a.score);
  return hits.slice(0, 4);
}

function renderCoachAnswer(q) {
  const hits = answerFromIndex(q);
  const out = document.getElementById('coachOut');

  if (!hits.length) {
    out.innerHTML = `<div class="why">Nothing in the catalogue covers “${esc(q)}”.
      This is a real gap, not a bug — worth raising with whoever owns the curriculum.</div>`;
    return;
  }

  out.innerHTML = `
    <p style="font-size:.8rem;color:var(--text-3);margin-bottom:12px">
      ${hits.length} course${hits.length > 1 ? 's' : ''} in the catalogue mention ${esc(q.trim())}.
    </p>
    ${hits.map(({ c, matched }) => {
      const p = courseProgress(c);
      const rel = c.outcomes.filter((o) => matched.some((m) => o.toLowerCase().includes(m)));
      return `<div class="card card--tight" style="margin-bottom:10px">
        <button class="course__top" data-go="course:${esc(c.id)}"
                style="background:none;border:0;padding:0;width:100%;cursor:pointer">
          <span class="course__code">${esc(c.code)}</span>
          <span class="course__name" style="color:var(--text)">${esc(c.title)}</span>
        </button>
        ${rel.length ? `<ul class="outcomes" style="margin:10px 0 0">
          ${rel.slice(0, 3).map((r) => `<li style="font-size:.83rem">${esc(r)}</li>`).join('')}
        </ul>` : `<p style="font-size:.82rem;color:var(--text-2);margin:9px 0 0">${esc(c.summary)}</p>`}
        <p style="font-size:.74rem;color:var(--text-3);margin:10px 0 0">
          ${p.done > 0 ? `${p.done}/${p.total} lessons done` : 'Not started'}
          ${c.review !== 'reviewed' ? ' · draft content' : ''}
        </p>
      </div>`;
    }).join('')}`;
}

/* ── Quiz engine ─────────────────────────────────────────────────────── */

/**
 * One question at a time. Immediate feedback with an explanation, because a
 * quiz that only reports a score teaches nothing on the questions you missed.
 */
function mountQuiz(host, course) {
  const qs = course.assessment.questions;
  const pass = Number(host.dataset.pass);
  let i = 0, correct = 0, answered = false;

  host.innerHTML = '';

  function step() {
    // Replace, never stack. Appending would leave every answered question
    // stacked above the current one.
    host.innerHTML = '';

    const q = qs[i];
    const wrap = document.createElement('div');
    wrap.innerHTML = `
      <p style="font-size:.74rem;letter-spacing:.14em;text-transform:uppercase;color:var(--text-3);font-weight:600;margin-bottom:10px">
        Question ${i + 1} of ${qs.length}
      </p>
      <div class="quiz__q">${esc(q.q)}</div>
      <div class="opts">
        ${q.options.map((o, n) => `
          <button class="opt" data-n="${n}">
            <span class="opt__key">${'ABCD'[n]}</span>
            <span>${esc(o)}</span>
          </button>`).join('')}
      </div>
      <div class="feedback"></div>
      <div class="btn-row"><button class="btn btn--primary btn--block hidden" data-next>
        ${i === qs.length - 1 ? 'See my result' : 'Next question'}
      </button></div>`;

    wrap.querySelector('.opts').addEventListener('click', (e) => {
      const btn = e.target.closest('.opt');
      if (!btn || answered) return;
      answered = true;

      const picked = Number(btn.dataset.n);
      const right = picked === q.answer;
      if (right) correct++;

      for (const o of wrap.querySelectorAll('.opt')) {
        const n = Number(o.dataset.n);
        o.disabled = true;
        if (n === q.answer) o.classList.add('is-right');
        else if (n === picked) o.classList.add('is-wrong');
      }

      const fb = wrap.querySelector('.feedback');
      fb.innerHTML = `
        <div class="why">
          <strong>${right ? 'Correct.' : 'Not quite.'}</strong>
          ${esc(q.why)}
          ${q.sme ? `<br><br><span style="font-size:.78rem;color:var(--warn)">
            <strong>Pending SME verification.</strong> This answer has not yet been checked
            against the governing standard.</span>` : ''}
        </div>`;

      wrap.querySelector('[data-next]').classList.remove('hidden');
      wrap.querySelector('[data-next]').focus();
    });

    wrap.querySelector('[data-next]').addEventListener('click', () => {
      i++;
      if (i < qs.length) { answered = false; step(); }
      else finish();
    });

    host.appendChild(wrap);
  }

  function finish() {
    const pct = Math.round((correct / qs.length) * 100);
    const passed = pct >= pass;
    const rec = recordQuizAttempt(course.id, pct);

    host.innerHTML = `
      <div class="score">
        <div class="score__big ${passed ? 'is-pass' : 'is-fail'}">${pct}%</div>
        <div class="score__label">${passed ? 'Passed' : `Pass mark ${pass}%`}</div>
        <p style="margin:16px 0 0;color:var(--text-2);font-size:.88rem">
          ${correct} of ${qs.length} correct · best score ${rec.best}%
          ${rec.attempts > 1 ? `· ${rec.attempts} attempts` : ''}
        </p>
        <div class="btn-row">
          <button class="btn" data-go="course:${course.id}">Back to course</button>
          <button class="btn btn--primary" data-mount-quiz>Retake</button>
        </div>
      </div>
      ${!passed ? `<div class="why" style="margin-top:12px">
        Not a failure — a signal. Work through the lessons again, particularly the ones you
        got wrong, then come back. Your best score is what gets recorded.
      </div>` : ''}`;

    const p = courseProgress(course);
    if (p.complete && !host.querySelector('.course-complete-note')) {
      host.insertAdjacentHTML('beforeend', `
        <div class="pill pill--pass" style="display:block;text-align:center;padding:11px;margin-top:12px">
          Course complete — ${course.modules.length} lessons and the assessment.
        </div>`);
    }
    host.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  step();
}

/* ── Router ──────────────────────────────────────────────────────────── */

const TABS = ['home', 'learn', 'progress', 'coach'];
let currentTab = 'home';
let currentRoute = null;   // null, not '' — an empty hash is a real route and must
                          // still render on first load.

function parseHash() {
  const raw = location.hash.replace(/^#\/?/, '');
  // Colons are accepted as separators as well as slashes. Links inside the app
  // are authored kind:id, and older bookmarks and hand-typed URLs may still
  // carry that form, so normalise both rather than landing on "Page not found".
  const parts = raw.replace(/:/g, '/').split('/').filter(Boolean);
  return { parts, tab: parts[0] || 'home' };
}

function render() {
  const { parts, tab } = parseHash();
  const key = parts.join('/');
  if (key === currentRoute) return;
  currentRoute = key;

  const sub = appbarSub;
  navBack.hidden = parts.length <= 1;

  if (tab === 'home')            { view.innerHTML = viewHome(); sub.textContent = 'Aviation & ARFF Training'; }
  else if (tab === 'learn')      { view.innerHTML = viewLearn(); sub.textContent = 'Course catalogue'; wireLearnFilters(); }
  else if (tab === 'progress')   { view.innerHTML = viewProgress(); sub.textContent = 'Progress & record'; }
  else if (tab === 'videos')     { view.innerHTML = videoLibrarySection(); sub.textContent = 'Video library'; }
  else if (tab === 'standards') { view.innerHTML = standardsSection(); sub.textContent = 'South African regulatory basis'; }
  else if (tab === 'coach')      { view.innerHTML = viewCoach(); sub.textContent = 'Offline curriculum search'; }
  else if (tab === 'course')     { view.innerHTML = viewCourse(parts[1]); sub.textContent = 'Course'; }
  else if (tab === 'lesson')     { view.innerHTML = viewLesson(parts[1], parts[2]); sub.textContent = 'Lesson'; }
  else if (tab === 'quiz') {
    const c = findCourse(parts[1]);
    view.innerHTML = c ? viewQuiz(parts[1]) : notFound('That course does not exist.');
    sub.textContent = 'Assessment';
    if (c) mountQuiz(document.getElementById('quizHost'), c);
  }
  else { view.innerHTML = notFound('Page not found.'); sub.textContent = 'Not found'; }

  syncTabs(TABS.includes(tab) ? tab : 'home');
  view.scrollTop = 0;
  window.scrollTo(0, 0);
  view.focus({ preventScroll: true });
}

function syncTabs(active) {
  currentTab = active;
  for (const b of document.querySelectorAll('.tab')) {
    b.classList.toggle('is-active', b.dataset.tab === active);
  }
}

function wireLearnFilters() {
  const search = document.getElementById('courseSearch');
  const results = document.getElementById('courseResults');
  const groups = coursesByTrack();
  let track = 'all';

  const apply = () => { results.innerHTML = allCourses(groups, track, search.value); };

  for (const chip of document.querySelectorAll('[data-track-filter]')) {
    chip.addEventListener('click', () => {
      track = chip.dataset.trackFilter;
      for (const c of document.querySelectorAll('[data-track-filter]')) c.classList.toggle('is-on', c === chip);
      apply();
    });
  }
  search.addEventListener('input', apply);
}

/* ── Events ──────────────────────────────────────────────────────────── */

document.getElementById('navBack').addEventListener('click', () => history.back());

for (const btn of document.querySelectorAll('.tab')) {
  btn.addEventListener('click', () => { location.hash = `#/${btn.dataset.tab}`; });
}

view.addEventListener('click', async (e) => {
  /* Video facade: swap the card for a real player only on request, and refuse
     honestly when there is no network rather than showing a broken frame. */
  const play = e.target.closest('[data-play-video]');
  if (play) {
    const fig = play.closest('.video');
    const v = videoFor(play.dataset.playVideo);
    if (!v || !fig) return;

    if (!navigator.onLine) {
      const note = document.createElement('p');
      note.className = 'video__offline';
      note.textContent = 'No connection — this video cannot play. The lesson text and any diagrams above cover the same ground and work offline.';
      fig.querySelector('.video__facade').replaceWith(note);
      return;
    }

    const frame = document.createElement('div');
    frame.className = 'video__frame';
    frame.innerHTML = `<iframe src="${videoEmbedUrl(v)}" title="${esc(v.title)}"
      allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowfullscreen
      referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
    play.replaceWith(frame);
    return;
  }

  const go = e.target.closest('[data-go]');
  if (go) {
    // data-go is authored as kind:id[:sub] because it reads better inline,
    // but the hash router is path-based. Translate the separators here so a
    // link can never land on the bare "Page not found" state. Both forms are
    // accepted, so hand-written markup is safe too.
    location.hash = '#/' + String(go.dataset.go).replace(/:/g, '/');
    return;
  }

  const tabGo = e.target.closest('[data-tab-go]');
  if (tabGo) { location.hash = `#/${tabGo.dataset.tabGo}`; return; }

  const mount = e.target.closest('[data-mount-quiz]');
  if (mount) {
    const c = findCourse(parseHash().parts[1]);
    if (c) mountQuiz(document.getElementById('quizHost'), c);
    return;
  }

  const complete = e.target.closest('[data-complete]');
  if (complete) {
    completeModule(complete.dataset.complete);
    say('Lesson complete.', 'ok');
    render();
    setTimeout(() => say(null), 1600);
    return;
  }

  const uncomplete = e.target.closest('[data-uncomplete]');
  if (uncomplete) { uncompleteModule(uncomplete.dataset.uncomplete); render(); return; }

  const reset = e.target.closest('[data-reset-course]');
  if (reset) {
    const c = findCourse(reset.dataset.resetCourse);
    if (c && confirm(`Reset all lesson progress for “${c.title}”?\n\nYour assessment best score is kept.`)) {
      resetCourse(c.id, c.modules.map((m) => m.id));
      render();
    }
    return;
  }

  if (e.target.closest('[data-export]')) { exportRecord(); return; }

  if (e.target.closest('[data-import]')) {
    document.getElementById('importFile')?.click();
    return;
  }

  if (e.target.closest('[data-clear-all]')) {
    if (confirm('Delete your entire training record from this device?\n\nThis cannot be undone. Export first if you want to keep it.')) {
      clearAll();
      render();
    }
    return;
  }

  const suggest = e.target.closest('[data-suggest]');
  if (suggest) {
    const input = document.getElementById('coachInput');
    input.value = suggest.dataset.suggest;
    renderCoachAnswer(input.value);
    input.focus();
    return;
  }

  if (e.target.closest('[data-ask]')) {
    const input = document.getElementById('coachInput');
    if (!input.value.trim()) { input.focus(); return; }
    renderCoachAnswer(input.value);
    return;
  }
});

/* Learner name + import file live outside the click flow above. */
view.addEventListener('change', (e) => {
  if (e.target.id === 'learnerName') setLearner(e.target.value);

  if (e.target.id === 'importFile') {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        importRecord(String(reader.result));
        say('Record imported and merged.', 'ok');
        render();
      } catch (err) {
        say(err.message || 'Could not import that file.', 'fail');
      }
    };
    reader.onerror = () => say('Could not read that file.', 'fail');
    reader.readAsText(file);
  }
});

window.addEventListener('hashchange', render);

/* Re-render when progress changes anywhere, so the header/ring stay true. */
subscribe(() => {
  // Avoid a re-render mid-quiz, which would wipe the in-progress answers.
  if (parseHash().parts[0] === 'quiz') return;
});

/* ── Boot ────────────────────────────────────────────────────────────── */

render();

/* Service worker: only meaningful over http(s), so a file:// run is unaffected.
   Also skipped on localhost, because a stale-while-revalidate worker will
   happily serve a stale app.js to the person developing it — the classic
   "my fix did nothing" trap. Production hosts still get full offline. */
const isLocalDev = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);

if ('serviceWorker' in navigator && location.protocol.startsWith('http') && !isLocalDev) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {
      /* Offline caching unavailable — the app still runs, just online-only. */
    });
  });
}
