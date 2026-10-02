"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TYPE_LABELS, MODE_LABELS } from "@/lib/format";

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-ink placeholder:text-muted/70 transition focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none";

export type EditableJob = {
  id: string;
  slug: string;
  title: string;
  description: string;
  location: string | null;
  category: string | null;
  type: string;
  workMode: string;
  salaryMin: number | null;
  salaryMax: number | null;
  status: string;
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ink">{label}</span>
      {children}
    </label>
  );
}

export default function JobEditForm({ job }: { job: EditableJob }) {
  const router = useRouter();
  const [title, setTitle] = useState(job.title);
  const [location, setLocation] = useState(job.location ?? "");
  const [category, setCategory] = useState(job.category ?? "");
  const [type, setType] = useState(job.type);
  const [workMode, setWorkMode] = useState(job.workMode);
  const [salaryMin, setSalaryMin] = useState(job.salaryMin?.toString() ?? "");
  const [salaryMax, setSalaryMax] = useState(job.salaryMax?.toString() ?? "");
  const [description, setDescription] = useState(job.description);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/jobs/${job.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, location, category, type, workMode, salaryMin, salaryMax, description }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Couldn't save.");
      router.push("/employer/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't save.");
      setSaving(false);
    }
  };

  return (
    <form onSubmit={save} className="space-y-5 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
      <Field label="Job title">
        <input className={inputCls} value={title} onChange={(e) => setTitle(e.target.value)} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Location">
          <input className={inputCls} value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City, ST" />
        </Field>
        <Field label="Category">
          <input className={inputCls} value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Education" />
        </Field>
        <Field label="Job type">
          <select className={inputCls} value={type} onChange={(e) => setType(e.target.value)}>
            {Object.entries(TYPE_LABELS).map(([v, l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>
        </Field>
        <Field label="Work setting">
          <select className={inputCls} value={workMode} onChange={(e) => setWorkMode(e.target.value)}>
            {Object.entries(MODE_LABELS).map(([v, l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>
        </Field>
        <Field label="Salary from (optional)">
          <input className={inputCls} inputMode="numeric" value={salaryMin} onChange={(e) => setSalaryMin(e.target.value.replace(/[^\d]/g, ""))} placeholder="45000" />
        </Field>
        <Field label="Salary to (optional)">
          <input className={inputCls} inputMode="numeric" value={salaryMax} onChange={(e) => setSalaryMax(e.target.value.replace(/[^\d]/g, ""))} placeholder="55000" />
        </Field>
      </div>
      <Field label="Description">
        <textarea className={`${inputCls} min-h-72 resize-y`} value={description} onChange={(e) => setDescription(e.target.value)} />
      </Field>
      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{error}</p>}
      <div className="flex flex-wrap items-center justify-end gap-3">
        <a href="/employer/dashboard" className="rounded-full px-6 py-3 font-semibold text-muted transition hover:text-ink">
          Cancel
        </a>
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-brand px-8 py-3 font-semibold text-white shadow-md shadow-brand/30 transition hover:bg-brand-dark disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </form>
  );
}
