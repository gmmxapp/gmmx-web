import { PaymentModal } from "@/components/payment-modal";
import { formatInr, type PlanDefinition } from "@/lib/plans";

type PricingCardProps = {
  plan: PlanDefinition;
};

export function PricingCard({ plan }: PricingCardProps) {
  const isPop = plan.isPopular;
  
  return (
    <article
      className={`relative flex h-full flex-col rounded-[2rem] p-[1px] transition-transform duration-300 hover:-translate-y-1 ${
        isPop ? "bg-gradient-to-b from-[#A855F7] to-transparent shadow-[0_0_40px_rgba(168,85,247,0.2)]" : "bg-white/5"
      }`}
    >
      {/* Outer gradient wrapper acts as the border. Inner keeps it dark. */}
      <div className="relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-[#05050A] p-8">
        
        {/* Subtle internal grid for Wope card aesthetic */}
        <div className="absolute inset-x-0 top-0 h-48 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:linear-gradient(to_bottom,black_10%,transparent)] pointer-events-none" />

        {isPop && plan.badge && (
          <div className="absolute -top-[1px] left-8 rounded-b-xl bg-[#A855F7] px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-white shadow-lg">
            TRY IT WITHOUT A CREDIT CARD!
          </div>
        )}
        
        <div className="relative z-10 mt-6">
          <h3 className="text-3xl font-bold text-white">{plan.name}</h3>
          <p className="mt-2 text-sm font-medium text-slate-400">{plan.description}</p>
          
          <div className="mt-6 flex items-baseline gap-1 relative border-b border-white/5 pb-8">
            <p className="text-4xl font-bold text-white">{formatInr(plan.amountInPaise)}</p>
            <p className="text-sm font-medium tracking-wide text-slate-500">/month</p>
          </div>

          <div className="mt-8">
            <PaymentModal plan={plan} />
          </div>

          <div className="mt-8 relative">
             <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#A855F7]">RESEARCH / FEATURES</p>
            <ul className="mb-8 grow space-y-4 text-sm">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <svg className="h-4 w-4 shrink-0 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
