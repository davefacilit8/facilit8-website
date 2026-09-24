// Browser acceptance tests for impact-checklist.html (brief tests 1-6, 9-15).
// Runs against tests/support/server.js, which serves the site and the real
// Impact functions with in-memory Blobs and a recorded HubSpot endpoint.

const { test, expect } = require('@playwright/test');
const fs = require('fs');
const os = require('os');
const path = require('path');

const DIMS = ['direction', 'risk', 'decisions', 'plan', 'people', 'partners', 'data', 'systems'];

// Each test gets a fresh browser context (empty storage); reset server state too.
test.beforeEach(async ({ request }) => {
  await request.post('/__test/reset');
});

async function serverLog(request) {
  return (await request.get('/__test/log')).json();
}

async function openChecklist(page) {
  await page.goto('/impact-checklist.html');
  await page.click('#tab-assess');
}

async function fillSetup(page) {
  await page.selectOption('#fIndustry', 'industrial');
  await page.selectOption('#fSize', '250to999');
}

async function answerQuick(page, scores) {
  for (let i = 0; i < scores.length; i++) {
    await page.click(`#it-${DIMS[i]} button[data-v="${scores[i]}"]`);
  }
}

async function unlockDeep(page, code) {
  await page.click('.mode[data-mode="deep"]');
  await page.fill('#fCode', code);
  await page.click('#btnUnlock');
}

async function rankOrder(page) {
  return page.$$eval('#rankList .rank-item', (els) => els.map((e) => e.dataset.id));
}

async function quickToResults(page, scores) {
  await openChecklist(page);
  await fillSetup(page);
  await answerQuick(page, scores);
  await page.click('#btnContinue');
  if (await page.locator('#v-rank.on').count()) await page.click('#btnRankDone');
  await expect(page.locator('#v-results.on #resultsBody')).toBeVisible();
}

/* 1 */
test('1: zero off-origin requests through the quick-mode flow', async ({ page, baseURL }) => {
  const offOrigin = [];
  page.on('request', (r) => {
    const u = r.url();
    if (!u.startsWith(baseURL) && !u.startsWith('data:') && !u.startsWith('blob:')) offOrigin.push(u);
  });
  await quickToResults(page, [25, 50, 50, 75, 50, 100, 0, 75]);
  await page.click('#tab-team');
  await page.click('#tab-model');
  await page.click('[data-lang-btn="de"]');
  await page.click('[data-lang-btn="en"]');
  expect(offOrigin).toEqual([]);
});

/* 2 */
test('2: ranking blocked until all 8 answered; results blocked until ranking done', async ({ page }) => {
  await openChecklist(page);
  await fillSetup(page);
  await expect(page.locator('#tab-results')).toBeDisabled();
  await answerQuick(page, [25, 50, 50, 75, 50, 100, 0]); // 7 of 8 answered
  await page.click('#btnContinue');
  await expect(page.locator('#v-assess.on')).toBeVisible();
  await expect(page.locator('#assessErr')).toContainText('1');
  await expect(page.locator('#it-systems.missing')).toBeVisible();
  await expect(page.locator('#v-rank.on')).toHaveCount(0);
  await page.click('#it-systems button[data-v="75"]');
  await page.click('#btnContinue');
  await expect(page.locator('#v-rank.on')).toBeVisible();
  await expect(page.locator('#tab-results')).toBeDisabled();
  await page.click('#btnRankDone');
  await expect(page.locator('#v-results.on #resultsBody')).toBeVisible();
  await expect(page.locator('#tab-results')).toBeEnabled();
});

test('2b: industry and size are required', async ({ page }) => {
  await openChecklist(page);
  await answerQuick(page, [25, 50, 50, 75, 50, 100, 0, 75]);
  await page.click('#btnContinue');
  await expect(page.locator('#fld-industry.missing')).toBeVisible();
  await expect(page.locator('#v-rank.on')).toHaveCount(0);
});

