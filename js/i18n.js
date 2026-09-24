/**
 * facilit8 i18n — language detection, switching, and translation.
 *
 * Translations are embedded here as JS constants mirrored from /locales/en.json
 * and /locales/de.json. The JSON files are the canonical source; keep them in
 * sync when adding or changing copy.
 *
 * Language priority (highest first):
 *   1. ?lang=en or ?lang=de URL parameter
 *   2. localStorage key 'f8_lang'
 *   3. Default: 'en'
 *
 * Browser language (navigator.language starting with 'de') triggers a suggestion
 * banner component rendered in React — it never auto-switches.
 *
 * Exposed on window.F8_I18N:
 *   lang        — active language code ('en' | 'de')
 *   t(key)      — dot-notation lookup, returns string or object
 *   setLang(l)  — switch language, persist to localStorage, reload page
 *   browserDe   — true if browser language appears German
 */
(function () {
  'use strict';

  /* ── Storage key ── */
  var LANG_KEY = 'f8_lang';

  /* ── Detect active language ── */
  function detectLang() {
    var url = new URLSearchParams(window.location.search).get('lang');
    if (url === 'en' || url === 'de') return url;
    var stored = localStorage.getItem(LANG_KEY);
    if (stored === 'en' || stored === 'de') return stored;
    return 'en';
  }

  var activeLang = detectLang();
  var browserDe = (navigator.language || '').toLowerCase().startsWith('de');

  /* ── Translations ── (mirrored from /locales/{en,de}.json) ── */
  var TRANSLATIONS = {

/* =========================================================
   ENGLISH
   ========================================================= */
en: {
  nav: { home:'Home', services:'Services', caseStudies:'Case Studies', playbooks:'Playbooks', about:'About', contact:'Contact', bookMeeting:'Start a conversation' },
  footer: { tagline:'Commercial Excellence — transformation that sticks.', servicesHeading:'Services', companyHeading:'Company', basedInHeading:'Based in', basedInValue:'Switzerland', workingInternationally:'Working internationally', languages:'English & Deutsch', copyright:'© 2026 facilit8 — David Howes', location:'Switzerland — DACH & International', cookiesPrivacy:'Cookies & Privacy', bookMeeting:'Book a meeting' , privacy:'Privacy'},
  deBanner: { text:'This page is also available in German.', switchButton:'Switch to German', dismiss:'×' },
  cookieBanner: { text:'We use cookies to power the meeting booking tool and, if you accept, to understand how visitors use this site.', managePreferences:'Manage preferences', essentialOnly:'Essential only', acceptAll:'Accept all', ariaLabel:'Cookie notice' },
  cookies: {
    hero: { eyebrow:'Cookies & Privacy', heading:'How this site uses cookies', sub:'We keep this simple: no advertising cookies, and no analytics or tracking unless you choose it. Use the toggles below to set your preferences at any time.' },
    whatAreCookiesEyebrow:'What are cookies?',
    whatAreCookiesBody:'Cookies are small text files stored in your browser. This site uses them only where needed for core functionality. The meeting booking calendar and contact form are powered by HubSpot and are used solely to respond to your inquiry — they are not shared or used for advertising.',
    alwaysOn:'Always on',
    tableHeaders: { cookieService:'Cookie / Service', purpose:'Purpose', provider:'Provider', duration:'Duration', policy:'Policy' },
    viewPolicy:'View policy',
    noActiveInCategory:'No cookies in this category are currently active. They will appear here if enabled in future.',
    savePreferences:'Save my preferences',
    preferencesSaved:'✓ Preferences saved',
    adminNote:'This site is operated by David Howes / facilit8, based in Switzerland. For any questions about data handling, contact',
    lastUpdated:'Last updated: August 2026.',
    categories: {
      essential: { name:'Essential', description:'Required for the site to work correctly. These cannot be disabled.' },
      functional: { name:'Functional', description:'Enables enhanced features. Without these, parts of the site (such as the meeting booking calendar and contact form) will not be available.' },
      analytics: { name:'Analytics & Marketing', description:'Helps understand how visitors use the site and, if enabled, supports HubSpot click and visit tracking.' }
    }
  },
  privacy: {
    "hero": {
      "eyebrow": "Privacy",
      "heading": "How facilit8 handles your data",
      "sub": "Short version: we collect only what you give us, we use it only for what you asked for, and we never sell or share it. The detail is below."
    },
    "whoEyebrow": "Who is responsible",
    "whoBody": "This site and the services behind it are operated by David Howes, trading as facilit8, based in Switzerland. facilit8 is the controller for the personal data described on this page. Swiss data protection law (FADP) applies, and the EU GDPR applies where you are in the EU or EEA. For anything to do with your data, write to",
    "whatEyebrow": "What we collect, and why",
    "whatIntro": "Everything below is data you actively give us. There are no purchased lists, no data brokers, and no profiling or automated decision-making.",
    "basisLabel": "Legal basis",
    "retentionLabel": "Kept for",
    "items": {
      /* impact-privacy:start */
      "impactInterpretation": {
        "title": "Impact Checklist: personal interpretation",
        "body": "If you tick the box and submit, your email address, optionally your name and organisation, your 8 trust scores, the order you chose, and your mode, industry and company size are sent to facilit8's HubSpot account, so David can write and send you a personal interpretation. Whether you also want occasional insights is a separate, unticked box and is recorded separately. Nothing is sent unless you tick the box and submit.",
        "basis": "steps taken at your request; for insights emails, your consent, which you can withdraw at any time.",
        "retention": "up to 24 months after your last interaction."
      },
      "impactBaseline": {
        "title": "Impact Checklist: Swiss Impact Baseline",
        "body": "If you tick the box and submit, an anonymous record is stored with Netlify: the date, language, mode, industry, company size band, your 8 trust scores and the order you chose. It contains no name, email address, organisation or initiative, and it cannot be linked back to you. It is used only for aggregated trend reporting, and any group is shown only when it has at least 5 responses.",
        "basis": "your consent. Because the record is anonymous, it cannot be found or deleted individually afterwards.",
        "retention": "for trend reporting over time."
      },
      "impactCounter": {
        "title": "Impact Checklist: usage totals",
        "body": "The checklist counts how often it is started and completed, and how often interpretations and Baseline contributions are requested, per mode and per month. Only the totals are stored: no cookies, identifiers or IP addresses. To prevent abuse, the site briefly holds a one-way hash of your IP address, which changes daily, for rate limiting.",
        "basis": "our legitimate interest in knowing whether the tool is useful and in protecting it from abuse.",
        "retention": "totals are kept for reporting; rate-limit hashes for no more than one day."
      },
      /* impact-privacy:end */
      "contactForm": {
        "title": "Contact form",
        "body": "Your name, email address and the message you write. Used only to reply to you and to keep a record of the conversation.",
        "basis": "steps taken at your request, and our legitimate interest in responding to enquiries.",
        "retention": "as long as the enquiry is active, then up to 24 months."
      },
      "meetings": {
        "title": "Meeting booking",
        "body": "Your name, email address and whatever you enter when booking a call through the HubSpot calendar. Used to schedule and prepare for the meeting.",
        "basis": "steps taken at your request.",
        "retention": "up to 24 months after the last contact."
      },
      "playbookRequest": {
        "title": "Playbook requests",
        "body": "Your email address and which playbook you asked for. Used to send you that playbook and to see which topics people are asking about.",
        "basis": "steps taken at your request.",
        "retention": "up to 24 months after your last interaction."
      },
      "updates": {
        "title": "Occasional updates by email",
        "body": "Your email address, used to send occasional playbooks and related updates. This happens only if you tick the consent box — it is never bundled into anything else. Every email carries an unsubscribe link, and unsubscribing takes effect immediately.",
        "basis": "your consent, which you can withdraw at any time.",
        "retention": "until you unsubscribe."
      },
      "analytics": {
        "title": "Site analytics",
        "body": "If — and only if — you accept analytics cookies, HubSpot records which pages you visit and which links you click. If you decline, nothing is recorded.",
        "basis": "your consent, managed on the Cookies & Privacy page.",
        "retention": "up to 13 months."
      }
    },
    "processorsEyebrow": "Who else processes your data",
    "processorsIntro": "facilit8 is a one-person business and uses a small number of established providers. Each is used only for the purpose named below, and none of them may use your data for their own purposes.",
    "processorHeaders": {
      "service": "Service",
      "handles": "What it handles",
      "where": "Where",
      "policy": "Policy"
    },
    "processors": {
      "hubspot": {
        "name": "HubSpot, Inc.",
        "handles": "Contact form, meeting bookings, playbook requests, email, CRM records and — with your consent — site analytics. Impact Checklist interpretation requests.",
        "where": "EU data centre (Frankfurt). The facilit8 HubSpot account is hosted in the EU region."
      },
      "netlify": {
        "name": "Netlify, Inc.",
        "handles": "Hosts and serves this website. Standard server logs, including IP address, for security and reliability. Anonymous Impact Checklist Baseline records, usage totals and short-lived rate-limit hashes (Netlify Blobs).",
        "where": "Global content delivery network."
      }
    },
    "transfersEyebrow": "Data outside Switzerland",
    "transfersBody": "Your data is processed in the EU and, for some providers, in the United States. Transfers rely on the adequacy decisions of the European Commission and the Swiss Federal Council where those apply, and on standard contractual clauses where they do not.",
    "rightsEyebrow": "Your rights",
    "rightsBody": "You can ask us at any time to:",
    "rightsList": [
      "See what personal data we hold about you",
      "Correct anything that is wrong",
      "Delete your data",
      "Restrict or object to how we use it",
      "Receive your data in a portable format",
      "Withdraw consent you have given, without affecting what was lawful before"
    ],
    "rightsClosing": "One email is enough — there is no form to fill in. We respond within 30 days. If you are not satisfied, you can complain to the Swiss Federal Data Protection and Information Commissioner (FDPIC) or, in the EU or EEA, to your national supervisory authority.",
    "securityEyebrow": "Security",
    "securityBody": "Data is held in the systems named above and protected by their access controls and encryption. No system is perfect: if a breach ever affects your data, we will tell you and the relevant authority as the law requires.",
    "cookiesLinkIntro": "For cookie-level detail and to change your preferences, see",
    "cookiesLinkCta": "Cookies & Privacy",
    "contactNote": "Questions about any of this? Write to",
    "lastUpdated": "Last updated: September 2026."
  },
  home: {
    hero: { eyebrow:'Commercial Transformation', headline1:'The technology is there.', headline2:'The results should be too.', sub:'The AI advantage window is open.', primaryCta:'Book a Meeting', secondaryCta:'About facilit8' },
    heroAsk: {
      eyebrow:'Commercial transformation',
      headline:'The AI advantage window is open. Most companies will miss it.',
      sub:"Across 50+ organisations I've watched the same gap open: teams that changed how they work with technology pulled ahead of teams that just bought it. The next 3–4 years decide who does that with AI. facilit8 gets you to the right side of that gap — hands-on, step by step, until the results are real.",
      iconAlt:'A route being travelled step by step from start to destination',
      iconCaption:'Step by step, until it sticks',
      cardsAriaLabel:'Choose the situation closest to yours',
      kicker:'Situation',
      card1Title:'We bought the platform. Nothing changed.',
      card1Body:"CRM, automation or AI is live, and the commercial numbers haven't moved.",
      card2Title:'The programme has stalled mid-flight.',
      card2Body:'Timelines are slipping, the sponsor is exposed, and confidence is draining.',
      card3Title:'Every function has an AI pilot, but few will lead to real results.',
      card3Body:'Marketing has one. So does service. So does ops. None of them are wired to a plan that moves the P&L.',
      answerEyebrow:"Where we'd start",
      answer1:'A short diagnostic on adoption, not on the platform. We find where the value is leaking between your people, process and data.',
      proof1:'Same starting point as our AI-adoption diagnostic — where value leaks between people, process and data.',
      answer2:'A first 30 days that stabilises the programme: what is true, what is at risk, and which decisions the sponsor has to take this month.',
      proof2:'The structure behind the CRM, engagement and ERP recovery framework in the Rescue the Rollout playbook.',
      answer3:"A structured session that turns AI from a buzzword into an owned plan — clear on where it creates value, and who's accountable for it.",
      proof3:'The same structured thinking behind StrategyLENS — our 20-minute tool for testing your strategic choices, including AI.',
      cta:'Start with a conversation'
    },
    founder: {
      photoAlt:'David Howes, founder of facilit8',
      body:"facilit8 means make it easier. I started it because I kept seeing the same pattern: change gets decided in the boardroom and gets lost on the way to the front line — not because people don't try, but because nobody stays close enough, for long enough, for the new way of working to take hold. So I work differently: hands-on, alongside your teams, coaching-led, one manageable step at a time, until it's just how you work. What comes out of that is Commercial Excellence — sales, marketing and service pulling in the same direction — and AI and digital projects that move the numbers you actually report on, not pilots that quietly disappear. You always work directly with me — and delivery scales through established partners when work needs a collaboration of skillsets.",
      credit:'David Howes — Founder, facilit8',
      aboutLink:'About facilit8',
      talkLink:'Talk to David'
    },
    whoWeHelp: {
      eyebrow:'Who we help',
      heading:'Who this is for.',
      startLabel:"Where I'd start",
      cta:'Book a meeting',
      door1Label:'Swiss/DACH mid-market CEO',
      door1Quote:"I know something has to change, and I don't have the bandwidth to run it myself.",
      door1Start:'A first conversation on where the gap actually is — no framework pitch, no proposal.',
      door2Label:'Post-merger integration sponsor',
      door2Quote:'We closed the deal. Now two sales teams have to become one — fast.',
      door2Start:'The first-30-days sequence: map what\'s different, agree one definition, stand up one shared number.',
      door2Link:'How this works →',
      door3Label:'PE operating partner',
      door3Quote:'The value-creation plan says commercial. I need to know it\'s real before the next board deck.',
      door3Start:'A structured read of the value-creation plan\'s commercial assumptions against what the business can actually deliver in the hold period.'
    },
    sectors: {
      eyebrow:'Where we work',
      heading:'Three sectors where the gap costs the most.',
      countSuffix:'engagements',
      s1Title:'Manufacturing & chemicals', s1Body:'Channel consolidation, customer portals, inside sales, decision intelligence.', s1Metric:'150+ distributors reduced to under 70', s1BodyEnd:', with 360° performance management behind it.',
      s2Title:'Healthcare & life sciences', s2Body:'Trial operations, patient adherence, pharmacy retail insight, revenue defence.', s2Metric:'Clinical trial setup time cut by 20%', s2BodyEnd:' using design thinking and LEAN.',
      s3Title:'Technology & industrial services', s3Body:'SMART product strategy, IoT go-to-market, service growth, field enablement.', s3Metric:'New commercial roles designed', s3BodyEnd:' so solutions sell across product silos.'
    },
    work: {
      eyebrow:'Selected work',
      heading:'Anonymised clients. Real numbers.',
      allLink:'All 50+ engagements',
      c1Industry:'Healthcare & life sciences', c1Title:'Cancer clinical trial setup optimisation', c1Body:'Design thinking and LEAN applied to trial activation, reducing setup and activation time by 20%.',
      c2Industry:'Manufacturing & chemicals', c2Title:'Distributor network consolidation', c2Body:'150+ distributors consolidated to under 70, with 360° performance management built in behind it.',
      c3Industry:'Manufacturing & chemicals', c3Title:'Customer portal for 350+ accounts', c3Body:'Agile delivery of an eCommerce self-service portal for a global pigments manufacturer, reducing cost to serve.',
      c4Industry:'Technology & industrial', c4Title:'Digital strategy — SMART products & factory', c4Body:'Playing to Win and design thinking used to define SMART products, processes and factory for a precision instruments firm.'
    },
    stats: [{ label:'Years of commercial transformation' },{ label:'Projects delivered' },{ label:'& international' }],
    problem: { eyebrow:'The problem', heading:'Most businesses have the tools. Few get the results.', body:"CRM, sales automation, revenue analytics, customer data platforms — the investment is real. So why aren't the results following? Because technology alone doesn't transform commercial performance. The gap between capability and outcomes comes down to how your people, processes, and systems actually work together. And that's where most programmes fall short." },
    whatWeDo: { eyebrow:'What we do', heading:'We close the gap between technology and commercial performance.', body1:'facilit8 works alongside your commercial teams — in your business, not above it — to turn technology investment into measurable results. From go-to-market design to sales and revenue operations, we bring senior expertise and practical delivery to every engagement.', body2:'We work with mid-market businesses, enterprise organisations, PE-backed companies, and scale-ups that are ready to make their commercial systems perform.' },
    howWeWork: { eyebrow:'How we work', heading:'Three things that make every engagement different.', card1Title:'Hands-on delivery', card1Body:"We don't hand over a deck and walk away. We work inside your organisation until the change is real and lasting.", card2Title:'Senior expertise', card2Body:'You work directly with me — and delivery scales through established partners when work needs a collaboration of skillsets.', card3Title:'Outcomes, not outputs', card3Body:'Every engagement is designed around measurable commercial results, not activity metrics or deliverables for their own sake.' },
    cta: { heading:'What support do you need, and why?', body:'That\'s the whole first conversation. No pitch, no proposal, no minimum engagement size — just an honest read on whether and how we can help.', cta:'Start with a conversation' }
  },
  services: {
    hero: { eyebrow:'Services', headline:'Commercial performance, transformed.', sub:'We work across four interconnected areas — because lasting commercial change rarely comes from pulling a single lever.' },
    intro:"Technology has changed how businesses grow, sell, and serve customers. But realising that potential requires more than implementation. It requires the right strategy, the right operating model, and people who can make change happen inside a real organisation. That's what facilit8 does — hands-on, working alongside your teams from diagnosis through to measurable results.",
    s1heading:'Commercial Excellence', s1body:"End-to-end transformation of your commercial engine. Growth stagnation rarely has a single cause. When revenue stalls, the problem is usually systemic — disconnected teams, misaligned incentives, unclear ownership, and processes that haven't kept pace with the business.", s1b1:'Commercial diagnostics and performance reviews', s1b2:'Operating model redesign for sales and marketing', s1b3:'Change programmes with embedded delivery support', s1b4:'Capability building and team enablement',
    s2heading:'Technology Enablement', s2body:'Making your technology investment actually pay off. Most businesses have invested heavily in commercial technology — CRM, sales engagement platforms, customer data tools, marketing automation. Few are extracting full value from them.', s2b1:'CRM optimisation and adoption programmes', s2b2:'Sales and marketing technology audits', s2b3:'Tool consolidation and stack redesign', s2b4:'Integration of data, workflow, and reporting',
    s3heading:'Go-to-Market Strategy', s3body:'A sharper, more deliberate path to market. Entering a new market, launching a new product, or rethinking how you compete requires more than a slide deck.', s3b1:'Market segmentation and customer targeting', s3b2:'Value proposition development and messaging', s3b3:'Channel and partnership strategy', s3b4:'Launch planning and commercial readiness',
    s4heading:'Revenue Operations', s4body:'Aligning your commercial systems for predictable growth. When sales, marketing, and customer success operate in silos — with different data, different processes, and different definitions of success — revenue becomes unpredictable and hard to scale.', s4b1:'RevOps diagnostic and maturity assessment', s4b2:'Pipeline and forecasting process design', s4b3:'CRM data governance and reporting architecture', s4b4:'Cross-functional alignment and operating rhythms',
    howWeEngage: { eyebrow:'How we engage', heading:'Projects and partnerships — we work the way that suits you.', card1Title:'Project delivery', card1Body:'A defined programme with clear scope, milestones, and deliverables.', card2Title:'Retained partnership', card2Body:'Ongoing senior commercial and strategic support, on call without the overhead of a full-time hire.' },
    cta: { heading:"Not sure which service fits your situation?", body:"Most engagements start with a conversation. Tell us where you are — we'll be direct about whether and how we can help.", cta:'Book a Conversation' }
  },
  about: {
    hero: { eyebrow:'About facilit8', headline:'Making change easier. For your customers, your employees — and for you.', sub:'facilit8 works alongside Swiss-headquartered companies to make transformation manageable — close enough to work with the people who matter, step by step, until the change sticks.' },
    problem: { eyebrow:'Why this is harder than it looks', lead:'Most companies today are managing more change with fewer people.', body:'A generation of ERP and SaaS projects taught organisations that change cuts across teams, systems, and ways of working. That part is understood. What hasn\'t changed is how hard it is to make change happen when your people are improving the engine whilst maintaining speed and direction — expected to deliver their day job and lead the transformation at the same time. Technology is supposed to make things easier, faster, better. For customers. For employees. But that promise gets lost somewhere between the go-live and the handover. And when the energy fades, the new way of working never quite takes hold.', highlight:'The gap between deciding to change and making change real — that\'s where facilit8 works.' },
    founder: { eyebrow:'Founder', heading:'Why I built facilit8', body1:'I\'ve spent my career in the room where change happens — not writing reports about it afterwards, but in it. Trained in implementation-focused consultancies: Capgemini, SAP, and Implement Consulting Group, where the focus was always companies of all sizes, often in states of acquisition, merger and inconsistent ways of working — but often without a transformation department to absorb it. Working as a commercial manager inside companies like Nestlé, Clariant, and Thomas Cook. What I noticed, consistently, is that the quality of what happens in a room changes everything. A well-run workshop doesn\'t just gather information. It generates energy. It surfaces the problems people were afraid to name. It turns a room of sceptics into a team that owns what comes next.', body2:'I\'m a trained executive coach and experienced facilitator — which means I know how to get the best out of a group and out of a one-to-one. That combination — deep implementation experience, coaching skills, and the ability to make complexity feel manageable — is what facilit8 is built on. Not empty promises. Someone who stays in it with you, step by step, until the change sticks. Based in Switzerland, I work directly with the people driving the change — which is how skills transfer and results last.', highlight:'"facilit8 means to make easier. Whether that is a more effective way to work together across functions, a 24/7 customer portal, or an AI solution to support faster pricing. Technology, process, ways of working — all change should make life better for your customers and your employees. That\'s what I make easier."', credit:'David Howes — Founder, facilit8' },
    beliefs: { eyebrow:'Three things I believe', b1title:'Technology should make things easier', b1body:'The whole point of a digital investment is to make life better — for your customers, your employees, your business. When it doesn\'t, something has gone wrong in how the change was designed or delivered. facilit8 works backwards from that outcome.', b2title:'Change lands through people, not projects', b2body:'Transformation doesn\'t fail in the planning phase. It fails at the handover — when people return to their day jobs and the new way of working never quite takes hold. Making adoption real is not a nice-to-have. It is the job.', b3title:'Step by step beats big bang', b3body:'Complex challenges don\'t need complex solutions. They need clear sequencing, the right conversations at the right moments, and someone who keeps asking: what\'s the next manageable step? Step by step isn\'t slow — it\'s how change actually sticks.' },
    cta: { heading:'If something on this page sounded familiar, that\'s where we start.', body:'Most people who reach out aren\'t sure exactly what they need. They just know something has to change — and that it\'s harder to do alone. A conversation costs nothing, and there\'s no minimum engagement size.', cta:'Talk to David' }
  },
  contact: {
    hero: { eyebrow:'Contact', headline:"Let's talk.", sub:"No pitch. No proposal. Just an honest conversation about where you are and what might be possible." },
    intro:"Whether you have a clear brief or a half-formed challenge, the best place to start is a conversation. Pick a time below, or send a message if you'd prefer to write first.",
    calendarBlocked:'The meeting calendar uses functional cookies, which you have not yet accepted.',
    formBlocked:'The contact form uses functional cookies, which you have not yet accepted.',
    manageCookies:'Manage cookie preferences',
    writeFirst: { eyebrow:'Prefer to write first?', heading:'Send a message.' },
    details: { eyebrow:'Details', founderLabel:'Founder', basedInLabel:'Based in', languagesLabel:'Languages', emailLabel:'Email', founderValue:'David Howes', basedInValue:'Switzerland', languagesValue:'English & Deutsch' }
  },
  projects: {
    hero: { eyebrow:'Projects', heading:'A track record across industries — and the work behind it.', sub:'A selection of engagements from over twenty years of commercial transformation. Hover any tile to see the project and what was delivered. Use the filters to narrow by industry or service area.' },
    filters: { industryLabel:'Industry', serviceLabel:'Service', allIndustries:'All industries', clearFilters:'Clear filters', ariaLabel:'Project filters', industryAriaLabel:'Filter by industry' },
    count: { of:'of', project:'project', projects:'projects' },
    tile: { projectLabel:'Project' },
    empty: { heading:'No projects match those filters.', body:'Try widening the industry or removing a service filter.', clearFilters:'Clear filters' },
    cta: { heading:'See a project that looks like your situation?', body:'Most engagements start with a conversation. Tell us where you are — we will be direct about whether and how we can help.', cta:'Book a Conversation' }
  },
  playbooks: {
    hero: { eyebrow:'Playbooks', heading:'Practical playbooks for commercial leaders.', sub:'Short, opinionated guides drawn from twenty years of commercial transformation. Each one is written for a specific role and a specific situation — the kind of work you can actually pick up and use on a Monday morning.' },
    intro: { availableNow:'available now', comingSoon:'coming soon', author:'Written by David Howes · facilit8' },
    comingSoonChip:'Coming soon',
    cta: { heading:'A conversation costs nothing.', body:"If one of these playbooks reflects a situation you're in — or close to one — book a time to talk it through with David.", cta:'Book a Conversation' }
  },
  playbookDetail: {
    notFound: { heading:'Playbook not found.', body:"The link you followed didn't match a playbook we publish.", backButton:'Back to playbooks' },
    comingSoon: { chip:'Coming soon', getNotified:"Get notified when it's published", notifyBlocked:'This form uses functional cookies, which you have not yet accepted.', backLink:'Back to all playbooks' },
    meta: { audience:'Audience', cadence:'Cadence', readTime:'Read time', format:'Format', horizon:'Horizon', markets:'Markets', scope:'Scope', series:'Series' },
    breadcrumb:'Playbooks',
    talkThrough: { heading:'Talk it through', body:"Most engagements start with a thirty-minute conversation. Tell us where you are and what you're trying to achieve — we'll be direct about whether and how we can help.", cta:'Book a Conversation' },
    requestAccessRail: { heading:'Request access', bodyCL:'This playbook is shared privately. Get in touch to receive your access code and talk through how the capability-lens framework applies to your open roles.', bodyPL:'This playbook is shared privately. Get in touch to receive your access code and talk through how the framework applies to your situation.', cta:'Contact facilit8' },
    writtenBy:'Written by David Howes — Founder, facilit8. Switzerland · DACH & international.',
    actions: { bookConversation:'Book a Conversation', openPlaybook:'Open Interactive Playbook', openPlaybookLocked:'Open Playbook 🔒', readExtract:'Read Extract of Playbook', requestAccess:'Request Access' },
    cioAgileCta: { heading:'IT delivery that the CFO talks about.', body:"A conversation costs nothing. We'll tell you straight whether this playbook fits — or whether something else will get you further.", cta:'Book a Conversation' },
    rescueRolloutCta: { heading:'Programmes are recovered by people, not plans.', body:"The turnaround actions in this playbook only work if the right people own them. A 30-minute conversation will tell you whether you have them in place — and what to do if you don't.", cta:'Book a Conversation' },
    capabilityLensCta: { heading:'An open commercial role? Run it through the lens.', body:'A 30-minute conversation with David can show you how the capability-lens framework applies to your next open role — and how to build a repeatable process around it.', cta:'Book a Conversation' },
    pilotLeadRailBody:'This playbook is shared privately. Get in touch to receive your access code and talk through how the framework applies to your situation.',
    pilotLeadCta: { heading:'Running a lead harmonisation pilot?', body:"A 30-minute conversation with David can tell you whether this framework fits your situation — or what to adapt for your markets.", cta:'Book a Conversation' },
    cmoFirefighterCta: { heading:'Have a different cash problem?', body:"A conversation costs nothing. We'll tell you straight whether this playbook fits — or whether something else will get you further.", cta:'Book a Conversation' }
  },
  /* impact:start */
  impact: {
    "meta": {
      "title": "Impact Checklist — facilit8",
      "description": "Eight dimensions of trust decide whether a transformation delivers impact. Score your confidence in each, see where trust is fragile, and decide where to start."
    },
    "back": "← Back to facilit8.org",
    "langLabel": "Language",
    "hero": {
      "eyebrow": "facilit8 Impact Checklist",
      "headline": "AI can diagnose your processes. Only people can build the trust needed to deliver impact.",
      "intro": "What AI cannot do is create the confidence that turns a plan into results. Transformations rarely fail for lack of insight. They fail when leaders stop trusting the direction, the plan or each other. All eight dimensions are essential: weakness in any one of them puts the impact your customers expect at risk. This checklist shows where trust is strong, where it is fragile, and where to act first."
    },
    "tabs": {
      "model": "The model",
      "assess": "Checklist",
      "results": "Your results",
      "team": "Team comparison"
    },
    "model": {
      "impact": "Impact",
      "impactBody": "Impact: results for the business and its customers. All eight dimensions are essential to deliver it. A weak one puts customer impact and expectations at risk.",
      "leadership": "Leadership",
      "leadershipOwner": "Owned by the sponsor and executive team",
      "capabilities": "Capabilities",
      "capabilitiesOwner": "Delivered by the organisation",
      "lensLabel": "Customer lens",
      "scaleNote": "Trust means confidence. Score each item from 0% (no trust) to 100% (full trust). Higher is always better, including for Risk: a high score means risks are understood and managed.",
      "learningLabel": "What we mean by learning",
      "learningDef": "Learning is the organisation's ability to keep building, applying and sharing new skills, including working with AI, as fast as the work changes.",
      "start": "Start the checklist"
    },
    "dims": {
      "direction": {
        "name": "Direction",
        "question": "Why?",
        "attributes": [
          "Clarity",
          "Alignment",
          "Commercial outcomes"
        ],
        "lens": "Innovating the customer experience and differentiating from competitors",
        "quick": "…everyone knows why we are doing this, where we are going, and how it will set us apart for our customers?",
        "statements": [
          "The ambition, and why it matters, is clear and written down.",
          "The leadership team tells the same story about where we are going.",
          "We have agreed the commercial and customer results this must deliver, such as revenue, margin, productivity or customer experience."
        ],
        "levels": [
          "No agreed ambition; people describe different goals",
          "Ambition agreed at the top but not yet understood across teams",
          "Everyone can explain the ambition, its commercial outcomes and what it means for customers"
        ],
        "coaching": [
          "If a customer asked what will be different for them in a year, what would each of us say?",
          "Which part of the direction do you feel most and least sure about?"
        ],
        "aiHelp": "Scenario modelling and synthesis of market and customer signals",
        "aiRisk": "A strategy that sounds like everyone else's, because it came from the same AI"
      },
      "risk": {
        "name": "Risk",
        "question": "What could stop us?",
        "attributes": [
          "Assumptions",
          "Consequences & barriers",
          "AI governance & ethics"
        ],
        "lens": "Risk to customers if we fail, or if AI gets it wrong",
        "quick": "…we understand what could stop us, including risks from AI and risks to our customers, and are managing them?",
        "statements": [
          "We know what needs to be true to deliver the direction, and we test it.",
          "We understand what happens to us and our customers if we fail, and what could prevent impact, and each barrier has an owner.",
          "We have clear rules for using AI responsibly, covering bias, transparency, data use and regulation such as the EU AI Act."
        ],
        "levels": [
          "Risks are discussed only when they happen",
          "Main risks are listed but rarely reviewed; no clear rules for AI use",
          "Assumptions are tested, risks have owners and are reviewed, and AI use follows clear rules"
        ],
        "coaching": [
          "What would need to be true for this to succeed, and which of those are we least sure of?",
          "Where would we want a person to check what AI suggests?"
        ],
        "aiHelp": "Early-warning signals and testing assumptions against data",
        "aiRisk": "Hidden model risk, and over-reliance on AI judgement"
      },
      "decisions": {
        "name": "Decisions",
        "question": "Who decides?",
        "attributes": [
          "Decision rights (incl. human vs AI)",
          "Prioritisation",
          "Cohesion"
        ],
        "lens": "Customer voice in decisions",
        "quick": "…the right people make the right decisions at the right pace, as one team, with the customer in mind?",
        "statements": [
          "It is clear who decides what, at which level and how fast, including which decisions AI may make or recommend and which stay with people.",
          "When everything seems important, we can still say what comes first, with the customer in mind.",
          "Leaders act as one team. Different views are raised openly and resolved, and decisions are carried together."
        ],
        "levels": [
          "Unclear who decides; decisions stall or are reopened",
          "Clear for big decisions, less so day to day",
          "Decisions are made at the right level, at pace, and carried together"
        ],
        "coaching": [
          "Which decision, if made this month, would unlock the most progress?",
          "Where do we agree in the room but act differently afterwards?"
        ],
        "aiHelp": "Faster options analysis and decision support",
        "aiRisk": "Unclear accountability for decisions AI makes or shapes"
      },
      "plan": {
        "name": "Plan",
        "question": "When and how much?",
        "attributes": [
          "Iteration",
          "Resourcing",
          "Issues"
        ],
        "lens": "Engaging customers along the way",
        "quick": "…our plan lets us deliver in steps, is properly resourced and involves customers along the way?",
        "statements": [
          "We deliver in short cycles, involve customers, learn from results and adjust.",
          "The people and budget we need are committed, not borrowed.",
          "Issues are raised early and resolved quickly."
        ],
        "levels": [
          "Fixed plan, under-resourced, issues surface late",
          "Resources partly committed; adjusting is slow",
          "Short delivery cycles, committed resources, issues resolved quickly"
        ],
        "coaching": [
          "What could we deliver in the next 90 days that customers would notice?",
          "What could we stop doing to free up the people this needs?"
        ],
        "aiHelp": "Forecasting, resource planning and early issue detection",
        "aiRisk": "False precision in AI-generated plans"
      },
      "people": {
        "name": "People",
        "question": "Who?",
        "attributes": [
          "Capability & AI learning",
          "Accountability",
          "Engagement"
        ],
        "lens": "Customer-facing teams equipped for the new experience",
        "quick": "…our people have the skills, including AI skills, and the ownership to deliver for customers?",
        "statements": [
          "We keep building the skills we need, including working confidently with AI, as fast as the work changes.",
          "Each outcome has a named owner who follows through.",
          "People, including customer-facing teams, adopt new ways of working, and the change sticks."
        ],
        "levels": [
          "Skills gaps unaddressed; ownership unclear",
          "Key roles covered; learning, including AI, is ad hoc",
          "Skills, including AI, grow continuously, and every outcome has an engaged owner"
        ],
        "coaching": [
          "What have people learned in the last six months, and how did they learn it?",
          "What would help people feel confident working with AI?"
        ],
        "aiHelp": "Copilots, personalised learning and adoption insight",
        "aiRisk": "Fear for jobs, and skills eroding through over-use"
      },
      "partners": {
        "name": "Partners",
        "question": "With whom?",
        "attributes": [
          "Expertise",
          "Alignment",
          "Commercial fit"
        ],
        "lens": "Partners strengthen the customer experience",
        "quick": "…our partners are capable, aligned and improve our customers' experience?",
        "statements": [
          "Our external partners bring expertise we do not have in-house.",
          "Partners work towards our outcomes and our customers' experience, not only their own scope.",
          "Contracts and incentives reward the results we need."
        ],
        "levels": [
          "Partners deliver to contract scope only",
          "Partners are capable but only partly aligned with our outcomes",
          "Partners share our goals, and incentives reward the results we need"
        ],
        "coaching": [
          "What do our partners know about our customers that we could use more?",
          "If a partner's contract ended tomorrow, what would we miss most?"
        ],
        "aiHelp": "Vendor evaluation and contract analysis",
        "aiRisk": "Lock-in, and vendor claims that exceed reality"
      },
      "data": {
        "name": "Data",
        "question": "What do we need?",
        "attributes": [
          "Quality",
          "Security (incl. traceability)",
          "Integrity"
        ],
        "lens": "Customer data secure and used well",
        "quick": "…we have the data we need, secure and trusted, including our customer data?",
        "statements": [
          "We have the data we need, accurate and complete enough to act on.",
          "Data, especially customer data, is protected, compliant with FADP/GDPR and traceable: we know where it comes from and who uses it.",
          "There is one trusted version of the truth across teams and systems."
        ],
        "levels": [
          "Data is incomplete, untrusted or insecure",
          "Core data usable, but versions conflict and security is uneven",
          "One trusted, secure version of the truth, including customer data"
        ],
        "coaching": [
          "Which decision would be easier if we had one number we all trusted?",
          "What customer data do we hold that we are not yet using well?"
        ],
        "aiHelp": "Data cleansing, lineage tracking and anomaly detection",
        "aiRisk": "Bias, privacy breaches and regulatory non-compliance"
      },
      "systems": {
        "name": "Process & Systems",
        "question": "How?",
        "attributes": [
          "Velocity",
          "Usability",
          "Automation"
        ],
        "lens": "Customer self-service",
        "quick": "…our processes and systems help us deliver, and let customers serve themselves easily?",
        "statements": [
          "Our processes and systems let us change and deliver quickly.",
          "Our processes and systems are easy to use, and customers can serve themselves where they prefer to.",
          "Repetitive work is automated where it makes sense."
        ],
        "levels": [
          "Manual processes; systems get in the way",
          "Systems support core work; little automation or self-service",
          "Fast, easy processes, sensible automation and easy customer self-service"
        ],
        "coaching": [
          "Where do customers or colleagues wait longest today?",
          "What would customers happily do themselves if we made it easy?"
        ],
        "aiHelp": "Process mining, automation, AI agents and customer self-service",
        "aiRisk": "Automating a broken process, making it fail faster"
      }
    },
    "scale": {
      "prefix": "How much do you trust that…",
      "labels": [
        "No trust",
        "Low",
        "Partial",
        "High",
        "Full trust"
      ],
      "groupLabel": "Trust for {item}"
    },
    "setup": {
      "heading": "Before you start",
      "body": "Only industry and company size are required. Nothing leaves your browser unless you choose to send it.",
      "name": "Name",
      "role": "Role",
      "org": "Organisation",
      "initiative": "Initiative being assessed",
      "optional": "optional",
      "required": "required",
      "industry": "Industry",
      "industryOptions": {
        "lifeSciences": "Life Sciences",
        "consumer": "Consumer",
        "industrial": "Industrial",
        "other": "Other"
      },
      "size": "Company size",
      "sizeOptions": {
        "lt50": "Under 50 employees",
        "50to249": "50–249 employees",
        "250to999": "250–999 employees",
        "1000plus": "1,000+ employees"
      },
      "choose": "Please choose",
      "mode": "Choose a mode",
      "quickH": "Quick check · 8 items",
      "quickP": "One headline question per dimension. About 5 minutes. Free.",
      "deepH": "Deep assessment · 24 items",
      "deepP": "Three statements per dimension, with level examples. About 15 minutes. Requires an access code.",
      "code": "Access code",
      "unlock": "Unlock",
      "checking": "Checking…",
      "codeOk": "Access code accepted. Deep assessment unlocked.",
      "codeInvalid": "This access code is not valid. Please check it and try again.",
      "codeExpired": "This access code has expired. Please contact facilit8 for a new one.",
      "codeError": "The code could not be checked right now. Please try again in a moment.",
      "codeLimited": "Too many attempts. Please wait a few minutes and try again.",
      "paidNote": "Deep assessment and team comparison are facilitated by facilit8.",
      "paidLink": "Get in touch to find out more."
    },
    "assess": {
      "progress": "{a} of {b} answered",
      "levelsHeading": "How to read the scale",
      "level0": "0% looks like",
      "level50": "50% looks like",
      "level100": "100% looks like",
      "continue": "Continue",
      "missing": "{n} items still to answer. They are highlighted.",
      "missingOne": "1 item still to answer. It is highlighted.",
      "missingSetup": "Please choose your industry and company size.",
      "deepLocked": "Enter a valid access code to use the deep assessment, or choose the quick check."
    },
    "rank": {
      "heading": "Where would you start?",
      "body": "All eight dimensions are essential, and these five are where your trust is lowest. Where would you start? Put them in the order you would address them.",
      "bodyTie": "All eight dimensions are essential, and these {n} are where your trust is lowest (some share the same score). Where would you start? Put them in the order you would address them.",
      "hint": "Drag the rows, or use the arrow buttons, to put them in order. First is where you would start.",
      "drag": "Drag to reorder {dim}",
      "up": "Move {dim} up",
      "down": "Move {dim} down",
      "moved": "{dim} moved to position {n}.",
      "confirm": "This is my order — show my results",
      "back": "Back to the checklist",
      "trust": "Trust {n}%"
    },
    "results": {
      "empty": "Complete the checklist to see your results.",
      "heading": "Your trust barometer",
      "overall": "Overall trust",
      "leadership": "Leadership",
      "capabilities": "Capabilities",
      "bands": [
        "Fix",
        "Strengthen",
        "Sustain"
      ],
      "startHere": "Start here",
      "modeQuick": "Quick check",
      "modeDeep": "Deep assessment",
      "gapLabel": "A question to consider",
      "gapNote": "Your Leadership scores are noticeably higher than Capabilities. Would your teams score Leadership the same way?",
      "sustainHeading": "Sustain what works",
      "sustain": "Every dimension scores 75% or higher. Your focus is to sustain what works: revisit these scores as the work changes, and ask whether others in the organisation would score them the same way.",
      "startHeading": "Where to start",
      "startIntro": "The order you chose, with your trust score for each.",
      "coachingHeading": "Coaching questions",
      "coachingFrame": "Questions to explore together. There are no wrong answers.",
      "coachingMore": "More questions for your other areas are part of a conversation with facilit8.",
      "aiHeading": "How AI can help",
      "aiRiskLabel": "AI risk to watch",
      "readMore": "Read more",
      "nextHeading": "The next conversation",
      "nextBody": "Think of a common customer complaint. Which of these dimensions sit behind it? Start with the capabilities involved, then ask what leadership could change to make it easier. It is rarely just one dimension. Often it is several, and sometimes all eight. That is the conversation facilit8 can help you have.",
      "nextCta": "Talk to facilit8",
      "keepHeading": "Keep your results",
      "keepBody": "Download a PDF for yourself, or export a results file so a facilitator can compare several leaders' views.",
      "pdf": "Download PDF",
      "export": "Export results file",
      "paidNote": "Deep assessment and team comparison are facilitated by facilit8.",
      "paidLink": "Get in touch to find out more."
    },
    "interpret": {
      "heading": "A personal interpretation from Dave",
      "consent": "Email me my results and a personal one-page interpretation from Dave.",
      "email": "Email",
      "name": "Name",
      "org": "Organisation",
      "optional": "optional",
      "marketing": "Also send me occasional facilit8 insights.",
      "submit": "Send my request",
      "sending": "Sending…",
      "okTitle": "Step 1 to higher impact complete!",
      "ok": "When leaders prioritise trust over performance, performance almost always follows. Thank you for your trust. Dave will send your interpretation personally.",
      "turnaround": "You can expect it within {t}.",
      "errEmail": "Please enter a valid email address.",
      "err": "Sending failed. Please try again, or export your results file and email it to david@facilit8.org.",
      "limited": "Too many requests. Please wait a few minutes and try again.",
      "privacy": "What is sent, and why, is explained in the",
      "privacyLink": "privacy notice"
    },
    "baseline": {
      "heading": "Swiss Impact Baseline",
      "consent": "Add my anonymous scores to the facilit8 Swiss Impact Baseline.",
      "detail": "Only the date, language, mode, industry, company size, your 8 trust scores and your order are stored. No name, email, organisation or initiative.",
      "submit": "Add my scores",
      "sending": "Sending…",
      "ok": "Thank you. Your anonymous scores have been added.",
      "err": "Your scores could not be added. Please try again later.",
      "limited": "Too many requests. Please wait a few minutes and try again."
    },
    "team": {
      "heading": "Compare several leaders",
      "body": "Load the exported results files from each leader. The tool shows the average trust per dimension, how far apart leaders are, and where they would start.",
      "gateHeading": "Facilitator access",
      "gateBody": "Team comparison is facilitated by facilit8. Enter your access code to continue.",
      "load": "Load results files",
      "clear": "Clear",
      "bad": "{f} is not a valid results file.",
      "who": "{n} respondents",
      "whoOne": "1 respondent",
      "leader": "Leader {x}",
      "showNames": "Show names",
      "noName": "(no name)",
      "th": [
        "Dimension",
        "Average trust",
        "Range (lowest to highest)",
        "In top 3",
        "Signal"
      ],
      "flag": "Leaders disagree",
      "top3": "{n} of {m}",
      "spreadNote": "A range of 50 points or more means leaders see this dimension very differently. That conversation often matters more than the score.",
      "startHeading": "Where the team would start",
      "startIntro": "Ordered by how many leaders put each dimension in their top 3, then by average trust (lowest first).",
      "startNone": "No leader placed any dimension in their top 3: every dimension scored 75% or higher for everyone.",
      "votes": "in top 3 for {n} of {m} · average trust {a}%"
    },
    "card": {
      "eyebrow": "Free tool · For sponsors & executive teams",
      "title": "The facilit8 Impact Checklist",
      "sub": "AI can diagnose your processes. Only people can build the trust needed to deliver impact. Score eight dimensions of trust in about five minutes and see where to start.",
      "tags": [
        "Trust",
        "Leadership",
        "5 minutes"
      ]
    }
  },
  /* impact:end */
},

/* =========================================================
   GERMAN
   ========================================================= */
de: {
  nav: { home:'Startseite', services:'Leistungen', caseStudies:'Case Studies', playbooks:'Playbooks', about:'Über uns', contact:'Kontakt', bookMeeting:'Gespräch beginnen' },
  footer: { tagline:'Commercial Excellence — Transformation, die hält.', servicesHeading:'Leistungen', companyHeading:'Unternehmen', basedInHeading:'Standort', basedInValue:'Schweiz', workingInternationally:'International tätig', languages:'English & Deutsch', copyright:'© 2026 facilit8 — David Howes', location:'Schweiz — DACH & International', cookiesPrivacy:'Cookies & Datenschutz', bookMeeting:'Termin buchen' , privacy:'Datenschutz'},
  deBanner: { text:'Diese Seite ist auch auf Deutsch verfügbar.', switchButton:'Auf Deutsch wechseln', dismiss:'×' },
  cookieBanner: { text:'Wir verwenden Cookies, um das Meeting-Buchungstool zu betreiben und — sofern Sie zustimmen — zu verstehen, wie Besucher diese Website nutzen.', managePreferences:'Einstellungen verwalten', essentialOnly:'Nur notwendige', acceptAll:'Alle akzeptieren', ariaLabel:'Cookie-Hinweis' },
  cookies: {
    hero: { eyebrow:'Cookies & Datenschutz', heading:'So verwendet diese Website Cookies', sub:'Wir halten es einfach: keine Werbe-Cookies und keine Analyse- oder Tracking-Cookies, es sei denn, Sie wählen dies. Passen Sie Ihre Einstellungen jederzeit über die Schalter unten an.' },
    whatAreCookiesEyebrow:'Was sind Cookies?',
    whatAreCookiesBody:'Cookies sind kleine Textdateien, die in Ihrem Browser gespeichert werden. Diese Website verwendet sie nur dort, wo sie für die Kernfunktionalität benötigt werden. Der Meeting-Kalender und das Kontaktformular werden von HubSpot betrieben und dienen ausschliesslich dazu, auf Ihre Anfrage zu reagieren — sie werden nicht weitergegeben oder für Werbezwecke verwendet.',
    alwaysOn:'Immer aktiv',
    tableHeaders: { cookieService:'Cookie / Dienst', purpose:'Zweck', provider:'Anbieter', duration:'Dauer', policy:'Richtlinie' },
    viewPolicy:'Richtlinie ansehen',
    noActiveInCategory:'In dieser Kategorie sind derzeit keine Cookies aktiv. Sie erscheinen hier, wenn sie in Zukunft aktiviert werden.',
    savePreferences:'Einstellungen speichern',
    preferencesSaved:'✓ Einstellungen gespeichert',
    adminNote:'Diese Website wird von David Howes / facilit8 mit Sitz in der Schweiz betrieben. Bei Fragen zur Datenverarbeitung wenden Sie sich an',
    lastUpdated:'Zuletzt aktualisiert: August 2026.',
    categories: {
      essential: { name:'Notwendig', description:'Erforderlich, damit die Website korrekt funktioniert. Diese können nicht deaktiviert werden.' },
      functional: { name:'Funktional', description:'Ermöglicht erweiterte Funktionen. Ohne diese sind Teile der Website (wie der Meeting-Kalender und das Kontaktformular) nicht verfügbar.' },
      analytics: { name:'Analyse & Marketing', description:'Hilft zu verstehen, wie Besucher die Website nutzen, und unterstützt — sofern aktiviert — das HubSpot-Klick- und Besuchstracking.' }
    }
  },
  privacy: {
    "hero": {
      "eyebrow": "Datenschutz",
      "heading": "Wie facilit8 mit Ihren Daten umgeht",
      "sub": "Kurzfassung: Wir erheben nur, was Sie uns geben, verwenden es nur für das, worum Sie gebeten haben, und verkaufen oder teilen es nie. Die Details stehen unten."
    },
    "whoEyebrow": "Verantwortliche Stelle",
    "whoBody": "Diese Website und die dahinterliegenden Dienste werden von David Howes, tätig unter facilit8, mit Sitz in der Schweiz betrieben. facilit8 ist Verantwortlicher für die auf dieser Seite beschriebenen Personendaten. Es gilt das Schweizer Datenschutzgesetz (DSG); die EU-DSGVO gilt, sofern Sie sich in der EU oder im EWR befinden. Bei allen Fragen zu Ihren Daten schreiben Sie an",
    "whatEyebrow": "Was wir erheben — und warum",
    "whatIntro": "Alles Folgende sind Daten, die Sie uns aktiv geben. Es gibt keine gekauften Listen, keine Datenhändler und kein Profiling oder automatisierte Entscheidungen.",
    "basisLabel": "Rechtsgrundlage",
    "retentionLabel": "Aufbewahrung",
    "items": {
      /* impact-privacy:start */
      "impactInterpretation": {
        "title": "Impact-Checkliste: persönliche Interpretation",
        "body": "Wenn Sie das Kästchen ankreuzen und absenden, werden Ihre E-Mail-Adresse, optional Ihr Name und Ihre Organisation, Ihre 8 Vertrauenswerte, die von Ihnen gewählte Reihenfolge sowie Modus, Branche und Unternehmensgrösse an das HubSpot-Konto von facilit8 gesendet, damit David Ihnen eine persönliche Interpretation schreiben und senden kann. Ob Sie zusätzlich gelegentlich Impulse erhalten möchten, ist ein separates, nicht angekreuztes Kästchen und wird separat erfasst. Ohne Ankreuzen und Absenden wird nichts gesendet.",
        "basis": "Massnahmen auf Ihre Anfrage; für Impuls-E-Mails Ihre Einwilligung, die Sie jederzeit widerrufen können.",
        "retention": "bis zu 24 Monate nach Ihrer letzten Interaktion."
      },
      "impactBaseline": {
        "title": "Impact-Checkliste: Swiss Impact Baseline",
        "body": "Wenn Sie das Kästchen ankreuzen und absenden, wird bei Netlify ein anonymer Datensatz gespeichert: Datum, Sprache, Modus, Branche, Grössenklasse des Unternehmens, Ihre 8 Vertrauenswerte und die von Ihnen gewählte Reihenfolge. Er enthält keinen Namen, keine E-Mail-Adresse, keine Organisation und keine Initiative und kann Ihnen nicht zugeordnet werden. Er wird nur für zusammengefasste Trendauswertungen genutzt, und eine Gruppe wird nur gezeigt, wenn sie mindestens 5 Antworten umfasst.",
        "basis": "Ihre Einwilligung. Da der Datensatz anonym ist, kann er nachträglich nicht einzeln gefunden oder gelöscht werden.",
        "retention": "für Trendauswertungen über die Zeit."
      },
      "impactCounter": {
        "title": "Impact-Checkliste: Nutzungszahlen",
        "body": "Die Checkliste zählt, wie oft sie gestartet und abgeschlossen wird und wie oft Interpretationen und Beiträge zur Baseline angefragt werden, pro Modus und pro Monat. Gespeichert werden nur die Summen: keine Cookies, keine Kennungen und keine IP-Adressen. Zum Schutz vor Missbrauch hält die Website für die Begrenzung von Anfragen kurzzeitig einen täglich wechselnden Einweg-Hash Ihrer IP-Adresse.",
        "basis": "unser berechtigtes Interesse daran, zu wissen, ob das Tool nützlich ist, und es vor Missbrauch zu schützen.",
        "retention": "Summen werden für Auswertungen aufbewahrt; Hashes für die Anfragebegrenzung höchstens einen Tag."
      },
      /* impact-privacy:end */
      "contactForm": {
        "title": "Kontaktformular",
        "body": "Ihr Name, Ihre E-Mail-Adresse und Ihre Nachricht. Wird ausschliesslich verwendet, um Ihnen zu antworten und den Verlauf festzuhalten.",
        "basis": "Massnahmen auf Ihre Anfrage hin sowie unser berechtigtes Interesse an der Beantwortung von Anfragen.",
        "retention": "solange die Anfrage aktiv ist, danach bis zu 24 Monate."
      },
      "meetings": {
        "title": "Terminbuchung",
        "body": "Ihr Name, Ihre E-Mail-Adresse und die Angaben, die Sie bei der Buchung über den HubSpot-Kalender machen. Wird zur Planung und Vorbereitung des Gesprächs verwendet.",
        "basis": "Massnahmen auf Ihre Anfrage hin.",
        "retention": "bis zu 24 Monate nach dem letzten Kontakt."
      },
      "playbookRequest": {
        "title": "Playbook-Anfragen",
        "body": "Ihre E-Mail-Adresse und das angefragte Playbook. Wird verwendet, um Ihnen dieses Playbook zuzusenden und zu erkennen, welche Themen nachgefragt werden.",
        "basis": "Massnahmen auf Ihre Anfrage hin.",
        "retention": "bis zu 24 Monate nach Ihrer letzten Interaktion."
      },
      "updates": {
        "title": "Gelegentliche Updates per E-Mail",
        "body": "Ihre E-Mail-Adresse, um Ihnen gelegentlich Playbooks und verwandte Updates zu senden. Dies geschieht nur, wenn Sie das Einwilligungsfeld ankreuzen — es ist nie an etwas anderes gekoppelt. Jede E-Mail enthält einen Abmeldelink; die Abmeldung wirkt sofort.",
        "basis": "Ihre Einwilligung, die Sie jederzeit widerrufen können.",
        "retention": "bis Sie sich abmelden."
      },
      "analytics": {
        "title": "Website-Analyse",
        "body": "Nur wenn Sie Analyse-Cookies akzeptieren, erfasst HubSpot, welche Seiten Sie besuchen und welche Links Sie anklicken. Lehnen Sie ab, wird nichts erfasst.",
        "basis": "Ihre Einwilligung, verwaltet auf der Seite Cookies & Datenschutz.",
        "retention": "bis zu 13 Monate."
      }
    },
    "processorsEyebrow": "Wer Ihre Daten sonst noch verarbeitet",
    "processorsIntro": "facilit8 ist ein Ein-Personen-Unternehmen und nutzt wenige etablierte Anbieter. Jeder wird ausschliesslich für den unten genannten Zweck eingesetzt, und keiner darf Ihre Daten für eigene Zwecke verwenden.",
    "processorHeaders": {
      "service": "Dienst",
      "handles": "Wofür",
      "where": "Wo",
      "policy": "Richtlinie"
    },
    "processors": {
      "hubspot": {
        "name": "HubSpot, Inc.",
        "handles": "Kontaktformular, Terminbuchungen, Playbook-Anfragen, E-Mail, CRM-Daten und — mit Ihrer Einwilligung — Website-Analyse. Anfragen für Interpretationen der Impact-Checkliste.",
        "where": "EU-Rechenzentrum (Frankfurt). Das HubSpot-Konto von facilit8 wird in der EU-Region gehostet."
      },
      "netlify": {
        "name": "Netlify, Inc.",
        "handles": "Hostet und liefert diese Website aus. Übliche Server-Logs einschliesslich IP-Adresse für Sicherheit und Betrieb. Anonyme Baseline-Datensätze der Impact-Checkliste, Nutzungszahlen und kurzlebige Hashes für die Anfragebegrenzung (Netlify Blobs).",
        "where": "Globales Content-Delivery-Netzwerk."
      }
    },
    "transfersEyebrow": "Daten ausserhalb der Schweiz",
    "transfersBody": "Ihre Daten werden in der EU und bei einzelnen Anbietern in den USA verarbeitet. Übermittlungen stützen sich auf die Angemessenheitsbeschlüsse der Europäischen Kommission und des Schweizerischen Bundesrates, soweit diese greifen, und andernfalls auf Standardvertragsklauseln.",
    "rightsEyebrow": "Ihre Rechte",
    "rightsBody": "Sie können jederzeit verlangen:",
    "rightsList": [
      "Auskunft über die zu Ihnen gespeicherten Personendaten",
      "Berichtigung falscher Angaben",
      "Löschung Ihrer Daten",
      "Einschränkung der Verarbeitung oder Widerspruch dagegen",
      "Herausgabe Ihrer Daten in einem übertragbaren Format",
      "Widerruf einer erteilten Einwilligung, ohne dass die bisherige Verarbeitung unrechtmässig wird"
    ],
    "rightsClosing": "Eine E-Mail genügt — es gibt kein Formular. Wir antworten innerhalb von 30 Tagen. Sind Sie nicht zufrieden, können Sie sich an den Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB) oder — in der EU bzw. im EWR — an Ihre nationale Aufsichtsbehörde wenden.",
    "securityEyebrow": "Sicherheit",
    "securityBody": "Die Daten liegen in den oben genannten Systemen und sind durch deren Zugriffskontrollen und Verschlüsselung geschützt. Kein System ist perfekt: Sollte eine Verletzung Ihre Daten betreffen, informieren wir Sie und die zuständige Behörde, wie es das Gesetz verlangt.",
    "cookiesLinkIntro": "Cookie-Details und Ihre Einstellungen finden Sie auf der Seite",
    "cookiesLinkCta": "Cookies & Datenschutz",
    "contactNote": "Fragen dazu? Schreiben Sie an",
    "lastUpdated": "Zuletzt aktualisiert: September 2026."
  },
  home: {
    hero: { eyebrow:'Commercial Transformation', headline1:'Die Technologie ist vorhanden.', headline2:'Die Ergebnisse sollten es auch sein.', sub:'Das AI-Zeitfenster ist offen.', primaryCta:'Termin buchen', secondaryCta:'Über facilit8' },
    heroAsk: {
      eyebrow:'Kommerzielle Transformation',
      headline:'Das AI-Zeitfenster ist offen. Die meisten Unternehmen werden es verpassen.',
      sub:'Bei über 50 Organisationen habe ich immer wieder dieselbe Lücke entstehen sehen: Teams, die verändert haben, wie sie mit Technologie arbeiten, haben Teams überholt, die sie nur eingekauft haben. Die nächsten drei bis vier Jahre entscheiden, wer das auch mit AI schafft. facilit8 bringt Sie auf die richtige Seite dieser Lücke — praxisnah, Schritt für Schritt, bis die Ergebnisse real sind.',
      iconAlt:'Eine Route, die Schritt für Schritt zurückgelegt wird — vom Start bis zum Ziel',
      iconCaption:'Schritt für Schritt, bis es hält',
      cardsAriaLabel:'Wählen Sie die Situation, die Ihrer am nächsten kommt',
      kicker:'Situation',
      card1Title:'Die Plattform ist eingeführt. Verändert hat sich nichts.',
      card1Body:'CRM, Automatisierung oder AI läuft — und die kommerziellen Zahlen bewegen sich nicht.',
      card2Title:'Das Programm steckt mitten im Flug fest.',
      card2Body:'Termine rutschen, der Sponsor steht exponiert da, und das Vertrauen schwindet.',
      card3Title:'Jede Funktion hat einen AI-Piloten, aber nur wenige führen zu echten Ergebnissen.',
      card3Body:'Marketing hat einen. Service auch. Und Operations auch. Keiner davon ist an einen Plan gebunden, der sich in den Zahlen zeigt.',
      answerEyebrow:'Wo wir beginnen würden',
      answer1:'Eine kurze Diagnose zur Nutzung, nicht zur Plattform. Wir finden, wo der Wert zwischen Menschen, Prozessen und Daten verloren geht.',
      proof1:'Derselbe Ausgangspunkt wie unsere AI-Adoption-Diagnose — dort, wo zwischen Menschen, Prozessen und Daten Wert verloren geht.',
      answer2:'Erste 30 Tage, die das Programm stabilisieren: was gilt, was gefährdet ist und welche Entscheidungen der Sponsor diesen Monat treffen muss.',
      proof2:'Die Struktur hinter dem Recovery-Framework für CRM, Customer Engagement und ERP aus dem Playbook „Rescue the Rollout”.',
      answer3:'Eine strukturierte Session, die AI vom Schlagwort zu einem verantworteten Plan macht — klar, wo der Wert entsteht und wer dafür verantwortlich ist.',
      proof3:'Dasselbe strukturierte Denken, das hinter StrategyLENS steht — unserem 20-minütigen Tool, um Ihre strategischen Entscheidungen zu testen, einschliesslich AI.',
      cta:'Gespräch beginnen'
    },
    founder: {
      photoAlt:'David Howes, Gründer von facilit8',
      body:'facilit8 heisst, etwas einfacher zu machen. Ich habe facilit8 gegründet, weil ich immer wieder dasselbe Muster gesehen habe: Veränderung wird im Sitzungszimmer beschlossen und geht auf dem Weg an die Front verloren — nicht, weil Menschen es nicht versuchen, sondern weil niemand nah genug und lange genug dranbleibt, damit sich die neue Arbeitsweise wirklich durchsetzt. Deshalb arbeite ich anders: praxisnah, gemeinsam mit Ihren Teams, coaching-geleitet, Schritt für Schritt, bis es einfach die Art ist, wie Sie arbeiten. Das Ergebnis ist Commercial Excellence — Vertrieb, Marketing und Service, die an einem Strang ziehen — sowie AI- und Digitalprojekte, die die Zahlen bewegen, die Sie tatsächlich ausweisen, statt Piloten, die still wieder verschwinden. Sie arbeiten immer direkt mit mir zusammen — und die Umsetzung skaliert durch etablierte Partner, wenn die Arbeit eine Kombination unterschiedlicher Fähigkeiten braucht.',
      credit:'David Howes — Gründer, facilit8',
      aboutLink:'Über facilit8',
      talkLink:'Mit David sprechen'
    },
    whoWeHelp: {
      eyebrow:'Für wen wir da sind',
      heading:'Für wen das hier ist.',
      startLabel:'Wo ich beginnen würde',
      cta:'Termin buchen',
      door1Label:'CEO im Schweizer/DACH-Mittelstand',
      door1Quote:'Ich weiss, dass sich etwas ändern muss, und ich habe nicht die Kapazität, das selbst zu leiten.',
      door1Start:'Ein erstes Gespräch darüber, wo die Lücke tatsächlich liegt — kein Framework-Pitch, kein Angebot.',
      door2Label:'Post-Merger-Integrationsverantwortliche/r',
      door2Quote:'Der Deal ist unterschrieben. Jetzt müssen zwei Vertriebsteams schnell zu einem werden.',
      door2Start:'Die Sequenz der ersten 30 Tage: erfassen, was unterschiedlich ist, eine Definition vereinbaren, eine gemeinsame Zahl aufbauen.',
      door2Link:'So funktioniert das →',
      door3Label:'PE Operating Partner',
      door3Quote:'Der Value-Creation-Plan sagt „kommerziell". Ich muss wissen, ob das real ist, bevor es in die nächste Board-Präsentation geht.',
      door3Start:'Eine strukturierte Prüfung der kommerziellen Annahmen im Value-Creation-Plan gegen das, was das Unternehmen in der Haltedauer tatsächlich liefern kann.'
    },
    sectors: {
      eyebrow:'Wo wir arbeiten',
      heading:'Drei Branchen, in denen die Lücke am meisten kostet.',
      countSuffix:'Projekte',
      s1Title:'Fertigung & Chemie', s1Body:'Kanalkonsolidierung, Kundenportale, Inside Sales, Decision Intelligence.', s1Metric:'150+ Distributoren auf unter 70 reduziert', s1BodyEnd:' — mit 360°-Leistungssteuerung dahinter.',
      s2Title:'Healthcare & Life Sciences', s2Body:'Studienabläufe, Patientenadhärenz, Apotheken-Retail-Insights, Umsatzverteidigung.', s2Metric:'Aufsetzzeit klinischer Studien um 20% verkürzt', s2BodyEnd:' — mit Design Thinking und LEAN.',
      s3Title:'Technologie & industrielle Dienstleistungen', s3Body:'SMART-Produktstrategie, IoT-Go-to-Market, Servicewachstum, Außendienst-Enablement.', s3Metric:'Neue kommerzielle Rollen entworfen', s3BodyEnd:' — damit Lösungen über Produktsilos hinweg verkauft werden.'
    },
    work: {
      eyebrow:'Ausgewählte Projekte',
      heading:'Anonymisierte Kunden. Echte Zahlen.',
      allLink:'Alle 50+ Projekte',
      c1Industry:'Healthcare & Life Sciences', c1Title:'Optimierung des Aufsetzens klinischer Studien', c1Body:'Design Thinking und LEAN in der Studienaktivierung — Aufsetz- und Aktivierungszeit um 20% reduziert.',
      c2Industry:'Fertigung & Chemie', c2Title:'Konsolidierung des Distributorennetzwerks', c2Body:'Über 150 Distributoren auf unter 70 konsolidiert, mit integriertem 360°-Performance-Management dahinter.',
      c3Industry:'Fertigung & Chemie', c3Title:'Kundenportal für 350+ Kunden', c3Body:'Agile Umsetzung eines eCommerce-Self-Service-Portals für einen globalen Pigmenthersteller — geringere Servicekosten.',
      c4Industry:'Technologie & Industrie', c4Title:'Digitalstrategie — SMART Produkte & Fabrik', c4Body:'Playing to Win und Design Thinking zur Definition von SMART Produkten, Prozessen und Fabrik für einen Präzisionsinstrumentenhersteller.'
    },
    stats: [{ label:'Jahre Commercial Transformation' },{ label:'Projekte umgesetzt' },{ label:'& international' }],
    problem: { eyebrow:'Das Problem', heading:'Die meisten Unternehmen haben die Werkzeuge. Nur wenige erzielen die Ergebnisse.', body:'CRM, Vertriebsautomatisierung, Revenue Analytics, Customer-Data-Plattformen — die Investitionen sind real. Warum folgen die Ergebnisse nicht? Weil Technologie allein keine kommerzielle Performance transformiert. Die Lücke zwischen Möglichkeit und Ergebnis hängt davon ab, wie Ihre Menschen, Prozesse und Systeme tatsächlich zusammenarbeiten. Und genau dort scheitern die meisten Programme.' },
    whatWeDo: { eyebrow:'Was wir tun', heading:'Wir schliessen die Lücke zwischen Technologie und kommerzieller Performance.', body1:'facilit8 arbeitet direkt an der Seite Ihrer Commercial Teams — in Ihrem Unternehmen, nicht darüber — um Technologieinvestitionen in messbare Ergebnisse zu verwandeln. Von der Go-to-Market-Strategie bis zu Sales und Revenue Operations bringen wir Senior-Expertise und praxisnahe Umsetzung in jedes Engagement.', body2:'Wir arbeiten mit mittelständischen Unternehmen, Grossunternehmen, PE-gestützten Firmen und Wachstumsunternehmen, die ihre kommerziellen Systeme zum Laufen bringen wollen.' },
    howWeWork: { eyebrow:'Wie wir arbeiten', heading:'Drei Dinge, die jedes Engagement besonders machen.', card1Title:'Praxisnahe Umsetzung', card1Body:'Wir übergeben keine Präsentation und gehen. Wir arbeiten in Ihrem Unternehmen, bis der Wandel real und dauerhaft ist.', card2Title:'Senior-Expertise', card2Body:'Sie arbeiten direkt mit mir zusammen — und die Umsetzung skaliert durch etablierte Partner, wenn die Arbeit eine Kombination unterschiedlicher Fähigkeiten braucht.', card3Title:'Wirkung, nicht Aktivität', card3Body:'Jedes Engagement ist auf messbare kommerzielle Ergebnisse ausgerichtet — nicht auf Aktivitätsmetriken oder Deliverables um ihrer selbst willen.' },
    cta: { heading:'Welche Unterstützung brauchen Sie — und warum?', body:'Das ist das ganze erste Gespräch. Kein Pitch, kein Angebot, keine Mindestprojektgröße — nur eine ehrliche Einschätzung, ob und wie wir helfen können.', cta:'Gespräch beginnen' }
  },
  services: {
    hero: { eyebrow:'Leistungen', headline:'Kommerzielle Performance — transformiert.', sub:'Wir arbeiten in vier miteinander verbundenen Bereichen — weil dauerhafter kommerzieller Wandel selten durch das Ziehen an einem einzigen Hebel entsteht.' },
    intro:'Technologie hat verändert, wie Unternehmen wachsen, verkaufen und Kunden betreuen. Doch dieses Potenzial zu realisieren erfordert mehr als Implementierung. Es braucht die richtige Strategie, das richtige Betriebsmodell und Menschen, die Wandel in einem realen Unternehmen bewirken können. Genau das tut facilit8 — praxisnah, direkt an der Seite Ihrer Teams, von der Diagnose bis zu messbaren Ergebnissen.',
    s1heading:'Commercial Excellence', s1body:'Umfassende Transformation Ihrer kommerziellen Leistungsfähigkeit. Wachstumsstagnation hat selten eine einzige Ursache. Wenn der Umsatz stagniert, ist das Problem meist systemisch — getrennte Teams, falsch ausgerichtete Anreize, unklare Verantwortlichkeiten und Prozesse, die nicht mit dem Unternehmen Schritt gehalten haben.', s1b1:'Kommerzielle Diagnosen und Performance-Reviews', s1b2:'Neugestaltung des Operating Models für Vertrieb und Marketing', s1b3:'Change-Programme mit eingebetteter Umsetzungsunterstützung', s1b4:'Capability-Aufbau und Team-Enablement',
    s2heading:'Technology Enablement', s2body:'Ihre Technologieinvestition tatsächlich rentabel machen. Die meisten Unternehmen haben stark in kommerzielle Technologie investiert — CRM, Sales-Engagement-Plattformen, Customer-Data-Tools, Marketing-Automatisierung. Nur wenige schöpfen deren vollen Wert aus.', s2b1:'CRM-Optimierung und Adoptionsprogramme', s2b2:'Technologie-Audits für Vertrieb und Marketing', s2b3:'Tool-Konsolidierung und Stack-Neugestaltung', s2b4:'Integration von Daten, Workflows und Reporting',
    s3heading:'Go-to-Market Strategy', s3body:'Ein schärferer, zielgerichteter Weg zum Markt. Der Eintritt in einen neuen Markt, die Einführung eines neuen Produkts oder die Überprüfung Ihrer Wettbewerbspositionierung erfordert mehr als eine Präsentation.', s3b1:'Marktsegmentierung und Kundenzielgruppenauswahl', s3b2:'Entwicklung von Value Propositions und Messaging', s3b3:'Kanal- und Partnerstrategie', s3b4:'Launch-Planung und kommerzielle Bereitschaft',
    s4heading:'Revenue Operations', s4body:'Ihre kommerziellen Systeme auf vorhersehbares Wachstum ausrichten. Wenn Vertrieb, Marketing und Customer Success in Silos agieren — mit unterschiedlichen Daten, Prozessen und Erfolgsdefinitionen — wird Umsatz unvorhersehbar und schwer skalierbar.', s4b1:'RevOps-Diagnose und Reifegradbeurteilung', s4b2:'Pipeline- und Forecasting-Prozessgestaltung', s4b3:'CRM-Daten-Governance und Reporting-Architektur', s4b4:'Funktionsübergreifende Ausrichtung und Operating Rhythms',
    howWeEngage: { eyebrow:'Wie wir zusammenarbeiten', heading:'Projekte und Partnerschaften — wir arbeiten so, wie es zu Ihnen passt.', card1Title:'Projektbasiert', card1Body:'Ein definiertes Programm mit klarem Umfang, Meilensteinen und Liefergegenständen.', card2Title:'Laufende Partnerschaft', card2Body:'Fortlaufende Senior-Unterstützung in kommerziellen und strategischen Fragen — verfügbar ohne den Overhead einer Vollzeitstelle.' },
    cta: { heading:'Nicht sicher, welche Leistung zu Ihrer Situation passt?', body:'Die meisten Engagements beginnen mit einem Gespräch. Schildern Sie uns Ihre Situation — wir sagen Ihnen direkt, ob und wie wir helfen können.', cta:'Gespräch vereinbaren' }
  },
  about: {
    hero: { eyebrow:'Über facilit8', headline:'Veränderung leichter machen. Für Ihre Kunden, Ihre Mitarbeitenden — und für Sie.', sub:'facilit8 arbeitet Seite an Seite mit in der Schweiz ansässigen Unternehmen — nah genug, um mit den Menschen zu arbeiten, auf die es wirklich ankommt, Schritt für Schritt, bis der Wandel verankert ist.' },
    problem: { eyebrow:'Warum das schwieriger ist, als es aussieht', lead:'Die meisten Unternehmen managen heute mehr Wandel mit weniger Menschen.', body:'Eine Generation von ERP- und SaaS-Projekten hat Organisationen gelehrt, dass Veränderung Teams, Systeme und Arbeitsweisen übergreifend berührt. Das ist verstanden. Was sich nicht verändert hat, ist, wie schwer es ist, Wandel umzusetzen, wenn Ihre Mitarbeitenden den Motor verbessern und gleichzeitig Tempo und Kurs halten müssen — erwartet wird, dass sie ihr Tagesgeschäft liefern und die Transformation gleichzeitig führen. Technologie soll das Leben leichter, schneller, besser machen. Für Kunden. Für Mitarbeitende. Aber dieses Versprechen geht irgendwo zwischen Go-live und Übergabe verloren. Und wenn die Energie nachlässt, setzt sich die neue Arbeitsweise nie wirklich durch.', highlight:'Die Lücke zwischen dem Entschluss zur Veränderung und ihrer Umsetzung in die Realität — genau dort arbeitet facilit8.' },
    founder: { eyebrow:'Gründer', heading:'Warum ich facilit8 gegründet habe', body1:'Meine Karriere habe ich in dem Raum verbracht, in dem Veränderung geschieht — nicht danach darüber zu schreiben, sondern mittendrin. Ausgebildet in umsetzungsorientierten Beratungshäusern: Capgemini, SAP und Implement Consulting Group, wo der Fokus stets auf Unternehmen aller Grössen lag, oft in Phasen der Übernahme, Fusion und uneinheitlicher Arbeitsweisen — aber häufig ohne eine eigene Transformationsabteilung. Als Commercial Manager in Unternehmen wie Nestlé, Clariant und Thomas Cook. Was ich dabei immer wieder festgestellt habe: Die Qualität dessen, was in einem Raum passiert, verändert alles. Ein gut geführter Workshop sammelt nicht nur Informationen. Er erzeugt Energie. Er bringt Probleme ans Licht, die niemand anzusprechen wagte. Er verwandelt einen Raum voller Skeptiker in ein Team, das den nächsten Schritt selbst trägt.', body2:'Ich bin ausgebildeter Executive Coach und erfahrener Moderator — das heisst, ich weiss, wie ich das Beste aus einer Gruppe und aus einem Einzelgespräch heraushole. Diese Kombination — tiefe Umsetzungserfahrung, Coaching-Kompetenz und die Fähigkeit, Komplexität beherrschbar zu machen — ist das Fundament von facilit8. Keine leeren Versprechen. Jemand, der Schritt für Schritt an Ihrer Seite bleibt, bis der Wandel verankert ist. Mit Sitz in der Schweiz arbeite ich direkt mit den Menschen, die den Wandel vorantreiben — so werden Fähigkeiten übertragen und Ergebnisse dauerhaft.', highlight:'«facilit8 bedeutet leichter machen. Ob das eine effektivere Art der bereichsübergreifenden Zusammenarbeit ist, ein 24/7-Kundenportal oder eine KI-Lösung für schnellere Preisgestaltung. Technologie, Prozesse, Arbeitsweisen — jede Veränderung sollte das Leben Ihrer Kunden und Mitarbeitenden besser machen. Das ist, was ich leichter mache.»', credit:'David Howes — Gründer, facilit8' },
    beliefs: { eyebrow:'Drei Überzeugungen', b1title:'Technologie sollte das Leben leichter machen', b1body:'Der gesamte Zweck einer digitalen Investition ist es, das Leben besser zu machen — für Ihre Kunden, Ihre Mitarbeitenden, Ihr Unternehmen. Wenn das nicht gelingt, ist etwas in der Gestaltung oder Umsetzung des Wandels schiefgelaufen. facilit8 arbeitet rückwärts von diesem Ergebnis.', b2title:'Wandel entsteht durch Menschen, nicht durch Projekte', b2body:'Transformation scheitert nicht in der Planungsphase. Sie scheitert bei der Übergabe — wenn Menschen zu ihrem Tagesgeschäft zurückkehren und die neue Arbeitsweise sich nie wirklich durchsetzt. Echte Akzeptanz zu schaffen ist kein Nice-to-have. Es ist die eigentliche Arbeit.', b3title:'Schritt für Schritt schlägt den grossen Wurf', b3body:'Komplexe Herausforderungen brauchen keine komplexen Lösungen. Sie brauchen klare Schrittfolgen, die richtigen Gespräche zum richtigen Zeitpunkt und jemanden, der immer wieder fragt: Was ist der nächste machbare Schritt? Schritt für Schritt ist nicht langsam — so bleibt Veränderung wirklich haften.' },
    cta: { heading:'Wenn Ihnen etwas auf dieser Seite bekannt vorkam, ist das unser Ausgangspunkt.', body:'Die meisten, die sich melden, wissen nicht genau, was sie brauchen. Sie wissen nur, dass sich etwas ändern muss — und dass es allein schwerer geht. Ein Gespräch kostet nichts, und es gibt keine Mindestgrösse für ein Engagement.', cta:'Mit David sprechen' }
  },
  contact: {
    hero: { eyebrow:'Kontakt', headline:'Sprechen wir.', sub:'Kein Pitch. Kein Angebot. Nur ein ehrliches Gespräch darüber, wo Sie stehen und was möglich sein könnte.' },
    intro:'Ob Sie ein klares Briefing haben oder eine noch halbfertige Herausforderung — der beste Ausgangspunkt ist ein Gespräch. Wählen Sie unten einen Termin, oder schreiben Sie uns eine Nachricht, wenn Sie lieber zuerst schreiben möchten.',
    calendarBlocked:'Der Meeting-Kalender verwendet funktionale Cookies, denen Sie noch nicht zugestimmt haben.',
    formBlocked:'Das Kontaktformular verwendet funktionale Cookies, denen Sie noch nicht zugestimmt haben.',
    manageCookies:'Cookie-Einstellungen verwalten',
    writeFirst: { eyebrow:'Lieber zuerst schreiben?', heading:'Nachricht senden.' },
    details: { eyebrow:'Angaben', founderLabel:'Gründer', basedInLabel:'Standort', languagesLabel:'Sprachen', emailLabel:'E-Mail', founderValue:'David Howes', basedInValue:'Schweiz', languagesValue:'English & Deutsch' }
  },
  projects: {
    hero: { eyebrow:'Projekte', heading:'Eine Erfolgsbilanz über Branchen hinweg — und die Arbeit dahinter.', sub:'Eine Auswahl von Engagements aus über zwanzig Jahren Commercial Transformation. Fahren Sie über eine Kachel, um das Projekt und die erzielten Ergebnisse zu sehen. Nutzen Sie die Filter, um nach Branche oder Leistungsbereich einzugrenzen.' },
    filters: { industryLabel:'Branche', serviceLabel:'Leistung', allIndustries:'Alle Branchen', clearFilters:'Filter zurücksetzen', ariaLabel:'Projektfilter', industryAriaLabel:'Nach Branche filtern' },
    count: { of:'von', project:'Projekt', projects:'Projekten' },
    tile: { projectLabel:'Projekt' },
    empty: { heading:'Keine Projekte entsprechen diesen Filtern.', body:'Versuchen Sie, die Branche zu erweitern oder einen Leistungsfilter zu entfernen.', clearFilters:'Filter zurücksetzen' },
    cta: { heading:'Sehen Sie ein Projekt, das Ihrer Situation ähnelt?', body:'Die meisten Engagements beginnen mit einem Gespräch. Schildern Sie uns Ihre Situation — wir sagen Ihnen direkt, ob und wie wir helfen können.', cta:'Gespräch vereinbaren' }
  },
  playbooks: {
    hero: { eyebrow:'Playbooks', heading:'Praxisnahe Playbooks für Führungskräfte im Commercial-Bereich.', sub:'Kurze, meinungsstarke Leitfäden aus zwanzig Jahren Commercial Transformation. Jeder ist für eine bestimmte Rolle und eine bestimmte Situation geschrieben — der Typ von Arbeit, den Sie an einem Montagmorgen tatsächlich in die Hand nehmen und nutzen können.' },
    intro: { availableNow:'jetzt verfügbar', comingSoon:'demnächst verfügbar', author:'Verfasst von David Howes · facilit8' },
    comingSoonChip:'Demnächst',
    cta: { heading:'Ein Gespräch kostet nichts.', body:'Wenn eines dieser Playbooks eine Situation widerspiegelt, in der Sie sich befinden — oder ihr nahe kommen — buchen Sie einen Termin, um es mit David zu besprechen.', cta:'Gespräch vereinbaren' }
  },
  playbookDetail: {
    notFound: { heading:'Playbook nicht gefunden.', body:'Der aufgerufene Link stimmt mit keinem unserer veröffentlichten Playbooks überein.', backButton:'Zurück zu den Playbooks' },
    comingSoon: { chip:'Demnächst', getNotified:'Benachrichtigung bei Veröffentlichung', notifyBlocked:'Dieses Formular verwendet funktionale Cookies, denen Sie noch nicht zugestimmt haben.', backLink:'Zurück zu allen Playbooks' },
    meta: { audience:'Zielgruppe', cadence:'Rhythmus', readTime:'Lesezeit', format:'Format', horizon:'Zeitrahmen', markets:'Märkte', scope:'Anwendungsbereich', series:'Reihe' },
    breadcrumb:'Playbooks',
    talkThrough: { heading:'Besprechen wir es', body:'Die meisten Engagements beginnen mit einem dreissigminütigen Gespräch. Schildern Sie uns, wo Sie stehen und was Sie erreichen möchten — wir sagen Ihnen direkt, ob und wie wir helfen können.', cta:'Gespräch vereinbaren' },
    requestAccessRail: { heading:'Zugang anfragen', bodyCL:'Dieses Playbook wird vertraulich geteilt. Nehmen Sie Kontakt auf, um Ihren Zugangscode zu erhalten und zu besprechen, wie das Capability-Lens-Framework auf Ihre offenen Stellen angewendet werden kann.', bodyPL:'Dieses Playbook wird vertraulich geteilt. Nehmen Sie Kontakt auf, um Ihren Zugangscode zu erhalten und zu besprechen, wie das Framework auf Ihre Situation angewendet werden kann.', cta:'facilit8 kontaktieren' },
    writtenBy:'Verfasst von David Howes — Gründer, facilit8. Schweiz · DACH & international.',
    actions: { bookConversation:'Gespräch vereinbaren', openPlaybook:'Interaktives Playbook öffnen', openPlaybookLocked:'Playbook öffnen 🔒', readExtract:'Auszug lesen', requestAccess:'Zugang anfragen' },
    cioAgileCta: { heading:'IT-Lieferung, über die der CFO spricht.', body:'Ein Gespräch kostet nichts. Wir sagen Ihnen direkt, ob dieses Playbook passt — oder ob etwas anderes Sie weiter bringt.', cta:'Gespräch vereinbaren' },
    rescueRolloutCta: { heading:'Programme werden von Menschen gerettet, nicht von Plänen.', body:'Die Massnahmen in diesem Playbook funktionieren nur, wenn die richtigen Menschen sie verantworten. Ein dreissigminütiges Gespräch zeigt Ihnen, ob das der Fall ist — und was zu tun ist, wenn nicht.', cta:'Gespräch vereinbaren' },
    capabilityLensCta: { heading:'Eine offene Commercial-Stelle? Betrachten Sie sie durch die Linse.', body:'Ein dreissigminütiges Gespräch mit David zeigt Ihnen, wie das Capability-Lens-Framework auf Ihre nächste offene Stelle angewendet werden kann — und wie Sie einen wiederholbaren Prozess daraus aufbauen.', cta:'Gespräch vereinbaren' },
    pilotLeadRailBody:'Dieses Playbook wird vertraulich geteilt. Nehmen Sie Kontakt auf, um Ihren Zugangscode zu erhalten und zu besprechen, wie das Framework auf Ihre Situation passt.',
    pilotLeadCta: { heading:'Führen Sie einen Lead-Harmonisierungs-Pilot durch?', body:'Ein dreissigminütiges Gespräch mit David zeigt Ihnen, ob dieses Framework zu Ihrer Situation passt — oder was für Ihre Märkte angepasst werden sollte.', cta:'Gespräch vereinbaren' },
    cmoFirefighterCta: { heading:'Ein anderes Cash-Problem?', body:'Ein Gespräch kostet nichts. Wir sagen Ihnen direkt, ob dieses Playbook passt — oder ob etwas anderes Sie weiter bringt.', cta:'Gespräch vereinbaren' }
  },
  /* impact:start */
  impact: {
    "meta": {
      "title": "Impact-Checkliste — facilit8",
      "description": "Acht Dimensionen des Vertrauens entscheiden, ob eine Transformation Wirkung erzielt. Bewerten Sie Ihre Zuversicht in jeder, erkennen Sie, wo das Vertrauen fragil ist, und entscheiden Sie, wo Sie beginnen."
    },
    "back": "← Zurück zu facilit8.org",
    "langLabel": "Sprache",
    "hero": {
      "eyebrow": "facilit8 Impact-Checkliste",
      "headline": "KI kann Ihre Prozesse diagnostizieren. Nur Menschen können das Vertrauen aufbauen, das es braucht, um Wirkung zu erzielen.",
      "intro": "Was KI nicht kann: die Zuversicht schaffen, die aus einem Plan Ergebnisse macht. Transformationen scheitern selten an fehlenden Erkenntnissen. Sie scheitern, wenn Führungskräfte das Vertrauen in die Richtung, in den Plan oder ineinander verlieren. Alle acht Dimensionen sind unverzichtbar: Eine Schwäche in einer davon gefährdet die Wirkung, die Ihre Kundschaft erwartet. Diese Checkliste zeigt, wo das Vertrauen stark ist, wo es fragil ist und wo Sie zuerst ansetzen sollten."
    },
    "tabs": {
      "model": "Das Modell",
      "assess": "Checkliste",
      "results": "Ihre Ergebnisse",
      "team": "Teamvergleich"
    },
    "model": {
      "impact": "Impact",
      "impactBody": "Impact: Ergebnisse für das Unternehmen und seine Kundschaft. Alle acht Dimensionen sind unverzichtbar, um sie zu erreichen. Eine schwache Dimension gefährdet die Wirkung bei der Kundschaft und deren Erwartungen.",
      "leadership": "Führung",
      "leadershipOwner": "Verantwortet von Sponsor und Führungsteam",
      "capabilities": "Fähigkeiten",
      "capabilitiesOwner": "Umgesetzt durch die Organisation",
      "lensLabel": "Kundensicht",
      "scaleNote": "Vertrauen bedeutet Zuversicht. Bewerten Sie jeden Punkt von 0 % (kein Vertrauen) bis 100 % (volles Vertrauen). Höher ist immer besser, auch beim Risiko: Ein hoher Wert bedeutet, dass Risiken verstanden und gesteuert werden.",
      "learningLabel": "Was wir unter Lernen verstehen",
      "learningDef": "Lernen ist die Fähigkeit der Organisation, neue Fähigkeiten laufend aufzubauen, anzuwenden und zu teilen, auch im Umgang mit KI, so schnell, wie sich die Arbeit verändert.",
      "start": "Checkliste starten"
    },
    "dims": {
      "direction": {
        "name": "Richtung",
        "question": "Warum?",
        "attributes": [
          "Klarheit",
          "Ausrichtung",
          "Kommerzielle Ergebnisse"
        ],
        "lens": "Das Kundenerlebnis erneuern und sich vom Wettbewerb abheben",
        "quick": "…alle wissen, warum wir das tun, wohin wir gehen und wie es uns für unsere Kundschaft abheben wird?",
        "statements": [
          "Das Ziel und warum es wichtig ist, sind klar und schriftlich festgehalten.",
          "Das Führungsteam erzählt dieselbe Geschichte darüber, wohin wir gehen.",
          "Wir haben vereinbart, welche kommerziellen Ergebnisse und welche Ergebnisse für die Kundschaft dies liefern muss, etwa Umsatz, Marge, Produktivität oder Kundenerlebnis."
        ],
        "levels": [
          "Kein vereinbartes Ziel; die Leute beschreiben unterschiedliche Ziele",
          "Ziel an der Spitze vereinbart, aber in den Teams noch nicht verstanden",
          "Alle können das Ziel, seine kommerziellen Ergebnisse und seine Bedeutung für die Kundschaft erklären"
        ],
        "coaching": [
          "Wenn eine Kundin oder ein Kunde fragen würde, was in einem Jahr für sie anders sein wird: Was würde jede und jeder von uns antworten?",
          "Bei welchem Teil der Richtung fühlen Sie sich am sichersten, und bei welchem am unsichersten?"
        ],
        "aiHelp": "Szenariomodellierung und Synthese von Markt- und Kundensignalen",
        "aiRisk": "Eine Strategie, die wie die aller anderen klingt, weil sie von derselben KI stammt"
      },
      "risk": {
        "name": "Risiko",
        "question": "Was könnte uns aufhalten?",
        "attributes": [
          "Annahmen",
          "Konsequenzen & Hindernisse",
          "KI-Governance & Ethik"
        ],
        "lens": "Risiko für die Kundschaft, wenn wir scheitern oder wenn die KI falsch liegt",
        "quick": "…wir verstehen, was uns aufhalten könnte, einschliesslich Risiken durch KI und Risiken für unsere Kundschaft, und dies steuern?",
        "statements": [
          "Wir wissen, was zutreffen muss, um das Ziel zu erreichen, und wir überprüfen es.",
          "Wir verstehen, was für uns und unsere Kundschaft passiert, wenn wir scheitern, und was Wirkung verhindern könnte, und jedes Hindernis hat eine verantwortliche Person.",
          "Wir haben klare Regeln für den verantwortungsvollen Einsatz von KI, die Bias, Transparenz, Datennutzung und Regulierung wie den EU AI Act abdecken."
        ],
        "levels": [
          "Risiken werden erst besprochen, wenn sie eintreten",
          "Die wichtigsten Risiken sind erfasst, werden aber selten überprüft; keine klaren Regeln für den KI-Einsatz",
          "Annahmen werden überprüft, Risiken haben Verantwortliche und werden überprüft, und der KI-Einsatz folgt klaren Regeln"
        ],
        "coaching": [
          "Was müsste zutreffen, damit dies gelingt, und bei welchen dieser Punkte sind wir am unsichersten?",
          "Wo möchten wir, dass ein Mensch prüft, was die KI vorschlägt?"
        ],
        "aiHelp": "Frühwarnsignale und Überprüfung von Annahmen anhand von Daten",
        "aiRisk": "Verborgene Modellrisiken und zu grosses Vertrauen in das Urteil der KI"
      },
      "decisions": {
        "name": "Entscheidungen",
        "question": "Wer entscheidet?",
        "attributes": [
          "Entscheidungsrechte (inkl. Mensch vs. KI)",
          "Priorisierung",
          "Zusammenhalt"
        ],
        "lens": "Die Stimme der Kundschaft in Entscheidungen",
        "quick": "…die richtigen Personen die richtigen Entscheidungen im richtigen Tempo treffen, als ein Team und mit der Kundschaft im Blick?",
        "statements": [
          "Es ist klar, wer was auf welcher Ebene und wie schnell entscheidet, auch welche Entscheidungen KI treffen oder empfehlen darf und welche bei Menschen bleiben.",
          "Auch wenn alles wichtig scheint, können wir sagen, was zuerst kommt, mit der Kundschaft im Blick.",
          "Wir handeln als ein Führungsteam. Unterschiedliche Sichtweisen werden offen angesprochen und geklärt, und wir tragen Entscheidungen gemeinsam mit."
        ],
        "levels": [
          "Unklar, wer entscheidet; Entscheidungen stocken oder werden wieder aufgerollt",
          "Klar bei grossen Entscheidungen, weniger im Alltag",
          "Entscheidungen fallen auf der richtigen Ebene, im richtigen Tempo, und werden gemeinsam getragen"
        ],
        "coaching": [
          "Welche Entscheidung würde, wenn sie diesen Monat fällt, den grössten Fortschritt ermöglichen?",
          "Wo sind wir uns im Raum einig, handeln danach aber unterschiedlich?"
        ],
        "aiHelp": "Schnellere Analyse von Optionen und Entscheidungsunterstützung",
        "aiRisk": "Unklare Verantwortung für Entscheidungen, die KI trifft oder beeinflusst"
      },
      "plan": {
        "name": "Plan",
        "question": "Wann und wie viel?",
        "attributes": [
          "Iteration",
          "Ressourcen",
          "Probleme"
        ],
        "lens": "Die Kundschaft laufend einbeziehen",
        "quick": "…unser Plan uns schrittweise liefern lässt, ausreichend mit Ressourcen ausgestattet ist und die Kundschaft laufend einbezieht?",
        "statements": [
          "Wir liefern in kurzen Zyklen, beziehen die Kundschaft ein, lernen aus den Ergebnissen und passen an.",
          "Die benötigten Personen und Budgets sind fest zugesagt, nicht nur ausgeliehen.",
          "Probleme werden früh angesprochen und rasch gelöst."
        ],
        "levels": [
          "Starrer Plan, zu wenig Ressourcen, Probleme zeigen sich spät",
          "Ressourcen teilweise zugesagt; Anpassungen sind langsam",
          "Kurze Lieferzyklen, fest zugesagte Ressourcen, Probleme werden rasch gelöst"
        ],
        "coaching": [
          "Was könnten wir in den nächsten 90 Tagen liefern, das die Kundschaft bemerken würde?",
          "Womit könnten wir aufhören, um die Menschen freizuspielen, die dies braucht?"
        ],
        "aiHelp": "Prognosen, Ressourcenplanung und frühe Problemerkennung",
        "aiRisk": "Scheinbare Präzision in KI-generierten Plänen"
      },
      "people": {
        "name": "Menschen",
        "question": "Wer?",
        "attributes": [
          "Fähigkeiten & KI-Lernen",
          "Verantwortung",
          "Engagement"
        ],
        "lens": "Teams mit Kundenkontakt sind für das neue Erlebnis gerüstet",
        "quick": "…unsere Mitarbeitenden die Fähigkeiten, einschliesslich KI-Kompetenzen, und die Eigenverantwortung haben, um für die Kundschaft zu liefern?",
        "statements": [
          "Wir bauen die benötigten Fähigkeiten laufend auf, auch den sicheren Umgang mit KI, so schnell, wie sich die Arbeit verändert.",
          "Jedes Ergebnis hat eine benannte verantwortliche Person, die dranbleibt.",
          "Die Mitarbeitenden, auch die Teams mit Kundenkontakt, übernehmen neue Arbeitsweisen, und die Veränderung bleibt."
        ],
        "levels": [
          "Kompetenzlücken bleiben offen; Verantwortung ist unklar",
          "Schlüsselrollen sind besetzt; Lernen, auch zu KI, geschieht punktuell",
          "Fähigkeiten, auch zu KI, wachsen laufend, und jedes Ergebnis hat eine engagierte verantwortliche Person"
        ],
        "coaching": [
          "Was haben die Mitarbeitenden in den letzten sechs Monaten gelernt, und wie haben sie es gelernt?",
          "Was würde den Mitarbeitenden helfen, sich im Umgang mit KI sicher zu fühlen?"
        ],
        "aiHelp": "Copiloten, personalisiertes Lernen und Einblicke in die Nutzung",
        "aiRisk": "Angst um Arbeitsplätze und Kompetenzverlust durch übermässige Nutzung"
      },
      "partners": {
        "name": "Partner",
        "question": "Mit wem?",
        "attributes": [
          "Expertise",
          "Ausrichtung",
          "Kommerzielle Passung"
        ],
        "lens": "Partner stärken das Kundenerlebnis",
        "quick": "…unsere Partner fähig und auf unsere Ziele ausgerichtet sind und das Erlebnis unserer Kundschaft verbessern?",
        "statements": [
          "Unsere externen Partner bringen Fachwissen, das wir intern nicht haben.",
          "Partner arbeiten auf unsere Ergebnisse und das Erlebnis unserer Kundschaft hin, nicht nur auf ihren eigenen Auftragsumfang.",
          "Verträge und Anreize belohnen die Ergebnisse, die wir brauchen."
        ],
        "levels": [
          "Partner liefern nur den vertraglichen Umfang",
          "Partner sind fähig, aber nur teilweise auf unsere Ergebnisse ausgerichtet",
          "Partner teilen unsere Ziele, und Anreize belohnen die Ergebnisse, die wir brauchen"
        ],
        "coaching": [
          "Was wissen unsere Partner über unsere Kundschaft, das wir besser nutzen könnten?",
          "Wenn der Vertrag eines Partners morgen enden würde: Was würden wir am meisten vermissen?"
        ],
        "aiHelp": "Lieferantenbewertung und Vertragsanalyse",
        "aiRisk": "Abhängigkeit von Anbietern und Versprechen, die die Realität übertreffen"
      },
      "data": {
        "name": "Daten",
        "question": "Was brauchen wir?",
        "attributes": [
          "Qualität",
          "Sicherheit (inkl. Nachvollziehbarkeit)",
          "Integrität"
        ],
        "lens": "Kundendaten sind sicher und werden gut genutzt",
        "quick": "…wir die Daten haben, die wir brauchen, sicher und vertrauenswürdig, einschliesslich unserer Kundendaten?",
        "statements": [
          "Wir haben die Daten, die wir brauchen, genau und vollständig genug, um danach zu handeln.",
          "Daten, besonders Kundendaten, sind geschützt, DSG/DSGVO-konform und nachvollziehbar: Wir wissen, woher sie stammen und wer sie nutzt.",
          "Es gibt eine vertrauenswürdige Version der Wahrheit über Teams und Systeme hinweg."
        ],
        "levels": [
          "Daten sind unvollständig, nicht vertrauenswürdig oder unsicher",
          "Kerndaten sind nutzbar, aber Versionen widersprechen sich und die Sicherheit ist uneinheitlich",
          "Eine vertrauenswürdige, sichere Version der Wahrheit, auch bei Kundendaten"
        ],
        "coaching": [
          "Welche Entscheidung wäre einfacher, wenn wir eine Zahl hätten, der wir alle vertrauen?",
          "Welche Kundendaten haben wir, die wir noch nicht gut nutzen?"
        ],
        "aiHelp": "Datenbereinigung, Nachverfolgung der Datenherkunft und Anomalieerkennung",
        "aiRisk": "Bias, Datenschutzverletzungen und Verstösse gegen Vorschriften"
      },
      "systems": {
        "name": "Prozesse & Systeme",
        "question": "Wie?",
        "attributes": [
          "Tempo",
          "Benutzerfreundlichkeit",
          "Automatisierung"
        ],
        "lens": "Self-Service für die Kundschaft",
        "quick": "…unsere Prozesse und Systeme uns bei der Umsetzung helfen und es der Kundschaft leicht machen, sich selbst zu bedienen?",
        "statements": [
          "Unsere Prozesse und Systeme ermöglichen schnelle Anpassung und Umsetzung.",
          "Unsere Prozesse und Systeme sind einfach zu nutzen, und die Kundschaft kann sich selbst bedienen, wo sie das bevorzugt.",
          "Wiederkehrende Arbeit ist automatisiert, wo es sinnvoll ist."
        ],
        "levels": [
          "Manuelle Prozesse; Systeme stehen im Weg",
          "Systeme unterstützen die Kernarbeit; wenig Automatisierung oder Self-Service",
          "Schnelle, einfache Prozesse, sinnvolle Automatisierung und einfacher Self-Service für die Kundschaft"
        ],
        "coaching": [
          "Wo warten Kundinnen und Kunden oder Kolleginnen und Kollegen heute am längsten?",
          "Was würde die Kundschaft gerne selbst erledigen, wenn wir es einfach machen würden?"
        ],
        "aiHelp": "Process Mining, Automatisierung, KI-Agenten und Self-Service für die Kundschaft",
        "aiRisk": "Einen fehlerhaften Prozess automatisieren, sodass er schneller scheitert"
      }
    },
    "scale": {
      "prefix": "Wie sehr vertrauen Sie darauf, dass…",
      "labels": [
        "Kein Vertrauen",
        "Gering",
        "Teilweise",
        "Hoch",
        "Volles Vertrauen"
      ],
      "groupLabel": "Vertrauen: {item}"
    },
    "setup": {
      "heading": "Bevor Sie beginnen",
      "body": "Nur Branche und Unternehmensgrösse sind erforderlich. Nichts verlässt Ihren Browser, ausser Sie entscheiden sich dafür.",
      "name": "Name",
      "role": "Funktion",
      "org": "Organisation",
      "initiative": "Bewertete Initiative",
      "optional": "optional",
      "required": "erforderlich",
      "industry": "Branche",
      "industryOptions": {
        "lifeSciences": "Life Sciences",
        "consumer": "Konsumgüter",
        "industrial": "Industrie",
        "other": "Andere"
      },
      "size": "Unternehmensgrösse",
      "sizeOptions": {
        "lt50": "Unter 50 Mitarbeitende",
        "50to249": "50–249 Mitarbeitende",
        "250to999": "250–999 Mitarbeitende",
        "1000plus": "1000+ Mitarbeitende"
      },
      "choose": "Bitte wählen",
      "mode": "Modus wählen",
      "quickH": "Kurz-Check · 8 Punkte",
      "quickP": "Eine Leitfrage pro Dimension. Rund 5 Minuten. Kostenlos.",
      "deepH": "Vertiefte Bewertung · 24 Punkte",
      "deepP": "Drei Aussagen pro Dimension, mit Beispielen für jede Stufe. Rund 15 Minuten. Erfordert einen Zugangscode.",
      "code": "Zugangscode",
      "unlock": "Freischalten",
      "checking": "Wird geprüft…",
      "codeOk": "Zugangscode akzeptiert. Vertiefte Bewertung freigeschaltet.",
      "codeInvalid": "Dieser Zugangscode ist nicht gültig. Bitte prüfen Sie ihn und versuchen Sie es erneut.",
      "codeExpired": "Dieser Zugangscode ist abgelaufen. Bitte kontaktieren Sie facilit8 für einen neuen Code.",
      "codeError": "Der Code konnte gerade nicht geprüft werden. Bitte versuchen Sie es gleich noch einmal.",
      "codeLimited": "Zu viele Versuche. Bitte warten Sie einige Minuten und versuchen Sie es erneut.",
      "paidNote": "Die vertiefte Bewertung und der Teamvergleich werden von facilit8 moderiert.",
      "paidLink": "Nehmen Sie Kontakt auf, um mehr zu erfahren."
    },
    "assess": {
      "progress": "{a} von {b} beantwortet",
      "levelsHeading": "So lesen Sie die Skala",
      "level0": "So sieht 0 % aus",
      "level50": "So sieht 50 % aus",
      "level100": "So sieht 100 % aus",
      "continue": "Weiter",
      "missing": "Noch {n} Punkte offen. Sie sind markiert.",
      "missingOne": "Noch 1 Punkt offen. Er ist markiert.",
      "missingSetup": "Bitte wählen Sie Ihre Branche und Unternehmensgrösse.",
      "deepLocked": "Geben Sie einen gültigen Zugangscode ein, um die vertiefte Bewertung zu nutzen, oder wählen Sie den Kurz-Check."
    },
    "rank": {
      "heading": "Wo würden Sie beginnen?",
      "body": "Alle acht Dimensionen sind unverzichtbar, und bei diesen fünf ist Ihr Vertrauen am geringsten. Wo würden Sie beginnen? Bringen Sie sie in die Reihenfolge, in der Sie sie angehen würden.",
      "bodyTie": "Alle acht Dimensionen sind unverzichtbar, und bei diesen {n} ist Ihr Vertrauen am geringsten (einige haben denselben Wert). Wo würden Sie beginnen? Bringen Sie sie in die Reihenfolge, in der Sie sie angehen würden.",
      "hint": "Ziehen Sie die Zeilen oder nutzen Sie die Pfeiltasten, um die Reihenfolge festzulegen. Oben steht, wo Sie beginnen würden.",
      "drag": "{dim} verschieben",
      "up": "{dim} nach oben",
      "down": "{dim} nach unten",
      "moved": "{dim} ist jetzt auf Position {n}.",
      "confirm": "Das ist meine Reihenfolge — Ergebnisse anzeigen",
      "back": "Zurück zur Checkliste",
      "trust": "Vertrauen {n} %"
    },
    "results": {
      "empty": "Schliessen Sie die Checkliste ab, um Ihre Ergebnisse zu sehen.",
      "heading": "Ihr Vertrauensbarometer",
      "overall": "Gesamtvertrauen",
      "leadership": "Führung",
      "capabilities": "Fähigkeiten",
      "bands": [
        "Beheben",
        "Stärken",
        "Erhalten"
      ],
      "startHere": "Hier beginnen",
      "modeQuick": "Kurz-Check",
      "modeDeep": "Vertiefte Bewertung",
      "gapLabel": "Eine Frage zum Nachdenken",
      "gapNote": "Ihre Werte für Führung liegen deutlich über denen für Fähigkeiten. Würden Ihre Teams die Führung gleich bewerten?",
      "sustainHeading": "Erhalten, was funktioniert",
      "sustain": "Alle Dimensionen liegen bei 75 % oder höher. Ihr Fokus liegt darauf, zu erhalten, was funktioniert: Überprüfen Sie diese Werte, wenn sich die Arbeit verändert, und fragen Sie, ob andere in der Organisation sie gleich bewerten würden.",
      "startHeading": "Wo beginnen",
      "startIntro": "Die von Ihnen gewählte Reihenfolge, mit Ihrem Vertrauenswert für jede Dimension.",
      "coachingHeading": "Coaching-Fragen",
      "coachingFrame": "Fragen, die Sie gemeinsam erkunden können. Es gibt keine falschen Antworten.",
      "coachingMore": "Weitere Fragen zu Ihren anderen Bereichen sind Teil eines Gesprächs mit facilit8.",
      "aiHeading": "Wie KI helfen kann",
      "aiRiskLabel": "KI-Risiko im Blick behalten",
      "readMore": "Mehr lesen",
      "nextHeading": "Das nächste Gespräch",
      "nextBody": "Denken Sie an eine häufige Kundenbeschwerde. Welche dieser Dimensionen stehen dahinter? Beginnen Sie mit den beteiligten Fähigkeiten und fragen Sie dann, was die Führung ändern könnte, um es einfacher zu machen. Selten ist es nur eine Dimension. Oft sind es mehrere, manchmal alle acht. Genau dieses Gespräch kann facilit8 mit Ihnen führen.",
      "nextCta": "Mit facilit8 sprechen",
      "keepHeading": "Ergebnisse sichern",
      "keepBody": "Laden Sie ein PDF für sich herunter oder exportieren Sie eine Ergebnisdatei, damit eine Moderation die Sichtweisen mehrerer Führungskräfte vergleichen kann.",
      "pdf": "PDF herunterladen",
      "export": "Ergebnisdatei exportieren",
      "paidNote": "Die vertiefte Bewertung und der Teamvergleich werden von facilit8 moderiert.",
      "paidLink": "Nehmen Sie Kontakt auf, um mehr zu erfahren."
    },
    "interpret": {
      "heading": "Eine persönliche Interpretation von Dave",
      "consent": "Senden Sie mir meine Ergebnisse und eine persönliche einseitige Interpretation von Dave per E-Mail.",
      "email": "E-Mail",
      "name": "Name",
      "org": "Organisation",
      "optional": "optional",
      "marketing": "Senden Sie mir auch gelegentlich Impulse von facilit8.",
      "submit": "Anfrage senden",
      "sending": "Wird gesendet…",
      "okTitle": "Schritt 1 zu mehr Wirkung ist geschafft!",
      "ok": "Wenn Führungskräfte Vertrauen vor Leistung stellen, folgt die Leistung fast immer. Danke für Ihr Vertrauen. Dave sendet Ihnen Ihre Interpretation persönlich.",
      "turnaround": "Sie erhalten sie innerhalb von {t}.",
      "errEmail": "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
      "err": "Senden fehlgeschlagen. Bitte versuchen Sie es erneut oder exportieren Sie Ihre Ergebnisdatei und senden Sie sie an david@facilit8.org.",
      "limited": "Zu viele Anfragen. Bitte warten Sie einige Minuten und versuchen Sie es erneut.",
      "privacy": "Was gesendet wird und warum, erklärt die",
      "privacyLink": "Datenschutzerklärung"
    },
    "baseline": {
      "heading": "Swiss Impact Baseline",
      "consent": "Meine anonymen Werte zur facilit8 Swiss Impact Baseline hinzufügen.",
      "detail": "Gespeichert werden nur Datum, Sprache, Modus, Branche, Unternehmensgrösse, Ihre 8 Vertrauenswerte und Ihre Reihenfolge. Kein Name, keine E-Mail, keine Organisation und keine Initiative.",
      "submit": "Werte hinzufügen",
      "sending": "Wird gesendet…",
      "ok": "Vielen Dank. Ihre anonymen Werte wurden hinzugefügt.",
      "err": "Ihre Werte konnten nicht hinzugefügt werden. Bitte versuchen Sie es später erneut.",
      "limited": "Zu viele Anfragen. Bitte warten Sie einige Minuten und versuchen Sie es erneut."
    },
    "team": {
      "heading": "Mehrere Führungskräfte vergleichen",
      "body": "Laden Sie die exportierten Ergebnisdateien aller Führungskräfte. Das Tool zeigt das durchschnittliche Vertrauen pro Dimension, wie weit die Einschätzungen auseinanderliegen und wo die Führungskräfte beginnen würden.",
      "gateHeading": "Zugang für die Moderation",
      "gateBody": "Der Teamvergleich wird von facilit8 moderiert. Geben Sie Ihren Zugangscode ein, um fortzufahren.",
      "load": "Ergebnisdateien laden",
      "clear": "Leeren",
      "bad": "{f} ist keine gültige Ergebnisdatei.",
      "who": "{n} Personen",
      "whoOne": "1 Person",
      "leader": "Führungskraft {x}",
      "showNames": "Namen anzeigen",
      "noName": "(kein Name)",
      "th": [
        "Dimension",
        "Durchschnittliches Vertrauen",
        "Spanne (tiefster bis höchster Wert)",
        "In den Top 3",
        "Signal"
      ],
      "flag": "Unterschiedliche Sichtweisen",
      "top3": "{n} von {m}",
      "spreadNote": "Eine Spanne von 50 Punkten oder mehr zeigt, dass die Führungskräfte diese Dimension sehr unterschiedlich sehen. Dieses Gespräch ist oft wichtiger als der Wert selbst.",
      "startHeading": "Wo das Team beginnen würde",
      "startIntro": "Geordnet danach, wie viele Führungskräfte eine Dimension in ihre Top 3 gesetzt haben, dann nach durchschnittlichem Vertrauen (tiefster Wert zuerst).",
      "startNone": "Keine Führungskraft hat eine Dimension in ihre Top 3 gesetzt: Alle Dimensionen lagen bei allen bei 75 % oder höher.",
      "votes": "bei {n} von {m} in den Top 3 · Vertrauen im Schnitt {a} %"
    },
    "card": {
      "eyebrow": "Kostenloses Tool · Für Sponsoren & Führungsteams",
      "title": "Die facilit8 Impact-Checkliste",
      "sub": "KI kann Ihre Prozesse diagnostizieren. Nur Menschen können das Vertrauen aufbauen, das es braucht, um Wirkung zu erzielen. Bewerten Sie acht Dimensionen des Vertrauens in rund fünf Minuten und sehen Sie, wo Sie beginnen.",
      "tags": [
        "Vertrauen",
        "Führung",
        "5 Minuten"
      ]
    }
  },
  /* impact:end */
}

  }; /* end TRANSLATIONS */

  /* ── Dot-notation lookup with fallback to English ── */
  function t(key) {
    var parts = key.split('.');
    var val = TRANSLATIONS[activeLang];
    for (var i = 0; i < parts.length; i++) {
      if (val == null) break;
      val = val[parts[i]];
    }
    if (val == null || val === undefined) {
      // fallback to English
      val = TRANSLATIONS['en'];
      for (var j = 0; j < parts.length; j++) {
        if (val == null) break;
        val = val[parts[j]];
      }
    }
    return (val == null || val === undefined) ? key : val;
  }

  /* ── Switch language ── */
  function setLang(lang) {
    if (lang !== 'en' && lang !== 'de') return;
    localStorage.setItem(LANG_KEY, lang);
    // Update URL param without page reload to keep hash/page state
    var url = new URL(window.location.href);
    if (lang === 'en') {
      url.searchParams.delete('lang');
    } else {
      url.searchParams.set('lang', lang);
    }
    window.history.replaceState({}, '', url.toString());
    activeLang = lang;
    // Signal React to re-render via a custom event
    window.dispatchEvent(new CustomEvent('f8langchange', { detail: { lang: lang } }));
  }

  /* ── Expose public API ── */
  window.F8_I18N = {
    get lang() { return activeLang; },
    t: t,
    setLang: setLang,
    browserDe: browserDe,
    translations: TRANSLATIONS
  };

})();
