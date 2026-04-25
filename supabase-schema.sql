-- ═══════════════════════════════════════════════════════════
-- JEE TUTOR — SUPABASE SCHEMA
-- Run this entire file in Supabase → SQL Editor → New Query
-- ═══════════════════════════════════════════════════════════

-- ── 1. Chapter Progress (main progress table) ────────────────
-- One row per user per chapter
-- state stores the full ST object: { strength, qbProg, qbLast, qbFilter }
create table if not exists chapter_progress (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  chapter_id  text not null,              -- e.g. 'phy-newtons-laws'
  state       jsonb not null default '{}',
  updated_at  timestamptz not null default now(),
  unique (user_id, chapter_id)
);

-- Index for fast per-user lookups
create index if not exists idx_chapter_progress_user
  on chapter_progress (user_id);

-- Auto-update updated_at on every write
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_chapter_progress_updated on chapter_progress;
create trigger trg_chapter_progress_updated
  before update on chapter_progress
  for each row execute function update_updated_at();


-- ── 2. Row Level Security ────────────────────────────────────
-- Users can ONLY read/write their OWN rows

alter table chapter_progress enable row level security;

-- Policy: read own rows
create policy "Users can view own progress"
  on chapter_progress for select
  using (auth.uid() = user_id);

-- Policy: insert own rows
create policy "Users can insert own progress"
  on chapter_progress for insert
  with check (auth.uid() = user_id);

-- Policy: update own rows
create policy "Users can update own progress"
  on chapter_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Policy: delete own rows
create policy "Users can delete own progress"
  on chapter_progress for delete
  using (auth.uid() = user_id);


-- ── 3. User Profiles (optional — for display name, class) ────
create table if not exists profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  target_year  int,           -- 2025, 2026, etc.
  created_at   timestamptz default now()
);

alter table profiles enable row level security;

create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on profiles for insert with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles (id) values (new.id)
  on conflict do nothing;
  return new;
end;
$$;

drop trigger if exists trg_new_user on auth.users;
create trigger trg_new_user
  after insert on auth.users
  for each row execute function handle_new_user();


-- ── 4. Verify everything ─────────────────────────────────────
-- Run this to confirm setup:
-- select tablename, rowsecurity from pg_tables
-- where schemaname = 'public';
