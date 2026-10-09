/* ============================================================================
   SOUTH AFRICAN REGULATORY BASIS
   ============================================================================
   Added 2026-10-09 from the operator's library. Until this file existed the
   platform carried no South African instrument at all: every regulatory
   reference was either ICAO (Annex 14, Doc 9137) or a UAE GCAA CAR Part XI
   worked example. That gap is now closed for aerodromes and ARFF.

   WHAT IS HERE, AND WHERE EACH PIECE CAME FROM
   -------------------------------------------
   1. CAR Part 139, Subpart 2 — the binding regulation. Reproduced verbatim from
      the Civil Aviation Regulations, 2011 under the Civil Aviation Act, 2009
      (Act No. 13 of 2009), held at
      AM RISK 21 MANUALS /AM RISK DANGEROUS GOODS TRAINING/
      CIVIL_AVIATION_REGULATIONS PART 141 -2011.pdf
      That filename is misleading: the file is the whole 2011 CARs book, 51
      parts, not Part 141. Part 141 is aviation training organisations.

   2. SA-CATS 139 — the technical standard CAR 139 delegates to. Reproduced from
      FAA : CAA/SACAA/Schedule 3 SA-CATS 139 Aerodromes and Heliports (4).pdf.
      HONESTY NOTE: that file is a Notice of Proposed Amendment dated November
      2015, not the consolidated in-force standard. Its own motivation states
      the amendments "will not introduce any differences with the ICAO SARPS",
      and the figures it reproduces match Annex 14 Table 9-2 performance level
      A exactly — verified value by value, because the PDF's column headers
      interleave across the page and cannot be trusted on their own. Treat the
      numeric content as corroborated by two independent sources and the
      regulatory status as one the operator should confirm with SACAA.

   3. AIP South Africa AD — published RFF data per aerodrome, from
      SACAA/Aerodromes.PDF. This is in-force published information, not a
      proposal, and it is the strongest corroboration available because it shows
      what South African aerodromes actually publish and are held to.

   THE ARCHITECTURE, WHICH MATTERS FOR EVERY LESSON
   ----------------------------------------------
   CAR Part 139 is the legal shell: it creates the obligation, gives the Director
   the powers, and prescribes the licensing. It does not contain the numbers.
   Almost every substantive ARFF requirement in Part 139 reads "as prescribed in
   Document SA-CATS 139". So the binding chain is:

       CAR 139.02.7  ->  SA-CATS 139  ->  (Annex 14, adopted)

   That is why the category and quantity figures already taught in ART-02 and
   ART-03 were never wrong. South Africa adopts the ICAO numbers. This file
   makes that adoption explicit rather than leaving the learner to assume it.

   LICENSING INSTRUCTION: reference and short quotation only. Neither the CARs
   nor CATS is reproduced wholesale here, and the operator should obtain the
   current consolidated versions from SACAA before relying on any of it.
   ========================================================================= */

'use strict';

/* ------------------------------------------------------------------ sources */

const SA_SOURCES = [
  {
    id: 'car2011',
    label: 'Civil Aviation Regulations, 2011',
    full: 'Made under section 155(1) of the Civil Aviation Act, 2009 (Act No. 13 of 2009). Part 139 Aerodromes and heliports, Subpart 2 Licensing and operation of aerodromes.',
    path: 'AM RISK 21 MANUALS /AM RISK DANGEROUS GOODS TRAINING/CIVIL_AVIATION_REGULATIONS PART 141 -2011.pdf',
    status: 'in force',
    note: 'The filename says Part 141; the document is the complete 2011 CARs, 51 parts. Part 141 is aviation training organisations.'
  },
  {
    id: 'cats139',
    label: 'SA-CATS 139 Aerodromes and Heliports',
    full: 'SACAA technical standard. The document held is a Notice of Proposed Amendment dated November 2015, not the consolidated in-force standard.',
    path: 'FAA : CAA/SACAA/Schedule 3 SA-CATS 139 Aerodromes and Heliports (4).pdf',
    status: 'proposal — verify',
    note: 'Its motivation states the amendments introduce no difference from the ICAO SARPS. Figures verified against Annex 14 Table 9-2 performance level A.'
  },
  {
    id: 'aipsa',
    label: 'AIP South Africa AD — Aerodromes',
    full: 'Civil Aviation Authority. AD 2.6 Rescue and fire fighting services, per aerodrome. Held at SACAA/Aerodromes.PDF, AMDT 4/17.',
    path: 'SACAA/Aerodromes.PDF',
    status: 'in force',
    note: 'AD 1.2 itself is a stub pointing to the ATS unit; the substance is in each aerodrome AD 2.6 entry.'
  }
];

