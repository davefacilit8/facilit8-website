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
        "handles": "Contact form, meeting bookings, playbook requests, email, CRM records and — with your consent — site analytics.",
        "where": "EU data centre (Frankfurt). The facilit8 HubSpot account is hosted in the EU region."
      },
      "netlify": {
        "name": "Netlify, Inc.",
        "handles": "Hosts and serves this website. Standard server logs, including IP address, for security and reliability.",
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
    "lastUpdated": "Last updated: August 2026."
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
        "handles": "Kontaktformular, Terminbuchungen, Playbook-Anfragen, E-Mail, CRM-Daten und — mit Ihrer Einwilligung — Website-Analyse.",
        "where": "EU-Rechenzentrum (Frankfurt). Das HubSpot-Konto von facilit8 wird in der EU-Region gehostet."
      },
      "netlify": {
        "name": "Netlify, Inc.",
        "handles": "Hostet und liefert diese Website aus. Übliche Server-Logs einschliesslich IP-Adresse für Sicherheit und Betrieb.",
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
    "lastUpdated": "Zuletzt aktualisiert: August 2026."
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
