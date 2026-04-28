"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  ArrowLeft,
  Mail,
  Phone,
  Lock,
  User,
  Dumbbell,
  MapPin,
  ShieldCheck,
  Loader2,
  CheckCircle2,
  Globe,
  CreditCard,
  Sparkles,
  Smartphone,
  Zap,
  Crown,
  Rocket,
  AlertCircle,
  ShieldAlert,
  ChevronDown,
  Tag,
} from "lucide-react";
import { apiFetch } from "@/lib/api";
import StarBorder from "@/components/star-border";

declare global {
  interface Window {
    Razorpay: any;
  }
}

// ─── Step IDs ────────────────────────────────────────────────────────────────
const STEP_USER   = 1;   // Owner details + OTP verify
const STEP_SITE   = 2;   // Microsite / gym details
const STEP_PAY    = 3;   // Razorpay payment
const STEP_DONE   = 4;   // Success

// ─── Razorpay script loader ───────────────────────────────────────────────────
async function loadRazorpay(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  if (document.querySelector('script[src*="razorpay"]')) return true;
  return new Promise((resolve) => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

// ─── Step indicator ───────────────────────────────────────────────────────────
function StepDot({ n, current, label }: { n: number; current: number; label: string }) {
  const done    = current > n;
  const active  = current === n;
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`h-9 w-9 rounded-full flex items-center justify-center font-black text-sm transition-all duration-300 ${
          done   ? "bg-emerald-500 text-white shadow-[0_0_16px_rgba(16,185,129,0.4)]" :
          active ? "bg-[#FF5C73] text-white shadow-[0_0_16px_rgba(255,92,115,0.4)]" :
                   "bg-white/5 border border-white/10 text-slate-500"
        }`}
      >
        {done ? <CheckCircle2 size={18} /> : n}
      </div>
      <span className={`text-[10px] font-bold uppercase tracking-wider hidden sm:block ${active ? "text-[#FF5C73]" : done ? "text-emerald-400" : "text-slate-600"}`}>
        {label}
      </span>
    </div>
  );
}

