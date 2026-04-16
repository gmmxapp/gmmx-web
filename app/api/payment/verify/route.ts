import { NextResponse } from "next/server";
import { verifyRazorpaySignature } from "@/lib/razorpay";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      orderId?: string;
      paymentId?: string;
      signature?: string;
    };

    if (!payload.orderId || !payload.paymentId || !payload.signature) {
      return NextResponse.json({ error: "orderId, paymentId and signature are required" }, { status: 400 });
    }

    const verified = verifyRazorpaySignature({
      orderId: payload.orderId,
      paymentId: payload.paymentId,
      signature: payload.signature
    });

    return NextResponse.json({ verified });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Verification failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
