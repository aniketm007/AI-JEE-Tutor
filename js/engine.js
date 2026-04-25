// ═══════════════════════════════════════════════════════════
// JEE PLATFORM — SHARED ENGINE
// Used by every chapter. Chapter data loaded separately.
// ═══════════════════════════════════════════════════════════

// ─── CHAPTER REGISTRY ────────────────────────────────────────
// Populated by each chapter file via registerChapter()
let CHAPTER = null; // set by chapter file before init()

function registerChapter(data) {
  CHAPTER = data;
}

// ─── STATE ───────────────────────────────────────────────────
let ST = {};

function loadState() {
  const key = CHAPTER ? 'jt_' + CHAPTER.id : 'jt_state';
  ST = JSON.parse(localStorage.getItem(key) || 'null') || {
    strength: {},
    qbProg: {},
    qbLast: 0,
    qbFilter: 'all'
  };
  if (CHAPTER) {
    CHAPTER.concepts.forEach(cid => {
      if (ST.strength[cid] === undefined) ST.strength[cid] = 50;
    });
  }
  // If logged in, sync from Supabase in background and refresh UI when done
  if (typeof isLoggedIn === 'function' && isLoggedIn() && CHAPTER) {
    syncFromSupabase(CHAPTER.id).then(merged => {
      if (merged) {
        ST = merged;
        if (CHAPTER) CHAPTER.concepts.forEach(cid => {
          if (ST.strength[cid] === undefined) ST.strength[cid] = 50;
        });
        updateStrMini();
        updateProgress();
      }
    }).catch(() => {});
  }
}

function save() {
  const chId = CHAPTER ? CHAPTER.id : 'jt_state';
  // Always save to localStorage immediately (works offline)
  try { localStorage.setItem('jt_' + chId, JSON.stringify(ST)); } catch(e) {}
  // Also save to Supabase if logged in (async, non-blocking)
  if (typeof saveProgress === 'function') {
    saveProgress(chId, ST);
  }
}

// ─── NAVIGATION ──────────────────────────────────────────────
let curSec = 'intro';
let qbFilter = 'all';

function goTo(sec) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('vis'));
  const panel = document.getElementById('sec-' + sec);
  if (!panel) return;
  panel.classList.add('vis');
  document.querySelectorAll('.sb-it').forEach(el =>
    el.classList.toggle('act', el.dataset.s === sec)
  );
  document.getElementById('content').scrollTop = 0;
  curSec = sec;
  const titles = buildTitles();
  document.getElementById('tbT').textContent = titles[sec] || sec;
  if (CHAPTER && CHAPTER.concepts.includes(sec)) {
    runTeaching(sec);
    renderConceptQs(sec);
  }
  if (sec === 'nums') renderNums();
  if (sec === 'qb') { renderQB(); setTimeout(() => scrollQB(ST.qbLast || 0), 100); }
  if (sec === 'str') renderStr();
  updateProgress();
  updateStrMini();
  // Update AI context
  setAICtx(CHAPTER && CHAPTER.concepts.includes(sec) ? 'concept' : 'general',
    titles[sec] || sec, '');
}

function buildTitles() {
  const t = { intro: CHAPTER ? CHAPTER.title : 'Introduction', nums: 'Numericals', qb: 'Question Bank', str: 'My Strength' };
  if (CHAPTER) CHAPTER.concepts.forEach(cid => {
    const con = CHAPTER.conceptMeta[cid];
    if (con) t[cid] = con.title;
  });
  return t;
}

function toggleSB() { document.getElementById('sb').classList.toggle('col'); }

// ─── PROGRESS BAR ────────────────────────────────────────────
function updateProgress() {
  const total = CHAPTER ? CHAPTER.concepts.length : 1;
  const qbTotal = CHAPTER ? CHAPTER.qbank.length : 1;
  const answered = Object.keys(ST.qbProg).length;
  const pct = Math.round((answered / qbTotal) * 100);
  document.getElementById('pf').style.width = pct + '%';
  document.getElementById('tbP').textContent = pct + '%';
}

// ─── STRENGTH ────────────────────────────────────────────────
function updateStr(concept, ok) {
  const prev = ST.strength[concept] || 50;
  ST.strength[concept] = Math.min(100, Math.max(0, prev + (ok ? 10 : -8)));
  save();
  updateStrMini();
}

function updateStrMini() {
  const c = document.getElementById('strMini');
  if (!c || !CHAPTER) return;
  c.innerHTML = CHAPTER.concepts.map(k => {
    const p = ST.strength[k] || 50;
    const col = p >= 70 ? 'var(--green)' : p >= 40 ? 'var(--amber)' : 'var(--red)';
    const meta = CHAPTER.conceptMeta[k] || {};
    return `<div class="scr">
      <span class="scr-l">${meta.shortTitle || k}</span>
      <div class="scr-b"><div class="scr-f" style="width:${p}%;background:${col}"></div></div>
    </div>`;
  }).join('');
}

