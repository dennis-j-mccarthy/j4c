import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const freelancerId = String(body.freelancerId ?? "");
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const message = String(body.message ?? "").trim().slice(0, 2000);

  if (!name) return NextResponse.json({ error: "Enter your name." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  if (!message) return NextResponse.json({ error: "Tell them what you need." }, { status: 400 });

  const freelancer = await prisma.freelancer.findUnique({ where: { id: freelancerId } });
  if (!freelancer) return NextResponse.json({ error: "Freelancer not found." }, { status: 404 });

  await prisma.freelancerInquiry.create({
    data: { freelancerId, name, email, message },
  });

  return NextResponse.json({ ok: true });
}
