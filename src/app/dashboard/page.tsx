import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FitPill from "@/components/FitPill";
import { prisma } from "@/lib/prisma";
import { scoreJobFit } from "@/lib/fitScore";
import { TYPE_LABELS, MODE_LABELS, timeAgo } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "My Dashboard — Jobs For Catholics",
  robots: { index: false, follow: false },
};

const APP_STATUS: Record<string, { label: string; cls: string }> = {
  SUBMITTED: { label: "Submitted", cls: "bg-sky-50 text-sky-700" },
  REVIEWING: { label: "In review", cls: "bg-amber-50 text-amber-700" },
  INTERVIEWING: { label: "Interviewing", cls: "bg-violet-50 text-violet-700" },
  OFFERED: { label: "Offer!", cls: "bg-emerald-50 text-emerald-700" },
  HIRED: { label: "Hired 🎉", cls: "bg-emerald-100 text-emerald-800" },
  REJECTED: { label: "Not selected", cls: "bg-slate-100 text-slate-500" },
  WITHDRAWN: { label: "Withdrawn", cls: "bg-slate-100 text-slate-400" },
};

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const candidateId = cookieStore.get("jfc_candidate")?.value;
  const profile = candidateId
    ? await prisma.candidateProfile.findUnique({
        where: { id: candidateId },
        include: { user: true },
      })
    : null;

  if (!profile) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50">
        <Header />
        <main className="flex flex-1 items-center justify-center px-4 py-20">
          <div className="max-w-md rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-black/5">
            <h1 className="font-heading text-2xl font-medium text-ink">
              Your dashboard is waiting
            </h1>
            <p className="mt-3 text-muted">
              Sign in or create a candidate profile to track applications, see
              AI-matched openings, and manage your resume.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link
                href="/login"
                className="rounded-full bg-brand px-6 py-2.5 font-semibold text-white transition hover:bg-brand-dark"
              >
                Sign in
              </Link>
              <Link
                href="/registerseeker"
                className="rounded-full px-6 py-2.5 font-semibold text-brand-dark ring-1 ring-brand/40 transition hover:bg-brand-tint"
              >
                Create profile
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const [applications, jobs, tailoredCount] = await Promise.all([
    prisma.application.findMany({
      where: { OR: [{ userId: profile.userId }, { email: profile.user.email }] },
      include: { job: { include: { company: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.job.findMany({
      where: { status: "PUBLISHED" },
      include: { company: true },
      orderBy: { postedAt: "desc" },
      take: 100,
    }),
    prisma.resumeDoc.count({ where: { profileId: profile.id } }),
  ]);

  const appliedJobIds = new Set(applications.map((a) => a.jobId));
  const recommended = jobs
    .filter((j) => !appliedJobIds.has(j.id))
    .map((j) => ({ job: j, fit: scoreJobFit(profile, j) }))
    .sort((a, b) => b.fit.score - a.fit.score)
    .slice(0, 6);

  const completeness = [
    profile.headline,
    profile.city,
    profile.desiredTitles.length > 0,
    profile.categories.length > 0,
    profile.bio,
    profile.resumeData,
    profile.linkedin,
    profile.phone,
  ].filter(Boolean).length;
  const pct = Math.round((completeness / 8) * 100);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1 px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold tracking-[0.14em] text-brand-dark uppercase">
            My Dashboard
          </p>
          <h1 className="mt-1 font-heading text-3xl font-medium tracking-tight text-ink">
            Welcome back, {profile.user.name.split(" ")[0]}
          </h1>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading text-xl font-medium text-ink">
                    Matched for you
                  </h2>
                  <Link href="/search" className="text-sm font-semibold text-brand-dark hover:underline">
                    All openings →
                  </Link>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {recommended.map(({ job, fit }) => (
                    <Link
                      key={job.id}
                      href={`/jobs/${job.slug}`}
                      className="group rounded-xl p-4 ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md hover:ring-brand/30"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-semibold text-ink group-hover:text-brand-dark">
                          {job.title}
                        </p>
                        <FitPill fit={fit} />
                      </div>
                      <p className="mt-1 text-sm text-muted">{job.company.name}</p>
                      <p className="mt-2 text-xs text-muted">
                        {[job.location, TYPE_LABELS[job.type], MODE_LABELS[job.workMode]]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    </Link>
                  ))}
                  {recommended.length === 0 && (
                    <p className="text-sm text-muted">
                      No open roles right now — check back soon.
                    </p>
                  )}
                </div>
              </section>

              <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                <h2 className="font-heading text-xl font-medium text-ink">
                  My applications
                </h2>
                {applications.length === 0 ? (
                  <p className="mt-3 text-sm text-muted">
                    Nothing yet — your matched openings above are a great place to start.
                  </p>
                ) : (
                  <ul className="mt-4 divide-y divide-black/5">
                    {applications.map((a) => (
                      <li key={a.id} className="flex flex-wrap items-center gap-3 py-3">
                        <div className="min-w-0 flex-1">
                          <Link
                            href={`/jobs/${a.job.slug}`}
                            className="font-semibold text-ink hover:text-brand-dark"
                          >
                            {a.job.title}
                          </Link>
                          <p className="text-sm text-muted">
                            {a.job.company.name} · applied {timeAgo(a.createdAt)}
                          </p>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${APP_STATUS[a.status]?.cls ?? ""}`}
                        >
                          {APP_STATUS[a.status]?.label ?? a.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </div>

            <aside className="space-y-6">
              <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                <h2 className="font-heading text-lg font-medium text-ink">
                  Profile strength
                </h2>
                <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand to-brand-dark"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="mt-2 text-sm font-semibold text-ink">{pct}% complete</p>
                <p className="mt-1 text-xs text-muted">
                  Stronger profiles get better fit scores and rank higher with employers.
                </p>
                <Link
                  href="/registerseeker"
                  className="mt-4 block rounded-full py-2 text-center text-sm font-semibold text-brand-dark ring-1 ring-brand/40 transition hover:bg-brand-tint"
                >
                  Update profile
                </Link>
              </section>

              <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                <h2 className="font-heading text-lg font-medium text-ink">My resumes</h2>
                <p className="mt-2 text-sm text-muted">
                  {profile.resumeData
                    ? tailoredCount > 0
                      ? `Master resume saved, plus ${tailoredCount} tailored version${tailoredCount > 1 ? "s" : ""} — each one keeps the job it was written for.`
                      : "Master resume saved. Open any job and tailor it in one click."
                    : "Build a polished resume in five guided steps — Claude does the writing."}
                </p>
                <Link
                  href={profile.resumeData ? "/resumes" : "/resume"}
                  className="btn-shimmer mt-4 block rounded-full bg-gradient-to-r from-brand to-brand-dark py-2.5 text-center text-sm font-semibold text-white shadow-md shadow-brand/30 transition hover:-translate-y-0.5"
                >
                  {profile.resumeData ? "Open my collection" : "✦ Build my resume"}
                </Link>
              </section>

              <section className="rounded-2xl bg-ink p-6 text-white shadow-sm">
                <h2 className="font-heading text-lg font-medium">Job alerts</h2>
                <p className="mt-2 text-sm text-white/70">
                  You&apos;re set to <b className="text-white">{profile.alertFrequency.toLowerCase()}</b>{" "}
                  alerts for new matches in your categories.
                </p>
              </section>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
