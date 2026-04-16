import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white pt-32 pb-20 dark:bg-[#05050A] flex flex-col items-center justify-center transition-colors">
      
      {/* CSS Animation specifically for the glowing grid */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gridForward {
          0% { background-position: 0 0; }
          100% { background-position: 0 4rem; }
        }
        .animate-grid-flow {
          animation: gridForward 2s linear infinite;
        }
      `}} />

      {/* Animated Background Perspective Grid */}
      <div className="absolute inset-x-0 bottom-0 h-[60vh] origin-bottom [transform:perspective(1000px)_rotateX(60deg)_scale(2)]">
        <div className="absolute inset-x-0 bottom-0 h-full w-full opacity-60">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:4rem_4rem] animate-grid-flow [mask-image:linear-gradient(to_bottom,transparent_10%,black_80%)]" />
        </div>
      </div>

      {/* Bottom Horizon Glow Behind Image */}
      <div className="absolute bottom-0 left-1/2 w-[80vw] h-[350px] -translate-x-1/2 translate-y-1/3 bg-fuchsia-600/40 opacity-80 blur-[130px] pointer-events-none rounded-[100%]" />

      {/* Main text content */}
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center px-4 sm:px-6">
        
        <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-[5.5rem]">
          New Era of Gym OS
        </h1>
        
        <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-slate-300 sm:text-xl">
          Automated WhatsApp reminders, rapid QR check-ins, scalable pipelines. 
          Let our intelligent operating system do the heavy lifting for your fitness business.
        </p>

        <div className="mt-10">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-6 py-3 text-sm font-semibold tracking-wide text-white transition-all hover:bg-white/10 hover:border-white/30 hover:scale-105"
          >
            Start Free Trial for 14 days
          </Link>
        </div>
      </div>

      {/* Dashboard Image resting precisely on the Grid/Glow */}
      <div className="relative z-20 mt-16 w-full max-w-[1000px] px-4 sm:px-6">
        <div className="rounded-t-[2.5rem] border border-white/15 border-b-0 bg-[#09090E]/60 p-2 shadow-[0_-20px_50px_rgba(192,38,211,0.1)] backdrop-blur-3xl">
          <div className="overflow-hidden rounded-t-[2rem] bg-black">
            <Image
              src="/right-side.png"
              alt="GMMX Gym Growth OS dashboard preview"
              width={1400}
              height={900}
              sizes="(max-width: 1000px) 100vw, 1000px"
              className="h-auto w-full object-cover opacity-90"
              priority
            />
          </div>
        </div>
        
        {/* Bottom solid glow anchor mimicking the Wope base border */}
        <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent opacity-60" />
      </div>

    </section>
  );
}
