import { NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/razorpay";

export async function POST(request: Request) {
  const signature = request.headers.get("x-razorpay-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const body = await request.text();

  try {
    const isValid = verifyWebhookSignature(body, signature);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
    }

    const event = JSON.parse(body) as {
      event?: string;
      payload?: { payment?: { entity?: { id?: string; order_id?: string; notes?: Record<string, string> } } };
    };

    return NextResponse.json({
      ok: true,
      event: event.event,
      paymentId: event.payload?.payment?.entity?.id,
      orderId: event.payload?.payment?.entity?.order_id,
      metadata: event.payload?.payment?.entity?.notes ?? {}
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook processing failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
