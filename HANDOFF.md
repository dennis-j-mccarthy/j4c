# jfc / Jobs For Catholics — Agent Handoff

_Last updated: 2026-10-02 (stopping point)._ This file is the full context needed to continue development with any AI agent or human. No secrets here — all credentials live in `.env` (gitignored) and in Vercel project env vars._

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
| Candidate dashboard | `/dashboard` | Applications w/ status, AI-matched openings, saved jobs, profile strength, resume collection |
| Employer dashboard | `/employer/dashboard`, `/employer/jobs/[id]/edit` | Postings with applicant counts by stage; Edit, Close, Mark filled, Reopen, Feature this job; applicant pipeline (stage + private notes) on the applicants page |
| Legal | `/terms`, `/privacy` | Plain-language drafts marked "pending legal review" — need counsel sign-off; account delete/export promised in privacy isn't built |
| Freelance marketplace | `/freelance`, `/freelance/[slug]` | 9 seeded crafts; search/category filters; profile pages with **photo portfolios + captions** (real S3 uploads from the join form); inquiry modal → DB; **AI pitch polisher**; church-interior hero |
| Prospect CRM | `/admin/prospects` | 40 employers scraped from CatholicJobs.com (contacts/emails/domains), status pipeline, one-click personalized mailto draft. ⚠️ Unauthenticated — owner tool |
| Punch list | `/punchlist` | Migration plan, DB-backed checkboxes + comments, client-visible. Update via `PATCH /api/punchlist/{id}` `{done: bool}` |
| Content | `/blog` (50 articles incl. 10 "Catholic job" SEO pieces), `/about`, `/contact` (form→DB), `/pricing`, `/why-us`, `/register`, `/search-candidates` | Every nav/footer link resolves |
| SEO | `sitemap.xml`, `robots.txt` | Jobs + articles indexed; admin/dashboard excluded |

## Demo accounts

