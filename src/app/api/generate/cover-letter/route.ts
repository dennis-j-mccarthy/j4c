import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { aiAvailable, generateText } from "@/lib/ai";
import { TYPE_LABELS, MODE_LABELS } from "@/lib/format";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const slug = String(body.slug ?? "").trim();
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  const cookieStore = await cookies();
  const candidateId = cookieStore.get("jfc_candidate")?.value;
  if (!candidateId) {
    return NextResponse.json(
      { error: "Sign in as a candidate to auto-draft a cover letter." },
      { status: 401 },
    );
  }

  const [job, profile] = await Promise.all([
    prisma.job.findUnique({
      where: { slug, status: "PUBLISHED" },
      include: { company: true },
    }),
    prisma.candidateProfile.findUnique({
      where: { id: candidateId },
      include: { user: true },
    }),
  ]);
  if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });
  if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

  const resume = profile.resumeData as Record<string, unknown> | null;

  const fallback = `Dear Hiring Team at ${job.company.name},

I'm writing to apply for the ${job.title} position. ${profile.headline ?? "My background"} aligns well with what you're looking for, and the mission behind this role is exactly the kind of work I want to do.

I'd welcome the chance to talk about how I can contribute. Thank you for your consideration.

Sincerely,
${profile.user.name}`;

  const system = `You write short, specific cover letters for candidates on a Catholic mission-fit job board. Rules: under 180 words, three short paragraphs, no "To Whom It May Concern", no restating the resume — pick the one or two most relevant facts and connect them to this specific posting and this employer's mission. Warm and direct, never gushing. Use only facts from the candidate input; never invent experience, credentials, or personal faith claims beyond what the input states. Sign off with the candidate's name. Output the letter only, no preamble.`;

  const prompt = `THE JOB
${job.title} at ${job.company.name} — ${job.location ?? "location not stated"} · ${MODE_LABELS[job.workMode]} · ${TYPE_LABELS[job.type]}
${job.description.slice(0, 4000)}

THE CANDIDATE
Name: ${profile.user.name}
Headline: ${profile.headline ?? "none"}
Bio: ${profile.bio ?? "none"}
Resume (structured JSON, may be null): ${resume ? JSON.stringify(resume).slice(0, 5000) : "none"}

Write the cover letter.`;

  let letter: string | null = null;
  try {
    letter = await generateText(system, prompt);
  } catch {
    letter = null;
  }

  return NextResponse.json({
    letter: letter ?? fallback,
    source: letter ? "ai" : "template",
    aiConfigured: aiAvailable(),
  });
}
