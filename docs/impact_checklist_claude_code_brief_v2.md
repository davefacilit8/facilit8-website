# Claude Code brief: facilit8 Impact Checklist on facilit8.org

**Owner:** Dave Howes · **Date:** 24 September 2026 (v2, after Be the Challenger review) · **Scope of this brief:** Version 1 (build now), Version 2 (outline only, do not build)

## How to work

1. Read this brief in full, then read `Cowork/facilit8/facilit8_website_plan_for_claude_code.md` and inspect the repo (`Cowork/facilit8/facilit8-website`) before writing code.
2. Reference prototype: `facilit8_Impact_Checklist.html` (single-file prototype). Reuse its barometer gauges, layout and team-comparison logic. **This brief replaces the prototype's content and scoring**: the prototype still has per-item importance ratings and a priority matrix, which are removed in Version 1. It also loads Google Fonts, which is not allowed on this site.
3. Propose a short build plan (files to add or change, routes, functions, env vars) and wait for Dave's approval before coding.
4. Work on a new branch `feature/impact-checklist`. Do not deploy to production. Dave reviews on a Netlify deploy preview.
5. English is the master text. Draft German for every new string; Dave reviews German before deploy. Use Swiss German spelling (ss, not ß).

## Hard constraints from existing site decisions

- **No off-origin requests before consent.** Fonts come only from `/assets/fonts/fonts.css`. Never add `fonts.googleapis.com`, `fonts.gstatic.com`, Formspree or any new third-party host. Check the status of the unpkg.com fix and do not add new unpkg dependencies.
- **EN/DE parity:** new strings go in `locales/en.json`, `locales/de.json` **and** `js/i18n.js` (i18n.js is the runtime source).
- **No pricing anywhere.** Paid features are described as "facilitated by facilit8", never with prices.
- Site language is "Commercial Excellence". Proof numbers: **50+ organisations**, 20+ years. Never "100+".
- Forms and consent follow the existing `js/playbook-consent.js` / consent banner pattern. Consent checkboxes are never pre-ticked, and marketing consent is never bundled with delivering results.
- Update the privacy notice (both languages) for any new data processing (see "Data and privacy").

## Positioning and intro text

**Headline:**
> AI can diagnose your processes. Only people can build the trust needed to deliver impact.

**Intro:**
> What AI cannot do is create the confidence that turns a plan into results. Transformations rarely fail for lack of insight. They fail when leaders stop trusting the direction, the plan or each other. All eight dimensions are essential: weakness in any one of them puts the impact your customers expect at risk. This checklist shows where trust is strong, where it is fragile, and where to act first.

**Impact (the roof of the model):**
> Impact: results for the business and its customers. All eight dimensions are essential to deliver it. A weak one puts customer impact and expectations at risk.

**Scale note (shown on the model page and at the start of the assessment):**
> Trust means confidence. Score each item from 0% (no trust) to 100% (full trust). Higher is always better, including for Risk: a high score means risks are understood and managed.

## The model

Impact sits on two pillars. Every dimension has three attributes and a **customer lens**. The customer lens is part of the wording and the coaching questions. It is **not** scored separately in Version 1.

**Leadership** (owned by the sponsor and executive team): Direction, Risk, Decisions, Plan
**Capabilities** (delivered by the organisation): People, Partners, Data, Process & Systems

| # | Dimension | Question | Attributes | Customer lens |
|---|---|---|---|---|
| 1 | Direction | Why? | Clarity, Alignment, Commercial outcomes | Innovating the customer experience and differentiating from competitors |
| 2 | Risk | What could stop us? | Assumptions, Consequences & barriers, AI governance & ethics | Risk to customers if we fail, or if AI gets it wrong |
| 3 | Decisions | Who decides? | Decision rights (incl. human vs AI), Prioritisation, Cohesion | Customer voice in decisions |
| 4 | Plan | When and how much? | Iteration, Resourcing, Issues | Engaging customers along the way |
| 5 | People | Who? | Capability & AI learning, Accountability, Engagement | Customer-facing teams equipped for the new experience |
| 6 | Partners | With whom? | Expertise, Alignment, Commercial fit | Partners strengthen the customer experience |
| 7 | Data | What do we need? | Quality, Security (incl. traceability), Integrity | Customer data secure and used well |
| 8 | Process & Systems | How? | Velocity, Usability, Automation | Customer self-service |

