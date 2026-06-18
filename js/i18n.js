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
  nav: { home:'Home', services:'Services', caseStudies:'Case Studies', playbooks:'Playbooks', keystone:'Project Keystone', about:'About', contact:'Contact', bookMeeting:'Book a Meeting' },
  footer: { tagline:'Commercial transformation, delivered hands-on, until it sticks.', servicesHeading:'Services', companyHeading:'Company', basedInHeading:'Based in', basedInValue:'Switzerland', workingInternationally:'Working internationally', languages:'English & Deutsch', copyright:'© 2026 facilit8 — David Howes', location:'Switzerland — DACH & International', cookiesPrivacy:'Cookies & Privacy', bookMeeting:'Book a meeting' },
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
    lastUpdated:'Last updated: May 2026.',
    categories: {
      essential: { name:'Essential', description:'Required for the site to work correctly. These cannot be disabled.' },
      functional: { name:'Functional', description:'Enables enhanced features. Without these, parts of the site (such as the meeting booking calendar and contact form) will not be available.' },
      analytics: { name:'Analytics & Marketing', description:'Helps understand how visitors use the site and, if enabled, supports HubSpot click and visit tracking.' }
    }
  },
  home: {
    hero: { eyebrow:'Commercial Transformation', headline1:'The technology is there.', headline2:'The results should be too.', sub:'facilit8 helps businesses unlock the commercial value of technology — through hands-on transformation that sticks.', primaryCta:'Book a Meeting', secondaryCta:'About facilit8' },
    stats: [{ label:'Years of commercial transformation' },{ label:'Projects delivered' },{ label:'& international' }],
    problem: { eyebrow:'The problem', heading:'Most businesses have the tools. Few get the results.', body:"CRM, sales automation, revenue analytics, customer data platforms — the investment is real. So why aren't the results following? Because technology alone doesn't transform commercial performance. The gap between capability and outcomes comes down to how your people, processes, and systems actually work together. And that's where most programmes fall short." },
    whatWeDo: { eyebrow:'What we do', heading:'We close the gap between technology and commercial performance.', body1:'facilit8 works alongside your commercial teams — in your business, not above it — to turn technology investment into measurable results. From go-to-market design to sales and revenue operations, we bring senior expertise and practical delivery to every engagement.', body2:'We work with mid-market businesses, enterprise organisations, PE-backed companies, and scale-ups that are ready to make their commercial systems perform.' },
    howWeWork: { eyebrow:'How we work', heading:'Three things that make every engagement different.', card1Title:'Hands-on delivery', card1Body:"We don't hand over a deck and walk away. We work inside your organisation until the change is real and lasting.", card2Title:'Senior expertise', card2Body:'You work directly with experienced practitioners — not junior consultants managed from a distance.', card3Title:'Outcomes, not outputs', card3Body:'Every engagement is designed around measurable commercial results, not activity metrics or deliverables for their own sake.' },
    cta: { heading:'Ready to make your technology investments pay?', body:"Let's have a straightforward conversation about where you are and what's possible.", cta:'Book a Meeting' }
  },
  services: {
    hero: { eyebrow:'Services', headline:'Commercial performance, transformed.', sub:'We work across four interconnected areas — because lasting commercial change rarely comes from pulling a single lever.' },
    intro:"Technology has changed how businesses grow, sell, and serve customers. But realising that potential requires more than implementation. It requires the right strategy, the right operating model, and people who can make change happen inside a real organisation. That's what facilit8 does — hands-on, working alongside your teams from diagnosis through to measurable results.",
    s1heading:'Commercial Transformation', s1body:"End-to-end transformation of your commercial engine. Growth stagnation rarely has a single cause. When revenue stalls, the problem is usually systemic — disconnected teams, misaligned incentives, unclear ownership, and processes that haven't kept pace with the business.", s1b1:'Commercial diagnostics and performance reviews', s1b2:'Operating model redesign for sales and marketing', s1b3:'Change programmes with embedded delivery support', s1b4:'Capability building and team enablement',
    s2heading:'Technology Enablement', s2body:'Making your technology investment actually pay off. Most businesses have invested heavily in commercial technology — CRM, sales engagement platforms, customer data tools, marketing automation. Few are extracting full value from them.', s2b1:'CRM optimisation and adoption programmes', s2b2:'Sales and marketing technology audits', s2b3:'Tool consolidation and stack redesign', s2b4:'Integration of data, workflow, and reporting',
    s3heading:'Go-to-Market Strategy', s3body:'A sharper, more deliberate path to market. Entering a new market, launching a new product, or rethinking how you compete requires more than a slide deck.', s3b1:'Market segmentation and customer targeting', s3b2:'Value proposition development and messaging', s3b3:'Channel and partnership strategy', s3b4:'Launch planning and commercial readiness',
    s4heading:'Revenue Operations', s4body:'Aligning your commercial systems for predictable growth. When sales, marketing, and customer success operate in silos — with different data, different processes, and different definitions of success — revenue becomes unpredictable and hard to scale.', s4b1:'RevOps diagnostic and maturity assessment', s4b2:'Pipeline and forecasting process design', s4b3:'CRM data governance and reporting architecture', s4b4:'Cross-functional alignment and operating rhythms',
    howWeEngage: { eyebrow:'How we engage', heading:'Projects and partnerships — we work the way that suits you.', card1Title:'Project delivery', card1Body:'A defined programme with clear scope, milestones, and deliverables.', card2Title:'Retained partnership', card2Body:'Ongoing senior commercial and strategic support, on call without the overhead of a full-time hire.' },
    cta: { heading:"Not sure which service fits your situation?", body:"Most engagements start with a conversation. Tell us where you are — we'll be direct about whether and how we can help.", cta:'Book a Conversation' }
  },
  about: {
    hero: { eyebrow:'About', headline:'Strategy without implementation is just a document.', sub:'Commercial transformation, delivered hands-on, until it sticks.' },
    problem: { eyebrow:'The problem with how it usually works', lead:'Most consulting follows a familiar pattern.', body:'Senior people diagnose. Junior people deliver. A deck gets presented. A handover happens. And then the organisation is left to make it real — alone.', highlight:'facilit8 was created to close that gap.' },
    founder: { eyebrow:'Founder', heading:'Why I do what I do', body1:'After two decades of commercial transformation — at Capgemini, SAP, and Implement Consulting Group, and on the ground at companies like Nestlé, Clariant, and Thomas Cook — I reached a point where the most honest question I could ask myself was: where do I actually create the most value?', body2:'Over a hundred projects. B2B manufacturing, healthcare, and beyond. That experience shapes everything about how facilit8 works.', highlight:'Because transformation succeeds when people succeed.', credit:'David Howes — Founder, facilit8' },
    beliefs: { eyebrow:'Three things I believe', b1title:'Clarity before action', b1body:'Every engagement starts with an honest diagnosis — a clear-eyed view of your specific situation.', b2title:'Implementation is the job', b2body:'Making strategy real inside a real organisation, with real people, under real pressure — that is where the work happens.', b3title:'Transformation succeeds when people succeed', b3body:'Change does not happen because people understand the logic. It happens because people feel the purpose.' },
    cta: { heading:'A conversation costs nothing.', body:'If you are facing a commercial challenge — whether fully formed or still finding its shape — I am happy to talk it through.', cta:'Book a Conversation with David' }
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
    comingSoon: { chip:'Coming soon', getNotified:"Get notified when it's published", backLink:'Back to all playbooks' },
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
  keystone: {
    hero: { eyebrow:'Project Keystone', headline:'What needs to be true for an SME to operate at full organisational potential?', sub1:'Most businesses have more potential than they are realising. Not because of poor leadership. Not because of bad people. Because of the invisible gap between what an organisation has — and what it has actually managed to make work together.', sub2:'Project Keystone is a practitioner-built framework for finding that gap. And compounding past it.', cta:'Request a conversation' },
    diagStrip: { eyebrow:'The question that opens everything', question:'"What percentage of your organisation\'s potential do you think you are currently realising?"', note:"Nobody answers 100%. The gap between their answer and 100% is the entire business case — made by them, before a single slide has been shown. For an SME, where there is no resource to waste, that gap has a real cost, every quarter." },
    compoundStrategies: { eyebrow:'Start here', heading:'Most approaches help businesses add. Project Keystone helps SME businesses compound unrealised potential.', lead:'There is a fundamental difference between improving things one at a time — and choosing a thread that runs through everything simultaneously.', body1:'A Compound Strategy is that thread — the Rote Faden. It connects decisions at the Operating level to the forces that determine whether those decisions actually deliver their expected value: trust, psychological safety, shared ownership. These are the Quantum forces present in every project, every leadership team, every CEO\'s need for lasting change.', body2:'Compound Strategies are rare precisely because most organisations are structured to prevent them. Every function optimises for its own results. Every initiative competes for attention. The thread that could run through everything is cut before it is ever chosen. Keystone is designed to find and hold that thread.', body3:'The result: a series of individual improvements that build on each other, quarter after quarter, rather than resetting to zero each time a new priority arrives.', pullQuote:'"Most approaches help businesses add. Project Keystone helps SME businesses compound unrealised potential."', whatMakesHeading:'What makes a strategy compound?', whatMakesBody1:'The most powerful strategies improve an Operating Enabler and strengthen a Quantum Enabler simultaneously. One move. Two layers. Multiplying effect.', whatMakesBody2:'A hiring decision that brings in capability and models the psychological safety the organisation is trying to build. A customer feedback process that improves service and strengthens Trust Capital in the leadership team. A technology rollout that unlocks efficiency and demonstrates Purpose Coherence.', whatMakesBody3:'These are not accidents. They are designed. And designing them requires seeing both layers at once.', chartEyebrow:'Adding vs. Compounding — over 8 quarters' },
    quantumEnablers: { eyebrow:"Layer 2 — The five forces your P&L doesn't capture", heading:'What the business is. Not just what it does.', lead:'Every business has five invisible forces that determine whether its Operating decisions generate enduring returns — or just noise. They are harder to measure than revenue. Impossible to fake when leaders leave the room. And the ultimate determinant of whether your organisation compounds or fragments under pressure.', intro:'We call them the Quantum Enablers.', pullQuote:'"Operating Enablers are the stones in the arch. Quantum Enablers are the forces that determine whether the arch stands for a year — or a century."', orbNote:'The five Quantum Enablers are revealed in the first conversation — not before it.', resistHeading:'They resist easy measurement', resistBody1:'Ask a leadership team to score psychological safety in a room where psychological safety is low — and you will get scores that reflect the lack of safety, not the reality. This is the observer effect applied to culture.', resistBody2:'A room where Governance & Ownership is scored at 8 because scoring it at 4 feels like blame — that room has just shown you its psychological safety level more accurately than any survey instrument could.', resistBody3:'Keystone reads these Quantum Enablers indirectly — through the pattern of Operating Enabler scores, the quality of the conversation, and the honesty of trade-off choices. The pattern is always honest, even when the scores are not.' },
    operatingEnablers: { eyebrow:'Layer 1 — What your business does', heading:'Ten levers. Most projects pull one at a time.', lead:'The Keystone framework maps ten Operating Enablers across three clusters: Commercial Operations, Transformation Strategy, and Customer Experience.', body1:'Each enabler sits on a maturity continuum — from a named low state to a named high state. Together they describe the full operating landscape of an SME: what the business does, how well it does it, and where the unrealised potential is concentrated.', body2:'Most projects address one or two of these at a time. Keystone works across all ten simultaneously — showing a leader which combination is holding the most energy in their specific organisation, and which single thread, pulled now, would release the most.', cluster1label:'Cluster 1', cluster1title:'Commercial Operations', cluster1body:'How the business generates and retains revenue — the engine room of commercial performance.', cluster2label:'Cluster 2', cluster2title:'Transformation Strategy', cluster2body:'How the business changes — its capacity to adapt, invest, and execute against a strategic direction.', cluster3label:'Cluster 3', cluster3title:'Customer Experience', cluster3body:'How the business serves — the interface between organisational capability and customer outcome.', clusterNote:'The individual enablers within each cluster are shared in the first session — not before it.' },
    lego: { eyebrow:'Worth watching', heading:'Complexity is the enemy of compounding.', body1:'Although not an SME, this brings to life what good looks like — what Project Keystone is all about.', body2:'LEGO lost their operating thread. They over-expanded, created complexity they could not manage, and compounded in the wrong direction. Getting back on track required exactly the kind of honest, cross-functional reckoning that Keystone is designed to surface.', tip:"Tip: start at 4 minutes to save a little time — that's where it gets to the substance.", videoCaption:'Opens on the IMD website.' },
    pulseCheck: { eyebrow:'The ritual', heading:'The question we ask every CEO before we design a single session.', question:'"If I asked each member of your leadership team to score your business honestly — completely anonymously — how different do you think their answers would be from what they would say in the room together?"', questionNote:'The length of the pause before the answer is itself insightful.', body1:'The Keystone Pulse Check is a quarterly habit that efficiently measures where your organisation sits across all 15 enablers — and surfaces the gaps that are not being talked about in normal business reviews. Where a deeper dive is needed, it provides the diagnostic foundation for laser-focused action.', body2:'Not because your leaders do not know. But because the conditions for honest conversation do not always exist. And when they do not, even the most capable leadership team produces consensus rather than genuine strategy.', body3:'The Keystone Pulse Check begins with a private conversation with the CEO or Owner. It results in a leadership team that has sat together, scored honestly, made real trade-offs — and left with Compound Strategies they collectively own.', pullQuote:'"An arch does not need every stone to be perfect. It needs the right stone in the right place — and a room honest enough to collectively agree where."', stagesHeading:'Three organisational stages. One direction.', stage1num:'01', stage1label:'Activation', stage2num:'02', stage2label:'Traction', stage3num:'03', stage3label:'Coherence', stage4num:'04', stage4label:'Compound Returns' },
    aiLens: { eyebrow:'The AI lens — across all 15 enablers', heading:'AI is an accelerant. Not a keystone.', lead:'AI accelerates whatever fitness level your organisation already has. It does not create fitness. It does not create coherence. It does not create trust.', body1:'A coherent organisation uses AI as part of its Compound Strategies — doing more of what is already working, faster and at greater scale. A fragmented organisation uses AI to accelerate its own distrust, discord, and decoherence.', body2:'The question for every SME right now is not whether to adopt AI. That question has already been answered. The question is: what does your organisation need so that AI makes you stronger rather than faster at the wrong things?', pullQuote:'"A coherent organisation uses AI to compound. A fragmented organisation uses AI to accelerate its own disaster."', path1label:'Coherent organisation + AI', path1title:'Compound returns', path1body:'Operating and Quantum Enablers in alignment. AI amplifies what is already working — at speed and at scale.', path2label:'Fragmented organisation + AI', path2title:'Accelerated decoherence', path2body:'Distrust, misalignment, and unclear ownership — moving faster in the wrong direction.', body3:'Project Keystone applies an AI lens across all 15 enablers — not as a separate module, but as a filter woven through the entire framework. For each enabler, the question is not "are you using AI here?" but "what does high fitness look like in an AI-enabled world — and what happens when AI arrives before that fitness is there?"' },
    cta: { sub:'Are you adding — or compounding?', heading:'Project Keystone begins with one question and a conversation.', body:'What comes next depends on what the room reveals.', note:'Project Keystone is available to a small number of organisations. It is not a programme you buy. It is a conversation you request.', cta:'Request a conversation' }
  }
},

