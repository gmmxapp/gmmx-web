import Image from "next/image";
import Link from "next/link";
import { FAQAccordion } from "@/components/faq-accordion";
import { FeatureGrid } from "@/components/feature-grid";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { TestimonialSection } from "@/components/testimonial-section";
import { getWhatsAppLink, siteConfig, siteUrl } from "@/lib/site";

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "GMMX",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, iOS, Android",
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "499",
    highPrice: "1499",
    priceCurrency: "INR"
  },
  description: siteConfig.description,
  url: siteUrl,
  provider: {
    "@type": "Organization",
    name: "GMMX",
    telephone: siteConfig.phone
  }
};

const pricingPlans = [
  {
    name: "Always Free",
    price: "INR 0",
    note: "Forever",
    description: "Best for trying GMMX with core attendance and lead capture.",
    features: ["Basic attendance", "Lead entries", "WhatsApp support"],
    ctaLabel: "Start free",
    ctaHref: "/signup"
  },
  {
    name: "Growth",
    price: "INR 799",
    note: "/ month",
    description: "Perfect for small gyms that need reminders, CRM, and reporting.",
    features: ["QR attendance", "Fee reminders", "Gym analytics"],
    ctaLabel: "Choose Growth",
    ctaHref: "/signup"
  },
  {
    name: "Scale",
    price: "INR 1299",
    note: "/ month",
    description: "For ambitious gyms scaling trainers, operations, and multi-role workflows.",
    features: ["Everything in Growth", "Trainer tasking", "Advanced automation"],
    ctaLabel: "Choose Scale",
    ctaHref: "/signup"
  },
  {
    name: "Enterprise",
    price: "Contact team",
    note: "Custom",
    description: "Built for multi-branch operators with onboarding and migration support.",
    features: ["Custom onboarding", "Priority support", "Enterprise controls"],
    ctaLabel: "Talk to GMMX",
    ctaHref: getWhatsAppLink("Hi GMMX team, I want Enterprise pricing details.")
  }
];

export default function HomePage() {
  return (
    <main className="bg-[#05050A]">
      <HeroSection />
      
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <FeatureGrid />

        <section className="mt-16 grid items-center gap-8 rounded-3xl border border-white/5 bg-white/5 p-8 dark:border-slate-700 dark:bg-slate-900/70 lg:grid-cols-2">
          <div>
            <p className="section-kicker">Mobile App Preview</p>
            <h2 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">Owner + trainer + member experience in your pocket</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Real-time attendance, dashboard visibility, reminders, and member progression tracking with role-based access.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/#pricing" className="btn-primary">View Pricing</Link>
              <a href={getWhatsAppLink("Hi GMMX team, I need a mobile app demo.")} target="_blank" rel="noreferrer" className="btn-outline">
                Book demo
              </a>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-100 p-3 dark:border-slate-700 dark:bg-slate-950">
            <Image
              src="/mobile-app-preview.svg"
              width={640}
              height={420}
              alt="GMMX mobile app preview"
              className="h-auto w-full rounded-xl"
              loading="lazy"
            />
          </div>
        </section>

        <section id="pricing" className="mt-20 scroll-mt-24">
          <header className="max-w-2xl">
            <p className="section-kicker">Pricing</p>
            <h2 className="section-title">One platform, four clear plans</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Start free and upgrade only when your gym operations need more advanced workflows.
            </p>
          </header>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {pricingPlans.map((plan) => (
              <article key={plan.name} className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900/70">
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-300">{plan.name}</p>
                <p className="mt-3 text-3xl font-black text-slate-900 dark:text-white">{plan.price}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{plan.note}</p>
                <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{plan.description}</p>
                <ul className="mt-5 grow space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <span className="text-rose-500">●</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.ctaHref}
                  target={plan.ctaHref.startsWith("http") ? "_blank" : undefined}
                  rel={plan.ctaHref.startsWith("http") ? "noreferrer" : undefined}
                  className="btn-primary mt-6"
                >
                  {plan.ctaLabel}
                </a>
              </article>
            ))}
          </div>
        </section>

        <TestimonialSection />
        <FAQAccordion />
        <Footer />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
    </main>
  );
}
