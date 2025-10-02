import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(req) {
  const token = await getToken({ req });
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/admin")) {
    if (!token || token.role !== "admin") {
      const url = new URL("/login", req.url);
      url.searchParams.set("error", "unauthorized");
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // protects all admin routes
};