/* ------------------------------------------------- CAR 139.02.7, verbatim */
/* Quoted exactly from the 2011 CARs. Do not paraphrase inside these strings —
   they are the law, and a learner may be assessed against them. */

const CAR139_ARFF = [
  {
    ref: '139.02.7 (1)',
    head: 'The obligation',
    body: 'The applicant shall ensure that the aerodrome is provided with a rescue and fire fighting service, capable to provide the required level of protection necessary for maintaining the minimum level of protection required for the appropriate category of aerodrome.'
  },
  {
    ref: '139.02.7 (2)',
    head: 'Where the numbers live',
    body: 'The classification matrix of aerodrome licence categories, aircraft categories for fire fighting, aircraft overall length categories and aircraft maximum fuselage width categories shall be as prescribed in Document SA-CATS 139.',
    note: 'This single sentence is why the whole numeric content of this platform is SA-CATS content. The regulation creates the duty and delegates the figures.'
  },
  {
    ref: '139.02.7 (3)',
    head: 'Categories 1 to 4 — the licensing principles',
    body: 'An applicant for the issuing of an aerodrome licence, in the Categories 1 to 4, shall determine the appropriate aircraft category for fire fighting in accordance with the following principles as well as the principles prescribed in Document SA-CATS 139:',
    subs: [
      ['(a)', 'Aerodromes up to aircraft category 4 for firefighting may be licensed one category lower, where aircraft with less than 30 passenger seats operate into such aerodrome and where the number of aircraft movements is less than 30 per week.'],
      ['(b)', 'Other than when the principle in paragraph (a) above applies, the aircraft category for firefighting must be equivalent to the category of the aerodrome licence.'],
      ['(c)', 'Where aircraft with 30 or more passenger seats operate into an aerodrome, the aircraft category for firefighting must be provided at a minimum of category 4 level: Provided that aircraft classified one category higher in terms of the classification matrix may operate into such aerodrome using the principles identified in paragraph 1 of technical standard 139.02.7.'],
      ['(d)', 'The Director may, upon application in writing by an operator of an aerodrome, exempt such operator from the requirement of paragraph (b), in the case of aircraft which may be classified in two or more categories above the aerodrome licence category 2 or 4, respectively,'],
      ['(e)', 'In accordance with the risk assessment described in paragraph (2)(a) of technical standard 139.02.7, the operator of an aerodrome shall establish an aerodrome emergency management system (AEMS) for mitigating risk and included the particulars of such emergency management system in the operations manual referred to in regulation 139.02.3.']
    ]
  },
  {
    ref: '139.02.7 (4) to (11)',
    head: 'Infrastructure the service depends on',
    body: 'These are the provisions that fail quietly. A service with the right vehicles, the right media and the right crew still fails if the road, the gate or the clearance is wrong.',
    subs: [
      ['(4)', 'A discreet communication system shall be provided, linking a fire station with the control tower, or, where applicable, with any other fire station on the aerodrome, and the rescue and fire fighting vehicles.'],
      ['(5)', 'An alerting system for rescue and fire fighting personnel shall be provided at the fire station, or at any remote fire station on the aerodrome and at the aerodrome control tower.'],
      ['(6)', 'Emergency access roads shall be provided on an aerodrome where the minimum response times as prescribed in Document SA-CATS 139 cannot be achieved and where the terrain conditions permit their construction.'],
      ['(7)', 'Where the airport is fenced, access to the outside areas shall be facilitated by the provision of emergency gates, which shall be marked to indicate their purpose and the prohibition of vehicle parking and obstructions in their immediate vicinity control of these gates shall be under the direct control of the fire fighting services.'],
      ['(8)', 'Emergency access roads shall be capable of supporting the heaviest emergency vehicles and shall be accessible in all weather conditions.'],
      ['(9)', 'The roads within 90 m of a runway shall be surfaced to prevent surface erosion and transfer of debris to the runway.'],
      ['(10)', 'Sufficient vertical clearance shall be provided from overhead obstructions for the largest vehicles.'],
      ['(11)', 'When the surface of the road is indistinguishable from the surrounding area, or in areas where snow may obscure the location of the road edge, markers shall be placed at intervals of about 10 m.']
    ]
  },
  {
    ref: '139.02.8',
    head: 'Training facility',
    body: 'The holder of an aerodrome licence operating on a category 6 level or higher shall establish a training facility simulating an aircraft structure that makes provision for effective training standards as prescribed in Document SA-CATS 139.',
    note: 'Sub-regulation (2) and (3) extend the requirement down: category 3 where flying schools have been established, categories 4 and 5, and below category 4 shall establish a fire fighting training facility.'
  },
  {
    ref: '139.02.9',
    head: 'Personnel training standards',
    body: 'The holder of an aerodrome licence shall establish an aerodrome rescue and fire fighting services personnel training standards as prescribed in Document SA-CATS 139.'
  },
  {
    ref: '139.02.10',
    head: 'Deviations',
    body: 'The holder of an aerodrome licence shall provide on the aerodrome the rescue and fire fighting capability which complies with the minimum requirements prescribed in regulation 139.02.7.',
    subs: [
      ['(3)', 'The holder of the licence may deviate from any requirement prescribed in this subpart to the extent required to attend to an emergency arising from any aviation accident or incident which occurs on, or within a radius of 10 kilometres from, the aerodrome.'],
      ['(4)', 'A deviation in terms of sub-regulation (3) shall only be permitted — (a) for the period during which the emergency exists; and (b) for the sole purpose of protecting life or property.'],
      ['(5)', 'The holder of the licence shall ensure that the remainder of the rescue and fire fighting personnel and equipment will be able to attend to any possible aviation accident or incident which may occur as a result of the emergency referred to in sub-regulation (3) until assistance is obtained from other participants in the aerodrome emergency management system.'],
      ['(6)', '(a) If an aerodrome operator has to deviate from the required standard, the Air Traffic Control shall be informed of the deviation and indicate to what category the remainder of the service can be provided; and (b) Until the required service commensurate with the aerodrome licence is re-instated, the Air traffic Controller must convey this information to all arriving and departing aircraft, the PIC must clearly indicate that they accept the lower category of fire fighting service prior to commencement of a flight, or before landing.'],
      ['(7)', 'The holder of the licence who deviates in terms of sub-regulation (3) from any requirement prescribed in this subpart, shall — (a) notify the Director immediately of the nature of the emergency and the extent of the deviation; and (b) submit a comprehensive report to the Director within 14 days from the date on which the emergency arose.']
    ],
    note: 'A deviation is not a soft option and it is not a judgement call at the scene. It is time-limited, bounded by a 10 km radius, available only to protect life or property, and it carries an immediate notification duty and a written report within 14 days.'
  },
  {
    ref: '139.02.11',
    head: 'Aerodrome environment management programme',
    body: 'Where any foreign object debris (FOD), oil and fuel spillages, bird and wildlife presents or are likely to present a hazard to aircraft operating to or from the aerodrome, establish an aerodrome environment management programme to minimise the effects of such hazard or potential hazard, taking due cognisance of the provisions of the Environment Conservation Act, 1989.',
    note: 'Sub-regulation (2) requires environmental management meetings at intervals not exceeding three months, covering the aerodrome and its immediate vicinity out to a radius of 10 kilometres, with minutes kept and mitigating measures recorded for audit purposes.'
  }
];

