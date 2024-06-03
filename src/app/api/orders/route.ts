import dbConnect from "@/app/api/_lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { calculateTotalCost, formatResponse } from "@/shared/functions";
import PreOrder, { IOrderItem, IPreOrder } from "../_models/PreOrder";
import Order from "../_models/Order";
import { jsPDF } from "jspdf";
import { Readable } from "stream";
import { sendEmail } from "../_lib/sendEmail";
import { placedOrderEmailHtml } from "../_templates/order-placed-email";
import fs from "fs";
import path from "path";
import {
  ADDRESS,
  CONGESTION_ZONE_OPTIONS,
  EMAIL_ADDRESS,
  PARKING_OPTIONS,
  PHONE_NO,
} from "@/shared/constants";

interface OrderQuery {
  order_status?: string;
}

async function generateInvoiceId() {
  const mostRecentOrder = await Order.findOne().sort({ createdAt: -1 }).exec();

  let nextInvoiceId;
  if (mostRecentOrder) {
    const numericPart = parseInt(mostRecentOrder.invoice_id.slice(3, -1), 10);
    const alphabetPart = mostRecentOrder.invoice_id.slice(-1);

    let nextNumericPart = numericPart + 1;

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
    nextInvoiceId = "INV00001A";
  }

  return nextInvoiceId;
}