/* 3 */
test('3: ties include all tied dimensions; all >=75% skips ranking', async ({ page }) => {
  await openChecklist(page);
  await fillSetup(page);
  await answerQuick(page, [25, 50, 50, 50, 50, 50, 75, 75]);
  await page.click('#btnContinue');
  await expect(page.locator('#rankList .rank-item')).toHaveCount(6);

  await page.goto('/impact-checklist.html');
  await page.click('#tab-assess');
  await fillSetup(page);
  await answerQuick(page, [75, 100, 75, 75, 100, 75, 75, 100]);
  await page.click('#btnContinue');
  await expect(page.locator('#v-results.on')).toBeVisible();
  await expect(page.locator('#sustainCard')).toBeVisible();
  await expect(page.locator('#startCard')).toBeHidden();
});

/* 4 */
test('4a: ranking works with the keyboard (up/down buttons)', async ({ page }) => {
  await openChecklist(page);
  await fillSetup(page);
  await answerQuick(page, [0, 25, 50, 50, 50, 100, 100, 100]);
  await page.click('#btnContinue');
  const before = await rankOrder(page);
  await page.focus(`#rankList button[data-id="${before[1]}"][data-move="-1"]`);
  await page.keyboard.press('Enter');
  const after = await rankOrder(page);
  expect(after[0]).toBe(before[1]);
  expect(after[1]).toBe(before[0]);
  // focus stays on the moved item so repeated presses keep working
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  expect((await rankOrder(page))[1]).toBe(before[1]);
});

test('4b: ranking works with mouse drag', async ({ page }) => {
  await openChecklist(page);
  await fillSetup(page);
  await answerQuick(page, [0, 25, 50, 50, 50, 100, 100, 100]);
  await page.click('#btnContinue');
  const before = await rankOrder(page);
  const src = page.locator(`#rankList .rank-item[data-id="${before[0]}"] .rank-handle`);
  const dst = page.locator(`#rankList .rank-item[data-id="${before[2]}"]`);
  const s = await src.boundingBox(), d = await dst.boundingBox();
  await page.mouse.move(s.x + s.width / 2, s.y + s.height / 2);
  await page.mouse.down();
  await page.mouse.move(s.x + s.width / 2, d.y + d.height - 2, { steps: 12 });
  await page.mouse.up();
  const after = await rankOrder(page);
  expect(after.indexOf(before[0])).toBe(2);
});

test('4c: ranking works with touch drag', async ({ browser, baseURL }) => {
  const ctx = await browser.newContext({ hasTouch: true, viewport: { width: 390, height: 844 }, baseURL });
  const page = await ctx.newPage();
  await openChecklist(page);
  await fillSetup(page);
  await answerQuick(page, [0, 25, 50, 50, 50, 100, 100, 100]);
  await page.click('#btnContinue');
  const before = await rankOrder(page);
  const s = await page.locator(`#rankList .rank-item[data-id="${before[0]}"] .rank-handle`).boundingBox();
  const d = await page.locator(`#rankList .rank-item[data-id="${before[2]}"]`).boundingBox();
  const cdp = await ctx.newCDPSession(page);
  const x = s.x + s.width / 2;
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y: s.y + s.height / 2 }] });
  for (let i = 1; i <= 12; i++) {
    const y = s.y + s.height / 2 + ((d.y + d.height - 2) - (s.y + s.height / 2)) * (i / 12);
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y }] });
  }
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  const after = await rankOrder(page);
  expect(after.indexOf(before[0])).toBe(2);
  await ctx.close();
});

