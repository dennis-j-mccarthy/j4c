import Image from "next/image";
import Link from "next/link";

const columns = [
  {
    heading: "Job Seekers",
    links: [
      { href: "/search", label: "Browse Jobs" },
      { href: "/registerseeker", label: "Create a Profile" },
      { href: "/freelance", label: "Freelance Marketplace" },
      { href: "/blog", label: "Career Resources" },
    ],
  },
  {
    heading: "Employers",
    links: [
      { href: "/employer/post", label: "Post a Job" },
      { href: "/employer/pricing", label: "Pricing" },
      { href: "/employer/candidates", label: "Search Candidates" },
      { href: "/employer/info", label: "Why Us" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-5">
      <div className="lg:col-span-2">
          <Image
            src="/brand/logomail.png"
            alt="JobsForCatholics.com"
            width={332}
            height={133}
            className="h-12 w-auto rounded bg-white/95 p-1.5"
          />
          <p className="mt-3 font-heading font-medium text-white/90 italic">
            Serving the Catholic Community since 2010.
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
            Helping build the Body of Christ, one great hire at a time.
            Connecting faithful candidates, freelancers, and mission-driven
            employers across the country.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.heading}>
            <p className="font-heading font-bold tracking-wide">{col.heading}</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              {col.links.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href} className="transition hover:text-brand">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 px-4 py-5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-sm text-white/60 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} JobsForCatholics.com</p>
          <p className="italic">Ora et labora</p>
        </div>
      </div>
    </footer>
  );
}
