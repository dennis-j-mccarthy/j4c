"use client";

import { useMemo, useState } from "react";

export type ProspectRow = {
  id: string;
  name: string;
  orgType: string | null;
  location: string | null;
  state: string | null;
  contact: string | null;
  email: string | null;
  domain: string | null;
  roles: string | null;
  jobCount: number;
  status: string;
  notes: string | null;
  lastTouch: string | null;
};

const STATUSES = ["NEW", "QUEUED", "EMAILED", "REPLIED", "WON", "PASSED"] as const;

const STATUS_META: Record<string, { label: string; cls: string }> = {
  NEW: { label: "New", cls: "bg-slate-100 text-slate-600" },
  QUEUED: { label: "Queued", cls: "bg-sky-50 text-sky-700" },
  EMAILED: { label: "Emailed", cls: "bg-amber-50 text-amber-700" },
  REPLIED: { label: "Replied", cls: "bg-violet-50 text-violet-700" },
  WON: { label: "Won 🎉", cls: "bg-emerald-50 text-emerald-700" },
  PASSED: { label: "Passed", cls: "bg-slate-100 text-slate-400" },
};

function firstName(contact: string | null): string {
  if (!contact) return "there";
  const m = contact.match(/^((?:Fr\.?|Father|Dr\.?|Sr\.?|Sister|Deacon)\s+\S+|\S+)/i);
  return (m ? m[1] : contact).replace(/\s*\(first name\)$/i, "");
}

function mailtoFor(p: ProspectRow): string {
  const role = p.roles?.split(";")[0]?.trim() ?? "open role";
  const subject = `Your ${role} opening — first listing free on Jobs For Catholics`;
  const body = `Hi ${firstName(p.contact)},

I saw ${p.name} is hiring a ${role}${p.location ? ` in ${p.location}` : ""} and wanted to reach out directly.

Jobs For Catholics is more than a job listing site — we're a recruitment platform for mission-driven Catholic employers. AI-based matching scores every candidate against your posting, our AI assistant writes the job description for you, and your listing reaches an audience that already cares about the mission.

Your first listing is free — no card, no contract. Post it in about two minutes:
https://jobsforcatholics.com/employer/post

Would love to help you fill this one.

Dennis McCarthy
Jobs For Catholics`;
  return `mailto:${p.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function ProspectBoard({ initial }: { initial: ProspectRow[] }) {
  const [rows, setRows] = useState(initial);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [openNotes, setOpenNotes] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState("");

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const r of rows) c[r.status] = (c[r.status] ?? 0) + 1;
    return c;
  }, [rows]);

  const filtered = rows.filter((r) => {
    if (statusFilter && r.status !== statusFilter) return false;
    if (!q.trim()) return true;
    const hay = [r.name, r.contact, r.email, r.location, r.roles, r.orgType]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return hay.includes(q.toLowerCase());
  });

  const setStatus = async (id: string, status: string) => {
    const prev = rows;
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
    const res = await fetch(`/api/prospects/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }).catch(() => null);
    if (!res?.ok) setRows(prev);
  };

  const saveNote = async (id: string) => {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, notes: noteDraft } : r)));
    setOpenNotes(null);
    await fetch(`/api/prospects/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes: noteDraft }),
    }).catch(() => {});
  };

  return (
    <div>
      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5">
          <p className="font-heading text-2xl font-medium text-ink">{rows.length}</p>
          <p className="text-xs font-semibold tracking-wide text-muted uppercase">Prospects</p>
        </div>
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(statusFilter === s ? null : s)}
            className={`rounded-xl p-4 text-left shadow-sm ring-1 transition ${
              statusFilter === s ? "bg-brand-tint ring-brand" : "bg-white ring-black/5 hover:ring-brand/40"
            }`}
          >
            <p className="font-heading text-2xl font-medium text-ink">{counts[s] ?? 0}</p>
            <p className="text-xs font-semibold tracking-wide text-muted uppercase">
              {STATUS_META[s].label}
            </p>
          </button>
        ))}
      </div>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Filter by name, contact, email, city, or role…"
        className="mb-4 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-ink placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none"
      />

      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
        <table className="w-full min-w-[900px] text-sm">
          <thead>
            <tr className="border-b border-black/5 text-left text-xs font-semibold tracking-wide text-muted uppercase">
              <th className="px-4 py-3">Employer</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Hiring for</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Outreach</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-black/5 align-top last:border-none hover:bg-brand-tint/30">
                <td className="px-4 py-3">
                  <p className="font-semibold text-ink">{p.name}</p>
                  {p.domain && (
                    <a
                      href={`https://${p.domain}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-brand-dark hover:underline"
                    >
                      {p.domain}
                    </a>
                  )}
                  {p.notes && (
                    <p className="mt-1 max-w-52 text-xs text-muted italic">“{p.notes}”</p>
                  )}
                </td>
                <td className="px-4 py-3 text-muted">{p.orgType ?? "—"}</td>
                <td className="px-4 py-3 text-muted">{p.location ?? "—"}</td>
                <td className="px-4 py-3">
                  <p className="text-ink/80">{p.contact || <span className="text-muted/60">—</span>}</p>
                  {p.email ? (
                    <p className="text-xs text-muted">{p.email}</p>
                  ) : (
                    <p className="text-xs text-amber-600">apply-form only</p>
                  )}
                </td>
                <td className="max-w-56 px-4 py-3 text-muted">
                  {p.roles ?? "—"}
                  {p.jobCount > 1 && (
                    <span className="ml-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold">
                      {p.jobCount} roles
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <select
                    value={p.status}
                    onChange={(e) => setStatus(p.id, e.target.value)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${STATUS_META[p.status]?.cls ?? ""}`}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {STATUS_META[s].label}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-1.5">
                    {p.email && (
                      <a
                        href={mailtoFor(p)}
                        onClick={() => {
                          if (p.status === "NEW" || p.status === "QUEUED") setStatus(p.id, "EMAILED");
                        }}
                        className="rounded-full bg-brand px-4 py-1.5 text-center text-xs font-semibold text-white transition hover:bg-brand-dark"
                      >
                        ✉ Draft email
                      </a>
                    )}
                    <button
                      onClick={() => {
                        setOpenNotes(openNotes === p.id ? null : p.id);
                        setNoteDraft(p.notes ?? "");
                      }}
                      className="rounded-full px-4 py-1.5 text-xs font-semibold text-muted ring-1 ring-slate-200 transition hover:text-brand-dark hover:ring-brand/40"
                    >
                      {p.notes ? "Edit note" : "Add note"}
                    </button>
                    {openNotes === p.id && (
                      <div className="mt-1 w-56">
                        <textarea
                          value={noteDraft}
                          onChange={(e) => setNoteDraft(e.target.value)}
                          className="w-full rounded-lg border border-slate-200 p-2 text-xs focus:border-brand focus:outline-none"
                          rows={3}
                          autoFocus
                        />
                        <button
                          onClick={() => saveNote(p.id)}
                          className="mt-1 rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white"
                        >
                          Save
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="px-4 py-10 text-center text-muted">No prospects match.</p>
        )}
      </div>
    </div>
  );
}
