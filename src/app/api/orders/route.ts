import dbConnect from "@/app/api/_lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { formatResponse } from "@/shared/functions";
import PreOrder from "../_models/PreOrder";
import Order from "../_models/Order";

interface OrderQuery {
  order_status?: string;
}

async function generateInvoiceId() {
  // Get the most recent order document from the database
  const mostRecentOrder = await Order.findOne().sort({ createdAt: -1 }).exec();

  let nextInvoiceId;
  if (mostRecentOrder) {
    // Extract the numeric part and the alphabet part from the most recent invoice ID
    const numericPart = parseInt(mostRecentOrder.invoice_id.slice(3, -1), 10);
    const alphabetPart = mostRecentOrder.invoice_id.slice(-1);

    // Increment the numeric part
    let nextNumericPart = numericPart + 1;

    // If the numeric part reaches the maximum value (99999), reset it to 00001 and increment the alphabet part
    if (nextNumericPart > 99999) {
      nextNumericPart = 1;
      const nextAlphabetPart = String.fromCharCode(
        alphabetPart.charCodeAt(0) + 1
      );
      if (nextAlphabetPart > "Z") {
        throw new Error("Reached the maximum invoice ID");
      }
      nextInvoiceId = `INV${
        "00001".slice(0, -nextNumericPart.toString().length) + nextNumericPart
      }${nextAlphabetPart}`;
    } else {
      nextInvoiceId = `INV${
        "00000".slice(0, -nextNumericPart.toString().length) + nextNumericPart
      }${alphabetPart}`;
    }
  } else {
    // If there are no orders in the database, start with INV00001A
    nextInvoiceId = "INV00001A";
  }

  return nextInvoiceId;
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const {
      pre_order_id,
      remaining_amount,
      paid_amount,
      order_status,
      order_items,
    } = await req.json();

    if (!pre_order_id) {
      return NextResponse.json(
        formatResponse(false, null, "pre_order_id is required"),
        { status: 400 }
      );
    }

    // Find the PreOrder by ID
    const preOrder = await PreOrder.findById(pre_order_id);
    if (!preOrder) {
      return NextResponse.json(
        formatResponse(false, null, "PreOrder not found"),
        { status: 404 }
      );
    }

    console.log(preOrder);

    // Generate a unique invoice_id
    const invoiceId = await generateInvoiceId();

    // Create the new Order
    const newOrder = new Order({
      ...preOrder.toObject(), // Copy all fields from PreOrder
      remaining_amount,
      paid_amount,
      order_status,
      order_items,
      invoice_id: invoiceId, // Set the generated invoice_id
    });

    // Save the new Order
    await newOrder.save();

    // Delete the PreOrder document
    await PreOrder.findByIdAndDelete(pre_order_id);

    return NextResponse.json(
      formatResponse(
        true,
        newOrder,
        "Order created successfully, and PreOrder deleted"
      )
    );
  } catch (error: any) {
    return NextResponse.json(formatResponse(false, null, error.message), {
      status: 500,
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const orderStatus = searchParams.get("order_status");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const query: OrderQuery = {};
    if (orderStatus) {
      query.order_status = orderStatus;
    }

    const orders = await Order.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();

    const totalCount = await Order.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json(
      formatResponse(true, orders, "Orders fetched successfully", {
        currentPage: page,
        totalPages,
        totalCount,
      })
    );
  } catch (error: any) {
    return NextResponse.json(formatResponse(false, null, error.message), {
      status: 500,
    });
  }
}