/* 5 */
test('5: deep mode rejects an invalid code server-side; valid code shows 24 statements; scores are averages', async ({ page, request }) => {
  await openChecklist(page);
  await fillSetup(page);
  await unlockDeep(page, 'WRONG-CODE');
  await expect(page.locator('#codeMsg')).toHaveClass(/err/);
  await expect(page.locator('#items .sub')).toHaveCount(0);
  const log = await serverLog(request);
  expect(log.inputs.some((i) => i.fn === 'impact-access' && i.body.code === 'WRONG-CODE')).toBe(true);

  await page.fill('#fCode', 'TEST-VALID');
  await page.click('#btnUnlock');
  await expect(page.locator('#items .sub')).toHaveCount(24);
  await expect(page.locator('#items .levels')).toHaveCount(8);
  // direction: 0, 25, 25 -> 17 ; everything else 100
  for (const id of DIMS) {
    const vals = id === 'direction' ? [0, 25, 25] : [100, 100, 100];
    for (let i = 0; i < 3; i++) await page.click(`#sub-${id}-${i} button[data-v="${vals[i]}"]`);
  }
  await page.click('#btnContinue');
  await page.click('#btnRankDone');
  await expect(page.locator('.gauge[data-dim="direction"] svg')).toHaveAttribute('aria-label', '17%');
  const result = await page.evaluate(() => window.F8Impact._state.result);
  expect(result.scores.find((s) => s.id === 'direction').trust).toBe(17);
});

/* 6 */
test('6: team comparison loads 3 files, hides names, flags disagreement, counts top 3', async ({ page }) => {
  const mk = (name, trust, ranking) => ({
    tool: 'facilit8-impact-checklist', version: 2, lang: 'en', mode: 'quick', date: '2026-09-24',
    name, role: '', org: 'Muster AG', initiative: '', industry: 'industrial', size: '250to999',
    scores: DIMS.map((id, i) => ({ id, pillar: i < 4 ? 'L' : 'C', trust: trust[i] })), ranking, answers: {},
  });
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'impact-'));
  const files = [
    mk('Anna Muster', [0, 50, 50, 50, 50, 50, 50, 50], ['direction', 'risk', 'plan', 'decisions', 'people']),
    mk('Beat Beispiel', [50, 50, 50, 50, 50, 50, 50, 50], ['risk', 'direction', 'data', 'plan', 'people']),
    mk('Carla Test', [75, 100, 50, 50, 50, 50, 50, 50], ['risk', 'people', 'systems', 'data', 'plan']),
  ].map((j, i) => { const p = path.join(dir, `leader${i}.json`); fs.writeFileSync(p, JSON.stringify(j)); return p; });

  await page.goto('/impact-checklist.html');
  await page.click('#tab-team');
  await expect(page.locator('#teamTool')).toBeHidden();
  await page.fill('#tCode', 'TEST-VALID');
  await page.click('#btnTeamUnlock');
  await expect(page.locator('#teamTool')).toBeVisible();
  await page.setInputFiles('#teamFiles', files);
  await expect(page.locator('#teamTable tbody tr')).toHaveCount(8);

  const who = page.locator('#teamWho');
  await expect(who).toContainText('Leader A');
  await expect(who).not.toContainText('Anna');
  await page.check('#cbShowNames');
  await expect(who).toContainText('Anna Muster');

  await expect(page.locator('tr[data-dim="direction"] .flag')).toBeVisible(); // range 75
  await expect(page.locator('tr[data-dim="risk"] .flag')).toBeVisible();      // range 50
  await expect(page.locator('tr[data-dim="plan"] .flag')).toHaveCount(0);     // range 0
  await expect(page.locator('tr[data-dim="risk"] .top3')).toHaveText('3 of 3');
  await expect(page.locator('tr[data-dim="direction"] .top3')).toHaveText('2 of 3');
  await expect(page.locator('tr[data-dim="plan"] .top3')).toHaveText('1 of 3');
  await expect(page.locator('tr[data-dim="decisions"] .top3')).toHaveText('0 of 3');
  const order = await page.$$eval('#teamStart li', (els) => els.map((e) => e.dataset.dim));
  expect(order.slice(0, 2)).toEqual(['risk', 'direction']);
});

test('6b: team view refuses an expired code', async ({ page }) => {
  await page.goto('/impact-checklist.html');
  await page.click('#tab-team');
  await page.fill('#tCode', 'TEST-EXPIRED');
  await page.click('#btnTeamUnlock');
  await expect(page.locator('#tCodeMsg')).toContainText('expired');
  await expect(page.locator('#teamTool')).toBeHidden();
});

