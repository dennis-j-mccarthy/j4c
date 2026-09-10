import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const email = String(body.email ?? "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email },
    include: { profile: true },
  });
  if (!user?.profile) {
    return NextResponse.json(
      { error: "No candidate profile found for that email. Create one first." },
      { status: 404 },
    );
  }

  const res = NextResponse.json({ ok: true, name: user.name });
  // device sign-in until magic-link auth lands (punch list a1)
  res.cookies.set("jfc_candidate", user.profile.id, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return res;
}
