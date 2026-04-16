export type PlanType = "saas-monthly" | "website-package";

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
    id: "starter-monthly",
    type: "saas-monthly",
    name: "Starter",
    badge: "Best for New Gyms",
    description: "Launch and automate your first branch.",
    amountInPaise: 49900,
    currency: "INR",
    ctaLabel: "Pay with Razorpay",
    features: [
      "1 branch",
      "100 members",
      "Attendance",
      "Fee reminders",
      "Trainer dashboard",
      "Mobile app access",
      "QR check-in"
    ]
  },
  {
    id: "growth-monthly",
    type: "saas-monthly",
    name: "Growth",
    badge: "Most Popular",
    description: "Scale operations, marketing, and retention.",
    amountInPaise: 99900,
    currency: "INR",
    ctaLabel: "Pay with Razorpay",
    isPopular: true,
    features: [
      "Everything in Starter",
      "White-label microsite",
      "Lead CRM",
      "Trainer workflows",
      "Member streaks",
      "Progress charts",
      "WhatsApp reminders"
    ]
  },
  {
    id: "pro-monthly",
    type: "saas-monthly",
    name: "Pro",
    badge: "For Multi-Branch Operators",
    description: "Run high-volume gyms with advanced controls.",
    amountInPaise: 149900,
    currency: "INR",
    ctaLabel: "Pay with Razorpay",
    features: [
      "Everything in Growth",
      "Multi-branch",
      "Advanced analytics",
      "Premium automations",
      "Lead conversion funnel",
      "Staff leave workflows",
      "Owner business dashboard"
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
