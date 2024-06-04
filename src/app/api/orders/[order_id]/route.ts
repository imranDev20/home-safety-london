import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../_lib/dbConnect";
import Order from "../../_models/Order";
import { formatResponse } from "@/shared/functions";

export async function GET(
  req: NextRequest,
  { params }: { params: { order_id: string } }
) {
  try {
    await dbConnect();
    const orderId = params.order_id;

    // Fetch a single order from the database based on the provided orderId
    const order = await Order.findById(orderId);

    if (!order) {
      return NextResponse.json(formatResponse(false, null, "Order not found"), {
        status: 404,
      });
    }

    return NextResponse.json(
      formatResponse(true, order, "Order fetched successfully")
    );
  } catch (error: any) {
    return NextResponse.json(formatResponse(false, null, error.message), {
      status: 500,
    });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { order_id: string } }
) {
  try {
    await dbConnect();
    const orderId = params.order_id;

    // Get the request body containing the updated order data
    const updatedOrderData = await req.json();

    // Update the order in the database directly using findByIdAndUpdate
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      updatedOrderData,
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return NextResponse.json(formatResponse(false, null, "Order not found"), {
        status: 404,
      });
    }

    return NextResponse.json(
      formatResponse(true, updatedOrder, "Order updated successfully")
    );
  } catch (error: any) {
    return NextResponse.json(formatResponse(false, null, error.message), {
      status: 500,
    });
  }
}
