import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ResumeBuilder from "@/components/ResumeBuilder";

export const metadata: Metadata = {
  title: "AI Resume Builder — Jobs For Catholics",
  description:
    "Answer in plain English, get a modern recruiter-ready resume — tailored to the role you want.",
};

export default function ResumePage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1">
        <ResumeBuilder />
      </main>
      <Footer />
    </div>
  );
}
