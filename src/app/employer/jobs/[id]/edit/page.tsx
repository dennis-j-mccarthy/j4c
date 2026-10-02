import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JobEditForm from "@/components/JobEditForm";
import EmployerJobActions from "@/components/EmployerJobActions";
import { getOwnedJob } from "@/lib/employer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Edit Posting — Jobs For Catholics",
  robots: { index: false, follow: false },
};

export default async function EditJobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { employer, job } = await getOwnedJob(id);
  if (!employer) redirect("/employer/dashboard");
  if (!job) notFound();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1 px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <Link href="/employer/dashboard" className="text-sm font-semibold text-brand-dark hover:underline">
            ← Employer dashboard
          </Link>
          <p className="mt-6 text-xs font-bold tracking-[0.14em] text-brand-dark uppercase">
            Edit posting · {employer.company.name}
          </p>
          <h1 className="mt-1 font-heading text-3xl font-medium tracking-tight text-ink">{job.title}</h1>
          <div className="mt-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <p className="mb-3 text-sm text-muted">
              Status:{" "}
              <b className="text-ink">
                {job.status === "PUBLISHED" ? "Live" : job.status === "FILLED" ? "Filled" : "Closed"}
              </b>
              {job.status !== "PUBLISHED" && " — not visible to candidates"}
            </p>
            <EmployerJobActions id={job.id} status={job.status} featured={job.featured} />
          </div>
          <div className="mt-8">
            <JobEditForm
              job={{
                id: job.id,
                slug: job.slug,
                title: job.title,
                description: job.description,
                location: job.location,
                category: job.category,
                type: job.type,
                workMode: job.workMode,
                salaryMin: job.salaryMin,
                salaryMax: job.salaryMax,
                status: job.status,
              }}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
