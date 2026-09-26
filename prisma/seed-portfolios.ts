import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const portfolios: Record<string, { image: string; caption: string }[]> = {
  "miguel.herrera@example.org": [
    { image: "/portfolio/38479727.jpg", caption: "Apse fresco restoration — St. Anthony of Padua, completed over one liturgical year" },
    { image: "/portfolio/24424985.jpg", caption: "Ceiling cycle study for a Newman Center chapel — the commission that started it all" },
    { image: "/portfolio/13009039.jpg", caption: "Stained-glass consultation and repainting of surrounding trim, Our Lady of Sorrows" },
  ],
  "teresa.okafor@example.org": [
    { image: "/portfolio/7520735.jpg", caption: "Directing the festival choir at the diocesan Chrism Mass — 60 voices, 4 parishes" },
    { image: "/portfolio/19130852.jpg", caption: "Youth schola preparing Palestrina for Holy Week" },
    { image: "/portfolio/6647449.jpg", caption: "Guest organist series — recital on the 1928 Casavant at the cathedral" },
  ],
  "jp.reyes@example.org": [
    { image: "/portfolio/6893890.jpg", caption: "Parish site redesign sprint — Mass times above the fold, giving one tap away" },
    { image: "/portfolio/256502.jpg", caption: "Wireframes for a K-8 school admissions flow that doubled inquiry submissions" },
    { image: "/portfolio/4974912.jpg", caption: "Staff training day — every secretary leaves able to update the bulletin herself" },
  ],
  "david.nguyen@example.org": [
    { image: "/portfolio/30396798.jpg", caption: "Three-camera livestream install for Sunday Mass — volunteers run it from an iPad" },
    { image: "/portfolio/28254441.jpg", caption: "On location filming a vocations story for the diocesan appeal" },
    { image: "/portfolio/320617.jpg", caption: "Sound-board rescue: feedback gone, homilies finally heard in the back pews" },
  ],
};

async function main() {
  const all = await prisma.freelancer.findMany();
  for (const f of all) {
    await prisma.freelancer.update({
      where: { id: f.id },
      data: { slug: f.slug ?? slugify(f.name) },
    });
  }
  console.log(`Slugs set for ${all.length} freelancers.`);

  for (const [email, items] of Object.entries(portfolios)) {
    const f = await prisma.freelancer.findUnique({ where: { email } });
    if (!f) continue;
    await prisma.portfolioItem.deleteMany({ where: { freelancerId: f.id } });
    for (let i = 0; i < items.length; i++) {
      await prisma.portfolioItem.create({
        data: { freelancerId: f.id, image: items[i].image, caption: items[i].caption, sort: i },
      });
    }
    console.log(`Portfolio: ${f.name} (${items.length} pieces)`);
  }
}

main().finally(() => prisma.$disconnect());