/* ------------------------------------------- SA-CATS 139 technical standard */

/* Classification matrix. SA-CATS 139.02.7(1). Reconstructed from a two-column
   PDF whose headers interleave across the page, so the bands below were matched
   by value against Annex 14 Table 9-2 rather than read off the column labels.
   They agree exactly. */
const CATS139_MATRIX = {
  head: ['Cat', 'Max fuselage width', 'Aircraft overall length', 'Licence category for fire fighting'],
  rows: [
    ['1', '2 m', 'less than 9 m', '1'],
    ['2', '2 m', 'at least 9 m but less than 12 m', '2'],
    ['3', '3 m', 'at least 12 m but less than 18 m', '3'],
    ['4', '4 m', 'at least 18 m but less than 24 m', '4'],
    ['5', '4 m', 'at least 24 m but less than 28 m', '5'],
    ['6', '5 m', 'at least 28 m but less than 39 m', '6'],
    ['7', '5 m', 'at least 39 m but less than 49 m', '7'],
    ['8', '7 m', 'at least 49 m but less than 61 m', '8'],
    ['9', '7 m', 'at least 61 m but less than 76 m', '9'],
    ['10', '8 m', 'at least 76 m but less than 90 m', '10']
  ],
  note: 'SA-CATS 139 reproduces the ICAO matrix. Annex 14 Table 9-2 also states that where operations by aeroplanes larger than the average size in a given category are planned, the quantities of water shall be recalculated and the amount of water for foam production and the discharge rates for foam solution increased accordingly.'
};

