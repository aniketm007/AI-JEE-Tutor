// ═══════════════════════════════════════════════════════════
// AUTH.JS — Supabase Authentication + Progress Sync
// Replace SUPABASE_URL and SUPABASE_ANON_KEY with your values
// from https://supabase.com → Project Settings → API
// ═══════════════════════════════════════════════════════════

// Keys are stored in localStorage by setup.html — never hardcoded
// Run setup.html once after downloading to configure your Supabase project
const SUPABASE_URL  = localStorage.getItem('jt_sb_url')  || '';
const SUPABASE_ANON = localStorage.getItem('jt_sb_anon') || '';

// ── Supabase client (loaded via CDN in HTML) ─────────────────
// Uses the global `supabase` object from @supabase/supabase-js
let _sb = null;

function getSB() {
  if (!_sb) {
    if (typeof window.supabase === 'undefined') return null;
    if (!SUPABASE_URL || !SUPABASE_ANON || SUPABASE_URL === '') return null;
    _sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
  }
  return _sb;
}

// True if Supabase has been configured via setup.html
function isSupabaseConfigured() {
  return !!(localStorage.getItem('jt_sb_url') && localStorage.getItem('jt_sb_anon'));
}

// ── Current session ──────────────────────────────────────────
let _session  = null;   // Supabase session object
let _authReady = false; // true after initial session check

// Called once on page load — resolves when auth state is known
async function authInit() {
  const sb = getSB();
  if (!sb) { _authReady = true; return; }

  // Get existing session (works across page reloads)
  const { data } = await sb.auth.getSession();
  _session = data?.session ?? null;
  _authReady = true;

  // Listen for login / logout events
  sb.auth.onAuthStateChange((_event, session) => {
    _session = session;
    onAuthChange(session);
  });
}

// Override this in page JS to react to login/logout
function onAuthChange(session) {
  updateAuthUI(session);
  if (session) syncFromSupabase();   // pull latest progress on login
}

// ── Helpers ──────────────────────────────────────────────────
function currentUser()   { return _session?.user ?? null; }
function isLoggedIn()    { return !!_session; }
function userEmail()     { return _session?.user?.email ?? ''; }
function userInitials()  {
  const e = userEmail();
  if (!e) return '?';
  return e.substring(0, 2).toUpperCase();
}

// ── Sign Up ──────────────────────────────────────────────────
async function signUp(email, password) {
  const sb = getSB();
  if (!sb) throw new Error('Supabase not configured');
  const { data, error } = await sb.auth.signUp({ email, password });
  if (error) throw error;
  return data;
}

// ── Sign In ──────────────────────────────────────────────────
async function signIn(email, password) {
  const sb = getSB();
  if (!sb) throw new Error('Supabase not configured');
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) throw error;
  _session = data.session;
  return data;
}

// ── Sign Out ─────────────────────────────────────────────────
async function signOut() {
  const sb = getSB(); if (!sb) return;
  await sb.auth.signOut();
  _session = null;
}

// ── Google OAuth ─────────────────────────────────────────────
async function signInWithGoogle() {
  const sb = getSB();
  if (!sb) throw new Error('Supabase not configured');
  const { error } = await sb.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin + '/index.html' }
  });
  if (error) throw error;
}

// ═══════════════════════════════════════════════════════════
// PROGRESS SYNC
// Strategy:
//   - Always write to localStorage immediately (fast, offline)
//   - If logged in, also write to Supabase (async, non-blocking)
//   - On login, pull from Supabase and merge with localStorage
// ═══════════════════════════════════════════════════════════

// Called by engine.js save() — writes localStorage + Supabase
async function saveProgress(chapterId, st) {
  // 1. Always save locally first (instant)
  try { localStorage.setItem('jt_' + chapterId, JSON.stringify(st)); } catch(e) {}

  // 2. If logged in, sync to Supabase (fire-and-forget)
  const sb = getSB();
  const user = currentUser();
  if (!sb || !user) return;

  // Upsert single row per user+chapter
  sb.from('chapter_progress').upsert({
    user_id:    user.id,
    chapter_id: chapterId,
    state:      st,
    updated_at: new Date().toISOString()
  }, { onConflict: 'user_id,chapter_id' })
  .then(({ error }) => {
    if (error) console.warn('Supabase save error:', error.message);
  });
}

