import Anthropic from "@anthropic-ai/sdk";

export const aiAvailable = () => !!process.env.ANTHROPIC_API_KEY;

/** Plain-text generation. Returns null when no API key is configured. */
export async function generateText(
  system: string,
  prompt: string,
): Promise<string | null> {
  if (!aiAvailable()) return null;
  const client = new Anthropic();
  const response = await client.messages.create({
    model: "claude-opus-4-8",
    max_tokens: 8000,
    system,
    messages: [{ role: "user", content: prompt }],
  });
  return response.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n")
    .trim();
}

/** JSON generation against a schema. Returns null when no key or parse failure. */
export async function generateJson<T>(
  system: string,
  prompt: string,
  schema: Record<string, unknown>,
): Promise<T | null> {
  if (!aiAvailable()) return null;
  const client = new Anthropic();
  const response = await client.messages.create({
    model: "claude-opus-4-8",
    max_tokens: 8000,
    system,
    messages: [{ role: "user", content: prompt }],
    output_config: { format: { type: "json_schema", schema } },
  });
  const text = response.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("");
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}
