import { PaymentModal } from "@/components/payment-modal";
import { formatInr, websitePlan } from "@/lib/plans";
import { getWhatsAppLink, siteConfig } from "@/lib/site";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";
import { ShoppingCart, CheckCircle2 } from "lucide-react";

export function WebsiteUpsellCard() {
  const { addItem, items } = useCart();
  const isInCart = items.some(i => i.id === "addon-website");

  const handleAddToCart = () => {
    addItem({
      id: "addon-website",
      name: "White-label Website Package",
      price: formatInr(websitePlan.amountInPaise),
      type: "addon"
    });
    toast.success("Website Package added to cart!");
  };

  return (
    <section
      id="website"
      className="mt-16 scroll-mt-24 border border-amber-200/50 bg-gradient-to-br from-amber-500/5 to-amber-600/10 p-8 rounded-[2rem] relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
        <ShoppingCart size={120} className="text-amber-500" />
      </div>

      <div className="relative z-10">
        <p className="section-kicker !text-amber-500">Premium Add-on</p>
        <h2 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">Gym Website Package</h2>

        <div className="mt-5 flex flex-wrap items-end gap-6">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">One-time setup</p>
            <p className="text-4xl font-black text-slate-900 dark:text-white">{formatInr(websitePlan.amountInPaise)}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Hosting + maintenance</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{formatInr(websitePlan.recurringAmountInPaise ?? 0)}/month</p>
          </div>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {websitePlan.features.map((feature) => (
            <div key={feature} className="rounded-xl border border-white/5 bg-black/20 px-4 py-3 text-sm font-medium text-slate-300 flex items-center gap-2">
              <CheckCircle2 size={14} className="text-amber-500" />
              {feature}
            </div>
          ))}
        </div>

        <div id="contact" className="mt-8 flex flex-wrap gap-3">
          <button 
            onClick={handleAddToCart}
            className={`w-full sm:w-auto px-10 py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-2 ${
              isInCart 
              ? "bg-emerald-500 text-white" 
              : "bg-amber-500 text-white hover:bg-amber-600 shadow-[0_10px_30px_rgba(245,158,11,0.2)]"
            }`}
          >
            {isInCart ? <><CheckCircle2 size={20}/> In Cart</> : <><ShoppingCart size={20}/> Add to Cart</>}
          </button>
          
          <a href={getWhatsAppLink("Hi GMMX, I want to discuss the gym website package.")} className="px-6 py-4 rounded-2xl border border-white/10 bg-white/5 font-bold text-slate-300 hover:bg-white/10 transition-all" target="_blank" rel="noreferrer">
            Talk to Expert
          </a>
        </div>
      </div>
    </section>
  );
}