function StepBar({ current }: { current: number }) {
  const steps = [
    { n: STEP_USER, label: "You" },
    { n: STEP_SITE, label: "Microsite" },
    { n: STEP_PAY,  label: "Payment" },
  ];
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      {steps.map((s, i) => (
        <div key={s.n} className="flex items-center gap-3">
          <StepDot {...s} current={current} />
          {i < steps.length - 1 && (
            <div className={`h-px w-10 sm:w-16 transition-colors duration-300 ${current > s.n ? "bg-emerald-500/50" : "bg-white/10"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Field wrapper ────────────────────────────────────────────────────────────
function Field({ label, icon: Icon, children }: { label: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">{label}</label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={17} />
        {children}
      </div>
    </div>
  );
}

const inputCls = "w-full bg-slate-900/50 border border-white/5 rounded-2xl pl-11 pr-4 py-3.5 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-[#FF5C73]/20 transition-all outline-none";

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function SignupPage() {
  const router = useRouter();

  const [step, setStep]   = useState(STEP_USER);
  const [error, setError] = useState<string | null>(null);

  // ── Step 1 state ──────────────────────────────────────────────────────────
  const [user, setUser] = useState({ ownerName: "", email: "", mobile: "", pin: "" });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [sentIdentifier, setSentIdentifier] = useState<string | null>(null);
  const [showOtpModal, setShowOtpModal] = useState(false);

  // ── Step 2 state ──────────────────────────────────────────────────────────
  const [site, setSite] = useState({ gymName: "", username: "", location: "", about: "", theme: "dark-forge", wantMicrosite: true });
  const [usernameEdited,    setUsernameEdited]    = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [checkingSlug,      setCheckingSlug]      = useState(false);
  const [locating, setLocating] = useState(false);

  // ── Step 3 state ──────────────────────────────────────────────────────────
  const [selectedPlan, setSelectedPlan] = useState<string>("plan-growth-monthly");
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const [paying,       setPaying]       = useState(false);
  const [registering,  setRegistering]  = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponStatus, setCouponStatus] = useState<{ valid: boolean; message: string } | null>(null);

  // Load session state on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const savedOtpSent = sessionStorage.getItem("otpSent") === "true";
    const savedIdentifier = sessionStorage.getItem("sentIdentifier");
    const savedVerified = sessionStorage.getItem("verified") === "true";
    const savedUser = sessionStorage.getItem("signup_user");
    const savedSite = sessionStorage.getItem("signup_site");

    if (savedOtpSent) setOtpSent(true);
    if (savedIdentifier) setSentIdentifier(savedIdentifier);
    if (savedVerified) setVerified(true);
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedSite) setSite(JSON.parse(savedSite));
  }, []);

  // Save state to session whenever it changes
  useEffect(() => {
    sessionStorage.setItem("otpSent", otpSent.toString());
    if (sentIdentifier) sessionStorage.setItem("sentIdentifier", sentIdentifier);
    sessionStorage.setItem("verified", verified.toString());
    sessionStorage.setItem("signup_user", JSON.stringify(user));
    sessionStorage.setItem("signup_site", JSON.stringify(site));
  }, [otpSent, sentIdentifier, verified, user, site]);

  // Check if already logged in
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token && token !== "undefined" && token !== "null") {
      const isDev = window.location.hostname === 'localhost';
      const targetHost = isDev ? window.location.host : 'dashboard.gmmx.app';
      // If we had the slug stored, we would use it here. 
      // For now, redirecting to the generic login if we can't determine the slug.
      window.location.href = `${window.location.protocol}//${targetHost}/login`;
    }
  }, []);

  // Auto-generate username from gym name
  useEffect(() => {
    if (usernameEdited || !site.gymName) return;
    const slug = site.gymName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    setSite(p => ({ ...p, username: slug }));
  }, [site.gymName, usernameEdited]);

  const checkEmailAvailability = async () => {
    if (!user.email || !user.email.includes("@")) { 
      setEmailAvailable(null); 
      return; 
    }
    setCheckingEmail(true);
    try {
      const r = await apiFetch<{ success: boolean; data: boolean }>(`/api/auth/check-email?email=${encodeURIComponent(user.email)}`);
      setEmailAvailable(r.data);
    } catch { 
      setEmailAvailable(null); 
    } finally { 
      setCheckingEmail(false); 
    }
  };

  // Debounced slug availability check
  useEffect(() => {
    if (!site.username || site.username.length < 3) { setUsernameAvailable(null); return; }
    const t = setTimeout(async () => {
      setCheckingSlug(true);
      try {
        // Use check-slug instead of lookup to avoid 400 error in console when not found
        const r = await apiFetch<{ success: boolean; data: boolean }>(`/api/tenants/check-slug/${site.username}`);
        setUsernameAvailable(r.data); // data=true means available
      } catch {
        setUsernameAvailable(null);
      }
      finally { setCheckingSlug(false); }
    }, 500);
    return () => clearTimeout(t);
  }, [site.username]);

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "ownerName") {
      // Prevent numbers in name
      if (/\d/.test(e.target.value)) return;
    }
    if (e.target.name === "email") {
      setEmailAvailable(null);
    }
    setUser(p => ({ ...p, [e.target.name]: e.target.value }));
    setError(null);
  };
  const handleSiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "username") setUsernameEdited(true);
    setSite(p => ({ ...p, [e.target.name]: e.target.value }));
    setError(null);
  };

  const fetchLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Using Nominatim for free reverse geocoding
          // Using internal proxy for Nominatim to avoid CORS
          const res = await fetch(`/api/location/reverse?lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          
          // Try to get a concise address (City, State)
          const addr = data.address;
          const locationString = addr ? 
            [addr.suburb, addr.city || addr.town || addr.village, addr.state].filter(Boolean).join(", ") :
            data.display_name || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
          
          setSite(p => ({ ...p, location: locationString }));
        } catch (err) {
          setSite(p => ({ ...p, location: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}` }));
        } finally {
          setLocating(false);
        }
      },
      (err) => {
        setError("Location permission denied or unavailable");
        setLocating(false);
      },
      { timeout: 10000 }
    );
  };

  // ── OTP send ──────────────────────────────────────────────────────────────
  const sendOtp = async () => {
    if (!user.email) { setError("Please enter your email address first"); return; }
    if (emailAvailable === false) { setError("This email is already registered. Please login instead."); return; }
    
    setShowOtpModal(true);

    // IF already sent for THIS email, just show the input field
    if (otpSent && sentIdentifier === user.email) {
      return;
    }

    setSending(true); setError(null);
    try {
      await apiFetch("/auth/send-otp", {
        method: "POST",
        body: JSON.stringify({ identifier: user.email }),
      });
      setOtpSent(true);
      setSentIdentifier(user.email);
    } catch (e: any) { 
      console.error("Send OTP Error:", e);
      setError(e.message); 
    }
    finally { setSending(false); }
  };

  // ── OTP verify ────────────────────────────────────────────────────────────
  const verifyOtp = async () => {
    if (otp.length < 6) return;
    setVerifying(true); setError(null);
    try {
      await apiFetch("/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({ identifier: user.email, otp }),
      });
      setVerified(true);
      setShowOtpModal(false);
    } catch (e: any) { setError(e.message); }
    finally { setVerifying(false); }
  };

  // ── Step 1 → 2 ────────────────────────────────────────────────────────────
  const goToStep2 = () => {
    if (!verified) { setError("Verify your identity first"); return; }
    if (!user.ownerName || !user.pin || !user.email || !user.mobile) { 
      setError("Please fill in all your details"); 
      return; 
    }
    setError(null); setStep(STEP_SITE);
  };

  // ── Step 2 → 3 ────────────────────────────────────────────────────────────
  const goToStep3 = () => {
    if (!site.gymName || !site.username || !site.location) { setError("Fill all fields"); return; }
    if (usernameAvailable === false) { setError("Username is already taken"); return; }
    setError(null); setStep(STEP_PAY);
  };

  // ── Step 3: Razorpay payment then register ────────────────────────────────
  const handlePay = async () => {
    setPaying(true); setError(null);
    try {
      const ok = await loadRazorpay();
      if (!ok || !window.Razorpay) throw new Error("Could not load Razorpay checkout");

      const r = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: selectedPlan }),
      });
      if (!r.ok) throw new Error("Could not create order");
      const payload = await r.json() as { orderId: string; amountInPaise: number; currency: string; keyId: string };

      const rp = new window.Razorpay!({
        key: payload.keyId,
        amount: payload.amountInPaise,
        currency: payload.currency,
        name: "GMMX",
        description: `GMMX ${selectedPlan} plan`,
        order_id: payload.orderId,
        handler: async (result: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          await finalRegister(result.razorpay_payment_id);
        },
        modal: { ondismiss: () => setPaying(false) },
        theme: { color: "#FF5C73" },
        prefill: { name: user.ownerName, email: user.email, contact: user.mobile },
      });
      rp.open();
    } catch (e: any) { setError(e.message); setPaying(false); }
  };

  // ── Skip payment (Free plan) ──────────────────────────────────────────────
  const handleFreeSignup = async () => {
    setRegistering(true); setError(null);
    await finalRegister(null);
  };

  const handleFinalSubmit = () => {
    if (selectedPlan === 'plan-free') {
      handleFreeSignup();
    } else {
      handlePay();
    }
  };

  // ── Register owner ────────────────────────────────────────────────────────
  const finalRegister = async (paymentId: string | null) => {
    setRegistering(true);
    try {
      await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({
        ownerName: user.ownerName,
        email: user.email,
        phone: user.mobile.replace(/\D/g, ''),
        countryCode: countryCode,
        pin: user.pin,
        gymName: site.gymName,
        location: site.location,
        subdomain: site.username,
        hasMicrosite: site.wantMicrosite,
        planId: selectedPlan,
        paymentId: paymentId
      }),
      });
      setStep(STEP_DONE);
      setTimeout(() => {
        const isDev = window.location.hostname === 'localhost';
        const targetHost = isDev ? window.location.host : 'dashboard.gmmx.app';
        window.location.href = `${window.location.protocol}//${targetHost}/${site.username}/dashboard`;
      }, 3000);
    } catch (e: any) { setError(e.message); }
    finally { setRegistering(false); setPaying(false); }
  };

  // ─── Plans for Step 3 ─────────────────────────────────────────────────────
  const displayPlans = [
    { id: "plan-free",   name: "Always Free",  price: "₹0",    desc: "Core attendance, 25 members", period: "both" },
    { id: `plan-starter-${billingPeriod}`, name: "Starter",  price: billingPeriod === "monthly" ? "₹499/mo" : "₹399/mo", desc: "100 members, QR scan, reports", period: billingPeriod },
    { id: `plan-growth-${billingPeriod}`, name: "Growth",   price: billingPeriod === "monthly" ? "₹999/mo" : "₹799/mo", desc: "300 members, WhatsApp, microsite", period: billingPeriod },
    { id: `plan-scale-${billingPeriod}`, name: "Scale",    price: billingPeriod === "monthly" ? "₹1499/mo" : "₹1199/mo", desc: "Unlimited, multi-branch, VIP support", period: billingPeriod },
  ];

  return (
    <main className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-[#030612]">
      {/* Background orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FF5C73]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#8B5CF6]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-xl relative z-10">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
            <div className="relative h-10 w-10 overflow-hidden transition-transform group-hover:scale-110">
              <Image src="/logo-trans.png" alt="Gmmx logo" fill sizes="40px" className="object-contain scale-[1.7]" />
            </div>
            <span className="text-xl font-black text-white tracking-tighter">Gmmx</span>
          </Link>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Join the Elite.</h1>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 sm:p-10 shadow-2xl">
          <AnimatePresence mode="wait">

            {/* ── STEP 1: User + OTP ─────────────────────────────────────── */}
            {step === STEP_USER && (
              <motion.div key="step-user" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <StepBar current={STEP_USER} />
                <h2 className="text-lg font-black text-white mb-6 flex items-center gap-2"><User size={20} className="text-[#FF5C73]" /> Your Details</h2>

                <div className="space-y-5">
                  <Field label="Your Name" icon={User}>
                    <input required name="ownerName" value={user.ownerName} onChange={handleUserChange}
                      placeholder="The Rock" className={inputCls} />
                  </Field>

                  <div className="space-y-4">
                    <Field label="Business Email" icon={Mail}>
                      <div className="relative group">
                        <input required type="email" name="email" value={user.email} 
                          onChange={handleUserChange}
                          onBlur={checkEmailAvailability}
                          disabled={verified} placeholder="e.g., owner@titanfitness.com"
                          className={inputCls + (verified ? " opacity-60 cursor-not-allowed" : "") + (emailAvailable === false ? " border-rose-500/50 pr-12" : "")} />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                          {checkingEmail && <Loader2 className="animate-spin text-slate-500" size={16} />}
                          {!checkingEmail && emailAvailable === false && <ShieldAlert className="text-rose-500 animate-pulse" size={16} />}
                          {!checkingEmail && emailAvailable === true && <CheckCircle2 className="text-emerald-500" size={16} />}
                        </div>
                      </div>
                      {emailAvailable === false && <p className="text-[10px] text-rose-400 mt-1 ml-1 font-bold flex items-center gap-1"><AlertCircle size={10} /> This email is already associated with an account</p>}
                    </Field>
                    <Field label="Personal Mobile" icon={Phone}>
                      <div className="flex gap-2">
                        <div className="relative">
                          <select 
                            value={countryCode} 
                            onChange={(e) => setCountryCode(e.target.value)}
                            className="bg-slate-900/50 border border-white/5 rounded-2xl pl-11 pr-8 py-3.5 text-white outline-none focus:ring-2 focus:ring-[#FF5C73]/20 appearance-none cursor-pointer transition-all"
                          >
                            <option value="+91">🇮🇳 +91</option>
                            <option value="+1">🇺🇸 +1</option>
                            <option value="+44">🇬🇧 +44</option>
                            <option value="+971">🇦🇪 +971</option>
                            <option value="+61">🇦🇺 +61</option>
                          </select>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                            <ChevronDown size={14} />
                          </div>
                        </div>
                        <input required type="tel" name="mobile" value={user.mobile} onChange={handleUserChange}
                          placeholder="98765 43210"
                          className="w-full bg-slate-900/50 border border-white/5 rounded-2xl px-5 py-3.5 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-[#FF5C73]/20 transition-all outline-none" />
                      </div>
                    </Field>
                  </div>

                  <Field label="Set 4-Digit Login PIN" icon={Lock}>
                    <input 
                      required 
                      type="password" 
                      maxLength={4}
                      name="pin" 
                      value={user.pin} 
                      onChange={e => setUser(p => ({ ...p, pin: e.target.value.replace(/\D/g, "") }))}
                      placeholder="••••" 
                      className={inputCls} 
                    />
                  </Field>


                  {/* Verification Block */}
                  <div className="p-5 bg-white/5 rounded-[24px] border border-white/10 space-y-4">
                    {!verified ? (
                        <div className="space-y-3">
                          <p className="text-[11px] text-slate-400 text-center px-4">
                            We'll send a 6-digit verification code to your email to verify your business identity.
                          </p>
                          <button type="button" onClick={sendOtp} disabled={sending || !user.email || emailAvailable === false}
                            className="w-full py-4 bg-white text-black rounded-2xl font-black text-sm hover:bg-slate-100 transition-all flex items-center justify-center gap-2 shadow-xl shadow-white/5 disabled:opacity-50">
                            {sending ? <Loader2 className="animate-spin" size={18} /> : "Verify Identity via Email OTP"}
                          </button>
                        </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-center gap-3 text-emerald-400 font-black py-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 shadow-lg shadow-emerald-500/5">
                          <div className="h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <CheckCircle2 size={16} />
                          </div>
                          Email Verified Successfully
                        </div>
                        <button 
                          type="button" 
                          onClick={() => { setVerified(false); setOtpSent(false); setOtp(""); sessionStorage.removeItem("verified"); }}
                          className="text-[10px] text-slate-500 hover:text-white underline font-bold self-center"
                        >
                          Use a different email
                        </button>
                      </div>
                    )}
                  </div>

                  {error && <p className="text-rose-500 text-xs font-semibold text-center bg-rose-500/10 py-2 rounded-lg border border-rose-500/20">{error}</p>}

                  <StarBorder type="button" onClick={goToStep2} disabled={!verified} className="w-full py-4 rounded-2xl" color="#FF5C73">
                    <span className="flex items-center justify-center gap-2 text-base font-black">
                      Next: Gym Details <ArrowRight size={18} />
                    </span>
                  </StarBorder>
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: Microsite Details ──────────────────────────────── */}
            {step === STEP_SITE && (
              <motion.div key="step-site" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <StepBar current={STEP_SITE} />
                <h2 className="text-lg font-black text-white mb-6 flex items-center gap-2"><Globe size={20} className="text-[#FF5C73]" /> Gym & Microsite Details</h2>

                <div className="space-y-6">

                  <Field label="Gym Name" icon={Dumbbell}>
                    <input required name="gymName" value={site.gymName} onChange={handleSiteChange}
                      placeholder="Titan Fitness" className={inputCls} />
                  </Field>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Gym Username / Slug</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-sm">@</span>
                      <input required name="username" value={site.username} onChange={handleSiteChange}
                        placeholder="titan-fitness"
                        className={`w-full bg-slate-900/50 border rounded-2xl pl-10 pr-10 py-3.5 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-[#FF5C73]/20 transition-all outline-none ${
                          usernameAvailable === true ? "border-emerald-500/50 focus:ring-emerald-500/20" : usernameAvailable === false ? "border-rose-500/50 focus:ring-rose-500/20" : "border-white/5"
                        }`} />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        {checkingSlug ? <Loader2 className="animate-spin text-slate-500" size={16} /> :
                          usernameAvailable === true ? <CheckCircle2 className="text-emerald-500" size={16} /> :
                          usernameAvailable === false ? <ShieldAlert className="text-rose-500 animate-pulse" size={16} /> : null}
                      </div>
                    </div>
                    {usernameAvailable === false && <p className="text-[10px] text-rose-400 mt-1 ml-1 font-bold flex items-center gap-1"><AlertCircle size={10} /> This username is already taken</p>}
                    {site.username && (
                      <p className="text-[11px] text-slate-500 ml-1">Your microsite: <span className="text-emerald-400 font-semibold">{site.username}.gmmx.app</span></p>
                    )}
                  </div>

                  <Field label="Gym Location" icon={MapPin}>
                    <input required name="location" value={site.location} onChange={handleSiteChange}
                      placeholder="Halanayakanahalli, Bengaluru" className={inputCls} />
                    <button 
                      type="button" 
                      onClick={fetchLocation} 
                      disabled={locating}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FF5C73] hover:text-white transition-colors disabled:opacity-50"
                      title="Use current location"
                    >
                      {locating ? <Loader2 className="animate-spin" size={16} /> : <MapPin size={16} />}
                    </button>
                  </Field>

                  <div className="pt-4">
                    <label className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5 cursor-pointer hover:bg-white/10 transition-all shadow-lg">
                      <div className="relative flex items-center justify-center">
                        <input type="checkbox" className="sr-only" checked={site.wantMicrosite} onChange={(e) => setSite(p => ({ ...p, wantMicrosite: e.target.checked }))} />
                        <div className={`w-10 h-6 bg-slate-800 rounded-full transition-colors ${site.wantMicrosite ? 'bg-emerald-500' : ''}`}></div>
                        <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${site.wantMicrosite ? 'translate-x-4 shadow-sm' : ''}`}></div>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white flex items-center gap-2">Enable Free Microsite <Sparkles size={14} className="text-yellow-400" /></p>
                        <p className="text-[11px] text-slate-400 leading-relaxed">Turn your slug into a premium SEO-optimized website.</p>
                      </div>
                    </label>
                  </div>

                  <AnimatePresence>
                    {site.wantMicrosite && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }} 
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4 pt-2 overflow-hidden"
                      >
                        <div className="space-y-3">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">About Your Gym</label>
                          <textarea 
                            name="about" 
                            value={site.about} 
                            onChange={(e) => setSite(p => ({ ...p, about: e.target.value }))}
                            placeholder="We specialize in hypertrophy and functional training..."
                            className="w-full bg-slate-900/50 border border-white/5 rounded-2xl p-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-[#FF5C73]/20 transition-all outline-none resize-none h-24 text-sm"
                          />
                        </div>

                        <div className="space-y-3">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Microsite Primary Color</label>
                          <div className="grid grid-cols-4 gap-3">
                            {[
                              { id: "#ef4444", name: "Red", color: "bg-red-500" },
                              { id: "#3b82f6", name: "Blue", color: "bg-blue-500" },
                              { id: "#10b981", name: "Green", color: "bg-emerald-500" },
                              { id: "#f59e0b", name: "Yellow", color: "bg-amber-500" },
                              { id: "#8b5cf6", name: "Purple", color: "bg-violet-500" },
                              { id: "#ec4899", name: "Orange", color: "bg-orange-500" },
                              { id: "#ffffff", name: "White", color: "bg-white" },
                              { id: "#cbd5e1", name: "Silver", color: "bg-slate-300" },
                            ].map(tpl => (
                              <button
                                key={tpl.id}
                                type="button"
                                onClick={() => setSite(p => ({ ...p, theme: tpl.id }))}
                                className={`group relative h-12 rounded-xl flex items-center justify-center transition-all ${tpl.color} ${
                                  site.theme === tpl.id 
                                    ? "ring-2 ring-white ring-offset-2 ring-offset-[#030612] scale-110 z-10 shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
                                    : "hover:scale-105 hover:shadow-lg opacity-80 hover:opacity-100"
                                }`}
                                title={tpl.name}
                              >
                                {site.theme === tpl.id && (
                                  <div className={`h-4 w-4 rounded-full flex items-center justify-center ${tpl.id === '#ffffff' ? 'text-black' : 'text-white'}`}>
                                    <CheckCircle2 size={12} strokeWidth={4} />
                                  </div>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {error && <p className="text-rose-500 text-xs font-semibold text-center bg-rose-500/10 py-2 rounded-lg border border-rose-500/20 mt-4">{error}</p>}

                  <div className="flex gap-3 pt-4 border-t border-white/5 mt-6">
                    <button type="button" onClick={() => { setStep(STEP_USER); setError(null); }}
                      className="flex items-center gap-2 px-5 py-4 rounded-2xl bg-white/5 text-white font-bold text-sm hover:bg-white/10 transition-all">
                      <ArrowLeft size={16} /> Back
                    </button>
                    <StarBorder type="button" onClick={goToStep3} disabled={!site.gymName || !site.username || !site.location || usernameAvailable === false}
                      className="flex-1 py-4 rounded-2xl shadow-xl shadow-[#FF5C73]/10" color="#FF5C73">
                      <span className="flex items-center justify-center gap-2 text-base font-black">
                        Choose Plan <ArrowRight size={18} />
                      </span>
                    </StarBorder>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── STEP 3: Payment ────────────────────────────────────────── */}
            {step === STEP_PAY && (
              <motion.div key="step-pay" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <StepBar current={STEP_PAY} />
                <h2 className="text-lg font-black text-white mb-6 flex items-center gap-2"><CreditCard size={20} className="text-[#FF5C73]" /> Choose Your Plan</h2>

                <div className="flex justify-center mb-6">
                  <div className="bg-white/5 p-1 rounded-xl border border-white/10 flex items-center relative overflow-hidden">
                    {/* Animated Tab Background */}
                    <div
                      className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg transition-transform duration-300 shadow-sm ${
                        billingPeriod === "monthly" ? "left-1" : "translate-x-[calc(100%+6px)]"
                      }`}
                    />
                    <button
                      onClick={() => setBillingPeriod("monthly")}
                      className={`relative z-10 px-6 py-2 rounded-lg font-bold text-xs transition-colors ${
                        billingPeriod === "monthly" ? "text-black" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => setBillingPeriod("yearly")}
                      className={`relative z-10 px-6 py-2 rounded-lg font-bold text-xs transition-colors flex items-center gap-1.5 ${
                        billingPeriod === "yearly" ? "text-black" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Yearly <span className="bg-emerald-500/20 text-emerald-500 text-[9px] px-1.5 py-0.5 rounded shadow-sm">-20%</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {displayPlans.map(p => (
                    <button key={p.id} type="button" onClick={() => setSelectedPlan(p.id)}
                      className={`w-full text-left p-4 rounded-2xl border-2 transition-all relative overflow-hidden group ${
                        selectedPlan === p.id
                          ? "border-[#FF5C73] bg-[#FF5C73]/5 shadow-[0_0_20px_rgba(255,92,115,0.15)]"
                          : "border-white/5 bg-black/20 hover:border-white/20 hover:bg-white/5"
                      }`}>
                      <div className="flex items-center justify-between relative z-10">
                        <div>
                          <p className="font-black text-white text-sm flex items-center gap-2">
                            {p.name}
                            {selectedPlan === p.id && <CheckCircle2 className="text-[#FF5C73]" size={14} />}
                          </p>
                          <p className="text-slate-400 text-xs mt-1">{p.desc}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-white text-lg">{p.price}</p>
                          {p.id !== "plan-free" && selectedPlan === p.id && billingPeriod === "yearly" && (
                             <p className="text-[9px] text-emerald-400 uppercase font-black tracking-widest bg-emerald-500/10 px-1 inline-block rounded">
                               SAVE 20%
                             </p>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Coupon Code Section */}
                {selectedPlan !== 'plan-free' && (
                  <div className="mt-6 p-4 rounded-2xl border border-white/10 bg-white/5 relative z-10">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                      Promo Code <Tag size={12} className="text-[#FF5C73]" />
                    </label>
                    <div className="flex gap-2">
                      <input
                        value={couponCode || ''}
                        onChange={(e) => {
                          setCouponCode(e.target.value.toUpperCase());
                          setCouponStatus(null);
                        }}
                        placeholder="e.g. FIT2024"
                        className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-bold placeholder:text-slate-500 focus:border-[#FF5C73]/50 focus:ring-1 focus:ring-[#FF5C73]/50 transition-all outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          // Dummy validation
                          if(couponCode && couponCode.length > 3) {
                            setCouponStatus({ valid: true, message: "Coupon applied! 15% Off." });
                          } else {
                            setCouponStatus({ valid: false, message: "Invalid promo code." });
                          }
                        }}
                        disabled={!couponCode}
                        className="bg-white/10 hover:bg-white/20 text-white px-5 rounded-xl text-xs font-bold transition-all disabled:opacity-50"
                      >
                        Apply
                      </button>
                    </div>
                    {couponStatus && (
                      <p className={`text-[10px] font-bold mt-2 ml-1 flex items-center gap-1 ${couponStatus.valid ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {couponStatus.valid ? <CheckCircle2 size={10} /> : <ShieldAlert size={10} />}
                        {couponStatus.message}
                      </p>
                    )}
                  </div>
                )}

                <div className="bg-gradient-to-r from-emerald-500/10 to-transparent p-4 rounded-2xl border border-emerald-500/20 flex items-center gap-4 mt-6">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <Zap className="text-emerald-500" size={20} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-0.5">Instant Setup</p>
                    <p className="text-[11px] text-slate-300 leading-relaxed">Your dashboard and <span className="font-bold text-emerald-300">{site.username}.gmmx.app</span> will be ready instantly.</p>
                  </div>
                </div>

                {error && <p className="text-rose-500 text-xs font-semibold text-center bg-rose-500/10 py-2 rounded-lg border border-rose-500/20 my-4">{error}</p>}

                <div className="flex gap-3 pt-6 border-t border-white/5 mt-6">
                  <button type="button" onClick={() => { setStep(STEP_SITE); setError(null); }}
                    className="flex items-center gap-2 px-5 py-4 rounded-2xl bg-white/5 text-white font-bold text-sm hover:bg-white/10 transition-all">
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button type="button" onClick={handleFinalSubmit} disabled={registering || paying}
                    className="flex-1 py-4 bg-[#FF5C73] text-white rounded-2xl font-black text-base hover:bg-[#FF5C73]/90 transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(255,92,115,0.3)] shadow-[#FF5C73]/20 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
                    <span className="relative flex items-center justify-center gap-2">
                      {registering || paying ? <Loader2 className="animate-spin" size={18} /> : 
                        selectedPlan === 'plan-free' ? "Complete Registration" : "Secure Checkout"
                      }
                    </span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STEP DONE ──────────────────────────────────────────────── */}
            {step === STEP_DONE && (
              <motion.div key="step-done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6 py-10">
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="text-emerald-500" size={48} />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white mb-2">Welcome Aboard!</h2>
                  <p className="text-slate-400 font-medium leading-relaxed">
                    Your workspace at <span className="text-[#FF5C73] font-bold">gmmx.app/{site.username}</span> is ready. Redirecting...
                  </p>
                </div>
                <div className="flex justify-center pt-4">
                  <div className="h-1.5 w-32 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-[#FF5C73]" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 3 }} />
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        <p className="mt-8 text-center text-slate-500 text-sm">
          Already have an account?{" "}
          <button 
            onClick={() => {
              const isDev = window.location.hostname === 'localhost';
              const targetHost = isDev ? window.location.host : 'dashboard.gmmx.app';
              window.location.href = `${window.location.protocol}//${targetHost}/login`;
            }}
            className="text-white font-bold hover:text-[#FF5C73] transition-colors cursor-pointer inline-flex items-center"
          >
            Log in
          </button>
        </p>
      </div>
      
      {/* OTP Modal */}
      <AnimatePresence>
        {showOtpModal && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030612]/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-[32px] w-full max-w-[400px] shadow-2xl relative overflow-hidden backdrop-blur-xl"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF5C73] to-transparent opacity-50" />
              <button 
                onClick={() => setShowOtpModal(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
              >
                ✕
              </button>
              
              <div className="mb-8 relative">
                <div className="w-16 h-16 bg-[#FF5C73]/10 border border-[#FF5C73]/20 rounded-2xl flex items-center justify-center mb-6">
                  <Mail className="text-[#FF5C73]" size={28} />
                </div>
                <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Verify email</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  We've sent a 6-digit code to <br/>
                  <span className="font-bold text-white bg-white/5 py-1 px-2 rounded-md mt-1 inline-block">{user.email}</span>
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <input maxLength={6} value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="0 0 0 0 0 0"
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-4 text-white text-center font-black text-3xl tracking-[0.3em] outline-none focus:border-[#FF5C73]/50 focus:ring-1 focus:ring-[#FF5C73]/50 transition-all font-mono" />
                  
                  <button type="button" onClick={verifyOtp} disabled={verifying || otp.length < 6}
                    className="w-full bg-[#FF5C73] text-white py-4 rounded-2xl font-black text-sm hover:bg-[#FF5C73]/90 transition-all disabled:opacity-50 flex justify-center items-center gap-2">
                    {verifying ? <Loader2 className="animate-spin" size={18} /> : <span>Verify Code <ArrowRight size={16} /></span>}
                  </button>
                </div>
                
                {error && <p className="text-rose-500 text-xs font-semibold text-center bg-rose-500/10 py-2 rounded-lg border border-rose-500/20">{error}</p>}
                
                <p className="text-xs text-slate-500 text-center">
                  Didn't get the code?{" "}
                  <button type="button" disabled={sending} onClick={() => { setOtpSent(false); sendOtp(); }} className="text-[#FF5C73] hover:text-[#FF5C73]/80 hover:underline font-bold transition-colors">
                    {sending ? "Resending..." : "Click to resend"}
                  </button>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
