# jfc / Jobs For Catholics — Agent Handoff

_Last updated: 2026-09-26. This file is the full context needed to continue development with any AI agent or human. No secrets here — all credentials live in `.env` (gitignored) and in Vercel project env vars._

## What this is

A proof-of-concept replacement for **jobsforcatholics.com** (currently hosted on JobBoardHQ), built to impress the site's owner ("Mark," the stakeholder) into migrating. The pitch: *more than a job board — a recruitment platform with AI-based matching*. Three user tracks: **candidates, employers, freelancers**.

- **Prod:** https://jfc-tau.vercel.app (Vercel project `jfc`, team `denwah`)
- **Repo:** https://github.com/dennis-j-mccarthy/j4c.git (`main` = source of truth; **deploys are manual** — GitHub is NOT linked to Vercel)
- **Deploy:** `cd /Users/dennis.mccarthy/jfc && vercel --prod --yes`
- **Dev:** `npm run dev -- -p 3040` (Dennis previews at localhost:3040)

## Stack

- **Next.js 16.3.4** — App Router, TS, Tailwind v4 (`@theme inline` tokens in `src/app/globals.css`), Turbopack. Route handlers receive `params: Promise<...>` — always `await params`.
- **Prisma 7.10** — `prisma-client` generator → `src/generated/prisma`. Datasource URL lives in **`prisma.config.ts`**, NOT in schema.prisma. Requires driver adapter `@prisma/adapter-pg` (see `src/lib/prisma.ts`). **After any schema change: `npx prisma db push`, `npx prisma generate`, then RESTART the dev server** (stale client = "Cannot read properties of undefined (reading 'upsert')").
- **Postgres:** Neon, isolated database `jfc` on a server shared with another project — **move to its own Neon project before launch** (punchlist f6). Cold starts look like "Can't reach database server" — retry once.
- **AI:** `@anthropic-ai/sdk`, model `claude-opus-4-8`, structured output via `output_config: { format: { type: "json_schema", schema } }`. **The schema dialect rejects `minimum`/`maximum` on integers** — clamp server-side instead. All AI routes have template fallbacks and return `{ source: "ai"|"template", aiConfigured }`. Helpers in `src/lib/ai.ts`. ⚠️ The API key is currently shared with another of Dennis's projects — issue the client their own key before handoff.
- **Media:** S3 bucket `jfc-media-905418447941` (us-east-1), IAM user `jfc-app` scoped to it. The AWS account **blocks public bucket policies**, so nothing is public: browser uploads use presigned PUTs (`POST /api/upload`), display uses presigned GETs resolved at render time. DB stores `s3:<key>`; resolve with `resolveMediaUrl()` in `src/lib/s3.ts`. Env names are `JFC_AWS_*` / `JFC_S3_BUCKET` because **Vercel reserves the plain `AWS_*` names**. CloudFront should front the bucket at launch.
- **npm on this machine:** plain `npm i` crashes (arborist "edgesOut" bug) — **always `npm i --legacy-peer-deps`**.

## Feature inventory (all live on prod)

| Area | Where | Notes |
|---|---|---|
| Landing page | `/` | Megamenu, Ken Burns hero, employer logo marquee, push-pin map, one-time logo glint animation |
| Job search | `/search` | Keyword/location/category/type filters + fit-score slider |
| Job pages | `/jobs/[slug]` | JobPosting JSON-LD, heuristic fit card, **AI fit read** (score/strengths/gaps), **Tailor my resume** button, apply form with **AI cover letter** button |
| Job posting | `/employer/post` | 4-step wizard; **AI writes the JD** from facts + mission |
| Resume builder | `/resume` | **resume.io-style split screen**: form left, live paper preview right, updates per keystroke; AI rewrite on final step; photo support; print = PDF. ⌥⌘F prefills sample data (demo shortcut) |
| Tailored resumes | `/resumes`, `/resumes/[id]` | One click on any job tailors the master resume + matching cover letter to that JD; saved as a collection labeled by job title, survives posting deletion |
| Candidate dashboard | `/dashboard` | Applications w/ status, AI-matched openings, profile strength, resume collection |
| Freelance marketplace | `/freelance`, `/freelance/[slug]` | 9 seeded crafts; search/category filters; profile pages with **photo portfolios + captions** (real S3 uploads from the join form); inquiry modal → DB; **AI pitch polisher**; church-interior hero |
| Prospect CRM | `/admin/prospects` | 40 employers scraped from CatholicJobs.com (contacts/emails/domains), status pipeline, one-click personalized mailto draft. ⚠️ Unauthenticated — owner tool |
| Punch list | `/punchlist` | Migration plan, DB-backed checkboxes + comments, client-visible. Update via `PATCH /api/punchlist/{id}` `{done: bool}` |
| Content | `/blog` (50 articles incl. 10 "Catholic job" SEO pieces), `/about`, `/contact` (form→DB), `/pricing`, `/why-us`, `/register`, `/search-candidates` | Every nav/footer link resolves |
| SEO | `sitemap.xml`, `robots.txt` | Jobs + articles indexed; admin/dashboard excluded |

## Demo account

Sign in at `/login` with **maria.alvarez@example.org** — email-only (sets cookie `jfc_candidate` = CandidateProfile id; magic-link auth is punchlist a1). Maria has a saved master resume and tailored documents. Test writes are fine on Maria; keep the marketplace clean of junk freelancers (delete test rows after).

## Business decisions (made by Dennis — don't relitigate)

- **Freelancers pay $20/mo flat to be listed, 0% commission.** No featured tier. Early listings free until Stripe lands.
- Employers: first listing free → $99/listing → $249/mo recruiter plan.
- Fonts: Playfair Display headings (font-medium, never bold) + Outfit body; all-caps subtle nav. Never reuse a photo that's already on the site.

## Stakeholder demo assets

- Full feature demo (self-contained HTML): `~/Desktop/jfc-feature-demo.html` · artifact https://claude.ai/artifact/3zG7hyPgdu2WUrk9NXHX7n
- Freelance demo for Mark: `~/Desktop/jfc-freelance-demo.html` · artifact https://claude.ai/artifact/STh9U6bXyxjVdq6xg4pdd6
- Both artifacts are private until Dennis enables link sharing.

## Seeds & scripts

`npx tsx prisma/seed-articles.ts | seed-prospects.ts | seed-freelancers.ts | seed-portfolios.ts` (all idempotent upserts; need `.env`).

## Immediate next steps (in priority order)

1. **Rewire remaining uploads onto S3** via the existing `/api/upload` presign route: apply-form resume upload, candidate intake media (headshot/portfolio/video), employer logos. This unlocks **instant video intros** (punchlist s7, MediaRecorder capture).
2. **Employer applicant pipeline** (e3): status changes on `/jobs/[slug]/applicants`, employer dashboard (e1/e2).
3. **Job alert emails** (s5): Resend or SES; AlertFrequency field already on profiles.
4. **Stripe** (e4): employer listings + the $20/mo freelancer subscription.
5. **Outreach batch** (g3): the prospect CRM's derived contact names need human verification before any send; needs a warmed domain + CAN-SPAM footer.
6. **Before client handoff:** own Neon project for the DB; client's own Anthropic key; password-gate or auth `/admin/prospects` and `/punchlist`; link GitHub→Vercel (f8).

## Working style (Dennis)

Terse updates. Ship without re-asking; verify every change by actually driving the page before claiming it works; screenshots on request. Never estimate work in clock time. Never print secrets in output.
