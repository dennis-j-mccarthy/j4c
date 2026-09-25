import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const craft = String(body.craft ?? "").trim();
  const category = String(body.category ?? "").trim();
  const city = String(body.city ?? "").trim();
  const rate = String(body.rate ?? "").trim();
  const bio = String(body.bio ?? "").trim().slice(0, 1200);
  const skills = Array.isArray(body.skills)
    ? body.skills.map(String).map((s: string) => s.trim()).filter(Boolean).slice(0, 8)
    : [];

  if (!name) return NextResponse.json({ error: "Enter your name." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  if (!craft) return NextResponse.json({ error: "Name your craft — what do you do?" }, { status: 400 });
  if (!bio) return NextResponse.json({ error: "Add a short pitch so people know what you offer." }, { status: 400 });

  const freelancer = await prisma.freelancer.upsert({
    where: { email },
    create: { name, email, craft, category: category || "Other", city: city || null, rate: rate || null, bio, skills },
    update: { name, craft, category: category || "Other", city: city || null, rate: rate || null, bio, skills },
  });

  return NextResponse.json({ ok: true, id: freelancer.id });
}
