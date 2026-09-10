import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { prisma } from "@/lib/prisma";
import { TYPE_LABELS, MODE_LABELS, formatSalary, timeAgo } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Schools — Jobs For Catholics",
  description:
    "The Catholic school hiring network: teachers, administrators, and staff who share your school's mission.",
};

const SCHOOL_CATEGORIES = ["Education", "Higher Ed"];

export default async function SchoolPage() {
  const jobs = await prisma.job.findMany({
    where: { status: "PUBLISHED", category: { in: SCHOOL_CATEGORIES } },
    include: { company: true },
    orderBy: [{ featured: "desc" }, { postedAt: "desc" }],
  });

  const employers = Array.from(
    new Map(jobs.map((j) => [j.company.id, j.company])).values(),
  );

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* schools identity header */}
      <div className="bg-ink px-4 py-1.5 text-sm text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <p className="hidden font-heading font-medium tracking-wide italic sm:block">
            The Catholic school hiring network
          </p>
          <Link href="/" className="ml-auto font-semibold text-white/80 hover:text-white">
            ← JobsForCatholics.com
          </Link>
        </div>
      </div>
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3">
          <Link href="/school" className="flex items-center gap-3">
            <Image
              src="/brand/logomail.png"
              alt="JobsForCatholics.com"
              width={332}
              height={133}
              className="h-12 w-auto"
              priority
            />
            <span className="rounded-lg bg-accent px-2.5 py-1 font-heading text-sm font-medium tracking-wide text-white uppercase">
              Schools
            </span>
          </Link>
          <nav className="hidden items-center gap-1 text-[13px] font-semibold tracking-[0.12em] text-ink uppercase lg:flex">
            <a href="#openings" className="rounded-full px-4 py-2 transition-colors hover:bg-brand-tint hover:text-brand-dark">
              Openings
            </a>
            <a href="#schools" className="rounded-full px-4 py-2 transition-colors hover:bg-brand-tint hover:text-brand-dark">
              Schools
            </a>
            <Link href="/registerseeker" className="rounded-full px-4 py-2 transition-colors hover:bg-brand-tint hover:text-brand-dark">
              For Educators
            </Link>
          </nav>
          <Link
            href="/employer/register"
            className="rounded-full bg-accent px-5 py-2.5 font-semibold text-white shadow-md shadow-accent/30 transition hover:-translate-y-0.5 hover:brightness-95"
          >
            Post a School Job
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* hero */}
        <section className="relative overflow-hidden">
          <Image
            src="/brand/hero-church-windows.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/70 to-accent/40" />
          <div className="relative mx-auto max-w-3xl px-4 py-24 text-center text-white">
            <p className="text-xs font-semibold tracking-[0.3em] text-accent uppercase">
              Catholic Schools · K-12 & Higher Ed
            </p>
            <h1 className="mt-4 font-heading text-4xl font-medium tracking-tight sm:text-5xl">
              Teachers who teach the faith by living it.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/90">
              Every educator here chose a Catholic school on purpose. Staff
              your classrooms with people who share the mission — not just the
              certification.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="#openings"
                className="rounded-full bg-accent px-8 py-3.5 font-semibold text-white shadow-lg shadow-accent/40 transition hover:-translate-y-0.5 hover:brightness-95"
              >
                Browse School Jobs
              </a>
              <Link
                href="/employer/register"
                className="rounded-full border border-white px-8 py-3.5 font-semibold text-white transition hover:bg-white hover:text-ink"
              >
                Hire for Your School
              </Link>
            </div>
          </div>
        </section>

        {/* school employers */}
        <section id="schools" className="border-b border-black/5 bg-white py-12">
          <div className="mx-auto max-w-7xl px-4">
            <p className="text-center text-xs font-semibold tracking-[0.25em] text-muted uppercase">
              Hiring now on the schools network
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              {employers.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-3 rounded-full border border-black/5 bg-white py-2 pr-6 pl-2.5 shadow-sm"
                >
                  {c.logoUrl && (
                    <Image
                      src={c.logoUrl}
                      alt={`${c.name} logo`}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-contain"
                    />
                  )}
                  <div>
                    <p className="font-medium text-ink">{c.name}</p>
                    {c.location && (
                      <p className="text-xs text-muted">{c.location}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* openings */}
        <section id="openings" className="bg-slate-50 py-16">
          <div className="mx-auto max-w-5xl px-4">
            <Reveal className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.3em] text-accent uppercase">
                  Now hiring
                </p>
                <h2 className="mt-2 font-heading text-3xl font-medium tracking-tight text-ink">
                  School openings
                </h2>
              </div>
              <Link
                href="/search?category=Education"
                className="group inline-flex items-center gap-2 font-semibold text-brand-dark"
              >
                Search all jobs
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </Reveal>

            <ul className="mt-6 space-y-3">
              {jobs.map((job) => {
                const salary = formatSalary(job.salaryMin, job.salaryMax);
                return (
                  <li key={job.id}>
                    <Link
                      href={`/jobs/${job.slug}`}
                      className="group flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:ring-accent/50 sm:flex-row sm:items-center"
                    >
                      {job.company.logoUrl && (
                        <Image
                          src={job.company.logoUrl}
                          alt={`${job.company.name} logo`}
                          width={56}
                          height={56}
                          className="h-14 w-14 shrink-0 rounded-xl object-contain ring-1 ring-black/5"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-heading text-lg font-medium text-ink group-hover:text-brand-dark">
                            {job.title}
                          </h3>
                          {job.featured && (
                            <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-bold text-accent">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-sm font-medium text-muted">
                          {job.company.name}
                        </p>
                        <p className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted">
                          {job.location && <span>{job.location}</span>}
                          <span>{TYPE_LABELS[job.type]}</span>
                          <span>{MODE_LABELS[job.workMode]}</span>
                        </p>
                      </div>
                      <div className="shrink-0 text-left sm:text-right">
                        {salary && <p className="font-semibold text-ink">{salary}</p>}
                        {job.postedAt && (
                          <p className="mt-0.5 text-xs text-muted">
                            {timeAgo(job.postedAt)}
                          </p>
                        )}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-ink to-brand-dark px-4 py-16 text-center text-white">
          <h2 className="font-heading text-3xl font-medium tracking-tight">
            Your school's mission deserves mission-fit hires.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">
            Join the schools already hiring on the network. Post in minutes,
            reach educators who chose Catholic education on purpose.
          </p>
          <Link
            href="/employer/register"
            className="mt-7 inline-block rounded-full bg-accent px-8 py-3.5 font-semibold text-white shadow-lg shadow-accent/40 transition hover:-translate-y-0.5 hover:brightness-95"
          >
            Get Your School Started
          </Link>
        </section>
      </main>

      <footer className="bg-ink px-4 py-6 text-sm text-white/70">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 sm:flex-row">
          <p>
            © {new Date().getFullYear()} JobsForCatholics.com · Schools Network
          </p>
          <Link href="/" className="hover:text-white">
            Main site →
          </Link>
        </div>
      </footer>
    </div>
  );
}
