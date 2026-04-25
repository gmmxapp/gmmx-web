"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/#features", label: "Features" },
  { href: "/makesite", label: "Microsites" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-transparent bg-[#05050A]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="Gmmx Home">
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
            <span className="text-2xl font-extrabold leading-none tracking-tighter text-white sm:text-[1.75rem]">Gmmx</span>
            <span className="mt-1 text-[0.55rem] font-bold uppercase tracking-[0.2em] text-[#FF5C73]">Gym Management System</span>
          </div>
        </Link>

        {/* Center: Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 shrink-0">
          <Link
            href="/login"
            className="hidden text-sm font-semibold text-slate-300 transition-colors hover:text-white md:block"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="hidden md:flex rounded-lg bg-[#FF5C73] px-5 py-2.5 text-sm font-bold tracking-wide text-white transition-all hover:opacity-90 hover:shadow-[0_0_20px_rgba(255,92,115,0.4)]"
          >
            Start free
          </Link>
          
          {/* Hamburger Menu Toggle (Mobile Only) */}
          <button 
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-white/5 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Sheet */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/5 bg-[#030816] px-4 py-4">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-white"
              >
                {item.label}
              </Link>
            ))}
            <div className="h-px bg-white/10 my-2" />
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-white"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 block w-full rounded-lg bg-[#FF5C73] px-4 py-3 text-center font-bold tracking-wide text-white"
            >
              Start free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
