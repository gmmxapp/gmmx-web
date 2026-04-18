"use client";

import Link from "next/link";
import TiltedCard from "./tilted-card";
import { getWhatsAppLink } from "@/lib/site";

export function MobileAppSection() {
  return (
    <section className="scroll-mt-24">
      {/* Centered Heading */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-16">
        <p className="text-[#FF5C73] font-bold tracking-widest text-sm uppercase mb-4">GMMX Mobile App</p>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
          Owner + trainer + member experience in your pocket
        </h2>
        <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
          Real-time attendance, dashboard visibility, reminders, and member progression tracking with role-based access.
        </p>
      </div>

      {/* Content Grid */}
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 rounded-[2.5rem] border border-white/10 bg-white/5 p-8 md:p-12 lg:grid-cols-2 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col justify-center order-2 lg:order-1 text-center lg:text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Manage your gym on the go</h3>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed max-w-md mx-auto lg:mx-0">
              Stop being tied to your desk. With the GMMX Mobile App, you can approve leaves, check daily revenue, and nudge pending payments while on the move.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link
                href="/#pricing"
                className="inline-flex items-center justify-center rounded-xl bg-[#FF5C73] px-8 py-4 text-sm font-black tracking-wide text-white transition-all hover:opacity-90 hover:shadow-[0_0_30px_rgba(255,92,115,0.4)] hover:-translate-y-1"
              >
                View Pricing
              </Link>
              <a
                href={getWhatsAppLink("Hi GMMX team, I need a mobile app demo.")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-sm font-black tracking-wide text-white transition-all hover:bg-white/10 hover:-translate-y-1"
              >
                Book Demo
              </a>
            </div>
          </div>
          
          <div className="flex items-center justify-center order-1 lg:order-2">
            <TiltedCard
              imageSrc="/mobile-app-preview.svg"
              altText="GMMX mobile app preview — attendance, dashboard, member tracking"
              captionText="Gmmx Mobile App"
              containerHeight="420px"
              containerWidth="100%"
              imageHeight="400px"
              imageWidth="100%"
              scaleOnHover={1.08}
              rotateAmplitude={12}
              showMobileWarning={false}
              showTooltip={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
