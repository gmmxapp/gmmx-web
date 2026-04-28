import { NextRequest, NextResponse } from "next/server";

const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "gmmx.app";

function getSlugFromHost(host: string): string | null {
  const normalized = host.split(":")[0].toLowerCase();

  if (normalized.endsWith(`.${ROOT_DOMAIN}`)) {
    return normalized.replace(`.${ROOT_DOMAIN}`, "");
  }

  if (normalized.includes(".localhost")) {
    return normalized.split(".")[0];
  }

  return null;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host") ?? "";
  const slug = getSlugFromHost(host);

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/pricing")
  ) {
    return NextResponse.next();
  }

  if (!slug || slug === "www" || slug === "app") {
    return NextResponse.next();
  }

  const rewriteUrl = request.nextUrl.clone();
  if (pathname === "/") {
    rewriteUrl.pathname = `/(tenant)/${slug}`;
  } else {
    rewriteUrl.pathname = `/(tenant)/${slug}${pathname}`;
  }
  return NextResponse.rewrite(rewriteUrl);
}

export const config = {
  matcher: ["/:path*"]
};
