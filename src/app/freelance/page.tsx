import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import FreelanceBoard, { type FreelancerRow } from "@/components/FreelanceBoard";
import FreelanceJoin from "@/components/FreelanceJoin";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Freelance Marketplace — Jobs For Catholics",
  description:
    "Offer your craft to parishes, schools, and apostolates — project by project. Cantors, sacred artists, grant writers, web designers, and more.",
};

const STEPS = [
  {
    n: "1",
    title: "List your craft — $20/mo",
    copy: "Two minutes to set up, cancel anytime. Our AI even polishes your pitch.",
  },
  {
    n: "2",
    title: "Parishes reach out directly",
    copy: "Pastors, principals, and apostolate directors browse by craft and contact you — no bidding wars.",
  },
  {
    n: "3",
    title: "Work on mission, keep 100%",
    copy: "You set the rate, you keep it all. We just make the introduction.",
  },
];

export default async function FreelancePage() {
  const freelancers = await prisma.freelancer.findMany({
    orderBy: [{ featured: "desc" }, { createdAt: "asc" }],
    include: { _count: { select: { portfolio: true } } },
  });

  const rows: FreelancerRow[] = freelancers.map((f) => ({
    id: f.id,
    slug: f.slug,
    portfolioCount: f._count.portfolio,
    name: f.name,
    craft: f.craft,
    category: f.category,
    city: f.city,
    state: f.state,
    rate: f.rate,
    bio: f.bio,
    skills: f.skills,
    available: f.available,
    featured: f.featured,
  }));

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />

      <section className="relative overflow-hidden bg-ink px-4 py-20 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at 20% 0%, #29b8fb55, transparent 55%), radial-gradient(ellipse at 90% 100%, #ff980033, transparent 50%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl">
          <p className="text-xs font-bold tracking-[0.2em] text-brand uppercase">
            Freelance Marketplace
          </p>
          <h1 className="mt-3 max-w-3xl font-heading text-4xl font-medium tracking-tight sm:text-5xl">
            The Church runs on gifts.
            <span className="text-brand"> Offer yours.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            A parish needs a cantor for Saturday. A school needs a muralist for
            a semester. An apostolate needs a grant writer for one big ask.
            Bring your craft to the whole Catholic world — project by project,
            on your terms.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#join"
              className="btn-shimmer rounded-full bg-gradient-to-r from-brand to-brand-dark px-8 py-3.5 font-semibold text-white shadow-lg shadow-brand/40 transition hover:-translate-y-0.5"
            >
              ✦ List your craft — $20/mo
            </a>
            <a
              href="#browse"
              className="rounded-full px-8 py-3.5 font-semibold text-white ring-1 ring-white/30 transition hover:bg-white/10"
            >
              Browse freelancers
            </a>
          </div>
          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-4">
            <div>
              <p className="font-heading text-3xl font-medium text-brand">{rows.length}</p>
              <p className="text-xs tracking-wide text-white/60 uppercase">Crafts listed</p>
            </div>
            <div>
              <p className="font-heading text-3xl font-medium text-brand">0%</p>
              <p className="text-xs tracking-wide text-white/60 uppercase">Commission</p>
            </div>
            <div>
              <p className="font-heading text-3xl font-medium text-brand">$20</p>
              <p className="text-xs tracking-wide text-white/60 uppercase">Per month</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 120}>
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                <span className="font-heading text-3xl font-medium text-brand">{s.n}</span>
                <h3 className="mt-2 font-heading text-lg font-medium text-ink">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{s.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <main id="browse" className="flex-1 px-4 pb-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-heading text-3xl font-medium tracking-tight text-ink">
            Faithful hands for hire
          </h2>
          <p className="mt-2 max-w-2xl text-muted">
            Every freelancer here serves the same mission you do. Search by
            craft, filter by category, reach out directly.
          </p>
          <div className="mt-6">
            <FreelanceBoard initial={rows} />
          </div>
        </div>
      </main>

      <section id="join" className="border-t border-black/5 bg-white px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-center text-xs font-bold tracking-[0.14em] text-brand-dark uppercase">
            Join the marketplace
          </p>
          <h2 className="mt-2 text-center font-heading text-3xl font-medium tracking-tight text-ink">
            Two minutes to your first inquiry.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted">
            Write your pitch in plain words — or paste rough notes and let the
            AI shape them. You can edit anything before it goes live.
          </p>
          <div className="mt-8">
            <FreelanceJoin />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
