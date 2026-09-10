import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const candidateId = cookieStore.get("jfc_candidate")?.value;
  if (!candidateId) {
    return NextResponse.json(
      { error: "Sign in or create a profile to save your resume." },
      { status: 401 },
    );
  }

  const body = await request.json();
  if (!body.resume || typeof body.resume !== "object") {
    return NextResponse.json({ error: "resume required" }, { status: 400 });
  }

  const updated = await prisma.candidateProfile
    .update({
      where: { id: candidateId },
      data: { resumeData: body.resume },
    })
    .catch(() => null);

  if (!updated) {
    return NextResponse.json({ error: "Profile not found." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}

export async function GET() {
  const cookieStore = await cookies();
  const candidateId = cookieStore.get("jfc_candidate")?.value;
  if (!candidateId) return NextResponse.json({ resume: null, profile: null });

  const profile = await prisma.candidateProfile.findUnique({
    where: { id: candidateId },
    include: { user: true },
  });
  if (!profile) return NextResponse.json({ resume: null, profile: null });

  return NextResponse.json({
    resume: profile.resumeData ?? null,
    profile: {
      name: profile.user.name,
      email: profile.user.email,
      phone: profile.phone,
      city: profile.city,
      state: profile.state,
      headline: profile.headline,
      linkedin: profile.linkedin,
      desiredTitles: profile.desiredTitles,
      education: profile.education,
    },
  });
}
