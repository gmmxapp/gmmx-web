import Link from "next/link";
import { verifyRazorpaySignature } from "@/lib/razorpay";

export const metadata = {
  title: "Payment Successful | GMMX"
};

type SearchParams = {
  orderId?: string;
  paymentId?: string;
  signature?: string;
  planId?: string;
};

export default async function PaymentSuccessPage({
  searchParams
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const orderId = resolvedSearchParams.orderId ?? "";
  const paymentId = resolvedSearchParams.paymentId ?? "";
  const signature = resolvedSearchParams.signature ?? "";

  const isVerified = orderId && paymentId && signature
    ? verifyRazorpaySignature({ orderId, paymentId, signature })
    : false;

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-emerald-300/60 bg-emerald-50 p-8 shadow-xl dark:border-emerald-500/30 dark:bg-emerald-950/20">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Payment Status</p>
        <h1 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">{isVerified ? "Payment Successful" : "Payment Received"}</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          {isVerified
            ? "Your Razorpay payment was verified successfully. Our team will activate your plan and reach out shortly."
            : "Payment is captured but signature verification is pending. Please share your payment ID with support."}
        </p>

        <div className="mt-5 space-y-1 rounded-xl bg-white/80 p-4 text-sm text-slate-600 dark:bg-slate-900/60 dark:text-slate-300">
          <p><strong>Order ID:</strong> {orderId || "N/A"}</p>
          <p><strong>Payment ID:</strong> {paymentId || "N/A"}</p>
          <p><strong>Plan:</strong> {resolvedSearchParams.planId || "N/A"}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/" className="btn-primary">Back to Home</Link>
          <Link href="/pricing" className="btn-outline">View Pricing</Link>
        </div>
      </section>
    </main>
  );
}
