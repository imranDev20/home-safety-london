import dbConnect from "@/app/api/_lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import PreOrder from "../../_models/PreOrder";

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    await dbConnect();
    const preOrder = await req.json();

    const orderId = "66127fd3bd2086dd8d33cdab";

    const data = await PreOrder.findByIdAndUpdate(orderId, preOrder, {
      upsert: true,
      new: true,
    });

    return NextResponse.json(
      {
        status: "success",
        message: "Resource successfully retrieved",
        data: data,
      },
      {
        headers: {
          "Set-Cookie": `order_id=${orderId}; sameSite=strict; httpOnly=true; maxAge=60*1*1`,
        },
      }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
