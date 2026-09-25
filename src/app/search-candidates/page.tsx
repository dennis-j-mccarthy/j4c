import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Search Candidates — Jobs For Catholics",
  description: "Browse mission-driven candidates open to being discovered by Catholic employers.",
};

export default async function SearchCandidatesPage() {
  const profiles = await prisma.candidateProfile.findMany({
    where: { searchable: true },
    include: { user: true },
    orderBy: { updatedAt: "desc" },
    take: 50,
  });

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1 px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-bold tracking-[0.14em] text-brand-dark uppercase">
            For employers
          </p>
          <h1 className="mt-1 font-heading text-3xl font-medium tracking-tight text-ink">
            Candidates open to being found
          </h1>
          <p className="mt-2 max-w-2xl text-muted">
            Every profile here opted in to employer discovery. Post a job to
            reach them all — applicants arrive already scored for mission fit.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {profiles.map((p) => (
              <div key={p.id} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-heading text-lg font-medium text-ink">{p.user.name}</p>
                    {p.headline && <p className="text-sm font-medium text-brand-dark">{p.headline}</p>}
                    <p className="mt-1 text-xs text-muted">
                      {[p.city, p.state].filter(Boolean).join(", ") || "Location flexible"}
                      {p.relocate && " · open to relocating"}
                    </p>
                  </div>
                  {p.resumeData != null && (
                    <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                      Resume on file
                    </span>
                  )}
                </div>
                {p.desiredTitles.length > 0 && (
                  <p className="mt-3 text-sm text-muted">
                    Looking for: <span className="font-medium text-ink/80">{p.desiredTitles.join(", ")}</span>
                  </p>
                )}
                {p.categories.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.categories.map((c) => (
                      <span key={c} className="rounded-full bg-brand-tint px-2.5 py-1 text-xs font-medium text-brand-dark">
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          {profiles.length === 0 && (
            <p className="mt-12 text-center text-muted">No searchable profiles yet.</p>
          )}

          <div className="mt-10 rounded-2xl bg-ink p-8 text-center text-white">
            <p className="font-heading text-xl font-medium">
              Want to reach them? Post a job — the first one is free.
            </p>
            <Link href="/employer/post" className="mt-4 inline-block rounded-full bg-brand px-8 py-3 font-semibold text-white transition hover:bg-brand-dark">
              Post a job
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
