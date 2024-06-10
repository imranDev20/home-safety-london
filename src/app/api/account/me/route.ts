import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/api/_lib/dbConnect";
import { verifyJWT } from "../../_lib/verifyJWT";
import { generateAccessToken } from "../../_lib/generateToken";
import User from "../../_models/User";
import { JWTExpiredError } from "@/shared/errors";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    let token = req.cookies.get("accessToken")?.value;
    const refreshToken = req.cookies.get("refreshToken")?.value;

    console.log(token, "ACCESSTOKEN");
    console.log(refreshToken, "REFRESHTOKEN");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token missing" },
        { status: 401 }
      );
    }

    let decodedToken;

    try {
      decodedToken = await verifyJWT(token);
      console.log(decodedToken, "DECODED");
    } catch (error) {
      if (error instanceof JWTExpiredError && refreshToken) {
        try {
          const decodedRefreshToken = await verifyJWT(refreshToken);
          token = await generateAccessToken(decodedRefreshToken);
          decodedToken = await verifyJWT(token);

          // Set the new access token in the response cookies
          const response = NextResponse.next();
          response.cookies.set("accessToken", token, {
            httpOnly: true,
            maxAge: 60 * 15, // 15 minutes in seconds
            sameSite: "strict",
            path: "/",
            secure: process.env.NODE_ENV === "production", // Set secure flag in production
          });

          return response;
        } catch (refreshError) {
          return NextResponse.json(
            { success: false, message: "Invalid refresh token" },
            { status: 401 }
          );
        }
      } else {
        return NextResponse.json(
          { success: false, message: "Invalid or expired token" },
          { status: 401 }
        );
      }
    }

    const userId = decodedToken._id;
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "User information retrieved successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching user information",
      },
      { status: 500 }
    );
  }
}
