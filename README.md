# Online Learning Class

A production-oriented vertical slice for global education discovery, pathway planning, counselor research, and source-backed institution data workflows.

## Run locally

```bash
npm install
npm run dev -- --port 3001
```

Open `http://localhost:3001`. The application works in demonstration mode without external credentials.

## Supabase setup

1. Copy `.env.example` to `.env.local`.
2. Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and the server-only service role key.
3. Apply `supabase/migrations/202610150001_initial_schema.sql`.
4. Apply `supabase/seed.sql` only in a development project. Its institution URLs and records are explicitly synthetic demonstration data.

The schema includes public catalog records, provenance/change monitoring, learner pathways, organization-scoped counselor workflows, institution submissions, editorial review, audit records, and row-level security policies.

## Quality checks

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm audit --omit=dev
```

## Important product boundary

Pathway results organize published information into explainable planning signals. They do not predict admission, grant credential recognition, provide immigration advice, or replace an institution's final decision. The included dataset is representative rather than exhaustive.
