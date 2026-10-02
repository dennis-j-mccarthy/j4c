import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FitPill from "@/components/FitPill";
import ApplicantControls from "@/components/ApplicantControls";
import { prisma } from "@/lib/prisma";
import { timeAgo } from "@/lib/format";
import { scoreJobFit, type FitResult } from "@/lib/fitScore";
import { getEmployer } from "@/lib/employer";
import { PIPELINE } from "@/lib/pipeline";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Applicants — Jobs For Catholics",
  robots: { index: false },
};

const selectCls =
  "rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-ink focus:border-brand focus:outline-none";

export default async function ApplicantsPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const fitFilter = typeof sp.fit === "string" ? sp.fit : "";
  const stage = typeof sp.stage === "string" ? sp.stage : "";

  const job = await prisma.job.findUnique({
    where: { slug },
    include: {
      company: true,
      applications: { orderBy: { createdAt: "desc" } },
    },
  });
  if (!job) notFound();

  const employer = await getEmployer();
  if (!employer || employer.company.id !== job.companyId) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50">
        <Header />
        <main className="flex flex-1 items-center justify-center px-4 py-20">
          <div className="max-w-md rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-black/5">
            <h1 className="font-heading text-2xl font-medium text-ink">
              Applicants are private
            </h1>
            <p className="mt-3 text-muted">
              Only the hiring team at {job.company.name} can see who applied to
              this job. Sign in with your employer email to continue.
            </p>
            <Link
              href="/login"
              className="mt-6 inline-block rounded-full bg-brand px-7 py-2.5 font-semibold text-white transition hover:bg-brand-dark"
            >
              Employer sign in
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // match applicants to candidate profiles by email
  const emails = job.applications.map((a) => a.email);
  const users = await prisma.user.findMany({
    where: { email: { in: emails } },
    include: { profile: true },
  });
  const profileByEmail = new Map(
    users.filter((u) => u.profile).map((u) => [u.email, u.profile!]),
  );

  const scored: {
    app: (typeof job.applications)[number];
    fit: FitResult | null;
  }[] = job.applications.map((app) => {
    const profile = profileByEmail.get(app.email);
    return { app, fit: profile ? scoreJobFit(profile, job) : null };
  });

  const stageCounts: Record<string, number> = {};
  for (const { app } of scored) stageCounts[app.status] = (stageCounts[app.status] ?? 0) + 1;

  const shown = scored
    .filter(({ app }) => !stage || app.status === stage)
    .filter(({ fit }) =>
      fitFilter === "great" || fitFilter === "possible"
        ? fit &&
          (fit.verdict === "great" ||
            (fitFilter === "possible" && fit.verdict === "possible"))
        : true,
    );

  const tabHref = (s: string) => {
    const q = new URLSearchParams();
    if (s) q.set("stage", s);
    if (fitFilter) q.set("fit", fitFilter);
    const qs = q.toString();
    return `/jobs/${job.slug}/applicants${qs ? `?${qs}` : ""}`;
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />

      <main className="flex-1 px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/employer/dashboard"
            className="text-sm font-semibold text-brand-dark hover:underline"
          >
            ← Employer dashboard
          </Link>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] text-brand-dark uppercase">
                Employer view · {job.company.name}
              </p>
              <h1 className="mt-2 font-heading text-3xl font-medium tracking-tight text-ink">
                Applicants — {job.title}
              </h1>
            </div>
            <form action={`/jobs/${job.slug}/applicants`}>
              {stage && <input type="hidden" name="stage" value={stage} />}
              <select name="fit" defaultValue={fitFilter} className={selectCls}>
                <option value="">All fit levels</option>
                <option value="great">Great fit only</option>
                <option value="possible">Possible fit & up</option>
              </select>
              <button
                type="submit"
                className="ml-2 rounded-xl border border-brand px-4 py-2.5 text-sm font-semibold text-brand-dark transition hover:bg-brand hover:text-white"
              >
                Filter
              </button>
            </form>
          </div>

          <nav className="mt-8 flex flex-wrap gap-2" aria-label="Pipeline stages">
            <Link
              href={tabHref("")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                !stage ? "bg-ink text-white" : "bg-white text-muted ring-1 ring-slate-200 hover:text-ink"
              }`}
            >
              All <span className="opacity-60">{scored.length}</span>
            </Link>
            {PIPELINE.filter((p) => p.value !== "WITHDRAWN" || stageCounts.WITHDRAWN).map((p) => (
              <Link
                key={p.value}
                href={tabHref(p.value)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  stage === p.value ? "bg-ink text-white" : "bg-white text-muted ring-1 ring-slate-200 hover:text-ink"
                }`}
              >
                {p.label} <span className="opacity-60">{stageCounts[p.value] ?? 0}</span>
              </Link>
            ))}
          </nav>

          <p className="mt-6 text-sm font-medium text-muted">
            {shown.length} of {job.applications.length}{" "}
            {job.applications.length === 1 ? "applicant" : "applicants"} shown
          </p>

          {shown.length === 0 ? (
            <div className="mt-6 rounded-2xl bg-white p-12 text-center ring-1 ring-black/5">
              <p className="font-heading text-xl font-medium text-ink">
                No applicants {stage || fitFilter ? "match this view" : "yet"}.
              </p>
            </div>
          ) : (
            <ul className="mt-4 space-y-5">
              {shown.map(({ app, fit }) => (
                <li
                  key={app.id}
                  className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-heading text-lg font-medium text-ink">
                        {app.name}
                      </p>
                      <p className="text-sm text-muted">
                        {app.email}
                        {app.phone && ` · ${app.phone}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {fit ? (
                        <FitPill fit={fit} />
                      ) : (
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-muted ring-1 ring-slate-200">
                          No profile
                        </span>
                      )}
                      <span className="text-xs text-muted">
                        {timeAgo(app.createdAt)}
                      </span>
                    </div>
                  </div>
                  {fit && fit.reasons.length > 0 && (
                    <p className="mt-2 text-sm text-muted">
                      {fit.reasons.join(" · ")}
                    </p>
                  )}
                  {app.coverLetter && (
                    <p className="mt-3 rounded-xl bg-slate-50 p-4 text-sm leading-relaxed whitespace-pre-line text-ink/80">
                      {app.coverLetter}
                    </p>
                  )}
                  {app.resumeUrl && (
                    <a
                      href={app.resumeUrl}
                      className="mt-3 inline-block text-sm font-semibold text-brand-dark hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Resume / LinkedIn →
                    </a>
                  )}
                  <ApplicantControls id={app.id} status={app.status} notes={app.notes} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
