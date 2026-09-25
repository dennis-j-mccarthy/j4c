"use client";

import { useState } from "react";

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-ink placeholder:text-muted/70 transition focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none";

const CATEGORIES = [
  "Music & Liturgy",
  "Art & Architecture",
  "Digital & Media",
  "Development & Fundraising",
  "Ministry & Speaking",
  "Education & Tutoring",
  "Finance & Admin",
  "Other",
];

export default function FreelanceJoin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [craft, setCraft] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [city, setCity] = useState("");
  const [rate, setRate] = useState("");
  const [skills, setSkills] = useState("");
  const [bio, setBio] = useState("");
  const [polishing, setPolishing] = useState(false);
  const [polished, setPolished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const polish = async () => {
    if (polishing) return;
    setPolishing(true);
    setError(null);
    try {
      const res = await fetch("/api/freelancers/pitch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ craft, bio, skills: skills.split(",") }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Couldn't polish that.");
      setBio(data.pitch);
      setPolished(data.source === "ai");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't polish that.");
    } finally {
      setPolishing(false);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/freelancers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, email, craft, category, city, rate, bio,
          skills: skills.split(",").map((s) => s.trim()).filter(Boolean),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-black/5">
        <p className="font-heading text-2xl font-medium text-ink">You&apos;re listed! 🎉</p>
        <p className="mx-auto mt-2 max-w-md text-muted">
          Your craft is live on the marketplace. Refresh the page to see your
          card — inquiries land straight in your inbox.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
      <div className="grid gap-4 sm:grid-cols-2">
        <input className={inputCls} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className={inputCls} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className={inputCls} placeholder="Your craft — e.g. Parish web designer" value={craft} onChange={(e) => setCraft(e.target.value)} />
        <select className={inputCls} value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <input className={inputCls} placeholder="City (or Remote)" value={city} onChange={(e) => setCity(e.target.value)} />
        <input className={inputCls} placeholder="Rate — e.g. $70/hr or By commission" value={rate} onChange={(e) => setRate(e.target.value)} />
      </div>
      <input className={`${inputCls} mt-4`} placeholder="Skills, comma-separated" value={skills} onChange={(e) => setSkills(e.target.value)} />
      <div className="mt-4">
        <textarea
          className={`${inputCls} min-h-28 resize-y`}
          placeholder="Your pitch — what does a parish, school, or apostolate get when they hire you? Rough notes are fine."
          value={bio}
          onChange={(e) => { setBio(e.target.value); setPolished(false); }}
          maxLength={1200}
        />
        <div className="mt-1.5 flex items-center gap-3">
          <button
            type="button"
            onClick={polish}
            disabled={polishing}
            className="text-xs font-semibold text-brand-dark transition hover:underline disabled:opacity-60"
          >
            {polishing ? "Claude is polishing…" : "✦ Polish my pitch with AI"}
          </button>
          {polished && <span className="text-xs text-emerald-600">Polished ✓ — edit anything</span>}
        </div>
      </div>
      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">{error}</p>
      )}
      <button
        type="submit"
        disabled={saving}
        className="btn-shimmer mt-5 w-full rounded-full bg-gradient-to-r from-brand to-brand-dark px-6 py-3.5 font-semibold text-white shadow-lg shadow-brand/30 transition hover:-translate-y-0.5 disabled:opacity-60"
      >
        {saving ? "Listing your craft…" : "List my craft — free"}
      </button>
      <p className="mt-3 text-center text-xs text-muted">
        No commission, no membership fee. You keep 100% of what you earn.
      </p>
    </form>
  );
}
