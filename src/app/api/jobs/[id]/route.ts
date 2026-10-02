import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOwnedJob } from "@/lib/employer";
import { TYPE_LABELS, MODE_LABELS } from "@/lib/format";

const STATUSES = ["PUBLISHED", "CLOSED", "FILLED"] as const;

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { employer, job } = await getOwnedJob(id);
  if (!employer) return NextResponse.json({ error: "Sign in as an employer." }, { status: 401 });
  if (!job) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await request.json().catch(() => ({}));
  const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : null);
  const num = (v: unknown) => {
    if (v === "" || v === null) return null;
    const n = Number(v);
    return Number.isFinite(n) && n > 0 ? Math.round(n) : null;
  };

  const data: Record<string, unknown> = {};
  if (body.title !== undefined) {
    const title = String(body.title).trim();
    if (!title) return NextResponse.json({ error: "Title can't be empty." }, { status: 400 });
    data.title = title.slice(0, 200);
  }
  if (body.description !== undefined) {
    const description = String(body.description).trim();
    if (!description) return NextResponse.json({ error: "Description can't be empty." }, { status: 400 });
    data.description = description.slice(0, 8000);
  }
  if (body.location !== undefined) data.location = str(body.location);
  if (body.category !== undefined) data.category = str(body.category);
  if (body.type !== undefined && TYPE_LABELS[String(body.type)]) data.type = String(body.type);
  if (body.workMode !== undefined && MODE_LABELS[String(body.workMode)]) data.workMode = String(body.workMode);
  if (body.salaryMin !== undefined) data.salaryMin = num(body.salaryMin);
  if (body.salaryMax !== undefined) data.salaryMax = num(body.salaryMax);
  if (body.featured !== undefined) data.featured = !!body.featured;
  if (body.status !== undefined) {
    if (!STATUSES.includes(body.status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    data.status = body.status;
    if (body.status === "PUBLISHED" && !job.postedAt) data.postedAt = new Date();
  }
  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  const updated = await prisma.job.update({ where: { id }, data });
  return NextResponse.json({
    ok: true,
    status: updated.status,
    featured: updated.featured,
    slug: updated.slug,
  });
}
