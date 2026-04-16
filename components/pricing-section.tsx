"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getWhatsAppLink } from "@/lib/site";
import Link from "next/link";

const pricingPlans = [
  {
    name: "Always Free",
    price: { monthly: "₹0", yearly: "₹0" },
    note: "Forever",
    description: "Best for trying GMMX with core attendance and lead capture.",
    features: ["Basic attendance (10 members)", "Lead entries", "WhatsApp support"],
    ctaLabel: "Start free",
    ctaHref: "/signup",
    popular: false
  },
  {
    name: "Growth",
    price: { monthly: "₹799", yearly: "₹639" },
    note: "per month",
    description: "Perfect for small gyms that need reminders, CRM, and reporting.",
    features: ["QR attendance (100 members)", "Fee reminders", "Gym analytics", "WhatsApp reminders"],
    ctaLabel: "Choose Growth",
    ctaHref: "/signup",
    popular: true
  },
  {
    name: "Scale",
    price: { monthly: "₹1299", yearly: "₹1039" },
    note: "per month",
    description: "For ambitious gyms scaling trainers, operations, and multi-role workflows.",
    features: ["Unlimited members", "Trainer tasking", "Advanced automation", "White-label microsite"],
    ctaLabel: "Choose Scale",
    ctaHref: "/signup",
    popular: false
  },
  {
    name: "Enterprise",
    price: { monthly: "Custom", yearly: "Custom" },
    note: "Tailored",
    description: "Built for multi-branch operators with onboarding and migration support.",
    features: ["Custom onboarding", "Priority support", "Enterprise controls", "Dedicated account manager"],
    ctaLabel: "Talk to GMMX",
    ctaHref: getWhatsAppLink("Hi GMMX team, I want Enterprise pricing details."),
    popular: false
  }
];

export function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  return (
    <section id="pricing" className="mt-24 scroll-mt-24 py-20 bg-[#05050A]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Pricing Plans</h2>
          <p className="text-xl text-slate-400">Choose the plan that's right for you</p>
          
          <div className="mt-8 flex justify-center">
            <Tabs 
              defaultValue="monthly" 
              onValueChange={(val) => setBillingPeriod(val as "monthly" | "yearly")}
              className="bg-white/5 p-1 rounded-xl border border-white/10"
            >
              <TabsList className="bg-transparent border-none p-0 h-10">
                <TabsTrigger 
                  value="monthly" 
                  className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:text-black text-white transition-all font-bold"
                >
                  Monthly
                </TabsTrigger>
                <TabsTrigger 
                  value="yearly" 
                  className="rounded-lg px-6 data-[state=active]:bg-white data-[state=active]:text-black text-white transition-all font-bold"
                >
                  Yearly
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {pricingPlans.map((plan) => (
            <Card 
              key={plan.name}
              className={`relative flex flex-col bg-black/40 border-white/5 rounded-[2.5rem] p-4 transition-all hover:border-[#FF5C73]/30 ${
                plan.popular ? "border-[#FF5C73] ring-1 ring-[#FF5C73] shadow-[0_0_40px_rgba(255,92,115,0.15)]" : ""
              }`}
            >
              <CardHeader className="pt-8 px-6">
                <CardTitle className="text-xl font-bold text-white mb-2">{plan.name}</CardTitle>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl font-black text-white">
                    {billingPeriod === "monthly" ? plan.price.monthly : plan.price.yearly}
                  </span>
                  <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                    /{billingPeriod === "monthly" ? "month" : "month"}
                  </span>
                </div>
                <CardDescription className="mt-4 text-slate-400 font-medium leading-relaxed">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 px-6 pt-6">
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
                        <Check className="h-3 w-3 text-emerald-400 stroke-[3px]" />
                      </div>
                      <span className="text-sm text-slate-300 font-medium leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="px-6 pb-8 pt-8">
                {plan.ctaHref.startsWith("http") ? (
                  <a
                    href={plan.ctaHref}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center rounded-2xl bg-white px-6 py-4 text-sm font-black text-black transition-all hover:bg-slate-200"
                  >
                    {plan.ctaLabel}
                  </a>
                ) : (
                  <Link
                    href={plan.ctaHref}
                    className="w-full flex items-center justify-center rounded-2xl bg-white px-6 py-4 text-sm font-black text-black transition-all hover:bg-slate-200"
                  >
                    {plan.ctaLabel}
                  </Link>
                )}
              </CardFooter>

              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#FF5C73] px-4 py-1 text-[10px] font-black uppercase tracking-widest text-white ring-4 ring-black">
                  Recommended
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
