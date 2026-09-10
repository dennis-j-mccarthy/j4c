"use client";

import { useEffect, useState } from "react";

type Exp = { title: string; org: string; dates: string; story: string; impact: string };
type ResumeData = {
  summary: string;
  experience: { title: string; organization: string; dates: string; bullets: string[] }[];
  skills: string[];
  education: string[];
  faithService: string[];
};

const STEPS = ["About you", "Target", "Experience", "Extras", "Your resume"];

const EMPTY_EXP: Exp = { title: "", org: "", dates: "", story: "", impact: "" };

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

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-start gap-2 rounded-xl bg-brand-tint/60 px-4 py-3 text-sm text-ink/80">
      <span className="mt-0.5 shrink-0 text-brand-dark">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
          <path d="M9.7 17h4.6M10.5 20.5h3M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1.2 2.1h4.6c.2-.9.6-1.6 1.2-2.1A6 6 0 0 0 12 3Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span>{children}</span>
    </p>
  );
}

export default function ResumeBuilder() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cityState, setCityState] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [headline, setHeadline] = useState("");
  const [target, setTarget] = useState("");
  const [experiences, setExperiences] = useState<Exp[]>([{ ...EMPTY_EXP }]);
  const [skills, setSkills] = useState("");
  const [education, setEducation] = useState("");
  const [faith, setFaith] = useState("");
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [genSource, setGenSource] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // prefill from the signed-in profile (and any previously saved resume)
  useEffect(() => {
    fetch("/api/candidates/resume")
      .then((r) => r.json())
      .then((data) => {
        if (data.profile) {
          setSignedIn(true);
          setName((v) => v || data.profile.name || "");
          setEmail((v) => v || data.profile.email || "");
          setPhone((v) => v || data.profile.phone || "");
          setCityState((v) => v || [data.profile.city, data.profile.state].filter(Boolean).join(", "));
          setLinkedin((v) => v || data.profile.linkedin || "");
          setHeadline((v) => v || data.profile.headline || "");
          setTarget((v) => v || data.profile.desiredTitles?.[0] || "");
          if (data.profile.education) setEducation((v) => v || data.profile.education);
        }
        if (data.resume) {
          setResume(data.resume);
          if (data.resume.contact?.photo) setPhoto(data.resume.contact.photo);
        }
      })
      .catch(() => {});
  }, []);

  // option-command-F: prefill the whole wizard with sample data (demo/testing)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.altKey && e.metaKey && e.code === "KeyF")) return;
      e.preventDefault();
      setName("Maria Alvarez");
      setEmail("maria.alvarez@example.org");
      setPhone("(239) 555-0142");
      setCityState("Naples, FL");
      setLinkedin("linkedin.com/in/maria-alvarez");
      setHeadline("Theology teacher and retreat leader, 6 years in Catholic schools");
      setTarget("High School Theology Teacher");
      setExperiences([
        {
          title: "Theology Teacher",
          org: "St. Elizabeth Catholic High School",
          dates: "2020 – present",
          story:
            "I teach four sections of sophomore theology and one senior elective on Catholic social teaching. I redesigned the sophomore curriculum around the Catechism. I mentor the campus ministry student leaders and help plan the annual Kairos retreat.",
          impact: "Sophomore theology assessment scores rose 18% over two years",
        },
        {
          title: "Youth Minister",
          org: "Our Lady of Grace Parish",
          dates: "2017 – 2020",
          story:
            "I ran weekly youth nights for middle and high schoolers. I recruited and trained twelve adult volunteers and kept everyone current on safe-environment certification. I planned two retreats a year on a shoestring budget.",
          impact: "Weekly attendance grew from 20 to 65 teens",
        },
      ]);
      setSkills("Curriculum design\nRetreat planning\nVolunteer leadership\nSpanish (conversational)");
      setEducation("B.A. Theology — Ave Maria University, 2016\nCatechist Certification, Diocese of Venice");
      setFaith("Lector & EMHC, St. Agnes Parish (2016 – present)\nKairos retreat leader");
      setStep(0);
      setError(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const setExp = (i: number, patch: Partial<Exp>) =>
    setExperiences((list) => list.map((e, x) => (x === i ? { ...e, ...patch } : e)));

  const validate = (s: number): string | null => {
    if (s === 0 && !name.trim()) return "Enter your name.";
    if (s === 2 && !experiences.some((e) => e.title.trim() || e.org.trim()))
      return "Add at least one role — ministry and volunteer work absolutely count.";
    return null;
  };

  const next = () => {
    const err = validate(step);
    if (err) return setError(err);
    setError(null);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const generate = async () => {
    if (generating) return;
    setGenerating(true);
    setError(null);
    try {
      const res = await fetch("/api/generate/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          target, headline,
          experiences: experiences.filter((e) => e.title.trim() || e.org.trim()),
          skills: skills.split("\n").join(",").split(","),
          education: education.split("\n"),
          faith: faith.split("\n"),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Generation failed.");
      setResume(data.resume);
      setGenSource(data.source);
      setSaved(false);
      setStep(4);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Generation failed.");
    } finally {
      setGenerating(false);
    }
  };

  const save = async () => {
    if (!resume || saving) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/candidates/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume: { ...resume, contact: { name, email, phone, cityState, linkedin, photo } } }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Save failed.");
      setSaved(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const patchResume = (patch: Partial<ResumeData>) => {
    setResume((r) => (r ? { ...r, ...patch } : r));
    setSaved(false);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <p className="text-xs font-semibold tracking-[0.3em] text-brand-dark uppercase">
        Resume Builder
      </p>
      <h1 className="mt-3 font-heading text-4xl font-medium tracking-tight text-ink">
        A resume worthy of your work.
      </h1>
      <p className="mt-3 text-muted">
        Answer in plain English — the builder turns it into a modern,
        recruiter-ready resume. No resume-speak required.
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
            {signedIn && (
              <Tip>Prefilled from your profile — adjust anything that needs it.</Tip>
            )}
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name">
                <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
              </Field>
              <Field label="Email">
                <input className={inputCls} type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
              </Field>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Phone" optional>
                <input className={inputCls} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </Field>
              <Field label="City, State" optional>
                <input className={inputCls} value={cityState} onChange={(e) => setCityState(e.target.value)} placeholder="Naples, FL" />
              </Field>
            </div>
            <Field label="LinkedIn or portfolio" optional>
              <input className={inputCls} value={linkedin} onChange={(e) => setLinkedin(e.target.value)} inputMode="url" />
            </Field>
            <Field label="Photo" optional hint="Common and welcome in parish, school, and ministry hiring. For corporate roles it's your call — easy to leave off.">
              <div className="flex items-center gap-4">
                {photo ? (
                  <div className="group relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-2 ring-brand/40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo} alt="Resume photo" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      aria-label="Remove photo"
                      onClick={() => setPhoto(null)}
                      className="absolute inset-0 flex items-center justify-center bg-ink/60 text-white opacity-0 transition group-hover:opacity-100"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <label className="flex h-20 w-20 shrink-0 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-dashed border-brand/40 bg-white text-brand-dark transition hover:border-brand hover:bg-brand-tint">
                    <span className="text-xl leading-none">+</span>
                    <span className="text-[10px] font-semibold">Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (!f) return;
                        if (f.size > 4 * 1024 * 1024) {
                          setError("Photo must be under 4 MB.");
                          return;
                        }
                        const reader = new FileReader();
                        reader.onload = () => setPhoto(String(reader.result));
                        reader.readAsDataURL(f);
                      }}
                    />
                  </label>
                )}
                <p className="text-sm text-muted">
                  A warm, well-lit headshot. It appears at the top of your
                  resume and prints with the PDF.
                </p>
              </div>
            </Field>
            <Tip>
              Modern resumes skip the street address — city and state are all
              employers need.
            </Tip>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <Field label="What role are you going for?" hint="Everything gets tailored toward this.">
              <input className={inputCls} value={target} onChange={(e) => setTarget(e.target.value)} placeholder="e.g. Director of Religious Education" />
            </Field>
            <Field label="Your one-line headline" optional hint="Who you are professionally, in one phrase.">
              <input className={inputCls} value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="e.g. Youth minister and retreat leader, 6 years in parish ministry" />
            </Field>
            <Tip>
              We'll write a 2-3 sentence professional summary from this — the
              modern replacement for the outdated &ldquo;objective
              statement.&rdquo; Summaries say what you bring; objectives said
              what you wanted.
            </Tip>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <Tip>
              For each role, just tell the story: what did you actually do, and
              what got better because you were there? Numbers are gold — how
              many people, how much money, how often. The builder turns your
              words into verb-led, quantified bullets.
            </Tip>
            {experiences.map((exp, i) => (
              <div key={i} className="space-y-4 rounded-2xl border border-slate-200 p-5">
                <div className="flex items-center justify-between">
                  <p className="font-heading text-lg font-medium text-ink">Role {i + 1}</p>
                  {experiences.length > 1 && (
                    <button type="button" onClick={() => setExperiences(experiences.filter((_, x) => x !== i))} className="text-sm text-muted hover:text-red-500">
                      Remove
                    </button>
                  )}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Title">
                    <input className={inputCls} value={exp.title} onChange={(e) => setExp(i, { title: e.target.value })} placeholder="Youth Minister" />
                  </Field>
                  <Field label="Organization">
                    <input className={inputCls} value={exp.org} onChange={(e) => setExp(i, { org: e.target.value })} placeholder="St. Mary's Parish" />
                  </Field>
                </div>
                <Field label="Dates">
                  <input className={inputCls} value={exp.dates} onChange={(e) => setExp(i, { dates: e.target.value })} placeholder="2019 – present" />
                </Field>
                <Field label="What did you do there, in plain words?">
                  <textarea className={`${inputCls} min-h-24 resize-y`} value={exp.story} onChange={(e) => setExp(i, { story: e.target.value })}
                    placeholder="I ran the weekly youth group, recruited and trained the adult volunteers, planned two retreats a year, and handled the safe-environment paperwork." />
                </Field>
                <Field label="What improved because of you?" optional hint="Numbers if you have them: attendance, money raised, people trained…">
                  <input className={inputCls} value={exp.impact} onChange={(e) => setExp(i, { impact: e.target.value })}
                    placeholder="Attendance grew from 20 to 65 kids a week" />
                </Field>
              </div>
            ))}
            {experiences.length < 8 && (
              <button type="button" onClick={() => setExperiences([...experiences, { ...EMPTY_EXP }])}
                className="w-full rounded-2xl border-2 border-dashed border-brand/40 bg-white px-4 py-4 text-sm font-semibold text-brand-dark transition hover:border-brand hover:bg-brand-tint">
                + Add another role (ministry & volunteer work count)
              </button>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <Field label="Skills" hint="One per line or comma-separated. Keep it to what you'd happily be quizzed on.">
              <textarea className={`${inputCls} min-h-20 resize-y`} value={skills} onChange={(e) => setSkills(e.target.value)}
                placeholder={"Volunteer management\nEvent planning\nSpanish (conversational)"} />
            </Field>
            <Field label="Education & credentials" hint="One per line — degrees, certifications, licenses.">
              <textarea className={`${inputCls} min-h-20 resize-y`} value={education} onChange={(e) => setEducation(e.target.value)}
                placeholder={"B.A. Theology — Franciscan University, 2018\nCatechist Certification, Diocese of Venice"} />
            </Field>
            <Field label="Faith & service" optional hint="One per line — parish roles, ministries, volunteer leadership. On this board, it's experience.">
              <textarea className={`${inputCls} min-h-20 resize-y`} value={faith} onChange={(e) => setFaith(e.target.value)}
                placeholder={"Lector & EMHC, St. Mary's Parish (2017–present)\nRetreat team leader"} />
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
              {generating ? "Writing your resume…" : "Build my resume"}
            </button>
          </div>
        )}

        {step === 4 && resume && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted">
                {genSource === "ai"
                  ? "Drafted by AI from your answers — every section is editable."
                  : "Assembled from your answers — every section is editable. AI polish activates once an API key is configured."}
              </p>
              <div className="flex gap-2">
                <button type="button" onClick={() => window.print()} className="rounded-full border border-brand px-5 py-2 text-sm font-semibold text-brand-dark transition hover:bg-brand hover:text-white">
                  Download PDF
                </button>
                <button type="button" onClick={save} disabled={saving || saved} className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white shadow-md shadow-brand/30 transition hover:bg-brand-dark disabled:opacity-60">
                  {saved ? "Saved ✓" : saving ? "Saving…" : signedIn ? "Save to profile" : "Save (sign in first)"}
                </button>
              </div>
            </div>

            <Field label="Professional summary">
              <textarea className={`${inputCls} min-h-20 resize-y`} value={resume.summary}
                onChange={(e) => patchResume({ summary: e.target.value })} />
            </Field>

            {resume.experience.map((role, i) => (
              <Field key={i} label={`${role.title} — ${role.organization}`} hint="One bullet per line.">
                <textarea
                  className={`${inputCls} min-h-28 resize-y`}
                  value={role.bullets.join("\n")}
                  onChange={(e) =>
                    patchResume({
                      experience: resume.experience.map((r, x) =>
                        x === i ? { ...r, bullets: e.target.value.split("\n") } : r,
                      ),
                    })
                  }
                />
              </Field>
            ))}

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Skills" hint="One per line.">
                <textarea className={`${inputCls} min-h-24 resize-y`} value={resume.skills.join("\n")}
                  onChange={(e) => patchResume({ skills: e.target.value.split("\n") })} />
              </Field>
              <Field label="Faith & service" hint="One per line.">
                <textarea className={`${inputCls} min-h-24 resize-y`} value={resume.faithService.join("\n")}
                  onChange={(e) => patchResume({ faithService: e.target.value.split("\n") })} />
              </Field>
            </div>
            <Field label="Education" hint="One per line.">
              <textarea className={`${inputCls} min-h-20 resize-y`} value={resume.education.join("\n")}
                onChange={(e) => patchResume({ education: e.target.value.split("\n") })} />
            </Field>

            <Tip>
              &ldquo;Download PDF&rdquo; uses your browser's print dialog —
              choose &ldquo;Save as PDF.&rdquo; The preview below is exactly
              what prints: clean single column, standard headings, no graphics —
              the format both recruiters and applicant-tracking software read
              best.
            </Tip>
          </div>
        )}

        {error && (
          <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{error}</p>
        )}

        {step < 4 && (
          <div className="mt-8 flex items-center justify-between">
            {step > 0 ? (
              <button type="button" onClick={() => { setError(null); setStep(step - 1); }} className="rounded-full px-6 py-3 font-semibold text-muted transition hover:text-ink">
                ← Back
              </button>
            ) : <span />}
            {step < 3 && (
              <button type="button" onClick={next} className="rounded-full bg-brand px-8 py-3 font-semibold text-white shadow-md shadow-brand/30 transition hover:-translate-y-0.5 hover:bg-brand-dark">
                Continue
              </button>
            )}
          </div>
        )}
      </div>

      {/* live preview / print sheet */}
      {resume && step === 4 && (
        <div className="resume-sheet mx-auto mt-10 max-w-3xl bg-white p-10 shadow-sm ring-1 ring-black/10 print:mt-0 print:p-0 print:shadow-none print:ring-0">
          <header className="flex items-start justify-between gap-6 border-b-2 border-ink pb-4">
            <div>
              <h2 className="font-heading text-3xl font-medium text-ink">{name || "Your Name"}</h2>
              <p className="mt-1 text-sm text-ink/70">
                {[cityState, phone, email, linkedin].filter(Boolean).join("  ·  ")}
              </p>
            </div>
            {photo && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={photo} alt="" className="h-24 w-24 shrink-0 rounded-full object-cover ring-1 ring-black/10" />
            )}
          </header>
          {resume.summary && (
            <p className="mt-4 text-sm leading-relaxed text-ink/85">{resume.summary}</p>
          )}
          {resume.experience.length > 0 && (
            <section className="mt-5">
              <h3 className="text-xs font-bold tracking-[0.2em] text-ink uppercase">Experience</h3>
              {resume.experience.map((role, i) => (
                <div key={i} className="mt-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-sm font-bold text-ink">
                      {role.title}
                      {role.organization && <span className="font-normal"> — {role.organization}</span>}
                    </p>
                    <p className="text-xs text-ink/60">{role.dates}</p>
                  </div>
                  <ul className="mt-1.5 space-y-1 pl-4">
                    {role.bullets.filter((b) => b.trim()).map((b, x) => (
                      <li key={x} className="list-disc text-sm leading-snug text-ink/85">{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}
          {resume.skills.filter((s) => s.trim()).length > 0 && (
            <section className="mt-5">
              <h3 className="text-xs font-bold tracking-[0.2em] text-ink uppercase">Skills</h3>
              <p className="mt-1.5 text-sm text-ink/85">{resume.skills.filter((s) => s.trim()).join("  ·  ")}</p>
            </section>
          )}
          {resume.education.filter((s) => s.trim()).length > 0 && (
            <section className="mt-5">
              <h3 className="text-xs font-bold tracking-[0.2em] text-ink uppercase">Education</h3>
              <ul className="mt-1.5 space-y-1">
                {resume.education.filter((s) => s.trim()).map((e, i) => (
                  <li key={i} className="text-sm text-ink/85">{e}</li>
                ))}
              </ul>
            </section>
          )}
          {resume.faithService.filter((s) => s.trim()).length > 0 && (
            <section className="mt-5">
              <h3 className="text-xs font-bold tracking-[0.2em] text-ink uppercase">Faith & Service</h3>
              <ul className="mt-1.5 space-y-1">
                {resume.faithService.filter((s) => s.trim()).map((f, i) => (
                  <li key={i} className="text-sm text-ink/85">{f}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
