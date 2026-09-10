import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { JobType, WorkMode, AlertFrequency } from "@/generated/prisma/enums";

const JOB_TYPES = ["FULL_TIME", "PART_TIME", "CONTRACT", "TEMPORARY", "INTERNSHIP", "VOLUNTEER"];
const WORK_MODES = ["ONSITE", "HYBRID", "REMOTE"];
const FREQUENCIES = ["INSTANT", "DAILY", "WEEKLY", "OFF"];

export async function POST(request: Request) {
  const body = await request.json();

  const email = String(body.email ?? "").trim().toLowerCase();
  const firstName = String(body.firstName ?? "").trim();
  const lastName = String(body.lastName ?? "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }
  if (!firstName || !lastName) {
    return NextResponse.json({ error: "Name required" }, { status: 400 });
  }

  const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : null);
  const list = (v: unknown, allowed?: string[]) =>
    Array.isArray(v)
      ? v.map(String).filter((x) => (allowed ? allowed.includes(x) : x.trim().length > 0)).slice(0, 20)
      : [];

  const profileData = {
    phone: str(body.phone),
    city: str(body.city),
    state: str(body.state),
    zip: str(body.zip),
    headline: str(body.headline),
    desiredTitles: list(body.desiredTitles),
    categories: list(body.categories),
    jobTypes: list(body.jobTypes, JOB_TYPES) as JobType[],
    workModes: list(body.workModes, WORK_MODES) as WorkMode[],
    yearsExperience: str(body.yearsExperience),
    education: str(body.education),
    linkedin: str(body.linkedin),
    bio: str(body.bio)?.slice(0, 2000) ?? null,
    resumeName: str(body.resumeName),
    headshotName: str(body.headshotName),
    portfolioNames: list(body.portfolioNames).slice(0, 8),
    videoName: str(body.videoName),
    relocate: !!body.relocate,
    searchable: body.searchable !== false,
    alertFrequency: (FREQUENCIES.includes(body.alertFrequency)
      ? body.alertFrequency
      : "WEEKLY") as AlertFrequency,
  };

  const user = await prisma.user.upsert({
    where: { email },
    update: { name: `${firstName} ${lastName}` },
    create: { email, name: `${firstName} ${lastName}`, role: "SEEKER" },
  });

  const profile = await prisma.candidateProfile.upsert({
    where: { userId: user.id },
    update: profileData,
    create: { userId: user.id, ...profileData },
  });

  return NextResponse.json({ ok: true, profileId: profile.id });
}
