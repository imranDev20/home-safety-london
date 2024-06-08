import dbConnect from "@/app/api/_lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import PreOrder from "../../_models/PreOrder";
import mongoose from "mongoose";
import { formatResponse } from "@/shared/functions";

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
    return NextResponse.json(formatResponse(false, null, error.message), {
      status: 500,
    });
  }
}