function renderStr() {
  const c = document.getElementById('str-content');
  if (!c || !CHAPTER) return;
  c.innerHTML = '';
  const overall = Math.round(
    CHAPTER.concepts.reduce((a, k) => a + (ST.strength[k] || 50), 0) / CHAPTER.concepts.length
  );
  const col = overall >= 70 ? 'var(--green)' : overall >= 40 ? 'var(--amber)' : 'var(--red)';
  const h = document.createElement('div'); h.className = 'sp';
  h.innerHTML = `
    <div class="sp-t">Concept Strength Report</div>
    <div style="display:flex;align-items:center;gap:14px;background:var(--surface2);border-radius:9px;padding:14px;margin-bottom:14px;">
      <div style="text-align:center;flex-shrink:0">
        <div style="font-size:30px;font-weight:700;color:${col}">${overall}%</div>
        <div style="font-size:11px;color:var(--hint)">Overall</div>
      </div>
      <div>
        <div style="font-size:14px;font-weight:600;margin-bottom:3px;">
          ${overall >= 70 ? 'Strong! Ready for next chapter.' : overall >= 40 ? 'Good progress. Review weaker concepts.' : 'Needs practice. Focus on red concepts.'}
        </div>
        <div style="font-size:12px;color:var(--muted)">${Object.keys(ST.qbProg).length} questions answered</div>
      </div>
    </div>
    <div class="sp-grid">${CHAPTER.concepts.map(k => {
      const p = ST.strength[k] || 50;
      const col2 = p >= 70 ? 'var(--green)' : p >= 40 ? 'var(--amber)' : 'var(--red)';
      const st = p >= 70 ? 'Strong' : p >= 40 ? 'Developing' : 'Needs Work';
      const meta = CHAPTER.conceptMeta[k] || {};
      return `<div class="spc">
        <div class="spc-n">${meta.title || k}</div>
        <div class="spc-bt"><div class="spc-bf" style="width:${p}%;background:${col2}"></div></div>
        <div class="spc-s"><span style="color:${col2};font-weight:600">${st}</span><span>${p}%</span></div>
        <button class="btn bo" style="margin-top:8px;padding:4px 10px;font-size:11px" onclick="goTo('${k}')">Review →</button>
      </div>`;
    }).join('')}</div>`;
  c.appendChild(h);

  const weak = CHAPTER.concepts.filter(k => (ST.strength[k] || 50) < 50);
  if (weak.length) {
    const rec = document.createElement('div'); rec.className = 'sp';
    rec.innerHTML = `<div class="sp-t">Focus Areas</div>
      ${weak.map(k => {
        const meta = CHAPTER.conceptMeta[k] || {};
        return `<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border);font-size:13px;color:var(--muted)">
          <span style="flex:1">${meta.title || k}</span>
          <button class="btn ba" style="padding:4px 10px;font-size:11px" onclick="goTo('${k}')">Go →</button>
        </div>`;
      }).join('')}`;
    c.appendChild(rec);
  }
}

// ─── TEACHING ENGINE ─────────────────────────────────────────
const runningTeach = {};

function runTeaching(sec) {
  if (runningTeach[sec]) return;
  runningTeach[sec] = true;
  const feed = document.getElementById('feed-' + sec);
  if (!feed || feed.children.length > 0) return;
  if (CHAPTER && CHAPTER.teach && CHAPTER.teach[sec]) {
    CHAPTER.teach[sec](feed, { addBub, addCont, delay, makeDiag });
  }
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

function addBub(feed, html, type = 'ai', ms = 350) {
  return new Promise(r => {
    setTimeout(() => {
      const b = document.createElement('div');
      b.className = 'bub ' + type;
      const labels = { ai: '◆ Tutor', ok: '✓ Tutor', ng: '↩ Tutor' };
      if (labels[type]) b.innerHTML = `<div class="lbl">${labels[type]}</div>${html}`;
      else b.innerHTML = html;
      feed.appendChild(b);
      feed.closest('#content').scrollTop += 9999;
      r(b);
    }, ms);
  });
}

function addCont(feed, label = 'Got it →') {
  return new Promise(r => {
    const b = document.createElement('button');
    b.className = 'btn bp'; b.style.marginTop = '8px'; b.textContent = label;
    b.onclick = () => { b.remove(); r(); };
    feed.appendChild(b);
  });
}

// ─── DIAGRAM RENDERER ────────────────────────────────────────
// drawFn(canvas)      → static diagram
// drawFn(canvas, t)   → animated (requestAnimationFrame), t = seconds
function makeDiag(lbl, drawFn) {
  const card = document.createElement('div');
  card.className = 'diag-card';
  const l = document.createElement('div');
  l.className = 'diag-lbl'; l.textContent = lbl;
  const cv = document.createElement('canvas');
  cv.style.cssText = 'display:block;width:100%;height:auto;';
  cv.width = 600;
  card.appendChild(l); card.appendChild(cv);
  cv._drawFn = drawFn;

  if (drawFn.length >= 2) {
    // Animated
    let startTs = null, rafId = null;
    function frame(ts) {
      if (!startTs) startTs = ts;
      try { drawFn(cv, (ts - startTs) / 1000); } catch(e) {}
      cv._rafId = rafId = requestAnimationFrame(frame);
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && !cv._rafId) {
          startTs = null;
          cv._rafId = requestAnimationFrame(frame);
        } else if (!e.isIntersecting && cv._rafId) {
          cancelAnimationFrame(cv._rafId); cv._rafId = null;
        }
      });
    }, { threshold: 0.1 });
    io.observe(cv);
    cv._rafId = requestAnimationFrame(frame);
  } else {
    try { drawFn(cv); } catch(e) { console.warn('diagram error', e); }
  }
  // Re-draw on panel show
  cv._drawFn = drawFn;
  return card;
}

// Re-draw static canvases when panel becomes visible
const _panelObs = new MutationObserver(mutations => {
  mutations.forEach(m => {
    if (m.type === 'attributes' && m.attributeName === 'class') {
      if (m.target.classList.contains('vis')) {
        m.target.querySelectorAll('canvas').forEach(cv => {
          if (cv._drawFn && cv._drawFn.length < 2) {
            try { cv._drawFn(cv); } catch(e) {}
          }
        });
      }
    }
  });
});

// ─── CONCEPT QUESTIONS ENGINE ────────────────────────────────
const renderedCQs = {};

function renderConceptQs(concept) {
  if (renderedCQs[concept]) return;
  renderedCQs[concept] = true;
  const container = document.getElementById('q-' + concept);
  if (!container || !CHAPTER) return;
  const qs = CHAPTER.conceptQs[concept];
  if (!qs || !qs.length) return;

  const hdr = document.createElement('div');
  hdr.style.cssText = 'display:flex;align-items:center;gap:10px;margin-bottom:12px;background:var(--surface);border:1px solid var(--border2);border-radius:10px;padding:12px 14px;';
  hdr.innerHTML = `
    <div style="font-size:12px;font-weight:700;color:var(--text)">Concept Check</div>
    <div class="qdots" id="dots-${concept}">
      ${qs.map((_, i) => `<div class="qd${i === 0 ? ' cur' : ''}" id="dot-${concept}-${i}"></div>`).join('')}
    </div>
    <div style="margin-left:auto;font-size:11px;color:var(--hint)">CBSE → Mains → Advanced</div>`;
  container.appendChild(hdr);
  renderSingleQ(container, qs[0], concept, 0, qs.length);
}

