import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  // Define Subdomains (Adjust for Localhost vs Production)
  // Prod: "lab.bunnynun.church"
  // Dev:  "lab.bunnynun.local:3000"
  
  const isLab = hostname.includes("lab.");
  const isLibrary = hostname.includes("library.");
  const isConfessional = hostname.includes("confessional.");
  const isTreasury = hostname.includes("treasury.");

  // 1. The Laboratory (Dr. Gnosis)
  if (isLab) {
    url.pathname = `/lab${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // 2. The Library (Alice)
  if (isLibrary) {
    url.pathname = `/library${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // 3. The Confessional (Asmodeus)
  if (isConfessional) {
    url.pathname = `/confessional${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // 4. The Treasury (Catherine)
  if (isTreasury) {
    url.pathname = `/treasury${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // 5. The Church (Bunny Nun - Default Fallback)
  url.pathname = `/church${url.pathname}`;
  return NextResponse.rewrite(url);
}