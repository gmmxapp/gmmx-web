import { PaymentModal } from "@/components/payment-modal";
import { formatInr, type PlanDefinition } from "@/lib/plans";

type PricingCardProps = {
  plan: PlanDefinition;
};

export function PricingCard({ plan }: PricingCardProps) {
  return (
    <article
      className={`relative flex h-full flex-col rounded-3xl border p-6 shadow-xl transition hover:-translate-y-1 ${
        plan.isPopular
          ? "border-rose-300 bg-gradient-to-b from-white to-rose-50 dark:border-rose-500/50 dark:from-slate-900 dark:to-rose-950/20"
          : "border-slate-200 bg-white/80 dark:border-slate-700 dark:bg-slate-900/70"
      }`}
    >
      {plan.badge ? (
        <span className="mb-3 inline-flex w-fit rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-rose-600 dark:border-rose-500/30 dark:bg-rose-950/30 dark:text-rose-300">
          {plan.badge}
        </span>
      ) : null}
      <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">{plan.name}</h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{plan.description}</p>
      <p className="mt-4 text-4xl font-black text-slate-900 dark:text-white">{formatInr(plan.amountInPaise)}</p>
      <p className="text-sm text-slate-500 dark:text-slate-400">per month</p>

      <ul className="mt-5 grow space-y-2 text-sm text-slate-600 dark:text-slate-300">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <span className="text-rose-500">●</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <PaymentModal plan={plan} />
      </div>
    </article>
  );
}
