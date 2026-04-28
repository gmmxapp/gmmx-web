import { NextResponse } from "next/server";
import { createRazorpayOrder } from "@/lib/razorpay";
import { getPlanById } from "@/lib/plans";

export async function POST(request: Request) {
  try {
    const { planId, couponCode, wantMicrosite } = (await request.json()) as { 
      planId?: string;
      couponCode?: string;
      wantMicrosite?: boolean;
    };

    if (!planId) {
      return NextResponse.json({ error: "planId is required" }, { status: 400 });
    }

    const plan = getPlanById(planId);
    if (!plan) {
      return NextResponse.json({ error: "Unknown plan" }, { status: 404 });
    }

    // Calculate dynamic amount
    let amountInPaise = plan.amountInPaise;
    const isStarter = planId.startsWith("plan-starter");
    const isWelcomeCoupon = couponCode === "WELCOMEGMMX";

    if (isWelcomeCoupon && isStarter) {
      amountInPaise = 400; // ₹4
    } else if (couponCode && couponCode.length > 3) {
      amountInPaise = Math.round(amountInPaise * 0.85); // 15% discount
    }

    if (wantMicrosite) {
      const micrositeFee = (isWelcomeCoupon && isStarter) ? 0 : 19900;
      amountInPaise += micrositeFee;
    }

    const order = await createRazorpayOrder({
      amountInPaise,
      currency: plan.currency,
      receipt: `gmmx_${plan.id}_${Date.now()}`,
      notes: {
        planId: plan.id,
        couponCode: couponCode || "",
        wantMicrosite: String(!!wantMicrosite),
        originalAmountInPaise: String(plan.amountInPaise)
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
