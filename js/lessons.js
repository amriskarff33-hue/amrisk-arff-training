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
  },

  /* ─────────────────────────────────────────────────────────────────────
     ART-09 — Emergency Command.
     Grounded in ICAO Doc 9137 Part 1, Chapter 12. Clause references are to
     Part 1 so they can be checked in the controlled copy. The structure and
     the reasoning are guidance; the numbers, ratios and local role titles
     are deliberately left to the aerodrome's own emergency plan and to an
     SME. Nothing here states a required complement.
     ───────────────────────────────────────────────────────────────────── */
  'art09-m1': {
    title: 'Command structures and when each applies',
    brief:
      'A crew complement is not just a number of bodies. Some of those posts exist ' +
      'specifically to command, and a crew with no one in them has no plan.',
    points: [
      'Doc 9137 lists "instigate incident command structure" as a duty, not an optional extra.',
      'Supervisory posts sit above firefighter posts in the crew complement. Know which post you hold.',
      'Command is established, never assumed. If nobody has said who is in charge, nobody is.',
      'Relief of the commander must be said out loud and acknowledged.',
      'The first person on scene commands until properly relieved — that is a duty, not a courtesy.'
    ],
    body: `
      <h3>Command is a post, not a personality</h3>
      <p>Read the crew complement tables in Doc 9137 Part 1 with care. They do not
      only list firefighters. At higher levels the guidance describes a supervisory
      tier above the firefighter positions — a watch commander and crew commanders
      drawn from the same complement. Those posts exist because the work is being
      coordinated, not merely done.</p>
      <p>Instigating the incident command structure appears in the guidance as a
      duty in its own right, listed alongside positioning appliances, using agents
      and assisting evacuation. It is not something that happens after the real
      work starts.</p>

      <h3>Three levels, and they are not interchangeable</h3>
      <ul>
        <li><strong>Watch commander</strong> — accountability for the service as it
        stands on this shift. Holds the readiness decision before an incident exists.</li>
        <li><strong>Crew commander</strong> — commands a defined crew, or a defined
        part of the scene. The person who decides where your vehicle stops and what
        your crew does on arrival.</li>
        <li><strong>Firefighter</strong> — owns a task, an appliance and the safety
        of the people doing it.</li>
      </ul>
      <p>Every one of those is a job you can be handed without warning. The crews
      that perform well are the ones where people have rehearsed taking a command
      post they do not normally hold.</p>

      <h3>Establishing and handing over command</h3>
      <p>Command has to be stated. The failure mode is not a bad commander — it is
      two people each assuming the other has it, on a scene where nobody can see
      the whole picture. State it, confirm it, and when command transfers, say who
      is taking over and get an acknowledgement back.</p>
      <p>Whoever arrives first is the commander until relieved. That is a duty, and
      discharging it well is what earns you the post next time.</p>

      <blockquote>
        <p><strong>SME action:</strong> insert your aerodrome's actual establishment —
        post titles, who holds them on each shift, and the relief arrangements.
        The framework above is international; the establishment is yours.</p>
      </blockquote>
    `,
    refs: [
      'ICAO Doc 9137 Part 1 — Chapter 12; crew complement tables in the level and equipment provisions',
      'Your aerodrome emergency plan — organisation and establishment'
    ],
    smeChecked: false
  },

  'art09-m2': {
    title: 'Size-up and the first transmission',
    brief:
      'The most important three questions in rescue and fire fighting, and the ' +
      'communication that answers them.',
    points: [
      'Size-up starts when the alert tone sounds, not when you arrive.',
      'What is happening, what is about to happen, what needs to be done.',
      'Establish direct contact between the pilot and the on-scene commander early.',
      'Air crew visibility is restricted — you are their eyes outside the aircraft.',
      'Size-up is a loop. Reassess it as the picture changes.'
    ],
    body: `
      <h3>It starts at the alert tone</h3>
      <p>Doc 9137 is explicit that tactical decision-making begins the moment the
      alert is sounded, and continues both en route and during the approach to the
      scene. You are not permitted to arrive with an empty head and start thinking
      then. The aircraft type, the alert, the wind and the runway in use are all
      known while you are still on the road.</p>

      <h3>The three questions</h3>
      <p>The guidance defines size-up in three parts. Learn them as three questions,
      because they map exactly onto what you transmit:</p>
      <ol>
        <li><strong>What is happening?</strong> — the visible, present state.</li>
        <li><strong>What is about to happen?</strong> — the trend. This is the one
        people skip and the one that saves lives.</li>
        <li><strong>What needs to be done?</strong> — the decision that follows from
        the first two.</li>
      </ol>
      <p>A size-up that answers only the first is not a size-up. It is a
      description.</p>

      {{diagram:vehicle-positioning}}

      <h3>The first transmission</h3>
      <p>Doc 9137 requires that personnel take immediate steps to establish direct
      contact between the pilot and the on-scene commander, so that all factors are
      properly considered before actions are initiated. Not a radio check afterwards.
      Before the first agent goes on the aircraft.</p>
      <p>The guidance is specific about what makes that possible: an aerodrome SOP
      for emergency communications, defined lines of communication, specified
      frequencies, and enough channels to carry both the command and the support
      functions. The incident commander should be able to reach other agencies on
      separate frequencies.</p>

      <h3>You are the pilot's eyes</h3>
      <p>Air crew have restricted visibility and are relying on you for the external
      picture. The guidance makes it the RFF crew's duty to make an immediate
      appraisal of the external portion of the aircraft and report unusual
      conditions. That is a task, with a timing, and it belongs to a named person.</p>

      <h3>Radio discipline</h3>
      <p>Clear, concise and understandable, at all levels. Every unnecessary
      transmission is a second someone is not listening to the transmission that
      matters. Course 18 covers this in full.</p>

      <blockquote>
        <p><strong>SME action:</strong> confirm your aerodrome's call signs, channel
        plan and the primary means of contact with the flight deck, including
        whether intercom facilities are available on the types you handle.</p>
      </blockquote>
    `,
    refs: [
      'ICAO Doc 9137 Part 1 — Chapter 12, size-up and the emergency communications provisions',
      'Your aerodrome emergency plan — communications'
    ],
    smeChecked: false
  },

  'art09-m3': {
    title: 'Unified command',
    brief:
      'Most incidents outgrow the fire service quickly. The hard part is deciding ' +
      'who decides what.',
    points: [
      'The pilot-in-command makes the final determination on evacuation, with input from the RFF commander.',
      'If the air crew cannot function, RFF initiates the necessary action.',
      'The commander needs a separate channel to other agencies, not a shared one.',
      'Unified command is not the same as a committee. Someone must still decide.',
      'Mutual aid arrangements settle the division of labour before the day you need them.'
    ],
    body: `
      <h3>Who actually decides</h3>
      <p>This is the single most misunderstood area of command at an aircraft
      incident. Doc 9137 is clear: the final determination regarding evacuation from
      the aircraft is made by the pilot-in-command, with input from the RFF incident
      commander.</p>
      <p>Read that carefully in both directions. The pilot decides, so the
      commander's job is to make the input worth having — a clear external
      appraisal, an honest statement of what the crew can reach and in what time.
      Silence from RFF is not neutrality; it removes information the pilot is entitled
      to and is relying on.</p>

      <h3>The failover</h3>
      <p>The guidance also provides for the case where the air crew are unable to
      function. In that event, RFF personnel are responsible for initiating the
      necessary action. Protection of the operation is the primary responsibility of
      the RFF service throughout.</p>
      <p>That is a significant transfer of responsibility, and it is exactly the
      kind of thing that goes wrong when nobody has said out loud that it has
      happened. Practise stating it.</p>

      <h3>Unified is not the same as shared</h3>
      <p>Once police, medical, security, the operator and mutual aid are on scene,
      you have several competent authorities with different statutory duties. Unified
      command reconciles them; it does not dissolve them. Somebody still has to say
      "we are withdrawing" at a specific moment, and that person is not a committee.</p>
      <p>Doc 9137 requires that the incident commander can communicate with other
      agencies on separate frequencies. Keep them separate. Inter-agency radio is for
      coordination, not for your own internal traffic.</p>

      <h3>Settle it before the incident</h3>
      <p>Who commands, who advises, who is told — and on what trigger authority
      passes between services. Doc 9137 points to those in charge determining matters
      in accordance with previous mutual aid arrangements. The operative word is
      <em>previous</em>. Anything being decided for the first time during an incident
      is being decided too late.</p>

      <blockquote>
        <p><strong>SME action:</strong> insert your mutual aid agreements and the
        point at which authority transfers between services. Confirm the local
        position on evacuation authority, since this lesson follows ICAO and your
        State requirements may differ.</p>
      </blockquote>
    `,
    refs: [
      'ICAO Doc 9137 Part 1 — Chapter 12, evacuation determination and inter-agency coordination',
      'Your mutual aid agreements',
      'Your aerodrome emergency plan — command and liaison'
    ],
    smeChecked: false
  },

  'art09-m4': {
    title: 'Working the emergency plan',
    brief:
      'The plan exists so that decisions arrive pre-made. Your job is to notice ' +
      'when the plan is the wrong plan.',
    points: [
      'A documented tactical plan for positioning, known to every responder, is expected — not optional.',
      'The first vehicle on scene establishes the route for everyone behind it.',
      'Follow the plan until the picture contradicts it, then say so.',
      'Positioning must preserve egress, a way out for reflash, and turret coverage.',
      'An undocumented plan is not a plan.'
    ],
    body: `
      <h3>The plan should already exist</h3>
      <p>Doc 9137 expects a tactical plan for positioning RFF vehicles for the
      various aircraft types applicable to that aerodrome to be documented, known to
      RFF personnel, and practised as part of an ongoing training programme. Three
      separate obligations: written, known, practised. Most services satisfy the
      first and quietly fail the third.</p>

      <h3>The first vehicle constrains everyone</h3>
      <p>The guidance makes a point that is easy to miss: RFF apparatus often
      respond in single file, so the first fire appliance to reach the accident site
      <em>establishes the route</em> for the vehicles behind it, and may dictate the
      approach into their ultimate positions.</p>
      <p>Which means the single most consequential positioning decision on the scene
      is made by whoever gets there first, usually at the least informed moment of
      the whole incident. This is why the plan has to be automatic, and why the first
      crew departs from it only for a reason they can state out loud.</p>

      <h3>The positioning priorities</h3>
      <ul>
        <li>Approach with extreme caution — watch for evacuating occupants,
        wreckage, fuel ponding. Do not drive through smoke that obscures your vision
        and theirs. Do not drive over wreckage.</li>
        <li>Go uphill and upwind. Fuel and vapours gather in low-lying areas.</li>
        <li>Do not block the entry or exit areas other emergency vehicles need.</li>
        <li>Protect the egress routes of evacuating occupants first.</li>
        <li>Stay repositionable, in case of reflash.</li>
        <li>Cover as much of the fuselage as the turrets allow.</li>
        <li>Preserve the accident site.</li>
      </ul>

      <h3>When the plan is the wrong plan</h3>
      <p>Following the plan is the default. Deviating is a decision, and it needs the
      same discipline as any other: know what changed, state it, tell the commander,
      record it. The dangerous version is silent drift — the crew that improvised and
      never said so, and the commander making the next decision on a picture nobody
      told them about.</p>

      <blockquote>
        <p><strong>SME action:</strong> attach your own positioning plan per aircraft
        type, and confirm it is drawn from your aerodrome's actual layout, taxiways,
        hardstanding and water points. Also confirm the local position on preserving
        the accident site, which carries investigation and liability consequences.</p>
      </blockquote>
    `,
    refs: [
      'ICAO Doc 9137 Part 1 — Chapter 12, positioning and tactical planning',
      'Your aerodrome emergency plan — preplanned tactics',
      'Course ART-19 — emergency planning and the full-scale exercise'
    ],
    smeChecked: false
  },

  'art09-m5': {
    title: 'Stand-down decisions',
    brief:
      'The decision to stop is the most consequential decision of the incident, ' +
      'and the one most often made by default.',
    points: [
      'Stand-down is a command decision. A crew cannot decide it alone.',
      'Reflash is why vehicles stay repositionable rather than parked.',
      'The commander must be satisfied the fuel and fire risk has actually ended.',
      'Preserving the accident site survives the incident.',
      'The report is part of the job, not an afterthought.'
    ],
    body: `
      <h3>Who decides</h3>
      <p>Nobody individual stops pouring. Stand-down is a command decision, made by
      the incident commander, on advice. If you cannot name the person who will make
      that call on your aerodrome, that is a gap worth closing now.</p>

      <h3>Reflash is the reason for the positioning discipline</h3>
      <p>The positioning guidance says vehicles should ideally be positioned so they
      can be repositioned in the event of reflash. That instruction is a forecast.
      Anyone who has stood at a burnt aircraft at 03:00 knows that "we thought it was
      out" is a sentence people say afterwards.</p>
      <p>Reflash risk is not a general worry — it is a function of fuel state, foam
      application, whether the fuel is in the cells or the tank, and how long the
      aircraft sat before anything was applied. Know the specifics for the type in
      front of you.</p>

      <h3>What "finished" actually requires</h3>
      <ul>
        <li>The fire is out, not merely suppressed — and the crew can see it is out.</li>
        <li>Hot spots and concealed spaces have been checked, with the doors and
        panels that need opening already open.</li>
        <li>The fuel condition is known and no longer changing.</li>
        <li>A watch is set before everyone stands down.</li>
        <li>The accident site has been preserved.</li>
      </ul>
      <p>Every one of those is a judgement. None of them should be made by the person
      who is tired and wants to go home, alone, without saying it out loud.</p>

      <h3>Afterwards</h3>
      <p>Preserving the accident site is listed as a consideration in the guidance,
      and it outlives the incident — wreckage, loose articles and fluid evidence all
      have consequences afterwards. So does the report. An incident that produced no
      written record of what was decided, and why, will produce the same decision
      again next time.</p>

      <blockquote>
        <p><strong>SME action:</strong> define your stand-down criteria and the
        re-attack triggers in writing, name who holds the decision, and confirm your
        fuel-state and reflash guidance per aircraft type. Also record your accident
        site preservation procedure and who is notified.</p>
      </blockquote>

      {{video:faa-tact-1}}
    `,
    refs: [
      'ICAO Doc 9137 Part 1 — Chapter 12, reflash, withdrawal and accident site preservation',
      'Your aerodrome emergency plan — stand-down and re-attack',
      'Course ART-16 — tactics, withdrawal and re-attack'
    ],
    smeChecked: false
  },

  /* ─────────────────────────────────────────────────────────────────────
     ART-03 m3 — the calculation lesson. Every number below is taken from
     Doc 9137 Part 1 and is cited to its clause. The 777-300ER worked
     example reproduces the Table 2-4 category 9 row exactly when run with
     that row's own dimensions, which is how you can prove the chain is
     right rather than trusting it.
     ───────────────────────────────────────────────────────────────────── */
  'art03-m3': {
    title: 'Discharge rate, duration and the maths',
    brief:
      'Where every water figure in ARFF comes from, worked end to end on a ' +
      '777-300ER — and why the number you calculate is not the number you apply.',
    points: [
      'The calculation sizes your SERVICE. It is not an application quantity for one incident.',
      'Critical area means the fire adjacent to the fuselage, not the whole fire.',
      'AT from a piecewise formula on overall length and fuselage width; Ap is two-thirds of it.',
      'Q1 is control in the practical critical area. Q2 is everything after, and it follows the aerodrome category.',
      'Application rate depends on foam performance level. Level B halves the answer.',
      'Response time is a separate constraint. Enough water at the wrong minute still fails.'
    ],
    body: `
      <h3>Start with the concept, not the formula</h3>
      <p>The critical area is the idea that makes the arithmetic legitimate. The
      guidance is explicit that the objective is <em>not</em> to control or
      extinguish the entire fire. It is to control only the area of fire adjacent
      to the fuselage, in order to safeguard fuselage integrity and keep conditions
      tolerable for occupants.</p>
      <p>So a "777 fire" is not a quantity. It is a concept with a worst-case
      assumption attached. Hold onto that, because it is where this calculation is
      most often misused.</p>

      <h3>Step 1 — theoretical critical area, A<sub>T</sub></h3>
      <p>A rectangle: overall length of the aircraft by a width that steps up with
      fuselage size (§2.4.5). For anything 24 m or longer — which includes every
      widebody you will meet — the formula is:</p>
      <p class="formula">A<sub>T</sub> = L × (30 m + W)</p>
      <p>where L is the <strong>overall length</strong>, not the fuselage length, and
      W is the <strong>maximum fuselage width</strong>. Overall length is used
      deliberately: the whole aircraft has to be protected, because fire burning
      through the skin puts the fire inside the fuselage, and T-tail aircraft carry
      engines and exits out in that extended portion anyway (§2.4.4).</p>
      <p>The wind asymmetry behind the 30 m is worth knowing: for aircraft of 24 m
      or more, the area extends 24 m upwind and 6 m downwind (§2.4.3).</p>

      <h3>Step 2 — practical critical area, A<sub>p</sub></h3>
      <p>Seldom is the whole theoretical area actually alight, so capacity is
      provided for a smaller area derived from a statistical analysis of real
      accidents (§2.4.6):</p>
      <p class="formula">A<sub>p</sub> = 0.667 × A<sub>T</sub></p>

      {{diagram:critical-area}}

      {{diagram:water-quantity}}

      <h3>Step 3 — Q1, water to control the fire</h3>
      <p>§2.4.8 gives Q<sub>1</sub> = A × R × T, where R is the rate of application
      and T the time of application. T is <strong>one minute</strong> — the control
      time the whole method is built around.</p>
      <p>R is not a constant. §2.3.5 sets it by foam performance level, and gives
      these as the minimum rates at which control can be achieved within one
      minute:</p>
      <ul>
        <li><strong>Performance level A</strong> — 8.2 L/min/m²</li>
        <li><strong>Performance level B</strong> — 5.5 L/min/m²</li>
        <li><strong>Performance level C</strong> — 3.75 L/min/m²</li>
      </ul>

      <h3>Step 4 — Q2, everything after control</h3>
      <p>Q<sub>2</sub> is the water needed to hold control and finish off what is
      left. The guidance is blunt that this <em>cannot be calculated exactly</em>,
      because it depends on variables (§2.4.9). Instead it is taken as a percentage
      of Q<sub>1</sub>, and — this is the part that catches people — the percentage
      comes from the <strong>aerodrome category</strong>, not from the aircraft
      (§2.4.10):</p>
      <ul>
        <li>Category 1 — 0% &nbsp;·&nbsp; Category 2 — 27% &nbsp;·&nbsp; Category 3 — 30%</li>
        <li>Category 4 — 58% &nbsp;·&nbsp; Category 5 — 75% &nbsp;·&nbsp; Category 6 — 100%</li>
        <li>Category 7 — 129% &nbsp;·&nbsp; Category 8 — 152%</li>
        <li>Category 9 — 170% &nbsp;·&nbsp; Category 10 — 190%</li>
      </ul>
      <p>Q = Q<sub>1</sub> + Q<sub>2</sub> (§2.4.7). And the discharge rate your
      vehicles must achieve is simply Q<sub>1</sub> delivered in one minute (§2.5.1).</p>

      <h3>Worked — 777-300ER, performance level A foam, category 9 aerodrome</h3>
      <p>Overall length 73.86 m, maximum fuselage width 6.20 m.</p>
      <table class="calc">
        <tr><th>Step</th><th>Working</th><th>Result</th><th>Clause</th></tr>
        <tr><td>A<sub>T</sub></td><td>73.86 × (30 + 6.20) = 73.86 × 36.20</td><td>2 674 m²</td><td>2.4.5</td></tr>
        <tr><td>A<sub>p</sub></td><td>0.667 × 2 674</td><td>1 783 m²</td><td>2.4.6</td></tr>
        <tr><td>Q<sub>1</sub></td><td>1 783 × 8.2 × 1 min</td><td>14 624 L</td><td>2.4.8, 2.3.5</td></tr>
        <tr><td>Q<sub>2</sub></td><td>1.70 × 14 624</td><td>24 860 L</td><td>2.4.10</td></tr>
        <tr><td><strong>Q</strong></td><td>14 624 + 24 860</td><td><strong>39 484 L</strong></td><td>2.4.7</td></tr>
        <tr><td>Discharge rate</td><td>Q<sub>1</sub> in one minute</td><td>14 624 L/min</td><td>2.5.1</td></tr>
      </table>
      <p>Split at your foam's mix ratio — at 3%, that is roughly 1 185 L of
      concentrate and 38 299 L of water. Concentrate quantity is a
      <em>separate</em> calculation, kept in proportion to the water carried
      (§2.3.4), and on the aerodrome you hold a reserve of 200% of the Table 2-3
      quantity for vehicle replenishment (§2.6.1).</p>

      <h3>Check yourself against the table</h3>
      <p>Run the same formula with the category 9 row's own dimensions — L = 76 m,
      W = 7 m — and you get A<sub>T</sub> 2 812, A<sub>p</sub> 1 876, Q<sub>1</sub>
      15 383 L, Q<sub>2</sub> 26 100 L, total 41 483 L. That is Table 2-4's
      category 9 row, to the litre.</p>
      <p>If your working reproduces it, your method is sound. Note also that the
      real 777-300ER comes out <em>below</em> the category figure (39 484 L against
      41 483 L) purely because its fuselage is narrower than the 7 m the table
      assumes. The table is built on an average aeroplane per category; your
      aircraft is not the average.</p>

      <h3>Four traps</h3>
      <ul>
        <li><strong>Service size is not incident quantity.</strong> This number
        establishes what your service must be able to hold and deliver. It assumes
        the worst credible fire for that aircraft — effectively a full-length fuel
        spill against the fuselage. An engine fire or a localised fuel fire does not
        get the whole practical critical area. Applying 39 000 L because that is the
        number in the manual is a serious error, and it is the single most common
        misuse of this calculation.</li>
        <li><strong>Foam performance level moves the answer by more than 2:1.</strong>
        The same 777-300ER gives 39 484 L on level A foam, 26 483 L on level B and
        18 057 L on level C. Never quote a water figure without the performance
        level it assumes.</li>
        <li><strong>Larger than average means recalculate.</strong> §2.3.7 requires
        that from 1 January 2015, where operations by aeroplanes larger than the
        average for the category are planned, the water quantities and discharge
        rates are recalculated and increased accordingly. A 777 is exactly this
        case. Table 2-4 exists for this purpose.</li>
        <li><strong>Complementary agent substitution is not free.</strong> §2.3.11
        takes 1 kg of complementary agent as equivalent to 1.0 L of water for level
        A foam. Higher equivalencies need test evidence from your State, and any
        other agent needs its substitution ratio checked. And mixing performance
        levels at one aerodrome is discouraged because it corrupts the quantity
        arithmetic (§2.3.10).</li>
      </ul>

      <h3>The constraint the calculation cannot see</h3>
      <p>You can hold every litre above and still fail, because response time is
      assessed separately (§2.7.1). The objective is two minutes, and not more than
      three, to the end of each runway and to any other part of the movement area,
      in optimum visibility and surface conditions.</p>
      <p>Note precisely how that is measured: from the initial call to the time the
      first responding vehicle is <em>in position to apply foam at a rate of at least
      50 per cent of the Table 2-3 discharge rate</em>. Arriving is not the same as
      arriving ready. And realistic times must come from vehicles responding from
      their normal locations, not from positions adopted for the test.</p>
      <p>Additional vehicles delivering the rest of the agent should arrive within
      three minutes and no more than four, so that application is continuous
      (§2.7.3). Continuous application is not a nicety — a foam blanket that is
      allowed to break up has to be rebuilt from nothing.</p>

      <blockquote>
        <p><strong>SME action:</strong> confirm your aerodrome category and the k₂
        percentage that follows from it; state the performance level of the foam
        actually stocked and re-derive every figure on that basis; confirm which
        aircraft types at your field exceed the category average and confirm the
        recalculation under §2.3.7 has been done; and record your measured
        response times against §2.7.1. Then check the whole set against your
        State's requirements — Annex 14 Volume I Chapter 9 and, in South Africa,
        CAR Part XI and the applicable SACAA CAPs, which may differ from the ICAO
        figures given here.</p>
      </blockquote>
    `,
    refs: [
      'ICAO Doc 9137 Part 1 — §2.3.4 to §2.3.8 foam quantities and application rates; Table 2-3; Table 2-4',
      'ICAO Doc 9137 Part 1 — §2.4.1 to §2.4.10 critical area and water calculation',
      'ICAO Doc 9137 Part 1 — §2.5 discharge rates; §2.6 supply and storage; §2.7 response times',
      'ICAO Annex 14 Volume I Chapter 9 — aerodrome rescue and firefighting',
      'CAR Part XI and applicable SACAA CAPs — South African requirements'
    ],
    smeChecked: false
  },

  /* ─────────────────────────────────────────────────────────────────────
     ART-16 — the hot brake lesson. This is the worked example of a lesson
     that has to carry specific technique, so it cites Doc 9137 Part 1
     §12.2.3 and §12.2.4 directly and stays inside what they actually say.
     Note the guidance specifies an approach DIRECTION, not a fixed angle —
     the diagram shows the geometry, the standard sets the rule.
     ───────────────────────────────────────────────────────────────────── */
  'art16-m3': {
    title: 'Technique and agent application',
    brief:
      'Hot brakes and brake fires are different incidents with the same appearance, ' +
      'and treating them the same way can turn a cooling tyre into a bomb.',
    points: [
      'Distinguish a hot brake from a brake fire before you do anything to the wheel.',
      'Hot brakes normally cool by themselves. Often the correct agent is none.',
      'Approach on a fore or aft angle — never in line with the axle.',
      'Apply agent to the brake, not the tyre. That is where the heat comes from.',
      'Too rapid and too localised cooling risks explosive failure of the wheel.',
      'Dry chemical is effective but is not recommended on this type of fire.'
    ],
    body: `
      <h3>Two things that look identical</h3>
      <p>Doc 9137 Part 1 opens this topic by making a distinction it considers
      important enough to state first: it is necessary to distinguish between
      <strong>hot brakes</strong> and <strong>brake fires</strong>. They present
      similarly, and they are handled differently.</p>
      <p>The heating of aircraft wheels and tyres is a potential explosion hazard,
      and the guidance notes that this hazard is <em>greatly increased when fire is
      present</em>. A brake fire on a wheel with a hot brake behind it is a different
      problem from a hot brake that has stopped glowing.</p>

      <h3>The first decision is whether to use any agent at all</h3>
      <p>This is the part that gets missed. Hot brakes will normally cool by
      themselves, without the use of an extinguishing agent. If your instinct on
      arrival is to put water on a stopped aircraft's brakes, the question to ask
      first is whether that aircraft is not simply parked.</p>
      <p>There is a reason the stopped case is often benign. On propeller aircraft,
      operating manuals recommend the flight crew keep the propeller forward of the
      wheel and turning fast enough to provide ample cooling airflow. On most jet
      wheels, fusible plugs melt and deflate the tyre before dangerous pressures are
      reached. Both are protective features — neither is a guarantee.</p>

      {{diagram:hot-brake-approach}}

      <h3>Approach direction</h3>
      <p>When you are responding to a wheel fire, the guidance is direct and it is
      not a matter of preference: approach the wheels with extreme caution in a
      <strong>fore or aft direction angle</strong>, and <strong>never from the side
      in line with the axle</strong>.</p>
      <p>Read that as geometry rather than a number. The standard specifies a
      direction — you take the wheel from ahead of it or behind it, on an oblique
      line — not a fixed angle in degrees. If your SOP quotes a specific angle, that
      is your aerodrome's operational rule; check which it is, because the two are
      not the same thing and knowing that difference is worth more than memorising
      a number.</p>

      <h3>Where the heat actually is</h3>
      <p>Heat is transferred to the wheel <em>from the brake</em>. It follows that the
      extinguishing agent must be applied to the brake area. Water applied to a cool
      tyre while the brake assembly behind it stays hot treats the symptom and leaves
      the cause.</p>

      {{diagram:hot-brake-cooling}}

      <h3>How you cool it</h3>
      <p>Too rapid a cooling of a hot wheel, especially if it is localised, may cause
      explosive failure of the wheel. That single sentence explains why the technique
      looks the way it does. A narrow, hard jet onto one spot is the worst available
      option.</p>
      <ul>
        <li><strong>Water fog or an indirect solid stream</strong> — the guidance
        names these as the means of cooling hot brakes. Distributed, not concentrated.</li>
        <li><strong>Solid streams</strong> — may be used, but as a last resort.</li>
        <li><strong>Dry chemical</strong> — an effective extinguishing agent, but
        explicitly <em>not recommended</em> as an effective agent on this type of
        fire. Effective and recommended are different claims, and the guidance
        separates them deliberately.</li>
      </ul>

      <blockquote>
        <p><strong>SME action:</strong> this lesson follows ICAO Doc 9137 Part 1
        §12.2.3–12.2.4. Confirm the position for your State and fleet — particularly
        whether your SOP states a specific approach angle, whether fusible plug
        presence is assumed on all types you handle, and what cooling agent your
        appliances can actually produce as fog rather than as a solid stream. The
        last of those is an equipment fact, not a doctrine question.</p>
      </blockquote>
    `,
    refs: [
      'ICAO Doc 9137 Part 1 — §12.2.3 Hot brakes and wheel fires',
      'ICAO Doc 9137 Part 1 — §12.2.4 Cooling of hot wheels and agent selection',
      'Aircraft operating manuals — brake cooling and propeller positioning guidance',
      'Your aerodrome SOP — wheel and brake fire tactics'
    ],
    smeChecked: false
  },

  /* ─────────────────────────────────────────────────────────────────────
     ART-18 — Communications. Grounded in Doc 9137 Part 1 §2.9, §4.1, §4.2
     and Chapter 12.3. The alerting lesson leads on the buzzer warning light,
     which is the most useful detail in the chapter for anyone who has ever
     sat in a watchroom wondering why the phone had not rung.
     ───────────────────────────────────────────────────────────────────── */
  'art18-m1': {
    title: 'The aerodrome alerting system',
    brief:
      'The part of the whole operation that nobody practises, works perfectly, ' +
      'or fails silently at the worst possible moment.',
    points: [
      'There are three independent ways to raise the alarm, and all three should work.',
      'The ATC line to the main fire station must not route through an intermediate switchboard.',
      'The buzzer has a warning light because a failed buzzer is silent. That light is the test.',
      'The broadcast must carry location, aircraft type and preferential routing — not just "fire".',
      'The master watchroom is continuously staffed. Satellite stations until their vehicles roll.',
      'Nothing here works unless someone has deliberately broken it and watched it fail.'
    ],
    body: `
      <h3>Why this lesson exists</h3>
      <p>Every other part of the response is visible when it fails. A vehicle with
      a broken pump, a turret that will not elevate, a crew that cannot reach the
      aircraft — all of it announces itself. An alerting system fails
      <em>silently</em>. Nobody arrives, and for a period the most expensive
      equipment on the aerodrome sits in a building doing nothing.</p>
      <p>The guidance is blunt about the dependency: the efficiency of an RFF
      service is significantly dependent on the reliability and effectiveness of
      its communication and alarm system, and the importance of prompt and clear
      communications cannot be over-emphasised (§4.1.1).</p>

      {{video:faa-intro-5}}

      <h3>Three ways in</h3>
      <p>An alerting system should be provided at a fire station, <strong>capable
      of being operated from</strong> that station, any other fire station on the
      aerodrome, and the airport control tower (§2.9.2). Three independent
      origins, deliberately. A discrete communication system links the fire
      station with the control tower, any other station, and the RFF vehicles
      (§2.9.1) — <em>discrete</em> meaning dedicated, not shared through a general
      telephone exchange.</p>
      <p>Redundancy is only redundancy if all three paths are tested. An alerting
      system that has never had its second and third origins exercised is a
      hypothesis, not a capability.</p>

      <h3>The warning light, and why it exists</h3>
      <p>Calls normally originate from air traffic control. ATC should be linked
      to the <em>main</em> fire station by a direct telephone line <strong>not
      passing through any intermediate switchboard</strong>, so as to avoid delays
      (§4.2.2). A switchboard in that path is a queue nobody can see.</p>
      <p>That line normally has a distinctive buzzer in the watchroom — and is
      <strong>safeguarded against buzzer defects by a warning light</strong>. Read
      that again. The buzzer can fail, and when it fails it fails silently. The
      warning light exists solely to tell you that the thing you are relying on to
      announce an aircraft emergency has stopped announcing anything.</p>
      <p>So: is your warning light working? Not can it work — is it lit right now,
      and do you know what it looks like when it is healthy? This is a one-minute
      weekly check that costs nothing and catches a failure mode that would
      otherwise be invisible until it mattered.</p>

      <h3>What the broadcast has to say</h3>
      <p>Fire stations should have a public address system so that details of the
      emergency can be conveyed to crew members — specifically
      <strong>location, type of aircraft involved, and preferential routing for
      RFF vehicles</strong> (§4.2.3).</p>
      <p>That is the content. "There's a fire, everyone roll" fails three of the
      four things a responding crew needs. Preferential routing in particular is
      the one that cannot be derived on the move — it depends on which taxiway is
      blocked, which is a fact only the watchroom holds.</p>
      <p>Control of the PA normally sits in the master watchroom, which also
      carries a switch for silencing the alarm system so it does not interfere
      with the broadcast. Two systems, one room, and the person silencing one is
      in the middle of using the other.</p>

      <h3>Main and satellite</h3>
      <p>Where there is more than one station, one is the main station and its
      watchroom the <strong>master watchroom, continuously staffed</strong>. A
      satellite station may have a watchroom with fewer facilities, commensurate
      with its subordinate role, and is <em>usually staffed only until the
      satellite's vehicles respond</em> (§4.2.1).</p>
      <p>The same clause makes a point worth sitting with: the scope of facilities
      in a watchroom should follow the workload, and if part of the mobilising
      can be done elsewhere — the aerodrome telephone exchange room, an emergency
      operations centre — then the fire station watchroom can be better equipped
      for the job it actually has. Adding capability to the wrong room is a
      common and expensive way of solving nothing.</p>

      <h3>How to actually test this</h3>
      <ul>
        <li>Confirm the warning light is healthy and that someone can say what a
        faulty one looks like.</li>
        <li>Trace the ATC line and confirm no switchboard sits in the path.</li>
        <li>Raise the alarm from the tower, from the satellite, and from the main
        station, and confirm all three reach the people who must move.</li>
        <li>Broadcast a test message containing location, aircraft type and
        routing, and check the crews received all three.</li>
        <li>Time it, and compare against your response time requirement.</li>
      </ul>
      <p>Do this as a scheduled activity, not as part of the full-scale exercise.
      The exercise is too infrequent to be the only time you find out.</p>

      <blockquote>
        <p><strong>SME action:</strong> document your actual alerting architecture
        — the three origins, the line routing, the buzzer and warning light
        arrangement, the master and satellite establishment and staffing hours, and
        what the PA broadcast contains. Then state how each is tested, how often,
        by whom, and where the result is recorded. A capability nobody has tested
        should be treated as absent.</p>
      </blockquote>
    `,
    refs: [
      'ICAO Doc 9137 Part 1 — §2.9 communication and alerting systems',
      'ICAO Doc 9137 Part 1 — §4.1 emergency communications; §4.2 fire station communications',
      'Your aerodrome emergency plan — alerting and communications',
      'Course ART-19 — emergency planning and the full-scale exercise'
    ],
    smeChecked: false
  },

  'art18-m2': {
    title: 'Radio discipline under pressure',
    brief:
      'Nearly every radio failure is a discipline failure, not a technical one.',
    points: [
      'Clear, concise and understandable, at all levels — that is the standard being applied.',
      'There should be an aerodrome SOP for emergency communications defining lines of communication and specified frequencies.',
      'Enough channels to carry command and support separately.',
      'Confirm what you have been told. An unconfirmed instruction is not an instruction.',
      'A long transmission is a second during which someone is not listening to the one that mattered.',
      'Saying "say again" is a professional act. Guessing is not.'
    ],
    body: `
      <h3>What the standard actually says</h3>
      <p>The guidance puts it plainly: the success of an effective aircraft
      intervention incident may depend on the transmission and reception of clear,
      concise and understandable communications at all levels. Clearly
      communicated information reduces confusion and helps to maximise the use of
      available resources (§12.3.21).</p>
      <p>Read that last clause carefully. Communications are not a support
      function. They are the mechanism that decides whether your available
      resources get used at all.</p>

      <h3>The SOP is the standard, not you</h3>
      <p>Every aerodrome should have a standard operating procedure for emergency
      communications, defining <strong>lines of communication and specified
      frequencies</strong> (§12.3.21). That means it is written down before the
      incident, it names who talks to whom, and it names what frequency each of
      those calls is made on.</p>
      <p>If your communications are held together by who happens to remember the
      arrangement, you do not have an SOP — you have a habit, and habits are
      unavailable to the crew member who joined last month.</p>

      <h3>Channels are a structural decision</h3>
      <p>There must be enough channels to allow the command and support functions
      to be carried separately, and the incident commander should be able to
      communicate with other agencies on separate frequencies (§12.3.21).</p>
      <p>Put every function on one net and the consequence is predictable: a
      detailed exchange about a rescue winch blocks the turret position report
      that was more urgent. Separate channels is not tidiness. It is the only
      thing that makes the prioritisation real.</p>

      <h3>How it degrades, and what to do about it</h3>
      <p>Radio discipline fails under stress in a specific and predictable way. It
      does not become vague — it becomes <em>long</em>. Under pressure people
      transmit everything: the context, the justification, the doubt. Every extra
      sentence is a second in which the net is occupied and the person who needed
      to hear you did not.</p>
      <ul>
        <li><strong>Lead with what changes what the listener does.</strong>
        Position, type of problem, what you need. Context after, or not at all.</li>
        <li><strong>Confirm receipt of anything you are going to act on.</strong>
        An unconfirmed instruction is an assumption you have not noticed you are
        making.</li>
        <li><strong>Use a consistent order every time.</strong> Under stress,
        familiarity with the shape of a message is what lets a tired brain parse
        it correctly the first time.</li>
        <li><strong>Say "say again" freely.</strong> Asking again is cheap.
        Acting on a misheard transmission is not.</li>
      </ul>

      <blockquote>
        <p><strong>SME action:</strong> insert your actual SOP — the channel plan,
        who holds which net, the priority order for a transmission, and your
        standard formats for position, attack, emergency traffic and all-clear.
        Then confirm your radios interoperate with ATC and with any mutual aid
        agency you would actually be working with, and state how often that is
        tested rather than assumed.</p>
      </blockquote>
    `,
    refs: [
      'ICAO Doc 9137 Part 1 — §12.3.21 communications',
      'Your aerodrome SOP — emergency communications',
      'Course ART-09 — command, and establishing contact between pilot and on-scene commander'
    ],
    smeChecked: false
  },

  'art18-m3': {
    title: 'ATC coordination',
    brief:
      'Your response time is partly somebody else\'s response time. Plan for that.',
    points: [
      'ATC is normally the activating authority for an aircraft accident call.',
      'If your alerting routes through ATC, your response time includes theirs.',
      'In low visibility some form of navigational assistance may be required.',
      'Vehicles can move in convoy, and ATC can direct the leading vehicle.',
      'ATC closes the runway and activates you. You do not direct the aircraft.',
      'A coordination failure and a communication failure look identical from the fire station.'
    ],
    body: `
      <h3>A shared dependency</h3>
      <p>Calls to the fire station for attendance at an aircraft accident normally
      originate from air traffic control (§4.2.2). That makes ATC not merely a
      neighbour but part of your response chain — and it means a delay in
      activating you is a delay in your response time, and the requirement in
      §2.7.1 does not care whose fault it was.</p>
      <p>The provision the guidance asks for is <strong>direct</strong>
      communication between ATC, or whatever the activating authority is, and the
      fire station, to ensure prompt dispatch of vehicles in an aircraft emergency
      (§4.1.2a). Direct, and on a line that avoids intermediate switchboards
      (§4.2.2). Every element of that chain is something you can test.</p>

      <h3>Guidance to the vehicles, not just to the station</h3>
      <p>Provision is also required for communication between ATC and the RFF
      crews <em>en route to, or in attendance at</em> an accident (§4.1.2b). Not
      only the station — the crews.</p>
      <p>And for low visibility, the guidance notes that some form of navigational
      assistance may be required (§4.1.2b, referring to §2.7.5). This is worth
      understanding rather than accepting. In poor visibility a perfectly
      functioning crew driving correctly can still take far longer than your
      response time requires, because the problem is navigation and not speed.
      Know what assistance your service has available and how to ask for it.</p>

      <h3>Convoy movement</h3>
      <p>The guidance describes arrangements by which vehicles can move in convoy
      and air traffic control can direct the leading vehicle or vehicles, with
      accident site location provided by ATC and a collision avoidance facility
      available either from equipment installed in the vehicles or from
      surveillance radar.</p>
      <p>Two things follow. First, leading a convoy is a real appointment with a
      real responsibility, and ATC directing the lead vehicle does not transfer
      your obligation to your own people. Second, collision avoidance is specified
      as a function — from vehicle equipment or from ATC radar. Know which one you
      are relying on, because they fail differently.</p>

      <h3>Where the authority sits</h3>
      <p>ATC closes the runway, activates your service, and manages the aircraft
      and the movement area. You work the aircraft and the fire. Blurring that line
      is how an RFF service ends up with two authorities giving contradictory
      instructions to the same vehicle.</p>
      <p>If you need the movement area cleared, or an aircraft repositioned, or
      access granted across a surface you do not own — that is a request to ATC,
      made clearly and early, not a manoeuvre you assume you have authority
      for.</p>

      <h3>Testing the boundary</h3>
      <ul>
        <li>Place a call from ATC to the watchroom and time it against your
        response time requirement.</li>
        <li>Confirm the crew-to-ATC channel works from inside a moving vehicle,
        not only from the station.</li>
        <li>Confirm your low-visibility navigational assistance exists and that
        your crews know how to request it.</li>
        <li>Run a joint exercise with ATC covering an aircraft accident response,
        including the runway closure handover.</li>
      </ul>

      <blockquote>
        <p><strong>SME action:</strong> record your actual arrangements with ATC —
        who is the activating authority at your aerodrome, the direct-line
        architecture and who to call when it fails, the crew-to-ATC channel, your
        low-visibility assistance, and your convoy and collision-avoidance
        arrangements. State how and how often each is tested. Confirm the position
        against your State's requirements and the applicable AIP.</p>
      </blockquote>
    `,
    refs: [
      'ICAO Doc 9137 Part 1 — §4.1.2 emergency communications; §4.2.2 fire station communications',
      'ICAO Doc 9137 Part 1 — §2.7 response times, vehicle guidance and collision avoidance',
      'Your aerodrome emergency plan — coordination with air traffic control',
      'Course ART-19 — full-scale exercise, which must include ATC'
    ],
    smeChecked: false
  },

  'art18-m4': {
    title: 'Flight deck information exchange',
    brief:
      'The exchange that either prevents an unnecessary evacuation, or fails to ' +
      'prevent a necessary one.',
    points: [
      'Establish direct contact between the pilot and the on-scene commander immediately.',
      'Report exterior conditions — that report is what can prevent an unnecessary evacuation.',
      'Once an evacuation is started it cannot be stopped.',
      'An unnecessary evacuation can injure evacuees. So can a delayed one.',
      'Flight crew must be told the aircraft particulars that dictate approach.',
      'Crew visibility is restricted. Your external appraisal is a task with a timing and an owner.'
    ],
    body: `
      <h3>Who is waiting on whom</h3>
      <p>The guidance is explicit that RFF personnel should take immediate steps
      to establish direct contact between the pilot and the on-scene commander,
      so that all factors are properly considered before actions are initiated
      (§12.3.21). It is often desirable to establish direct contact with the flight
      crew for the same reason (§12.3.19), and the responsibilities of flight crew
      and airport emergency personnel should be clearly defined (§12.3.20).</p>
      <p>Two different parties, and the flight crew have restricted visibility.
      Annex 6 requires operators to ensure their pilots are familiar with the
      aerodrome and its emergency arrangements (§12.3.13) — so the pilot knows your
      service, and you should assume they have been told what you are capable
      of.</p>

      {{diagram:vehicle-positioning}}

      <h3>The report that changes the decision</h3>
      <p>Here is the part worth teaching carefully. The guidance states that an
      unnecessary evacuation may be prevented by RFF personnel communicating with
      the flight crew on the appropriate frequency and giving a report on exterior
      conditions (§12.3.27).</p>
      <p>Two sentences in that paragraph matter enormously:</p>
      <ul>
        <li><strong>Once an evacuation is initiated it cannot be stopped.</strong>
        There is no recall.</li>
        <li><strong>An unnecessary evacuation can endanger and injure the
        evacuees.</strong> Not merely waste time — injure people. Slides, wings,
        wingtip navigation lights, a damaged door, an engine still running. Most
        engine, wheel assembly and other minor exterior emergencies can be
        controlled by RFF personnel without requiring one.</li>
      </ul>
      <p>So the value of your external appraisal is not just that the commander
      makes a good decision. It is that a bad decision — evacuating an aircraft
      that did not need it — is itself a safety event. That is the argument for
      reporting early and accurately, and it motivates people in a way that "report
      the situation" never has.</p>

      <h3>What you must not do</h3>
      <p>The same clause is equally firm about limits. RFF personnel
      <strong>should not impede the evacuation</strong>, and should
      <strong>not attempt to enter the fuselage</strong> — instead provide
      assistance, and be prepared to assist those not capable of self-evacuation
      (§12.3.27). Entry is a rescue task under command, not a spontaneous
      act.</p>

      <h3>When the engines are still running</h3>
      <p>It may be necessary to keep at least one engine operating after the
      aircraft has stopped, in order to provide lighting and communications aboard
      (§12.3.23). That hampers rescue operations, and the guidance says it should be
      considered as a problem rather than accepted as a cost.</p>
      <p>The hazards it creates are specific. On reciprocating and turboprop
      engines, extreme care must be taken to stay clear of the propeller arc. On
      turbojets, extreme care in the area <em>ahead of the engine and for a
      considerable distance behind it</em>. A running engine is not background
      noise. It is a hazard that moves.</p>

      <h3>Fire warnings you cannot judge from the flight deck</h3>
      <p>It is often impossible for crew members to make an accurate appraisal of
      aircraft fire warning indicators, and the guidance advises bringing the
      aircraft to a complete stop and allowing RFF personnel to inspect the area
      before parking — an inspection that can usually be greatly enhanced by
      thermal imaging without opening compartment doors (§12.3.22).</p>
      <p>If thermal imaging is among your capabilities, that is a capability the
      flight deck cannot replicate, and it is worth saying so when briefing an
      incoming crew.</p>

      <h3>Aircraft particulars change the plan</h3>
      <p>Wind, terrain, aircraft type and cabin configuration dictate approach
      (§12.3.24). It is therefore necessary for flight crew to inform RFF
      personnel of the details regarding the particular aircraft concerned. On
      combined cargo-passenger aircraft the position is different again, and the
      guidance says so.</p>
      <p>Practically: the aircraft type determines your positioning plan, and the
      flight deck is the only source of that information. If you have to ask for it
      on arrival, the tactical plan you followed was somebody else's guess.</p>

      <blockquote>
        <p><strong>SME action:</strong> confirm your primary means of contacting
        the flight deck, including whether intercom facilities are available on
        the types you handle; state the format of your exterior condition report;
        confirm the interagency position on evacuation authority and on entering
        the fuselage, since this lesson follows ICAO and your State may differ; and
        confirm whether thermal imaging is available and who is trained to
        interpret it.</p>
      </blockquote>
    `,
    refs: [
      'ICAO Doc 9137 Part 1 — §12.3.13 to §12.3.24 flight crew and RFF coordination',
      'ICAO Doc 9137 Part 1 — §12.3.27 evacuation determination and the unnecessary evacuation risk',
      'ICAO Annex 6 Part I — operator responsibilities for pilot familiarity',
      'Course ART-09 — size-up, and the first transmission'
    ],
    smeChecked: false
  },

  /* ─────────────────────────────────────────────────────────────────────
     ART-15 m1 — engine fires. Grounded in Doc 9137 Part 1 §12.2.8 to
     §12.2.16. Two figures appear here and both are quoted exactly:
     10 m from the intake (§12.2.11) and up to 500 m astern (§12.2.12).
     The titanium case (§12.2.13) is the most counter-intuitive item in the
     whole chapter — sometimes the correct action is to let it burn.
     ───────────────────────────────────────────────────────────────────── */
  'art15-m1': {
    title: 'Engine fuel, oil and hydraulic systems',
    brief:
      'Engine fires punish both over-commitment and the wrong agent. Two of ' +
      'the surprises here are that water is often the wrong tool, and that ' +
      'sometimes the correct action is to let it burn.',
    points: [
      'Stay at least 10 m clear of the front and side intake, and up to 500 m astern.',
      'Never position directly below the engine — running fuel, melted metal, ground fire.',
      'Engines can be 10.5 m up. Your attack position depends on your reach.',
      'Clean agents beat water and foam inside the nacelle. Water and foam go on adjacent structures.',
      'Do not put foam into a turbine intake or exhaust unless there is no other option.',
      'Titanium cannot be extinguished with conventional agents — sometimes you let it burn out.',
      'Tell the operator what agent you used. Corrosion is a consequence you created.'
    ],
    body: `
      <h3>The geometry decides where you can stand</h3>
      <p>Before any tactical discussion, the physical constraints. RFF personnel
      should stay <strong>at least 10 m from the front and side intake</strong>
      of a turbine engine to avoid being ingested, and remain
      <strong>up to 500 m from the rear</strong> depending on the size of the
      aeroplane to avoid the jet blast danger area (§12.2.11, §12.2.12).</p>

      {{diagram:jet-blast-zones}}

      <p>The 500 m figure is the one that catches people, because it scales with
      the aeroplane rather than being a fixed number, and because it is measured
      from the rear. An engine idling on the stand is not the hazard. An engine
      running at power after a survivable failure is.</p>

      <h3>Never underneath</h3>
      <p>The guidance is unambiguous that personnel and vehicles operating at an
      engine fire <strong>should not position themselves immediately below the
      engine</strong>, where they may be at risk from running fuel, melted metal or
      ground fire situations (§12.2.15).</p>
      <p>Operating positions outboard, in front of, or to the rear of the engine
      will permit agents to be delivered — provided there is a suitable
      applicator, or the range and pattern of the discharge can actually deliver
      the chosen agent effectively.</p>
      <p>That proviso is the whole problem. Engine heights of up to
      <strong>10.5 m</strong> may be encountered, and they will require ladders,
      elevated working platforms on the appliance, and extensible applicators
      (§12.2.15). So the honest question before an engine fire is not "what agent"
      but "what can my appliance actually reach from where it can safely
      stand".</p>

      <h3>The agent question, which is not the one people expect</h3>
      <p>For a fire confined within the nacelle of a piston engine that the
      aircraft extinguishing system cannot control, <strong>clean agents should be
      applied first</strong>, because they are more effective than water or foam
      <em>inside</em> the nacelle. Foam or water spray goes on the
      <strong>outside</strong>, to keep adjacent aircraft structures cool (§12.2.8).</p>
      <p>Two separate jobs, two different agents, and conflating them wastes the
      opportunity. Water and foam inside the nacelle are less effective than a
      clean agent; water and foam on the surrounding structure are what stops
      this becoming a fuselage fire.</p>
      <p>Dry chemical may be used, but may cause further damage to the
      aeroplane (§12.2.8). For a confined turbine fire outside the combustion
      chambers, the built-in extinguishing system is the best control; a clean
      agent only if the fire persists after that system is expended and the
      turbine has shut down (§12.2.9).</p>
      <p>And the caution that catches crews out: <strong>foam should not be used
      in the intake or exhaust of a turbine engine</strong> unless control cannot
      be secured with other agents and the fire appears to be in danger of
      spreading (§12.2.10). That is a narrow exception, not a general licence.</p>

      <h3>Titanium: sometimes the answer is to let it burn</h3>
      <p>This is the most counter-intuitive instruction in the chapter and it is
      worth learning properly rather than skimming. Some engines have titanium
      parts which, <strong>if ignited, cannot be extinguished with the conventional
      extinguishing agents available to most RFF crews</strong> (§12.2.13).</p>
      <p>So pouring agent into a titanium fire is not achieving anything. If these
      fires are contained within the nacelle, it should be possible to
      <strong>allow them to burn out without seriously threatening the aircraft
      itself</strong> — provided two conditions hold:</p>
      <ul>
        <li>there are no external flammable vapour-air mixtures which could be
        ignited by the flames or hot engine surfaces; and</li>
        <li>foam or water spray is available to maintain the integrity of the
        nacelle and surrounding exposed aircraft structures.</li>
      </ul>
      <p>Read that correctly. Burning out is permitted only while the fire stays
      <em>inside</em> the nacelle and only while you can hold the structure cool
      around it. Those two preconditions are continuous judgements, not a
      one-off decision — the moment either fails, the calculus changes
      completely.</p>

      <h3>Fires the flight deck cannot see</h3>
      <p>It is often impossible for crew members to make an accurate appraisal of
      aircraft fire warning indicators, and the guidance advises bringing the
      aircraft to a complete stop and allowing RFF personnel to inspect the area
      before parking — an inspection usually greatly enhanced by thermal imaging
      without opening compartment doors (§12.3.22).</p>
      <p>For a confined turbine fire the guidance also notes the value of the
      engine continuing to turn over, provided it is safe to do so from the
      viewpoint of evacuation and other safety considerations (§12.2.9). You will
      need to stand clear of the exhaust — and you may still have to protect
      combustibles from the exhaust flames.</p>

      <h3>Exposures first</h3>
      <p>Where an engine fire situation has developed, <strong>priority will be
      given to exposures</strong> (§12.2.16). Not the engine. The fire you were
      sent to is contained; the aircraft around it is what you save.</p>

      <h3>The bit that is easy to forget entirely</h3>
      <p>The choice of agent is a matter for local decision, but the operational
      objective is always rapid fire control with the minimum consequential
      damage from the firefighting itself (§12.2.16). Clean agents, dry chemical
      powder and, to a lesser extent, CO<sub>2</sub> can achieve control in the
      screened areas within an engine without contaminating components and
      ancillary systems.</p>
      <p>And then the sentence that closes the incident: <strong>it is important
      to inform aircraft operators of the nature of the agent used</strong> when
      the incident is concluded, so that they may take preventive action against
      corrosion or other effects as the situation may require (§12.2.16).</p>
      <p>That is a real task with an owner. A clean agent protects the airframe
      and quietly schedules a corrosion inspection. Somebody has to tell the
      operator. Confirm who does that on your aerodrome, and that it happens.</p>

      <blockquote>
        <p><strong>SME action:</strong> for the engine types based at your
        aerodrome, confirm which have titanium components and what your position
        is on the burn-out tactic for them, including who judges the two
        preconditions. Confirm which clean agents your appliances actually carry
        and their application arrangements inside a nacelle. State your maximum
        safe working height and what reaches it — elevated platforms, ladders,
        extensible applicators — and your rule for the 10 m intake and the
        up-to-500 m astern exclusion, including how that is enforced when several
        vehicles are working. Finally, name who notifies the operator of the agent
        used.</p>
      </blockquote>
    `,
    refs: [
      'ICAO Doc 9137 Part 1 — §12.2.8 confined piston engine fires',
      'ICAO Doc 9137 Part 1 — §12.2.9 and §12.2.10 confined turbine fires; agent application',
      'ICAO Doc 9137 Part 1 — §12.2.11 intake and §12.2.12 exhaust danger distances',
      'ICAO Doc 9137 Part 1 — §12.2.13 titanium fire control; §12.2.15 positioning and access height; §12.2.16 agent choice',
      'ICAO Doc 9137 Part 1 — §12.3.22 aircraft fire warnings and thermal imaging',
      'Aircraft type documentation for the types based at your aerodrome'
    ],
    smeChecked: false
  },

  /* ─────────────────────────────────────────────────────────────────────
     ART-16 m4 — withdrawal and re-attack. Grounded in Doc 9137 Part 1
     Chapter 6.1 (protective clothing) and Chapter 12.3. The heat-load
     trade-off in 6.1.1 is written up honestly because it is the factor that
     decides what a South African crew can actually wear continuously.
     ───────────────────────────────────────────────────────────────────── */
  'art16-m4': {
    title: 'Exposure protection, withdrawal and re-attack',
    brief:
      'Knowing when to stop is a decision, not a feeling. Set it before the ' +
      'heat decides for you.',
    points: [
      'Protective clothing must let you do the job. Protection that prevents the job is not protection.',
      'Helmets must let you hear words of command. Check that wearing it, not on a shelf.',
      'Protective clothing is distinct from the service uniform and is worn in training too.',
      'The three rescue tasks are not ranked, so withdrawal criteria must be set in advance.',
      'Positioning for reflash is a forecast based on fuel state, not a formality.',
      'Ventilation carries a risk of promoting fire in smouldering material.'
    ],
    body: `
      <h3>Clothing that lets you work</h3>
      <p>The requirement on protective clothing is not simply that it protects. It
      is that it ensures the wearer is <em>able to perform the assigned
      duties</em> (§6.1.1). Protection that prevents the job is not protection, it
      is a different problem.</p>
      <p>The guidance sets out three factors determining what is provided and when
      it is worn, and all three are trade-offs:</p>
      <ul>
        <li><strong>Continuity of wear.</strong> To allow immediate response, some
        or all elements may need to be worn throughout the tour of duty — and some
        forms of clothing create dressing problems that cannot easily be solved
        inside the crew compartment of a moving vehicle. If it cannot be dressed
        in while the vehicle is moving, it will not be dressed in.</li>
        <li><strong>Heat.</strong> Protective clothing restricts loss of body heat
        through natural ventilation. In high ambient temperatures this matters, and
        the guidance anticipates a deliberate compromise between the ultimate
        degree of protection and a lesser but acceptable form designed for hot
        climates. It states that this compromise does not expose operatives to
        unacceptable risk — while making the compromise explicit and conscious
        rather than accidental.</li>
        <li><strong>Fit and hygiene.</strong> Clothing shared on an impersonal
        issue basis creates sizing and hygiene problems, and real personal
        objections. The guidance's solution is relatively inexpensive uniforms,
        some requiring a special undergarment for complete protection, worn in
        part through hours of duty so that issue can be personal and correctly
        sized.</li>
      </ul>
      <p>In South Africa the second factor is not a footnote. Heat load is a real
      constraint on how much protective clothing can be worn continuously, and the
      honest design decision is a layered kit with a stated compromise rather than
      one heavy suit that nobody wears properly.</p>

      <h3>What the kit is, and what it is not</h3>
      <p>Protective clothing is <strong>distinct from ordinary fire service
      uniforms</strong> and is worn during firefighting activities
      <strong>including training</strong> (§6.1.2). It protects against radiated
      heat and against injury from impact or abrasion, and a measure of protection
      from water ingress is desirable particularly for low-temperature operations. A
      typical uniform is a helmet with visor, a suit — one-piece or jacket and
      trousers — boots and gloves.</p>
      <p>Worn in training, not only on incidents. A crew who only suit up during a
      call will suit up slowly during the call.</p>

      <h3>The helmet is a communications device</h3>
      <p>Beyond impact, penetration, electrical conductivity and resistance to
      deformation under heat absorption, the helmet requirements are operational
      (§6.1.3). It should not give the wearer a sense of isolation, and it
      <strong>must permit both speech and the reception of audible signals or
      words of command</strong>. Ideally it works with respiratory protection and
      incorporates radiotelephone receivers.</p>
      <p>A helmet that muffles a crew command is a safety device that has become a
      hazard. Check it while you are wearing it — visor down, radio on — not by
      inspecting it on a shelf.</p>

      <h3>Withdrawal</h3>
      <p>The guidance is careful that the three principal rescue tasks —
      protection, firefighting and rescue — are <strong>not specified in order of
      priority</strong> (§12.3.5), and that if a fire situation exists within the
      aircraft the sequence changes.</p>
      <p>Which is precisely why withdrawal criteria cannot be invented on the day.
      With no stated trigger, the trigger becomes whoever is hottest and least
      willing to be the one who calls it. Decide in advance what ends an attack:
      heat on the crew, loss of visibility, a structural change in the airframe,
      the protective envelope failing, or the commander calling it. Write the list
      down, and brief it to everyone rather than only to supervisors.</p>

      <h3>Re-attack, and the fuel that decides it</h3>
      <p>Vehicles should ideally be positioned so they can be repositioned in the
      event of reflash, or on receipt of a change of tactical priority (§12.3.25).
      That instruction is a forecast, and the forecast rests on fuel state, foam
      application, whether the fuel is in the cells or the tank, and how long the
      aircraft sat before anything was applied. Know the specifics for the type in
      front of you.</p>
      <p>Re-attack is a second attack against a known problem, not a first attack
      with less left. If you withdraw, withdraw to a position you can attack
      again from — and know what you are going back into.</p>

      <h3>Ventilation is a two-edged act</h3>
      <p>Post-accident ventilation matters, because smoke and fumes may be
      unacceptable to occupants (§12.3.6–§12.3.8). But whenever ventilation is
      introduced there is a risk of <strong>promoting fire in any smouldering
      materials</strong> (§12.3.9). Removing smoke can feed a fire that was not
      going to become one.</p>

      {{video:faa-tact-5}}

      <blockquote>
        <p><strong>SME action:</strong> define your withdrawal criteria and
        re-attack triggers in writing, name who holds the decision, and confirm
        they are briefed to every crew member rather than only to supervisors.
        State what is worn continuously during a tour of duty and what is
        response-only, with the heat rationale for that split recorded. Confirm
        reflash guidance per aircraft type, and your position on preserving the
        accident site, which carries investigation and liability consequences long
        after the incident has ended.</p>
      </blockquote>
    `,
    refs: [
      'ICAO Doc 9137 Part 1 — Chapter 6.1 protective clothing; 6.1.2 and 6.1.3 component requirements',
      'ICAO Doc 9137 Part 1 — §12.3.5 task priority; §12.3.6 to §12.3.9 ventilation; §12.3.25 repositioning for reflash',
      'Course ART-07 — PPE, SCBA and crew fitness',
      'Course ART-09 — stand-down decisions'
    ],
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
