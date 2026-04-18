import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  console.log(`[PROXY] Attempting registration for ${body.email} at ${BACKEND_URL}`);

  try {
    const response = await fetch(`${BACKEND_URL}/api/auth/owner/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    
    if (!response.ok) {
        return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (err: any) {
    console.error(`[PROXY] Backend connection failed: ${err.message}`);
    
    // MOCK SUCCESS for development if backend is down
    if (process.env.NODE_ENV === "development") {
        console.warn("[PROXY] [MOCK MODE] Returning successful registration mock because backend is UNREACHABLE.");
        return NextResponse.json({
            tenantId: "mock-tenant-id",
            slug: body.slug,
            ownerId: "mock-owner-id",
            trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
        });
    }

    return NextResponse.json({ error: "Backend server unreachable. Please make sure the API is running at " + BACKEND_URL }, { status: 503 });
  }
}
