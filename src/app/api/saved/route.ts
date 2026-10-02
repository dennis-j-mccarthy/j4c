import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

/** Toggle a saved job for the signed-in candidate. Body: { jobId, saved: boolean } */
export async function POST(request: Request) {
  const cookieStore = await cookies();
  const candidateId = cookieStore.get("jfc_candidate")?.value;
  const profile = candidateId
    ? await prisma.candidateProfile.findUnique({ where: { id: candidateId }, select: { userId: true } })
    : null;
  if (!profile) {
    return NextResponse.json({ error: "Sign in to save jobs." }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const jobId = String(body.jobId ?? "");
  const job = await prisma.job.findUnique({ where: { id: jobId }, select: { id: true } });
  if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });

  const key = { userId_jobId: { userId: profile.userId, jobId } };
  if (body.saved) {
    await prisma.savedJob.upsert({
      where: key,
      create: { userId: profile.userId, jobId },
      update: {},
    });
  } else {
    await prisma.savedJob.deleteMany({ where: { userId: profile.userId, jobId } });
  }
  return NextResponse.json({ ok: true, saved: !!body.saved });
}