- **Employer:** sign in at `/login` with **hiring@stclare.example.org** (Anne Whitaker, St. Clare of Assisi Catholic School). Lands on `/employer/dashboard`. St. Clare's "High School Theology Teacher" posting has 5 applicants including Maria — move her to Interviewing and her `/dashboard` shows it. Seed: `npx tsx prisma/seed-demo-employer.ts`.
- **Do not use the EMPLOYER account attached to Holy Name Catholic Church** for testing — it's likely the stakeholder's own account. (Look it up in the DB; don't write the address into docs — this repo is public.)
- Applicant lists (`/jobs/[slug]/applicants`) and the candidate directory (`/search-candidates`) are visible only to a signed-in employer; signed-out visitors get a sign-in prompt.

### Candidate

Sign in at `/login` with **maria.alvarez@example.org** — email-only (sets cookie `jfc_candidate` = CandidateProfile id; magic-link auth is punchlist a1). Maria has a saved master resume and tailored documents. Test writes are fine on Maria; keep the marketplace clean of junk freelancers (delete test rows after).

## Business decisions (made by Dennis — don't relitigate)

- **Freelancers pay $20/mo flat to be listed, 0% commission.** No featured tier. Early listings free until Stripe lands.
- Employers: first listing free → $99/listing → $249/mo recruiter plan.
- Fonts: Playfair Display headings (font-medium, never bold) + Outfit body; all-caps subtle nav. Never reuse a photo that's already on the site.

## Stakeholder demo assets

- Full feature demo (self-contained HTML): `~/Desktop/jfc-feature-demo.html` · artifact https://claude.ai/artifact/3zG7hyPgdu2WUrk9NXHX7n
- Freelance demo for Mark: `~/Desktop/jfc-freelance-demo.html` · artifact https://claude.ai/artifact/STh9U6bXyxjVdq6xg4pdd6
- Relaunch plan + creative kit: `~/Downloads/jfc-relaunch-kit/` (jfc-relaunch-plan.html, .pdf, jfc-relaunch-art.zip, art/ with 31 PNGs, src/ with art.html + render.js to re-render) · Desktop copies of the HTML and PDF · artifact https://claude.ai/artifact/VsVAyAEzgTnA7faQkt67Sh (v4)
- Social analysis add-on: `~/Downloads/jfc-relaunch-kit/jfc-social-analysis.html` + .pdf + jfc-social-art.zip (18 templates in art-social/; src/art-social.html + render-social.js, src/social.body.html + build-social.py) · Desktop copies · separate artifact. Recon 10/02: JFC FB 230 / IG 164 (8 posts) / LI 797; CatholicJobs.com FB 5.8K (dormant since Apr 2023) / X 1,489 automated / LI 2,602; Catholic Job Hub none found. New site footer has no social links yet; job page's fit-button sublabel names the AI vendor (change before recording video).
- Known gaps the plan depends on: freelancer inquiries and contact-form messages are only stored in the DB (no email notification yet); /pricing still shows $99/$249 while CatholicJobs.com charges $33–$65 and Catholic Job Hub posts free
- All artifacts are private until Dennis enables link sharing.

## Seeds & scripts

`npx tsx prisma/seed-articles.ts | seed-prospects.ts | seed-freelancers.ts | seed-portfolios.ts` (all idempotent upserts; need `.env`).

## Current status (stopping point 2026-10-02)

- **Prod is current** with `main` (last app deploy: employer registration fix, 45f0677). Live at https://jfc-tau.vercel.app.
- **Shipped this round:** employer sign-in + `/employer/dashboard` + edit/close/reopen + applicant pipeline (e1–e3), saved jobs (s4), DB-driven featured jobs on the home page (e5), terms + privacy drafts (c5), applicant lists and `/search-candidates` gated to employers, three dead menu links fixed.
- **Marketing deliverables (finished, not in this repo — see below):** relaunch plan + creative kit (31 art pieces) and the social analysis add-on (18 templates). Both are claude.ai artifacts reachable from any device; files live on Dennis's Mac in `~/Downloads/jfc-relaunch-kit/` and the Desktop.
- **This repo is PUBLIC.** No secrets are in its history (checked 10/02), but `prisma/data/cj-prospects.json` (40 scraped employers, 35 contact emails) is. That's why the marketing kit was deliberately NOT committed here.

## Priorities (in order)

1. **Make the GitHub repo private** (Dennis's call — Settings → General → Danger Zone → Change visibility). This is the only fix that also covers the prospect data already in git history. Until then, put nothing with real people's details in this repo.
2. **Gate `/admin/prospects` and `/punchlist`** — both are unauthenticated on prod; the prospects page shows 35 real contact emails to anyone.
3. **Pricing decision (Dennis):** `/pricing` shows $99/listing and $249/mo; CatholicJobs.com charges $33–$65 and Catholic Job Hub is posting free. Confirm or change before Mark sees the plan.
4. **Email notifications:** freelancer inquiries and contact-form messages are stored in the DB but email no one. Needed before the freelancer email in the plan goes out. (Resend or SES — also unblocks job alerts, s5.)
5. **Social links + vendor wording on the site:** the new footer has no Facebook/Instagram/LinkedIn links; the fit-button sublabel on job pages names the AI vendor (change before recording the plan's videos).
6. **Rewire remaining uploads onto S3** via `/api/upload`: apply-form resume, candidate headshot/portfolio/video, employer logos → unlocks instant video intros (s7).
7. **Stripe** (e4): employer listings + the $20/mo freelancer subscription.
8. **Outreach batch** (g3): verify derived contact names first; needs a separate sending domain, mailing address and unsubscribe footer.
9. **Before client handoff:** own Neon project for the DB; client's own Anthropic key; link GitHub→Vercel (f8); real auth (a1, magic links).

## Picking this up on another machine

- `git clone https://github.com/dennis-j-mccarthy/j4c.git jfc && cd jfc && npm i --legacy-peer-deps`
- `.env` is not in git. Pull values with `vercel env pull .env --environment=production` (logged in as dennismccarthy-4340), or copy it from the Mac. Then `npx prisma generate`.
- Deploy is manual: `vercel --prod --yes` from the repo root.
- Marketing kit sources (art HTML, render scripts, photos) are only on the Mac at `~/Downloads/jfc-relaunch-kit/src/`. The finished plan and social add-on open from any device via their claude.ai links (above).

## Working style (Dennis)

Terse updates. Ship without re-asking; verify every change by actually driving the page before claiming it works; screenshots on request. Never estimate work in clock time. Never print secrets in output.
