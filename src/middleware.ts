import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel).*)"],
};

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  // ASSET GUARD
  const isAsset = 
    url.pathname.startsWith('/assets') || 
    url.pathname.startsWith('/temp') || 
    url.pathname.includes('.') || 
    url.pathname === '/favicon.ico';

  if (isAsset) return NextResponse.next();

  // 1. BUSINESS
  if (hostname.includes("business.")) {
    url.pathname = `/business${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // 2. SOLLY (Replaces Dev/Solomon)
  if (hostname.includes("solly.") || hostname.includes("solomon.") || hostname.includes("dev.")) {
    url.pathname = `/solly${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  /* DISABLED ROUTES
  if (hostname.includes("tithe.")) { ... }
  if (hostname.includes("confess.")) { ... }
  if (hostname.includes("lab.")) { ... }
  if (hostname.includes("library.")) { ... }
  */

  // 3. MAIN CHURCH (Default)
  url.pathname = `/church${url.pathname}`;
  return NextResponse.rewrite(url);
}