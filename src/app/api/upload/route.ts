import { NextResponse } from "next/server";
import { s3Available, presignPut } from "@/lib/s3";

const FOLDERS = new Set(["portfolio", "resumes", "headshots", "videos", "logos"]);
const TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "application/pdf": "pdf",
  "video/mp4": "mp4",
  "video/webm": "webm",
};

export async function POST(request: Request) {
  if (!s3Available()) {
    return NextResponse.json(
      { error: "Media storage isn't configured yet." },
      { status: 503 },
    );
  }
  const body = await request.json().catch(() => ({}));
  const folder = String(body.folder ?? "");
  const contentType = String(body.contentType ?? "");
  if (!FOLDERS.has(folder)) {
    return NextResponse.json({ error: "Invalid folder" }, { status: 400 });
  }
  const ext = TYPES[contentType];
  if (!ext) {
    return NextResponse.json(
      { error: "Unsupported file type — use JPG, PNG, WebP, PDF, or MP4." },
      { status: 400 },
    );
  }

  const key = `${folder}/${crypto.randomUUID()}.${ext}`;
  const uploadUrl = await presignPut(key, contentType);
  return NextResponse.json({ uploadUrl, stored: `s3:${key}` });
}
