import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/app/api/_lib/dbConnect";
import BlacklistedToken from "../../_models/BlacklistedToken";
import { formatResponse } from "@/shared/functions";

export async function POST(req: NextRequest) {
  try {
    await dbConnect(); // Connect to the database

    // Get the tokens from the request cookies
    const accessToken = req.cookies.get("accessToken")?.value;
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (!accessToken) {
      return NextResponse.json(
        { success: false, message: "Access token missing" },
        { status: 401 }
      );
    }

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: "Refresh token missing" },
        { status: 401 }
      );
    }

    // Verify and decode the access token
    try {
      jwt.verify(accessToken, process.env.JWT_SECRET!);
    } catch (err: any) {
      if (err.name === "JsonWebTokenError") {
        return NextResponse.json(
          { success: false, message: "Invalid access token" },
          { status: 401 }
        );
      } else if (err.name === "TokenExpiredError") {
        return NextResponse.json(
          { success: false, message: "Access token expired" },
          { status: 401 }
        );
      } else {
        return NextResponse.json(
          { success: false, message: "Access token verification failed" },
          { status: 500 }
        );
      }
    }

    // Verify and decode the refresh token
    try {
      jwt.verify(refreshToken, process.env.JWT_SECRET!);
    } catch (err: any) {
      if (err.name === "JsonWebTokenError") {
        return NextResponse.json(
          { success: false, message: "Invalid refresh token" },
          { status: 401 }
        );
      } else if (err.name === "TokenExpiredError") {
        return NextResponse.json(
          { success: false, message: "Refresh token expired" },
          { status: 401 }
        );
      } else {
        return NextResponse.json(
          { success: false, message: "Refresh token verification failed" },
          { status: 500 }
        );
      }
    }

    // Check if the access token is already blacklisted
    const isAccessTokenBlacklisted = await BlacklistedToken.findOne({
      token: accessToken,
    });
    if (isAccessTokenBlacklisted) {
      return NextResponse.json(
        { success: false, message: "Access token already blacklisted" },
        { status: 400 }
      );
    }

    // Check if the refresh token is already blacklisted
    const isRefreshTokenBlacklisted = await BlacklistedToken.findOne({
      token: refreshToken,
    });
    if (isRefreshTokenBlacklisted) {
      return NextResponse.json(
        { success: false, message: "Refresh token already blacklisted" },
        { status: 400 }
      );
    }

    // Tokens are valid and not blacklisted, store them in the blacklist
    await BlacklistedToken.create({ token: accessToken });
    await BlacklistedToken.create({ token: refreshToken });

    // Remove the HTTP-only cookies by setting them with a past expiry date
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

    response.cookies.set("refreshToken", "", {
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
      formatResponse(false, null, "An error occurred while logging out"),
      { status: 500 }
    );
  }
}
