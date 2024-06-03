// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJWT } from "./app/api/_lib/verifyJWT";
import {
  JWTClaimValidationFailedError,
  JWTExpiredError,
  JWTMalformedError,
  JWTVerificationFailedError,
} from "./shared/errors";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if the route is an admin route
  const adminRoutes = ["/admin"];
  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    const token = req.cookies.get("accessToken")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login?error=no_token", req.url));
    }

    try {
      const decodedToken = await verifyJWT(token);

      if (decodedToken.role !== "admin") {
        return NextResponse.redirect(
          new URL("/login?error=unauthorized", req.url)
        );
      }
    } catch (error) {
      if (error instanceof JWTExpiredError) {
        return NextResponse.redirect(new URL("/login?error=expired", req.url));
      }
      if (
        error instanceof JWTMalformedError ||
        error instanceof JWTClaimValidationFailedError
      ) {
        return NextResponse.redirect(
          new URL("/login?error=invalid_token", req.url)
        );
      }
      if (error instanceof JWTVerificationFailedError) {
        return NextResponse.redirect(
          new URL("/login?error=verification_failed", req.url)
        );
      }
      return NextResponse.redirect(new URL("/login?error=unknown", req.url));
    }
  }

  return NextResponse.next();
}

// Specify the paths where the middleware should run
export const config = {
  matcher: ["/admin/:path*"],
};
