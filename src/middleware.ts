// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/app/api/_lib/dbConnect";
import BlacklistedToken from "./app/api/_models/BlackListedToken";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1];

  console.log(req);

  // if (!token) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  // Check if the token is blacklisted
  // const blacklistedToken = await BlacklistedToken.findOne({ token });
  // if (blacklistedToken) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  // try {
  //   jwt.verify(token, process.env.JWT_SECRET!);
  // } catch (error) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  return NextResponse.next();
}

// Specify the paths where the middleware should run
export const config = {
  matcher: ["/:path*"],
};
