"use client";

import { useState } from "react";
import type { PlanKey } from "@/lib/plans";

// Starts Stripe Checkout for a plan. `live` comes from the server (is a Stripe key set?).
export default function PlanButton({
  plan,
  live,
  label,
  freelancerId,
  dark = false,
}: {
  plan: PlanKey;
  live: boolean;
  label: string;
  freelancerId?: string;
  dark?: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const go = async () => {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, freelancerId }),
      });
      const data = await res.json();
      if (res.status === 401 && data.login) {
        window.location.href = data.login;
        return;
      }
      if (!res.ok || !data.url) throw new Error(data.error ?? "Checkout didn't start.");
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Checkout didn't start.");
      setBusy(false);
    }
  };

  const base = "mt-6 w-full rounded-full px-6 py-3 text-center font-semibold transition";
  if (!live)
    return (
      <div className="mt-6">
        <button
          type="button"
          disabled
          className={`${base} mt-0 cursor-not-allowed ${dark ? "bg-white/10 text-white/60" : "bg-slate-100 text-muted"}`}
        >
          Online checkout opens soon
        </button>
      </div>
    );

  return (
    <div>
      <button
        type="button"
        onClick={go}
        disabled={busy}
        className={`${base} ${
          dark
            ? "bg-brand text-white hover:bg-brand-dark"
            : "text-brand-dark ring-1 ring-brand/40 hover:bg-brand-tint"
        } disabled:opacity-60`}
      >
        {busy ? "Opening checkout…" : label}
      </button>
      {error && <p className="mt-2 text-center text-xs text-red-600">{error}</p>}
    </div>
  );
}
