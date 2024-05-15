import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../_lib/dbConnect";
import User from "../../_models/User";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { user_id: string } }
) {
  try {
    await dbConnect();
    const { user_id } = params;
    const data = await req.json();

    const user = await User.findByIdAndUpdate(user_id, data, {
      new: true,
    });

    return NextResponse.json({
      success: true,
      message: "Your profile has been updated successfully!",
      data: user,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
