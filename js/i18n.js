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
  nav: { home:'Home', services:'Services', caseStudies:'Case Studies', playbooks:'Playbooks', about:'About', contact:'Contact', bookMeeting:'Book a Meeting' },
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
},

/* =========================================================
   GERMAN
   ========================================================= */
de: {
  nav: { home:'Startseite', services:'Leistungen', caseStudies:'Case Studies', playbooks:'Playbooks', about:'Über uns', contact:'Kontakt', bookMeeting:'Termin buchen' },
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