function renderSingleQ(container, q, concept, idx, total) {
  if (document.getElementById('qcard-' + q.id)) return;
  const div = document.createElement('div');
  div.id = 'qcard-' + q.id;
  div.style.cssText = 'background:var(--surface);border:1px solid var(--border2);border-radius:12px;padding:18px;margin-bottom:12px;animation:fu .3s ease both;';

  const lvlC = { cbse: 'cbse', mains: 'mains', advanced: 'advanced' }[q.level] || 'cbse';
  const lvlL = { cbse: 'CBSE', mains: 'JEE Mains', advanced: 'JEE Advanced' }[q.level] || q.level;
  const stars = '★'.repeat(q.diff || 1) + '☆'.repeat(4 - (q.diff || 1));
  const diagHtml = q.diagFn ? `<div id="diag-${q.id}" style="margin-bottom:12px;"></div>` : '';

  div.innerHTML = `
    <div class="qh">
      <span class="ql ${lvlC}">${lvlL}</span>
      <span class="qn">Q${idx + 1}/${total}</span>
      <span class="qdiff">${stars}</span>
    </div>
    ${diagHtml}
    <div class="qtext">${q.text}</div>
    <div class="opts" id="opts-${q.id}">
      ${q.opts.map((o, i) => `<div class="opt" data-i="${i}"><span class="ol">${'ABCD'[i]}</span><span>${o}</span></div>`).join('')}
    </div>
    <div class="expbox" id="exp-${q.id}">
      <div class="exp-tag">◆ Step-by-Step Explanation</div>
      <div class="exp-body">
        <p style="margin-bottom:8px">${q.exp.short}</p>
        <div class="exp-steps">
          ${q.exp.steps.map((s, i) => `<div class="exp-step"><div class="esn">${i + 1}</div><div class="esb">${s}</div></div>`).join('')}
        </div>
        <div class="ans-box">✓ ${q.exp.answer}</div>
      </div>
    </div>
    <div class="row-btns" id="qa-${q.id}"></div>`;

  container.appendChild(div);

  if (q.diagFn) {
    const dc = document.getElementById('diag-' + q.id);
    if (dc) dc.appendChild(makeDiag('Diagram', q.diagFn));
  }

  div.querySelectorAll('.opt').forEach(opt => {
    opt.addEventListener('click', () => answerConceptQ(q, concept, idx, total, opt));
  });

  const actEl = div.querySelector('#qa-' + q.id);
  if (actEl) addAskArjunBtn(actEl, q, (CHAPTER.conceptMeta[concept] || {}).title + ' Q' + (idx + 1));
}

function answerConceptQ(q, concept, idx, total, clickedOpt) {
  const optsEl = document.getElementById('opts-' + q.id);
  const allOpts = optsEl.querySelectorAll('.opt');
  allOpts.forEach(o => o.classList.add('off'));
  const chosen = +clickedOpt.dataset.i;
  const ok = chosen === q.correct;
  clickedOpt.classList.remove('off');
  clickedOpt.classList.add(ok ? 'correct' : 'wrong');
  if (!ok) { allOpts[q.correct].classList.remove('off'); allOpts[q.correct].classList.add('correct'); }
  document.getElementById('exp-' + q.id).classList.add('show');
  updateStr(q.concept, ok);
  buildQActions(q, concept, idx, total, ok);
}