// Called on login or page load — fetch from Supabase, merge with localStorage
async function syncFromSupabase(chapterId) {
  const sb = getSB();
  const user = currentUser();
  if (!sb || !user) return null;

  const target = chapterId || (typeof CHAPTER !== 'undefined' && CHAPTER ? CHAPTER.id : null);
  if (!target) return null;

  const { data, error } = await sb
    .from('chapter_progress')
    .select('state, updated_at')
    .eq('user_id', user.id)
    .eq('chapter_id', target)
    .single();

  if (error || !data) return null;

  // Merge: Supabase wins on questions answered, keep local if more recent
  const remote = data.state;
  const localRaw = localStorage.getItem('jt_' + target);
  const local = localRaw ? JSON.parse(localRaw) : null;

  let merged = remote;
  if (local) {
    // Merge qbProg: take union of answered questions
    merged = { ...remote };
    merged.qbProg = { ...(remote.qbProg || {}), ...(local.qbProg || {}) };
    // Merge strength: take higher value per concept
    merged.strength = {};
    const allConcepts = new Set([
      ...Object.keys(remote.strength || {}),
      ...Object.keys(local.strength || {})
    ]);
    allConcepts.forEach(c => {
      merged.strength[c] = Math.max(
        (remote.strength || {})[c] || 50,
        (local.strength || {})[c] || 50
      );
    });
  }

  // Write merged back to localStorage and Supabase
  try { localStorage.setItem('jt_' + target, JSON.stringify(merged)); } catch(e) {}
  return merged;
}

// Fetch all chapter progress for dashboard progress bars
async function fetchAllProgress() {
  const sb = getSB();
  const user = currentUser();
  if (!sb || !user) return {};

  const { data, error } = await sb
    .from('chapter_progress')
    .select('chapter_id, state')
    .eq('user_id', user.id);

  if (error || !data) return {};
  const result = {};
  data.forEach(row => { result[row.chapter_id] = row.state; });
  return result;
}

// ═══════════════════════════════════════════════════════════
// AUTH UI HELPERS
// ═══════════════════════════════════════════════════════════

// Render the auth button/avatar in topbar — call this from each page
function renderAuthWidget(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (isLoggedIn()) {
    container.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px;">
        <div style="width:30px;height:30px;border-radius:50%;background:var(--accent);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;flex-shrink:0;cursor:pointer;" onclick="showUserMenu()" title="${userEmail()}">
          ${userInitials()}
        </div>
        <div id="user-menu" style="display:none;position:absolute;top:48px;right:16px;background:var(--surface);border:1px solid var(--border2);border-radius:10px;padding:8px;z-index:999;min-width:180px;box-shadow:0 8px 24px rgba(0,0,0,.4);">
          <div style="font-size:12px;color:var(--muted);padding:6px 8px;border-bottom:1px solid var(--border);margin-bottom:4px;">${userEmail()}</div>
          <div style="font-size:12px;color:var(--text);padding:7px 8px;cursor:pointer;border-radius:6px;" onmouseover="this.style.background='var(--surface2)'" onmouseout="this.style.background=''" onclick="window.location.href='index.html'">📚 All Chapters</div>
          <div style="font-size:12px;color:var(--red);padding:7px 8px;cursor:pointer;border-radius:6px;margin-top:2px;" onmouseover="this.style.background='var(--surface2)'" onmouseout="this.style.background=''" onclick="handleSignOut()">↩ Sign Out</div>
        </div>
      </div>`;
  } else {
    container.innerHTML = `
      <a href="login.html" style="padding:6px 14px;background:var(--accent);color:#fff;border-radius:8px;font-size:12px;font-weight:700;text-decoration:none;transition:all .15s;" onmouseover="this.style.background='#7c6aff'" onmouseout="this.style.background='var(--accent)'">
        Sign In
      </a>`;
  }
}

function showUserMenu() {
  const m = document.getElementById('user-menu');
  if (m) m.style.display = m.style.display === 'none' ? 'block' : 'none';
}
document.addEventListener('click', e => {
  if (!e.target.closest('#user-menu') && !e.target.closest('[onclick="showUserMenu()"]')) {
    const m = document.getElementById('user-menu');
    if (m) m.style.display = 'none';
  }
});

async function handleSignOut() {
  await signOut();
  renderAuthWidget('auth-widget');
  showToastGlobal('Signed out successfully');
}

function updateAuthUI(session) {
  renderAuthWidget('auth-widget');
}

// Global toast (works on any page before engine.js is loaded)
function showToastGlobal(msg) {
  if (typeof showToast === 'function') { showToast(msg); return; }
  const e = document.querySelector('.toast'); if (e) e.remove();
  const t = document.createElement('div');
  t.style.cssText = 'position:fixed;bottom:22px;right:22px;background:#13161e;border:1px solid rgba(255,255,255,.12);border-radius:9px;padding:10px 16px;font-size:13px;color:#e2e5f0;z-index:9999;animation:none;box-shadow:0 8px 28px rgba(0,0,0,.5);';
  t.className = 'toast'; t.textContent = msg;
  document.body.appendChild(t); setTimeout(() => t.remove(), 2500);
}

// ── Redirect guard: call on pages that require login ─────────
function requireAuth(redirectTo) {
  if (!_authReady) {
    // Wait for auth to resolve
    const check = setInterval(() => {
      if (_authReady) {
        clearInterval(check);
        if (!isLoggedIn()) window.location.href = redirectTo || 'login.html';
      }
    }, 50);
    return;
  }
  if (!isLoggedIn()) window.location.href = redirectTo || 'login.html';
}
