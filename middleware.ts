import { withAuth } from "next-auth/middleware";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
export default withAuth(
  function middleaware(req) {
    console.log(req.nextauth.token);
    if (req.nextUrl.pathname.startsWith("/") && req.nextauth.token?.role==='ADMIN') {
      return NextResponse.redirect(new URL('/admin/dashboard',req.url))
    }
    if (
      req.nextUrl.pathname.startsWith("/admin") ||
      (req.nextUrl.pathname.startsWith("api/events/create") &&
        req.nextauth.token?.role !== "ADMIN")
    ) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }
    if (req.nextUrl.pathname.startsWith("/auth") && req.nextauth.token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/api/events/create"],
};
