import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Import your env configuration

export async function middleware(request: NextRequest) {
  // Add a new header x-current-path which passes the path to downstream components
  const headers = new Headers(request.headers);
  headers.set("x-current-path", request.nextUrl.pathname);

  // Check for authentication using the session token cookie
  const sessionToken = request.cookies.get("next-auth.session-token")?.value;
  const { pathname } = request.nextUrl;

  // Define public routes that don't require authentication
  const publicRoutes = ["/", "/login"];

  if (sessionToken) {
    // User is logged in
    if (publicRoutes.includes(pathname)) {
      // Redirect logged-in users from public routes to /menus
      return NextResponse.redirect(new URL("/menus", request.url));
    }
  } else {
    // User is not logged in
    if (!publicRoutes.includes(pathname)) {
      // Redirect non-authenticated users to login page
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // If no redirects were triggered, continue with the request
  return NextResponse.next({ headers });
}

export const config = {
  matcher: [
    // match all routes except static files, APIs, and auth routes
    "/((?!api|_next/static|_next/image|favicon.ico|auth).*)",
  ],
};
