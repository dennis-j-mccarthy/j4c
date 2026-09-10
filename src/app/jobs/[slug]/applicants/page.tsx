import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FitPill from "@/components/FitPill";
import { prisma } from "@/lib/prisma";
import { timeAgo } from "@/lib/format";
import { scoreJobFit, type FitResult } from "@/lib/fitScore";

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

  const job = await prisma.job.findUnique({
    where: { slug },
    include: {
      company: true,
      applications: { orderBy: { createdAt: "desc" } },
    },
  });
  if (!job) notFound();

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

  const shown =
    fitFilter === "great" || fitFilter === "possible"
      ? scored.filter(
          ({ fit }) =>
            fit &&
            (fit.verdict === "great" ||
              (fitFilter === "possible" && fit.verdict === "possible")),
        )
      : scored;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />

      <main className="flex-1 px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <Link
            href={`/jobs/${job.slug}`}
            className="text-sm font-semibold text-brand-dark hover:underline"
          >
            ← Back to posting
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
              <select
                name="fit"
                defaultValue={fitFilter}
                className={selectCls}
              >
                <option value="">All applicants</option>
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

          <p className="mt-4 text-sm font-medium text-muted">
            {shown.length} of {job.applications.length}{" "}
            {job.applications.length === 1 ? "applicant" : "applicants"} shown
          </p>

          {shown.length === 0 ? (
            <div className="mt-8 rounded-2xl bg-white p-12 text-center ring-1 ring-black/5">
              <p className="font-heading text-xl font-medium text-ink">
                No applicants{fitFilter && " at this fit level"} yet.
              </p>
            </div>
          ) : (
            <ul className="mt-4 space-y-3">
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
                    <p className="mt-3 rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-ink/80">
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
