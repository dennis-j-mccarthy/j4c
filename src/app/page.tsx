import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import StatCounter from "@/components/StatCounter";

/* ---------- placeholder content (swap for DB queries) ---------- */

const employers = [
  { initials: "DV", name: "Diocese of Venice", tint: "bg-sky-100 text-sky-700" },
  { initials: "SJ", name: "St. Joseph Classical Academy", tint: "bg-amber-100 text-amber-700" },
  { initials: "AM", name: "Ave Maria Parish", tint: "bg-emerald-100 text-emerald-700" },
  { initials: "HF", name: "Holy Family Health", tint: "bg-rose-100 text-rose-700" },
  { initials: "SH", name: "Sacred Heart Academy", tint: "bg-violet-100 text-violet-700" },
  { initials: "CC", name: "Catholic Charities", tint: "bg-cyan-100 text-cyan-700" },
  { initials: "SA", name: "St. Augustine Institute", tint: "bg-orange-100 text-orange-700" },
  { initials: "GS", name: "Good Shepherd Media", tint: "bg-teal-100 text-teal-700" },
];

const featuredJobs = [
  {
    title: "High School Theology Teacher",
    org: "St. Joseph Classical Academy",
    initials: "SJ",
    tint: "bg-amber-100 text-amber-700",
    location: "Naples, FL",
    type: "Full-time",
    salary: "$48k – $62k",
    tags: ["Education", "On-site"],
    featured: true,
  },
  {
    title: "Director of Communications",
    org: "Diocese of Venice",
    initials: "DV",
    tint: "bg-sky-100 text-sky-700",
    location: "Venice, FL",
    type: "Full-time",
    salary: "$70k – $90k",
    tags: ["Communications", "Hybrid"],
    featured: true,
  },
  {
    title: "Youth Minister",
    org: "Ave Maria Parish",
    initials: "AM",
    tint: "bg-emerald-100 text-emerald-700",
    location: "Ave Maria, FL",
    type: "Part-time",
    salary: "$24 – $30/hr",
    tags: ["Ministry", "On-site"],
    featured: false,
  },
  {
    title: "Registered Nurse — Hospice",
    org: "Holy Family Health",
    initials: "HF",
    tint: "bg-rose-100 text-rose-700",
    location: "Cincinnati, OH",
    type: "Full-time",
    salary: "$68k – $84k",
    tags: ["Healthcare", "On-site"],
    featured: false,
  },
  {
    title: "Development Director",
    org: "Catholic Charities",
    initials: "CC",
    tint: "bg-cyan-100 text-cyan-700",
    location: "Denver, CO",
    type: "Full-time",
    salary: "$85k – $105k",
    tags: ["Nonprofit", "Hybrid"],
    featured: false,
  },
  {
    title: "Liturgical Music Director",
    org: "Sacred Heart Academy",
    initials: "SH",
    tint: "bg-violet-100 text-violet-700",
    location: "Remote / Travel",
    type: "Freelance",
    salary: "$400 – $900/wk",
    tags: ["Music", "Freelance"],
    featured: false,
  },
];

const pins = [
  { x: 10, y: 22, label: "Seattle" },
  { x: 10, y: 62, label: "Los Angeles" },
  { x: 20, y: 65, label: "Phoenix" },
  { x: 34, y: 45, label: "Denver" },
  { x: 47, y: 72, label: "Dallas" },
  { x: 58, y: 78, label: "New Orleans" },
  { x: 62, y: 34, label: "Chicago" },
  { x: 58, y: 48, label: "St. Louis" },
  { x: 70, y: 60, label: "Atlanta" },
  { x: 79, y: 88, label: "Naples" },
  { x: 82, y: 42, label: "Washington, DC" },
  { x: 87, y: 33, label: "New York" },
  { x: 91, y: 26, label: "Boston" },
];

const tracks = [
  {
    name: "Candidates",
    tagline: "Find a role worthy of your calling",
    copy: "Build a profile, follow employers you love, and get matched with jobs where your faith is an asset — not an afterthought.",
    bullets: ["Free forever", "One-click applications", "Faith-aligned matches"],
    href: "/registerseeker",
    cta: "Create your free profile",
    highlight: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Employers",
    tagline: "Hire people who share your mission",
    copy: "Parishes, schools, apostolates, and Catholic-owned businesses reach thousands of candidates who lead with faith.",
    bullets: ["Post jobs in minutes", "Search candidate profiles", "Plans for every budget"],
    href: "/employer/register",
    cta: "Post a job",
    highlight: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 12h18" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Freelancers",
    tagline: "Offer your gifts to the Church",
    copy: "Musicians, designers, writers, developers — put your talents at the service of parishes and apostolates nationwide.",
    bullets: ["Showcase your portfolio", "Set your own rates", "Serve from anywhere"],
    href: "/freelance",
    cta: "Join the marketplace",
    highlight: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7">
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" strokeLinecap="round" />
      </svg>
    ),
  },
];

/* ---------- small shared bits ---------- */

const CheckIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 shrink-0 text-brand-dark">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.7-9.3a1 1 0 0 0-1.4-1.4L9 10.6 7.7 9.3a1 1 0 0 0-1.4 1.4l2 2a1 1 0 0 0 1.4 0l4-4Z"
      clipRule="evenodd"
    />
  </svg>
);

const PinIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-muted">
    <path
      fillRule="evenodd"
      d="M10 18s6-5.1 6-9.6A6.1 6.1 0 0 0 10 2a6.1 6.1 0 0 0-6 6.4C4 12.9 10 18 10 18Zm0-7.5a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z"
      clipRule="evenodd"
    />
  </svg>
);

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* ---------- hero ---------- */}
        <section className="relative flex min-h-[560px] items-center justify-center overflow-hidden">
          <Image
            src="/brand/hero-church-windows.jpg"
            alt=""
            fill
            className="animate-kenburns object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/60 to-brand-dark/50" />
          <div className="relative mx-auto max-w-4xl px-4 py-24 text-center text-white">
            <p
              className="animate-hero text-xs font-semibold tracking-[0.3em] text-brand uppercase"
              style={{ animationDelay: "0ms" }}
            >
              The Catholic Career Network
            </p>
            <h1
              className="animate-hero mt-4 font-heading text-4xl font-bold tracking-tight sm:text-6xl"
              style={{ animationDelay: "120ms" }}
            >
              Find work worthy
              <br className="hidden sm:block" /> of your calling.
            </h1>
            <p
              className="animate-hero mx-auto mt-5 max-w-2xl text-lg text-white/90"
              style={{ animationDelay: "240ms" }}
            >
              From parish offices to classrooms to Catholic-owned businesses —
              connect with employers who share your faith, and build a career
              with eternal purpose.
            </p>

            <form
              action="/search"
              className="animate-hero mx-auto mt-9 flex max-w-2xl flex-col gap-2 rounded-2xl bg-white p-2 shadow-2xl shadow-ink/30 sm:flex-row sm:rounded-full"
              style={{ animationDelay: "360ms" }}
            >
              <input
                type="text"
                name="q"
                placeholder="Job title or keyword"
                className="min-w-0 flex-1 rounded-full px-5 py-3 text-ink placeholder:text-muted focus:outline-none"
              />
              <div className="hidden w-px self-stretch bg-black/10 sm:block" />
              <input
                type="text"
                name="loc"
                placeholder="City, state, or remote"
                className="min-w-0 flex-1 rounded-full px-5 py-3 text-ink placeholder:text-muted focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-brand px-7 py-3 font-semibold text-white transition hover:bg-brand-dark"
              >
                Search
              </button>
            </form>

            <p
              className="animate-hero mt-6 text-sm text-white/75"
              style={{ animationDelay: "480ms" }}
            >
              Popular: Theology Teacher · Youth Minister · Development ·
              Nursing · Music Director
            </p>
          </div>
        </section>

        {/* ---------- employer marquee ---------- */}
        <section className="border-b border-black/5 bg-white py-10">
          <div className="mx-auto max-w-7xl px-4">
            <p className="text-center text-xs font-semibold tracking-[0.25em] text-muted uppercase">
              Trusted by mission-driven employers nationwide
            </p>
            <div className="marquee-mask mt-6 overflow-hidden">
              <div className="animate-marquee flex w-max gap-4">
                {[...employers, ...employers].map((e, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-full border border-black/5 bg-white py-2 pr-6 pl-2 shadow-sm"
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${e.tint}`}
                    >
                      {e.initials}
                    </span>
                    <span className="whitespace-nowrap font-medium text-ink">
                      {e.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- three tracks ---------- */}
        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4">
            <Reveal className="text-center">
              <p className="text-xs font-semibold tracking-[0.3em] text-brand-dark uppercase">
                Three ways to join
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                One community. Three callings.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted">
                Whether you&apos;re seeking a career, building a team, or
                offering your talents to the Church — there&apos;s a place for
                you here.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {tracks.map((t, i) => (
                <Reveal key={t.name} delay={i * 120} className="h-full">
                  <div
                    className={`relative flex h-full flex-col rounded-2xl bg-white p-8 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
                      t.highlight
                        ? "shadow-lg ring-2 ring-brand"
                        : "shadow-sm ring-1 ring-black/5"
                    }`}
                  >
                    {t.highlight && (
                      <span className="absolute -top-3 left-8 rounded-full bg-brand px-3 py-1 text-xs font-bold tracking-wide text-white uppercase">
                        Most active
                      </span>
                    )}
                    <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-tint text-brand-dark">
                      {t.icon}
                    </span>
                    <h3 className="mt-5 font-heading text-2xl font-bold text-ink">
                      {t.name}
                    </h3>
                    <p className="mt-1 font-medium text-brand-dark">{t.tagline}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {t.copy}
                    </p>
                    <ul className="mt-5 space-y-2.5 text-sm text-ink">
                      {t.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2.5">
                          <CheckIcon />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={t.href}
                      className={`mt-8 rounded-full px-6 py-3 text-center font-semibold transition ${
                        t.highlight
                          ? "bg-brand text-white shadow-md shadow-brand/30 hover:bg-brand-dark"
                          : "border border-brand text-brand-dark hover:bg-brand hover:text-white"
                      }`}
                    >
                      {t.cta}
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- featured jobs ---------- */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4">
            <Reveal className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.3em] text-brand-dark uppercase">
                  Hand-picked this week
                </p>
                <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                  Featured jobs
                </h2>
              </div>
              <Link
                href="/search"
                className="group inline-flex items-center gap-2 font-semibold text-brand-dark"
              >
                View all jobs
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </Reveal>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {featuredJobs.map((job, i) => (
                <Reveal key={job.title} delay={(i % 3) * 100} className="h-full">
                  <Link
                    href="/search"
                    className="group flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-brand/40"
                  >
                    <div className="flex items-start justify-between">
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-xl text-base font-bold ${job.tint}`}
                      >
                        {job.initials}
                      </span>
                      {job.featured && (
                        <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-bold text-accent">
                          Featured
                        </span>
                      )}
                    </div>
                    <h3 className="mt-4 font-heading text-lg font-bold text-ink group-hover:text-brand-dark">
                      {job.title}
                    </h3>
                    <p className="mt-0.5 text-sm font-medium text-muted">{job.org}</p>
                    <div className="mt-3 flex items-center gap-1.5 text-sm text-muted">
                      <PinIcon />
                      {job.location}
                      <span className="mx-1 text-black/20">•</span>
                      {job.type}
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-5">
                      <div className="flex gap-2">
                        {job.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-ink/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-sm font-bold text-ink">{job.salary}</span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- map ---------- */}
        <section className="overflow-hidden bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid items-center gap-12 lg:grid-cols-5">
              <Reveal className="lg:col-span-2">
                <p className="text-xs font-semibold tracking-[0.3em] text-brand-dark uppercase">
                  Coast to coast
                </p>
                <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                  One Church.
                  <br />
                  Every diocese.
                </h2>
                <p className="mt-4 leading-relaxed text-muted">
                  From cathedral parishes in Boston to mission schools in the
                  Southwest, opportunities are opening every day. Wherever God
                  is calling you, there&apos;s a community ready to welcome
                  your gifts.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-ink">
                  {[
                    "Openings in all 50 states",
                    "Parish, school, nonprofit & business roles",
                    "Remote and freelance opportunities",
                  ].map((b) => (
                    <li key={b} className="flex items-center gap-2.5">
                      <CheckIcon />
                      {b}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={150} className="lg:col-span-3">
                <div className="relative">
                  <Image
                    src="/brand/us-map.svg"
                    alt="Map of the United States with active job locations"
                    width={959}
                    height={593}
                    className="h-auto w-full drop-shadow-sm"
                  />
                  {pins.map((pin, i) => (
                    <div
                      key={pin.label}
                      className="group absolute"
                      style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                    >
                      <span
                        className="pin-ring absolute -inset-2 rounded-full bg-brand/40"
                        style={{ animationDelay: `${i * 180}ms` }}
                      />
                      <span className="relative block h-3.5 w-3.5 rounded-full border-2 border-white bg-brand-dark shadow-md" />
                      <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-md bg-ink px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-white opacity-0 shadow-lg transition group-hover:opacity-100">
                        {pin.label}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------- stats band ---------- */}
        <section className="bg-gradient-to-r from-ink to-brand-dark py-16">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-4 lg:grid-cols-4">
            <StatCounter value={1400} suffix="+" label="Open positions" />
            <StatCounter value={380} suffix="+" label="Catholic employers" />
            <StatCounter value={176} label="Dioceses reached" />
            <StatCounter value={50} label="States covered" />
          </div>
        </section>

        {/* ---------- quote + CTA ---------- */}
        <section className="relative overflow-hidden bg-white py-24">
          <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-tint blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-brand-tint blur-3xl" />
          <div className="relative mx-auto max-w-3xl px-4 text-center">
            <Reveal>
              <p className="font-heading text-2xl leading-relaxed font-medium text-ink italic sm:text-3xl">
                &ldquo;Whatever you do, work at it with all your heart, as
                working for the Lord.&rdquo;
              </p>
              <p className="mt-4 text-sm font-semibold tracking-[0.25em] text-brand-dark uppercase">
                Colossians 3:23
              </p>
            </Reveal>
            <Reveal delay={150}>
              <h2 className="mt-14 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Your work is a vocation. Treat it like one.
              </h2>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/registerseeker"
                  className="rounded-full bg-brand px-8 py-3.5 font-semibold text-white shadow-lg shadow-brand/30 transition hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-xl"
                >
                  Create your free profile
                </Link>
                <Link
                  href="/employer/register"
                  className="rounded-full border-2 border-ink px-8 py-3.5 font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-ink hover:text-white"
                >
                  Post a job
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
