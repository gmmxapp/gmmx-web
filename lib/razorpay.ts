import crypto from "crypto";
import Razorpay from "razorpay";

type CreateOrderInput = {
  amountInPaise: number;
  currency?: "INR";
  receipt: string;
  notes?: Record<string, string>;
};

function getRazorpayCredentials() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error("Razorpay credentials are not configured");
  }

  return { keyId, keySecret };
}

export function getRazorpayClient() {
  const { keyId, keySecret } = getRazorpayCredentials();
  return new Razorpay({ key_id: keyId, key_secret: keySecret });
}

export async function createRazorpayOrder(input: CreateOrderInput) {
  const client = getRazorpayClient();
  return client.orders.create({
    amount: input.amountInPaise,
    currency: input.currency ?? "INR",
    receipt: input.receipt,
    notes: input.notes
  });
}

export function verifyRazorpaySignature(input: {
  orderId: string;
  paymentId: string;
  signature: string;
}) {
  const webhookSecret = process.env.RAZORPAY_KEY_SECRET;

  if (!webhookSecret) {
    throw new Error("RAZORPAY_KEY_SECRET is required for signature verification");
  }

  const payload = `${input.orderId}|${input.paymentId}`;
  const expected = crypto
    .createHmac("sha256", webhookSecret)
    .update(payload)
    .digest("hex");

  return expected === input.signature;
}

export function verifyWebhookSignature(body: string, signature: string) {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!webhookSecret) {
    throw new Error("RAZORPAY_WEBHOOK_SECRET is not configured");
  }

  const expected = crypto.createHmac("sha256", webhookSecret).update(body).digest("hex");
  return expected === signature;
}
