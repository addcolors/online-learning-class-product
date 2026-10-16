---
agent: devin-local
session: triangular-pancake
created: 2026-10-15T16:13:34Z
---
# Online Learning Class — Global Education Pathways Platform

Build a production-oriented, editorial-premium Next.js platform that combines global education discovery, a student pathway planner, a counselor research workspace, and a source-backed institution/program data system.

## Confirmed direction

- **Repository:** `D:\xampp\htdocs\online-learning-class-product` (`addcolors/online-learning-class-product`); currently empty with no commits.
- **Brand:** Online Learning Class.
- **Product:** One portal with connected B2C and B2B experiences.
  - B2C: education discovery and pathway planning.
  - B2B: requirement monitoring and counselor research workflows.
- **Initial breadth:** Demonstrate nursery through postgraduate and career/course pathways, while giving selected records and workflows deeper functionality.
- **Initial data:** Curated, source-attributed seed records plus institution-submission and editorial-review workflows.
- **Stack:** Next.js App Router, TypeScript, Supabase PostgreSQL/Auth/Storage, Vercel deployment.
- **Visual direction:** Editorial premium—trustworthy, warm, globally minded, highly legible, and not a generic SaaS template.

## Product boundaries

The first release will be a working vertical slice rather than a claim of complete worldwide coverage. It will:

- Support representative education stages, countries, institutions, programs, scholarships, curricula, and careers.
- Clearly label coverage, source provenance, last-checked dates, review status, and unknown values.
- Present pathway results as guidance, not guaranteed admission or credential recognition.
- Keep sponsored/promoted content visibly separate from organic results.
- Avoid collecting unnecessary data from children; the initial authenticated planner will be designed for adults/parents, with child-directed accounts deferred.

It will not initially:

- Submit official university applications.
- Predict or guarantee admission.
- Scrape or copy restricted third-party databases.
- Offer visa, legal, or professional-recognition decisions.
- Claim exhaustive global institution/program coverage.

## 1. Bootstrap the application

Create the greenfield project using the current stable Next.js App Router with TypeScript and a `src/` layout. Add only dependencies needed by the implementation after confirming current stable versions and release age.

Planned foundations:

- Next.js App Router and React Server Components by default.
- Tailwind CSS for token-driven styling.
- Accessible primitive components using Radix/shadcn-style patterns, customized to avoid a stock visual result.
- Supabase browser/server clients and middleware-aware session handling.
- Zod schemas for form, URL-filter, environment, and server-action validation.
- React Hook Form only where multi-field client forms benefit from it.
- Lucide icons.
- Vitest/Testing Library for unit and component tests.
- Playwright for critical end-to-end flows.
- ESLint, TypeScript strict mode, formatting scripts, and environment templates.

Set up route groups and modules so marketing/discovery pages, authenticated workspaces, domain services, and Supabase access remain separated.

## 2. Establish the editorial-premium design system

Implement reusable tokens and components before composing pages.

### Visual language

- Warm paper-like background, deep ink/navy text, restrained teal/emerald trust accent, and a selective ochre/coral highlight.
- Distinctive editorial display type paired with a highly legible UI sans-serif, loaded through `next/font`.
- Generous whitespace, fine rules, understated depth, and data-dense comparison surfaces.
- Limited, meaningful motion: search transitions, staged result entry, comparison feedback, and reduced-motion support.
- No excessive gradients, glassmorphism, oversized rounded cards, or interchangeable AI-startup visuals.

### Core components

- Global header with audience-aware navigation and mobile drawer.
- Footer with product, methodology, trust, correction, and legal sections.
- Search/autocomplete, filter controls, chips, segmented controls, tabs, and pagination.
- Institution/program/scholarship/country cards.
- Requirement-status, source-evidence, confidence, and last-checked indicators.
- Comparison table with responsive stacked presentation.
- Pathway timeline and route cards.
- Cost breakdown and funding-gap visualization.
- Alerts, activity feed, task list, empty states, and skeleton states.
- Form controls, dialogs, command palette, toast feedback, and accessible validation summaries.
- Dashboard shell, sidebar, breadcrumbs, tables, and permission-sensitive actions.

