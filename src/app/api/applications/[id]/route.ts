import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getEmployer } from "@/lib/employer";

const STATUSES = [
  "SUBMITTED",
  "REVIEWING",
  "INTERVIEWING",
  "OFFERED",
  "HIRED",
  "REJECTED",
  "WITHDRAWN",
] as const;
type Status = (typeof STATUSES)[number];

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const employer = await getEmployer();
  if (!employer) {
    return NextResponse.json({ error: "Sign in as an employer." }, { status: 401 });
  }

  const app = await prisma.application.findUnique({
    where: { id },
    include: { job: { select: { companyId: true } } },
  });
  if (!app || app.job.companyId !== employer.company.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await request.json().catch(() => ({}));
  const data: { status?: Status; notes?: string | null } = {};
  if (body.status !== undefined) {
    if (!STATUSES.includes(body.status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    data.status = body.status;
  }
  if (body.notes !== undefined) {
    const notes = String(body.notes).trim().slice(0, 2000);
    data.notes = notes || null;
  }
  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  const updated = await prisma.application.update({ where: { id }, data });
  return NextResponse.json({ ok: true, status: updated.status, notes: updated.notes });
}
