import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../_lib/dbConnect";
import User from "../../_models/User";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../../_lib/generateToken";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { name, email, password, role } = await req.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Please provide name, email, and password" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "customer",
    });
    await newUser.save();

    // Generate JWT
    const token = await generateAccessToken(newUser);

    const response = NextResponse.json({
      success: true,
      message: "User registered successfully",
      data: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });

    response.cookies.set("accessToken", token, {
      httpOnly: true, // Set the httpOnly flag to true
      maxAge: 60 * 60 * 24 * 7, // 1 week in seconds
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
