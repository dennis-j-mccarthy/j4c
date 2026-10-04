import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PlanButton from "@/components/PlanButton";
import { PLANS, formatPrice, getPlan, type Plan } from "@/lib/plans";
import { stripeConfigured } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Pricing — Jobs For Catholics",
  description:
    "First listing free. Listings from $39, month-to-month subscriptions from $49. Freelancers $25/mo, 0% commission.",
};

const ONE_TIME = PLANS.filter((p) => p.audience === "employer" && !p.interval);
const SUBSCRIPTIONS = PLANS.filter((p) => p.audience === "employer" && p.interval);
const FREELANCE = getPlan("freelance")!;

function Price({ plan, dark }: { plan: Plan; dark?: boolean }) {
  return (
    <p className="mt-3 font-heading text-4xl font-medium">
      {formatPrice(plan.price)}
      <span className={`text-base ${dark ? "text-white/60" : "text-muted"}`}>
        {plan.interval ? " / mo" : plan.featuredCredits && plan.featuredCredits > 1 ? " / pack" : " / listing"}
      </span>
    </p>
  );
}

function Perks({ perks, dark }: { perks: string[]; dark?: boolean }) {
  return (
    <ul className={`mt-5 flex-1 space-y-2.5 text-sm ${dark ? "text-white/80" : "text-ink/80"}`}>
      {perks.map((f) => (
        <li key={f} className="flex items-start gap-2">
          <span className="mt-0.5 text-brand">✓</span> {f}
        </li>
      ))}
    </ul>
  );
}

export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<{ canceled?: string }>;
}) {
  const { canceled } = await searchParams;
  const live = stripeConfigured();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-xs font-bold tracking-[0.14em] text-brand-dark uppercase">
            Pricing
          </p>
          <h1 className="mt-2 text-center font-heading text-4xl font-medium tracking-tight text-ink">
            Your first hire is on us.
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted">
            Candidates are free forever. Your first listing costs nothing. After
            that, pay per listing or pick a subscription — month to month, no
            yearly contract.
          </p>

          {canceled && (
            <p className="mx-auto mt-6 max-w-xl rounded-xl bg-white px-5 py-3 text-center text-sm text-muted ring-1 ring-black/5">
              Checkout canceled — nothing was charged.
            </p>
          )}

          {/* Pay as you go */}
          <h2 className="mt-14 font-heading text-2xl font-medium text-ink">Pay as you go</h2>
          <div className="mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col rounded-3xl bg-ink p-8 text-white shadow-sm ring-1 ring-ink">
              <span className="mb-3 w-fit rounded-full bg-brand px-3 py-1 text-xs font-bold text-white">
                Start here
              </span>
              <h3 className="font-heading text-xl font-medium">First Listing</h3>
              <p className="mt-3 font-heading text-4xl font-medium">Free</p>
              <p className="mt-1 text-sm text-white/70">Try the whole platform on us.</p>
              <Perks dark perks={["One 60-day listing", "AI writes your job description", "No card, no contract"]} />
              <Link
                href="/employer/post"
                className="mt-6 rounded-full bg-brand px-6 py-3 text-center font-semibold text-white transition hover:bg-brand-dark"
              >
                Post your first job
              </Link>
            </div>
            {ONE_TIME.map((p) => (
              <div key={p.key} className="flex flex-col rounded-3xl bg-white p-8 text-ink shadow-sm ring-1 ring-black/5">
                <h3 className="font-heading text-xl font-medium">{p.name}</h3>
                <Price plan={p} />
                <p className="mt-1 text-sm text-muted">{p.tagline}</p>
                <Perks perks={p.perks} />
                <PlanButton plan={p.key} live={live} label={`Buy ${p.name}`} />
              </div>
            ))}
          </div>

          {/* Subscriptions */}
          <h2 className="mt-16 font-heading text-2xl font-medium text-ink">Subscriptions</h2>
          <p className="mt-1 text-sm text-muted">Month to month. Cancel anytime.</p>
          <div className="mt-5 grid gap-6 md:grid-cols-3">
            {SUBSCRIPTIONS.map((p) => (
              <div
                key={p.key}
                className={`flex flex-col rounded-3xl p-8 shadow-sm ring-1 ${
                  p.popular ? "bg-ink text-white ring-ink" : "bg-white text-ink ring-black/5"
                }`}
              >
                {p.popular && (
                  <span className="mb-3 w-fit rounded-full bg-brand px-3 py-1 text-xs font-bold text-white">
                    Recommended
                  </span>
                )}
                <h3 className="font-heading text-xl font-medium">{p.name}</h3>
                <Price plan={p} dark={p.popular} />
                <p className={`mt-1 text-sm ${p.popular ? "text-white/70" : "text-muted"}`}>{p.tagline}</p>
                <Perks perks={p.perks} dark={p.popular} />
                <PlanButton plan={p.key} live={live} label="Subscribe" dark={p.popular} />
              </div>
            ))}
          </div>

          {/* Freelance */}
          <div id="freelance" className="mx-auto mt-16 max-w-2xl rounded-2xl bg-brand-tint/70 p-7 ring-1 ring-brand/20">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-heading text-lg font-medium text-ink">{FREELANCE.name}</p>
              <p className="font-heading text-2xl font-medium text-ink">
                {formatPrice(FREELANCE.price)} <span className="text-sm text-muted">/ mo</span>
              </p>
            </div>
            <p className="mt-2 text-sm text-muted">
              Your craft on the marketplace, direct inquiries from parishes and
              apostolates, and <b className="text-ink">0% commission</b> — you
              keep everything you earn. Cancel anytime.
            </p>
            <Link href="/freelance#join" className="mt-3 inline-block text-sm font-semibold text-brand-dark hover:underline">
              List your craft →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
