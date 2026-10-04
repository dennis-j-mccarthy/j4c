import { NextResponse } from "next/server";
import { getEmployer } from "@/lib/employer";
import { parseFilters, searchCandidates } from "@/lib/candidateSearch";

// GET /api/candidates/search?q=&category=&state=&type=&mode=&relocate=1&resume=1&job=
// Employers only. Returns opted-in profiles without contact details.
export async function GET(request: Request) {
  const employer = await getEmployer();
  if (!employer)
    return NextResponse.json({ error: "Employer sign-in required." }, { status: 401 });

  const params = new URL(request.url).searchParams;
  const filters = parseFilters((k) => params.get(k));
  const { results, total, job } = await searchCandidates(employer.company.id, filters);
  return NextResponse.json({
    filters,
    matchedTo: job ? { id: job.id, title: job.title } : null,
    total,
    results,
  });
}
