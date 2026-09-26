import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ProfileInquiry from "@/components/ProfileInquiry";
import { prisma } from "@/lib/prisma";
import { resolveMediaUrl } from "@/lib/s3";

export const dynamic = "force-dynamic";

async function getFreelancer(slug: string) {
  return prisma.freelancer.findFirst({
    where: { OR: [{ slug }, { id: slug }] },
    include: { portfolio: { orderBy: { sort: "asc" } } },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const f = await getFreelancer(slug);
  if (!f) return { title: "Freelancer Not Found — Jobs For Catholics" };
  return {
    title: `${f.name} — ${f.craft} | Jobs For Catholics`,
    description: f.bio.slice(0, 160),
  };
}

const DISC_COLORS = [
  "from-sky-500 to-blue-700",
  "from-amber-500 to-orange-700",
  "from-emerald-500 to-teal-700",
  "from-violet-500 to-purple-700",
  "from-rose-500 to-red-700",
];

export default async function FreelancerProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const f = await getFreelancer(slug);
  if (!f) notFound();

  const portfolio = await Promise.all(
    f.portfolio.map(async (item) => ({
      ...item,
      url: await resolveMediaUrl(item.image),
    })),
  );

  const initials = f.name
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .map((w) => w[0].toUpperCase())
    .slice(0, 2)
    .join("");
  const disc = DISC_COLORS[f.name.length % DISC_COLORS.length];
  const firstName = f.name.split(" ").filter((w) => !w.endsWith("."))[0] ?? f.name;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />

      <section className="border-b border-black/5 bg-white px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <Link href="/freelance" className="text-sm font-semibold text-brand-dark hover:underline">
            ← Freelance marketplace
          </Link>
          <div className="mt-6 flex flex-wrap items-start gap-6">
            <div
              className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-3xl font-bold text-white shadow-lg ${disc}`}
            >
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="font-heading text-4xl font-medium tracking-tight text-ink">{f.name}</h1>
              <p className="mt-1 text-lg font-semibold text-brand-dark">{f.craft}</p>
              <p className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted">
                {f.available && (
                  <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-600">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                    Available for new projects
                  </span>
                )}
                <span>{[f.city, f.state].filter(Boolean).join(", ") || "Remote"}</span>
                {f.rate && <span>· {f.rate}</span>}
                <span>· {f.category}</span>
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {f.skills.map((s) => (
                  <span key={s} className="rounded-full bg-brand-tint px-3 py-1 text-xs font-medium text-brand-dark">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <a
              href="#contact"
              className="btn-shimmer rounded-full bg-gradient-to-r from-brand to-brand-dark px-8 py-3.5 font-semibold text-white shadow-lg shadow-brand/30 transition hover:-translate-y-0.5"
            >
              Get in touch
            </a>
          </div>
        </div>
      </section>

      <main className="flex-1 px-4 py-10">
        <div className="mx-auto grid max-w-5xl items-start gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <article className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5">
              <h2 className="font-heading text-xl font-medium text-ink">About {firstName}</h2>
              <p className="mt-3 leading-relaxed text-ink/80">{f.bio}</p>
            </article>

            {portfolio.length > 0 && (
              <section>
                <h2 className="font-heading text-2xl font-medium tracking-tight text-ink">
                  Portfolio
                </h2>
                <p className="mt-1 text-sm text-muted">Recent work, in {firstName}&apos;s own words.</p>
                <div className="mt-5 space-y-6">
                  {portfolio.map((item, i) => (
                    <Reveal key={item.id} delay={i * 100}>
                      <figure className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
                        {item.url.startsWith("/") ? (
                          <Image
                            src={item.url}
                            alt={item.caption}
                            width={1200}
                            height={800}
                            className="max-h-[480px] w-full object-cover"
                          />
                        ) : (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img src={item.url} alt={item.caption} className="max-h-[480px] w-full object-cover" />
                        )}
                        <figcaption className="px-6 py-4 text-sm text-muted italic">
                          “{item.caption}”
                        </figcaption>
                      </figure>
                    </Reveal>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24">
            <div id="contact" className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h2 className="font-heading text-lg font-medium text-ink">
                Work with {firstName}
              </h2>
              <p className="mt-1 mb-4 text-sm text-muted">
                Goes straight to their inbox — no middleman, no commission.
              </p>
              <ProfileInquiry freelancerId={f.id} firstName={firstName} />
            </div>
            <div className="rounded-2xl bg-ink p-6 text-white">
              <p className="font-heading text-lg font-medium">Have a craft of your own?</p>
              <p className="mt-1 text-sm text-white/70">
                List it for $20/mo — 0% commission, cancel anytime.
              </p>
              <Link
                href="/freelance#join"
                className="mt-3 inline-block rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
              >
                Join the marketplace
              </Link>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