**Definition of learning** (show as a tooltip or info text on People):
> Learning is the organisation's ability to keep building, applying and sharing new skills, including working with AI, as fast as the work changes.

### Quick mode: 8 headline items (free)

Each is prefixed with "How much do you trust that…"

1. Direction: …everyone knows why we are doing this, where we are going, and how it will set us apart for our customers?
2. Risk: …we understand what could stop us, including risks from AI and risks to our customers, and are managing them?
3. Decisions: …the right people make the right decisions at the right pace, as one team, with the customer in mind?
4. Plan: …our plan lets us deliver in steps, is properly resourced and involves customers along the way?
5. People: …our people have the skills, including AI skills, and the ownership to deliver for customers?
6. Partners: …our partners are capable, aligned and improve our customers' experience?
7. Data: …we have the data we need, secure and trusted, including our customer data?
8. Process & Systems: …our processes and systems help us deliver, and let customers serve themselves easily?

### Deep mode: 24 statements (paid layer)

Three statements per dimension, each scored for trust. Dimension trust = average of its 3 statements.

**Level examples (deep mode only).** Show these above each dimension's statements, so leaders in different companies read the scale the same way:

| Dimension | 0% looks like | 50% looks like | 100% looks like |
|---|---|---|---|
| Direction | No agreed ambition; people describe different goals | Ambition agreed at the top but not yet understood across teams | Everyone can explain the ambition, its commercial outcomes and what it means for customers |
| Risk | Risks are discussed only when they happen | Main risks are listed but rarely reviewed; no clear rules for AI use | Assumptions are tested, risks have owners and are reviewed, and AI use follows clear rules |
| Decisions | Unclear who decides; decisions stall or are reopened | Clear for big decisions, less so day to day | Decisions are made at the right level, at pace, and carried together |
| Plan | Fixed plan, under-resourced, issues surface late | Resources partly committed; adjusting is slow | Short delivery cycles, committed resources, issues resolved quickly |
| People | Skills gaps unaddressed; ownership unclear | Key roles covered; learning, including AI, is ad hoc | Skills, including AI, grow continuously, and every outcome has an engaged owner |
| Partners | Partners deliver to contract scope only | Partners are capable but only partly aligned with our outcomes | Partners share our goals, and incentives reward the results we need |
| Data | Data is incomplete, untrusted or insecure | Core data usable, but versions conflict and security is uneven | One trusted, secure version of the truth, including customer data |
| Process & Systems | Manual processes; systems get in the way | Systems support core work; little automation or self-service | Fast, easy processes, sensible automation and easy customer self-service |

**Direction**
- Clarity: The ambition, and why it matters, is clear and written down.
- Alignment: The leadership team tells the same story about where we are going.
- Commercial outcomes: We have agreed the commercial and customer results this must deliver, such as revenue, margin, productivity or customer experience.

**Risk**
- Assumptions: We know what needs to be true to deliver the direction, and we test it.
- Consequences & barriers: We understand what happens to us and our customers if we fail, and what could prevent impact, and each barrier has an owner.
- AI governance & ethics: We have clear rules for using AI responsibly, covering bias, transparency, data use and regulation such as the EU AI Act.

**Decisions**
- Decision rights: It is clear who decides what, at which level and how fast, including which decisions AI may make or recommend and which stay with people.
- Prioritisation: When everything seems important, we can still say what comes first, with the customer in mind.
- Cohesion: Leaders act as one team. Different views are raised openly and resolved, and decisions are carried together.
  - German: *Wir handeln als ein Führungsteam. Unterschiedliche Sichtweisen werden offen angesprochen und geklärt, und wir tragen Entscheidungen gemeinsam mit.* Keep this tone: no words suggesting blame or politics.

**Plan**
- Iteration: We deliver in short cycles, involve customers, learn from results and adjust.
- Resourcing: The people and budget we need are committed, not borrowed.
- Issues: Issues are raised early and resolved quickly.

**People**
- Capability & AI learning: We keep building the skills we need, including working confidently with AI, as fast as the work changes.
- Accountability: Each outcome has a named owner who follows through.
- Engagement: People, including customer-facing teams, adopt new ways of working, and the change sticks.

