import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

const companies = [
  {
    slug: "st-clare-of-assisi-catholic-school",
    name: "St. Clare of Assisi Catholic School",
    logoUrl: "/brand/employers/qlv9.png",
    location: "Naples, FL",
    about:
      "A growing K-12 classical academy in the Catholic tradition. Believe in a higher standard.",
  },
  {
    slug: "franciscan-university-of-steubenville",
    name: "Franciscan University of Steubenville",
    logoUrl: "/brand/employers/felq.jpg",
    location: "Steubenville, OH",
    about:
      "A passionately Catholic university educating, evangelizing, and sending forth joyful disciples.",
  },
  {
    slug: "regina-coeli-parish",
    name: "Regina Coeli Parish",
    logoUrl: "/brand/employers/wt86.webp",
    location: "Abilene, TX",
    about: "A vibrant parish family serving the Abilene community.",
  },
  {
    slug: "legacy-of-life-foundation",
    name: "Legacy of Life Foundation",
    logoUrl: "/brand/employers/8enr.png",
    location: "Philadelphia, PA",
    about:
      "Serving women and families facing unexpected pregnancies with love and practical support.",
  },
  {
    slug: "sol-recruiting",
    name: "Sól Recruiting",
    logoUrl: "/brand/employers/klqe.webp",
    location: "Remote",
    about:
      "Recruiting, coaching, and consulting for mission-driven Catholic organizations.",
  },
  {
    slug: "holy-land-wood-and-stone",
    name: "Holy Land Wood & Stone",
    logoUrl: "/brand/employers/fz9n.webp",
    location: "Remote",
    about:
      "Handcrafted olive-wood and stone devotional goods from artisans in the Holy Land.",
  },
];

