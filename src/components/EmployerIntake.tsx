"use client";

import { useEffect, useRef, useState } from "react";

const ORG_TYPES = [
  "Parish",
  "Catholic School",
  "Diocese",
  "University",
  "Nonprofit / Apostolate",
  "Healthcare",
  "Business",
];

const SIZES = ["1–10", "11–50", "51–200", "201–1,000", "1,000+"];

const STATES = "AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY DC".split(" ");

const PLANS = [
  {
    value: "starter",
    name: "Starter",
    price: "$99",
    per: "per posting",
    perks: ["One 60-day job posting", "Standard placement", "Email support"],
  },
  {
    value: "standard",
    name: "Standard",
    price: "$249",
    per: "per quarter",
    perks: ["3 active postings", "One featured slot", "Candidate search access"],
    popular: true,
  },
  {
    value: "partner",
    name: "Mission Partner",
    price: "$499",
    per: "per quarter",
    perks: ["Unlimited postings", "Profile spotlight + media", "Dedicated support"],
  },
];

const STEPS = ["Organization", "Profile & media", "Plan & review"];

type Media = { name: string; url: string };

type FormState = {
  orgName: string;
  orgType: string;
  website: string;
  contactName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  size: string;
  about: string;
  plan: string;
};

const EMPTY: FormState = {
  orgName: "",
  orgType: "",
  website: "",
  contactName: "",
  email: "",
  phone: "",
  city: "",
  state: "",
  size: "",
  about: "",
  plan: "standard",
};

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-ink placeholder:text-muted/70 transition focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none";

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
        {optional && <span className="text-xs font-normal text-muted">optional</span>}
      </span>
      {children}
    </label>
  );
}

