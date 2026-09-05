import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const [items, comments] = await Promise.all([
    prisma.punchItem.findMany(),
    prisma.punchComment.findMany({ orderBy: { createdAt: "asc" } }),
  ]);
  return NextResponse.json({ items, comments });
}
