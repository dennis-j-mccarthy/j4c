import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const topic = String(body.topic ?? "").trim();
  const message = String(body.message ?? "").trim().slice(0, 4000);

  if (!name) return NextResponse.json({ error: "Enter your name." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  if (!message) return NextResponse.json({ error: "Enter a message." }, { status: 400 });

  await prisma.contactMessage.create({
    data: { name, email, topic: topic || null, message },
  });

  return NextResponse.json({ ok: true });
}
