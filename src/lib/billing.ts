// Applies Stripe webhook events to plan/subscription state.
// Each event is recorded in StripeEvent inside the same transaction as its writes,
// so a redelivered event fails on the primary key and changes nothing.
import type Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { getPlan } from "@/lib/plans";

type Meta = { kind?: string; refId?: string; plan?: string };

const idOf = (v: string | { id: string } | null | undefined) =>
  typeof v === "string" ? v : v?.id ?? null;

function renewsAt(sub: Stripe.Subscription): Date | null {
  // current_period_end lives on the subscription item in current API versions
  const end = sub.items?.data?.[0]?.current_period_end;
  return end ? new Date(end * 1000) : null;
}

function writesForCheckout(session: Stripe.Checkout.Session) {
  const meta = (session.metadata ?? {}) as Meta;
  const plan = getPlan(meta.plan);
  if (!plan || !meta.refId) return [];
  // async payment methods complete later; the async_payment_succeeded event lands then
  if (session.payment_status === "unpaid") return [];

  const customerId = idOf(session.customer);
  const subscriptionId = idOf(session.subscription);

  if (meta.kind === "freelancer") {
    return [
      prisma.freelancer.updateMany({
        where: { id: meta.refId },
        data: {
          visibilityStatus: "active",
          ...(subscriptionId && { stripeSubscriptionId: subscriptionId }),
          ...(customerId && { stripeCustomerId: customerId }),
        },
      }),
    ];
  }

  if (meta.kind !== "company") return [];

  if (session.mode === "subscription") {
    return [
      prisma.company.updateMany({
        where: { id: meta.refId },
        data: {
          plan: plan.key,
          planStatus: "active",
          ...(subscriptionId && { stripeSubscriptionId: subscriptionId }),
          ...(customerId && { stripeCustomerId: customerId }),
        },
      }),
    ];
  }

  return [
    prisma.company.updateMany({
      where: { id: meta.refId },
      data: {
        listingCredits: { increment: plan.listingCredits ?? 0 },
        featuredCredits: { increment: plan.featuredCredits ?? 0 },
        ...(customerId && { stripeCustomerId: customerId }),
      },
    }),
  ];
}

function writesForSubscription(sub: Stripe.Subscription, deleted: boolean) {
  const meta = (sub.metadata ?? {}) as Meta;
  const ended = deleted || sub.status === "canceled" || sub.status === "incomplete_expired";
  const status = deleted ? "canceled" : sub.status;
  // Match by subscription id; fall back to the metadata id when the
  // subscription event beats checkout.session.completed.
  const match = (refId?: string) => ({
    OR: [
      { stripeSubscriptionId: sub.id },
      ...(refId && !ended ? [{ id: refId, stripeSubscriptionId: null }] : []),
    ],
  });

  if (meta.kind === "freelancer") {
    return [
      prisma.freelancer.updateMany({
        where: match(meta.refId),
        data: ended
          ? { visibilityStatus: "canceled", stripeSubscriptionId: null, visibilityRenewsAt: null }
          : { visibilityStatus: status, stripeSubscriptionId: sub.id, visibilityRenewsAt: renewsAt(sub) },
      }),
    ];
  }

  const plan = getPlan(meta.plan);
  return [
    prisma.company.updateMany({
      where: match(meta.refId),
      data: ended
        ? { plan: null, planStatus: "canceled", stripeSubscriptionId: null, planRenewsAt: null }
        : {
            planStatus: status,
            stripeSubscriptionId: sub.id,
            planRenewsAt: renewsAt(sub),
            ...(plan && { plan: plan.key }),
          },
    }),
  ];
}

/** Returns "applied", "ignored" (event type we don't act on) or "duplicate". */
export async function applyStripeEvent(event: Stripe.Event): Promise<"applied" | "ignored" | "duplicate"> {
  let writes;
  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded":
      writes = writesForCheckout(event.data.object as Stripe.Checkout.Session);
      break;
    case "customer.subscription.created":
    case "customer.subscription.updated":
      writes = writesForSubscription(event.data.object as Stripe.Subscription, false);
      break;
    case "customer.subscription.deleted":
      writes = writesForSubscription(event.data.object as Stripe.Subscription, true);
      break;
    default:
      return "ignored";
  }

  try {
    await prisma.$transaction([
      prisma.stripeEvent.create({ data: { id: event.id, type: event.type } }),
      ...writes,
    ]);
    return "applied";
  } catch (e) {
    // P2002 can also come from a unique Stripe id clash — only call it a duplicate
    // when this event really was recorded already.
    if (
      (e as { code?: string }).code === "P2002" &&
      (await prisma.stripeEvent.findUnique({ where: { id: event.id } }))
    )
      return "duplicate";
    throw e;
  }
}
