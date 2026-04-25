import { Footer } from "@/components/footer";
import { PricingSection } from "@/components/pricing-section";
import { FAQAccordion } from "@/components/faq-accordion";

export const metadata = {
  title: "Pricing | GMMX",
  description: "Simple, transparent pricing for gyms of all sizes. Choose the plan that fits your growth.",
};

export default function PricingPage() {
  return (
    <main className="bg-[#05050A] min-h-screen">
      <div className="pt-20">
        <PricingSection />
        
        <div className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <FAQAccordion />
        </div>
      </div>
      <Footer />
    </main>
  );
}
