/* =========================================================================
   AM RISK AND TRAINING — Aviation & ARFF Training Platform
   LESSON CONTENT
   -------------------------------------------------------------------------
   HOW CONTENT ENTERS THIS PLATFORM

   Every module in js/curriculum.js needs body content. Rather than shipping
   invented safety-critical text, this file does two things:

     1. LESSON_OVERRIDES — hand-written lessons. Anything in here is real
        content and will be rendered in full. ADD YOUR OWN HERE.

     2. buildScaffold() — for any module without an override, generates a
        structured lesson stub from the course metadata: the standard that
        governs it, what it must cover, and a clearly visible "awaiting SME"
        state. Nothing in a stub is ever presented as fact.

   TO WRITE A NEW LESSON
   ---------------------
   Add an entry keyed by the module id:

     'art07-m2': {
       title: 'Donning, doffing and buddy checks',
       brief: 'One short paragraph saying what this lesson is for.',
       points: [
         'A specific point the responder must be able to do or know.',
         'Another — each should be checkable against the cited standard.'
       ],
       body: `<p>Optional longer prose. Plain HTML only.</p>
              <p>Use <code>, <strong>, <ul>, <ol>, <table> — no scripts.</p>`,
       refs: ['NFPA 6001 §5', 'Manufacturer instructions, section 4'],
       smeChecked: false      // flip to true only after a qualified reviewer signs off
     }

   THE `smeChecked` FLAG
   ---------------------
   Anything with `smeChecked: false` renders a visible DRAFT banner in the
   lesson view. That is deliberate. It stops unreviewed text from ever looking
   like approved SOP, which matters more here than in most software.
   ========================================================================= */

