"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ScrollStack, { ScrollStackItem } from "./scroll-stack";
import { useState } from "react";

/* ===============================
   ⭐ STAR BORDER (VISIBLE)
================================ */
function StarBorder({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-[32px] p-[1px] overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            "linear-gradient(120deg,#ff5c73,#7c3aed,#06b6d4,#ff5c73)",
          backgroundSize: "300% 300%",
        }}
      />
      <div className="relative bg-[#0B0D12] rounded-[32px] h-full w-full">
        {children}
      </div>
    </div>
  );
}

/* ===============================
   ✨ PREMIUM TITLE (CLEAN + SHINE)
================================ */
function PremiumTitle({ text }: { text: string }) {
  return (
    <h3 className="relative text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white leading-tight overflow-hidden">

      {/* Base */}
      <span className="relative z-10">{text}</span>

      {/* Shine effect */}
      <span
        className="
          absolute inset-0 z-0
          bg-gradient-to-r from-transparent via-white/40 to-transparent
          opacity-0 group-hover:opacity-100
          transition duration-700
        "
        style={{
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "shine 3s linear infinite",
        }}
      >
        {text}
      </span>

      {/* Glow */}
      <span className="absolute inset-0 blur-xl opacity-20 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400" />
    </h3>
  );
}

/* ===============================
   💡 SPOTLIGHT
================================ */
function SpotlightCard({ children }: { children: React.ReactNode }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <div
      className="relative rounded-[32px] overflow-hidden group"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none transition duration-300"
        style={{
          background: `radial-gradient(circle at ${pos.x}px ${pos.y}px, rgba(255,255,255,0.18), transparent 50%)`,
        }}
      />
      {children}
    </div>
  );
}

/* ===============================
   🎯 DATA
================================ */
const features = [
  {
    title: "Smart lead capture",
    description:
      "Turn website visitors into trackable leads with auto follow-up workflows.",
    image: "/smartLead.png",
  },
  {
    title: "QR attendance in seconds",
    description:
      "Generate secure QR codes and simplify check-ins.",
    image: "/qr-attendance.png",
  },
  {
    title: "WhatsApp fee reminders",
    description:
      "Automate reminder nudges that recover dues on time.",
    image: "/whatsapp.jpg",
  },
  {
    title: "Lead CRM for follow-ups",
    description:
      "Track walk-ins and conversions with insights.",
    image: "/crm.jpg",
  },
  {
    title: "Trainer workflows",
    description:
      "Daily checklists and progress tracking.",
    image: "/trainer.jpg",
  },
  {
    title: "Owner dashboards",
    description:
      "Understand revenue trends and performance.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
  },
];

/* ===============================
   🚀 MAIN COMPONENT
================================ */
export function FeatureGrid() {
  return (
    <section id="features" className="scroll-mt-24">

      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-16">
        <p className="text-[#FF5C73] font-bold tracking-widest text-sm uppercase mb-4">
          Product Features
        </p>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
          Everything your gym needs to grow reliably
        </h2>
      </div>

      {/* Scroll Stack */}
      <ScrollStack className="mt-16">
        {features.map((feature, index) => (
          <ScrollStackItem key={feature.title}>
            <StarBorder>
              <SpotlightCard>
                <div
                  className={`
                    flex flex-col md:flex-row items-center
                    ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}
                  `}
                >
                  {/* TEXT */}
                  <div className="flex-1 p-6 sm:p-10 md:p-12 text-center md:text-left">
                    <PremiumTitle text={feature.title} />

                    <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-lg mx-auto md:mx-0">
                      {feature.description}
                    </p>
                  </div>

                  {/* IMAGE */}
                  <div className="flex-1 w-full">
                    <div className="relative w-full aspect-[16/10] min-h-[250px]">

                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/40 to-transparent z-10" />

                      <Image
                        src={feature.image}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        alt={feature.title}
                        className="object-cover rounded-2xl transition-transform duration-500 hover:scale-105"
                        priority={index === 0}
                      />
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </StarBorder>
          </ScrollStackItem>
        ))}
      </ScrollStack>

      {/* Animation CSS */}
      <style jsx global>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  );
}