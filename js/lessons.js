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
