create extension if not exists "pgcrypto";

create type public.app_role as enum ('learner', 'parent', 'counselor', 'counselor_admin', 'institution_editor', 'reviewer', 'platform_admin');
create type public.review_status as enum ('draft', 'needs_review', 'reviewed', 'verified', 'published', 'archived');
create type public.submission_status as enum ('draft', 'submitted', 'changes_requested', 'approved', 'rejected');
create type public.match_status as enum ('appears_compatible', 'review_needed', 'missing_prerequisite', 'insufficient_information');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role public.app_role not null default 'learner',
  locale text not null default 'en',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  organization_type text not null check (organization_type in ('counselor_group', 'school', 'institution')),
  verified_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.organization_members (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role public.app_role not null,
  status text not null default 'active' check (status in ('invited', 'active', 'suspended')),
  primary key (organization_id, user_id)
);

create table public.countries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  iso_code char(2) unique not null,
  summary text,
  publication_status public.review_status not null default 'draft',
  reviewed_at timestamptz
);

create table public.education_stages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  sort_order integer not null
);

create table public.qualification_types (
  id uuid primary key default gen_random_uuid(),
  stage_id uuid references public.education_stages(id),
  name text not null,
  slug text unique not null,
  level_label text
);

create table public.institutions (
  id uuid primary key default gen_random_uuid(),
  country_id uuid references public.countries(id),
  name text not null,
  slug text unique not null,
  institution_type text not null,
  city text,
  summary text,
  official_url text,
  publication_status public.review_status not null default 'draft',
  last_reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.institution_claims (
  id uuid primary key default gen_random_uuid(),
  institution_id uuid not null references public.institutions(id),
  organization_id uuid not null references public.organizations(id),
  status public.submission_status not null default 'submitted',
  evidence_url text,
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.programs (
  id uuid primary key default gen_random_uuid(),
  institution_id uuid not null references public.institutions(id) on delete cascade,
  stage_id uuid references public.education_stages(id),
  qualification_type_id uuid references public.qualification_types(id),
  title text not null,
  slug text unique not null,
  subject text,
  summary text,
  delivery_mode text,
  duration_months integer,
  teaching_language text,
  publication_status public.review_status not null default 'draft',
  last_reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.program_intakes (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.programs(id) on delete cascade,
  label text not null,
  start_date date,
  application_deadline date,
  availability_status text default 'unknown'
);

create table public.program_requirements (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.programs(id) on delete cascade,
  intake_id uuid references public.program_intakes(id) on delete cascade,
  requirement_type text not null,
  normalized_value jsonb not null default '{}'::jsonb,
  published_text text not null,
  publication_status public.review_status not null default 'needs_review',
  last_reviewed_at timestamptz
);

create table public.program_costs (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.programs(id) on delete cascade,
  intake_id uuid references public.program_intakes(id) on delete cascade,
  fee_type text not null,
  amount numeric(14,2),
  currency char(3),
  billing_period text,
  audience text,
  publication_status public.review_status not null default 'needs_review'
);

create table public.scholarships (
  id uuid primary key default gen_random_uuid(),
  provider_name text not null,
  title text not null,
  slug text unique not null,
  summary text,
  value_text text,
  deadline date,
  eligibility jsonb not null default '{}'::jsonb,
  publication_status public.review_status not null default 'draft',
  last_reviewed_at timestamptz
);

create table public.courses (
  id uuid primary key default gen_random_uuid(),
  provider_name text not null,
  title text not null,
  slug text unique not null,
  summary text,
  level_label text,
  mode text,
  duration_text text,
  price_text text,
  publication_status public.review_status not null default 'draft'
);

create table public.careers (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  family text,
  summary text,
  education_routes jsonb not null default '[]'::jsonb,
  skills jsonb not null default '[]'::jsonb,
  publication_status public.review_status not null default 'draft'
);

create table public.curricula (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  summary text,
  stages_text text,
  locations_text text,
  publication_status public.review_status not null default 'draft'
);

create table public.sources (
  id uuid primary key default gen_random_uuid(),
  institution_id uuid references public.institutions(id),
  title text not null,
  source_url text not null,
  source_owner text,
  locale text default 'en',
  licensing_notes text,
  source_type text not null default 'official_webpage',
  last_checked_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.source_snapshots (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null references public.sources(id) on delete cascade,
  checksum text not null,
  captured_at timestamptz not null default now(),
  storage_path text,
  extracted_text text,
  extraction_status text not null default 'pending'
);

create table public.field_evidence (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null references public.sources(id),
  snapshot_id uuid references public.source_snapshots(id),
  entity_type text not null,
  entity_id uuid not null,
  field_name text not null,
  excerpt text,
  applicable_intake text,
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamptz
);

create table public.change_events (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null,
  entity_id uuid not null,
  field_name text not null,
  previous_value jsonb,
  current_value jsonb,
  severity text not null check (severity in ('low', 'medium', 'high')),
  source_id uuid references public.sources(id),
  status text not null default 'open' check (status in ('open', 'confirmed', 'dismissed')),
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.coverage_records (
  id uuid primary key default gen_random_uuid(),
  country_id uuid references public.countries(id),
  stage_id uuid references public.education_stages(id),
  intake_label text,
  coverage_level text not null,
  reviewed_at timestamptz,
  notes text
);

create table public.learner_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique not null references public.profiles(id) on delete cascade,
  country_of_residence text,
  goal text,
  budget_amount numeric(14,2),
  budget_currency char(3),
  preferences jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.learner_qualifications (
  id uuid primary key default gen_random_uuid(),
  learner_profile_id uuid not null references public.learner_profiles(id) on delete cascade,
  country_name text not null,
  qualification_name text not null,
  institution_name text,
  result_text text,
  completion_year integer,
  subjects jsonb not null default '[]'::jsonb
);

create table public.pathway_plans (
  id uuid primary key default gen_random_uuid(),
  learner_profile_id uuid not null references public.learner_profiles(id) on delete cascade,
  title text not null,
  goal text not null,
  destinations jsonb not null default '[]'::jsonb,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.pathway_options (
  id uuid primary key default gen_random_uuid(),
  pathway_plan_id uuid not null references public.pathway_plans(id) on delete cascade,
  program_id uuid references public.programs(id),
  match_status public.match_status not null,
  explanation jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table public.saved_items (
  id uuid primary key default gen_random_uuid(),
  learner_profile_id uuid not null references public.learner_profiles(id) on delete cascade,
  entity_type text not null,
  entity_id uuid not null,
  created_at timestamptz not null default now(),
  unique (learner_profile_id, entity_type, entity_id)
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  learner_profile_id uuid not null references public.learner_profiles(id) on delete cascade,
  pathway_plan_id uuid references public.pathway_plans(id) on delete cascade,
  title text not null,
  due_at timestamptz,
  completed_at timestamptz,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.counselor_assignments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  counselor_id uuid not null references public.profiles(id),
  learner_profile_id uuid not null references public.learner_profiles(id) on delete cascade,
  consented_at timestamptz not null,
  revoked_at timestamptz,
  unique (organization_id, counselor_id, learner_profile_id)
);

create table public.research_collections (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  learner_profile_id uuid references public.learner_profiles(id),
  title text not null,
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.recommendations (
  id uuid primary key default gen_random_uuid(),
  pathway_plan_id uuid not null references public.pathway_plans(id) on delete cascade,
  counselor_id uuid not null references public.profiles(id),
  recommendation_text text not null,
  evidence_summary jsonb not null default '[]'::jsonb,
  status text not null default 'draft',
  approved_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.institution_submissions (
  id uuid primary key default gen_random_uuid(),
  institution_id uuid not null references public.institutions(id),
  organization_id uuid not null references public.organizations(id),
  submitted_by uuid not null references public.profiles(id),
  entity_type text not null,
  entity_id uuid,
  field_name text not null,
  current_value jsonb,
  proposed_value jsonb not null,
  evidence_url text not null,
  status public.submission_status not null default 'submitted',
  reviewer_id uuid references public.profiles(id),
  reviewer_notes text,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id),
  organization_id uuid references public.organizations(id),
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.correction_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid references public.profiles(id),
  entity_type text not null,
  entity_id uuid not null,
  field_name text,
  details text not null,
  evidence_url text,
  status text not null default 'open',
  created_at timestamptz not null default now()
);

create or replace function public.is_platform_reviewer()
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.profiles where id = auth.uid() and role in ('reviewer', 'platform_admin')); $$;

create or replace function public.is_org_member(target_org uuid)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.organization_members where organization_id = target_org and user_id = auth.uid() and status = 'active'); $$;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$ begin insert into public.profiles (id, display_name) values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))); return new; end; $$;

create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.learner_profiles enable row level security;
alter table public.learner_qualifications enable row level security;
alter table public.pathway_plans enable row level security;
alter table public.pathway_options enable row level security;
alter table public.saved_items enable row level security;
alter table public.tasks enable row level security;
alter table public.counselor_assignments enable row level security;
alter table public.research_collections enable row level security;
alter table public.recommendations enable row level security;
alter table public.institution_submissions enable row level security;
alter table public.audit_events enable row level security;
alter table public.institution_claims enable row level security;
alter table public.correction_reports enable row level security;

create policy "profiles self read" on public.profiles for select using (id = auth.uid() or public.is_platform_reviewer());
create policy "profiles self update" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());
create policy "organizations members read" on public.organizations for select using (public.is_org_member(id) or public.is_platform_reviewer());
create policy "members same organization read" on public.organization_members for select using (public.is_org_member(organization_id) or public.is_platform_reviewer());
create policy "learner owns profile" on public.learner_profiles for all using (user_id = auth.uid() or exists (select 1 from public.counselor_assignments a where a.learner_profile_id = learner_profiles.id and a.counselor_id = auth.uid() and a.revoked_at is null)) with check (user_id = auth.uid());
create policy "qualification owner or assigned counselor read" on public.learner_qualifications for select using (exists (select 1 from public.learner_profiles l left join public.counselor_assignments a on a.learner_profile_id = l.id and a.revoked_at is null where l.id = learner_qualifications.learner_profile_id and (l.user_id = auth.uid() or a.counselor_id = auth.uid())));
create policy "qualification owner write" on public.learner_qualifications for all using (exists (select 1 from public.learner_profiles l where l.id = learner_qualifications.learner_profile_id and l.user_id = auth.uid())) with check (exists (select 1 from public.learner_profiles l where l.id = learner_qualifications.learner_profile_id and l.user_id = auth.uid()));
create policy "pathway owner or assigned counselor read" on public.pathway_plans for select using (exists (select 1 from public.learner_profiles l left join public.counselor_assignments a on a.learner_profile_id = l.id and a.revoked_at is null where l.id = pathway_plans.learner_profile_id and (l.user_id = auth.uid() or a.counselor_id = auth.uid())));
create policy "pathway owner write" on public.pathway_plans for all using (exists (select 1 from public.learner_profiles l where l.id = pathway_plans.learner_profile_id and l.user_id = auth.uid())) with check (exists (select 1 from public.learner_profiles l where l.id = pathway_plans.learner_profile_id and l.user_id = auth.uid()));
create policy "pathway option inherited read" on public.pathway_options for select using (exists (select 1 from public.pathway_plans p join public.learner_profiles l on l.id = p.learner_profile_id left join public.counselor_assignments a on a.learner_profile_id = l.id and a.revoked_at is null where p.id = pathway_options.pathway_plan_id and (l.user_id = auth.uid() or a.counselor_id = auth.uid())));
create policy "saved items owner" on public.saved_items for all using (exists (select 1 from public.learner_profiles l where l.id = saved_items.learner_profile_id and l.user_id = auth.uid())) with check (exists (select 1 from public.learner_profiles l where l.id = saved_items.learner_profile_id and l.user_id = auth.uid()));
create policy "tasks participant read" on public.tasks for select using (exists (select 1 from public.learner_profiles l left join public.counselor_assignments a on a.learner_profile_id = l.id and a.revoked_at is null where l.id = tasks.learner_profile_id and (l.user_id = auth.uid() or a.counselor_id = auth.uid())));
create policy "assignments participant read" on public.counselor_assignments for select using (counselor_id = auth.uid() or exists (select 1 from public.learner_profiles l where l.id = learner_profile_id and l.user_id = auth.uid()) or public.is_platform_reviewer());
create policy "assignments learner consents" on public.counselor_assignments for insert with check (exists (select 1 from public.learner_profiles l where l.id = learner_profile_id and l.user_id = auth.uid()));
create policy "research organization read" on public.research_collections for select using (public.is_org_member(organization_id) or public.is_platform_reviewer());
create policy "research organization write" on public.research_collections for insert with check (public.is_org_member(organization_id));
create policy "recommendation participants read" on public.recommendations for select using (counselor_id = auth.uid() or exists (select 1 from public.pathway_plans p join public.learner_profiles l on l.id = p.learner_profile_id where p.id = recommendations.pathway_plan_id and l.user_id = auth.uid()) or public.is_platform_reviewer());
create policy "institution submissions org read" on public.institution_submissions for select using (public.is_org_member(organization_id) or public.is_platform_reviewer());
create policy "institution submissions org create" on public.institution_submissions for insert with check (public.is_org_member(organization_id) and submitted_by = auth.uid());
create policy "claims org read" on public.institution_claims for select using (public.is_org_member(organization_id) or public.is_platform_reviewer());
create policy "audit reviewers only" on public.audit_events for select using (public.is_platform_reviewer());
create policy "corrections submit" on public.correction_reports for insert with check (reporter_id is null or reporter_id = auth.uid());
create policy "corrections reviewers read" on public.correction_reports for select using (public.is_platform_reviewer());

alter table public.countries enable row level security;
alter table public.education_stages enable row level security;
alter table public.qualification_types enable row level security;
alter table public.institutions enable row level security;
alter table public.programs enable row level security;
alter table public.program_intakes enable row level security;
alter table public.program_requirements enable row level security;
alter table public.program_costs enable row level security;
alter table public.scholarships enable row level security;
alter table public.courses enable row level security;
alter table public.careers enable row level security;
alter table public.curricula enable row level security;
alter table public.sources enable row level security;
alter table public.source_snapshots enable row level security;
alter table public.field_evidence enable row level security;
alter table public.change_events enable row level security;
alter table public.coverage_records enable row level security;

create policy "published countries public" on public.countries for select using (publication_status = 'published' or public.is_platform_reviewer());
create policy "stages public" on public.education_stages for select using (true);
create policy "qualification types public" on public.qualification_types for select using (true);
create policy "published institutions public" on public.institutions for select using (publication_status = 'published' or public.is_platform_reviewer());
create policy "published programs public" on public.programs for select using (publication_status = 'published' or public.is_platform_reviewer());
create policy "published program intakes public" on public.program_intakes for select using (exists (select 1 from public.programs p where p.id = program_id and p.publication_status = 'published') or public.is_platform_reviewer());
create policy "reviewed requirements public" on public.program_requirements for select using (publication_status in ('reviewed', 'verified', 'published') or public.is_platform_reviewer());
create policy "reviewed costs public" on public.program_costs for select using (publication_status in ('reviewed', 'verified', 'published') or public.is_platform_reviewer());
create policy "published scholarships public" on public.scholarships for select using (publication_status = 'published' or public.is_platform_reviewer());
create policy "published courses public" on public.courses for select using (publication_status = 'published' or public.is_platform_reviewer());
create policy "published careers public" on public.careers for select using (publication_status = 'published' or public.is_platform_reviewer());
create policy "published curricula public" on public.curricula for select using (publication_status = 'published' or public.is_platform_reviewer());
create policy "sources public read" on public.sources for select using (true);
create policy "snapshots reviewers only" on public.source_snapshots for select using (public.is_platform_reviewer());
create policy "field evidence public read" on public.field_evidence for select using (true);
create policy "change events members read" on public.change_events for select using (auth.uid() is not null);
create policy "coverage public read" on public.coverage_records for select using (true);
