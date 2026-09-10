"use client";

import { useEffect, useRef, useState } from "react";

const CATEGORIES = [
  "Ministry",
  "Education",
  "Healthcare",
  "Nonprofit",
  "Communications",
  "Music & Liturgy",
  "Administration",
  "Technology",
  "Trades",
  "Sales & Marketing",
];

const JOB_TYPES = [
  { value: "FULL_TIME", label: "Full-time" },
  { value: "PART_TIME", label: "Part-time" },
  { value: "CONTRACT", label: "Contract" },
  { value: "TEMPORARY", label: "Temporary" },
  { value: "INTERNSHIP", label: "Internship" },
  { value: "VOLUNTEER", label: "Volunteer" },
];

const WORK_MODES = [
  { value: "ONSITE", label: "On-site" },
  { value: "HYBRID", label: "Hybrid" },
  { value: "REMOTE", label: "Remote" },
];

const EXPERIENCE = ["0–2 years", "3–5 years", "6–10 years", "11–20 years", "20+ years"];

const EDUCATION = [
  "High school",
  "Some college",
  "Associate degree",
  "Bachelor's degree",
  "Master's degree",
  "Doctorate",
  "Trade certification",
];

const STATES = "AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY DC".split(" ");

const FREQUENCIES = [
  { value: "INSTANT", label: "Instantly", hint: "The moment a match posts" },
  { value: "DAILY", label: "Daily", hint: "One digest each morning" },
  { value: "WEEKLY", label: "Weekly", hint: "A Monday roundup" },
  { value: "OFF", label: "Not now", hint: "I'll check on my own" },
];

const STEPS = ["About you", "Your calling", "Experience", "Finish"];

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  zip: string;
  desiredTitles: string[];
  categories: string[];
  jobTypes: string[];
  workModes: string[];
  relocate: boolean;
  headline: string;
  yearsExperience: string;
  education: string;
  linkedin: string;
  bio: string;
  resumeName: string;
  alertFrequency: string;
  searchable: boolean;
};

const EMPTY: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  state: "",
  zip: "",
  desiredTitles: [],
  categories: [],
  jobTypes: [],
  workModes: [],
  relocate: false,
  headline: "",
  yearsExperience: "",
  education: "",
  linkedin: "",
  bio: "",
  resumeName: "",
  alertFrequency: "WEEKLY",
  searchable: true,
};

