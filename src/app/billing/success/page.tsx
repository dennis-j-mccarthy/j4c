import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPlan } from "@/lib/plans";
import { getStripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Thank you — Jobs For Catholics",
  robots: { index: false },
};

// Display only. Plan state is written by the webhook, not by this page.
export default async function BillingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const stripe = getStripe();
  const session =
    stripe && session_id
      ? await stripe.checkout.sessions.retrieve(session_id).catch(() => null)
      : null;
  const plan = getPlan(session?.metadata?.plan);
  const freelancer = session?.metadata?.kind === "freelancer";

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="max-w-lg rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-black/5">
          {session ? (
            <>
              <p className="font-heading text-3xl font-medium text-ink">Thank you.</p>
              <p className="mt-3 text-muted">
                {plan ? <>Your <b className="text-ink">{plan.name}</b> is </> : "Your purchase is "}
                confirmed. A receipt is on its way to {session.customer_details?.email ?? "your inbox"}.
              </p>
            </>
          ) : (
            <>
              <p className="font-heading text-3xl font-medium text-ink">We couldn&apos;t find that checkout.</p>
              <p className="mt-3 text-muted">If you were charged, your receipt from Stripe has the details.</p>
            </>
          )}
          <Link
            href={freelancer ? "/freelance" : "/employer/dashboard"}
            className="mt-6 inline-block rounded-full bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand-dark"
          >
            {freelancer ? "Back to the marketplace" : "Go to your dashboard"}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