function buildQActions(q, concept, idx, total, ok) {
  const acts = document.getElementById('qa-' + q.id);
  if (!acts) return;
  acts.innerHTML = '';
  const qs = CHAPTER.conceptQs[concept];
  const meta = CHAPTER.conceptMeta[concept] || {};

  const rb = document.createElement('button'); rb.className = 'btn br';
  rb.textContent = '↩ Revisit ' + (meta.shortTitle || concept);
  rb.onclick = () => goToWithReturn(concept, concept, idx);
  acts.appendChild(rb);

  if (idx < total - 1) {
    const nb = document.createElement('button'); nb.className = 'btn bp';
    nb.textContent = ok ? 'Next Question →' : 'Try Similar →';
    nb.onclick = () => {
      document.getElementById('qcard-' + q.id).style.display = 'none';
      const nextQ = qs[idx + 1];
      const existing = document.getElementById('qcard-' + nextQ.id);
      if (existing) existing.style.display = '';
      else renderSingleQ(document.getElementById('q-' + concept), nextQ, concept, idx + 1, total);
      updateDots(concept, idx + 1);
      setTimeout(() => {
        const nc = document.getElementById('qcard-' + nextQ.id);
        if (nc) nc.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    };
    acts.appendChild(nb);
  } else {
    const done = document.createElement('div');
    done.style.cssText = 'padding:10px;background:rgba(34,197,94,.08);border:1px solid rgba(34,197,94,.22);border-radius:8px;font-size:13px;color:var(--green);';
    done.textContent = '✓ All concept questions done! Head to Question Bank or Numericals.';
    acts.appendChild(done);
    const sbEl = document.querySelector('.sb-it[data-s="' + concept + '"]');
    if (sbEl) sbEl.classList.add('done');
  }
}

function goToWithReturn(sec, fromConcept, fromIdx) {
  goTo(sec);
  const existing = document.getElementById('ret-banner'); if (existing) existing.remove();
  const banner = document.createElement('div'); banner.className = 'ret-banner'; banner.id = 'ret-banner';
  banner.innerHTML = `<span>← Reviewing concept. Return to continue questions.</span>
    <button class="btn bp" style="padding:6px 12px;font-size:12px" onclick="returnToQ('${fromConcept}',${fromIdx})">Return to Q${fromIdx + 1} →</button>`;
  document.getElementById('sec-' + sec).insertBefore(banner, document.getElementById('sec-' + sec).firstChild);
}

function returnToQ(concept, idx) {
  const banner = document.getElementById('ret-banner'); if (banner) banner.remove();
  goTo(concept);
  const qs = CHAPTER.conceptQs[concept];
  qs.forEach((q, i) => { const c = document.getElementById('qcard-' + q.id); if (c) c.style.display = i === idx ? '' : 'none'; });
  updateDots(concept, idx);
  setTimeout(() => { const c = document.getElementById('qcard-' + qs[idx].id); if (c) c.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 150);
}

function updateDots(concept, activeIdx) {
  if (!CHAPTER) return;
  CHAPTER.conceptQs[concept] && CHAPTER.conceptQs[concept].forEach((_, i) => {
    const d = document.getElementById(`dot-${concept}-${i}`);
    if (d) d.className = 'qd' + (i < activeIdx ? ' ok' : i === activeIdx ? ' cur' : '');
  });
}

// ─── NUMERICALS ──────────────────────────────────────────────
let numsRendered = false;

function renderNums() {
  if (numsRendered) return; numsRendered = true;
  const c = document.getElementById('nums-content');
  if (!c || !CHAPTER) return;
  CHAPTER.numericals.forEach((num, i) => {
    const card = document.createElement('div'); card.className = 'num-card';
    const lvlL = { cbse: 'CBSE', mains: 'JEE Mains', advanced: 'JEE Advanced' }[num.level] || num.level;
    const cname = (CHAPTER.conceptMeta[num.concept] || {}).shortTitle || num.concept;
    card.innerHTML = `
      <div class="num-tag">${lvlL} · ${cname}</div>
      <div class="num-title">${num.title}</div>
      <div class="num-prob">${num.problem}</div>
      ${num.diagFn ? `<div id="ndiag-${i}" style="margin-bottom:12px;"></div>` : ''}
      <div class="opts" id="nopts-${i}">
        ${num.opts.map((o, j) => `<div class="opt" data-j="${j}"><span class="ol">${'ABCD'[j]}</span><span>${o}</span></div>`).join('')}
      </div>
      <div class="row-btns" id="na-${i}" style="margin-bottom:10px"></div>
      <div class="sol-steps" id="nsol-${i}">
        <div class="sol-hd">◆ Step-by-Step Solution</div>
        ${num.steps.map((s, j) => `<div class="sol-step"><div class="ssn">${j + 1}</div><div class="ssb">${s}</div></div>`).join('')}
        <div class="sol-ans">${num.answer}</div>
      </div>`;
    c.appendChild(card);
    if (num.diagFn) {
      const dc = document.getElementById('ndiag-' + i);
      if (dc) dc.appendChild(makeDiag('Diagram', num.diagFn));
    }
    const naEl = card.querySelector('#na-' + i);
    if (naEl) addAskArjunBtn(naEl, { text: num.problem, opts: num.opts, concept: num.concept }, 'Numerical ' + (i + 1));
    card.querySelectorAll('.opt').forEach(opt => {
      opt.addEventListener('click', () => answerNum(i, num, +opt.dataset.j, card));
    });
  });
}

function answerNum(i, num, chosen, card) {
  const opts = card.querySelectorAll('.opt');
  opts.forEach(o => o.classList.add('off'));
  const ok = chosen === num.correct;
  opts[chosen].classList.remove('off'); opts[chosen].classList.add(ok ? 'correct' : 'wrong');
  if (!ok) { opts[num.correct].classList.remove('off'); opts[num.correct].classList.add('correct'); }
  card.querySelector('#nsol-' + i).classList.add('show');
  updateStr(num.concept, ok);
  const acts = card.querySelector('#na-' + i); acts.innerHTML = '';
  const rb = document.createElement('button'); rb.className = 'btn br';
  rb.textContent = '↩ Revisit ' + ((CHAPTER.conceptMeta[num.concept] || {}).shortTitle || num.concept);
  rb.onclick = () => goTo(num.concept);
  acts.appendChild(rb);
  if (ok) { const win = document.createElement('span'); win.style.cssText = 'font-size:12px;color:var(--green);padding:8px 4px;'; win.textContent = '✓ Correct!'; acts.appendChild(win); }
  addAskArjunBtn(acts, { text: num.problem, opts: num.opts, concept: num.concept }, 'Numerical ' + (i + 1));
}

// ─── QUESTION BANK ───────────────────────────────────────────
function renderQB() {
  const c = document.getElementById('qb-content'); c.innerHTML = '';
  if (!CHAPTER) return;
  const filtered = CHAPTER.qbank.filter(q => qbFilter === 'all' || q.level === qbFilter);
  document.getElementById('qbProg').textContent = `${filtered.filter(q => ST.qbProg[q.id]).length}/${filtered.length} answered`;

  filtered.forEach((q, idx) => {
    const done = ST.qbProg[q.id];
    const card = document.createElement('div'); card.id = 'qbc-' + q.id;
    card.style.cssText = 'background:var(--surface);border:1px solid var(--border2);border-radius:12px;padding:18px;margin-bottom:12px;';
    const lvlC = { cbse: 'cbse', mains: 'mains', advanced: 'advanced' }[q.level] || 'cbse';
    const lvlL = { cbse: 'CBSE', mains: 'JEE Mains', advanced: 'JEE Advanced' }[q.level] || q.level;
    const stars = '★'.repeat(q.diff || 1) + '☆'.repeat(4 - (q.diff || 1));
    const cname = (CHAPTER.conceptMeta[q.concept] || {}).shortTitle || q.concept || '';
    const diagHtml = q.diagFn ? `<div id="qbdiag-${q.id}" style="margin-bottom:12px;"></div>` : '';

    card.innerHTML = `
      <div class="qh">
        <span class="ql ${lvlC}">${lvlL}</span>
        <span class="qn">Q${idx + 1}/${filtered.length}</span>
        <span style="font-size:10px;color:var(--hint)">${cname}</span>
        <span class="qdiff">${stars}</span>
      </div>
      ${diagHtml}
      <div class="qtext">${q.text}</div>
      <div class="opts" id="qbopts-${q.id}">
        ${q.opts.map((o, i) => `<div class="opt${done && i === q.correct ? ' correct' : done && i === (done.chosen || 99) ? ' wrong' : ''} ${done ? 'off' : ''}" data-i="${i}"><span class="ol">${'ABCD'[i]}</span><span>${o}</span></div>`).join('')}
      </div>
      <div class="expbox${done ? ' show' : ''}" id="qbexp-${q.id}">
        <div class="exp-tag">◆ Step-by-Step Explanation</div>
        <div class="exp-body">
          <p style="margin-bottom:8px">${q.exp.short}</p>
          <div class="exp-steps">${q.exp.steps.map((s, i) => `<div class="exp-step"><div class="esn">${i + 1}</div><div class="esb">${s}</div></div>`).join('')}</div>
          <div class="ans-box">✓ ${q.exp.answer}</div>
        </div>
      </div>
      <div class="row-btns" id="qbact-${q.id}"></div>`;
    c.appendChild(card);

    if (q.diagFn) {
      const dc = document.getElementById('qbdiag-' + q.id);
      if (dc) dc.appendChild(makeDiag('Diagram — ' + cname, q.diagFn));
    }

    const actRow = card.querySelector('#qbact-' + q.id);
    if (actRow) addAskArjunBtn(actRow, q, 'Q' + (idx + 1) + ' — ' + cname);

    if (done) buildQBActions(q, idx, filtered);
    else {
      card.querySelectorAll('.opt').forEach(opt => {
        opt.addEventListener('click', () => answerQBQ(q, idx, filtered, +opt.dataset.i, card));
      });
    }
  });
}

function answerQBQ(q, idx, filtered, chosen, card) {
  const opts = card.querySelectorAll('.opt');
  opts.forEach(o => o.classList.add('off'));
  const ok = chosen === q.correct;
  opts[chosen].classList.remove('off'); opts[chosen].classList.add(ok ? 'correct' : 'wrong');
  if (!ok) { opts[q.correct].classList.remove('off'); opts[q.correct].classList.add('correct'); }
  card.querySelector('#qbexp-' + q.id).classList.add('show');
  ST.qbProg[q.id] = { correct: ok, chosen }; ST.qbLast = idx + 1; save();
  updateStr(q.concept, ok);
  buildQBActions(q, idx, filtered);
  const answered = filtered.filter(x => ST.qbProg[x.id]);
  document.getElementById('qbProg').textContent = `${answered.length}/${filtered.length} answered`;
  updateProgress();
}

function buildQBActions(q, idx, filtered) {
  const acts = document.getElementById('qbact-' + q.id); if (!acts) return; acts.innerHTML = '';
  const rb = document.createElement('button'); rb.className = 'btn br';
  rb.textContent = '↩ Revisit ' + ((CHAPTER.conceptMeta[q.concept] || {}).shortTitle || q.concept);
  rb.onclick = () => qbRevisit(q.concept, q.id, idx);
  acts.appendChild(rb);
  const nb = document.createElement('button'); nb.className = 'btn bp'; nb.textContent = 'Next →';
  nb.onclick = () => scrollQB(idx + 1);
  acts.appendChild(nb);
}

function qbRevisit(concept, qid, idx) {
  ST._retQBid = qid; ST._retQBidx = idx; save();
  goTo(concept);
  const existing = document.getElementById('ret-banner'); if (existing) existing.remove();
  const banner = document.createElement('div'); banner.className = 'ret-banner'; banner.id = 'ret-banner';
  banner.innerHTML = `<span>← Reviewing concept. Return to Question Bank Q${idx + 1}.</span>
    <button class="btn bp" style="padding:6px 12px;font-size:12px" onclick="returnQB(${idx})">Return to Q${idx + 1} →</button>`;
  document.getElementById('sec-' + concept).insertBefore(banner, document.getElementById('sec-' + concept).firstChild);
}

function returnQB(idx) {
  const banner = document.getElementById('ret-banner'); if (banner) banner.remove();
  if (!document.getElementById('sec-qb').classList.contains('vis')) {
    goTo('qb'); setTimeout(() => scrollQB(idx), 300);
  } else { scrollQB(idx); }
}

function scrollQB(idx) {
  const filtered = CHAPTER ? CHAPTER.qbank.filter(q => qbFilter === 'all' || q.level === qbFilter) : [];
  if (idx >= filtered.length) return;
  const card = document.getElementById('qbc-' + filtered[idx].id);
  if (!card) return;
  const contentEl = document.getElementById('content');
  let top = 0, el = card;
  while (el && el !== contentEl) { top += el.offsetTop; el = el.offsetParent; }
  contentEl.scrollTo({ top: Math.max(0, top - 16), behavior: 'smooth' });
  card.style.boxShadow = '0 0 0 2px var(--teal)';
  setTimeout(() => { card.style.boxShadow = ''; }, 1200);
}

function filterQB(f, btn) {
  qbFilter = f; ST.qbFilter = f; save();
  document.querySelectorAll('.qbf').forEach(b => b.classList.remove('act'));
  btn.classList.add('act');
  renderQB();
}

// ─── RESTART / RESET ─────────────────────────────────────────
function restartChapter(concept) {
  if (!confirm('Restart ' + ((CHAPTER.conceptMeta[concept] || {}).title || concept) + '? This clears your answers for this concept.')) return;
  CHAPTER.qbank.forEach(q => { if (q.concept === concept) delete ST.qbProg[q.id]; });
  delete ST.strength[concept];
  delete runningTeach[concept];
  delete renderedCQs[concept];
  save();
  const qContainer = document.getElementById('q-' + concept); if (qContainer) qContainer.innerHTML = '';
  const feed = document.getElementById('feed-' + concept); if (feed) feed.innerHTML = '';
  const sbEl = document.querySelector('.sb-it[data-s="' + concept + '"]'); if (sbEl) sbEl.classList.remove('done');
  showToast('Chapter restarted — starting fresh!');
  goTo(concept);
  updateStrMini();
}

function confirmReset() {
  if (!confirm('Reset ALL progress? This cannot be undone.')) return;
  const chId = CHAPTER ? CHAPTER.id : 'jt_state';
  localStorage.removeItem('jt_' + chId);
  // Also clear from Supabase if logged in
  if (typeof getSB === 'function' && typeof currentUser === 'function') {
    const sb = getSB(); const user = currentUser();
    if (sb && user) {
      sb.from('chapter_progress').delete()
        .eq('user_id', user.id)
        .eq('chapter_id', chId)
        .then(() => window.location.reload());
      return;
    }
  }
  window.location.reload();
}

// ─── UTILS ───────────────────────────────────────────────────
function showToast(msg) {
  const e = document.querySelector('.toast'); if (e) e.remove();
  const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg;
  document.body.appendChild(t); setTimeout(() => t.remove(), 2500);
}

function addAskArjunBtn(container, q, label) {
  const btn = document.createElement('button');
  btn.className = 'ask-ai-btn';
  btn.innerHTML = '<div class="ai-dot"></div> Ask Arjun';
  btn.onclick = () => {
    const meta = (CHAPTER && CHAPTER.conceptMeta[q.concept]) || {};
    setAICtx('question', label || meta.title || 'Question', q.text.substring(0, 80) + '...', q.opts, q.text);
    const panel = document.getElementById('ai-float-panel');
    panel.classList.add('open');
    document.getElementById('ai-float-inp').focus();
    if (!welcomeShown) { welcomeShown = true; addFloatBub(LANG_CONFIG[currentLang].welcome, 'bot'); }
    const ctxMsgs = {
      hinglish: 'Theek hai! Maine yeh question dekh liya 👆 Kahan confusion hai — concept ya options mein?',
      hindi: 'ठीक है! मैंने यह प्रश्न देख लिया है 👆 कहाँ confusion है?',
      english: 'Got it! I can see this question 👆 Where are you confused?'
    };
    setTimeout(() => addFloatBub(ctxMsgs[currentLang], 'bot'), 200);
  };
  container.appendChild(btn);
}

// ─── AI ENGINE ───────────────────────────────────────────────
const AI_MODEL = 'claude-sonnet-4-5';
let aiCtx = { type: 'general', name: '', detail: '', opts: [], qText: '', lang: 'hinglish' };
const LANG_CONFIG = {
  hinglish: {
    welcome: "Heyy! Main Arjun hoon 👋 Koi bhi doubt poocho — English, Hindi, ya Hinglish mein!",
    placeholder: "Koi bhi doubt poocho — English, Hindi, ya Hinglish mein...",
    label: "Hinglish"
  },
  hindi: {
    welcome: "नमस्ते! मैं अर्जुन हूँ 👋 कोई भी शंका हो, बेझिझक पूछो!",
    placeholder: "अपना सवाल यहाँ लिखो...",
    label: "Hindi"
  },
  english: {
    welcome: "Hey! I'm Arjun 👋 Ask me anything — I'm here to help!",
    placeholder: "Type your doubt here...",
    label: "English"
  }
};
let currentLang = 'hinglish';
let welcomeShown = false;

function changeAILang(lang) {
  currentLang = lang; aiCtx.lang = lang;
  const inp = document.getElementById('ai-float-inp');
  if (inp) inp.placeholder = LANG_CONFIG[lang].placeholder;
  const msgs = document.getElementById('ai-float-msgs');
  if (msgs && msgs.children.length === 0) addFloatBub(LANG_CONFIG[lang].welcome, 'bot');
  else {
    const m = { hinglish: "Theek hai, Hinglish mein baat karte hain! 😊", hindi: "ठीक है, हिंदी में! 😊", english: "Sure, English it is! 😊" };
    addFloatBub(m[lang], 'bot');
  }
}

function setAICtx(type, name, detail = '', opts = [], qText = '') {
  aiCtx = { type, name, detail, opts, qText, lang: currentLang };
  const badge = document.getElementById('ai-ctx-badge');
  const bar = document.getElementById('ai-float-ctx-bar');
  if (badge) badge.textContent = name;
  if (bar) { if (detail) { bar.textContent = detail; bar.classList.add('show'); } else bar.classList.remove('show'); }
}

const SYSTEM_PROMPT = () => {
  const isQ = aiCtx.type === 'question' || aiCtx.type === 'numerical';
  const optsBlock = aiCtx.opts && aiCtx.opts.length
    ? '\nAnswer options:\n' + aiCtx.opts.map((o, i) => 'ABCD'[i] + ') ' + o).join('\n') : '';
  const chapterName = CHAPTER ? CHAPTER.title : 'JEE Physics';
  const langMap = {
    hinglish: `Mix Hindi and English naturally. "Dekho yaar, yahan F=ma apply hoga". Celebrate: "Bilkul sahi!", "Haan exactly yaar!"`,
    hindi: `Pure Hindi, warm. "देखो, यहाँ F=ma लागू होगा". Celebrate: "बिल्कुल सही!"`,
    english: `Clear, friendly English. Celebrate: "Exactly right!", "Great thinking!"`
  };
  return `You are Arjun, a friendly JEE tutor specialising in ${chapterName}.
CONTEXT: Topic: ${aiCtx.name} | Mode: ${isQ ? 'student attempting question' : 'studying concept'}
${aiCtx.qText ? 'Full question: ' + aiCtx.qText : ''}${optsBlock}
LANGUAGE: ${langMap[currentLang] || langMap.hinglish}
PERSONALITY: Like a JEE senior who aced the exam. Use Indian examples. Replies 3-5 sentences. End with one follow-up question.
${isQ ? `RULES: NEVER reveal the correct option. NEVER eliminate options. Find the ONE concept gap and explain it with a DIFFERENT example.` : `GOAL: Build intuition first, formula second. Ask questions that make them think.`}`;
};

const aiHistories = {};

// AI endpoint: /api/ask on Vercel (serverless), localhost:3001 when running locally
const AI_ENDPOINT = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ? 'http://localhost:3001/ask'
  : '/api/ask';

async function callAI(messages) {
  const resp = await fetch(AI_ENDPOINT, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: AI_MODEL, max_tokens: 600, system: SYSTEM_PROMPT(), messages })
  });
  if (!resp.ok) { const e = await resp.json().catch(() => ({})); throw new Error(e.error?.message || 'Error ' + resp.status); }
  const data = await resp.json();
  return data.content?.filter(b => b.type === 'text').map(b => b.text).join('') || '';
}

