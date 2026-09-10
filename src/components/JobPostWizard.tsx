"use client";

import { useState } from "react";

const CATEGORIES = ["Ministry", "Education", "Higher Ed", "Healthcare", "Nonprofit", "Communications", "Music & Liturgy", "Administration", "Technology", "Trades", "Recruiting", "Sales & Marketing", "Marketing"];
const TYPES = [["FULL_TIME", "Full-time"], ["PART_TIME", "Part-time"], ["CONTRACT", "Contract"], ["TEMPORARY", "Temporary"], ["INTERNSHIP", "Internship"], ["VOLUNTEER", "Volunteer"]];
const MODES = [["ONSITE", "On-site"], ["HYBRID", "Hybrid"], ["REMOTE", "Remote"]];
const ORG_TYPES = ["Parish", "Catholic School", "Diocese", "University", "Nonprofit / Apostolate", "Healthcare", "Business"];

const STEPS = ["Organization", "The role", "Description", "Publish"];

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-ink placeholder:text-muted/70 transition focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none";

function Field({ label, optional, hint, children }: { label: string; optional?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline gap-2 text-sm font-semibold text-ink">
        {label}
        {optional && <span className="text-xs font-normal text-muted">optional</span>}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  );
}

export default function JobPostWizard() {
  const [step, setStep] = useState(0);
  const [orgName, setOrgName] = useState("");
  const [orgType, setOrgType] = useState("");
  const [mission, setMission] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("FULL_TIME");
  const [mode, setMode] = useState("ONSITE");
  const [location, setLocation] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [requirements, setRequirements] = useState("");
  const [perks, setPerks] = useState("");
  const [description, setDescription] = useState("");
  const [generating, setGenerating] = useState(false);
  const [genSource, setGenSource] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [publishedSlug, setPublishedSlug] = useState<string | null>(null);

  const typeLabel = TYPES.find(([v]) => v === type)?.[1] ?? "";
  const modeLabel = MODES.find(([v]) => v === mode)?.[1] ?? "";

  const validate = (s: number): string | null => {
    if (s === 0 && !orgName.trim()) return "Enter your organization's name.";
    if (s === 1 && !title.trim()) return "Enter the job title.";
    if (s === 2 && !description.trim())
      return "Generate or write a description before continuing.";
    return null;
  };

  const next = () => {
    const err = validate(step);
    if (err) return setError(err);
    setError(null);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const generate = async () => {
    if (generating) return;
    setGenerating(true);
    setError(null);
    try {
      const res = await fetch("/api/generate/jd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title, orgName, orgType, mission, location, typeLabel, modeLabel,
          responsibilities: responsibilities.split("\n"),
          requirements: requirements.split("\n"),
          perks: perks.split("\n"),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Generation failed.");
      setDescription(data.description);
      setGenSource(data.source);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Generation failed.");
    } finally {
      setGenerating(false);
    }
  };

  const publish = async () => {
    if (publishing) return;
    setPublishing(true);
    setError(null);
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title, orgName, orgType, mission, description, location,
          type, workMode: mode, category,
          salaryMin: salaryMin || null, salaryMax: salaryMax || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Publish failed.");
      setPublishedSlug(data.slug);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Publish failed.");
      setPublishing(false);
    }
  };

  if (publishedSlug) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-tint">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-10 w-10 text-brand-dark">
            <path d="m4.5 12.5 5 5 10-11" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h1 className="mt-6 font-heading text-3xl font-medium text-ink">Your job is live!</h1>
        <p className="mt-3 text-muted">
          {title} at {orgName} is published and already appearing in search.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={`/jobs/${publishedSlug}`}
            className="rounded-full bg-brand px-7 py-3 font-semibold text-white shadow-md shadow-brand/30 transition hover:bg-brand-dark"
          >
            View Your Posting
          </a>
          <a
            href="/employer/post"
            className="rounded-full border border-brand px-7 py-3 font-semibold text-brand-dark transition hover:bg-brand hover:text-white"
          >
            Post Another
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <p className="text-xs font-semibold tracking-[0.3em] text-brand-dark uppercase">Post a Job</p>
      <h1 className="mt-3 font-heading text-4xl font-medium tracking-tight text-ink">
        Reach candidates who share your mission.
      </h1>
      <p className="mt-3 text-muted">
        Answer a few questions — our writing assistant drafts the posting for you.
      </p>

      <ol className="mt-10 flex items-center gap-2">
        {STEPS.map((label, i) => (
          <li key={label} className="flex flex-1 flex-col gap-1.5">
            <span className={`h-1.5 rounded-full transition-colors duration-500 ${i < step ? "bg-brand" : i === step ? "bg-brand-dark" : "bg-slate-200"}`} />
            <span className={`text-xs font-semibold tracking-wide uppercase ${i === step ? "text-brand-dark" : "text-muted"}`}>{label}</span>
          </li>
        ))}
      </ol>

      <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
        {step === 0 && (
          <div className="space-y-5">
            <Field label="Organization name">
              <input className={inputCls} value={orgName} onChange={(e) => setOrgName(e.target.value)} placeholder="e.g. St. Michael the Archangel Parish" />
            </Field>
            <Field label="Organization type" optional>
              <div className="flex flex-wrap gap-2">
                {ORG_TYPES.map((t) => (
                  <button key={t} type="button" aria-pressed={orgType === t} onClick={() => setOrgType(orgType === t ? "" : t)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition ${orgType === t ? "border-brand bg-brand text-white shadow-sm shadow-brand/30" : "border-slate-200 bg-white text-ink hover:border-brand hover:text-brand-dark"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Your mission, in a sentence or two" optional hint="The assistant weaves this into the posting — it's what makes candidates lean in.">
              <textarea className={`${inputCls} min-h-24 resize-y`} value={mission} onChange={(e) => setMission(e.target.value)} maxLength={600}
                placeholder="e.g. We form joyful disciples through classical education rooted in the Catholic tradition." />
            </Field>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <Field label="Job title">
              <input className={inputCls} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Director of Religious Education" />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Category" optional>
                <select className={inputCls} value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Select…</option>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Location" optional>
                <input className={inputCls} value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City, ST or Remote" />
              </Field>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Job type">
                <select className={inputCls} value={type} onChange={(e) => setType(e.target.value)}>
                  {TYPES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </Field>
              <Field label="Work setting">
                <select className={inputCls} value={mode} onChange={(e) => setMode(e.target.value)}>
                  {MODES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </Field>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Salary min" optional hint="Postings with real ranges get far more applicants.">
                <input className={inputCls} value={salaryMin} onChange={(e) => setSalaryMin(e.target.value)} inputMode="numeric" placeholder="48000 (or 24 for hourly)" />
              </Field>
              <Field label="Salary max" optional>
                <input className={inputCls} value={salaryMax} onChange={(e) => setSalaryMax(e.target.value)} inputMode="numeric" placeholder="62000" />
              </Field>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <Field label="Key responsibilities" hint="Plain notes are fine — one per line. The assistant turns them into polished bullets.">
              <textarea className={`${inputCls} min-h-24 resize-y`} value={responsibilities} onChange={(e) => setResponsibilities(e.target.value)}
                placeholder={"teach 5 sections of theology\nlead senior retreat\nmentor students"} />
            </Field>
            <Field label="Requirements" hint="One per line.">
              <textarea className={`${inputCls} min-h-24 resize-y`} value={requirements} onChange={(e) => setRequirements(e.target.value)}
                placeholder={"practicing Catholic\nbachelor's in theology\n2+ years teaching"} />
            </Field>
            <Field label="Perks & benefits" optional hint="One per line.">
              <textarea className={`${inputCls} min-h-20 resize-y`} value={perks} onChange={(e) => setPerks(e.target.value)}
                placeholder={"tuition discount for staff children\ndaily Mass on campus"} />
            </Field>

            <button
              type="button"
              onClick={generate}
              disabled={generating}
              className="btn-shimmer flex w-full items-center justify-center gap-2.5 rounded-2xl px-6 py-4 font-semibold text-white shadow-lg shadow-brand/30 transition hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" strokeLinecap="round" />
              </svg>
              {generating ? "Writing your posting…" : description ? "Regenerate description" : "Write my job description"}
            </button>

            {description && (
              <Field label="Your description" hint={genSource === "ai" ? "Drafted by AI from your notes — edit freely." : "Assembled from your notes — edit freely. (AI polish activates once an API key is configured.)"}>
                <textarea className={`${inputCls} min-h-64 resize-y font-[inherit]`} value={description} onChange={(e) => setDescription(e.target.value)} />
              </Field>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-slate-50 p-5 text-sm">
              <p className="font-semibold text-ink">Ready to publish</p>
              <dl className="mt-3 space-y-1.5 text-muted">
                <div className="flex gap-2"><dt className="font-medium text-ink">Role:</dt><dd>{title} — {typeLabel}, {modeLabel}</dd></div>
                <div className="flex gap-2"><dt className="font-medium text-ink">Organization:</dt><dd>{orgName}{orgType && ` (${orgType})`}</dd></div>
                {location && <div className="flex gap-2"><dt className="font-medium text-ink">Location:</dt><dd>{location}</dd></div>}
                {(salaryMin || salaryMax) && <div className="flex gap-2"><dt className="font-medium text-ink">Salary:</dt><dd>{salaryMin}{salaryMax && ` – ${salaryMax}`}</dd></div>}
              </dl>
            </div>
            <div className="max-h-72 overflow-y-auto rounded-2xl border border-slate-200 p-5 text-sm leading-relaxed whitespace-pre-line text-ink/80">
              {description}
            </div>
            <p className="text-xs text-muted">
              Publishing makes this posting live in search immediately. You can request edits any time.
            </p>
          </div>
        )}

        {error && (
          <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{error}</p>
        )}

        <div className="mt-8 flex items-center justify-between">
          {step > 0 ? (
            <button type="button" onClick={() => { setError(null); setStep(step - 1); }} className="rounded-full px-6 py-3 font-semibold text-muted transition hover:text-ink">
              ← Back
            </button>
          ) : <span />}
          {step < STEPS.length - 1 ? (
            <button type="button" onClick={next} className="rounded-full bg-brand px-8 py-3 font-semibold text-white shadow-md shadow-brand/30 transition hover:-translate-y-0.5 hover:bg-brand-dark">
              Continue
            </button>
          ) : (
            <button type="button" onClick={publish} disabled={publishing} className="rounded-full bg-brand px-8 py-3 font-semibold text-white shadow-md shadow-brand/30 transition hover:-translate-y-0.5 hover:bg-brand-dark disabled:opacity-60">
              {publishing ? "Publishing…" : "Publish Job"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
