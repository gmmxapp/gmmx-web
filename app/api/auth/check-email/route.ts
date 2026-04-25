import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.gmmx.app";
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(`${BACKEND_URL}/auth/check-email?email=${encodeURIComponent(email)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const data = await response.json();
    if (!response.ok) return NextResponse.json(data, { status: response.status });

    // Backend returns ApiResponse<Boolean> where data field is the availability
    return NextResponse.json({ available: data.data });
  } catch (err: any) {
    console.error(`[CHECK-EMAIL-PROXY] Backend connection failed: ${err.message}`);
    
    if (process.env.NODE_ENV === "development" || BACKEND_URL.includes("localhost")) {
      console.warn("[CHECK-EMAIL-PROXY] [MOCK MODE] Returning available: true because backend is slow/down.");
      return NextResponse.json({ available: true, message: "Email checked (Mock mode)" });
    }

    return NextResponse.json({ error: "Backend unreachable or timed out" }, { status: 503 });
  }
}
