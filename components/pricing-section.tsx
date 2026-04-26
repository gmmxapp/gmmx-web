"use client";

import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getWhatsAppLink } from "@/lib/site";
import Link from "next/link";

const pricingPlans = [
  {
    id: "plan-free",
    name: "Free",
    price: { monthly: 0, yearly: 0 },
    displayPrice: { monthly: "₹0", yearly: "₹0" },
    description: "Perfect for trainers and small pilots just getting started.",
    features: [
      "Up to 25 members",
      "Digital attendance",
      "Basic lead capture",
      "Community support",
      "Core dashboard access"
    ],
    ctaLabel: "Get Started",
    ctaHref: "/signup",
    popular: false
  },
  {
    id: "plan-starter",
    name: "Starter",
    price: { monthly: 499, yearly: 399 },
    displayPrice: { monthly: "₹499", yearly: "₹399" },
    description: "The essential toolkit for growing professional gyms.",
    features: [
      "Up to 100 members",
      "QR scan attendance",
      "Fee payment tracking",
      "Manual fee reminders",
      "Basic business reports"
    ],
    ctaLabel: "Start Free Trial",
    ctaHref: "/signup",
    popular: false
  },
  {
    id: "plan-growth",
    name: "Growth",
    price: { monthly: 999, yearly: 799 },
    displayPrice: { monthly: "₹999", yearly: "₹799" },
    description: "Our most popular plan for serious gym owners scaling fast.",
    features: [
      "Up to 300 members",
      "WhatsApp automation",
      "Automated fee alerts",
      "Trainer management",
      "Custom gym microsite",
      "Advanced CRM tools"
    ],
    ctaLabel: "Start Free Trial",
    ctaHref: "/signup",
    popular: true
  },
  {
    id: "plan-scale",
    name: "Scale",
    price: { monthly: 1499, yearly: 1199 },
    displayPrice: { monthly: "₹1499", yearly: "₹1199" },
    description: "The complete OS for elite gyms and multi-branch operations.",
    features: [
      "Unlimited members",
      "Full business automation",
      "White-label microsite",
      "Multi-branch support",
      "Advanced API access",
      "24/7 VIP support"
    ],
    ctaLabel: "Start Free Trial",
    ctaHref: "/signup",
    popular: false
  }
];

export function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  return (
    <section id="pricing" className="scroll-mt-24 pb-32 pt-20 font-pjs">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-24">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF5C73]/10 text-[#FF5C73] text-[12px] font-black uppercase tracking-[0.2em] mb-6 border border-[#FF5C73]/20">
            Professional Pricing
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">
            Scalable Plans for <br className="hidden md:block" /> Every Stage.
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Choose the plan that fits your current stage. No hidden fees, no setup costs. Switch or cancel anytime.
          </p>
          
          <div className="mt-14 flex justify-center">
            <div className="bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] inline-flex items-center">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`px-10 py-3.5 rounded-xl font-bold text-sm transition-all duration-500 ease-out ${
                  billingPeriod === "monthly" ? "bg-white text-black shadow-xl" : "text-slate-500 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod("yearly")}
                className={`px-10 py-3.5 rounded-xl font-bold text-sm transition-all duration-500 ease-out relative ${
                  billingPeriod === "yearly" ? "bg-white text-black shadow-xl" : "text-slate-500 hover:text-white"
                }`}
              >
                Yearly
                <span className="absolute -top-5 -right-5 bg-gradient-to-br from-[#FF5C73] to-[#ff3b56] text-white text-[10px] px-3 py-1.5 rounded-full font-black shadow-2xl border-4 border-[#05050A] animate-bounce">
                  -20% OFF
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 items-stretch pt-12">
          {pricingPlans.map((plan) => (
            <div 
              key={plan.id}
              className={`group relative flex flex-col transition-all duration-500 rounded-[2.5rem] p-8 border ${
                plan.popular 
                  ? "bg-[#0A0A1F] border-[#FF5C73]/40 shadow-[0_40px_100px_-20px_rgba(255,92,115,0.3)] scale-[1.05] z-20" 
                  : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04] hover:-translate-y-2"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF5C73] to-[#ff7e90] px-6 py-2.5 text-[11px] font-black uppercase tracking-[0.15em] text-white shadow-[0_10px_30px_rgba(255,92,115,0.5)] ring-8 ring-[#05050A]">
                  POPULAR 🔥
                </div>
              )}
              
              <div className="mb-10">
                <h3 className={`text-xl font-black tracking-tight mb-4 ${plan.popular ? "text-white" : "text-slate-200"}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1.5 mb-6">
                  <span className="text-5xl font-black text-white tracking-tighter">
                    {billingPeriod === "monthly" ? plan.displayPrice.monthly : plan.displayPrice.yearly}
                  </span>
                  {plan.price.monthly > 0 && (
                    <span className="text-sm font-black text-slate-500 uppercase tracking-widest">
                      /mo
                    </span>
                  )}
                </div>
                <p className="text-slate-400 font-medium text-[15px] leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <div className="flex-1">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />
                <ul className="space-y-6 mb-10">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-4">
                      <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${plan.popular ? "bg-[#FF5C73]/20" : "bg-white/10"}`}>
                        <Check className={`h-3.5 w-3.5 ${plan.popular ? "text-[#FF5C73]" : "text-white"} stroke-[4.5px]`} />
                      </div>
                      <span className="text-[15px] text-slate-300 font-semibold leading-snug tracking-tight">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto">
                <Link
                  href={plan.ctaHref}
                  className={`w-full flex items-center justify-center gap-3 rounded-2xl px-6 py-5 text-[15px] font-black transition-all duration-500 group-hover:gap-4 ${
                    plan.popular
                      ? "bg-[#FF5C73] text-white hover:bg-[#ff435c] shadow-[0_20px_40px_-10px_rgba(255,92,115,0.4)] active:scale-[0.98]"
                      : "bg-white text-black hover:bg-slate-100 active:scale-[0.98]"
                  }`}
                >
                  {plan.ctaLabel} 
                  <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              
              {/* Subtle inner glow for Growth plan */}
              {plan.popular && (
                <div className="absolute inset-0 rounded-[2.5rem] bg-[#FF5C73]/5 pointer-events-none" />
              )}
            </div>
          ))}
        </div>

        {/* Professional Trust Bar */}
        <div className="mt-32 pt-16 border-t border-white/5 flex flex-wrap justify-center gap-x-20 gap-y-10 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
          <div className="flex items-center gap-3 font-black text-[10px] uppercase tracking-[0.25em] text-slate-400">
            <div className="h-2 w-2 rounded-full bg-[#FF5C73]" />
            50+ Partner Gyms
          </div>
          <div className="flex items-center gap-3 font-black text-[10px] uppercase tracking-[0.25em] text-slate-400">
            <div className="h-2 w-2 rounded-full bg-[#FF5C73]" />
            Tier-1 Security
          </div>
          <div className="flex items-center gap-3 font-black text-[10px] uppercase tracking-[0.25em] text-slate-400">
            <div className="h-2 w-2 rounded-full bg-[#FF5C73]" />
            Zero Setup Costs
          </div>
          <div className="flex items-center gap-3 font-black text-[10px] uppercase tracking-[0.25em] text-slate-400">
            <div className="h-2 w-2 rounded-full bg-[#FF5C73]" />
            Cancel Anytime
          </div>
        </div>
      </div>
    </section>
  );
}
