import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { EMPLOYER_COOKIE, employerCookieOptions } from "@/lib/employer";

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

  // Registration only ever creates. Joining or claiming an existing
  // organization would hand over its applicant list, so that goes through
  // sign-in (or support), never through this form.
  const slug = slugify(orgName);
  const [existingCompany, existingUser] = await Promise.all([
    prisma.company.findUnique({ where: { slug }, select: { id: true } }),
    prisma.user.findUnique({ where: { email }, select: { id: true } }),
  ]);
  if (existingUser) {
    return NextResponse.json(
      { error: "That email already has an account. Sign in instead." },
      { status: 409 },
    );
  }
  if (existingCompany) {
    return NextResponse.json(
      {
        error:
          "That organization is already registered. Sign in with the email on file, or contact us to be added.",
      },
      { status: 409 },
    );
  }

  const company = await prisma.company.create({ data: { slug, ...companyData } });
  const user = await prisma.user.create({
    data: { email, name: contactName, role: "EMPLOYER", companyId: company.id },
  });

  const res = NextResponse.json({ ok: true, companySlug: slug });
  res.cookies.set(EMPLOYER_COOKIE, user.id, employerCookieOptions);
  return res;
}
