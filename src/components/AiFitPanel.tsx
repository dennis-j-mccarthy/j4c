"use client";

import { useState } from "react";
import { VERDICT_META, type FitVerdict } from "@/lib/fitScore";

type AiFit = {
  score: number;
  verdict: FitVerdict;
  strengths: string[];
  gaps: string[];
  summary: string;
};

export default function AiFitPanel({ slug }: { slug: string }) {
  const [fit, setFit] = useState<AiFit | null>(null);
  const [source, setSource] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/fit/${slug}`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setFit(data.fit);
      setSource(data.source);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!fit) {
    return (
      <div className="mt-4 border-t border-black/5 pt-4">
        <button
          onClick={run}
          disabled={loading}
          className="btn-shimmer w-full rounded-full bg-gradient-to-r from-brand to-brand-dark px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/30 transition hover:-translate-y-0.5 disabled:opacity-60"
        >
          {loading ? "Claude is reading your resume…" : "✦ Get my AI fit read"}
        </button>
        <p className="mt-2 text-center text-xs text-muted">
          Claude compares your resume against the full posting.
        </p>
        {error && (
          <p className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }

  const meta = VERDICT_META[fit.verdict];

  return (
    <div className="mt-4 border-t border-black/5 pt-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold tracking-[0.12em] text-brand-dark uppercase">
          ✦ AI fit read {source === "ai" ? "" : "(preview)"}
        </p>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${meta.pill}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
          {fit.score} · {meta.label}
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-ink/80">{fit.summary}</p>
      {fit.strengths.length > 0 && (
        <ul className="mt-3 space-y-1 text-sm text-emerald-700">
          {fit.strengths.map((s) => (
            <li key={s} className="flex items-start gap-1.5">
              <span className="mt-0.5">✓</span> {s}
            </li>
          ))}
        </ul>
      )}
      {fit.gaps.length > 0 && (
        <ul className="mt-2 space-y-1 text-sm text-amber-700">
          {fit.gaps.map((g) => (
            <li key={g} className="flex items-start gap-1.5">
              <span className="mt-0.5">△</span> {g}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
