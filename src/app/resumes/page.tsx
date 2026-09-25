import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "My Resumes — Jobs For Catholics",
  robots: { index: false, follow: false },
};

export default async function ResumesPage() {
  const cookieStore = await cookies();
  const candidateId = cookieStore.get("jfc_candidate")?.value;
  const profile = candidateId
    ? await prisma.candidateProfile.findUnique({
        where: { id: candidateId },
        include: { resumeDocs: { orderBy: { createdAt: "desc" } } },
      })
    : null;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1 px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-bold tracking-[0.14em] text-brand-dark uppercase">
            My Resumes
          </p>
          <h1 className="mt-1 font-heading text-3xl font-medium tracking-tight text-ink">
            One master. A tailored version for every job.
          </h1>
          <p className="mt-2 max-w-2xl text-muted">
            Each tailored resume keeps the job title it was written for — even
            after the posting comes down.
          </p>

          {!profile ? (
            <div className="mt-10 rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-black/5">
              <p className="text-muted">Sign in to see your resume collection.</p>
              <Link
                href="/login"
                className="mt-4 inline-block rounded-full bg-brand px-6 py-2.5 font-semibold text-white transition hover:bg-brand-dark"
              >
                Sign in
              </Link>
            </div>
          ) : (
            <div className="mt-8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-ink p-6 text-white shadow-sm">
                <div>
                  <p className="font-heading text-lg font-medium">Master resume</p>
                  <p className="mt-1 text-sm text-white/70">
                    {profile.resumeData
                      ? "Saved — the source every tailored version is built from."
                      : "Not built yet — tailoring needs this first."}
                  </p>
                </div>
                <Link
                  href="/resume"
                  className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-ink transition hover:bg-brand-tint"
                >
                  {profile.resumeData ? "Open builder" : "✦ Build it"}
                </Link>
              </div>

              {profile.resumeDocs.length === 0 ? (
                <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-black/5">
                  <p className="text-muted">
                    No tailored resumes yet. Open any{" "}
                    <Link href="/search" className="font-semibold text-brand-dark hover:underline">
                      job posting
                    </Link>{" "}
                    and click <b>“Tailor my resume to this job.”</b>
                  </p>
                </div>
              ) : (
                profile.resumeDocs.map((doc) => (
                  <Link
                    key={doc.id}
                    href={`/resumes/${doc.id}`}
                    className="group flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md hover:ring-brand/30"
                  >
                    <div>
                      <p className="font-heading text-lg font-medium text-ink group-hover:text-brand-dark">
                        {doc.jobTitle}
                      </p>
                      <p className="mt-0.5 text-sm text-muted">
                        {doc.companyName ?? "—"} ·{" "}
                        {doc.createdAt.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                        {doc.coverLetter && " · resume + cover letter"}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-brand-dark">
                      Open →
                    </span>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
