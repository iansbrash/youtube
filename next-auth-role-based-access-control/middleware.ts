import { type NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
interface RouteMatch {
  isOrgRoute: boolean;
  uniqueOrganizationId?: string;
}

export const RESERVED_PATHS = new Set([
  "api",
  "_next",
  "favicon.ico",
  "sitemap.xml",
  "robots.txt",
  "organizations",
  "auth",
]);

function matchOrganizationRoute(pathname: string): RouteMatch {
  // Skip static and api routes immediately
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/" ||
    pathname === ""
  ) {
    return { isOrgRoute: false };
  }

  // Get the first path segment
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  if (!firstSegment) return { isOrgRoute: false };

  // Check if it's a reserved path
  if (RESERVED_PATHS.has(firstSegment.toLowerCase())) {
    return { isOrgRoute: false };
  }

  // If we get here, it's potentially an organization route
  return {
    isOrgRoute: true,
    uniqueOrganizationId: firstSegment,
  };
}

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const routeMatch = matchOrganizationRoute(pathname);

  const requestHeaders = new Headers(request.headers);

  if (routeMatch.uniqueOrganizationId) {
    requestHeaders.set("x-unique-org-id", routeMatch.uniqueOrganizationId);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
