import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { href: "/#features", label: "Features" },
  { href: "/makesite", label: "Own website" },
  { href: "/#clients", label: "Clients" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#071225]/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="Go to home page">
          <Image
            src="/samplelogo.jpg"
            alt="GMMX logo"
            width={40}
            height={40}
            className="h-10 w-10 rounded-xl object-cover"
          />
          <div>
            <p className="text-sm font-extrabold text-white">GMMX</p>
            <p className="text-xs text-slate-300">Gym Growth OS</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/login"
            className="hidden rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40 sm:inline-flex"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="rounded-xl bg-[#FF5C73] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#FF5C73]/30 transition hover:-translate-y-0.5"
          >
            Start free
          </Link>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-7xl gap-5 overflow-x-auto px-4 pb-3 text-sm text-slate-200 lg:hidden sm:px-6 lg:px-8">
        {navItems.map((item) => (
          <Link key={`mobile-${item.href}`} href={item.href} className="whitespace-nowrap font-medium hover:text-white">
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
