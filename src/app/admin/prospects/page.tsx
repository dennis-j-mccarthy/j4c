import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProspectBoard, { type ProspectRow } from "@/components/ProspectBoard";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Employer Prospects — Jobs For Catholics",
  robots: { index: false, follow: false },
};

export default async function ProspectsPage() {
  const prospects = await prisma.prospect.findMany({
    orderBy: [{ status: "asc" }, { name: "asc" }],
  });

  const rows: ProspectRow[] = prospects.map((p) => ({
    id: p.id,
    name: p.name,
    orgType: p.orgType,
    location: p.location,
    state: p.state,
    contact: p.contact,
    email: p.email,
    domain: p.domain,
    roles: p.roles,
    jobCount: p.jobCount,
    status: p.status,
    notes: p.notes,
    lastTouch: p.lastTouch?.toISOString() ?? null,
  }));

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1 px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold tracking-[0.14em] text-brand-dark uppercase">
            Growth · Outreach CRM
          </p>
          <h1 className="mt-1 font-heading text-3xl font-medium tracking-tight text-ink">
            Employer Prospects
          </h1>
          <p className="mt-2 max-w-2xl text-muted">
            Employers currently hiring on competing boards, enriched with contacts,
            emails, and domains. One click drafts the personalized outreach email —
            first listing free, AI matching as the hook.
          </p>
          <div className="mt-8">
            <ProspectBoard initial={rows} />
          </div>
          <p className="mt-6 text-xs text-muted">
            Derived contact names come from email address patterns — verify before
            sending. Sourced from public job postings, September 2026.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
