import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../_lib/dbConnect";
import Order from "../../../_models/Order";
import { IOrder } from "@/types/orders";
import { IUser } from "@/types/user";
import { formatResponse } from "@/shared/functions";
import { generateInvoicePdfFromOrder } from "@/app/api/_lib/generateInvoice";

export async function GET(
  req: NextRequest,
  { params }: { params: { order_id: string } }
) {
  try {
    await dbConnect();

    const orderId = params.order_id;

    const order = (await Order.findById(orderId).populate({
      path: "customer",
      select: "-password", // Exclude the password field
    })) as IOrder<IUser>;

    const pdfBytes = await generateInvoicePdfFromOrder(order.invoice_id, order);
    const invoiceData = Buffer.from(pdfBytes).toString("base64");

    const response = {
      invoiceData,
    };

    return NextResponse.json(
      formatResponse(true, response, "Export orders successful!"),
      {
        headers: {
          "Content-Type": "application/json",
          "Content-Disposition": 'attachment; filename="invoice.pdf"',
        },
      }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to export orders" },
      { status: 500 }
    );
  }
}