Meet keyboard, focus, contrast, semantic HTML, responsive, and screen-reader requirements throughout.

## 3. Build the shared data platform in Supabase

Create migrations, generated TypeScript types, seed scripts, and row-level security policies.

### Identity and organizations

- `profiles`: account identity and preferences linked to Supabase Auth.
- `organizations`: counselor groups, schools, and institutions.
- `organization_members`: role and membership state.
- Roles: student/parent, counselor, counselor admin, institution editor, reviewer, platform admin.

### Education catalog

- `countries`, `regions`, and localized country guidance.
- `education_stages` and `qualification_types`.
- `institutions`, `institution_campuses`, `accreditation_records`.
- `programs`, `program_intakes`, `program_requirements`, `program_costs`, `program_deadlines`.
- `curricula`, `subjects`, `program_subjects`.
- `scholarships`, eligibility conditions, deadlines, and related programs/institutions.
- `careers`, skill/qualification relationships, and course/pathway associations.
- `courses` for representative online/short-course options, clearly separated from formal programs.

### Provenance and monitoring

- `sources`: official URL/document, ownership/licensing notes, locale, and retrieval metadata.
- `source_snapshots`: captured/checksum/version metadata, with storage references where permitted.
- `field_evidence`: links a published field or requirement to supporting source evidence.
- `change_events`: old/new normalized values, severity, detection method, review state, and reviewer.
- `coverage_records`: what countries/stages/intakes are actively supported and how recently reviewed.
- `correction_reports`: public or authenticated correction submissions and resolution workflow.

### B2C planning

- `learner_profiles`, `learner_qualifications`, `learner_subjects`, and language evidence.
- `pathway_plans`, `pathway_options`, `saved_items`, `comparisons`.
- `tasks`, `documents`, `notes`, and `alerts`.
- Consent-aware links between learner and counselor organizations.

### B2B workflows

- `counselor_assignments` and caseload visibility.
- `research_collections`, `research_items`, and evidence annotations.
- `recommendations`, approval status, and audit events.
- `institution_submissions`, submitted field changes, reviewer decisions, and publication state.

### Security

- Default-deny RLS on private tables.
- Users can access their own planner data.
- Counselors can access explicitly assigned/consented students within their organization.
- Institution editors can propose changes only for verified institutions and cannot publish directly.
- Reviewers/admins approve catalog changes through server-only operations.
- Public catalog views expose only published records and non-sensitive fields.
- Storage buckets separate public institution assets from private learner documents.
- Service-role keys remain server-only; all mutations are validated and audited.

## 4. Seed representative, source-attributed data

Create a coherent seed dataset that demonstrates the platform without pretending to be comprehensive:

- Multiple education stages from nursery/K–12 through undergraduate, postgraduate, short courses, and careers.
- A small selection of countries and cities.
- Representative schools, colleges/universities, programs, scholarships, curricula, and careers.
- Official-source metadata, review status, last-checked dates, and intentionally unknown fields.
- Several versions/change events so the counselor monitoring screens have realistic content.
- Demo student, counselor, organization, and institution-editor scenarios created through a development seed workflow, not hardcoded UI fixtures.

Document seed records as demonstration content and keep the ingestion boundary modular for future authorized feeds and review tooling.

## 5. Implement the public information architecture

### Primary routes

- `/` — editorial homepage centered on “Find your next education path.”
- `/explore` — unified discovery entry point.
- `/institutions` and `/institutions/[slug]`.
- `/programs` and `/programs/[slug]`.
- `/countries` and `/countries/[slug]`.
- `/schools` and `/schools/[slug]` for representative nursery/K–12 discovery.
- `/scholarships` and `/scholarships/[slug]`.
- `/courses` and `/courses/[slug]`.
- `/careers` and `/careers/[slug]`.
- `/curricula` and `/curricula/[slug]`.
- `/study-abroad` plus destination-focused editorial landing pages.
- `/for-counselors`, `/for-institutions`, `/methodology`, `/coverage`, and `/trust`.

### Homepage composition

