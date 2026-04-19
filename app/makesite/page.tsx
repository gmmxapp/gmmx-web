import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { formatInr, websitePlan } from "@/lib/plans";
import { getWhatsAppLink } from "@/lib/site";
import { LayoutTemplate, MousePointerClick, Rocket, TrendingUp, Search, MapPin, Globe, CheckCircle2 } from "lucide-react";
import StarBorder from "@/components/star-border";

export const metadata = {
  title: "GMMX Microsites - Your Gym's Digital Storefront"
};

const templates = [
  { name: "Dark Forge", tag: "Most Popular", color: "from-slate-900 to-black" },
  { name: "Neon Burn", tag: "High Energy", color: "from-rose-950 to-black" },
  { name: "Clean Fit", tag: "Minimal", color: "from-slate-100 to-white" },
];

const workflowSteps = [
  { icon: MousePointerClick, title: "1. Pick a Template", desc: "Choose a design that matches your gym's vibe from our premium collection." },
  { icon: LayoutTemplate, title: "2. Add Details", desc: "Upload your logo, add your trainers, and set your pricing plans in one dashboard." },
  { icon: Globe, title: "3. Choose Domain", desc: "Claim your-gym.gmmx.app instantly, or connect your own custom .com domain." },
  { icon: Rocket, title: "4. Publish & Grow", desc: "Go live instantly. Share your link on Instagram and start capturing leads." },
];

