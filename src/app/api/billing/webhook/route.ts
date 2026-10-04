import { NextResponse } from "next/server";
import { verifyWebhook } from "@/lib/stripe";
import { applyStripeEvent } from "@/lib/billing";

export const runtime = "nodejs";

// Stripe → us. Signature-verified against the raw body; plan/subscription
// state is written by applyStripeEvent (idempotent per event id).
export async function POST(request: Request) {
  if (!process.env.STRIPE_WEBHOOK_SECRET)
    return NextResponse.json({ error: "Webhook not configured." }, { status: 503 });

  const signature = request.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Missing signature." }, { status: 400 });

  const body = await request.text();
  let event;
  try {
    event = verifyWebhook(body, signature);
  } catch {
    return NextResponse.json({ error: "Bad signature." }, { status: 400 });
  }

  // a thrown error returns 500, so Stripe retries the delivery
  const result = await applyStripeEvent(event);
  return NextResponse.json({ received: true, result });
}