- High-impact search/pathway hero with qualification and destination entry points.
- Intent cards: find a program, study abroad, find funding, choose a school, change career, work with a counselor.
- Four-step pathway explanation.
- Representative pathway stories.
- Country/program exploration.
- Full-decision comparison preview.
- Counselor product section.
- Source/transparency section.
- Final pathway call to action.

Use meaningful server-rendered copy and data; do not make the homepage a client-only animation shell.

## 6. Implement discovery, filtering, and comparison

Create server-rendered search pages with URL-addressable filters:

- Stage, credential, subject, country/city, delivery mode, language, tuition range, duration, intake, and review status.
- Search results provide source/review metadata without overstating eligibility.
- Sorting by relevance, cost, deadline, and last reviewed where meaningful.
- Compare up to a limited number of institutions/programs side by side.
- Saved items require authentication; anonymous users retain temporary browser state and can merge it after sign-in.
- Empty results suggest alternative filters rather than fabricated matches.

Use PostgreSQL-backed filtering initially, with a repository/search-service abstraction that can later adopt a dedicated search engine if data volume requires it.

## 7. Build the B2C pathway planner

Create a multi-step authenticated planner:

1. Education stage and current location.
2. Qualification, grades, subjects/modules, and completion year.
3. Language evidence.
4. Study/career goal.
5. Destination, delivery, and budget preferences.
6. Review and consent.

### Result model

The initial matching engine will be deterministic and explainable:

- Evaluate structured requirements only where mappings exist.
- Return statuses such as `appears compatible`, `review needed`, `missing published prerequisite`, and `insufficient information`.
- Show the exact supporting requirement/evidence for each result.
- Provide alternative routes where curated relationships exist.
- Never convert an LLM opinion into an admission probability.

### Student workspace

- Dashboard overview.
- Saved programs/schools/scholarships.
- Pathway plans and alternatives.
- Program comparison.
- Cost planner and funding-gap scenarios.
- Deadlines and tasks.
- Alerts when relevant published data changes.
- Counselor sharing/consent controls.
- Account and privacy settings.

## 8. Build the counselor research workspace

Create an organization-scoped B2B dashboard:

- Caseload overview with deadlines, incomplete profiles, and unresolved research.
- Student detail with profile, pathways, shortlist, tasks, evidence, notes, and audit history.
- Research workspace to search catalog records, collect evidence, annotate findings, and assemble recommendations.
- Requirement-change center with severity filters, old/new values, source comparison, affected students/plans, assignment, confirmation, and dismissal reasons.
- Team roles, assignment controls, and activity history.
- Reports for caseload status, upcoming deadlines, review backlog, and affected plans.

Counselor recommendations must record author, evidence, review state, and timestamps. Sensitive learner data must never be exposed in public pages or cross-organization queries.

## 9. Build institution submission and editorial review workflows

### Institution portal

- Request to claim an institution.
- Verified representative profile.
- View current public data.
- Propose program, fee, requirement, deadline, scholarship, and profile updates.
- Attach official source URLs/documents.
- Track pending, approved, returned, or rejected submissions.

### Reviewer workspace

- Submission queue.
- Side-by-side current/proposed values.
- Source inspection and evidence attachment.
- Approve, request changes, or reject with reason.
- Approved updates create version/audit/change events and trigger affected-plan alerts.

Institution submissions never publish automatically.

## 10. Authentication and onboarding

Implement Supabase authentication with email/password and email magic-link support; structure provider configuration so OAuth can be enabled later.

- Role-aware post-signup onboarding for learner/parent, counselor, and institution representative.
- Protected route middleware plus server-side authorization checks.
- Email verification, password reset, session refresh, sign-out, and account deletion request flows.
- Demo-friendly onboarding that lets evaluators understand each product without unsafe shared production credentials.

## 11. SEO and discoverability

Use Next.js server rendering and metadata APIs throughout.

