import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verify } from "jsonwebtoken"

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Check if the path starts with /student
  if (path.startsWith("/student")) {
    // Get the token from the cookies
    const token = request.cookies.get("student-token")?.value

    // If there's no token and the path is not login or register, redirect to login
    if (!token && !path.includes("/login") && !path.includes("/register")) {
      return NextResponse.redirect(new URL("/student/login", request.url))
    }

    // If there's a token and the path is login or register, redirect to dashboard
    if (token && (path.includes("/login") || path.includes("/register"))) {
      return NextResponse.redirect(new URL("/student/dashboard", request.url))
    }

    // If there's a token, verify it
    if (token) {
      try {
        verify(token, process.env.JWT_SECRET || "your-secret-key")
      } catch (error) {
        // If token is invalid, redirect to login
        return NextResponse.redirect(new URL("/student/login", request.url))
      }
    }
  }

  return NextResponse.next()
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: ["/student/:path*"],
} 