function toggleAIFloat() {
  const panel = document.getElementById('ai-float-panel');
  panel.classList.toggle('open');
  if (panel.classList.contains('open')) {
    document.getElementById('ai-float-inp').focus();
    if (!welcomeShown) { welcomeShown = true; addFloatBub(LANG_CONFIG[currentLang].welcome, 'bot'); }
  }
}

async function floatSend() {
  const inp = document.getElementById('ai-float-inp');
  const send = document.getElementById('ai-float-send');
  const msgs = document.getElementById('ai-float-msgs');
  const msg = inp.value.trim(); if (!msg) return;
  inp.value = ''; inp.style.height = 'auto'; send.disabled = true;
  addFloatBub(msg, 'user');
  const typing = document.createElement('div');
  typing.className = 'ai-typing ai-bub';
  typing.innerHTML = '<div class="ai-lbl">Arjun</div><div class="typing"><div class="td"></div><div class="td"></div><div class="td"></div></div>';
  msgs.appendChild(typing); msgs.scrollTop = msgs.scrollHeight;
  try {
    const ctxId = aiCtx.type + '-' + aiCtx.name;
    if (!aiHistories[ctxId]) aiHistories[ctxId] = [];
    const hist = aiHistories[ctxId];
    const reply = await callAI([...hist, { role: 'user', content: msg }]);
    hist.push({ role: 'user', content: msg }, { role: 'assistant', content: reply });
    if (hist.length > 20) hist.splice(0, 2);
    typing.remove(); addFloatBub(reply, 'bot');
  } catch(err) {
    typing.remove();
    addFloatBub(`Proxy se connect nahi ho pa raha 😅<br><br><strong>Run karo:</strong><br><code style="background:var(--surface3);padding:2px 6px;border-radius:4px;font-size:11px">node proxy.js</code><br><div style="margin-top:6px;font-size:11px;color:var(--hint)">Error: ${err.message}</div>`, 'bot', true);
  }
  send.disabled = false; inp.focus();
}

