import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { aiAvailable, generateJson, generateText } from "@/lib/ai";
import { TYPE_LABELS, MODE_LABELS } from "@/lib/format";
import type { ResumeSheetData } from "@/components/ResumeSheet";

const TAILORED_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["summary", "experience", "skills", "education", "faithService"],
  properties: {
    summary: { type: "string" },
    experience: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["title", "organization", "dates", "bullets"],
        properties: {
          title: { type: "string" },
          organization: { type: "string" },
          dates: { type: "string" },
          bullets: { type: "array", items: { type: "string" } },
        },
      },
    },
    skills: { type: "array", items: { type: "string" } },
    education: { type: "array", items: { type: "string" } },
    faithService: { type: "array", items: { type: "string" } },
  },
};

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const slug = String(body.slug ?? "").trim();
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  const cookieStore = await cookies();
  const candidateId = cookieStore.get("jfc_candidate")?.value;
  if (!candidateId) {
    return NextResponse.json(
      { error: "Sign in as a candidate to tailor your resume." },
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

  const base = profile.resumeData as ResumeSheetData | null;
  if (!base || !Array.isArray(base.experience)) {
    return NextResponse.json(
      {
        error:
          "Build and save your master resume first — then one click tailors it to any job.",
        needsResume: true,
      },
      { status: 400 },
    );
  }
  if (!aiAvailable()) {
    return NextResponse.json(
      { error: "Tailoring needs the AI key — configure ANTHROPIC_API_KEY." },
      { status: 503 },
    );
  }

  const jobBlock = `Title: ${job.title}
Employer: ${job.company.name}${job.company.orgType ? ` (${job.company.orgType})` : ""}
Location: ${job.location ?? "not stated"} · ${MODE_LABELS[job.workMode]} · ${TYPE_LABELS[job.type]}
Description:
${job.description.slice(0, 5000)}`;

  const resumeSystem = `You tailor an existing resume to one specific job posting. Rules: use ONLY facts already in the base resume — never invent employers, dates, credentials, skills, or numbers. You may rewrite the summary to target this exact role and employer, reorder and reword bullets to lead with the most relevant accomplishments, reorder skills so the most relevant come first, and trim bullets that do nothing for this application (keep at least 2 per role). Keep every job entry that exists; do not drop roles. Keep education and faithService content intact (reordering is fine). ATS-friendly plain phrasing throughout.`;

  const resumePrompt = `THE TARGET JOB
${jobBlock}

THE BASE RESUME (JSON)
${JSON.stringify({ ...base, contact: undefined }).slice(0, 7000)}

Produce the tailored resume JSON.`;

  const letterSystem = `You write short, specific cover letters. Under 180 words, three short paragraphs, no "To Whom It May Concern". Pick the one or two most relevant facts from the resume and connect them to this specific posting and employer mission. Use only facts from the input; never invent experience or credentials. Sign off with the candidate's name. Output the letter only.`;

  const letterPrompt = `THE JOB
${jobBlock}

THE CANDIDATE
Name: ${profile.user.name}
Headline: ${profile.headline ?? "none"}
Resume (JSON): ${JSON.stringify({ ...base, contact: undefined }).slice(0, 5000)}

Write the cover letter.`;

  let tailored: ResumeSheetData | null = null;
  let letter: string | null = null;
  try {
    [tailored, letter] = await Promise.all([
      generateJson<ResumeSheetData>(resumeSystem, resumePrompt, TAILORED_SCHEMA),
      generateText(letterSystem, letterPrompt),
    ]);
  } catch {
    tailored = null;
  }
  if (!tailored) {
    return NextResponse.json(
      { error: "Tailoring failed — try again in a moment." },
      { status: 502 },
    );
  }

  const doc = await prisma.resumeDoc.create({
    data: {
      profileId: profile.id,
      jobTitle: job.title,
      companyName: job.company.name,
      jobSlug: job.slug,
      data: { ...tailored, contact: base.contact ?? { name: profile.user.name, email: profile.user.email } },
      coverLetter: letter,
      source: "ai",
    },
  });

  return NextResponse.json({ id: doc.id });
}
