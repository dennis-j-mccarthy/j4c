import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const slug = String(body.slug ?? "");
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Name and valid email required" }, { status: 400 });
  }

  const job = await prisma.job.findUnique({
    where: { slug, status: "PUBLISHED" },
  });
  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : null);

  try {
    await prisma.application.create({
      data: {
        jobId: job.id,
        name,
        email,
        phone: str(body.phone),
        resumeUrl: str(body.resumeUrl),
        coverLetter: str(body.coverLetter)?.slice(0, 4000) ?? null,
      },
    });
  } catch (e) {
    if (e && typeof e === "object" && "code" in e && e.code === "P2002") {
      return NextResponse.json(
        { error: "You've already applied to this job with that email." },
        { status: 409 },
      );
    }
    throw e;
  }

  return NextResponse.json({ ok: true });
}
