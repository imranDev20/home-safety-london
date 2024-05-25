import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/app/api/_lib/dbConnect";
import BlacklistedToken from "../_models/BlackListedToken";

export async function POST(req: NextRequest) {
  try {
    await dbConnect(); // Connect to the database

    // Get the token from the request headers
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json(
        { success: false, message: "Authorization header missing" },
        { status: 401 }
      );
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(" ")[1];

    // Verify and decode the token
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });

    // Token is valid, store it in the blacklist
    await BlacklistedToken.create({ token });

    return NextResponse.json({ success: true, message: "Logout successful" });
  } catch (error: any) {
    if (error.code === 11000) {
      // Duplicate key error
      return NextResponse.json(
        { success: false, message: "Token has already been blacklisted" },
        { status: 400 }
      );
    } else if (error.name === "JsonWebTokenError") {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    } else if (error.name === "TokenExpiredError") {
      return NextResponse.json(
        { success: false, message: "Token expired" },
        { status: 401 }
      );
    }

    console.log(error);
    return NextResponse.json(
      { success: false, message: "An error occurred while logging out" },
      { status: 500 }
    );
  }
}
