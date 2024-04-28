import dbConnect from "@/app/api/_lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import PreOrder from "../../_models/PreOrder";
import mongoose from "mongoose";

export async function PUT(
  req: NextRequest,
  { params }: { params: { pre_order_id: string } },
  res: NextResponse
) {
  try {
    await dbConnect();
    const preOrder = await req.json();
    const orderId = params.pre_order_id;

    const newObjectId =
      orderId === "undefined" ? new mongoose.Types.ObjectId() : null;

    const data = await PreOrder.updateOne(
      { _id: orderId !== "undefined" ? orderId : newObjectId },
      preOrder,
      {
        upsert: true,
        new: true,
      }
    );

    return NextResponse.json(
      {
        status: "success",
        message: "Resource successfully updated",
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

export async function GET(
  req: NextRequest,
  { params }: { params: { pre_order_id: string } },
  res: NextResponse
) {
  try {
    await dbConnect();
    const id = params.pre_order_id;

    const preOrder = await PreOrder.findById(id);

    return NextResponse.json({
      success: true,
      message: "Data fetched successfully!",
      data: preOrder,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
