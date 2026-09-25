import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import data from "./data/cj-prospects.json";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

async function main() {
  for (const row of data) {
    await prisma.prospect.upsert({
      where: { name_source: { name: row.employer, source: "catholicjobs.com" } },
      create: {
        name: row.employer,
        orgType: row.type || null,
        location: row.location || null,
        state: row.state === "—" ? null : row.state || null,
        contact: row.contact || null,
        email: row.email || null,
        domain: row.domain || null,
        roles: row.roles || null,
        jobCount: row.count ?? 1,
      },
      update: {
        contact: row.contact || null,
        email: row.email || null,
        domain: row.domain || null,
        roles: row.roles || null,
        jobCount: row.count ?? 1,
      },
    });
  }
  console.log(`Seeded ${data.length} prospects.`);
}

main().finally(() => prisma.$disconnect());
