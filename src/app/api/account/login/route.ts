import dbConnect from "@/app/api/_lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import User from "../../_models/User";
import bcrypt from "bcrypt";
import { generateToken } from "../../_lib/generateToken";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { email, password } = await req.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Please provide email and password" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken(user);

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    response.cookies.set("accessToken", token, {
      httpOnly: true, // Set the httpOnly flag to true
      maxAge: 60 * 60 * 24, // 1 day in seconds
      sameSite: "strict",
      path: "/", // Set the path for the cookie
    });

    return response;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
