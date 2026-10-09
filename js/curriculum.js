/* =========================================================================
   AM RISK AND TRAINING — Aviation & ARFF Training Platform
   CURRICULUM DATA
   -------------------------------------------------------------------------
   This file is the single source of truth for the 25-course catalogue.

   IT IS MEANT TO BE EDITED BY HUMANS, NOT DEVELOPERS.

   Every course carries a `review` status:
     'scaffold'  Structure + learning outcomes written. Technical body text
                  and all technical/normative statements still need an SME
                  (subject-matter expert) to write or verify.
     'reviewed'  An SME has signed off the technical content.

   `sme` flags on quiz questions mean: the answer is technically correct as
   written but MUST be checked against the cited standard before the course
   is marked 'reviewed'. Do not delete the flag, satisfy it.

   Learning outcomes ('outcomes') are written as pedagogy, not as normative
   technical claims, and are safe to keep. Anything that states a specific
   quantity, level, rate, distance, time or legal duty lives in the module
   briefs and quiz items, and is gated behind `review`.
   ========================================================================= */

/* Tracks group the 25 courses. `colour` is a palette token, not a hex value,
   so re-branding stays a one-line change in css/app.css. */
const TRACKS = {
  core:       { name: 'Core Foundations',   blurb: 'The standards, the levels and the law that govern everything else.',            colour: 'var(--tr-core)' },
  equipment:  { name: 'Equipment & Agents',  blurb: 'Vehicles, foam, appliances and personal protective equipment.',                 colour: 'var(--tr-equip)' },
  operations: { name: 'Operations',          blurb: 'Responding to the aircraft, the fuel and the fire.',                             colour: 'var(--tr-ops)' },
  emergency:  { name: 'Emergency Response',  blurb: 'Command, casualty care, command decisions and the hard calls.',                   colour: 'var(--tr-emrg)' },
  leadership: { name: 'Readiness & Leadership', blurb: 'Planning, exercises, drills, coaching and staying ready as a service.',      colour: 'var(--tr-lead)' }
};