/* Minimum usable amounts of extinguishing agent. SA-CATS 139 reproduces these as
   four numeric columns; they are identical to Annex 14 Table 9-2 at
   performance level A. Verified value by value. */
const CATS139_AGENTS = {
  head: ['Cat', 'Foam solution (L)', 'Complementary agents (kg)', 'Min vehicles', 'Total discharge (L/min)'],
  rows: [
    ['1', '230', '45', '1', '230'],
    ['2', '670', '90', '1', '550'],
    ['3', '1 200', '135', '1', '900'],
    ['4', '2 400', '135', '1', '1 800'],
    ['5', '5 400', '180', '1', '3 000'],
    ['6', '7 900', '225', '2', '4 000'],
    ['7', '12 100', '225', '2', '5 300'],
    ['8', '18 200', '450', '3', '7 200'],
    ['9', '24 300', '450', '3', '9 000'],
    ['10', '32 300', '450', '3', '11 200']
  ],
  note: 'Annex 14 Table 9-2 carries three performance levels. SA-CATS 139 reproduces the level A column set. Level A is the highest: 350 L water at category 1 rising to 48 200 L at category 10, with foam solution discharge rates of 350 to 16 600 L/min.'
};

/* SA-CATS 139.02.9 personnel training standards, as proposed. */
const CATS139_TRAINING = [
  ['Certificate floor', 'All fire fighting personnel deployed at an aerodrome must be in possession of at least a Level One fire-fighter certificate obtained from the CAA accredited institution, and be given on the job training in accordance with a program to ensure that core competencies applicable to the functional levels are obtained and maintained.'],
  ['Re-training interval', 'Re-training intervals not exceeding 90 days must be maintained. Certification with regard to all training obtained must be maintained and be available for inspection purposes.'],
  ['Officers', 'All persons in an officer’s position must be in position of at least a Fire Fighter 2 or 3 approved certificate.'],
  ['Category 3 and lower', 'For aerodromes category 3 and lower, training standards of at least a fire fighter 1 category at a CAA approved aviation training institute is required; the basis for this level of training shall be derived from ICAO Doc 9137 – AN/898 Part 1 and ICAO Doc 7192 – AN/857 Part E2.'],
  ['First aid', 'SA-CATS 139.02.8, training facilities for category 6 or above: first aid to at least level 2.'],
  ['Continuous assessment', '139.02.10: the holder of an aerodrome licence must continuously assess operations at the aerodrome in relation to the rescue and fire-fighting capability, and during anticipated periods of reduced or increased activity, the level of protection must be no less than needed for the highest category of aircraft planned to use the aerodrome during that time, irrespective of the number of movements.'],
  ['Reduced operations', '139.02.10: the holder of the licence may, during any period of operations limited to aircraft with a specification lower than that which is normally applicable under CAR 139.02.7, reduce the rescue and fire fighting capability to the appropriate level required for the aerodrome category referred to in TS CATS 139.02.7, corresponding with the level of operation.'],
  ['The 72-hour rule', '139.02.10: if the replacement of a vehicle or a piece of equipment is not immediately possible or available, the holder of the licence must — if the required response time cannot be met within 72 hours, limit operations on the aerodrome equal to the category level of protection it can provide with the remainder of vehicles and equipment as determined in accordance with TS CATS 139.02.7.']
];

/* AIP South Africa AD 2.6, published RFF data. In force, not a proposal. This is
   the corroboration that matters: it shows what South African aerodromes are
   actually held to and actually publish. */
