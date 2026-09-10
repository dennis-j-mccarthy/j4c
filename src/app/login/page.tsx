import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Sign In — Jobs For Catholics",
  description: "Sign in to see your personalized job fit scores.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
          <p className="text-xs font-semibold tracking-[0.3em] text-brand-dark uppercase">
            Welcome back
          </p>
          <h1 className="mt-2 font-heading text-3xl font-medium tracking-tight text-ink">
            Sign in
          </h1>
          <p className="mt-2 text-sm text-muted">
            Your fit scores, saved preferences, and matches live behind your
            profile.
          </p>
          <LoginForm />
          <p className="mt-6 border-t border-black/5 pt-5 text-center text-sm text-muted">
            New here?{" "}
            <Link
              href="/registerseeker"
              className="font-semibold text-brand-dark hover:underline"
            >
              Create your free profile
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
