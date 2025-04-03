import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verify } from "jsonwebtoken"

export function middleware(request: NextRequest) {
  // Check if the request is for a student route
  if (request.nextUrl.pathname.startsWith("/student")) {
    // Skip middleware for login and register pages
    if (
      request.nextUrl.pathname === "/student/login" ||
      request.nextUrl.pathname === "/student/register"
    ) {
      return NextResponse.next()
    }

    // Get token from cookie
    const token = request.cookies.get("student-token")?.value

    if (!token) {
      return NextResponse.redirect(new URL("/student/login", request.url))
    }

    try {
      // Verify token
      verify(token, process.env.JWT_SECRET || "your-secret-key")
      return NextResponse.next()
    } catch (error) {
      // Token is invalid
      return NextResponse.redirect(new URL("/student/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/student/:path*"],
} 