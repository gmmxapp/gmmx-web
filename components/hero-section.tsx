import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#071225] px-6 py-12 shadow-[0_40px_120px_-60px_rgba(7,18,37,0.9)] sm:px-10 lg:px-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(120% 70% at 20% 0%, rgba(59, 130, 246, 0.22), transparent 60%), radial-gradient(120% 60% at 80% 20%, rgba(255, 92, 115, 0.28), transparent 60%)"
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-10 top-10 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "90px 90px",
          maskImage: "radial-gradient(120% 80% at 50% 0%, #000 0%, transparent 70%)"
        }}
      />
      <div aria-hidden className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-[#FF5C73]/40 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-blue-500/30 blur-[140px]" />

      <div className="relative z-10 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
            India-First Gym SaaS
          </p>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Run your gym like a modern business.
          </h1>
          <p className="mt-4 max-w-xl text-base text-slate-200/90 sm:text-lg">
            Automate attendance, WhatsApp reminders, trainer workflows, fee collection, and launch
            your white-label gym website from one platform built for Indian gyms.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-xl bg-[#FF5C73] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#FF5C73]/30 transition hover:-translate-y-0.5"
            >
              Start 14-Day Free Trial
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white/90 transition hover:-translate-y-0.5 hover:border-[#FF5C73]"
            >
              Book Demo
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">Daily check-ins</p>
              <p className="mt-2 text-2xl font-black text-white">2.4K+</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">Reminders per month</p>
              <p className="mt-2 text-2xl font-black text-white">98K</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">Lead response</p>
              <p className="mt-2 text-2xl font-black text-white">&lt; 3 min</p>
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div aria-hidden className="pointer-events-none absolute -right-10 top-6 h-72 w-72 rounded-full bg-[#FF5C73]/50 blur-[130px]" />
          <div aria-hidden className="pointer-events-none absolute -left-10 bottom-0 h-72 w-72 rounded-full bg-blue-500/30 blur-[140px]" />
          <div className="relative w-full max-w-[560px]">
            <div className="absolute -top-6 right-6 rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/80 shadow-lg shadow-black/40 backdrop-blur">
              Trainer tasking
            </div>
            <div className="absolute -bottom-8 left-6 rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/80 shadow-lg shadow-black/40 backdrop-blur">
              QR check-ins
            </div>
            <div className="rounded-[24px] border border-white/15 bg-white/10 p-4 shadow-2xl shadow-black/50 backdrop-blur">
              <Image
                src="/right-side.png"
                alt="GMMX Gym Growth OS dashboard preview"
                width={960}
                height={820}
                className="h-auto w-full rounded-[20px]"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-12 grid gap-4 md:grid-cols-3">
        <div className="rounded-[20px] border border-white/10 bg-white/10 p-5 shadow-lg shadow-black/30 backdrop-blur">
          <p className="text-sm font-semibold text-white">White-label microsites</p>
          <p className="mt-2 text-sm text-white/70">Launch a premium gym website with your brand, plans, and offers.</p>
        </div>
        <div className="rounded-[20px] border border-white/10 bg-white/10 p-5 shadow-lg shadow-black/30 backdrop-blur">
          <p className="text-sm font-semibold text-white">QR attendance in seconds</p>
          <p className="mt-2 text-sm text-white/70">Secure check-ins that feel effortless for members and staff.</p>
        </div>
        <div className="rounded-[20px] border border-white/10 bg-white/10 p-5 shadow-lg shadow-black/30 backdrop-blur">
          <p className="text-sm font-semibold text-white">WhatsApp fee reminders</p>
          <p className="mt-2 text-sm text-white/70">Automated nudges that boost collections without awkward calls.</p>
        </div>
      </div>
    </section>
  );
}
