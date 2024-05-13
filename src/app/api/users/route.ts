import dbConnect from "@/app/api/_lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import User from "../_models/User";

export async function GET(req: NextRequest, res: NextResponse) {
  return NextResponse.json({ name: "user" });
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const user = await req.json();

    await User.create(user);
    const data = await User.find({}).exec();

    return NextResponse.json({ name: data });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();
    const { email } = await req.json();

    const user = await User.findOne({ email });

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
