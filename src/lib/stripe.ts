// Server-only Stripe helpers. Never import this from a client component.
import Stripe from "stripe";
import type { PlanKey } from "@/lib/plans";

let client: Stripe | null = null;

/** True when a secret key is configured — checkout buttons render live only then. */
export function stripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  client ??= new Stripe(key);
  return client;
}

/** A Price ID from the Stripe dashboard, if one is configured for this plan. */
export function priceIdFor(key: PlanKey): string | null {
  return process.env[`STRIPE_PRICE_${key.toUpperCase()}`] || null;
}

/** Verifies the signature and parses the event. Throws on a bad signature. */
export function verifyWebhook(body: string, signature: string): Stripe.Event {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) throw new Error("STRIPE_WEBHOOK_SECRET is not set");
  return Stripe.webhooks.constructEvent(body, signature, secret);
}
