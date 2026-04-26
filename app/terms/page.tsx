import { Footer } from "@/components/footer";

export default function TermsPage() {
  return (
    <main className="bg-[#05050A] min-h-screen text-slate-300">
      <div className="max-w-4xl mx-auto px-6 py-32">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-8">Terms of Service</h1>
        <p className="text-sm text-slate-500 mb-12">Last Updated: April 26, 2026</p>

        <div className="space-y-12 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the GMMX platform ("Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service. GMMX provides cloud-based gym management software designed for member tracking, attendance, and fee management.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Account Registration</h2>
            <p>
              To use GMMX, you must register for an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate and complete information during the registration process.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Software as a Service (SaaS) Offering</h2>
            <p>
              GMMX is a subscription-based software platform. We grant you a limited, non-exclusive, non-transferable license to access and use the software for your gym business. We do not support or allow the use of our platform for illegal activities, spamming, or prohibited member communication.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Payment Terms</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Subscription fees are billed in advance based on your chosen plan (Monthly/Yearly).</li>
              <li>Payments are processed through secure third-party payment gateways.</li>
              <li>Failure to pay subscription fees may result in temporary suspension or termination of access to the platform.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Use of Automated Reminders</h2>
            <p>
              Users are responsible for ensuring that automated WhatsApp or SMS reminders sent via GMMX comply with local regulations and telecommunication laws. GMMX is a management tool and should not be used for unsolicited marketing or "blasting."
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
            <p>
              GMMX Technologies shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our Service. The Service is provided "as is" without any warranties, express or implied.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Termination</h2>
            <p>
              We reserve the right to terminate or suspend your account at our sole discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users of the Service or us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Governing Law</h2>
            <p>
              These Terms of Service are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Tamil Nadu, India.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
