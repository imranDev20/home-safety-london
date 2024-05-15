import dbConnect from "@/app/api/_lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Testimonial from "../../_models/Testimonial";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { testimonial_id: string } }
) {
  try {
    await dbConnect();
    const testimonialId = params.testimonial_id;
    const { updates, userId } = await req.json();

    const testimonial = await Testimonial.findById(testimonialId);

    if (!testimonial || testimonial.user.toString() !== userId) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to update this testimonial",
        },
        { status: 403 }
      );
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      testimonialId,
      updates,
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Testimonial updated successfully",
      data: updatedTestimonial,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
