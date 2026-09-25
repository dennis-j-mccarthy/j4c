"use client";

import { useMemo, useState } from "react";

export type FreelancerRow = {
  id: string;
  name: string;
  craft: string;
  category: string;
  city: string | null;
  state: string | null;
  rate: string | null;
  bio: string;
  skills: string[];
  available: boolean;
  featured: boolean;
};

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-ink placeholder:text-muted/70 transition focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none";

const DISC_COLORS = [
  "from-sky-500 to-blue-700",
  "from-amber-500 to-orange-700",
  "from-emerald-500 to-teal-700",
  "from-violet-500 to-purple-700",
  "from-rose-500 to-red-700",
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .map((w) => w[0].toUpperCase())
    .slice(0, 2)
    .join("");
}

export default function FreelanceBoard({ initial }: { initial: FreelancerRow[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const [open, setOpen] = useState<FreelancerRow | null>(null);
  const [iName, setIName] = useState("");
  const [iEmail, setIEmail] = useState("");
  const [iMsg, setIMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories = useMemo(() => {
    const c: Record<string, number> = {};
    for (const f of initial) c[f.category] = (c[f.category] ?? 0) + 1;
    return Object.entries(c).sort((a, b) => b[1] - a[1]);
  }, [initial]);

  const list = initial.filter((f) => {
    if (cat && f.category !== cat) return false;
    if (!q.trim()) return true;
    return [f.name, f.craft, f.bio, f.skills.join(" "), f.city]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(q.toLowerCase());
  });

  const openInquiry = (f: FreelancerRow) => {
    setOpen(f);
    setSent(false);
    setError(null);
    setIMsg("");
  };

  const send = async () => {
    if (sending || !open) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/freelancers/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ freelancerId: open.id, name: iName, email: iEmail, message: iMsg }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setSent(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search crafts, skills, names…"
          className={`${inputCls} max-w-xs`}
        />
        <button
          onClick={() => setCat(null)}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${!cat ? "bg-brand text-white" : "bg-white text-muted ring-1 ring-slate-200 hover:text-brand-dark"}`}
        >
          All
        </button>
        {categories.map(([c, n]) => (
          <button
            key={c}
            onClick={() => setCat(cat === c ? null : c)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${cat === c ? "bg-brand text-white" : "bg-white text-muted ring-1 ring-slate-200 hover:text-brand-dark"}`}
          >
            {c} <span className="opacity-60">{n}</span>
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {list.map((f, i) => (
          <div
            key={f.id}
            className="group flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg hover:ring-brand/30"
          >
            <div className="flex items-start gap-4">
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-lg font-bold text-white ${DISC_COLORS[i % DISC_COLORS.length]}`}
              >
                {initials(f.name)}
              </div>
              <div className="min-w-0">
                <p className="font-heading text-lg font-medium text-ink group-hover:text-brand-dark">
                  {f.name}
                </p>
                <p className="text-sm font-semibold text-brand-dark">{f.craft}</p>
                <p className="mt-0.5 flex items-center gap-2 text-xs text-muted">
                  {f.available && (
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                      Available
                    </span>
                  )}
                  {[f.city, f.state].filter(Boolean).join(", ") || "Remote"}
                  {f.rate && <span>· {f.rate}</span>}
                </p>
              </div>
            </div>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{f.bio}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {f.skills.slice(0, 4).map((s) => (
                <span key={s} className="rounded-full bg-brand-tint px-2.5 py-1 text-xs font-medium text-brand-dark">
                  {s}
                </span>
              ))}
            </div>
            <button
              onClick={() => openInquiry(f)}
              className="mt-4 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition group-hover:bg-brand-dark"
            >
              Get in touch
            </button>
          </div>
        ))}
      </div>
      {list.length === 0 && (
        <p className="mt-10 text-center text-muted">
          No one matches yet — be the first to <a href="#join" className="font-semibold text-brand-dark hover:underline">list this craft</a>.
        </p>
      )}

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm"
          onClick={() => setOpen(null)}
        >
          <div
            className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {sent ? (
              <div className="text-center">
                <p className="font-heading text-2xl font-medium text-ink">Sent! 🙏</p>
                <p className="mt-2 text-muted">
                  {open.name.split(" ")[0]} will get back to you at {iEmail}.
                </p>
                <button
                  onClick={() => setOpen(null)}
                  className="mt-6 rounded-full bg-brand px-8 py-2.5 font-semibold text-white"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <p className="text-xs font-bold tracking-[0.12em] text-brand-dark uppercase">
                  Get in touch
                </p>
                <h3 className="mt-1 font-heading text-2xl font-medium text-ink">
                  {open.name}
                </h3>
                <p className="text-sm text-muted">{open.craft}</p>
                <div className="mt-5 space-y-3">
                  <input className={inputCls} placeholder="Your name" value={iName} onChange={(e) => setIName(e.target.value)} />
                  <input className={inputCls} type="email" placeholder="Your email" value={iEmail} onChange={(e) => setIEmail(e.target.value)} />
                  <textarea
                    className={`${inputCls} min-h-28 resize-y`}
                    placeholder={`What do you need? Dates, scope, budget if you have one…`}
                    value={iMsg}
                    onChange={(e) => setIMsg(e.target.value)}
                  />
                  {error && (
                    <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">{error}</p>
                  )}
                  <button
                    onClick={send}
                    disabled={sending}
                    className="w-full rounded-full bg-brand px-6 py-3 font-semibold text-white shadow-md shadow-brand/30 transition hover:bg-brand-dark disabled:opacity-60"
                  >
                    {sending ? "Sending…" : "Send inquiry"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
