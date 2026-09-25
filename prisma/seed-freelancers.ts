import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

const freelancers = [
  {
    name: "Teresa Okafor",
    email: "teresa.okafor@example.org",
    craft: "Sacred Music Director & Cantor",
    category: "Music & Liturgy",
    city: "Cincinnati",
    state: "OH",
    rate: "$150–$300 / liturgy",
    bio: "Twenty years leading choirs and chant scholas. Available for weddings, funerals, parish missions, and interim music-director coverage while you search.",
    skills: ["Gregorian chant", "Organ", "Choir direction", "Wedding & funeral liturgies"],
    featured: true,
  },
  {
    name: "Miguel Herrera",
    email: "miguel.herrera@example.org",
    craft: "Sacred Artist & Muralist",
    category: "Art & Architecture",
    city: "San Antonio",
    state: "TX",
    rate: "By commission",
    bio: "Murals, icons, and Stations of the Cross for churches and schools. Recent work includes a 40-foot apse mural and a full icon cycle for a Newman Center chapel.",
    skills: ["Murals", "Iconography", "Church restoration", "Liturgical design consulting"],
    featured: true,
  },
  {
    name: "Claire Dubois",
    email: "claire.dubois@example.org",
    craft: "Grant Writer for Catholic Nonprofits",
    category: "Development & Fundraising",
    city: "Remote",
    state: null,
    rate: "$85 / hr",
    bio: "Raised $4.2M for Catholic schools, pregnancy centers, and religious communities. I write the big ask so your team can keep doing the work.",
    skills: ["Foundation grants", "Case statements", "Capital campaigns", "Donor reports"],
    featured: true,
  },
  {
    name: "John Paul Reyes",
    email: "jp.reyes@example.org",
    craft: "Parish Web Designer & Developer",
    category: "Digital & Media",
    city: "Remote",
    state: null,
    rate: "$2,500 flat / parish site",
    bio: "Fast, beautiful parish and school websites with Mass times that are actually current. Two-week turnaround, staff training included.",
    skills: ["Web design", "Online giving setup", "SEO", "Staff training"],
  },
  {
    name: "Anna Kowalski",
    email: "anna.kowalski@example.org",
    craft: "Retreat Speaker & Youth Evangelist",
    category: "Ministry & Speaking",
    city: "Chicago",
    state: "IL",
    rate: "$800 / day + travel",
    bio: "Confirmation retreats, Kairos talks, parent nights. Ten years in youth ministry, now bringing retreats to parishes that don't have a youth minister.",
    skills: ["Confirmation retreats", "Keynotes", "Small-group training", "Parent formation"],
  },
  {
    name: "David Nguyen",
    email: "david.nguyen@example.org",
    craft: "Livestream & AV Technician",
    category: "Digital & Media",
    city: "Orange County",
    state: "CA",
    rate: "$65 / hr",
    bio: "Mass livestreams that don't cut out at the consecration. Camera installs, sound-board rescue, and volunteer crew training for parishes of any size.",
    skills: ["Livestream setup", "Sound systems", "Video editing", "Volunteer training"],
  },
  {
    name: "Maggie Sullivan",
    email: "maggie.sullivan@example.org",
    craft: "Bookkeeper for Parishes & Schools",
    category: "Finance & Admin",
    city: "Remote",
    state: null,
    rate: "$550 / mo",
    bio: "Diocesan-compliant books, clean audits, on-time reports. I handle the ledgers for eleven parishes so pastors can pastor.",
    skills: ["QuickBooks", "Diocesan reporting", "Payroll", "Audit prep"],
  },
  {
    name: "Br. Thomas Eckert",
    email: "thomas.eckert@example.org",
    craft: "Latin & Theology Tutor",
    category: "Education & Tutoring",
    city: "Remote",
    state: null,
    rate: "$45 / hr",
    bio: "Ecclesiastical Latin from zero to reading the Vulgate. Homeschool co-ops, seminary prep, and adult learners welcome.",
    skills: ["Ecclesiastical Latin", "Classical curriculum", "Seminary prep", "Homeschool co-ops"],
  },
  {
    name: "Sofia Marchetti",
    email: "sofia.marchetti@example.org",
    craft: "Catholic Copywriter & Editor",
    category: "Digital & Media",
    city: "Denver",
    state: "CO",
    rate: "$70 / hr",
    bio: "Appeal letters, bulletin rescues, book edits, and campaign copy that sounds like the Church at her best — clear, warm, and true.",
    skills: ["Appeal letters", "Editing", "Email campaigns", "Brand voice"],
  },
];

async function main() {
  for (const f of freelancers) {
    await prisma.freelancer.upsert({
      where: { email: f.email },
      create: f,
      update: f,
    });
  }
  console.log(`Seeded ${freelancers.length} freelancers.`);
}

main().finally(() => prisma.$disconnect());
