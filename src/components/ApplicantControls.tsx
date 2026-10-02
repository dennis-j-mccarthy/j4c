"use client";

import { useState } from "react";
import { PIPELINE } from "@/lib/pipeline";

export default function ApplicantControls({
  id,
  status: initialStatus,
  notes: initialNotes,
}: {
  id: string;
  status: string;
  notes: string | null;
}) {
  const [status, setStatus] = useState(initialStatus);
  const [notes, setNotes] = useState(initialNotes ?? "");
  const [savedNotes, setSavedNotes] = useState(initialNotes ?? "");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const patch = async (body: Record<string, string>) => {
    setError(null);
    const res = await fetch(`/api/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).catch(() => null);
    if (!res?.ok) {
      const data = await res?.json().catch(() => ({}));
      throw new Error(data?.error ?? "Couldn't save — try again.");
    }
  };

  const changeStatus = async (next: string) => {
    const prev = status;
    setStatus(next);
    try {
      await patch({ status: next });
    } catch (e) {
      setStatus(prev);
      setError(e instanceof Error ? e.message : "Couldn't save.");
    }
  };

  const saveNotes = async () => {
    if (saving || notes === savedNotes) return;
    setSaving(true);
    try {
      await patch({ notes });
      setSavedNotes(notes);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't save.");
    } finally {
      setSaving(false);
    }
  };

  const meta = PIPELINE.find((p) => p.value === status) ?? PIPELINE[0];

  return (
    <div className="mt-4 border-t border-black/5 pt-4">
      <div className="flex flex-wrap items-center gap-3">
        <label className="text-xs font-semibold tracking-wide text-muted uppercase" htmlFor={`status-${id}`}>
          Stage
        </label>
        <select
          id={`status-${id}`}
          value={status}
          onChange={(e) => changeStatus(e.target.value)}
          className={`rounded-full px-3 py-1.5 text-sm font-semibold ring-1 ${meta.cls}`}
        >
          {PIPELINE.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        onBlur={saveNotes}
        placeholder="Private notes — only your team sees these"
        rows={2}
        maxLength={2000}
        className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none"
      />
      <p className="mt-1 h-4 text-xs text-muted">
        {error ? <span className="text-red-600">{error}</span> : saving ? "Saving…" : notes !== savedNotes ? "Unsaved — click away to save" : savedNotes ? "Notes saved" : ""}
      </p>
    </div>
  );
}
