// Plan catalog. Pure data — safe to import from client components.
// Prices start from jobsforcatholics.com's current rate card, with two changes:
// subscriptions are month-to-month (no 1-year commitment) and the 10-pack is cheaper.
// Optional Stripe Price IDs come from env (STRIPE_PRICE_<KEY>); otherwise checkout
// sends these prices inline.

export type PlanKey =
  | "basic"
  | "featured"
  | "featured10"
  | "therese"
  | "jp2"
  | "joseph"
  | "freelance";

export type Plan = {
  key: PlanKey;
  name: string;
  /** cents */
  price: number;
  interval?: "month";
  audience: "employer" | "freelancer";
  tagline: string;
  perks: string[];
  /** one-time purchases add credits to the company */
  listingCredits?: number;
  featuredCredits?: number;
  /** subscriptions keep this many featured listings live at once */
  featuredSlots?: number;
  popular?: boolean;
};

export const PLANS: Plan[] = [
  {
    key: "basic",
    name: "Basic Listing",
    price: 3900,
    audience: "employer",
    tagline: "One opening, posted right.",
    perks: [
      "60-day listing",
      "AI writes your job description",
      "Applicants ranked by mission fit",
    ],
    listingCredits: 1,
  },
  {
    key: "featured",
    name: "Featured Listing",
    price: 4900,
    audience: "employer",
    tagline: "Top of search and on the home page.",
    perks: [
      "60-day listing, featured placement",
      "Home page spotlight",
      "Everything in Basic",
    ],
    featuredCredits: 1,
  },
  {
    key: "featured10",
    name: "Featured 10-Pack",
    price: 34900,
    audience: "employer",
    tagline: "Ten featured listings, use them all year.",
    perks: [
      "10 featured listings, no expiry on the pack",
      "Saves $141 over buying singly",
      "Share across your hiring managers",
    ],
    featuredCredits: 10,
  },
  {
    key: "therese",
    name: "St. Thérèse",
    price: 4900,
    interval: "month",
    audience: "employer",
    tagline: "For the parish that hires a few times a year.",
    perks: [
      "3 featured listings live at all times",
      "Employer profile with photos and video",
      "Fit-ranked applicant pipeline",
    ],
    featuredSlots: 3,
  },
  {
    key: "jp2",
    name: "St. John Paul the Great",
    price: 12000,
    interval: "month",
    audience: "employer",
    tagline: "For schools and agencies hiring every season.",
    perks: [
      "10 featured listings live at all times",
      "Search candidates and match them to your openings",
      "Logo in the home page employer strip",
      "Everything in St. Thérèse",
    ],
    featuredSlots: 10,
    popular: true,
  },
  {
    key: "joseph",
    name: "St. Joseph the Worker",
    price: 24000,
    interval: "month",
    audience: "employer",
    tagline: "For dioceses and networks that never stop hiring.",
    perks: [
      "30 featured listings live at all times",
      "Priority support from a real person",
      "Everything in St. John Paul the Great",
    ],
    featuredSlots: 30,
  },
  {
    key: "freelance",
    name: "Freelance Visibility",
    price: 2500,
    interval: "month",
    audience: "freelancer",
    tagline: "Your craft in front of parishes and apostolates.",
    perks: [
      "Profile and photo portfolio on the marketplace",
      "Inquiries straight to your inbox",
      "0% commission — you keep everything",
    ],
  },
];

export function getPlan(key: unknown): Plan | undefined {
  return PLANS.find((p) => p.key === key);
}

export function formatPrice(cents: number): string {
  const dollars = cents / 100;
  return `$${Number.isInteger(dollars) ? dollars : dollars.toFixed(2)}`;
}