**Partners**
- Expertise: Our external partners bring expertise we do not have in-house.
- Alignment: Partners work towards our outcomes and our customers' experience, not only their own scope.
- Commercial fit: Contracts and incentives reward the results we need.

**Data**
- Quality: We have the data we need, accurate and complete enough to act on.
- Security: Data, especially customer data, is protected, compliant with FADP/GDPR and traceable: we know where it comes from and who uses it.
- Integrity: There is one trusted version of the truth across teams and systems.

**Process & Systems**
- Velocity: Our processes and systems let us change and deliver quickly.
- Usability: Our processes and systems are easy to use, and customers can serve themselves where they prefer to.
- Automation: Repetitive work is automated where it makes sense.

## Scoring

- **Trust only**, in 5 anchored steps: 0% No trust, 25% Low, 50% Partial, 75% High, 100% Full trust. No importance rating per item.
- **Bands:** below 50% = Fix (red), 50–74% = Strengthen (amber), 75% and above = Sustain (green).
- Scoring is locked until every item is answered. Missing items are highlighted, and the page scrolls to the first one.

### Final step: where would you start?

After the last trust item, show one screen:
> "All eight dimensions are essential, and these five are where your trust is lowest. Where would you start? Put them in the order you would address them."

The wording must frame this as a **sequence**, never as importance, so it does not contradict the intro.

- Show the **5 lowest-scoring dimensions**. If several dimensions tie at the cut-off, include all tied dimensions (the list may be 6–8 long) and rank all of them.
- Ranking is done by drag and drop, **with a keyboard- and touch-friendly alternative** (up/down buttons on each row).
- Ranking is required before results are shown. The ranked order becomes "Where to start".
- If all 8 dimensions score 75% or higher, skip this step and show a "Sustain" message on the results page instead.

## Results page (both modes)

- KPIs: Overall trust, Leadership, Capabilities.
- 8 barometer gauges grouped by pillar, with band labels. The respondent's top 3 ranked dimensions get a "Start here" marker.
- **Where to start:** the ranked list, each with its trust score.
  - **Coaching questions:** in the free version, show the 2 questions for the **first-ranked dimension only**, with the line: "More questions for your other areas are part of a conversation with facilit8." In deep mode, show them for the top 3. Framing line: "Questions to explore together. There are no wrong answers."
  - **How AI can help:** for the top 3, show the AI lens (below) with a "Read more" link to a thought-piece URL. Use a config map of 8 URLs with empty values, and hide the link when a value is empty. Dave will launch with 3 pieces and add the rest over time.
- **Leadership gap prompt:** if the Leadership average is 20 or more points above the Capabilities average, show: "Your Leadership scores are noticeably higher than Capabilities. Would your teams score Leadership the same way?" Style it as a neutral coaching note, not a warning.
- **The next conversation** (a closing panel, nothing captured or stored):
  > "Think of a common customer complaint. Which of these dimensions sit behind it? Start with the capabilities involved, then ask what leadership could change to make it easier. It is rarely just one dimension. Often it is several, and sometimes all eight. That is the conversation facilit8 can help you have."

  Show the Capabilities dimensions first, then Leadership, so the conversation does not open by putting the sponsor in the dock.
  Show the 8 dimension names as a simple visual reminder, with a link to the contact form.
- Actions: Download PDF (print stylesheet), Export results file (JSON, for team comparison), and "Get a personal interpretation from Dave" (see "Data and privacy").

**Removed from Version 1:** the priority matrix, per-item importance ratings, the Customer trust score, and complaint entry.

### Coaching questions (non-threatening, open)

| Dimension | Questions |
|---|---|
| Direction | If a customer asked what will be different for them in a year, what would each of us say? · Which part of the direction do you feel most and least sure about? |
| Risk | What would need to be true for this to succeed, and which of those are we least sure of? · Where would we want a person to check what AI suggests? |
| Decisions | Which decision, if made this month, would unlock the most progress? · Where do we agree in the room but act differently afterwards? |
| Plan | What could we deliver in the next 90 days that customers would notice? · What could we stop doing to free up the people this needs? |
| People | What have people learned in the last six months, and how did they learn it? · What would help people feel confident working with AI? |
| Partners | What do our partners know about our customers that we could use more? · If a partner's contract ended tomorrow, what would we miss most? |
| Data | Which decision would be easier if we had one number we all trusted? · What customer data do we hold that we are not yet using well? |
| Process & Systems | Where do customers or colleagues wait longest today? · What would customers happily do themselves if we made it easy? |

