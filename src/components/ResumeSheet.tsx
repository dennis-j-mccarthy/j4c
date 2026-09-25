export type ResumeContact = {
  name?: string;
  email?: string;
  phone?: string;
  cityState?: string;
  linkedin?: string;
  photo?: string | null;
};

export type ResumeSheetData = {
  summary: string;
  experience: { title: string; organization: string; dates: string; bullets: string[] }[];
  skills: string[];
  education: string[];
  faithService: string[];
  contact?: ResumeContact;
};

export default function ResumeSheet({ resume }: { resume: ResumeSheetData }) {
  const c = resume.contact ?? {};
  return (
    <div className="resume-sheet mx-auto max-w-3xl bg-white p-10 shadow-sm ring-1 ring-black/10 print:mt-0 print:p-0 print:shadow-none print:ring-0">
      <header className="flex items-start justify-between gap-6 border-b-2 border-ink pb-4">
        <div>
          <h2 className="font-heading text-3xl font-medium text-ink">{c.name || "Your Name"}</h2>
          <p className="mt-1 text-sm text-ink/70">
            {[c.cityState, c.phone, c.email, c.linkedin].filter(Boolean).join("  ·  ")}
          </p>
        </div>
        {c.photo && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={c.photo} alt="" className="h-24 w-24 shrink-0 rounded-full object-cover ring-1 ring-black/10" />
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
  );
}