const AIP_RFF = [
  ['FAOR', 'OR Tambo International', 'CAT 9. Can accommodate CAT 10 requirements. H24 daily with trained personnel. 4 shifts with minimum 14 personnel per shift on duty.', 'Standard rescue equipment carried on fire tenders.', 'IATA kit available.', 'Mutual aid agreements with local authorities.'],
  ['FACT', 'Cape Town International', 'CAT 9; 24HR daily with trained personnel. 4 shifts, 12 firefighters per shift.', '24 300 litres water, 3 000 litres total foam concentrate, 450 kg dry chemical powder. Total foam solution discharge rate 9 000 litres/minute. 200% extinguishing media stock maintained.', 'Limited equipment for light aircraft removal only.', 'ACFT operator obligation to remove disabled aircraft from the runway within an agreed time.'],
  ['FALE', 'King Shaka International', 'CAT 9 within AD hours of duty. 12 personnel per shift.', '4 major fire fighting vehicles, 2 power saws, 1 hydraulic jaws of life. 40 000 litres water, 5 000 litres concentrate foam, 20 000 LPM foam discharge, 2 000 kg dry chemical powder. 200% stock maintained.', 'Equipment will be sourced as per emergency plan.', 'ACFT operator to remove disabled aircraft from active runway within a maximum of 2 hours.'],
  ['FALA', 'Lanseria International', 'H24 CAT VII. 9 RFFS personnel per shift, 11 in the 0600-1500 and 1700-0500 windows.', '3 x Rosenbauer 8x8 RFF trucks: 12 000 L water, 720 L 3% AFFF, 500 kg DCP each. 2 x MAN 6x6: 8 000 L water, 480 L 3% AFFF, 150 kg DCP each. 1 x RIV. ALS ambulance rescue.', 'Per the emergency management response plan.', ''],
  ['FAKN', 'Kruger Mpumalanga International', 'CAT VIII, 0500-1700. Two shift system: 9 personnel per shift.', '3 x fire tenders: 23 000 litres water, 3 000 litre AFFF, 500 kg DCP, including jaws of life and breathing apparatus.', 'MOU in place to remove disabled aircraft.', 'MOU with local authorities including ambulance, fire, hospitals and government forces.'],
  ['FAUP', 'Upington International', 'Cat 5 during AD hours, 5 firefighters minimum. Can upgrade to Cat 8 as per exemption on Alternative Means of Compliance on 139.02.7.', 'Staff complement, vehicles and equipment as per requirement for Cat 8.', '', 'Change of aerodrome category implemented by NOTAM seven days prior to commencement of cargo operations.'],
  ['FAKM', 'Kimberley', 'Within AD hours: CAT 6.', '1 x supervisor and 9 x firefighters per shift. 2 x ARFFV and 1 x standby ARFFV with rapid intervention: 8 000 litres water, 1 000 litres foam concentrate and 500 kg DCP per vehicle. 200% extinguishing media maintained in stock.', 'Limited equipment for light aircraft only, off the airport.', 'Passenger-carrying aircraft operating outside hours of operations are not permitted without RFF and ATC coverage.'],
  ['FABL', 'Bram Fischer International', 'Aerodrome License CAT VII (7) within AD hours, 7 crew minimum.', '2 ARFFV, 20 000 litres water capacity and 2 200 litres of AFFF compound. 1 000 kg complementary DCP. 200% extinguishing media stock maintained at all times.', 'Recovery of light aircraft only, by maintenance crew.', 'Service available for emergencies and diversions only.'],
  ['FAEL', 'East London', 'Category VII during AD operational hours. Two shifts, 8 ARFF per shift.', 'Equipment in line with ICAO requirement for Category 7: hydraulic spreader/cutter, power saws and cutters, portable lighting. 2 macro RIV crash tenders, not less than 12 100 litres water and 2 000 litres foam compound. 500 kg DCP. 200% stock maintained.', 'Limited on airport; MOU with external service providers.', ''],
  ['FAPE', 'Port Elizabeth International', 'CAT 7, H24. Four shifts: 6 ARFF plus 1 officer per shift, 1 watchroom operator.', '2 power saws, 2 power breakers, jaws of life and breathing apparatus. 2 macro ARFFV with total water capacity of not less than 12 100 litres and 2 000 litres AFFF.', '', 'Duty 2000-0400 runs reduced staffing, approved by SACAA.'],
  ['FAUT', 'Mthatha', 'CAT IV, weekdays 0400-1600, Saturday 0400-0600 and 1300-1500, Sunday 1300-1600.', '1 power saw, 1 power breaker. 2 major fire fighting vehicles, not less than 12 100 litres water and 2 000 litres foam. 500 kg DCP. 200% stock maintained.', '', '24 personnel total: shift 1 x 11 ARFF, shift 2 x 12 ARFF, excluding the chief fireman.'],
  ['FATW', 'Tswalu', 'CAT 1.', 'Basic.', 'NIL.', 'ARFF hours of operation by prior arrangement only.'],
  ['FASZ', 'Skukuza', 'NIL INFO AVBL.', '10 firemen total, 6 per shift. MAN 2440 fire engine, 8 000 L water, 1 000 L foam, 225 kg DCP. Discharge capability 4 000 L foam solution per minute.', 'MOU drafted with Pala Steel for cranes and low-bed trucks.', '']
];