function addFloatBub(text, role, isHtml = false) {
  const msgs = document.getElementById('ai-float-msgs');
  const b = document.createElement('div'); b.className = 'ai-bub ' + role;
  b.innerHTML = role === 'bot' ? '<div class="ai-lbl">Arjun</div>' + (isHtml ? text : formatAIText(text)) : '';
  if (role !== 'bot') b.textContent = text;
  msgs.appendChild(b); msgs.scrollTop = msgs.scrollHeight;
}

function formatAIText(t) {
  return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,'<em style="color:var(--amber);font-style:normal">$1</em>')
    .replace(/`(.+?)`/g,'<code style="background:var(--surface3);padding:1px 5px;border-radius:4px;font-family:monospace;font-size:12px">$1</code>')
    .replace(/\n/g,'<br>');
}

async function checkProxy() {
  const btn = document.getElementById('ai-float-btn');
  try {
    const resp = await fetch(AI_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: AI_MODEL, max_tokens: 1, system: 'ping', messages: [{ role: 'user', content: 'ping' }] }) });
    // 500 = configured but bad key, still means endpoint is reachable
    if (resp.status !== 404 && resp.status !== 0) {
      if (btn) btn.style.background = 'var(--teal)';
    }
  } catch(e) {
    // Only mark offline on network error (not on Vercel where /api/ask always exists)
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (isLocal && btn) {
      btn.style.background = '#854d0e';
      const lbl = btn.querySelector('.ai-float-label');
      if (lbl) lbl.textContent = 'Arjun (offline)';
    }
  }
}

