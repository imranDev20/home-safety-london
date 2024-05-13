// middleware/rateLimit.ts
import { NextRequest, NextResponse } from "next/server";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

export async function rateLimitMiddleware(req: NextRequest) {
  const ip =
    req.ip || req.headers.get("x-forwarded-for") || req.socket.remoteAddress;

  if (ip) {
    try {
      await new Promise((resolve, reject) => {
        limiter(req, null, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(null);
          }
        });
      });
    } catch (err) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "Too many requests from this IP, please try again later",
        }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  return NextResponse.next();
}
