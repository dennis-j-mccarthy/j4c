import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ApplyForm from "@/components/ApplyForm";
import { prisma } from "@/lib/prisma";
import { TYPE_LABELS, MODE_LABELS, formatSalary, timeAgo } from "@/lib/format";

export const dynamic = "force-dynamic";

async function getJob(slug: string) {
  return prisma.job.findUnique({
    where: { slug, status: "PUBLISHED" },
    include: { company: true },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) return { title: "Job Not Found — Jobs For Catholics" };
  return {
    title: `${job.title} at ${job.company.name} — Jobs For Catholics`,
    description: job.description.split("\n")[0].slice(0, 160),
  };
}

export default async function JobPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) notFound();

  const salary = formatSalary(job.salaryMin, job.salaryMax);
  const annual = (job.salaryMin ?? 0) >= 10000;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.postedAt?.toISOString(),
    employmentType: job.type,
    hiringOrganization: {
      "@type": "Organization",
      name: job.company.name,
      sameAs: job.company.website ?? undefined,
    },
    jobLocation: job.location
      ? {
          "@type": "Place",
          address: { "@type": "PostalAddress", addressLocality: job.location },
        }
      : undefined,
    applicantLocationRequirements:
      job.workMode === "REMOTE"
        ? { "@type": "Country", name: "USA" }
        : undefined,
    baseSalary:
      job.salaryMin && annual
        ? {
            "@type": "MonetaryAmount",
            currency: job.currency,
            value: {
              "@type": "QuantitativeValue",
              minValue: job.salaryMin,
              maxValue: job.salaryMax ?? job.salaryMin,
              unitText: "YEAR",
            },
          }
        : undefined,
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <section className="border-b border-black/5 bg-white px-4 py-10">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/search"
            className="text-sm font-semibold text-brand-dark hover:underline"
          >
            ← All openings
          </Link>
          <div className="mt-5 flex flex-wrap items-start gap-5">
            {job.company.logoUrl && (
              <Image
                src={job.company.logoUrl}
                alt={`${job.company.name} logo`}
                width={72}
                height={72}
                className="h-18 w-18 rounded-2xl object-contain ring-1 ring-black/5"
              />
            )}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-heading text-3xl font-medium tracking-tight text-ink">
                  {job.title}
                </h1>
                {job.featured && (
                  <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-bold text-accent">
                    Featured
                  </span>
                )}
              </div>
              <p className="mt-1 font-medium text-muted">{job.company.name}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-sm">
                {[
                  job.location,
                  TYPE_LABELS[job.type],
                  MODE_LABELS[job.workMode],
                  job.category,
                  salary,
                ]
                  .filter(Boolean)
                  .map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full bg-slate-100 px-3.5 py-1.5 font-medium text-ink/80"
                    >
                      {chip}
                    </span>
                  ))}
              </div>
            </div>
            <a
              href="#apply"
              className="rounded-full bg-brand px-8 py-3.5 font-semibold text-white shadow-lg shadow-brand/30 transition hover:-translate-y-0.5 hover:bg-brand-dark"
            >
              Apply Now
            </a>
          </div>
        </div>
      </section>

      <main className="flex-1 px-4 py-10">
        <div className="mx-auto grid max-w-5xl items-start gap-8 lg:grid-cols-3">
          <article className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5 lg:col-span-2">
            <h2 className="font-heading text-xl font-medium text-ink">
              About this role
            </h2>
            <div className="mt-4 leading-relaxed whitespace-pre-line text-ink/80">
              {job.description}
            </div>
            {job.postedAt && (
              <p className="mt-8 text-xs text-muted">
                Posted {timeAgo(job.postedAt)}
              </p>
            )}
          </article>

          <aside className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h2 className="font-heading text-lg font-medium text-ink">
                About {job.company.name}
              </h2>
              {job.company.about && (
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {job.company.about}
                </p>
              )}
              {job.company.location && (
                <p className="mt-3 text-sm font-medium text-ink/70">
                  {job.company.location}
                </p>
              )}
            </div>
            <div id="apply" className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h2 className="font-heading text-lg font-medium text-ink">
                Apply for this job
              </h2>
              <ApplyForm slug={job.slug} jobTitle={job.title} />
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