/* 9 */
test('9: print shows only the results, A4, no navigation', async ({ page }) => {
  await quickToResults(page, [25, 50, 50, 75, 50, 100, 0, 75]);
  await page.emulateMedia({ media: 'print' });
  for (const sel of ['.ks-header', '.ic-hero', '.tabs', '.footer', '#btnPdf', '#cbInterpret']) {
    await expect(page.locator(sel).first()).toBeHidden();
  }
  await expect(page.locator('#gaugeWrap')).toBeVisible();
  await expect(page.locator('#startList')).toBeVisible();
  const pdf = await page.pdf({ format: 'A4', preferCSSPageSize: true });
  expect(pdf.length).toBeGreaterThan(1000);
});

/* 10 */
test('10: no horizontal scroll at 360px on every view', async ({ browser, baseURL }) => {
  const ctx = await browser.newContext({ viewport: { width: 360, height: 780 }, baseURL });
  const page = await ctx.newPage();
  const noScroll = async (label) => {
    const w = await page.evaluate(() => ({ s: document.documentElement.scrollWidth, c: document.documentElement.clientWidth }));
    expect(w.s, label).toBeLessThanOrEqual(w.c);
  };
  await page.goto('/impact-checklist.html');
  await noScroll('model');
  await page.click('#tab-assess');
  await fillSetup(page);
  await noScroll('assess');
  await answerQuick(page, [25, 50, 50, 75, 50, 100, 0, 75]);
  await page.click('#btnContinue');
  await noScroll('rank');
  await page.click('#btnRankDone');
  await page.check('#cbInterpret');
  await page.check('#cbBaseline');
  await noScroll('results');
  await page.click('#tab-team');
  await noScroll('team');
  await page.click('[data-lang-btn="de"]');
  await noScroll('team DE');
  await ctx.close();
});

/* 11 */
test('11: leadership gap prompt appears at 20+ points only', async ({ page }) => {
  // Leadership 75, Capabilities 50 -> gap 25 -> shown
  await quickToResults(page, [75, 75, 75, 75, 50, 50, 50, 50]);
  await expect(page.locator('#gapNote')).toBeVisible();
  // Leadership 75, Capabilities 63 -> gap 12 -> hidden
  await quickToResults(page, [75, 75, 75, 75, 75, 50, 75, 50]);
  await expect(page.locator('#gapNote')).toBeHidden();
  // Capabilities higher -> hidden
  await quickToResults(page, [25, 25, 25, 25, 75, 75, 75, 75]);
  await expect(page.locator('#gapNote')).toBeHidden();
});

/* 12 */
test('12: free shows coaching questions for the first-ranked area only; deep shows top 3', async ({ page }) => {
  await quickToResults(page, [25, 50, 50, 75, 50, 100, 0, 75]);
  await expect(page.locator('#startList .coaching')).toHaveCount(1);
  const first = await page.$eval('#startList > li', (li) => li.dataset.dim);
  await expect(page.locator(`#startList > li[data-dim="${first}"] .coaching li`)).toHaveCount(2);
  await expect(page.locator('#startList .coaching-more')).toHaveCount(1);
  await expect(page.locator('#startList .ai')).toHaveCount(3);
  // "Start here" markers on the top 3
  await expect(page.locator('.gauge .start-chip')).toHaveCount(3);

  await page.goto('/impact-checklist.html');
  await page.click('#tab-assess');
  await fillSetup(page);
  await unlockDeep(page, 'TEST-VALID');
  await expect(page.locator('#items .sub')).toHaveCount(24);
  const vals = { direction: 25, risk: 50, decisions: 50, plan: 75, people: 50, partners: 100, data: 0, systems: 75 };
  for (const id of DIMS) for (let i = 0; i < 3; i++) await page.click(`#sub-${id}-${i} button[data-v="${vals[id]}"]`);
  await page.click('#btnContinue');
  await page.click('#btnRankDone');
  await expect(page.locator('#startList .coaching')).toHaveCount(3);
  await expect(page.locator('#startList .coaching-more')).toHaveCount(0);
});

