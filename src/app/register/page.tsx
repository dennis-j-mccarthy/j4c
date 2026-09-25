import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sign Up — Jobs For Catholics",
  description: "Join as a job seeker, an employer, or a freelancer.",
};

const OPTIONS = [
  {
    title: "I'm looking for work",
    copy: "Create a profile, build an AI resume, and get matched to mission-driven openings with honest fit scores.",
    cta: "Create my candidate profile",
    href: "/registerseeker",
    accent: "from-sky-500 to-blue-700",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-8 w-8">
        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 20c.8-3.5 4-5.5 8-5.5s7.2 2 8 5.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "I'm hiring",
    copy: "Post your opening in two minutes — the AI writes the job description — and get applicants ranked by mission fit.",
    cta: "Register my organization",
    href: "/employer/register",
    accent: "from-amber-500 to-orange-700",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-8 w-8">
        <path d="M4 21V8l8-5 8 5v13M9 21v-6h6v6M4 21h16" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "I'm a freelancer",
    copy: "List your craft — music, sacred art, grant writing, web design — and let parishes and apostolates come to you. $20/mo, 0% commission.",
    cta: "List my craft",
    href: "/freelance#join",
    accent: "from-emerald-500 to-teal-700",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-8 w-8">
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex flex-1 items-center px-4 py-16">
        <div className="mx-auto w-full max-w-5xl">
          <p className="text-center text-xs font-bold tracking-[0.14em] text-brand-dark uppercase">
            Join us
          </p>
          <h1 className="mt-2 text-center font-heading text-4xl font-medium tracking-tight text-ink">
            How will you build the Body of Christ?
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted">
            Free for job seekers, first listing free for employers, $20/mo for
            freelancers. Pick your lane — you&apos;ll be set up in about two
            minutes.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {OPTIONS.map((o) => (
              <Link
                key={o.href}
                href={o.href}
                className="group flex flex-col rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl hover:ring-brand/30"
              >
                <span className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-white ${o.accent}`}>
                  {o.icon}
                </span>
                <h2 className="mt-5 font-heading text-2xl font-medium text-ink group-hover:text-brand-dark">
                  {o.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{o.copy}</p>
                <span className="mt-5 font-semibold text-brand-dark">
                  {o.cta} →
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted">
            Already have a profile?{" "}
            <Link href="/login" className="font-semibold text-brand-dark hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
