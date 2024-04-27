import dbConnect from "@/app/api/_lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import PreOrder from "../_models/PreOrder";

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ name: "user" });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// export async function PATCH(req: NextRequest) {
//   try {
//     await dbConnect();
//     const { email } = await req.json();

//     const user = await PreOrder.findOne({ email });

//     return NextResponse.json({
//       success: true,
//       message: "Your profile has been updated successfully!",
//       data: user,
//     });
//   } catch (error: any) {
//     console.log(error);
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
// }
