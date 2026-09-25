"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TailorButton({ slug }: { slug: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsResume, setNeedsResume] = useState(false);

  const run = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/resumes/tailor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.needsResume) setNeedsResume(true);
        throw new Error(data.error ?? "Something went wrong.");
      }
      router.push(`/resumes/${data.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div className="mt-3">
      <button
        onClick={run}
        disabled={loading}
        className="w-full rounded-full px-5 py-2.5 text-sm font-semibold text-brand-dark ring-1 ring-brand/40 transition hover:bg-brand-tint disabled:opacity-60"
      >
        {loading ? "Tailoring your resume & cover letter…" : "✦ Tailor my resume to this job"}
      </button>
      {error && (
        <p className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
          {error}{" "}
          {needsResume && (
            <Link href="/resume" className="font-semibold underline">
              Build it now →
            </Link>
          )}
        </p>
      )}
    </div>
  );
}