const jobs = [
  {
    slug: "high-school-theology-teacher-st-clare",
    companySlug: "st-clare-of-assisi-catholic-school",
    title: "High School Theology Teacher",
    description: `Teach upper-school theology rooted in the Catechism at a growing K-12 classical academy.

You will guide juniors and seniors through moral theology, Church history, and apologetics, preparing them to articulate and live their faith with confidence. Practicing Catholic in good standing required.

What you'll do:
• Teach five sections of upper-school theology
• Lead the senior capstone on faith and reason
• Serve as a spiritual mentor within the house system
• Collaborate with the chaplaincy on retreats and liturgies

What we're looking for:
• Bachelor's in theology or related field (Master's preferred)
• Classroom experience and a heart for teenagers
• Fidelity to the Magisterium`,
    location: "Naples, FL",
    workMode: "ONSITE",
    type: "FULL_TIME",
    category: "Education",
    salaryMin: 48000,
    salaryMax: 62000,
    featured: true,
  },
  {
    slug: "admissions-counselor-franciscan",
    companySlug: "franciscan-university-of-steubenville",
    title: "Admissions Counselor",
    description: `Guide prospective students and families through the admissions journey at a faithfully Catholic university.

As the first voice many families hear, you'll represent the university's mission at fairs, on calls, and during campus visits, and shepherd applicants from inquiry to enrollment.

What you'll do:
• Manage a regional recruitment territory and travel schedule
• Counsel students and families on admissions and aid
• Represent the university at high schools and parishes
• Track your pipeline in the CRM and hit enrollment goals

What we're looking for:
• Bachelor's degree and a love for Catholic higher education
• Strong public speaking and follow-through
• Willingness to travel in fall and spring seasons`,
    location: "Steubenville, OH",
    workMode: "ONSITE",
    type: "FULL_TIME",
    category: "Higher Ed",
    salaryMin: 52000,
    salaryMax: 64000,
    featured: true,
  },
  {
    slug: "youth-minister-regina-coeli",
    companySlug: "regina-coeli-parish",
    title: "Youth Minister",
    description: `Build and shepherd middle- and high-school youth programs, retreats, and service projects.

Regina Coeli's young church is growing. You'll create a culture where teens encounter Christ through weekly youth nights, sacramental prep support, summer mission trips, and genuine friendship.

What you'll do:
• Plan and lead weekly middle- and high-school youth nights
• Organize two retreats and one mission trip per year
• Recruit, train, and safeguard adult volunteers
• Partner with families and the parish school

What we're looking for:
• Practicing Catholic with youth ministry experience
• Safe-environment certification (or willingness to obtain)
• Part-time, roughly 25 hours/week including evenings`,
    location: "Abilene, TX",
    workMode: "ONSITE",
    type: "PART_TIME",
    category: "Ministry",
    salaryMin: 24,
    salaryMax: 30,
    featured: false,
  },
  {
    slug: "development-director-legacy-of-life",
    companySlug: "legacy-of-life-foundation",
    title: "Development Director",
    description: `Lead fundraising strategy and donor relationships for a foundation serving women and families.

You'll own the annual development plan — major gifts, events, grants, and digital campaigns — and build the relationships that keep our centers serving mothers in need.

What you'll do:
• Manage and grow a portfolio of major donors
• Run the annual gala and two regional events
• Direct grant writing and reporting
• Lead a coordinator and a communications associate

What we're looking for:
• 5+ years in nonprofit development with a track record of growth
• Comfort making the ask and stewarding relationships
• Passion for the pro-life mission`,
    location: "Philadelphia, PA",
    workMode: "HYBRID",
    type: "FULL_TIME",
    category: "Nonprofit",
    salaryMin: 85000,
    salaryMax: 105000,
    featured: false,
  },
  {
    slug: "executive-recruiter-sol",
    companySlug: "sol-recruiting",
    title: "Executive Recruiter",
    description: `Place mission-aligned leaders with Catholic organizations nationwide. Fully remote.

Sól partners with dioceses, schools, and apostolates to find leaders who fit both the role and the mission. You'll run searches end to end — sourcing, screening, and advising clients through the hire.

What you'll do:
• Manage 4-6 concurrent executive searches
• Source candidates through networks and outreach
• Advise clients on comp, structure, and fit
• Build long-term relationships across the Catholic world

What we're looking for:
• Recruiting or executive search experience
• Deep familiarity with Catholic institutions
• Contract role with performance upside`,
    location: "Remote",
    workMode: "REMOTE",
    type: "CONTRACT",
    category: "Recruiting",
    salaryMin: 60,
    salaryMax: 85,
    featured: false,
  },
  {
    slug: "ecommerce-manager-holy-land",
    companySlug: "holy-land-wood-and-stone",
    title: "E-Commerce Manager",
    description: `Grow the online storefront for handcrafted olive-wood goods from the Holy Land.

Every sale supports Christian artisan families in Bethlehem. You'll own the store end to end — merchandising, campaigns, email, and marketplace channels.

What you'll do:
• Run the Shopify storefront and product catalog
• Plan seasonal campaigns (Advent and Easter are our Super Bowl)
• Grow email and social channels
• Coordinate fulfillment with our stateside warehouse

What we're looking for:
• E-commerce experience with measurable results
• Sharp copy instincts and basic design chops
• Freelance engagement, remote, flexible hours`,
    location: "Remote",
    workMode: "REMOTE",
    type: "FREELANCE" as never,
    category: "Marketing",
    salaryMin: 400,
    salaryMax: 900,
    featured: false,
  },
];

type ExtraJob = {
  slug: string;
  companySlug: string;
  title: string;
  summary: string;
  bullets: string[];
  location: string;
  workMode: "ONSITE" | "HYBRID" | "REMOTE";
  type: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "TEMPORARY" | "INTERNSHIP" | "VOLUNTEER";
  category: string;
  salaryMin?: number;
  salaryMax?: number;
  featured?: boolean;
  daysAgo: number;
};