const LESSON_OVERRIDES = {

  /* ─────────────────────────────────────────────────────────────────────
     ART-01 is written out in full as the worked example and the house
     style. It is deliberately low on normative specifics — it teaches the
     framework, not the numbers. The numbers are course 02 and 03.
     ───────────────────────────────────────────────────────────────────── */
  'art01-m1': {
    title: 'What the service is for',
    brief:
      'Before the standards, the job. Rescue and fire fighting exists to save lives, ' +
      'and everything else about the service is judged against that.',
    points: [
      'The service exists to rescue occupants and fight fire — and the two pull against each other under pressure.',
      'A rescue and fire fighting service is an aerodrome service, not an airline function. The aerodrome provides it.',
      'It is a preventive service too. Most of its value is delivered before anything burns.',
      'Readiness is the product. The response is just the moment readiness gets tested.'
    ],
    body: `
      <h3>The two jobs that pull against each other</h3>
      <p>Every incident puts two objectives in front of you at once: <strong>rescue</strong>
      the occupants, and <strong>suppress</strong> the fire. They compete for the same
      water, the same crew and the same minutes. Neither is optional. Which one leads is a
      decision, and the decision has to be made explicitly rather than inherited from
      whoever moved first.</p>

      <h3>A service, not a department</h3>
      <p>In the ICAO framework this is an <em>aerodrome</em> service. The aerodrome operator
      is accountable for providing it to the level the aircraft using the aerodrome
      require. That accountability sits above the airline, above the fire service and,
      on most aerodromes, above the airport manager — it is a regulatory obligation on
      the aerodrome itself.</p>

      <h3>Preventive, reactive, and the gap between them</h3>
      <p>Most of what makes a service good happens when nothing is happening:
      inspection, currency, drills, pre-incident planning, equipment that is actually
      ready. A response is the visible part, and it is the smaller part of the work.</p>

      <blockquote>
        <p>Readiness is the product. The response is the moment it gets audited.</p>
      </blockquote>
    `,
    refs: [
      'ICAO Annex 14 Vol I — Ch 9, general provisions',
      'ICAO Doc 9137 Part 1 — purpose and scope'
    ],
    smeChecked: false
  },

  'art01-m2': {
    title: 'The document hierarchy',
    brief:
      'Five kinds of document, ranked. Most workplace disputes in this industry are ' +
      'really hierarchy disputes wearing a disguise.',
    points: [
      'The Annex is the standard. It is written in standards language and it is not negotiable.',
      'The Guidance material explains the Annex. It helps you apply it; it cannot add to or subtract from it.',
      'The State adds requirements through its own regulations and Civil Aviation Authority guidance.',
      'The operator SOP may be more demanding than the Annex — never less.',
      'Your own judgement sits below all of it, and it matters most when the documents are silent.'
    ],
    body: `
      <h3>Rank order</h3>
      <ol>
        <li><strong>The Annex</strong> — ICAO Annex 14 Volume I, Chapter 9. The standard.</li>
        <li><strong>Guidance material</strong> — Doc 9137 Part 1. Explains intent and method.</li>
        <li><strong>State requirements</strong> — regulations, rules and CAA guidance in your jurisdiction.</li>
        <li><strong>Operator and aerodrome SOPs</strong> — how you will actually do it here.</li>
        <li><strong>Your judgement</strong> — what to do when the documents do not cover it.</li>
      </ol>

      <p>The FAA's own ARFF training series walks this hierarchy explicitly — Annex 14,
      the advisory circulars that explain it, and Part 139 as the rule behind them. That
      is the same structure every State works to, expressed in US regulation.</p>

      {{video:faa-intro-1}}

      <h3>The rule that settles most arguments</h3>
      <p>No SOP may be <em>less</em> demanding than the Annex or the State requirement. It may
      be more demanding — a higher standard is always permitted. If you find an SOP that is
      less demanding than the standard above it, that is a finding, and it should be raised
      through your safety reporting system rather than quietly followed or quietly ignored.</p>

      <blockquote>
        <p>Both "just follow the SOP" and "the SOP is wrong so I did it my way" are failures.
        The correct move is to report it and keep operating to the higher standard.</p>
      </blockquote>

      <h3>Nothing above you covers everything</h3>
      <p>Documents are written for the common case. The fifth item on the list is not a
      gap in the hierarchy — it is where a trained professional earns the qualification.
      The gap between "the plan does not cover this" and "nobody thought about this" is
      exactly where incidents live.</p>
    `,
    refs: [
      'ICAO Annex 14 Vol I — Ch 9',
      'ICAO Doc 9137 Part 1 — introduction and scope'
    ],
    smeChecked: false
  },

  'art01-m3': {
    title: 'Annex 14 Chapter 9, clause by clause',
    brief:
      'A structural tour. You are not expected to memorise clause numbers — you are ' +
      'expected to know where to look in under a minute.',
    points: [
      'The chapter moves from provision of the service, through level and equipment, to operational requirements and personnel.',
      'Level requirements, vehicle and agent provisions, operational requirements and personnel provisions are four separate things.',
      'Response time requirements are operational, not equipment, provisions.',
      'Know which part of the chapter answers a given question before you need to answer it.'
    ],
    body: `
      <h3>How the chapter is organised</h3>
      <p>Chapter 9 proceeds roughly as follows, and the order is deliberate:</p>
      <ol>
        <li><strong>Purpose and scope</strong> — who the requirements bind.</li>
        <li><strong>Level of service</strong> — how the required level is determined, and the conditions attaching to it.</li>
        <li><strong>Provision at the required level</strong> — agents, quantities, discharge rates, vehicles and equipment.</li>
        <li><strong>Operational requirements</strong> — response, communications, alerting, and the conditions under which the service stands down.</li>
        <li><strong>Personnel, training and exercises</strong> — who is qualified, and what currency is required.</li>
      </ol>

      <h3>Why the structure matters on a night shift</h3>
      <p>When the question is "are we allowed to stop pouring yet", that is an
      <em>operational</em> question, and the answer is not in the equipment tables. When
      the question is "do we have enough", that is level and provision. Half of the
      avoidable friction in a real incident comes from looking in the wrong half.</p>

      <p>The opening section of the FAA training series sets out this same structure
      against the US regulatory equivalent. Useful as an overview even though the
      citations will not match your State.</p>

      {{video:faa-intro-prelude}}

      <blockquote>
        <p><strong>SME action:</strong> this lesson deliberately carries no clause numbers or
        figures, because a half-remembered clause reference is worse than none. Add the
        exact clause structure for your edition of the Annex once checked against your
        controlled copy.</p>
      </blockquote>
    `,
    refs: ['ICAO Annex 14 Vol I — Ch 9 (use your controlled copy for exact clauses)'],
    smeChecked: false
  },

  'art01-m4': {
    title: 'Your role and accountability',
    brief: 'Where you sit in the chain, and what you personally owe.',
    points: [
      'Know your station, your role and who commands you.',
      'Accountability is personal. "The service should have" is not a defence.',
      'Know your own currency at all times, without having to look it up.',
      'Know who to escalate to and how, before you need it.'
    ],
    body: `
      <h3>The chain</h3>
      <p>Every service has a line: a station or crew, a watch or shift supervisor, an
      aerodrome duty manager, and the aerodrome operator. Know every link by name and
      find out where your own service sits in it. Most responders can describe the
      firefighting and cannot describe the command line.</p>

      <p>The airport emergency communications section of the FAA series below covers how
      alerting and notification actually work on a real aerodrome — the part that is
      almost never practised until it is needed.</p>

      {{video:faa-intro-5}}

      <h3>Personal accountability</h3>
      <p>Individual responders are usually personally accountable for their own readiness
      — their training currency, their equipment checks, their fitness, and their actions
      on an incident. Shift-level or organisational accountability rarely protects an
      individual who made an individual error.</p>

      {{video:faa-intro-4}}

      <h3>Scene safety comes before the fire</h3>
      <p>Before anything else: who is hurt, what is falling, what is about to happen. An
      injured second responder turns one incident into two, and the second one is
      entirely self-inflicted. The personnel-safety material in the FAA series below is
      worth watching before you are standing at an aircraft with an engine running.</p>

      <blockquote>
        <p><strong>SME action:</strong> add your service's actual reporting line, role
        titles and escalation numbers here.</p>
      </blockquote>
    `,
    refs: ['Your aerodrome emergency plan — organisation and call-out sections'],
    smeChecked: false
  },

  'art01-m5': {
    title: 'Finding the answer',
    brief: 'Method, so that a question under pressure does not become a guess.',
    points: [
      'Decide whether the question is a standard question or a judgement question first.',
      'For standard questions, go to the hierarchy top-down and cite what you used.',
      'For judgement questions, say what you are assuming and state the decision out loud.',
      'If the answer is not in the documents, that is a finding worth reporting.'
    ],
    body: `
      <h3>Two kinds of question</h3>
      <p>Almost every question you will be asked splits cleanly into two. Sorting them
      first saves most of the time:</p>
      <ul>
        <li><strong>"What does the standard require?"</strong> — There is a right answer and
        it is written down. Find it, cite it, act.</li>
        <li><strong>"What should we do here?"</strong> — There may be no written answer.
        Decide, state your assumptions, state the decision, and be able to justify it.</li>
      </ul>

      <h3>When the documents are silent</h3>
      <p>Silence is not permission and it is not prohibition. It means the decision is
      yours. Make it explicitly, write down what you assumed, and report it afterwards so
      the next responder inherits a better document. That last step is the one people skip,
      and it is the step that turns a responder into a service that improves.</p>

      <h3>Coming up in this series</h3>
      <p>The FAA series closes with an overview of the whole response picture — airport
      familiarization, aircraft familiarization, equipment, agents, evacuation and
      operations, in sequence. Worth watching once end to end before you work through the
      individual topics, because it is the only place they are joined up.</p>

      {{video:faa-intro-11}}
    `,
    refs: ['ICAO Annex 19 — Safety Management, hazard identification and reporting'],
    smeChecked: false
  }

};

/**
 * Build the lesson object for any module.
 * Prefers a hand-written override; otherwise returns an honest scaffold.
 */
function buildLesson(moduleId) {
  if (LESSON_OVERRIDES[moduleId]) return { ...LESSON_OVERRIDES[moduleId], isStub: false };

  // Locate the owning course so the scaffold can be specific about which
  // standard governs the module, rather than generic.
  let owner = null;
  let mod = null;
  for (const c of CURRICULUM) {
    const found = c.modules.find((m) => m.id === moduleId);
    if (found) { owner = c; mod = found; break; }
  }
  if (!mod) return null;

  return {
    title: mod.title,
    brief: '',
    points: [],
    body: '',
    refs: owner.standards,
    isStub: true,
    courseCode: owner.code,
    courseTitle: owner.title,
    review: owner.review
  };
}

/** Which courses have at least one hand-written lesson. Used by the progress view. */
function authoredLessonCount() {
  return Object.keys(LESSON_OVERRIDES).length;
}

/** Total authored lessons against total modules, for the content-readiness meter. */
function contentReadiness() {
  const total = CURRICULUM.reduce((n, c) => n + c.modules.length, 0);
  return { authored: Object.keys(LESSON_OVERRIDES).length, total };
}
