const lib = require('./_impact-lib');

// Impact Checklist: "Email me my results and a personal one-page
// interpretation from Dave." Forwards to the HubSpot Forms submission API
// (EU1) server-side, so no HubSpot script loads in the browser.
// The marketing opt-in is a separate field and never gates the request.

const PORTAL_ID = '49059754';
const HS_ENDPOINT = (formId) => `https://api-eu1.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${formId}`;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED = ['email', 'name', 'org', 'marketing', 'lang', 'mode', 'industry', 'size', 'scores', 'ranking'];
const REQUIRED = ['email', 'marketing', 'lang', 'mode', 'industry', 'size', 'scores', 'ranking'];
const RATE_MAX = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

const DIM_NAMES = {
  direction: 'Direction', risk: 'Risk', decisions: 'Decisions', plan: 'Plan',
  people: 'People', partners: 'Partners', data: 'Data', systems: 'Process & Systems',
};

function validate(p) {
  const keyErr = lib.onlyKeys(p, ALLOWED, REQUIRED);
  if (keyErr) return keyErr;
  if (typeof p.email !== 'string' || p.email.length > 254 || !EMAIL_RE.test(p.email.trim())) return 'invalid email';
  if (p.name != null && (typeof p.name !== 'string' || p.name.length > 120)) return 'invalid name';
  if (p.org != null && (typeof p.org !== 'string' || p.org.length > 160)) return 'invalid org';
  if (typeof p.marketing !== 'boolean') return 'invalid marketing';
  return lib.checkCommon(p);
}

function summary(p) {
  const lines = [
    `Mode: ${p.mode} · Language: ${p.lang} · Industry: ${p.industry} · Size: ${p.size}`,
    'Trust scores:',
    ...lib.DIMS.map((id) => `- ${DIM_NAMES[id]}: ${p.scores[id]}%`),
    p.ranking.length
      ? `Where to start: ${p.ranking.map((id, i) => `${i + 1}. ${DIM_NAMES[id]}`).join(', ')}`
      : 'Where to start: all dimensions 75% or higher (Sustain)',
  ];
  return lines.join('\n');
}

function hubspotFields(p) {
  const name = (p.name || '').trim();
  const sp = name.indexOf(' ');
  const fields = [
    { name: 'email', value: p.email.trim() },
    { name: 'impact_checklist_summary', value: summary(p) },
    { name: 'impact_insights_opt_in', value: p.marketing ? 'true' : 'false' },
  ];
  if (name) {
    fields.push({ name: 'firstname', value: sp > 0 ? name.slice(0, sp) : name });
    if (sp > 0) fields.push({ name: 'lastname', value: name.slice(sp + 1) });
  }
  if ((p.org || '').trim()) fields.push({ name: 'company', value: p.org.trim() });
  return fields;
}

exports.handler = async (event) => {
  const blocked = lib.guard(event);
  if (blocked) return blocked;

  const limited = await lib.rateLimit(event, 'submit', RATE_MAX, RATE_WINDOW_MS);
  if (limited) return limited;

  const parsed = lib.parseBody(event);
  if (parsed.error) return lib.reply(400, { error: parsed.error });
  const p = parsed.value;
  const err = validate(p);
  if (err) return lib.reply(400, { error: err });

  const formId = process.env.HUBSPOT_IMPACT_FORM_ID;
  if (!formId) return lib.reply(500, { error: 'form not configured' });

  let res;
  try {
    res = await fetch(HS_ENDPOINT(formId), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: hubspotFields(p),
        context: { pageUri: 'https://facilit8.org/impact-checklist.html', pageName: 'facilit8 Impact Checklist' },
      }),
    });
  } catch (e) {
    console.error('impact-submit: HubSpot request failed', e && e.message);
    return lib.reply(502, { error: 'submission failed' });
  }
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    console.error('impact-submit: HubSpot rejected submission', res.status, text.slice(0, 500));
    return lib.reply(502, { error: 'submission failed' });
  }

  try { await lib.incrementCounter(event, 'interpretation_requested', p.mode); } catch (e) {}
  return lib.reply(200, { ok: true });
};

exports._test = { validate, summary, hubspotFields };
