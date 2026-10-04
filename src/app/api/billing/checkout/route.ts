import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getEmployer } from "@/lib/employer";
import { getPlan } from "@/lib/plans";
import { getStripe, priceIdFor } from "@/lib/stripe";

export const runtime = "nodejs";

// Creates a Stripe Checkout Session for a plan and returns its URL.
// Employer plans bill the signed-in employer's company; freelance visibility
// bills the freelancer id returned by the join form.
export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const plan = getPlan(body.plan);
  if (!plan) return NextResponse.json({ error: "Pick a plan." }, { status: 400 });

  const stripe = getStripe();
  if (!stripe)
    return NextResponse.json(
      { error: "Online checkout isn't switched on yet. Contact us and we'll set you up." },
      { status: 503 },
    );

  let kind: "company" | "freelancer";
  let refId: string;
  let email: string;
  let customer: string | null;

  if (plan.audience === "employer") {
    const employer = await getEmployer();
    if (!employer)
      return NextResponse.json(
        { error: "Sign in as an employer first.", login: "/login" },
        { status: 401 },
      );
    if (plan.interval && employer.company.planStatus === "active")
      return NextResponse.json(
        { error: "You already have an active subscription. Contact us to change plans." },
        { status: 409 },
      );
    kind = "company";
    refId = employer.company.id;
    email = employer.user.email;
    customer = employer.company.stripeCustomerId;
  } else {
    const freelancer = await prisma.freelancer.findUnique({
      where: { id: String(body.freelancerId ?? "") },
    });
    if (!freelancer)
      return NextResponse.json({ error: "List your craft first." }, { status: 404 });
    if (freelancer.visibilityStatus === "active")
      return NextResponse.json({ error: "Your listing is already active." }, { status: 409 });
    kind = "freelancer";
    refId = freelancer.id;
    email = freelancer.email;
    customer = freelancer.stripeCustomerId;
  }

  const priceId = priceIdFor(plan.key);
  const metadata = { kind, refId, plan: plan.key };
  const origin = new URL(request.url).origin;

  const session = await stripe.checkout.sessions.create({
    mode: plan.interval ? "subscription" : "payment",
    line_items: [
      priceId
        ? { price: priceId, quantity: 1 }
        : {
            quantity: 1,
            price_data: {
              currency: "usd",
              unit_amount: plan.price,
              product_data: { name: `Jobs For Catholics — ${plan.name}` },
              ...(plan.interval && { recurring: { interval: plan.interval } }),
            },
          },
    ],
    client_reference_id: refId,
    metadata,
    ...(plan.interval
      ? { subscription_data: { metadata } }
      : { customer_creation: customer ? undefined : "always" }),
    ...(customer ? { customer } : { customer_email: email }),
    allow_promotion_codes: true,
    success_url: `${origin}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/pricing?canceled=1`,
  });

  return NextResponse.json({ url: session.url });
}
