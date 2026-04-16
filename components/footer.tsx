import Link from "next/link";
import { getWhatsAppLink, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200/80 py-8 dark:border-slate-800">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
        <div>
          <p className="text-xl font-black text-slate-900 dark:text-white">GMMX</p>
          <p className="mt-2 max-w-md text-sm text-slate-600 dark:text-slate-300">
            Gym Growth Operating System for Indian gym owners. Convert more leads, automate operations, and scale with confidence.
          </p>
        </div>

        <div className="grid gap-3 text-sm">
          <Link href="/#pricing" className="text-slate-700 hover:text-rose-500 dark:text-slate-300">Pricing</Link>
          <Link href="/makesite" className="text-slate-700 hover:text-rose-500 dark:text-slate-300">Own website</Link>
          <a href={getWhatsAppLink("Hi GMMX team, I need help choosing a plan.")} target="_blank" rel="noreferrer" className="text-slate-700 hover:text-rose-500 dark:text-slate-300">
            WhatsApp inquiry
          </a>
          <a href={`tel:${siteConfig.phone}`} className="text-slate-700 hover:text-rose-500 dark:text-slate-300">Call sales: {siteConfig.phone}</a>
          <p className="text-xs text-slate-500 dark:text-slate-400">© {new Date().getFullYear()} GMMX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
