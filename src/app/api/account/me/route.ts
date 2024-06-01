import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/api/_lib/dbConnect";
import { verifyJWT } from "../../_lib/verifyJWT";
import User from "../../_models/User";

export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Get the JWT token from the HTTP-only cookie
    const token = req.cookies.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token missing" },
        { status: 401 }
      );
    }

    const decodedToken = verifyJWT(token);

    // Extract user ID from the decoded token
    const userId = (decodedToken as any)._id;

    // Find the user based on the user ID
    const user = await User.findById(userId);
    console.log(user);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Return the user information in the response
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
