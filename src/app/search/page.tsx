import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FitPill from "@/components/FitPill";
import { prisma } from "@/lib/prisma";
import { TYPE_LABELS, MODE_LABELS, formatSalary, timeAgo } from "@/lib/format";
import { scoreJobFit, type FitResult } from "@/lib/fitScore";
import type { Prisma } from "@/generated/prisma/client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Job Search — Jobs For Catholics",
  description:
    "Search openings at Catholic schools, dioceses, nonprofits, and faith-driven businesses nationwide.",
};

const selectCls =
  "rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-ink focus:border-brand focus:outline-none";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q.trim() : "";
  const loc = typeof params.loc === "string" ? params.loc.trim() : "";
  const category = typeof params.category === "string" ? params.category : "";
  const type = typeof params.type === "string" ? params.type : "";
  const mode = typeof params.mode === "string" ? params.mode : "";
  const fitFilter = typeof params.fit === "string" ? params.fit : "";

  const cookieStore = await cookies();
  const candidateId = cookieStore.get("jfc_candidate")?.value;

  const and: Prisma.JobWhereInput[] = [{ status: "PUBLISHED" }];
  if (q) {
    and.push({
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
        { company: { name: { contains: q, mode: "insensitive" } } },
      ],
    });
  }
  if (loc) and.push({ location: { contains: loc, mode: "insensitive" } });
  if (category) and.push({ category });
  if (type && type in TYPE_LABELS) and.push({ type: type as never });
  if (mode && mode in MODE_LABELS) and.push({ workMode: mode as never });

  const [allJobs, categories, profile] = await Promise.all([
    prisma.job.findMany({
      where: { AND: and },
      include: { company: true },
      orderBy: [{ featured: "desc" }, { postedAt: "desc" }],
      take: 50,
    }),
    prisma.job.findMany({
      where: { status: "PUBLISHED", category: { not: null } },
      select: { category: true },
      distinct: ["category"],
      orderBy: { category: "asc" },
    }),
    candidateId
      ? prisma.candidateProfile.findUnique({ where: { id: candidateId } })
      : Promise.resolve(null),
  ]);

  const scored: { job: (typeof allJobs)[number]; fit: FitResult | null }[] =
    allJobs.map((job) => ({
      job,
      fit: profile ? scoreJobFit(profile, job) : null,
    }));

  const jobs =
    profile && (fitFilter === "great" || fitFilter === "possible")
      ? scored.filter(
          ({ fit }) =>
            fit &&
            (fit.verdict === "great" ||
              (fitFilter === "possible" && fit.verdict === "possible")),
        )
      : scored;

  const hasFilters = !!(q || loc || category || type || mode || fitFilter);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />

      <section className="border-b border-black/5 bg-white px-4 py-10">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold tracking-[0.3em] text-brand-dark uppercase">
            Job Search
          </p>
          <h1 className="mt-2 font-heading text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Find work worthy of your calling.
          </h1>

          <form action="/search" className="mt-6 space-y-3">
            <div className="flex flex-col gap-2 rounded-2xl bg-slate-50 p-2 ring-1 ring-black/5 sm:flex-row sm:rounded-full">
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Job title, keyword, or employer"
                className="min-w-0 flex-1 rounded-full bg-transparent px-5 py-3 text-ink placeholder:text-muted focus:outline-none"
              />
              <div className="hidden w-px self-stretch bg-black/10 sm:block" />
              <input
                type="text"
                name="loc"
                defaultValue={loc}
                placeholder="City, state, or remote"
                className="min-w-0 flex-1 rounded-full bg-transparent px-5 py-3 text-ink placeholder:text-muted focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-brand px-7 py-3 font-semibold text-white transition hover:bg-brand-dark"
              >
                Search
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <select name="category" defaultValue={category} className={selectCls}>
                <option value="">All categories</option>
                {categories.map((c) => (
                  <option key={c.category} value={c.category!}>
                    {c.category}
                  </option>
                ))}
              </select>
              <select name="type" defaultValue={type} className={selectCls}>
                <option value="">All job types</option>
                {Object.entries(TYPE_LABELS).map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </select>
              <select name="mode" defaultValue={mode} className={selectCls}>
                <option value="">Any work setting</option>
                {Object.entries(MODE_LABELS).map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </select>
              {profile && (
                <select name="fit" defaultValue={fitFilter} className={selectCls}>
                  <option value="">Any fit</option>
                  <option value="great">Great fit only</option>
                  <option value="possible">Possible fit & up</option>
                </select>
              )}
              <button
                type="submit"
                className="rounded-xl border border-brand px-4 py-2.5 text-sm font-semibold text-brand-dark transition hover:bg-brand hover:text-white"
              >
                Apply filters
              </button>
              {hasFilters && (
                <Link
                  href="/search"
                  className="px-2 text-sm font-medium text-muted hover:text-ink"
                >
                  Clear all
                </Link>
              )}
            </div>
          </form>
        </div>
      </section>

      <main className="flex-1 px-4 py-10">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-medium text-muted">
              {jobs.length} {jobs.length === 1 ? "opening" : "openings"}
              {hasFilters && " match your search"}
            </p>
            {!profile && (
              <Link
                href="/registerseeker"
                className="text-sm font-semibold text-brand-dark hover:underline"
              >
                Create a free profile to see your fit scores →
              </Link>
            )}
          </div>

          {jobs.length === 0 ? (
            <div className="mt-10 rounded-2xl bg-white p-12 text-center ring-1 ring-black/5">
              <p className="font-heading text-xl font-medium text-ink">
                No openings match — yet.
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted">
                Try widening your search, or{" "}
                <Link href="/registerseeker" className="font-semibold text-brand-dark hover:underline">
                  create a free profile
                </Link>{" "}
                and we&apos;ll email you the moment a match posts.
              </p>
            </div>
          ) : (
            <ul className="mt-4 space-y-3">
              {jobs.map(({ job, fit }) => {
                const salary = formatSalary(job.salaryMin, job.salaryMax);
                return (
                  <li key={job.id}>
                    <Link
                      href={`/jobs/${job.slug}`}
                      className="group flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:ring-brand/40 sm:flex-row sm:items-center"
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
                          <h2 className="font-heading text-lg font-medium text-ink group-hover:text-brand-dark">
                            {job.title}
                          </h2>
                          {job.featured && (
                            <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-bold text-accent">
                              Featured
                            </span>
                          )}
                          {fit && <FitPill fit={fit} />}
                        </div>
                        <p className="mt-0.5 text-sm font-medium text-muted">
                          {job.company.name}
                        </p>
                        <p className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted">
                          {job.location && <span>{job.location}</span>}
                          <span>{TYPE_LABELS[job.type]}</span>
                          <span>{MODE_LABELS[job.workMode]}</span>
                          {job.category && <span>{job.category}</span>}
                        </p>
                      </div>
                      <div className="shrink-0 text-left sm:text-right">
                        {salary && (
                          <p className="font-semibold text-ink">{salary}</p>
                        )}
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
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
