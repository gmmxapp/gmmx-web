"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How does the 14-day trial work?",
    answer:
      "You get full access to the selected plan for 14 days. No lock-in contracts. Upgrade when your gym team is ready."
  },
  {
    question: "Can I use my own gym branding?",
    answer:
      "Yes. White-label branding is available on Growth and Pro plans, including microsite branding and custom assets."
  },
  {
    question: "Is Razorpay checkout secure?",
    answer:
      "Yes. Payments are processed with Razorpay's hosted checkout. We verify payment signatures and webhook events server-side."
  },
  {
    question: "Can I add branches later?",
    answer:
      "Absolutely. Start with one branch on Starter and move to Pro when your operations expand to multiple locations."
  },
  {
    question: "Do you help with setup and onboarding?",
    answer:
      "Yes. We assist with team onboarding, initial setup, and website package launch support over call and WhatsApp."
  }
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section id="faq" className="mt-20 scroll-mt-24">
      <p className="section-kicker">FAQ</p>
      <h2 className="section-title">Questions gym owners ask before switching</h2>
      <div className="mt-6 space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = index === openIndex;
          return (
            <article key={faq.question} className="rounded-2xl border border-slate-200 bg-white/80 dark:border-slate-700 dark:bg-slate-900/70">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-6 px-5 py-4 text-left"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                aria-expanded={isOpen}
              >
                <span className="text-sm font-semibold text-slate-900 dark:text-white">{faq.question}</span>
                <span className="text-lg text-rose-500">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen ? (
                <p className="border-t border-slate-200 px-5 py-4 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
                  {faq.answer}
                </p>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
