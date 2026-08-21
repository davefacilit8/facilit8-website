/* ============================================================
   facilit8 — shared consent + HubSpot gate for standalone
   playbook pages (cio-po-agile-playbook.html, etc.)

   Reads/writes the SAME localStorage key as the main site
   (facilit8.org SPA), so a consent choice made on one page
   carries over to the others — no re-prompting per playbook.

   Usage on a playbook page:
     <script src="js/playbook-consent.js"></script>
     <script>
       F8Consent.onChange(function (consent) {
         // show/hide gated content, e.g. the "email me this
         // playbook" HubSpot form, based on consent.functional
       });
     </script>
   ============================================================ */
(function () {
  'use strict';

  var CONSENT_KEY = 'f8_cookie_consent'; // must match index.html
  var PORTAL_ID = '49059754';
  var HS_SCRIPT_ID = 'hs-script-loader';
  var listeners = [];

  function loadConsent() {
    try {
      var raw = localStorage.getItem(CONSENT_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function saveConsent(c) {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(Object.assign({}, c, { _ts: Date.now() })));
    } catch (e) {}
  }

  var consent = loadConsent();

  function has(id) {
    return !!(consent && consent[id]);
  }

  function notify() {
    listeners.forEach(function (fn) {
      try { fn(consent); } catch (e) {}
    });
  }

  function loadAnalyticsScript() {
    if (document.getElementById(HS_SCRIPT_ID)) return;
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.id = HS_SCRIPT_ID;
    s.async = true;
    s.defer = true;
    s.src = '//js-eu1.hs-scripts.com/' + PORTAL_ID + '.js';
    document.body.appendChild(s);
  }

  function applyConsent(next) {
    consent = next;
    saveConsent(consent);
    hideBanner();
    if (has('analytics')) loadAnalyticsScript();
    notify();
  }

  function acceptAll() {
    applyConsent({ essential: true, functional: true, analytics: true });
  }

  function essentialOnly() {
    applyConsent({ essential: true, functional: false, analytics: false });
  }

  /* ── Banner UI ── */
  var CSS = [
    '.f8c-banner{position:fixed;bottom:0;left:0;right:0;z-index:200;',
    'background:#0A1628;border-top:1px solid rgba(255,255,255,0.14);',
    'padding:16px 24px;font-family:var(--font-sans, Inter, system-ui, sans-serif);',
    'animation:f8cSlideUp 300ms ease-out both;box-sizing:border-box;}',
    '@keyframes f8cSlideUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}',
    '.f8c-inner{max-width:1180px;margin:0 auto;display:flex;align-items:center;gap:24px;flex-wrap:wrap;}',
    '.f8c-text{flex:1;min-width:220px;color:rgba(255,255,255,0.78);font-size:14px;margin:0;}',
    '.f8c-text a{color:#0090E7;text-decoration:underline;}',
    '.f8c-text a:hover{color:#fff;}',
    '.f8c-actions{display:flex;gap:10px;flex-wrap:wrap;flex-shrink:0;}',
    '.f8c-btn{font-family:inherit;font-size:14px;font-weight:600;padding:9px 18px;',
    'border-radius:8px;cursor:pointer;border:1px solid transparent;white-space:nowrap;}',
    '.f8c-btn--accept{background:#0090E7;color:#fff;border-color:#0090E7;}',
    '.f8c-btn--accept:hover{background:#0070C0;}',
    '.f8c-btn--essential{background:transparent;color:rgba(255,255,255,0.78);border-color:rgba(255,255,255,0.3);}',
    '.f8c-btn--essential:hover{background:rgba(255,255,255,0.08);}',
    '.f8c-gate{display:flex;flex-direction:column;align-items:center;justify-content:center;',
    'gap:12px;text-align:center;background:#F5F7FA;border-radius:12px;',
    'border:1px solid #E6ECF2;padding:36px 28px;}',
    '.f8c-gate p{color:#3A3F55;font-size:14px;max-width:420px;margin:0;}',
    '.f8c-gate button{font-family:inherit;font-size:14px;font-weight:600;padding:9px 20px;',
    'border-radius:8px;cursor:pointer;border:1px solid #0090E7;background:#0090E7;color:#fff;}',
    '.pb-closing,.pb-email-card{max-width:720px;margin:44px auto 0;padding:36px 32px;',
    'border-radius:var(--r-lg,12px);text-align:center;box-sizing:border-box;}',
    '.pb-closing{background:#0A1628;color:#fff;}',
    '.pb-closing h3{margin:0 0 10px;font-size:20px;font-weight:700;color:#fff;}',
    '.pb-closing p{margin:0 0 22px;font-size:15px;line-height:1.6;color:rgba(255,255,255,0.78);}',
    '.pb-email-card{background:#F5F7FA;border:1px solid #E6ECF2;margin-top:24px;}',
    '.pb-email-card h3{margin:0 0 10px;font-size:20px;font-weight:700;color:#0A1628;}',
    '.pb-email-card p{margin:0 0 22px;font-size:15px;line-height:1.6;color:#3A3F55;}',
    '.pb-closing-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}',
    '.pb-btn{font-family:inherit;font-size:14px;font-weight:600;padding:11px 22px;',
    'border-radius:8px;text-decoration:none;display:inline-block;border:1px solid transparent;',
    'cursor:pointer;}',
    '.pb-btn--primary{background:#0090E7;color:#fff;border-color:#0090E7;}',
    '.pb-btn--primary:hover{background:#0070C0;}',
    '.pb-btn--text{background:transparent;color:rgba(255,255,255,0.85);border-color:rgba(255,255,255,0.35);}',
    '.pb-btn--text:hover{background:rgba(255,255,255,0.08);}',
  ].join('');

  function injectCSS() {
    if (document.getElementById('f8c-style')) return;
    var style = document.createElement('style');
    style.id = 'f8c-style';
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  function hideBanner() {
    var el = document.getElementById('f8c-banner');
    if (el) el.remove();
  }

  function showBanner() {
    if (document.getElementById('f8c-banner')) return;
    injectCSS();
    var el = document.createElement('div');
    el.id = 'f8c-banner';
    el.className = 'f8c-banner';
    el.setAttribute('role', 'region');
    el.setAttribute('aria-label', 'Cookie notice');
    el.innerHTML =
      '<div class="f8c-inner">' +
      '<p class="f8c-text">We use cookies to power the &quot;email me this playbook&quot; form and, if you accept, to understand how visitors use this site. ' +
      '<a href="/#cookies">Manage preferences</a></p>' +
      '<div class="f8c-actions">' +
      '<button type="button" class="f8c-btn f8c-btn--essential" id="f8c-essential">Essential only</button>' +
      '<button type="button" class="f8c-btn f8c-btn--accept" id="f8c-accept">Accept all</button>' +
      '</div></div>';
    document.body.appendChild(el);
    document.getElementById('f8c-essential').addEventListener('click', essentialOnly);
    document.getElementById('f8c-accept').addEventListener('click', acceptAll);
  }

  /* ── HubSpot Forms embed (shared "email me this playbook" /
     "notify me" forms) ── */
  var FORMS_SCRIPT_SRC = '//js-eu1.hsforms.net/forms/embed/v2.js';
  var formsScriptLoading = false;
  var formsScriptCallbacks = [];

  function ensureFormsScript(cb) {
    if (window.hbspt && window.hbspt.forms) return cb();
    formsScriptCallbacks.push(cb);
    if (formsScriptLoading) return;
    formsScriptLoading = true;
    var s = document.createElement('script');
    s.src = FORMS_SCRIPT_SRC;
    s.onload = function () {
      formsScriptCallbacks.forEach(function (fn) { fn(); });
      formsScriptCallbacks = [];
    };
    document.body.appendChild(s);
  }

  // Mounts a shared HubSpot form (email-me-this-playbook / notify-me) into
  // a container, gated on functional consent. Re-renders automatically
  // whenever consent changes, so accepting mid-visit just works.
  function mountPlaybookForm(opts) {
    var container = document.getElementById(opts.containerId);
    if (!container) return;
    var hiddenFieldName = opts.hiddenFieldName || 'playbook_id';

    function renderForm() {
      var targetId = opts.containerId + '-hs';
      container.innerHTML = '<div id="' + targetId + '"></div>';
      ensureFormsScript(function () {
        window.hbspt.forms.create({
          region: 'eu1',
          portalId: PORTAL_ID,
          formId: opts.formId,
          target: '#' + targetId,
          onFormReady: function (form) {
            var hidden = form.querySelector('[name="' + hiddenFieldName + '"]');
            if (hidden) hidden.value = opts.playbookId;
          },
        });
      });
    }

    function renderGate() {
      container.innerHTML =
        '<div class="f8c-gate"><p>This form uses functional cookies, which you have not yet accepted.</p>' +
        '<button type="button">Manage cookie preferences</button></div>';
      container.querySelector('button').addEventListener('click', showBanner);
    }

    window.F8Consent.onChange(function (c) {
      if (c && c.functional) renderForm();
      else renderGate();
    });
  }

  /* ── Public API ── */
  window.F8Consent = {
    has: has,
    onChange: function (fn) {
      listeners.push(fn);
      // fire immediately with current state so callers don't need a
      // separate "check on load" branch
      try { fn(consent); } catch (e) {}
    },
    showPreferences: showBanner,
    mountPlaybookForm: mountPlaybookForm,
  };

  if (consent === null) {
    showBanner();
  } else if (has('analytics')) {
    loadAnalyticsScript();
  }
})();
