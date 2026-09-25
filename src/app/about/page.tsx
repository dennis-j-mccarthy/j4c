import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About — Jobs For Catholics",
  description:
    "Serving the Catholic community since 2010. More than a job board — a recruitment platform where mission fit comes first.",
};

const VALUES = [
  {
    title: "Mission fit is the first filter",
    copy: "Skills get you an interview; mission gets you a vocation. Every tool here — fit scores, tailored resumes, the freelance marketplace — starts from the question secular boards can't ask: does this work serve what you believe?",
  },
  {
    title: "Both sides of the table",
    copy: "We serve the parish secretary posting her first job and the candidate applying to it with equal care. Free first listings for employers, free forever for candidates and freelancers.",
  },
  {
    title: "Technology in service, not in charge",
    copy: "AI writes the first draft — of a resume, a job description, a cover letter — and a person always has the last word. Nothing is invented, everything is editable.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <section className="bg-white px-4 py-16">
        <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold tracking-[0.14em] text-brand-dark uppercase">
              About us
            </p>
            <h1 className="mt-2 font-heading text-4xl font-medium tracking-tight text-ink">
              Helping build the Body of Christ, one great hire at a time.
            </h1>
            <p className="mt-4 leading-relaxed text-muted">
              Since 2010, Jobs For Catholics has connected faithful candidates
              with the parishes, schools, dioceses, and apostolates that need
              them. What started as a listing board is becoming something more:
              a recruitment platform where the match is measured in mission,
              not just keywords.
            </p>
            <p className="mt-3 leading-relaxed text-muted">
              Work is a vocation. The right hire changes a parish; the right
              job changes a life. We exist to make both happen more often.
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="/register" className="rounded-full bg-brand px-7 py-3 font-semibold text-white shadow-md shadow-brand/30 transition hover:bg-brand-dark">
                Join free
              </Link>
              <Link href="/contact" className="rounded-full px-7 py-3 font-semibold text-brand-dark ring-1 ring-brand/40 transition hover:bg-brand-tint">
                Talk to us
              </Link>
            </div>
          </div>
          <Image
            src="/brand/hero-church-windows.jpg"
            alt="Light through church windows"
            width={900}
            height={700}
            className="h-96 w-full rounded-3xl object-cover shadow-lg"
          />
        </div>
      </section>

      <main className="flex-1 px-4 py-14">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-heading text-3xl font-medium tracking-tight text-ink">
            What we believe about work
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 120}>
                <div className="h-full rounded-2xl bg-white p-7 shadow-sm ring-1 ring-black/5">
                  <h3 className="font-heading text-lg font-medium text-ink">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{v.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
