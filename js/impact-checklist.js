/* ============================================================
   facilit8 Impact Checklist (impact-checklist.html)

   Plain JS, no third-party scripts. All copy comes from
   window.F8_I18N (js/i18n.js) under the `impact.*` namespace, so
   the EN/DE switch persists with the rest of the site.

   Nothing leaves the browser except:
     - anonymous counter pings (/api/impact/count: event + mode only)
     - an access-code check, when the user asks for deep mode or
       the team view
     - the interpretation request or Baseline contribution, each
       only after its own unticked box is ticked and submitted.
   ============================================================ */
(function () {
  'use strict';

  var I = window.F8_I18N;

  /* ── Config (edit here) ── */
  var CONFIG = {
    // "Read more" thought pieces per dimension. Empty = link hidden.
    thoughtPieces: {
      direction: '', risk: '', decisions: '', plan: '',
      people: '', partners: '', data: '', systems: ''
    },
    // Optional turnaround promise for personal interpretations, e.g.
    // { en: '5 working days', de: '5 Arbeitstagen' }. Empty = no promise shown.
    interpretationTurnaround: { en: '', de: '' },
    api: {
      access: '/api/impact/access',
      submit: '/api/impact/submit',
      baseline: '/api/impact/benchmark',
      count: '/api/impact/count'
    }
  };

  var DIMS = ['direction', 'risk', 'decisions', 'plan', 'people', 'partners', 'data', 'systems'];
  var LEAD = DIMS.slice(0, 4);
  var CAP = DIMS.slice(4);
  var TRUST = [0, 25, 50, 75, 100];
  var INDUSTRIES = ['lifeSciences', 'consumer', 'industrial', 'other'];
  var SIZES = ['lt50', '50to249', '250to999', '1000plus'];
  var FILE_TOOL = 'facilit8-impact-checklist';
  var FILE_VERSION = 2;

  /* ── Pure logic (also exposed on window.F8Impact for tests) ── */
  function pillarOf(id) { return LEAD.indexOf(id) >= 0 ? 'L' : 'C'; }
  function avg(a) { return Math.round(a.reduce(function (s, x) { return s + x; }, 0) / a.length); }
  function bandIdx(v) { return v < 50 ? 0 : v < 75 ? 1 : 2; }

  function itemKeys(mode) {
    if (mode === 'quick') return DIMS.slice();
    var out = [];
    DIMS.forEach(function (id) { for (var i = 0; i < 3; i++) out.push(id + '-' + i); });
    return out;
  }

  // Dimension trust: the quick answer, or the rounded average of the 3 deep statements.
  function computeScores(mode, ans) {
    var s = {};
    DIMS.forEach(function (id) {
      s[id] = mode === 'quick' ? ans[id] : avg([ans[id + '-0'], ans[id + '-1'], ans[id + '-2']]);
    });
    return s;
  }

  function averages(scores) {
    return {
      overall: avg(DIMS.map(function (id) { return scores[id]; })),
      leadership: avg(LEAD.map(function (id) { return scores[id]; })),
      capabilities: avg(CAP.map(function (id) { return scores[id]; }))
    };
  }

  function leadershipGap(scores) {
    var a = averages(scores);
    return a.leadership - a.capabilities >= 20;
  }

  // The 5 lowest dimensions, plus everything tied with the 5th. Empty when
  // every dimension is at 75% or above (the ranking step is skipped).
  function rankCandidates(scores) {
    if (DIMS.every(function (id) { return scores[id] >= 75; })) return [];
    var sorted = DIMS.slice().sort(function (a, b) { return scores[a] - scores[b]; });
    var cutoff = scores[sorted[4]];
    return DIMS.filter(function (id) { return scores[id] <= cutoff; });
  }

  function teamSummary(files) {
    var m = files.length;
    return DIMS.map(function (id) {
      var ts = files.map(function (f) { return f.scores.filter(function (s) { return s.id === id; })[0].trust; });
      var mn = Math.min.apply(null, ts), mx = Math.max.apply(null, ts);
      var top3 = files.filter(function (f) { return (f.ranking || []).slice(0, 3).indexOf(id) >= 0; }).length;
      return { id: id, avg: avg(ts), min: mn, max: mx, range: mx - mn, disagree: mx - mn >= 50, top3: top3, of: m };
    });
  }

  function teamStartOrder(summary) {
    return summary
      .filter(function (r) { return r.top3 > 0; })
      .sort(function (a, b) { return (b.top3 - a.top3) || (a.avg - b.avg) || (DIMS.indexOf(a.id) - DIMS.indexOf(b.id)); });
  }

  function validResultFile(j) {
    if (!j || j.tool !== FILE_TOOL || j.version !== FILE_VERSION) return false;
    if (!Array.isArray(j.scores) || j.scores.length !== 8 || !Array.isArray(j.ranking)) return false;
    var okScores = DIMS.every(function (id) {
      var s = j.scores.filter(function (x) { return x && x.id === id; })[0];
      return s && typeof s.trust === 'number' && s.trust >= 0 && s.trust <= 100;
    });
    var okRanking = j.ranking.every(function (id) { return DIMS.indexOf(id) >= 0; });
    return okScores && okRanking;
  }

  /* ── State ── */
  var state = {
    mode: 'quick',
    deepUnlocked: false,
    ans: {},
    candidates: [],
    order: [],        // working order on the ranking screen
    result: null,     // set once results exist
    startedSent: false,
    team: [],
    teamUnlocked: false
  };

  /* ── Helpers ── */
  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function t(key, vars) {
    var s = I.t('impact.' + key);
    if (typeof s === 'string' && vars) {
      s = s.replace(/\{(\w+)\}/g, function (m, v) { return v in vars ? vars[v] : m; });
    }
    return s;
  }
  function dim(id) { return I.t('impact.dims.' + id); }
  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  function scrollToEl(el) {
    el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'center' });
  }
  function postJSON(url, body) {
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      credentials: 'same-origin'
    });
  }
  // Anonymous counter: event + mode only. Failures are ignored.
  function count(event) {
    try {
      fetch(CONFIG.api.count, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: event, mode: state.mode }),
        keepalive: true,
        credentials: 'omit'
      }).catch(function () {});
    } catch (e) {}
  }

  /* ── Static text ── */
  function applyText() {
    document.documentElement.lang = I.lang;
    document.title = t('meta.title');
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute('content', t('meta.description'));
    $$('[data-t]').forEach(function (el) {
      var v = I.t(el.getAttribute('data-t'));
      if (typeof v === 'string') el.textContent = v;
    });
    $$('[data-t-aria]').forEach(function (el) {
      el.setAttribute('aria-label', I.t(el.getAttribute('data-t-aria')));
    });
    $$('[data-lang-btn]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang-btn') === I.lang));
    });
    fillSelect($('#fIndustry'), INDUSTRIES, 'setup.industryOptions');
    fillSelect($('#fSize'), SIZES, 'setup.sizeOptions');
  }

  function fillSelect(sel, values, base) {
    var cur = sel.value;
    sel.innerHTML = '<option value="">' + esc(t('setup.choose')) + '</option>' +
      values.map(function (v) { return '<option value="' + v + '">' + esc(t(base + '.' + v)) + '</option>'; }).join('');
    sel.value = cur;
  }

  /* ── Model ── */
  function renderModel() {
    function pillar(ids, cls, name, owner) {
      return '<div class="pillar ' + cls + '"><h3>' + esc(name) + '</h3><div class="owner">' + esc(owner) + '</div>' +
        ids.map(function (id) {
          var d = dim(id);
          var info = id === 'people'
            ? '<details class="info"><summary>' + esc(t('model.learningLabel')) + '</summary>' + esc(t('model.learningDef')) + '</details>'
            : '';
          return '<div class="dim"><div class="dim-head"><b>' + esc(d.name) + '</b><span class="q">' + esc(d.question) + '</span></div>' +
            '<p class="attrs">' + esc(d.attributes.join(' · ')) + '</p>' +
            '<p class="lens"><b>' + esc(t('model.lensLabel')) + ':</b> ' + esc(d.lens) + '</p>' + info + '</div>';
        }).join('') + '</div>';
    }
    $('#modelGrid').innerHTML =
      '<div class="roof"><b>' + esc(t('model.impact')) + '</b><span>' + esc(t('model.impactBody')) + '</span></div>' +
      pillar(LEAD, 'lead', t('model.leadership'), t('model.leadershipOwner')) +
      pillar(CAP, 'cap', t('model.capabilities'), t('model.capabilitiesOwner'));
  }

  /* ── Setup + items ── */
  function renderMode() {
    $$('.mode').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-mode') === state.mode)); });
    $('#deepCode').hidden = state.mode !== 'deep' || state.deepUnlocked;
    $('#paidSetup').hidden = state.deepUnlocked;
  }

  function scaleHTML(key, label) {
    var labels = t('scale.labels');
    return '<div class="scale" role="group" aria-label="' + esc(t('scale.groupLabel', { item: label })) + '">' +
      TRUST.map(function (v, i) {
        var on = state.ans[key] === v;
        return '<button type="button" data-key="' + key + '" data-v="' + v + '" aria-pressed="' + on + '"><b>' + v + '%</b>' + esc(labels[i]) + '</button>';
      }).join('') + '</div>';
  }

  function renderItems() {
    var box = $('#items');
    if (state.mode === 'deep' && !state.deepUnlocked) {
      box.innerHTML = '<div class="note slate">' + esc(t('assess.deepLocked')) + '</div>';
      updateProgress();
      return;
    }
    box.innerHTML = DIMS.map(function (id) {
      var d = dim(id);
      var cls = 'item' + (pillarOf(id) === 'C' ? ' cap' : '');
      var head = '<div class="item-head"><h3>' + esc(d.name) + '</h3><span class="tag">' + esc(d.question) + '</span></div>';
      var info = id === 'people'
        ? '<details class="info" style="margin-bottom:8px"><summary>' + esc(t('model.learningLabel')) + '</summary>' + esc(t('model.learningDef')) + '</details>'
        : '';
      if (state.mode === 'quick') {
        return '<div class="' + cls + '" id="it-' + id + '">' + head + info +
          '<div class="single"><p class="prefix">' + esc(t('scale.prefix')) + '</p><p class="stmt">' + esc(d.quick) + '</p>' +
          scaleHTML(id, d.name) + '</div></div>';
      }
      var levels = '<div class="levels-h">' + esc(t('assess.levelsHeading')) + '</div><div class="levels">' +
        ['level0', 'level50', 'level100'].map(function (k, i) {
          return '<div><b>' + esc(t('assess.' + k)) + '</b>' + esc(d.levels[i]) + '</div>';
        }).join('') + '</div>';
      var subs = d.statements.map(function (stmt, i) {
        var key = id + '-' + i;
        return '<div class="sub" id="sub-' + key + '"><div class="an">' + esc(d.attributes[i]) + '</div><p>' + esc(stmt) + '</p>' +
          scaleHTML(key, d.name + ': ' + d.attributes[i]) + '</div>';
      }).join('');
      return '<div class="' + cls + '" id="it-' + id + '">' + head + info + levels + subs + '</div>';
    }).join('');
    updateProgress();
  }

  function answeredCount() {
    return itemKeys(state.mode).filter(function (k) { return state.ans[k] != null; }).length;
  }

  function updateProgress() {
    var total = itemKeys(state.mode).length, done = answeredCount();
    $('#progTxt').textContent = t('assess.progress', { a: done, b: total });
    $('#progBar').style.width = (100 * done / total) + '%';
    return total - done;
  }

  function onScale(btn) {
    var key = btn.getAttribute('data-key');
    state.ans[key] = Number(btn.getAttribute('data-v'));
    btn.parentElement.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
    var sub = document.getElementById('sub-' + key);
    if (sub) sub.classList.remove('missing');
    var id = key.split('-')[0];
    var it = document.getElementById('it-' + id);
    if (it && dimComplete(id)) it.classList.remove('missing');
    if (!state.startedSent) { state.startedSent = true; count('started'); }
    if (!updateProgress()) $('#assessErr').textContent = '';
  }

  function dimComplete(id) {
    if (state.mode === 'quick') return state.ans[id] != null;
    return [0, 1, 2].every(function (i) { return state.ans[id + '-' + i] != null; });
  }

  function onContinue() {
    var err = $('#assessErr');
    var industry = $('#fIndustry').value, size = $('#fSize').value;
    $('#fld-industry').classList.toggle('missing', !industry);
    $('#fld-size').classList.toggle('missing', !size);
    if (state.mode === 'deep' && !state.deepUnlocked) {
      err.textContent = t('assess.deepLocked');
      scrollToEl($('#setup'));
      return;
    }
    var left = updateProgress();
    DIMS.forEach(function (id) {
      var it = document.getElementById('it-' + id);
      it.classList.toggle('missing', !dimComplete(id));
      if (state.mode === 'deep') {
        [0, 1, 2].forEach(function (i) {
          var s = document.getElementById('sub-' + id + '-' + i);
          s.classList.toggle('missing', state.ans[id + '-' + i] == null);
        });
      }
    });
    if (!industry || !size) {
      err.textContent = t('assess.missingSetup') + (left ? ' ' + (left === 1 ? t('assess.missingOne') : t('assess.missing', { n: left })) : '');
      scrollToEl($('#setup'));
      (industry ? $('#fSize') : $('#fIndustry')).focus({ preventScroll: true });
      return;
    }
    if (left) {
      err.textContent = left === 1 ? t('assess.missingOne') : t('assess.missing', { n: left });
      var first = state.mode === 'quick'
        ? document.querySelector('.item.missing')
        : document.querySelector('.sub.missing');
      if (first) {
        scrollToEl(first);
        var b = first.querySelector('.scale button');
        if (b) b.focus({ preventScroll: true });
      }
      return;
    }
    err.textContent = '';
    var scores = computeScores(state.mode, state.ans);
    state.candidates = rankCandidates(scores);
    state.pendingScores = scores;
    if (!state.candidates.length) {
      finish([]);
    } else {
      state.order = state.candidates.slice();
      renderRank();
      go('rank');
    }
  }

  /* ── Ranking ── */
  function renderRank() {
    var n = state.order.length;
    $('#rankBody').textContent = n === 5 ? t('rank.body') : t('rank.bodyTie', { n: n });
    var scores = state.pendingScores;
    $('#rankList').innerHTML = state.order.map(function (id, i) {
      var d = dim(id);
      return '<li class="rank-item" data-id="' + id + '">' +
        '<span class="rank-pos">' + (i + 1) + '</span>' +
        '<button type="button" class="rank-handle" aria-label="' + esc(t('rank.drag', { dim: d.name })) + '" tabindex="-1">⠿</button>' +
        '<div class="rank-name"><b>' + esc(d.name) + '</b><span>' + esc(t('rank.trust', { n: scores[id] })) + '</span></div>' +
        '<div class="rank-btns">' +
        '<button type="button" data-move="-1" data-id="' + id + '" aria-label="' + esc(t('rank.up', { dim: d.name })) + '"' + (i === 0 ? ' disabled' : '') + '>↑</button>' +
        '<button type="button" data-move="1" data-id="' + id + '" aria-label="' + esc(t('rank.down', { dim: d.name })) + '"' + (i === n - 1 ? ' disabled' : '') + '>↓</button>' +
        '</div></li>';
    }).join('');
  }

  function announceMove(id) {
    $('#rankLive').textContent = t('rank.moved', { dim: dim(id).name, n: state.order.indexOf(id) + 1 });
  }

  function moveBy(id, delta) {
    var i = state.order.indexOf(id), j = i + delta;
    if (i < 0 || j < 0 || j >= state.order.length) return;
    state.order.splice(i, 1);
    state.order.splice(j, 0, id);
    renderRank();
    announceMove(id);
    // keep focus on the same control so repeated key presses keep working
    var sel = '#rankList button[data-id="' + id + '"][data-move="' + delta + '"]';
    var btn = $(sel);
    if (btn && btn.disabled) btn = $('#rankList button[data-id="' + id + '"][data-move="' + (-delta) + '"]');
    if (btn) btn.focus();
  }

  // Pointer-based drag (mouse, pen and touch all arrive as pointer events).
  var drag = null;
  function onDragStart(e) {
    var handle = e.target.closest('.rank-handle');
    var li = e.target.closest('.rank-item');
    if (!li || (!handle && e.pointerType !== 'mouse')) return;
    if (e.target.closest('.rank-btns')) return;
    if (e.button !== undefined && e.button !== 0) return;
    e.preventDefault();
    drag = { li: li, id: li.getAttribute('data-id'), pointerId: e.pointerId };
    li.classList.add('dragging');
    try { li.setPointerCapture(e.pointerId); } catch (err) {}
  }
  function onDragMove(e) {
    if (!drag || e.pointerId !== drag.pointerId) return;
    e.preventDefault();
    var list = $('#rankList');
    var items = Array.prototype.slice.call(list.children);
    var y = e.clientY;
    var li = drag.li;
    var idx = items.indexOf(li);
    var prev = items[idx - 1], next = items[idx + 1];
    if (prev) {
      var pr = prev.getBoundingClientRect();
      if (y < pr.top + pr.height / 2) { list.insertBefore(li, prev); return; }
    }
    if (next) {
      var nr = next.getBoundingClientRect();
      if (y > nr.top + nr.height / 2) { list.insertBefore(next, li); }
    }
  }
  function onDragEnd(e) {
    if (!drag || e.pointerId !== drag.pointerId) return;
    var id = drag.id;
    drag.li.classList.remove('dragging');
    drag = null;
    state.order = Array.prototype.map.call($('#rankList').children, function (el) { return el.getAttribute('data-id'); });
    renderRank();
    announceMove(id);
  }

  function onRankDone() {
    finish(state.order.slice());
  }

  /* ── Results ── */
  function finish(ranking) {
    var scores = state.pendingScores;
    state.result = {
      tool: FILE_TOOL,
      version: FILE_VERSION,
      lang: I.lang,
      mode: state.mode,
      date: new Date().toISOString().slice(0, 10),
      name: $('#fName').value.trim(),
      role: $('#fRole').value.trim(),
      org: $('#fOrg').value.trim(),
      initiative: $('#fInit').value.trim(),
      industry: $('#fIndustry').value,
      size: $('#fSize').value,
      scores: DIMS.map(function (id) { return { id: id, pillar: pillarOf(id), trust: scores[id] }; }),
      ranking: ranking,
      answers: JSON.parse(JSON.stringify(state.ans))
    };
    count('completed');
    resetSendForms();
    $('#tab-results').disabled = false;
    renderResults();
    go('results');
  }

  function scoresMap(result) {
    var m = {};
    result.scores.forEach(function (s) { m[s.id] = s.trust; });
    return m;
  }

  function gaugeSVG(v) {
    var bandCol = ['var(--f8-red)', 'var(--f8-amber)', 'var(--f8-green)'];
    var r = 52, cx = 70, cy = 70, a = Math.PI * (v / 100);
    var x = cx - r * Math.cos(a), y = cy - r * Math.sin(a);
    var arc = v > 0 ? '<path d="M' + (cx - r) + ' ' + cy + ' A' + r + ' ' + r + ' 0 0 1 ' + x.toFixed(1) + ' ' + y.toFixed(1) + '" fill="none" stroke="' + bandCol[bandIdx(v)] + '" stroke-width="12" stroke-linecap="round"/>' : '';
    return '<svg viewBox="0 0 140 84" role="img" aria-label="' + v + '%"><path d="M' + (cx - r) + ' ' + cy + ' A' + r + ' ' + r + ' 0 0 1 ' + (cx + r) + ' ' + cy + '" fill="none" stroke="var(--f8-fog)" stroke-width="12" stroke-linecap="round"/>' + arc +
      '<text x="70" y="66" text-anchor="middle" font-family="Inter,sans-serif" font-weight="800" font-size="22" fill="var(--f8-navy)">' + v + '%</text></svg>';
  }

  function bandChip(v) {
    var cls = ['b-red', 'b-amber', 'b-green'][bandIdx(v)];
    return '<span class="band ' + cls + '">' + esc(t('results.bands')[bandIdx(v)]) + '</span>';
  }

  function renderResults() {
    var r = state.result;
    $('#resultsEmpty').hidden = !!r;
    $('#resultsBody').hidden = !r;
    if (!r) return;
    var s = scoresMap(r), a = averages(s), top3 = r.ranking.slice(0, 3);
    var modeLabel = r.mode === 'deep' ? t('results.modeDeep') : t('results.modeQuick');
    var who = [r.name, r.role, r.org].filter(Boolean).join(', ');
    $('#rMeta').textContent = [who, r.initiative, modeLabel, r.date].filter(Boolean).join(' · ');
    $('#kpis').innerHTML = [['overall', a.overall], ['leadership', a.leadership], ['capabilities', a.capabilities]].map(function (k) {
      return '<div class="kpi"><b>' + k[1] + '%</b><span>' + esc(t('results.' + k[0])) + '</span></div>';
    }).join('');
    $('#gapNote').hidden = !leadershipGap(s);

    function gauges(ids) {
      return '<div class="gauges">' + ids.map(function (id) {
        var d = dim(id), focus = top3.indexOf(id) >= 0;
        return '<div class="gauge' + (focus ? ' focus' : '') + '" data-dim="' + id + '">' +
          (focus ? '<span class="start-chip">' + esc(t('results.startHere')) + '</span>' : '') +
          gaugeSVG(s[id]) + '<div class="n">' + esc(d.name) + '</div><div class="qq">' + esc(d.question) + '</div>' + bandChip(s[id]) + '</div>';
      }).join('') + '</div>';
    }
    $('#gaugeWrap').innerHTML =
      '<div class="grouplabel l"><span>' + esc(t('results.leadership')) + '</span><span>' + a.leadership + '%</span></div>' + gauges(LEAD) +
      '<div class="grouplabel c"><span>' + esc(t('results.capabilities')) + '</span><span>' + a.capabilities + '%</span></div>' + gauges(CAP);

    var sustain = r.ranking.length === 0;
    $('#sustainCard').hidden = !sustain;
    $('#startCard').hidden = sustain;
    $('#startList').innerHTML = r.ranking.map(function (id, i) {
      var d = dim(id);
      var detail = '';
      if (i < 3) {
        var coaching = '';
        if (r.mode === 'deep' || i === 0) {
          coaching = '<div class="coaching" data-dim="' + id + '"><h4>' + esc(t('results.coachingHeading')) + '</h4><p class="muted">' + esc(t('results.coachingFrame')) + '</p><ul>' +
            d.coaching.map(function (q) { return '<li>' + esc(q) + '</li>'; }).join('') + '</ul>' +
            (r.mode === 'quick' ? '<p class="muted coaching-more" style="margin-top:8px">' + esc(t('results.coachingMore')) + '</p>' : '') +
            '</div>';
        }
        var url = CONFIG.thoughtPieces[id];
        var ai = '<div class="ai"><h4>' + esc(t('results.aiHeading')) + '</h4><p>' + esc(d.aiHelp) + '</p>' +
          '<p class="muted" style="margin-top:4px"><b>' + esc(t('results.aiRiskLabel')) + ':</b> ' + esc(d.aiRisk) + '</p>' +
          (url ? '<p style="margin-top:6px"><a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' + esc(t('results.readMore')) + ' →</a></p>' : '') +
          '</div>';
        detail = '<div class="start-detail">' + coaching + ai + '</div>';
      }
      return '<li data-dim="' + id + '"><div class="start-row"><b>' + esc(d.name) + '</b><span>' + s[id] + '%</span>' + bandChip(s[id]) + '</div>' + detail + '</li>';
    }).join('');

    $('#nextDims').innerHTML =
      CAP.map(function (id) { return '<span class="c">' + esc(dim(id).name) + '</span>'; }).join('') +
      LEAD.map(function (id) { return '<span class="l">' + esc(dim(id).name) + '</span>'; }).join('');
    $('#paidResults').hidden = r.mode === 'deep';
  }

  function slug(s) {
    return String(s || '').toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
  }

  function exportFile() {
    var r = state.result;
    if (!r) return;
    var name = ['impact-checklist', slug(r.org), slug(r.name), r.date].filter(Boolean).join('_') + '.json';
    var blob = new Blob([JSON.stringify(r, null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 0);
  }

  /* ── Interpretation + Baseline (each behind its own unticked box) ── */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function resetSendForms() {
    ['#cbInterpret', '#cbMarketing', '#cbBaseline'].forEach(function (s) { $(s).checked = false; });
    $('#interpretForm').hidden = true;
    $('#baselineForm').hidden = true;
    $('#btnInterpret').disabled = false;
    $('#btnBaseline').disabled = false;
    setMsg('#interpretMsg', '', '');
    setMsg('#baselineMsg', '', '');
  }

  function setMsg(sel, text, kind) {
    var el = $(sel);
    el.textContent = text;
    el.className = 'msg' + (kind ? ' ' + kind : '');
  }

  function scorePayload(r) {
    return {
      lang: I.lang,
      mode: r.mode,
      industry: r.industry,
      size: r.size,
      scores: scoresMap(r),
      ranking: r.ranking.slice()
    };
  }

  function sendInterpretation() {
    var r = state.result;
    if (!r || !$('#cbInterpret').checked) return;
    var email = $('#iEmail').value.trim();
    if (!EMAIL_RE.test(email)) {
      setMsg('#interpretMsg', t('interpret.errEmail'), 'err');
      $('#iEmail').focus();
      return;
    }
    var body = scorePayload(r);
    body.email = email;
    body.name = $('#iName').value.trim();
    body.org = $('#iOrg').value.trim();
    body.marketing = $('#cbMarketing').checked === true;
    var btn = $('#btnInterpret');
    btn.disabled = true;
    setMsg('#interpretMsg', t('interpret.sending'), '');
    postJSON(CONFIG.api.submit, body).then(function (res) {
      if (res.ok) {
        var turn = CONFIG.interpretationTurnaround[I.lang];
        var el = $('#interpretMsg');
        el.className = 'msg ok';
        el.innerHTML = '<b>' + esc(t('interpret.okTitle')) + '</b><br>' +
          esc(t('interpret.ok') + (turn ? ' ' + t('interpret.turnaround', { t: turn }) : ''));
        return;
      }
      btn.disabled = false;
      setMsg('#interpretMsg', res.status === 429 ? t('interpret.limited') : t('interpret.err'), 'err');
    }).catch(function () {
      btn.disabled = false;
      setMsg('#interpretMsg', t('interpret.err'), 'err');
    });
  }

  function sendBaseline() {
    var r = state.result;
    if (!r || !$('#cbBaseline').checked) return;
    var btn = $('#btnBaseline');
    btn.disabled = true;
    setMsg('#baselineMsg', t('baseline.sending'), '');
    postJSON(CONFIG.api.baseline, scorePayload(r)).then(function (res) {
      if (res.ok) { setMsg('#baselineMsg', t('baseline.ok'), 'ok'); return; }
      btn.disabled = false;
      setMsg('#baselineMsg', res.status === 429 ? t('baseline.limited') : t('baseline.err'), 'err');
    }).catch(function () {
      btn.disabled = false;
      setMsg('#baselineMsg', t('baseline.err'), 'err');
    });
  }

  /* ── Access codes (validated server-side only) ── */
  function checkCode(input, msgSel, btn, onOk) {
    var code = input.value.trim();
    if (!code) { setMsg(msgSel, t('setup.codeInvalid'), 'err'); input.focus(); return; }
    btn.disabled = true;
    setMsg(msgSel, t('setup.checking'), '');
    postJSON(CONFIG.api.access, { code: code }).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (j) { return { status: res.status, body: j }; });
    }).then(function (r) {
      btn.disabled = false;
      if (r.status === 200 && r.body.ok === true) { onOk(); return; }
      var key = r.status === 429 ? 'setup.codeLimited'
        : r.body.error === 'expired' ? 'setup.codeExpired'
        : r.body.error === 'invalid' ? 'setup.codeInvalid'
        : 'setup.codeError';
      setMsg(msgSel, t(key), 'err');
    }).catch(function () {
      btn.disabled = false;
      setMsg(msgSel, t('setup.codeError'), 'err');
    });
  }

  function unlockDeep() {
    checkCode($('#fCode'), '#codeMsg', $('#btnUnlock'), function () {
      state.deepUnlocked = true;
      state.teamUnlocked = true;
      renderMode();
      renderItems();
      renderTeamGate();
      var note = $('#paidSetup');
      note.hidden = false;
      note.textContent = t('setup.codeOk');
    });
  }

  /* ── Team comparison ── */
  function renderTeamGate() {
    $('#teamGate').hidden = state.teamUnlocked;
    $('#teamTool').hidden = !state.teamUnlocked;
  }

  function leaderLabel(i) {
    var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var x = i < 26 ? letters[i] : letters[Math.floor(i / 26) - 1] + letters[i % 26];
    return t('team.leader', { x: x });
  }

  function renderTeam() {
    var team = state.team;
    $('#teamBody').hidden = !team.length;
    if (!team.length) return;
    var showNames = $('#cbShowNames').checked;
    var labels = team.map(function (f, i) {
      return showNames ? (f.name || t('team.noName')) : leaderLabel(i);
    });
    $('#teamWho').textContent = (team.length === 1 ? t('team.whoOne') : t('team.who', { n: team.length })) + ': ' + labels.join(', ');
    var rows = teamSummary(team);
    var th = t('team.th');
    $('#teamTable').innerHTML = '<thead><tr>' + th.map(function (h) { return '<th scope="col">' + esc(h) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      rows.map(function (r) {
        var d = dim(r.id);
        return '<tr data-dim="' + r.id + '"><td><b>' + esc(d.name) + '</b><br><span class="muted">' + esc(d.question) + '</span></td>' +
          '<td>' + bandChip(r.avg).replace('</span>', ' · ' + r.avg + '%</span>') + '</td>' +
          '<td><div class="range" title="' + r.min + '% – ' + r.max + '%"><div class="span" style="left:' + r.min + '%;width:' + Math.max(r.range, 1) + '%"></div><div class="avg" style="left:calc(' + r.avg + '% - 2px)"></div></div><span class="muted">' + r.min + '% – ' + r.max + '%</span></td>' +
          '<td class="top3">' + esc(t('team.top3', { n: r.top3, m: r.of })) + '</td>' +
          '<td>' + (r.disagree ? '<span class="flag">' + esc(t('team.flag')) + '</span>' : '') + '</td></tr>';
      }).join('') + '</tbody>';
    var order = teamStartOrder(rows);
    $('#teamStart').innerHTML = order.length
      ? order.map(function (r) {
          return '<li data-dim="' + r.id + '"><b>' + esc(dim(r.id).name) + '</b> — ' + esc(t('team.votes', { n: r.top3, m: r.of, a: r.avg })) + '</li>';
        }).join('')
      : '<li style="list-style:none;margin-left:-20px" class="muted">' + esc(t('team.startNone')) + '</li>';
  }

  function loadTeamFiles(files) {
    var errs = [];
    var reads = Array.prototype.map.call(files, function (f) {
      return f.text().then(function (txt) {
        var j;
        try { j = JSON.parse(txt); } catch (e) { j = null; }
        if (validResultFile(j)) state.team.push(j);
        else errs.push(t('team.bad', { f: f.name }));
      }).catch(function () { errs.push(t('team.bad', { f: f.name })); });
    });
    return Promise.all(reads).then(function () {
      $('#teamErr').textContent = errs.join(' ');
      renderTeam();
    });
  }

  /* ── Navigation ── */
  function go(v) {
    $$('.tabs button').forEach(function (b) { b.setAttribute('aria-selected', String(b.getAttribute('data-view') === v)); });
    $$('.view').forEach(function (s) { s.classList.toggle('on', s.id === 'v-' + v); });
    if (v === 'results') renderResults();
    if (v === 'team') { renderTeamGate(); renderTeam(); }
    window.scrollTo({ top: document.querySelector('main').offsetTop - 8, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }

  function currentView() {
    var on = document.querySelector('.view.on');
    return on ? on.id.replace('v-', '') : 'model';
  }

  function rerenderAll() {
    applyText();
    renderModel();
    renderMode();
    renderItems();
    if (currentView() === 'rank') renderRank();
    renderResults();
    renderTeamGate();
    renderTeam();
    if (state.deepUnlocked) $('#paidSetup').textContent = t('setup.codeOk');
  }

  /* ── Events ── */
  document.addEventListener('click', function (e) {
    var lb = e.target.closest('[data-lang-btn]');
    if (lb) { I.setLang(lb.getAttribute('data-lang-btn')); return; }
    var tb = e.target.closest('.tabs button');
    if (tb) { if (!tb.disabled) go(tb.getAttribute('data-view')); return; }
    var gb = e.target.closest('[data-go]');
    if (gb) { go(gb.getAttribute('data-go')); return; }
    var mb = e.target.closest('.mode');
    if (mb) {
      state.mode = mb.getAttribute('data-mode');
      renderMode();
      renderItems();
      if (state.mode === 'deep' && !state.deepUnlocked) $('#fCode').focus();
      return;
    }
    var sb = e.target.closest('.scale button');
    if (sb) { onScale(sb); return; }
    var mv = e.target.closest('[data-move]');
    if (mv) { moveBy(mv.getAttribute('data-id'), Number(mv.getAttribute('data-move'))); return; }
  });

  window.addEventListener('f8langchange', rerenderAll);

  var rankList = $('#rankList');
  rankList.addEventListener('pointerdown', onDragStart);
  rankList.addEventListener('pointermove', onDragMove);
  rankList.addEventListener('pointerup', onDragEnd);
  rankList.addEventListener('pointercancel', onDragEnd);

  $('#btnContinue').addEventListener('click', onContinue);
  $('#btnRankDone').addEventListener('click', onRankDone);
  $('#btnPdf').addEventListener('click', function () { window.print(); });
  $('#btnExport').addEventListener('click', exportFile);
  $('#btnUnlock').addEventListener('click', unlockDeep);
  $('#fCode').addEventListener('keydown', function (e) { if (e.key === 'Enter') unlockDeep(); });
  $('#btnTeamUnlock').addEventListener('click', function () {
    checkCode($('#tCode'), '#tCodeMsg', $('#btnTeamUnlock'), function () {
      state.teamUnlocked = true;
      renderTeamGate();
    });
  });
  $('#tCode').addEventListener('keydown', function (e) { if (e.key === 'Enter') $('#btnTeamUnlock').click(); });

  $('#cbInterpret').addEventListener('change', function () {
    var on = this.checked;
    $('#interpretForm').hidden = !on;
    if (on && state.result) {
      if (!$('#iName').value) $('#iName').value = state.result.name;
      if (!$('#iOrg').value) $('#iOrg').value = state.result.org;
      $('#iEmail').focus();
    }
    if (!on) $('#cbMarketing').checked = false;
  });
  $('#btnInterpret').addEventListener('click', sendInterpretation);
  $('#cbBaseline').addEventListener('change', function () { $('#baselineForm').hidden = !this.checked; });
  $('#btnBaseline').addEventListener('click', sendBaseline);

  $('#teamFiles').addEventListener('change', function (e) {
    var input = e.target;
    loadTeamFiles(input.files).then(function () { input.value = ''; });
  });
  $('#teamLoadLabel').addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); $('#teamFiles').click(); }
  });
  $('#teamClear').addEventListener('click', function () { state.team = []; $('#teamErr').textContent = ''; renderTeam(); });
  $('#cbShowNames').addEventListener('change', renderTeam);

  rerenderAll();

  window.F8Impact = {
    DIMS: DIMS,
    computeScores: computeScores,
    averages: averages,
    leadershipGap: leadershipGap,
    rankCandidates: rankCandidates,
    teamSummary: teamSummary,
    teamStartOrder: teamStartOrder,
    validResultFile: validResultFile,
    config: CONFIG,
    _state: state
  };
})();