const extraJobs: ExtraJob[] = [
  // St. Clare of Assisi Catholic School
  { slug: "middle-school-math-teacher-st-clare", companySlug: "st-clare-of-assisi-catholic-school", title: "Middle School Math Teacher", summary: "Teach pre-algebra and algebra to grades 6-8 in a joyful classical classroom.", bullets: ["Four sections plus one elective", "Weekly house-system duties", "Practicing Catholic preferred"], location: "Naples, FL", workMode: "ONSITE", type: "FULL_TIME", category: "Education", salaryMin: 44000, salaryMax: 56000, daysAgo: 3 },
  { slug: "second-grade-teacher-st-clare", companySlug: "st-clare-of-assisi-catholic-school", title: "2nd Grade Teacher", summary: "Shepherd our youngest scholars through phonics, arithmetic, and First Communion year.", bullets: ["Self-contained classroom of 18", "Aide support every morning", "Sacramental prep in partnership with the parish"], location: "Naples, FL", workMode: "ONSITE", type: "FULL_TIME", category: "Education", salaryMin: 42000, salaryMax: 52000, daysAgo: 9 },
  { slug: "athletic-director-st-clare", companySlug: "st-clare-of-assisi-catholic-school", title: "Athletic Director", summary: "Build a virtuous athletics program across 12 middle and high school teams.", bullets: ["Hire and form coaches", "Schedule seasons and transport", "Teach two PE sections"], location: "Naples, FL", workMode: "ONSITE", type: "FULL_TIME", category: "Education", salaryMin: 50000, salaryMax: 65000, daysAgo: 15 },
  { slug: "school-counselor-st-clare", companySlug: "st-clare-of-assisi-catholic-school", title: "School Counselor", summary: "Support student formation with counsel rooted in a Catholic understanding of the person.", bullets: ["K-12 caseload with upper-school focus", "College guidance for juniors and seniors", "Licensure required"], location: "Naples, FL", workMode: "ONSITE", type: "PART_TIME", category: "Education", salaryMin: 28, salaryMax: 38, daysAgo: 21 },
  // Franciscan University
  { slug: "campus-minister-franciscan", companySlug: "franciscan-university-of-steubenville", title: "Campus Minister", summary: "Walk with students in households, retreats, and mission trips at a passionately Catholic university.", bullets: ["Lead two household chaplaincies", "Coordinate fall and spring retreats", "M.A. in theology or ministry preferred"], location: "Steubenville, OH", workMode: "ONSITE", type: "FULL_TIME", category: "Ministry", salaryMin: 42000, salaryMax: 52000, featured: true, daysAgo: 2 },
  { slug: "financial-aid-advisor-franciscan", companySlug: "franciscan-university-of-steubenville", title: "Financial Aid Advisor", summary: "Help families say yes to Catholic higher education by navigating aid, grants, and scholarships.", bullets: ["Counsel 400+ families annually", "Federal aid compliance", "Detail-oriented service heart"], location: "Steubenville, OH", workMode: "HYBRID", type: "FULL_TIME", category: "Higher Ed", salaryMin: 45000, salaryMax: 55000, daysAgo: 6 },
  { slug: "assistant-professor-philosophy-franciscan", companySlug: "franciscan-university-of-steubenville", title: "Assistant Professor of Philosophy", summary: "Tenure-track appointment teaching undergraduate philosophy in the Catholic intellectual tradition.", bullets: ["3/3 teaching load", "Ph.D. in hand by August", "Oath of fidelity required"], location: "Steubenville, OH", workMode: "ONSITE", type: "FULL_TIME", category: "Higher Ed", salaryMin: 62000, salaryMax: 78000, daysAgo: 12 },
  { slug: "residence-director-franciscan", companySlug: "franciscan-university-of-steubenville", title: "Residence Director", summary: "Live-in leadership for a 300-bed residence hall; form students in community and virtue.", bullets: ["Housing and meal plan included", "Supervise 8 RAs", "On-call rotation"], location: "Steubenville, OH", workMode: "ONSITE", type: "FULL_TIME", category: "Higher Ed", salaryMin: 38000, salaryMax: 44000, daysAgo: 18 },
  { slug: "content-writer-franciscan", companySlug: "franciscan-university-of-steubenville", title: "Marketing Content Writer", summary: "Tell the university's story across web, email, and print with clarity and fidelity.", bullets: ["3+ writing samples required", "SEO fundamentals", "Hybrid schedule"], location: "Steubenville, OH", workMode: "HYBRID", type: "FULL_TIME", category: "Communications", salaryMin: 48000, salaryMax: 58000, daysAgo: 25 },
  // Regina Coeli Parish
  { slug: "director-of-music-regina-coeli", companySlug: "regina-coeli-parish", title: "Director of Sacred Music", summary: "Lead choirs, cantors, and organists in reverent liturgy across four weekend Masses.", bullets: ["Proficient organist required", "Direct adult and youth choirs", "Weddings and funerals stipended separately"], location: "Abilene, TX", workMode: "ONSITE", type: "FULL_TIME", category: "Music & Liturgy", salaryMin: 46000, salaryMax: 58000, featured: true, daysAgo: 4 },
  { slug: "parish-secretary-regina-coeli", companySlug: "regina-coeli-parish", title: "Parish Secretary", summary: "Be the welcoming first face of the parish office — scheduling, records, and hospitality.", bullets: ["Sacramental records management", "Bilingual English/Spanish a plus", "M-F daytime hours"], location: "Abilene, TX", workMode: "ONSITE", type: "FULL_TIME", category: "Administration", salaryMin: 34000, salaryMax: 40000, daysAgo: 8 },
  { slug: "maintenance-technician-regina-coeli", companySlug: "regina-coeli-parish", title: "Maintenance Technician", summary: "Keep the church, school, and grounds beautiful and functioning.", bullets: ["HVAC and light electrical", "Event setup and teardown", "Some weekend availability"], location: "Abilene, TX", workMode: "ONSITE", type: "PART_TIME", category: "Trades", salaryMin: 18, salaryMax: 24, daysAgo: 14 },
  { slug: "dre-regina-coeli", companySlug: "regina-coeli-parish", title: "Director of Religious Education", summary: "Form 300+ children and their families in the faith from First Reconciliation through Confirmation.", bullets: ["Recruit and train catechists", "Family catechesis model", "Master's in theology preferred"], location: "Abilene, TX", workMode: "ONSITE", type: "FULL_TIME", category: "Ministry", salaryMin: 44000, salaryMax: 54000, daysAgo: 19 },
  // Legacy of Life Foundation
  { slug: "center-director-legacy-of-life", companySlug: "legacy-of-life-foundation", title: "Center Director — Bucks County", summary: "Lead daily operations, staff, and client care at our busiest women's center.", bullets: ["Manage staff of 6 plus volunteers", "Own center KPIs and reporting", "Nursing or social work background a plus"], location: "Bristol, PA", workMode: "ONSITE", type: "FULL_TIME", category: "Nonprofit", salaryMin: 60000, salaryMax: 75000, daysAgo: 5 },
  { slug: "client-advocate-legacy-of-life", companySlug: "legacy-of-life-foundation", title: "Client Advocate", summary: "Meet women at the door with compassion; walk with them through resources and options.", bullets: ["Direct client counseling", "Resource navigation and follow-up", "Training provided"], location: "Philadelphia, PA", workMode: "ONSITE", type: "PART_TIME", category: "Nonprofit", salaryMin: 20, salaryMax: 26, daysAgo: 11 },
  { slug: "grant-writer-legacy-of-life", companySlug: "legacy-of-life-foundation", title: "Grant Writer", summary: "Win the funding that keeps our centers open — foundations, government, and corporate.", bullets: ["Portfolio of 40+ annual submissions", "Fully remote with quarterly on-sites", "3+ years grant experience"], location: "Remote", workMode: "REMOTE", type: "CONTRACT", category: "Nonprofit", salaryMin: 45, salaryMax: 65, daysAgo: 16 },
  { slug: "social-media-coordinator-legacy", companySlug: "legacy-of-life-foundation", title: "Social Media Coordinator", summary: "Grow our digital voice with stories of hope that move donors and reach women in need.", bullets: ["Own IG, FB, and TikTok calendars", "Light graphic design", "Portfolio required"], location: "Philadelphia, PA", workMode: "HYBRID", type: "PART_TIME", category: "Communications", salaryMin: 22, salaryMax: 28, daysAgo: 23 },
  // Sól Recruiting
  { slug: "talent-sourcer-sol", companySlug: "sol-recruiting", title: "Talent Sourcer", summary: "Feed our executive searches with well-researched, mission-aligned candidate pipelines.", bullets: ["Boolean and network sourcing", "10-15 flexible hours weekly", "Fully remote"], location: "Remote", workMode: "REMOTE", type: "PART_TIME", category: "Recruiting", salaryMin: 25, salaryMax: 35, daysAgo: 7 },
  { slug: "hr-consultant-sol", companySlug: "sol-recruiting", title: "HR Consultant — Catholic Organizations", summary: "Advise parishes and schools on handbooks, hiring, and healthy workplace culture.", bullets: ["Project-based engagements", "SHRM or SPHR preferred", "Set your own schedule"], location: "Remote", workMode: "REMOTE", type: "CONTRACT", category: "Recruiting", salaryMin: 70, salaryMax: 95, daysAgo: 13 },
  // Holy Land Wood & Stone
  { slug: "customer-care-holy-land", companySlug: "holy-land-wood-and-stone", title: "Customer Care Specialist", summary: "Delight customers by email and phone; every order supports Bethlehem artisan families.", bullets: ["20 hrs/week, seasonal surge at Advent", "Shopify and Gorgias", "Warm written voice"], location: "Remote", workMode: "REMOTE", type: "PART_TIME", category: "Sales & Marketing", salaryMin: 17, salaryMax: 21, daysAgo: 10 },
  { slug: "wholesale-account-manager-holy-land", companySlug: "holy-land-wood-and-stone", title: "Wholesale Account Manager", summary: "Grow our parish gift shop and Catholic bookstore wholesale channel nationwide.", bullets: ["Manage 120 existing accounts", "Trade show travel 4x/year", "Commission on growth"], location: "Remote", workMode: "REMOTE", type: "FULL_TIME", category: "Sales & Marketing", salaryMin: 52000, salaryMax: 68000, daysAgo: 20 },
];

