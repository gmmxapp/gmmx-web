import { Footer } from "@/components/footer";

export default function PrivacyPage() {
  return (
    <main className="bg-[#05050A] min-h-screen text-slate-300">
      <div className="max-w-4xl mx-auto px-6 py-32">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-8">Privacy Policy</h1>
        <p className="text-sm text-slate-500 mb-12">Last Updated: April 26, 2026</p>

        <div className="space-y-12 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p>
              Welcome to GMMX ("we," "our," or "us"). We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, and protect the data of gym owners and their members using the GMMX platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Business Information:</strong> Gym name, location, contact details, and GST information (if provided).</li>
              <li><strong>User Accounts:</strong> Name, email address, phone number, and encrypted credentials.</li>
              <li><strong>Member Data:</strong> Information about gym members added by gym owners, including attendance records, subscription status, and contact details for automated reminders.</li>
              <li><strong>Usage Data:</strong> Technical logs, IP addresses, and interaction data to improve our service.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
            <p>
              We use the collected information for:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Providing and maintaining the GMMX platform.</li>
              <li>Processing subscription payments through secure third-party gateways.</li>
              <li>Sending automated WhatsApp and SMS reminders for fee payments.</li>
              <li>Generating business analytics and growth reports for gym owners.</li>
              <li>Complying with legal obligations and protecting against fraud.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
            <p>
              We implement industry-standard security measures, including SSL encryption and secure database protocols, to protect your data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Third-Party Services</h2>
            <p>
              We share limited data with trusted third-party service providers, such as payment processors (e.g., Razorpay, Cashfree) and communication APIs (e.g., WhatsApp Business API), solely for the purpose of delivering our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Contact Us</h2>
            <p>
              If you have any questions regarding this Privacy Policy, please contact us at:
            </p>
            <div className="mt-4 p-6 bg-white/5 rounded-2xl border border-white/10">
              <p className="font-bold text-white">GMMX Technologies</p>
              <p>Email: support@gmmx.app</p>
              <p>Phone: +91 99447 25360</p>
              <p>Location: Tamil Nadu, India</p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