### AI lens per dimension

| Dimension | How AI can help | AI risk to watch |
|---|---|---|
| Direction | Scenario modelling and synthesis of market and customer signals | A strategy that sounds like everyone else's, because it came from the same AI |
| Risk | Early-warning signals and testing assumptions against data | Hidden model risk, and over-reliance on AI judgement |
| Decisions | Faster options analysis and decision support | Unclear accountability for decisions AI makes or shapes |
| Plan | Forecasting, resource planning and early issue detection | False precision in AI-generated plans |
| People | Copilots, personalised learning and adoption insight | Fear for jobs, and skills eroding through over-use |
| Partners | Vendor evaluation and contract analysis | Lock-in, and vendor claims that exceed reality |
| Data | Data cleansing, lineage tracking and anomaly detection | Bias, privacy breaches and regulatory non-compliance |
| Process & Systems | Process mining, automation, AI agents and customer self-service | Automating a broken process, making it fail faster |

## Setup fields

- Name (optional in free mode), Role, Organisation (optional), Initiative being assessed (optional)
- **Industry** (required): Life Sciences, Consumer, Industrial, Other
- **Company size** (required): under 50, 50–249, 250–999, 1,000+ employees
- Mode: Quick check (free) or Deep assessment (requires an access code, see below)

## Free and paid layers

- **Free (public):** quick mode, ranking, results, coaching questions for the first-ranked area, AI lens, next-conversation panel, PDF, and an optional personal interpretation from Dave.
- **Paid (facilitated by facilit8):** deep mode and team comparison. In Version 2, also the evidence layer, annual pulse and benchmark report.
- **Deep mode access:** unlocked with an access code that Dave gives to each client. **One code per client, expiring 90 days after issue.** Store codes server-side in an env var `IMPACT_ACCESS_CODES` as JSON, e.g. `[{"code":"KX7-2Q9","client":"Muster AG","expires":"2026-12-31"}]`, and validate code and expiry in a Netlify function. An expired code shows: "This access code has expired. Please contact facilit8 for a new one." Never ship codes in client code. Add a short `docs/impact-access-codes.md` explaining to Dave how to add, rotate and expire codes.
- Public copy for the paid layer: "Deep assessment and team comparison are facilitated by facilit8. Get in touch to find out more." Link it to the existing contact form. No prices.

## Team comparison (paid, Version 1 = file-based)

- The facilitator loads several exported JSON files. Per dimension, the tool shows:
  - average trust;
  - the range from lowest to highest, with a "Leaders disagree" flag when the range is 50 points or more;
  - how many leaders ranked it in their top 3.
- Include a combined "Where the team would start" list, ordered by the number of top-3 rankings, then by average trust.
- **Anonymous by default:** respondents are shown as Leader A, B, C… A "Show names" toggle is available only in the facilitator view, which requires a valid access code.

## Data and privacy

- **Nothing leaves the browser** unless the respondent ticks a box. There are two separate, unticked checkboxes:
  1. **"Email me my results and a personal one-page interpretation from Dave."** This is the value exchange for the respondent's email. Required: email; name and organisation optional. Dave writes each interpretation personally (the same promise as StrategyLENS). Submit server-side via a Netlify function to the HubSpot Forms submission API (portal 49059754, EU1). Dave will create a form "Impact Checklist result", provide its GUID (env var `HUBSPOT_IMPACT_FORM_ID`) and a contact property `impact_checklist_summary` for the summary (8 trust scores plus the ranked list). Do not load HubSpot scripts client-side for this.
     - A **separate, optional, unticked** checkbox underneath: "Also send me occasional facilit8 insights." Delivery of the interpretation must never depend on this box.
     - Confirmation text: "Thank you. Dave will send your interpretation personally." Do not promise a turnaround time unless Dave adds one to the config.
  2. "Add my anonymous scores to the facilit8 Swiss Impact Baseline." (The public name becomes "Benchmark" only once reporting thresholds are met.) Store **only**: date, language, mode, industry, size band, the 8 trust scores and the ranked focus list. No name, email, organisation or initiative. Store via a Netlify function in Netlify Blobs (store name `impact-benchmark`).
