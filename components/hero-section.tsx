import Image from "next/image";
import Link from "next/link";
import RotatingText from "./rotating-text";
import ShapeGrid from "./shape-grid";
import StarBorder from "./star-border";

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-transparent pt-32 pb-20 flex flex-col items-center justify-center">
      
      {/* Dynamic ReactBits ShapeGrid Background */}
      <div 
        className="absolute inset-0 pointer-events-auto"
        style={{
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 100%)"
        }}
      >
        {/* We need pointer events auto on the wrapper so mouse interaction works for hovering */}
        <ShapeGrid
          shape="square"
          squareSize={48}
          direction="diagonal"
          speed={0.5}
          borderColor="rgba(150, 150, 150, 0.15)"
          hoverFillColor="rgba(255, 92, 115, 0.15)"
          hoverTrailAmount={5}
        />
      </div>

      {/* Deep Center Horizon Glow */}
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF5C73]/5 opacity-60 blur-[130px] pointer-events-none" />

      {/* Main text content */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center px-4 sm:px-6">

        <h1 className="flex flex-col sm:flex-row items-center justify-center gap-3 text-3xl font-extrabold leading-normal tracking-tighter text-slate-900 dark:text-white sm:text-5xl lg:text-[4rem] sm:gap-4">
          <span className="whitespace-nowrap">Run Your Gym With</span>
          <RotatingText
            texts={[
              "Autopilot",
              "QR Check-ins",
              "98% Retention",
              "Microsites"
            ]}
            mainClassName="inline-flex justify-center items-center h-[60px] sm:h-[80px] lg:h-[95px] overflow-hidden rounded-2xl bg-[#FF5C73] px-4 sm:px-6 py-0 text-white shadow-[0_0_30px_rgba(255,92,115,0.4)] whitespace-nowrap"
            staggerFrom="first"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            staggerDuration={0.06}
            splitLevelClassName="overflow-hidden pb-1 whitespace-nowrap flex"
            transition={{ type: "tween", duration: 0.01 }}
            rotationInterval={4500}
          />
        </h1>

        <p className="mt-2 max-w-3xl text-lg font-medium leading-relaxed text-slate-600 dark:text-slate-300 sm:text-xl">
          Automate QR check-ins, WhatsApp renewals, trainer workflows, member apps, and gym microsites — all from one powerful operating system.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <StarBorder 
            as={Link} 
            href="/signup" 
            color="white" 
            speed="4s"
            className="hover:scale-105 transition-transform"
          >
            Start 14-Day Free Trial
          </StarBorder>
          <a
            href="#demo"
            className="inline-flex items-center justify-center rounded-[20px] border border-slate-200 bg-white px-10 py-5 text-[16px] font-bold tracking-wide text-slate-800 transition-all hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            <span className="mr-2 text-lg">▶</span> Watch Demo
          </a>
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
