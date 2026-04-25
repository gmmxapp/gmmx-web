import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

  try {
    const response = await fetch(`${BACKEND_URL}/auth/check-email?email=${encodeURIComponent(email)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (!response.ok) return NextResponse.json(data, { status: response.status });

    // Backend returns ApiResponse<Boolean> where data field is the availability
    return NextResponse.json({ available: data.data });
  } catch (err: any) {
    return NextResponse.json({ error: "Backend unreachable" }, { status: 503 });
  }
}