export default function EmployerIntake() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [gallery, setGallery] = useState<Media[]>([]);
  const [video, setVideo] = useState<string>("");
  const [mediaOpen, setMediaOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => gallery.forEach((g) => URL.revokeObjectURL(g.url));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const addImages = (files: FileList | null) => {
    if (!files) return;
    const next = [...gallery];
    for (const file of Array.from(files).slice(0, 12 - next.length)) {
      next.push({ name: file.name, url: URL.createObjectURL(file) });
    }
    setGallery(next);
  };

  const validate = (s: number): string | null => {
    if (s === 0) {
      if (!form.orgName.trim()) return "Please enter your organization's name.";
      if (!form.orgType) return "Pick the option that best describes your organization.";
      if (!form.contactName.trim()) return "Please enter a contact name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        return "Please enter a valid work email.";
    }
    return null;
  };

  const next = () => {
    const err = validate(step);
    if (err) return setError(err);
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
      const res = await fetch("/api/employers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          galleryNames: gallery.map((g) => g.name),
          videoName: video || null,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setDone(true);
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
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
          Welcome aboard, {form.orgName}!
        </h1>
        <p className="mt-3 leading-relaxed text-muted">
          Your employer profile is in. We&apos;ll email{" "}
          <span className="font-semibold text-ink">{form.email}</span> a
          sign-in link so you can post your first job.
        </p>
        <a
          href="/search"
          className="mt-8 inline-block rounded-full bg-brand px-8 py-3.5 font-semibold text-white shadow-lg shadow-brand/30 transition hover:-translate-y-0.5 hover:bg-brand-dark"
        >
          See the Board
        </a>
      </div>
    );
  }

  return (
    <div ref={topRef} className="mx-auto max-w-2xl px-4 py-14">
      <p className="text-xs font-semibold tracking-[0.3em] text-brand-dark uppercase">
        Employer Onboarding
      </p>
      <h1 className="mt-3 font-heading text-4xl font-medium tracking-tight text-ink">
        Hire people who share your mission.
      </h1>
      <p className="mt-3 text-muted">
        Set up your organization once — post jobs in minutes forever after.
      </p>

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
            <Field label="Organization name">
              <input
                className={inputCls}
                value={form.orgName}
                onChange={(e) => set("orgName", e.target.value)}
                placeholder="e.g. St. Michael the Archangel Parish"
              />
            </Field>
            <Field label="Which best describes you?">
              <div className="flex flex-wrap gap-2">
                {ORG_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={form.orgType === t}
                    onClick={() => set("orgType", t)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                      form.orgType === t
                        ? "border-brand bg-brand text-white shadow-sm shadow-brand/30"
                        : "border-slate-200 bg-white text-ink hover:border-brand hover:text-brand-dark"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Website" optional>
              <input
                className={inputCls}
                value={form.website}
                onChange={(e) => set("website", e.target.value)}
                placeholder="https://…"
                inputMode="url"
              />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Contact name">
                <input
                  className={inputCls}
                  value={form.contactName}
                  onChange={(e) => set("contactName", e.target.value)}
                  autoComplete="name"
                />
              </Field>
              <Field label="Work email">
                <input
                  type="email"
                  className={inputCls}
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  autoComplete="email"
                />
              </Field>
            </div>
            <Field label="Phone" optional>
              <input
                type="tel"
                className={inputCls}
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                autoComplete="tel"
              />
            </Field>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-3">
              <Field label="City" optional>
                <input
                  className={inputCls}
                  value={form.city}
                  onChange={(e) => set("city", e.target.value)}
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
              <Field label="Team size" optional>
                <select
                  className={inputCls}
                  value={form.size}
                  onChange={(e) => set("size", e.target.value)}
                >
                  <option value="">Select…</option>
                  {SIZES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </Field>
            </div>
            <Field label="Your mission, in your words" optional>
              <textarea
                className={`${inputCls} min-h-28 resize-y`}
                value={form.about}
                onChange={(e) => set("about", e.target.value)}
                maxLength={2000}
                placeholder="What you do, who you serve, and what makes working with you meaningful."
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
                {mediaOpen ? "Hide media studio" : "Showcase your culture — add photos & video"}
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
                    <div>
                      <p className="text-sm font-semibold text-ink">Photo gallery</p>
                      <p className="text-xs text-muted">
                        Campus, classrooms, community — up to 12 images.
                      </p>
                      <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
                        {gallery.map((g, i) => (
                          <div key={g.url} className="group relative aspect-square overflow-hidden rounded-xl ring-1 ring-black/10">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={g.url} alt={g.name} className="h-full w-full object-cover" />
                            <button
                              type="button"
                              aria-label={`Remove ${g.name}`}
                              onClick={() => {
                                URL.revokeObjectURL(g.url);
                                setGallery(gallery.filter((_, x) => x !== i));
                              }}
                              className="absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-ink/70 text-xs text-white opacity-0 transition group-hover:opacity-100"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                        {gallery.length < 12 && (
                          <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-brand/40 bg-white text-brand-dark transition hover:border-brand hover:bg-brand-tint">
                            <span className="text-2xl leading-none">+</span>
                            <span className="text-xs font-semibold">Add photos</span>
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              onChange={(e) => addImages(e.target.files)}
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-ink">Culture video</p>
                      <p className="text-xs text-muted">
                        A 60-90 second welcome from your team goes a long way.
                      </p>
                      {video ? (
                        <div className="mt-3 flex items-center justify-between rounded-xl bg-white px-4 py-3 ring-1 ring-black/10">
                          <span className="flex items-center gap-2 text-sm font-medium text-ink">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-brand-dark">
                              <path d="M4 5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3.2l4.6-2.9A1 1 0 0 1 22 6.2v11.6a1 1 0 0 1-1.4.9L16 15.8V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Z" />
                            </svg>
                            {video}
                          </span>
                          <button
                            type="button"
                            onClick={() => setVideo("")}
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
                            onChange={(e) => setVideo(e.target.files?.[0]?.name ?? "")}
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

        {step === 2 && (
          <div className="space-y-7">
            <Field label="Which plan fits? (sample pricing — nothing is charged today)">
              <div className="grid gap-3 sm:grid-cols-3">
                {PLANS.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => set("plan", p.value)}
                    aria-pressed={form.plan === p.value}
                    className={`relative rounded-2xl border p-4 text-left transition ${
                      form.plan === p.value
                        ? "border-brand bg-brand-tint ring-2 ring-brand/30"
                        : "border-slate-200 bg-white hover:border-brand"
                    }`}
                  >
                    {p.popular && (
                      <span className="absolute -top-2.5 right-3 rounded-full bg-brand px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase">
                        Popular
                      </span>
                    )}
                    <span className="block font-semibold text-ink">{p.name}</span>
                    <span className="mt-1 block font-heading text-2xl font-medium text-ink">
                      {p.price}
                      <span className="ml-1 text-xs font-normal text-muted">{p.per}</span>
                    </span>
                    <ul className="mt-3 space-y-1 text-xs text-muted">
                      {p.perks.map((perk) => (
                        <li key={perk}>• {perk}</li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>
            </Field>

            <div className="rounded-2xl bg-slate-50 p-5 text-sm">
              <p className="font-semibold text-ink">Quick review</p>
              <dl className="mt-3 space-y-1.5 text-muted">
                <div className="flex gap-2">
                  <dt className="font-medium text-ink">Organization:</dt>
                  <dd>{form.orgName} ({form.orgType})</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-medium text-ink">Contact:</dt>
                  <dd>{form.contactName} — {form.email}</dd>
                </div>
                {(form.city || form.state) && (
                  <div className="flex gap-2">
                    <dt className="font-medium text-ink">Location:</dt>
                    <dd>{[form.city, form.state].filter(Boolean).join(", ")}</dd>
                  </div>
                )}
                {gallery.length > 0 && (
                  <div className="flex gap-2">
                    <dt className="font-medium text-ink">Gallery:</dt>
                    <dd>{gallery.length} photo{gallery.length > 1 ? "s" : ""}</dd>
                  </div>
                )}
                {video && (
                  <div className="flex gap-2">
                    <dt className="font-medium text-ink">Video:</dt>
                    <dd>{video}</dd>
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
              {submitting ? "Creating…" : "Create Employer Account"}
            </button>
          )}
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-muted">
        Media files aren&apos;t uploaded yet in this preview — we record your
        selections while storage is wired up.
      </p>
    </div>
  );
}
