import { NextResponse } from "next/server";
import { aiAvailable, generateText } from "@/lib/ai";

type JdInput = {
  title: string;
  orgName: string;
  orgType?: string;
  mission?: string;
  location?: string;
  typeLabel?: string;
  modeLabel?: string;
  responsibilities: string[];
  requirements: string[];
  perks?: string[];
};

function fallbackJd(d: JdInput): string {
  const intro = [
    `${d.orgName} is seeking a ${d.title}${d.location ? ` in ${d.location}` : ""}${d.typeLabel ? ` (${d.typeLabel.toLowerCase()}${d.modeLabel ? `, ${d.modeLabel.toLowerCase()}` : ""})` : ""}.`,
    d.mission
      ? `${d.mission.trim().replace(/\.?$/, ".")} This role is a chance to put your gifts at the service of that mission.`
      : `Join a mission-driven team where your work serves something greater.`,
  ].join(" ");

  const parts = [intro];
  if (d.responsibilities.length) {
    parts.push(`What you'll do:\n${d.responsibilities.map((r) => `• ${r}`).join("\n")}`);
  }
  if (d.requirements.length) {
    parts.push(`What we're looking for:\n${d.requirements.map((r) => `• ${r}`).join("\n")}`);
  }
  if (d.perks?.length) {
    parts.push(`Why join us:\n${d.perks.map((p) => `• ${p}`).join("\n")}`);
  }
  return parts.join("\n\n");
}

export async function POST(request: Request) {
  const body = await request.json();
  const lines = (v: unknown) =>
    Array.isArray(v) ? v.map(String).map((s) => s.trim()).filter(Boolean).slice(0, 12) : [];

  const input: JdInput = {
    title: String(body.title ?? "").trim(),
    orgName: String(body.orgName ?? "").trim(),
    orgType: String(body.orgType ?? "").trim() || undefined,
    mission: String(body.mission ?? "").trim() || undefined,
    location: String(body.location ?? "").trim() || undefined,
    typeLabel: String(body.typeLabel ?? "").trim() || undefined,
    modeLabel: String(body.modeLabel ?? "").trim() || undefined,
    responsibilities: lines(body.responsibilities),
    requirements: lines(body.requirements),
    perks: lines(body.perks),
  };

  if (!input.title || !input.orgName) {
    return NextResponse.json({ error: "Title and organization required" }, { status: 400 });
  }

  const system = `You write job postings for Jobs For Catholics, a job board connecting Catholic candidates with mission-driven employers. Write warm, concrete, mission-forward postings that respect the reader's time.

Format (plain text, no markdown headers):
- Open with 2-3 sentences that weave the organization's mission into why this role matters.
- Then "What you'll do:" followed by bullet lines starting with "• ".
- Then "What we're looking for:" with bullets.
- If perks were provided, end with "Why join us:" and bullets.
Do not include salary (displayed separately). Do not invent facts not implied by the input. Keep it under 250 words.`;

  const prompt = `Organization: ${input.orgName}${input.orgType ? ` (${input.orgType})` : ""}
Role: ${input.title}${input.location ? ` — ${input.location}` : ""}${input.typeLabel ? `, ${input.typeLabel}` : ""}${input.modeLabel ? `, ${input.modeLabel}` : ""}
Mission (in the employer's words): ${input.mission ?? "not provided"}
Responsibilities (raw notes): ${input.responsibilities.join("; ") || "not provided"}
Requirements (raw notes): ${input.requirements.join("; ") || "not provided"}
Perks (raw notes): ${input.perks?.join("; ") || "not provided"}

Write the posting.`;

  let description: string | null = null;
  let source = "template";
  try {
    description = await generateText(system, prompt);
    if (description) source = "ai";
  } catch {
    description = null; // fall through to template on any API failure
  }
  if (!description) description = fallbackJd(input);

  return NextResponse.json({ description, source, aiConfigured: aiAvailable() });
}