async function generateInvoicePdf(invoiceId: string, preOrder: IPreOrder) {
  const doc = new jsPDF();

  // Add header
  doc.setFontSize(18).setFont("helvetica", "bold");
  doc
    .text("London Home Safety", 190, 20, { align: "right" })
    .setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(ADDRESS, 190, 30, {
    align: "right",
  });
  doc.text(`Email: ${EMAIL_ADDRESS}`, 190, 35, { align: "right" });
  doc.text(`Phone: ${PHONE_NO}`, 190, 40, { align: "right" });

  // Add invoice title and details
  doc.setFontSize(32);
  doc.text("INVOICE", 20, 60);
  doc.setFontSize(11);
  doc
    .setFont("helvetica", "bold")
    .text(`Invoice Number:`, 168, 80, { align: "right" })
    .setFont("helvetica", "normal");
  doc.text(`${invoiceId}`, 190, 80, { align: "right" });
  doc
    .setFont("helvetica", "bold")
    .text(`Date:`, 170, 85, { align: "right" })
    .setFont("helvetica", "normal");
  doc.text(`${new Date().toLocaleDateString()}`, 190, 85, { align: "right" });

  // Add billing and shipping address
  doc
    .setFont("helvetica", "bold")
    .text("Billing Address:", 20, 80)
    .setFont("helvetica", "normal");
  doc.text(preOrder.customer_name, 20, 90);
  doc.text(preOrder.address.house_street, 20, 95);
  doc.text(`${preOrder.address.postcode}, ${preOrder.address.city}`, 20, 100);

  // Add table header
  doc.setFontSize(12);
  doc.text("Service", 20, 120);
  doc.text("Quantity", 120, 120);
  doc.text("Total", 180, 120);
  doc.line(15, 125, 200, 125);

  let currentY = 132;
  preOrder.order_items.forEach((item) => {
    doc.text(item.title, 20, currentY);
    doc.text(`${item.quantity} ${item.unit}`, 120, currentY);
    doc.text(
      `£${(parseInt(item.quantity as string) * item.price).toString()}`,
      180,
      currentY
    );
    currentY += 10;
  });

  // Add total section
  const subtotal = preOrder.order_items.reduce(
    (sum, item) => sum + parseInt(item.quantity as string) * item.price,
    0
  );
  // use when tax is available
  // const tax = 0;
  // const total = subtotal + tax;

  const parkingOption = PARKING_OPTIONS.find(
    (opt) => opt.value === preOrder.parking_options.parking_type
  )?.name;

  const congestionOption = CONGESTION_ZONE_OPTIONS.find(
    (opt) => opt.value === preOrder.congestion_zone.zone_type
  )?.name;

  const totalCost = calculateTotalCost(preOrder);

  doc.text("Subtotal:", 150, currentY + 10);
  doc.text(`£${subtotal.toString()}`, 180, currentY + 10);
  doc.text(`Parking Charge (${parkingOption}):`, 166, currentY + 20, {
    align: "right",
  });
  doc.text(
    `£${preOrder.parking_options.parking_cost.toString()}`,
    180,
    currentY + 20
  );
  doc.text(
    `Congestion Zone Charge (${congestionOption}):`,
    166,
    currentY + 30,
    {
      align: "right",
    }
  );
  doc.text(
    `£${preOrder.congestion_zone.zone_cost.toString()}`,
    180,
    currentY + 30
  );
  doc
    .setFont("Helvetica", "bold")
    .text("Total (Incl. Tax):", 166, currentY + 40, { align: "right" });
  doc
    .setFont("Helvetica", "bold")
    .text(`£${totalCost.toString()}`, 180, currentY + 40)
    .setFont("Helvetica", "normal");

  // Add footer
  doc.setFontSize(10);
  doc.text("Terms and conditions apply.", 20, 280);
  doc.text("Thank you for your business!", 20, 290);

  // Return the PDF document as a Uint8Array
  return doc.output("arraybuffer");
}

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

    const preOrder = await PreOrder.findById(pre_order_id);
    if (!preOrder) {
      return NextResponse.json(
        formatResponse(false, null, "PreOrder not found"),
        { status: 404 }
      );
    }

    const invoiceId = await generateInvoiceId();

    const doc = new jsPDF();
    doc.setFontSize(30);
    doc.text("Invoice", 20, 20);
    doc.setFontSize(20);
    doc.text(`Invoice ID: ${invoiceId}`, 20, 50);
    doc.text("Thank you for your purchase!", 20, 80);

    // Serialize the PDF document to a Uint8Array
    const pdfBytes = await generateInvoicePdf(invoiceId, preOrder);
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

    const totalCost = calculateTotalCost(preOrder);

    const newOrder = new Order({
      ...preOrder.toObject(),
      remaining_amount: totalCost,
      paid_amount: 0,
      invoice_id: invoiceId,
    });

    await newOrder.save();
    await PreOrder.findByIdAndDelete(pre_order_id);

    const attachments = [
      {
        ContentType: "application/pdf",
        Filename: `invoice_${invoiceId}.pdf`,
        Base64Content: pdfBase64,
      },
    ];

    const { customer_name, email } = preOrder;

    const orderPlacedEmailSubject = `Order Confirmation: #${invoiceId}`;
    await sendEmail({
      fromEmail: "info@londonhomesafety.co.uk",
      fromName: "London Home Safety",
      to: email,
      subject: orderPlacedEmailSubject,
      html: placedOrderEmailHtml(customer_name, invoiceId),
      attachments: attachments,
    });

    return NextResponse.json(
      formatResponse(
        true,
        null,
        "Order created successfully, PreOrder deleted, and invoice generated"
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

    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const limit = 10;
    const skip = (page - 1) * limit;

    const searchTerm = req.nextUrl.searchParams.get("q") || "";
    const assignedTo = req.nextUrl.searchParams.get("assigned_to") || "";
    const orderStatus = req.nextUrl.searchParams.get("order_status") || "";
    const sortBy = req.nextUrl.searchParams.get("sort_by") || "createdAt";
    const sortOrder = req.nextUrl.searchParams.get("sort_order") || "desc";

    // Prepare the query object
    const query: any = {};

    // If a search term is provided, add it to the query
    if (searchTerm) {
      query.$or = [
        { invoice_id: { $regex: searchTerm, $options: "i" } },
        { customer_name: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
        { phone: { $regex: searchTerm, $options: "i" } },
      ];
    }

    // If a role is provided, add it to the query
    if (assignedTo) {
      query["order_items.assigned_engineers"] = assignedTo;
    }

    if (orderStatus) {
      query["order_status.status"] = orderStatus;
    }

    const sortObject: any = {};
    sortObject[sortBy] = sortOrder === "asc" ? 1 : -1;

    // Fetch users from the database with pagination, sorting, and optional search and role filtering
    const orders = await Order.find(query)
      .sort(sortObject)
      .skip(skip)
      .limit(limit)
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
