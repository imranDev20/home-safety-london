// middleware/auth.ts
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export async function authMiddleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;

  if (!token) {
    return new NextResponse(
      JSON.stringify({ success: false, message: "Missing token" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach the decoded payload to the request object
    req.user = decoded;

    return NextResponse.next();
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ success: false, message: "Invalid token" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
}