async function main() {
  // retire early placeholder companies (cascades their jobs)
  await prisma.company.deleteMany({
    where: {
      slug: {
        in: [
          "st-joseph-classical-academy",
          "diocese-of-venice",
          "ave-maria-parish",
        ],
      },
    },
  });

  for (const c of companies) {
    await prisma.company.upsert({ where: { slug: c.slug }, update: c, create: c });
  }

  for (const j of jobs) {
    const { companySlug, type, workMode, ...data } = j;
    const company = await prisma.company.findUniqueOrThrow({
      where: { slug: companySlug },
    });
    const jobData = {
      ...data,
      type: (type === ("FREELANCE" as never) ? "CONTRACT" : type) as never,
      workMode: workMode as never,
      companyId: company.id,
    };
    await prisma.job.upsert({
      where: { slug: j.slug },
      update: jobData,
      create: { ...jobData, status: "PUBLISHED", postedAt: new Date() },
    });
  }

  for (const j of extraJobs) {
    const company = await prisma.company.findUniqueOrThrow({
      where: { slug: j.companySlug },
    });
    const description = `${j.summary}\n\nWhat you'll do:\n${j.bullets.map((b) => `• ${b}`).join("\n")}`;
    const data = {
      title: j.title,
      description,
      location: j.location,
      workMode: j.workMode,
      type: j.type,
      category: j.category,
      salaryMin: j.salaryMin ?? null,
      salaryMax: j.salaryMax ?? null,
      featured: !!j.featured,
      companyId: company.id,
    };
    await prisma.job.upsert({
      where: { slug: j.slug },
      update: data,
      create: {
        slug: j.slug,
        ...data,
        status: "PUBLISHED",
        postedAt: new Date(Date.now() - j.daysAgo * 86400000),
      },
    });
  }

  // demo applicants with profiles → exercises fit scoring on the applicants view
  const demoApplicants = [
    {
      name: "Maria Alvarez",
      email: "maria.alvarez@example.org",
      profile: {
        desiredTitles: ["Theology Teacher"],
        categories: ["Education"],
        jobTypes: ["FULL_TIME"],
        workModes: ["ONSITE"],
        city: "Naples",
        state: "FL",
        relocate: false,
        headline: "Theology Teacher, 6 years in Catholic schools",
      },
      applyTo: ["high-school-theology-teacher-st-clare"],
      note: "Currently teaching sophomore theology; St. Clare's classical model is exactly where I want to grow.",
    },
    {
      name: "Daniel Murphy",
      email: "daniel.murphy@example.org",
      profile: {
        desiredTitles: ["Youth Minister"],
        categories: ["Ministry"],
        jobTypes: ["PART_TIME"],
        workModes: ["ONSITE"],
        city: "Abilene",
        state: "TX",
        relocate: false,
        headline: "Core team volunteer, 4 years",
      },
      applyTo: ["youth-minister-regina-coeli", "high-school-theology-teacher-st-clare"],
      note: "Been serving on core team at my parish for four years and feel called to make it my work.",
    },
    {
      name: "Grace Nakamura",
      email: "grace.nakamura@example.org",
      profile: {
        desiredTitles: ["Music Director", "Organist"],
        categories: ["Music & Liturgy"],
        jobTypes: ["FULL_TIME"],
        workModes: ["HYBRID"],
        city: "Chicago",
        state: "IL",
        relocate: true,
        headline: "Parish organist and choir director",
      },
      applyTo: ["high-school-theology-teacher-st-clare"],
      note: "Primarily a musician, but open to teaching if there's a path to lead your music program too.",
    },
    {
      name: "Peter Okafor",
      email: "peter.okafor@example.org",
      profile: {
        desiredTitles: ["High School Teacher"],
        categories: ["Education"],
        jobTypes: ["FULL_TIME"],
        workModes: ["ONSITE"],
        city: "Miami",
        state: "FL",
        relocate: true,
        headline: "History teacher, catechist",
      },
      applyTo: ["high-school-theology-teacher-st-clare"],
      note: "History is my subject but theology is my love — happy to relocate to Naples.",
    },
  ];

  for (const d of demoApplicants) {
    const user = await prisma.user.upsert({
      where: { email: d.email },
      update: { name: d.name },
      create: { email: d.email, name: d.name, role: "SEEKER" },
    });
    await prisma.candidateProfile.upsert({
      where: { userId: user.id },
      update: d.profile as never,
      create: { userId: user.id, ...(d.profile as object) } as never,
    });
    for (const jobSlug of d.applyTo) {
      const job = await prisma.job.findUnique({ where: { slug: jobSlug } });
      if (!job) continue;
      await prisma.application.upsert({
        where: { jobId_email: { jobId: job.id, email: d.email } },
        update: {},
        create: { jobId: job.id, name: d.name, email: d.email, coverLetter: d.note },
      });
    }
  }

  // one guest applicant with no profile → shows the "No profile" state
  const guestJob = await prisma.job.findUnique({
    where: { slug: "high-school-theology-teacher-st-clare" },
  });
  if (guestJob) {
    await prisma.application.upsert({
      where: {
        jobId_email: { jobId: guestJob.id, email: "sarah.klein@example.org" },
      },
      update: {},
      create: {
        jobId: guestJob.id,
        name: "Sarah Klein",
        email: "sarah.klein@example.org",
        coverLetter: "Applying after seeing this shared in our parish bulletin.",
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

  console.log("Seeded", companies.length, "companies and", jobs.length + extraJobs.length, "jobs");
}

main().finally(() => prisma.$disconnect());
