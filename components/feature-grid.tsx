import Image from "next/image";
import ScrollStack, { ScrollStackItem } from "./scroll-stack";

const features = [
  {
    title: "Smart lead capture",
    description: "Turn website visitors and walk-ins into trackable leads with auto follow-up workflows.",
    image: "/rightside-hero.png",
    alt: "GMMX dashboard for lead and analytics tracking",
    bg: "bg-[#09090E] border-[#FF5C73]/20"
  },
  {
    title: "QR attendance in seconds",
    description: "Generate secure daily QR codes and simplify check-ins for members, trainers, and front desk teams.",
    image: "/mobile-app-preview.svg",
    alt: "GMMX QR attendance and mobile check-in preview",
    bg: "bg-[#110D18] border-fuchsia-500/20"
  },
  {
    title: "WhatsApp fee reminders",
    description: "Automate reminder nudges that recover dues on time without staff manually chasing every member.",
    image: "/right-side.png",
    alt: "WhatsApp fee reminder automation preview",
    bg: "bg-[#0A1211] border-emerald-500/20"
  },
  {
    title: "Lead CRM for follow-ups",
    description: "Track walk-ins, trial leads, and conversion stages with owner-level visibility and performance insights.",
    image: "/rightside-hero.png",
    alt: "Lead CRM pipeline view",
    bg: "bg-[#120B0B] border-rose-500/20"
  },
  {
    title: "Trainer workflows",
    description: "Daily checklists, assigned members, and progress logs to keep coaching quality consistent.",
    image: "/mobile-app-preview.svg",
    alt: "Trainer workflow and member tasking preview",
    bg: "bg-[#0D0B12] border-indigo-500/20"
  },
  {
    title: "Owner dashboards",
    description: "Understand revenue trends, attendance consistency, and branch-level health from one dashboard.",
    image: "/right-side.png",
    alt: "Owner analytics dashboard",
    bg: "bg-[#0A0D12] border-blue-500/20"
  }
];

export function FeatureGrid() {
  return (
    <section id="features" className="mt-20 scroll-mt-24">
      <div className="mb-0 flex items-end justify-between gap-6 px-4">
        <div>
          <p className="text-[#FF5C73] font-bold tracking-widest text-xs uppercase mb-1">Product Features</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">Everything your gym needs to grow reliably</h2>
        </div>
      </div>
      
      {/* 3D Scrolling Stack Implementation */}
      <div className="relative mt-12 pb-32">
        <ScrollStack useWindowScroll={true} itemStackDistance={100} stackPosition="150px" blurAmount={2}>
          {features.map((feature) => (
            <ScrollStackItem 
              key={feature.title} 
              itemClassName={`flex flex-col md:flex-row overflow-hidden border p-0 ${feature.bg}`}
            >
              <div className="flex-1 p-8 sm:p-12 flex flex-col justify-center">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-md">{feature.description}</p>
              </div>
              <div className="flex-1 relative min-h-[250px] md:min-h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent z-10 hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 md:hidden" />
                <Image
                  src={feature.image}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  alt={feature.alt}
                  className="object-cover object-left-top"
                  loading="lazy"
                />
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}
