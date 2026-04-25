# JEE Tutor Platform

## Deploy in 10 minutes (GitHub → Vercel)

### Step 1 — Put files on GitHub

**Option A — GitHub Desktop (no terminal needed)**
1. Download [GitHub Desktop](https://desktop.github.com)
2. File → New Repository → name it `jee-tutor` → Create Repository
3. Click "Show in Explorer" → copy all jee-platform files into that folder
4. Back in GitHub Desktop → type "Initial commit" → Commit to main → Publish repository → Public

**Option B — Terminal**
```bash
cd jee-platform
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/jee-tutor.git
git push -u origin main
```

---

### Step 2 — Connect to Vercel

1. Go to vercel.com → Sign up free (use GitHub)
2. Add New → Project → Import your `jee-tutor` repo
3. Framework Preset: Other (leave default)
4. Environment Variables → Add:
   - Name: `ANTHROPIC_API_KEY`  Value: `sk-ant-your-key`
5. Deploy → get URL like `jee-tutor.vercel.app`

Every future GitHub push auto-deploys. No manual steps needed.

---

### Step 3 — Configure Supabase on live site

Open `your-url.vercel.app/setup` and paste your Supabase keys.

---

## Running Locally

```bash
ANTHROPIC_API_KEY=sk-ant-... node proxy.js   # terminal 1 (AI)
python -m http.server 8080                    # terminal 2
open http://localhost:8080
```

## File Structure

```
jee-platform/
├── index.html          Dashboard
├── chapter.html        Universal chapter shell
├── login.html          Auth page
├── setup.html          One-time Supabase config
├── proxy.js            Local AI proxy (dev only)
├── vercel.json         Vercel config
├── api/ask.js          Vercel serverless AI function (production)
├── css/main.css        Shared styles
├── js/engine.js        Shared engine
├── js/auth.js          Supabase auth + sync
└── chapters/
    ├── physics/newtons-laws.js
    └── maths/sets.js
```
