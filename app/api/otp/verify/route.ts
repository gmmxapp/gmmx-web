import { NextRequest, NextResponse } from "next/server";

declare global {
  var otpStore: Map<string, { otp: string; expiresAt: number }>;
}

const otpStore = global.otpStore || (global.otpStore = new Map());

export async function POST(req: NextRequest) {
  try {
    const { email, mobile, identifier, otp } = await req.json();
    const id = identifier || email || mobile;

    if (!id || !otp) {
      return NextResponse.json({ error: "Identifier (Email/Mobile) and OTP are required" }, { status: 400 });
    }

    const searchKey = id.toLowerCase().replace(/\s+/g, '');
    const record = otpStore.get(searchKey);

    if (!record) {
      return NextResponse.json({ error: "No OTP found for this identifier" }, { status: 400 });
    }

    if (Date.now() > record.expiresAt) {
      otpStore.delete(searchKey);
      return NextResponse.json({ error: "OTP has expired" }, { status: 400 });
    }

    if (record.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    // Success! Clear the OTP
    otpStore.delete(searchKey);

    return NextResponse.json({ success: true, message: "Verification successful" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Verification failed" }, { status: 500 });
  }
}
