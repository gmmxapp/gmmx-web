import Link from "next/link";
import { FAQAccordion } from "@/components/faq-accordion";
import { FeatureGrid } from "@/components/feature-grid";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { MobileAppSection } from "../components/mobile-app-section";
import { PricingSection } from "@/components/pricing-section";
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

export default function HomePage() {
  return (
    <main className="bg-[#05050A]">
      <HeroSection />
      
      <div className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8 flex flex-col gap-32 md:gap-40">
        <FeatureGrid />

        <MobileAppSection />

        <PricingSection />

        <TestimonialSection />
        
        <FAQAccordion />
      </div>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
    </main>
  );
}