// ─── INIT ────────────────────────────────────────────────────
function initPlatform() {
  // Init auth, then load state (Supabase sync happens inside loadState)
  const authPromise = typeof authInit === 'function' ? authInit() : Promise.resolve();
  authPromise.then(() => {
    // Render auth widget in topbar if it exists
    if (typeof renderAuthWidget === 'function') renderAuthWidget('auth-widget');
  });

  loadState();

  // Build sidebar from CHAPTER data
  buildSidebar();

  // Build main panel HTML
  buildPanels();

  // Attach panel observer for static diagram redraws
  document.querySelectorAll('.panel').forEach(p => _panelObs.observe(p, { attributes: true }));

  // AI textarea auto-resize
  const inp = document.getElementById('ai-float-inp');
  if (inp) {
    inp.addEventListener('input', () => { inp.style.height = 'auto'; inp.style.height = Math.min(inp.scrollHeight, 100) + 'px'; });
    inp.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); floatSend(); } });
  }

  updateStrMini();
  updateProgress();
  goTo('intro');
  setTimeout(checkProxy, 1200);
}

function buildSidebar() {
  if (!CHAPTER) return;
  const nav = document.getElementById('sb-nav');
  if (!nav) return;

  let html = `<div class="sb-sec">${CHAPTER.subject}</div>`;
  html += `<div class="sb-it act" data-s="intro" onclick="goTo('intro')"><span class="sb-ic">📖</span><span class="sb-lbl">Introduction</span></div>`;
  if (CHAPTER.conceptGroups) {
    CHAPTER.conceptGroups.forEach(group => {
      html += `<div class="sb-sec">${group.label}</div>`;
      group.concepts.forEach(cid => {
        const meta = CHAPTER.conceptMeta[cid] || {};
        html += `<div class="sb-it" data-s="${cid}" onclick="goTo('${cid}')"><span class="sb-ic">${meta.icon || '📌'}</span><span class="sb-lbl">${meta.shortTitle || cid}</span></div>`;
      });
    });
  } else {
    html += `<div class="sb-sec">Concepts</div>`;
    CHAPTER.concepts.forEach(cid => {
      const meta = CHAPTER.conceptMeta[cid] || {};
      html += `<div class="sb-it" data-s="${cid}" onclick="goTo('${cid}')"><span class="sb-ic">${meta.icon || '📌'}</span><span class="sb-lbl">${meta.shortTitle || cid}</span></div>`;
    });
  }
  html += `<div class="sb-sec">Practice</div>`;
  html += `<div class="sb-it" data-s="nums" onclick="goTo('nums')"><span class="sb-ic">🔢</span><span class="sb-lbl">Numericals</span></div>`;
  html += `<div class="sb-it" data-s="qb" onclick="goTo('qb')"><span class="sb-ic">🏦</span><span class="sb-lbl">Question Bank</span></div>`;
  html += `<div class="sb-sec">Progress</div>`;
  html += `<div class="sb-it" data-s="str" onclick="goTo('str')"><span class="sb-ic">💪</span><span class="sb-lbl">My Strength</span></div>`;
  html += `<div class="sb-sec">Options</div>`;
  html += `<div class="sb-it" onclick="confirmReset()"><span class="sb-ic">🔄</span><span class="sb-lbl" style="color:var(--red)">Reset Progress</span></div>`;
  nav.innerHTML = html;
}

