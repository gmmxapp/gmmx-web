import { Footer } from "@/components/footer";

export default function RefundPolicyPage() {
  return (
    <main className="bg-[#05050A] min-h-screen text-slate-300">
      <div className="max-w-4xl mx-auto px-6 py-32">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-8">Cancellation & Refund Policy</h1>
        <p className="text-sm text-slate-500 mb-12">Last Updated: April 26, 2026</p>

        <div className="space-y-12 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Subscription Cancellation</h2>
            <p>
              GMMX is a subscription-based SaaS platform. You can cancel your subscription at any time directly through your dashboard settings. Upon cancellation, your access to the platform will remain active until the end of your current billing period (Monthly or Yearly).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Refund Eligibility</h2>
            <p>
              Since GMMX provides a digital software service and offers a **Free Trial** for users to evaluate the platform before purchasing, we generally do not offer refunds once a paid subscription has started.
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>No Refunds:</strong> No refunds will be provided for partial months of service or unused periods in an annual plan.</li>
              <li><strong>Technical Errors:</strong> In the event of a duplicate payment or a technical error on our part during processing, please contact us within 7 days for a full refund of the erroneous amount.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Chargebacks</h2>
            <p>
              We encourage users to contact our support team first if there are any issues with a transaction. Unjustified chargebacks may result in the immediate termination of the user account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Policy Changes</h2>
            <p>
              GMMX Technologies reserves the right to modify this Cancellation & Refund Policy at any time. Any changes will be posted on this page with an updated timestamp.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Contact Support</h2>
            <p>
              If you believe you are entitled to a refund due to a billing error, please reach out to us:
            </p>
            <div className="mt-4 p-6 bg-white/5 rounded-2xl border border-white/10">
              <p className="font-bold text-white">Billing Support</p>
              <p>Email: support@gmmx.app</p>
              <p>Response Time: Within 24-48 business hours</p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