/* CAR Part 92 Conveyance of dangerous goods. Same 2011 CARs book. Part 92 is
   the dangerous goods Part — Part 141 is aviation training organisations, which
   is an easy and consequential mistake to make from a filename. These four
   provisions are the ones an RFF service actually touches. */
const CAR92_DG = [
  {
    ref: '92.00.22 (4)',
    head: 'Duty to tell the emergency services — this is the one that matters at a scene',
    body: 'In the event of an aircraft accident or a serious incident where dangerous goods carried as cargo may be involved, the operator of the aircraft carrying the dangerous goods as cargo must provide information, without delay, to emergency services responding to the accident or serious incident about the dangerous goods on board, as shown on the written information to the PIC.',
    note: 'Sub-regulation (5) carries the same duty for an aircraft incident, but on request. The accident and serious incident case is not on request — it is without delay. If you are reading this on an aerodrome, the thing to check is whether the written information to the PIC actually reaches the responding services, because the regulation puts the obligation on the operator, not on you.'
  },
  {
    ref: '92.00.29',
    head: 'Aerodrome operator powers over loading and unloading',
    body: 'If in the opinion of the aerodrome operator a possibility exists that persons on a licensed aerodrome may be endangered through the loading or unloading of dangerous goods, he or she may take any of the steps as contemplated in sub-regulations (2), (3) and (4) of this regulation.',
    subs: [
      ['(2)', 'If the operator of an aircraft has informed the aerodrome operator of the proposed loading or unloading and the aerodrome operator considers that persons of property on the licensed aerodrome will be endangered by the proposed loading or unloading, the aerodrome operator may — (a) permit such loading or unloading subject to such conditions as the aerodrome operator may deem necessary to impose with a view to safeguarding persons or property on the aerodrome, or (b) prohibit such loading or unloading.'],
      ['(3)', 'If dangerous goods have been loaded in or unloaded from an aircraft without the permission of the aerodrome operator, the aerodrome operator may direct that such dangerous cargo be unloaded from or reloaded in such aircraft, or give such other directions or impose such conditions as the aerodrome operator may deem necessary with a view to safeguarding persons or property on the aerodrome.'],
      ['(4)', 'The operator of an aircraft carrying dangerous goods on an aerodrome shall, if directed to do so by the aerodrome operator, move such aircraft to another place on the aerodrome and keep such aircraft in that place until the aerodrome operator grants permission for such aircraft to be moved.']
    ],
    note: 'The trigger is a possibility of endangerment, in the aerodrome operator\'s opinion. That is a lower bar than certainty, and it is the operator\'s call, not the handler\'s.'
  },
  {
    ref: '92.00.30 (1)',
    head: 'A named dangerous goods person',
    body: 'Each operator, ramp handling organisation, ground handling organisation and aerodrome manager shall designate a dangerous goods person who shall be responsible for the following matters involving dangerous goods: (a) Compliance with the regulations; (b) Quality control; (c) Reporting of accidents and incidents.',
    note: 'The aerodrome manager is in that list. Know the name.'
  },
  {
    ref: '92.00.16',
    head: 'Damaged or leaking consignments do not fly',
    body: 'No damaged or leaking package, overpack, freight container or unit load device shall be loaded in an aircraft.',
    note: 'Where damage or leakage is found after loading, the operator removes or arranges removal and ensures the remainder of the consignment is in a proper condition and that no other package has been contaminated. On unloading, the area where the consignment was stowed must be inspected for damage or contamination.'
  }
];

/* ------------------------------------------------------------------ render */

