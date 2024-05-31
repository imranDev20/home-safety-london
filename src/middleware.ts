// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;

  const isAuthUserShouldNotAccess = ["login", "register"].some((path) =>
    req.nextUrl.pathname.includes(path)
  );

  if (isAuthUserShouldNotAccess) {
    if (accessToken) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  const restrictedPaths = ["/admin", "/account"];
  const isRestrictedPaths = restrictedPaths.some((path) =>
    req.nextUrl.pathname.includes(path)
  );

  if (isRestrictedPaths && !accessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (
    (req.nextUrl.pathname.includes("/admin") ||
      req.nextUrl.pathname.includes("/account")) &&
    !accessToken
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Specify the paths where the middleware should run
export const config = {
  matcher: ["/admin/:path*", "/login", "/register", "/account/:path*"],
};
