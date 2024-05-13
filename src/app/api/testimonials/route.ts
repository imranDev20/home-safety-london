import dbConnect from "@/app/api/_lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Testimonial from "../_models/Testimonial";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const userId = req.nextUrl.searchParams.get("userId");
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const limit = 10; // Number of testimonials per page
    const skip = (page - 1) * limit; // Number of testimonials to skip

    let testimonials;

    if (userId) {
      testimonials = await Testimonial.find({ user: userId })
        .skip(skip)
        .limit(limit);
    } else {
      testimonials = await Testimonial.find().skip(skip).limit(limit);
    }

    const totalCount = await Testimonial.countDocuments(
      userId ? { user: userId } : {}
    );
    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      success: true,
      data: testimonials,
      message: "Testimonials fetched successfully",
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
      },
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { name, email, user, rating, content } = await req.json();

    const newTestimonial = new Testimonial({
      name,
      email,
      user,
      rating,
      content,
    });

    const savedTestimonial = await newTestimonial.save();

    return NextResponse.json({
      success: true,
      data: savedTestimonial,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
