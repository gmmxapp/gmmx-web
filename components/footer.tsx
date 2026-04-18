"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getWhatsAppLink, siteConfig } from "@/lib/site";

/* ===============================
   🔹 DOT GRID (NO GSAP)
================================ */
function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 300;
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMove);

    let raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gap = 28;

      for (let y = 0; y < canvas.height; y += gap) {
        for (let x = 0; x < canvas.width; x += gap) {
          const dx = mouse.current.x - x;
          const dy = mouse.current.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const opacity = Math.max(0.1, 1 - dist / 200);

          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,92,115,${opacity * 0.5})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

/* ===============================
   🔹 FOOTER
================================ */
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#05050A] pt-24 pb-12 border-t border-white/10">

      {/* DOT GRID */}
      <div className="absolute inset-0 z-0 opacity-40">
        <DotGrid />
      </div>

      {/* TOP GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-2/3 bg-gradient-to-r from-transparent via-[#FF5C73]/70 to-transparent z-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        <div className="grid gap-16 lg:grid-cols-12">

          {/* LEFT (BRANDING) */}
          <div className="lg:col-span-4 flex flex-col items-center md:items-start">
            <div className="flex items-center gap-4 group">
              <div className="relative h-14 w-14 rounded-2xl bg-white/5 border border-white/10 group-hover:border-[#FF5C73]/50 transition-colors backdrop-blur-xl flex items-center justify-center shadow-[0_0_30px_rgba(255,92,115,0.1)] group-hover:shadow-[0_0_40px_rgba(255,92,115,0.3)]">
                <Image
                  src="/logo-trans.png"
                  alt="GMMX logo"
                  fill
                  className="object-contain p-2"
                />
              </div>

              <div>
                <span className="text-xl font-bold tracking-tight text-white">GMMX</span>
                <div className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#FF5C73]">
                  Gym Management
                </div>
              </div>
            </div>

            <p className="mt-8 text-sm leading-relaxed text-slate-400 text-center md:text-left max-w-sm">
              The modern operating system for Indian gym owners. Convert leads, automate operations, and scale your fitness business with absolute clarity.
            </p>
          </div>

          {/* RIGHT (LINKS) */}
          <div className="grid grid-cols-2 gap-10 lg:col-span-8 lg:grid-cols-4 lg:pl-10">
            {/* Product */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white">Product</h3>
              <ul className="mt-6 space-y-4 text-sm text-slate-400">
                <li><Link href="/#features" className="transition-colors hover:text-[#FF5C73]">Features</Link></li>
                <li><Link href="/makesite" className="transition-colors hover:text-[#FF5C73]">Microsites</Link></li>
                <li><Link href="/#pricing" className="transition-colors hover:text-[#FF5C73]">Pricing</Link></li>
                <li><Link href="#" className="transition-colors hover:text-[#FF5C73]">Autopilot</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white">Resources</h3>
              <ul className="mt-6 space-y-4 text-sm text-slate-400">
                <li><Link href="#" className="transition-colors hover:text-[#FF5C73]">Help Center</Link></li>
                <li><Link href="#" className="transition-colors hover:text-[#FF5C73]">Success Stories</Link></li>
                <li><Link href="#" className="transition-colors hover:text-[#FF5C73]">Blog</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white">Contact</h3>
              <ul className="mt-6 space-y-4 text-sm text-slate-400">
                <li>
                  <a href={getWhatsAppLink("Hi GMMX team, I need help choosing a plan.")} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#FF5C73]">
                    WhatsApp Sales
                  </a>
                </li>
                <li>
                  <a href={`tel:${siteConfig.phone}`} className="transition-colors hover:text-[#FF5C73]">
                    {siteConfig.phone}
                  </a>
                </li>
                <li>
                  <a href="mailto:support@gmmx.app" className="transition-colors hover:text-[#FF5C73]">
                    support@gmmx.app
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white">Legal</h3>
              <ul className="mt-6 space-y-4 text-sm text-slate-400">
                <li><Link href="#" className="transition-colors hover:text-[#FF5C73]">Privacy Policy</Link></li>
                <li><Link href="#" className="transition-colors hover:text-[#FF5C73]">Terms of Service</Link></li>
                <li><Link href="#" className="transition-colors hover:text-[#FF5C73]">Refund Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-20 flex flex-col items-center justify-between border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm font-medium text-slate-500">
            © {new Date().getFullYear()} GMMX Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}