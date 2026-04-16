import { PaymentModal } from "@/components/payment-modal";
import { formatInr, websitePlan } from "@/lib/plans";
import { getWhatsAppLink, siteConfig } from "@/lib/site";

export function WebsiteUpsellCard() {
  return (
    <section
      id="website"
      className="mt-16 scroll-mt-24 overflow-hidden rounded-3xl border border-amber-200/70 bg-gradient-to-br from-amber-50 to-rose-50 p-8 shadow-2xl shadow-amber-100/40 dark:border-slate-700 dark:from-slate-900 dark:to-rose-950/20"
    >
      <p className="section-kicker">White-label Website Upsell</p>
      <h2 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">Gym Website Package</h2>

      <div className="mt-5 flex flex-wrap items-end gap-6">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">One-time setup</p>
          <p className="text-4xl font-black text-slate-900 dark:text-white">{formatInr(websitePlan.amountInPaise)}</p>
        </div>
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Hosting + maintenance</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{formatInr(websitePlan.recurringAmountInPaise ?? 0)}/month</p>
        </div>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        {websitePlan.features.map((feature) => (
          <div key={feature} className="rounded-xl border border-white/70 bg-white/80 px-4 py-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200">
            {feature}
          </div>
        ))}
      </div>

      <div id="contact" className="mt-8 flex flex-wrap gap-3">
        <div className="w-full sm:w-auto sm:min-w-60">
          <PaymentModal plan={websitePlan} triggerLabel="Get My Website" />
        </div>
        <a href={getWhatsAppLink("Hi GMMX, I want to discuss the gym website package.")} className="btn-outline" target="_blank" rel="noreferrer">
          Talk to Expert
        </a>
        <a href={`tel:${siteConfig.phone}`} className="btn-outline">Call: {siteConfig.phone}</a>
      </div>
    </section>
  );
}
