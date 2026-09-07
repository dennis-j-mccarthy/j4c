import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import StatCounter from "@/components/StatCounter";

/* ---------- placeholder content (swap for DB queries) ---------- */

const employers = [
  { logo: "/brand/employers/qlv9.png", name: "St. Clare of Assisi Catholic School" },
  { logo: "/brand/employers/felq.jpg", name: "Franciscan University of Steubenville" },
  { logo: "/brand/employers/wt86.webp", name: "Regina Coeli Parish" },
  { logo: "/brand/employers/8enr.png", name: "Legacy of Life Foundation" },
  { logo: "/brand/employers/klqe.webp", name: "Sól Recruiting" },
  { logo: "/brand/employers/fz9n.webp", name: "Holy Land Wood & Stone" },
];

const featuredJobs = [
  {
    title: "High School Theology Teacher",
    org: "St. Clare of Assisi Catholic School",
    logo: "/brand/employers/qlv9.png",
    blurb:
      "Teach upper-school theology rooted in the Catechism at a growing K-12 classical academy.",
    location: "Naples, FL",
    type: "Full-time",
    salary: "$48k – $62k",
    tags: ["Education", "On-site"],
    featured: true,
  },
  {
    title: "Admissions Counselor",
    org: "Franciscan University of Steubenville",
    logo: "/brand/employers/felq.jpg",
    blurb:
      "Guide prospective students and families through the admissions journey at a faithfully Catholic university.",
    location: "Steubenville, OH",
    type: "Full-time",
    salary: "$52k – $64k",
    tags: ["Higher Ed", "On-site"],
    featured: true,
  },
  {
    title: "Youth Minister",
    org: "Regina Coeli Parish",
    logo: "/brand/employers/wt86.webp",
    blurb:
      "Build and shepherd middle- and high-school youth programs, retreats, and service projects.",
    location: "Abilene, TX",
    type: "Part-time",
    salary: "$24 – $30/hr",
    tags: ["Ministry", "On-site"],
    featured: false,
  },
  {
    title: "Development Director",
    org: "Legacy of Life Foundation",
    logo: "/brand/employers/8enr.png",
    blurb:
      "Lead fundraising strategy and donor relationships for a foundation serving women and families.",
    location: "Philadelphia, PA",
    type: "Full-time",
    salary: "$85k – $105k",
    tags: ["Nonprofit", "Hybrid"],
    featured: false,
  },
  {
    title: "Executive Recruiter",
    org: "Sól Recruiting",
    logo: "/brand/employers/klqe.webp",
    blurb:
      "Place mission-aligned leaders with Catholic organizations nationwide. Fully remote.",
    location: "Remote",
    type: "Contract",
    salary: "$60 – $85/hr",
    tags: ["Recruiting", "Remote"],
    featured: false,
  },
  {
    title: "E-Commerce Manager",
    org: "Holy Land Wood & Stone",
    logo: "/brand/employers/fz9n.webp",
    blurb:
      "Grow the online storefront for handcrafted olive-wood goods from the Holy Land.",
    location: "Remote",
    type: "Freelance",
    salary: "$400 – $900/wk",
    tags: ["Marketing", "Freelance"],
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

const whyColumns = [
  {
    heading: "For Candidates",
    copy: "Skip the guesswork. Every listing comes from an organization that values faith, mission, and integrity — no more decoding vague “culture fit” language.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    heading: "For Employers",
    copy: "Skip the noise. Stop sorting through hundreds of unqualified applicants. Every candidate here is actively seeking mission-aligned work.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 12h18" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    heading: "For Everyone",
    copy: "A trusted community. From Catholic schools and parishes to healthcare systems, nonprofits, and faith-driven businesses — we’re the meeting place for people who want their work to mean something.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6">
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.5 19c1.2-2.8 3.6-4.2 6.5-4.2s5.3 1.4 6.5 4.2" strokeLinecap="round" />
        <path d="M16 4.8a3.5 3.5 0 0 1 0 6.4M18.5 14.9c1.6.7 2.6 2 3 4.1" strokeLinecap="round" />
      </svg>
    ),
  },
];

const candidateCallouts = [
  {
    title: "Build Your Profile",
    copy: "Upload your resume once and apply to jobs in seconds. Let employers discover you directly.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6">
        <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" strokeLinejoin="round" />
        <path d="M14 3v5h5M9.5 13h5M9.5 17h5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Set Job Alerts",
    copy: "Tell us what you’re looking for — role, location, organization type — and we’ll email you the moment a match goes live.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6">
        <path d="M18 9a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6M10.3 19a2 2 0 0 0 3.4 0" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Apply With Confidence",
    copy: "Every listing is from a verified, mission-driven employer. No dead-end applications, no guesswork.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6">
        <path d="M12 3 4.5 6v6c0 4.5 3 7.5 7.5 9 4.5-1.5 7.5-4.5 7.5-9V6L12 3Z" strokeLinejoin="round" />
        <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const employerBullets = [
  "Reach a national network of faith-aligned, actively job-seeking candidates",
  "Build a multi-media company profile that showcases your mission, culture, and team",
  "Simple, affordable posting. No long-term contracts required.",
  "Dedicated support to help you fill roles faster",
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
        <section className="relative overflow-hidden">
          <Image
            src="/brand/hero-church-windows.jpg"
            alt=""
            fill
            className="animate-kenburns object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/60 to-brand-dark/50" />
          <div className="relative mx-auto max-w-4xl px-4 pt-24 pb-40 text-center text-white">
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
              Where Faith Meets Work.
            </h1>
            <p
              className="animate-hero mx-auto mt-5 max-w-2xl text-lg text-white/90"
              style={{ animationDelay: "240ms" }}
            >
              Our job board is built exclusively for Catholic professionals and
              the mission-driven organizations that need them.
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
          </div>
        </section>

        {/* ---------- candidate / employer boxes ---------- */}
        <section className="relative z-10 -mt-24 px-4 pb-4">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
            <Reveal className="h-full">
              <div className="flex h-full flex-col rounded-2xl bg-white p-8 shadow-xl shadow-ink/10 ring-1 ring-black/5">
                <h2 className="font-heading text-2xl font-bold text-ink">
                  Find Work That Matches Your Values
                </h2>
                <p className="mt-3 leading-relaxed text-muted">
                  Search openings at Catholic schools, dioceses, nonprofits,
                  healthcare systems, and faith-driven businesses across the
                  country.
                </p>
                <div className="mt-6 flex flex-wrap gap-3 pt-2">
                  <Link
                    href="/search"
                    className="rounded-full bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand-dark"
                  >
                    Search Jobs
                  </Link>
                  <Link
                    href="/registerseeker"
                    className="rounded-full border border-brand px-6 py-3 font-semibold text-brand-dark transition hover:bg-brand hover:text-white"
                  >
                    Create Free Account
                  </Link>
                </div>
              </div>
            </Reveal>
            <Reveal delay={120} className="h-full">
              <div className="flex h-full flex-col rounded-2xl bg-ink p-8 text-white shadow-xl shadow-ink/20">
                <h2 className="font-heading text-2xl font-bold">
                  Hire Candidates Who Share Your Mission
                </h2>
                <p className="mt-3 leading-relaxed text-white/80">
                  Reach qualified, faith-aligned professionals actively looking
                  for work at organizations like yours.
                </p>
                <div className="mt-6 flex flex-wrap gap-3 pt-2">
                  <Link
                    href="/employer/post"
                    className="rounded-full bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand-dark"
                  >
                    Post a Job
                  </Link>
                  <Link
                    href="/employer/pricing"
                    className="rounded-full border border-white/60 px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-ink"
                  >
                    See Pricing
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------- trust bar ---------- */}
        <section className="border-b border-black/5 bg-white py-12">
          <div className="mx-auto max-w-7xl px-4">
            <p className="mx-auto max-w-2xl text-center text-sm font-medium text-muted">
              Trusted by Catholic schools, dioceses, healthcare systems, and
              mission-driven employers nationwide.
            </p>
            <div className="marquee-mask mt-6 overflow-hidden">
              <div className="animate-marquee flex w-max gap-4">
                {[...employers, ...employers, ...employers].map((e, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-full border border-black/5 bg-white py-2 pr-6 pl-2.5 shadow-sm"
                  >
                    <Image
                      src={e.logo}
                      alt={`${e.name} logo`}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-contain"
                    />
                    <span className="whitespace-nowrap font-medium text-ink">
                      {e.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- why jobs for catholics ---------- */}
        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4">
            <Reveal className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold tracking-[0.3em] text-brand-dark uppercase">
                Why Jobs for Catholics
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                More Than a Job Board
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                General job sites can&apos;t tell you if a workplace shares your
                values — and they can&apos;t tell employers if a candidate does
                either. We built Jobs for Catholics to close that gap.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {whyColumns.map((col, i) => (
                <Reveal key={col.heading} delay={i * 120} className="h-full">
                  <div className="h-full rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-tint text-brand-dark">
                      {col.icon}
                    </span>
                    <h3 className="mt-5 font-heading text-xl font-bold text-ink">
                      {col.heading}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {col.copy}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- candidate conversion ---------- */}
        <section className="overflow-hidden bg-white py-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <Reveal>
                <div className="relative aspect-[4/5] max-h-[520px] w-full overflow-hidden rounded-3xl">
                  <Image
                    src="/brand/candidate.jpg"
                    alt="A candidate ready for her next opportunity"
                    fill
                    className="object-cover object-[center_28%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
                </div>
              </Reveal>
              <Reveal delay={120}>
                <p className="text-xs font-semibold tracking-[0.3em] text-brand-dark uppercase">
                  For Job Seekers
                </p>
                <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                  Your Next Step Starts Here
                </h2>
                <p className="mt-3 text-lg text-muted">
                  Create a free account and let opportunity come to you.
                </p>
                <ul className="mt-8 space-y-6">
                  {candidateCallouts.map((c) => (
                    <li key={c.title} className="flex gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-tint text-brand-dark">
                        {c.icon}
                      </span>
                      <div>
                        <h3 className="font-semibold text-ink">{c.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted">
                          {c.copy}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/registerseeker"
                  className="mt-9 inline-block rounded-full bg-brand px-8 py-3.5 font-semibold text-white shadow-lg shadow-brand/30 transition hover:-translate-y-0.5 hover:bg-brand-dark"
                >
                  Create Your Free Account
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------- employer conversion ---------- */}
        <section className="overflow-hidden bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <Reveal className="lg:order-2">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl">
                  <Image
                    src="/brand/employer.jpg"
                    alt="An employer connecting with candidates"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
                </div>
              </Reveal>
              <Reveal delay={120} className="lg:order-1">
                <p className="text-xs font-semibold tracking-[0.3em] text-brand-dark uppercase">
                  For Employers
                </p>
                <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                  Hire the Talent That Shares Your Mission
                </h2>
                <p className="mt-4 leading-relaxed text-muted">
                  Posting on a general job board means sorting through
                  candidates who don&apos;t know, or care, about your
                  organization&apos;s values. Jobs for Catholics puts your
                  opening in front of professionals who are searching
                  specifically for the work you offer.
                </p>
                <p className="mt-6 font-semibold text-ink">
                  Why post with Jobs for Catholics?
                </p>
                <ul className="mt-4 space-y-3">
                  {employerBullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-ink">
                      <CheckIcon />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/employer/pricing"
                    className="rounded-full bg-brand px-7 py-3.5 font-semibold text-white shadow-lg shadow-brand/30 transition hover:-translate-y-0.5 hover:bg-brand-dark"
                  >
                    View Pricing &amp; Post a Job
                  </Link>
                  <Link
                    href="/employer/info"
                    className="rounded-full border-2 border-ink px-7 py-3.5 font-semibold text-ink transition hover:bg-ink hover:text-white"
                  >
                    Learn About Employer Tools
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------- featured jobs ---------- */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4">
            <Reveal className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.3em] text-brand-dark uppercase">
                  Featured Jobs
                </p>
                <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                  New This Week
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
                      <Image
                        src={job.logo}
                        alt={`${job.org} logo`}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-xl object-contain ring-1 ring-black/5"
                      />
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
                    <p className="mt-2 text-sm leading-relaxed text-ink/70">
                      {job.blurb}
                    </p>
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
        <section className="relative overflow-hidden bg-gradient-to-r from-ink to-brand-dark py-16">
          <Image
            src="/brand/job-seeker.jpg"
            alt=""
            fill
            className="object-cover opacity-15 mix-blend-overlay"
          />
          <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-10 px-4 lg:grid-cols-4">
            <StatCounter value={1400} suffix="+" label="Open positions" />
            <StatCounter value={380} suffix="+" label="Catholic employers" />
            <StatCounter value={176} label="Dioceses reached" />
            <StatCounter value={50} label="States covered" />
          </div>
        </section>

        {/* ---------- quote + final CTA ---------- */}
        <section className="relative overflow-hidden bg-white py-24">
          <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-tint blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-brand-tint blur-3xl" />
          <div className="relative mx-auto max-w-4xl px-4">
            <Reveal className="text-center">
              <p className="font-heading text-2xl leading-relaxed font-medium text-ink italic sm:text-3xl">
                &ldquo;Whatever you do, work at it with all your heart, as
                working for the Lord.&rdquo;
              </p>
              <p className="mt-4 text-sm font-semibold tracking-[0.25em] text-brand-dark uppercase">
                Colossians 3:23
              </p>
            </Reveal>

            <Reveal delay={150}>
              <h2 className="mt-16 text-center font-heading text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Ready to Get Started?
              </h2>
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-8 text-center ring-1 ring-black/5">
                  <p className="font-heading text-lg font-bold text-ink">
                    Job Seekers
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    Create your free account and start applying today.
                  </p>
                  <Link
                    href="/registerseeker"
                    className="mt-5 inline-block rounded-full bg-brand px-7 py-3 font-semibold text-white shadow-md shadow-brand/30 transition hover:-translate-y-0.5 hover:bg-brand-dark"
                  >
                    Sign Up Free
                  </Link>
                </div>
                <div className="rounded-2xl bg-ink p-8 text-center">
                  <p className="font-heading text-lg font-bold text-white">
                    Employers
                  </p>
                  <p className="mt-2 text-sm text-white/75">
                    Post your first job and start reaching mission-aligned
                    candidates.
                  </p>
                  <Link
                    href="/employer/post"
                    className="mt-5 inline-block rounded-full bg-brand px-7 py-3 font-semibold text-white shadow-md shadow-brand/30 transition hover:-translate-y-0.5 hover:bg-brand-dark"
                  >
                    Post a Job
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
