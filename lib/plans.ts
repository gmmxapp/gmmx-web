export type PlanType = "saas-monthly" | "saas-3months" | "saas-6months" | "saas-yearly" | "saas-free" | "website-package";

export type PlanDefinition = {
  id: string;
  type: PlanType;
  name: string;
  badge?: string;
  description: string;
  amountInPaise: number;
  currency: "INR";
  ctaLabel: string;
  features: string[];
  isPopular?: boolean;
  recurringAmountInPaise?: number;
};

export const saasPlans: PlanDefinition[] = [
  {
    id: "plan-free",
    type: "saas-free",
    name: "Free",
    badge: "Always Free",
    description: "Perfect for trainers and small pilots just getting started.",
    amountInPaise: 0,
    currency: "INR",
    ctaLabel: "Get Started",
    features: [
      "Up to 25 members",
      "Digital attendance",
      "Basic lead capture",
      "Community support",
      "Core dashboard access"
    ]
  },
  // ─── MONTHLY PLANS ──────────────────────────────────────────────────────────
  {
    id: "plan-starter-monthly",
    type: "saas-monthly",
    name: "Starter",
    badge: "Monthly",
    description: "The essential toolkit for growing professional gyms.",
    amountInPaise: 49900,
    currency: "INR",
    ctaLabel: "Start Free Trial",
    features: ["Up to 100 members", "QR scan attendance", "Fee tracking", "Reports"]
  },
  {
    id: "plan-growth-monthly",
    type: "saas-monthly",
    name: "Growth",
    badge: "Monthly",
    description: "Our most popular plan for serious gym owners scaling fast.",
    amountInPaise: 99900,
    currency: "INR",
    ctaLabel: "Start Free Trial",
    isPopular: true,
    features: ["Up to 300 members", "WhatsApp automation", "Microsite", "Advanced CRM"]
  },
  {
    id: "plan-scale-monthly",
    type: "saas-monthly",
    name: "Scale",
    badge: "Monthly",
    description: "The complete OS for elite gyms and multi-branch operations.",
    amountInPaise: 149900,
    currency: "INR",
    ctaLabel: "Start Free Trial",
    features: ["Unlimited members", "Full automation", "Multi-branch", "VIP support"]
  },
  // ─── 3 MONTHS PLANS ─────────────────────────────────────────────────────────
  {
    id: "plan-starter-3months",
    type: "saas-3months",
    name: "Starter",
    badge: "3 Months",
    description: "Quarterly plan with 10% savings.",
    amountInPaise: 44900 * 3,
    currency: "INR",
    ctaLabel: "Get Started",
    features: ["Up to 100 members", "10% Discount included"]
  },
  {
    id: "plan-growth-3months",
    type: "saas-3months",
    name: "Growth",
    badge: "3 Months",
    description: "Quarterly growth plan for serious gyms.",
    amountInPaise: 89900 * 3,
    currency: "INR",
    ctaLabel: "Get Started",
    isPopular: true,
    features: ["Up to 300 members", "10% Discount included"]
  },
  {
    id: "plan-scale-3months",
    type: "saas-3months",
    name: "Scale",
    badge: "3 Months",
    description: "Quarterly scale plan for elite gyms.",
    amountInPaise: 134900 * 3,
    currency: "INR",
    ctaLabel: "Get Started",
    features: ["Unlimited members", "10% Discount included"]
  },
  // ─── 6 MONTHS PLANS ─────────────────────────────────────────────────────────
  {
    id: "plan-starter-6months",
    type: "saas-6months",
    name: "Starter",
    badge: "6 Months",
    description: "Half-yearly plan with 15% savings.",
    amountInPaise: 42400 * 6,
    currency: "INR",
    ctaLabel: "Get Started",
    features: ["Up to 100 members", "15% Discount included"]
  },
  {
    id: "plan-growth-6months",
    type: "saas-6months",
    name: "Growth",
    badge: "6 Months",
    description: "Half-yearly growth plan for scaling gyms.",
    amountInPaise: 84900 * 6,
    currency: "INR",
    ctaLabel: "Get Started",
    isPopular: true,
    features: ["Up to 300 members", "15% Discount included"]
  },
  {
    id: "plan-scale-6months",
    type: "saas-6months",
    name: "Scale",
    badge: "6 Months",
    description: "Half-yearly scale plan for elite operations.",
    amountInPaise: 127400 * 6,
    currency: "INR",
    ctaLabel: "Get Started",
    features: ["Unlimited members", "15% Discount included"]
  },
  // ─── YEARLY PLANS ───────────────────────────────────────────────────────────
  {
    id: "plan-starter-yearly",
    type: "saas-yearly",
    name: "Starter",
    badge: "Yearly",
    description: "Annual plan for consistent gyms with 20% savings.",
    amountInPaise: 39900 * 12,
    currency: "INR",
    ctaLabel: "Get Started",
    features: ["Up to 100 members", "20% Discount included"]
  },
  {
    id: "plan-growth-yearly",
    type: "saas-yearly",
    name: "Growth",
    badge: "Yearly",
    description: "Best value for scaling fast with annual commitment.",
    amountInPaise: 79900 * 12,
    currency: "INR",
    ctaLabel: "Get Started",
    isPopular: true,
    features: ["Up to 300 members", "20% Discount included"]
  },
  {
    id: "plan-scale-yearly",
    type: "saas-yearly",
    name: "Scale",
    badge: "Yearly",
    description: "Full OS with the best annual rate.",
    amountInPaise: 119900 * 12,
    currency: "INR",
    ctaLabel: "Get Started",
    features: ["Unlimited members", "20% Discount included"]
  }
];

export const websitePlan: PlanDefinition = {
  id: "website-package",
  type: "website-package",
  name: "Gym Website Package",
  badge: "White-Label Upsell",
  description: "A conversion-focused gym microsite with complete setup.",
  amountInPaise: 49900,
  recurringAmountInPaise: 19900,
  currency: "INR",
  ctaLabel: "Get My Website",
  features: [
    "Custom gym microsite",
    "Hero banner and gym logo",
    "Trainers section",
    "Membership pricing",
    "WhatsApp CTA",
    "Maps integration",
    "Gallery",
    "SEO-ready pages",
    "Lead forms"
  ]
};

const planMap = new Map<string, PlanDefinition>(
  [...saasPlans, websitePlan].map((plan) => [plan.id, plan])
);

export function getPlanById(planId: string) {
  return planMap.get(planId) ?? null;
}

export function formatInr(amountInPaise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amountInPaise / 100);
}
