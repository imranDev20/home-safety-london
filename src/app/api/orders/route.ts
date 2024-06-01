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
  doc.text("43 Felton Road, Barking, IG11 7YA, London", 190, 30, {
    align: "right",
  });
  doc.text(
    "Email: info@londonhomesafety.co.uk | Phone: (123) 456-7890",
    190,
    35,
    { align: "right" }
  );

  // Add invoice title and details
  doc.setFontSize(32);
  doc.text("INVOICE", 20, 60);
  doc.setFontSize(11);
  doc.text(`Invoice Number: ${invoiceId}`, 150, 80);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 85);
  doc.text(
    `Due Date: ${new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ).toLocaleDateString()}`,
    150,
    90
  );

  // Add billing and shipping address
  doc.text("Billing Address:", 20, 80);
  doc.text("John Doe", 20, 85);
  doc.text("1234 Elm Street", 20, 90);
  doc.text("Springfield, ST 12345", 20, 95);

  // Add table header
  doc.setFontSize(12);
  doc.text("Item", 20, 120);
  doc.text("Description", 60, 120);
  doc.text("Quantity", 120, 120);
  doc.text("Unit Price", 150, 120);
  doc.text("Total", 180, 120);
  doc.line(15, 125, 200, 125);

  // Add table content
  const items = [
    {
      item: "Product 1",
      description: "Description for product 1",
      quantity: 2,
      unitPrice: 50,
    },
    {
      item: "Product 2",
      description: "Description for product 2",
      quantity: 1,
      unitPrice: 100,
    },
  ];

  let currentY = 132;
  items.forEach((item) => {
    doc.text(item.item, 20, currentY);
    doc.text(item.description, 60, currentY);
    doc.text(item.quantity.toString(), 120, currentY);
    doc.text(item.unitPrice.toString(), 150, currentY);
    doc.text((item.quantity * item.unitPrice).toString(), 180, currentY);
    currentY += 10;
  });

  // Add total section
  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );
  const tax = 0;
  const total = subtotal + tax;

  doc.text("Subtotal:", 150, currentY + 10);
  doc.text(subtotal.toString(), 180, currentY + 10);
  // doc.text("Tax (10%):", 150, currentY + 20);
  // doc.text(tax.toString(), 180, currentY + 20);
  doc.text("Total:", 150, currentY + 20);
  doc.text(total.toString(), 180, currentY + 20);

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

    // Define the path to save the PDF
    const invoicesDir = path.join(process.cwd(), "public", "invoices");
    if (!fs.existsSync(invoicesDir)) {
      fs.mkdirSync(invoicesDir, { recursive: true });
    }
    const pdfPath = path.join(invoicesDir, `invoice_${invoiceId}.pdf`);

    // Save the PDF file to the public/invoices folder
    fs.writeFileSync(pdfPath, Buffer.from(pdfBytes));

    const { customer_name, email } = preOrder;
    // const totalCost = calculateTotalCost(preOrder);

    // const attachments = [
    //   {
    //     ContentType: "application/pdf",
    //     Filename: `invoice_${invoiceId}.pdf`,
    //     Base64Content: pdfBase64,
    //   },
    // ];

    // const orderPlacedEmailSubject = `Order Confirmation: #${invoiceId}`;
    // await sendEmail({
    //   fromEmail: "info@londonhomesafety.co.uk",
    //   fromName: "London Home Safety",
    //   to: email,
    //   subject: orderPlacedEmailSubject,
    //   html: placedOrderEmailHtml(customer_name, invoiceId),
    //   attachments: attachments,
    // });

    // const newOrder = new Order({
    //   ...preOrder.toObject(),
    //   remaining_amount: totalCost,
    //   paid_amount: 0,
    //   invoice_id: invoiceId,
    //
    // });

    // await newOrder.save();
    // await PreOrder.findByIdAndDelete(pre_order_id);

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
