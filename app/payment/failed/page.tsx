import Link from "next/link";

export const metadata = {
  title: "Payment Failed | GMMX"
};

export default async function PaymentFailedPage({
  searchParams
}: {
  searchParams: Promise<{ reason?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-rose-300/60 bg-rose-50 p-8 shadow-xl dark:border-rose-500/30 dark:bg-rose-950/20">
        <p className="text-sm font-semibold uppercase tracking-wide text-rose-600 dark:text-rose-300">Payment Status</p>
        <h1 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">Payment was not completed</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Your transaction was canceled or failed. You can retry payment anytime from the pricing page.
        </p>
        {resolvedSearchParams.reason ? (
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Reason: {resolvedSearchParams.reason}</p>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/pricing" className="btn-primary">Retry Payment</Link>
          <Link href="/" className="btn-outline">Back to Home</Link>
        </div>
      </section>
    </main>
  );
}