/* 13 */
test('13: expired code shows the expiry message; valid code works', async ({ page }) => {
  await openChecklist(page);
  await unlockDeep(page, 'TEST-EXPIRED');
  await expect(page.locator('#codeMsg')).toHaveText('This access code has expired. Please contact facilit8 for a new one.');
  await expect(page.locator('#items .sub')).toHaveCount(0);
  await page.fill('#fCode', 'test-valid');
  await page.click('#btnUnlock');
  await expect(page.locator('#items .sub')).toHaveCount(24);
});

/* 14 */
test('14: interpretation request succeeds with the marketing box unticked', async ({ page, request }) => {
  await quickToResults(page, [25, 50, 50, 75, 50, 100, 0, 75]);
  await expect(page.locator('#cbInterpret')).not.toBeChecked();
  await expect(page.locator('#cbBaseline')).not.toBeChecked();
  await page.check('#cbInterpret');
  await expect(page.locator('#cbMarketing')).not.toBeChecked();
  await page.fill('#iEmail', 'anna@example.ch');
  await page.click('#btnInterpret');
  await expect(page.locator('#interpretMsg')).toHaveText('Thank you. Dave will send your interpretation personally.');
  const log = await serverLog(request);
  expect(log.hubspot).toHaveLength(1);
  const fields = Object.fromEntries(log.hubspot[0].body.fields.map((f) => [f.name, f.value]));
  expect(fields.impact_insights_opt_in).toBe('false');
  // Baseline was not ticked, so nothing was stored there
  expect(Object.keys(log.benchmark)).toHaveLength(0);
});

test('14b: Baseline contribution stores only allowed fields (7, via the page)', async ({ page, request }) => {
  await quickToResults(page, [25, 50, 50, 75, 50, 100, 0, 75]);
  await page.check('#cbBaseline');
  await page.click('#btnBaseline');
  await expect(page.locator('#baselineMsg')).toHaveClass(/ok/);
  const log = await serverLog(request);
  const input = log.inputs.find((i) => i.fn === 'impact-benchmark');
  expect(Object.keys(input.body).sort()).toEqual(['industry', 'lang', 'mode', 'ranking', 'scores', 'size']);
  const records = Object.values(log.benchmark);
  expect(records).toHaveLength(1);
  expect(Object.keys(records[0]).sort()).toEqual(['date', 'industry', 'lang', 'mode', 'ranking', 'scores', 'size']);
});

/* 15 */
test('15: counter payloads contain no identifiers', async ({ page, request }) => {
  await quickToResults(page, [25, 50, 50, 75, 50, 100, 0, 75]);
  await expect.poll(async () => (await serverLog(request)).inputs.filter((i) => i.fn === 'impact-count').length).toBe(2);
  const log = await serverLog(request);
  const counts = log.inputs.filter((i) => i.fn === 'impact-count');
  for (const c of counts) expect(Object.keys(c.body).sort()).toEqual(['event', 'mode']);
  expect(counts.map((c) => c.body.event)).toEqual(['started', 'completed']);
  const month = Object.keys(log.counters)[0];
  expect(log.counters[month]).toEqual({ quick: { started: 1, completed: 1 } });
});

test('language switch persists across pages and keeps answers', async ({ page }) => {
  await openChecklist(page);
  await page.click('#it-direction button[data-v="50"]');
  await page.click('[data-lang-btn="de"]');
  await expect(page.locator('#it-direction h3')).toHaveText('Richtung');
  await expect(page.locator('#it-direction button[data-v="50"]')).toHaveAttribute('aria-pressed', 'true');
  expect(await page.evaluate(() => localStorage.getItem('f8_lang'))).toBe('de');
  await page.goto('/impact-checklist.html');
  await expect(page.locator('html')).toHaveAttribute('lang', 'de');
});
