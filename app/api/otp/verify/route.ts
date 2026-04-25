import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.gmmx.app";
  const body = await req.json();

    try {
      const response = await fetch(`${BACKEND_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          identifier: body.email || body.identifier || body.phone, 
          otp: body.otp 
        }),
      });

    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json({ success: true, message: "Verification successful" });
  } catch (err: any) {
    console.error(`[OTP-VERIFY-PROXY] Backend connection failed: ${err.message}`);
    return NextResponse.json({ error: "Backend server unreachable" }, { status: 503 });
  }
}