/* =========================================================
   GERMAN
   ========================================================= */
de: {
  nav: { home:'Startseite', services:'Leistungen', caseStudies:'Case Studies', playbooks:'Playbooks', keystone:'Project Keystone', about:'Über uns', contact:'Kontakt', bookMeeting:'Termin buchen' },
  footer: { tagline:'Commercial Transformation — praxisnah umgesetzt, bis sie wirklich verankert ist.', servicesHeading:'Leistungen', companyHeading:'Unternehmen', basedInHeading:'Standort', basedInValue:'Schweiz', workingInternationally:'International tätig', languages:'English & Deutsch', copyright:'© 2026 facilit8 — David Howes', location:'Schweiz — DACH & International', cookiesPrivacy:'Cookies & Datenschutz', bookMeeting:'Termin buchen' },
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
    lastUpdated:'Zuletzt aktualisiert: Mai 2026.',
    categories: {
      essential: { name:'Notwendig', description:'Erforderlich, damit die Website korrekt funktioniert. Diese können nicht deaktiviert werden.' },
      functional: { name:'Funktional', description:'Ermöglicht erweiterte Funktionen. Ohne diese sind Teile der Website (wie der Meeting-Kalender und das Kontaktformular) nicht verfügbar.' },
      analytics: { name:'Analyse & Marketing', description:'Hilft zu verstehen, wie Besucher die Website nutzen, und unterstützt — sofern aktiviert — das HubSpot-Klick- und Besuchstracking.' }
    }
  },
  home: {
    hero: { eyebrow:'Commercial Transformation', headline1:'Die Technologie ist vorhanden.', headline2:'Die Ergebnisse sollten es auch sein.', sub:'facilit8 hilft Unternehmen, den kommerziellen Wert ihrer Technologie zu erschliessen — durch praxisnahe Transformation, die wirklich bleibt.', primaryCta:'Termin buchen', secondaryCta:'Über facilit8' },
    stats: [{ label:'Jahre Commercial Transformation' },{ label:'Projekte umgesetzt' },{ label:'& international' }],
    problem: { eyebrow:'Das Problem', heading:'Die meisten Unternehmen haben die Werkzeuge. Nur wenige erzielen die Ergebnisse.', body:'CRM, Vertriebsautomatisierung, Revenue Analytics, Customer-Data-Plattformen — die Investitionen sind real. Warum folgen die Ergebnisse nicht? Weil Technologie allein keine kommerzielle Performance transformiert. Die Lücke zwischen Möglichkeit und Ergebnis hängt davon ab, wie Ihre Menschen, Prozesse und Systeme tatsächlich zusammenarbeiten. Und genau dort scheitern die meisten Programme.' },
    whatWeDo: { eyebrow:'Was wir tun', heading:'Wir schliessen die Lücke zwischen Technologie und kommerzieller Performance.', body1:'facilit8 arbeitet direkt an der Seite Ihrer Commercial Teams — in Ihrem Unternehmen, nicht darüber — um Technologieinvestitionen in messbare Ergebnisse zu verwandeln. Von der Go-to-Market-Strategie bis zu Sales und Revenue Operations bringen wir Senior-Expertise und praxisnahe Umsetzung in jedes Engagement.', body2:'Wir arbeiten mit mittelständischen Unternehmen, Grossunternehmen, PE-gestützten Firmen und Wachstumsunternehmen, die ihre kommerziellen Systeme zum Laufen bringen wollen.' },
    howWeWork: { eyebrow:'Wie wir arbeiten', heading:'Drei Dinge, die jedes Engagement besonders machen.', card1Title:'Praxisnahe Umsetzung', card1Body:'Wir übergeben keine Präsentation und gehen. Wir arbeiten in Ihrem Unternehmen, bis der Wandel real und dauerhaft ist.', card2Title:'Senior-Expertise', card2Body:'Sie arbeiten direkt mit erfahrenen Praktikern — nicht mit Junior-Beratern, die aus der Distanz gemanagt werden.', card3Title:'Wirkung, nicht Aktivität', card3Body:'Jedes Engagement ist auf messbare kommerzielle Ergebnisse ausgerichtet — nicht auf Aktivitätsmetriken oder Deliverables um ihrer selbst willen.' },
    cta: { heading:'Bereit, Ihre Technologieinvestitionen rentabel zu machen?', body:'Lassen Sie uns ein offenes Gespräch darüber führen, wo Sie stehen und was möglich ist.', cta:'Termin buchen' }
  },
  services: {
    hero: { eyebrow:'Leistungen', headline:'Kommerzielle Performance — transformiert.', sub:'Wir arbeiten in vier miteinander verbundenen Bereichen — weil dauerhafter kommerzieller Wandel selten durch das Ziehen an einem einzigen Hebel entsteht.' },
    intro:'Technologie hat verändert, wie Unternehmen wachsen, verkaufen und Kunden betreuen. Doch dieses Potenzial zu realisieren erfordert mehr als Implementierung. Es braucht die richtige Strategie, das richtige Betriebsmodell und Menschen, die Wandel in einem realen Unternehmen bewirken können. Genau das tut facilit8 — praxisnah, direkt an der Seite Ihrer Teams, von der Diagnose bis zu messbaren Ergebnissen.',
    s1heading:'Commercial Transformation', s1body:'Umfassende Transformation Ihrer kommerziellen Leistungsfähigkeit. Wachstumsstagnation hat selten eine einzige Ursache. Wenn der Umsatz stagniert, ist das Problem meist systemisch — getrennte Teams, falsch ausgerichtete Anreize, unklare Verantwortlichkeiten und Prozesse, die nicht mit dem Unternehmen Schritt gehalten haben.', s1b1:'Kommerzielle Diagnosen und Performance-Reviews', s1b2:'Neugestaltung des Operating Models für Vertrieb und Marketing', s1b3:'Change-Programme mit eingebetteter Umsetzungsunterstützung', s1b4:'Capability-Aufbau und Team-Enablement',
    s2heading:'Technology Enablement', s2body:'Ihre Technologieinvestition tatsächlich rentabel machen. Die meisten Unternehmen haben stark in kommerzielle Technologie investiert — CRM, Sales-Engagement-Plattformen, Customer-Data-Tools, Marketing-Automatisierung. Nur wenige schöpfen deren vollen Wert aus.', s2b1:'CRM-Optimierung und Adoptionsprogramme', s2b2:'Technologie-Audits für Vertrieb und Marketing', s2b3:'Tool-Konsolidierung und Stack-Neugestaltung', s2b4:'Integration von Daten, Workflows und Reporting',
    s3heading:'Go-to-Market Strategy', s3body:'Ein schärferer, zielgerichteter Weg zum Markt. Der Eintritt in einen neuen Markt, die Einführung eines neuen Produkts oder die Überprüfung Ihrer Wettbewerbspositionierung erfordert mehr als eine Präsentation.', s3b1:'Marktsegmentierung und Kundenzielgruppenauswahl', s3b2:'Entwicklung von Value Propositions und Messaging', s3b3:'Kanal- und Partnerstrategie', s3b4:'Launch-Planung und kommerzielle Bereitschaft',
    s4heading:'Revenue Operations', s4body:'Ihre kommerziellen Systeme auf vorhersehbares Wachstum ausrichten. Wenn Vertrieb, Marketing und Customer Success in Silos agieren — mit unterschiedlichen Daten, Prozessen und Erfolgsdefinitionen — wird Umsatz unvorhersehbar und schwer skalierbar.', s4b1:'RevOps-Diagnose und Reifegradbeurteilung', s4b2:'Pipeline- und Forecasting-Prozessgestaltung', s4b3:'CRM-Daten-Governance und Reporting-Architektur', s4b4:'Funktionsübergreifende Ausrichtung und Operating Rhythms',
    howWeEngage: { eyebrow:'Wie wir zusammenarbeiten', heading:'Projekte und Partnerschaften — wir arbeiten so, wie es zu Ihnen passt.', card1Title:'Projektbasiert', card1Body:'Ein definiertes Programm mit klarem Umfang, Meilensteinen und Liefergegenständen.', card2Title:'Laufende Partnerschaft', card2Body:'Fortlaufende Senior-Unterstützung in kommerziellen und strategischen Fragen — verfügbar ohne den Overhead einer Vollzeitstelle.' },
    cta: { heading:'Nicht sicher, welche Leistung zu Ihrer Situation passt?', body:'Die meisten Engagements beginnen mit einem Gespräch. Schildern Sie uns Ihre Situation — wir sagen Ihnen direkt, ob und wie wir helfen können.', cta:'Gespräch vereinbaren' }
  },
  about: {
    hero: { eyebrow:'Über uns', headline:'Strategie ohne Umsetzung ist nur ein Dokument.', sub:'Commercial Transformation — praxisnah umgesetzt, bis sie wirklich verankert ist.' },
    problem: { eyebrow:'Das Problem mit der üblichen Vorgehensweise', lead:'Die meisten Beratungsprojekte folgen einem bekannten Muster.', body:'Senior-Leute stellen die Diagnose. Junior-Leute setzen um. Eine Präsentation wird gehalten. Eine Übergabe findet statt. Und dann wird die Organisation allein gelassen, um es in die Realität umzusetzen.', highlight:'facilit8 wurde gegründet, um diese Lücke zu schliessen.' },
    founder: { eyebrow:'Gründer', heading:'Warum ich tue, was ich tue', body1:'Nach zwei Jahrzehnten Commercial Transformation — bei Capgemini, SAP und Implement Consulting Group sowie direkt in Unternehmen wie Nestlé, Clariant und Thomas Cook — kam ich an einen Punkt, wo die ehrlichste Frage, die ich mir selbst stellen konnte, lautete: Wo schaffe ich eigentlich den grössten Mehrwert?', body2:'Über hundert Projekte. B2B-Fertigung, Gesundheitswesen und darüber hinaus. Diese Erfahrung prägt alles, wie facilit8 arbeitet.', highlight:'Denn Transformation gelingt, wenn Menschen gelingen.', credit:'David Howes — Gründer, facilit8' },
    beliefs: { eyebrow:'Drei Überzeugungen', b1title:'Klarheit vor Handlung', b1body:'Jedes Engagement beginnt mit einer ehrlichen Diagnose — einer klaren Sicht auf Ihre spezifische Situation.', b2title:'Umsetzung ist die eigentliche Arbeit', b2body:'Strategie in einem realen Unternehmen, mit echten Menschen, unter realem Druck Wirklichkeit werden zu lassen — das ist der Kern unserer Arbeit.', b3title:'Transformation gelingt, wenn Menschen gelingen', b3body:'Wandel geschieht nicht, weil Menschen die Logik verstehen. Er geschieht, weil Menschen den Sinn spüren.' },
    cta: { heading:'Ein Gespräch kostet nichts.', body:'Wenn Sie vor einer kommerziellen Herausforderung stehen — ob bereits klar formuliert oder noch im Entstehen — spreche ich gerne mit Ihnen.', cta:'Gespräch mit David vereinbaren' }
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
    comingSoon: { chip:'Demnächst', getNotified:'Benachrichtigung bei Veröffentlichung', backLink:'Zurück zu allen Playbooks' },
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
  keystone: {
    hero: { eyebrow:'Project Keystone', headline:'Was muss wahr sein, damit ein KMU sein volles organisatorisches Potenzial entfalten kann?', sub1:'Die meisten Unternehmen haben mehr Potenzial, als sie realisieren. Nicht wegen schwacher Führung. Nicht wegen schlechter Menschen. Wegen der unsichtbaren Lücke zwischen dem, was eine Organisation hat — und dem, was sie tatsächlich zum Zusammenwirken gebracht hat.', sub2:'Project Keystone ist ein von Praktikern entwickeltes Framework, um diese Lücke zu finden. Und über sie hinaus zu wachsen.', cta:'Gespräch anfragen' },
    diagStrip: { eyebrow:'Die Frage, die alles öffnet', question:'"Welchen Prozentsatz des Potenzials Ihrer Organisation glauben Sie, dass Sie aktuell realisieren?"', note:'Niemand antwortet mit 100 %. Die Lücke zwischen ihrer Antwort und 100 % ist die gesamte Business-Begründung — von ihnen selbst formuliert, bevor eine einzige Folie gezeigt wurde. Für ein KMU, wo keine Ressource verschwendet werden darf, hat diese Lücke jedes Quartal echte Kosten.' },
    compoundStrategies: { eyebrow:'Hier beginnen', heading:'Die meisten Ansätze helfen Unternehmen, zu addieren. Project Keystone hilft KMU, ungenutztes Potenzial zu kompoundieren.', lead:'Es gibt einen grundlegenden Unterschied zwischen dem Verbessern von Dingen nacheinander — und dem Wählen eines Fadens, der durch alles gleichzeitig läuft.', body1:'Eine Compound Strategy ist dieser Faden — der Rote Faden. Er verbindet Entscheidungen auf der Operating-Ebene mit den Kräften, die bestimmen, ob diese Entscheidungen tatsächlich den erwarteten Wert liefern: Vertrauen, psychologische Sicherheit, gemeinsame Verantwortung. Das sind die Quantum-Kräfte, die in jedem Projekt, jedem Leadership-Team und jedem CEO-Bedürfnis nach dauerhaftem Wandel präsent sind.', body2:'Compound Strategies sind selten, weil die meisten Organisationen so strukturiert sind, dass sie sie verhindern. Jede Funktion optimiert für ihre eigenen Ergebnisse. Jede Initiative konkurriert um Aufmerksamkeit. Der Faden, der durch alles laufen könnte, wird durchtrennt, bevor er je gewählt wird. Keystone ist dafür konzipiert, diesen Faden zu finden und zu halten.', body3:'Das Ergebnis: eine Reihe individueller Verbesserungen, die Quartal für Quartal aufeinander aufbauen — anstatt bei jeder neuen Priorität auf null zurückzusetzen.', pullQuote:'"Die meisten Ansätze helfen Unternehmen, zu addieren. Project Keystone hilft KMU, ungenutztes Potenzial zu kompoundieren."', whatMakesHeading:'Was macht eine Strategie zur Compound Strategy?', whatMakesBody1:'Die wirkungsvollsten Strategien verbessern einen Operating Enabler und stärken gleichzeitig einen Quantum Enabler. Ein Schritt. Zwei Ebenen. Multiplizierende Wirkung.', whatMakesBody2:'Eine Einstellungsentscheidung, die Fähigkeit einbringt und gleichzeitig die psychologische Sicherheit modelliert, die die Organisation aufzubauen versucht. Ein Kundenfeedbackprozess, der den Service verbessert und Trust Capital im Leadership-Team stärkt. Ein Technologie-Rollout, der Effizienz freisetzt und Purpose Coherence demonstriert.', whatMakesBody3:'Das sind keine Zufälle. Sie werden gestaltet. Und um sie zu gestalten, muss man beide Ebenen gleichzeitig sehen.', chartEyebrow:'Addieren vs. Kompoundieren — über 8 Quartale' },
    quantumEnablers: { eyebrow:'Ebene 2 — Die fünf Kräfte, die Ihre GuV nicht erfasst', heading:'Was das Unternehmen ist. Nicht nur, was es tut.', lead:'Jedes Unternehmen hat fünf unsichtbare Kräfte, die bestimmen, ob seine Operating-Entscheidungen dauerhaften Mehrwert erzeugen — oder nur Lärm. Sie sind schwerer zu messen als Umsatz. Unmöglich zu imitieren, wenn Führungskräfte den Raum verlassen. Und der ultimative Bestimmungsfaktor dafür, ob Ihre Organisation unter Druck wächst oder fragmentiert.', intro:'Wir nennen sie die Quantum Enablers.', pullQuote:'"Operating Enablers sind die Steine im Bogen. Quantum Enablers sind die Kräfte, die bestimmen, ob der Bogen ein Jahr hält — oder ein Jahrhundert."', orbNote:'Die fünf Quantum Enablers werden im ersten Gespräch enthüllt — nicht davor.', resistHeading:'Sie entziehen sich einfacher Messbarkeit', resistBody1:'Wenn Sie ein Leadership-Team bitten, psychologische Sicherheit in einem Raum zu bewerten, in dem psychologische Sicherheit niedrig ist — erhalten Sie Bewertungen, die den Mangel an Sicherheit widerspiegeln, nicht die Realität. Das ist der Beobachtereffekt angewendet auf Unternehmenskultur.', resistBody2:'Ein Raum, in dem Governance & Ownership mit 8 bewertet wird, weil eine Bewertung mit 4 wie Schuldzuweisung wirken würde — dieser Raum hat Ihnen gerade sein Niveau an psychologischer Sicherheit genauer gezeigt als jedes Umfrageinstrument es könnte.', resistBody3:'Keystone liest diese Quantum Enablers indirekt — durch das Muster der Operating-Enabler-Bewertungen, die Qualität des Gesprächs und die Ehrlichkeit der Kompromissentscheidungen. Das Muster ist immer ehrlich, auch wenn die Bewertungen es nicht sind.' },
    operatingEnablers: { eyebrow:'Ebene 1 — Was Ihr Unternehmen tut', heading:'Zehn Hebel. Die meisten Projekte ziehen einen nach dem anderen.', lead:'Das Keystone-Framework bildet zehn Operating Enablers in drei Clustern ab: Commercial Operations, Transformation Strategy und Customer Experience.', body1:'Jeder Enabler liegt auf einem Reifegrad-Kontinuum — von einem benannten niedrigen Zustand zu einem benannten hohen Zustand. Zusammen beschreiben sie die gesamte Operating-Landschaft eines KMU: was das Unternehmen tut, wie gut es das tut und wo das unrealisierte Potenzial konzentriert ist.', body2:'Die meisten Projekte adressieren ein oder zwei dieser Enablers gleichzeitig. Keystone arbeitet über alle zehn gleichzeitig — und zeigt einem Leader, welche Kombination in seiner spezifischen Organisation die meiste Energie hält und welcher einzelne Faden, jetzt gezogen, die meiste freisetzen würde.', cluster1label:'Cluster 1', cluster1title:'Commercial Operations', cluster1body:'Wie das Unternehmen Umsatz generiert und sichert — das Herzstück der kommerziellen Performance.', cluster2label:'Cluster 2', cluster2title:'Transformation Strategy', cluster2body:'Wie das Unternehmen sich verändert — seine Fähigkeit, sich anzupassen, zu investieren und eine strategische Richtung umzusetzen.', cluster3label:'Cluster 3', cluster3title:'Customer Experience', cluster3body:'Wie das Unternehmen seinen Kunden dient — die Schnittstelle zwischen organisatorischer Fähigkeit und Kundenergebnis.', clusterNote:'Die einzelnen Enablers innerhalb jedes Clusters werden in der ersten Sitzung geteilt — nicht davor.' },
    lego: { eyebrow:'Sehenswert', heading:'Komplexität ist der Feind des Kompoundierens.', body1:'Obwohl kein KMU, veranschaulicht dies, wie gutes Aussehen kann — worum es bei Project Keystone geht.', body2:'LEGO verlor seinen Operating-Faden. Sie expandierten zu stark, schufen Komplexität, die sie nicht mehr beherrschen konnten, und kompoundierten in die falsche Richtung. Der Weg zurück erforderte genau die Art ehrlicher, funktionsübergreifender Auseinandersetzung, die Keystone entwickelt ist, an die Oberfläche zu bringen.', tip:'Tipp: Beginnen Sie bei Minute 4, um etwas Zeit zu sparen — dort beginnt der Kern.', videoCaption:'Wird auf der IMD-Website geöffnet.' },
    pulseCheck: { eyebrow:'Das Ritual', heading:'Die Frage, die wir jedem CEO stellen, bevor wir eine einzige Sitzung gestalten.', question:'"Wenn ich jedes Mitglied Ihres Leadership-Teams bitten würde, Ihr Unternehmen ehrlich zu bewerten — vollständig anonym — wie unterschiedlich glauben Sie, würden ihre Antworten von dem sein, was sie im gemeinsamen Gespräch sagen würden?"', questionNote:'Die Länge der Pause vor der Antwort ist selbst aufschlussreich.', body1:'Der Keystone Pulse Check ist eine Quartals-Routine, die effizient misst, wo Ihre Organisation über alle 15 Enablers steht — und Lücken aufdeckt, die in normalen Business-Reviews nicht besprochen werden. Wo eine vertiefte Analyse nötig ist, liefert er die diagnostische Grundlage für zielgerichtetes Handeln.', body2:'Nicht weil Ihre Führungskräfte es nicht wissen. Sondern weil die Bedingungen für ehrliche Gespräche nicht immer vorhanden sind. Und wenn sie es nicht sind, produziert selbst das fähigste Leadership-Team Konsens statt echter Strategie.', body3:'Der Keystone Pulse Check beginnt mit einem vertraulichen Gespräch mit dem CEO oder Inhaber. Er endet mit einem Leadership-Team, das gemeinsam bewertet, ehrlich gemacht und echte Kompromisse getroffen hat — und den Raum mit Compound Strategies verlässt, die es gemeinsam verantwortet.', pullQuote:'"Ein Bogen braucht nicht jeden Stein perfekt. Er braucht den richtigen Stein am richtigen Ort — und einen Raum, der ehrlich genug ist, sich gemeinsam darauf zu einigen."', stagesHeading:'Drei organisatorische Phasen. Eine Richtung.', stage1num:'01', stage1label:'Activation', stage2num:'02', stage2label:'Traction', stage3num:'03', stage3label:'Coherence', stage4num:'04', stage4label:'Compound Returns' },
    aiLens: { eyebrow:'Die KI-Perspektive — über alle 15 Enablers', heading:'KI ist ein Beschleuniger. Kein Keystone.', lead:'KI beschleunigt, welchen Fitness-Level Ihre Organisation bereits hat. Sie schafft keine Fitness. Sie schafft keine Kohärenz. Sie schafft kein Vertrauen.', body1:'Eine kohärente Organisation verwendet KI als Teil ihrer Compound Strategies — sie tut mehr von dem, was bereits funktioniert, schneller und in grösserem Massstab. Eine fragmentierte Organisation verwendet KI, um ihr eigenes Misstrauen, ihre Unstimmigkeiten und ihre Inkohärenz zu beschleunigen.', body2:'Die Frage für jedes KMU ist heute nicht, ob KI eingeführt werden soll. Diese Frage ist bereits beantwortet. Die Frage ist: Was braucht Ihre Organisation, damit KI Sie stärker macht — und nicht schneller auf dem falschen Weg?', pullQuote:'"Eine kohärente Organisation nutzt KI zum Kompoundieren. Eine fragmentierte Organisation nutzt KI, um ihre eigene Misere zu beschleunigen."', path1label:'Kohärente Organisation + KI', path1title:'Compound Returns', path1body:'Operating und Quantum Enablers in Ausrichtung. KI verstärkt, was bereits funktioniert — schneller und in grösserem Massstab.', path2label:'Fragmentierte Organisation + KI', path2title:'Beschleunigte Inkohärenz', path2body:'Misstrauen, Fehlausrichtung und unklare Verantwortlichkeiten — in die falsche Richtung beschleunigt.', body3:'Project Keystone wendet eine KI-Perspektive über alle 15 Enablers an — nicht als separates Modul, sondern als Filter, der durch das gesamte Framework gewoben ist. Für jeden Enabler ist die Frage nicht "Nutzen Sie KI hier?" sondern "Wie sieht hohe Fitness in einer KI-fähigen Welt aus — und was passiert, wenn KI eintrifft, bevor diese Fitness vorhanden ist?"' },
    cta: { sub:'Addieren Sie — oder kompoundieren Sie?', heading:'Project Keystone beginnt mit einer Frage und einem Gespräch.', body:'Was als nächstes kommt, hängt davon ab, was der Raum enthüllt.', note:'Project Keystone steht einer kleinen Anzahl von Organisationen zur Verfügung. Es ist kein Programm, das Sie kaufen. Es ist ein Gespräch, das Sie anfragen.', cta:'Gespräch anfragen' }
  }
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
