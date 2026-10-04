import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EmployerJobActions from "@/components/EmployerJobActions";
import { prisma } from "@/lib/prisma";
import { getEmployer } from "@/lib/employer";
import { getPlan } from "@/lib/plans";
import { PIPELINE, ACTIVE_STAGES } from "@/lib/pipeline";
import { TYPE_LABELS, MODE_LABELS, timeAgo } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Employer Dashboard — Jobs For Catholics",
  robots: { index: false, follow: false },
};

const JOB_STATUS: Record<string, { label: string; cls: string }> = {
  PUBLISHED: { label: "Live", cls: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
  FILLED: { label: "Filled", cls: "bg-violet-50 text-violet-700 ring-violet-200" },
  CLOSED: { label: "Closed", cls: "bg-slate-100 text-slate-500 ring-slate-200" },
  DRAFT: { label: "Draft", cls: "bg-amber-50 text-amber-700 ring-amber-200" },
};

export default async function EmployerDashboardPage() {
  const employer = await getEmployer();

  if (!employer) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50">
        <Header />
        <main className="flex flex-1 items-center justify-center px-4 py-20">
          <div className="max-w-md rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-black/5">
            <h1 className="font-heading text-2xl font-medium text-ink">Employer dashboard</h1>
            <p className="mt-3 text-muted">
              Sign in with your employer email to manage your postings and
              applicants — or set up your organization in two minutes.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link href="/login" className="rounded-full bg-brand px-6 py-2.5 font-semibold text-white transition hover:bg-brand-dark">
                Sign in
              </Link>
              <Link href="/employer/register" className="rounded-full px-6 py-2.5 font-semibold text-brand-dark ring-1 ring-brand/40 transition hover:bg-brand-tint">
                Register your organization
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const jobs = await prisma.job.findMany({
    where: { companyId: employer.company.id },
    include: { applications: { select: { status: true } } },
    orderBy: [{ status: "asc" }, { postedAt: "desc" }],
  });

  const live = jobs.filter((j) => j.status === "PUBLISHED");
  const allApps = jobs.flatMap((j) => j.applications);
  const newApps = allApps.filter((a) => a.status === "SUBMITTED").length;
  const interviewing = allApps.filter((a) => a.status === "INTERVIEWING").length;
  const activeApps = allApps.filter((a) => ACTIVE_STAGES.includes(a.status)).length;

  const stats = [
    { value: live.length, label: "Live postings" },
    { value: activeApps, label: "Active applicants" },
    { value: newApps, label: "New — not yet reviewed" },
    { value: interviewing, label: "Interviewing" },
  ];

  const company = employer.company;
  const plan = getPlan(company.plan);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1 px-4 py-10">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-[0.14em] text-brand-dark uppercase">
                Employer Dashboard
              </p>
              <h1 className="mt-1 font-heading text-3xl font-medium tracking-tight text-ink">
                {employer.company.name}
              </h1>
              <p className="mt-1 text-sm text-muted">
                Signed in as {employer.user.name} · {employer.user.email}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <form action="/api/auth/logout" method="post">
                <button className="rounded-full px-5 py-2.5 text-sm font-semibold text-muted ring-1 ring-slate-200 transition hover:text-ink">
                  Sign out
                </button>
              </form>
              <Link
                href="/employer/post"
                className="btn-shimmer rounded-full bg-gradient-to-r from-brand to-brand-dark px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/30 transition hover:-translate-y-0.5"
              >
                + Post a job
              </Link>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
                <p className="font-heading text-3xl font-medium text-ink">{s.value}</p>
                <p className="mt-1 text-xs font-semibold tracking-wide text-muted uppercase">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <div>
              <p className="text-xs font-semibold tracking-wide text-muted uppercase">Your plan</p>
              <p className="mt-1 font-heading text-xl font-medium text-ink">
                {plan && company.planStatus !== "canceled" ? plan.name : "Pay as you go"}
                {company.planStatus && company.planStatus !== "active" && company.planStatus !== "canceled" && (
                  <span className="ml-2 rounded-full bg-amber-100 px-2.5 py-0.5 align-middle text-xs font-semibold text-amber-800">
                    {company.planStatus.replace("_", " ")}
                  </span>
                )}
              </p>
              <p className="mt-1 text-sm text-muted">
                {plan?.featuredSlots ? `${plan.featuredSlots} featured listings live at once` : "First listing free"}
                {company.planRenewsAt && ` · renews ${company.planRenewsAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`}
                {` · ${company.listingCredits} listing and ${company.featuredCredits} featured credits`}
              </p>
            </div>
            <Link href="/pricing" className="rounded-full px-5 py-2.5 text-sm font-semibold text-brand-dark ring-1 ring-brand/40 transition hover:bg-brand-tint">
              {plan ? "See plans" : "Upgrade"}
            </Link>
          </div>

          <h2 className="mt-12 font-heading text-2xl font-medium text-ink">Your postings</h2>

          {jobs.length === 0 ? (
            <div className="mt-5 rounded-2xl bg-white p-12 text-center shadow-sm ring-1 ring-black/5">
              <p className="font-heading text-xl font-medium text-ink">No postings yet.</p>
              <p className="mt-2 text-muted">Your first listing is free — the AI writes the description for you.</p>
              <Link href="/employer/post" className="mt-5 inline-block rounded-full bg-brand px-7 py-2.5 font-semibold text-white transition hover:bg-brand-dark">
                Post your first job
              </Link>
            </div>
          ) : (
            <ul className="mt-5 space-y-5">
              {jobs.map((job) => {
                const counts: Record<string, number> = {};
                for (const a of job.applications) counts[a.status] = (counts[a.status] ?? 0) + 1;
                const st = JOB_STATUS[job.status] ?? JOB_STATUS.DRAFT;
                return (
                  <li key={job.id} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <Link
                            href={job.status === "PUBLISHED" ? `/jobs/${job.slug}` : `/employer/jobs/${job.id}/edit`}
                            className="font-heading text-xl font-medium text-ink hover:text-brand-dark"
                          >
                            {job.title}
                          </Link>
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ring-1 ${st.cls}`}>{st.label}</span>
                          {job.featured && job.status === "PUBLISHED" && (
                            <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-bold text-accent">★ Featured</span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-muted">
                          {[job.location, TYPE_LABELS[job.type], MODE_LABELS[job.workMode]].filter(Boolean).join(" · ")}
                          {job.postedAt && ` · posted ${timeAgo(job.postedAt)}`}
                        </p>
                      </div>
                      <Link
                        href={`/jobs/${job.slug}/applicants`}
                        className="shrink-0 rounded-full bg-ink px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
                      >
                        Applicants ({job.applications.length})
                      </Link>
                    </div>

                    {job.applications.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {PIPELINE.filter((p) => counts[p.value]).map((p) => (
                          <Link
                            key={p.value}
                            href={`/jobs/${job.slug}/applicants?stage=${p.value}`}
                            className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${p.cls}`}
                          >
                            {p.label} · {counts[p.value]}
                          </Link>
                        ))}
                      </div>
                    )}

                    <div className="mt-5 border-t border-black/5 pt-4">
                      <EmployerJobActions id={job.id} status={job.status} featured={job.featured} />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="mt-12 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 p-6 ring-1 ring-accent/30">
            <p className="font-heading text-lg font-medium text-ink">★ Featured jobs get seen first</p>
            <p className="mt-1 text-sm text-muted">
              Featured postings sort to the top of search and appear on the
              home page. Use &ldquo;Feature this job&rdquo; on any live posting
              — billing for featured placement activates when online payments
              launch.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
