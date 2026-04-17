"use client";

import Image from "next/image";
import ScrollStack, { ScrollStackItem } from "./scroll-stack";

const features = [
  {
    title: "Smart lead capture",
    description:
      "Turn website visitors and walk-ins into trackable leads with auto follow-up workflows.",
    image: "/smartLead.png",
    alt: "CRM dashboard showing lead capture and analytics",
    bg: "bg-[#09090E] border-[#FF5C73]/20",
  },
  {
    title: "QR attendance in seconds",
    description:
      "Generate secure daily QR codes and simplify check-ins for members, trainers, and front desk teams.",
    image: "/QR attendance.png",
    alt: "QR code scanning using mobile phone",
    bg: "bg-[#110D18] border-fuchsia-500/20",
  },
  {
    title: "WhatsApp fee reminders",
    description:
      "Automate reminder nudges that recover dues on time without staff manually chasing every member.",
    image: "/whatsApp img.jpg",
    alt: "WhatsApp chat interface showing reminders",
    bg: "bg-[#0A1211] border-emerald-500/20",
  },
  {
    title: "Lead CRM for follow-ups",
    description:
      "Track walk-ins, trial leads, and conversion stages with owner-level visibility and performance insights.",
    image: "/crm.jpg",
    alt: "Sales pipeline CRM dashboard",
    bg: "bg-[#120B0B] border-rose-500/20",
  },
  {
    title: "Trainer workflows",
    description:
      "Daily checklists, assigned members, and progress logs to keep coaching quality consistent.",
    image: "/trainer.jpg",
    alt: "Fitness trainer coaching a client",
    bg: "bg-[#0D0B12] border-indigo-500/20",
  },
  {
    title: "Owner dashboards",
    description:
      "Understand revenue trends, attendance consistency, and branch-level health from one dashboard.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    alt: "Business analytics dashboard charts",
    bg: "bg-[#0A0D12] border-blue-500/20",
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="mt-20 scroll-mt-24">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-[#FF5C73] font-bold tracking-widest text-xs uppercase mb-1">
          Product Features
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Everything your gym needs to grow reliably
        </h2>
      </div>

      {/* Scroll Stack */}
      <ScrollStack className="mt-12">
        {features.map((feature, index) => (
          <ScrollStackItem
            key={feature.title}
            itemClassName={`flex flex-col md:flex-row overflow-hidden border p-0 ${feature.bg}`}
          >
            {/* Left Content */}
            <div className="flex-1 p-8 sm:p-12 flex flex-col justify-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-md">
                {feature.description}
              </p>
            </div>

            {/* Right Image */}
            <div className="flex-1 relative min-h-[260px] md:min-h-full">
              
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent z-10 hidden md:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 md:hidden" />

              <Image
                src={feature.image}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                alt={feature.alt}
                className="object-cover object-left-top transition-transform duration-500"
                priority={index === 0}
              />
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>

    </section>
  );
}