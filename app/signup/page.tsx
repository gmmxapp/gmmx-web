"use client";

import { FormEvent, useState } from "react";
import { registerOwner, RegisterOwnerResponse } from "@/lib/api";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<RegisterOwnerResponse | null>(null);
  const [gymName, setGymName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);

  const inputClassName =
    "mt-2 w-full rounded-xl border border-slate-300 bg-white/90 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-rose-400 focus:ring-2 focus:ring-rose-300/40 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-100 dark:focus:border-rose-400";

  function toSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 30);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

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

    try {
      const data = await registerOwner(payload);
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-start">
        <aside className="rounded-3xl border border-white/10 bg-[#071225] p-7 text-white shadow-2xl shadow-black/30">
          <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
            Owner Onboarding
          </p>
          <h1 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">Launch your gym workspace in one flow.</h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-200/90 sm:text-base">
            Create your gym, secure your subdomain, and start your 14-day free trial with complete access.
          </p>

          <ul className="mt-8 space-y-3 text-sm text-white/90">
            <li className="rounded-xl border border-white/15 bg-white/10 px-4 py-3">WhatsApp reminders and attendance ready from day one</li>
            <li className="rounded-xl border border-white/15 bg-white/10 px-4 py-3">Auto-generated workspace: your-gym-name.gmmx.app</li>
            <li className="rounded-xl border border-white/15 bg-white/10 px-4 py-3">No setup calls needed to get started</li>
          </ul>
        </aside>

        <div className="rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900/70 sm:p-8">
          <form className="grid gap-5" onSubmit={onSubmit}>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Owner Name
                <input className={inputClassName} name="ownerName" placeholder="Nitheesh Kumar" required />
              </label>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Mobile (10 digits)
                <input className={inputClassName} name="mobile" inputMode="numeric" pattern="[0-9]{10}" placeholder="9876543210" required />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
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
                />
              </label>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Email
                <input className={inputClassName} name="email" type="email" placeholder="owner@gxfitness.com" required />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Location
                <input className={inputClassName} name="location" placeholder="Coimbatore" required />
              </label>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
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
                />
                <span className="mt-2 block text-xs font-medium text-slate-500 dark:text-slate-400">Preview: {slug || "your-gym-name"}.gmmx.app</span>
              </label>
            </div>

            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Password
              <input className={inputClassName} name="password" type="password" minLength={6} placeholder="At least 6 characters" required />
            </label>

            <button
              className="inline-flex items-center justify-center rounded-xl bg-[#FF5C73] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#FF5C73]/30 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              type="submit"
              disabled={loading}
            >
              {loading ? "Creating your workspace..." : "Create Gym"}
            </button>
          </form>

          {error ? (
            <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300">
              {error}
            </p>
          ) : null}

          {result ? (
            <section className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900/50 dark:bg-emerald-950/30">
              <h2 className="text-lg font-black text-emerald-800 dark:text-emerald-300">Workspace created</h2>
              <p className="mt-2 text-sm text-emerald-700 dark:text-emerald-300">Tenant: {result.slug}.gmmx.app</p>
              <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-300">Trial ends: {new Date(result.trialEndsAt).toLocaleString()}</p>
              <a
                className="mt-4 inline-flex items-center justify-center rounded-xl border border-emerald-300 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:-translate-y-0.5 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                href={`/${result.slug}/dashboard`}
              >
                Go to Dashboard
              </a>
            </section>
          ) : null}
        </div>
      </section>
    </main>
  );
}
