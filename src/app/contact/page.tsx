import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us — Jobs For Catholics",
  description: "Questions about posting, profiles, or the freelance marketplace — we reply within one business day.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1 px-4 py-16">
        <div className="mx-auto grid max-w-5xl items-start gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="text-xs font-bold tracking-[0.14em] text-brand-dark uppercase">
              Contact us
            </p>
            <h1 className="mt-2 font-heading text-4xl font-medium tracking-tight text-ink">
              A real person reads every message.
            </h1>
            <p className="mt-4 leading-relaxed text-muted">
              Posting your first job, fixing a profile, listing a craft, or
              just wondering if this is the right place — ask. We reply within
              one business day.
            </p>
            <div className="mt-8 space-y-4 text-sm">
              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
                <p className="font-semibold text-ink">Employers</p>
                <p className="mt-1 text-muted">
                  Your first listing is free — no card, no contract. Ask us
                  anything before you post.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
                <p className="font-semibold text-ink">Candidates & freelancers</p>
                <p className="mt-1 text-muted">
                  Profiles, resumes, and listings are free forever. We can help
                  you put your best foot forward.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
