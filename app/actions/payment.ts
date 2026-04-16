"use server";

import { createRazorpayOrder } from "@/lib/razorpay";
import { getPlanById } from "@/lib/plans";

export async function createRazorpayOrderAction(planId: string) {
  const plan = getPlanById(planId);
  if (!plan) {
    throw new Error("Invalid plan selected");
  }

  const order = await createRazorpayOrder({
    amountInPaise: plan.amountInPaise,
    currency: plan.currency,
    receipt: `gmmx_${plan.id}_${Date.now()}`,
    notes: {
      planId: plan.id,
      planType: plan.type,
      planName: plan.name,
      recurringAmountInPaise: String(plan.recurringAmountInPaise ?? 0)
    }
  });

  return {
    orderId: order.id,
    amountInPaise: order.amount,
    currency: order.currency,
    planId: plan.id
  };
}
