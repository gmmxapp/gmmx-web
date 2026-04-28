import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");

  if (!q || q.trim().length < 3) {
    return NextResponse.json([]);
  }

  try {
    // Switching to Photon API (built on OSM data) for better search/autocomplete performance
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&limit=5`;
    console.log("Proxying request to Photon:", url);
    
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!res.ok) {
      console.error("Photon upstream error:", res.status);
      return NextResponse.json({ error: "Location service temporarily unavailable" }, { status: res.status });
    }

    const data = await res.json();
    
    // Map Photon features to a structure compatible with our frontend (matching Nominatim style)
    const mappedResults = data.features.map((f: any) => {
      const p = f.properties;
      const name = p.name || "";
      const details = [p.city || p.town || p.village, p.state, p.country].filter(Boolean).join(", ");
      return {
        display_name: name + (details ? `, ${details}` : ""),
        lat: f.geometry.coordinates[1],
        lon: f.geometry.coordinates[0],
      };
    });

    return NextResponse.json(mappedResults);
  } catch (error: any) {
    console.error("Location Search Proxy Error:", error);
    return NextResponse.json({ 
      error: "Failed to connect to location service", 
      details: error.message 
    }, { status: 500 });
  }
}
