import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = NextResponse.redirect(new URL("/search", request.url), 303);
  res.cookies.set("jfc_candidate", "", { path: "/", maxAge: 0 });
  return res;
}
