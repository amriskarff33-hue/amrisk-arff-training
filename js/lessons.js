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
      'The primary objective, the three factors that actually decide outcomes, ' +
      'and — just as important — what the service is not for.',
    points: [
      'The primary objective is to save lives at or in the immediate vicinity of the aerodrome.',
      'The service creates survivable conditions, provides egress routes, and starts the rescue of those who cannot escape unaided.',
      'Three factors decide effective rescue: the training received, the effectiveness of the equipment, and the speed with which both can be put into use.',
      'Building fires, fuel farm fires and runway foaming are explicitly outside the requirement.',
      'Firefighting capability exists to permit rescue — the ordering is not negotiable.',
      'Read the scope exclusion before you decide a demand is not your problem.'
    ],
    body: `
      <h3>The objective, in the regulator's words</h3>
      <p>Annex 14 Volume I opens §9.2 — Rescue and firefighting — with an
      introductory note that states the purpose better than any training text
      manages to, and it is worth having memorised before you memorise anything
      else in this course:</p>
      <blockquote>
        <p>The principal objective of a rescue and firefighting service is to save
        lives in the event of an aircraft accident or incident occurring at, or in
        the immediate vicinity of, an aerodrome. The rescue and firefighting
        service is provided to create and maintain survivable conditions, to
        provide egress routes for occupants and to initiate the rescue of those
        occupants unable to make their escape without direct aid. <em>— Annex 14
        Vol I, §9.2</em></p>
      </blockquote>
      <p>Three jobs, in order. <strong>Create and maintain survivable
      conditions.</strong> <strong>Provide egress routes.</strong> <strong>Initiate
      the rescue</strong> of those who cannot get out on their own. Note the
      careful wording on that last one — <em>initiate</em>, not <em>complete</em>.
      The service is required to start the rescue, and it will need other
      organisations to finish it.</p>
      <p>One further sentence in the same note widens the scope deliberately: the
      rescue may require the use of equipment and personnel other than those
      assessed primarily for rescue and firefighting purposes.</p>

      <h3>The three factors that decide whether it works</h3>
      <p>The note then names what actually determines the outcome, and the list
      is short enough to be worth learning by heart:</p>
      <blockquote>
        <p>The most important factors bearing on effective rescue in a survivable
        aircraft accident are: the training received, the effectiveness of the
        equipment and the speed with which personnel and equipment designated for
        rescue and firefighting purposes can be put into use. <em>— Annex 14 Vol I,
        §9.2</em></p>
      </blockquote>
      <p>Training, equipment, speed. Not the third aircraft on the ramp. Not the
      foam concentrate brand. Whatever else is debated in the station, those
      three are what the standard says decides whether people survive.</p>
      <p>Notice what is <em>not</em> on that list: the fire. Fire is the condition
      you are trying to change, not a measure of your performance.</p>

      <h3>And what the service is not for</h3>
      <p>The same note draws a boundary, and boundary-setting clauses are the ones
      new crew most often get wrong in both directions — calling for help that is
      not coming, or declining work that is actually yours:</p>
      <blockquote>
        <p>Requirements to combat building and fuel farm fires, or to deal with
        foaming of runways, are not taken into account. <em>— Annex 14 Vol I,
        §9.2</em></p>
      </blockquote>
      <p>This is about how the aerodrome's level of protection is <em>sized</em>.
      Nobody sized your water requirement for a terminal fire, and nobody is
      asserting that you are incapable of putting one out. It means the
      arithmetic in Table 9-2 contains no building-fire allowance — and an
      expectation that your service will absorb a terminal fire as a matter of
      course is an expectation the standard does not support.</p>

      <h3>The ordering that follows from all this</h3>
      <p>Doc 9137 Part 1 §14.6.1 draws the consequence in operational terms, and it
      is the sentence to read to anyone who thinks of this as a firefighting job:</p>
      <blockquote>
        <p>The service to be provided is primarily a lifesaving organization, one,
        however, that must be trained in firefighting because aircraft involved in
        a serious accident are frequently involved in fire. The firefighting
        operations must be directed to those measures which are necessary to permit
        rescue to be carried out until all the occupants of the aircraft are
        accounted for. <em>— Doc 9137 Part 1, §14.6.1</em></p>
      </blockquote>
      <p>Firefighting is the means. Rescue is the purpose. And the firefighting
      continues until <strong>all occupants are accounted for</strong> — not until
      the fire looks under control. That single sentence explains a great deal of
      behaviour that otherwise looks excessive: precautionary measures at incidents
      where no fire has broken out, continuing to apply agent after the visible
      fire is out, and treating "is everyone out?" as the question that governs
      rather than "is it out?".</p>

      <blockquote>
        <p><strong>SME action:</strong> confirm in your own service documents and
        aerodrome emergency plan how the §9.2 scope exclusion is expressed locally
        — specifically, what your service is expected to do about a building fire, a
        fuel farm fire, or a runway contaminated with foam. State it explicitly,
        because the exclusion in the Annex describes how the requirement is
        <em>sized</em>, and services have historically differed on what it means in
        practice.</p>
      </blockquote>
    `,
    refs: [
      'ICAO Annex 14 Vol I — §9.2 introductory note: objective, the three factors, and the scope exclusion',
      'ICAO Doc 9137 Part 1 — §14.6.1 the lifesaving objective and the ordering of firefighting to rescue',
      'Course ART-01 m3 — the clause structure of Chapter 9',
      'Course ART-09 — emergency command',
      'Your aerodrome emergency plan — scope and responsibilities'
    ],
    smeChecked: false
  },

  'art01-m2': {
    title: 'The document hierarchy',
    brief:
      'Five kinds of document, ranked — and a worked example showing that your ' +
      'State is entitled to be stricter than the Annex.',
    points: [
      'A Standard uses shall. A Recommended Practice uses should. A Note is informative only.',
      'A Standard binds Contracting States; impossibility of compliance triggers compulsory notification to ICAO under Article 38.',
      'A Recommended Practice is desirable, and States endeavour to conform — but a State may promote one to a requirement.',
      'Your national regulations are what bind you day to day, and they may exceed the Annex.',
      'Guidance material explains a standard; it cannot add to or subtract from it.',
      'An SOP may be more demanding than the requirement above it, never less.'
    ],
    body: `
      <h3>Learn the three verbs first</h3>
      <p>Before ranking anything, learn what the words mean. Annex 14 defines its
      own components, and the distinction is not academic — it decides whether
      something is mandatory or merely desirable.</p>
      <ul>
        <li>A <strong>Standard</strong> is a specification "to which Contracting
        States will conform in accordance with the Convention; in the event of
        impossibility of compliance, notification to the Council is compulsory
        under Article 38." Standards are written as <strong>shall</strong> or
        <strong>must</strong>.</li>
        <li>A <strong>Recommended Practice</strong> is one "to which Contracting
        States will endeavour to conform" — desirable in the interest of safety,
        regularity or efficiency. Recommended Practices are written as
        <strong>should</strong>.</li>
        <li>A <strong>Note</strong> is informative. It carries no requirement at
        all, and it is very common to find Notes containing the most operationally
        useful sentence in a clause.</li>
      </ul>
      <p>So when you read <em>Recommendation.—</em> at the start of a clause, you
      are reading something the Annex would like you to do. When you read a bare
      <em>shall</em>, you are reading something a Contracting State must
      conform to — or formally notify ICAO that it cannot.</p>

      <h3>The rank order, and where it is often got wrong</h3>
      <ol>
        <li><strong>ICAO Annex 14 Volume I, Chapter 9</strong> — the international
        standard. Binding on States, not directly on you.</li>
        <li><strong>Your national regulations</strong> — what actually binds you,
        and what you will be inspected against.</li>
        <li><strong>Guidance material</strong> — Doc 9137 Part 1 explains the
        standard and gives the working. It cannot add to or subtract from it.</li>
        <li><strong>Operator and aerodrome procedures</strong> — how it is done
        here.</li>
        <li><strong>Your judgement</strong> — what to do where the documents are
        silent.</li>
      </ol>
      <p>Most people instinctively put their national regulations <em>below</em> the
      Annex. That is wrong, and it is wrong in a way that costs you. A State
      implements the Annex through its own law, and it is entirely free to adopt a
      stricter figure than the international minimum. The Annex is a floor for
      States; your national regulation is the ceiling you work to.</p>

      {{video:faa-intro-1}}

      <h3>A worked example: the two-minute response time</h3>
      <p>This is the cleanest illustration available, because an international
      minimum and a national requirement are different numbers doing the same
      job.</p>
      <ul>
        <li><strong>Annex 14 §9.2.27</strong> is a Standard. The operational
        objective <em>shall</em> be a response time not exceeding
        <strong>three minutes</strong> to any point of each operational runway, in
        optimum visibility and surface conditions.</li>
        <li><strong>Annex 14 §9.2.28</strong> is a Recommended Practice. The
        objective <em>should</em> be not exceeding <strong>two minutes</strong> to
        any point of each operational runway.</li>
        <li><strong>GCAA CAR Part XI §10.1</strong> — the United Arab Emirates
        national regulation — says the operational objective <em>shall</em> be a
        response time not exceeding <strong>two minutes</strong> to any point of
        each operational runway, in optimum visibility and surface conditions.</li>
      </ul>
      <p>So the State took the Recommended Practice and made it a requirement. In
      that jurisdiction two minutes is not an ICAO minimum you are being asked to
      aspire to — it is the legal obligation, and the three minutes in §9.2.27 is
      <em>not</em> the target.</p>
      <blockquote>
        <p><strong>Note the jurisdiction.</strong> CAR Part XI in this lesson is
        the United Arab Emirates General Civil Aviation Authority document. It is
        used here because it is a clean, publicly available worked example of how
        a State adopts Annex 14 Chapter 9 — <em>not</em> because it is anybody's
        law but theirs. Your own State's instrument is the one that binds you, and
        the whole point of the example is that it need not match either the Annex
        or another State. Confirm your own before quoting a number.</p>
      </blockquote>
      <p>The same clause also shows why the definitions matter. Both Annex clauses
      measure response time in <em>optimum visibility and surface conditions</em>,
      and §9.2.29 Note 2 defines that precisely: daytime, good visibility, no
      precipitation, and a normal response route free of surface contamination such
      as water, ice or snow. A clause you cannot apply is not a softer clause — it
      is a clause you have to look up before you rely on it.</p>

      <h3>The rule that settles most arguments</h3>
      <p>No procedure may be <em>less</em> demanding than the requirement above it.
      It may be more demanding — a higher standard is always permitted. If you find
      a procedure that is less demanding than the standard or the regulation, that
      is a finding, and it should be raised through your safety reporting system
      rather than quietly followed or quietly ignored.</p>
      <blockquote>
        <p>Both "just follow the SOP" and "the SOP is wrong so I did it my way" are
        failures. The correct move is to report it and keep operating to the higher
        standard.</p>
      </blockquote>

      <h3>Nothing above you covers everything</h3>
      <p>Documents are written for the common case. The fifth item on the list is
      not a gap in the hierarchy — it is where a trained professional earns the
      qualification. The gap between "the plan does not cover this" and "nobody
      thought about this" is exactly where incidents live.</p>

      <blockquote>
        <p><strong>SME action:</strong> list the five document types for your own
        service, with the exact title, edition and issue date of each — including
        the version of Annex 14 and the issue of CAR Part XI you are working to.
        Then confirm your own response time objective in writing, and record which
        document sets it. If your service is meeting two minutes, say so with a
        number and a date rather than a reputation.</p>
      </blockquote>
    `,
    refs: [
      'ICAO Annex 14 Vol I — Foreword: Status of Annex components, the definitions of Standard and Recommended Practice',
      'ICAO Annex 14 Vol I — Article 38 notification of differences',
      'ICAO Annex 14 Vol I — §9.2.27, §9.2.28, §9.2.29 response time, and §9.2.29 Note 2 optimum conditions',
      'United Arab Emirates — GCAA CAR Part XI §10.1 response time (worked example of a State tightening the Annex)',
      'ICAO Doc 9137 Part 1 — Chapter 2, level of protection'
    ],
    smeChecked: false
  },

  'art01-m3': {
    title: 'Annex 14 Chapter 9, clause by clause',
    brief:
      'A structural tour against the real clause numbering, so you can find the ' +
      'answer in under a minute.',
    points: [
      'Chapter 9 is General, then Rescue and firefighting (§9.2), then disabled aircraft removal (§9.3) and wildlife hazard reduction (§9.4).',
      '§9.2 runs in a fixed order: application, level, agents, rescue equipment, response time, access roads, stations, communications, vehicles, personnel.',
      '"Do we have enough" and "will we get there" are different questions living in different clauses.',
      '§9.2.42 and §9.2.43 are the training clauses. They are short, they use "shall", and they bind.',
      'Almost every answer you will actually need is in §9.2.3 to §9.2.46.'
    ],
    body: `
      <h3>The shape of the chapter</h3>
      <p>Annex 14 Volume I Chapter 9 is "Rescue and Fire Fighting", and it has four
      parts:</p>
      <ol>
        <li><strong>§9.1 General</strong> — the emergency plan, plus provisions that
        sit outside §9.2. §9.1.16 is worth knowing in its own right: an assessment of
        the approach and departure areas <strong>within 1 000 m of the runway
        threshold</strong> should be carried out to determine the options available
        for intervention.</li>
        <li><strong>§9.2 Rescue and firefighting</strong> — the whole service, in
        forty-six clauses. This is where your answers are.</li>
        <li><strong>§9.3 Disabled aircraft removal</strong> — a different subject
        with its own requirements.</li>
        <li><strong>§9.4 Wildlife strike hazard reduction</strong> — again a
        separate subject.</li>
      </ol>

      <h3>Inside §9.2, in order</h3>
      <p>The internal order is deliberate, and it mirrors the order in which the
      questions actually get asked:</p>
      <ul>
        <li><strong>Introductory note</strong> — the objective, the three factors that
        decide outcomes, and the scope exclusion. Covered in lesson m1.</li>
        <li><strong>General</strong> — §9.2.1, the duty to provide the service at all.
        Its Note is important: an off-aerodrome fire station "is not precluded
        provided the response time can be met".</li>
        <li><strong>Application</strong> — §9.2.2, specialist rescue services where
        the aerodrome is close to water, swampy areas or difficult terrain and a
        significant portion of approach or departure operations takes place over
        them.</li>
        <li><strong>Level of protection to be provided</strong> — §9.2.3 to §9.2.7,
        with Table 9-1. This is where the aerodrome category comes from.</li>
        <li><strong>Extinguishing agents</strong> — §9.2.8 to §9.2.25, with
        Table 9-2. The longest section: agents, quantities, application rates,
        discharge rates, concentrate and complementary agents.</li>
        <li><strong>Rescue equipment</strong> — §9.2.26 to §9.2.28.</li>
        <li><strong>Response time</strong> — §9.2.29 to §9.2.30.</li>
        <li><strong>Emergency access roads</strong> — §9.2.31 onwards.</li>
        <li><strong>Fire stations</strong> — §9.2.37 and §9.2.38, including
        satellite fire stations "whenever the response time cannot be achieved from a
        single fire station".</li>
        <li><strong>Communication and alerting systems</strong> — §9.2.39 and
        §9.2.40.</li>
        <li><strong>Number of rescue and firefighting vehicles</strong> —
        §9.2.41 and its tabulation.</li>
        <li><strong>Personnel</strong> — §9.2.42 to §9.2.46.</li>
      </ul>

      <h3>The two questions that actually get asked</h3>
      <p>Nearly every question on shift is one of two, and they live in different
      halves of the section:</p>
      <ul>
        <li><strong>"Do we have enough?"</strong> — Level of protection and
        Extinguishing agents, §9.2.3 to §9.2.25 with Tables 9-1 and 9-2. The worked
        calculation is in Course ART-03.</li>
        <li><strong>"Will we get there, and in time?"</strong> — Response time,
        Emergency access roads and Fire stations, §9.2.29 to §9.2.38.</li>
      </ul>
      <p>Half the avoidable friction in a real incident comes from looking in the
      wrong half, because "are we allowed to stop pouring yet" is an operational
      question and its answer is not in the equipment tables.</p>

      <h3>The two personnel clauses worth reading in full</h3>
      <p>They are short, they are easy to skip, and they bind.</p>
      <blockquote>
        <p>All rescue and firefighting personnel shall be properly trained to perform
        their duties in an efficient manner and shall participate in live fire drills
        commensurate with the types of aircraft and type of rescue and firefighting
        equipment in use at the aerodrome, including pressure-fed fuel fires.
        <em>— Annex 14 Vol I, §9.2.42</em></p>
      </blockquote>
      <p>Note <em>shall</em>, and then note the last clause: <strong>pressure-fed
      fuel fires</strong> are named explicitly, and the accompanying Note explains
      that these are fires associated with fuel discharged under very high pressure
      from a ruptured fuel tank. Live fire drills must cover them.</p>
      <p>That is a specific, testable requirement, and it is one worth checking
      against your own live fire programme without assuming.</p>
      <blockquote>
        <p>The rescue and firefighting personnel training programme shall include
        training in human performance, including team coordination.
        <em>— Annex 14 Vol I, §9.2.43</em></p>
      </blockquote>
      <p>Also <em>shall</em>. Human performance and team coordination are not
      optional extras in an Annex Standard — they are a mandatory part of the
      training programme. The Note points to the Human Factors Training Manual
      (Doc 9683). Course ART-20 covers why that matters.</p>
      <p>Two more in the same run: §9.2.45 says the minimum number of personnel should
      be determined by a <strong>task resource analysis</strong>, with the level of
      staffing documented in the Aerodrome Manual. §9.2.46 requires all responding
      personnel to be provided with protective clothing and respiratory
      equipment.</p>

      <p>The opening section of the FAA training series sets out a comparable
      structure against the US regulatory equivalent. Useful as an overview even
      though the clause numbers will not match your State's.</p>

      {{video:faa-intro-prelude}}

      <blockquote>
        <p><strong>SME action:</strong> this lesson is written against Annex 14
        Volume I, edition 8/11/18. Confirm that against your controlled copy and
        record the edition you actually work to — clause numbering and thresholds
        move between editions, and a citation from the wrong edition is worse than
        no citation. Then check §9.2.42 specifically: does your live fire programme
        include pressure-fed fuel fires, and is it evidenced? If not, that is a
        finding against a Standard rather than a recommendation.</p>
      </blockquote>
    `,
    refs: [
      'ICAO Annex 14 Vol I — Chapter 9 structure, edition 8/11/18',
      'ICAO Annex 14 Vol I — §9.1.16 assessment within 1 000 m of the runway threshold',
      'ICAO Annex 14 Vol I — §9.2.42 live fire drills including pressure-fed fuel fires; §9.2.43 human performance',
      'ICAO Annex 14 Vol I — §9.2.45 task resource analysis; §9.2.46 protective clothing',
      'ICAO Doc 9683 — Human Factors Training Manual',
      'Course ART-03 — the water calculation, worked'
    ],
    smeChecked: false
  },
  'art01-m4': {
    title: 'Your role and accountability',
    brief:
      'Where you sit in the chain, what you personally owe, and the things ' +
      'that are easy to assume somebody else is handling.',
    points: [
      'Know every link of your command line by name and role title. Most responders can describe the firefighting and cannot describe the command line.',
      'Accountability is personal. "The service should have" is not a defence.',
      'You are individually accountable for your own readiness: currency, equipment checks, fitness, and your actions on an incident.',
      'Extraneous duties must not compromise your response. If they do, that is a finding, not a personal failing.',
      'Scene safety comes before the fire. An injured responder turns one incident into two.',
      'Know your own currency at all times without having to look it up, and know who to escalate to and how.'
    ],
    body: `
      <h3>The chain</h3>
      <p>Every service has a line: a station or crew, a watch or shift supervisor,
      an aerodrome duty manager, and the aerodrome operator. Learn every link by name
      and find out where your own service sits in it.</p>
      <p>This sounds like trivia until the moment it is not. The two questions that
      matter in the first ninety seconds are <em>who is in charge</em> and <em>who
      do I report to</em>, and a crew that cannot answer either is a crew that has
      already lost time it will never get back.</p>

      <p>The alerting side of this chain is covered properly in Course ART-18, and
      the airport emergency communications material below covers how notification
      actually works on a real aerodrome — the part almost never practised until it
      is needed.</p>

      {{video:faa-intro-5}}

      <h3>What you personally owe</h3>
      <p>Individual responders are usually personally accountable for their own
      readiness — their training currency, their equipment checks, their fitness,
      and their actions on an incident. Shift-level or organisational accountability
      rarely protects an individual who made an individual error.</p>
      <p>There is a regulatory version of this too. Annex 14 §9.2.44 recommends
      that during flight operations sufficient trained and competent personnel
      should be designated to be readily available to ride the rescue and firefighting
      vehicles and to operate the equipment <strong>at maximum capacity</strong>,
      deployed so that minimum response times can be achieved and continuous agent
      application at the appropriate rate can be fully maintained.</p>
      <p>Read the phrase "at maximum capacity". It means one operator per function,
      not one person doing three jobs at once. If your crew complement assumes a
      driver is also the turret operator, the requirement is not being met — and
      that is a staffing finding, not a crewwork problem to be solved harder.</p>

      {{video:faa-intro-4}}

      <h3>The duty that quietly eats your readiness</h3>
      <p>Here is a real one, and it catches experienced crews. If operational crew
      are engaged on extraneous duties — sweeping, bird control, surface inspections
      and the like — <strong>they must still be capable of meeting response times
      while carrying out those duties</strong>, and no extraneous duty should create
      conditions likely to affect individual or crew performance or introduce
      additional hazards.</p>
      <p>In the worked example national regulation that phrasing appears in GCAA CAR
      Part XI §13.3 (United Arab Emirates, used here as an illustration of the
      principle rather than as your law). The same clause is worth reading for what
      it implies in practice:</p>
      <ul>
        <li>Being two hundred metres up a taxiway inspecting a light is not a neutral
        act. It is a subtraction from your response.</li>
        <li>If you are asked to absorb duties that break those conditions, the honest
        response is to say so with a number, not to absorb them quietly.</li>
        <li>And the people who should hear that are your supervisors and your safety
        reporting system, not just the person who asked.</li>
      </ul>

      <h3>Supervision is part of the arithmetic</h3>
      <p>The same regulation is unusually direct about supervisory grades, and the
      point generalises well beyond one jurisdiction. Minimum staffing must include
      an adequate number of competent supervisors and managers <strong>reflecting
      the appropriate command structure</strong>, and the competence of supervisors
      and managers in the roles applicable to their position has to be taken into
      account when that level is set.</p>
      <p>Then the sentence that is worth remembering: where the available staff
      display limited capacity to use initiative, that deficiency must be made good
      by the provision of additional staff of a <strong>superior grade</strong> who
      will be responsible for exercising command.</p>
      <p>That is a regulator saying out loud that command is a resourcing decision,
      not a personality one. If your relief is thin, the answer is more senior
      staffing, not better briefing.</p>
      <p>Two related provisions from the same worked example: the agreed minimum
      staffing level <strong>shall not be reduced without an assessment being
      conducted and forwarded in writing for acceptance</strong>; and where the
      authority considers the minimum staffing provided inappropriate for the level
      of aircraft operation, it will assess and set the minimum itself. The floor on
      your staffing is not entirely yours to choose.</p>

      <h3>How the number is arrived at</h3>
      <p>It is not a headcount. Annex 14 §9.2.45 says the minimum number of
      personnel should be determined by a task resource analysis, with the level
      of staffing documented in the Aerodrome Manual. If you cannot point to the
      page of the manual that documents your staffing, that is the first gap to
      close.</p>
      <p>The worked example regulation in the previous lesson names the factors
      that assessment must take into account, and they are the honest answer to
      "why do we carry that number": the types of aircraft using the aerodrome;
      response times; the type, design, capacity and discharge rate of the
      appliances to be deployed; the need to rescue aircraft occupants; the need to
      operate ladders, breathing apparatus and rescue equipment; availability of
      water supplies; the speed and scale of response of any mutual aid agency; and
      the competency levels of all staff.</p>
      <p>Those are the inputs. They are not the method.</p>

      <h3>The method, in six phases</h3>
      <p>A genuinely worked example of how a task resource analysis is actually
      carried out comes from the United Kingdom — CAA CAP 1150, Information Paper
      04, <em>Task and Resource Analysis</em> (January 2014). It is a UK document
      and it does not bind you, but it is the clearest public description of the
      method, so the shape is worth knowing.</p>
      <p>The definition it works from is the one that makes the whole exercise
      honest: the analysis identifies the minimum number of personnel required to
      undertake the identified tasks <strong>in real time before supporting
      external services are able to effectively assist</strong>. Note the words.
      Mutual aid is not subtracted from your requirement, because a mutual aid
      appliance arriving at eight minutes is not a resource for the first eight
      minutes. Everything in the analysis happens before help arrives.</p>

      <p>The six phases, and what each one actually produces:</p>
      <ol>
        <li><strong>Write the aim and the task list.</strong> Not a headcount —
        a statement of what the service exists to do, followed by the tasks. The
        published example lists them plainly: meet the required response time;
        extinguish an external fire; protect escape slides and exit routes; assist
        in the self-evacuation of the aircraft; create a survivable situation;
        rescue trapped personnel; maintain post-fire security and control; and
        preserve evidence. Every task needs somebody doing it, and the task list is
        where the arithmetic starts.</li>
        <li><strong>Choose credible worst-case accidents.</strong> Selected from
        statistical analysis of previous accidents, drawing on international,
        national and local data. One constraint worth noting: <strong>all incidents
        should involve fire</strong>, because a feasible worst case has to be one
        that genuinely requires the service you have.</li>
        <li><strong>Identify the aircraft types.</strong> Grouped by common
        configuration rather than by tail number — a long wide-body with multiple
        decks and aisles is a different rescue problem from a single-aisle
        high-density narrow-body, and the configuration is what drives the
        resource, not the registration.</li>
        <li><strong>Identify the worst location.</strong> This is the phase most
        services skip and the one that finds the real answer, because your fastest
        station is not necessarily the station that covers your worst case. A team
        of experienced personnel who know the aerodrome scores candidate locations
        against response time, route to the site, terrain, runway crossing
        procedures, congestion on route, surface conditions, communications,
        supplementary water supplies, adverse weather and low-visibility procedures,
        and whether it is day or dark. <strong>An additional time delay is
        estimated and recorded for each factor, and the location with the highest
        additional response time is the worst case.</strong> That is a number, and
        it is auditable.</li>
        <li><strong>Correlate accident type, aircraft and location</strong> into
        complete scenarios, agreed with the operator, the facilitator and, where
        necessary, the regulator.</li>
        <li><strong>Build the timeline.</strong> This phase is run as a
        <strong>series of tabletop exercises or simulations</strong>, with a TRA
        facilitator working with teams of experienced airport supervisors and
        firefighters — not written at a desk. The scenarios are walked second by
        second: receipt of the call, donning, turnout, route, arrival, positioning,
        agent application, entry, rescue, evacuation, and the point at which
        external services arrive. Who is committed to what, at what time.</li>
      </ol>
      <p>The result is recorded in a table or spreadsheet laid out so that it
      answers six questions without anybody having to ask: the receipt of the
      message and the dispatch of the response; the time, which <strong>starts at
      the initial receipt of the call and continues until additional external
      resources arrive</strong> or the facilitator ends it; the list of assessed
      tasks, functions and priorities achieved; the resources — personnel, vehicles
      and equipment — required for each task; comments for team members to record
      findings; and the pinch points identified. If your analysis does not produce
      that artefact, you have produced an opinion.</p>

      <h3>Pinch points</h3>
      <p>The reason the timeline is built second by second rather than summarised
      is to find <strong>pinch points</strong> — the moments where the work
      required exceeds the people available. A pinch point is not a slow patch. It
      is a specific clock time at which somebody is needed in two places, and it is
      the only objective basis on which you can say your crew complement should
      be a larger number.</p>
      <p>But a pinch point is a <em>question</em>, not automatically a finding, and
      the worked example in the published analysis is instructive because of how it
      was closed. A potential pinch point was identified with two named
      firefighters. The conclusion was that the tasks they were performing were
      nevertheless achievable, because those same two were already using a foam
      hand line to maintain the evacuation route and were maintaining post-fire
      control. That was recorded as a logical and achievable process for that
      crew.</p>
      <p>So the discipline is two questions, in order. First: is a person needed in
      two places at the same clock time? Second: are the competing tasks actually
      compatible, or merely assumed to be? The first is arithmetic. The second is
      judgement, and it is the one that gets skipped — and skipping it in the
      optimistic direction is how a crew complement becomes a fiction.</p>
      <p>Read the whole thing back the other way, because it is the uncomfortable
      direction too: if a service cannot identify a pinch point in its worst-case
      scenario, the honest conclusion is not that the staffing is adequate but that
      the scenario was never really worked through. A TRA that produces no pinch
      points usually means the analysis stopped before Phase 6.</p>

      <h3>What the method is not</h3>
      <p>Two warnings from the same source, both worth having, because both are
      common failure modes.</p>
      <p><strong>Do not reach for the arithmetic first.</strong> A quantitative
      risk assessment can support the conclusion, expressing risk reduction in
      lives saved and even in monetary terms — but the published guidance is blunt
      that this is <em>of little, if any, value in determining minimum levels of
      personnel</em>. The number comes from the qualitative analysis of what people
      must actually do, in real time. A spreadsheet that prices risk but never
      opens the timeline is not a task resource analysis.</p>
      <p><strong>Do not leave the human factors out.</strong> The analysis is
      supposed to observe human factor principles to obtain optimum response:
      workload, capabilities, functions, decision aids, environmental constraints,
      team versus individual performance, training effectiveness, skill levels,
      organisational structure, safety systems and protective equipment — and
      <strong>fatigue and the need for adequate relief</strong>. A crew that is
      theoretically sufficient at 03:00 on night four of a shift pattern is not
      sufficient. The relief is part of the minimum, not an addition to it.</p>
      <p>And one practical point that catches services out. If your service also
      attends structural fires and road traffic accidents, the analysis must take
      due regard to <strong>the inability of not meeting required response
      times</strong>, and robust procedures have to be introduced to cover the gap
      that creates. Adding the commitment does not add the crew; something has to
      give, and it had better be a written decision rather than an incident.</p>

      <h3>The one-sentence version</h3>
      <p>If your response time is three minutes and the crew that arrives cannot
      both apply agent at the required rate and get a rescue team into the aircraft
      in that window, you have found your pinch point — and that number, not
      anybody's preference, is the size of your operational crew.</p>

      <h3>Scene safety comes before the fire</h3>
      <p>Before anything else: who is hurt, what is falling, what is about to
      happen. An injured second responder turns one incident into two, and the
      second one is entirely self-inflicted.</p>
      <p>The personnel-safety material in the FAA series below is worth watching
      before you are standing at an aircraft with an engine running.</p>

      <blockquote>
        <p><strong>SME action:</strong> put your service's actual reporting line,
        role titles and escalation numbers into this lesson. Then check three
        things: is your staffing level documented in the Aerodrome Manual and
        supported by a task resource analysis? Is your supervisory complement
        sufficient for the command structure you actually run? And is anyone on your
        shift routinely performing extraneous duties in a way that would breach
        response time if the alarm sounded? That last one is worth asking plainly,
        because the answer is usually "only slightly" and "only slightly" is a real
        number.</p>
      </blockquote>
    `,
    refs: [
      'ICAO Annex 14 Vol I — §9.2.44 sufficient trained and competent personnel, equipment at maximum capacity',
      'ICAO Annex 14 Vol I — §9.2.45 task resource analysis and staffing documented in the Aerodrome Manual',
      'United Arab Emirates — GCAA CAR Part XI §13.3 extraneous duties, §13.5 the staffing factors, §13.7 no reduction without an accepted assessment, §13.8 supervisory grades, §13.9 authority-set minimum (worked example of principle, not your law)',
      'United Kingdom — CAA CAP 1150, Information Paper 04, Task and Resource Analysis (January 2014): the six-phase method, pinch points, the limitation of quantitative risk assessment, and human factors including fatigue and relief (a method illustration; not a binding requirement)',
      'Your national Civil Aviation Authority instrument — confirm the equivalent requirements that bind you',
      'Your aerodrome manual — the page documenting your staffing level and the task resource analysis behind it',
      'Course ART-09 m1 — the agreed command framework that the analysis assumes',
      'Course ART-08 — training and competency records'
    ],
    smeChecked: false
  },
  'art01-m5': {
    title: 'Finding the answer',
    brief:
      'Method, so that a question under pressure does not become a guess — and ' +
      'how to find the one document that actually binds you.',
    points: [
      'Sort the question first: what does the standard require, or what should we do here? They need different methods.',
      'Your national Civil Aviation Authority instrument is what binds you. Annex 14 and Doc 9137 do not.',
      'Find and record your own binding instrument, its title, its issue number and its date. Without all three you cannot cite it defensibly.',
      'The worked example here is GCAA CAR Part XI (United Arab Emirates), chosen because it is a clean public illustration of adoption mechanics. It is not your law unless it is.',
      'A worked example can be tighter than the Annex in specific places — check, do not assume.',
      'When the documents are silent, silence is neither permission nor prohibition. State your assumptions and your decision.',
      'If the answer is not in the documents, that is a finding worth reporting.'
    ],
    body: `
      <h3>Two kinds of question</h3>
      <p>Almost every question you will be asked splits cleanly in two. Sorting them
      first saves most of the time:</p>
      <ul>
        <li><strong>"What does the standard require?"</strong> — There is a right
        answer and it is written down. Find it, cite it, act.</li>
        <li><strong>"What should we do here?"</strong> — There may be no written
        answer. Decide, state your assumptions, state the decision, and be able to
        justify it.</li>
      </ul>

      <h3>Start by finding your own binding instrument</h3>
      <p>Everything else follows from this. Your national Civil Aviation Authority
      publishes an instrument — a regulation, a rule, a CAR part, an advisory circular
      — that <em>implements</em> Annex 14 Volume I Chapter 9 for your jurisdiction.
      That document is what you are inspected against. Annex 14 and Doc 9137 are how
      you understand it; they do not replace it.</p>
      <p>Record four things, and keep the record where a crew member can find it:</p>
      <ol>
        <li>the exact title of the instrument;</li>
        <li>the issuing authority;</li>
        <li>the <strong>issue number and date</strong> — these matter, because these
        documents are revised;</li>
        <li>the section numbers that cover RFF, as a map.</li>
      </ol>
      <p>Three of those four are absent from most copies people actually keep, and
      all three are what an inspector asks for first.</p>

      <h3>A worked example, and what it is for</h3>
      <p><strong>GCAA CAR Part XI — Aerodrome Emergency Services, Facilities and
      Equipment</strong> is a good teaching example, and this platform uses it for
      that reason. It is issued by the General Civil Aviation Authority of the
      <strong>United Arab Emirates</strong>, and its own amendments history records
      that it was introduced "based upon ICAO Annex 14". It therefore shows, clause
      by clause, what it looks like when a State takes Chapter 9 and turns it into
      domestic law.</p>
      <p>It is not, however, anybody's law but the UAE's. It is quoted here as a
      worked example of adoption mechanics — and the mechanics are the transferable
      part, not the numbers.</p>
      <p>Its section map is instructive because it maps so closely onto Annex 14
      Chapter 9:</p>
      <ul>
        <li>level of protection to be provided (RFFS category); extinguishing agents;
        storage of extinguishing agents; training foams;</li>
        <li>rescue and fire-fighting appliances; foam production systems; rescue and
        fire-fighting equipment; protective clothing and respiratory equipment;</li>
        <li>response time; fire station; alerting and communications systems;</li>
        <li>minimum number of RFF personnel; training and development;</li>
        <li>difficult environs, the 1 000 metre area and access roads; water rescue
        facilities; maintaining response capability in low visibility
        conditions;</li>
        <li>aerodrome emergency plan; use of 'zoning' to effect overall control at an
        accident site; airport Silver Command Centre (tactical level); airport Bronze
        Command (operational level); specialist equipment and procedures; medical
        equipment; search and rescue coordination centres; maps.</li>
      </ul>
      <p>Three things a reader should notice in that map. It has a section on the
      <em>aerodrome emergency plan</em> as a discrete obligation, not an implied one.
      It has three consecutive sections on on-site command — zoning, Silver, Bronze.
      And it treats the staffing question with its own instrument, requiring a Task
      Resource Analysis completed for acceptance by the authority. Those are
      structural choices, and they are the kind of thing worth asking your own
      authority about.</p>
      <p>One warning that matters more than it looks: that document carries the words
      <strong>"UNCONTROLLED COPY WHEN DOWNLOADED — check with GCAA website to verify
      current version before using"</strong> on its first page. Treat any copy you
      have found yourself as a working aid, not as the law. This is a common pattern
      in aviation regulation documents and you should look for the same warning on
      your own.</p>

      <h3>Where a national instrument is tighter than the Annex</h3>
      <p>Reading a national instrument against Annex 14 Chapter 9 side by side is
      genuinely useful, because some clauses have been tightened — and a
      half-remembered Annex figure is then the wrong answer. Three examples from the
      worked example, offered as illustrations of the <em>kind</em> of tightening to
      look for:</p>
      <ul>
        <li><strong>Response time.</strong> Annex 14 §9.2.27 sets a Standard of three
        minutes and §9.2.28 a Recommended Practice of two. CAR Part XI §10.1 says the
        objective <em>shall</em> be two minutes — the Recommended Practice promoted
        to a requirement.</li>
        <li><strong>Category determination.</strong> CAR Part XI §2.3 provides that if
        an aeroplane's fuselage width is greater than the maximum in column 3 of
        Table 1 for the category selected on overall length, <strong>then the
        category for that aeroplane shall actually be one category higher</strong>. A
        wide-body can push you up a category on width alone.</li>
        <li><strong>Reduced activity.</strong> CAR Part XI §2.4 requires that during
        anticipated periods of reduced activity the level of protection available
        shall be no less than that needed for the highest category of aeroplane
        planned to use the aerodrome during that time, <em>irrespective of the
        number of movements</em>. Annex 14 §9.2.3 allows a reduction below the
        determined category where movements fall below 700 in the busiest
        consecutive three months. If you are used to the Annex reading, a rule like
        this will catch you.</li>
      </ul>
      <p>And CAR Part XI §2.5 to §2.7 add procedural duties around any change in the
      level of protection normally available: it must be notified to air traffic
      services and aeronautical information units so they can brief arriving and
      departing aircraft, by radio and NOTAM; the RFFS Inspector of the authority's
      responsible department must be advised at all times; and aerodromes should
      develop contingency plans to limit the need for such changes in the first
      place.</p>
      <p>That last one is the useful pattern to steal regardless of jurisdiction.
      Where a State requires you to <em>reduce</em> protection for any reason, good
      regulation tends to require you to have a plan for not needing to.</p>

      <h3>When the documents are silent</h3>
      <p>Silence is not permission and it is not prohibition. It means the decision is
      yours. Make it explicitly, write down what you assumed, and report it afterwards
      so the next responder inherits a better document. That last step is the one
      people skip, and it is the step that turns a responder into a service that
      improves.</p>

      <h3>Coming up in this series</h3>
      <p>The FAA series closes with an overview of the whole response picture — airport
      familiarisation, aircraft familiarisation, equipment, agents, evacuation and
      operations, in sequence. Worth watching once end to end before you work through
      the individual topics, because it is the only place they are joined up. Read it
      as US 14 CFR Part 139 material, which is a different jurisdiction from every
      other source in this course.</p>

      {{video:faa-intro-11}}

      <blockquote>
        <p><strong>SME action:</strong> replace this lesson's worked example with
        your own. Record the exact title, issuing authority, issue number and issue
        date of the instrument that binds you, and the section numbers covering RFF.
        Then list every place it is <em>stricter</em> than Annex 14 Chapter 9 — the
        three above are the kind of thing to look for, and your reading may find
        more. Finally, write down where a crew member should physically or
        electronically go to look up a requirement in under a minute, and make sure
        everyone on shift knows. If you have no controlled copy of your national
        instrument, raising that with your authority is the first action item out of
        this whole course.</p>
      </blockquote>
    `,
    refs: [
      'Your national Civil Aviation Authority instrument implementing Annex 14 Vol I Chapter 9 — title, issue number, date, and section map',
      'United Arab Emirates — GCAA CAR Part XI, Aerodrome Emergency Services, Facilities and Equipment, Issue 04 (worked example of adoption mechanics, not South African or any other law)',
      'United Arab Emirates — GCAA CAR Part XI §2.3, §2.4, §2.5 to §2.7 level of protection and category determination',
      'United Arab Emirates — GCAA CAR Part XI §10.1 response time',
      'United Arab Emirates — GCAA CAR Part XI sections on training, zoning, Silver and Bronze command',
      'ICAO Annex 14 Vol I — §9.2.3, §9.2.27, §9.2.28 for comparison',
      'ICAO Annex 19 — Safety Management, hazard identification and reporting'
    ],
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
      'A crew complement is not just a number of bodies. Some of those posts ' +
      'exist specifically to command, and a crew with nobody in them has no plan.',
    points: [
      'Command is a post, not a personality. Instigating the incident command structure is a listed duty, not an optional extra.',
      'Task resource analysis assumes an agreed command framework exists — you cannot staff an undefined command.',
      'Watch commander, crew commander, firefighter: three different jobs, and any of them can be handed to you without warning.',
      'Command is established, never assumed. If nobody has said who is in charge, nobody is.',
      'The first person on scene commands until properly relieved. That is a duty, not a courtesy.',
      'Relief of the commander must be said out loud and acknowledged back.',
      'The incident commander needs a channel to other agencies on a separate frequency from your own.'
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
      and assisting evacuation. It is not something that happens after the real work
      starts.</p>

      <h3>You cannot staff a command you have not defined</h3>
      <p>There is a link here that is easy to miss and expensive to get wrong. The
      task resource analysis — the analysis that justifies your minimum staffing
      level — <strong>assumes a command framework already exists</strong>. §10.5.2
      requires a qualitative risk-based analysis of what your crew must achieve
      <em>in real time before supporting external services are able to
      effectively assist</em>, and §10.5.2.1 then says that <strong>the importance of
      an agreed framework for incident command should form a primary part of the
      considerations</strong>.</p>
      <p>Read that as a sequence. You work out how many people you need by asking
      what has to be done in the first minutes. Those tasks are tasks rather than
      chores because somebody is organising them. So the command framework is an
      input to the staffing number, not a decoration applied afterwards.</p>
      <p>The practical consequence: a service that has never agreed its command
      framework cannot produce a defensible staffing justification, and a service
      that has agreed one can show its arithmetic. This is the same finding as the
      one in Course ART-01 m4 — the staffing number and the command structure are
      the same question.</p>

      <h3>Three levels, and they are not interchangeable</h3>
      <ul>
        <li><strong>Watch commander</strong> — accountability for the service as it
        stands on this shift. Holds the readiness decision before an incident exists.</li>
        <li><strong>Crew commander</strong> — commands a defined crew, or a defined
        part of the scene. The person who decides where your vehicle stops and what
        your crew does on arrival.</li>
        <li><strong>Firefighter</strong> — owns a task, an appliance and the safety of
        the people doing it.</li>
      </ul>
      <p>Every one of those is a job you can be handed without warning. The crews
      that perform well are the ones where people have rehearsed taking a command
      post they do not normally hold.</p>

      <h3>Establishing and handing over command</h3>
      <p>Command has to be stated. The failure mode is not a bad commander — it is
      two people each assuming the other has it, on a scene where nobody can see the
      whole picture. State it, confirm it, and when command transfers, say who is
      taking over and get an acknowledgement back.</p>
      <p>Whoever arrives first is the commander until relieved. That is a duty, and
      discharging it well is what earns you the post next time.</p>
      <p>And there is a precondition worth knowing, because it explains why command
      feels shaky early in an incident. §14.6.1 puts it this way: compliance with
      the initial action has to become <strong>instinctive</strong> before the
      officer-in-charge is in a position to assume complete control of the
      situation. Command cannot be bolted on top of a crew that has not yet made its
      first actions automatic. The authority follows the readiness.</p>

      <h3>A worked structure from one national regulation</h3>
      <p>Command frameworks are not universal, and this is worth saying plainly
      because crews often arrive from services that did it differently. GCAA CAR
      Part XI — the United Arab Emirates instrument, offered here as a public
      illustration rather than as your law — devotes three consecutive sections to
      on-site command, which makes the shape unusually easy to see:</p>
      <ul>
        <li><strong>Zoning</strong>, used to effect overall control at an accident
        site.</li>
        <li><strong>Airport Silver Command Centre</strong>, at tactical level.</li>
        <li><strong>Airport Bronze Command</strong>, at operational level.</li>
        <li>A <strong>Mobile Command Post</strong> providing an operational scene
        rendezvous point, which must be clearly identifiable to all attending
        responders — by a red and white chequered flag, or a mast elevated red
        strobe light for night operations.</li>
      </ul>
      <p>Two things to take from that rather than copy. First, the <em>tactical</em>
      and <em>operational</em> levels are separated, which is a general principle
      even where the labels differ: somebody thinks ahead, somebody runs the
      incident, and confusing the two is a common failure. Second, the rendezvous
      point is made physically identifiable, which is a cheap and effective answer
      to the question every arriving crew has: <em>where do I report to?</em></p>

      <h3>One channel is not enough</h3>
      <p>Doc 9137 §12.3.21 puts it plainly: <strong>the Incident Commander should
      have the ability to communicate with other agencies on separate
      frequencies</strong> during the incident. Radios should have enough channels to
      operate on to allow the necessary command and support functions.</p>
      <p>That is not equipment trivia. It is the reason the commander can think
      without filtering every word through your internal traffic. Keep the channels
      separate.</p>

      <blockquote>
        <p><strong>SME action:</strong> insert your aerodrome's actual
        establishment — post titles, who holds them on each shift, and the relief
        arrangements. Then answer two harder questions. Is your command framework
        documented well enough that it was an input to your staffing justification,
        rather than written afterwards? And can a crew arriving from outside find
        your command post in under a minute, day or night?</p>
      </blockquote>
    `,
    refs: [
      'ICAO Doc 9137 Part 1 — §10.5.2 and §10.5.2.1 Task Resource Analysis and the agreed command framework',
      'ICAO Doc 9137 Part 1 — §12.3.21 the incident commander and separate frequencies',
      'ICAO Doc 9137 Part 1 — §14.6.1 instinct before command',
      'ICAO Doc 9137 Part 1 — crew complement tables in the level and equipment provisions',
      'United Arab Emirates — GCAA CAR Part XI sections on zoning, Silver and Bronze command, and the Mobile Command Post (worked example of one framework)',
      'Your aerodrome emergency plan — organisation and establishment',
      'Course ART-01 m4 — accountability, supervision and the staffing arithmetic'
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
      'ICAO Doc 9137 Part 1 — §12.3.25 size-up: what is happening, what is about to happen, what needs to be done',
      'ICAO Doc 9137 Part 1 — §12.3.21 emergency communications, channels, intercom with the flight deck, and direct voice contact with the crew',
      'ICAO Doc 9137 Part 1 — §12.3.22 the limits of visual appraisal and the use of thermal imaging',
      'ICAO Annex 14 Vol I — §9.2.39 a discrete communication system linking stations, tower and vehicles',
      'Your aerodrome emergency plan — communications, call signs and channel plan',
      'Course ART-18 m1 — the alerting system, and where the response clock starts',
      'Course ART-18 m2 — radio discipline'
    ],
    smeChecked: false
  },
  'art09-m3': {
    title: 'Unified command',
    brief:
      'Most incidents outgrow the fire service quickly. The hard part is deciding ' +
      'who decides what.',
    points: [
      'The pilot-in-command makes the final determination on evacuation, with input from the RFF incident commander.',
      'If the air crew cannot function, RFF initiates the necessary action. That transfer has to be said out loud.',
      'RFF personnel must not impede an evacuation or enter the fuselage once one is initiated — you assist, you do not enter.',
      'The commander needs a separate channel to other agencies, not a shared one.',
      'Unified command is not a committee. Somebody must still decide, at a named moment.',
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
      Silence from RFF is not neutrality; it removes information the pilot is
      entitled to and is relying on.</p>
      <p>And there is a specific reason RFF should be reporting rather than quiet,
      given in §12.3.27: <strong>an unnecessary evacuation may be prevented</strong>
      by RFF personnel communicating with the flight crew on the appropriate
      frequency and giving them a report on exterior conditions. Most engine,
      wheel assembly and other minor exterior emergencies can be controlled by RFF
      personnel without requiring an evacuation. An unnecessary evacuation can
      injure the evacuees.</p>
      <p>Then the reason to be careful about all of it: <strong>once an evacuation
      is initiated it cannot be stopped</strong>. That single asymmetry — the
      decision is cheap to make and impossible to undo — is why the appraisal you
      give in the first ninety seconds carries so much weight.</p>

      <h3>The failover</h3>
      <p>The guidance also provides for the case where the air crew are unable to
      function. In that event, RFF personnel are responsible for initiating the
      necessary action. Protection of the operation is the primary responsibility of
      the RFF service throughout.</p>
      <p>That is a significant transfer of responsibility, and it is exactly the
      kind of thing that goes wrong when nobody has said out loud that it has
      happened. Practise stating it — literally the words, not the meaning.</p>

      <h3>What RFF does once evacuation is under way</h3>
      <p>There is a discipline here that new crews get wrong by being helpful. RFF
      personnel should <strong>not impede the evacuation and should not attempt to
      enter the fuselage</strong>, but instead provide assistance and be prepared to
      assist those not capable of self-evacuation.</p>
      <p>Read that sequence carefully. Not impede. Do not enter. Provide assistance.
      The instinct to get in there and help is exactly the instinct that turns a
      survivable evacuation into a casualty list, and the manual is written to
      restrain it. If you are about to enter a fuselage with occupants still
      evacuating, you have misread your task.</p>

      <h3>Unified is not the same as shared</h3>
      <p>Once police, medical, security, the operator and mutual aid are on scene,
      you have several competent authorities with different statutory duties. Unified
      command reconciles them; it does not dissolve them. Somebody still has to say
      "we are withdrawing" at a specific moment, and that person is not a
      committee.</p>
      <p>Doc 9137 §12.3.21 requires that the incident commander can communicate with
      other agencies on separate frequencies. Keep them separate. Inter-agency radio
      is for coordination, not for your own internal traffic.</p>
      <p>Most aerodromes that do this well separate two levels explicitly. Somebody
      thinks ahead and sets objectives; somebody runs the incident and allocates
      tasks. One national regulation makes that separation statutory, with a
      tactical-level command centre and an operational-level command as distinct
      entities — see the worked structure in lesson m1. Whatever your labels are,
      the question is whether there is a named person thinking ahead and a named
      person running it, and whether they are the same person on a quiet shift and
      different people on a big one.</p>

      <h3>The incident command board</h3>
      <p>One practical artefact worth borrowing, because it is cheap and it is the
      thing that makes a command record possible: an <strong>Incident Command
      Board</strong>. In the worked example regulation, the planning and recording
      of the plan is described as essential to a fluid and achievable operations
      objective, and the board is used to keep up-to-date information on casualties
      and rescues, for operational briefings to other responders, and as an
      incident aid listing required actions at an aircraft incident.</p>
      <p>All four uses matter and only the first is obvious. A whiteboard with
      columns for units, tasks, casualties and hazards does something a radio
      channel cannot: it makes the shared picture <em>visible</em>, so a crew
      arriving at the command post can read the current state in three seconds
      instead of asking three questions.</p>
      <p>And the conclusion in the same document is the right note to end on: the
      Airport Incident Commander <strong>does not, and should not, work alone</strong>.
      The need for effective team performance on the incident ground remains vital,
      and only by a careful assessment of the accident site can the hazards and
      risks be limited and the area controlled.</p>

      <h3>Settle it before the incident</h3>
      <p>Who commands, who advises, who is told — and on what trigger authority
      passes between services. Doc 9137 points to those in charge determining
      matters in accordance with previous mutual aid arrangements. The operative
      word is <em>previous</em>. Anything being decided for the first time during an
      incident is being decided too late.</p>

      <blockquote>
        <p><strong>SME action:</strong> insert your mutual aid agreements and the
        point at which authority transfers between services. Confirm the local
        position on evacuation authority, since this lesson follows ICAO and your
        State's requirements may differ. Then check three things physically: is
        there a command post, is it identifiable in daylight and at night, and is
        there something on it that shows the current shared picture to a crew who has
        just arrived?</p>
      </blockquote>
    `,
    refs: [
      'ICAO Doc 9137 Part 1 — §12.3.26 and §12.3.27 evacuation determination, the RFF report, and the consequences of an unnecessary evacuation',
      'ICAO Doc 9137 Part 1 — §12.3.21 the incident commander and separate frequencies',
      'ICAO Doc 9137 Part 1 — Chapter 12, inter-agency coordination and previous mutual aid arrangements',
      'United Arab Emirates — GCAA CAR Part XI on zoning, Silver and Bronze command, the Mobile Command Post and the Incident Command Board (worked example)',
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
      'Tactical decision-making starts when the alert tone sounds, not when you arrive. It continues en route and on approach.',
      'A documented tactical plan for positioning, known to every responder and practised, is expected — three obligations, and most services satisfy one.',
      'The first vehicle on scene establishes the route for everyone behind it.',
      'The incident commander decides, as part of size-up, whether the plan needs changing.',
      'Positioning must preserve egress, a way out for reflash, and turret coverage.',
      'After the rescue, the accident site and the dead are subject to their own rules. Do not disturb either without authority.',
      'An undocumented plan is not a plan.'
    ],
    body: `
      <h3>The clock starts at the alert, not at the scene</h3>
      <p>The most useful sentence in §12.3.25 is about timing, and it changes how
      the whole course feels: <strong>tactical decision-making starts at the time
      when the alert tone is sounded</strong> and continues to be made both while
      en route and during initial approach to the scene.</p>
      <p>So you are not waiting to think. Size-up — what is happening, what is
      about to happen, what needs to be done — and the correct tactics are being
      worked out in the vehicle, in the minutes before you can see anything. That
      is why the plan has to be automatic. You cannot begin thinking on arrival,
      because you will already have committed yourself to an approach.</p>

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
      the whole incident. This is why the plan has to be automatic, and why the
      first crew departs from it only for a reason they can state out loud.</p>

      <h3>Who decides to change it</h3>
      <p>It is not the arriving crew, and it is not a matter of individual
        initiative. §12.3.25 is explicit: <strong>as part of the size-up process the
        incident commander would decide whether the tactical plan needs
        changing</strong>.</p>
      <p>That is a small clause with a large effect on crew behaviour. The first
      vehicle to arrive should be reporting what it sees and requesting a decision,
      not announcing one. If your crews routinely re-position themselves on arrival
        because they can see something the plan did not anticipate, that is a
        command problem — and it is also, read more generously, a signal that the
        plan needs updating.</p>

      <h3>The positioning priorities</h3>
      <ul>
        <li><strong>(a)</strong> Approach the scene with extreme caution. Watch for
        evacuating occupants, wreckage debris, fuel ponding and other hazards. Avoid
        driving through any smoke which obscures your vision and potential
        evacuees'. Avoid driving over any aircraft wreckage.</li>
        <li><strong>(b)</strong> Consider terrain and slope, and the direction of the
        wind before entering. Attempt to position uphill and upwind to avoid fuel and
        vapours, which tend to gather in low-lying areas.</li>
        <li><strong>(c)</strong> Do not block the entry or exit areas which emergency
        vehicles may need to use.</li>
        <li><strong>(d)</strong> Initial position of vehicles should be to protect
        egress routes of evacuating aircraft occupants.</li>
        <li><strong>(e)</strong> Ideally, position so vehicles can be repositioned in
        the event of reflash, or on direction of the incident commander.</li>
        <li><strong>(f)</strong> Position so turrets can cover a maximum amount of the
        aircraft fuselage.</li>
        <li><strong>(g)</strong> The incident commander should consider what is
        happening, what is about to happen, and what to do to preserve life and
        property.</li>
        <li><strong>(h)</strong> Give consideration to preserving the accident
        site.</li>
      </ul>
      <p>Read (d) against (f). Protecting egress comes before covering the
      fuselage. If you are covering fuselage you are choosing not to protect an exit
      route, and that is a defensible choice in some circumstances — but it should
      be a choice somebody made, not an accident of where the first vehicle stopped.</p>

      <h3>When the plan is the wrong plan</h3>
      <p>Following the plan is the default. Deviating is a decision, and it needs the
      same discipline as any other: know what changed, state it, tell the commander,
      record it. The dangerous version is silent drift — the crew that improvised and
      never said so, and the commander making the next decision on a picture nobody
      told them about.</p>

      <h3>After the rescue: the rules change</h3>
      <p>One of the most reliable ways to cause lasting damage to an incident is to
      treat the whole event as a rescue until everyone is out and then keep
      behaving that way. Chapter 12.5 sets out separate post-accident procedures, and
      two of them are worth knowing by heart:</p>
      <ul>
        <li><strong>§12.5.5</strong> — the wreckage of an aircraft involved in an
        accident, including controls, <strong>shall not be disturbed or moved</strong>
        until the requirement has been satisfied. The clause that follows concerns
        the authority to do so.</li>
        <li><strong>§12.5.2 and §12.5.4</strong> — where removal of the bodies of
        fatality injured occupants remaining in the wreckage is necessary after the
        fire has been dealt with, and where circumstances permit, <strong>the area
        should be photographed for future reference prior to any body
        removal</strong>.</li>
      </ul>
      <p>Both of those exist because the scene is evidence. Crews who have been
      working inside a burning aircraft for twenty minutes do not automatically
      reclassify wreckage as salvage, and the handover into the post-accident phase
      needs to be an explicit event with an explicit authority behind it.</p>
      <p>And the last line of §12.5.6 is the one to remember as a person rather
      than a procedure: on completion of the initial rescue operation, it is
      important that RFF personnel exercise as much care as they did during it.
      Everybody's judgement is worse than usual at that point, and the tasks in front
      of you are quieter and easier to get wrong without noticing.</p>

      <blockquote>
        <p><strong>SME action:</strong> attach your own positioning plan per aircraft
        type, and confirm it is drawn from your aerodrome's actual layout, taxiways,
        hardstanding and water points. Then confirm two things that are usually
        assumed. Who has the authority to release the accident site after the
        rescue, and how is that authority requested and recorded? And is your plan
        actually practised, or only written — because §12.3.25 asks for three things
        and only one of them is the writing.</p>
      </blockquote>
    `,
    refs: [
      'ICAO Doc 9137 Part 1 — §12.3.25 tactical decision-making, size-up, the positioning plan and the positioning priorities (a) to (h)',
      'ICAO Doc 9137 Part 1 — §12.5.2, §12.5.4, §12.5.5 and §12.5.6 post-accident procedures and preservation of the accident site',
      'Your aerodrome emergency plan — preplanned tactics, and the authority to release the accident site',
      'Course ART-20 m1 — deviation discipline when the plan does not fit',
      'Course ART-19 — emergency planning and the full-scale exercise'
    ],
    smeChecked: false
  },
  'art09-m5': {
    title: 'Stand-down decisions',
    brief:
      'The decision to stop is the most consequential decision of the incident, ' +
      'and it is the one most often made by default rather than by somebody.',
    points: [
      'Stand-down is a command decision. A crew cannot decide it alone.',
      'The standard sets the order of priorities, not a checklist. Know which order.',
      'The life-saving commitment is met when all occupants are accounted for — property protection comes after, not instead.',
      '"It looks out" and "it is out" are different claims, and the difference is what thermal imaging is for.',
      'Reflash is why vehicles stay repositionable rather than parked.',
      'Doc 9137 does not give you a stand-down doctrine. It expects you to have one. Write it.',
      'The accident site survives the incident, and so does the record of what was decided.'
    ],
    body: `
      <h3>Who decides</h3>
      <p>Nobody individual stops pouring. Stand-down is a command decision, made by
      the incident commander, on advice. If you cannot name the person who will make
      that call on your aerodrome — and name the person who takes it when the
      commander is inside a fuselage — that is a gap worth closing now, while nobody
      is tired.</p>

      <h3>The order of priorities is sourced; the checklist is not</h3>
      <p>Be clear about what the standards give you and what you have to supply
      yourself, because this is a common source of misplaced confidence.</p>
      <p>What <em>is</em> sourced is the order. Doc 9137 §14.6.1 states that when
      the life saving commitment has been met <strong>it is necessary, of course, to
      utilize all available resources to secure protection of property</strong>.
      Read the structure of that sentence carefully, because it is the whole
      doctrine in one line:</p>
      <ul>
        <li>the life-saving commitment is <em>met</em> at a defined point — all
        occupants accounted for;</li>
        <li>only <em>then</em> does property protection become the task;</li>
        <li>and once it becomes the task, all available resources go to it.</li>
      </ul>
      <p>Two crews fail this in opposite directions. One stops applying agent
      because the visible fire is out, before anyone knows the occupants are all
      accounted for. The other keeps pouring at a burning tail because nobody has
      formally handed the objective over. Both are reading the standard
      incorrectly.</p>
      <p>What is <em>not</em> sourced is any detailed criteria for when a fire is
      considered extinguished, what overhaul and hot-spot checking should consist
      of, or how long a watch should be maintained. Doc 9137 mentions reflash once,
      in a positioning clause, and does not develop it. That doctrine has to come
      from your own procedures, your national requirements, and the manufacturer
      guidance for the aircraft types you handle.</p>
      <p>Write it down. A service that has an unwritten stand-down doctrine has a
      doctrine — it just cannot explain it to an inspector, a new recruit, or
      itself at 03:00.</p>

      <h3>"It looks out" and "it is out"</h3>
      <p>The manual is unusually direct about the limits of eyeballs. §12.3.22
      observes that <strong>since it is often impossible for the crew members to
      make an accurate appraisal of aircraft fire warning indicators</strong>, it is
      advisable to bring the aircraft to a complete stop and allow RFF personnel to
      inspect the area involved — and that <strong>this inspection can usually be
      greatly enhanced by the use of thermal imaging equipment without having to
      open aircraft compartment doors</strong>.</p>
      <p>Two things follow. The first is that a crew standing near a running engine
      cannot reliably judge the aircraft, which is why the recommendation is to bring
      it to a stop and look properly rather than to interpret from the apron edge.
      The second is that there is a specific, named piece of equipment for the
      question "is there still fire in there", and the phrase "without having to
      open aircraft compartment doors" tells you why it matters — the answer you
      need is inside sealed voids.</p>
      <p>That is the difference between a fire that is out and a fire that is out of
      sight. Conceded fire in wing voids, belly fairings and cargo holds is the
      standard reason a burnt aircraft re-ignifies on the apron.</p>

      <h3>Reflash is a forecast, not a worry</h3>
      <p>The positioning guidance says vehicles should ideally be positioned so they
      can be repositioned in the event of reflash, or on direction of the incident
      commander. That instruction is a forecast. It assumes somebody is already
      thinking about a second event while the first is still running, and it is the
      reason positioning discipline exists at all rather than being tidiness.</p>
      <p>Reflash risk is not a general worry — it is a function of fuel state, foam
      application, whether the fuel is in the cells or still in the tank, and how
      long the aircraft sat before anything was applied. Know the specifics for the
      type in front of you, per aircraft, in your own SOP.</p>
      <p>Anyone who has stood at a burnt aircraft at 03:00 knows that "we thought it
      was out" is a sentence people say afterwards rather than at the time.</p>

      <h3>The scene is not safe until the engines are accounted for</h3>
      <p>One more reason stand-down is a command decision rather than a visual one.
      §12.3.23 notes that it may be necessary to keep at least one engine operating
      after the aircraft has come to a stop, in order to provide lighting and
      communications aboard the aircraft — and that this will hamper rescue
      operations to some extent. On turbo-jet engines, extreme care must be
      exercised in the immediate area ahead and for a considerable distance behind
      the engine.</p>
      <p>A scene with a live engine is not a scene anybody can relax in, and the
      area behind a turbojet is not where people stand while they wait to be told
      the job is finished.</p>

      <h3>Afterwards</h3>
      <p>Preserving the accident site is listed as a consideration in the
      positioning guidance, and it outlives the incident — wreckage, loose articles
      and fluid evidence all have consequences afterwards. Chapter 12.5 sets out
      separate post-accident procedures, and §12.5.5 is the hard one: the wreckage,
      including controls, shall not be disturbed or moved until the requirement has
      been satisfied. The last line of §12.5.6 is the one to hold on to as a person
      rather than a procedure — on completion of the initial rescue operation, it is
      important that RFF personnel exercise as much care as they did during it.</p>
      <p>So does the report. An incident that produced no written record of what was
      decided, and why, will produce the same decision again next time.</p>

      <blockquote>
        <p><strong>SME action:</strong> this lesson is deliberately explicit about
        what the standards do <em>not</em> give you, so the first action here is to
        write the missing doctrine. Define, in your own documents: what evidences
        that all occupants are accounted for; what evidences that the fire is out
        rather than out of sight; what your overhaul and hot-spot check consists of;
        what your reflash triggers are; how long a watch is maintained and by whom;
        and who holds the stand-down decision in each shift pattern. Then state who
        may release the accident site and how that authority is recorded.</p>
      </blockquote>

      {{video:faa-tact-1}}
    `,
    refs: [
      'ICAO Doc 9137 Part 1 — §14.6.1 the life-saving commitment and the order of property protection',
      'ICAO Doc 9137 Part 1 — §12.3.22 thermal imaging and the limits of visual appraisal',
      'ICAO Doc 9137 Part 1 — §12.3.23 hazard area with engines running, including the area astern of a turbojet',
      'ICAO Doc 9137 Part 1 — §12.3.25 (e) positioning to allow repositioning on reflash; (h) preserving the accident site',
      'ICAO Doc 9137 Part 1 — §12.5.5 and §12.5.6 post-accident procedures and care after completion',
      'ICAO Annex 14 Vol I — §9.3 disabled aircraft removal: the regime that begins when the RFF incident ends',
      'Your aerodrome emergency plan — stand-down, overhaul and re-attack',
      'Course ART-16 m4 — exposure protection, withdrawal and re-attack'
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
        State's requirements — Annex 14 Volume I Chapter 9 and whatever national
        instrument your Civil Aviation Authority enforces, which may differ from
        the ICAO figures given here. This platform does not assume which State you
        are in.</p>
      </blockquote>
    `,
    refs: [
      'ICAO Doc 9137 Part 1 — §2.3.4 to §2.3.8 foam quantities and application rates; Table 2-3; Table 2-4',
      'ICAO Doc 9137 Part 1 — §2.4.1 to §2.4.10 critical area and water calculation',
      'ICAO Doc 9137 Part 1 — §2.5 discharge rates; §2.6 supply and storage; §2.7 response times',
      'ICAO Annex 14 Volume I Chapter 9 — aerodrome rescue and firefighting',
      'Your national Civil Aviation Authority requirements — confirm which instrument and issue binds you'
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
      'Your response time clock starts at the point your own State and your own alerting arrangement define — confirm it.',
      'Response time stops at first application of foam at 50% of the specified discharge rate — not at arrival on scene.',
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

      <h3>Where the response clock starts</h3>
      <p>If your service runs a central watchroom with more than one station, there
      is a consequence that catches experienced crews out, because it is not
      intuitive. GCAA CAR Part XI GM2 to §10.1 — from the United Arab Emirates
      national regulations — states that where a central control facility, a Main
      Watch room, is in operation with multiple fire stations,
      <strong>the response time starts once the central control facility receives
      the emergency call</strong>, not when the responding fire station receives
      it.</p>
      <p>That is one jurisdiction's rule, and your State's may differ, so check
      yours. But if your arrangement resembles this at all, the arithmetic almost
      certainly does too: every second between the call entering the master
      watchroom and the call leaving it is a second charged to the response
      objective. The satellite station's clock is not a fresh clock; it inherits
      whatever the master watchroom has already spent.</p>
      <p>Handovers, repeat-back discipline, writing things down before
      transmitting — these are not administrative niceties. They are charged
      directly against the response time.</p>
      <p>The same Good Guidance Material sets out how response time is measured at
      all, and the measurement point is the part people get wrong: it is the time
      between the initial call to the service and the time when the first
      responding appliance is in position to apply foam <strong>at a rate of at
      least 50 per cent</strong> of the specified discharge rate. So the clock
      stops at first application of foam, not at arrival on scene — and an
      appliance that has arrived but is not yet capable of putting agent down at
      half rate has not arrived. GM3 to the same clause adds that fire access lanes
      from the fire station directly onto a runway are to be controlled by ATC,
      with the required runway-ahead warnings clearly displayed.</p>

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
      'United Arab Emirates — GCAA CAR Part XI §10.1 and GM1, GM2, GM3: measurement of response time, the central watchroom, and fire access lanes (worked example, not necessarily your rule)',
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
     ART-08 — Training and competency. Grounded in Doc 9137 Part 1
     Chapter 14 (Training) and Chapter 18 (Human factors). §14.1.1 is the
     argument the whole course rests on: RFF crews are rarely tested, so
     training is the only assurance available.
     ───────────────────────────────────────────────────────────────────── */
  'art08-m1': {
    title: 'Initial training',
    brief:
      'Why a meticulously planned training programme is not administrative ' +
      'excellence but the only assurance that anybody will be any good at this.',
    points: [
      'RFF crews are almost never tested by a real event. Training is the only assurance there is.',
      'The core programme has nine faculties. Know all nine, not just the firefighting one.',
      'Scope should vary with the trainee. Simpler instruction is more likely to succeed.',
      'Enthusiasm must not carry instruction past its practical application.',
      'The service is primarily lifesaving. Firefighting is what makes lifesaving possible.',
      'Firefighters are trained in firefighting to permit rescue, and only then protect property.'
    ],
    body: `
      <h3>The reason this course exists</h3>
      <p>Read §14.1.1 carefully, because it is the justification for everything
      else in this course. Personnel whose duties consist solely of RFF services
      for aircraft operations are <strong>infrequently</strong> called upon to face
      a serious situation involving lifesaving at a major aircraft fire. They
      will experience a few incidents and a larger number of standbys — but will
      seldom be called upon to put their knowledge and experience to the test.</p>
      <p>It follows that <strong>only by means of a most carefully planned and
      rigorously followed programme of training</strong> can there be any
      assurance that both personnel and equipment will be capable of dealing
      with a major aircraft fire should the necessity arise.</p>
      <p>That is the honest position. Your competence is not going to arrive
      through experience, because experience will not happen. It has to be built
      deliberately, in advance, on purpose.</p>

      <h3>The nine faculties</h3>
      <p>The core training programme is organised into nine faculties (§14.1.1):</p>
      <ol>
        <li>fire dynamics, toxicity and basic first aid;</li>
        <li>extinguishing agents and firefighting techniques;</li>
        <li>handling of vehicles, vessels and equipment;</li>
        <li>airfield layout and aircraft construction;</li>
        <li>operational tactics and manoeuvres;</li>
        <li>emergency communication;</li>
        <li>leadership performance;</li>
        <li>physical fitness; and</li>
        <li>auxiliary modules — rescue in difficult terrain, response to
        biological or chemical threats, and so on.</li>
      </ol>
      <p>Most services invest heavily in faculties 2 and 5 and treat the rest as
      overheads. Note that communication, leadership and physical fitness are
      listed as core faculties in their own right — not as supporting subjects.
      And note that faculty 4, airfield layout and aircraft construction, is the
      one that most obviously belongs to the aerodrome you actually work.</p>

      <h3>How it should be taught</h3>
      <p>The core curriculum should include both initial and recurrent
      instruction, and the scope should vary with the degree of intelligence of
      the trainees (§14.1.2). In most cases, the guidance is blunt:
      <strong>the simpler this form of instruction is kept, the more successful
      it is likely to be</strong>.</p>
      <p>That is a genuinely uncomfortable instruction for anyone who enjoys
      teaching. Simpler is not the same as shallower — it means the instruction
      is kept to what the trainee can actually use rather than what the
      instructor finds interesting.</p>

      <h3>Interest, without losing the plot</h3>
      <p>There is a balancing instruction in the same clause, and it is worth
      taking seriously rather than treating as a platitude. Enthusiasm generated
      by the interest value of the subject should <em>not</em> be allowed to carry
      the instruction beyond its practical application — but the officer
      responsible for the training programme must endeavour to maintain the
      interest and enthusiasm of the crew at all times.</p>
      <p>Both halves matter. A course that runs long because the material is
      fascinating has drifted from training into entertainment. A course nobody
      engages with has failed regardless of its content. And there is real
      material to sustain interest indefinitely: many factors affecting RFF
      procedures at an aircraft accident can be anticipated, staged and
      practised, and each new type of aircraft brings new problems that must be
      assessed and incorporated into the programme (§14.1.2).</p>

      <h3>What the training is actually for</h3>
      <p>§14.6.1 gives the objective without ambiguity. Operational tactics
      training establishes conditions in which aircraft occupants may be rescued
      from an aircraft involved in, or liable to become involved in, fire. The
      objective is to <strong>isolate the fuselage from the fire, cool the
      fuselage, establish and maintain an escape route</strong>, and achieve the
      degree of fire control necessary to permit rescue operations to proceed.</p>
      <p>Then the sentence that should be read to every new recruit:</p>
      <blockquote>
        <p>The service to be provided is primarily a lifesaving organization, one,
        however, that must be trained in firefighting because aircraft involved
        in a serious accident are frequently involved in fire. The firefighting
        operations must be directed to those measures which are necessary to
        permit rescue to be carried out until all the occupants of the aircraft
        are accounted for. This includes precautionary measures at those incidents
        where no fire has broken out. When the life saving commitment has been
        met it is necessary, of course, to utilize all available resources to
        secure protection of property. <em>— §14.6.1</em></p>
      </blockquote>
      <p>Three things follow. Firefighting capability exists to enable rescue, not
      the reverse. Firefighting continues until <strong>all occupants are
      accounted for</strong> — not until the fire looks handled. And
      precautionary measures apply at incidents where <em>no</em> fire has broken
      out. Property protection comes last, and it comes last on purpose.</p>

      <blockquote>
        <p><strong>SME action:</strong> map your initial training against all nine
        faculties and state honestly which are strong, which are thin, and which
        are absent. Confirm the scope varies with trainee capability rather than
        being one fixed course for everybody. And record your completion and
        assessment standards, so that "initial training complete" means something
        a State inspector could verify.</p>
      </blockquote>
    `,
    refs: [
      'ICAO Doc 9137 Part 1 — §14.1.1 the nine faculties; §14.1.2 method and scope of instruction',
      'ICAO Doc 9137 Part 1 — §14.6.1 the objective of operational tactics training',
      'ICAO Doc 9137 Part 1 — §14.10 auxiliary modules',
      'ICAO Annex 14 Volume I Chapter 9; your State training requirements'
    ],
    smeChecked: false
  },

  'art08-m2': {
    title: 'Recurrent training and currency',
    brief:
      'The failure mode is not forgetting. It is gradually concluding that ' +
      'nothing has changed.',
    points: [
      'A few real incidents and a larger number of standbys is the whole of your live experience.',
      'Routine aspects of training become less interesting over a long period of inaction.',
      'The equipment serviceability check is the first duty to decay — watch for it.',
      'Each new aircraft type brings new problems that must be assessed and added.',
      'Currency is a system property, not a personal virtue.',
      'If your recurrent programme has not changed in two years, it has stopped working.'
    ],
    body: `
      <h3>Recurrence is not repetition</h3>
      <p>§14.1.2 makes the point that recurrent instruction forms part of the core
      curriculum alongside initial instruction — recurrence is not an optional
      extra to be cut when the budget tightens.</p>
      <p>But the more interesting warning in the same clause is about
      attention rather than about syllabus. As certain routine aspects of
      training become less interesting over a long period, it is essential that
      the officer ensure <strong>each crew member realises the need for such
      training</strong>.</p>
      <p>The failure mode is not forgetting. A crew who have forgotten a
      procedure will ask. The failure mode is a crew who have stopped believing
      the procedure matters, and who perform it mechanically or not at all
      because nothing has ever happened to prove otherwise.</p>

      <h3>The duty that decays first</h3>
      <p>The guidance offers a worked example, and it is the one most services
      take for granted. It is a fundamental practice in the RFF service that
      <strong>each crew member, when on duty, be satisfied that the equipment
      which may be used is serviceable</strong>.</p>
      <p>And then the observation that matters: this particular aspect of a crew
      member's duty <em>could deteriorate after a long period of comparative
      inaction</em>, unless that person is really convinced of the importance of
      the task (§14.1.2).</p>
      <p>This is the honest weak point in most services. The daily equipment
      check is the least interesting task on the roster and the one with the
      longest fuse. It is also the only thing standing between you and discovering
      at 03:00 that the vehicle you have just driven to an aircraft accident has
      a fault you knew about three weeks ago.</p>

      <h3>Change is the enemy of a static syllabus</h3>
      <p>Each new type of aircraft brings with it new problems which must be
      assessed and incorporated into the training programme (§14.1.2). A fleet
      change is a training event, not only a procurement event.</p>
      <p>Think about what actually changes when a new type joins: door and panel
      locations, the positioning plan, turret reach and arcs, the critical area
      and therefore the agent quantity, cabin configuration and exit mix, engine
      positions and intake hazards, and the fuel load state you should expect at
      a hot brake or a rejected takeoff. Every one of those is a lesson, and
      none of them arrive automatically with the aircraft.</p>

      <h3>Building a system rather than an attitude</h3>
      <p>Since assurance cannot come from incidents (§14.1.1), currency has to be
      a property of the system rather than of individual diligence. That means
      things you can inspect:</p>
      <ul>
        <li>a recurrent syllabus tied to the current fleet, the current threat
        picture and the current equipment, reviewed on a stated cycle;</li>
        <li>the equipment serviceability check recorded, not assumed — a
        signature that can be audited later;</li>
        <li>each new aircraft type admitted into the service with a defined
        familiarisation package before it carries traffic;</li>
        <li>cross-training, so that no single post depends on one person having
        been on shift for nine years;</li>
        <li>an honest gap review — what has not been practised in the last two
        years, because that list is usually longer than anyone expects.</li>
      </ul>

      <blockquote>
        <p><strong>SME action:</strong> state your recurrent cycle and what
        triggers an out-of-cycle refresh. Confirm the equipment check is recorded
        per crew member and auditable. List the aircraft types currently in
        service and the date each was admitted, and confirm a familiarisation
        package exists for each. Then produce the list of what your service has
        <em>not</em> practised in the last two years, and decide which items on it
        are unacceptable.</p>
      </blockquote>
    `,
    refs: [
      'ICAO Doc 9137 Part 1 — §14.1.1 infrequency of real events; §14.1.2 recurrence, interest and the serviceability check',
      'ICAO Doc 9137 Part 1 — §14.5 airfield layout and aircraft construction',
      'Your aerodrome emergency plan — training and currency commitments',
      'Course ART-11 — aircraft familiarisation'
    ],
    smeChecked: false
  },

  'art08-m3': {
    title: 'Competency assessment and records',
    brief:
      'Assessment at the individual and the team level, because a service of ' +
      'individually competent people can still fail as a crew — and in South ' +
      'Africa the regulator has already written down what the records must be.',
    points: [
      'Competency must be audited at individual and team level, not just individually.',
      'Anything less than full efficiency is unacceptable, and dangerous both ways.',
      'Do not become overly fixated with the hard skills. The soft components matter.',
      'Human factors apply to written plans too — the emergency plan and tactical plans.',
      'A national regulator may name the artefacts: a training needs analysis, a frequency analysis, an accepted training programme, a certificate of competence, and an accepted maintenance scheme. Find out yours.',
      'Reassessment must happen within a maximum period of four years.',
      'The regulator agrees with Doc 9137: competence cannot be measured at real incidents, because you do not get them.'
    ],
    body: `
      <h3>Individual competence is not the same as an effective service</h3>
      <p>The entire training programme must be designed to ensure that both
      personnel and equipment are <em>at all times</em> fully efficient. The
      guidance sets the bar without room for interpretation: <strong>anything less
      than full efficiency is unacceptable</strong>, and may be dangerous both to
      those in need of aid and to those seeking to give such aid (§14.1.3).</p>
      <p>Note that it is dangerous <em>both ways</em>. An RFF service that is not
      fully efficient endangers the occupants it is there to save, and also the
      responders who go in after them. Worth saying to people, because every new
      recruit has met the version of this argument that only mentions the
      victims.</p>
      <p>§14.1.3 then adds a second requirement that is routinely skipped: the
      programme must build <strong>cohesiveness between key functional units</strong>
      in order to deliver a consistent level of proficiency during emergencies. To
      that end, RFF services should develop a <strong>competency audit
      framework</strong> to assess the effectiveness of training at <em>both</em>
      individual and team levels.</p>
      <p>Team level is not a softer version of individual level. It is a different
      thing. A service can be full of individually excellent firefighters who have
      never worked together, and it will still fail.</p>

      <h3>Do not over-invest in the hard skills</h3>
      <p>§18.3.1 offers a caution that is easy to agree with and hard to act on. A
      competent and professional RFF service must rely on a comprehensive and
      relevant set of training modules, coupled with an internal audit framework to
      check their effectiveness. But in promulgating that framework, one must
      <strong>not be overly fixated with the "hard" skills component</strong> of the
      training outcomes. Thought must be given to the soft human factor components
      during both promulgation and execution. And the same applies to assessment: any
      evaluation of operational effectiveness must take into account human factor
      principles such as team coordination.</p>
      <p>What that looks like in practice is that your assessment should not be
      entirely a list of individual technical ticks. A crew that can each do their
      task superbly, but cannot hand over command, brief a relief, or operate on one
      channel together, has passed every individual assessment you have given
      it.</p>

      <h3>A worked example of the records a regulator asks for</h3>
      <p>Doc 9137 tells you what good looks like. A national regulation tells you
      what you must be able to produce on request. The clearest worked example
      available in the public domain is <strong>GCAA CAR Part XI — Aerodrome
      Emergency Services, Facilities and Equipment</strong>, issued by the General
      Civil Aviation Authority of the <strong>United Arab Emirates</strong>, whose
      amendments history records that it was built "based upon ICAO Annex 14".</p>
      <p>Read it as a demonstration of adoption mechanics, not as your law. What it
      shows is that a State which takes Chapter 9 seriously attaches
      <em>named documents with an external counter-signature</em> — and knowing the
      shape of those artefacts is what lets you recognise, or build, the equivalent
      in your own service.</p>
      <ul>
        <li><strong>§13.1</strong> — the aerodrome shall appoint a
        <strong>competent person</strong> to establish and effectively manage all
        aspects of Rescue and Fire-Fighting Operations.</li>
        <li><strong>§13.2</strong> — minimum staffing levels for all RFFS categories
        operated by an aerodrome shall be <strong>agreed with the Authority</strong>
        and promulgated in the Aerodrome Manual.</li>
        <li><strong>§13.4</strong> — the minimum number of personnel shall be
        determined by a <strong>Task Resource Analysis</strong>, conducted and
        completed <strong>for acceptance by the Authority</strong>.</li>
        <li><strong>§14.3</strong> — a <strong>training needs analysis shall be
        conducted</strong> to identify the underpinning knowledge, understanding and
        skills required to carry out the tasks of RFFS personnel, by role: firefighter,
        crew supervisors, watch managers and senior officers. It must also include an
        evaluation process measuring training outcomes against the programme's
        published aims and objectives.</li>
        <li><strong>§14.4</strong> — a <strong>frequency analysis shall be carried
        out</strong> to determine the interval at which competence in each core
        element should be assessed. All RFFS personnel shall be assessed in skills
        and knowledge to ensure competency in role and task
        <strong>within a maximum period of four years</strong>.</li>
        <li><strong>§14.7</strong> — all personnel forming part of the operational
        team shall hold a <strong>Certificate of Competence</strong> confirming they
        possess the necessary standard of competence for their task and role.</li>
        <li><strong>§14.8 and §14.9</strong> — personnel shall commence acquiring
        competence through a <strong>Structured Learning Programme</strong>, and
        Structured Learning Programmes <strong>shall be submitted to the Authority
        for acceptance</strong>. On successful completion of the accepted programme,
        a Certificate of Competence <strong>endorsed by the Authority</strong> is
        issued.</li>
        <li><strong>§14.10</strong> — competency shall be maintained through an
        on-aerodrome <strong>Maintenance of Competency scheme accepted by the
        Authority</strong>. Guidance on an acceptable scheme is at Appendix 2,
        paragraph 5.</li>
        <li><strong>§14.13</strong> — all fire officers shall be formally selected,
        shall understand operational Incident Command, and shall hold a Certificate
        of Competence for their rank or role.</li>
      </ul>
      <p>Note what that chain implies. This is not a training plan you keep
      internally. A Structured Learning Programme goes to the regulator and comes
      back <em>accepted</em>. A certificate comes back <em>endorsed</em>. The
      maintenance scheme is <em>accepted</em>, not merely written. Your competence
      system, in that jurisdiction, is a regulated artefact with an external
      counter-signature.</p>
      <p>Two drafting points to be aware of rather than confused by. CAR Part XI
      §14.7 and §14.9 use "Certificate of <em>Competence</em>" while §14.13 uses
      "Certificate of <em>Competency</em>"; they refer to the same thing. And §14.11
      is worth reading separately — in addition to the formal training that leads to
      the certificate, there is a standalone requirement that personnel
      <em>maintain</em> their knowledge and skills of their operational function. The
      certificate is the floor, not the end.</p>

      <h3>The regulator's own version of the argument</h3>
      <p>The most useful sentence in that section is §14.14, because it is a
      regulator making the Doc 9137 §14.1.1 argument independently and in binding
      language:</p>
      <blockquote>
        <p>Given the criticality of the function and the lack of opportunities for the
        evaluation of operational competence during attendance at actual incidents
        involving aircraft, there needs to be a process for the consistent measurement
        of competence. <em>— GCAA CAR Part XI, §14.14</em></p>
      </blockquote>
      <p>Read that as an instruction rather than an observation. If a regulator has
      already named the problem — you will not get the opportunities — then the
      assessment process is not administrative overhead to be minimised. It is the
      thing standing in for the experience you are not going to have.</p>

      <h3>Written plans are subject to the same scrutiny</h3>
      <p>§18.3.2 widens the scope in a direction that is easy to miss: human factors
      principles are not confined to training programmes, and must also be given
      consideration in the formulation of <strong>drawer plans</strong> — the
      aerodrome emergency plan and the unit tactical plans of the RFF service.</p>
      <p>A written plan is tested far less often than a training exercise, and
      reviewed far less critically. Treat the plan review with the same rigour as a
      competence assessment, and ask the awkward question: if this plan were executed
      literally tonight by the crew on shift, would it work?</p>

      <h3>Teamwork is the load-bearing element</h3>
      <p>§18.4.1 is direct about it. As the success of any RFF operations relies very
      much on teamwork, the importance of building mutual trust and team coordination
      among staff during training <strong>cannot be overstressed</strong> — and the
      manual tags it Liveware vs. Liveware, because it is the human factor that no
      procedure or machine can substitute for.</p>
      <p>Mutual trust is what lets a crew accept a tactical decision from a commander
      they did not choose, act on information they cannot see, and hand over command
      without hesitation. None of that works if the people involved have never done it
      before, and none of it is assessed by watching one person.</p>

      <h3>What a competency framework should actually produce</h3>
      <ul>
        <li>the artefacts above, current, in a folder, findable in under a
        minute;</li>
        <li>individual currency records showing <em>when</em> each competency was
        last evidenced, not just that it was, with nothing older than four years;</li>
        <li>team assessments — scenarios run as crews, against team objectives,
        including command handover and relief;</li>
        <li>an internal audit of the training programme itself, since the framework
        is only as good as its ability to detect its own failure;</li>
        <li>records that survive a staff change, an audit, and a regulator.</li>
      </ul>

      <blockquote>
        <p><strong>SME action:</strong> build the checklist above against your own
        regulator's requirements, not against the worked example — this platform
        does not know which State you are in and will not guess. In particular,
        establish and record: is there a written training needs analysis against the
        named roles? Is there a frequency analysis, and does it respect a stated
        maximum reassessment interval? Is there an equivalent of the Structured
        Learning Programme, and has it been <em>accepted</em> by your authority? Is
        the maintenance scheme accepted? Does every operational team member
        physically hold a certificate of competence, and every officer one for their
        rank? Record the gaps rather than summarising them away — the gaps are the
        useful part of this exercise.</p>
      </blockquote>
    `,
    refs: [
      'ICAO Doc 9137 Part 1 — §14.1.3 competency audit framework, individual and team',
      'ICAO Doc 9137 Part 1 — §18.3.1 and §18.3.2 human factors in training and in drawer plans',
      'ICAO Doc 9137 Part 1 — §18.4.1 teamwork and mutual trust',
      'United Arab Emirates — GCAA CAR Part XI §13.1, §13.2, §13.4, §14.3, §14.4, §14.7 to §14.11, §14.13, §14.14 (worked example of adoption mechanics)',
      'United Arab Emirates — GCAA CAR Part XI Appendix 2 paragraph 5, guidance on an acceptable Maintenance of Competency scheme',
      'ICAO Annex 14 Volume I Chapter 9 — §9.2.43 training in human performance and team coordination',
      'Course ART-08 m4 — drills and live-fire currency'
    ],
    smeChecked: false
  },

  'art08-m4': {
    title: 'Drills and live-fire currency',
    brief:
      'The test of tactics training is not whether you can describe the initial ' +
      'action. It is whether you perform it without thinking.',
    points: [
      'Initial action must be instinctive — like hose-running — and follow even under stress.',
      'Only then can the officer-in-charge assume complete control of the situation.',
      'Main attack is mass application of foam; keep a suitable back-up agent for inaccessible pockets.',
      'Live fire acclimatises crews to heat and smoke, which simulators cannot reproduce.',
      'Pressure-fed fuel fires are named in Annex 14 §9.2.42 and CAR Part XI §14.5 — this is a requirement, not an aspiration.',
      'Simulators are still valuable for vehicle handling, command and control.',
      'Fitness training must match the intensity of the operations, not the fitness of the average person.'
    ],
    body: `
      <h3>The standard is automatic, not competent</h3>
      <p>§14.6.1 sets the test for operational tactics training, and it is a
      demanding one. When personnel are well versed in handling firefighting
      equipment, they should receive training in operational tactics to be
      adopted at aircraft fires. This is a continuing commitment and must be
      absorbed to the point where <strong>compliance with the initial action
      called for is instinctive</strong> — in the same sense that hose-running to
      a well-trained regular firefighter is automatic, and will therefore follow
      even when working under stress.</p>
      <p>That is the benchmark: the hose line, not the textbook. A crew who know
      the correct initial action and have to <em>recall</em> it under stress have
      not met it. Recall is what fails first.</p>
      <p>And the consequence, which connects tactics training to command
      training: <strong>only when this is achieved will the officer-in-charge be
      in a position to assume complete control of the situation</strong>. Command
      depends on the crew having made the first moves already, without being
      told. A commander arriving at a scene where nothing has happened yet has no
      control to assume.</p>

      <h3>Mass application, and what backs it up</h3>
      <p>The main attack on the fire should usually be by mass application of
      foam, with the object of achieving maximum cooling and rapid suppression
      (§14.6.2).</p>
      <p>Because foam has limitations like any other agent, a suitable back-up
      agent must be available for pockets of fire inaccessible to direct foam
      application — generally dry chemical powder. And the guidance is specific
      about where that back-up should and should not be used: confined to
      <strong>running liquid fuel fires, fires in enclosed spaces such as wing
      voids</strong>, or special fires such as an engine nacelle or undercarriage
      well (§14.6.2).</p>

      <h3>The approach</h3>
      <p>Equipment should approach the accident site <strong>by way of the fastest
      route</strong> in order to reach the site in the shortest possible time —
      and this is <em>quite frequently not the shortest route</em>, because in
      general it is preferable, where possible, to travel on a man-made surface
      than to approach over rough ground or grassland (§14.6.4). The essence is
      to ensure that RFF vehicles get there and are not subjected to unnecessary
      hazards en route.</p>
      <p>Then the detail that catches out experienced crews and new ones alike:
      when nearing the scene, a careful watch must be maintained for occupants
      who may be dashing away from the aircraft, or who may have been flung clear
      and are lying injured in the approaches. This applies particularly at night
      and calls for competent use of spot or search lights (§14.6.4).</p>
      <p>People thrown clear of an aircraft survive. Finding them is not a
      secondary task.</p>

      <h3>Why live fire cannot be simulated away</h3>
      <p>§18.4.2 draws a distinction that is easy to miss and expensive to get
      wrong. For training to be as realistic as possible, <strong>live fire
      training is crucial in helping personnel acclimatise to a heated and
      smoke-filled environment</strong> — so that in an actual emergency they can
      execute their tasks more confidently and effectively.</p>
      <p>Smoke and heat are not knowledge. They are a physiological condition,
      and the only reliable way to build tolerance to it is exposure. A crew who
      have only ever worked in clean air will discover their limits at the worst
      possible moment, which is the moment they are needed.</p>
      <p>Note that this is not only good practice. Annex 14 §9.2.42 makes live
      fire drills a <strong>shall</strong>, and it names the specific hazard:
      drills must be commensurate with the types of aircraft and the type of RFF
      equipment in use at the aerodrome, <strong>including pressure-fed fuel
      fires</strong> — fires associated with fuel discharged under very high
      pressure from a ruptured fuel tank.</p>
      <p>That requirement is not left to national discretion in every case. GCAA CAR
      Part XI §14.5 — the United Arab Emirates regulation, used here as a worked
      example — repeats the requirement against <em>their</em> aerodrome and
      equipment, again <strong>including pressure-fed fuel fires</strong>, and
      adds <em>in accordance with Appendix 2</em>. §14.6 of the same document
      requires that training facilities commensurate with the type and size of
      aircraft using the aerodrome shall be provided <em>on the aerodrome</em>, so
      that operational fire-fighting competency can be maintained.</p>
      <p>Pressure-fed fuel fires deserve their own preparation. They are a
      different hazard, not a bigger one: the fuel arrives as a high-velocity jet
      rather than a burning pool, and the standard apparatus and standard agent
      application approach do not obviously apply. If your live fire programme does
      not cover them, that is a finding against a Standard in Annex 14 and against a
      requirement in your national regulation — not a gap in an ideal
      programme.</p>

      <p>That said, the guidance does not put live fire above everything. Where
      possible, <strong>simulators replicating different facets of RFF
      operations</strong> — vehicle driving and operations, command and control,
      and so on — should be available for training in a controlled, safe and
      realistic environment. Use live fire for what only live fire teaches; use
      simulators for the things you would otherwise practise dangerously or
      expensively.</p>

      <h3>Fitness that matches the job</h3>
      <p>§14.9 ties physical fitness directly to operational effectiveness.
      During protracted rescue operations, the ability of RFF personnel to
      perform strenuous activities over an extended period of time influences the
      overall operational effectiveness. Therefore, firefighters must be
      <strong>aerobically and anaerobically fit</strong> to withstand the rigours
      of a variety of operations.</p>
      <p>But that is only half of it. The guidance is specific about how the
      standard is set: physical fitness training requirements should be
      <strong>designed to be commensurate with the equivalent fitness intensity
      generated in the performance of RFF operations</strong> — which it lists
      as the use of breathing apparatus, hand-lines, ladders, heavy equipment,
      and other associated rescue operations such as casualty handling.</p>
      <p>So the requirement is not general fitness. It is fitness that
      replicates the actual demands. A crew that can run 10 km but cannot carry
      a casualty, or work in breathing apparatus for the required duration, or
      handle a charged hand-line up a ladder, has a fitness programme pointed at
      the wrong problem.</p>
      <p>§18.5.3 adds two constraints that are easy to overlook. Due
      consideration must be given to individual human limitations, and
      <strong>RFF management must accept that not all personnel can perform at
      the same level of physical fitness standards</strong>. The key is to
      establish the minimum requirements of a firefighter and design a programme
      that can best replicate those demands — which means a standard that
      everybody can actually meet, not one that quietly excludes people.</p>

      <blockquote>
        <p><strong>SME action:</strong> state your live-fire regime — frequency,
        who may participate, the heat and smoke acclimatisation progression, the
        medical provision and the stop criteria. State what your simulators or
        equivalent controlled training cover. Confirm your fitness standard is
        written against the specific demands of your operations rather than a
        general standard, and that you test the tasks named in §14.9 rather than
        only running times. Finally, confirm your crew reach the automatic
        standard in §14.6.1 for the initial action, or record honestly that they
        do not yet.</p>
      </blockquote>
    `,
    refs: [
      'ICAO Doc 9137 Part 1 — §14.6.1 instinctive initial action; §14.6.2 mass foam and back-up agent; §14.6.4 the approach',
      'ICAO Doc 9137 Part 1 — §14.9 physical fitness commensurate with operational intensity',
      'ICAO Doc 9137 Part 1 — §18.4.2 live fire and simulators',
      'ICAO Annex 14 Vol I — §9.2.42 live fire drills including pressure-fed fuel fires',
      'United Arab Emirates — GCAA CAR Part XI §14.5 live fire drills per Appendix 2; §14.6 training facilities (worked example)',
      'Course ART-11 — live fire and aircraft familiarisation',
      'Your aerodrome emergency plan — exercise and drill programme'
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
  },

  /* ─────────────────────────────────────────────────────────────────────
     ART-20 — Contingency decision making. Grounded in Doc 9137 Part 1
     Chapter 18 (human factors), §11.2 (emergency classification), §12.3
     and §13.3 (response beyond runway thresholds). These are the four
     modules about the moments where nobody is going to tell you what to do.
     ───────────────────────────────────────────────────────────────────── */
  'art20-m1': {
    title: 'When the plan does not fit',
    brief:
      'The plan is a default, not a script. Following it is a decision too — ' +
      'and the dangerous version is silent drift.',
    points: [
      'The plan was written for the anticipated case. Reality is not obliged to be anticipated.',
      'Human factors principles apply to written plans, not just training.',
      '§14.10: train beyond the immediate operational responsibilities, while it is still cheap.',
      'The first apparatus on scene sets the route for everyone behind it.',
      'Deviating is a decision and needs the same discipline as any other: know what changed, state it, tell the commander, record it.',
      'The dangerous failure is not deviating. It is deviating without saying so.',
      'A plan that has never been questioned has not been tested.'
    ],
    body: `
      <h3>Why you cannot learn this from incidents</h3>
      <p>Start from the constraint established in Course 08. RFF crews are
      infrequently called upon to face a serious situation involving lifesaving at
      a major aircraft fire (§14.1.1). They will see a few incidents and a larger
      number of standbys, and will seldom be put to the test.</p>
      <p>Two consequences follow, and they pull in opposite directions. You
      cannot rely on experience to teach you judgement, because experience will
      not arrive. And you cannot rely on the plan to cover every case, because
      the cases you have not seen are precisely the ones nobody wrote down.</p>

      <h3>The plan is a written hypothesis</h3>
      <p>§18.3.2 is the clause that makes this concrete, and it is routinely
      overlooked: human factors principles are not confined to the development of
      training programmes, and must also be considered in the formulation of
      <strong>drawer plans</strong> — the aerodrome emergency plan and the unit
      tactical plans.</p>
      <p>So your tactical plan is subject to the same scrutiny as your training.
      Who wrote it, when, about which aircraft, with what equipment, and does it
      still describe your service?</p>
      <p>§14.10 makes the same point from the other direction. Depending on the
      operating environment it may be necessary for RFF crew to be trained in
      difficult environments such as water rescue and biological or chemical
      threats — but even where that is not necessary, it is worthwhile to
      <strong>explore and train beyond the immediate operational
      responsibilities</strong> in order to deal with unexpected contingencies at
      or in the vicinity of the airport. Training for the contingency is the point
      at which it is still cheap.</p>

      <h3>Follow it until it is contradicted</h3>
      <p>The tactical plan is the default because it was built from knowledge you
      do not have in the moment: your fleet, your layout, your water points, your
      turret arcs, your taxiways. Following it is correct by default even when you
      cannot see why.</p>
      <p>What is not correct is following it after the picture contradicts it. The
      moment the aircraft is not where the plan assumed, the wind has shifted
      past the plan's assumption, the fuel state differs, or the fire is not the
      fire the plan described — that is when the plan has stopped being
      informative, and continuing to follow it is obedience rather than
      competence.</p>

      <h3>Deviation has a discipline</h3>
      <p>Changing plan is a decision, and it deserves the same rigour as any other
      decision on the scene:</p>
      <ul>
        <li><strong>Know what changed.</strong> Not "this doesn't look right" —
        the specific fact that differs from the assumption.</li>
        <li><strong>State it.</strong> Say it on the net. An unstated deviation is
        invisible to the commander and to everyone behind you.</li>
        <li><strong>Tell the commander</strong>, who may be the person whose
        remaining decisions depend on it.</li>
        <li><strong>Record it afterwards.</strong> The incident where a crew
        improvised intelligently and told nobody is worth nothing to the next
        crew.</li>
      </ul>
      <p>And remember the asymmetry from Course 09: because apparatus often
      respond in single file, the first vehicle establishes the route for those
      behind it and may dictate the approach into their ultimate positions
      (§12.3.25). A quiet deviation by the first crew constrains everyone who has
      not yet arrived.</p>

      <h3>Test the plan before you need it</h3>
      <ul>
        <li>Walk one aircraft type through the plan on paper and mark every
        assumption it makes.</li>
        <li>Then ask of each assumption: how old is this, and what would have to
        have changed for it to be wrong?</li>
        <li>Run the exercise with something deliberately different — wrong wind,
        different aircraft, blocked taxiway — and see whether the plan survives
        contact with a crew.</li>
        <li>Revise. A plan with a review date that has passed is a plan with an
        open question in it.</li>
      </ul>

      <blockquote>
        <p><strong>SME action:</strong> record the date and author of each
        tactical plan, the assumptions each makes, and its review cycle. Identify
        which assumptions are fleet-specific and which would be invalidated by a
        construction project, a new aircraft type, or a water point change — the
        three things most likely to have happened quietly since it was
        written.</p>
      </blockquote>
    `,
    refs: [
      'ICAO Doc 9137 Part 1 — §14.1.1 infrequency of real events',
      'ICAO Doc 9137 Part 1 — §18.3.2 human factors and drawer plans',
      'ICAO Doc 9137 Part 1 — §14.10 auxiliary modules and training beyond immediate responsibilities',
      'ICAO Doc 9137 Part 1 — §12.3.25 tactical decision-making, positioning and the first vehicle',
      'Course ART-09 — working the emergency plan',
      'Your aerodrome emergency plan — tactical plans and their review cycle'
    ],
    smeChecked: false
  },

  'art20-m2': {
    title: 'Off-airport response',
    brief:
      'Beyond the fence the problems change character, and a wheeled vehicle ' +
      'that was the right tool on the runway may be the wrong one here.',
    points: [
      'Approach and departure areas within 1 000 m of the runway threshold should be assessed.',
      'The assessment asks about nine things — environment, hazards, access, control measures, external services, and the governance tail.',
      'A wheeled fire appliance is the constraint, and it is an absolute one.',
      'Facilities need not be on the aerodrome — but a "reasonable time frame" has to be a number somebody committed to.',
      'Public highway responses need their own assessment.',
      'Somebody must hold absolute authority to decline a rescue operation.',
      'The inter-agency exercise is where this actually gets validated.'
    ],
    body: `
      <h3>An assessment, not an assumption</h3>
      <p>§13.3.1 requires that an assessment of the approach and departure areas
      <strong>within 1 000 m of the runway threshold</strong> be carried out to
      determine the options available for rescue, including the suitable resources
      that should be provided.</p>
      <p>That is a defined area with a defined purpose. Not "the surrounds" in
      general, and not an assumption that a vehicle can get anywhere on the
      aerodrome because it can get everywhere on the runway.</p>

      <h3>What the assessment has to answer</h3>
      <p>§13.3.1 does not leave this to judgement. In considering the need for any
      specialist rescue and access routes, it sets out <strong>nine</strong>
      things to be considered:</p>
      <ul>
        <li><strong>(a) the environment</strong>, in particular the topography and
        composition of the surface;</li>
        <li><strong>(b) physical hazards</strong> and associated risks that exist
        within the area;</li>
        <li><strong>(c) options for access</strong> and for RFF purposes;</li>
        <li><strong>(d) hazards, risks and control measures</strong> of the
        options for rescue;</li>
        <li><strong>(e) use of external services;</strong></li>
        <li><strong>(f) an analysis of the advantages and disadvantages</strong>
        of the options;</li>
        <li><strong>(g) policies and procedures</strong> to define and implement
        practices;</li>
        <li><strong>(h) competence standards</strong> to match the above; and</li>
        <li><strong>(i) monitoring, testing and review</strong> of the
        capability.</li>
      </ul>
      <p>Read the list as a sequence rather than a checklist. You cannot choose an
      access route (c) until you know what the surface will do to the vehicle and
      the crew (a, b). You cannot pick control measures (d) until you have picked a
      route. External services (e) are the last line, not the first, which means
      they must be known in advance rather than dialled during the incident.</p>
      <p>Then note (f) through (i), because they are the part most assessments
      leave out and they are the part that makes the assessment a system rather
      than an opinion. Weighing the options against each other, writing the
      policy that implements the chosen one, setting the competence standard
      required to deliver it, and reviewing whether any of that still holds — that
      is four pieces of work that have to be done deliberately, and none of them
      happen by accident.</p>

      <h3>Where the vehicle cannot go</h3>
      <p>Almost every off-airport problem reduces to one fact: you have wheeled
      vehicles. Their range is limited by ground clearance, tyre pressure, surface
      bearing strength, and traction. Everything else — access route, water point,
      position for the turret, where you stage additional equipment — is
      constrained by where the appliance can physically stand.</p>
      <p>That has a consequence worth stating plainly. If your assessment finds
      that the response route requires crossing ground an RFF vehicle cannot
      cross, then the honest answer is not "the crew will manage". §13.3.2 makes
      the provision explicit: aerodrome operators and RFF providers should ensure
      the development of special procedures and the availability of equipment to
      deal with accidents in these areas, and <strong>the facilities housing that
      equipment need not be located on the aerodrome</strong> if they can be made
      available within reasonable time frames by off-aerodrome agencies as
      detailed in the aerodrome emergency plan.</p>
      <p>That is permission to be honest about the gap — and it carries the
      burden with it. "Reasonable time frame" has to be a number somebody
      committed to, because on the day it is the difference between a capability
      and a hope.</p>

      <h3>Public highway responses</h3>
      <p>There is a second assessment hiding in the same clause area. Where RFF
      vehicles respond to accidents or incidents <strong>using the public
      highway</strong>, §13.3.3 requires an assessment of the implications of
      such a response to be carried out.</p>
      <p>Aircraft accidents do not stop at the aerodrome boundary, and an
      aerodrome with no public road nearby is rarer than it used to be. If your
      off-airport assessment covers only the land you own, it is incomplete.</p>

      <h3>Who is authorised to say no</h3>
      <p>§13.4 addresses training for specialist rescue vehicles, and contains
      the sentence that matters most in this whole area: it is essential to
      create team leaders who will have the <strong>absolute authority to
      determine when to mount a rescue operation</strong>. And then the reason
      that authority has to be real:</p>
      <blockquote>
        <p>There may well be occasions when prudence will decree that operations
        in intolerable conditions would merely add to the casualties without any
        reasonable expectation of success. <em>— §13.4</em></p>
      </blockquote>
      <p>Going in to help is not automatically the right answer. Somebody has to
      hold the authority to decline, and has to be able to use it without it
      reading as cowardice afterwards. That is a leadership and culture question
      long before it is a tactics question.</p>

      <h3>External services</h3>
      <p>Water, marsh, terrain, or a road that floods — each of these needs a
      capability you probably do not own. The guidance requires their use to be
      considered in the assessment, and Chapters 13.2 and 13.4 address water
      response and the training that goes with it.</p>
      <p>The trap is treating a mutual aid agreement as a capability. An agreement
      is a piece of paper describing a resource that may be unavailable, unstaffed,
      or unable to reach you. Confirm the arrangement is live, the resource exists,
      and someone has practised using it.</p>

      <h3>Validate it with people who are not you</h3>
      <p>§13.5 requires inter-agency exercises, and for off-airport response that
      is where this topic is genuinely proven rather than asserted. The service
      that reads your assessment with fresh eyes is the local fire department, the
      water rescue capability, or whoever else is named in it.</p>
      <p>Then walk the route. Physically. An assessment is a document; a route
      that has been driven by the people who will use it is knowledge.</p>

      <blockquote>
        <p><strong>SME action:</strong> produce the §13.3.1 assessment for your
        own approach and departure areas, with a date and an author. Identify any
        area where your current vehicles cannot reach and state plainly what
        capability closes the gap. Confirm every external service in the
        assessment is currently in force, and schedule the next inter-agency
        exercise — and include an off-airport scenario in it rather than a runway
        scenario.</p>
      </blockquote>
    `,
    refs: [
      'ICAO Doc 9137 Part 1 — §13.3.1 the nine assessment factors; §13.3.2 special procedures and off-aerodrome facilities; §13.3.3 public highway response',
      'ICAO Doc 9137 Part 1 — §13.4 training and the authority to decline a rescue operation; §13.5 inter-agency exercises',
      'ICAO Doc 9137 Part 1 — §13.2 accidents in the water',
      'Your aerodrome emergency plan — off-airport response and mutual aid',
      'Course ART-10 — rescue hazards'
    ],
    smeChecked: false
  },

  'art20-m3': {
    title: 'Multiple and simultaneous incidents',
    brief:
      'Two events do not arrive one after the other. They arrive at once, ' +
      'and the arithmetic is unforgiving.',
    points: [
      'Three classifications, and they mean different things: accident, full emergency, local standby.',
      'Local standby includes bomb threats and other incidents — it can become a real one.',
      'Know the minimum information you are owed: aircraft type, type of accident/incident, time and (grid) location.',
      'Two events halve the capability available to each. That is arithmetic, not pessimism.',
      'Holding a standby has a real cost, and it is not zero.',
      'Decide deliberately which resource is committed and which is held — and say it aloud.'
    ],
    body: `
      <h3>Three states, not one</h3>
      <p>§11.2.1 classifies the aircraft emergencies for which services may be
      required, and the distinction is operationally significant:</p>
      <ul>
        <li><strong>Aircraft accident</strong> — an accident which has occurred
        on or in the vicinity of the aerodrome.</li>
        <li><strong>Full emergency</strong> — instituted when an aircraft
        approaching the aerodrome is, or is suspected to be, in such trouble that
        there is danger of an accident.</li>
        <li><strong>Local standby</strong> — instituted when an approaching
        aircraft is known or suspected to have developed some defect, but the
        problem is not such as would normally involve serious difficulty in
        effecting a safe landing. <strong>This includes bomb threats and other
        incidents.</strong></li>
      </ul>
      <p>The last point is the one that catches experienced crews. A local
      standby is not a quiet nothing. It can be a security incident that turns
      into an evacuation, and a service that treated it as a routine standby
      posture will have spent the intervening time standing down.</p>

      <h3>What you are owed, before you can decide anything</h3>
      <p>For an aircraft accident, §11.2.3 sets what the RFF service should
      receive <em>as a minimum</em>:</p>
      <ul>
        <li>type of aircraft;</li>
        <li>type of accident/incident; and</li>
        <li>time and (grid) location of the accident/incident.</li>
      </ul>
      <p>That is the basis for the whole tactical picture, and it is worth
      insisting on all three. A call giving a type but no grid location cannot be
      planned against. A call giving a grid location but no type cannot be sized
      against — and sizing is the discipline from Course 03, where the whole
      tactical plan depends on which aircraft it is.</p>
      <p>Subsequent calls are expected to expand this: number of occupants, fuel
      on board, aircraft operator, and any dangerous goods on board including
      quantity and location if known (§11.2.3). That expansion matters for the
      second incident as much as the first — fuel on board is often the first
      useful number you get, and it is what tells you whether the standby is
      worth keeping.</p>
      <p>Note the full-emergency list in §11.2.4 is <em>longer</em> than the
      accident list, not shorter: type of incident, aircraft type, fuel on board,
      number of occupants including special occupants, nature of trouble, runway
      to be used, estimated time of landing, and dangerous goods. A full emergency
      gives you more information, and you have more time to use it. It is the
      confirmed accident that arrives with three facts and no more.</p>
      <p>§11.2.2 notes that for each of these states, ATC is expected to take
      action as described, giving where necessary rendezvous point and airport
      entrance to be used. For a full emergency that is the difference between
      positioning at the runway end and positioning to intercept.</p>

      <h3>The arithmetic</h3>
      <p>Two events do not arrive sequentially. They arrive together, and the
      capability available to each is the total divided by the number of
      incidents in progress.</p>
      <p>That has a consequence people avoid confronting: whichever incident you
      choose to hold back for is one where the response is a second longer, with
      fewer vehicles, and no reserve. If it turns into a major aircraft fire, the
      service is now performing a single-incident response with half the resource
      it sized for.</p>

      <h3>What holding actually costs</h3>
      <p>Both directions of error are serious, and they are not symmetric in the
      eyes of the people involved.</p>
      <ul>
        <li><strong>Commit too early.</strong> The first incident turns out to be
        minor, and the service committed to it has stripped the aerodrome. The
        second event has nothing.</li>
        <li><strong>Hold too long.</strong> The held incident becomes real, and
        the first crew arrives at a major fire without the vehicles, the agent, or
        the crew that sized the response.</li>
      </ul>
      <p>So the decision needs to be made deliberately and stated aloud — which
      resource is committed, which is held, and on what trigger the held resource
      moves. A trigger decided during the incident is a trigger decided too late,
      for the same reason the withdrawal criteria in Course 16 have to be written
      down in advance.</p>

      <h3>What good looks like</h3>
      <ul>
        <li>a stated position for the common cases — two full emergencies, a
        standby that escalates while a standby of another aircraft develops;</li>
        <li>a named decision-maker, and a stated trigger for committing reserve
        resource;</li>
        <li>the interaction with ATC settled, including who calls for what;</li>
        <li>the interaction with mutual aid, since two incidents is the situation
        that assistance agreements exist for;</li>
        <li>it exercised. Two-incident scenarios are the most valuable thing a
        full-scale exercise can simulate.</li>
      </ul>

      <blockquote>
        <p><strong>SME action:</strong> state your position for simultaneous and
        multiple incidents: which resource is committed first, who decides, on
        what trigger the held resource moves, and how this interacts with your
        mutual aid arrangements. Confirm your crews know that local standby
        includes bomb threats and other incidents, and are briefed on what
        escalates it. Then confirm your exercise programme includes a
        two-incident scenario, and record the result.</p>
      </blockquote>
    `,
    refs: [
      'ICAO Doc 9137 Part 1 — §11.2.1 emergency classification; §11.2.2 ATC action; §11.2.3 information supplied',
      'ICAO Doc 9137 Part 1 — §11.1 airport emergency plan',
      'Your aerodrome emergency plan — multiple incidents and resource commitment',
      'Your mutual aid agreements',
      'Course ART-19 — full-scale exercise'
    ],
    smeChecked: false
  },

  'art20-m4': {
    title: 'Decision making under pressure',
    brief:
      'Most errors on an RFF scene are not bad decisions. They are good ' +
      'decisions taken at the wrong interface.',
    points: [
      'Most crews are rarely tested by real events, so judgement must be built deliberately.',
      'The SHEL model: people against hardware, software, colleagues and environment.',
      'The interface matters as much as the components. A mismatch is a source of error.',
      'Communication is possibly the most important human factor in the operation.',
      'Station design and vehicle ergonomics are human-factors issues, not building issues.',
      'Two pillars: operational effectiveness, and the safety and well-being of your own people.',
      '§18.5 names the unglamorous items: PTSD counselling, hearing protection and NID tests, fatigue and shift systems.'
    ],
    body: `
      <h3>Why this belongs in an ARFF course</h3>
      <p>Because the precondition for every decision on your scene is the one in
      §14.1.1: you are rarely called upon to face a serious situation involving
      lifesaving at a major aircraft fire. Standbys and near-misses will not teach
      you to decide under pressure, because they are not pressure.</p>
      <p>Which means the skill has to be developed deliberately, in the
      conditions where it can be developed safely — and that requires a framework
      rather than encouragement.</p>

      <h3>SHEL: four interfaces</h3>
      <p>Chapter 18 applies the SHEL model to RFF, classifying the application of
      human factors principles into four pairings of the person with their
      surroundings (§18.2):</p>
      <ul>
        <li><strong>Liveware vs. Hardware</strong> — people and machines;</li>
        <li><strong>Liveware vs. Software</strong> — people and procedures;</li>
        <li><strong>Liveware vs. Liveware</strong> — people and colleagues;</li>
        <li><strong>Liveware vs. Environment</strong> — people and workplace.</li>
      </ul>
      <p>And the observation that does the work:</p>
      <blockquote>
        <p>In this model the match or mismatch of the blocks (interface) is just
        as important as the characteristics of the blocks themselves. A mismatch
        can be a source of human error. <em>— Figure 18-1, the SHEL model as
        modified by Hawkins</em></p>
      </blockquote>
      <p>That reframes the problem. Most errors on a scene are not bad decisions.
      They are <em>correct</em> decisions made against an interface that does not
      fit: a switch in the wrong place, a display in a different position from
      the last appliance, a procedure written for a vehicle you no longer have, a
      radio with controls the crew member cannot find under stress.</p>

      <h3>Hardware you live with every shift</h3>
      <p>§18.4.3 argues that RFF operations require proficiency in operating fire
      vehicles and rescue equipment, and then draws out a consequence that is
      often missed in procurement: the fire vehicle is a vital asset that
      <strong>must be designed to take into account the human instinct and
      intuition of the vehicle operator</strong>. Sufficient emphasis should be
      placed on the design ergonomics of fire vehicles during the prefabrication
      stage, in order to optimise human performance during training and
      operations.</p>
      <p>So controls move to the driver, not the manufacturer. Unless you are
      involved in specifying a vehicle, you cannot fix this — but you can be the
      person who raises it, and you certainly are the person who lives with it.</p>

      <h3>The building is a human-factors issue too</h3>
      <p>§18.4.4 is worth reading twice by anyone who has ever walked out of a
      fire station to a vehicle. The design of fire stations is another important
      factor that could affect the human performance of RFF personnel when
      responding to aircraft accidents or incidents — tagged Liveware vs.
      Environment, because the building is the interface. This is especially
      relevant for large aerodromes which provide a high category of runway fire
      protection. Fire stations in such aerodromes are typically larger, thus
      <strong>requiring RFF personnel to travel a longer distance before
      reaching their fire vehicles</strong>. Such considerations must therefore be
      taken into account during the design phase so that the service is able to
      meet the stipulated response time in the event of an aircraft
      emergency.</p>
      <p>Those extra seconds are added at the precise moment when the crew most
      needs to be thinking about the aircraft instead — and they are added to the
      response time in §2.7, which has a hard limit.</p>

      <h3>Communication, and the last word</h3>
      <p>§18.4.5 makes the strongest claim in the chapter: communication is
      <strong>possibly the most important human factor in RFF operations</strong>.
      Operational readiness and safety standards will be compromised without
      effective communication among RFF personnel, air traffic control and
      pilots.</p>
      <p>And then the design requirement that follows, which is easy to miss
      because it sounds like an obviousity: the type of communications equipment
      and the transmission of messages must allow critical information to be
      <strong>conveyed, assimilated, processed and executed</strong>. Four
      distinct steps, and the last three are not the radio's job. Equipment that
      transmits is not thereby sufficient. Training has to carry the rest, or the
      information arrives and does nothing.</p>

      <h3>Two pillars, and the second one is about you</h3>
      <p>§18.3.3 splits human factors in RFF into operational effectiveness and
      standards, and the safety and well-being of RFF personnel. Two pillars, and
      the second is about the responders rather than the aircraft.</p>
      <p>§18.5 is specific about what that involves, and it is worth reading
      because the items are unglamorous, cheap and easy to skip:</p>
      <ul>
        <li><strong>§18.5.1</strong> — responders may suffer post-traumatic
        stress disorders, and psychological treatment and counselling should be
        provided after a major crisis, from a welfare <em>and</em> a business
        continuity standpoint. It can be provided by trained colleagues or, more
        likely, external medical institutions — and arrangements for the latter
        should be formalised in mutual aid agreements or the aerodrome emergency
        plan.</li>
        <li><strong>§18.5.3</strong> — not all personnel can meet the same
        physical fitness standard, and management has to accept that rather than
        quietly managing around it.</li>
        <li><strong>§18.5.4</strong> — noise is omnipresent because fire stations
        sit close to the runway and movement areas. It disrupts message
        transmission, and long-term regular exposure carries real health
        implications. Suitable hearing protection must be issued and mandated, and
        personnel subject to constant exposure should have regular noise-induced
        deafness hearing tests.</li>
        <li><strong>§18.5.5</strong> — fatigue is directly affected by the shift
        system, and beyond local labour rules there must be consideration given
        to ensuring sufficient rest despite the need to be on 24-hour
        operational readiness.</li>
      </ul>
      <p>Every lesson in this course has been about capability. Keep the other
      pillar in view while delivering it: heat, smoke, noise, adrenaline,
      fatigue, near misses, and the cumulative effect of all of them. A service
      that achieves operational effectiveness by degrading its people has moved
      the cost rather than removed it.</p>

      <blockquote>
        <p><strong>SME action:</strong> walk your service through all four SHEL
        pairings and record the mismatches you find — controls and displays on
        your appliances, procedures written for equipment you no longer have,
        familiarity within each crew, and station layout and travel distance.
        Prioritise the mismatches that would most plausibly cause an error under
        stress, and put a name and a date against each. Confirm your
        communications assessment covers the full convey–assimilate–process–execute
        chain rather than only whether the radio works.</p>
      </blockquote>
    `,
    refs: [
      'ICAO Doc 9137 Part 1 — §18.1 to §18.3 human factors principles and the SHEL model',
      'ICAO Doc 9137 Part 1 — §18.4.3 vehicle ergonomics; §18.4.4 fire station design; §18.4.5 communication',
      'ICAO Doc 9137 Part 1 — §18.5.1 psychological support; §18.5.3 fitness standards; §18.5.4 noise; §18.5.5 fatigue',
      'ICAO Doc 9137 Part 1 — §14.1.1 why training must carry the capability',
      'Course ART-18 — communications'
    ],
    smeChecked: false
},
'art03-m1': {
  title: 'The level tables, properly read',
  brief:
    'The category table is the contract between your airport and the standard. ' +
    'Most services read the number and miss the conditions attached to it.',
  points: [
    'The table (Doc 9137 Part 1 Table 2-3 / Annex 14 Table 9-1) is the minimum your service must hold. It is not a recommendation.',
    'Category is determined by the longest aircraft and its fuselage width, not by the fleet average. One aircraft can set your category.',
    'Performance level of foam (A, B, C) changes every water figure in the row. You must quote the level with the number.',
    'The table assumes an average aircraft per category. Larger-than-average operations require a recalculation under §2.3.7.',
    'Response time is a separate column in the same table. Holding the water is not enough; it must arrive in the time window.',
    'The water quantity in the table is for the service, not for one incident. The practical critical area is a worst-case assumption, not a targeting instruction.'
  ],
  body: `
    <h3>The table is the contract</h3>
    <p>Open Doc 9137 Part 1 at Table 2-3. Or Annex 14 Volume I at Table 9-1. They are the same table, and that table is the minimum your service must hold and deliver. It is not a recommendation and it is not a suggestion. If your aerodrome is category 7, the figures in the category 7 row are what you must be able to deploy.</p>

    <h3>How the category is decided</h3>
    <p>The determination method is given in Doc 9137 §2.1.2: <strong>the airport category for RFF should be based on the overall length of the longest aeroplanes normally using the airport and their maximum fuselage width</strong>. The airport category should be determined using Table 2-1 by categorising the aeroplanes using the airport, by first evaluating their overall length and maximum fuselage width.</p>
    <p>That is it. One aircraft, if it is the longest and widest in the schedule, sets the category for the entire aerodrome. There is no averaging, no weighting by movement count, and no discretion in the table itself. If you have a weekly 777 and everything else is a 737, you are category 8 or 9 depending on the 777 variant. The fleet mix is irrelevant to the table; it only matters to the staffing arithmetic in ART-01 m4.</p>

    <h3>The width step function</h3>
    <p>The width bands are discrete: up to 2 m, 2–3 m, 3–4 m, 4–5 m, 5–6 m, 6–7 m, and above 7 m. A fuselage of 6.20 m is in the 6–7 m band. A fuselage of 7.01 m is in the >7 m band. That 0.01 m difference moves the category up by one step on some length bands, and it moves the water quantity by roughly 25% — because the critical area formula uses (30 + W) and the percentage for Q2 jumps at the next category. Measure it correctly.</p>

    {{diagram:level-determination}}

    <h3>The row you read must name the foam</h3>
    <p>Every number in the table is predicated on a foam performance level. Doc 9137 §2.3.5 states: <strong>the amounts of water specified for foam production are predicated on an application rate of 8.2 L/min/m² for a foam meeting performance level A, 5.5 L/min/m² for a foam meeting performance level B and 3.75L/min/m² for a foam meeting performance level C. These application rates are considered to be the minimum rates at which control can be achieved within one minute</strong>.</p>
    <p>The table is usually printed for level A foam. If you stock level B, every water figure in the row must be multiplied by 5.5 / 8.2 (approximately 0.67). If you stock level C, multiply by 3.75 / 8.2 (approximately 0.46). Never quote a water quantity without naming the performance level it assumes. And do not mix performance levels at one aerodrome — §2.3.10 states: <strong>there may be aerodromes that use more than one type of performance level foams, such as a combination of level A and B foams, which could lead to error in quantity calculation or replenishment. The use of a combination of different performance level foams at an aerodrome is therefore not encouraged.</strong></p>

    <h3>The table assumes an average aircraft</h3>
    <p>Table 2-4 in Doc 9137 lists a representative aircraft per category with a specific length and width. That representative aircraft is used to derive the numbers in Table 2-3. If your actual aircraft exceeds the representative dimensions for the category — which is common with modern widebodies — §2.3.7 requires: <strong>from 1 January 2015, at aerodromes where operations by aeroplanes larger than the average size in a given category are planned, the quantities of water shall be recalculated and the amount of water for foam production and the discharge rates for foam solution shall be increased accordingly</strong>. This is a <em>shall</em> provision, not a suggestion. The table is the floor; your actual fleet may raise the ceiling.</p>

    <h3>Response time is in the same table</h3>
    <p>Doc 9137 §2.7.1 states: <strong>the operational objective of the RFF service should be to achieve response times of two minutes and not exceeding three minutes to the end of each runway, as well as to any other part of the movement area, in optimum conditions of visibility and surface conditions</strong>. Response time is considered to be the time between the initial call to the RFF service and the time when the first responding vehicle(s) is(are) in position to apply foam at a rate of at least 50 per cent of the discharge rate specified in Table 2-3.</p>
    <p>The guidance also requires additional vehicles to arrive within three minutes and no more than four, so that application is continuous (§2.7.3): <strong>any other vehicles required to deliver the amounts of extinguishing agents specified in Table 2-3 should arrive in three minutes and no more than four minutes from the initial call so as to provide continuous agent application</strong>. A foam blanket that breaks up because the second wave arrived late has to be rebuilt from nothing.</p>

    <h3>What the table is not</h3>
    <p>The water quantity in the table is for the <em>service</em>, not for one incident. It is calculated against the practical critical area of a worst-case fuel spill against the fuselage. An engine fire, an APU fire, a wheel fire — none of these get the whole practical critical area. Applying the table quantity to a localised fire is a serious error and the single most common misuse of this calculation.</p>

    <blockquote>
      <p><strong>SME action:</strong> identify the longest and widest aircraft in your current schedule and confirm the category it sets; state the foam performance level actually stocked and confirm the table row you are using matches it; confirm whether any aircraft exceeds the category average and whether the §2.3.7 recalculation has been done; record your measured response times against the table column; and check all of this against your State's adopted requirements, which may differ from the ICAO table.</p>
    </blockquote>
  `,
  refs: [
    'ICAO Doc 9137 Part 1 — §2.1.2 category determination by longest aeroplane and maximum fuselage width; Table 2-1 and Table 2-3',
    'ICAO Doc 9137 Part 1 — §2.3.5 foam performance levels and application rates (8.2 / 5.5 / 3.75L/min/m²)',
    'ICAO Doc 9137 Part 1 — §2.3.7 recalculation for larger-than-average aircraft (shall provision from 1 January 2015)',
    'ICAO Doc 9137 Part 1 — §2.3.10 use of combination of different performance level foams not encouraged',
    'ICAO Doc 9137 Part 1 — §2.7.1 response time objective (two minutes, not exceeding three); §2.7.3 continuous application (additional vehicles within 3–4 minutes)',
    'ICAO Annex 14 Volume I — §9.2.2 to §9.2.4 level determination; §9.2.27 and §9.2.28 response time Standard and Recommended Practice; Table 9-1',
    'Your national Civil Aviation Authority requirements — confirm which instrument and issue binds you'
  ],
  smeChecked: false
},
'art03-m2': {
  title: 'Principal versus complementary agents',
  brief:
    'They are not interchangeable. The standard defines what each does, and ' +
    'the substitution ratios are where most services lose the plot.',
  points: [
    'Principal agent (foam) controls and extinguishes. Complementary agent (dry chemical) knocks down three-dimensional and running fuel fires. They do different jobs.',
    'Substitution is not free. 1 kg complementary agent = 1.0 L water for level A foam only (§2.3.11). Higher ratios need test evidence from your State.',
    'Using different foam performance levels at one aerodrome is not encouraged — it leads to error in quantity calculation or replenishment (§2.3.10).',
    'Complementary agent totals are given by aerodrome category in Table 2-3 (45 kg at Cat 1 up to 450 kg at Cat 8–10), not per vehicle.',
    'Total agent carried = principal agent quantity + complementary agent quantity. They are not netted against each other except in replenishment at the approved ratio.',
    'The foam concentrate reserve is 200% of the Table 2-3 quantity for vehicle replenishment (§2.3.4, §2.6.1). Complementary agent reserve is 100% (§2.6.2).'
  ],
  body: `
    <h3>Two agents, two jobs</h3>
    <p>The distinction is not academic. Doc 9137 §2.3.1 defines the principal agent as the agent used to control and extinguish the fire — and for aviation that is foam. The complementary agent is dry chemical powder, and its role is specifically to achieve rapid knockdown of <strong>three-dimensional fires</strong> (engine, APU, running fuel) where foam alone is too slow to penetrate the flame envelope.</p>
    <p>This is why the standard gives them separate calculations, separate carriage requirements, and separate replenishment rules. Treating them as a single pool of "agent" is the error that leaves a crew with foam when they need powder, or powder when they need foam.</p>

    <h3>Principal agent — the foam calculation you already know</h3>
    <p>The water quantity Q from the critical area method (lesson m3) is the principal agent requirement. That gives the water volume. The foam concentrate is then calculated at the mix ratio of the foam you stock — typically 3%, 1% or 0.5% — and §2.3.4 requires the concentrate quantity to be kept in proportion to the water carried.</p>
    <p>And there is a reserve. §2.3.4 / §2.6.1 require a foam concentrate reserve of <strong>200 per cent of the quantities of these agents identified in Table 2-3</strong> for vehicle replenishment purposes. That is not 200% of what is in the vehicles — it is 200% of the table figure. If the table says 1 185 L of concentrate, the reserve is 2 370 L, and the total concentrate you must hold is the sum.</p>

    <h3>Complementary agent — the dry chemical totals</h3>
    <p>Table 2-3 lists the complementary agent quantity by aerodrome category (column 8): 45 kg at category 1, 90 kg at category 2, 135 kg at categories 3–4, 180 kg at category 5, 225 kg at categories 6–7, and 450 kg at categories 8–10. These are the <em>total</em> quantities to be provided at the aerodrome, not per vehicle. The standard does not specify a per-vehicle minimum in Doc 9137; that allocation is left to national requirements or the aerodrome's own vehicle establishment.</p>
    <p>§2.6.2 also specifies a complementary agent reserve: <strong>100 per cent of the quantity identified in Table 2-3</strong>.</p>

    <h3>Substitution is not one-for-one without proof</h3>
    <p>This is the clause that catches services out. §2.3.11 says:</p>
    <ul>
      <li>For foam <strong>performance level A</strong>, <strong>1 kg of a complementary agent shall be taken as equivalent to 1.0 L of water for production of a foam meeting performance level A</strong>.</li>
      <li><strong>Higher equivalencies for complementary agents may be used if results of tests conducted on the complementary agents used by the State have indicated higher efficiencies</strong>.</li>
      <li>When any other complementary agent is used, the substitution ratios need to be checked.</li>
    </ul>
    <p>Read that carefully. If you stock level B or C foam and want to substitute dry chemical for water, you cannot assume 1 kg = 1 L. You need test evidence from your Civil Aviation Authority. The 1:1 ratio is only for level A foam. And if you are using a different complementary agent (not standard dry chemical), you need its own ratio.</p>

    <h3>The two totals are separate</h3>
    <p>There is no netting. The service must hold the full principal agent quantity AND the full complementary agent quantity. You do not subtract one from the other. The only place substitution appears is in the <em>replenishment</em> arithmetic — if you use complementary agent to knock down a running fuel fire, the water you save can be accounted against the foam replenishment, but only at the approved ratio.</p>

    <h3>Mixing performance levels is not encouraged</h3>
    <p>§2.3.10 is direct: <strong>there may be aerodromes that use more than one type of performance level foams, such as a combination of level A and B foams, which could lead to error in quantity calculation or replenishment. The use of a combination of different performance level foams at an aerodrome is therefore not encouraged.</strong></p>
    <p>If one vehicle carries level A and another carries level B, the discharge rate calculations, the water quantities, and the substitution ratios all become ambiguous. Standardise on one performance level per aerodrome.</p>

    <blockquote>
      <p><strong>SME action:</strong> list every vehicle and the agent it carries (foam type, performance level, mix ratio, concentrate volume; complementary agent type and mass); confirm the complementary agent total from Table 2-3 for your category is met; state the substitution ratio you are using and the test evidence from your State if it is not 1 kg = 1 L for level A; confirm the foam concentrate reserve (200% of table quantity) and complementary agent reserve (100% of table quantity) are held; and confirm no mixing of performance levels at the aerodrome.</p>
    </blockquote>
  `,
  refs: [
    'ICAO Doc 9137 Part 1 — §2.3.1 principal and complementary agent definitions',
    'ICAO Doc 9137 Part 1 — §2.3.4 foam concentrate proportion; §2.3.5 performance levels; Table 2-3 complementary agent totals by category',
    'ICAO Doc 9137 Part 1 — §2.3.10 combination of different performance level foams not encouraged; §2.3.11 substitution ratios (1 kg = 1.0 L for level A; higher ratios need State test evidence)',
    'ICAO Doc 9137 Part 1 — §2.6.1 foam concentrate reserve (200% of Table 2-3); §2.6.2 complementary agent reserve (100% of Table 2-3)',
    'ICAO Annex 14 Volume I — §9.2.8 to §9.2.10 extinguishing agents (principal and complementary)',
    'Your national Civil Aviation Authority requirements — confirm substitution ratios, test evidence requirements, and any per-vehicle carriage minimums'
  ],
  smeChecked: false
},
'art03-m4': {
  title: 'Consumption under real conditions',
  brief:
    'The table is a laboratory figure. Wind, temperature, foam quality, ' +
    'application technique and vehicle dynamics change what actually happens.',
  points: [
    'The table assumes optimum visibility and surface conditions. Real conditions are never optimum.',
    'Wind degrades the foam blanket. The critical area formula already assumes 24 m upwind / 6 m downwind for large aircraft (§2.4.3), but sustained wind above 10 km/h increases real consumption significantly.',
    'Foam quality at the nozzle is not foam quality in the drum. Proportioning errors, degraded concentrate, and water supply characteristics all reduce the expansion and drainage time that the application rate assumes (§8.1.11).',
    'Application technique matters. Sweeping too fast leaves gaps; too slow wastes agent. The rate is an average over the whole practical critical area in one minute — not a peak at one spot.',
    'Multiple vehicles must coordinate. If two vehicles attack the same sector, the foam blankets merge and you waste water; if they leave a gap, the fire breaths through it.',
    'Temperature affects concentrate viscosity and proportioning accuracy. Cold weather procedures are not optional — they are the difference between a working foam blanket and water with bubbles.',
    'The reserve exists for a reason. §2.6.1 requires 200% concentrate reserve. Vehicles will need to replenish, and the time to do it is part of the continuous application requirement (§2.7.3).'
  ],
  body: `
    <h3>The table is a laboratory figure</h3>
    <p>Everything in Table 2-3 / Table 9-1 is derived under controlled assumptions: level ground, no wind, concentrate at specification, proportioning at the stated ratio, application by a trained operator in a standard vehicle, and the fire being a uniform pool over the practical critical area. Real incidents meet none of those perfectly. This lesson is about the gap between the table and the tarmac.</p>

    <h3>Wind is the first thief</h3>
    <p>The critical area formula already builds in a wind asymmetry — for aircraft 24 m or longer, the theoretical critical area extends <strong>from the fuselage to a distance of 24 m upwind and 6 m downwind</strong> (§2.4.3). That is the geometric assumption. But sustained wind above approximately 10 km/h does three things the formula does not see:</p>
    <ul>
      <li>It stretches the foam blanket, thinning it on the upwind edge where the fire is hottest.</li>
      <li>It increases the drainage rate — the water separates from the bubbles faster, and the blanket loses its sealing capability.</li>
      <li>It pushes the agent off-target, so a higher proportion of the discharged foam never reaches the fuel surface.</li>
    </ul>
    <p>There is no simple multiplier in the standard for wind. The practical answer is that your foam performance level should have margin. If you are at the edge of what level B foam can do on a still day, you will fail on a windy one. This is why many aerodromes specify level A foam even when the table would allow level B.</p>

    <h3>Foam at the drum is not foam at the nozzle</h3>
    <p>The application rates in §2.3.5 (8.2 / 5.5 / 3.75 L/min/m²) assume the foam meets the specification at the nozzle. Three things break that assumption before the agent leaves the turret:</p>
    <ul>
      <li><strong>Proportioning error.</strong> A 3% foam at 2.5% or 3.5% changes expansion and drainage time enough to move the effective performance level by half a grade. §8.1.7.4 requires induction systems to induce with a tolerance of ±10% of the desired induction percentage at optimum working conditions.</li>
      <li><strong>Degraded concentrate.</strong> Foam concentrate has a shelf life. Old stock, stock stored in sunlight, stock that has been frozen and thawed — all produce lower expansion and faster drainage. §8.1.7.1 requires: <strong>the in-service test of equipment should be carried out in accordance with the manufacturers instructions: a) to ensure the ongoing capability of the foam production system; and b) should be performed at least every twelve months</strong>.</li>
      <li><strong>Water supply characteristics.</strong> §8.1.11 states: <strong>the quality of foam produced by a vehicle system may be affected by the characteristics of the local water supply. It is important to acquire an adequate clear water supply, the suitability of which should be verified with the approval of the foam concentrate manufacturer. No corrosion inhibitors, freezing point depressants or other additives should be used in the water supply without prior consultation with, and the approval of, the foam concentrate manufacturer</strong>. Hard water, salt water, water with surfactants from previous wash-down — all interfere with the foam chemistry.</li>
    </ul>
    <p>If your proportioning system has not been calibrated in the last twelve months, and your concentrate has not been tested in the last twelve months, the number in the table is not the number you are producing.</p>

    <h3>Technique is a multiplier</h3>
    <p>The rate is an average over the whole practical critical area in one minute. That means the operator must sweep the turret such that every square metre of the area receives the design application rate averaged over the minute. Two failure modes:</p>
    <ul>
      <li><strong>Sweeping too fast.</strong> The foam is laid in stripes with gaps. The fire burns through the gaps and the blanket never forms.</li>
      <li><strong>Sweeping too slow.</strong> The foam piles up in the first half of the area and the second half gets nothing. The total volume discharged looks right on the gauge, but the fire is not controlled.</li>
    </ul>
    <p>This is why the standard requires continuous application (§2.7.3) and why training on the turret is not optional. A crew that can hit the rate on a calm day with a clean system will still fail if the operator has never practised the sweep.</p>

    <h3>Multiple vehicles, one blanket</h3>
    <p>When two or more vehicles attack the same fire, their foam blankets must merge into a single continuous blanket. That requires:</p>
    <ul>
      <li>A pre-agreed sector division so the edge of one vehicle's sweep meets the edge of the next without overlap or gap.</li>
      <li>Matching foam types and performance levels — mixing level A and level B on the same fire creates a blanket with two different drainage times, and the weaker section fails first. §2.3.10 states that the use of a combination of different performance level foams at an aerodrome is not encouraged because it could lead to error in quantity calculation or replenishment.</li>
      <li>Communication so the incident commander can adjust sectors as the wind shifts.</li>
    </ul>

    <h3>Temperature and cold weather</h3>
    <p>Concentrate viscosity rises as temperature falls. Below approximately 5°C, proportioning systems that are calibrated at 20°C will under-dose unless they have temperature compensation. The foam that reaches the nozzle will be lean, and the blanket will drain fast. Cold weather procedures — heating the concentrate tank, recalibrating the proportioner, or using a winter-rated concentrate — are not optional. They are the difference between a working foam blanket and water with bubbles.</p>

    <h3>The reserve is not a decoration</h3>
    <p>§2.6.1 requires a foam concentrate reserve of 200% of the Table 2-3 quantity for vehicle replenishment. This is not a theoretical figure. In a real incident, the first wave of vehicles discharges their load in the first minutes. The second wave must arrive within three to four minutes (§2.7.3) and the first wave must replenish and return or be replaced. The reserve is what feeds the replenishment. If you do not hold it, continuous application stops when the first vehicles run dry.</p>

    <h3>Consumption accounting</h3>
    <p>The honest way to close this lesson is to give you a checklist for your next exercise or real event. Record these and compare them to the table:</p>
    <ol>
      <li>Wind speed and direction at the scene, and whether the foam blanket held on the upwind edge.</li>
      <li>Foam expansion ratio and 25% drainage time measured at the nozzle during the event (or the last calibration if you cannot measure live).</li>
      <li>Concentrate batch number, age, and last test result.</li>
      <li>Proportioning ratio measured at the pump during the event.</li>
      <li>Water source and quality — verified with the foam concentrate manufacturer per §8.1.11.</li>
      <li>Turret sweep speed and sector assignments per vehicle.</li>
      <li>Time each vehicle ran dry and time it returned to the fire after replenishment.</li>
      <li>Total water and concentrate consumed versus the table figure for the category.</li>
    </ol>
    <p>If your consumed quantity is within 10% of the table figure under real conditions, your system is tight. If it is 50% over, find the leak — it is usually proportioning, technique, or wind, not the table.</p>

    <blockquote>
      <p><strong>SME action:</strong> run a full-consumption exercise with your actual fleet, foam, water and operators. Measure everything in the checklist above. Compare to the table figure for your category and foam performance level. Document the delta and the reasons. Then confirm your cold weather procedures are written, tested, and match the concentrate you actually stock.</p>
    </blockquote>
  `,
  refs: [
    'ICAO Doc 9137 Part 1 — §2.4.3 wind asymmetry in critical area (24 m upwind / 6 m downwind); §2.4.8 application rate and time',
    'ICAO Doc 9137 Part 1 — §2.3.5 foam performance levels; §8.1.3 to §8.1.6 foam specifications; §8.1.7 in-service testing (12-month interval, ±10% induction tolerance); §8.1.11 water supply quality verified with manufacturer',
    'ICAO Doc 9137 Part 1 — §2.3.10 combination of different performance level foams not encouraged; §2.7.3 continuous application (additional vehicles within 3–4 minutes)',
    'ICAO Doc 9137 Part 1 — §2.6.1 foam concentrate reserve (200% of Table 2-3); §2.7.3 additional vehicle arrival',
    'ICAO Annex 14 Volume I — §9.2.30 to §9.2.33 extinguishing agents; §9.2.35 response time',
    'Your foam manufacturer data sheet — shelf life, temperature limits, proportioning tolerance',
    'Your national Civil Aviation Authority requirements — confirm any additional reserves or testing mandates'
  ],
  smeChecked: false
},
'art02-m1': {
  title: 'Aircraft categories',
  brief:
    'Category is not a label. It is the single number that scales every ' +
    'downstream requirement — water, foam, vehicles, discharge rate, response time.',
  points: [
    'Category is determined by the longest aircraft and its fuselage width. One aircraft can set the category for the whole aerodrome.',
    'The category table (Doc 9137 Table 2-1 / Annex 14 Table 9-1 note) is a discrete step function. A 0.01 m width difference can jump the category.',
    'Overall length is used, not fuselage length. The whole aircraft must be protected because fire through the skin puts the fire inside.',
    'Category 1 to 10 maps to increasing aircraft size. There is no category 0 and no category above 10.',
    'The fleet mix is irrelevant to the table. The longest, widest aircraft in the schedule sets the category.',
    'Changing the schedule can change the category. The determination must be revisited when the operation changes.'
  ],
  body: `
    <h3>Category is the input to everything</h3>
    <p>If you get the category wrong, every number that follows is wrong — the water quantity, the foam concentrate, the complementary agent, the number of vehicles, the discharge rate, the response time objective. The category is the single scalar that scales the entire service.</p>

    <h3>How the category is determined</h3>
    <p>The method is given in Doc 9137 §2.1.2: <strong>the airport category for RFF should be based on the overall length of the longest aeroplanes normally using the airport and their maximum fuselage width</strong>. The airport category should be determined using Table 2-1 by categorising the aeroplanes using the airport, by first evaluating their overall length and maximum fuselage width.</p>
    <p>This is a two-step lookup:</p>
    <ol>
      <li>Find the <strong>overall length</strong> of the longest aircraft in normal operations. Use the overall length (tip to tail), not the fuselage length. Doc 9137 §2.4.4 states: <strong>the overall length of the aircraft is considered appropriate for the theoretical critical area as the entire length of aircraft must be protected from burning. If not, the fire could burn through the skin and enter the fuselage. Also, other aircraft such as T-tail aircraft often have engines or exit points in this extended portion</strong>.</li>
      <li>Find the <strong>maximum fuselage width</strong> of that aircraft.</li>
      <li>Enter Table 2-1 (Doc 9137) / Table 9-1 note (Annex 14) with those two numbers. The length bands are the rows; the width bands are the columns. The intersection gives the category.</li>
    </ol>

    <h3>The width step function</h3>
    <p>The width bands are discrete and unforgiving:</p>
    <ul>
      <li>Up to 2 m</li>
      <li>Over 2 m up to 3 m</li>
      <li>Over 3 m up to 4 m</li>
      <li>Over 4 m up to 5 m</li>
      <li>Over 5 m up to 6 m</li>
      <li>Over 6 m up to 7 m</li>
      <li>Over 7 m</li>
    </ul>
    <p>A fuselage of 6.20 m is in the 6–7 m band. A fuselage of 7.01 m is in the >7 m band. That 0.01 m difference moves the category up by one step on some length bands, and it moves the water quantity by roughly 25% — because the critical area formula uses (30 + W) and the percentage for Q2 jumps at the next category. Measure it correctly.</p>

    {{diagram:level-determination}}

    <h3>Length bands</h3>
    <p>The length bands are: up to 9 m, over 9 m up to 12 m, 12–18 m, 18–24 m, 24–28 m, 28–39 m, 39–44 m, 44–49 m, 49–61 m, over 61 m. Each band combined with the width band gives the category 1 through 10.</p>
    <p>There is no category 0 and no category above 10. If you have an aircraft longer than 61 m with a fuselage wider than 7 m, you are category 10 — the table stops there. Any larger operation still uses the category 10 figures as a minimum, with the §2.3.7 recalculation for larger-than-average aircraft.</p>

    <h3>The fleet mix does not average</h3>
    <p>This is the most common misunderstanding. If you have a weekly 777 and everything else is a 737, you are category 8 or 9 depending on the 777 variant. The fleet mix — movement counts, frequency, seasonal variation — is irrelevant to the table. It only matters to the staffing arithmetic in ART-01 m4 (task resource analysis). The table asks one question: what is the longest, widest aircraft that uses this aerodrome in normal operations?</p>

    <h3>When to re-evaluate</h3>
    <p>If the schedule changes — a new aircraft type, a variant with a longer fuselage or wider body, the retirement of the current critical aircraft — the category must be re-determined. Annex 14 §9.2.3 requires the level of protection to be appropriate to the aerodrome category. A category that was correct last year but wrong this year is a finding.</p>

    <blockquote>
      <p><strong>SME action:</strong> list every aircraft type in your current schedule with its overall length and maximum fuselage width. Identify the critical aircraft (longest, then widest). Confirm the category from Table 2-1. Then check: has the schedule changed since the last determination? If the critical aircraft is retired, what is the new critical aircraft and does the category drop?</p>
    </blockquote>
  `,
  refs: [
    'ICAO Doc 9137 Part 1 — §2.1.2 category determination by longest aeroplane and maximum fuselage width; Table 2-1',
    'ICAO Doc 9137 Part 1 — §2.4.4 overall length rationale (T-tail aircraft); §2.3.7 recalculation for larger-than-average',
    'ICAO Annex 14 Volume I — §9.2.2 to §9.2.4 level determination; Table 9-1 note',
    'Your aerodrome schedule — current aircraft types, dimensions and movements',
    'Your national Civil Aviation Authority requirements — confirm any additional determination criteria'
  ],
  smeChecked: false
},
'art02-m2': {
  title: 'The determination method',
  brief:
    'Step by step from schedule to level. No shortcuts, no "about right" — ' +
    'the method is the defence against an auditor.',
  points: [
    'The determination is a repeatable process: critical aircraft → dimensions → table lookup → category → level.',
    'Category and level are not the same thing. Category is the aircraft size; level is the service capability. They are linked by Table 2-3 / Table 9-1.',
    'The level table gives the minimum usable amounts of extinguishing agents, discharge rates, and complementary agents for that category.',
    'Aerodromes must provide the level of protection corresponding to their category. Operating below the table is non-compliance.',
    'The determination must be documented. An undocumented category is a finding.',
    'Where operations involve aircraft larger than the category average, §2.3.7 requires recalculation and increased capability — this is a shall, not a may.'
  ],
  body: `
    <h3>From schedule to level in four steps</h3>
    <ol>
      <li><strong>Identify the critical aircraft.</strong> From the current schedule, find the longest aircraft normally using the aerodrome. If multiple aircraft share the longest length, use the one with the greatest fuselage width.</li>
      <li><strong>Measure the dimensions.</strong> Overall length (tip to tail) and maximum fuselage width. Use the manufacturer's published data or the airport's own measurements — not the flight manual's "cabin length" or similar.</li>
      <li><strong>Look up the category.</strong> Enter Doc 9137 Table 2-1 (or Annex 14 Table 9-1 note) with length and width. The intersection is the category (1–10).</li>
      <li><strong>Read the level requirements.</strong> Turn to Doc 9137 Table 2-3 / Annex 14 Table 9-1. The row for your category gives: principal agent quantity (water for foam), foam concentrate, complementary agent, discharge rate, and response time. These are the minimums your service must hold and deliver.</li>
    </ol>
    <p>That is the entire method. It is arithmetic, not opinion. If you can show the measurement, the table lookup, and the table row, you have a defensible determination.</p>

    <h3>Category versus level — do not confuse them</h3>
    <p>Category is a property of the <em>aircraft</em>. Level is a property of the <em>service</em>. The category table (Table 2-1) says "this aircraft is category 7". The level table (Table 2-3) says "category 7 requires 18 200 L water, 7 900 L/min discharge rate, 225 kg complementary agent, and a response time of 2–3 minutes".</p>
    <p>They are linked but distinct. The category is determined once from the aircraft. The level requirements are read from the table. A common error is to say "we are a category 7 airport" when the question was "what level of service do you provide". The answer is the table row, not the category number.</p>

    <h3>The level table is a minimum, not a target</h3>
    <p>Doc 9137 Table 2-3 is titled "Minimum useable amounts of extinguishing agents". The word <em>minimum</em> is deliberate. You may hold more. You may not hold less. Annex 14 §9.2.5 states: <strong>the level of protection to be provided for rescue and fire fighting shall be appropriate to the aerodrome category</strong>. "Appropriate" means at least the table row.</p>
    <p>Operating below the table is non-compliance. There is no "we're close enough" — if the table says 18 200 L and you hold 16 000 L, you are below the standard.</p>

    <h3>The determination must be documented</h3>
    <p>An undocumented category is a finding. The aerodrome manual (or equivalent State document) should record: the critical aircraft identified, its dimensions, the table lookup, the resulting category, and the level of protection provided. If an auditor asks "how did you arrive at category 7" and the answer is "we've always been category 7", that is a finding.</p>

    <h3>Larger-than-average aircraft — the shall provision</h3>
    <p>§2.3.7 is unambiguous: <strong>from 1 January 2015, at aerodromes where operations by aeroplanes larger than the average size in a given category are planned, the quantities of water shall be recalculated and the amount of water for foam production and the discharge rates for foam solution shall be increased accordingly</strong>.</p>
    <p>This is a <em>shall</em>. If your critical aircraft exceeds the representative dimensions in Table 2-4 for your category, you must recalculate. The representative aircraft in Table 2-4 are averages for the category. A 777-300ER in category 9 has a narrower fuselage (6.20 m) than the category average (7 m), so it comes in below the table figure. But an A380 in category 10 exceeds the average — the recalculation is mandatory.</p>
    <p>The recalculation uses the formulae in Table 2-4 (which are the same critical area / practical critical area / Q1 / Q2 formulae from ART-03). The result replaces the table figure for your aerodrome.</p>

    <blockquote>
      <p><strong>SME action:</strong> produce the documented determination: critical aircraft, dimensions, table lookup, category, table row. Then check: does any aircraft in the schedule exceed the Table 2-4 representative dimensions for your category? If yes, confirm the §2.3.7 recalculation has been done and the increased quantities are held. If the determination has never been documented, write it now.</p>
    </blockquote>
  `,
  refs: [
    'ICAO Doc 9137 Part 1 — §2.1.2 category determination; Table 2-1; Table 2-3 minimum useable amounts; Table 2-4 representative aircraft and recalculation formulae; §2.3.7 larger-than-average recalculation (shall)',
    'ICAO Annex 14 Volume I — §9.2.2 to §9.2.5 level of protection appropriate to category; Table 9-1',
    'Your aerodrome manual — documented category determination and level of protection',
    'Your national Civil Aviation Authority requirements — confirm any additional documentation or approval requirements'
  ],
  smeChecked: false
},
'art02-m3': {
  title: 'Factors justifying a higher level',
  brief:
    'The table is the floor. These are the reasons you build above it — ' +
    'each one must be documented, not asserted.',
  points: [
    'The table assumes an average aircraft per category. Operations by larger aircraft trigger mandatory recalculation (§2.3.7).',
    'Traffic density matters. High movement rates with simultaneous operations may require more vehicles to sustain continuous application.',
    'Terrain and access routes can add response time. If the worst-case route exceeds the table assumption, you need more vehicles stationed closer.',
    'Adverse weather operations (low visibility, contaminated surfaces) increase response time and reduce effective discharge — the service must compensate.',
    'Mutual aid cannot be subtracted from your requirement. External services arrive after the critical window (§2.7.1).',
    'A higher level must be documented in the aerodrome manual with the assessment that supports it.'
  ],
  body: `
    <h3>The table is the floor, not the ceiling</h3>
    <p>Doc 9137 Table 2-3 / Annex 14 Table 9-1 gives the <em>minimum</em> for the category. The standard explicitly identifies factors that can and should drive the service above the table. None of these are optional once the factor exists — the assessment must be done, and the capability increased.</p>

    <h3>1. Larger-than-average aircraft (Doc 9137 §2.3.7)</h3>
    <p>This is the only factor with a <em>shall</em>. If your critical aircraft exceeds the representative dimensions in Table 2-4 for your category, you must recalculate the water quantities and discharge rates and increase your capability accordingly. This is not optional and it is not a "higher level" in the category sense — it is the same category with a higher requirement.</p>

    <h3>2. Traffic density and simultaneous operations</h3>
    <p>The table assumes a single incident response. An aerodrome with high movement rates, simultaneous runway operations, or multiple critical aircraft on the ground at the same time may need more vehicles to sustain continuous application if the first wave is committed. The task resource analysis in ART-01 m4 is where this is worked through, but the level determination must consider whether the table's vehicle count (implied by the discharge rate and quantity) is sufficient for the actual traffic pattern.</p>

    <h3>3. Terrain, access routes and station location</h3>
    <p>The response time in the table is measured in optimum conditions on the movement area. If your worst-case route involves unpaved surfaces, steep gradients, water crossings, or active runway crossings that add delay, the table's response time may not be achievable from the current station locations. The options are: relocate the station, add a satellite station, or increase the vehicle count so that the response time is met from the existing stations. This is a level decision because it changes the resource requirement.</p>

    <h3>4. Adverse weather and low visibility operations</h3>
    <p>Annex 14 §9.2.29 Note 2 states that the response time is in optimum visibility and surface conditions. If the aerodrome operates in low visibility (Category II/III approaches) or on contaminated runways, the actual response time will be longer. The service must either demonstrate that the response time is still met in those conditions, or increase the capability (more vehicles, better positioned) to compensate. This is a level decision.</p>

    <h3>5. Mutual aid is not your requirement</h3>
    <p>Doc 9137 §2.7.1 and the task resource analysis definition (§10.5.2) both make this clear: the minimum personnel and vehicle requirement is what must be achieved <em>in real time before supporting external services are able to effectively assist</em>. Mutual aid arriving at 8, 12 or 15 minutes is not a resource for the first 8, 12 or 15 minutes. You cannot subtract mutual aid from your level requirement.</p>

    <h3>6. Environmental and regulatory factors</h3>
    <p>Some States impose additional requirements — larger reserves, specific foam types, additional vehicle classes, or mandatory satellite stations for certain categories. These are not in the ICAO table but they are binding if your State requires them. The level determination must include a check of State requirements.</p>

    <h3>How to document it</h3>
    <p>Every factor that drives you above the table must appear in the aerodrome manual (or equivalent State document) with:</p>
    <ul>
      <li>The factor identified (e.g., "A380 operations exceed category 10 representative dimensions").</li>
      <li>The assessment method (e.g., "§2.3.7 recalculation using actual A380 dimensions").</li>
      <li>The resulting increased quantities and discharge rates.</li>
      <li>The resource decision (e.g., "one additional major foam vehicle stationed at the south station").</li>
    </ul>
    <p>An auditor who sees a service holding 25% more water than the table should find a documented assessment explaining why. If the assessment is missing, the extra water looks like waste rather than a decision.</p>

    <blockquote>
      <p><strong>SME action:</strong> review your current operation against the six factors above. For each factor that applies, write the assessment and the resulting resource decision. If you are holding more than the table minimum, confirm there is a documented assessment for every increment. If you are holding exactly the table minimum, confirm no factor applies that should drive you higher.</p>
    </blockquote>
  `,
  refs: [
    'ICAO Doc 9137 Part 1 — §2.3.7 larger-than-average recalculation (shall); §2.7.1 response time in optimum conditions; §10.5.2 task resource analysis before external assistance',
    'ICAO Annex 14 Volume I — §9.2.5 level of protection appropriate to category; §9.2.29 Note 2 response time in optimum conditions',
    'Your aerodrome manual — documented assessments for any level increase',
    'Your national Civil Aviation Authority requirements — confirm any State-mandated increases above the ICAO table'
  ],
  smeChecked: false
},
'art02-m4': {
  title: 'Reduction, conditions and documentation',
  brief:
    'You can operate at a reduced level, but the standard makes you pay ' +
    'for the privilege — in paper, in conditions, and in residual capability.',
  points: [
    'A level reduction is a formal, documented decision — never verbal, never informal, never "just for today".',
    'Annex 14 §9.2.5/9.2.6 permits reduction only when movements of the highest-category aircraft are below 700 in the busiest consecutive three months, and only one level down.',
    'The reduced level must be published in the AIP (Annex 14 §2.11.1). If it is not published, it does not exist.',
    'Reduced level means reduced capability. You must still meet the response time for the reduced level, and you must be able to scale back up when the critical aircraft returns.',
    'Changes in level must be notified to ATS and AIS (Annex 14 §2.11.3). A reduction without notification is not a reduction.',
    'A reduction that cannot be reversed within a defined time is not a reduction — it is a downgrade, and the aerodrome category must be re-determined.'
  ],
  body: `
    <h3>Reduction is a privilege, not a right</h3>
    <p>The standard allows a reduced level of protection, but it surrounds the permission with conditions that make it more work to maintain the reduction than to just hold the full level. That is deliberate. A reduction is a formal, documented, conditional decision with real penalties written into it. It is never informal.</p>

    <h3>The threshold and the permission</h3>
    <p>Annex 14 §9.2.5/9.2.6 states: <strong>where the number of movements of the aeroplanes in the highest category normally using the aerodrome is less than 700 in the busiest consecutive three months, the level of protection provided shall be not less than one category below the determined category</strong>. Note: either a take-off or a landing constitutes a movement.</p>
    <p>That is the only quantitative threshold in the standard. "Shall be not less than one category below" means a category 9 aerodrome with qualifying low movements may operate at level 8, but not level 7. And the 700 movements is measured in the <em>busiest consecutive three months</em>, not annually. If your critical aircraft has a seasonal peak that exceeds 700 in any three-month window, no reduction is permitted.</p>

    <h3>The conditions are not optional</h3>
    <p>The standard surrounds the reduction with mandatory conditions:</p>
    <ol>
      <li><strong>Publication in the AIP.</strong> Annex 14 §2.11.1: <strong>information concerning the level of protection provided at an aerodrome for aircraft rescue and firefighting purposes shall be made available</strong>. The reduced level, the conditions, and the critical aircraft movement count must be published in the Aeronautical Information Publication. If it is not in the AIP, the reduction does not exist for the purposes of the standard.</li>
      <li><strong>Notification to ATS and AIS.</strong> Annex 14 §2.11.3: <strong>changes in the level of protection normally available at an aerodrome for rescue and firefighting shall be notified to the appropriate air traffic services units and aeronautical information services units</strong> to enable those units to provide the necessary information to arriving and departing aircraft. When such a change has been corrected, the above units shall be advised accordingly.</li>
      <li><strong>Response time for the reduced level.</strong> The response time does not get a reduction. You must still meet the response time for the reduced level (which has its own table row). If reducing the vehicle count makes the response time unachievable, the reduction is invalid.</li>
      <li><strong>Reinstatement trigger.</strong> If the critical aircraft movements exceed the threshold, the full level must be reinstated immediately. The reduction is conditional on the movement count staying below 700 in the busiest three months.</li>
    </ol>

    <h3>What "reduced level" actually means</h3>
    <p>A one-level reduction means you use the table row for the next category down. If you are category 9 (36 400 L water, 13 500 L/min discharge), a reduction puts you on the category 8 row (27 300 L, 10 800 L/min). That is roughly 25% less water and 20% less discharge rate.</p>
    <p>And you must be able to scale back up. The standard requires that when the critical aircraft returns (or the movements exceed the threshold), the full level is reinstated. This means you must either maintain the vehicles and agent for the full level in reserve, or have a documented plan to acquire them within a defined time. A reduction that cannot be reversed is not a reduction — it is a downgrade, and the category must be re-determined.</p>

    <h3>The trap: seasonal operations</h3>
    <p>A common scenario: the critical aircraft operates seasonally (e.g., a winter charter). The aerodrome wants to reduce level in the off-season. The standard permits this only if the conditions are met for the period of reduction — including the AIP publication, ATS/AIS notification, and the three-month movement window. You cannot just "turn down" the service for three months and turn it back up. The AIP entry must be amended, the units notified, and the assessment must cover the specific period.</p>
    <p>If the seasonal operation is regular and the busiest three-month window exceeds 700 movements, no reduction is permitted at all. The threshold is the busiest consecutive three months, not an annual average.</p>

    <h3>How it goes wrong</h3>
    <ul>
      <li><strong>Verbal agreement with the CAA.</strong> Not in the AIP? Not a reduction.</li>
      <li><strong>Reduction without ATS/AIS notification.</strong> §2.11.3 is not optional. The tower and the AIS must know the current level so they can inform arriving aircraft.</li>
      <li><strong>No trigger for reinstatement.</strong> The critical aircraft returns early, and the service is still at the reduced level. That is a finding.</li>
      <li><strong>Response time not re-checked.</strong> The reduced level has its own response time column. If you reduced the vehicle count, can you still meet the time? If not, the reduction is invalid.</li>
      <li><strong>Annual average instead of busiest three months.</strong> The threshold is the busiest consecutive three months. An annual average below 700 does not qualify if any three-month window exceeds it.</li>
    </ul>

    <blockquote>
      <p><strong>SME action:</strong> if your aerodrome operates a reduced level, produce the file: the movement count for the busiest three months, the AIP entry, the ATS/AIS notification record, the response time verification for the reduced level, and the reinstatement trigger. If any piece is missing, the reduction is not valid. If you are considering a reduction, start with the busiest three-month movement count of the critical aircraft — if it exceeds 700, stop, the standard does not permit it.</p>
    </blockquote>
  `,
  refs: [
    'ICAO Annex 14 Volume I — §9.2.5/9.2.6 level reduction (700 movements in busiest 3 months, one level down); §2.11.1 level of protection shall be made available; §2.11.3 changes shall be notified to ATS and AIS',
    'ICAO Annex 14 Volume I — §9.2.5 recommendation: level should equal category; Note: either a take-off or a landing constitutes a movement',
    'ICAO Doc 9137 Part 1 — Table 2-3 minimum useable amounts by category; Table 2-4 representative aircraft',
    'Your Aeronautical Information Publication (AIP) — published reduced level entry',
    'Your national Civil Aviation Authority requirements — confirm the reduction acceptance process and any additional conditions'
  ],
  smeChecked: false
},

  'art15-m2': {
  title: 'APU fires',
  brief:
    'The APU is a small turbine with a big fire problem — hidden, ' +
    'fuel-fed, and often discovered late.',
  points: [
    'The APU is a gas turbine engine, usually in the tail cone. It has its own fuel, oil and hydraulic systems and its own fire detection and extinguishing system.',
    'An APU fire warning is often the first indication — the crew may not see or smell anything until the warning triggers.',
    'The built-in extinguishing system is the primary control. If it fails or is expended, the fire is now an external turbine fire.',
    'External attack on an APU is constrained by access: the tail is high, the intake and exhaust are small, and the fire is often screened by structure.',
    'Do not position in the intake or exhaust path. The intake suction and exhaust blast are real hazards even at ground idle.',
    'Clean agent through the access panel is the preferred external application. Do not foam the intake or exhaust unless no other option (§12.2.10).'
  ],
  body: `
    <h3>What the APU actually is</h3>
    <p>The Auxiliary Power Unit is a small gas turbine engine, typically located in the tail cone of the aircraft. It has its own fuel supply, its own oil system, its own hydraulic system, and its own fire detection and extinguishing system. When the aircraft is on the ground, the APU provides electrical power and bleed air for air conditioning and engine start. In flight, it is a backup power source.</p>
    <p>Because it is a turbine, the same fundamentals apply: intake suction, exhaust blast, fuel-fed fire, and a built-in extinguishing system that is the first and best line of defence.</p>

    <h3>The detection problem</h3>
    <p>An APU fire is often discovered by the flight deck warning system before anyone on the ground sees smoke. The APU compartment is enclosed, and the fire may be contained by the built-in system — or it may have already breached the compartment. The guidance notes that the crew may not be able to make an accurate appraisal of fire warning indicators, and advises bringing the aircraft to a complete stop and allowing RFF to inspect (§12.3.22).</p>
    <p>For the RFF crew, this means: treat every APU fire warning as a live fire until you have physically confirmed otherwise. The thermal imaging camera is the tool that changes "we think it's out" into "we know it's out" without opening the compartment.</p>

    <h3>The built-in system is primary</h3>
    <p>Doc 9137 §12.2.9 states: for a confined turbine fire outside the combustion chambers, <strong>the built-in extinguishing system is the best control</strong>. A clean agent is only applied if the fire persists after the built-in system is expended and the turbine has shut down.</p>
    <p>So the sequence is: flight crew operates the APU fire handle → built-in system discharges → fire should be controlled. Your role is to stand by, protect exposures, and be ready if the built-in system fails or the fire has already escaped the compartment.</p>

    <h3>When the fire escapes the compartment</h3>
    <p>If the APU fire has breached the tail cone, you are dealing with an external turbine fire. The constraints are:</p>
    <ul>
      <li><strong>Access.</strong> The tail is high — typically 6–10 m above ground. Your appliance must reach it (elevated platform, ladder, extensible applicator). §12.2.15 notes engine heights up to 10.5 m.</li>
      <li><strong>Intake and exhaust.</strong> The APU intake is on the upper fuselage or the tail cone; the exhaust is at the tail. Stay out of the intake suction zone (≥10 m) and the exhaust blast zone (up to 500 m depending on aircraft size) — §12.2.11, §12.2.12.</li>
      <li><strong>Screened fire.</strong> The tail structure may screen the fire from direct application. You may need to apply agent through the APU access panel or the exhaust, not at the open fire.</li>
    </ul>
    <p>The external attack guidance for turbine engines applies: clean agent through the access panel; foam or water spray on adjacent structures to keep them cool; do not put foam into the intake or exhaust unless control cannot be secured with other agents and the fire is in danger of spreading (§12.2.10).</p>

    <h3>Fuel supply</h3>
    <p>The APU draws from the aircraft fuel system. The flight crew's action on the fire handle should isolate the APU fuel supply. Confirm this has happened — if the fuel is still feeding, no amount of agent will extinguish the fire. The fuel isolation is a flight deck action; your role is to verify it is done.</p>

    <h3>Re-ignition and the post-fire phase</h3>
    <p>An APU fire that has been controlled can re-ignite if fuel is still leaking and hot surfaces remain. The guidance on titanium (§12.2.13) is relevant — some APUs have titanium components. If the fire is contained and the two preconditions hold (no external vapour mixtures, structure kept cool), the burn-out tactic may apply.</p>
    <p>And the operational objective remains: rapid fire control with minimum consequential damage. Inform the operator of the agent used (§12.2.16).</p>

    <blockquote>
      <p><strong>SME action:</strong> for the aircraft types at your aerodrome, confirm the APU location (tail cone, cargo bay, elsewhere), the access panel arrangement, the clean agent your appliances carry and how it is delivered into the APU compartment, the maximum reach height, and your procedure for confirming fuel isolation from the flight deck. State who judges the burn-out preconditions for an APU fire.</p>
    </blockquote>
  `,
  refs: [
    'ICAO Doc 9137 Part 1 — §12.2.9 confined turbine fires; built-in system is best control',
    'ICAO Doc 9137 Part 1 — §12.2.10 foam in turbine intake/exhaust (narrow exception)',
    'ICAO Doc 9137 Part 1 — §12.2.11 intake and §12.2.12 exhaust danger distances',
    'ICAO Doc 9137 Part 1 — §12.2.13 titanium fire control; §12.2.15 positioning and access height',
    'ICAO Doc 9137 Part 1 — §12.2.16 agent choice and operator notification',
    'ICAO Doc 9137 Part 1 — §12.3.22 aircraft fire warnings and thermal imaging',
    'Aircraft rescue and firefighting charts for the types based at your aerodrome'
  ],
  smeChecked: false
},

  'art15-m3': {
  title: 'Attack selection and positioning',
  brief:
    'The attack is not "spray and pray". It is a sequence: approach, ' +
    'position, agent, technique — each step decided, not assumed.',
  points: [
    'The approach route is the first tactical decision. Uphill, upwind, avoid fuel pooling, avoid driving through smoke or over wreckage.',
    'Positioning is dictated by the fire type and the agent. Engine fire = upwind/outboard, clean agent through access. Fuel spill = uphill/upwind, foam blanket from distance.',
    'The first vehicle sets the route for everyone behind it. If the first vehicle positions badly, the whole response inherits the error.',
    'Sector division is pre-planned, not improvised. Vehicle A covers left nacelle/outboard, Vehicle B covers right nacelle/outboard, Vehicle C covers exposures.',
    'Turret sweep must achieve the design application rate over the whole practical critical area in one minute. Too fast = gaps; too slow = pile-up.',
    'Continuous application means the second wave arrives before the first wave runs dry (3–4 minutes). A broken blanket is rebuilt from nothing.'
  ],
  body: `
    <h3>The approach is a tactical decision, not a drive</h3>
    <p>Doc 9137 §12.3.25 lists the positioning priorities, and the first one is the approach: <strong>approach the scene with extreme caution. Watch for evacuating occupants, wreckage debris, fuel ponding and other hazards. Avoid driving through any smoke which obscures your vision and potential evacuees'. Avoid driving over any aircraft wreckage</strong>.</p>
    <p>The wind direction and terrain matter. <strong>Consider terrain and slope, and the direction of the wind before entering. Attempt to position uphill and upwind to avoid fuel and vapours, which tend to gather in low-lying areas</strong> (§12.3.25). This is not advice — it is the positioning priority that every driver and officer should run through before the vehicle moves.</p>

    <h3>The first vehicle constrains the rest</h3>
    <p>§12.3.25 makes a point that is easy to miss: <strong>RFF apparatus often respond in single file, so the first fire appliance to reach the accident site establishes the route for the vehicles behind it, and may dictate the approach into their ultimate positions</strong>.</p>
    <p>Which means the single most consequential positioning decision on the scene is made by whoever gets there first, usually at the least informed moment of the whole incident. This is why the approach route and the initial position must be rehearsed, not improvised.</p>

    <h3>Positioning by fire type</h3>
    <p>The correct position depends on what you are fighting:</p>
    <ul>
      <li><strong>Engine fire.</strong> Upwind and outboard of the engine. Clean agent through the access panel or cowling. Foam/water on adjacent structure. Do not position below the engine. Do not enter the intake or exhaust zone.</li>
      <li><strong>APU fire.</strong> Upwind of the tail. Clean agent through the APU access panel. Foam/water on adjacent tail structure. The tail is high — you need reach.</li>
      <li><strong>Fuel spill fire.</strong> Uphill and upwind of the spill. Foam blanket applied from distance, sweeping to merge into a continuous blanket. Do not drive through the spill.</li>
      <li><strong>Cabin/cargo fire.</strong> Upwind of the fuselage. Protect egress routes first. Agent application through windows/doors or via HRET. Interior attack only after ventilation and with SCBA.</li>
    </ul>

    <h3>Sector division is pre-planned</h3>
    <p>When multiple vehicles attack the same fire, their foam blankets must merge into a single continuous blanket. That requires:</p>
    <ul>
      <li>A pre-agreed sector division so the edge of one vehicle's sweep meets the edge of the next without overlap or gap.</li>
      <li>Matching foam types and performance levels — mixing level A and level B on the same fire creates a blanket with two different drainage times (§2.3.10).</li>
      <li>Communication so the incident commander can adjust sectors as the wind shifts.</li>
    </ul>
    <p>The guidance is explicit: <strong>initial position of vehicles should be to protect egress routes of evacuating aircraft occupants</strong> (§12.3.25(d)). The incident commander should consider what is happening, what is about to happen, and what to do to preserve life and property (§12.3.25(g)).</p>

    <h3>Turret technique is the delivery</h3>
    <p>The discharge rate in the table is Q1 in one minute. That means the operator must sweep the turret such that every square metre of the practical critical area receives the design application rate averaged over the minute. Two failure modes:</p>
    <ul>
      <li><strong>Sweeping too fast.</strong> The foam is laid in stripes with gaps. The fire burns through the gaps and the blanket never forms.</li>
      <li><strong>Sweeping too slow.</strong> The foam piles up in the first half of the area and the second half gets nothing. The total volume looks right on the gauge, but the fire is not controlled.</li>
    </ul>
    <p>This is why the standard requires continuous application (§2.7.3) and why training on the turret is not optional. A crew that can hit the rate on a calm day with a clean system will still fail if the operator has never practised the sweep.</p>

    <h3>Re-positioning is part of the plan</h3>
    <p>§12.3.25(e) states: <strong>ideally, vehicles should be positioned so they can be repositioned in the event of reflash or on direction of the incident commander</strong>. A vehicle that is boxed in by other vehicles, by terrain, or by its own hose lay cannot re-position. The incident commander needs the option to move vehicles — which means the initial positions must leave an exit route.</p>

    <blockquote>
      <p><strong>SME action:</strong> attach your positioning plan per aircraft type and fire type (engine, APU, fuel spill, cabin). Confirm it is drawn from your aerodrome's actual layout, taxiways, hardstanding and water points. Confirm sector assignments for your vehicle fleet, the foam type/performance level match, and the communication plan for wind-shift re-sectoring. Verify your turret operators have all demonstrated the sweep at the required rate on the actual appliances.</p>
    </blockquote>
  `,
  refs: [
    'ICAO Doc 9137 Part 1 — §12.3.25 positioning priorities (a) through (h); §12.3.21 first vehicle establishes route',
    'ICAO Doc 9137 Part 1 — §2.3.5 application rates; §2.3.10 mixing performance levels not encouraged',
    'ICAO Doc 9137 Part 1 — §2.7.3 continuous application (additional vehicles within 3–4 minutes)',
    'ICAO Doc 9137 Part 1 — §12.2.8 to §12.2.16 engine and APU fire tactics',
    'Your aerodrome emergency plan — pre-planned positioning and sector assignments',
    'Course ART-03 m4 — consumption under real conditions'
  ],
  smeChecked: false
},

  'art15-m4': {
  title: 'Running engines and flight deck coordination',
  brief:
    'The engine is still running. The crew is still inside. You are ' +
    'attacking the fire while the aircraft is still an aircraft.',
  points: [
    'A running engine is a hazard zone — intake suction, exhaust blast, rotating parts. The distances in §12.2.11/12.2.12 are not suggestions.',
    'The flight crew controls the engine. You cannot shut it down; they must. Coordination is not optional — it is the only way the hazard goes away.',
    'The engine may need to stay running to provide lighting and communications for evacuation (§12.3.23). That hampering rescue is a documented trade-off, not a mistake.',
    'Communicate on the flight deck intercom if available. The jack is usually under the forward fuselage behind an access door. Radio near a running engine may not work.',
    'If the flight crew cannot function, RFF initiates the necessary action. Protection of the operation is the primary responsibility of the RFF service (§12.3.27).',
    'Do not enter the fuselage once evacuation is initiated. Assist those who cannot self-evacuate; do not impede the evacuation (§12.3.27).'
  ],
  body: `
    <h3>The engine does not stop for you</h3>
    <p>An engine fire on the ground often means the engine is still running — or the flight crew has shut it down but the turbine is still spooling down, or the APU is still running to power the evacuation. The hazards do not vanish when the fire handle is pulled:</p>
    <ul>
      <li><strong>Intake suction.</strong> §12.2.11: stay at least 10 m from the front and side intake. The suction can ingest personnel, equipment, and loose debris.</li>
      <li><strong>Exhaust blast.</strong> §12.2.12: stay up to 500 m from the rear depending on aircraft size. The blast is hot, high-velocity, and can knock a person down or flip a lightweight vehicle.</li>
      <li><strong>Rotating parts.</strong> Even a spooling-down turbine can sever a limb. The nacelle is not a safe working area until the engine has fully stopped and the flight crew confirms it.</li>
    </ul>
    <p>These distances are not suggestions. They are the boundaries of the hazard zone. Working inside them requires a specific, briefed, and supervised reason.</p>

    <h3>You do not control the engine — the flight deck does</h3>
    <p>The flight crew controls the fuel, the ignition, the shutdown, and the fire handle. The RFF crew controls the agent, the position, and the attack. The two must be coordinated, and the guidance is explicit about how:</p>
    <ul>
      <li>§12.3.21: <strong>the Incident Commander should have the ability to communicate with other agencies on separate frequencies</strong>. Radios should have enough channels for command and support functions.</li>
      <li>§12.3.22: <strong>where aircraft engines are running it may be difficult to communicate with the pilot by radio</strong>. Most aircraft are equipped with intercom systems where jacks are generally located under the forward portion of the aircraft, behind an access door. RFF personnel should be aware of this means of communication and carry the necessary headset and microphone to plug in.</li>
    </ul>
    <p>This is not a nice-to-have. If you cannot talk to the flight deck, you cannot confirm fuel isolation, engine shutdown, or evacuation status. You are attacking blind.</p>

    <h3>The engine may need to stay running</h3>
    <p>§12.3.23 states: <strong>it may be necessary to keep at least one engine operating after the aircraft has come to a stop, in order to provide lighting and communications aboard the aircraft</strong> — and this will hamper rescue operations to some extent. On turbo-jet engines, extreme care must be exercised in the immediate area ahead and for a considerable distance behind the engine.</p>
    <p>This is a deliberate trade-off. The flight crew may decide the engine stays running to power the evacuation. That means you are working with a live engine. The hazard zone is active, the exhaust is hot, and the intake is sucking. Your positioning must account for it — you do not get to choose the engine state, you only get to choose where you stand.</p>

    <h3>When the flight crew cannot function</h3>
    <p>§12.3.27 provides for the case where the air crew are unable to function: <strong>in that event, RFF personnel are responsible for initiating the necessary action. Protection of the operation is the primary responsibility of the RFF service throughout</strong>.</p>
    <p>That is a significant transfer of responsibility. It is exactly the kind of thing that goes wrong when nobody has said out loud that it has happened. Practise stating it — literally the words, not the meaning.</p>

    <h3>Evacuation: you assist, you do not enter</h3>
    <p>Once an evacuation is initiated, it cannot be stopped. The guidance is clear on RFF's role: <strong>RFF personnel should not impede the evacuation and should not attempt to enter the fuselage</strong>, but instead provide assistance and be prepared to assist those not capable of self-evacuation (§12.3.27).</p>
    <p>Read that sequence carefully. Not impede. Do not enter. Provide assistance. The instinct to get in there and help is exactly the instinct that turns a survivable evacuation into a casualty list. If you are about to enter a fuselage with occupants still evacuating, you have misread your task.</p>

    <h3>The intercom is your lifeline</h3>
    <p>Carry the headset. Know where the jack is. Plug in and talk to the flight deck. Confirm: engine status, fuel isolation, fire handle status, evacuation decision, number of souls on board, and any injuries. If the radio does not work near the running engine, the intercom is your only link.</p>

    <blockquote>
      <p><strong>SME action:</strong> for the aircraft types at your aerodrome, confirm the intercom jack location and the headset/microphone your crews carry. Confirm the procedure for confirming engine status and fuel isolation with the flight deck. State your rule for working in the intake/exhaust hazard zone with a running engine. Confirm who has the authority to declare "flight crew unable to function" and transfer responsibility to RFF. Run a drill where the flight deck is simulated and the IC must coordinate via intercom while managing the attack.</p>
    </blockquote>
  `,
  refs: [
    'ICAO Doc 9137 Part 1 — §12.2.11 intake danger distance (≥10 m); §12.2.12 exhaust danger distance (up to 500 m)',
    'ICAO Doc 9137 Part 1 — §12.3.21 incident commander separate frequencies; §12.3.22 intercom with flight deck; §12.3.23 engine running for lighting/comms',
    'ICAO Doc 9137 Part 1 — §12.3.26 evacuation determination (pilot decides with RFF input); §12.3.27 RFF initiates if crew unable; RFF does not enter fuselage',
    'ICAO Doc 9137 Part 1 — §12.2.15 positioning below engine prohibited',
    'Your aerodrome emergency plan — flight deck coordination and intercom procedures',
    'Course ART-18 m1 — the alerting system and communications'
  ],
  smeChecked: false
},

  'art16-m1': {
  title: 'Attack selection',
  brief:
    'The attack is not chosen by habit. It is chosen by what is burning, ' +
    'where it is, and what your appliance can actually reach.',
  points: [
    'The first question is not "what agent" but "what is burning and where". Engine, APU, fuel spill, cabin, cargo, electrical — each demands a different attack.',
    'The built-in system is the first control. For engine and APU fires, the flight deck fire handle and the built-in extinguishing system are the primary attack. RFF is the backup.',
    'Clean agents for screened fires (nacelle, APU, cargo). Foam for external fuel spill. Water for exposure cooling. Dry chemical for three-dimensional fires. They are not interchangeable.',
    'Agent selection is constrained by reach. If your appliance cannot deliver the chosen agent to the seat of the fire from a safe position, you have selected the wrong agent or the wrong position.',
    'Mixing agents on the same fire is a discipline, not a default. Two vehicles with different foam performance levels create a blanket with two drainage times — the weaker fails first (§2.3.10).',
    'The attack ends when the fire is controlled, not when the tank is empty. Continuous application requires the second wave to arrive before the first wave runs dry (3–4 min, §2.7.3).'
  ],
  body: `
    <h3>The attack is chosen by the fire, not by habit</h3>
    <p>Every engine fire, APU fire, fuel spill, cabin fire, and cargo fire is a different problem. The attack — position, agent, technique — is selected by what is burning, where it is, and what your appliance can actually reach. "We always use foam" is not an attack selection; it is a default that will fail the moment the fire is not a fuel spill.</p>

    <h3>The hierarchy of control</h3>
    <p>For engine and APU fires, the built-in extinguishing system is the primary attack. The flight crew operates the fire handle; the built-in system discharges; the fire should be controlled. RFF's role is to stand by, protect exposures, and be ready if the built-in system fails or the fire has already escaped the compartment (§12.2.9).</p>
    <p>Only when the built-in system is expended and the fire persists does external attack begin. And even then, the guidance is specific: clean agent through the access panel for a confined turbine fire; foam or water on adjacent structures to keep them cool; do not foam the intake or exhaust unless no other option (§12.2.10).</p>

    <h3>Agent by fire type</h3>
    <ul>
      <li><strong>Engine fire (confined).</strong> Built-in system first. If failed, clean agent through access panel. Foam/water on adjacent structure.</li>
      <li><strong>APU fire.</strong> Built-in system first. If failed, clean agent through APU access panel. Tail is high — you need reach.</li>
      <li><strong>Fuel spill fire.</strong> Foam blanket from upwind/uphill. The practical critical area determines the quantity; the application rate determines the time (§2.3.5).</li>
      <li><strong>Cabin/cargo fire.</strong> Clean agent (Halon replacement, CO₂) for screened areas. Water for exposure cooling. Interior attack only after ventilation, with SCBA, and with a charged line.</li>
      <li><strong>Three-dimensional / running fuel fire.</strong> Dry chemical for rapid knockdown. Foam follows for blanket. The two are applied simultaneously in a dual-agent attack — but the dry chemical cloud can impede foam placement (§8.2.5).</li>
      <li><strong>Electrical fire.</strong> CO₂ or clean agent. Do not use water or foam on live electrical equipment.</li>
    </ul>

    <h3>Reach is the constraint</h3>
    <p>You have selected the right agent. Can your appliance deliver it? Engine heights up to 10.5 m (§12.2.15) may require elevated platforms, ladders, or extensible applicators. The APU in the tail cone is typically 6–10 m up. If your turret cannot reach the access panel from a safe position (upwind, outboard, not in the intake/exhaust zone), the attack fails before it starts.</p>
    <p>The honest question before an engine fire is not "what agent" but "what can my appliance actually reach from where it can safely stand".</p>

    <h3>Mixing agents on the same fire</h3>
    <p>When two or more vehicles attack the same fire, their agent blankets must merge into a single continuous blanket. That requires:</p>
    <ul>
      <li>A pre-agreed sector division so the edge of one vehicle's sweep meets the edge of the next without overlap or gap.</li>
      <li>Matching foam types and performance levels — mixing level A and level B on the same fire creates a blanket with two different drainage times, and the weaker section fails first (§2.3.10).</li>
      <li>Communication so the incident commander can adjust sectors as the wind shifts.</li>
    </ul>
    <p>Dry chemical and foam on the same fire is a dual-agent attack — the powder knocks down the flame, the foam blankets the fuel. But the powder cloud can impede foam placement (§8.2.5). Sector the vehicles: dry chemical on the 3D fire, foam on the fuel surface.</p>

    <h3>The attack is not over until the second wave arrives</h3>
    <p>§2.7.3: additional vehicles should arrive within three minutes and no more than four minutes from the initial call so as to provide continuous agent application. A foam blanket that breaks up because the first wave ran dry and the second wave was late has to be rebuilt from nothing.</p>
    <p>Continuous application is not a nicety. It is the difference between a fire that stays out and a fire that re-ignites on the apron at 03:00.</p>

    <blockquote>
      <p><strong>SME action:</strong> for each fire type at your aerodrome (engine, APU, fuel spill, cabin, cargo, electrical), state the primary agent, the secondary agent, the delivery method (turret, handline, HRET, access panel), the maximum reach height, and the safe position. Confirm foam performance level is standardised across the fleet. Verify the 3–4 minute second-wave arrival is met in exercises.</p>
    </blockquote>
  `,
  refs: [
    'ICAO Doc 9137 Part 1 — §12.2.8 confined piston engine fires; §12.2.9/12.2.10 confined turbine fires',
    'ICAO Doc 9137 Part 1 — §12.2.11 intake and §12.2.12 exhaust danger distances; §12.2.15 access height',
    'ICAO Doc 9137 Part 1 — §2.3.5 application rates; §2.3.10 mixing performance levels not encouraged',
    'ICAO Doc 9137 Part 1 — §2.7.3 continuous application (3–4 minutes); §8.2.5 dry chemical/foam interaction',
    'ICAO Doc 9137 Part 1 — §12.2.16 agent choice and operator notification',
    'Course ART-03 — agents, quantities and discharge rates',
    'Course ART-15 m2 — APU fires; m3 — attack positioning'
  ],
  smeChecked: false
},

  'art16-m2': {
  title: 'Positioning and approach',
  brief:
    'The approach route is the first tactical decision. Uphill, upwind, ' +
    'avoid the hazard zones — the first vehicle sets the route for everyone.',
  points: [
    'Approach with extreme caution: evacuating occupants, wreckage debris, fuel ponding, smoke that obscures vision. Never drive over aircraft wreckage (§12.3.25).',
    'Position uphill and upwind. Fuel and vapours gather in low-lying areas. The wind direction and terrain are not background — they are the first constraints.',
    'The first vehicle to arrive establishes the route for all vehicles behind it. If the first vehicle positions badly, the whole response inherits the error.',
    'Protect egress routes first. The initial position should safeguard the evacuation path of occupants (§12.3.25(d)).',
    'Do not block entry or exit areas that emergency vehicles may need (§12.3.25(c)). Do not drive through smoke that obscures potential evacuees (§12.3.25(a)).',
    'Position so turrets can cover maximum fuselage, but egress protection comes before turret coverage. Re-positioning for reflash must be possible (§12.3.25(e)).'
  ],
  body: `
    <h3>The approach is a tactical decision, not a drive</h3>
    <p>Doc 9137 §12.3.25 lists the positioning priorities, and the first one is the approach: <strong>approach the scene with extreme caution. Watch for evacuating occupants, wreckage debris, fuel ponding and other hazards. Avoid driving through any smoke which obscures your vision and potential evacuees'. Avoid driving over any aircraft wreckage</strong>.</p>
    <p>The wind direction and terrain matter. <strong>Consider terrain and slope, and the direction of the wind before entering. Attempt to position uphill and upwind to avoid fuel and vapours, which tend to gather in low-lying areas</strong> (§12.3.25). This is not advice — it is the positioning priority that every driver and officer should run through before the vehicle moves.</p>

    <h3>The first vehicle constrains the rest</h3>
    <p>§12.3.25 makes a point that is easy to miss: <strong>RFF apparatus often respond in single file, so the first fire appliance to reach the accident site establishes the route for the vehicles behind it, and may dictate the approach into their ultimate positions</strong>.</p>
    <p>Which means the single most consequential positioning decision on the scene is made by whoever gets there first, usually at the least informed moment of the whole incident. This is why the approach route and the initial position must be rehearsed, not improvised.</p>

    <h3>The positioning priorities, in order</h3>
    <ol>
      <li><strong>Approach with extreme caution.</strong> Watch for evacuating occupants, wreckage debris, fuel ponding, other hazards. Avoid smoke that obscures vision. Avoid driving over wreckage.</li>
      <li><strong>Uphill and upwind.</strong> Avoid fuel and vapours in low-lying areas.</li>
      <li><strong>Do not block entry/exit areas.</strong> Other emergency vehicles may need them.</li>
      <li><strong>Protect egress routes.</strong> The initial position should safeguard the evacuation path of occupants. This comes before turret coverage of the fuselage.</li>
      <li><strong>Re-positionable for reflash.</strong> Ideally, vehicles should be positioned so they can be repositioned in the event of reflash or on direction of the incident commander (§12.3.25(e)).</li>
      <li><strong>Turret coverage.</strong> Position so turrets can cover a maximum amount of the aircraft fuselage (§12.3.25(f)).</li>
      <li><strong>Incident commander's size-up.</strong> The IC considers what is happening, what is about to happen, and what to do to preserve life and property (§12.3.25(g)).</li>
      <li><strong>Preserve the accident site.</strong> Give consideration to preserving the accident site for investigation (§12.3.25(h)).</li>
    </ol>

    <h3>Egress protection before turret coverage</h3>
    <p>Read (d) against (f). Protecting egress comes before covering the fuselage. If you are covering the fuselage you are choosing not to protect an exit route, and that is a defensible choice in some circumstances — but it should be a choice somebody made, not an accident of where the first vehicle stopped.</p>

    <h3>Sector division is pre-planned</h3>
    <p>When multiple vehicles attack the same fire, their foam blankets must merge into a single continuous blanket. That requires:</p>
    <ul>
      <li>A pre-agreed sector division so the edge of one vehicle's sweep meets the edge of the next without overlap or gap.</li>
      <li>Matching foam types and performance levels — mixing level A and level B on the same fire creates a blanket with two different drainage times, and the weaker section fails first (§2.3.10).</li>
      <li>Communication so the incident commander can adjust sectors as the wind shifts.</li>
    </ul>

    <h3>The incident commander decides changes</h3>
    <p>It is not the arriving crew, and it is not a matter of individual initiative. §12.3.25 is explicit: <strong>as part of the size-up process the incident commander would decide whether the tactical plan needs changing</strong>.</p>
    <p>The first vehicle to arrive should be reporting what it sees and requesting a decision, not announcing one. If your crews routinely re-position themselves on arrival because they can see something the plan did not anticipate, that is a command problem — and it is also, read more generously, a signal that the plan needs updating.</p>

    <h3>Re-positioning is part of the plan</h3>
    <p>A vehicle that is boxed in by other vehicles, by terrain, or by its own hose lay cannot re-position. The initial positions must leave an exit route. The incident commander needs the option to move vehicles.</p>

    <blockquote>
      <p><strong>SME action:</strong> attach your positioning plan per aircraft type, drawn from your aerodrome's actual layout, taxiways, hardstanding and water points. Confirm sector assignments for your vehicle fleet, the foam type/performance level match, and the communication plan for wind-shift re-sectoring. Verify the first-vehicle route decision is briefed to every driver. Run a drill where the first vehicle deliberately takes a wrong position and the IC must redirect the following vehicles.</p>
    </blockquote>
  `,
  refs: [
    'ICAO Doc 9137 Part 1 — §12.3.25 positioning priorities (a) through (h); §12.3.21 first vehicle establishes route',
    'ICAO Doc 9137 Part 1 — §2.3.5 application rates; §2.3.10 mixing performance levels not encouraged',
    'ICAO Doc 9137 Part 1 — §2.7.3 continuous application (additional vehicles within 3–4 minutes)',
    'ICAO Doc 9137 Part 1 — §12.2.8 to §12.2.16 engine and APU fire tactics',
    'Your aerodrome emergency plan — pre-planned positioning and sector assignments',
    'Course ART-09 m4 — working the emergency plan'
  ],
  smeChecked: false
},

  'art04-m1': {
  title: 'How foam actually works',
  brief:
    'An instructor-acceptable answer in four properties, plus the four ' +
    'concentrate families and why they behave differently on your vehicle.',
  points: [
    'Foam works by excluding air, not by cooling. It prevents volatile flammable vapours mixing with air or oxygen (§8.1.1).',
    'Four properties decide whether foam works: it must flow freely over the fuel surface, resist disruption from wind or heat, reseal ruptures, and retain water (§8.1.1).',
    'The four concentrate families are protein, AFFF, fluoroprotein and FFFP. They are not interchangeable and three of the four are incompatible with each other.',
    'AFFF and FFFP form a water film on the fuel surface that spreads beyond the foam itself. That is the mechanism, and it is why they behave differently.',
    'Expansion ratio and drainage time are the measurable properties. Expansion is how much foam you get; drainage is how fast the water leaves it.',
    'The quantity needed is calculated from the practical critical area — the same concept as ART-03 m3, and the reason the table figure is a service size.'
  ],
  body: `
    <h3>Foam excludes air. That is the whole mechanism</h3>
    <p>Doc 9137 §8.1.1 is precise: <strong>foam used for aircraft RFF is primarily intended to provide an air-excluding blanket which prevents volatile flammable vapours from mixing with air or oxygen</strong>. Everything else — the expansion, the drainage time, the resealing — is a means to maintaining that exclusion.</p>
    <p>This is worth internalising because it explains why foam behaves the way it does. A fuel fire is not extinguished by removing heat. It is extinguished by removing the oxygen the vapour needs. Water alone cools, and cooling a large fuel pool takes an impossible quantity. Foam does something different and much cheaper.</p>

    <h3>Four properties, all required</h3>
    <p>§8.1.1 then sets out what a foam must do to perform that function:</p>
    <ul>
      <li><strong>Flow freely over the fuel surface.</strong> A blanket that cannot spread does not cover.</li>
      <li><strong>Resist disruption due to wind or exposure to heat or flame.</strong> This is the wind problem from ART-03 m4, stated as a foam property rather than an operator problem.</li>
      <li><strong>Reseal any ruptures</strong> caused by disturbance of an established blanket. Self-healing is the property that makes a blanket survivable rather than fragile.</li>
      <li><strong>Retain water.</strong> Its water retention properties determine resistance to thermal exposure and provide limited cooling to aircraft structure the foam adheres to.</li>
    </ul>
    <p>The last one is genuinely useful to know, because it is the only cooling foam does. If you are relying on foam to cool structure, you are relying on water retention, and that is a limited effect.</p>

    <h3>The two measurable numbers</h3>
    <p>Chapter 8 specifies foam on two physical measures, and both appear in the acceptance criteria:</p>
    <ul>
      <li><strong>Expansion ratio</strong> — the volume of foam produced from a given volume of solution. Higher is not automatically better; it trades against stability and drainage.</li>
      <li><strong>Drainage time</strong> — how long the water takes to leave the foam. The 25% drainage time is the standard measure. A foam that drains fast stops sealing; a foam that drains slowly stays put but does not cool.</li>
    </ul>
    <p>§8.1.6 requires the delivered foam to produce expansions and 25 per cent drainage times of acceptable levels, and gives the acceptable expansion ranges. If your vehicle is producing foam outside those ranges, the agent in your tank is not the agent the table assumed.</p>

    <h3>The four concentrate families</h3>
    <p>§8.1.1 describes four types. The differences are not academic — they determine what you can mix, what you can use alongside, and what your proportioner must be set to.</p>

    <p><strong>Protein foam.</strong> Protein hydrolysate plus stabilising additives and inhibitors — against freezing, corrosion, bacterial decomposition, and viscosity. Used at 3, 5 and 6 per cent by volume. Robust and durable, with no film-forming action.</p>

    <p><strong>Aqueous film forming foam (AFFF).</strong> A fluorinated surfactant with foam stabiliser, used up to 6 per cent or premixed. Its distinguishing mechanism: <em>by the drainage of a chemically impregnated fluid from the foam, it provides a film on the fuel surface capable of containing fuel vapour</em>. The film spreads over fuel surfaces not even covered with foam, and is self-healing. That is why AFFF tolerates forceful application and contaminated foam better than protein.</p>
    <p>AFFF also behaves differently in a way that affects your crews: <em>the foam produced does not have the density and visual appearance of foams produced from protein or fluoroprotein concentrates and training will be necessary to accustom firefighters to its effectiveness</em>. AFFF looks thin and watery. It works. Crews who have only ever seen protein foam often discount it.</p>

    <p><strong>Fluoroprotein foam (conventional).</strong> Protein with a concentration of synthetic fluorinated surfactant, giving better performance than ordinary protein foams as well as <em>resistance to breakdown by chemical powders</em>. Used at 3 and 6 per cent. The powder resistance matters — it is why fluoroprotein is the family that survives a dual-agent attack.</p>

    <p><strong>Film forming fluoroprotein (FFFP).** Protein together with film-forming fluorinated surfactants, capable of forming water solution films on the surface of flammable liquids and adding oleophobic properties. The film <em>can spread over fuel surfaces not covered with foam, is self-healing</em>, and the expanded foam has fast spreading characteristics, acting as surface barriers to exclude air and prevent vaporisation.</p>

    <h3>What this means for the agent in your tank</h3>
    <p>§8.1.1 is emphatic that the manufacturer of the foam-making equipment should be consulted as to the correct concentrate for any particular system, and that <em>the proportioners installed must be properly designed and/or set for the concentrate being used</em>. Your proportioner is calibrated for a specific concentrate at a specific percentage. Changing concentrate without recalibrating the proportioner does not give you a different foam — it gives you the wrong foam.</p>
    <p>And the quantity is not a free choice. The amount of foam needed to safeguard fuselage integrity adjacent to a fire is calculated using the practical critical area concept — which is why the table figure in ART-03 is a service size, and why a localised engine fire does not get the whole area.</p>

    <blockquote>
      <p><strong>SME action:</strong> state the concentrate family and mix percentage your vehicles are set to, and confirm the proportioner is calibrated for that exact concentrate. Record the measured expansion ratio and 25% drainage time at the nozzle from your last acceptance test. Confirm the concentrate in the tank matches the concentrate in the reserve store — a vehicle converted to AFFF while the reserve is protein is a finding waiting to happen.</p>
    </blockquote>
  `,
  refs: [
    'ICAO Doc 9137 Part 1 — §8.1.1 foam: air-excluding blanket, four required properties, protein / AFFF / fluoroprotein / FFFP concentrate families',
    'ICAO Doc 9137 Part 1 — §8.1.2 methods of foam production; §8.1.3 to §8.1.5 foam quality and specifications; §8.1.6 foam performance acceptance test; §8.1.6.4 induction tolerance',
    'ICAO Doc 9137 Part 1 — §2.4 critical area and the practical critical area calculation',
    'Your foam concentrate manufacturer data sheet — expansion, drainage time, mixing ratio, shelf life',
    'Course ART-03 m3 — the water calculation and the practical critical area'
  ],
  smeChecked: false
},

  'art04-m2': {
  title: 'The agent selection matrix',
  brief:
    'What each agent is good at, what it is useless against, and the two ' +
    'things about dry chemical that crews consistently get wrong.',
  points: [
    'Complementary agents do not generally have any substantial cooling effect. Extinguishment by them may well be only transient (§8.2.1).',
    'Danger of flashback or reignition occurs when foam is not available to secure a fire. Complementary agent alone is not control — it is knockdown (§8.2.1).',
    'Dry chemical is most effective on concealed fires where foam may not penetrate: engine fires, freight holds, beneath wings, and running fuel fires where foam is ineffective (§8.2.1).',
    'A dense cloud of discharged dry chemical limits visibility and affects respiration. It can impede evacuation and rescue (§8.2.2).',
    'Dry chemical powder can be highly corrosive when applied to metal surfaces and electrical componentry (§8.2.5).',
    'Dry chemical powders are normally BC type and are not designed for flammable metal fires, which require specialised agents (§8.2.4).',
    'Halons are banned. CO2 is only 1.5 times the weight of air and is therefore seriously affected outdoors by wind and convection (§8.2.6, §8.2.8).',
    'Annex 14 requires the complementary agent to be a dry chemical powder suitable for hydrocarbon fires, with care taken to ensure compatibility with the foam (§9.2.10).'
  ],
  body: `
    <h3>The line between the two agent families</h3>
    <p>Annex 14 §9.2.8 requires that <strong>both principal and complementary agents should normally be provided at an aerodrome</strong>, and §9.2.10 states that <strong>the complementary extinguishing agent should be a dry chemical powder suitable for extinguishing hydrocarbon fires</strong> — with a note that when selecting dry chemical powders for use with foam, <em>care must be exercised to ensure compatibility</em>.</p>
    <p>So the selection is not free. Annex 14 names the family for you. What you choose within it, and how it interacts with your foam, is your responsibility.</p>

    <h3>What the name "complementary" is telling you</h3>
    <p>Doc 9137 §8.2.1 explains it better than any instructor could. Complementary agents <strong>do not generally have any substantial cooling effect on liquids or materials involved in fire</strong>. In a major fire situation, <strong>extinguishment achieved by complementary agents may well only be transient and danger of "flashback" or reignition may occur when foam is not available to secure a fire</strong>.</p>
    <p>Then the reason for the name: <strong>while they may have the capability of rapid fire suppression (when applied at a sufficient rate), it is generally necessary to apply a principal agent simultaneously or at least before flashback can occur in order to achieve permanent control</strong>.</p>
    <p>Read that as the whole doctrine. Dry chemical buys you time. Foam secures what the powder knocked down. Dry chemical alone on a fuel spill is a delayed failure, not an extinguishment.</p>

    <h3>Where dry chemical genuinely wins</h3>
    <p>The same clause gives the honest answer, and it is a specific list rather than a general claim: complementary agents <strong>are particularly effective on concealed fires (e.g. engine fires) in aircraft freight holds and beneath wings, where foams may not penetrate and on running fuel fire situations, on which foams are ineffective</strong>.</p>
    <p>Three distinct jobs in that sentence, and each is a place foam fails:</p>
    <ul>
      <li><strong>Concealed fires</strong> inside compartments and under fairings, where foam cannot reach the seat of the fire.</li>
      <li><strong>Freight holds and beneath wings</strong> — enclosed volumes with structural barriers between you and the fuel.</li>
      <li><strong>Running fuel fires</strong>, on which foam is ineffective. A jet of burning fuel is not a pool; you cannot blanket a stream.</li>
    </ul>
    <p>This is the opposite of the common crew belief that dry chemical is a general-purpose agent. It is a specialist agent for three specific geometric problems.</p>

    <h3>The two things crews get wrong</h3>
    <p><strong>One: the cloud.</strong> §8.2.2: <strong>due regard must be made to the problems which may arise when large quantities of complementary agents are discharged rapidly. A dense cloud of the agent may impede aircraft evacuation or rescue operations by limiting the visibility and affecting the respiration of those exposed to the effects</strong>.</p>
    <p>That is a live safety constraint, not a footnote. If you discharge a large quantity into a cabin or an area where people are still evacuating, you have made the rescue harder. §8.2.4 adds the specific case: <strong>when large quantities of dry chemical powders are discharged rapidly, limited visibility will also reduce the effective placement of foam in a dual-agent attack</strong> — so the cloud does not just obscure people, it defeats your own foam.</p>

    <p><strong>Two: corrosion.</strong> §8.2.5: <strong>it should be noted that dry chemical powder can be highly corrosive when applied to metal surfaces and electrical componentry</strong>.</p>
    <p>That is why §12.2.16 requires the operator to be informed of the nature of the agent used when the incident concludes — so they may take preventive action against corrosion. A clean agent attack on an engine is a corrosion inspection scheduled, not a problem solved.</p>

    <h3>What dry chemical is not for</h3>
    <p>§8.2.4 is clear: the dry chemical powders normally provided for aircraft RFF applications <strong>are not specifically designed or intended for use on flammable metal fires, which require specialized agents</strong>. In aircraft RFF operations they are normally of the "BC" type — effective against flammable liquids and electrical fires — and should comply with ISO 7202.</p>
    <p>So if the fuel is magnesium, sodium, lithium or titanium, dry chemical is not your agent and neither is foam. That is ART-14 territory and it is a specialist response.</p>

    <h3>The banned and the awkward options</h3>
    <p><strong>Halogens are gone.</strong> §8.2.6: in line with the 1987 Montreal Protocol on substances that deplete the ozone layer, <strong>the production of halon 1211, 1301 and 2402 has been banned since 1994</strong>. They may still be found in some aircraft fixed installations — which is an argument for knowing what is fitted to the types you handle, not an argument for stocking them.</p>

    <p><strong>CO<sub>2</sub> is an indoor agent.</strong> §8.2.7 describes two traditional uses: rapid knockdown of small fires, and flooding concealed fires in areas inaccessible to foam. It <em>should not be used on fires involving flammable metals</em>. Then §8.2.8 gives the limitation that decides where you can use it: <strong>CO<sub>2</sub> gas is only 1.5 times the weight of air and is therefore seriously affected in outdoor applications by the wind and the convection currents associated with a fire</strong>.</p>
    <p>So CO<sub>2</sub> is a cabin and compartment agent, not an aircraft-side agent. §8.2.9 requires it to comply with ISO 5923.</p>

    <h3>Annex 14 keeps it narrow</h3>
    <p>§9.2.10 does the narrowing for you: dry chemical powder suitable for hydrocarbon fires. If your fleet operates lithium battery cargo — and ART-14 is on your curriculum — then your complementary agent is not matched to your worst-case fuel, and that gap needs an answer in your emergency plan rather than in the store room.</p>

    <blockquote>
      <p><strong>SME action:</strong> produce the agent selection matrix for your aerodrome: fire type, principal agent, complementary agent, application method, and the specific reason. Include the fires your current agents cannot handle — flammable metals, lithium, Halon in fixed installations — and state what the plan is for each. Confirm the dry chemical you stock is BC type to ISO 7202 and that its compatibility with your foam is established by test evidence, not assumed. Then check whether any of the types you handle carry fixed halon installations.</p>
    </blockquote>
  `,
  refs: [
    'ICAO Doc 9137 Part 1 — §8.2.1 what complementary agents do and do not do; flashback and reignition risk',
    'ICAO Doc 9137 Part 1 — §8.2.2 the density and visibility problem; §8.2.4 dry chemical powders, BC type, ISO 7202, not for flammable metals, dual-agent interaction',
    'ICAO Doc 9137 Part 1 — §8.2.5 dry chemical corrosivity; §8.2.6 halon ban; §8.2.7 and §8.2.8 CO2 use and wind limitation; §8.2.9 ISO 5923',
    'ICAO Doc 9137 Part 1 — §12.2.16 inform operators of the nature of the agent used',
    'ICAO Annex 14 Volume I — §9.2.8 both principal and complementary agents; §9.2.10 dry chemical powder for hydrocarbon fires and compatibility note',
    'Course ART-14 — lithium battery hazards and response',
    'Course ART-03 m2 — principal versus complementary agents'
  ],
  smeChecked: false
},
'art04-m3': {
  title: 'Compatibility, proportioning and testing',
  brief:
    'Three subjects that decide whether the foam in your tank is the foam ' +
    'the standard assumes. All three fail silently.',
  points: [
    'Foam liquids of different types or different manufacturers should not be mixed unless established as completely interchangeable and compatible (§8.1.1).',
    'Incompatibility between dry chemical and protein foam destroys the foam blanket wherever the two agents are in contact (§8.1.1).',
    'AFFF is compatible with all currently available dry chemical powder agents. Protein and fluoroprotein concentrates are incompatible with AFFF (§8.1.1).',
    'Fluoroprotein foams are resistant to breakdown by chemical powders (§8.1.1(c)). Protein foams are not. This is a dual-agent decision, not a preference.',
    'When converting a system to AFFF, a thorough flushing of the foam tank and total foam-making system is necessary beforehand (§8.1.1(b)).',
    'Induction systems should induce within ±10% of the desired induction percentage at optimum working conditions (§8.1.6.4).',
    'In-service testing of the foam production system should be performed at least every twelve months (§8.1.7.1).',
    'Water suitability must be verified with the approval of the foam concentrate manufacturer (§8.1.11).'
  ],
  body: `
    <h3>Compatibility is not a preference</h3>
    <p>§8.1.1 states the rule plainly: <strong>foam liquids of different types or different manufacturers should not be mixed unless it is established that they are completely interchangeable and compatible</strong>.</p>
    <p>And then it gives the consequence for the case that actually bites on scene, in the protein section: <strong>where a dry chemical powder is to be used as the complementary agent in conjunction with protein foam it is essential to determine the compatibility of these agents for simultaneous application. Incompatibility will result in the destruction of the foam blanket in areas where the two agents are in contact</strong>.</p>
    <p>Read that consequence carefully. The failure is not gradual dilution. The blanket is destroyed where the agents touch. On a dual-agent attack that means you lose your foam precisely where you have just gained knockdown — the worst possible place to lose it.</p>

    <h3>The compatibility map</h3>
    <p>§8.1.1 gives you the map, family by family:</p>
    <ul>
      <li><strong>AFFF</strong> — <em>compatible with all currently available dry chemical powder agents</em>. This is the strongest compatibility position of the four.</li>
      <li><strong>Protein and fluoroprotein</strong> — <em>incompatible with AFFF concentrates and they should not be mixed</em>, although foams produced from these concentrates, separately generated, <em>may be applied to a fire in sequence or simultaneously</em>.</li>
      <li><strong>Fluoroprotein</strong> — gives <em>resistance to breakdown by chemical powders</em>, and compatibility <em>should be established by a test programme although it is known that compatibility is a characteristic of most fluoroprotein foams</em>.</li>
    </ul>
    <p>Note the distinction the standard draws carefully: incompatible <em>as concentrates in the same tank</em>, but compatible <em>as separately generated foams applied in sequence or simultaneously</em>. Those are different operations and the standard permits the second while prohibiting the first.</p>
    <p>The practical question for your service: which family is in your tanks, and is your complementary agent compatible with it for simultaneous application? If you are running protein foam, you need that compatibility established before you run a dual-agent attack — not during it.</p>

    <h3>Conversion is a job, not a fill-up</h3>
    <p>If you change concentrate family, the standard is specific about what has to happen. For AFFF: <em>a thorough flushing of the foam tank and the total foam-making system will be necessary before the introduction of the AFFF concentrate</em>, and <em>afff concentrates may be used in equipment normally used for protein or fluoroprotein foam production, but conversion should not be undertaken without consultation with the manufacturer or supplier of the afff concentrate or rff vehicle</em>.</p>
    <p>And there is a hardware consequence: <em>some changes in the foam-making systems of vehicles, particularly aspirating nozzles, where used, may be necessary to achieve the optimum properties of afff foams</em>.</p>
    <p>For protein there is a related discipline: <em>to ensure that the tank does not contain stale protein foam, the entire contents should be discharged periodically and the entire system washed through</em>.</p>

    <h3>Proportioning is where the tank and the turret diverge</h3>
    <p>§8.1.2 covers methods of foam production: premixed solutions, or a proportioning system delivering a predetermined concentration. Then the condition that governs whether the result is acceptable foam: <strong>in all cases, the system will produce an acceptable foam only if the solution is delivered in the appropriate concentration and in the correct pressure range to the aspirating nozzle or nozzles</strong>.</p>
    <p>Two variables, not one. A correctly proportioned solution at the wrong nozzle pressure does not produce compliant foam. §8.1.6.4 then sets the tolerance: <strong>induction systems should induce with a tolerance of +/-10% of the desired induction percentage at optimum working conditions</strong>.</p>
    <p>Ten per cent sounds tight until you realise what sits at the other end of it. Going from 3% to 3.3% is within tolerance and is a measurably different foam. That is the whole reason the acceptance test exists.</p>

    <h3>The acceptance test is a fire test</h3>
    <p>§8.1.8 sets out the method, and the tray sizes tell you what each performance level has to achieve:</p>
    <ul>
      <li><strong>Performance level A</strong> — extinguish a 2.8 m² fire.</li>
      <li><strong>Performance level B</strong> — 4.5 m².</li>
      <li><strong>Performance level C</strong> — 7.3 m².</li>
    </ul>
    <p>Table 8-1 then gives the performance requirement for each level side by side, and the three figures are worth knowing separately because they answer three different questions:</p>
    <table class="calc">
      <tr><th>Measure</th><th>Level A</th><th>Level B</th><th>Level C</th></tr>
      <tr><td>Fire size</td><td>≈ 2.8 m² circular</td><td>≈ 4.5 m² circular</td><td>≈ 7.32 m² circular</td></tr>
      <tr><td>Fuel</td><td>Kerosene</td><td>Kerosene</td><td>Kerosene</td></tr>
      <tr><td>Preburn time</td><td>60 s</td><td>60 s</td><td>60 s</td></tr>
      <tr><td>Extinguishing time</td><td>≤ 60 s</td><td>≤ 60 s</td><td>≤ 60 s</td></tr>
      <tr><td>Total application time</td><td>120 s</td><td>120 s</td><td>120 s</td></tr>
      <tr><td>25% reignition time</td><td>≥ 5 min</td><td>≥ 5 min</td><td>≥ 5 min</td></tr>
    </table>
    <p>Note what the level does <em>not</em> change: extinguishing time, total application time and reignition time are identical across all three. What the level changes is the <strong>fire size the foam has to hold</strong> — and that is why level A buys you margin in wind, in technique, and in the mistakes that a real incident contains and a test pan does not.</p>
    <p>The fire is kerosene on a water substrate in every case, preburned for 60 seconds before application. And §8.1.8.3 fixes the conditions: <strong>air temperature ≥ 15 °C, foam solution temperature ≥ 15 °C, wind velocity ≤ 3 m/s, and the test shall not be carried out in conditions of precipitation, if outdoors</strong>.</p>
    <p>§8.1.8.3 fixes the conditions those tests must be run in — and that matters in a hot climate, because a test run in summer may not satisfy the temperature floor without controlled cooling.</p>

    <h3>Three tests, three different things</h3>
    <ul>
      <li><strong>Acceptance test (§8.1.6)</strong> — the delivered foam from your vehicle, confirming induction percentage, spray pattern, monitor jet range, and (for vehicles that can produce foam on the move) that capability. §8.1.6.3 makes the moving-vehicle test a requirement where the vehicle is so equipped.</li>
      <li><strong>In-service test (§8.1.7)</strong> — periodic, confirming <em>the ongoing capability of the foam production system</em>, and <em>should be performed at least every twelve months</em>. §8.1.7.2 notes that once fully tested and assuming no changes, in-service testing consists of periodic checks not exceeding that interval.</li>
      <li><strong>Concentrate test</strong> — §8.1.3 requires <em>functional fire tests to determine the suitability of a foam concentrate in an airport environment</em>, and §8.1.3 notes these should be conducted by a suitable and accredited third-party testing authority. That is a different test from the vehicle's, and both are needed.</li>
    </ul>
    <p>And §8.1.11 for the water: <strong>the quality of foam produced by a vehicle system may be affected by the characteristics of the local water supply. It is important to acquire an adequate clear water supply, the suitability of which should be verified with the approval of the foam concentrate manufacturer</strong>. Plus: <em>no corrosion inhibitors, freezing point depressants or other additives should be used in the water supply without prior consultation with, and the approval of, the foam concentrate manufacturer</em>.</p>

    <blockquote>
      <p><strong>SME action:</strong> produce the compatibility evidence for your own pairing — your concentrate family and your dry chemical — and confirm it is established by test, not assumption. Then produce the test calendar: last and next acceptance test, last and next in-service test, last concentrate functional fire test, and the manufacturer approval for your local water. If any of those is missing or expired, that is the finding to fix first. Finally, if you have ever converted a vehicle between concentrate families, confirm the tank and system flush and the aspirating nozzle check were both done.</p>
    </blockquote>
  `,
  refs: [
    'ICAO Doc 9137 Part 1 — §8.1.1 compatibility of concentrate families and dry chemical; flushing on conversion; periodic discharge of protein systems',
    'ICAO Doc 9137 Part 1 — §8.1.2 methods of foam production and concentration/pressure conditions',
    'ICAO Doc 9137 Part 1 — §8.1.3 to §8.1.5 foam quality, functional fire tests, accredited third-party testing authority',
    'ICAO Doc 9137 Part 1 — §8.1.6 foam performance acceptance test; §8.1.6.3 moving-vehicle capability; §8.1.6.4 induction tolerance ±10%',
    'ICAO Doc 9137 Part 1 — §8.1.7 in-service test at least every twelve months; §8.1.8 fire test method and tray areas; §8.1.10 performance requirements; §8.1.11 water supply',
    'Your foam concentrate manufacturer — compatibility statements, water suitability approval, conversion procedure',
    'Your national Civil Aviation Authority requirements — confirm any additional testing or certification mandates'
  ],
  smeChecked: false
},

  'art04-m4': {
  title: 'Storage, shelf life and rotation',
  brief:
    'The reserve is a controlled substance with a rotation rule. ' +
    'First in, first out is not administration — it is fire performance.',
  points: [
    'Reserves are mandatory: 200% of the Table 2-3 foam concentrate quantity and 100% of the complementary agent quantity, held at the aerodrome (§2.6.1, §2.6.2).',
    'The reserve should be stored in the fire station(s) — §9.3.1. A reserve across the airfield does not serve the response window.',
    'Avoid extremes of temperature for foam concentrate (§8.3.1(a)). In a hot climate this is a design requirement, not a note.',
    'Use stocks in order of receipt (§8.3.1(a) and (b)). Shelf life is finite and rotation is how you avoid discovering otherwise.',
    'Keep concentrate in the manufacturer containers or a suitable on-site bulk storage facility until required (§8.3.1(a)).',
    'Drums, bladders and large above-ground tanks should be suitably contained in case of a spill (§8.3.1(a)).',
    'Where more than one type of concentrate is in use, containers should be suitably marked (§8.3.1(a)).',
    'For dry chemical: replace and seal the lids of partly used containers, keeping the powder dry and free from contaminants (§8.3.1(b)).',
    'A drum that has been opened and resealed is not a fresh drum. The functional fire test result applies to the drum you actually put in the tank.'
  ],
  body: `
    <h3>The reserve is a requirement, not prudence</h3>
    <p>§2.6.1 and §2.6.2 together give the arithmetic: a reserve supply of foam concentrate equivalent to <strong>200 per cent of the quantities of these agents identified in Table 2-3</strong> should be maintained on the airport for vehicle replenishment purposes, and the complementary agent reserve is <strong>100 per cent, respectively, of the quantity identified in Table 2-3</strong>.</p>
    <p>And §9.3.1 says where it lives: the reserve of agents shall be stored in the fire station(s). That is the operative word. A reserve in a store across the airfield is not available inside the three-to-four-minute replenishment window that continuous application depends on (§2.7.3). The reserve that is too far away is not a reserve.</p>

    <h3>Storage conditions for foam concentrate</h3>
    <p>§8.3.1 notes that conditions of storage are frequently specified by manufacturers or suppliers, including the intended shelf lives, and then sets out what the general aim should be. For foam concentrate:</p>
    <ul>
      <li><strong>Avoid extremes of temperature.</strong></li>
      <li><strong>Use stocks in order of receipt.</strong></li>
      <li><strong>Keep concentrate in the manufacturer's containers</strong> or a suitable on-site bulk storage facility until required for use, where applicable.</li>
      <li><strong>Contain spill risk.</strong> Where drums, bladders or large above-ground tanks are used, they should be suitably contained in case of a spill.</li>
      <li><strong>Mark the containers</strong> where more than one type of foam concentrate is in use.</li>
    </ul>
    <p>Every one of those five is a small, cheap, auditable control. A service that cannot produce a stock list showing date of receipt against date of opening has no shelf-life control at all — and shelf life is what turns a compliant agent into a non-compliant one without anybody noticing.</p>

    <h3>Storage conditions for dry chemical</h3>
    <p>Two rules, both consequences of a failure mode:</p>
    <ul>
      <li><strong>Use stocks in order of receipt.</strong></li>
      <li><strong>Replace and seal the lids of any partly used containers</strong>, ensuring the powder is <em>kept dry and free from contaminates</em>.</li>
    </ul>
    <p>Dry chemical that has absorbed moisture will cake. Caked powder does not flow, and a container that will not discharge under load is a complementary agent you do not have. That failure is invisible on an inventory check and total on scene.</p>

    <h3>Why rotation is a performance control</h3>
    <p>§8.1.3 requires <em>functional fire tests to determine the suitability of a foam concentrate in an airport environment</em>. That is a test of the concentrate, and it is done by sample. The chain from drum to scene then runs: sample passes the functional fire test → the drum in your vehicle is from that batch and within shelf life → proportioner calibrated for that concentrate → induction within ±10% (§8.1.6.4) → in-service test confirms the system is still producing it (§8.1.7.1, every twelve months).</p>
    <p>Break any link and the agent in your tank is not the agent the table assumed. That is why <em>use stocks in order of receipt</em> is written into the standard rather than left to a stock controller's discretion. Rotation is the mechanism that keeps the tested batch and the used batch the same batch.</p>

    <h3>The hot climate problem, stated honestly</h3>
    <p>Avoid extremes of temperature is a short clause with a long tail. Foam concentrate stored in an uninsulated shed at ambient temperature through a hot summer is at the top of its range for months. Concentrate viscosity rises as temperature falls, and concentrate stored at high temperature ages faster — which is why manufacturers publish storage temperature limits and why the standard defers to them rather than inventing a number.</p>
    <p>The practical questions your service has to answer: what temperature range does your manufacturer specify, is your store inside it, is it measured, and what is your action when it goes outside? A store with a maximum thermometer and no procedure attached to the reading does not satisfy the requirement.</p>

    <h3>The audit trail worth building</h3>
    <p>None of this needs a system. It needs a sheet. For each concentrate and dry chemical product held:</p>
    <ol>
      <li>Product, family, manufacturer, batch number.</li>
      <li>Date of receipt, and the position in the rotation order.</li>
      <li>Date first opened or drawn from, and by whom.</li>
      <li>Manufacturer shelf life and your calculated expiry date.</li>
      <li>Functional fire test result for that batch, or the sample test it is covered by.</li>
      <li>Storage location and the temperature range recorded for that location.</li>
      <li>For dry chemical: lid sealed on return, free from contaminants, confirmed.</li>
    </ol>
    <p>That sheet answers, in one place, the three questions an inspector always asks: is it in date, has it been tested, and has it been stored correctly. A service without it can answer all three and a service with it cannot.</p>

    <blockquote>
      <p><strong>SME action:</strong> walk the reserve store this week with a clipboard, not a checklist. Count what is actually there against what the 200% and 100% figures require. Then check four things on each container: is it marked, is it in date, is it from the correct rotation position, and has it been stored within the manufacturer's temperature range? Finally, confirm the reserve is physically inside the fire station and that the replenishment route from store to vehicle can be completed inside the window continuous application depends on. If it cannot, the reserve is decorative.</p>
    </blockquote>
  `,
  refs: [
    'ICAO Doc 9137 Part 1 — §2.6.1 foam concentrate reserve 200 per cent; §2.6.2 complementary agent reserve 100 per cent; §2.7.3 continuous application window',
    'ICAO Doc 9137 Part 1 — §8.3.1 conditions of storage of extinguishing agents, foam concentrate and dry chemical powders',
    'ICAO Doc 9137 Part 1 — §9.3.1 reserve of agents stored in the fire station(s)',
    'ICAO Doc 9137 Part 1 — §8.1.3 functional fire tests and accredited third-party testing authority; §8.1.6.4 induction tolerance; §8.1.7.1 twelve-month in-service test',
    'Your foam concentrate manufacturer data sheet — shelf life and storage temperature range',
    'Your aerodrome emergency plan — agent storage and replenishment'
  ],
  smeChecked: false
},

  'art04-m5': {
  title: 'Environmental drivers in agent choice',
  brief:
    'One hard prohibition in the standard, one family of agents whose ' +
    'composition is fluorinated, and a regulatory position you must ' +
    'establish rather than inherit from this platform.',
  points: [
    'The one absolute environmental prohibition in the standard is halon: production banned since 1994 under the Montreal Protocol (§8.2.6).',
    'Halons may still be fitted as fixed installations in some aircraft. Knowing what is fitted is an operational fact you need; stocking them is not an option.',
    'AFFF and FFFP contain fluorinated surfactants (§8.1.1(b), §8.1.1(d)). That is a composition fact from the standard, not a regulatory claim.',
    'This platform does not state what your State requires regarding fluorinated agents. That is your authority to determine and your SME to verify.',
    'Salt or brackish water in the foam solution interacts with tank structure, surface treatment and plumbing. The standard requires consultation with the concentrate manufacturer (§8.1.1(b)).',
    'Dry chemical is highly corrosive on metal and electrical componentry (§8.2.5). That is a maintenance and environmental driver as much as an airframe one.',
    'Dry chemical is not for flammable metal fires (§8.2.4). Lithium, magnesium, sodium and titanium need specialised agents.',
    'Agent choice has operational and environmental consequences that outlast the incident — and both belong in the aerodrome emergency plan.'
  ],
  body: `
    <h3>What the standard actually says about the environment</h3>
    <p>Very little, and the little it says is absolute. §8.2.6: <strong>in line with the 1987 Montreal Protocol on substances that deplete the ozone layer, the production of halon 1211, 1301 and 2402 has been banned since 1994</strong>. That is not guidance and it is not a recommendation — it is a production ban, and it is the single hard environmental prohibition in the extinguishing-agent chapter.</p>
    <p>Then the operational footnote that matters for you: <strong>halons are therefore no longer discussed in this document but may still be found in some aircraft fixed installations</strong>. So the halogen question for a modern service is not "shall we stock halon" — it is "what is fitted to the types we handle". That is an aircraft familiarisation question, and it belongs in ART-11.</p>

    <h3>The fluorinated families, stated as composition</h3>
    <p>Two of the four concentrate families are built on fluorinated chemistry, and the standard says so plainly:</p>
    <ul>
      <li><strong>AFFF</strong> (§8.1.1(b)) — concentrates consisting basically of <em>a fluorinated surfactant with foam stabilizer</em>.</li>
      <li><strong>FFFP</strong> (§8.1.1(d)) — <em>protein together with film forming fluorinated surfactants</em>.</li>
      <li><strong>Fluoroprotein</strong> (§8.1.1(c)) — protein with <em>a concentration of synthetic fluorinated surfactant</em>.</li>
    </ul>
    <p>Only protein foam (§8.1.1(a)) is built without fluorinated surfactant. That is the composition picture, taken directly from the standard.</p>
    <p>What this platform deliberately will not do is tell you what your State requires about those compounds. That is not an oversight — it is the same discipline applied to the national regulations throughout this curriculum. <strong>This platform does not know which State you are in and will not guess.</strong> If your authority regulates fluorinated extinguishing agents, restricts them, phases them out, or requires disclosure on discharge, that is your determination to make and your SME to verify against your own instrument.</p>

    <h3>The water chemistry driver</h3>
    <p>This one is fully sourced and easy to overlook. §8.1.1(b), on AFFF: <strong>it is also important to discuss with the manufacturer or supplier the use of an afff concentrate in extremes of temperature or where salt or brackish water may be used in the solution, with particular regard to any possibility of interaction between the tank structure, any surface treatment or the associated plumbing of the system</strong>.</p>
    <p>So if your supply is brackish, coastal or saline, that conversation is not optional — and it is a conversation with the manufacturer, not one to be resolved by the crew on shift. §8.1.11 covers the other half: water suitability <em>should be verified with the approval of the foam concentrate manufacturer</em>, and <em>no corrosion inhibitors, freezing point depressants or other additives should be used in the water supply without prior consultation with, and the approval of, the foam concentrate manufacturer</em>.</p>

    <h3>Consequences that outlast the incident</h3>
    <p>Two drivers that are not environmental in the narrow sense but produce the same long-tail obligations:</p>
    <p><strong>Corrosion from dry chemical.</strong> §8.2.5: dry chemical powder <em>can be highly corrosive when applied to metal surfaces and electrical componentry</em>. §12.2.16 then makes it a task with an owner — the operator must be informed of the nature of the agent used so they may take preventive action. That is a maintenance consequence created by your choice of agent on the day.</p>
    <p><strong>Gaps your current agents cannot fill.</strong> §8.2.4: dry chemical powders normally provided for aircraft RFF <em>are not specifically designed or intended for use on flammable metal fires, which require specialized agents</em>. If lithium battery cargo moves through your aerodrome, your stock does not cover your worst case. That gap needs a plan — a specialist response, mutual aid, or a cargo policy — rather than a note in a store room.</p>

    <h3>How to close this properly</h3>
    <p>This lesson is deliberately short on prescription, because the honest position is that the standard gives you the composition and the prohibition, and everything else is a regulatory determination you must make. Close it with these five, in writing:</p>
    <ol>
      <li><strong>Your State's position on fluorinated agents.</strong> Identify the instrument, the current requirement, and any phase-out or restriction dates. Record the citation.</li>
      <li><strong>Your fleet's halon exposure.</strong> Which types are based or transit your field with fixed halon installations, and what that means for your crew.</li>
      <li><strong>Your water chemistry.</strong> Supply source, salinity, and the manufacturer's written position on it for your concentrate.</li>
      <li><strong>Your uncovered fires.</strong> Flammable metals, lithium, and anything else your current agents cannot handle, each with a named response.</li>
      <li><strong>Your post-incident obligations.</strong> Who notifies the operator, what they are told, and how the corrosion inspection is tracked to completion.</li>
    </ol>

    <blockquote>
      <p><strong>SME action:</strong> items 1 and 2 are the two this platform cannot do for you. Establish your State's position on fluorinated extinguishing agents and record the instrument and clause. Confirm whether any aircraft types at your field carry fixed halon installations. Then confirm items 3, 4 and 5 from your own records — the water chemistry letter from your concentrate manufacturer, the list of fires your agents cannot handle with their response, and the agent-notification procedure. If item 1 cannot be answered from your own authority, that is the first call to make.</p>
    </blockquote>
  `,
  refs: [
    'ICAO Doc 9137 Part 1 — §8.2.6 halon production ban under the 1987 Montreal Protocol; halons may remain in some fixed installations',
    'ICAO Doc 9137 Part 1 — §8.1.1(a) protein foam without fluorinated surfactant; §8.1.1(b) AFFF fluorinated surfactant, temperature and salt/brackish water consultation; §8.1.1(c) fluoroprotein; §8.1.1(d) FFFP film-forming fluorinated surfactants',
    'ICAO Doc 9137 Part 1 — §8.1.11 water supply suitability verified with the foam concentrate manufacturer; additives require approval',
    'ICAO Doc 9137 Part 1 — §8.2.4 dry chemical not for flammable metal fires; §8.2.5 dry chemical corrosivity; §12.2.16 inform operators of the agent used',
    'Your national Civil Aviation Authority and environmental regulator — the instrument and clause governing fluorinated extinguishing agents in your State',
    'Your foam concentrate manufacturer — water chemistry suitability letter',
    'Course ART-14 — lithium battery hazards and response'
  ],
  smeChecked: false
},

  'art05-m1': {
  title: 'Appliances, turbines, large-capacity systems',
  brief:
    'What the standard specifies about the hardware, and an honest note on ' +
    'what it does not — because turbines and chambers are manufacturer territory.',
  points: [
    'Monitors are directional control devices. They deliver larger capacity streams from nozzles (§8.1.12).',
    'A high reach extendable turret is a permanently mounted, power-operated boom supplying a large-capacity, mobile, elevated stream (§8.1.13).',
    'An HRET places the nozzle forward of and below the operator, which eliminates overspray, gives a clearer view, improves aiming, reduces wind disruption and conserves agent (§8.1.13).',
    'Low level application lets the operator see the position of the monitor, minimising agent waste (§8.1.12).',
    'Dispersed patterns give greater coverage and more effective surface application, and are particularly valuable in protecting firefighters from radiated heat (§8.1.12).',
    'Penetrating technology delivers agent to the seat of a fire that hand lines cannot reach — cargo holds, tail engines, APUs (§8.1.14).',
    'Doc 9137 Part 1 does not specify roof turbines, foam chambers or large-capacity systems. Those come from the manufacturer, your national requirement, and NFPA 412.'
  ],
  body: `
    <h3>What the standard actually specifies</h3>
    <p>Start with the honest position, because it shapes this whole course. <strong>Doc 9137 Part 1 does not contain design or specification provisions for roof turbines, foam chambers or large-capacity systems.</strong> Those are manufacturer, national-requirement and NFPA 412 territory — and NFPA 412 is listed as a standard for this course but is not reproduced here, so this lesson will not invent its content.</p>
    <p>What Doc 9137 does specify is the performance the hardware has to deliver and how it is applied. That is enough to teach properly, provided you hold the boundary in the right place: the standard tells you <em>what the foam must do</em>, the manufacturer tells you <em>how your appliance does it</em>, and your national instrument tells you <em>which appliances you must have</em>.</p>

    <h3>Monitors</h3>
    <p>§8.1.12 is concise and worth knowing as a definition rather than a description: <strong>monitors are directional control devices which deliver larger capacity streams from nozzles</strong>. That is the whole category. Everything else — turret, cannon, roof monitor — is a monitor, and the operational consequence follows from the definition: a directional device means aim is a variable you control, so turret operation is a skill and not just a lever.</p>

    <h3>The high reach extendable turret</h3>
    <p>§8.1.13 gives the definition and then, unusually, explains why it is worth having. <strong>HRET can be defined as a device, permanently mounted with a power-operated boom or booms, designed to supply a large-capacity, mobile, elevated water stream or other fire extinguishing agents, or both.</strong></p>
    <p>Then the benefits, and they are specific enough to test against your own vehicle:</p>
    <ul>
      <li><strong>The extendable turret places the nozzle well forward and below the operator</strong>, thus <em>eliminating foam overspray and providing a clearer view of the effectiveness of agent application</em>.</li>
      <li><strong>The ability to position the nozzle nearer to, or in alignment with, the target</strong> allows more precise aiming.</li>
      <li>It <strong>reduces disruption from wind</strong> — which connects directly to the wind problem in ART-03 m4.</li>
      <li>And it <strong>helps to conserve agent</strong>.</li>
    </ul>
    <p>Overspray is the one to sit with. Foam that lands on the ground instead of the fuel is agent you bought and did not use, and on a category 9 incident the quantity is large enough for waste to be visible from the air.</p>

    <h3>Low level application</h3>
    <p>§8.1.12: <strong>low level application allows the operator to see the position of the monitor, therefore minimizing the waste of agents</strong>. Read that as a safety and accuracy feature before it is an economy feature. If the operator cannot see where the monitor is pointing, the operator is aiming blind — and the waste is the symptom of the aim.</p>
    <p>Where your fleet carries both high reach and low-level high performance monitors (§8.1.13), the choice between them is a tactical decision on the day, not a fixed preference.</p>

    <h3>Fog foam, and why it is not the same thing</h3>
    <p>§8.1.12 is candid about a common confusion: <strong>in some vehicles, standard water nozzles are employed to produce "fog foam", mainly from sideline deliveries. While these nozzles are effective in achieving rapid knockdown, they may not be pre-calibrated to produce foams of the specified qualities and these may not have the degree of performance associated with fully-aspirated foams that normally provide a longer duration and reignition (burn-back) protection.</strong></p>
    <p>So fog from a standard water nozzle is a legitimate knockdown tool that is <em>not</em> the same agent as your main system. It buys time and it buys protection for the crew working close in. It does not give you burn-back protection, and it should not be counted as having done so.</p>

    <h3>Penetrating technology</h3>
    <p>§8.1.14 covers vehicles equipped with HRET that also incorporate penetrating technology — an adjustable nozzle or rigid probe that delivers agent <em>in and around the aircraft and into the passenger or cargo compartments</em>. The stated purpose is worth quoting precisely: <strong>the piercing action of the rigid tip allows agent application to the seat of the fire, which may be inaccessible to hand-line operations such as in the case of cargo aircraft, tail-equipped aircraft engines, and auxiliary power units (APUs)</strong>.</p>
    <p>§8.1.15 then gives the manual equivalents: <em>manual piercing or hand-held penetrating nozzles</em>, given a safe working platform and proper protection; the <em>hand-held skin penetrating agent applicator tool (SPAAT)</em>; and <em>ultra-high pressure water streams</em> which use a narrow gauge stream to cut a small hole through the aircraft skin to apply agent into the interior.</p>
    <p>That last one deserves a moment. Ultra-high pressure water is cutting a hole in an aircraft to put agent inside. It is a technique with a consequence — a penetration point in the skin — and the guidance is explicit that it affords <em>greater flexibility when it comes to the strategies and tactics of aircraft interior firefighting</em>. Confirm your State's position and your operator's position before using it.</p>

    <h3>What to ask your appliance supplier</h3>
    <p>Because the standard stops at the performance boundary, these are the questions only your manufacturer and your authority can answer, and they should be in your specification file rather than in someone's memory:</p>
    <ol>
      <li>Delivered expansion ratio and 25% drainage time at each foam-making device on this vehicle.</li>
      <li>Jet range and spray pattern of the main monitor at each discharge setting (§8.1.6.2 requires both to be measured).</li>
      <li>Induction percentage tolerance achieved at the nozzle, not at the pump.</li>
      <li>Whether the vehicle can produce foam while on the move, and at what reduced output (§8.1.6.3 makes that a mandatory test where fitted).</li>
      <li>Maximum safe working height and reach of every applicator, against the 10.5 m engine height problem in ART-15 m1.</li>
      <li>Where you are permitted to use penetrating technology, and who authorises it on the day.</li>
    </ol>

    <blockquote>
      <p><strong>SME action:</strong> for each vehicle on your inventory, produce a one-page capability sheet from the manufacturer's data — every foam-making device with its expansion and drainage figures, every monitor with jet range and spray pattern, every applicator with its reach height, and whether foam-on-the-move is fitted. Then state which appliances your national instrument requires you to hold, and confirm your fleet meets it. Anything Doc 9137 does not cover must come from the manufacturer document and your own regulator, and both should be filed.</p>
    </blockquote>
  `,
  refs: [
    'ICAO Doc 9137 Part 1 — §8.1.12 monitors, low level application and fog foam from standard water nozzles',
    'ICAO Doc 9137 Part 1 — §8.1.13 high reach extendable turrets: definition and benefits; low-level high performance monitors',
    'ICAO Doc 9137 Part 1 — §8.1.14 penetrating technology; §8.1.15 manual penetrating nozzles, SPAAT and ultra-high pressure water streams',
    'ICAO Doc 9137 Part 1 — §8.1.6.2 jet range and spray pattern of the main monitor; §8.1.6.3 foam on the move',
    'NFPA 412 — Standard for the Testing and Maintenance of Fixed and Mobile Fire Extinguishing Systems (listed for this course; not reproduced by this platform)',
    'Manufacturer service documentation for your installed foam application systems',
    'Your national Civil Aviation Authority requirements — required appliance types'
  ],
  smeChecked: false
},

  'art05-m2': {
  title: 'Application technique',
  brief:
    'Solid stream, dispersed pattern or fog — three different tools, and ' +
    'the standard tells you when each is the wrong one.',
  points: [
    'Foam is applied in two distinct forms: solid streams and dispersed patterns (§8.1.12).',
    'Solid streams are used where the range of application is essential, or where the stream may be deflected from a solid object to distribute it in the fire area.',
    'Solid streams must be employed with care where survivors are evacuating and escape slides may be in use (§8.1.12).',
    'Dispersed patterns deliver at shorter ranges, combining greater coverage with more effective surface application.',
    'Dispersed patterns are particularly valuable in protecting firefighters from radiated heat (§8.1.12).',
    'Low level application minimises agent waste because the operator can see the position of the monitor (§8.1.12).',
    'Fog foam from standard water nozzles gives rapid knockdown but not the burn-back protection of a fully-aspirated foam (§8.1.12).',
    'The rate is an average over the whole practical critical area in one minute. Sweeping too fast leaves gaps; too slow piles up.'
  ],
  body: `
    <h3>Two forms, and the standard tells you when each applies</h3>
    <p>§8.1.12 opens with the whole taxonomy: <strong>foam can be applied to fires in two distinct forms</strong>. Not one form with two settings — two forms, with different logic.</p>
    <p><strong>Solid streams</strong> are used <em>where the range of application is essential</em>, or <em>where the stream may be deflected from a solid object to distribute it in the fire area</em>. Both of those are about getting the agent to a place. Range matters when you must reach something behind, above or beyond. Deflection matters when the aircraft structure itself is in the way and the stream has to be broken up on it.</p>
    <p><strong>Dispersed patterns</strong> <em>may be employed to deliver foam at shorter ranges to a fire area, combining greater coverage with the more effective surface application of the foam</em>. Shorter range, wider coverage, better surface application. That is the trade: you give up reach to gain coverage and effectiveness.</p>

    <h3>The constraint that catches people out</h3>
    <p>Here is the sentence to remember from this clause, and it is a safety constraint rather than a technique note: <strong>solid streams must be employed with care at an aircraft accident where survivors are evacuating the aircraft and escape slides may be in use</strong>.</p>
    <p>A solid stream driven across a deployed escape slide is a projectile. This is the clearest example in the whole agent chapter of a tactical decision that is also a duty of care, and it belongs in your pre-planned tactics for the same reason §12.3.25(d) puts egress protection ahead of fuselage coverage: the occupants are still coming down the slide.</p>

    <h3>Radiated heat protection is an application-pattern benefit</h3>
    <p>§8.1.12 gives a reason for dispersed patterns that is about your crew rather than the fuel: <strong>dispersed patterns are particularly valuable in protecting firefighters from radiated heat</strong>.</p>
    <p>That is worth understanding properly. A dispersed pattern delivers a curtain of droplets rather than a concentrated jet. The curtain absorbs radiant energy before it reaches the operator, so a dispersed pattern is also a heat shield for the person holding it. Where the crew has to work close to the fire — hand lines protecting egress, exposure cooling, rescue support — that is a live advantage rather than a nicety.</p>

    <h3>Low level application</h3>
    <p><strong>Low level application allows the operator to see the position of the monitor, therefore minimizing the waste of agents</strong> (§8.1.12). As noted in m1, read this as accuracy first. Seeing the monitor means knowing where the agent is landing, which means correcting, which means the waste does not happen.</p>

    <h3>The fog foam distinction</h3>
    <p>Again because it is routinely confused with the main system: <strong>standard water nozzles employed to produce "fog foam", mainly from sideline deliveries, are effective in achieving rapid knockdown, they may not be pre-calibrated to produce foams of the specified qualities, and they may not have the degree of performance associated with fully-aspirated foams that normally provide a longer duration and reignition (burn-back) protection</strong>.</p>
    <p>The word that carries the weight is <em>may not</em>. You do not know from the vehicle whether the sideline fog is compliant, and the guidance is not claiming it is. Use it for what it demonstrably does — knockdown, and protecting crew close in — and do not record it as having established your blanket.</p>

    <h3>The technique that ties it to the arithmetic</h3>
    <p>Everything above delivers agent. Whether the incident gets controlled comes down to one thing, which ART-03 m3 set out: the discharge rate is the practical critical area multiplied by the application rate, delivered over a one-minute control time (§2.5.1). Your application must therefore be an <em>average over the whole practical critical area in one minute</em>.</p>
    <p>Two failure modes, and they are mirror images of each other:</p>
    <ul>
      <li><strong>Sweeping too fast.</strong> The foam is laid in stripes with gaps between them. The fire burns through the gaps. No blanket forms, whatever the total volume on the gauge.</li>
      <li><strong>Sweeping too slow.</strong> The foam piles up in the first half of the area and the second half receives little or nothing. The gauge reads correctly at the end. The fire is not controlled.</li>
    </ul>
    <p>Neither is visible from the cab. That is why turret operation is a trained skill with a pass standard, not a licence to operate, and why the sector division between vehicles is set before the move rather than negotiated on scene.</p>

    <h3>Pattern selection, in the order the standard implies</h3>
    <ol>
      <li>Is range essential — is the seat of the fire behind, above or beyond structure? If yes, solid stream.</li>
      <li>Will the stream be deflected off a solid object to spread in the fire area? If yes, solid stream works.</li>
      <li>Are occupants evacuating or escape slides deployed? If yes, solid streams with care — and check the pattern before you commit.</li>
      <li>Is the crew working close to radiant heat? If yes, dispersed pattern, for the protection it gives the operator.</li>
      <li>Is the monitor position visible to the operator? If no, go to low level application.</li>
      <li>Is the required rate achievable across the whole practical critical area in one minute from this position? If no, the position is wrong, not the technique.</li>
    </ol>

    <blockquote>
      <p><strong>SME action:</strong> for each of your monitors, record the discharge settings available and the pattern at each — solid, dispersed, or both. Confirm your pre-planned tactics state the pattern to be used per fire type, not just the position. Then verify something that is easy to leave out: has every turret operator on your roster demonstrated the sweep across a marked-out critical area at the required rate, with the sector boundaries of a neighbouring vehicle? If that demonstration has not happened in the last year, schedule it, because it is the single highest-leverage training event in the service.</p>
    </blockquote>
  `,
  refs: [
    'ICAO Doc 9137 Part 1 — §8.1.12 solid streams, dispersed patterns, care where survivors are evacuating, radiated heat protection, low level application, fog foam',
    'ICAO Doc 9137 Part 1 — §2.5.1 discharge rate equals the practical critical area multiplied by the application rate over a one-minute control time',
    'ICAO Doc 9137 Part 1 — §12.3.25(d) initial position protects egress routes of evacuating occupants',
    'ICAO Doc 9137 Part 1 — §8.1.13 HRET nozzle position and wind disruption',
    'Course ART-03 m3 — the water calculation; m4 — consumption under real conditions',
    'Course ART-04 m1 — how foam works'
  ],
  smeChecked: false
},

  'art05-m3': {
  title: 'Flow and pressure testing',
  brief:
    'Five measurements, two triggers for the test, and one tolerance that ' +
    'decides whether your foam is the foam the table assumed.',
  points: [
    'An acceptance test is required when the vehicle is first acquired for operational use, and after significant maintenance, refurbishment or component replacement that could affect foam quality or production performance (§8.1.6.1).',
    'A change of foam-making branches, nozzles or monitors is a trigger. Only the affected parts need testing (§8.1.6.1).',
    'The test confirms five things: induction percentage, expansion ratio, quarter drainage time, main monitor jet range, and main monitor spray pattern (§8.1.6.2).',
    'Induction can be checked using water instead of foam (§8.1.6.2(a)). If your induction monitoring system is fitted, its results must correspond with the sample analysis — that is a calibration check as well as a foam check.',
    'Induction tolerance is ±10% of the desired percentage at optimum working conditions (§8.1.6.4).',
    'Foam on the move must be assessed as a capability, and where a monitor has high and low discharge, both tested to manufacturer guidance (§8.1.6.3).',
    'Acceptable expansion: 6–10 for film-forming foams, 8–12 for protein-based. Drainage times in excess of 3 minutes film-forming and synthetic, in excess of 5 minutes protein-based (§8.1.7.6).'
  ],
  body: `
    <h3>Two triggers, and only two</h3>
    <p>§8.1.6.1 is precise about when the acceptance test is due, and it is worth knowing both because one is obvious and one is routinely missed.</p>
    <p><strong>Trigger one — acquisition.</strong> The test is carried out <em>when an RFF vehicle is first acquired by the licence holder for operational use at an aerodrome (acquisition may mean new or second-hand purchase, leasing or hire of an RFF vehicle)</em>.</p>
    <p>Note the parenthetical. A second-hand vehicle, a leased vehicle and a hired vehicle are all acquisitions. A service that tests new vehicles and assumes a used one is fine has a gap, and the vehicle that arrived on a Friday from a service that is closing is exactly the vehicle you need to have tested.</p>

    <p><strong>Trigger two — significant work.</strong> The test is carried out <em>when significant maintenance, refurbishment or component replacement has been undertaken on an RFF vehicle that could affect a change in the foam quality or production performance of the foam-making system. This includes a change of foam-making branches, nozzles or monitors</em>.</p>
    <p>And then the part that saves time: <em>only those parts of the system that could have been affected by the work undertaken or the component change need to be tested</em>.</p>
    <p>That is a proportionate requirement, and it is useful in practice. A new monitor does not invalidate the expansion test on a hand line. But it does invalidate that monitor's jet range and spray pattern, and those must be re-measured — because a different nozzle has a different pattern, and the pattern is what determines coverage.</p>

    <h3>The five measurements</h3>
    <p>§8.1.6.2 lists what the foam production performance test should confirm:</p>
    <ol>
      <li><strong>Induction percentage for all foam-making devices.</strong></li>
      <li><strong>Expansion ratio from all foam-making devices.</strong></li>
      <li><strong>Quarter drainage time from all foam-making devices.</strong></li>
      <li><strong>The jet range of the main monitor.</strong></li>
      <li><strong>The spray pattern of the main monitor.</strong></li>
    </ol>
    <p>Two practical notes on that list, both from the guidance itself. First, <em>induction can be checked using water instead of foam</em> — which means a routine induction check does not consume concentrate, and can be done more often than a full acceptance test. Second, <em>if the foam production system is fitted with an induction monitoring system, the test results obtained from analysis of the foam sample should correspond with those provided with the monitoring system, i.e. check for correct calibration and accuracy of the induction monitoring system</em>.</p>
    <p>The second point is the one that catches people. If your vehicle displays an induction percentage, that display is an instrument and instruments drift. The acceptance test is where you prove the instrument tells the truth.</p>

    <h3>Foam on the move</h3>
    <p>§8.1.6.3 makes this mandatory rather than optional where the vehicle is so equipped: <strong>for vehicles equipped with foam monitors capable of producing foam while on the move, the tests shall include an assessment of this capability. Where both a high and low discharge capability has been provided on larger monitors, this provision should be tested in line with the manufacturer's guidance</strong>.</p>
    <p>Moving-application capability is a different delivery regime — the stream is being disturbed by motion and angle, so range and pattern on the move are not the figures from a stationary test. And where the monitor has high and low discharge, both have to be proven, because the low setting is what you will use when you want a fine spray near a fuselage.</p>

    <h3>The tolerances</h3>
    <p>§8.1.6.4 gives two, and they are not the same:</p>
    <ul>
      <li><strong>Proportioning systems</strong> — <em>induction systems should induce with a tolerance of +/-10% of the desired induction percentage at optimum working conditions</em>.</li>
      <li><strong>Premixed systems</strong> — <em>foam concentrate introduced to within a tolerance of 1.0 to 1.1 times the manufacturer's desired induction rate</em>.</li>
    </ul>
    <p>The same clause carries a caution worth flagging to anyone running premixed in a cold climate: <em>care should be taken in the use of freeze point depressants where premixed foam systems are exposed to low temperatures, since excessive amounts of additives may have adverse effects on fire extinguishing performance</em>.</p>
    <p>That is the trade-off stated plainly: the additive that stops the premix freezing is also the additive that degrades what the premix does. If your cold-weather procedure is "add more antifreeze", the procedure needs the manufacturer's figure attached to it, not a crew's judgement.</p>

    <h3>The acceptable ranges</h3>
    <p>§8.1.7.6 gives you the numbers to check the test results against: <strong>generally, expansion ranges from 6 to 10 for film-forming foams and from 8 to 12 for protein-based foams. Drainage times should be in excess of 3 minutes for film-forming foams and synthetic foams and in excess of 5 minutes for protein-based foams when tested in accordance with their respective methods</strong>.</p>
    <p>Two families, two ranges, and they do not overlap in drainage. If your protein foam drains at four minutes, it is out of specification for protein — and it may look and behave perfectly well on the day, which is why this only fails if somebody measures it.</p>

    <h3>The test calendar</h3>
    <p>Pulling the triggers and intervals together, the complete schedule is:</p>
    <table class="calc">
      <tr><th>Test</th><th>When</th><th>What</th><th>Clause</th></tr>
      <tr><td>Acceptance</td><td>On acquisition — new, second-hand, leased or hired</td><td>All five measurements</td><td>8.1.6.1, 8.1.6.2</td></tr>
      <tr><td>Acceptance</td><td>After significant maintenance, refurbishment or component change</td><td>Affected parts only</td><td>8.1.6.1</td></tr>
      <tr><td>On-move capability</td><td>Included in acceptance where the monitor is so equipped</td><td>Capability, plus high and low discharge</td><td>8.1.6.3</td></tr>
      <tr><td>In-service</td><td>At least every twelve months</td><td>Ongoing capability of the foam production system</td><td>8.1.7.1</td></tr>
      <tr><td>Concentrate test</td><td>Functional fire test, accredited third-party authority</td><td>Suitability of the concentrate in an airport environment</td><td>8.1.3</td></tr>
      <tr><td>Routine induction check</td><td>As required — water may be used instead of foam</td><td>Induction percentage, and monitoring system calibration</td><td>8.1.6.2(a)</td></tr>
    </table>
    <p>Add one item that is not a test but belongs on the same sheet: <strong>record the discharge rate achieved</strong> and confirm it is not less than the Table 2-3 rate for your category. §2.5.1 puts the requirement directly — <em>the discharge rates of the foam solution should not be less than the rates shown in Table 2-3</em> — and §2.5.2 does the same for complementary agents.</p>

    <blockquote>
      <p><strong>SME action:</strong> produce the test file for every vehicle: acquisition record and date, all acceptance tests with the five measured values, the on-move assessment where fitted, the last in-service test, and the concentrate functional test covering the batch in the tank. Then check the two triggers honestly — was the second-hand or leased vehicle tested, and was a test done after the last nozzle, branch or monitor change? If either answer is no, that is the finding to fix this month. Finally, confirm every measured induction percentage sits within ±10% and every expansion and drainage figure sits inside the range for your foam family.</p>
    </blockquote>
  `,
  refs: [
    'ICAO Doc 9137 Part 1 — §8.1.6.1 acceptance test triggers: acquisition including second-hand, leased and hired; significant maintenance, refurbishment or component replacement; affected parts only',
    'ICAO Doc 9137 Part 1 — §8.1.6.2 the five measurements: induction percentage, expansion ratio, quarter drainage time, main monitor jet range, spray pattern; induction may be checked with water; induction monitoring system calibration',
    'ICAO Doc 9137 Part 1 — §8.1.6.3 foam monitors capable of producing foam while on the move; high and low discharge capability',
    'ICAO Doc 9137 Part 1 — §8.1.6.4 induction tolerance ±10%; premixed 1.0 to 1.1 times desired rate; freeze point depressant caution',
    'ICAO Doc 9137 Part 1 — §8.1.7.1 in-service test at least every twelve months; §8.1.7.6 expansion ranges and drainage times',
    'ICAO Doc 9137 Part 1 — §2.5.1 and §2.5.2 discharge rates not less than Table 2-3',
    'NFPA 412 — Standard for the Testing and Maintenance of Fixed and Mobile Fire Extinguishing Systems (listed for this course; not reproduced by this platform)'
  ],
  smeChecked: false
},
'art05-m4': {
  title: 'Fault diagnosis',
  brief:
    'Work from the tank forward. Most foam faults are found in the ' +
    'first two steps and misdiagnosed at the turret.',
  points: [
    'Vehicle foam tanks must be kept full while the vehicle is in operational service. Partially filled tanks create stability problems when the vehicle is cornering at speed (§2.6.4).',
    'An air space above protein foam causes oxidation and agitation, and serious sludging problems result (§2.6.4).',
    'Foam only counts as acceptable when the solution arrives at the correct concentration AND the correct pressure range to the aspirating nozzle (§8.1.2).',
    'Induction percentage and the water pressure at the nozzle are the two variables the operator can actually change in the field.',
    'A monitoring system that reads correctly proves nothing until it has been checked against a sample analysis (§8.1.6.2(a)).',
    'Protein systems should be periodically discharged and washed through so the tank does not contain stale foam (§2.6.4, §8.1.1).',
    'Acceptable expansion and drainage ranges are family-specific: 6–10 expansion and >3 min drainage for film-forming, 8–12 and >5 min for protein (§8.1.7.6).'
  ],
  body: `
    <h3>Work from the tank forward</h3>
    <p>A foam fault is diagnosed most reliably in one direction: concentrate in the tank, then solution, then induction, then nozzle, then the foam at the turret. That order works because each step can only affect the steps downstream of it, and the tank is the only step that can be checked by looking. Everything else needs a measurement.</p>
    <p>The discipline is to <em>not</em> start at the turret. The most common misdiagnosis in foam operations is a crew increasing monitor pressure to compensate for bad foam — which produces a worse blanket and destroys the evidence you needed.</p>

    <h3>Step one — the tank</h3>
    <p>§2.6.4 gives two reasons your foam tank must be full, and neither of them is about the foam:</p>
    <ul>
      <li><strong>Stability.</strong> <em>Vehicle foam tanks must be kept full at all times when the vehicle is in operational service because partially filled tanks will create stability problems when the vehicle is cornering at speed.</em></li>
      <li><strong>Sludging.</strong> <em>Serious sludging problems can occur where protein foam is carried through oxidation and agitation if there is an air space above the surface of the foam.</em></li>
    </ul>
    <p>So a half-full tank is a driving hazard first and an agent hazard second, and the second consequence is specific to protein: oxidation and agitation need oxygen, and an air space supplies it. §2.6.4 also gives the preventive step: <em>where protein foam concentrates are used, the entire contents should be periodically discharged and the entire system washed through to ensure that the tank does not contain stale protein foam</em>.</p>
    <p>Worth noting the practical tension: "keep it full" and "periodically discharge it" pull in opposite directions. The resolution is that the reserve supply (§2.6.1 — 200 per cent of the Table 2-3 quantity) exists to let you discharge and refill rather than let the tank run down. A service that discharges the tank has to have the concentrate to put back in it immediately.</p>

    <h3>Step two — concentration and pressure, together</h3>
    <p>This is the step the standard treats as a single condition and that crews split in two. §8.1.2.2: <strong>in all cases, the system will produce an acceptable foam only if the solution is delivered in the appropriate concentration and in the correct pressure range to the aspirating nozzle or nozzles</strong>.</p>
    <p>Two variables, and a fault in either produces bad foam. The diagnostic consequence is that <em>you cannot diagnose an induction fault by watching the foam</em> — because a pressure fault and a concentration fault look the same from the turret. You need two measurements.</p>
    <p>Which is where the induction monitoring question becomes practical. §8.1.6.2(a) requires that where a monitoring system is fitted, the sample analysis results <em>should correspond with those provided with the monitoring system</em>. A monitoring system tells you about concentration. It tells you nothing about nozzle pressure. If your vehicle has no independent pressure measurement at the nozzle, you cannot fully diagnose the system at all — and that is an equipment finding, not a crew one.</p>

    <h3>Step three — the nozzle and the foam</h3>
    <p>Once concentration and pressure are confirmed, what remains is the foam itself, and you check it against family-specific ranges (§8.1.7.6):</p>
    <table class="calc">
      <tr><th>Measure</th><th>Film-forming (AFFF, FFFP)</th><th>Protein-based</th></tr>
      <tr><td>Expansion ratio</td><td>6 to 10</td><td>8 to 12</td></tr>
      <tr><td>25% drainage time</td><td>In excess of 3 minutes</td><td>In excess of 5 minutes</td></tr>
    </table>
    <p>Reading a fault from these two numbers:</p>
    <ul>
      <li><strong>Expansion low, drainage short</strong> — the classic lean/under-induced foam. Suspect induction percentage, or induction temperature, or a blocked or worn proportioning throat.</li>
      <li><strong>Expansion high, drainage short</strong> — over-expansion, or a concentrate that has been diluted in the tank. Suspect water in the concentrate, or the wrong concentrate.</li>
      <li><strong>Expansion and drainage both out of family range</strong> — suspect the wrong concentrate in the tank, or a concentrate past its shelf life (ART-04 m4).</li>
      <li><strong>Foam correct at the sample point, wrong at the turret</strong> — the fault is between them. Suspect nozzle condition, or pressure at the nozzle rather than at the pump.</li>
    </ul>
    <p>Those four readings are a diagnostic framework built from the two specification numbers and the two-variable condition in §8.1.2.2. The specific mechanical causes attached to each are <em>your</em> — they come from the manufacturer's fault tree for the appliance you run, and they belong in your SOP rather than in this lesson.</p>

    <h3>Step four — before the next call, not after</h3>
    <p>§8.1.7.1 requires the in-service test to confirm <em>the ongoing capability of the foam production system</em> at least every twelve months, and §8.1.7.2 notes that once the system has been fully tested and no changes made, in-service testing consists of periodic checks not exceeding that interval.</p>
    <p>A foam fault found on scene is also a defect report. If the concentration was wrong at the nozzle, that is a calibration finding; if the concentrate was degraded, that is a stock finding; if the tank had an air space, that is a discipline finding. All three have owners and all three recur if they are only fixed on the vehicle.</p>

    <h3>The record that makes diagnosis possible</h3>
    <p>None of this is achievable without a baseline. Keep, per vehicle and per foam-making device, the last measured induction percentage and the nozzle pressure at which it was taken; the last expansion ratio and 25% drainage time; and the last service date for the proportioning system. A fault at 03:00 is diagnosable in minutes against a baseline and un-diagnosable in an hour without one.</p>

    <blockquote>
      <p><strong>SME action:</strong> take the manufacturer's fault tree for each of your foam application systems and reduce it to the four symptom patterns above — low expansion and short drainage, high expansion and short drainage, both out of family range, and correct at the sample point but wrong at the turret. Attach the mechanical causes your manufacturer names for each. Then confirm three things are in place: your tanks are full whenever the vehicle is in operational service, your protein systems are on a periodic discharge and wash-through cycle, and you have a nozzle pressure measurement that is independent of your induction monitoring display. The third of those is the one most likely to be missing.</p>
    </blockquote>
  `,
  refs: [
    'ICAO Doc 9137 Part 1 — §2.6.4 vehicle foam tanks kept full; stability when cornering at speed; sludging from oxidation and agitation in protein foam; periodic discharge and wash through',
    'ICAO Doc 9137 Part 1 — §8.1.1 protein systems periodically discharged and washed through; §8.1.2.2 concentration and correct pressure range at the aspirating nozzle',
    'ICAO Doc 9137 Part 1 — §8.1.6.2(a) induction monitoring system calibration against sample analysis',
    'ICAO Doc 9137 Part 1 — §8.1.7.1 in-service test at least every twelve months; §8.1.7.2 periodic checks where no changes made',
    'ICAO Doc 9137 Part 1 — §8.1.7.6 expansion ranges and drainage times by foam family',
    'ICAO Doc 9137 Part 1 — §2.6.1 foam concentrate reserve of 200 per cent, which supports discharge and refill',
    'Manufacturer service documentation for your installed foam application systems — fault tree',
    'Course ART-04 m3 — compatibility, proportioning and testing; m4 — storage and rotation'
  ],
  smeChecked: false
},

  'art06-m1': {
  title: 'Vehicle types and capability',
  brief:
    'What each vehicle must be able to do, and the four kinds of vehicle ' +
    'that are not what they look like.',
  points: [
    'Command vehicles have virtually no rescue or firefighting capability and are not RFF vehicles. Auxiliary water tank vehicles can be useful but cannot be described as primary vehicles (§5.2.1).',
    'Annex 14 §9.2.41 sets the minimum vehicle count by category: categories 1–5 need one vehicle, 6–7 need two, 8–10 need three.',
    'Satellite fire stations should be provided whenever the response time cannot be achieved from a single fire station (§9.2.37).',
    'Table 5-1 splits vehicles at 4 500 L: above that, high and low discharge capability is required.',
    'Below 4 500 L a monitor is optional for categories 1 and 2 and required for categories 3 to 9.',
    'Acceleration: 0 to 80 km/h within 25 s below 4 500 L, within 40 s above. Top speed at least 105 km/h and 100 km/h respectively.',
    'All-wheel drive and automatic or semi-automatic transmission are required on both classes.',
    'The role of the vehicle is to reach the accident site quickly, protect evacuation paths, control any outbreak of fire and to initiate rescue (§5.2.2).'
  ],
  body: `
    <h3>What counts as an RFF vehicle</h3>
    <p>§5.2.1 draws the boundary explicitly, because airports buy vehicles that do not do the job. There are other vehicle types in use at airports, <em>such as command vehicles, used by officers in charge of a duty watch that have virtually no rescue or firefighting capability</em>. Some airports provide <em>auxiliary water tank vehicles, equipped with a pump and delivery hose, to replenish foam-producing vehicles at an aircraft accident. While these can provide a useful service, particularly where there are limited installed water supplies, they cannot be described as primary vehicles</em>.</p>
    <p>That is not a criticism of either vehicle. A command vehicle is genuinely useful, and a water tanker genuinely solves a real problem where hydrant coverage is thin. But neither discharges agent on the fire, so neither counts towards the response capability the level determination assumes. Chapter 5 considers only the RFF vehicles.</p>

    <h3>How many vehicles</h3>
    <p>Annex 14 §9.2.41 sets the minimum number by category, and it is worth having memorised because it is short:</p>
    <table class="calc">
      <tr><th>Aerodrome category</th><th>RFF vehicles</th><th>Aerodrome category</th><th>RFF vehicles</th></tr>
      <tr><td>1</td><td>1</td><td>6</td><td>2</td></tr>
      <tr><td>2</td><td>1</td><td>7</td><td>2</td></tr>
      <tr><td>3</td><td>1</td><td>8</td><td>3</td></tr>
      <tr><td>4</td><td>1</td><td>9</td><td>3</td></tr>
      <tr><td>5</td><td>1</td><td>10</td><td>3</td></tr>
    </table>
    <p>Two vehicles from category 6, three from category 8. And §9.2.37 is the provision that connects that number to your station layout: <strong>all rescue and firefighting vehicles should normally be housed in a fire station. Satellite fire stations should be provided whenever the response time cannot be achieved from a single fire station</strong>.</p>
    <p>So vehicle count and station count are one decision, not two. A category 9 aerodrome needs three vehicles, and if one station cannot deliver the response time to the far end of the movement area, the answer is a satellite station — not a faster vehicle.</p>

    <h3>The two vehicle classes</h3>
    <p>Table 5-1 sets suggested minimum characteristics and splits vehicles at 4 500 litres of water. The differences are not cosmetic:</p>
    <table class="calc">
      <tr><th>Feature</th><th>Up to 4 500 L</th><th>Over 4 500 L</th></tr>
      <tr><td>Monitor</td><td>Optional for cat 1–2; required cat 3–9</td><td>Required cat 3–9</td></tr>
      <tr><td>Discharge capability</td><td>High</td><td><strong>High and low</strong></td></tr>
      <tr><td>Monitor range</td><td>Appropriate to longest aeroplane</td><td>Appropriate to longest aeroplane</td></tr>
      <tr><td>Handlines</td><td>Required</td><td>Required</td></tr>
      <tr><td>Truck nozzles</td><td>Optional</td><td>Required</td></tr>
      <tr><td>Bumper turret</td><td>Optional</td><td>Optional</td></tr>
      <tr><td>Acceleration 0–80 km/h</td><td><strong>within 25 s</strong></td><td><strong>within 40 s</strong></td></tr>
      <tr><td>Top speed</td><td>At least 105 km/h</td><td>At least 100 km/h</td></tr>
      <tr><td>All-wheel drive</td><td>Required</td><td>Required</td></tr>
      <tr><td>Transmission</td><td>Automatic/semi-automatic required cat 3–9</td><td>Required cat 3–9</td></tr>
      <tr><td>Min. approach/departure angle</td><td>30°</td><td>30°</td></tr>
      <tr><td>Min. static tilt angle</td><td>30°</td><td>28°</td></tr>
    </table>
    <p>Read the trade in the middle. The larger vehicle is <em>slower</em> — 40 seconds against 25, and a lower top speed — and has a slightly lower tilt angle. It exists because it carries more agent and can deliver it at variable rate. That is a deliberate design position: the vehicle that arrives first is not always the vehicle that delivers the most.</p>

    <h3>The monitor, and why "high and low" matters</h3>
    <p>Table 5-1 requires high and low discharge capability on the larger vehicle. §5.7.3 explains why the low setting earns its place: <em>the monitor operator must be able to assume the operating position while the vehicle is in motion and operate the monitor through at least 60 degrees either side of the central axis of the vehicle. Depression of the monitor should deliver foam at ground level not more than 12 m ahead of the vehicle while providing an elevation of not less than 30 degrees</em>.</p>
    <p>Those are operationally specific numbers and they are worth knowing because they tell you what the driver and the monitor operator can actually do together. 60 degrees either side means the crew can cover the near flank of a fuselage without the vehicle repositioning. Ground level 12 m ahead with 30 degrees of elevation is a reach figure — it defines how close the vehicle can get before the monitor depresses into the fuel.</p>
    <p>And §5.7.2 on crews: <em>the ability to maintain uninterrupted foam production while the vehicle is in motion at speeds up to 8 km/h is an essential design feature for all vehicles. In this mode, it will be impossible to deliver any complementary agent unless this is discharged through a monitor</em>. So foam-on-the-move is a design feature for every vehicle, and in that mode dry chemical is monitor-only.</p>

    <h3>The role, stated as a sentence</h3>
    <p>§5.2.2 is the cleanest statement of what a RFF vehicle is for: <em>the role of RFF vehicles is to reach the accident site quickly, protect evacuation paths, control any outbreak of fire and to initiate rescue</em>.</p>
    <p>Four verbs, in that order. Note that <em>protect evacuation paths</em> comes second, before controlling fire — the same priority ordering that appears in the positioning provisions at §12.3.25(d). A vehicle that can reach a fire faster but cannot protect the slide is not a better vehicle.</p>

    <h3>Where vehicles are not specified</h3>
    <p>Two carve-outs from Chapter 5, both useful to know. §5.1.2 says the chapter does not consider <em>the specialized vehicles intended for use in difficult environments</em> — those are Chapter 13, and they are ART-23 off-airport response. Communications equipment is Chapter 4, which is ART-18. Station location and housing are Chapter 9. So if you are specifying a vehicle, three things that feel like vehicle questions are not, and chasing them in the wrong chapter wastes time.</p>

    <blockquote>
      <p><strong>SME action:</strong> produce your vehicle inventory against Annex 14 §9.2.41 — category, vehicles required, vehicles held, and vehicles out of service at any given time. Then confirm two things that catch services out. First, that a single vehicle out of service does not put you below the §9.2.41 minimum, and what happens if it does. Second, that your station layout actually achieves the response time to the far end of the movement area, or that you have the satellite station §9.2.37 contemplates. If you cannot answer the second from a measured response time, that is a planning finding.</p>
    </blockquote>
  `,
  refs: [
    'ICAO Doc 9137 Part 1 — §5.1.2 vehicles not covered by Chapter 5; §5.2.1 command vehicles and auxiliary water tank vehicles; §5.2.2 the role of RFF vehicles',
    'ICAO Doc 9137 Part 1 — Table 5-1 suggested minimum characteristics, the 4 500 litre split, acceleration, top speed, all-wheel drive, transmission, tilt angle',
    'ICAO Doc 9137 Part 1 — §5.7.2 foam production in motion up to 8 km/h; complementary agent monitor-only in that mode; §5.7.3 monitor operation 60 degrees either side, ground level 12 m ahead, elevation not less than 30 degrees',
    'ICAO Annex 14 Volume I — §9.2.41 minimum number of RFF vehicles by category; §9.2.37 satellite fire stations',
    'NFPA 414 — Standard for Aircraft Rescue and Fire Fighting Vehicles (listed for this course; not reproduced by this platform)',
    'Your aerodrome manual — vehicle inventory and station layout'
  ],
  smeChecked: false
},

  'art06-m2': {
  title: 'Permitted and prohibited uses',
  brief:
    'A vehicle has a job. Doing other jobs with it is how a service ends ' +
    'up non-compliant without anybody deciding to be.',
  points: [
    'Vehicles must be capable of conveying and delivering at least the minimum quantities in Table 2-3 for the airport category (§5.3.1).',
    'Agent specified at "useable contents" level, because the containment and delivery system must account for quantities that cannot be discharged (§5.7.1).',
    'Foam production in motion up to 8 km/h is a design feature, but in that mode no complementary agent can be delivered except through a monitor (§5.7.2).',
    'Discharging agent at training still counts as discharge. Vehicles must return to complete availability in the shortest possible time (§5.7.1).',
    'Adding capability must not impair the primary role of the vehicle in aircraft firefighting (§5.1.3).',
    'Complementary agent quantity on a vehicle may be all or part of the category requirement, with the disposition related to the number of vehicles deployed (§5.2.2).',
    'A water tank vehicle can be useful where hydrant coverage is limited, but cannot be counted as a primary vehicle (§5.2.1).'
  ],
  body: `
    <h3>Useable contents, not tank capacity</h3>
    <p>§5.7.1 sets the specification rule that governs everything else: <em>the quantities and types of extinguishing agents should be expressed at the "useable contents" levels to ensure that the containment and delivery systems are designed to take account of those quantities of each agent which cannot be discharged</em>.</p>
    <p>So when you specify or verify a vehicle, you are checking useable contents, not the size of the tank. The agent that cannot leave the tank — the heel in the tank, the concentrate that cannot be drawn below the pickup, the residue in the pipework — does not count. A vehicle with a 5 000 L tank that can only deliver 4 200 L is a 4 200 L vehicle.</p>

    <h3>The minimum you must be able to deliver</h3>
    <p>§5.3.1 is the hard floor: <em>where vehicles are provided, as proposed in Table 2-5, they must be capable of conveying and delivering at least the minimum quantities of extinguishing agents specified in Table 2-3, according to the airport category. The response time requirements specified in 2.7.1 should also be taken into account</em>.</p>
    <p>Conveying <em>and</em> delivering. Carrying the agent is not the same as being able to put it on the fire at the required rate, and the vehicle specification has to satisfy both. That is why §5.7.1 continues that <em>any monitor designed to discharge foam must produce a foam of the specified quality, dependent on the type of concentrate used</em>, and that <em>the output, effective range and selective patterns of discharge must be related to the requirements of the airport RFF category and to the operational tactics to be employed by the crew</em>.</p>

    <h3>Complementary agent is distributable</h3>
    <p>§5.2.2 gives a flexibility that is often misunderstood as a loophole: <em>should the dual application of principal and complementary agents be considered, the quantity of complementary agent to be carried on a vehicle may be all, or some part of, that is required by the RFF category, the disposition of which to be related to the number of vehicles deployed at the airport</em>.</p>
    <p>So the complementary agent may sit on one vehicle rather than being split across the fleet. The constraint is that the disposition has to be <em>related to the number of vehicles deployed</em> — it is a fleet decision, not a per-vehicle one. And §5.7.1 requires that complementary agents <em>must be capable of delivery through monitors or extended hose lines at the defined rates of discharge, with a variable discharge capability where this would enhance their fire suppression properties</em>.</p>

    <h3>The restriction people trip over</h3>
    <p>§5.7.2: <em>the ability to maintain uninterrupted foam production while the vehicle is in motion at speeds up to 8 km/h is an essential design feature for all vehicles. In this mode, it will be impossible to deliver any complementary agent unless this is discharged through a monitor.</em></p>
    <p>So if you are rolling on scene applying foam from a side delivery line at 8 km/h, you cannot also knock down a running fuel fire with powder from a line on the same vehicle. The powder has to come through the monitor, or from another vehicle. That is a tactical constraint built into the hardware, and crews who have not thought about it discover it on scene.</p>

    <h3>Training discharge is still discharge</h3>
    <p>§5.7.1 makes this explicit and it is a routinely missed planning point: <em>where agents of all types are discharged, at accidents or in training, it is essential to return vehicles to complete availability in the shortest possible time</em>.</p>
    <p>Every live-fire exercise, every discharge drill, every practice discharge takes a vehicle out of availability for the refill, de-water and check cycle. If your exercise programme is not planned against vehicle availability, your training schedule is quietly reducing your operational fleet. That is a planning finding, not a training finding.</p>

    <h3>Adding capability has a limit</h3>
    <p>§5.1.3 draws the line: <em>care must be taken so that in providing any additional capability, the primary role of the vehicle in aircraft firefighting is not impaired</em>.</p>
    <p>And it sets out why the temptation exists — additional items are <em>desirable</em>, they <em>will also add to the cost of the vehicle and, in some cases, to the extent and complexity of the maintenance programmes</em>. So a vehicle that carries everything has a bigger maintenance burden and a crew that is slower to don, and both of those cost response time.</p>
    <p>§5.1.1 gives the governing objective: <em>the objective of every study must be to acquire vehicles which will provide an effective and reliable service throughout their "operational lives". This can only be ensured by the selection of vehicles of proven performance and reliability, to be operated by trained personnel and supported by using programmes of preventive maintenance by qualified support personnel</em>.</p>

    <h3>The three rules, stated plainly</h3>
    <ol>
      <li><strong>The primary role is aircraft firefighting.</strong> Everything else the vehicle does is secondary, and adding to it may not come at the cost of the primary.</li>
      <li><strong>You must be able to deliver, not merely carry.</strong> Useable contents, at the Table 2-3 rate, within the response time.</li>
      <li><strong>Every discharge, including training, costs availability.</strong> Plan the exercise programme against the vehicle count, not separately from it.</li>
    </ol>

    <blockquote>
      <p><strong>SME action:</strong> for each vehicle, record useable agent quantities rather than tank capacity, and confirm they meet or exceed Table 2-3 for your category. Confirm where your complementary agent is carried and that its disposition is documented against the number of vehicles deployed. Then check the harder question: list every scheduled discharge — exercises, drills, practice — over a year, and calculate the vehicle-days consumed. Compare that against your §9.2.41 minimum. If the exercise programme would put you below the minimum on any day, that is the finding, and the fix is scheduling rather than equipment.</p>
    </blockquote>
  `,
  refs: [
    'ICAO Doc 9137 Part 1 — §5.1.1 objective of vehicle selection; §5.1.3 additional capability must not impair the primary role',
    'ICAO Doc 9137 Part 1 — §5.2.2 disposition of complementary agent related to the number of vehicles deployed',
    'ICAO Doc 9137 Part 1 — §5.3.1 conveying and delivering the Table 2-3 minimum quantities',
    'ICAO Doc 9137 Part 1 — §5.7.1 useable contents levels, monitor output and complementary agent delivery rates, return to full availability after training discharge',
    'ICAO Doc 9137 Part 1 — §5.7.2 foam production in motion to 8 km/h; complementary agent monitor-only in that mode',
    'ICAO Annex 14 Volume I — §9.2.41 minimum number of RFF vehicles by category',
    'Course ART-03 m2 — principal versus complementary agents'
  ],
  smeChecked: false
},

  'art06-m3': {
  title: 'Pre-use checks and stop criteria',
  brief:
    'A check that cannot stop the vehicle is not a check. Decide the ' +
    'stop criteria before the alarm, not during it.',
  points: [
    'All vehicles require regular inspection of every aspect of structure, systems and operational functions (§5.7.15).',
    'Servicing and preventive maintenance will ensure, as far as is practicable, that the vehicle remains effectively available (§5.7.15).',
    'The time to complete servicing is directly related to accessibility, and the vehicle design must provide that facility (§5.7.15).',
    'Removable panels and suitable lifting connections must ensure that removal and replacement does not entail unacceptable extension of down-time (§5.7.15).',
    'Vehicle foam tanks must be kept full while in operational service — partly filled tanks create stability problems when cornering at speed (§2.6.4).',
    'Anti-corrosion treatments are essential in most airport environments, and should cover areas exposed to spilled concentrate or dry chemical (§5.7.15).',
    'The crew compartment must allow safe conveyance with space to don protective clothing; the driver needs all-round visibility and communication with the monitor operator (§5.7.3).'
  ],
  body: `
    <h3>The requirement is inspection, not a tick-box</h3>
    <p>§5.7.15 is the governing clause and it is short: <em>all vehicles will require regular inspection of every aspect of their structure, systems and operational functions. Servicing and preventive maintenance will ensure, as far as is practicable, that the vehicle will remain effectively available</em>.</p>
    <p>Two phrases carry weight. <em>Every aspect</em> — not the checklist items, the aspects. And <em>as far as is practicable</em> — which is a standard's way of acknowledging reality without excusing neglect: you are expected to achieve effective availability, and where you cannot, you are expected to be able to say why.</p>

    <h3>Turnaround time is a design property</h3>
    <p>§5.7.15 then makes the point that turns vehicle inspection into a vehicle specification question: <em>the time taken to complete these processes will be directly related to the accessibility of all the areas to be inspected and serviced and the design of the vehicle must provide this facility</em>.</p>
    <p>And on major components: <em>in anticipation of the need to remove a major component, such as the engine, pump, tank or foam-making system, removable panels and suitable lifting connections must ensure that removal and replacement does not entail unacceptable extension of down-time</em>.</p>
    <p>Read together, these say that a vehicle that is hard to inspect is a vehicle that will be unavailable for longer after every fault. Turnaround discipline (m5) is therefore partly a procurement decision that was made years ago.</p>

    <h3>The readiness criteria that are hard</h3>
    <p>Some checks are obvious. Some are not, and the ones that are not are where services fail. Three from the standard:</p>
    <ul>
      <li><strong>Tank full.</strong> §2.6.4: <em>vehicle foam tanks must be kept full at all times when the vehicle is in operational service because partially filled tanks will create stability problems when the vehicle is cornering at speed</em>. A half-full tank is a driving hazard before it is an agent problem.</li>
      <li><strong>Stale protein.</strong> §2.6.4 and §8.1.1 both require periodic discharge and wash-through of protein systems so the tank does not contain stale foam, and §2.6.4 identifies the mechanism — <em>serious sludging problems can occur where protein foam is carried through oxidation and agitation if there is an air space above the surface of the foam</em>.</li>
      <li><strong>Water chemistry.</strong> §8.1.11: water suitability <em>should be verified with the approval of the foam concentrate manufacturer</em>, and no additives without that approval. If your water source has changed, the foam you are producing has changed.</li>
    </ul>

    <h3>Corrosion is a foreseeable event, not bad luck</h3>
    <p>§5.7.15 is unusually prescient: <em>anti-corrosion treatments are essential in most airport environments and these can be extended to protect areas which may be exposed to any deposits of foam concentrate or dry chemical agents which may be spilled during replenishment operations</em>.</p>
    <p>So agent spillage during replenishment is expected by the standard, and the vehicle should be protected for it. That has a practical consequence worth checking: the under-chassis, walkway surfaces and the areas around the tank fill points are where spillage lands, and they should be protected in the design rather than discovered as corrosion.</p>

    <h3>The crew compartment is a checked item</h3>
    <p>§5.7.3 sets requirements that belong on a pre-use inspection because they are crew-safety properties, not vehicle properties: <em>the crew compartment must provide for the safe conveyance of the crew to an aircraft accident with sufficient space to facilitate the donning of elements of protective clothing. The driver must have all-round visibility, effective controls and instrumentation and some form of communication with the monitor operator during all firefighting operations</em>.</p>
    <p>Sufficient space to don protective clothing is measurable — try it, with the crew who will actually do it, in the actual compartment, in the kit they actually wear. All-round visibility is checked by looking, not by assuming. The communication between driver and monitor operator is checked by using it.</p>

    <h3>Writing your stop criteria</h3>
    <p>The check itself is straightforward. The difficult part is deciding, in advance, which findings stop the vehicle rolling — because that decision is very hard to make at 02:00 with an aircraft inbound.</p>
    <p>Build it in three classes, and write the class boundaries down:</p>
    <ol>
      <li><strong>Hard stop.</strong> No vehicle leaves. Examples: foam or water below the operational minimum; no operational agent; foam production system not producing to tolerance; SCBA sets incomplete or below pressure; no working radio; brakes or steering defect; tyres below limit; a safety defect on a crew item.</li>
      <li><strong>Conditional roll.</strong> The vehicle may respond but cannot be relied upon for the full task, and command must be told before it rolls. Examples: one monitor of two inoperative; degraded foam performance within tolerance but at the edge; non-essential equipment missing; high/low discharge reduced to one setting.</li>
      <li><strong>Operational defect.</strong> Vehicle rolls, defect is logged with a rectification time. Examples: a missing hand tool, a failed courtesy light, cosmetic corrosion.</li>
    </ol>
    <p>The value of the middle class is that it removes the argument from the alarm. When command knows the vehicle is degraded <em>before</em> it arrives, the tactical plan can be built around it. When the crew discovers it on scene, the plan was already wrong.</p>
    <p>Whatever your classes, they must be in writing, agreed with the watch supervisor who authorises the roll, and briefed. A stop criterion that only the crew member who set it knows about is not a criterion.</p>

    <h3>Recording the check</h3>
    <p>Record the check with enough detail to be useful later: date, vehicle, the fault found, the class it fell into, who authorised the roll, and the rectification due. The trend is worth more than any single entry — three vehicles with the same pump pressure drift across a quarter is a maintenance finding, and three crews reporting the same brake judder is an operational one.</p>

    <blockquote>
      <p><strong>SME action:</strong> write your three classes of finding and the stop criteria in each, and get them agreed by the person who authorises the roll. Then test the list against reality: pick the five faults most likely on your fleet and confirm each has a defined class and a defined action. Finally, check two things that are structural rather than procedural — that the crew compartment genuinely allows your crew to don their protective clothing without leaving it, and that the driver and monitor operator can communicate during a discharge. If either fails, that is a finding about the vehicle, not the crew.</p>
    </blockquote>
  `,
  refs: [
    'ICAO Doc 9137 Part 1 — §5.7.15 regular inspection of every aspect; servicing and preventive maintenance; accessibility and down-time; anti-corrosion treatment including areas exposed to spilled agents',
    'ICAO Doc 9137 Part 1 — §5.7.3 crew compartment space for donning protective clothing, driver all-round visibility, communication with the monitor operator',
    'ICAO Doc 9137 Part 1 — §2.6.4 foam tanks kept full; stability when cornering at speed; sludging in protein foam; periodic discharge and wash through',
    'ICAO Doc 9137 Part 1 — §8.1.11 water supply suitability verified with the foam concentrate manufacturer; additives require approval',
    'NFPA 1901 — Road Vehicles (listed for this course; not reproduced by this platform)',
    'Your operator SOP — pre-use inspection and defect classification'
  ],
  smeChecked: false
},

  'art06-m4': {
  title: 'Operating limits',
  brief:
    'Gradients, side slopes, tilt angles, speeds and altitudes — the ' +
    'vehicle will not tell you where the limit is. You will.',
  points: [
    'Minimum approach and departure angle is 30° on both Table 5-1 vehicle classes; minimum static tilt angle is 30° up to 4 500 L and 28° above.',
    'Acceleration 0–80 km/h within 25 s (up to 4 500 L) and 40 s (over 4 500 L); top speed at least 105 and 100 km/h respectively.',
    'Foam production in motion is specified up to 8 km/h. Beyond that, the spec does not claim it.',
    'Altitude above 600 m may affect normally-aspirated engine performance; turbochargers may be necessary to meet acceleration and cruising speed specifications (§5.7.14).',
    'Very high temperatures may necessitate additional engine cooling capacity; very low temperatures may require protection for the pump, plumbing and water tank (§5.7.14).',
    'Unusual quantities of sand or dust may require augmented induction filtration (§5.7.14).',
    'Emergency vehicles should be finished in a conspicuous colour, preferably red, in accordance with Annex 14 Vol I §6.2.2.2 (§5.7.13).',
    'Vehicles operated in the aircraft manoeuvring area have an additional lighting requirement defined in Annex 14 Volume I Chapter 6 (§5.7.13).'
  ],
  body: `
    <h3>The limits are in the specification, not on the vehicle</h3>
    <p>Nothing on the outside of a fire appliance tells a driver that the approach angle is 30° or the static tilt angle is 28°. Those are specification figures, verified at acceptance, and from then on they are knowledge that has to be in the crew's head or in the SOP. This lesson is the list.</p>

    <h3>Geometry and speed</h3>
    <table class="calc">
      <tr><th>Limit</th><th>Up to 4 500 L</th><th>Over 4 500 L</th></tr>
      <tr><td>Acceleration 0–80 km/h</td><td>within 25 s</td><td>within 40 s</td></tr>
      <tr><td>Top speed</td><td>at least 105 km/h</td><td>at least 100 km/h</td></tr>
      <tr><td>Min. approach and departure angle</td><td>30°</td><td>30°</td></tr>
      <tr><td>Min. static tilt angle</td><td>30°</td><td>28°</td></tr>
      <tr><td>All-wheel drive</td><td>Required</td><td>Required</td></tr>
      <tr><td>Transmission</td><td>Automatic/semi-automatic, required cat 3–9</td><td>Required cat 3–9</td></tr>
    </table>
    <p>All of these are Table 5-1 minimums, and §5.7.12 makes the important comment about them: <em>in some cases, the minimum characteristics provided are less demanding than those now available from vehicle manufacturers. In particular, accelerations, top speeds and static tilt angles of completed appliances now in service exceed these specifications</em>.</p>
    <p>So a modern vehicle is better than the floor in most of these. That does not make the floor irrelevant — it makes it the number to quote when a vehicle is not delivered to spec, and the number your response-time modelling is built on.</p>

    <h3>The one speed with a hard meaning</h3>
    <p>§5.7.2: <em>the ability to maintain uninterrupted foam production while the vehicle is in motion at speeds up to 8 km/h is an essential design feature for all vehicles</em>.</p>
    <p>Eight kilometres per hour. That is the specified envelope for foam production while moving. It is roughly a low-speed manoeuvre on the movement area, which makes sense — it is enough to reposition while applying. Above it, the specification makes no claim. And as §5.7.2 adds, <em>in this mode, it will be impossible to deliver any complementary agent unless this is discharged through a monitor</em>.</p>

    <h3>Stability, and why the tilt angle differs</h3>
    <p>The larger vehicle has a <em>lower</em> static tilt angle requirement — 28° against 30°. That is not an oversight; it reflects the mass distribution of a bigger tank and a longer wheelbase. But it connects directly to §2.6.4, which is the reason a partly filled tank is a hazard rather than an inefficiency: <em>partially filled tanks will create stability problems when the vehicle is cornering at speed</em>.</p>
    <p>So the tilt angle and the tank level are the same subject viewed two ways. Drive the tank full, and you drive inside the figure the vehicle was built to. Drive it half empty on a wet taxiway, and you have spent the margin the manufacturer gave you.</p>

    <h3>The local factors that change the numbers</h3>
    <p>§5.7.14 lists three, and each is a specification question rather than a driving one:</p>
    <ul>
      <li><strong>Altitude.</strong> <em>The performance of normally-aspirated engines may be affected at altitudes above 600 m and the use of turbochargers may be necessary to achieve acceleration and cruising speed specifications</em>. If your aerodrome is above 600 m, the Table 5-1 acceleration and top speed figures are only achievable with a turbocharged engine — and that has to be established at specification, not discovered on the first response in January.</li>
      <li><strong>Temperature.</strong> <em>Very high temperatures may necessitate additional capacity in the engine cooling system. Very low temperatures may require protective equipment for the vehicle including the firefighting pump, associated plumbing and the water tank</em>.</li>
      <li><strong>Sand and dust.</strong> <em>Unusual quantities of sand or dust in the atmosphere, requiring augmented filtration in the induction system to the engine</em>. This one is about engine life as much as performance, and it is a maintenance finding before it is a response finding.</li>
    </ul>
    <p>And §5.6.2 adds the surface point: <em>the design and construction of the vehicle should be suitable for carrying its full load over all types of roads and unimproved surfaces on, and in the vicinity of, the airport in all reasonable weather conditions</em>. Full load, not part load. Unimproved surfaces, not just paved.</p>

    <h3>Identity and lighting</h3>
    <p>§5.7.13 handles the things that make your vehicle recognisable as an emergency vehicle: <em>the provision of audible and visual devices to identify an emergency vehicle should conform to national or local legislation, in addition to any standard lighting requirement of these regulations</em>, and <em>an additional lighting requirement for vehicles to be operated in the aircraft manoeuvring area is defined in Annex 14 — Aerodromes, Volume I — Aerodrome Design and Operations, Chapter 6</em>.</p>
    <p>Then the one that gets checked at every audit: <em>airport emergency vehicles should be finished in a conspicuous colour, preferably red, in accordance with Annex 14, Volume I, 6.2.2.2</em>.</p>

    <h3>Beyond the table</h3>
    <p>§5.7.13 names what Table 5-1 does not cover: <em>braking performance, turning circle, tire equipment, interaxle clearance, exhaust emission and, as discussed in 5.6, dimensions</em>. And it sets the baseline for all of them: <em>these must meet or exceed national or local legislation, subject to such special dispensation as may be accorded to emergency vehicles</em>.</p>
    <p>Note that structure. The baseline is your national road legislation, and any dispensation an emergency vehicle enjoys is an exception to it, not a replacement for it. When a vehicle is specified, the brake and turning-circle figures come from your own vehicle legislation — which this platform cannot supply and should not guess at. Annex 14 sets the manoeuvring-area lighting requirement and the colour; your road authority sets everything else.</p>

    <blockquote>
      <p><strong>SME action:</strong> put your fleet&rsquo;s actual verified limits on a card in every cab — acceleration, top speed, approach and departure angle, static tilt angle, and the 8 km/h moving-application speed. Then check the four site-specific items against your aerodrome: elevation above 600 m (and whether your engines are turbocharged), the temperature range the vehicle is specified for, whether sand or dust filtration is augmented, and whether the vehicle is specified for full load over unimproved surfaces. Then confirm the manoeuvring-area lighting requirement from Annex 14 Volume I Chapter 6 and the conspicuous colour requirement from §6.2.2.2 are both met.</p>
    </blockquote>
  `,
  refs: [
    'ICAO Doc 9137 Part 1 — Table 5-1 acceleration, top speed, approach and departure angle, static tilt angle, all-wheel drive, transmission',
    'ICAO Doc 9137 Part 1 — §5.6.2 full load over all types of roads and unimproved surfaces in all reasonable weather conditions',
    'ICAO Doc 9137 Part 1 — §5.7.2 foam production in motion up to 8 km/h; complementary agent monitor-only',
    'ICAO Doc 9137 Part 1 — §5.7.12 minimum characteristics in Table 5-1 less demanding than current practice; stability and crew cab integrity',
    'ICAO Doc 9137 Part 1 — §5.7.13 braking, turning circle, tyres, interaxle clearance, dimensions against national legislation; audible and visual devices; manoeuvring area lighting; conspicuous colour',
    'ICAO Doc 9137 Part 1 — §5.7.14 altitude above 600 m; temperature extremes; sand and dust filtration',
    'ICAO Doc 9137 Part 1 — §2.6.4 partially filled tanks create stability problems when cornering at speed',
    'ICAO Annex 14 Volume I — §6.2.2.2 conspicuous colour, preferably red; Chapter 6 manoeuvring area vehicle lighting'
  ],
  smeChecked: false
},

  'art06-m5': {
  title: 'Turnaround discipline',
  brief:
    'The second response is decided by how well you handled the first. ' +
    'Refill, de-water, re-arm, re-crew — and the clock that governs all of it.',
  points: [
    'Where agents of all types are discharged, at accidents or in training, it is essential to return vehicles to complete availability in the shortest possible time (§5.7.1).',
    'The duration and complexity of replenishment processes have a significant effect on vehicle availability (§5.7.1).',
    'Replenishment processes must be designed for, not improvised on — §5.7.1 treats them as a specification item alongside agent and monitor design.',
    'Reserves exist to make immediate complete recharge possible (§2.6.1) — 200% foam concentrate and 100% complementary agent.',
    'A vehicle that is returning to service is still consuming response capability. Command should know when it is back, not assume it.',
    'Training discharge counts as discharge. Exercise scheduling must be planned against the Annex 14 §9.2.41 vehicle minimum.',
    'Protein systems require periodic full discharge and system wash-through (§2.6.4) — a turnaround step, not a maintenance-shop step.',
    'The crew, not just the machine, has to be re-armed. SCBA sets, radios, harnesses and PPE are part of availability.'
  ],
  body: `
    <h3>The clause that makes turnaround a design requirement</h3>
    <p>§5.7.1 is where this whole lesson comes from: <em>it is essential to consider the replenishment processes associated with the principal and complementary agent systems as the duration and complexity of these processes have a significant effect on vehicle availability. Where agents of all types are discharged, at accidents or in training, it is essential to return vehicles to complete availability in the shortest possible time</em>.</p>
    <p>Three things follow, and all three are unusual for a standard to say explicitly.</p>
    <p>First, replenishment is a <em>specification</em> question, handled in the same paragraph as agent quantities, monitor output and discharge patterns. It is not an operational afterthought. Second, replenishment time is a direct measure of availability — which makes it a response capability, not a logistics statistic. Third, and most often missed: <em>training</em> discharge is included. Every live-fire exercise and every practice discharge puts a vehicle out of availability by exactly the same mechanism as a real incident.</p>

    <h3>What "complete availability" means</h3>
    <p>The standard does not define the term, which means your service does. Complete availability is the state in which the vehicle can perform its primary role without limitation. Build the definition from the primary role in §5.2.2 — reach the accident site, protect evacuation paths, control fire, initiate rescue — and work backwards.</p>
    <ol>
      <li><strong>Agents.</strong> Foam and water to the operational minimum, complementary agent to its minimum, concentrate sufficient for the full load per §5.7.1 useable-contents accounting.</li>
      <li><strong>Systems.</strong> Foam production verified to tolerance after refill — induction percentage, and the tank confirmed full so §2.6.4 stability is preserved.</li>
      <li><strong>Water.</strong> Tank full, and the source reconnected. A vehicle that has discharged and not refilled is a vehicle that cannot respond.</li>
      <li><strong>Equipment.</strong> Hand lines, ladders, thermal imaging camera, rescue tool box, first aid, AED — checked present and undamaged after use.</li>
      <li><strong>Crew.</strong> SCBA sets recharged or replaced, radios working and charged, harnesses inspected, PPE cleaned and dried.</li>
      <li><strong>Paperwork.</strong> Agent consumption recorded, fault log updated, and the return-to-service time noted so the trend is visible.</li>
    </ol>
    <p>The crew line is the one that is usually implicit and should not be. A vehicle with full tanks and three responders whose SCBA sets are on the recharge rack is not in complete availability.</p>

    <h3>The reserves exist for this</h3>
    <p>§2.6.1 is explicit about what the reserve is for: <em>a reserve supply of foam concentrate equivalent to 200 per cent of the quantities of these agents identified in Table 2-3 should be maintained on the airport for vehicle replenishment purposes. This will permit an immediate complete recharge of the vehicles, if necessary, subsequent to an emergency and retention of a second complete recharge should another emergency occur before airport stocks can be replenished</em>.</p>
    <p>Read that as two full recharges available at all times. That is why §9.3.1 wants the reserve stored in the fire station — a reserve across the airfield cannot complete a recharge inside the continuous application window.</p>
    <p>And note the dependency chain in m4: protein systems need periodic complete discharge and wash-through (§2.6.4), which is a turnaround activity. So for protein, a full discharge is both an availability cost and a maintenance requirement. Doing it at end of shift while the reserve is on hand is better than doing it as a booked workshop job.</p>

    <h3>Refill route and wheel spin</h3>
    <p>The reserve is only useful if it can reach the vehicle. §5.7.15's accessibility provisions apply here as much as to inspection: the time to complete the process is related to how accessible the fill points are, and the design must provide the facility. So confirm:</p>
    <ul>
      <li>The route from the reserve store to the vehicle bay, at the station, with no gate or door delay.</li>
      <li>The fill point accessible without a ladder or a man on the roof — and safe to use with the vehicle fully loaded.</li>
      <li>The pump capable of refilling at the rate the turnaround requires, not just at the rate the specification claims under test conditions.</li>
      <li>The de-water provision — where the water goes, and whether you are refuelling with the vehicle on a slope. §2.6.4's stability point applies during the turn as well as on response.</li>
    </ul>

    <h3>Command needs to know</h3>
    <p>The last discipline, and the one that is purely cultural: <strong>a returning vehicle is not available until somebody says so.</strong> Command should be told when a vehicle is refilling, when it is re-arming, and when it is back — and should plan for the vehicle being out for the whole of that period, not for the part of it that looks quick.</p>
    <p>This is where the response time maths quietly fails. A service that measures response time from the alarm, with three vehicles on the forecourt, has measured the best case. If the first incident of the day puts two vehicles into a two-hour turnaround, the second incident of the day is answered from a smaller fleet. §2.7.1 is the requirement; this is the quiet way it stops being met.</p>

    <h3>A turnaround sheet that earns its keep</h3>
    <p>Keep it per vehicle and per incident, with six numbers and two ticks:</p>
    <ol>
      <li>Time incident concluded.</li>
      <li>Time refill started and finished.</li>
      <li>Time foam system verified to tolerance.</li>
      <li>Time re-armed — equipment and crew.</li>
      <li>Time declared back in service.</li>
      <li>Agent consumed, against the Table 2-3 figures.</li>
      <li>Foam induction percentage measured after refill.</li>
      <li>Faults found, class, and rectification due.</li>
    </ol>
    <p>Item 2 to item 5 is your actual turnaround time, measured rather than estimated. Item 7 is the one that catches proportioning drift the moment it starts, because a vehicle refilled with water that has changed will show it at the nozzle rather than three incidents later in a burn-back. And the trend across a quarter tells you whether your replenishment design or your reserve level is the constraint — which is exactly the question §5.7.1 tells you to be asking.</p>

    <blockquote>
      <p><strong>SME action:</strong> define &ldquo;complete availability&rdquo; for your service in writing, with the six elements above, and put it in your SOP rather than leaving it as understood practice. Then measure one real turnaround end to end, from incident concluded to declared back in service, and compare it against the continuous application window in §2.7.3. If your refill cannot complete inside that window, the reserve quantity, the pump rate or the fill point access is the constraint — and §5.7.15 says fix it in the design. Finally, add the turnaround time to your second-incident-of-the-day scenario and check the response time still holds with one vehicle down.</p>
    </blockquote>
  `,
  refs: [
    'ICAO Doc 9137 Part 1 — §5.7.1 replenishment processes have a significant effect on vehicle availability; return to complete availability in the shortest possible time after discharge at accidents or in training',
    'ICAO Doc 9137 Part 1 — §2.6.1 foam concentrate reserve of 200 per cent permits an immediate complete recharge and retention of a second complete recharge; §2.6.2 complementary agent reserve 100 per cent',
    'ICAO Doc 9137 Part 1 — §5.7.15 accessibility of areas to be inspected and serviced; down-time on major component removal',
    'ICAO Doc 9137 Part 1 — §2.6.4 foam tanks kept full; stability when cornering at speed; protein periodic discharge and wash through',
    'ICAO Doc 9137 Part 1 — §2.7.3 continuous agent application window; §5.2.2 the primary role of the vehicle',
    'ICAO Annex 14 Volume I — §9.2.41 minimum number of RFF vehicles; §9.3.1 reserve of agents stored in the fire station',
    'Course ART-01 m4 — the task resource analysis and continuous application before external assistance',
    'Course ART-03 m4 — consumption under real conditions'
  ],
  smeChecked: false
},

  'art07-m1': {
  title: 'What SCBA protects you from — and does not',
  brief:
    'The atmosphere is the hazard, and the hazard is different on every ' +
    'aircraft you might be asked to enter.',
  points: [
    'Firefighters entering any environment in which fire is present during an aircraft incident, and during overhaul operations, should be protected with self-contained respiratory equipment (§6.2.1).',
    'This applies equally to aircraft comprising aluminium and composite fibre materials (§6.2.1).',
    'A modern cabin interior is synthetic. In fire or charring it produces carbon monoxide, hydrogen chloride, chlorine, hydrogen cyanide and carbonyl chloride (phosgene) (§6.2.2).',
    'Composite fibre in fire can produce hydrogen cyanide, hydrogen chloride, hydrogen sulfide, hydrogen fluoride, acrolein and nitrogen dioxide (§6.2.3).',
    'Composite fibre in high impact without fire — a crash landing — can release minute particles into the atmosphere (§6.2.4).',
    'Industrial smoke masks and some limited-capacity compressed air equipment are unlikely to meet the requirements of these operations (§6.2.5).',
    'The equipment must be adequate in both basic function and operational duration for the tasks involved (§6.2.5).',
    'Competence in wearing the equipment is a requirement in its own right, not a by-product of having it (§6.2.6).'
  ],
  body: `
    <h3>When respiratory protection is required</h3>
    <p>§6.2.1 sets the trigger: <strong>firefighters entering any environment in which fire is present during an aircraft incident, as well as during overhaul operations, should be protected with self-contained respiratory equipment. This applies equally to aircraft that comprise aluminium and composite fibre materials.</strong></p>
    <p>Note two things. First, the trigger is <em>the environment</em>, not the job title — overhaul counts, so the crew working a cooled aircraft at 04:00 is in scope exactly as much as the crew making the initial attack. Second, the aluminium/composite point is explicit, and it is there because a decade ago the answer was "aluminium, so it's fine".</p>

    <h3>Why a cabin is not just smoke</h3>
    <p>§6.2.2 is the reason the equipment is self-contained rather than filtered: <strong>the cabin interior of modern passenger aircraft comprises synthetic materials which, during fire or charring, will produce dangerous toxic gases. Such gases include carbon monoxide, hydrogen chloride, chlorine, hydrogen cyanide and carbonyl chloride (phosgene).</strong></p>
    <p>Six named gases, and only one of them is the obvious one. A filtered respirator is designed to take out particular substances; it is not designed for an atmosphere containing phosgene and hydrogen cyanide in unknown concentration. And carbon monoxide in a fire atmosphere is exactly the gas that a particulate filter does nothing about, because it is not a particulate.</p>
    <p>So the guidance states that firefighters <em>required to enter a smoke-filled cabin or other toxic environment will need self-contained respiratory equipment of an approved design for the anticipated environment</em>. That phrase — <strong>approved design for the anticipated environment</strong> — is doing real work. Approved for what, and for where.</p>

    <h3>Composite fibre, and the one that catches people</h3>
    <p>§6.2.3: <strong>composite fibre, if involved in fire, can produce dangerous substances such as hydrogen cyanide, hydrogen chloride, hydrogen sulfide, hydrogen fluoride, acrolein and nitrogen dioxide</strong>. And §6.2.4 covers the case that is easier to miss: <strong>composite fibre, if involved in high impact, such as an aircraft crash landing without the presence of fire, may become damaged to the extent minute particles of composite fibres are released into the atmosphere. Firefighters required to enter an area where minute particles of composite fibre are present will need self-contained breathing apparatus or, as a minimum, full face respirators with the appropriate filtration filters.</strong></p>
    <p>Read those two together. §6.2.3 is a <em>fire</em> hazard requiring self-contained equipment. §6.2.4 is a <em>non-fire</em> hazard — a high-impact landing with no fire at all — where full face respirators with appropriate filtration are acceptable as a minimum.</p>
    <p>That distinction matters operationally. The scenario the crew will actually face at a 03:00 call is often the non-fire one: aircraft damaged, no flames, but composite structure broken down into airborne fibre. Treating that as a no-respiratory-protection scenario because there is no fire is the failure.</p>

    <h3>Adequate in function and in duration</h3>
    <p>§6.2.5 draws the line and names what does not cross it: <strong>it is essential to ensure that the respiratory equipment selected is adequate in terms of its basic function, and its operational duration for the tasks involved. Industrial smoke masks and certain types of limited capacity compressed air equipment are unlikely to meet the stringent requirements of these operations.</strong></p>
    <p>Two tests, both required. <em>Basic function</em> — does the equipment do what it is for. <em>Operational duration</em> — does it last as long as the task, which for a cabin entry under a foam blanket with a casualty in tow is a calculation, not a guess. A set rated at 15 minutes is fine for a search and useless for an extrication if nobody has counted the elapsed time.</p>

    <h3>Competence is part of the equipment</h3>
    <p>§6.2.6 is the clause that separates a service with breathing apparatus from a service that can use it: <strong>it is essential to develop and maintain a high level of competence in those firefighters appointed to wear respiratory equipment. This competence must include the most stringent procedures for the inspection, testing and maintenance of the equipment. If the highest standards are not achieved and maintained by regular training, the equipment can become ineffective and present a serious hazard to the wearer.</strong></p>
    <p>Note the causal direction. It is not that the equipment fails and therefore competence is needed. It is that <em>without</em> competence and maintenance, the equipment itself becomes the hazard to the wearer. The set is a tool that can injure the person using it.</p>
    <p>So §6.2.7 closes the loop: <strong>wherever self-contained respiratory equipment is operated, adequate arrangements must be made for the recharging of air cylinders with pure air and a quantity of spare parts should be hand-held to ensure the continuous availability of the service.</strong> Recharging with pure air, spare parts hand-held, continuous availability — all three, because a set that is on a compressor queue is not available.</p>

    <h3>Deciding whether to enter</h3>
    <p>The standard tells you what the equipment is for. It does not give you an entry decision, and that is correct — an entry decision belongs to the incident commander in front of the actual atmosphere, informed by the fire behaviour, the aircraft type and the state of the airframe.</p>
    <p>What this lesson can give you is the question to ask before the alarm rather than after it: for each aircraft type you handle, do you know whether it is aluminium, composite, or both; do you know what your equipment is approved for; and does your service hold equipment rated for the duration of the longest entry you would authorise?</p>

    <blockquote>
      <p><strong>SME action:</strong> for each aircraft type based at or transiting your aerodrome, establish whether it is aluminium, composite or mixed, and record the toxic products identified for it in fire and in high-impact-without-fire. Then confirm three equipment facts against your manufacturer&rsquo;s data and your State&rsquo;s approval: the equipment is approved for the anticipated environment, its rated duration, and the duration of the longest entry you would authorise. If the rated duration is less than your longest authorised entry, that is a finding and the answer is either shorter entries or better equipment — not a hope. Finally, confirm the pure-air recharge arrangement and where spare parts are held.</p>
    </blockquote>
  `,
  refs: [
    'ICAO Doc 9137 Part 1 — §6.2.1 respiratory protection where fire is present and during overhaul, including aluminium and composite fibre aircraft',
    'ICAO Doc 9137 Part 1 — §6.2.2 synthetic cabin interiors and the toxic gases produced in fire or charring',
    'ICAO Doc 9137 Part 1 — §6.2.3 composite fibre toxic products in fire; §6.2.4 composite fibre particles in high impact without fire',
    'ICAO Doc 9137 Part 1 — §6.2.5 adequacy in basic function and operational duration; industrial smoke masks and limited capacity compressed air equipment',
    'ICAO Doc 9137 Part 1 — §6.2.6 competence in the use of respiratory equipment; §6.2.7 pure air recharge, hand-held spare parts, continuous availability',
    'Manufacturer instructions for your specific self-contained breathing apparatus',
    'NFPA 6001 — Selection and Maintenance of Self-Contained Breathing Apparatus (listed for this course; not reproduced by this platform)',
    'Course ART-24 — emergency medical response and casualty care'
  ],
  smeChecked: false
},

  'art07-m2': {
  title: 'Donning, doffing and buddy checks',
  brief:
    'The kit is specified to be worn in part, throughout the tour of duty. ' +
    'Donning in a moving vehicle is the constraint that decides everything.',
  points: [
    'Protective clothing must be provided, maintained and readily available for instant use (§6.1.1).',
    'Some forms of protective clothing create dressing problems which cannot easily be solved within the crew compartment of a moving vehicle (§6.1.1(a)).',
    'If it cannot be dressed in while the vehicle is moving, it will not be dressed in.',
    'Protective clothing is distinct from ordinary fire service uniforms and is worn during firefighting activities including training (§6.1.2).',
    'Protective clothing provides protection from radiated heat and from injuries arising from impact or abrasion; a measure of protection from water ingress is desirable in low temperature operations (§6.1.2).',
    'A typical protective uniform consists of a helmet with visor, a suit (one piece or jacket and trousers), boots and gloves (§6.1.2).',
    'The helmet must permit both speech and the reception of audible signals or words of command (§6.1.3).',
    'Shared impersonal issue creates sizing and hygiene problems and real personal objections (§6.1.1(c)).'
  ],
  body: `
    <h3>Instant use is the design requirement</h3>
    <p>§6.1.1 opens with the requirement: <strong>it is essential that all personnel operating at an aircraft fire be provided with protective clothing which will ensure the wearer is able to perform the assigned duties. This clothing should be provided, maintained and readily available for instant use.</strong></p>
    <p>"Able to perform the assigned duties" is doing the work. The test is not protection in the abstract; it is whether the wearer can do the job while wearing it. And <em>readily available for instant use</em> is a specification on your uniform, not on the store room.</p>

    <h3>The moving-vehicle constraint</h3>
    <p>§6.1.1(a) gives the first of three factors, and it is the one that decides the whole design: <strong>the extent to which it is necessary to wear continuously all, or some elements of, the protective clothing so as to ensure immediate response when a call for attendance at an aircraft accident is received. Some forms of protective clothing create dressing problems which cannot easily be solved within the crew compartment of a moving vehicle.</strong></p>
    <p>State the consequence plainly, because it is worth more than the clause: <strong>if it cannot be dressed in while the vehicle is moving, it will not be dressed in.</strong> Not "it will be dressed in slowly", not "it will be done badly". Not dressed in.</p>
    <p>So the question "what do we wear under the turnout gear" is really "what can a dressed person put on in a moving cabin, in the dark, in the position they are actually sitting in". Test that with the crew who do it, in the seats they occupy, not in a station corridor.</p>

    <h3>Heat is the second factor, and it is a design compromise</h3>
    <p>§6.1.1(b): <strong>assuming that some elements of the protective clothing must be worn at all times during a tour of duty, there will be significant effects on the wearers in locations with high ambient temperatures. This is due to the nature of protective clothing and its inevitable restriction on the loss of body heat through natural ventilation processes. This suggests that there may have to be a compromise solution between the ultimate degree of protection offered by some forms of clothing and a lesser, but acceptable, form of protection which can be provided by clothing specifically designed for use in areas with high ambient temperatures. This compromise does not expose operatives to unacceptable risk but does ensure that immediate response to a call is feasible.</strong></p>
    <p>That is unusually candid, and the important sentence is the last one. <em>This compromise does not expose operatives to unacceptable risk</em> — the standard is saying a lesser but designed-for-purpose item is still acceptable protection. And <em>immediate response to a call is feasible</em> — the compromise exists to protect the response time, not to economise.</p>
    <p>The practical reading: in a hot climate, a single heavy suit worn continuously is the wrong answer, because it fails factor (a) and creates heat load that degrades judgement. A layered kit with a stated compromise is the right answer. Write the compromise down. An undocumented compromise is an accident; a documented one is a decision your own SMEs made.</p>

    <h3>Sizing is the third factor, and it is a personnel issue</h3>
    <p>§6.1.1(c) names the problem honestly rather than pretending it away: <strong>it is essential to recognize the problems which will arise for aesthetic and hygienic reasons if clothing has to be shared on an "impersonal issue" basis. Apart from the practical difficulties of ensuring that each wearer is provided with clothing of the correct size, in these circumstances there may well be strong personal objections to this practice.</strong></p>
    <p>The guidance's solution is worth noting because it is a design answer rather than an administrative one: <strong>the acquisition of relatively inexpensive uniforms, some of which require a special form of undergarment for complete protection, which can be worn in part throughout hours of duty without discomfort. Adequate protection can be provided and clothing issues may then be possible on a personal basis, ensuring correct sizing and eliminating the personal difficulties described above.</strong></p>
    <p>Cheaper uniform, worn over a proper undergarment, issued personally. That gives correct sizing and removes the hygiene objection, and it does it by making the worn-in-part layer inexpensive rather than by compromising the outer protection.</p>

    <h3>What the uniform actually is</h3>
    <p>§6.1.2 defines the scope and then the list: <strong>protective clothing is distinct from ordinary fire service uniforms and is worn during firefighting activities, including training. It is designed to provide the firefighter with protection from radiated heat and from injuries arising from impact or abrasion during operational activities. A measure of protection from the ingress of water is also desirable particularly in low temperature operations. A typical protective uniform consists of a helmet, with visor, a suit, either in one piece or in a jacket and trousers combinations, boots and gloves.</strong></p>
    <p>Two things to hold onto. It is <em>worn during training</em> — a crew who only suit up for incidents will suit up slowly for incidents. And "a measure of protection from the ingress of water" is a <em>measure</em>, listed as desirable and particularly for low temperature, which tells you it is the weakest of the four protections and the one most often traded.</p>

    <h3>The helmet is a communications device</h3>
    <p>§6.1.3 is where this becomes operational. Beyond impact, penetration, electrical conductivity and resistance to deformation under heat, <strong>it should not give the wearer a sense of isolation, and it must permit both speech and the reception of audible signals or words of command.</strong></p>
    <p>A helmet that muffles a crew command has stopped being protective and started being a hazard. Check it the way it will be used — worn, visor down, radio on, with a colleague talking — not by inspecting it on a shelf.</p>

    <h3>Doffing and the contamination problem</h3>
    <p>The standard's donning provisions are clear; its doffing provisions are not in Chapter 6 in comparable detail. That is an honest gap, and it means doffing discipline is yours to define.</p>
    <p>Build it around three principles that follow from what Chapter 6 does say:</p>
    <ul>
      <li><strong>Contaminated clothing does not go back into the crew compartment.</strong> A suit that has been in a smoke-filled cabin and is then carried in a closed vehicle contaminates the people and the equipment in that vehicle for the rest of the shift.</li>
      <li><strong>SCBA is last off and stays on until the atmosphere is confirmed.</strong> §6.2.1 includes overhaul operations in the respiratory protection requirement, so doffing is not the moment the environment becomes safe — it is the moment you have left it.</li>
      <li><strong>Facepiece hygiene is a real task.</strong> The whole apparatus is compromised by a contaminated facepiece, and that is exactly the equipment that must work next time.</li>
    </ul>
    <p>And a fourth, which is the same point as the buddy check: doffing is where buddy systems fail, because the urgency is over and attention moves on.</p>

    <blockquote>
      <p><strong>SME action:</strong> test the moving-vehicle constraint directly. Have your crew don each element in their actual seats, in the dark, in a moving vehicle, and time it. Any element that cannot be completed that way is either part of the worn-in-continuously layer or it is not part of the response kit. Then write down your heat compromise explicitly — which items are worn continuously, which only on response, and what the heat rationale is. Finally, define your doffing and decontamination sequence, confirm contaminated clothing does not re-enter the crew compartment, and brief it.</p>
    </blockquote>
  `,
  refs: [
    'ICAO Doc 9137 Part 1 — §6.1.1 protective clothing enabling the wearer to perform assigned duties, readily available for instant use, and the three factors: continuity of wear and dressing problems in a moving vehicle; heat and the compromise solution; impersonal issue, sizing and hygiene',
    'ICAO Doc 9137 Part 1 — §6.1.2 protective clothing distinct from ordinary uniforms, worn including in training; radiated heat, impact and abrasion, water ingress; the typical uniform list',
    'ICAO Doc 9137 Part 1 — §6.1.3 helmet requirements including speech and audible signals or words of command',
    'ICAO Doc 9137 Part 1 — §6.2.1 respiratory protection including during overhaul operations',
    'NFPA 600 — Personal Protective Equipment for Fire and Emergency Services (listed for this course; not reproduced by this platform)',
    'Manufacturer instructions for your specific personal protective equipment',
    'Course ART-16 m4 — exposure protection and withdrawal'
  ],
  smeChecked: false
},

  'art07-m3': {
  title: 'Inspection, maintenance and records',
  brief:
    'SCBA is the one piece of equipment that can kill the person using it, ' +
    'silently, if the records stop.',
  points: [
    'Competence must include the most stringent procedures for inspection, testing and maintenance (§6.2.6).',
    'If standards are not achieved and maintained by regular training, the equipment can become ineffective and present a serious hazard to the wearer (§6.2.6).',
    'Adequate arrangements must be made for recharging air cylinders with pure air (§6.2.7).',
    'A quantity of spare parts should be hand-held to ensure continuous availability (§6.2.7).',
    'Protective clothing must be provided, maintained and readily available for instant use (§6.1.1). Maintenance is part of availability, not an afterthought.',
    'NFPA 6001 governs SCBA selection and maintenance in your State. This platform does not reproduce it.',
    'The record is the control. If the facepiece seal, cylinder pressure and service history are not written down somewhere, no inspection regime exists.'
  ],
  body: `
    <h3>The clause that makes this a safety-critical lesson</h3>
    <p>§6.2.6 states the standard and the consequence in one sentence: <strong>it is essential to develop and maintain a high level of competence in those firefighters appointed to wear respiratory equipment. This competence must include the most stringent procedures for the inspection, testing and maintenance of the equipment. If the highest standards are not achieved and maintained by regular training, the equipment can become ineffective and present a serious hazard to the wearer.</strong></p>
    <p>Three claims, and the third is the one that reframes everything. Not just "the equipment might fail" — the equipment can <em>become a hazard to the wearer</em>. A breathing set that passes an air test and has a degraded facepiece seal, or a cylinder that passes a pressure test and has a compromised valve, does not announce itself. It fails at the moment of use, on the wearer, usually in the worst possible circumstances.</p>
    <p>"Most stringent" is also doing work. Not the same standard applied to all equipment across the service — the most stringent available procedure for this equipment, because the consequence of failure is borne by the person wearing it.</p>

    <h3>Three provisions the standard makes explicitly</h3>
    <ul>
      <li><strong>Pure air for recharge.</strong> §6.2.7: <em>adequate arrangements must be made for the recharging of air cylinders with pure air</em>. The word is <em>pure</em>. Compressed air quality matters, because a cylinder filled from a compressor with inadequate filtration introduces contaminants the wearer then breathes under load.</li>
      <li><strong>Spare parts hand-held.</strong> <em>a quantity of spare parts should be hand-held to ensure the continuous availability of the service.</em> Hand-held means carried by the service, not held in a store across the airfield. The same availability logic as the agent reserve in ART-06 m5.</li>
      <li><strong>Continuous availability.</strong> The stated purpose of both provisions. A set that is on a compressor queue or awaiting a part is not available.</li>
    </ul>

    <h3>Protective clothing is in scope too</h3>
    <p>§6.1.1 does not separate provision from maintenance: <strong>this clothing should be provided, maintained and readily available for instant use.</strong> Three obligations in one sentence, and the middle one is the one that gets dropped first.</p>
    <p>For clothing, maintenance is not only cleaning. It is: correct sizing maintained as the wearer changes; heat degradation and UV exposure tracked on outer layers; seams and closures checked; boots and gloves inspected for the abrasion damage they are specified to protect against; and the undergarment system kept stocked if you have adopted the §6.1.1(c) compromise.</p>
    <p>A service that has adopted the layered compromise in m2 must maintain the layers as a <em>system</em>. A good outer suit over a missing undergarment is not a good suit.</p>

    <h3>What NFPA 6001 covers, and what this lesson does not</h3>
    <p>NFPA 6001 — <em>Selection and Maintenance of Self-Contained Breathing Apparatus</em> — is listed for this course. It governs cylinder requalification intervals, fill procedures, facepiece selection, and the full maintenance regime in the United States.</p>
    <p><strong>This platform does not reproduce it, and will not invent its contents.</strong> What this lesson can do is tell you which decisions are yours and which come from that document and your State, so that when you open your own standard you know what you are looking for:</p>
    <ul>
      <li>Cylinder requalification interval and hydrostatic test requirements.</li>
      <li>Air quality specification for compressed breathing air, and compressor filtration standard.</li>
      <li>Facepiece selection and fit-testing requirements.</li>
      <li>Annual service scope and who is permitted to perform it.</li>
      <li>Record retention period for each set.</li>
    </ul>
    <p>Those five are the specification. The rest of this lesson is about the regime you build around them.</p>

    <h3>The record is the control</h3>
    <p>The failure mode in SCBA programmes is not usually a skipped inspection. It is a record that stops being filled in, so that when a set is issued nobody can say when it was last serviced, what its cylinder history is, or whether the facepiece has ever been fit-tested for the person now wearing it.</p>
    <p>Per set, maintain and keep:</p>
    <ol>
      <li><strong>Set identity</strong> — manufacturer, model, serial, mask size, cylinder serial and capacity.</li>
      <li><strong>Cylinder</strong> — date of manufacture, date of last hydrostatic test, next test due, all fills with air quality confirmation.</li>
      <li><strong>Service history</strong> — every intervention: date, nature of work, any damage, parts replaced.</li>
      <li><strong>Facepiece</strong> — fit test date for each wearer assigned, and the result.</li>
      <li><strong>Air consumption</strong> — recorded per entry where the wearer can estimate it, so that a growing shortfall shows up before it becomes an emergency.</li>
      <li><strong>Crew check</strong> — the pre-use check, by whom, and the pressure and alarm reading observed.</li>
    </ol>

    <h3>The pre-use check that actually happens</h3>
    <p>Whatever the manufacturer specifies, the crew check must be the same every time and must be recorded. At minimum, and in the manufacturer's order:</p>
    <ul>
      <li>Cylinder pressure, and that the contents are what the gauge claims — not a gauge reading taken from another set.</li>
      <li>Facepiece condition and seal: lens, webbing, face cushion, and the seal check the manufacturer specifies.</li>
      <li>Alarm activation at the specified test pressure.</li>
      <li>Valve and regulator function.</li>
      <li>Harness, straps and any quick-release.</li>
      <li>Any entry that indicates the set should not be issued.</li>
    </ul>
    <p>Two details that matter more than they look. The alarm test at the specified pressure is what tells you the wearer will be warned, and it is the item most often skipped under time pressure. And the set is withdrawn on <em>any</em> doubt — a crew who are unsure about a facepiece take a different set, and the set in question goes on the bench instead of into the next call.</p>

    <blockquote>
      <p><strong>SME action:</strong> take your SCBA register and answer four questions. Can you produce, for every set issued, its cylinder test date and air quality record? Can you produce a fit test for every wearer? Can you name who performs the annual service and what your standard requires them to do? And is there a set that has been issued in the last month with a defect noted but no rectification date? Each of those with no answer is the finding. Then confirm the pure-air recharge arrangement, the air quality specification being met, and where the hand-held spare parts actually are.</p>
    </blockquote>
  `,
  refs: [
    'ICAO Doc 9137 Part 1 — §6.2.6 competence including the most stringent inspection, testing and maintenance procedures; equipment can become a hazard to the wearer',
    'ICAO Doc 9137 Part 1 — §6.2.7 recharging air cylinders with pure air; spare parts hand-held for continuous availability',
    'ICAO Doc 9137 Part 1 — §6.1.1 protective clothing provided, maintained and readily available for instant use',
    'NFPA 6001 — Selection and Maintenance of Self-Contained Breathing Apparatus (listed for this course; not reproduced by this platform)',
    'NFPA 600 — Personal Protective Equipment for Fire and Emergency Services (listed for this course; not reproduced by this platform)',
    'Manufacturer instructions for your specific self-contained breathing apparatus — service scope and crew check sequence',
    'Your national Civil Aviation Authority requirements — confirm which SCBA standard and issue bind you'
  ],
  smeChecked: false
},
'art07-m4': {
  title: 'Heat stress, fatigue and impairment',
  brief:
    'Fitness is not a paperwork exercise. It decides whether you are the ' +
    'person who can be trusted with a decision at hour fourteen.',
  points: [
    'All RFF personnel must possess a minimum level of physical fitness and medical fitness to perform the tasks associated with these operations (§10.4.1).',
    'Optimum fitness means being able to carry out RFF activities safely, successfully and without undue fatigue (§10.4.1).',
    'The key fitness components are aerobic fitness, anaerobic fitness, flexibility and medical fitness (§10.4.1).',
    'The physical fitness assessment should be conducted at least once a year (§10.4.5).',
    'Medical fitness assessments should be conducted for pre-employment entry and ongoing for existing staff; frequency determined by each agency (§10.4.6).',
    'Medical fitness assessments should identify underlying medical conditions that may pose a risk during physically demanding activities (§10.4.6).',
    'Fatigue is greatly influenced by the shift system (§18.5.5). Sufficient rest must be ensured despite the need for 24-hour operational readiness.',
    'RFF management must accept that not all personnel can perform at the same level of physical fitness standards (§18.5.3).'
  ],
  body: `
    <h3>What fitness is for</h3>
    <p>§10.4.1 gives both the requirement and its measure: <strong>as the nature of RFF operations involves periods of intense physical activity, all RFF personnel have to possess a minimum level of physical fitness and medical fitness to be able to perform the tasks associated with these operations.</strong> And then the definition that keeps it honest: optimum fitness and medical fitness <em>would mean that a firefighter is able to carry out RFF activities safely, successfully and without undue fatigue</em>.</p>
    <p>"Without undue fatigue" is the operative test. A fit person who fatigues after twenty minutes of work has a fitness problem relative to the task, regardless of any score they achieved in a test.</p>

    <h3>Four components, two of which are aerobic and anaerobic opposites</h3>
    <table class="calc">
      <tr><th>Component</th><th>What it is</th><th>Typical activity</th><th>Clause</th></tr>
      <tr><td>Aerobic</td><td>Sustained exercise at low to moderate or high intensity; VO₂ dependent; governs endurance</td><td>Walking, jogging, cycling, rope skipping, stair climbing, swimming</td><td>10.4.2</td></tr>
      <tr><td>Anaerobic</td><td>High energy for seconds or minutes; muscular strength, speed, power</td><td>Heavy weight lifting, sprinting, power swimming, rapid bursts</td><td>10.4.3</td></tr>
      <tr><td>Flexibility</td><td>Moving limbs and joints to specific positions at end of normal range; reduces injury risk in cramped positions</td><td>Slow controlled stretching</td><td>10.4.4</td></tr>
      <tr><td>Medical</td><td>Absence of underlying conditions that may pose a risk during physically demanding activity</td><td>Assessment, not exercise</td><td>10.4.1, 10.4.6</td></tr>
    </table>
    <p>The aerobic/anaerobic distinction is not academic. An RFF response is a sprint — moving equipment, donning, entering, dragging a casualty — inside a longer endurance demand. A crew that is aerobically fit but has no anaerobic capacity struggles with the first thirty seconds of maximum effort, which is exactly when the response time is being measured.</p>

    <h3>The annual assessment</h3>
    <p>§10.4.5 sets the frequency and the population: <strong>the physical fitness assessment should also be conducted at least once a year. The physical fitness assessment should be conducted for pre-employment entry as a firefighter as well as ongoing physical fitness assessments for existing RFF staff to ensure they are maintaining their level of physical fitness.</strong></p>
    <p>Medical follows the same shape but with agency-set frequency (§10.4.6): <strong>medical fitness assessments specific to RFF services should be developed. The medical fitness assessments should be conducted for pre-employment entry as a firefighter as well as ongoing medical fitness assessments for existing staff. The frequency of medical fitness assessments should be determined by each agency.</strong></p>
    <p>Note "each agency" — the standard deliberately leaves the frequency to you, and therefore leaves you accountable for it. And the purpose is specific: <em>the medical fitness assessments should be used to identify any underlying medical conditions, which may pose a risk to the individual firefighter during physically demanding activities</em>.</p>

    <h3>Not everyone is the same, and that is not a problem</h3>
    <p>§18.5.3 is a management statement disguised as a fitness statement, and it is one services find difficult: <strong>to ensure that RFF personnel are able to perform their roles effectively, thought needs to be put into designing an appropriate physical fitness programme to condition them for the physical rigours of the job. In the process of designing any physical fitness programmes, due consideration must be given to individual human limitations. RFF management must also accept that not all personnel can perform at the same level of physical fitness standards. The key is to establish the minimum physical fitness requirements of a firefighter and design a programme that can best replicate these demands.</strong></p>
    <p>Establish the <em>minimum</em>, then build a programme that reaches it. Not a single elite standard that excludes people from the service, and not no standard at all. The clause is telling management to stop treating fitness variation as a problem to be solved and start treating it as a design input.</p>

    <h3>Fatigue is a roster problem</h3>
    <p>§18.5.5 is short and pointed: <strong>fatigue is one important factor that directly affects human performance and is greatly influenced by the shift system of RFF services. Besides the need to conform to local labour rules and regulations of individual States, there must be considerations to ensure that RFF personnel can have sufficient rest despite the need to be on 24-hour operational readiness at most airports.</strong></p>
    <p>Two things follow. First, the shift system is not an administrative detail that sits outside the safety case — it <em>is</em> a fatigue control, and its design is a safety decision with a named owner. Second, "conform to local labour rules" is not the end of the requirement. The standard asks for consideration of sufficient rest <em>despite</em> 24-hour readiness, which means the roster has to be designed around the human, not the labour rule.</p>
    <p>And note the connection to ART-01 m4: the task resource analysis requires that fatigue and adequate relief be considered as part of the staffing justification. The roster and the crew complement are the same question.</p>

    <h3>Noise, and the thing you stop noticing</h3>
    <p>§18.5.4 covers the hazard that is omnipresent and invisible: <strong>noise is an important human factor that is omnipresent in an airport environment and cannot be ignored. Most fire stations are located within close proximity to the runway and aircraft movement areas, thus exposing RFF personnel to constant loud noises. Besides posing as disruptive interferences during the transmission of messages, long-term and regular exposure to noise can have serious implications on one's health (e.g. temporary, partial or permanent hearing loss). To address this issue, RFF services should issue and mandate the use of suitable hearing protection devices. In addition, personnel who are subjected to constant exposure to noise should be sent for regular noise induced deafness (NID) hearing tests.</strong></p>
    <p>Read the operational sentence first: noise is a <em>disruptive interference during the transmission of messages</em>. That is the immediate RFF problem — you miss a word of command. The health consequence follows from it.</p>

    <h3>Psychological harm, treated as an operational reality</h3>
    <p>§18.5.1 makes the point that is most often omitted and most consequential: <strong>airport operators and RFF services must also not neglect the mental and psychological well-being of emergency responders such as RFF personnel who may suffer from post-traumatic stress disorders. Appropriate counselling of psychological therapy may need to be provided to RFF personnel who responded to such emergencies and who subsequently were not able to cope with the stress they faced thereafter.</strong></p>
    <p>And then the reason an operational plan should care: <em>it will therefore be essential to also provide psychological treatment for RFF personnel after a major crisis both from a welfare perspective and also from a business continuity standpoint</em>.</p>
    <p>Read that phrase carefully — <strong>business continuity</strong>. Psychological harm after a major incident does not only affect the individual. It affects the crew who have to cover while that person is off, and the roster you were already stretched on. It is an availability problem as well as a welfare one, which is exactly why it belongs in the emergency plan rather than in a policy document.</p>

    <blockquote>
      <p><strong>SME action:</strong> produce the fitness programme from §18.5.3: state your <em>minimum</em> physical fitness requirement, the assessment that measures it, and the programme that builds to it. Confirm the annual physical assessment is actually happening for every serving member, and confirm the medical assessment frequency your agency has determined — and that it looks for the underlying conditions §10.4.6 names, not just gross fitness. Then review the shift system as a fatigue control: hours worked before a night duty, rest between shifts, and what happens after a major incident. Finally, confirm hearing protection is issued and mandated, and that NID testing is arranged for exposed personnel. If any of these is a policy on paper with no record behind it, that is the finding.</p>
    </blockquote>
  `,
  refs: [
    'ICAO Doc 9137 Part 1 — §10.4.1 minimum physical and medical fitness; optimum fitness defined as carrying out activities safely, successfully and without undue fatigue; the four key components',
    'ICAO Doc 9137 Part 1 — §10.4.2 aerobic fitness; §10.4.3 anaerobic fitness; §10.4.4 flexibility; §10.4.5 physical fitness assessment at least once a year, pre-employment and ongoing',
    'ICAO Doc 9137 Part 1 — §10.4.6 medical fitness assessments, pre-employment and ongoing, frequency determined by each agency, identifying underlying medical conditions posing a risk',
    'ICAO Doc 9137 Part 1 — §18.5.1 psychological support for RFF personnel after a major crisis, welfare and business continuity; §18.5.3 not all personnel can perform at the same level, establish the minimum',
    'ICAO Doc 9137 Part 1 — §18.5.4 noise as a human factor, interference with message transmission, hearing protection and NID testing; §18.5.5 fatigue and the shift system',
    'NFPA 1561 — Emergency Services Personnel Occupational Health and Safety (listed for this course; not reproduced by this platform)',
    'Course ART-01 m4 — the task resource analysis, including fatigue and relief'
  ],
  smeChecked: false
},
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
