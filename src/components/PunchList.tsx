"use client";

import { useEffect, useMemo, useState } from "react";

type Item = {
  id: string;
  title: string;
  detail?: string;
  done?: boolean; // pre-checked: already shipped
};

type Phase = {
  name: string;
  blurb: string;
  items: Item[];
};

const phases: Phase[] = [
  {
    name: "Foundation",
    blurb: "Stand up the new stack and prove it end to end.",
    items: [
      { id: "f1", title: "Scaffold Next.js app (TS, Tailwind, App Router)", done: true },
      { id: "f2", title: "Pull brand from jobsforcatholics.com", detail: "Logo, hero, colors, employer logos into public/brand + Tailwind tokens", done: true },
      { id: "f3", title: "Landing page (megamenu, tracks, jobs, map, animations)", done: true },
      { id: "f4", title: "Prisma schema: Company / Job / Application / User / SavedJob", done: true },
      { id: "f5", title: "Deploy to Vercel", detail: "jfc-tau.vercel.app, project jfc", done: true },
      { id: "f6", title: "Provision Postgres + set DATABASE_URL on Vercel", detail: "Live as isolated `jfc` database on the shared Neon server — move to its own Neon project before launch", done: true },
      { id: "f7", title: "prisma db push + seed", done: true },
      { id: "f8", title: "Link GitHub repo to Vercel for push-to-deploy" },
    ],
  },
  {
    name: "Data migration",
    blurb: "Get every live job, employer, and logo out of JobBoardHQ.",
    items: [
      { id: "d1", title: "Inventory current site content", detail: "Jobs, employers, categories, blog posts, static pages" },
      { id: "d2", title: "Export or scrape active job postings", detail: "JobBoardHQ has no public API — request export from support, else scrape /search pages" },
      { id: "d3", title: "Import employers with logos", detail: "Mirror siteresource.blob.core.windows.net assets to our storage" },
      { id: "d4", title: "Build slug + redirect map for every old job/employer URL" },
      { id: "d5", title: "Ask JobBoardHQ for registered-user export", detail: "Candidates + employers; plan a password-reset onboarding (hashes won't transfer)" },
    ],
  },
  {
    name: "Auth & accounts",
    blurb: "Three signup tracks, one login.",
    items: [
      { id: "a1", title: "Pick + wire auth", detail: "Auth.js with email magic links; roles SEEKER / EMPLOYER / FREELANCER / ADMIN already in schema" },
      { id: "a2", title: "Candidate registration + profile builder" },
      { id: "a3", title: "Employer registration + company profile" },
      { id: "a4", title: "Freelancer registration + portfolio fields" },
      { id: "a5", title: "Admin role + impersonation for support" },
    ],
  },
  {
    name: "Job seeker features",
    blurb: "The reason candidates show up.",
    items: [
      { id: "s1", title: "/search — list with keyword, location, category, type filters" },
      { id: "s2", title: "Job detail page with structured data", detail: "JobPosting JSON-LD → Google for Jobs indexing" },
      { id: "s3", title: "Apply flow", detail: "Guest + logged-in; resume upload to blob storage; unique (jobId, email) already enforced" },
      { id: "s4", title: "Saved jobs" },
      { id: "s5", title: "Job alert emails", detail: "Saved-search digest; use Resend or SES" },
    ],
  },
  {
    name: "Employer features",
    blurb: "The reason the site makes money.",
    items: [
      { id: "e1", title: "Employer dashboard (jobs, applicants, statuses)" },
      { id: "e2", title: "Post / edit / close a job" },
      { id: "e3", title: "Applicant pipeline", detail: "Application status enum is ready: SUBMITTED → HIRED/REJECTED" },
      { id: "e4", title: "Pricing plans + Stripe checkout", detail: "Match current plans before inventing new ones" },
      { id: "e5", title: "Featured-job upsell", detail: "featured flag exists; surface on landing + search" },
      { id: "e6", title: "Candidate search for employers" },
    ],
  },
  {
    name: "Freelance marketplace",
    blurb: "The new third leg — no JobBoardHQ equivalent to migrate.",
    items: [
      { id: "m1", title: "Freelancer directory + profile pages" },
      { id: "m2", title: "Contact / inquiry flow between employers and freelancers" },
      { id: "m3", title: "Decide: flat listing fee vs. free at launch" },
    ],
  },
  {
    name: "Content & pages",
    blurb: "Everything the nav already promises.",
    items: [
      { id: "c1", title: "Migrate blog posts + author pages" },
      { id: "c2", title: "About page" },
      { id: "c3", title: "Contact form", detail: "No PII in email — send notification, keep message in DB" },
      { id: "c4", title: "Job-seeker info + employer info pages" },
      { id: "c5", title: "Terms + privacy (copy from current site, review)" },
    ],
  },
  {
    name: "Launch",
    blurb: "Cutover without dropping traffic.",
    items: [
      { id: "l1", title: "SEO: metadata, sitemap.xml, robots.txt" },
      { id: "l2", title: "301 redirects from every old URL (map from Data migration)" },
      { id: "l3", title: "Analytics (Vercel Analytics or GA4)" },
      { id: "l4", title: "Transactional email domain setup (SPF/DKIM)" },
      { id: "l5", title: "Point jobsforcatholics.com DNS at Vercel" },
      { id: "l6", title: "Monitor 404s + Search Console for a week" },
      { id: "l7", title: "Cancel JobBoardHQ subscription" },
    ],
  },
];

