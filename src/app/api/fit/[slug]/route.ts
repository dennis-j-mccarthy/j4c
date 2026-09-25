import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { aiAvailable, generateJson } from "@/lib/ai";
import { scoreJobFit, type FitVerdict } from "@/lib/fitScore";
import { TYPE_LABELS, MODE_LABELS } from "@/lib/format";

type AiFit = {
  score: number;
  verdict: FitVerdict;
  strengths: string[];
  gaps: string[];
  summary: string;
};

const FIT_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["score", "verdict", "strengths", "gaps", "summary"],
  properties: {
    score: { type: "integer" },
    verdict: { type: "string", enum: ["great", "possible", "low"] },
    strengths: { type: "array", items: { type: "string" } },
    gaps: { type: "array", items: { type: "string" } },
    summary: { type: "string" },
  },
};

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const candidateId = cookieStore.get("jfc_candidate")?.value;
  if (!candidateId) {
    return NextResponse.json(
      { error: "Sign in as a candidate to get your AI fit read." },
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

  const heuristic = scoreJobFit(profile, job);

  const resume = profile.resumeData as Record<string, unknown> | null;
  const resumeText = resume
    ? JSON.stringify(resume).slice(0, 6000)
    : "No resume on file — judge from the profile fields alone.";

  const system = `You are a recruiting analyst for a Catholic mission-fit job board. Compare one candidate against one job posting and return an honest fit assessment. Score 0-100 where 85+ means "apply today", 45-69 means "worth a look with caveats", below 45 means "probably not this one". Verdict bands: great = 70+, possible = 45-69, low = below 45 — keep score and verdict consistent. Strengths and gaps must cite specifics from the resume/profile and the posting, not generic encouragement. The summary is 2-3 sentences a candidate would find genuinely useful, including mission-fit signals (ministry, Catholic school, parish, or service experience) where relevant. Never invent facts about the candidate.`;

  const prompt = `THE JOB
Title: ${job.title}
Employer: ${job.company.name}${job.company.orgType ? ` (${job.company.orgType})` : ""}
Location: ${job.location ?? "not stated"} · ${MODE_LABELS[job.workMode]} · ${TYPE_LABELS[job.type]}
Category: ${job.category ?? "not stated"}
Description:
${job.description.slice(0, 5000)}

THE CANDIDATE
Name: ${profile.user.name}
Headline: ${profile.headline ?? "none"}
Location: ${[profile.city, profile.state].filter(Boolean).join(", ") || "not stated"} · relocate: ${profile.relocate ? "yes" : "no"}
Desired titles: ${profile.desiredTitles.join(", ") || "none listed"}
Categories: ${profile.categories.join(", ") || "none listed"}
Bio: ${profile.bio ?? "none"}
Resume (structured):
${resumeText}

Assess the fit.`;

  let ai: AiFit | null = null;
  try {
    ai = await generateJson<AiFit>(system, prompt, FIT_SCHEMA);
    if (ai) {
      ai.score = Math.max(0, Math.min(100, Math.round(ai.score)));
      ai.strengths = ai.strengths.slice(0, 4);
      ai.gaps = ai.gaps.slice(0, 3);
    }
  } catch {
    ai = null;
  }

  if (!ai) {
    return NextResponse.json({
      fit: {
        score: heuristic.score,
        verdict: heuristic.verdict,
        strengths: heuristic.reasons.slice(0, 4),
        gaps: [],
        summary:
          "Heuristic score from your profile preferences — add a resume and an API key unlocks the full AI read.",
      },
      source: "template",
      aiConfigured: aiAvailable(),
    });
  }

  return NextResponse.json({ fit: ai, source: "ai", aiConfigured: true });
}
