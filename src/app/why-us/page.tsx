import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Why Us — Jobs For Catholics",
  description: "Why mission-driven employers choose Jobs For Catholics over generic job boards.",
};

const ROWS = [
  {
    them: "Thousands of applicants who never read your mission statement",
    us: "An audience that chose a Catholic job board on purpose",
  },
  {
    them: "You write the posting alone at 9 pm",
    us: "AI drafts a mission-forward job description from a few facts — in seconds",
  },
  {
    them: "A stack of resumes to sort by hand",
    us: "Every applicant scored for mission fit, with the reasons spelled out",
  },
  {
    them: "Candidates paste the same resume everywhere",
    us: "One-click resumes and cover letters tailored to your posting",
  },
  {
    them: "Pay first, hope later",
    us: "Your first listing is free — no card, no contract",
  },
];

export default function WhyUsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1 px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-xs font-bold tracking-[0.14em] text-brand-dark uppercase">
            Why us
          </p>
          <h1 className="mt-2 text-center font-heading text-4xl font-medium tracking-tight text-ink">
            Generic boards find resumes.
            <br className="hidden sm:block" /> We find your people.
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted">
            The difference between a hire that fills a chair and one that
            builds your mission.
          </p>

          <div className="mt-10 space-y-4">
            {ROWS.map((r, i) => (
              <Reveal key={r.us} delay={i * 90}>
                <div className="grid gap-3 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-red-400">✕</span>
                    <p className="text-sm text-muted">{r.them}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-emerald-500">✓</span>
                    <p className="text-sm font-medium text-ink">{r.us}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 rounded-3xl bg-ink p-10 text-center text-white">
            <h2 className="font-heading text-2xl font-medium">
              Serving the Catholic community since 2010.
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-white/70">
              Parishes, schools, dioceses, and apostolates across the country
              hire here — and the first listing costs nothing.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link href="/employer/post" className="btn-shimmer rounded-full bg-gradient-to-r from-brand to-brand-dark px-8 py-3 font-semibold text-white shadow-lg shadow-brand/40 transition hover:-translate-y-0.5">
                Post your first job free
              </Link>
              <Link href="/pricing" className="rounded-full px-8 py-3 font-semibold text-white ring-1 ring-white/30 transition hover:bg-white/10">
                See pricing
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
