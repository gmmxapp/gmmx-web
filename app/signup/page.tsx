"use client";

import { FormEvent, useEffect, useState } from "react";
import { registerOwner, RegisterOwnerResponse } from "@/lib/api";
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";
import { auth } from "@/lib/firebase";

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier | undefined;
  }
}

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<RegisterOwnerResponse | null>(null);
  
  // Phase toggles
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [otp, setOtp] = useState("");

  const [gymName, setGymName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);

  const inputClassName =
    "mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white backdrop-blur-md outline-none transition placeholder:text-slate-500 focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20";

  function toSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 30);
  }

  // Set up recaptcha
  useEffect(() => {
    if (!auth) {
      console.warn("Firebase Auth bypassed due to missing config.");
      return;
    }
    if (typeof window !== "undefined" && !window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: () => {
          // reCAPTCHA solved
        }
      });
    }
  }, []);

  async function handleSendOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (!auth) {
      setError("Firebase Authentication is missing API keys in this environment.");
      setLoading(false);
      return;
    }

    const form = new FormData(event.currentTarget);
    const mobile = String(form.get("mobile") ?? "");
    
    // Convert to E.164 format (assuming India +91)
    const phoneNumber = mobile.startsWith("+") ? mobile : `+91${mobile}`;

    try {
      if (!window.recaptchaVerifier) throw new Error("Recaptcha not initialized. Please refresh.");
      
      const confResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
      setConfirmationResult(confResult);
      setIsOtpSent(true);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : "Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyAndSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!confirmationResult) throw new Error("Please request an OTP first.");
      
      // Verify OTP via Firebase
      await confirmationResult.confirm(otp);

      // OTP Verified. Proceed to register the owner.
      const form = new FormData(event.currentTarget);
      const payload = {
        ownerName: String(form.get("ownerName") ?? ""),
        mobile: String(form.get("mobile") ?? ""),
        email: String(form.get("email") ?? ""),
        gymName: String(form.get("gymName") ?? "").trim(),
        location: String(form.get("location") ?? ""),
        slug: String(form.get("slug") ?? "").trim(),
        password: String(form.get("password") ?? "")
      };

      const data = await registerOwner(payload);
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Verification or signup failed. Check OTP.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <section className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-start">
        <aside className="rounded-[2.5rem] border border-white/5 bg-[#030816] p-10 text-white shadow-[0_0_50px_rgba(255,92,115,0.1)] backdrop-blur-2xl ring-1 ring-white/10">
          <p className="inline-flex rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-rose-400">
            Secure Setup
          </p>
          <h1 className="mt-6 text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl">Launch your workspace.</h1>
          <p className="mt-4 text-base leading-relaxed text-slate-300">
            Create your gym, verify your phone, and secure your <span className="font-bold text-white">.gmmx.app</span> subdomain instantly.
          </p>

          <ul className="mt-10 space-y-4 text-sm text-slate-300">
            <li className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/5 px-5 py-4 backdrop-blur-md">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500/20 text-rose-400 text-lg">💬</span>
              WhatsApp pipeline ready day one
            </li>
            <li className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/5 px-5 py-4 backdrop-blur-md">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 text-lg">🌐</span>
              Auto-generated gym microsite
            </li>
            <li className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/5 px-5 py-4 backdrop-blur-md">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-lg">📱</span>
              OTP Secured Verification
            </li>
          </ul>
        </aside>

        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0A101F] p-8 shadow-2xl sm:p-10">
          <div id="recaptcha-container"></div>
          
          <form className="grid gap-6" onSubmit={isOtpSent ? handleVerifyAndSubmit : handleSendOtp} id="signupForm">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-semibold tracking-wide text-slate-300">
                Owner Name
                <input className={inputClassName} name="ownerName" placeholder="Nitheesh Kumar" required disabled={isOtpSent} />
              </label>
              <label className="text-sm font-semibold tracking-wide text-slate-300">
                Mobile (10 digits)
                <input className={inputClassName} name="mobile" inputMode="numeric" pattern="[0-9]{10}" placeholder="9876543210" required disabled={isOtpSent} />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-semibold tracking-wide text-slate-300">
                Gym Name
                <input
                  className={inputClassName}
                  name="gymName"
                  value={gymName}
                  onChange={(event) => {
                    const nextGymName = event.target.value;
                    setGymName(nextGymName);
                    if (!slugTouched) {
                      setSlug(toSlug(nextGymName));
                    }
                  }}
                  placeholder="GX Fitness Studio"
                  required
                  disabled={isOtpSent}
                />
              </label>
              <label className="text-sm font-semibold tracking-wide text-slate-300">
                Email
                <input className={inputClassName} name="email" type="email" placeholder="owner@gxfitness.com" required disabled={isOtpSent} />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-semibold tracking-wide text-slate-300">
                Location
                <input className={inputClassName} name="location" placeholder="Coimbatore" required disabled={isOtpSent} />
              </label>
              <label className="text-sm font-semibold tracking-wide text-slate-300">
                Gym Slug
                <input
                  className={inputClassName}
                  name="slug"
                  pattern="[a-z0-9-]{3,30}"
                  value={slug}
                  onChange={(event) => {
                    setSlugTouched(true);
                    setSlug(toSlug(event.target.value));
                  }}
                  placeholder="gx-fitness"
                  required
                  disabled={isOtpSent}
                />
                <span className="mt-2 block text-xs font-medium text-slate-500">Live preview: <span className="text-rose-400">{slug || "your-gym-name"}.gmmx.app</span></span>
              </label>
            </div>

            <label className="text-sm font-semibold tracking-wide text-slate-300">
              Password
              <input className={inputClassName} name="password" type="password" minLength={6} placeholder="Secure administrator password" required disabled={isOtpSent} />
            </label>

            {isOtpSent && !result && (
              <div className="mt-4 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-5 backdrop-blur-md">
                <label className="text-sm font-semibold tracking-wide text-rose-300">
                  Enter 6-digit OTP sent to your phone
                  <input
                    className={`${inputClassName} !border-rose-500/50 !bg-white/10`}
                    name="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="123456"
                    required
                    maxLength={6}
                    pattern="[0-9]{6}"
                    autoFocus
                  />
                </label>
              </div>
            )}

            {!result && (
              <button
                className="mt-4 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 px-6 py-4 text-base font-black text-white shadow-[0_0_20px_rgba(255,92,115,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,92,115,0.5)] disabled:cursor-not-allowed disabled:opacity-50"
                type="submit"
                disabled={loading}
              >
                {loading ? "Processing..." : isOtpSent ? "Verify & Create Gym" : "Send Global OTP"}
              </button>
            )}
          </form>

          {error ? (
            <p className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm font-medium text-red-400">
              {error}
            </p>
          ) : null}

          {result ? (
            <section className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center backdrop-blur-md shadow-[0_0_30px_rgba(16,185,129,0.1)]">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-3xl mb-4">
                ✓
              </div>
              <h2 className="text-2xl font-black text-emerald-400">Workspace Live</h2>
              <p className="mt-2 text-slate-300">Your domain <strong className="text-white">{result.slug}.gmmx.app</strong> is ready.</p>
              
              <a
                className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-emerald-500 px-6 py-4 text-sm font-black text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all hover:scale-105"
                href={`/${result.slug}/dashboard`}
              >
                Enter Administrator Dashboard
              </a>
            </section>
          ) : null}
        </div>
      </section>
    </main>
  );
}
