import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JobPostWizard from "@/components/JobPostWizard";
import { getEmployer } from "@/lib/employer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Post a Job — Jobs For Catholics",
  description:
    "Post a job in minutes. Our writing assistant drafts a mission-forward description from your notes.",
};

export default async function EmployerPostPage() {
  const employer = await getEmployer();
  const initialOrg = employer
    ? {
        name: employer.company.name,
        orgType: employer.company.orgType,
        about: employer.company.about,
      }
    : null;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1">
        <JobPostWizard initialOrg={initialOrg} />
      </main>
      <Footer />
    </div>
  );
}
