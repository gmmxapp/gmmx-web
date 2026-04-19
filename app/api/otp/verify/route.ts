import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  const body = await req.json();

  try {
    const response = await fetch(`${BACKEND_URL}/api/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        email: body.email || body.identifier, 
        code: body.otp 
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
