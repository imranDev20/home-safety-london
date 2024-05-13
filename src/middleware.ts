// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { rateLimitMiddleware } from "./app/api/_middleware/rate-limit";
import { authMiddleware } from "./app/api/_middleware/auth";

export async function middleware(req: NextRequest) {
  // Apply the rateLimitMiddleware first
  const rateLimitResponse = await rateLimitMiddleware(req);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  // Apply the authMiddleware next
  const authResponse = await authMiddleware(req);
  if (authResponse) {
    return authResponse;
  }

  // If both middleware functions allow the request to proceed,
  // call the next middleware or route handler
  return NextResponse.next();
}

export const config = {
  // Apply the middleware to all routes
  matcher: "/:path*",
};