export default function MakeSitePage() {
  return (
    <main className="min-h-screen bg-[#030612] text-slate-200 selection:bg-[#FF5C73]/30">
      
      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[500px] bg-[#FF5C73]/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FF5C73]/30 bg-[#FF5C73]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#FF5C73] mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5C73] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5C73]"></span>
            </span>
            GMMX Microsites
          </div>
          
          <h1 className="mx-auto max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            Stop losing leads to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5C73] to-purple-500">Instagram bios.</span>
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            A professional website builds trust and converts clicks into footfalls. Launch your gym's premium white-label website in 5 minutes. No coding required.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup">
              <StarBorder color="#FF5C73" className="w-full sm:w-auto px-8 py-4 text-base font-bold">
                Claim Your Website
              </StarBorder>
            </Link>
            <a href="#templates" className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-base font-bold text-white transition-all hover:bg-white/10">
              View Templates
            </a>
          </div>
        </div>
      </section>

      {/* ── WHY YOU NEED THIS (GROWTH) ── */}
      <section className="border-y border-white/5 bg-white/[0.02] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-black text-white sm:text-4xl">Why do you need a microsite?</h2>
              <p className="mt-4 text-lg text-slate-400">
                In today's fitness market, an Instagram page isn't enough. When prospects search for gyms nearby, they expect a professional website to check pricing, view trainers, and book trial classes.
              </p>
              
              <ul className="mt-8 space-y-4">
                {[
                  { icon: Search, title: "Better Local SEO", desc: "Rank higher on Google when people search 'gym near me'." },
                  { icon: TrendingUp, title: "Higher Conversions", desc: "Turn profile visitors into verified leads via built-in WhatsApp & Email forms." },
                  { icon: MapPin, title: "Trust & Credibility", desc: "A custom domain makes your brand look established and premium." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 rounded-2xl border border-white/5 bg-white/5 p-4 transition-all hover:border-white/10 hover:bg-white/10">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FF5C73]/20 text-[#FF5C73]">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{item.title}</h3>
                      <p className="mt-1 text-sm text-slate-400">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FF5C73]/20 to-purple-500/20 blur-3xl" />
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] p-2 shadow-2xl">
                <Image src="/microsite-preview.svg" width={800} height={600} alt="Lead conversion graph" className="w-full rounded-xl opacity-80" priority />
                
                {/* Floating stat card */}
                <div className="absolute bottom-6 right-6 flex items-center gap-4 rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-300">Lead Conversion</p>
                    <p className="text-xl font-black text-white">+314%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WORKFLOW: HOW IT WORKS ── */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-black text-white sm:text-4xl">Launch in 4 simple steps</h2>
            <p className="mt-4 text-slate-400">Manage everything directly from your GMMX dashboard.</p>
          </div>
          
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {workflowSteps.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                {i !== workflowSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] border-t-2 border-dashed border-white/10" />
                )}
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-[#0A0A0A] shadow-xl">
                  <step.icon className="text-[#FF5C73]" size={28} />
                </div>
                <h3 className="mt-6 text-lg font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEMPLATES ── */}
      <section id="templates" className="bg-black py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-black text-white sm:text-4xl">Premium Templates</h2>
              <p className="mt-4 text-slate-400 max-w-2xl">
                Start with a stunning foundation. Switch templates anytime without losing your data.
              </p>
            </div>
          </div>
          
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {templates.map((tpl, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] transition-all hover:border-[#FF5C73]/50 hover:shadow-[0_0_30px_rgba(255,92,115,0.1)]">
                <div className={`aspect-[4/3] w-full bg-gradient-to-br ${tpl.color} p-6 relative`}>
                  <div className="absolute inset-x-4 bottom-0 top-12 rounded-t-xl bg-white/5 border border-white/10 border-b-0 backdrop-blur-sm p-4">
                    <div className="h-4 w-24 bg-white/20 rounded-full mb-4" />
                    <div className="h-8 w-3/4 bg-white/10 rounded-lg mb-2" />
                    <div className="h-4 w-1/2 bg-white/5 rounded-lg" />
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">{tpl.name}</h3>
                    {tpl.tag && (
                      <span className="rounded bg-white/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-300">
                        {tpl.tag}
                      </span>
                    )}
                  </div>
                  <button className="mt-4 w-full rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-bold text-white transition-colors group-hover:bg-[#FF5C73] group-hover:border-transparent">
                    Preview Theme
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REAL EXAMPLES ── */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-white sm:text-4xl">Gyms growing with GMMX</h2>
          <p className="mt-4 text-slate-400">See real websites built and managed entirely on our platform.</p>
          
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {["ironcore.gmmx.app", "flex-fitness.com", "beastmode.gmmx.app"].map((url, i) => (
              <a key={i} href="#" className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 transition-colors hover:bg-white/10 hover:border-white/20 hover:text-white">
                <Globe size={16} className="text-slate-400" />
                <span className="font-medium text-slate-300">{url}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING & CTA ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A0A0A] to-[#030612] py-20 lg:py-28">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#FF5C73]/50 to-transparent" />
        
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-white sm:text-4xl">Ready to go live?</h2>
          
          <div className="mt-12 overflow-hidden rounded-3xl border border-[#FF5C73]/30 bg-[#FF5C73]/5 p-8 backdrop-blur-xl sm:p-12 relative">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FF5C73]/20 rounded-full blur-[50px] pointer-events-none" />
            <h3 className="text-xl font-bold text-[#FF5C73]">Microsite Add-on</h3>
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="text-5xl font-black text-white">{formatInr(websitePlan.recurringAmountInPaise ?? 0)}</span>
              <span className="text-lg font-medium text-slate-400">/ month</span>
            </div>
            <p className="mt-4 text-slate-300">Plus a one-time setup fee of {formatInr(websitePlan.amountInPaise)}.</p>
            
            <ul className="mt-8 space-y-3 text-left max-w-md mx-auto">
              {[
                "Unlimited bandwidth & hosting",
                "Custom domain connection",
                "Automatic SSL certificate",
                "Built-in lead capture forms",
                "SEO optimized structure"
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-200">
                  <CheckCircle2 size={18} className="text-[#FF5C73]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Link href="/signup" className="w-full sm:w-auto">
                <StarBorder color="#FF5C73" className="w-full py-4 text-base font-bold">
                  Start Your Free Trial
                </StarBorder>
              </Link>
              <a href={getWhatsAppLink("Hi GMMX, I want to see a live demo of the Microsite feature.")} target="_blank" rel="noreferrer" 
                 className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-base font-bold text-white transition-all hover:bg-white/10">
                Talk to Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
