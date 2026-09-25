import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ResumeSheet, { type ResumeSheetData } from "@/components/ResumeSheet";
import ResumeDocActions, { CopyLetterButton } from "@/components/ResumeDocActions";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tailored Resume — Jobs For Catholics",
  robots: { index: false, follow: false },
};

export default async function ResumeDocPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookieStore = await cookies();
  const candidateId = cookieStore.get("jfc_candidate")?.value;
  if (!candidateId) notFound();

  const doc = await prisma.resumeDoc.findFirst({
    where: { id, profileId: candidateId },
  });
  if (!doc) notFound();

  const resume = doc.data as ResumeSheetData;
  const job = doc.jobSlug
    ? await prisma.job.findUnique({
        where: { slug: doc.jobSlug },
        select: { slug: true, status: true },
      })
    : null;
  const jobLive = job?.status === "PUBLISHED";

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1 px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <Link href="/resumes" className="text-sm font-semibold text-brand-dark hover:underline">
            ← All my resumes
          </Link>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-brand-tint/70 px-6 py-4 ring-1 ring-brand/20">
            <div>
              <p className="text-xs font-bold tracking-[0.12em] text-brand-dark uppercase">
                ✦ Tailored for
              </p>
              <p className="font-heading text-lg font-medium text-ink">
                {doc.jobTitle}
                {doc.companyName && <span className="text-muted"> · {doc.companyName}</span>}
              </p>
              <p className="text-xs text-muted">
                {doc.createdAt.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                {" · "}
                {jobLive && doc.jobSlug ? (
                  <Link href={`/jobs/${doc.jobSlug}`} className="font-semibold text-brand-dark hover:underline">
                    view the posting
                  </Link>
                ) : (
                  "posting no longer live"
                )}
              </p>
            </div>
            <ResumeDocActions id={doc.id} />
          </div>

          <div className="mt-8">
            <ResumeSheet resume={resume} />
          </div>

          {doc.coverLetter && (
            <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-xl font-medium text-ink">
                  Matching cover letter
                </h2>
                <CopyLetterButton letter={doc.coverLetter} />
              </div>
              <p className="mt-4 leading-relaxed whitespace-pre-line text-ink/80">
                {doc.coverLetter}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
