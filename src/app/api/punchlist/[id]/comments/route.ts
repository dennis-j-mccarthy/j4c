import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { text } = (await request.json()) as { text: string };
  if (!text?.trim()) {
    return NextResponse.json({ error: "text required" }, { status: 400 });
  }
  // ensure the parent row exists — items are defined in code, not pre-inserted
  await prisma.punchItem.upsert({ where: { id }, update: {}, create: { id } });
  const comment = await prisma.punchComment.create({
    data: { itemId: id, text: text.trim() },
  });
  return NextResponse.json(comment);
}
