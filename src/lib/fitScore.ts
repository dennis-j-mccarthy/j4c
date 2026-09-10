export type FitProfile = {
  desiredTitles: string[];
  categories: string[];
  jobTypes: string[];
  workModes: string[];
  city?: string | null;
  state?: string | null;
  relocate: boolean;
};

export type FitJob = {
  title: string;
  category: string | null;
  type: string;
  workMode: string;
  location: string | null;
};

export type FitVerdict = "great" | "possible" | "low";

export type FitResult = {
  score: number; // 0-100
  verdict: FitVerdict;
  reasons: string[];
};

const STOPWORDS = new Set(["of", "the", "and", "a", "an", "for", "in", "at", "to", "&"]);

const words = (s: string) =>
  s
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 1 && !STOPWORDS.has(w));

/** Best word-overlap ratio between any desired title and the job title. */
function titleAffinity(desired: string[], jobTitle: string): number {
  if (desired.length === 0) return 0.5; // no preference — neutral
  const jobWords = new Set(words(jobTitle));
  let best = 0;
  for (const d of desired) {
    const dw = words(d);
    if (dw.length === 0) continue;
    const hit = dw.filter((w) => jobWords.has(w)).length / dw.length;
    best = Math.max(best, hit);
  }
  return best;
}

export function scoreJobFit(profile: FitProfile, job: FitJob): FitResult {
  const reasons: string[] = [];

  const title = titleAffinity(profile.desiredTitles, job.title);
  if (profile.desiredTitles.length > 0) {
    if (title >= 0.75) reasons.push("Matches a role you're looking for");
    else if (title >= 0.4) reasons.push("Close to a role you're looking for");
    else reasons.push("Different role than you listed");
  }

  let category: number;
  if (profile.categories.length === 0) category = 0.5;
  else if (job.category && profile.categories.some((c) => c.toLowerCase() === job.category!.toLowerCase())) {
    category = 1;
    reasons.push(`In your ${job.category} category`);
  } else {
    category = 0;
    if (job.category) reasons.push(`Outside your chosen categories (${job.category})`);
  }

  let type: number;
  if (profile.jobTypes.length === 0) type = 0.5;
  else if (profile.jobTypes.includes(job.type)) {
    type = 1;
    reasons.push("Job type you want");
  } else {
    type = 0;
    reasons.push("Different job type than you selected");
  }

  let mode: number;
  if (profile.workModes.length === 0) mode = 0.5;
  else if (profile.workModes.includes(job.workMode)) {
    mode = 1;
    reasons.push("Work setting you want");
  } else {
    mode = 0;
    reasons.push("Different work setting than you selected");
  }

  let location: number;
  const loc = (job.location ?? "").toLowerCase();
  const isRemote = job.workMode === "REMOTE" || loc.includes("remote");
  if (isRemote) {
    location = 1;
    reasons.push("Remote — works from anywhere");
  } else if (!profile.state && !profile.city) {
    location = 0.5;
  } else if (
    (profile.state && loc.includes(profile.state.toLowerCase())) ||
    (profile.city && loc.includes(profile.city.toLowerCase()))
  ) {
    location = 1;
    reasons.push("In your area");
  } else if (profile.relocate) {
    location = 0.7;
    reasons.push("Would require relocating (you're open to it)");
  } else {
    location = 0.2;
    reasons.push("Outside your area");
  }

  const score = Math.round(
    100 * (0.3 * title + 0.25 * category + 0.15 * type + 0.15 * mode + 0.15 * location),
  );

  const verdict: FitVerdict = score >= 70 ? "great" : score >= 45 ? "possible" : "low";
  return { score, verdict, reasons };
}

export const VERDICT_META: Record<
  FitVerdict,
  { label: string; pill: string; dot: string }
> = {
  great: {
    label: "Great fit",
    pill: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    dot: "bg-emerald-500",
  },
  possible: {
    label: "Possible fit",
    pill: "bg-amber-50 text-amber-700 ring-amber-200",
    dot: "bg-amber-500",
  },
  low: {
    label: "Low fit",
    pill: "bg-red-50 text-red-600 ring-red-200",
    dot: "bg-red-500",
  },
};
