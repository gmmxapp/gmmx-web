import { NextResponse } from "next/server";
import { createRazorpayOrder } from "@/lib/razorpay";
import { getPlanById } from "@/lib/plans";

export async function POST(request: Request) {
  try {
    const { planId } = (await request.json()) as { planId?: string };

    if (!planId) {
      return NextResponse.json({ error: "planId is required" }, { status: 400 });
    }

    const plan = getPlanById(planId);
    if (!plan) {
      return NextResponse.json({ error: "Unknown plan" }, { status: 404 });
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

    return NextResponse.json({
      orderId: order.id,
      amountInPaise: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create order";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