function buildPanels() {
  if (!CHAPTER) return;
  const content = document.getElementById('content');

  // Intro panel
  let introPanel = document.getElementById('sec-intro');
  if (!introPanel) {
    introPanel = document.createElement('div');
    introPanel.className = 'panel';
    introPanel.id = 'sec-intro';
    content.insertBefore(introPanel, content.firstChild);
  }
  introPanel.innerHTML = `
    <div class="cc">
      <div class="cc-tag">${CHAPTER.subject}</div>
      <div class="cc-title">${CHAPTER.title}</div>
      <div class="cc-sub">${CHAPTER.intro}</div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:18px;">
      <div style="background:var(--surface2);border:1px solid var(--border2);border-radius:10px;padding:14px;text-align:center;">
        <div style="font-size:22px;font-weight:700;color:var(--teal)">${CHAPTER.concepts.length}</div>
        <div style="font-size:11px;color:var(--hint)">Concepts</div>
      </div>
      <div style="background:var(--surface2);border:1px solid var(--border2);border-radius:10px;padding:14px;text-align:center;">
        <div style="font-size:22px;font-weight:700;color:var(--blue)">${CHAPTER.numericals.length}</div>
        <div style="font-size:11px;color:var(--hint)">Numericals</div>
      </div>
      <div style="background:var(--surface2);border:1px solid var(--border2);border-radius:10px;padding:14px;text-align:center;">
        <div style="font-size:22px;font-weight:700;color:var(--pink)">${CHAPTER.qbank.length}+</div>
        <div style="font-size:11px;color:var(--hint)">Questions</div>
      </div>
    </div>
    <div class="snav">
      <button class="btn bp" onclick="goTo('${CHAPTER.concepts[0]}')">Start Learning →</button>
      <button class="btn bo" onclick="goTo('qb')">Jump to Questions →</button>
    </div>`;

  // Concept panels
  CHAPTER.concepts.forEach((cid, i) => {
    let panel = document.getElementById('sec-' + cid);
    if (!panel) { panel = document.createElement('div'); panel.className = 'panel'; panel.id = 'sec-' + cid; content.appendChild(panel); }
    const meta = CHAPTER.conceptMeta[cid] || {};
    const prev = i > 0 ? CHAPTER.concepts[i - 1] : null;
    const next = i < CHAPTER.concepts.length - 1 ? CHAPTER.concepts[i + 1] : null;
    panel.innerHTML = `
      <div class="cc">
        <div class="cc-tag">${meta.tag || (CHAPTER.subject + ' · ' + CHAPTER.title)}</div>
        <div class="cc-title">${meta.title || cid}</div>
        <div class="cc-sub">${meta.sub || ''}</div>
      </div>
      <div class="chat-feed" id="feed-${cid}"></div>
      <div id="q-${cid}"></div>
      <div class="snav">
        ${prev ? `<button class="btn bo" onclick="goTo('${prev}')">← ${(CHAPTER.conceptMeta[prev] || {}).shortTitle || prev}</button>` : '<button class="btn bo" onclick="goTo(\'intro\')">← Intro</button>'}
        ${next ? `<button class="btn bp" onclick="goTo('${next}')">${(CHAPTER.conceptMeta[next] || {}).shortTitle || next} →</button>` : '<button class="btn bp" onclick="goTo(\'nums\')">Numericals →</button>'}
        <button class="btn ba" onclick="restartChapter('${cid}')" title="Restart this concept">↺ Restart</button>
      </div>`;
  });

  // Practice panels (static HTML, just ensure they exist)
  ['nums','qb','str'].forEach(sec => {
    if (!document.getElementById('sec-' + sec)) {
      const p = document.createElement('div'); p.className = 'panel'; p.id = 'sec-' + sec;
      content.appendChild(p);
    }
  });
  document.getElementById('sec-nums').innerHTML = `
    <div class="cc" style="border-color:rgba(245,158,11,.3)">
      <div class="cc-tag" style="color:var(--amber)">Practice · Numericals</div>
      <div class="cc-title">Solved Numericals</div>
      <div class="cc-sub">CBSE → JEE Mains → JEE Advanced. Try first, then reveal full solution.</div>
    </div>
    <div id="nums-content"></div>`;
  document.getElementById('sec-qb').innerHTML = `
    <div class="cc" style="border-color:rgba(59,130,246,.3)">
      <div class="cc-tag" style="color:var(--blue)">Practice · Question Bank</div>
      <div class="cc-title">Question Bank</div>
      <div class="cc-sub">All question types asked in CBSE, JEE Mains and Advanced.</div>
    </div>
    <div class="qb-ctl">
      <button class="qbf act" onclick="filterQB('all',this)">All</button>
      <button class="qbf" onclick="filterQB('cbse',this)">CBSE</button>
      <button class="qbf" onclick="filterQB('mains',this)">JEE Mains</button>
      <button class="qbf" onclick="filterQB('advanced',this)">JEE Advanced</button>
      <span class="qbp" id="qbProg"></span>
    </div>
    <div id="qb-content"></div>`;
  document.getElementById('sec-str').innerHTML = `<div id="str-content"></div>`;
}
