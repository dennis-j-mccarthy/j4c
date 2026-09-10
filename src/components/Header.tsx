"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type MenuKey = "work" | "employers";

type MegaLink = {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const icons = {
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  ),
  grid: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" strokeLinecap="round" />
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5" strokeLinecap="round" />
    </svg>
  ),
  megaphone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path d="M3 10v4a1 1 0 0 0 1 1h2l4 4V5L6 9H4a1 1 0 0 0-1 1Z" strokeLinejoin="round" />
      <path d="M14 8.5a5 5 0 0 1 0 7M17 6a9 9 0 0 1 0 12" strokeLinecap="round" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 19c1.2-2.8 3.6-4.2 6.5-4.2s5.3 1.4 6.5 4.2" strokeLinecap="round" />
      <path d="M16 4.8a3.5 3.5 0 0 1 0 6.4M18.5 14.9c1.6.7 2.6 2 3 4.1" strokeLinecap="round" />
    </svg>
  ),
  tag: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path d="M4 4h7l9 9-7 7-9-9V4Z" strokeLinejoin="round" />
      <circle cx="8.5" cy="8.5" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path d="M4 5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2V5Z" strokeLinejoin="round" />
      <path d="M4 19a2 2 0 0 1 2-2h14" />
    </svg>
  ),
};

const menus: Record<MenuKey, { label: string; links: MegaLink[]; featured: { title: string; copy: string; href: string; cta: string; image: string } }> = {
  work: {
    label: "Find Work",
    links: [
      {
        href: "/search",
        title: "Browse All Jobs",
        description: "Every open position, updated daily",
        icon: icons.search,
      },
      {
        href: "/search?view=categories",
        title: "Jobs by Category",
        description: "Ministry, education, healthcare & more",
        icon: icons.grid,
      },
      {
        href: "/freelance",
        title: "Freelance Marketplace",
        description: "Offer your gifts to parishes & apostolates",
        icon: icons.sparkle,
      },
      {
        href: "/registerseeker",
        title: "Create a Candidate Profile",
        description: "Get discovered by faithful employers",
        icon: icons.user,
      },
    ],
    featured: {
      title: "Work is a vocation",
      copy: "Find a role where your faith isn't left at the door.",
      href: "/registerseeker",
      cta: "Start your profile",
      image: "/brand/candidate-2.jpg",
    },
  },
  employers: {
    label: "For Employers",
    links: [
      {
        href: "/employer/post",
        title: "Post a Job",
        description: "Live in minutes, seen by thousands",
        icon: icons.megaphone,
      },
      {
        href: "/employer/candidates",
        title: "Search Candidates",
        description: "Browse mission-aligned professionals",
        icon: icons.users,
      },
      {
        href: "/employer/pricing",
        title: "Pricing & Plans",
        description: "Simple plans for parishes to enterprises",
        icon: icons.tag,
      },
      {
        href: "/employer/info",
        title: "Why Jobs For Catholics",
        description: "Reach candidates who share your mission",
        icon: icons.book,
      },
    ],
    featured: {
      title: "Hire the faithful",
      copy: "Your next great hire already shares your mission.",
      href: "/employer/register",
      cta: "Post your first job",
      image: "/brand/handshake.jpg",
    },
  },
};

// module state: survives client-side route changes, resets on full page load —
// so the sweep plays once per real page load, never on in-app navigation
let shinePlayed = false;

