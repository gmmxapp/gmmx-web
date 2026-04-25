import { Footer } from "@/components/footer";

export const metadata = {
  title: "About Us | GMMX",
  description: "Learn more about GMMX and our mission to modernize gym management in India.",
};

export default function AboutPage() {
  return (
    <main className="bg-[#05050A] min-h-screen">
      <div className="mx-auto max-w-7xl px-6 pt-32 pb-24">
        <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-white/5 to-transparent p-12 border border-white/10">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-96 w-96 rounded-full bg-[#FF5C73]/10 blur-[100px]" />
          
          <div className="relative z-10 max-w-3xl">
            <p className="text-[#FF5C73] font-bold tracking-widest text-sm uppercase mb-6">Our Mission</p>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight italic">
              Modernizing the <span className="text-[#FF5C73]">Fitness Economy.</span>
            </h1>
            <div className="space-y-6 text-xl text-slate-400 leading-relaxed">
              <p>
                GMMX was born out of a simple observation: gym owners in India are brilliant operators but are often held back by fragmented, outdated tools.
              </p>
              <p>
                We're building the first true Operating System for gyms—an all-in-one platform that handles everything from biometric attendance to automated WhatsApp CRM, allowing you to focus on what you do best: transforming lives.
              </p>
              <p>
                Join thousands of gym owners who are scaling their business with clarity and precision.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
