import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { formatResponse } from "@/shared/functions";
import dbConnect from "../_lib/dbConnect";
import PreOrder from "../_models/PreOrder";
import Order from "../_models/Order";
import { ORDER_STATUS } from "@/shared/constants";

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

const engineerIds = ["66599ff0c12bf13c9113c422", "6659a3ebc12bf13c9113c442"];

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const orders = [];

    for (let i = 0; i < 100; i++) {
      // Generate fake data for PreOrder
      const fakePreOrder = {
        property_type: faker.helpers.arrayElement([
          "residential",
          "commercial",
        ]),
        resident_type: faker.helpers.arrayElement(["house", "hmo", "flat"]),
        bedrooms: faker.datatype.number({ min: 1, max: 10 }).toString(),
        order_items: Array.from(
          { length: faker.datatype.number({ min: 1, max: 7 }) },
          () => ({
            name: faker.commerce.productName(),
            title: faker.lorem.sentence(),
            price: faker.datatype.number({ min: 10, max: 1000 }),
            quantity: faker.datatype.number({ min: 1, max: 10 }),
            unit: faker.helpers.arrayElement(["pieces", "kg", "liters"]),
          })
        ),
        is_service_details_complete: faker.datatype.boolean(),
        customer_name: faker.name.fullName(),
        email: faker.internet.email(),
        phone_no: faker.phone.number(),
        payment_method: faker.helpers.arrayElement([
          "credit_card",
          "cash_to_engineer",
          "bank_transfer",
        ]),
        address: {
          house_street: faker.address.streetAddress(),
          postcode: faker.address.zipCode(),
          city: faker.address.city(),
        },
        // Add more fake data for other fields as needed
      };

      // Create a new PreOrder document
      const preOrder = await PreOrder.create(fakePreOrder);

      // Generate fake data for Order
      const fakeOrder = {
        ...preOrder.toObject(), // Spread the preOrder document
        order_status: [
          {
            status: faker.helpers.arrayElement(ORDER_STATUS),
            timestamp: new Date(),
          },
        ],
        remaining_amount: faker.datatype.number({ min: 100, max: 1000 }),
        paid_amount: faker.datatype.number({ min: 10, max: 500 }),
        invoice_id: await generateInvoiceId(), // Generate the invoice ID
        order_items: preOrder.order_items.map((item) => ({
          ...item,
          assigned_engineers: [],
        })),
      };

      // Create a new Order document
      const order = await Order.create(fakeOrder);
      orders.push(order);
    }

    return NextResponse.json(
      formatResponse(
        true,
        orders,
        `Seeded ${orders.length} orders successfully`
      )
    );
  } catch (error: any) {
    console.error("Error seeding orders:", error);
    return NextResponse.json(formatResponse(false, null, error.message), {
      status: 500,
    });
  } finally {
    await mongoose.disconnect();
  }
}
