const { isAuthenticated, authCookieHeader } = require('./_lifelens-auth');

const NOSTORE_HEADERS = {
  'Content-Type': 'text/html; charset=utf-8',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
  'Cache-Control': 'no-store',
};

function loginPage(error) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow, noarchive">
<title>LifeLENS</title>
<style>
:root{--ink:#102A43;--amber:#E9A23B;--cream:#F6F1E7;--muted:#6B7280;}
*{box-sizing:border-box;}
body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--cream);font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:var(--ink);}
.card{background:#fff;border-radius:14px;padding:32px 28px;max-width:340px;width:calc(100% - 40px);box-shadow:0 4px 24px rgba(16,42,67,.12);}
h1{font-size:1.3rem;margin:0 0 6px;}
p{color:var(--muted);font-size:.88rem;margin:0 0 20px;}
input[type=password]{width:100%;font-size:.95rem;border:1px solid #D8D2C2;border-radius:8px;padding:11px 12px;margin-bottom:14px;}
button{width:100%;background:var(--ink);color:#fff;border:none;border-radius:9px;padding:12px;font-weight:600;font-size:.9rem;cursor:pointer;}
button:hover{background:#0c2138;}
.error{color:#C1502E;font-size:.82rem;margin:-10px 0 14px;}
</style>
</head>
<body>
  <form class="card" method="POST" action="/lifelens.html">
    <h1>LifeLENS</h1>
    <p>Private tracker. Enter the password to continue.</p>
    ${error ? '<div class="error">Wrong password — try again.</div>' : ''}
    <input type="password" name="password" autofocus autocomplete="current-password" required>
    <button type="submit">Enter</button>
  </form>
</body>
</html>`;
}

function appPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<meta name="robots" content="noindex, nofollow, noarchive">
<title>LifeLENS</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<style>
:root{
  --ink:#102A43;
  --slate:#2C5282;
  --teal:#2A9D8F;
  --rust:#C1502E;
  --amber:#E9A23B;
  --cream:#F6F1E7;
  --card:#FFFFFF;
  --charcoal:#1B1F23;
  --stone:#D8D2C2;
  --line:#E4DECB;
  --muted:#6B7280;
}
*{box-sizing:border-box;}
html,body{margin:0;padding:0;}
body{
  background:var(--cream);
  color:var(--charcoal);
  font-family:'Inter',sans-serif;
  -webkit-font-smoothing:antialiased;
  min-height:100vh;
}
h1,h2,h3{font-family:'Fraunces',serif;margin:0;}
.mono{font-family:'JetBrains Mono',monospace;}
button{font-family:inherit;cursor:pointer;}
:focus-visible{outline:3px solid var(--amber);outline-offset:2px;}

#app{max-width:480px;margin:0 auto;min-height:100vh;display:flex;flex-direction:column;background:var(--cream);position:relative;padding-bottom:78px;}

.topbar{
  background:var(--ink);color:#fff;
  display:flex;align-items:center;justify-content:space-between;
  padding:18px 18px 14px;
}
.brand{font-family:'Fraunces',serif;font-size:1.4rem;font-weight:600;letter-spacing:.2px;}
.brand span{color:var(--amber);}
.icon-btn{background:transparent;border:1px solid rgba(255,255,255,.35);color:#fff;width:36px;height:36px;border-radius:50%;font-size:1rem;line-height:1;}
.icon-btn:hover{background:rgba(255,255,255,.12);}

.counter-strip{
  background:var(--ink);color:#cdd9e8;
  padding:0 18px 16px;
  font-family:'JetBrains Mono',monospace;font-size:.78rem;
  display:flex;gap:14px;flex-wrap:wrap;
}
.counter-strip b{color:#fff;font-weight:700;}

main{flex:1;padding:18px 16px 24px;}
.view{display:none;}
.view.active{display:block;animation:fadein .25s ease;}
@keyframes fadein{from{opacity:0;transform:translateY(4px);}to{opacity:1;transform:translateY(0);}}
@media (prefers-reduced-motion:reduce){.view.active{animation:none;}}

/* ---- Cards ---- */
.card{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:16px;margin-bottom:14px;}
.card h2{font-size:1.05rem;margin-bottom:2px;}
.eyebrow{font-family:'JetBrains Mono',monospace;font-size:.68rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);margin-bottom:4px;display:block;}

/* ---- Arch ---- */
.arch-wrap{text-align:center;margin-bottom:6px;}
.arch-svg{width:100%;max-width:420px;height:auto;}
.arch-stone{stroke:var(--cream);stroke-width:2;transition:fill-opacity .4s ease;}
.stone-current{stroke:var(--ink);stroke-width:2.5;}
.stone-keystone{stroke:var(--ink);stroke-width:2.5;}
.arch-label{font-family:'JetBrains Mono',monospace;font-size:11px;fill:var(--ink);text-anchor:middle;dominant-baseline:middle;}
.arch-ground{stroke:var(--stone);stroke-width:3;}
@media (prefers-reduced-motion:no-preference){
  .arch-stone{animation:settle .5s ease backwards;}
  .arch-stone:nth-of-type(1){animation-delay:.02s;}
  .arch-stone:nth-of-type(2){animation-delay:.06s;}
  .arch-stone:nth-of-type(3){animation-delay:.10s;}
  .arch-stone:nth-of-type(4){animation-delay:.14s;}
  .arch-stone:nth-of-type(5){animation-delay:.18s;}
  .arch-stone:nth-of-type(6){animation-delay:.22s;}
  .arch-stone:nth-of-type(7){animation-delay:.26s;}
}
@keyframes settle{from{opacity:0;transform:translateY(-10px);}to{opacity:1;transform:translateY(0);}}

.legend-row{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:10px;font-size:.72rem;color:var(--muted);}
.legend-dot{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:5px;vertical-align:middle;}

/* ---- Phase accordion ---- */
details.phase{border:1px solid var(--line);border-radius:14px;margin-bottom:10px;overflow:hidden;background:var(--card);}
details.phase[open]{box-shadow:0 1px 0 rgba(0,0,0,.03);}
details.phase summary{list-style:none;cursor:pointer;padding:14px 16px;display:flex;align-items:center;gap:10px;}
details.phase summary::-webkit-details-marker{display:none;}
.phase-chip{width:10px;height:10px;border-radius:50%;flex-shrink:0;}
.phase-title{flex:1;}
.phase-title b{display:block;font-size:.98rem;}
.phase-title small{color:var(--muted);font-size:.74rem;}
.phase-body{padding:0 16px 16px;}
.thread{display:flex;justify-content:space-between;gap:10px;padding:9px 0;border-top:1px solid var(--line);}
.thread:first-child{border-top:none;}
.thread-main b{font-size:.88rem;}
.thread-main div{font-size:.78rem;color:var(--muted);margin-top:1px;}
.who-tag{font-size:.68rem;font-family:'JetBrains Mono',monospace;color:var(--slate);white-space:nowrap;align-self:flex-start;margin-top:2px;}
.light-touch{font-size:.7rem;color:var(--muted);margin-top:8px;}

/* ---- Checklist ---- */
.checklist{list-style:none;margin:0;padding:0;}
.checklist li{display:flex;align-items:flex-start;gap:10px;padding:10px 0;border-top:1px solid var(--line);}
.checklist li:first-child{border-top:none;}
.checklist input[type=checkbox]{accent-color:var(--amber);width:19px;height:19px;margin-top:2px;flex-shrink:0;}
.check-label{flex:1;}
.check-label b{font-size:.9rem;display:block;}
.check-label small{color:var(--muted);font-size:.76rem;}
.check-label.done b{text-decoration:line-through;color:var(--muted);}

select, textarea, input[type=date]{
  width:100%;font-family:inherit;font-size:.88rem;border:1px solid var(--line);
  border-radius:8px;padding:9px 10px;background:#fff;color:var(--charcoal);margin-top:6px;
}
textarea{resize:vertical;min-height:64px;}

/* ---- Progress grid ---- */
.grid-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch;margin:0 -4px;padding:0 4px;}
.progress-grid{border-collapse:collapse;font-size:.7rem;}
.progress-grid th,.progress-grid td{padding:0;text-align:center;}
.row-label{font-size:.72rem;text-align:left !important;padding-right:8px !important;white-space:nowrap;color:var(--charcoal);font-weight:500;}
.day-head{font-family:'JetBrains Mono',monospace;font-size:.6rem;color:var(--muted);writing-mode:vertical-rl;text-orientation:mixed;height:32px;}
.cell{width:15px;height:15px;}
.dot{width:11px;height:11px;border-radius:3px;margin:2px auto;background:var(--line);}
.dot.done{background:var(--amber);}
.dot.future{background:transparent;border:1px dashed var(--line);}
.streak-row{display:flex;justify-content:space-between;padding:8px 0;border-top:1px solid var(--line);font-size:.82rem;}
.streak-row:first-child{border-top:none;}
.streak-num{font-family:'JetBrains Mono',monospace;color:var(--amber);font-weight:700;}

/* ---- Tab bar ---- */
.tabbar{
  position:fixed;bottom:0;left:0;right:0;
  max-width:480px;margin:0 auto;
  background:var(--ink);display:flex;
  padding:6px 6px env(safe-area-inset-bottom,6px);
  box-shadow:0 -2px 12px rgba(0,0,0,.15);
}
.tab{flex:1;background:transparent;border:none;color:#9fb0c6;font-size:.74rem;font-weight:600;padding:9px 4px;border-radius:10px;}
.tab.active{color:#fff;background:rgba(255,255,255,.08);}
.tab.active span{border-bottom:2px solid var(--amber);}

/* ---- Modal ---- */
.modal-overlay{position:fixed;inset:0;background:rgba(16,42,67,.6);display:flex;align-items:center;justify-content:center;padding:20px;z-index:50;}
.modal-overlay[hidden]{display:none;}
.modal{background:#fff;border-radius:16px;padding:22px;max-width:360px;width:100%;}
.modal h3{font-size:1.1rem;margin-bottom:8px;}
.modal p{font-size:.85rem;color:var(--muted);margin:0 0 14px;}
.btn{display:inline-block;border:none;border-radius:9px;padding:11px 18px;font-weight:600;font-size:.88rem;width:100%;margin-top:14px;}
.btn-primary{background:var(--ink);color:#fff;}
.btn-primary:hover{background:#0c2138;}

.weekly-mini{display:flex;justify-content:space-between;align-items:center;font-size:.78rem;color:var(--muted);margin-top:4px;}
.empty-note{font-size:.82rem;color:var(--muted);font-style:italic;}

/* ---- Toast ---- */
.toast{
  position:fixed;top:10px;left:10px;right:10px;max-width:460px;margin:0 auto;
  background:var(--ink);color:#fff;border-radius:12px;padding:12px 14px;
  display:flex;align-items:flex-start;gap:10px;z-index:80;
  box-shadow:0 6px 20px rgba(0,0,0,.25);
  border-left:4px solid var(--amber);
}
.toast[hidden]{display:none;}
.toast .toast-text{flex:1;font-size:.82rem;line-height:1.4;}
.toast .toast-text b{display:block;font-size:.85rem;margin-bottom:2px;}
.toast-close{background:transparent;border:none;color:#cdd9e8;font-size:1rem;line-height:1;padding:0 2px;}
@media (prefers-reduced-motion:no-preference){
  .toast{animation:toast-in .3s ease;}
}
@keyframes toast-in{from{opacity:0;transform:translateY(-8px);}to{opacity:1;transform:translateY(0);}}
</style>
</head>
<body>

<div id="onboarding" class="modal-overlay" hidden>
  <div class="modal">
    <h3>When does LifeLENS start?</h3>
    <p>Monday is the natural Day 1. Pick the date so the plan knows where you are.</p>
    <input type="date" id="startDateInput">
    <button class="btn btn-primary" id="onboardingConfirm">This is Day 1</button>
  </div>
</div>

<div id="toast" class="toast" hidden role="status">
  <div class="toast-text" id="toastText"></div>
  <button class="toast-close" id="toastClose" aria-label="Dismiss">&times;</button>
</div>

<div id="app">
  <header class="topbar">
    <div class="brand">Life<span>LENS</span></div>
    <button class="icon-btn" id="settingsBtn" aria-label="Settings">&#9881;</button>
  </header>
  <div class="counter-strip" id="counterStrip"></div>

  <main id="views">
    <section id="view-overview" class="view active"></section>
    <section id="view-today" class="view"></section>
    <section id="view-week" class="view"></section>
    <section id="view-progress" class="view"></section>
  </main>

  <nav class="tabbar">
    <button class="tab active" data-view="overview"><span>Overview</span></button>
    <button class="tab" data-view="today"><span>Today</span></button>
    <button class="tab" data-view="week"><span>Week</span></button>
    <button class="tab" data-view="progress"><span>Progress</span></button>
  </nav>
</div>

<script>
/* ---------------- DATA ---------------- */
const THREADS = {
  facilit8:{label:"facilit8.org", why:"No platform, no Plan B.", who:"Solo"},
  sci:{label:"SCI work (paid)", why:"Cash flow now. Credibility always.", who:"SCI team"},
  portfolio:{label:"Portfolio / RM", why:"Stops the market keeping you up at night.", who:"RM"},
  hungarian:{label:"Hungarian", why:"Small win, every day.", who:"Solo"},
  aiquals:{label:"AI qualifications", why:"Turns experience into a credential.", who:"Solo"},
  gardenplan:{label:"Garden planning", why:"You plan, Agnes executes — together.", who:"Agnes"},
  planb:{label:"Plan B product", why:"First income earned outside payroll.", who:"Solo"},
  keystone:{label:"Project Keystone", why:"The thing that holds the arch up.", who:"Solo → community"},
  network:{label:"Network", why:"Friendships don't keep themselves.", who:"A contact"},
  planc_seed:{label:"Plan C — seed it", why:"Plant the idea before you need it to bloom.", who:"Agnes"},
  planc_shape:{label:"Plan C — shape it", why:"Two heads, one business model.", who:"Agnes"},
  planc:{label:"Plan C — launch it", why:"A business you build as a team.", who:"Agnes"},
  consolidate:{label:"Consolidate habits", why:"Decide what survives week 7.", who:"Agnes"}
};

const PHASES = [
  {id:1, weeks:[1,2], name:"Stabilise & Launch", color:"var(--teal)", hex:"#2A9D8F",
    threads:["facilit8","sci","portfolio"], light:["hungarian","aiquals","gardenplan","planc_seed"]},
  {id:2, weeks:[3,4], name:"Build", color:"var(--slate)", hex:"#2C5282",
    threads:["sci","planb","keystone","planc_shape"], light:["aiquals","network","gardenplan"]},
  {id:3, weeks:[5,6], name:"Launch & Land", color:"var(--rust)", hex:"#C1502E",
    threads:["sci","planb","planc","keystone"], light:["consolidate","gardenplan"]}
];

const DAILY_ANCHORS = [
  {id:"move", label:"Move — stretch + safe exercise", why:"Protects the tendon. Builds the rest of you."},
  {id:"jobsearch_daily", label:"Job search — every day", why:"Agnes is right: this can't wait for a free slot."},
  {id:"focus", label:"Focus block", why:"One deliberate hour on the business, beyond the job hunt."},
  {id:"quiet", label:"Quiet practice — 10 min", why:"The spiritual ballast that was missing."},
  {id:"connection", label:"Connection point with Agnes", why:"She's not support staff. Treat her like it."},
  {id:"hungarian", label:"Hungarian — 15 min", why:"Small win, every day."},
  {id:"evening", label:"Evening: book, not screen", why:"Agnes's biggest flag — don't let the day get scrolled away."},
  {id:"reflection", label:"Evening reflection", why:"What worked? What didn't?"}
];

const JOB_SEARCH_ACTIVITIES = [
  {id:"map", label:"Build the influence map (once, early)"},
  {id:"outreach", label:"Weekly outreach batch"},
  {id:"sweep", label:"Role-board sweep"},
  {id:"apply", label:"Tailored application"},
  {id:"interview", label:"Interview prep"},
  {id:"pipeline", label:"Pipeline & follow-up review"}
];

const ACTIVITIES = {
  facilit8: ["Feedback round (3–5 contacts)","Revise from feedback","SCI case-study content","Network launch message","Targeted outreach batch","SCI network ask","Bilingual content polish"],
  sci: ["Scope alignment with COO","Use-case shortlisting","Prototype build session","Stakeholder check-in","Rollout/handover prep","Hours tracking & invoicing"],
  portfolio: ["Father conversation","RM meeting booking + prep","RM meeting","Post-meeting execution","Follow-up & confirmation"],
  hungarian: ["Hungarian app — spec & build v1","Hungarian app — iterate","Real conversation practice","Survival-scenario drilling"],
  aiquals: ["Anthropic Academy sprint","Cowork/Code courses","Investigate Partner Network","Package the credential","Interview-ready talking points"],
  planb: ["Day-rate service offer","Capability Lens — spec the flow","Capability Lens — build v1","Capability Lens — test with real JD","Sketch a product concept","Idea-stage capture (batch)","Leave-behind packaging"],
  keystone: ["Study the model (Wellbeing Designers)","Reach out to Réka","Define the community","Name it","Plan episode 1","Record & produce episode 1","Publish & announce"],
  planc_seed: ["Pain-point brainstorm","Joint brainstorm w/ Agnes","Shortlist & sanity-check","Pick the seed"],
  planc_shape: ["Business model sketch","Pricing & offer definition","Website concept & content","Build the test website","Soft-test with real people"],
  planc: ["Announcement content","Network announcement","Traffic push","Monitor & capture signal","Reflect & decide"],
  consolidate: ["Anchor review","Business thread review","facilit8life — spec it","facilit8life — build v1","facilit8life — test it","Write week 7 plan"]
};

const WEEKLY_ANCHORS = [
  {id:"parentcall", label:"Call your parents", day:"Any day"},
  {id:"dormant", label:"Reconnect with a dormant contact", day:"Any day"},
  {id:"paperless", label:"Paperless session — scan + shred/burn", day:"Any day"},
  {id:"lawngarden", label:"Mow + garden time with Agnes", day:"Saturday or a weekday evening"}
];

/* ---------------- STATE ---------------- */
let STATE = null;
let currentTab = "overview";

function pad(n){return String(n).padStart(2,"0");}
function dayKey(d){return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());}
function todayDate(){const d=new Date();d.setHours(0,0,0,0);return d;}
function nextMonday(){
  const d = new Date(); d.setHours(0,0,0,0);
  const day = d.getDay();
  const diff = (1 - day + 7) % 7;
  d.setDate(d.getDate()+diff);
  return d;
}

let toastTimer=null;
function showToast(headline, detail){
  const el = document.getElementById("toast");
  document.getElementById("toastText").innerHTML = "<b>"+headline+"</b>"+detail;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>{ el.hidden = true; }, 6000);
}
document.getElementById("toastClose").addEventListener("click", ()=>{
  document.getElementById("toast").hidden = true;
  clearTimeout(toastTimer);
});

async function loadState(){
  let state = null;
  try{
    const res = await fetch('/api/lifelens/state', { credentials:'same-origin' });
    if(res.ok){
      const data = await res.json();
      if(data && data.state) state = data.state;
    }
  }catch(e){
    showToast("Couldn't load your saved progress.", "Starting fresh for now — refresh the page once you're back online to pick up where you left off.");
  }
  if(!state || typeof state !== 'object') state = {};
  if(!state.settings || typeof state.settings !== 'object') state.settings = { startDate:null };
  if(!state.days || typeof state.days !== 'object') state.days = {};
  if(!state.weeks || typeof state.weeks !== 'object') state.weeks = {};
  return state;
}
async function saveState(){
  try{
    const res = await fetch('/api/lifelens/state', {
      method:'POST',
      credentials:'same-origin',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(STATE)
    });
    if(!res.ok) throw new Error('save failed');
  }catch(e){
    showToast("That last change didn't save.", "Check your connection, then tap the box again — it'll retry.");
  }
}

function getDay(key){
  if(!STATE.days[key]) STATE.days[key]={move:false,jobsearch_daily:false,jobsearchActivity:"",focus:false,focusThread:"",focusActivity:"",quiet:false,connection:false,hungarian:false,evening:false,reflection:false,reflectionText:""};
  return STATE.days[key];
}
function getWeek(w){
  if(!STATE.weeks[w]) STATE.weeks[w]={parentcall:false,dormant:false,paperless:false,lawngarden:false};
  return STATE.weeks[w];
}

function computeDates(){
  const start = new Date(STATE.settings.startDate+"T00:00:00");
  start.setHours(0,0,0,0);
  const today = todayDate();
  let rawIndex = Math.floor((today-start)/86400000)+1;
  const notStarted = rawIndex<1;
  let dayIndex = rawIndex;
  if(dayIndex<1) dayIndex=1;
  if(dayIndex>42) dayIndex=42;
  const week = Math.min(6, Math.max(1, Math.ceil(dayIndex/7)));
  const phase = PHASES.find(p=>p.weeks.includes(week));
  const daysLeft = Math.max(0, 42-dayIndex);
  return {dayIndex, week, phase, daysLeft, today, notStarted, start};
}

/* ---------------- ARCH SVG ---------------- */
function polar(cx,cy,r,angleDeg){
  const a = angleDeg*Math.PI/180;
  return [cx+r*Math.cos(a), cy-r*Math.sin(a)];
}
function sectorPath(cx,cy,rOuter,rInner,a0,a1){
  const [ox0,oy0]=polar(cx,cy,rOuter,a0);
  const [ox1,oy1]=polar(cx,cy,rOuter,a1);
  const [ix1,iy1]=polar(cx,cy,rInner,a1);
  const [ix0,iy0]=polar(cx,cy,rInner,a0);
  return "M "+ox0+" "+oy0+" A "+rOuter+" "+rOuter+" 0 0 1 "+ox1+" "+oy1+" L "+ix1+" "+iy1+" A "+rInner+" "+rInner+" 0 0 0 "+ix0+" "+iy0+" Z";
}
const STEP = 180/7;
function stoneAngles(i){ return [180-i*STEP, 180-(i+1)*STEP]; }

function renderArchSVG(){
  const {week:curWeek} = computeDates();
  const order = [1,2,3,"K",4,5,6];
  let paths="", labels="";
  order.forEach((w,i)=>{
    const [a0,a1] = stoneAngles(i);
    const d = sectorPath(200,210,170,100,a0,a1);
    let fill, opacity, cls;
    if(w==="K"){
      const today = getDay(dayKey(new Date()));
      const ids = DAILY_ANCHORS.map(a=>a.id);
      const doneCount = ids.filter(k=>today[k]).length;
      opacity = (0.25+0.75*(doneCount/ids.length)).toFixed(2);
      fill = "#E9A23B"; cls="stone-keystone";
    } else {
      const ph = PHASES.find(p=>p.weeks.includes(w));
      if(w<curWeek){ fill=ph.hex; opacity=1; cls="stone-done"; }
      else if(w===curWeek){ fill=ph.hex; opacity=0.55; cls="stone-current"; }
      else { fill="#D8D2C2"; opacity=1; cls="stone-future"; }
    }
    paths += '<path d="'+d+'" fill="'+fill+'" fill-opacity="'+opacity+'" class="arch-stone '+cls+'"></path>';
    const mid=(a0+a1)/2;
    const [lx,ly]=polar(200,210,189,mid);
    const txt = w==="K" ? "Anchors" : ("W"+w);
    labels += '<text x="'+lx+'" y="'+ly+'" class="arch-label">'+txt+'</text>';
  });
  return '<svg viewBox="0 0 400 226" class="arch-svg" role="img" aria-label="Six week recovery arch">'+
    '<line x1="22" y1="210" x2="378" y2="210" class="arch-ground"/>'+paths+labels+'</svg>';
}

/* ---------------- RENDER: COUNTER STRIP ---------------- */
function renderCounterStrip(){
  if(!STATE || !STATE.settings.startDate){
    document.getElementById("counterStrip").innerHTML = '<span>Set your start date to begin</span>';
    return;
  }
  const {dayIndex,week,daysLeft,notStarted,start} = computeDates();
  if(notStarted){
    const opts={weekday:"long", month:"long", day:"numeric"};
    document.getElementById("counterStrip").innerHTML =
      '<span>Starts <b>'+start.toLocaleDateString(undefined,opts)+'</b></span><span>Preview mode</span>';
    return;
  }
  document.getElementById("counterStrip").innerHTML =
    '<span>Day <b>'+dayIndex+'</b> / 42</span><span>Week <b>'+week+'</b> / 6</span><span><b>'+daysLeft+'</b> days to weight-bearing</span>';
}

/* ---------------- RENDER: OVERVIEW ---------------- */
function threadRow(id){
  const t = THREADS[id];
  return '<div class="thread"><div class="thread-main"><b>'+t.label+'</b><div>'+t.why+'</div></div><div class="who-tag">'+t.who+'</div></div>';
}
function renderOverview(){
  const {phase} = computeDates();
  let phasesHTML = PHASES.map(p=>{
    const open = p.id===phase.id ? "open" : "";
    const lightList = p.light.map(id=>THREADS[id].label).join(" · ");
    return '<details class="phase" '+open+'>'+
      '<summary><span class="phase-chip" style="background:'+p.hex+'"></span>'+
      '<span class="phase-title"><b>Phase '+p.id+' — '+p.name+'</b><small>Weeks '+p.weeks[0]+'–'+p.weeks[1]+'</small></span></summary>'+
      '<div class="phase-body">'+ p.threads.map(threadRow).join("") +
      '<div class="light-touch">Light touch: '+lightList+'</div></div>'+
      '</details>';
  }).join("");

  const dailyHTML = DAILY_ANCHORS.map(a=>'<div class="thread"><div class="thread-main"><b>'+a.label+'</b><div>'+a.why+'</div></div></div>').join("");
  const weeklyHTML = WEEKLY_ANCHORS.map(a=>'<div class="thread"><div class="thread-main"><b>'+a.label+'</b><div>'+a.day+'</div></div></div>').join("");

  document.getElementById("view-overview").innerHTML =
    '<div class="card arch-wrap">'+ renderArchSVG() +
    '<div class="legend-row">'+
      '<span><span class="legend-dot" style="background:#2A9D8F"></span>Stabilise</span>'+
      '<span><span class="legend-dot" style="background:#2C5282"></span>Build</span>'+
      '<span><span class="legend-dot" style="background:#C1502E"></span>Launch</span>'+
      '<span><span class="legend-dot" style="background:#E9A23B"></span>Daily anchors</span>'+
    '</div></div>'+
    '<h2 style="margin:18px 0 10px;font-size:1rem;">The six weeks</h2>' + phasesHTML +
    '<div class="card"><span class="eyebrow">The keystone</span><h2>Daily anchors</h2><p style="font-size:.82rem;color:var(--muted);margin:4px 0 10px;">These hold the arch up regardless of phase. Same set, every day.</p>'+dailyHTML+'</div>'+
    '<div class="card"><span class="eyebrow">Every week</span><h2>Weekly anchors</h2>'+weeklyHTML+'</div>';
}

/* ---------------- RENDER: TODAY ---------------- */
function renderToday(){
  const {phase, week} = computeDates();
  const key = dayKey(new Date());
  const day = getDay(key);
  const week_ = getWeek(week);
  const allThreadOptions = phase.threads.concat(phase.light);

  const anchorItems = DAILY_ANCHORS.map(a=>{
    if(a.id==="jobsearch_daily"){
      const opts = JOB_SEARCH_ACTIVITIES.map(j=>'<option value="'+j.id+'" '+(day.jobsearchActivity===j.id?"selected":"")+'>'+j.label+'</option>').join("");
      return '<li><input type="checkbox" id="d_jobsearch_daily" '+(day.jobsearch_daily?"checked":"")+'>'+
        '<div class="check-label '+(day.jobsearch_daily?"done":"")+'"><b>'+a.label+'</b><small>'+a.why+'</small>'+
        '<select id="d_jobsearchActivity"><option value="">Pick today\\'s activity…</option>'+opts+'</select></div></li>';
    }
    if(a.id==="focus"){
      const opts = allThreadOptions.map(id=>'<option value="'+id+'" '+(day.focusThread===id?"selected":"")+'>'+THREADS[id].label+'</option>').join("");
      let activityHTML = "";
      if(day.focusThread && ACTIVITIES[day.focusThread]){
        const actOpts = ACTIVITIES[day.focusThread].map(label=>'<option value="'+label+'" '+(day.focusActivity===label?"selected":"")+'>'+label+'</option>').join("");
        activityHTML = '<select id="d_focusActivity"><option value="">Pick today\\'s activity…</option>'+actOpts+'</select>';
      }
      return '<li><input type="checkbox" id="d_focus" '+(day.focus?"checked":"")+'>'+
        '<div class="check-label '+(day.focus?"done":"")+'"><b>Focus block</b><small>'+a.why+'</small>'+
        '<select id="d_focusThread"><option value="">Pick today\\'s thread…</option>'+opts+'</select>'+activityHTML+'</div></li>';
    }
    if(a.id==="reflection"){
      return '<li><input type="checkbox" id="d_reflection" '+(day.reflection?"checked":"")+'>'+
        '<div class="check-label '+(day.reflection?"done":"")+'"><b>Evening reflection</b><small>'+a.why+'</small>'+
        '<textarea id="d_reflectionText" placeholder="What worked, what didn\\'t...">'+(day.reflectionText||"")+'</textarea></div></li>';
    }
    return '<li><input type="checkbox" id="d_'+a.id+'" '+(day[a.id]?"checked":"")+'>'+
      '<div class="check-label '+(day[a.id]?"done":"")+'"><b>'+a.label+'</b><small>'+a.why+'</small></div></li>';
  }).join("");

  const weeklyDone = WEEKLY_ANCHORS.filter(a=>week_[a.id]).length;
  const weeklyHTML = WEEKLY_ANCHORS.map(a=>
    '<li><input type="checkbox" id="w_'+a.id+'" '+(week_[a.id]?"checked":"")+'>'+
    '<div class="check-label '+(week_[a.id]?"done":"")+'"><b>'+a.label+'</b><small>'+a.day+'</small></div></li>'
  ).join("");

  document.getElementById("view-today").innerHTML =
    '<span class="eyebrow">Today · Phase '+phase.id+' · '+phase.name+'</span>'+
    '<div class="card"><span class="eyebrow">Shape, not a checklist</span><p style="font-size:.82rem;color:var(--muted);margin:6px 0 0;">Wake & start by ~08:00 · work in blocks with real breaks for food and rest · wind down with a book, not a screen.</p></div>'+
    '<div class="card"><h2>Today\\'s anchors</h2><ul class="checklist">'+anchorItems+'</ul></div>'+
    '<div class="card"><h2>This week\\'s big rocks</h2><div class="weekly-mini">'+weeklyDone+' of '+WEEKLY_ANCHORS.length+' done this week</div><ul class="checklist">'+weeklyHTML+'</ul></div>';

  // bind events
  DAILY_ANCHORS.forEach(a=>{
    if(a.id==="focus" || a.id==="reflection" || a.id==="jobsearch_daily") return;
    const el = document.getElementById("d_"+a.id);
    el.addEventListener("change", ()=>{ day[a.id]=el.checked; saveState(); renderToday(); renderArchInPlace(); });
  });
  const jsBox = document.getElementById("d_jobsearch_daily");
  jsBox.addEventListener("change", ()=>{ day.jobsearch_daily=jsBox.checked; saveState(); renderToday(); renderArchInPlace(); });
  const jsSel = document.getElementById("d_jobsearchActivity");
  jsSel.addEventListener("change", ()=>{ day.jobsearchActivity=jsSel.value; saveState(); });
  const focusBox = document.getElementById("d_focus");
  focusBox.addEventListener("change", ()=>{ day.focus=focusBox.checked; saveState(); renderToday(); renderArchInPlace(); });
  const focusSel = document.getElementById("d_focusThread");
  focusSel.addEventListener("change", ()=>{ day.focusThread=focusSel.value; day.focusActivity=""; saveState(); renderToday(); });
  const focusActSel = document.getElementById("d_focusActivity");
  if(focusActSel){ focusActSel.addEventListener("change", ()=>{ day.focusActivity=focusActSel.value; saveState(); }); }
  const reflBox = document.getElementById("d_reflection");
  reflBox.addEventListener("change", ()=>{ day.reflection=reflBox.checked; saveState(); renderToday(); renderArchInPlace(); });
  const reflText = document.getElementById("d_reflectionText");
  reflText.addEventListener("blur", ()=>{ day.reflectionText=reflText.value; saveState(); });

  WEEKLY_ANCHORS.forEach(a=>{
    const el = document.getElementById("w_"+a.id);
    el.addEventListener("change", ()=>{ week_[a.id]=el.checked; saveState(); renderToday(); renderWeek(); });
  });
}

function renderArchInPlace(){
  const wrap = document.querySelector("#view-overview .arch-wrap");
  if(wrap){ wrap.innerHTML = renderArchSVG() + wrap.innerHTML.split("</svg>")[1]; }
}

/* ---------------- RENDER: WEEK ---------------- */
function renderWeek(){
  const {week, phase} = computeDates();
  const week_ = getWeek(week);
  const weekRows = [1,2,3,4,5,6].map(w=>{
    const ph = PHASES.find(p=>p.weeks.includes(w));
    const cls = w===week ? "style='font-weight:700;'" : "";
    return '<div class="thread" '+cls+'><div class="thread-main"><b>Week '+w+'</b><div>'+ph.name+'</div></div>'+
      (w===week ? '<div class="who-tag">YOU ARE HERE</div>' : '')+'</div>';
  }).join("");

  const threadsHTML = phase.threads.map(threadRow).join("");
  const weeklyHTML = WEEKLY_ANCHORS.map(a=>
    '<li><input type="checkbox" id="wk_'+a.id+'" '+(week_[a.id]?"checked":"")+'>'+
    '<div class="check-label '+(week_[a.id]?"done":"")+'"><b>'+a.label+'</b><small>'+a.day+'</small></div></li>'
  ).join("");

  document.getElementById("view-week").innerHTML =
    '<div class="card"><span class="eyebrow">Phase '+phase.id+'</span><h2>'+phase.name+'</h2>'+threadsHTML+'</div>'+
    '<div class="card"><h2>This week\\'s big rocks</h2><ul class="checklist">'+weeklyHTML+'</ul></div>'+
    '<div class="card"><h2>All six weeks</h2>'+weekRows+'</div>';

  WEEKLY_ANCHORS.forEach(a=>{
    const el = document.getElementById("wk_"+a.id);
    el.addEventListener("change", ()=>{ week_[a.id]=el.checked; saveState(); renderWeek(); renderToday(); });
  });
}

/* ---------------- RENDER: PROGRESS ---------------- */
function renderProgress(){
  const {dayIndex} = computeDates();
  const start = new Date(STATE.settings.startDate+"T00:00:00"); start.setHours(0,0,0,0);
  const totalDays = 42;
  let headCells = "";
  const dayKeys = [];
  for(let i=1;i<=totalDays;i++){
    const d = new Date(start); d.setDate(start.getDate()+(i-1));
    dayKeys.push(dayKey(d));
    headCells += '<th class="day-head">D'+i+'</th>';
  }
  let rows = "";
  let streaks = {};
  DAILY_ANCHORS.forEach(a=>{
    let cells = "";
    let streak = 0; let counting = true;
    for(let i=totalDays;i>=1;i--){
      const k = dayKeys[i-1];
      const future = i>dayIndex;
      const d = STATE.days[k];
      const done = d ? !!d[a.id] : false;
      if(counting && !future){
        if(done) streak++; else counting=false;
      }
    }
    streaks[a.id]=streak;
    for(let i=1;i<=totalDays;i++){
      const k = dayKeys[i-1];
      const future = i>dayIndex;
      const d = STATE.days[k];
      const done = d ? !!d[a.id] : false;
      cells += '<td class="cell"><div class="dot '+(future?"future":(done?"done":""))+'"></div></td>';
    }
    rows += '<tr><td class="row-label">'+a.label+'</td>'+cells+'</tr>';
  });

  let totalDone=0, totalPossible=0;
  DAILY_ANCHORS.forEach(a=>{
    for(let i=1;i<=dayIndex;i++){
      totalPossible++;
      const d = STATE.days[dayKeys[i-1]];
      if(d && d[a.id]) totalDone++;
    }
  });
  const pct = totalPossible ? Math.round(100*totalDone/totalPossible) : 0;

  const streakHTML = DAILY_ANCHORS.map(a=>
    '<div class="streak-row"><span>'+a.label+'</span><span class="streak-num">'+streaks[a.id]+'d</span></div>'
  ).join("");

  document.getElementById("view-progress").innerHTML =
    '<div class="card"><span class="eyebrow">Overall</span><h2>'+pct+'% of anchors hit so far</h2></div>'+
    '<div class="card"><h2>Current streaks</h2>'+streakHTML+'</div>'+
    '<div class="card"><h2>The tally</h2><div class="grid-scroll"><table class="progress-grid"><thead><tr><th></th>'+headCells+'</tr></thead><tbody>'+rows+'</tbody></table></div></div>';
}

/* ---------------- TABS ---------------- */
function showTab(name){
  currentTab = name;
  document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));
  document.getElementById("view-"+name).classList.add("active");
  document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("active", t.dataset.view===name));
  if(name==="overview") renderOverview();
  if(name==="today") renderToday();
  if(name==="week") renderWeek();
  if(name==="progress") renderProgress();
}
document.querySelectorAll(".tab").forEach(btn=>{
  btn.addEventListener("click", ()=>showTab(btn.dataset.view));
});

/* ---------------- ONBOARDING / SETTINGS ---------------- */
function openOnboarding(){
  const input = document.getElementById("startDateInput");
  input.value = STATE.settings.startDate || dayKey(nextMonday());
  document.getElementById("onboarding").hidden = false;
}
document.getElementById("onboardingConfirm").addEventListener("click", ()=>{
  const v = document.getElementById("startDateInput").value;
  if(!v) return;
  STATE.settings.startDate = v;
  saveState();
  document.getElementById("onboarding").hidden = true;
  renderAll();
});
document.getElementById("settingsBtn").addEventListener("click", openOnboarding);

/* ---------------- INIT ---------------- */
function renderAll(){
  renderCounterStrip();
  renderOverview();
  renderToday();
  renderWeek();
  renderProgress();
  showTab(currentTab);
}
(async function init(){
  try{
    STATE = await loadState();
    if(!STATE.settings.startDate){
      STATE.settings.startDate = "2026-06-29";
      saveState();
    }
    renderAll();
  }catch(e){
    console.error('LifeLENS failed to start:', e);
    showToast("Something went wrong loading LifeLENS.", "Try refreshing the page. If it keeps happening, let David know.");
  }
})();
</script>
</body>
</html>`;
}

exports.handler = async (event) => {
  if (event.httpMethod === 'POST') {
    if (!process.env.LIFELENS_SECRET || !process.env.LIFELENS_PASSWORD) {
      return { statusCode: 500, headers: NOSTORE_HEADERS, body: 'LifeLENS is not configured yet: set LIFELENS_PASSWORD and LIFELENS_SECRET in Netlify site environment variables.' };
    }
    const params = new URLSearchParams(event.body || '');
    const password = params.get('password') || '';
    if (password !== process.env.LIFELENS_PASSWORD) {
      return { statusCode: 200, headers: NOSTORE_HEADERS, body: loginPage(true) };
    }
    return {
      statusCode: 200,
      headers: { ...NOSTORE_HEADERS, 'Set-Cookie': authCookieHeader() },
      body: appPage(),
    };
  }

  if (isAuthenticated(event)) {
    return { statusCode: 200, headers: NOSTORE_HEADERS, body: appPage() };
  }
  return { statusCode: 200, headers: NOSTORE_HEADERS, body: loginPage(false) };
};
