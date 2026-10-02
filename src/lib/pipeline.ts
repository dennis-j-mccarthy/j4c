export const PIPELINE: { value: string; label: string; cls: string }[] = [
  { value: "SUBMITTED", label: "New", cls: "bg-sky-50 text-sky-700 ring-sky-200" },
  { value: "REVIEWING", label: "In review", cls: "bg-amber-50 text-amber-700 ring-amber-200" },
  { value: "INTERVIEWING", label: "Interviewing", cls: "bg-violet-50 text-violet-700 ring-violet-200" },
  { value: "OFFERED", label: "Offer made", cls: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
  { value: "HIRED", label: "Hired", cls: "bg-emerald-100 text-emerald-800 ring-emerald-300" },
  { value: "REJECTED", label: "Not selected", cls: "bg-slate-100 text-slate-500 ring-slate-200" },
  { value: "WITHDRAWN", label: "Withdrew", cls: "bg-slate-100 text-slate-400 ring-slate-200" },
];

/** Stages that count as "still in play" for dashboard counts. */
export const ACTIVE_STAGES = ["SUBMITTED", "REVIEWING", "INTERVIEWING", "OFFERED"];