export default function Header() {
  const [open, setOpen] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shine, setShine] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!shinePlayed) {
      shinePlayed = true;
      setShine(true);
    }
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="sticky top-0 z-50" onMouseLeave={() => setOpen(null)}>
      <div className="bg-brand px-4 py-1.5 text-sm text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <p className="hidden font-heading font-medium tracking-wide italic sm:block">
            Helping build the Body of Christ — one great hire at a time
          </p>
          <Link href="/login" className="ml-auto font-semibold hover:underline">
            Login
          </Link>
        </div>
      </div>

      <header className="relative border-b border-black/5 bg-white/95 shadow-sm backdrop-blur">
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 transition-all duration-300 ${
            scrolled ? "py-2" : "py-3"
          }`}
        >
          <Link href="/" className="shrink-0" onMouseEnter={() => setOpen(null)}>
            <span className={`logo-shine ${shine ? "logo-shine-run" : ""}`}>
              <Image
                src="/brand/logomail.png"
                alt="JobsForCatholics.com"
                width={332}
                height={133}
                className={`w-auto transition-all duration-300 ${scrolled ? "h-12" : "h-[4.5rem]"}`}
                priority
              />
            </span>
          </Link>

          <nav className="hidden items-center gap-1 text-[13px] font-semibold tracking-[0.12em] text-ink uppercase lg:flex">
            {(Object.keys(menus) as MenuKey[]).map((key) => (
              <button
                key={key}
                type="button"
                onMouseEnter={() => setOpen(key)}
                onClick={() => setOpen(open === key ? null : key)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 uppercase transition-colors ${
                  open === key ? "bg-brand-tint text-brand-dark" : "hover:bg-brand-tint hover:text-brand-dark"
                }`}
              >
                {menus[key].label}
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`h-4 w-4 transition-transform duration-200 ${open === key ? "rotate-180" : ""}`}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.3 7.8a1 1 0 0 1 1.4 0L10 11.1l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            ))}
            {[
              { href: "/blog", label: "Blog" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact Us" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onMouseEnter={() => setOpen(null)}
                className="rounded-full px-4 py-2 transition-colors hover:bg-brand-tint hover:text-brand-dark"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/register"
              className="rounded-full bg-brand px-5 py-2.5 font-semibold text-white shadow-md shadow-brand/30 transition hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/40"
            >
              Sign Up Free
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg text-ink lg:hidden"
          >
            <span className={`h-0.5 w-6 bg-current transition ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-6 bg-current transition ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-6 bg-current transition ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>

        {/* mega panel */}
        {(Object.keys(menus) as MenuKey[]).map((key) => {
          const menu = menus[key];
          const active = open === key;
          return (
            <div
              key={key}
              className={`absolute inset-x-0 top-full hidden border-b border-black/5 bg-white shadow-xl shadow-ink/10 transition-all duration-300 lg:block ${
                active ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
              }`}
            >
              <div className="mx-auto grid max-w-7xl grid-cols-3 gap-8 px-4 py-8">
                <div className="col-span-2 grid grid-cols-2 gap-2">
                  {menu.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group flex items-start gap-4 rounded-xl p-4 transition-colors hover:bg-brand-tint"
                    >
                      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-tint text-brand-dark transition group-hover:bg-brand group-hover:text-white">
                        {link.icon}
                      </span>
                      <span>
                        <span className="block font-semibold text-ink group-hover:text-brand-dark">
                          {link.title}
                        </span>
                        <span className="mt-0.5 block text-sm text-muted">
                          {link.description}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src={menu.featured.image}
                    alt=""
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/50 to-ink/20" />
                  <div className="relative flex h-full min-h-[200px] flex-col justify-end p-6 text-white">
                    <p className="font-heading text-xl font-medium">{menu.featured.title}</p>
                    <p className="mt-1 text-sm text-white/85">{menu.featured.copy}</p>
                    <Link
                      href={menu.featured.href}
                      className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-ink transition hover:bg-brand hover:text-white"
                    >
                      {menu.featured.cta}
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* mobile menu */}
        <div
          className={`overflow-hidden border-t border-black/5 bg-white transition-all duration-300 lg:hidden ${
            mobileOpen ? "max-h-[480px]" : "max-h-0 border-t-0"
          }`}
        >
          <nav className="flex flex-col gap-1 px-4 py-4 text-sm font-semibold tracking-[0.12em] text-ink uppercase">
            {[
              { href: "/search", label: "Find Work" },
              { href: "/employer/info", label: "For Employers" },
              { href: "/freelance", label: "Freelancers" },
              { href: "/blog", label: "Blog" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact Us" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-2.5 hover:bg-brand-tint hover:text-brand-dark"
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/register"
              className="mt-2 rounded-full bg-brand px-5 py-2.5 text-center font-semibold text-white"
              onClick={() => setMobileOpen(false)}
            >
              Sign Up Free
            </Link>
          </nav>
        </div>
      </header>
    </div>
  );
}
