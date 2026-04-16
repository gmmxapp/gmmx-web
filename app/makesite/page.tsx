import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { formatInr, websitePlan } from "@/lib/plans";
import { getWhatsAppLink } from "@/lib/site";

export const metadata = {
  title: "Own Website"
};

const launchSteps = [
  {
    title: "Brand intake",
    detail: "Share your gym name, logo, photos, branch location, and WhatsApp number."
  },
  {
    title: "Auto site generation",
    detail: "We generate your microsite structure, sections, and lead CTAs in one workflow."
  },
  {
    title: "Go live",
    detail: "Your site is published as your-gym-name.gmmx.app with analytics and lead tracking."
  }
];

export default function MakeSitePage() {
  return (
    <main>
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#071225] p-8 shadow-[0_32px_90px_-50px_rgba(7,18,37,0.9)] sm:p-10 lg:p-12">
          <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
            Own Website
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black text-white md:text-5xl">
            White-label gym website in days, not months.
          </h1>
          <p className="mt-4 max-w-3xl text-slate-200">
            GMMX auto-generates your branded website and deploys it as
            <span className="mx-1 font-bold text-white">your-gym-name.gmmx.app</span>
            so you can capture leads and convert trial traffic faster.
          </p>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {launchSteps.map((step) => (
              <article key={step.title} className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm font-bold text-white">{step.title}</p>
                <p className="mt-2 text-sm text-slate-200">{step.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 grid items-center gap-8 rounded-3xl border border-slate-200 bg-white/85 p-6 dark:border-slate-700 dark:bg-slate-900/70 lg:grid-cols-2">
          <div>
            <p className="section-kicker">Sample Microsite</p>
            <h2 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">Built for local gym lead conversion</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Your website includes plans, trainers, gallery, testimonials, map, and WhatsApp CTAs.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 p-3 dark:border-slate-700">
            <Image
              src="/microsite-preview.svg"
              width={980}
              height={560}
              alt="GMMX white-label microsite sample"
              className="h-auto w-full rounded-xl"
              priority
            />
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-slate-200 bg-white/85 p-6 dark:border-slate-700 dark:bg-slate-900/70 sm:p-8">
          <p className="section-kicker">Website Pricing</p>
          <h2 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">Transparent package pricing</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950">
              <p className="text-sm text-slate-500 dark:text-slate-400">One-time setup</p>
              <p className="mt-2 text-4xl font-black text-slate-900 dark:text-white">{formatInr(websitePlan.amountInPaise)}</p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950">
              <p className="text-sm text-slate-500 dark:text-slate-400">Hosting + maintenance</p>
              <p className="mt-2 text-4xl font-black text-slate-900 dark:text-white">
                {formatInr(websitePlan.recurringAmountInPaise ?? 0)}
                <span className="text-lg font-semibold text-slate-500 dark:text-slate-400"> / month</span>
              </p>
            </article>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={getWhatsAppLink("Hi GMMX, I want a white-label site at your-gym-name.gmmx.app")}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              Talk to GMMX team
            </a>
            <Link href="/signup" className="btn-outline">Start free first</Link>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
