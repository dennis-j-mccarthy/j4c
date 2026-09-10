import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.article.findUnique({ where: { slug } });
  if (!article) return { title: "Article Not Found — Jobs For Catholics" };
  return {
    title: `${article.title} — Jobs For Catholics`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({ where: { slug } });
  if (!article) notFound();

  const related = await prisma.article.findMany({
    where: { category: article.category, id: { not: article.id } },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-4 py-12">
          <Link
            href={`/blog?cat=${encodeURIComponent(article.category)}`}
            className="text-xs font-semibold tracking-[0.25em] text-brand-dark uppercase hover:underline"
          >
            {article.category}
          </Link>
          <h1 className="mt-3 font-heading text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-4 text-sm text-muted">
            {article.publishedAt.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}{" "}
            · Jobs For Catholics
          </p>

          <div className="relative mt-8 aspect-[2/1] overflow-hidden rounded-3xl">
            <Image
              src={article.image}
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="mt-10 space-y-5 text-lg leading-relaxed whitespace-pre-line text-ink/85">
            {article.body}
          </div>

          <div className="mt-12 rounded-2xl bg-brand-tint p-8 text-center">
            <p className="font-heading text-xl font-medium text-ink">
              Ready to put this to work?
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link
                href="/search"
                className="rounded-full bg-brand px-6 py-3 font-semibold text-white shadow-md shadow-brand/30 transition hover:bg-brand-dark"
              >
                Browse Jobs
              </Link>
              <Link
                href="/registerseeker"
                className="rounded-full border border-brand px-6 py-3 font-semibold text-brand-dark transition hover:bg-brand hover:text-white"
              >
                Create a Free Profile
              </Link>
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <section className="border-t border-black/5 bg-slate-50 px-4 py-12">
            <div className="mx-auto max-w-5xl">
              <h2 className="font-heading text-2xl font-medium text-ink">
                More on {article.category}
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                {related.map((a) => (
                  <Link
                    key={a.id}
                    href={`/blog/${a.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition duration-200 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="relative h-36">
                      <Image src={a.image} alt="" fill className="object-cover" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-heading leading-snug font-medium text-ink group-hover:text-brand-dark">
                        {a.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
