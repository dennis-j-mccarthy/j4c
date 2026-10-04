import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { getEmployer } from "@/lib/employer";
import FitPill from "@/components/FitPill";
import { TYPE_LABELS, MODE_LABELS } from "@/lib/format";
import { candidateCategories, parseFilters, searchCandidates } from "@/lib/candidateSearch";

const selectCls =
  "rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-ink focus:border-brand focus:outline-none";

const STATES = "AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY DC".split(" ");

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Search Candidates — Jobs For Catholics",
  description: "Browse mission-driven candidates open to being discovered by Catholic employers.",
};

export default async function SearchCandidatesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const employer = await getEmployer();
  if (!employer) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50">
        <Header />
        <main className="flex flex-1 items-center justify-center px-4 py-20">
          <div className="max-w-md rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-black/5">
            <h1 className="font-heading text-2xl font-medium text-ink">Search candidates</h1>
            <p className="mt-3 text-muted">
              Candidate profiles are visible to registered employers only.
              Sign in, or register your organization free — your first job
              listing is on us.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link href="/login" className="rounded-full bg-brand px-6 py-2.5 font-semibold text-white transition hover:bg-brand-dark">
                Employer sign in
              </Link>
              <Link href="/employer/register" className="rounded-full px-6 py-2.5 font-semibold text-brand-dark ring-1 ring-brand/40 transition hover:bg-brand-tint">
                Register free
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const params = await searchParams;
  const f = parseFilters((k) => params[k]);
  const [{ results: profiles, total, job }, categories, myJobs] = await Promise.all([
    searchCandidates(employer.company.id, f),
    candidateCategories(),
    prisma.job.findMany({
      where: { companyId: employer.company.id, status: { in: ["PUBLISHED", "DRAFT"] } },
      select: { id: true, title: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);
  const hasFilters = !!(f.q || f.category || f.state || f.type || f.mode || f.relocate || f.resume || f.job);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1 px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-bold tracking-[0.14em] text-brand-dark uppercase">
            For employers
          </p>
          <h1 className="mt-1 font-heading text-3xl font-medium tracking-tight text-ink">
            Candidates open to being found
          </h1>
          <p className="mt-2 max-w-2xl text-muted">
            Every profile here opted in to employer discovery. Post a job to
            reach them all — applicants arrive already scored for mission fit.
          </p>

          <form action="/search-candidates" className="mt-8 space-y-3">
            <div className="flex flex-col gap-2 rounded-2xl bg-white p-2 shadow-sm ring-1 ring-black/5 sm:flex-row sm:rounded-full">
              <input
                type="text"
                name="q"
                defaultValue={f.q}
                placeholder="Role, skill, or keyword — e.g. theology teacher"
                className="min-w-0 flex-1 rounded-full bg-transparent px-5 py-3 text-ink placeholder:text-muted focus:outline-none"
              />
              <button type="submit" className="rounded-full bg-brand px-7 py-3 font-semibold text-white transition hover:bg-brand-dark">
                Search
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <select name="category" defaultValue={f.category} className={selectCls}>
                <option value="">All categories</option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <select name="state" defaultValue={f.state} className={selectCls}>
                <option value="">Any state</option>
                {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <select name="type" defaultValue={f.type} className={selectCls}>
                <option value="">Any job type</option>
                {Object.entries(TYPE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
              <select name="mode" defaultValue={f.mode} className={selectCls}>
                <option value="">Any work setting</option>
                {Object.entries(MODE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
              <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-ink">
                <input type="checkbox" name="relocate" value="1" defaultChecked={f.relocate} className="accent-brand" />
                Open to relocating
              </label>
              <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-ink">
                <input type="checkbox" name="resume" value="1" defaultChecked={f.resume} className="accent-brand" />
                Resume on file
              </label>
            </div>
            {myJobs.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-muted">Match to one of your jobs:</span>
                <select name="job" defaultValue={job?.id ?? ""} className={selectCls}>
                  <option value="">Don&apos;t rank by fit</option>
                  {myJobs.map((j) => <option key={j.id} value={j.id}>{j.title}</option>)}
                </select>
                <button type="submit" className="rounded-xl border border-brand px-4 py-2.5 text-sm font-semibold text-brand-dark transition hover:bg-brand hover:text-white">
                  Apply filters
                </button>
                {hasFilters && (
                  <Link href="/search-candidates" className="px-2 text-sm font-semibold text-muted hover:text-ink">
                    Clear
                  </Link>
                )}
              </div>
            )}
          </form>

          <p className="mt-8 text-sm text-muted">
            {total} {total === 1 ? "candidate" : "candidates"}
            {job && <> · ranked by fit for <b className="text-ink">{job.title}</b></>}
            {total > profiles.length && ` · showing the first ${profiles.length}`}
          </p>

          <div className="mt-4 grid gap-5 md:grid-cols-2">
            {profiles.map((p) => (
              <div key={p.id} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-heading text-lg font-medium text-ink">{p.name}</p>
                    {p.headline && <p className="text-sm font-medium text-brand-dark">{p.headline}</p>}
                    <p className="mt-1 text-xs text-muted">
                      {[p.city, p.state].filter(Boolean).join(", ") || "Location flexible"}
                      {p.relocate && " · open to relocating"}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1.5">
                  {p.fit && <FitPill fit={p.fit} />}
                  {p.hasResume && (
                    <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                      Resume on file
                    </span>
                  )}
                  </div>
                </div>
                {p.desiredTitles.length > 0 && (
                  <p className="mt-3 text-sm text-muted">
                    Looking for: <span className="font-medium text-ink/80">{p.desiredTitles.join(", ")}</span>
                  </p>
                )}
                {p.categories.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.categories.map((c) => (
                      <span key={c} className="rounded-full bg-brand-tint px-2.5 py-1 text-xs font-medium text-brand-dark">
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          {profiles.length === 0 && (
            <p className="mt-12 text-center text-muted">
              {hasFilters ? "No candidates match those filters." : "No searchable profiles yet."}
            </p>
          )}

          <div className="mt-10 rounded-2xl bg-ink p-8 text-center text-white">
            <p className="font-heading text-xl font-medium">
              Want to reach them? Post a job — the first one is free.
            </p>
            <Link href="/employer/post" className="mt-4 inline-block rounded-full bg-brand px-8 py-3 font-semibold text-white transition hover:bg-brand-dark">
              Post a job
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
