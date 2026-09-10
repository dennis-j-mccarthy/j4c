import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EmployerIntake from "@/components/EmployerIntake";

export const metadata: Metadata = {
  title: "Employer Onboarding — Jobs For Catholics",
  description:
    "Set up your organization and start reaching mission-aligned candidates.",
};

export default function EmployerRegisterPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1">
        <EmployerIntake />
      </main>
      <Footer />
    </div>
  );
}
