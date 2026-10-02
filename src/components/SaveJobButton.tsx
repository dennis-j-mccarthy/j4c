"use client";

import { useState } from "react";

export default function SaveJobButton({
  jobId,
  initialSaved,
  signedIn,
  compact = false,
}: {
  jobId: string;
  initialSaved: boolean;
  signedIn: boolean;
  compact?: boolean;
}) {
  const [saved, setSaved] = useState(initialSaved);
  const [busy, setBusy] = useState(false);

  const toggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!signedIn) {
      window.location.href = "/login";
      return;
    }
    if (busy) return;
    const next = !saved;
    setSaved(next);
    setBusy(true);
    const res = await fetch("/api/saved", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobId, saved: next }),
    }).catch(() => null);
    if (!res?.ok) setSaved(!next);
    setBusy(false);
  };

  const heart = (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
      <path
        d="M12 20.5s-7.5-4.6-7.5-10.3A4.2 4.2 0 0 1 12 7.6a4.2 4.2 0 0 1 7.5 2.6c0 5.7-7.5 10.3-7.5 10.3Z"
        strokeLinejoin="round"
      />
    </svg>
  );

  if (compact) {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-pressed={saved}
        aria-label={saved ? "Remove from saved jobs" : "Save this job"}
        title={saved ? "Saved" : "Save job"}
        className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full ring-1 transition ${
          saved ? "bg-rose-50 text-rose-500 ring-rose-200" : "bg-white text-muted ring-slate-200 hover:text-rose-500"
        }`}
      >
        {heart}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={saved}
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold ring-1 transition ${
        saved ? "bg-rose-50 text-rose-600 ring-rose-200" : "bg-white text-ink ring-slate-200 hover:text-rose-500"
      }`}
    >
      {heart}
      {saved ? "Saved" : "Save job"}
    </button>
  );
}
