import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);

export async function POST(request: Request) {
  const body = await request.json();
  const orgName = String(body.orgName ?? "").trim();
  const contactName = String(body.contactName ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();

  if (!orgName || !contactName) {
    return NextResponse.json({ error: "Organization and contact name required" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : null);
  const location =
    [str(body.city), str(body.state)].filter(Boolean).join(", ") || null;

  const companyData = {
    name: orgName,
    website: str(body.website),
    location,
    about: str(body.about)?.slice(0, 2000) ?? null,
    orgType: str(body.orgType),
    size: str(body.size),
    planInterest: str(body.plan),
    galleryNames: Array.isArray(body.galleryNames)
      ? body.galleryNames.map(String).slice(0, 12)
      : [],
    videoName: str(body.videoName),
  };

  const slug = slugify(orgName);
  const company = await prisma.company.upsert({
    where: { slug },
    update: companyData,
    create: { slug, ...companyData },
  });

  await prisma.user.upsert({
    where: { email },
    update: { name: contactName, role: "EMPLOYER", companyId: company.id },
    create: { email, name: contactName, role: "EMPLOYER", companyId: company.id },
  });

  return NextResponse.json({ ok: true, companySlug: slug });
}
