import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { TYPE_LABELS, MODE_LABELS } from "@/lib/format";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 70);

export async function POST(request: Request) {
  const body = await request.json();
  const title = String(body.title ?? "").trim();
  const orgName = String(body.orgName ?? "").trim();
  const description = String(body.description ?? "").trim();

  if (!title || !orgName || !description) {
    return NextResponse.json(
      { error: "Title, organization, and description are required" },
      { status: 400 },
    );
  }

  const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : null);
  const num = (v: unknown) => {
    const n = Number(v);
    return Number.isFinite(n) && n > 0 ? Math.round(n) : null;
  };
  const type = TYPE_LABELS[String(body.type)] ? String(body.type) : "FULL_TIME";
  const workMode = MODE_LABELS[String(body.workMode)] ? String(body.workMode) : "ONSITE";

  // attach to an existing company (by slugified name) or create a lightweight one
  const companySlug = slugify(orgName);
  const company = await prisma.company.upsert({
    where: { slug: companySlug },
    update: {},
    create: {
      slug: companySlug,
      name: orgName,
      orgType: str(body.orgType),
      about: str(body.mission),
      location: str(body.location),
    },
  });

  // unique job slug
  const base = slugify(`${title} ${orgName}`);
  let slug = base;
  for (let i = 2; await prisma.job.findUnique({ where: { slug } }); i++) {
    slug = `${base}-${i}`;
  }

  const job = await prisma.job.create({
    data: {
      slug,
      title,
      description: description.slice(0, 8000),
      companyId: company.id,
      location: str(body.location),
      type: type as never,
      workMode: workMode as never,
      category: str(body.category),
      salaryMin: num(body.salaryMin),
      salaryMax: num(body.salaryMax),
      status: "PUBLISHED",
      postedAt: new Date(),
    },
  });

  return NextResponse.json({ ok: true, slug: job.slug });
}
