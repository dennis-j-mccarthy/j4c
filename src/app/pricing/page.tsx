import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Pricing — Jobs For Catholics",
  description: "First listing free. Simple pricing for parishes, schools, dioceses, and apostolates.",
};

const TIERS = [
  {
    name: "First Listing",
    price: "Free",
    tagline: "Try the whole platform on us.",
    features: [
      "One 60-day job listing",
      "AI writes your job description",
      "Applicants ranked by mission fit",
      "No card, no contract",
    ],
    cta: "Post your first job",
    href: "/employer/post",
    featured: true,
  },
  {
    name: "Standard Listing",
    price: "$99",
    per: "/ listing",
    tagline: "For the next opening, and the one after.",
    features: [
      "60-day listing with renewal reminders",
      "AI job-description writer",
      "Fit-scored applicant pipeline",
      "Featured placement upgrade available",
    ],
    cta: "Post a job",
    href: "/employer/post",
  },
  {
    name: "Recruiter",
    price: "$249",
    per: "/ mo",
    tagline: "For dioceses and organizations that hire all year.",
    features: [
      "Unlimited active listings",
      "Search the candidate directory",
      "AI fit reads on every applicant",
      "Priority support",
    ],
    cta: "Talk to us",
    href: "/contact",
  },
];

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-xs font-bold tracking-[0.14em] text-brand-dark uppercase">
            Pricing
          </p>
          <h1 className="mt-2 text-center font-heading text-4xl font-medium tracking-tight text-ink">
            Your first hire is on us.
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted">
            Candidates and freelancers are free forever. Employers pay per
            listing — and the first one costs nothing.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {TIERS.map((t) => (
              <div
                key={t.name}
                className={`flex flex-col rounded-3xl p-8 shadow-sm ring-1 ${
                  t.featured
                    ? "bg-ink text-white ring-ink"
                    : "bg-white text-ink ring-black/5"
                }`}
              >
                {t.featured && (
                  <span className="mb-3 w-fit rounded-full bg-brand px-3 py-1 text-xs font-bold text-white">
                    Start here
                  </span>
                )}
                <h2 className="font-heading text-xl font-medium">{t.name}</h2>
                <p className="mt-3 font-heading text-4xl font-medium">
                  {t.price}
                  {t.per && <span className={`text-base ${t.featured ? "text-white/60" : "text-muted"}`}> {t.per}</span>}
                </p>
                <p className={`mt-1 text-sm ${t.featured ? "text-white/70" : "text-muted"}`}>{t.tagline}</p>
                <ul className={`mt-5 flex-1 space-y-2.5 text-sm ${t.featured ? "text-white/80" : "text-ink/80"}`}>
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="mt-0.5 text-brand">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={t.href}
                  className={`mt-6 rounded-full px-6 py-3 text-center font-semibold transition ${
                    t.featured
                      ? "bg-brand text-white hover:bg-brand-dark"
                      : "text-brand-dark ring-1 ring-brand/40 hover:bg-brand-tint"
                  }`}
                >
                  {t.cta}
                </Link>
              </div>
            ))}
          </div>

          <div id="freelance" className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-brand-tint/70 p-6 ring-1 ring-brand/20">
              <p className="font-heading text-lg font-medium text-ink">Freelancers: list free</p>
              <p className="mt-1 text-sm text-muted">
                Listing your craft costs nothing, and we take 0% commission —
                you keep everything you earn.
              </p>
              <Link href="/freelance#join" className="mt-3 inline-block text-sm font-semibold text-brand-dark hover:underline">
                List your craft →
              </Link>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 p-6 ring-1 ring-accent/30">
              <p className="font-heading text-lg font-medium text-ink">
                ★ Featured Craft — <span className="text-accent">$19/mo</span>
              </p>
              <p className="mt-1 text-sm text-muted">
                Top of your category, featured badge, roughly 3× the views.
                Cancel anytime — still 0% commission.
              </p>
              <Link href="/contact" className="mt-3 inline-block text-sm font-semibold text-accent hover:underline">
                Get featured →
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