- **Completion counter (no personal data):** to measure conversion against the HubSpot baseline, a Netlify function increments anonymous counters: `started`, `completed`, `interpretation_requested`, `benchmark_contributed`, per mode and per month. No identifiers, cookies, IP storage or fingerprinting. Include a simple password-protected (env var) JSON view for Dave.
- Update the privacy notice (EN/DE, in locales and `js/i18n.js`): what is sent, why, where (HubSpot EU1, Netlify), retention (24 months for follow-up submissions, matching existing commitments; benchmark data is anonymous and kept for trend reporting).
- Rate-limit all functions, validate payloads, and reject unexpected fields.

## Route and navigation

- Standalone page `impact-checklist.html`, following the pattern of the existing standalone playbook pages (shared header and footer, consent script, self-hosted fonts). Also add a card or link from the main site where the playbooks and tools are listed.
- Language switch EN/DE persists with the rest of the site.
- facilit8 design tokens only (the CSS variables used in the playbooks). Responsive down to 360px, visible keyboard focus, `prefers-reduced-motion` respected.

## Acceptance tests (run in the headless Chromium set-up used before)

1. Zero off-origin requests on load and throughout the quick-mode flow, until a consent box is ticked and submitted.
2. Quick mode: the ranking step is blocked until all 8 trust items are answered; results are blocked until the ranking is complete.
3. Ties: with scores 25, 50, 50, 50, 50, 50, 75, 75, the ranking step shows 6 dimensions. With all scores at 75% or higher, the ranking step is skipped.
4. Ranking works with mouse drag, touch and keyboard (up/down buttons).
5. Deep mode: an invalid code is rejected server-side; a valid code shows 24 statements, and dimension scores are the averages.
6. Team comparison: 3 files load, names are hidden by default, the "Leaders disagree" flag appears at a range of 50 or more, and top-3 counts are correct.
7. Benchmark payload contains only the allowed fields (assert on the function input).
8. All strings present in EN and DE, in `locales/*.json` and `js/i18n.js`.
9. Print or PDF shows only the results, on A4, without navigation.
10. Mobile at 360px: no horizontal scroll.
11. Leadership gap prompt appears when Leadership averages 20 or more points above Capabilities, and not otherwise.
12. Free version shows coaching questions for the first-ranked dimension only; deep mode shows the top 3.
13. Access codes: an expired code is rejected with the expiry message; a valid unexpired code works.
14. The interpretation request succeeds with the marketing box unticked.
15. Counter payloads contain no identifiers (assert on the function input).

## Version 2 (do not build yet)

- **Evidence layer:** upload customer satisfaction and complaint data for AI analysis. It identifies the top complaint themes and maps each to the dimensions behind it (usually several), then compares perceived trust with the evidence.
- **Frontline version:** a short version for People, Process & Systems, and Data, to compare leadership and frontline trust.
- **Annual trust pulse:** repeat each year, show the change against last year, and close with a celebrating-success event.
- **Swiss Impact Benchmark report:** annual report by industry and size. Publish only when there are at least 30 responses overall, and show any group only when it has at least 5. Publish the method (self-selected sample, self-assessment) in every report. Call the first edition the **2027 Baseline**, not a benchmark.
- Server-side team sessions (a session code instead of file exchange).
- Reconsider an importance rating and a priority matrix if clients ask for it.

## Actions for Dave before go-live

1. Create the HubSpot form "Impact Checklist result" and the property `impact_checklist_summary`, then send the GUID.
2. Choose the deep-mode access codes and set the Netlify env vars.
3. Review the German text, then test it with 2–3 Swiss German CEOs or sponsors before launch, especially the Decisions and Cohesion wording.
4. Write the first 3 thought pieces (launch set) and add their URLs; add the other 5 as they go live.
5. Decide whether to state a turnaround time for personal interpretations, and plan capacity to write them.
6. Decide the open GDPR Art. 27 question before collecting data from DE/AT respondents.
