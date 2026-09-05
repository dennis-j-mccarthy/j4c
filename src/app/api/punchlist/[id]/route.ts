import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { done } = (await request.json()) as { done: boolean };
  const item = await prisma.punchItem.upsert({
    where: { id },
    update: { done },
    create: { id, done },
  });
  return NextResponse.json(item);
}
