import { VERDICT_META, type FitResult } from "@/lib/fitScore";

export default function FitPill({ fit }: { fit: FitResult }) {
  const meta = VERDICT_META[fit.verdict];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${meta.pill}`}
    >
      <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
      {meta.label} · {fit.score}%
    </span>
  );
}
