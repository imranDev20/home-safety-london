import dbConnect from "@/app/api/_lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import User from "../_models/User";

export async function GET(req: NextRequest) {
  try {
    // Get the page number from the query parameter
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const limit = 20; // Number of users per page
    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    // Fetch users from the database with pagination and sort by creation date in descending order
    const users = await User.find({})
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .skip(skip)
      .limit(limit)
      .exec();

    // Get the total number of users
    const totalUsers = await User.countDocuments({});

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalUsers / limit);

    return NextResponse.json(
      {
        success: true,
        message: "Users fetched successfully",
        data: users,
        pagination: {
          currentPage: page,
          totalPages,
          totalUsers,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const userData = await req.json();
    const newUser = await User.create(userData);

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
