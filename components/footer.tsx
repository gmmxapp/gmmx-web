import Link from "next/link";
import { getWhatsAppLink, siteConfig } from "@/lib/site";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white pt-16 pb-8 dark:border-white/5 dark:bg-[#030816]">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-14 w-14 overflow-hidden">
                <Image
                  src="/logo-trans.png"
                  alt="Gmmx logo"
                  fill
                  sizes="56px"
                  className="object-contain scale-[1.7]"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-2xl font-extrabold leading-none tracking-tighter text-slate-900 dark:text-white sm:text-[1.75rem]">Gmmx</span>
                <span className="mt-1 text-[0.55rem] font-bold uppercase tracking-[0.2em] text-[#FF5C73]">Gym Management System</span>
              </div>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              The modern operating system for Indian gym owners. Convert leads, automate operations, and scale with absolute clarity.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">Product</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <li><Link href="/#features" className="transition-colors hover:text-slate-900 dark:hover:text-white">Features</Link></li>
              <li><Link href="/makesite" className="transition-colors hover:text-slate-900 dark:hover:text-white">Microsites</Link></li>
              <li><Link href="/#pricing" className="transition-colors hover:text-slate-900 dark:hover:text-white">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <a href={getWhatsAppLink("Hi GMMX team, I need help choosing a plan.")} target="_blank" rel="noreferrer" className="transition-colors hover:text-slate-900 dark:hover:text-white">
                  WhatsApp Sales
                </a>
              </li>
              <li>
                <a href={`tel:${siteConfig.phone}`} className="transition-colors hover:text-slate-900 dark:hover:text-white">
                  Call: {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href="mailto:support@gmmx.app" className="transition-colors hover:text-slate-900 dark:hover:text-white">
                  Email Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between border-t border-slate-200 pt-8 dark:border-white/5 sm:flex-row">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} GMMX Technologies. All rights reserved.
          </p>
          <div className="mt-4 flex gap-6 sm:mt-0">
            <Link href="#" className="text-sm text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-white">Privacy Policy</Link>
            <Link href="#" className="text-sm text-slate-500 transition-colors hover:text-slate-900 dark:hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
