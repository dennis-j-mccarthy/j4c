import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CandidateIntake from "@/components/CandidateIntake";

export const metadata: Metadata = {
  title: "Create Your Candidate Profile — Jobs For Catholics",
  description:
    "Build a free candidate profile and let mission-driven Catholic employers find you.",
};

export default function RegisterSeekerPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1">
        <CandidateIntake />
      </main>
      <Footer />
    </div>
  );
}
