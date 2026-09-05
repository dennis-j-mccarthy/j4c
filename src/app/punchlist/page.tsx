import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PunchList from "@/components/PunchList";

export const metadata: Metadata = {
  title: "Punch List — Jobs For Catholics",
  description: "Migration plan from JobBoardHQ to the new site.",
  robots: { index: false },
};

export default function PunchListPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1">
        <PunchList />
      </main>
      <Footer />
    </div>
  );
}
