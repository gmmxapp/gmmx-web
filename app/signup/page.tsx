"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Mail,
  Phone,
  Lock,
  User,
  Dumbbell,
  MapPin,
  ShieldCheck,
  Loader2,
  CheckCircle2,
  ChevronLeft
} from "lucide-react";
import { registerOwner } from "@/lib/api";
import StarBorder from "@/components/star-border";
import RotatingText from "@/components/rotating-text";

// Step constants
const STEP_INFO = 1;
const STEP_OTP = 2;
const STEP_SUCCESS = 3;

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);

  const [formData, setFormData] = useState({
    gymName: "",
    username: "",
    ownerName: "",
    email: "",
    mobile: "",
    location: "",
    password: "",
  });

  const [otp, setOtp] = useState("");

  // Sync username with gymName until user edits username manually
  const [usernameEdited, setUsernameEdited] = useState(false);

  useEffect(() => {
    if (!usernameEdited && formData.gymName) {
      const generated = formData.gymName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      setFormData(prev => ({ ...prev, username: generated }));
    }
  }, [formData.gymName, usernameEdited]);

  // Check username availability
  useEffect(() => {
    if (!formData.username || formData.username.length < 3) {
      setUsernameAvailable(null);
      return;
    }

    const timer = setTimeout(async () => {
      setCheckingUsername(true);
      try {
        const res = await fetch(`/api/check-slug?slug=${formData.username}`);
        const data = await res.json();
        setUsernameAvailable(data.available);
      } catch (err) {
        setUsernameAvailable(null);
      } finally {
        setCheckingUsername(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.username]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "username") setUsernameEdited(true);
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSendOtp = async () => {
    if (!formData.email || !formData.mobile) {
      setError("Please fill in email and mobile first");
      return;
    }

    setVerifying(true);
    setError(null);

    try {
      const response = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          mobile: formData.mobile,
          gymName: formData.gymName,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to send OTP");

      setOtpSent(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setVerifying(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length < 6) return;
    setLoading(true);
    setError(null);

    try {
      const verifyRes = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          mobile: formData.mobile,
          otp: otp,
        }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) throw new Error(verifyData.error || "Invalid OTP");

      setIsVerified(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFinalRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified) {
      setError("Please verify your identity first");
      return;
    }
    if (usernameAvailable === false) {
      setError("Username is already taken");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await registerOwner({
        ...formData,
        slug: formData.username,
      });

      setIsSuccess(true);
      setTimeout(() => {
        router.push(`/${formData.username}/dashboard`);
      }, 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-[#030612]">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FF5C73]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#8B5CF6]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
            <div className="relative h-10 w-10 overflow-hidden transition-transform group-hover:scale-110">
              <Image src="/logo-trans.png" alt="Gmmx logo" fill className="object-contain scale-[1.7]" />
            </div>
            <span className="text-xl font-black text-white tracking-tighter">Gmmx</span>
          </Link>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Join the Elite.</h1>
        </div>

        {/* Unified Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 sm:p-10 shadow-2xl relative overflow-hidden">

          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="signup-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <form onSubmit={handleFinalRegister} className="space-y-6">
                  {/* Gym Info Section */}
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Gym Name</label>
                        <div className="relative">
                          <Dumbbell className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                          <input
                            required
                            name="gymName"
                            value={formData.gymName}
                            onChange={handleInputChange}
                            placeholder="Titan Fitness"
                            className="w-full bg-slate-900/50 border border-white/5 rounded-2xl pl-12 pr-4 py-3.5 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-[#FF5C73]/20 transition-all outline-none"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Unique Username</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">@</span>
                          <input
                            required
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="titan-fitness"
                            className={`w-full bg-slate-900/50 border rounded-2xl pl-10 pr-10 py-3.5 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-[#FF5C73]/20 transition-all outline-none ${usernameAvailable === true ? 'border-emerald-500/50' :
                                usernameAvailable === false ? 'border-rose-500/50' : 'border-white/5'
                              }`}
                          />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            {checkingUsername ? <Loader2 className="animate-spin text-slate-500" size={16} /> :
                              usernameAvailable === true ? <CheckCircle2 className="text-emerald-500" size={16} /> :
                                usernameAvailable === false ? <ShieldCheck className="text-rose-500" size={16} /> : null}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Gym Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input
                          required
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          placeholder="e.g. Halanayakanahalli, Bengaluru"
                          className="w-full bg-slate-900/50 border border-white/5 rounded-2xl pl-12 pr-4 py-3.5 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-[#FF5C73]/20 transition-all outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Owner Info Section */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Owner Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input
                          required
                          name="ownerName"
                          value={formData.ownerName}
                          onChange={handleInputChange}
                          placeholder="The Rock"
                          className="w-full bg-slate-900/50 border border-white/5 rounded-2xl pl-12 pr-4 py-3.5 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-[#FF5C73]/20 transition-all outline-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input
                          required
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="••••••••"
                          className="w-full bg-slate-900/50 border border-white/5 rounded-2xl pl-12 pr-4 py-3.5 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-[#FF5C73]/20 transition-all outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Section with Verification */}
                  <div className="space-y-5 p-5 bg-white/5 rounded-[24px] border border-white/5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                          <input
                            required
                            type="email"
                            name="email"
                            disabled={isVerified}
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="email@gmmx.app"
                            className="w-full bg-slate-900/30 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-white/20"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                          <input
                            required
                            type="tel"
                            name="mobile"
                            disabled={isVerified}
                            value={formData.mobile}
                            onChange={handleInputChange}
                            placeholder="+91 0000 0000"
                            className="w-full bg-slate-900/30 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white outline-none focus:ring-1 focus:ring-white/20"
                          />
                        </div>
                      </div>
                    </div>

                    {!isVerified ? (
                      <div className="space-y-4">
                        {!otpSent ? (
                          <button
                            type="button"
                            onClick={handleSendOtp}
                            disabled={verifying}
                            className="w-full py-3 bg-[#FF5C73] text-white rounded-xl font-bold text-sm hover:bg-[#FF5C73]/90 transition-all flex items-center justify-center gap-2"
                          >
                            {verifying ? <Loader2 className="animate-spin" size={16} /> : "Verify Identity"}
                          </button>
                        ) : (
                          <div className="flex gap-2">
                            <input
                              maxLength={6}
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                              placeholder="Enter 6-digit OTP"
                              className="flex-1 bg-white/10 border border-[#FF5C73]/30 rounded-xl px-4 py-3 text-white text-center font-bold tracking-[0.2em] outline-none"
                            />
                            <button
                              type="button"
                              onClick={handleVerifyOtp}
                              disabled={loading || otp.length < 6}
                              className="bg-white text-black px-6 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all"
                            >
                              {loading ? <Loader2 className="animate-spin" size={16} /> : "Check"}
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold py-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                        <CheckCircle2 size={18} /> Verified
                      </div>
                    )}
                  </div>

                  {error && (
                    <div className="text-rose-500 text-xs font-semibold text-center bg-rose-500/10 py-2 rounded-lg border border-rose-500/20">
                      {error}
                    </div>
                  )}

                  <StarBorder
                    type="submit"
                    disabled={loading || !isVerified || usernameAvailable === false}
                    className="w-full py-4 rounded-2xl"
                    color="#FF5C73"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="animate-spin" size={18} />
                        Starting engine...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 text-lg font-black">
                        Create Your Workspace <ArrowRight size={20} />
                      </div>
                    )}
                  </StarBorder>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="step-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6 py-10"
              >
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="text-emerald-500" size={48} />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white mb-2">Welcome Aboard!</h2>
                  <p className="text-slate-400 font-medium leading-relaxed">
                    Preparing your workspace at <span className="text-[#FF5C73] font-bold">gmmx.app/{formData.username}</span>. Redirecting...
                  </p>
                </div>
                <div className="flex justify-center pt-4">
                  <div className="h-1.5 w-32 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#FF5C73]"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Link */}
        <p className="mt-8 text-center text-slate-500 text-sm">
          Already using Gmmx?{" "}
          <Link href="/login" className="text-white font-bold hover:text-[#FF5C73] transition-colors">
            Log in here
          </Link>
        </p>
      </div>

      {/* Brand Watermark */}
      <div className="absolute bottom-6 right-6 opacity-20 hidden sm:block">
        <span className="text-[10rem] font-black text-white/5 select-none leading-none">GMMX</span>
      </div>
    </main>
  );
}
