import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("sas_session")?.value;

  const protectedRoutes = ["/dashboard"];
  const publicRoutes = ["/signin", "/signup", "/action", "/forgotpassword"];

  const pathname = req.nextUrl.pathname;

  // 1️⃣ If route is protected and user has no session → redirect to /signin
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));
  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // 2️⃣ If route is public and user IS logged in → redirect to /dashboard
  const isPublic = publicRoutes.some(route => pathname.startsWith(route));
  if (isPublic && session) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // 3️⃣ Otherwise, allow access
  return NextResponse.next();
}

export const config = {
  // Apply to all routes you want middleware to check
  matcher: ["/dashboard/:path*", "/signin", "/signup", "/action", "/forgotpassword"],
};
