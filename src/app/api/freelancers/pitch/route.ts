import { NextResponse } from "next/server";
import { aiAvailable, generateText } from "@/lib/ai";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const craft = String(body.craft ?? "").trim();
  const bio = String(body.bio ?? "").trim().slice(0, 1500);
  const skills = Array.isArray(body.skills) ? body.skills.map(String).join(", ") : "";

  if (!bio && !craft) {
    return NextResponse.json({ error: "Write a rough draft first — even a messy one." }, { status: 400 });
  }

  const system = `You polish freelancer marketplace pitches for a Catholic job board. Rewrite the freelancer's rough notes into a 2-3 sentence pitch: concrete about what they deliver, warm but not salesy, mission-aware without being pious. Lead with what a parish, school, or apostolate gets. Use only facts from the input — never invent credentials, numbers, or clients. Output the pitch only.`;

  const prompt = `Craft: ${craft || "not stated"}
Skills: ${skills || "not stated"}
Rough notes: ${bio || "none"}

Polish the pitch.`;

  let pitch: string | null = null;
  try {
    pitch = await generateText(system, prompt);
  } catch {
    pitch = null;
  }

  if (!pitch) {
    return NextResponse.json(
      { pitch: bio, source: "template", aiConfigured: aiAvailable() },
    );
  }
  return NextResponse.json({ pitch, source: "ai", aiConfigured: true });
}
