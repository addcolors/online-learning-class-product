-- Early-access and contact leads collected before full launch.
-- Inserts happen through the service role (server route); the table is
-- never readable through the anon key.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('waitlist', 'counselor', 'institution')),
  email text not null,
  name text not null default '',
  organization text not null default '',
  message text not null default '',
  source_path text not null default '',
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

-- No select/update/delete policies: leads are write-only via the service role,
-- which bypasses RLS. Nobody (including anonymous visitors) can read them.

create index if not exists leads_type_created_idx on public.leads (type, created_at desc);
