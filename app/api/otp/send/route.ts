import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { randomInt } from "crypto";

// Shared in-memory store (for demo purposes, use Redis/Database for prod)
// Note: In Next.js dev mode, this Map might clear on HMR.
// Use a global to persist across refreshes.
declare global {
  var otpStore: Map<string, { otp: string; expiresAt: number }>;
}

const otpStore = global.otpStore || (global.otpStore = new Map());

const MAIL_USER = process.env.MAIL_USER;
const APP_PASS = process.env.APP_PASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: MAIL_USER,
    pass: APP_PASS,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { email, mobile, gymName } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Generate one 6-digit OTP for both
    const otp = randomInt(100000, 999999).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    // Store by email as key
    otpStore.set(email.toLowerCase(), { otp, expiresAt });
    
    // Also store by mobile as key if provided for flexible verification
    if (mobile) {
      otpStore.set(mobile.replace(/\s+/g, ''), { otp, expiresAt });
    }

    // 1. Send to Email
    console.log(`[VERIFY] Attempting OTP ${otp} send to ${email}`);
    
    try {
      await transporter.sendMail({
        from: `"Gmmx Team" <${MAIL_USER}>`,
        to: email,
        subject: `Verification Code: ${otp}`,
        text: `Your verification code for Gmmx is: ${otp}`,
        html: `<div style="font-family: sans-serif; padding: 20px;">
          <h2>Workspace Verification</h2>
          <p>Your code for <strong>${gymName || "GMMX"}</strong> is:</p>
          <div style="background: #f4f4f4; padding: 20px; font-size: 32px; font-weight: bold; text-align: center; border-radius: 12px; letter-spacing: 5px;">
            ${otp}
          </div>
          <p style="color: #666; font-size: 14px; margin-top: 20px;">This code expires in 5 minutes.</p>
        </div>`,
      });
      console.log(`[VERIFY] Email sent successfully to ${email}`);
    } catch (mailError: any) {
      console.error("[VERIFY] Gmail Send Error (transporter):", mailError.message);
      console.warn("[VERIFY] OTP will proceed in MOCK mode for development.");
    }

    // 2. Send to Mobile (Mock)
    if (mobile) {
      console.log(`[VERIFY] [SMS MOCK] Code ${otp} logged for ${mobile}`);
    }

    return NextResponse.json({ 
      success: true, 
      message: "OTP processed",
      devNote: "Check terminal if email fails"
    });
  } catch (error: any) {
    console.error("[VERIFY] Fatal OTP Route Error:", error);
    return NextResponse.json({ error: "Server unreachable or internal error" }, { status: 500 });
  }
}
