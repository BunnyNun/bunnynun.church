import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  // Keep the matcher simple, we will handle the logic inside
  matcher: ["/((?!api/|_next/|_static/|_vercel).*)"],
};

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  // --- FIX START: THE GUARD CLAUSE ---
  // If the request is for an asset, a file with an extension, or the favicon,
  // DO NOT rewrite it to a subdomain folder. Serve it from the root public folder.
  const isAsset = 
    url.pathname.startsWith('/assets') || 
    url.pathname.startsWith('/temp') || 
    url.pathname.includes('.') || // Matches .png, .jpg, .css, etc.
    url.pathname === '/favicon.ico';

  if (isAsset) {
    return NextResponse.next();
  }
  // --- FIX END ---

  // 1. Business
  if (hostname.includes("business.")) {
    url.pathname = `/business${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // 2. Tithe
  if (hostname.includes("tithe.") || hostname.includes("shop.")) {
    url.pathname = `/tithe${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // 3. Dev (Solomon)
  if (hostname.includes("dev.") || hostname.includes("solomon.")) {
    url.pathname = `/dev${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // 4. Lab
  if (hostname.includes("lab.")) {
    url.pathname = `/lab${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // 5. Library
  if (hostname.includes("library.") || hostname.includes("wiki.")) {
    url.pathname = `/library${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // 6. Confess (Asmodeus)
  if (hostname.includes("confess.") || hostname.includes("confessional.")) {
    url.pathname = `/confess${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // 7. Main Church (Default)
  url.pathname = `/church${url.pathname}`;
  return NextResponse.rewrite(url);
}