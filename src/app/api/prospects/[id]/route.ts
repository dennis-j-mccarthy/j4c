import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const STATUSES = ["NEW", "QUEUED", "EMAILED", "REPLIED", "WON", "PASSED"] as const;
type Status = (typeof STATUSES)[number];

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));

  const data: { status?: Status; notes?: string; lastTouch?: Date } = {};
  if (body.status !== undefined) {
    if (!STATUSES.includes(body.status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    data.status = body.status;
    if (body.status === "EMAILED") data.lastTouch = new Date();
  }
  if (body.notes !== undefined) data.notes = String(body.notes).slice(0, 2000);
  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  const prospect = await prisma.prospect
    .update({ where: { id }, data })
    .catch(() => null);
  if (!prospect) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ prospect });
}
