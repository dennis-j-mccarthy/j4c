"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EmployerJobActions({
  id,
  status,
  featured,
}: {
  id: string;
  status: string;
  featured: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const patch = async (body: Record<string, unknown>) => {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Couldn't update.");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't update.");
    } finally {
      setBusy(false);
    }
  };

  const btn =
    "rounded-full px-4 py-2 text-sm font-semibold ring-1 transition disabled:opacity-50";

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <a href={`/employer/jobs/${id}/edit`} className={`${btn} text-ink ring-slate-200 hover:ring-brand/40 hover:text-brand-dark`}>
          Edit
        </a>
        {status === "PUBLISHED" ? (
          <>
            <button disabled={busy} onClick={() => patch({ status: "FILLED" })} className={`${btn} text-emerald-700 ring-emerald-200 hover:bg-emerald-50`}>
              Mark filled
            </button>
            <button disabled={busy} onClick={() => patch({ status: "CLOSED" })} className={`${btn} text-muted ring-slate-200 hover:bg-slate-50`}>
              Close
            </button>
          </>
        ) : (
          <button disabled={busy} onClick={() => patch({ status: "PUBLISHED" })} className={`${btn} text-brand-dark ring-brand/40 hover:bg-brand-tint`}>
            Reopen
          </button>
        )}
        {status === "PUBLISHED" && (
          <button
            disabled={busy}
            onClick={() => patch({ featured: !featured })}
            className={`${btn} ${featured ? "bg-accent/10 text-accent ring-accent/40" : "text-accent ring-accent/40 hover:bg-accent/10"}`}
          >
            {featured ? "★ Featured — remove" : "☆ Feature this job"}
          </button>
        )}
      </div>
      {error && <p className="mt-2 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}
