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

    const order = await Order.findById(orderId);

    if (!order) {
      return NextResponse.json(formatResponse(false, null, "Order not found"), {
        status: 404,
      });
    }

    // Ensure timestamp is converted to Date objects if they are strings
    order.order_status.forEach((status) => {
      status.timestamp = new Date(status.timestamp);
    });

    // Log the order_status before sorting for debugging purposes
    console.log("Before sorting:", order.order_status);

    // Sort the order_status array by timestamp in descending order
    order.order_status.sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    );

    // Log the order_status after sorting for debugging purposes
    console.log("After sorting:", order.order_status);

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