type Comment = { id: string; text: string; createdAt: string };

const defaultChecked = () => {
  const map: Record<string, boolean> = {};
  for (const p of phases) for (const i of p.items) map[i.id] = !!i.done;
  return map;
};

export default function PunchList() {
  const [checked, setChecked] = useState<Record<string, boolean>>(defaultChecked);
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [openComments, setOpenComments] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/punchlist")
      .then((r) => r.json())
      .then(
        (data: {
          items: { id: string; done: boolean }[];
          comments: (Comment & { itemId: string })[];
        }) => {
          setChecked((base) => {
            const next = { ...base };
            for (const row of data.items) next[row.id] = row.done;
            return next;
          });
          const byItem: Record<string, Comment[]> = {};
          for (const c of data.comments) {
            (byItem[c.itemId] ??= []).push(c);
          }
          setComments(byItem);
        },
      )
      .catch(() => {
        // API unreachable — leave code defaults, page stays read-only-ish
      });
  }, []);

  const totals = useMemo(() => {
    const all = phases.flatMap((p) => p.items);
    const done = all.filter((i) => checked[i.id]).length;
    return { done, total: all.length };
  }, [checked]);

  const toggle = (id: string) => {
    const next = !checked[id];
    setChecked((c) => ({ ...c, [id]: next })); // optimistic
    fetch(`/api/punchlist/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: next }),
    }).catch(() => setChecked((c) => ({ ...c, [id]: !next })));
  };

  const addComment = async (id: string) => {
    const text = draft.trim();
    if (!text || saving) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/punchlist/${id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const comment: Comment = await res.json();
      setComments((c) => ({ ...c, [id]: [...(c[id] ?? []), comment] }));
      setDraft("");
    } finally {
      setSaving(false);
    }
  };

  const removeComment = (id: string, commentId: string) => {
    setComments((c) => ({
      ...c,
      [id]: (c[id] ?? []).filter((x) => x.id !== commentId),
    })); // optimistic
    fetch(`/api/punchlist/comments/${commentId}`, { method: "DELETE" }).catch(
      () => {},
    );
  };

  const pct = Math.round((totals.done / totals.total) * 100);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-xs font-semibold tracking-[0.3em] text-brand-dark uppercase">
        Migration plan
      </p>
      <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight text-ink">
        Punch list
      </h1>
      <p className="mt-3 text-muted">
        Every step to move jobsforcatholics.com off JobBoardHQ and onto this
        stack. Checkboxes and comments are saved to the database.
      </p>

      <div className="mt-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
        <div className="flex items-baseline justify-between text-sm font-medium text-ink">
          <span>
            {totals.done} of {totals.total} complete
          </span>
          <span className="text-brand-dark">{pct}%</span>
        </div>
        <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand to-brand-dark transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="mt-10 space-y-10">
        {phases.map((phase) => {
          const done = phase.items.filter((i) => checked[i.id]).length;
          return (
            <section key={phase.name}>
              <div className="flex items-baseline justify-between">
                <h2 className="font-heading text-2xl font-bold text-ink">
                  {phase.name}
                </h2>
                <span className="text-sm font-medium text-muted">
                  {done}/{phase.items.length}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted">{phase.blurb}</p>

              <ul className="mt-4 space-y-2">
                {phase.items.map((item) => {
                  const isDone = !!checked[item.id];
                  const itemComments = comments[item.id] ?? [];
                  const isOpen = openComments === item.id;
                  return (
                    <li
                      key={item.id}
                      className={`rounded-xl bg-white ring-1 transition ${
                        isDone ? "ring-black/5 opacity-70" : "ring-black/10"
                      }`}
                    >
                      <div className="flex items-start gap-3 p-4">
                        <button
                          type="button"
                          onClick={() => toggle(item.id)}
                          aria-label={isDone ? "Mark open" : "Mark done"}
                          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition ${
                            isDone
                              ? "border-brand bg-brand text-white"
                              : "border-slate-300 hover:border-brand"
                          }`}
                        >
                          {isDone && (
                            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                              <path
                                fillRule="evenodd"
                                d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 1 1 1.4-1.4l2.8 2.79 6.8-6.8a1 1 0 0 1 1.4 0Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </button>
                        <div className="min-w-0 flex-1">
                          <p
                            className={`font-medium ${
                              isDone ? "text-muted line-through" : "text-ink"
                            }`}
                          >
                            {item.title}
                          </p>
                          {item.detail && (
                            <p className="mt-0.5 text-sm text-muted">{item.detail}</p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setOpenComments(isOpen ? null : item.id);
                            setDraft("");
                          }}
                          className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition ${
                            isOpen || itemComments.length
                              ? "bg-brand-tint text-brand-dark"
                              : "text-muted hover:bg-slate-100"
                          }`}
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                            <path
                              d="M21 12a8 8 0 0 1-8 8H4l2.3-2.9A8 8 0 1 1 21 12Z"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {itemComments.length || ""}
                        </button>
                      </div>

                      {isOpen && (
                        <div className="border-t border-black/5 px-4 py-3">
                          {itemComments.length > 0 && (
                            <ul className="space-y-2">
                              {itemComments.map((c) => (
                                <li
                                  key={c.id}
                                  className="group flex items-start justify-between gap-3 rounded-lg bg-slate-50 px-3 py-2 text-sm"
                                >
                                  <div>
                                    <p className="text-ink">{c.text}</p>
                                    <p className="mt-0.5 text-xs text-muted">
                                      {new Date(c.createdAt).toLocaleString()}
                                    </p>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => removeComment(item.id, c.id)}
                                    aria-label="Delete comment"
                                    className="text-muted opacity-0 transition group-hover:opacity-100 hover:text-red-500"
                                  >
                                    ×
                                  </button>
                                </li>
                              ))}
                            </ul>
                          )}
                          <div className="mt-2 flex gap-2">
                            <input
                              type="text"
                              value={draft}
                              onChange={(e) => setDraft(e.target.value)}
                              onKeyDown={(e) => e.key === "Enter" && addComment(item.id)}
                              placeholder="Add a comment…"
                              className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => addComment(item.id)}
                              disabled={saving}
                              className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:opacity-50"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
