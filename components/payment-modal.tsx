"use client";

import { useMemo, useState } from "react";
import { formatInr, type PlanDefinition } from "@/lib/plans";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
    };
  }
}

type PaymentModalProps = {
  plan: PlanDefinition;
  triggerLabel?: string;
};

async function loadRazorpayScript() {
  if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
    return true;
  }

  return new Promise<boolean>((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function PaymentModal({ plan, triggerLabel }: PaymentModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const displayAmount = useMemo(() => formatInr(plan.amountInPaise), [plan.amountInPaise]);

  const startPayment = async () => {
    setLoading(true);
    setToast(null);

    try {
      const hasScript = await loadRazorpayScript();
      if (!hasScript || !window.Razorpay) {
        throw new Error("Unable to load Razorpay checkout");
      }

      const response = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: plan.id })
      });

      if (!response.ok) {
        throw new Error("Could not create order");
      }

      const payload = (await response.json()) as {
        orderId: string;
        amountInPaise: number;
        currency: string;
        keyId: string;
      };

      const razorpay = new window.Razorpay({
        key: payload.keyId,
        amount: payload.amountInPaise,
        currency: payload.currency,
        name: "GMMX",
        description: `${plan.name} plan payment`,
        order_id: payload.orderId,
        handler: function (result: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) {
          const params = new URLSearchParams({
            orderId: result.razorpay_order_id,
            paymentId: result.razorpay_payment_id,
            signature: result.razorpay_signature,
            planId: plan.id
          });
          window.location.href = `/payment/success?${params.toString()}`;
        },
        modal: {
          ondismiss: function () {
            window.location.href = "/payment/failed?reason=checkout-dismissed";
          }
        },
        theme: {
          color: "#FF5C73"
        }
      });

      razorpay.open();
      setToast("Checkout opened. Complete payment to activate plan.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Payment initialization failed";
      setToast(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="btn-primary w-full">
        {triggerLabel ?? plan.ctaLabel}
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-rose-500">Secure checkout</p>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">{plan.name}</h3>
              </div>
              <button
                type="button"
                className="rounded-lg border border-slate-300 px-3 py-1 text-sm dark:border-slate-600"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>

            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{plan.description}</p>
            <p className="mt-4 text-3xl font-black text-slate-900 dark:text-white">{displayAmount}</p>

            {plan.recurringAmountInPaise ? (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Plus {formatInr(plan.recurringAmountInPaise)} monthly for hosting and maintenance.
              </p>
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400">Billed monthly via Razorpay.</p>
            )}

            <ul className="mt-5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {plan.features.slice(0, 6).map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span className="text-rose-500">●</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={startPayment}
              disabled={loading}
              className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Preparing Razorpay..." : "Pay with Razorpay"}
            </button>

            {toast ? (
              <p className="mt-3 rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">
                {toast}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
