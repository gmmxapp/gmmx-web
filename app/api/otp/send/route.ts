import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.gmmx.app";
  const body = await req.json();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

      const response = await fetch(`${BACKEND_URL}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: body.email || body.phone || body.identifier }),
        signal: controller.signal,
      });
  
      clearTimeout(timeoutId);
      const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (err: any) {
    console.error(`[OTP-PROXY] Backend connection failed: ${err.message}`);
    
    if (process.env.NODE_ENV === "development" || BACKEND_URL.includes("localhost")) {
      console.warn("[OTP-PROXY] [MOCK MODE] Returning success because backend is slow/down.");
      return NextResponse.json({ success: true, message: "OTP sent (Mock mode)", debugCode: "123456" });
    }

    return NextResponse.json({ error: "Backend server unreachable or timed out" }, { status: 503 });
  }
}
