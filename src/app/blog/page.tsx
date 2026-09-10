import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog — Jobs For Catholics",
  description:
    "Tactical career advice and essays on mission fit, meaning at work, and hiring for the Catholic community.",
};

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const cat = typeof params.cat === "string" ? params.cat : "";

  const [articles, categories] = await Promise.all([
    prisma.article.findMany({
      where: cat ? { category: cat } : undefined,
      orderBy: { publishedAt: "desc" },
    }),
    prisma.article.findMany({
      select: { category: true },
      distinct: ["category"],
      orderBy: { category: "asc" },
    }),
  ]);

  const [featured, ...rest] = articles;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />

      <section className="border-b border-black/5 bg-white px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.3em] text-brand-dark uppercase">
            Career Resources
          </p>
          <h1 className="mt-2 font-heading text-4xl font-medium tracking-tight text-ink">
            Work worth reading about.
          </h1>
          <p className="mt-3 max-w-2xl text-muted">
            Tactical advice for landing the right role — and essays on mission,
            meaning, and how faithful candidates and employers find each other.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href="/blog"
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                !cat
                  ? "bg-brand text-white shadow-sm shadow-brand/30"
                  : "bg-slate-100 text-ink hover:bg-brand-tint hover:text-brand-dark"
              }`}
            >
              All
            </Link>
            {categories.map((c) => (
              <Link
                key={c.category}
                href={`/blog?cat=${encodeURIComponent(c.category)}`}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  cat === c.category
                    ? "bg-brand text-white shadow-sm shadow-brand/30"
                    : "bg-slate-100 text-ink hover:bg-brand-tint hover:text-brand-dark"
                }`}
              >
                {c.category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <main className="flex-1 px-4 py-12">
        <div className="mx-auto max-w-6xl">
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-xl lg:grid-cols-2"
            >
              <div className="relative min-h-64">
                <Image
                  src={featured.image}
                  alt=""
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-10">
                <p className="text-xs font-semibold tracking-[0.25em] text-brand-dark uppercase">
                  {featured.category}
                </p>
                <h2 className="mt-3 font-heading text-2xl font-medium text-ink group-hover:text-brand-dark sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 leading-relaxed text-muted">
                  {featured.excerpt}
                </p>
                <p className="mt-5 text-sm text-muted">
                  {formatDate(featured.publishedAt)}
                </p>
              </div>
            </Link>
          )}

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => (
              <Link
                key={a.id}
                href={`/blog/${a.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-44">
                  <Image
                    src={a.image}
                    alt=""
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[11px] font-semibold tracking-[0.2em] text-brand-dark uppercase">
                    {a.category}
                  </p>
                  <h2 className="mt-2 font-heading text-lg leading-snug font-medium text-ink group-hover:text-brand-dark">
                    {a.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm text-muted">
                    {a.excerpt}
                  </p>
                  <p className="mt-auto pt-4 text-xs text-muted">
                    {formatDate(a.publishedAt)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
