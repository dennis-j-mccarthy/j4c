import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ commentId: string }> },
) {
  const { commentId } = await params;
  await prisma.punchComment.delete({ where: { id: commentId } }).catch(() => {});
  return NextResponse.json({ ok: true });
}