- Route-level canonical URLs, titles, descriptions, Open Graph/Twitter cards, and robots rules.
- JSON-LD appropriate to each page: `Organization`, `WebSite`, `BreadcrumbList`, `CollegeOrUniversity`, `School`, and `Course` only when page data satisfies the schema.
- Dynamic XML sitemap indexes split by entity type and only containing published/indexable records.
- `robots.txt`, not-found pages, redirects strategy, and clean slug policies.
- Breadcrumbs and strong internal linking among country, institution, program, scholarship, curriculum, and career pages.
- Indexable filter strategy: canonicalize broad search states and prevent low-value parameter combinations from creating index bloat.
- Source dates, update dates, authorship/review information, and correction paths visible on consequential content.
- Optimized images, fonts, caching/revalidation, and Core Web Vitals targets.
- No programmatic generation of thin pages for unsupported combinations.

## 12. Privacy, trust, and compliance-oriented UX

- Data minimization and explicit consent for counselor access.
- Parent-managed records for minors; no child-directed account flow in the initial release.
- Privacy center with exports/deletion requests and communication preferences.
- Methodology, coverage, data-source, commercial-disclosure, and correction pages.
- Clear labels separating official facts, normalized data, platform interpretation, counselor notes, and sponsored placement.
- Audit sensitive mutations and access-relevant events.
- Add security headers, rate limits to high-risk endpoints, bot protection hooks, and file type/size restrictions.

## 13. Performance and observability

- Prefer server components and progressively enhance only interactive surfaces.
- Cache public catalog queries and revalidate changed entities after editorial publication.
- Paginate datasets and avoid large client payloads.
- Add structured application logging without sensitive learner data.
- Add an error-monitoring integration boundary and health/readiness endpoint.
- Include analytics consent boundaries and track product events without exposing private academic details.

## 14. Verification strategy

### Automated checks

- Lint and formatting checks.
- Strict TypeScript build.
- Unit tests for requirement evaluation, cost calculations, normalization, permissions, and change-impact logic.
- Component tests for source evidence, comparison tables, planner validation, and alert states.
- Supabase RLS tests proving cross-user and cross-organization isolation.
- Playwright tests for:
  - public discovery and comparison,
  - learner signup and pathway creation,
  - saving and revisiting a plan,
  - counselor review of an assigned learner,
  - change alert resolution,
  - institution submission and reviewer approval,
  - anonymous/private route boundaries.
- Production Next.js build.

### Manual/high-fidelity review

- Test desktop, tablet, and mobile layouts.
- Keyboard-only navigation and visible focus states.
- Screen-reader landmarks and form errors.
- Color contrast and reduced motion.
- Metadata, structured data, sitemap, robots, canonical, and social-card inspection.
- Browser review of all principal pages and dashboards.
- Confirm every consequential seed fact has visible evidence/status and no page promises guaranteed admission.

## 15. Delivery sequence

1. Bootstrap Next.js, quality tooling, environment validation, and Supabase local/remote configuration.
2. Build tokens, global shell, and reusable public/dashboard components.
3. Add Supabase schema, RLS, generated types, seeds, and repository/service layer.
4. Build homepage and public entity/discovery pages.
5. Implement authentication, onboarding, and saved-item behavior.
6. Implement pathway planner, deterministic matching, comparison, cost planner, and learner dashboard.
7. Implement counselor dashboard, student/research workspaces, and monitoring center.
8. Implement institution submission and reviewer workflows.
9. Complete SEO, trust, privacy, caching, and observability surfaces.
10. Run full automated/manual verification, fix defects, and prepare Vercel/Supabase deployment configuration.

## Acceptance criteria

The first release is complete when:

- The public portal presents nursery-to-PG/course/career breadth through coherent, source-attributed representative data.
- A learner can create an account, build a pathway profile, receive explainable results, compare/save options, model costs, and track tasks.
- A counselor can work with an authorized learner, research and annotate options, approve a recommendation, and resolve a requirement-change alert.
- An institution representative can submit an evidence-backed update that remains unpublished until reviewer approval.
- Private data is protected by tested row-level policies and server authorization.
- Primary public routes are server-rendered, metadata-complete, indexable where appropriate, responsive, accessible, and performant.
- The application passes lint, typecheck, tests, RLS checks, Playwright critical paths, and production build.
