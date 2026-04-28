import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const host = req.headers.get('host') || '';

  // Define the base domain (e.g., gmmx.app or localhost:3000)
  // In production this would be 'gmmx.app'
  const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN || 'localhost:3000';
  
  // Extract subdomain
  // Example: ironfit.localhost:3000 -> subdomain = ironfit
  // Example: gmmx.app -> subdomain = ''
  let subdomain = '';
  if (host.includes(baseDomain) && host !== baseDomain) {
    subdomain = host.replace(`.${baseDomain}`, '');
  }

  // Skip middleware if no subdomain or if it's a common prefix like 'www'
  if (!subdomain || subdomain === 'www') {
    return NextResponse.next();
  }

  // Exclude internal paths, API routes, and static assets from rewriting
  const internalPaths = ['/api', '/_next', '/static', '/favicon.ico', '/public'];
  if (internalPaths.some(path => url.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Rewrite to the tenant-specific route
  // subdomain.gmmx.app/about -> gmmx.app/(tenant)/subdomain/about
  return NextResponse.rewrite(new URL(`/(tenant)/${subdomain}${url.pathname}`, req.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
