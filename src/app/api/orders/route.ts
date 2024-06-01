import dbConnect from "@/app/api/_lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { calculateTotalCost, formatResponse } from "@/shared/functions";
import PreOrder, { IOrderItem, IPreOrder } from "../_models/PreOrder";
import Order from "../_models/Order";
import fs from "fs";
import path from "path";
import { sendEmail } from "../_lib/sendEmail";
import { placedOrderEmailHtml } from "../_templates/order-placed-email";
import puppeteer from "puppeteer";
import { invoiceHtmlTemplate } from "../_templates/invoice-html";

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

async function generatePDFInvoice(htmlContent: string, invoicePdfPath: string) {
  try {
    // Launch a new browser instance
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set the HTML content
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    // Generate the PDF
    await page.pdf({ path: invoicePdfPath, format: "A4" });

    // Close the browser instance
    await browser.close();
  } catch (error) {
    console.error("Error generating PDF invoice:", error);
    throw error;
  }
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

    const { customer_name, email } = preOrder;
    const totalCost = calculateTotalCost(preOrder);

    const invoiceId = await generateInvoiceId();
    const invoicePdfPath = path.join(
      process.cwd(),
      `public/invoices/invoice_${invoiceId}.pdf`
    );
    const invoiceHtml = invoiceHtmlTemplate(customer_name);
    await generatePDFInvoice(invoiceHtml, invoicePdfPath);

    const attachments = [
      {
        ContentType: "application/pdf",
        Filename: `invoice_${invoiceId}.pdf`,
        Base64Content: fs.readFileSync(invoicePdfPath).toString("base64"),
      },
    ];

    const orderPlacedEmailSubject = `Order Confirmation: #${invoiceId}`;
    await sendEmail({
      fromEmail: "info@londonhomesafety.co.uk",
      fromName: "London Home Safety",
      to: email,
      subject: orderPlacedEmailSubject,
      html: placedOrderEmailHtml(customer_name, invoiceId),
      attachments: attachments,
    });

    // const newOrder = new Order({
    //   ...preOrder.toObject(),
    //   remaining_amount: totalCost,
    //   paid_amount: 0,
    //   invoice_id: invoiceId,
    //   invoice_path: invoicePath,
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
