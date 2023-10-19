import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const sessionId = request.cookies.get("session-id");
  const isLoggedIn = !!sessionId;

  if (isLoggedIn && request.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isLoggedIn && !request.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (!isLoggedIn && request.nextUrl.pathname.startsWith("/my-page")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: [
    "/my-page/:path*",
    "/add-recipe/:path*",
    "/edit-recipe/:path*",
    "/admin/:path*",
    "/auth/:path*",
  ],
};
