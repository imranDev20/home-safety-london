import dbConnect from "@/app/api/_lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { calculatePreOrderTotalCost, formatResponse } from "@/shared/functions";
import Order from "../_models/Order";
import { sendEmail } from "../_lib/sendEmail";
import { placedOrderEmailHtml } from "../_templates/order-placed-email";
import PreOrder from "../_models/PreOrder";
import { IPreOrder } from "@/types/orders";
import mongoose, { Types } from "mongoose";
import {
  generateInvoiceId,
  generateInvoicePdfFromPreOrder,
} from "../_lib/generateInvoice";
import { IUser } from "@/types/user";
import { receivedOrderEmailHtml } from "../_templates/order-received-email";
import { validateToken } from "../_lib/validateToken";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { pre_order_id } = await req.json();

    if (!pre_order_id) {
      return NextResponse.json(
        formatResponse(false, null, "pre_order_id is required"),
        { status: 400 }
      );
    }

    const preOrder = (await PreOrder.findById(pre_order_id).populate(
      "personal_info.customer"
    )) as IPreOrder<IUser>;

    if (!preOrder) {
      return NextResponse.json(
        formatResponse(false, null, "PreOrder not found"),
        { status: 404 }
      );
    }

    if (
      !preOrder.service_info ||
      !preOrder.personal_info ||
      !preOrder.payment_info
    ) {
      return NextResponse.json(
        formatResponse(
          false,
          null,
          "PreOrder step missing: please ensure all service, personal, and payment information is provided."
        ),
        { status: 400 }
      );
    }

    const invoiceId = await generateInvoiceId();

    // Serialize the PDF document to a Uint8Array
    const pdfBytes = await generateInvoicePdfFromPreOrder(invoiceId, preOrder);
    const pdfBase64 = Buffer.from(pdfBytes).toString("base64");

    //needed this code to text and create the invoice
    // Define the path to save the PDF
    // const invoicesDir = path.join(process.cwd(), "public", "invoices");
    // if (!fs.existsSync(invoicesDir)) {
    //   fs.mkdirSync(invoicesDir, { recursive: true });
    // }
    // const pdfPath = path.join(invoicesDir, `invoice_${invoiceId}.pdf`);

    // // Save the PDF file to the public/invoices folder
    // fs.writeFileSync(pdfPath, Buffer.from(pdfBytes));

    const totalCost = calculatePreOrderTotalCost(preOrder);

    const newOrder = new Order({
      ...preOrder.service_info,
      ...preOrder.personal_info,
      customer: preOrder.personal_info.customer._id,
      ...preOrder.payment_info,
      remaining_amount: totalCost,
      paid_amount: 0,
      invoice_id: invoiceId,
    });
    await newOrder.save();

    const attachments = [
      {
        ContentType: "application/pdf",
        Filename: `invoice_${invoiceId}.pdf`,
        Base64Content: pdfBase64,
      },
    ];

    const { email = "", name = "" } = preOrder.personal_info.customer;

    const orderPlacedEmailSubject = `Your Order Has Been Placed: Confirmation #${invoiceId}`;
    // send email to customer
    await sendEmail({
      fromEmail: "info@londonhomesafety.co.uk",
      fromName: "London Home Safety",
      to: email,
      subject: orderPlacedEmailSubject,
      html: placedOrderEmailHtml(name, invoiceId),
      attachments: attachments,
    });

    const orderReceivedEmailSubject = `New Order Received: Order #${invoiceId} - Action Required`;
    // send email to admin
    await sendEmail({
      fromEmail: "info@londonhomesafety.co.uk",
      fromName: "London Home Safety",
      to: process.env.ADMIN_EMAIL as string,
      subject: orderReceivedEmailSubject,
      html: receivedOrderEmailHtml(newOrder.invoice_id, newOrder._id),
      attachments: attachments,
    });

    // Delete the pre order after order is complete
    await PreOrder.findByIdAndDelete(pre_order_id);

    const response = NextResponse.json(
      formatResponse(
        true,
        newOrder,
        "Order created successfully, PreOrder deleted, and invoice generated"
      )
    );

    response.cookies.set("bookingSession", "", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      expires: new Date(0),
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(formatResponse(false, null, error.message), {
      status: 500,
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { isValid, userId, userRole, response } = await validateToken(req);
    if (!isValid) {
      return response;
    }

    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const limit = 10;
    const skip = (page - 1) * limit;

    const searchTerm = req.nextUrl.searchParams.get("q") || "";
    const assignedTo = req.nextUrl.searchParams.get("assigned_to") || "";
    const orderStatus = req.nextUrl.searchParams.get("order_status") || "";
    const sortBy = req.nextUrl.searchParams.get("sort_by") || "createdAt";
    const sortOrder = req.nextUrl.searchParams.get("sort_order") || "desc";
    const customerId = req.nextUrl.searchParams.get("customer_id") || "";

    if (
      userRole !== "admin" &&
      (!customerId || new Types.ObjectId(customerId) !== userId)
    ) {
      return NextResponse.json(
        formatResponse(false, null, "Unauthorized access"),
        { status: 403 }
      );
    }

    // Create an aggregation pipeline
    const pipeline: any[] = [
      {
        $match: {
          ...(customerId
            ? { customer: new mongoose.Types.ObjectId(customerId) }
            : {}),
          ...(searchTerm && {
            $or: [
              { invoice_id: { $regex: searchTerm, $options: "i" } },
              { customer_name: { $regex: searchTerm, $options: "i" } },
              { email: { $regex: searchTerm, $options: "i" } },
              { phone: { $regex: searchTerm, $options: "i" } },
            ],
          }),
        },
      },
      {
        $addFields: {
          order_status: {
            $sortArray: {
              input: "$order_status",
              sortBy: { timestamp: -1 },
            },
          },
        },
      },
      {
        $addFields: {
          mostRecentStatus: {
            $arrayElemAt: ["$order_status", 0],
          },
        },
      },
      {
        $match: {
          ...(orderStatus ? { "mostRecentStatus.status": orderStatus } : {}),
          ...(assignedTo
            ? {
                "order_items.assigned_engineers": new mongoose.Types.ObjectId(
                  assignedTo
                ),
              }
            : {}),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "customer",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $unwind: {
          path: "$customer",
          preserveNullAndEmptyArrays: true,
        },
      },
      { $sort: { [sortBy]: sortOrder === "asc" ? 1 : -1 } },
      { $skip: skip },
      { $limit: limit },
    ];

    // Fetch orders from the database using the aggregation pipeline
    const orders = await Order.aggregate(pipeline).exec();

    // Create a pipeline for counting the documents
    const countPipeline = [
      ...pipeline.slice(0, -2), // Exclude $skip and $limit stages
      {
        $count: "totalCount",
      },
    ];
    // Fetch the total count from the database using the count pipeline
    const countResult = await Order.aggregate(countPipeline).exec();

    const totalCount = countResult[0]?.totalCount || 0;
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
