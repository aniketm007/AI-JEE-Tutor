# JEE Tutor Platform

## Structure

```
jee-platform/
├── index.html              ← Dashboard — all chapters
├── chapter.html            ← Universal chapter shell (loads any chapter)
├── proxy.js                ← Local API proxy for Arjun AI
├── css/
│   └── main.css            ← Shared styles (ONE file for entire platform)
├── js/
│   └── engine.js           ← Shared engine (questions, QB, AI, animations)
└── chapters/
    ├── physics/
    │   └── newtons-laws.js ← Chapter data + teaching scripts
    └── maths/
        └── sets.js         ← Chapter data + teaching scripts
```

## Running Locally

### 1. Start the AI proxy (for Arjun AI tutor)
```powershell
cd jee-platform
$env:ANTHROPIC_API_KEY = "sk-ant-your-key-here"
node proxy.js
```

### 2. Serve the files (in a second terminal)
```powershell
cd jee-platform
python -m http.server 8080
```

### 3. Open in browser
- Dashboard: http://localhost:8080
- Newton's Laws: http://localhost:8080/chapter.html?chapter=physics/newtons-laws
- Sets: http://localhost:8080/chapter.html?chapter=maths/sets

> **Note:** Arjun AI works offline too — students just see a "proxy offline" warning.
> All teaching content, questions, and diagrams work without the proxy.

---

## Adding a New Chapter

Create `chapters/subject/chapter-name.js` with this structure:

```js
// ── Your draw functions (if Physics/animated diagrams needed) ──
function drawSomething(canvas, t) { ... }  // t = animated
function drawStatic(canvas) { ... }        // static

// ── Teaching scripts ──────────────────────────────────────────
async function teachC1(feed) {
  await addBub(feed, 'Your teaching content here', 'ai', 0);
  // ... interactive questions, diagrams, etc.
}

// ── Concept questions data ────────────────────────────────────
const QS = {
  c1: [
    { id:'c1q1', level:'cbse', diff:1, text:'Question text',
      opts:['A','B','C','D'], correct:1, concept:'c1',
      exp:{ short:'Brief explanation', steps:['Step 1','Step 2'], answer:'B.' }
    },
  ],
};

// ── Numericals ────────────────────────────────────────────────
const NUMS = [
  { level:'cbse', concept:'c1', title:'Numerical 1 — ...',
    problem:'Problem statement', opts:['A','B','C','D'], correct:0,
    steps:['Step 1','Step 2'], answer:'Final answer'
  },
];

// ── Question Bank ─────────────────────────────────────────────
const QB = [
  { id:'qb1', level:'cbse', diff:1, text:'Question',
    opts:['A','B','C','D'], correct:0, concept:'c1',
    exp:{ short:'...', steps:['...'], answer:'...' }
  },
];

// ── Register with platform ────────────────────────────────────
registerChapter({
  id: 'subject-chapter-name',    // matches localStorage key
  title: 'Chapter Title',
  subject: 'Physics · Class 11',
  class: 11,
  intro: 'One-line description for the intro card.',
  concepts: ['c1', 'c2', 'c3'],

  conceptMeta: {
    c1: { title:'Full Title', shortTitle:'Short', tag:'Concept 1 of 3',
          icon:'⚡', sub:'Subtitle shown under concept header.' },
  },

  teach: {
    c1: (feed) => teachC1(feed),
  },

  conceptQs: QS,
  numericals: NUMS,
  qbank: QB,
});
```

Then add a card to `index.html`:
```html
<a class="chapter-card" href="chapter.html?chapter=subject/chapter-name">
  <div class="ch-tag">Ch N · Topic</div>
  <div class="ch-title">Chapter Title</div>
  <div class="ch-sub">Brief description.</div>
  <div class="ch-meta">
    <span class="ch-pill wip">✓ Available</span>
  </div>
</a>
```

---

## What Each File Does

| File | Size | Purpose |
|------|------|---------|
| `engine.js` | 44 KB | **Shared once.** All rendering logic, QB engine, AI/Arjun, animations, state |
| `main.css` | 17 KB | **Shared once.** All styles |
| `chapter.html` | 3 KB | **Shared once.** HTML shell, loads chapter by URL param |
| `newtons-laws.js` | 64 KB | **Chapter only.** Data + teach scripts |
| `sets.js` | 54 KB | **Chapter only.** Data + teach scripts |

Adding a new chapter = **one JS file**. No HTML. No CSS. No engine changes.

---

## Phase 2 (Next): Supabase Auth

Replace `localStorage` with Supabase for cross-device progress:

1. Create free Supabase project at supabase.com
2. Copy `SUPABASE_URL` and `SUPABASE_ANON_KEY` 
3. Add `auth.js` — login/signup UI
4. In `engine.js`, replace `save()` / `loadState()` with Supabase calls
5. Deploy to Vercel (free, connects to Supabase automatically)
