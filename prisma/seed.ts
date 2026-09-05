import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

async function main() {
  const companies = [
    {
      slug: "st-joseph-classical-academy",
      name: "St. Joseph Classical Academy",
      location: "Naples, FL",
      website: "https://example.org",
      about: "A K-12 classical school in the Catholic tradition.",
    },
    {
      slug: "diocese-of-venice",
      name: "Diocese of Venice",
      location: "Venice, FL",
      website: "https://example.org",
      about: "Serving parishes, schools, and ministries across southwest Florida.",
    },
    {
      slug: "ave-maria-parish",
      name: "Ave Maria Parish",
      location: "Ave Maria, FL",
      website: "https://example.org",
      about: "A vibrant parish community in the heart of Ave Maria.",
    },
  ];

  for (const c of companies) {
    await prisma.company.upsert({
      where: { slug: c.slug },
      update: c,
      create: c,
    });
  }

  const jobs = [
    {
      slug: "theology-teacher-st-joseph",
      companySlug: "st-joseph-classical-academy",
      title: "High School Theology Teacher",
      description:
        "Teach upper-school theology rooted in the Catechism and the classical tradition. Practicing Catholic in good standing required.",
      location: "Naples, FL",
      type: "FULL_TIME",
      workMode: "ONSITE",
      category: "Education",
      salaryMin: 48000,
      salaryMax: 62000,
      featured: true,
    },
    {
      slug: "communications-director-diocese",
      companySlug: "diocese-of-venice",
      title: "Director of Communications",
      description:
        "Lead diocesan communications: press, social media, and parish outreach across 60+ parishes.",
      location: "Venice, FL",
      type: "FULL_TIME",
      workMode: "HYBRID",
      category: "Communications",
      salaryMin: 70000,
      salaryMax: 90000,
      featured: true,
    },
    {
      slug: "youth-minister-ave-maria",
      companySlug: "ave-maria-parish",
      title: "Youth Minister",
      description:
        "Build and shepherd middle- and high-school youth ministry programs, retreats, and service projects.",
      location: "Ave Maria, FL",
      type: "PART_TIME",
      workMode: "ONSITE",
      category: "Ministry",
    },
  ] as const;

  for (const j of jobs) {
    const { companySlug, ...data } = j;
    const company = await prisma.company.findUniqueOrThrow({
      where: { slug: companySlug },
    });
    await prisma.job.upsert({
      where: { slug: j.slug },
      update: { ...data, companyId: company.id },
      create: {
        ...data,
        companyId: company.id,
        status: "PUBLISHED",
        postedAt: new Date(),
      },
    });
  }

  // punch-list items already shipped before the DB existed
  const shipped = ["f1", "f2", "f3", "f4", "f5", "f6", "f7"];
  for (const id of shipped) {
    await prisma.punchItem.upsert({
      where: { id },
      update: { done: true },
      create: { id, done: true },
    });
  }

  console.log("Seeded", companies.length, "companies and", jobs.length, "jobs");
}

main().finally(() => prisma.$disconnect());
