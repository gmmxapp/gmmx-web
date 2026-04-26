export type PlanType = "saas-monthly" | "saas-yearly" | "saas-free" | "website-package";

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
    features: [
      "Up to 100 members",
      "QR scan attendance",
      "Fee payment tracking",
      "Manual fee reminders",
      "Basic business reports"
    ]
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
    features: [
      "Up to 300 members",
      "WhatsApp automation",
      "Automated fee alerts",
      "Trainer management",
      "Custom gym microsite",
      "Advanced CRM tools"
    ]
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
    features: [
      "Unlimited members",
      "Full business automation",
      "White-label microsite",
      "Multi-branch support",
      "Advanced API access",
      "24/7 VIP support"
    ]
  },
  // ─── YEARLY PLANS ───────────────────────────────────────────────────────────
  {
    id: "plan-starter-yearly",
    type: "saas-yearly",
    name: "Starter",
    badge: "Yearly",
    description: "Annual plan for consistent growing professional gyms.",
    amountInPaise: 39900 * 12, // 399 * 12
    currency: "INR",
    ctaLabel: "Start Free Trial",
    features: [
      "Up to 100 members",
      "Everything in Monthly",
      "Priority onboarding"
    ]
  },
  {
    id: "plan-growth-yearly",
    type: "saas-yearly",
    name: "Growth",
    badge: "Yearly",
    description: "Best value for scaling fast with annual commitment.",
    amountInPaise: 79900 * 12, // 799 * 12
    currency: "INR",
    ctaLabel: "Start Free Trial",
    isPopular: true,
    features: [
      "Up to 300 members",
      "Everything in Monthly",
      "20% Discount included"
    ]
  },
  {
    id: "plan-scale-yearly",
    type: "saas-yearly",
    name: "Scale",
    badge: "Yearly",
    description: "Full OS with the best annual rate for multi-branch ops.",
    amountInPaise: 119900 * 12, // 1199 * 12
    currency: "INR",
    ctaLabel: "Start Free Trial",
    features: [
      "Unlimited members",
      "Everything in Monthly",
      "Dedicated account manager"
    ]
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
