import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.gmmx.app";
  const body = await req.json();

    try {
      const response = await fetch(`${BACKEND_URL}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: body.email || body.phone || body.identifier }),
      });
  
      const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (err: any) {
    console.error(`[OTP-PROXY] Backend connection failed: ${err.message}`);
    return NextResponse.json({ error: "Backend server unreachable" }, { status: 503 });
  }
}