const CURRICULUM = [

/* ── 01 ─────────────────────────────────────────────────────────────── */
{
  id: 'arff-foundations',
  code: 'ART-01',
  title: 'ARFF Foundations & the Regulatory Framework',
  track: 'core',
  level: 'Foundation',
  minutes: 100,
  review: 'scaffold',
  standards: [
    'ICAO Annex 14 Vol I — Aerodromes, Chapter 9 (Rescue and Fire Fighting)',
    'ICAO Doc 9137 Part 1 — Airport Services Manual, Rescue and Fire Fighting',
    'ICAO Annex 1 — Personnel Licensing (where applicable)',
    'State Civil Aviation Authority requirements'
  ],
  summary:
    'What the rescue and fire fighting service actually is, who is accountable for it, ' +
    'and the exact chain of documents that tells you what you must do and by when.',
  outcomes: [
    'Describe the purpose and scope of the aerodrome rescue and fire fighting service.',
    'Navigate the structure of Annex 14 Chapter 9 and identify which parts are mandatory.',
    'Distinguish a standard, a State requirement and an operator SOP, and know which wins on conflict.',
    'Identify your own role within the service and the chain of command above it.',
    'Locate the correct reference document for any RFF question you are asked.'
  ],
  modules: [
    { id: 'art01-m1', title: 'What the service is for', minutes: 15 },
    { id: 'art01-m2', title: 'The document hierarchy', minutes: 20 },
    { id: 'art01-m3', title: 'Annex 14 Chapter 9, clause by clause', minutes: 20 },
    { id: 'art01-m4', title: 'Your role and accountability', minutes: 10 },
    { id: 'art01-m5', title: 'Finding the answer', minutes: 10 }
  ],
  assessment: {
    pass: 80,
    questions: [
      {
        q: 'Which document is the saleable, authoritative source for aerodrome rescue and fire fighting requirements?',
        options: ['ICAO Doc 9137', 'ICAO Annex 14 Volume I', 'NFPA 403', 'Your operator SOP'],
        answer: 1,
        why: 'Annex 14 Volume I is the normative standard. Doc 9137 is the guidance manual that explains it, and NFPA is a national body of practice, not an ICAO document. SOPs cannot reduce an Annex requirement.',
        sme: true
      },
      {
        q: 'Your operator SOP is less demanding than Annex 14 Chapter 9. What happens?',
        options: ['The SOP applies, it is more specific', 'The Annex applies, the SOP must be raised', 'Ask the firefighter to decide', 'Neither applies'],
        answer: 1,
        why: 'A standard outranks an SOP. An SOP may be more demanding but never less. Discovering the gap is a reportable safety finding, not a reason to comply quietly.',
        sme: true
      },
      {
        q: 'Roughly how many of the 25 courses in this platform rest on Annex 14 Vol I Chapter 9?',
        options: ['One', 'A handful', 'Most of them, directly or indirectly', 'None'],
        answer: 2,
        why: 'It is the spine of the service: it sets levels, agents, vehicles, response times and operational requirements that courses 02, 03, 06, 08, 18, 19 and 20 all build on.'
      }
    ]
  }
},

/* ── 02 ─────────────────────────────────────────────────────────────── */
{
  id: 'level-determination',
  code: 'ART-02',
  title: 'Determining the Required ARFF Level',
  track: 'core',
  level: 'Intermediate',
  minutes: 50,
  review: 'scaffold',
  standards: [
    'ICAO Annex 14 Vol I — Ch 9, level determination provisions',
    'ICAO Annex 16 Vol I — Aircraft Categories',
    'ICAO Doc 9137 Part 1 — level determination methodology'
  ],
  summary:
    'The arithmetic and judgement behind choosing the level of service an aerodrome ' +
    'needs. Get this wrong and every downstream number — water, foam, vehicles, ' +
    'response time — is wrong too.',
  outcomes: [
    'Classify an aircraft into its ICAO category from dimensions alone.',
    'Apply the category-to-level determination method step by step.',
    'Identify the factors that justify operating above the calculated level.',
    'Recognise when a level reduction is permitted and what must be in place first.',
    'Justify a recommended level to an auditor using the method, not opinion.'
  ],
  modules: [
    { id: 'art02-m1', title: 'Aircraft categories', minutes: 15 },
    { id: 'art02-m2', title: 'The determination method', minutes: 30 },
    { id: 'art02-m3', title: 'Factors justifying a higher level', minutes: 20 },
    { id: 'art02-m4', title: 'Reduction, conditions and documentation', minutes: 25 }
  ],
  assessment: {
    pass: 80,
    questions: [
      {
        q: 'What is the primary purpose of an aircraft category in RFF planning?',
        options: ['It sets your insurance premium', 'It scales the required level of service', 'It decides who dispatches you', 'It sets fuel prices'],
        answer: 1,
        why: 'Category is the input to the level determination. Almost every quantity that follows — agents, discharge rates, vehicle numbers — derives from the level, not directly from the category.',
        sme: true
      },
      {
        q: 'An aerodrome could operate a reduced level of service. Which of these is a condition of doing so?',
        options: [
          'The airport director personally approves it',
          'A documented assessment, published conditions and reduced response capability are all in place',
          'It is verbally agreed with ATC',
          'Firefighters vote for it'
        ],
        answer: 1,
        why: 'A reduction is a formal, documented, conditional decision with real penalties written into it. It is never informal.',
        sme: true
      }
    ]
  }
},

/* ── 03 ─────────────────────────────────────────────────────────────── */
{
  id: 'levels-agents-rates',
  code: 'ART-03',
  title: 'Levels 1–10: Agents, Vehicles & Discharge Rates',
  track: 'core',
  level: 'Intermediate',
  minutes: 75,
  review: 'scaffold',
  standards: [
    'ICAO Annex 14 Vol I — Ch 9, requirements per level',
    'ICAO Doc 9137 Part 1 — agent quantities and discharge rates'
  ],
  summary:
    'What each level actually obliges you to hold and deliver — the water, the foam, ' +
    'the complementary agents, the vehicles and the discharge performance required.',
  outcomes: [
    'State the required principal agent quantity for a given level.',
    'State the required discharge rate and duration for a given level.',
    'Identify the complementary agent requirements and when they matter more than foam.',
    'Calculate theoretical and actual agent consumption for a response.',
    'Recognise immediately when on-scene stocks will not sustain the required rate.'
  ],
  modules: [
    { id: 'art03-m1', title: 'The level tables, properly read', minutes: 25 },
    { id: 'art03-m2', title: 'Principal versus complementary agents', minutes: 20 },
    { id: 'art03-m3', title: 'Discharge rate, duration and the maths', minutes: 25 },
    { id: 'art03-m4', title: 'Consumption under real conditions', minutes: 20 }
  ],
  assessment: {
    pass: 85,
    questions: [
      {
        q: 'Why is the required discharge rate expressed as a rate per minute over a stated time, rather than as a tank size?',
        options: [
          'Because tanks are cheap',
          'Because it is the delivery performance that matters, not the quantity you happen to carry',
          'Because it simplifies the tables',
          'Because firefighters cannot estimate'
        ],
        answer: 1,
        why: 'Two services can both own 30 000 litres and behave completely differently on scene. The requirement is a rate sustained over time, which is what actually knocks a fuel fire down.',
        sme: true
      },
      {
        q: 'On a long response you are down to about one third of your principal agent. The correct action is to:',
        options: [
          'Continue at a reduced rate — foam is foam',
          'Hold the required rate while you can, and call for the resupply decision early rather than late',
          'Switch to the complementary agent only and finish',
          'Return to station and reload without telling command'
        ],
        answer: 1,
        why: 'Sustaining the required rate beats a degraded one, and the resupply conversation is a command decision made on information — so it happens early, not when the tank is empty.',
        sme: true
      }
    ]
  }
},

/* ── 04 ─────────────────────────────────────────────────────────────── */
{
  id: 'extinguishing-agents',
  code: 'ART-04',
  title: 'Extinguishing Agents: Foam, Water and Dry Chemical',
  track: 'equipment',
  level: 'Intermediate',
  minutes: 90,
  review: 'scaffold',
  standards: [
    'ICAO Annex 14 Vol I — Ch 9, agent requirements',
    'ICAO Doc 9137 Part 1 — selection of agents',
    'NFPA 403 — agent performance provisions',
    'Manufacturer technical data for the agent in your station'
  ],
  summary:
    'What each agent is good at, what it is useless against, how foam is applied, ' +
    'and why the agent in your tank is not interchangeable with the agent on the shelf.',
  outcomes: [
    'Describe how foam suppresses a fuel fire, in terms an instructor would accept.',
    'Match each agent to the fire classes it is and is not suitable for.',
    'Explain why compatibility between concentrate and delivery system is non-negotiable.',
    'Identify the environmental and operational drivers behind agent selection.',
    'Handle, test and mix foam concentrate correctly, including shelf life.'
  ],
  modules: [
    { id: 'art04-m1', title: 'How foam actually works', minutes: 20 },
    { id: 'art04-m2', title: 'The agent selection matrix', minutes: 25 },
    { id: 'art04-m3', title: 'Compatibility, proportioning and testing', minutes: 30 },
    { id: 'art04-m4', title: 'Storage, shelf life and rotation', minutes: 15 },
    { id: 'art04-m5', title: 'Environmental drivers in agent choice', minutes: 10 }
  ],
  assessment: {
    pass: 85,
    questions: [
      {
        q: 'Two foam concentrates from different manufacturers are both approved. Why can they still not be mixed?',
        options: [
          'Colours must match',
          'Compatibility between the concentrates and the delivery system must be confirmed by the manufacturer',
          'You must always use the older stock first',
          'Mixing voids the foam warranty only in hot climates'
        ],
        answer: 1,
        why: 'Approved-for-use is not the same as approved-together. A concentrate can be individually correct for the system and still be incompatible in the mix.',
        sme: true
      },
      {
        q: 'A small pan fire of burning aviation fuel, no aircraft. Dry chemical on its own is:',
        options: [
          'The ideal agent — fastest knockdown of all',
          'A suppression aid that knocks down but does not seal; it cannot sustain a blanketing effect',
          'Forbidden by the Annex',
          'Only usable at night'
        ],
        answer: 1,
        why: 'Dry powder gives fast flame knockdown and extinguishment of the flame, but it does not form the vapour-excluding blanket that prevents reignition. It complements; it does not replace foam for a sustained fuel fire.',
        sme: true
      }
    ]
  }
},

/* ── 05 ─────────────────────────────────────────────────────────────── */
{
  id: 'foam-systems',
  code: 'ART-05',
  title: 'Foam Systems, Chambers & Turbines',
  track: 'equipment',
  level: 'Advanced',
  minutes: 75,
  review: 'scaffold',
  standards: [
    'NFPA 412 — Standard for the Testing and Maintenance of Fixed and Mobile Fire Extinguishing Systems',
    'ICAO Doc 9137 Part 1 — foam application systems',
    'Manufacturer service documentation for your installed system'
  ],
  summary:
    'The hardware that turns concentrate into foam: mobile foam appliances, roof turbines, ' +
    'large-capacity systems, and the testing that keeps them trustworthy.',
  outcomes: [
    'Describe how a mobile foam appliance, turbine and large-capacity system each apply foam.',
    'Select the correct appliance and application technique for a given fire.',
    'Perform and interpret flow and pressure tests to prove the system is delivering.',
    'Diagnose common loss-of-performance faults.',
    'Maintain, test and record the system to the standard your jurisdiction requires.'
  ],
  modules: [
    { id: 'art05-m1', title: 'Appliances, turbines, large-capacity systems', minutes: 25 },
    { id: 'art05-m2', title: 'Application technique', minutes: 25 },
    { id: 'art05-m3', title: 'Flow and pressure testing', minutes: 30 },
    { id: 'art05-m4', title: 'Fault diagnosis', minutes: 25 }
  ],
  assessment: {
    pass: 85,
    questions: [
      {
        q: 'A vehicle-mounted foam monitor is achieving correct flow but the foam looks thin and watery on the target. The most likely cause is:',
        options: [
          'The concentrate has expired',
          'Wrong proportioning — the concentrate is not being inducted correctly',
          'The monitor nozzle is too new',
          'Water pressure is too low'
        ],
        answer: 1,
        why: 'Correct total flow with poor foam quality almost always means proportioning. The concentrate is being lost, not foamated.',
        sme: true
      }
    ]
  }
},

/* ── 06 ─────────────────────────────────────────────────────────────── */
{
  id: 'vehicles-appliances',
  code: 'ART-06',
  title: 'RFF Vehicles & Emergency Appliances',
  track: 'equipment',
  level: 'Intermediate',
  minutes: 95,
  review: 'scaffold',
  standards: [
    'ICAO Annex 14 Vol I — Ch 9, vehicle and appliance requirements',
    'NFPA 414 — Standard for Aircraft Rescue and Fire Fighting Vehicles',
    'NFPA 1901 — Road Vehicles'
  ],
  summary:
    'What each vehicle on your inventory must be able to do, what it may not be used for, ' +
    'and the pre-use checks that decide whether it rolls.',
  outcomes: [
    'Match vehicle types to their required capability.',
    'State what a vehicle is NOT permitted to be used for.',
    'Complete a disciplined pre-use check and know the stop criteria.',
    'Operate within vehicle limits — gradients, side slope, braked travel, water tank capacity.',
    'Maintain readiness through refilling, de-watering and turnaround discipline.'
  ],
  modules: [
    { id: 'art06-m1', title: 'Vehicle types and capability', minutes: 20 },
    { id: 'art06-m2', title: 'Permitted and prohibited uses', minutes: 15 },
    { id: 'art06-m3', title: 'Pre-use checks and stop criteria', minutes: 25 },
    { id: 'art06-m4', title: 'Operating limits', minutes: 15 },
    { id: 'art06-m5', title: 'Turnaround discipline', minutes: 10 }
  ],
  assessment: {
    pass: 80,
    questions: [
      {
        q: 'During a pre-use check you find the water tank level is below the operational minimum. You should:',
        options: [
          'Roll anyway if the response is short',
          'Top up before responding, and treat tank level as a hard readiness criterion',
          'Use the reserve tank and log it later',
          'Ask the driver to initialise it as normal'
        ],
        answer: 1,
        why: 'Response length is never guaranteed. Tank level is a readiness state, and readiness is decided before the alarm, not during it.',
        sme: true
      }
    ]
  }
},

/* ── 07 ─────────────────────────────────────────────────────────────── */
{
  id: 'ppe-scba',
  code: 'ART-07',
  title: 'PPE, SCBA & Crew Fitness',
  track: 'equipment',
  level: 'Foundation',
  minutes: 80,
  review: 'scaffold',
  standards: [
    'NFPA 600 — Personal Protective Equipment for Fire and Emergency Services',
    'NFPA 6001 — Selection and Maintenance of Self-Contained Breathing Apparatus',
    'NFPA 1561 — Emergency Services Personnel Occupational Health and Safety',
    'Manufacturer instructions for your specific SCBA'
  ],
  summary:
    'Your kit, its limits, its inspection regime, and the fitness to wear it — including ' +
    'knowing exactly when not to enter.',
  outcomes: [
    'Describe what your SCBA does and does not protect you from.',
    'Complete donning, doffing and buddy checks correctly and quickly.',
    'Maintain and inspect SCBA to the required frequency.',
    'Recognise the early warning signs of heat stress, fatigue and SCBA impairment.',
    'Apply the entry control, team and emergency-team discipline that keeps a team safe.'
  ],
  modules: [
    { id: 'art07-m1', title: 'What SCBA protects you from — and does not', minutes: 15 },
    { id: 'art07-m2', title: 'Donning, doffing and buddy checks', minutes: 20 },
    { id: 'art07-m3', title: 'Inspection, maintenance and records', minutes: 15 },
    { id: 'art07-m4', title: 'Heat stress, fatigue and impairment', minutes: 20 }
  ],
  assessment: {
    pass: 85,
    questions: [
      {
        q: 'A firefighter reports a headache and unusual anxiety during an interior entry. The correct interpretation is:',
        options: [
          'Mild stress, push on',
          'Possible early heat stress or contaminant exposure — treat as a medical event and act now',
          'Sign out of the SCBA and continue',
          'Drink water and reassess in ten minutes'
        ],
        answer: 1,
        why: 'Early heat-illness symptoms are non-specific and easily dismissed, which is exactly why they are dangerous. They get worse, not better, while the crew keeps working.',
        sme: true
      }
    ]
  }
},

/* ── 08 ─────────────────────────────────────────────────────────────── */
{
  id: 'personnel-training',
  code: 'ART-08',
  title: 'RFF Personnel Training & Competency',
  track: 'core',
  level: 'Foundation',
  minutes: 70,
  review: 'scaffold',
  standards: [
    'ICAO Annex 14 Vol I — Ch 9, personnel requirements',
    'ICAO Doc 9137 Part 1 — training and competency',
    'NFPA 405 — Standard for the Selection and Training of Aircraft Rescue and Fire Fighting Personnel',
    'Your State training standard'
  ],
  summary:
    'The training, recurrent training and competency framework the service owes its ' +
    'responders — and what you are entitled to expect from your employer.',
  outcomes: [
    'Describe the initial and recurrent training structure your service operates to.',
    'Describe how individual competency is assessed and recorded.',
    'Identify the recurrent training, drills and exercises that keep a responder current.',
    'Recognise currency expiry and act before it affects an operational role.',
    'State your own training obligations and where they are recorded.'
  ],
  modules: [
    { id: 'art08-m1', title: 'Initial training', minutes: 15 },
    { id: 'art08-m2', title: 'Recurrent training and currency', minutes: 15 },
    { id: 'art08-m3', title: 'Competency assessment and records', minutes: 15 },
    { id: 'art08-m4', title: 'Drills and live-fire currency', minutes: 15 }
  ],
  assessment: {
    pass: 80,
    questions: [
      {
        q: 'Your recurrent training date has lapsed. You are rostered to an operational role. The correct action is:',
        options: [
          'Respond and make it up afterwards',
          'Do not accept the operational role until currency is restored, and report the gap',
          'Respond but stay outside the cordon',
          'Ask a colleague to cover the paperwork'
        ],
        answer: 1,
        why: 'Lapsed currency is a competence gap, not an administrative one. Rostering around it is how a service ends up with a training deficit it did not know it had.',
        sme: true
      }
    ]
  }
},

/* ── 09 ─────────────────────────────────────────────────────────────── */
{
  id: 'emergency-command',
  code: 'ART-09',
  title: 'Emergency Command & On-Scene Command',
  track: 'emergency',
  level: 'Advanced',
  minutes: 75,
  review: 'scaffold',
  standards: [
    'ICAO Doc 9137 Part 1 — command and control',
    'ICAO Annex 14 Vol I — Ch 9 & Ch 11 (emergency planning, aerodrome rescue)',
    'Your aerodrome emergency plan'
  ],
  summary:
    'Who is in charge, how command transfers, how a unified command is formed with the ' +
    'airline, ATC and police, and how the plan is executed rather than admired.',
  outcomes: [
    'Establish and run a structured command arrangement on arrival.',
    'Transfer command explicitly and without ambiguity.',
    'Form and operate a unified command with other responding agencies.',
    'Run a structured size-up and transmit it clearly.',
    'Use the aerodrome emergency plan as an operational tool, not a document.',
    'Make the decision to stand down, and know who else must agree.'
  ],
  modules: [
    { id: 'art09-m1', title: 'Command structures and when each applies', minutes: 20 },
    { id: 'art09-m2', title: 'Size-up and the first transmission', minutes: 20 },
    { id: 'art09-m3', title: 'Unified command', minutes: 20 },
    { id: 'art09-m4', title: 'Working the emergency plan', minutes: 20 },
    { id: 'art09-m5', title: 'Stand-down decisions', minutes: 10 }
  ],
  assessment: {
    pass: 85,
    questions: [
      {
        q: 'Two agencies arrive within a minute of each other and both assume they are in charge. The correct resolution is:',
        options: [
          'The senior rank takes it',
          'The first on scene retains command and a unified command is formed with an agreed Incident Commander',
          'Split the scene in half',
          'Hand over to ATC'
        ],
        answer: 1,
        why: 'Unified command exists precisely so that arrival order does not become a turf war. Authority follows function and agreement, not who was faster.',
        sme: true
      }
    ]
  }
},

/* ── 10 ─────────────────────────────────────────────────────────────── */
{
  id: 'rescue-extrication',
  code: 'ART-10',
  title: 'Aircraft Rescue, Access & Extrication',
  track: 'operations',
  level: 'Advanced',
  minutes: 90,
  review: 'scaffold',
  standards: [
    'ICAO Doc 9137 Part 1 — rescue and extrication',
    'ICAO Annex 14 Vol I — Ch 9, rescue requirements',
    'Manufacturer aircraft rescue and fire fighting charts for your fleet mix'
  ],
  summary:
    'Getting to the occupants and getting them out — doors, panels, jettison, stabilisation ' +
    'and the extrication methods matched to the airframe in front of you.',
  outcomes: [
    'Locate exits, doors, hatches and jettison points on the airframe types you handle.',
    'Stabilise an aircraft before opening anything.',
    'Choose and execute an access method appropriate to the situation.',
    'Perform the priority actions in the correct order.',
    'Recognise and control the hazards that make rescue more dangerous than the fire.'
  ],
  modules: [
    { id: 'art10-m1', title: 'The rescue decision', minutes: 15 },
    { id: 'art10-m2', title: 'Airframe access points', minutes: 30 },
    { id: 'art10-m3', title: 'Stabilisation before access', minutes: 20 },
    { id: 'art10-m4', title: 'Extrication methods', minutes: 35 },
    { id: 'art10-m5', title: 'Rescue hazards', minutes: 20 }
  ],
  assessment: {
    pass: 85,
    questions: [
      {
        q: 'Rescue and fire suppression are competing for the same water and the same crew. The correct decision framework is to:',
        options: [
          'Always fight the fire first, always',
          'Always rescue first, always',
          'Decide by assessed life threat, aircraft condition and whether rescue can proceed safely alongside suppression',
          'Let the most senior firefighter decide without discussion'
        ],
        answer: 2,
        why: 'Neither order is correct in general. The decision rests on assessed survivability and on whether the rescue can be worked safely under the conditions — and it must be an explicit, communicated decision.',
        sme: true
      }
    ]
  }
},

/* ── 11 ─────────────────────────────────────────────────────────────── */
{
  id: 'aircraft-familiarisation',
  code: 'ART-11',
  title: 'Aircraft Familiarisation & Live Fire',
  track: 'operations',
  level: 'Intermediate',
  minutes: 80,
  review: 'scaffold',
  standards: [
    'ICAO Annex 16 Vol I — Aircraft categories',
    'Manufacturer rescue and fire fighting charts',
    'ICAO Doc 9137 Part 1'
  ],
  summary:
    'Knowing the aircraft you will actually meet — layouts, materials, fuel systems, ' +
    'where the hazards are and where they are not.',
  outcomes: [
    'Identify the airframe types operating at or from your aerodrome.',
    'Locate the primary and secondary fuel and hydraulic systems on a given type.',
    'Identify cabin materials and their behaviour under fire.',
    'Recognise the specific hazards of composite, lithium and pressurised aircraft.',
    'Use the manufacturer rescue and fire fighting chart correctly under pressure.'
  ],
  modules: [
    { id: 'art11-m1', title: 'Your fleet mix', minutes: 15 },
    { id: 'art11-m2', title: 'Systems, fuels and fluids', minutes: 25 },
    { id: 'art11-m3', title: 'Materials and cabin behaviour', minutes: 20 },
    { id: 'art11-m4', title: 'Composite, lithium and pressurisation hazards', minutes: 20 }
  ],
  assessment: {
    pass: 80,
    questions: [
      {
        q: 'The best source for aircraft-specific rescue access points during a live response is:',
        options: [
          'Your memory of a similar type',
          'The manufacturer rescue and fire fighting chart for that exact type',
          'A generic ARFF manual',
          'The cabin crew'
        ],
        answer: 1,
        why: 'Types that look similar differ at exactly the points that matter in a rescue. The chart is authoritative per type; everything else is a prior.',
        sme: true
      }
    ]
  }
},

/* ── 12 ─────────────────────────────────────────────────────────────── */
{
  id: 'fuel-handling',
  code: 'ART-12',
  title: 'Aviation Fuel, Refuelling & Spill Response',
  track: 'operations',
  level: 'Intermediate',
  minutes: 150,
  review: 'scaffold',
  standards: [
    'IATA Guidance Material for Aviation Fuel Operations (IGAMS)',
    'JIG standards — Joint Inspection Group',
    'NFPA 30 — Flammable and Combustible Liquids',
    'ICAO Doc 9137 — relevant Parts',
    'Your State fuel regulations and the airport fuel SOP'
  ],
  summary:
    'What you are standing next to every day: the fuel, the hazards it carries, safe ' +
    'working around refuelling, and how you handle a spill.',
  outcomes: [
    'Describe the properties of aviation fuel relevant to your safety decisions.',
    'Identify the ignition sources and the controls applied during refuelling.',
    'Apply the rules governing vehicles, equipment and radios near a refuelling operation.',
    'Respond to a fuel spill correctly, including containment, notification and disposal.',
    'Recognise a static-related hazard and describe the control that prevents it.'
  ],
  modules: [
    { id: 'art12-m1', title: 'Fuel properties and vapour behaviour', minutes: 20 },
    { id: 'art12-m2', title: 'Refuelling operations and controls', minutes: 25 },
    { id: 'art12-m3', title: 'Bonding, earthing and static', minutes: 20 },
    { id: 'art12-m4', title: 'Spill response', minutes: 20 }
  ],
  assessment: {
    pass: 85,
    questions: [
      {
        q: 'Static ignition during refuelling is prevented primarily by:',
        options: [
          'Wearing non-conductive boots',
          'Bonding and earthing the vehicle and equipment before the circuit is broken',
          'Refuelling slowly',
          'Switching off the radio exactly once at the start'
        ],
        answer: 1,
        why: 'Bonding equalises potential before fuel moves, so no spark can occur when the circuit is later broken. The other options reduce nothing.',
        sme: true
      }
    ]
  }
},

/* ── 13 ─────────────────────────────────────────────────────────────── */
{
  id: 'dangerous-goods',
  code: 'ART-13',
  title: 'Dangerous Goods & Hazardous Cargo',
  track: 'operations',
  level: 'Advanced',
  minutes: 105,
  review: 'scaffold',
  standards: [
    'IATA Dangerous Goods Regulations (DGR)',
    'ICAO Technical Instructions for the Safe Transport of Dangerous Goods by Air',
    'ICAO Doc 9137 Part 1 — dangerous goods response'
  ],
  summary:
    'Reading the declaration, recognising the hazard, and responding to a dangerous ' +
    'goods incident without making it worse.',
  outcomes: [
    'Locate and read a dangerous goods declaration on a load document.',
    'Identify the nine hazard classes and recognise the labels and markings.',
    'Describe the hazards of a loaded dangerous goods aircraft and how they change your response.',
    'Apply segregation, isolation and distance principles at a scene.',
    'State the notification requirements and the information you must have ready.'
  ],
  modules: [
    { id: 'art13-m1', title: 'The regulatory framework', minutes: 15 },
    { id: 'art13-m2', title: 'Classes, labels and markings', minutes: 25 },
    { id: 'art13-m3', title: 'Reading the load document', minutes: 20 },
    { id: 'art13-m4', title: 'Responding to a DG incident', minutes: 25 },
    { id: 'art13-m5', title: 'Aircraft carrying dangerous goods', minutes: 10 }
  ],
  assessment: {
    pass: 85,
    questions: [
      {
        q: 'The single most useful document at the scene of a suspected dangerous goods incident is:',
        options: [
          'The airport emergency plan',
          'The aircraft dangerous goods declaration and load document',
          'The aircraft maintenance manual',
          'The airline safety card'
        ],
        answer: 1,
        why: 'It tells you what is aboard, in what quantity and with what hazard — which determines isolation distance, approach direction and whether you can work the aircraft at all.',
        sme: true
      }
    ]
  }
},

/* ── 14 ─────────────────────────────────────────────────────────────── */
{
  id: 'lithium-batteries',
  code: 'ART-14',
  title: 'Lithium Battery Hazards & Response',
  track: 'operations',
  level: 'Advanced',
  minutes: 80,
  review: 'scaffold',
  standards: [
    'IATA Dangerous Goods Regulations — lithium battery provisions',
    'ICAO Technical Instructions',
    'ICAO Doc 9137 Part 1',
    'Your operator lithium battery response guidance'
  ],
  summary:
    'The hazard that behaves unlike everything else: thermal runaway, re-ignition days ' +
    'later, and water as an ally rather than an enemy.',
  outcomes: [
    'Describe the difference between a lithium battery fire and a conventional fire.',
    'Recognise thermal runaway warning signs.',
    'Apply the correct agent and cooling strategy for a lithium battery fire.',
    'Explain why re-ignition days later is possible and how you manage that risk.',
    'State the special handling, storage and isolation requirements.'
  ],
  modules: [
    { id: 'art14-m1', title: 'Cell chemistry and why it matters', minutes: 15 },
    { id: 'art14-m2', title: 'Thermal runaway and warning signs', minutes: 20 },
    { id: 'art14-m3', title: 'Agent selection and cooling', minutes: 15 },
    { id: 'art14-m4', title: 'Re-ignition and post-incident isolation', minutes: 10 }
  ],
  assessment: {
    pass: 85,
    questions: [
      {
        q: 'The most distinctive difference between a lithium battery fire and a hydrocarbon fuel fire is:',
        options: [
          'It is always smaller',
          'It is self-sustaining, produces its own oxygen and can re-ignite long after it appears out',
          'It cannot be extinguished',
          'It only occurs on cargo aircraft'
        ],
        answer: 1,
        why: 'Internal oxidiser makes it self-sustaining, and the cells can survive at a stable temperature and reignite hours or days later. That long tail drives the isolation and monitoring decisions.',
        sme: true
      }
    ]
  }
},

/* ── 15 ─────────────────────────────────────────────────────────────── */
{
  id: 'aircraft-engine-fires',
  code: 'ART-15',
  title: 'Aircraft Engine, APU & Fuel System Fires',
  track: 'operations',
  level: 'Advanced',
  minutes: 60,
  review: 'scaffold',
  standards: [
    'ICAO Doc 9137 Part 1 — engine and fuel system firefighting',
    'ICAO Annex 14 Vol I — Ch 9',
    'Manufacturer aircraft rescue and fire fighting charts'
  ],
  summary:
    'The fires you are most likely to meet — engine, APU, and fuel-fed fire — and how ' +
    'each is attacked differently.',
  outcomes: [
    'Identify the fuel, oil and hydraulic sources that drive engine and APU fires.',
    'Recognise the different behaviour of each fire type on scene.',
    'Apply the correct approach, agent and attack position for each.',
    'Understand the hazards of running engines during an approach.',
    'Coordinate effectively with the flight deck throughout.'
  ],
  modules: [
    { id: 'art15-m1', title: 'Engine fuel, oil and hydraulic systems', minutes: 25 },
    { id: 'art15-m2', title: 'APU fires', minutes: 15 },
    { id: 'art15-m3', title: 'Attack selection and positioning', minutes: 35 },
    { id: 'art15-m4', title: 'Running engines and flight deck coordination', minutes: 30 }
  ],
  assessment: {
    pass: 85,
    questions: [
      {
        q: 'The single most important source of information in any aircraft fire is:',
        options: ['The cockpit', 'The flight deck and its crew', 'Radar', 'The airport frequency monitor'],
        answer: 1,
        why: 'The crew knows what is on board, what is burning, what has been shut down and what is about to change. Every other source is secondary to them.',
        sme: true
      }
    ]
  }
},

/* ── 16 ─────────────────────────────────────────────────────────────── */
{
  id: 'firefighting-tactics',
  code: 'ART-16',
  title: 'Firefighting Tactics & Agent Application',
  track: 'operations',
  level: 'Advanced',
  minutes: 55,
  review: 'scaffold',
  standards: [
    'ICAO Doc 9137 Part 1 — firefighting tactics',
    'NFPA 403',
    'Your operator response manual'
  ],
  summary:
    'How to actually put it out: attack selection, positioning, technique, and the ' +
    'discipline of applying the right agent effectively.',
  outcomes: [
    'Select an attack appropriate to the fire and the conditions.',
    'Position apparatus and crews to deliver without endangering them.',
    'Apply foam and complementary agents correctly.',
    'Protect exposures and prevent escalation.',
    'Recognise when to withdraw and re-attack.',
    'Understand the tactical value of positioning upwind and the consequences of not doing so.'
  ],
  modules: [
    { id: 'art16-m1', title: 'Attack selection', minutes: 25 },
    { id: 'art16-m2', title: 'Positioning and approach', minutes: 25 },
    { id: 'art16-m3', title: 'Technique and agent application', minutes: 30 },
    { id: 'art16-m4', title: 'Exposure protection, withdrawal and re-attack', minutes: 30 }
  ],
  assessment: {
    pass: 85,
    questions: [
      {
        q: 'Wind direction has reversed since the initial attack and smoke is now blowing across the attack position. The correct action is to:',
        options: [
          'Continue — the crew is committed',
          'Reposition upwind or withdraw and re-attack from a protected position',
          'Increase the discharge rate to burn it through',
          'Wait for the wind to return'
        ],
        answer: 1,
        why: 'A changing wind invalidates the whole approach basis. Repositioning upwind restores visibility, escape route and thermal protection. Continuing is how a working attack becomes an emergency.',
        sme: true
      }
    ]
  }
},

/* ── 17 ─────────────────────────────────────────────────────────────── */
{
  id: 'rover-vehicles',
  code: 'ART-17',
  title: 'Rover, Spot Fire & Follow-up Vehicles',
  track: 'operations',
  level: 'Intermediate',
  minutes: 125,
  review: 'scaffold',
  standards: [
    'ICAO Annex 14 Vol I — Ch 9, vehicle requirements',
    'NFPA 414',
    'Your operator vehicle inventory'
  ],
  summary:
    'The vehicles that get to the aircraft first and clean up afterwards — their correct ' +
    'use, and why misusing them costs capability.',
  outcomes: [
    'Describe the role and capability of each response vehicle type.',
    'Apply the restrictions on rover and spot fire vehicle use.',
    'Deploy effectively for a landing aircraft without obstructing the response.',
    'Use follow-up vehicles to make an attack effective rather than merely completed.',
    'Recognise the over-commitment risk of sending every vehicle immediately.'
  ],
  modules: [
    { id: 'art17-m1', title: 'Vehicle roles and capability', minutes: 20 },
    { id: 'art17-m2', title: 'Restrictions on use', minutes: 20 },
    { id: 'art17-m3', title: 'Deployment for a landing aircraft', minutes: 15 },
    { id: 'art17-m4', title: 'Follow-up and making it stick', minutes: 15 }
  ],
  assessment: {
    pass: 80,
    questions: [
      {
        q: 'Every available vehicle is dispatched to the first alert on an aircraft with a reported landing emergency. The main risk is:',
        options: [
          'Fuel consumption',
          'Over-commitment, leaving nothing in reserve for a simultaneous second event',
          'Traffic congestion',
          'Exceeding the noise limit'
        ],
        answer: 1,
        why: 'Committing all resources to one unconfirmed event is the classic way a small incident becomes a catastrophe when a second one arrives.',
        sme: true
      }
    ]
  }
},

/* ── 18 ─────────────────────────────────────────────────────────────── */
{
  id: 'communications',
  code: 'ART-18',
  title: 'Communications, Alerting & Air Traffic Coordination',
  track: 'emergency',
  level: 'Intermediate',
  minutes: 50,
  review: 'scaffold',
  standards: [
    'ICAO Annex 14 Vol I — Ch 11 (aerodrome alerting system)',
    'ICAO Annex 11 — Air Traffic Services',
    'ICAO Annex 3 — Meteorological Service',
    'Your aerodrome emergency plan'
  ],
  summary:
    'Being told, and being able to tell: the alerting system, radio discipline, and ' +
    'coordinating with ATC and the flight deck when every second matters.',
  outcomes: [
    'Describe the aerodrome alerting system and how it is activated.',
    'Transmit information accurately under pressure using correct discipline.',
    'Coordinate with ATC and understand its operational constraints.',
    'Obtain and relay essential information from the flight deck.',
    'Use plain language that removes ambiguity rather than creating it.'
  ],
  modules: [
    { id: 'art18-m1', title: 'The aerodrome alerting system', minutes: 20 },
    { id: 'art18-m2', title: 'Radio discipline under pressure', minutes: 20 },
    { id: 'art18-m3', title: 'ATC coordination', minutes: 20 },
    { id: 'art18-m4', title: 'Flight deck information exchange', minutes: 15 }
  ],
  assessment: {
    pass: 80,
    questions: [
      {
        q: 'Under heavy noise you need the flight deck to confirm whether fuel was shut off. The most reliable method is:',
        options: [
          'Repeat the request louder',
          'Ask a closed question that can be answered with a single word, and confirm it back',
          'Send a text message',
          'Assume the standard call was received'
        ],
        answer: 1,
        why: 'Closed questions survive noise. An open question under stress produces a long, garbled, partial answer that you then have to parse.',
        sme: true
      }
    ]
  }
},

/* ── 19 ─────────────────────────────────────────────────────────────── */
{
  id: 'emergency-planning',
  code: 'ART-19',
  title: 'Aerodrome Emergency Planning & Full-Scale Exercise',
  track: 'leadership',
  level: 'Advanced',
  minutes: 110,
  review: 'scaffold',
  standards: [
    'ICAO Annex 14 Vol I — Ch 9, emergency planning provisions',
    'ICAO Doc 9137 Part 1',
    'ICAO Annex 19 — Safety Management',
    'Your aerodrome emergency plan'
  ],
  summary:
    'The plan, the people, the exercise, and the corrective actions — because a plan that ' +
    'has never been tested is a document, not a capability.',
  outcomes: [
    'Describe the structure of an aerodrome emergency plan and who owns it.',
    'Identify the agencies that must be represented and why.',
    'Plan, run and evaluate a full-scale exercise.',
    'Turn exercise findings into corrective actions that actually get closed.',
    'Use exercise and incident data to improve real readiness.'
  ],
  modules: [
    { id: 'art19-m1', title: 'Plan structure and ownership', minutes: 20 },
    { id: 'art19-m2', title: 'Agencies and mutual aid', minutes: 20 },
    { id: 'art19-m3', title: 'Designing a full-scale exercise', minutes: 25 },
    { id: 'art19-m4', title: 'Evaluation and corrective action', minutes: 25 },
    { id: 'art19-m5', title: 'From exercise to real readiness', minutes: 10 }
  ],
  assessment: {
    pass: 80,
    questions: [
      {
        q: 'A full-scale exercise finds a communications failure with the local fire service. The finding is only valuable if:',
        options: [
          'It is reported to the regulator',
          'A corrective action is assigned an owner and a date, and is tracked to closure',
          'It is minuted',
          'The exercise is repeated next year'
        ],
        answer: 1,
        why: 'An unclosed finding is a known defect that everyone has agreed to ignore. Closure with a named owner is what converts an exercise into improved capability.',
        sme: true
      }
    ]
  }
},

/* ── 20 ─────────────────────────────────────────────────────────────── */
{
  id: 'emergency-contingency',
  code: 'ART-20',
  title: 'Responding to the Unexpected: Contingency Decision Making',
  track: 'emergency',
  level: 'Advanced',
  minutes: 65,
  review: 'scaffold',
  standards: [
    'ICAO Annex 14 Vol I — Ch 9',
    'ICAO Doc 9137 Part 1',
    'NFPA 1500 — Emergency Services Health and Safety',
    'Your aerodrome emergency plan'
  ],
  summary:
    'The responses that are not in the plan: the second event, the off-airport crash, the ' +
    'fuel spill on the taxiway, the day you have less than you need.',
  outcomes: [
    'Recognise the situations your plan does not cover and respond rationally.',
    'Apply sound decision making under uncertainty and time pressure.',
    'Handle the off-airport response and its different demands.',
    'Manage resource shortfall and communicate it early.',
    'Apply crew resource management principles when the plan has failed.',
    'Protect your responders in a prolonged or multiple incident.'
  ],
  modules: [
    { id: 'art20-m1', title: 'When the plan does not fit', minutes: 20 },
    { id: 'art20-m2', title: 'Off-airport response', minutes: 25 },
    { id: 'art20-m3', title: 'Multiple and simultaneous incidents', minutes: 20 },
    { id: 'art20-m4', title: 'Decision making under pressure', minutes: 25 }
  ],
  assessment: {
    pass: 80,
    questions: [
      {
        q: 'You are committed to a full-scale response and a second, larger incident is reported. The correct priority is to:',
        options: [
          'Finish the first before acknowledging the second',
          'Communicate the second immediately so it can be resourced, even if you cannot move',
          'Split your crew informally',
          'Wait to be asked'
        ],
        answer: 1,
        why: 'The second agency needs to know early. Acknowledging and reporting costs nothing and buys the response time that decides the outcome.',
        sme: true
      }
    ]
  }
},

/* ── 21 ─────────────────────────────────────────────────────────────── */
{
  id: 'adverse-weather',
  code: 'ART-21',
  title: 'RFF Operations in Adverse Weather',
  track: 'operations',
  level: 'Intermediate',
  minutes: 165,
  review: 'scaffold',
  standards: [
    'ICAO Annex 14 Vol I — Ch 9, operational requirements',
    'ICAO Doc 9137 Part 1 — operational considerations',
    'ICAO Annex 3 — Meteorological Service'
  ],
  summary:
    'Heat, cold, rain, wind, dust and lightning — how weather changes your response, and ' +
    'the conditions under which operations must pause.',
  outcomes: [
    'Explain how each weather condition affects response and effectiveness.',
    'Apply the limitations and restrictions the standards place on response in adverse conditions.',
    'Recognise the signs of lightning risk and apply the correct precautions.',
    'Protect the service and its people in extreme heat or cold.',
    'Coordinate with meteorological and ATC information to support decisions.'
  ],
  modules: [
    { id: 'art21-m1', title: 'Heat and firefighting performance', minutes: 20 },
    { id: 'art21-m2', title: 'Wind, rain and visibility', minutes: 20 },
    { id: 'art21-m3', title: 'Lightning precautions', minutes: 20 },
    { id: 'art21-m4', title: 'Cold, ice and seasonal readiness', minutes: 15 }
  ],
  assessment: {
    pass: 80,
    questions: [
      {
        q: 'Lightning is detected within the prescribed proximity of the aerodrome. The correct action is:',
        options: [
          'Continue — responders can shelter in the vehicles',
          'Apply the required suspension or stand-down procedure and account for all personnel',
          'Resume as soon as the storm passes overhead',
          'Increase radio discipline'
        ],
        answer: 1,
        why: 'Vehicles are not a safe shelter from lightning for responders working outside. The procedure exists for a reason and includes accountability, not just suspension.',
        sme: true
      }
    ]
  }
},

/* ── 22 ─────────────────────────────────────────────────────────────── */
{
  id: 'wildfire-interface',
  code: 'ART-22',
  title: 'Wildfire Interface & Airfield Vegetation Fires',
  track: 'operations',
  level: 'Intermediate',
  minutes: 125,
  review: 'scaffold',
  standards: [
    'ICAO Annex 14 Vol I — Ch 9 & Ch 4 (obstacles, surfaces)',
    'ICAO Doc 9137 Part 1',
    'NFPA 403',
    'Your aerodrome vegetation management plan'
  ],
  summary:
    'Fires in and around the airfield: grass, scrub and bush, the aircraft and the ' +
    'aerodrome they threaten, and the awkward interface problems they create.',
  outcomes: [
    'Identify the vegetation fire risks specific to your aerodrome.',
    'Apply correct tactics to grass and bush fires affecting aviation assets.',
    'Protect aircraft and aerodrome infrastructure during a vegetation fire.',
    'Coordinate with land management and wildland fire services.',
    'Prevent the fire becoming an aircraft emergency through fuel management practice.'
  ],
  modules: [
    { id: 'art22-m1', title: 'Vegetation fire risk', minutes: 15 },
    { id: 'art22-m2', title: 'Tactics for grass and bush fires', minutes: 25 },
    { id: 'art22-m3', title: 'Protecting aircraft and infrastructure', minutes: 15 },
    { id: 'art22-m4', title: 'Interface coordination', minutes: 15 }
  ],
  assessment: {
    pass: 80,
    questions: [
      {
        q: 'A grass fire is approaching parked aircraft on a remote stand, driven by strong wind. The priority is to:',
        options: [
          'Attack the fire head directly with hand lines',
          'Protect the aircraft and the stand — remove or expose fuel, position to defend the exposure — while calling for wildland support',
          'Pull every vehicle back to the station',
          'Wait for the wind to drop'
        ],
        answer: 1,
        why: 'An advancing fire head in wind is not containable by an ARFF crew. Protecting the exposure and buying time for land fire support is the operationally sound choice.',
        sme: true
      }
    ]
  }
},

/* ── 23 ─────────────────────────────────────────────────────────────── */
{
  id: 'off-airport-response',
  code: 'ART-23',
  title: 'Off-Airport & Remote Stand Response',
  track: 'emergency',
  level: 'Intermediate',
  minutes: 95,
  review: 'scaffold',
  standards: [
    'ICAO Annex 14 Vol I — Ch 9',
    'ICAO Doc 9137 Part 1',
    'Your aerodrome emergency plan and mutual aid agreements'
  ],
  summary:
    'Beyond the boundary: access problems, no hydrants, no comms, unknown terrain, and ' +
    'the coordination that gets you there in time.',
  outcomes: [
    'Describe what makes an off-airport response materially harder.',
    'Plan access, water supply and communications for a remote scene.',
    'Coordinate effectively with land rescue, police and the airline.',
    'Apply mutual aid arrangements correctly and activate them early.',
    'Work safely and protect your responders when the scene is unstabilised.'
  ],
  modules: [
    { id: 'art23-m1', title: 'What changes off-airport', minutes: 20 },
    { id: 'art23-m2', title: 'Access and water supply', minutes: 20 },
    { id: 'art23-m3', title: 'Communications and mutual aid', minutes: 20 },
    { id: 'art23-m4', title: 'Working an unstabilised scene', minutes: 10 }
  ],
  assessment: {
    pass: 80,
    questions: [
      {
        q: 'The most common cause of a delayed off-airport RFF arrival is usually:',
        options: [
          'Crew reluctance',
          'Access — gates, roads and route planning not being resolved in advance',
          'Equipment failure',
          'Radio problems'
        ],
        answer: 1,
        why: 'Every minute of access delay is a minute added to the response time the level is calculated on. It is solved by planning and mutual aid, at the gate, before the aircraft lands.',
        sme: true
      }
    ]
  }
},

/* ── 24 ─────────────────────────────────────────────────────────────── */
{
  id: 'emergency-medical',
  code: 'ART-24',
  title: 'Emergency Medical Response & Casualty Care',
  track: 'emergency',
  level: 'Advanced',
  minutes: 160,
  review: 'scaffold',
  standards: [
    'ICAO Doc 9137 Part 1 — medical response',
    'NFPA 1157 — Healthcare Facilities',
    'Your aerodrome medical response plan',
    'Recognised civilian first aid / paramedic protocols'
  ],
  summary:
    'Caring for occupants and responders: first aid, triage, working a casualty in a ' +
    'wreckage, and the handover to medical services.',
  outcomes: [
    'Provide first aid appropriate to the injuries you will actually meet.',
    'Triage casualties when there are more than you can treat.',
    'Work safely around and under an aircraft during casualty care.',
    'Recognise and manage the immediate causes of death in fire.',
    'Handover effectively to medical services and document what happened.',
    'Provide psychological first aid to survivors and to each other.'
  ],
  modules: [
    { id: 'art24-m1', title: 'Immediate life threats', minutes: 25 },
    { id: 'art24-m2', title: 'Triage and treatment priorities', minutes: 20 },
    { id: 'art24-m3', title: 'Casualty care in a wreckage environment', minutes: 20 },
    { id: 'art24-m4', title: 'Handover, documentation and psychological first aid', minutes: 20 }
  ],
  assessment: {
    pass: 85,
    questions: [
      {
        q: 'Airway obstruction from smoke inhalation is present in a casualty you are treating. The first action is to:',
        options: [
          'Treat burns, they are more visible',
          'Establish and maintain the airway, and consider the effects of toxic smoke on the casualty',
          'Move them to a clean area first',
          'Give water to drink'
        ],
        answer: 1,
        why: 'The airway and breathing come before everything else, and smoke inhalation brings carbon monoxide and cyanide toxicity that changes the treatment entirely.',
        sme: true
      }
    ]
  }
},

/* ── 25 ─────────────────────────────────────────────────────────────── */
{
  id: 'water-supply',
  code: 'ART-25',
  title: 'Water Supply, Hydrants & Sustainability',
  track: 'equipment',
  level: 'Intermediate',
  minutes: 175,
  review: 'scaffold',
  standards: [
    'ICAO Annex 14 Vol I — Ch 9, water supply provisions',
    'ICAO Doc 9137 Part 1 — water supply & fire fighting water systems',
    'NFPA 24 — Private Fire Service mains and appurtenances'
  ],
  summary:
    'The water is the whole operation: hydrant layout, flow and pressure, sustainability ' +
    'for a long response, and what to do when the supply fails.',
  outcomes: [
    'Describe the water supply arrangements at your aerodrome.',
    'Test and operate hydrants correctly.',
    'Explain the concept of water sustainability for a sustained operation.',
    'Recognise and respond to water supply failure or inadequate pressure.',
    'Plan a response where no hydrant is available.',
    'Coordinate with the water authority and airport engineering.'
  ],
  modules: [
    { id: 'art25-m1', title: 'Water supply arrangements', minutes: 20 },
    { id: 'art25-m2', title: 'Hydrants, testing and operation', minutes: 20 },
    { id: 'art25-m3', title: 'Sustainability for sustained operations', minutes: 20 },
    { id: 'art25-m4', title: 'Supply failure and contingency', minutes: 20 }
  ],
  assessment: {
    pass: 80,
    questions: [
      {
        q: 'Pressure at the hydrant drops noticeably partway through a long attack. The correct first assumption to check is:',
        options: [
          'The foam is exhausted',
          'The water supply itself — mains pressure, a partly closed valve, or a vehicle on the same hydrant',
          'The nozzle is blocked',
          'The crew needs to rotate'
        ],
        answer: 1,
        why: 'Sustained attack depletes supply. A falling pressure is a supply event until proven otherwise, and it is the kind of problem that is fixable early and fatal if missed.',
        sme: true
      }
    ]
  }
}

];

/* ── Derived helpers ─────────────────────────────────────────────────── */

/** Courses grouped by track, in catalogue order. */
function coursesByTrack() {
  const out = {};
  for (const c of CURRICULUM) (out[c.track] ||= []).push(c);
  return out;
}

/** Look up one course by id, or undefined. */
function course(id) {
  return CURRICULUM.find((c) => c.id === id);
}

/** Total learnable minutes across the whole catalogue. */
const TOTAL_MINUTES = CURRICULUM.reduce((n, c) => n + c.minutes, 0);

/** Courses still awaiting an SME sign-off. */
const PENDING_REVIEW = CURRICULUM.filter((c) => c.review !== 'reviewed');
