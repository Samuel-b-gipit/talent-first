import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "session_token";
const ROLE_COOKIE = "user_role";

// Routes that require authentication
const PROTECTED_ROUTES = [
  "/proposals",
  "/create-profile",
  "/profile",
  "/recommendations",
  "/browse-talent",
  "/search",
  "/send-proposal",
  "/proposal-success",
  "/employer",
];

// Routes only for EMPLOYER role
const EMPLOYER_ONLY_ROUTES = [
  "/employer",
  "/browse-talent",
  "/search",
  "/send-proposal",
  "/proposal-success",
  "/recommendations",
];

// Routes only for TALENT role
const TALENT_ONLY_ROUTES = ["/proposals", "/create-profile"];

// Routes that redirect authenticated users away (login, signup)
const AUTH_ROUTES = ["/login", "/signup"];

function matchesRoute(pathname: string, routes: string[]) {
  return routes.some((route) => pathname.startsWith(route));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get(SESSION_COOKIE)?.value;
  const userRole = request.cookies.get(ROLE_COOKIE)?.value;
  const isAuthenticated = !!sessionToken;

  // Redirect authenticated users away from login/signup
  if (isAuthenticated && matchesRoute(pathname, AUTH_ROUTES)) {
    const destination =
      userRole === "EMPLOYER" ? "/employer/dashboard" : "/recommendations";
    return NextResponse.redirect(new URL(destination, request.url));
  }

  // Redirect unauthenticated users to login
  if (!isAuthenticated && matchesRoute(pathname, PROTECTED_ROUTES)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Role-based access control (only if authenticated)
  if (isAuthenticated && userRole) {
    if (
      userRole === "TALENT" &&
      matchesRoute(pathname, EMPLOYER_ONLY_ROUTES)
    ) {
      return NextResponse.redirect(new URL("/proposals", request.url));
    }

    if (
      userRole === "EMPLOYER" &&
      matchesRoute(pathname, TALENT_ONLY_ROUTES)
    ) {
      return NextResponse.redirect(
        new URL("/employer/dashboard", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static, _next/image (Next.js assets)
     * - favicon.ico, public files
     * - /api routes (handled by API guards)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api/).*)",
  ],
};