function stdTable(head, rows, cls) {
  let h = '<div class="std-scroll"><table class="std-table ' + (cls || '') + '"><thead><tr>';
  head.forEach(c => { h += '<th>' + c + '</th>'; });
  h += '</tr></thead><tbody>';
  rows.forEach(r => {
    h += '<tr>';
    r.forEach((c, i) => { h += '<td' + (i === 0 ? ' class="k"' : '') + '>' + c + '</td>'; });
    h += '</tr>';
  });
  return h + '</tbody></table></div>';
}

function stdReg(r) {
  let h = '<article class="std-reg"><h4><span class="std-ref">' + r.ref + '</span> ' + r.head + '</h4>';
  h += '<p class="std-quote">' + r.body + '</p>';
  if (r.note) h += '<p class="std-note">' + r.note + '</p>';
  if (r.subs) {
    h += '<ol class="std-subs">';
    r.subs.forEach(s => { h += '<li><span class="std-sub">' + s[0] + '</span> ' + s[1] + '</li>'; });
    h += '</ol>';
  }
  return h + '</article>';
}

function standardsSection() {
  let h = '';

  h += '<div class="view-head"><h2>South African regulatory basis</h2>';
  h += '<p class="view-sub">CAR Part 139, SA-CATS 139 and the published AIP data. This is the binding local layer; the ICAO material throughout the curriculum is what South Africa adopts.</p></div>';

  h += '<div class="std-callout"><b>Where the rules actually sit.</b> CAR Part 139 creates the duty and delegates the numbers to SA-CATS 139, which reproduces the ICAO standards. So the category and quantity figures taught in ART-02 and ART-03 are not merely international practice here &mdash; they are the locally binding figures, because South Africa adopts them. Verify the current consolidated CATS 139 with SACAA before relying on the technical standard; the copy in the library is a 2015 amendment proposal.</div>';

  h += '<h3 class="std-h3">Sources held</h3><ul class="std-srclist">';
  SA_SOURCES.forEach(s => {
    h += '<li><b>' + s.label + '</b> &mdash; ' + s.status +
         '<span class="std-path">' + s.path + '</span>' +
         '<span class="std-full">' + s.full + '</span>' +
         '<span class="std-full">' + s.note + '</span></li>';
  });
  h += '</ul>';

  h += '<h3 class="std-h3">CAR Part 139 &mdash; aerodrome rescue and fire fighting</h3>';
  h += '<p class="std-lede">Verbatim from the Civil Aviation Regulations, 2011. These are the provisions a learner can be assessed against, and the provisions an inspector will use.</p>';
  CAR139_ARFF.forEach(r => { h += stdReg(r); });

  h += '<h3 class="std-h3">SA-CATS 139 &mdash; classification matrix</h3>';
  h += stdTable(CATS139_MATRIX.head, CATS139_MATRIX.rows, 'std-matrix');
  h += '<p class="std-note">' + CATS139_MATRIX.note + '</p>';

  h += '<h3 class="std-h3">SA-CATS 139 &mdash; minimum usable amounts of extinguishing agent</h3>';
  h += stdTable(CATS139_AGENTS.head, CATS139_AGENTS.rows, 'std-agents');
  h += '<p class="std-note">' + CATS139_AGENTS.note + '</p>';

  h += '<h3 class="std-h3">SA-CATS 139 &mdash; personnel training and capability</h3><dl class="std-def">';
  CATS139_TRAINING.forEach(t => { h += '<dt>' + t[0] + '</dt><dd>' + t[1] + '</dd>'; });
  h += '</dl>';

  h += '<h3 class="std-h3">AIP South Africa &mdash; published RFF by aerodrome</h3>';
  h += '<p class="std-lede">In-force published data, not a proposal. This is the strongest corroboration available that the framework above is real: these are the figures South African aerodromes publish and are held to.</p>';
  h += stdTable(['ICAO', 'Aerodrome', 'Category and staffing', 'Vehicles and agents', 'Disabled aircraft removal', 'Notes'],
                AIP_RFF, 'std-aip');

  h += '<h3 class="std-h3">CAR Part 92 &mdash; conveyance of dangerous goods</h3>';
  h += '<p class="std-lede">Dangerous goods in the 2011 CARs are <strong>Part 92</strong>, not Part 141 &mdash; Part 141 is aviation training organisations, and the PDF is filed under a Part 141 name. The four provisions below are the ones an RFF service actually touches at an aerodrome.</p>';
  CAR92_DG.forEach(r => { h += stdReg(r); });

  return h;
}