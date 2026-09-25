import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const cookieStore = await cookies();
  const candidateId = cookieStore.get("jfc_candidate")?.value;
  if (!candidateId) return NextResponse.json({ error: "Sign in first." }, { status: 401 });

  const deleted = await prisma.resumeDoc
    .deleteMany({ where: { id, profileId: candidateId } })
    .catch(() => null);
  if (!deleted?.count) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
