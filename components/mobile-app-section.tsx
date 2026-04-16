"use client";

import Link from "next/link";
import TiltedCard from "./tilted-card";
import { getWhatsAppLink } from "@/lib/site";

export function MobileAppSection() {
  return (
    <section className="mt-16 grid items-center gap-8 rounded-3xl border border-white/5 bg-white/5 p-8 lg:grid-cols-2">
      <div>
        <p className="text-[#FF5C73] font-bold tracking-widest text-xs uppercase mb-1">Mobile App Preview</p>
        <h2 className="mt-2 text-3xl font-black text-white">
          Owner + trainer + member experience in your pocket
        </h2>
        <p className="mt-3 text-slate-300">
          Real-time attendance, dashboard visibility, reminders, and member progression tracking with role-based access.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/#pricing"
            className="inline-flex items-center justify-center rounded-lg bg-[#FF5C73] px-6 py-3 text-sm font-bold tracking-wide text-white transition-all hover:opacity-90 hover:shadow-[0_0_20px_rgba(255,92,115,0.4)]"
          >
            View Pricing
          </Link>
          <a
            href={getWhatsAppLink("Hi GMMX team, I need a mobile app demo.")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold tracking-wide text-white transition-all hover:bg-white/10"
          >
            Book demo
          </a>
        </div>
      </div>
      <div className="flex items-center justify-center">
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
    </section>
  );
}
