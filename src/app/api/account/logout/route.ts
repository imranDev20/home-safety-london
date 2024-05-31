import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/app/api/_lib/dbConnect";
import BlacklistedToken from "../../_models/BlacklistedToken";

export async function POST(req: NextRequest) {
  try {
    await dbConnect(); // Connect to the database

    // Get the token from the request cookies
    const token = req.cookies.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token missing" },
        { status: 401 }
      );
    }

    // Verify and decode the token
    try {
      jwt.verify(token!, process.env.JWT_SECRET!);
    } catch (err: any) {
      if (err.name === "JsonWebTokenError") {
        return NextResponse.json(
          { success: false, message: "Invalid token" },
          { status: 401 }
        );
      } else if (err.name === "TokenExpiredError") {
        return NextResponse.json(
          { success: false, message: "Token expired" },
          { status: 401 }
        );
      } else {
        return NextResponse.json(
          { success: false, message: "Token verification failed" },
          { status: 500 }
        );
      }
    }

    // Check if the token is already blacklisted
    const isBlacklisted = await BlacklistedToken.findOne({ token });
    if (isBlacklisted) {
      return NextResponse.json(
        { success: false, message: "Token already blacklisted" },
        { status: 400 }
      );
    }

    // Token is valid and not blacklisted, store it in the blacklist
    await BlacklistedToken.create({ token });

    // Remove the HTTP-only cookie by setting it with a past expiry date
    const response = NextResponse.json({
      success: true,
      message: "Logout successful",
    });

    response.cookies.set("accessToken", "", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      expires: new Date(0),
    });

    return response;
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "An error occurred while logging out" },
      { status: 500 }
    );
  }
}
