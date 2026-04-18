import { NextResponse } from "next/server";
import { fetchPublicGymProfile } from "@/lib/api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  try {
    // Attempt to fetch public profile. If it exists, the slug is taken.
    await fetchPublicGymProfile(slug);
    return NextResponse.json({ available: false });
  } catch (error: any) {
    // If it's a 404 or similar, it might be available.
    // Note: This is an estimation based on public profile visibility.
    return NextResponse.json({ available: true });
  }
}
