import dbConnect from "@/app/api/_lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import User from "../_models/User";
import { formatResponse } from "@/shared/functions";

export async function GET(req: NextRequest) {
  try {
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const limit = 10;
    const skip = (page - 1) * limit;

    const searchTerm = req.nextUrl.searchParams.get("q") || "";
    const role = req.nextUrl.searchParams.get("role") || "";

    // If a search term is provided, add it to the query
    if (searchTerm) {
      // Prepare the query object
      const query: any = {};

      query.$or = [
        { name: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
        { phone: { $regex: searchTerm, $options: "i" } },
      ];

      // Fetch users from the database with pagination, sorting, and search
      const users = await User.find(query, { password: 0 })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec();

      // Get the total number of users matching the search query
      const totalCount = await User.countDocuments(query);

      // Calculate the total number of pages
      const totalPages = Math.ceil(totalCount / limit);

      return NextResponse.json(
        formatResponse(true, users, "Users fetched successfully", {
          currentPage: page,
          totalPages,
          totalCount,
        }),
        { status: 200 }
      );
    }

    // Fetch users from the database with pagination and sort by creation date in descending order
    const users = await User.find({}, { password: 0 })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    // Get the total number of users
    const totalCount = await User.countDocuments({});

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json(
      formatResponse(true, users, "Users fetched successfully", {
        currentPage: page,
        totalPages,
        totalCount,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      formatResponse(false, null, "Failed to fetch users"),
      {
        status: 500,
      }
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
