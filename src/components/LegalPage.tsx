import Header from "@/components/Header";
import Footer from "@/components/Footer";

export type LegalSection = { heading: string; body: string[] };

export default function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1 px-4 py-14">
        <article className="mx-auto max-w-3xl">
          <div className="rounded-xl bg-amber-50 px-5 py-3 text-sm font-medium text-amber-800 ring-1 ring-amber-200">
            Draft — pending legal review. This text has not yet been approved
            by counsel and will be finalized before launch.
          </div>
          <h1 className="mt-8 font-heading text-4xl font-medium tracking-tight text-ink">{title}</h1>
          <p className="mt-2 text-sm text-muted">Last updated {updated}</p>
          <p className="mt-6 leading-relaxed text-ink/80">{intro}</p>
          {sections.map((s) => (
            <section key={s.heading} className="mt-10">
              <h2 className="font-heading text-xl font-medium text-ink">{s.heading}</h2>
              {s.body.map((para, i) => (
                <p key={i} className="mt-3 leading-relaxed text-ink/80">
                  {para}
                </p>
              ))}
            </section>
          ))}
          <p className="mt-12 border-t border-black/5 pt-6 text-sm text-muted">
            Questions about this policy? <a href="/contact" className="font-semibold text-brand-dark hover:underline">Contact us</a>.
          </p>
        </article>
      </main>
      <Footer />
    </div>
  );
}
