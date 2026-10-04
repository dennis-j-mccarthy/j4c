// Candidate search for signed-in employers. Shared by /search-candidates and
// GET /api/candidates/search so filters and access rules live in one place.
// Only profiles that opted in (searchable) are ever returned, and results never
// include email or phone — employers reach candidates by posting a job.
import { prisma } from "@/lib/prisma";
import { scoreJobFit, type FitResult } from "@/lib/fitScore";
import { Prisma } from "@/generated/prisma/client";
import type { JobType, WorkMode } from "@/generated/prisma/enums";

const JOB_TYPES = ["FULL_TIME", "PART_TIME", "CONTRACT", "TEMPORARY", "INTERNSHIP", "VOLUNTEER"];
const WORK_MODES = ["ONSITE", "HYBRID", "REMOTE"];

export type CandidateFilters = {
  q: string;
  category: string;
  state: string;
  type: string;
  mode: string;
  relocate: boolean;
  resume: boolean;
  /** one of the employer's own job ids — scores and sorts by fit */
  job: string;
};

export type CandidateResult = {
  id: string;
  name: string;
  headline: string | null;
  city: string | null;
  state: string | null;
  relocate: boolean;
  desiredTitles: string[];
  categories: string[];
  jobTypes: string[];
  workModes: string[];
  yearsExperience: string | null;
  hasResume: boolean;
  updatedAt: Date;
  fit: FitResult | null;
};

const one = (v: string | string[] | null | undefined) =>
  (Array.isArray(v) ? v[0] : v ?? "").trim();

/** Reads filters from page searchParams or a URL's query string. */
export function parseFilters(get: (k: string) => string | string[] | null | undefined): CandidateFilters {
  const type = one(get("type")).toUpperCase();
  const mode = one(get("mode")).toUpperCase();
  return {
    q: one(get("q")).slice(0, 100),
    category: one(get("category")).slice(0, 100),
    state: one(get("state")).toUpperCase().slice(0, 2),
    // invalid enum values are dropped, not passed to Prisma
    type: JOB_TYPES.includes(type) ? type : "",
    mode: WORK_MODES.includes(mode) ? mode : "",
    relocate: one(get("relocate")) === "1",
    resume: one(get("resume")) === "1",
    job: one(get("job")).slice(0, 40),
  };
}

export async function searchCandidates(companyId: string, f: CandidateFilters, limit = 50) {
  const and: Prisma.CandidateProfileWhereInput[] = [{ searchable: true }];
  if (f.category) and.push({ categories: { has: f.category } });
  if (f.state) and.push({ state: { equals: f.state, mode: "insensitive" } });
  if (f.type) and.push({ jobTypes: { has: f.type as JobType } });
  if (f.mode) and.push({ workModes: { has: f.mode as WorkMode } });
  if (f.relocate) and.push({ relocate: true });
  if (f.resume)
    and.push({
      OR: [
        { resumeUrl: { not: null } },
        { resumeName: { not: null } },
        { NOT: { resumeData: { equals: Prisma.AnyNull } } },
      ],
    });

  // The job must belong to this employer; anything else is ignored.
  const job = f.job
    ? await prisma.job.findFirst({
        where: { id: f.job, companyId },
        select: { id: true, title: true, category: true, type: true, workMode: true, location: true },
      })
    : null;

  const rows = await prisma.candidateProfile.findMany({
    where: { AND: and },
    select: {
      id: true, city: true, state: true, headline: true, bio: true, relocate: true,
      desiredTitles: true, categories: true, jobTypes: true, workModes: true,
      yearsExperience: true, resumeUrl: true, resumeName: true, resumeData: true, updatedAt: true,
      user: { select: { name: true } },
    },
    orderBy: { updatedAt: "desc" },
    take: 500,
  });

  // Keyword runs in memory: Prisma can't substring-match inside String[] (desiredTitles).
  const terms = f.q.toLowerCase().split(/\s+/).filter(Boolean);
  const matches = (r: (typeof rows)[number]) => {
    if (terms.length === 0) return true;
    const hay = [r.user.name, r.headline, r.bio, ...r.desiredTitles, ...r.categories]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return terms.every((t) => hay.includes(t));
  };

  let results: CandidateResult[] = rows.filter(matches).map((r) => ({
    id: r.id,
    name: r.user.name,
    headline: r.headline,
    city: r.city,
    state: r.state,
    relocate: r.relocate,
    desiredTitles: r.desiredTitles,
    categories: r.categories,
    jobTypes: r.jobTypes,
    workModes: r.workModes,
    yearsExperience: r.yearsExperience,
    hasResume: Boolean(r.resumeUrl || r.resumeName || r.resumeData != null),
    updatedAt: r.updatedAt,
    fit: job ? scoreJobFit(r, job) : null,
  }));

  if (job) results.sort((a, b) => b.fit!.score - a.fit!.score);
  const total = results.length;
  results = results.slice(0, limit);
  return { results, total, job };
}

/** Category options from the profiles employers can actually see. */
export async function candidateCategories(): Promise<string[]> {
  const rows = await prisma.candidateProfile.findMany({
    where: { searchable: true },
    select: { categories: true },
  });
  return [...new Set(rows.flatMap((r) => r.categories))].sort();
}
