import { type NextRequest, NextResponse } from "next/server";
import matchOrganizationRoute from "./lib/paths";

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
