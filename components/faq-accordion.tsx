"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

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
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 mx-auto max-w-3xl px-4 sm:px-6 relative z-10">
      <div className="text-center mb-12">
        <p className="section-kicker">FAQ</p>
        <h2 className="section-title">Questions gym owners ask before switching</h2>
      </div>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = index === openIndex;
          return (
            <article 
              key={faq.question} 
              className={`overflow-hidden rounded-2xl border transition-all duration-300 ${isOpen ? 'border-[#FF5C73]/30 bg-white shadow-lg shadow-[#FF5C73]/5 dark:border-[#FF5C73]/30 dark:bg-[#0B101E]/80 dark:shadow-none' : 'border-slate-200 bg-white/60 hover:bg-white dark:border-slate-800 dark:bg-[#0B101E]/40 dark:hover:bg-[#0B101E]/70'}`}
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-6 py-5 sm:py-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#FF5C73]/50 rounded-2xl"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
              >
                <span className={`text-[15px] sm:text-[17px] font-semibold transition-colors duration-200 ${isOpen ? 'text-[#FF5C73] dark:text-[#FF5C73]' : 'text-slate-800 dark:text-slate-200'}`}>
                  {faq.question}
                </span>
                <span 
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${isOpen ? 'rotate-45 border-[#FF5C73] bg-[#FF5C73] text-white' : 'border-slate-200 bg-slate-50 text-slate-400 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-400'}`}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-0 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </article>
          );
        })}
      </div>
    </section>
  );
}
