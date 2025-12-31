import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  // 1. Business (Catherine)
  if (hostname.includes("business.")) {
    url.pathname = `/business${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // 2. Tithe (Eve - Payments)
  if (hostname.includes("tithe.") || hostname.includes("shop.")) {
    url.pathname = `/tithe${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // 3. Solomon (The Dev - Reviews/Torture)
  if (hostname.includes("dev.") || hostname.includes("solomon.")) {
    url.pathname = `/dev${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // 4. Lab (Dr. Vera Vapula)
  if (hostname.includes("lab.")) {
    url.pathname = `/lab${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // 5. Library (Alice)
  if (hostname.includes("library.") || hostname.includes("wiki.")) {
    url.pathname = `/library${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // 6. Confessional (Asmodeus)
  if (hostname.includes("confess.") || hostname.includes("confessional.") || hostname.includes("lust.")) {
    url.pathname = `/confess${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // 7. Main Church (All Characters - Default)
  url.pathname = `/church${url.pathname}`;
  return NextResponse.rewrite(url);
}