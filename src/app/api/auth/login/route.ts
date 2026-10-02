import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { EMPLOYER_COOKIE, employerCookieOptions } from "@/lib/employer";

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
  const isEmployer = user?.role === "EMPLOYER" && !!user.companyId;

  if (!user || (!user.profile && !isEmployer)) {
    return NextResponse.json(
      { error: "No account found for that email. Create a profile first." },
      { status: 404 },
    );
  }

  // device sign-in until magic-link auth lands (punch list a1)
  const res = NextResponse.json({
    ok: true,
    name: user.name,
    redirect: isEmployer ? "/employer/dashboard" : "/dashboard",
  });
  if (user.profile) {
    res.cookies.set("jfc_candidate", user.profile.id, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }
  if (isEmployer) {
    res.cookies.set(EMPLOYER_COOKIE, user.id, employerCookieOptions);
  }
  return res;
}
