import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const BASE = "https://jfc-tau.vercel.app";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [jobs, articles] = await Promise.all([
    prisma.job.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true, updatedAt: true },
    }),
    prisma.article.findMany({ select: { slug: true, publishedAt: true } }),
  ]);

  const statics: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/search`, changeFrequency: "hourly", priority: 0.9 },
    { url: `${BASE}/blog`, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE}/registerseeker`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/employer/register`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/employer/post`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/resume`, changeFrequency: "monthly", priority: 0.6 },
  ];

  return [
    ...statics,
    ...jobs.map((j) => ({
      url: `${BASE}/jobs/${j.slug}`,
      lastModified: j.updatedAt,
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
    ...articles.map((a) => ({
      url: `${BASE}/blog/${a.slug}`,
      lastModified: a.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