const DRAFT_KEY = "jfc-candidate-intake-draft";

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-ink placeholder:text-muted/70 transition focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none";

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
        active
          ? "border-brand bg-brand text-white shadow-sm shadow-brand/30"
          : "border-slate-200 bg-white text-ink hover:border-brand hover:text-brand-dark"
      }`}
    >
      {children}
    </button>
  );
}

function Field({
  label,
  optional,
  children,
}: {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline gap-2 text-sm font-semibold text-ink">
        {label}
        {optional && (
          <span className="text-xs font-normal text-muted">optional</span>
        )}
      </span>
      {children}
    </label>
  );
}

type Media = { name: string; url: string };

export default function CandidateIntake() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [titleDraft, setTitleDraft] = useState("");
  const [headshot, setHeadshot] = useState<Media | null>(null);
  const [portfolio, setPortfolio] = useState<Media[]>([]);
  const [videoIntro, setVideoIntro] = useState("");
  const [mediaOpen, setMediaOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) setForm({ ...EMPTY, ...JSON.parse(raw) });
    } catch {
      // bad draft — start clean
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded || done) return;
    localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
  }, [form, loaded, done]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleIn = (key: "categories" | "jobTypes" | "workModes", value: string) =>
    setForm((f) => ({
      ...f,
      [key]: f[key].includes(value)
        ? f[key].filter((x) => x !== value)
        : [...f[key], value],
    }));

  const addTitle = () => {
    const t = titleDraft.trim();
    if (!t || form.desiredTitles.includes(t) || form.desiredTitles.length >= 10) return;
    set("desiredTitles", [...form.desiredTitles, t]);
    setTitleDraft("");
  };

  const validate = (s: number): string | null => {
    if (s === 0) {
      if (!form.firstName.trim() || !form.lastName.trim()) return "Please enter your name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Please enter a valid email address.";
    }
    if (s === 1 && form.categories.length === 0 && form.desiredTitles.length === 0)
      return "Add at least one job title or category so we know what to match.";
    return null;
  };

  const next = () => {
    const err = validate(step);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const back = () => {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
  };

  const submit = async () => {
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/candidates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          headshotName: headshot?.name ?? null,
          portfolioNames: portfolio.map((p) => p.name),
          videoName: videoIntro || null,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }
      const data = await res.json().catch(() => ({}));
      if (data.profileId) {
        // identify this browser for fit scores until real auth lands
        document.cookie = `jfc_candidate=${data.profileId}; path=/; max-age=31536000; SameSite=Lax`;
      }
      localStorage.removeItem(DRAFT_KEY);
      setDone(true);
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div ref={topRef} className="mx-auto max-w-xl px-4 py-24 text-center">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-tint">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-10 w-10 text-brand-dark">
            <path d="m4.5 12.5 5 5 10-11" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h1 className="mt-6 font-heading text-3xl font-medium text-ink">
          Welcome, {form.firstName}!
        </h1>
        <p className="mt-3 leading-relaxed text-muted">
          Your profile is in. We&apos;ll email{" "}
          <span className="font-semibold text-ink">{form.email}</span> a sign-in
          link — no password to remember. Job matches
          {form.alertFrequency !== "OFF" && " will start arriving soon"}
          {form.alertFrequency === "OFF" && " are waiting whenever you're ready"}
          .
        </p>
        <a
          href="/search"
          className="mt-8 inline-block rounded-full bg-brand px-8 py-3.5 font-semibold text-white shadow-lg shadow-brand/30 transition hover:-translate-y-0.5 hover:bg-brand-dark"
        >
          Browse Jobs Now
        </a>
      </div>
    );
  }

  return (
    <div ref={topRef} className="mx-auto max-w-2xl px-4 py-14">
      <p className="text-xs font-semibold tracking-[0.3em] text-brand-dark uppercase">
        Candidate Profile
      </p>
      <h1 className="mt-3 font-heading text-4xl font-medium tracking-tight text-ink">
        Let opportunity find you.
      </h1>
      <p className="mt-3 text-muted">
        A few minutes now, a career that fits your faith later. No password
        needed — we sign you in by email.
      </p>

      {/* stepper */}
      <ol className="mt-10 flex items-center gap-2">
        {STEPS.map((label, i) => (
          <li key={label} className="flex flex-1 flex-col gap-1.5">
            <span
              className={`h-1.5 rounded-full transition-colors duration-500 ${
                i < step ? "bg-brand" : i === step ? "bg-brand-dark" : "bg-slate-200"
              }`}
            />
            <span
              className={`text-xs font-semibold tracking-wide uppercase ${
                i === step ? "text-brand-dark" : "text-muted"
              }`}
            >
              {label}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
        {step === 0 && (
          <div className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="First name">
                <input
                  className={inputCls}
                  value={form.firstName}
                  onChange={(e) => set("firstName", e.target.value)}
                  autoComplete="given-name"
                />
              </Field>
              <Field label="Last name">
                <input
                  className={inputCls}
                  value={form.lastName}
                  onChange={(e) => set("lastName", e.target.value)}
                  autoComplete="family-name"
                />
              </Field>
            </div>
            <Field label="Email">
              <input
                type="email"
                className={inputCls}
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                autoComplete="email"
                placeholder="you@example.com"
              />
            </Field>
            <Field label="Phone" optional>
              <input
                type="tel"
                className={inputCls}
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                autoComplete="tel"
              />
            </Field>
            <div className="grid gap-5 sm:grid-cols-3">
              <Field label="City" optional>
                <input
                  className={inputCls}
                  value={form.city}
                  onChange={(e) => set("city", e.target.value)}
                  autoComplete="address-level2"
                />
              </Field>
              <Field label="State" optional>
                <select
                  className={inputCls}
                  value={form.state}
                  onChange={(e) => set("state", e.target.value)}
                >
                  <option value="">—</option>
                  {STATES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </Field>
              <Field label="ZIP" optional>
                <input
                  className={inputCls}
                  value={form.zip}
                  onChange={(e) => set("zip", e.target.value)}
                  autoComplete="postal-code"
                  inputMode="numeric"
                />
              </Field>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-7">
            <Field label="What roles are you looking for?">
              <div className="flex gap-2">
                <input
                  className={inputCls}
                  value={titleDraft}
                  onChange={(e) => setTitleDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTitle();
                    }
                  }}
                  placeholder="e.g. Theology Teacher — press Enter to add"
                />
                <button
                  type="button"
                  onClick={addTitle}
                  className="shrink-0 rounded-xl bg-brand px-5 font-semibold text-white transition hover:bg-brand-dark"
                >
                  Add
                </button>
              </div>
              {form.desiredTitles.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {form.desiredTitles.map((t) => (
                    <span
                      key={t}
                      className="flex items-center gap-1.5 rounded-full bg-brand-tint px-3.5 py-1.5 text-sm font-medium text-brand-dark"
                    >
                      {t}
                      <button
                        type="button"
                        aria-label={`Remove ${t}`}
                        onClick={() =>
                          set("desiredTitles", form.desiredTitles.filter((x) => x !== t))
                        }
                        className="hover:text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </Field>

            <Field label="Categories that fit your calling">
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <Chip key={c} active={form.categories.includes(c)} onClick={() => toggleIn("categories", c)}>
                    {c}
                  </Chip>
                ))}
              </div>
            </Field>

            <div className="grid gap-7 sm:grid-cols-2">
              <Field label="Job types">
                <div className="flex flex-wrap gap-2">
                  {JOB_TYPES.map((t) => (
                    <Chip key={t.value} active={form.jobTypes.includes(t.value)} onClick={() => toggleIn("jobTypes", t.value)}>
                      {t.label}
                    </Chip>
                  ))}
                </div>
              </Field>
              <Field label="Work setting">
                <div className="flex flex-wrap gap-2">
                  {WORK_MODES.map((m) => (
                    <Chip key={m.value} active={form.workModes.includes(m.value)} onClick={() => toggleIn("workModes", m.value)}>
                      {m.label}
                    </Chip>
                  ))}
                </div>
              </Field>
            </div>

            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={form.relocate}
                onChange={(e) => set("relocate", e.target.checked)}
                className="h-5 w-5 rounded border-slate-300 accent-[#0085c8]"
              />
              <span className="text-sm font-medium text-ink">
                I&apos;m open to relocating for the right opportunity
              </span>
            </label>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <Field label="Current or most recent title" optional>
              <input
                className={inputCls}
                value={form.headline}
                onChange={(e) => set("headline", e.target.value)}
                placeholder="e.g. Director of Religious Education"
              />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Years of experience" optional>
                <select
                  className={inputCls}
                  value={form.yearsExperience}
                  onChange={(e) => set("yearsExperience", e.target.value)}
                >
                  <option value="">Select…</option>
                  {EXPERIENCE.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </Field>
              <Field label="Education" optional>
                <select
                  className={inputCls}
                  value={form.education}
                  onChange={(e) => set("education", e.target.value)}
                >
                  <option value="">Select…</option>
                  {EDUCATION.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </Field>
            </div>
            <Field label="LinkedIn or portfolio URL" optional>
              <input
                className={inputCls}
                value={form.linkedin}
                onChange={(e) => set("linkedin", e.target.value)}
                placeholder="https://linkedin.com/in/…"
                inputMode="url"
              />
            </Field>
            <Field label="Resume" optional>
              <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-center transition hover:border-brand hover:bg-brand-tint/40">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-8 w-8 text-brand-dark">
                  <path d="M12 16V4m0 0 4 4m-4-4L8 8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" strokeLinecap="round" />
                </svg>
                {form.resumeName ? (
                  <span className="text-sm font-semibold text-ink">{form.resumeName}</span>
                ) : (
                  <>
                    <span className="text-sm font-semibold text-ink">
                      Drop your resume here or click to browse
                    </span>
                    <span className="text-xs text-muted">PDF or Word, up to 10 MB</span>
                  </>
                )}
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => set("resumeName", e.target.files?.[0]?.name ?? "")}
                />
              </label>
            </Field>
            <Field label="A little about you" optional>
              <textarea
                className={`${inputCls} min-h-28 resize-y`}
                value={form.bio}
                onChange={(e) => set("bio", e.target.value)}
                maxLength={2000}
                placeholder="Your story, your gifts, and what mission-driven work means to you."
              />
            </Field>

            {/* fancy media reveal */}
            <div>
              <button
                type="button"
                onClick={() => setMediaOpen(!mediaOpen)}
                aria-expanded={mediaOpen}
                className="btn-shimmer flex w-full items-center justify-center gap-2.5 rounded-2xl px-6 py-4 font-semibold text-white shadow-lg shadow-brand/30 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                  <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" strokeLinecap="round" />
                </svg>
                {mediaOpen ? "Hide media studio" : "Stand out — add a headshot, portfolio & video intro"}
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`h-4 w-4 transition-transform duration-300 ${mediaOpen ? "rotate-180" : ""}`}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.3 7.8a1 1 0 0 1 1.4 0L10 11.1l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  mediaOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="space-y-5 rounded-2xl border border-brand/20 bg-brand-tint/40 p-5">
                    <div className="flex items-center gap-4">
                      {headshot ? (
                        <div className="group relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-2 ring-brand/40">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={headshot.url} alt="Headshot preview" className="h-full w-full object-cover" />
                          <button
                            type="button"
                            aria-label="Remove headshot"
                            onClick={() => {
                              URL.revokeObjectURL(headshot.url);
                              setHeadshot(null);
                            }}
                            className="absolute inset-0 flex items-center justify-center bg-ink/60 text-white opacity-0 transition group-hover:opacity-100"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <label className="flex h-20 w-20 shrink-0 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-dashed border-brand/40 bg-white text-brand-dark transition hover:border-brand hover:bg-brand-tint">
                          <span className="text-xl leading-none">+</span>
                          <span className="text-[10px] font-semibold">Headshot</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) setHeadshot({ name: f.name, url: URL.createObjectURL(f) });
                            }}
                          />
                        </label>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-ink">Professional headshot</p>
                        <p className="text-xs text-muted">
                          Profiles with a photo get noticed first.
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-ink">Portfolio</p>
                      <p className="text-xs text-muted">
                        Lesson plans, music, design work — up to 8 images.
                      </p>
                      <div className="mt-3 grid grid-cols-4 gap-3">
                        {portfolio.map((g, i) => (
                          <div key={g.url} className="group relative aspect-square overflow-hidden rounded-xl ring-1 ring-black/10">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={g.url} alt={g.name} className="h-full w-full object-cover" />
                            <button
                              type="button"
                              aria-label={`Remove ${g.name}`}
                              onClick={() => {
                                URL.revokeObjectURL(g.url);
                                setPortfolio(portfolio.filter((_, x) => x !== i));
                              }}
                              className="absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-ink/70 text-xs text-white opacity-0 transition group-hover:opacity-100"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                        {portfolio.length < 8 && (
                          <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-brand/40 bg-white text-brand-dark transition hover:border-brand hover:bg-brand-tint">
                            <span className="text-2xl leading-none">+</span>
                            <span className="text-xs font-semibold">Add</span>
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              onChange={(e) => {
                                const files = e.target.files;
                                if (!files) return;
                                const next = [...portfolio];
                                for (const f of Array.from(files).slice(0, 8 - next.length)) {
                                  next.push({ name: f.name, url: URL.createObjectURL(f) });
                                }
                                setPortfolio(next);
                              }}
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-ink">Video introduction</p>
                      <p className="text-xs text-muted">
                        30-60 seconds: who you are and what you&apos;re called to do.
                      </p>
                      {videoIntro ? (
                        <div className="mt-3 flex items-center justify-between rounded-xl bg-white px-4 py-3 ring-1 ring-black/10">
                          <span className="flex items-center gap-2 text-sm font-medium text-ink">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-brand-dark">
                              <path d="M4 5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3.2l4.6-2.9A1 1 0 0 1 22 6.2v11.6a1 1 0 0 1-1.4.9L16 15.8V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Z" />
                            </svg>
                            {videoIntro}
                          </span>
                          <button
                            type="button"
                            onClick={() => setVideoIntro("")}
                            className="text-sm text-muted hover:text-red-500"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-brand/40 bg-white px-4 py-5 text-sm font-semibold text-brand-dark transition hover:border-brand hover:bg-brand-tint">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                            <path d="M12 16V4m0 0 4 4m-4-4L8 8" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" strokeLinecap="round" />
                          </svg>
                          Upload a video (MP4, up to 200 MB)
                          <input
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={(e) => setVideoIntro(e.target.files?.[0]?.name ?? "")}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-7">
            <Field label="How often should we email you new matches?">
              <div className="grid gap-3 sm:grid-cols-2">
                {FREQUENCIES.map((f) => (
                  <button
                    key={f.value}
                    type="button"
                    onClick={() => set("alertFrequency", f.value)}
                    aria-pressed={form.alertFrequency === f.value}
                    className={`rounded-2xl border p-4 text-left transition ${
                      form.alertFrequency === f.value
                        ? "border-brand bg-brand-tint ring-2 ring-brand/30"
                        : "border-slate-200 bg-white hover:border-brand"
                    }`}
                  >
                    <span className="block font-semibold text-ink">{f.label}</span>
                    <span className="mt-0.5 block text-sm text-muted">{f.hint}</span>
                  </button>
                ))}
              </div>
            </Field>

            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={form.searchable}
                onChange={(e) => set("searchable", e.target.checked)}
                className="h-5 w-5 rounded border-slate-300 accent-[#0085c8]"
              />
              <span className="text-sm font-medium text-ink">
                Let verified employers discover my profile
              </span>
            </label>

            <div className="rounded-2xl bg-slate-50 p-5 text-sm">
              <p className="font-semibold text-ink">Quick review</p>
              <dl className="mt-3 space-y-1.5 text-muted">
                <div className="flex gap-2">
                  <dt className="font-medium text-ink">Name:</dt>
                  <dd>{form.firstName} {form.lastName}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-medium text-ink">Email:</dt>
                  <dd>{form.email}</dd>
                </div>
                {form.desiredTitles.length > 0 && (
                  <div className="flex gap-2">
                    <dt className="font-medium text-ink">Looking for:</dt>
                    <dd>{form.desiredTitles.join(", ")}</dd>
                  </div>
                )}
                {form.categories.length > 0 && (
                  <div className="flex gap-2">
                    <dt className="font-medium text-ink">Categories:</dt>
                    <dd>{form.categories.join(", ")}</dd>
                  </div>
                )}
                {(form.city || form.state) && (
                  <div className="flex gap-2">
                    <dt className="font-medium text-ink">Location:</dt>
                    <dd>{[form.city, form.state].filter(Boolean).join(", ")}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        )}

        {error && (
          <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        <div className="mt-8 flex items-center justify-between">
          {step > 0 ? (
            <button
              type="button"
              onClick={back}
              className="rounded-full px-6 py-3 font-semibold text-muted transition hover:text-ink"
            >
              ← Back
            </button>
          ) : (
            <span />
          )}
          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={next}
              className="rounded-full bg-brand px-8 py-3 font-semibold text-white shadow-md shadow-brand/30 transition hover:-translate-y-0.5 hover:bg-brand-dark"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={submitting}
              className="rounded-full bg-brand px-8 py-3 font-semibold text-white shadow-md shadow-brand/30 transition hover:-translate-y-0.5 hover:bg-brand-dark disabled:opacity-60"
            >
              {submitting ? "Creating…" : "Create My Profile"}
            </button>
          )}
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-muted">
        Your draft saves automatically on this device. We never share your
        details without your permission.
      </p>
    </div>
  );
}
