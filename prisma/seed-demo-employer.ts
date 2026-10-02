import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

// Demo employer for the stakeholder walkthrough. St. Clare's theology-teacher
// posting already has five applicants, including the demo candidate Maria.
const DEMO = {
  email: "hiring@stclare.example.org",
  name: "Anne Whitaker",
  companySlug: "st-clare-of-assisi-catholic-school",
};

async function main() {
  const company = await prisma.company.findUnique({ where: { slug: DEMO.companySlug } });
  if (!company) throw new Error(`Company ${DEMO.companySlug} not found`);

  await prisma.user.upsert({
    where: { email: DEMO.email },
    update: { name: DEMO.name, role: "EMPLOYER", companyId: company.id },
    create: { email: DEMO.email, name: DEMO.name, role: "EMPLOYER", companyId: company.id },
  });
  console.log(`Demo employer ${DEMO.email} -> ${company.name}`);
}

main().finally(() => prisma.$disconnect());
