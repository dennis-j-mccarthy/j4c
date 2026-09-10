import { NextResponse } from "next/server";
import { aiAvailable, generateJson } from "@/lib/ai";

export type ResumeData = {
  summary: string;
  experience: { title: string; organization: string; dates: string; bullets: string[] }[];
  skills: string[];
  education: string[];
  faithService: string[];
};

type ExpInput = { title: string; org: string; dates: string; story: string; impact: string };

const RESUME_SCHEMA = {
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

function sentenceBullets(story: string): string[] {
  return story
    .split(/(?<=[.!?])\s+|\n+/)
    .map((s) => s.trim().replace(/^[-•]\s*/, "").replace(/\.$/, ""))
    .filter((s) => s.length > 3)
    .slice(0, 4)
    .map((s) => s.replace(/^I\s+(also\s+)?/i, ""))
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1));
}

function fallbackResume(input: {
  target: string;
  headline: string;
  experiences: ExpInput[];
  skills: string[];
  education: string[];
  faith: string[];
}): ResumeData {
  const lead =
    input.headline ||
    (input.experiences[0]
      ? `${input.experiences[0].title} at ${input.experiences[0].org}`
      : `${input.target} candidate`);
  const skillsBit = input.skills.slice(0, 3).join(", ");
  const summary = [
    `${lead}.`,
    input.target ? `Seeking a ${input.target} role with a mission-driven organization.` : "",
    skillsBit ? `Brings ${skillsBit}.` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return {
    summary,
    experience: input.experiences.map((e) => {
      const bullets = sentenceBullets(e.story);
      if (e.impact.trim()) {
        bullets.push(
          `Key result: ${e.impact.trim().replace(/^[-•]\s*/, "").replace(/\.$/, "")}`,
        );
      }
      return {
        title: e.title,
        organization: e.org,
        dates: e.dates,
        bullets: bullets.length ? bullets : ["Served in this role with distinction."],
      };
    }),
    skills: input.skills,
    education: input.education,
    faithService: input.faith,
  };
}

export async function POST(request: Request) {
  const body = await request.json();
  const strs = (v: unknown) =>
    Array.isArray(v) ? v.map(String).map((s) => s.trim()).filter(Boolean).slice(0, 15) : [];

  const experiences: ExpInput[] = (Array.isArray(body.experiences) ? body.experiences : [])
    .slice(0, 8)
    .map((e: Record<string, unknown>) => ({
      title: String(e.title ?? "").trim(),
      org: String(e.org ?? "").trim(),
      dates: String(e.dates ?? "").trim(),
      story: String(e.story ?? "").trim(),
      impact: String(e.impact ?? "").trim(),
    }))
    .filter((e: ExpInput) => e.title || e.org);

  const input = {
    target: String(body.target ?? "").trim(),
    headline: String(body.headline ?? "").trim(),
    experiences,
    skills: strs(body.skills),
    education: strs(body.education),
    faith: strs(body.faith),
  };

  if (experiences.length === 0) {
    return NextResponse.json({ error: "Add at least one experience entry" }, { status: 400 });
  }

  const system = `You are an expert resume writer applying current best practices: a 2-3 sentence professional summary (no objective statements, no first person pronouns), accomplishment bullets that start with strong past-tense verbs and quantify results wherever the input gives numbers, ATS-friendly plain phrasing, and emphasis tailored to the candidate's target role. Faithfully use only facts from the input — never invent employers, dates, credentials, or numbers. Rewrite plain-English descriptions into professional bullets (3-5 per role). Keep ministry and volunteer experience professional in tone: name the leadership, budgets, headcounts, and outcomes it contains. For the faithService list, keep entries short and factual.`;

  const prompt = `Target role: ${input.target || "not specified"}
Headline: ${input.headline || "none"}
Skills: ${input.skills.join(", ") || "none listed"}
Education: ${input.education.join("; ") || "none listed"}
Faith & service: ${input.faith.join("; ") || "none listed"}

Experience (plain-English notes from the candidate):
${experiences
  .map(
    (e, i) =>
      `${i + 1}. ${e.title} — ${e.org} (${e.dates || "dates not given"})
   What they did: ${e.story || "not described"}
   What improved: ${e.impact || "not given"}`,
  )
  .join("\n")}

Produce the resume JSON.`;

  let resume: ResumeData | null = null;
  let source = "template";
  try {
    resume = await generateJson<ResumeData>(system, prompt, RESUME_SCHEMA);
    if (resume) source = "ai";
  } catch {
    resume = null;
  }
  if (!resume) resume = fallbackResume(input);

  return NextResponse.json({ resume, source, aiConfigured: aiAvailable() });
}
