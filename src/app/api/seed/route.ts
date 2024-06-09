import { faker } from "@faker-js/faker";
import mongoose, { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { formatResponse } from "@/shared/functions";
import dbConnect from "../_lib/dbConnect";
import PreOrder from "../_models/PreOrder";
import Order from "../_models/Order";
import { ORDER_STATUS } from "@/shared/constants";
import { IOrder, IPreOrder, OrderStatusValues } from "@/types/orders";

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
      const fakePreOrder: IPreOrder = {
        service_info: {
          property_type: faker.helpers.arrayElement([
            "residential",
            "commercial",
          ]),
          resident_type: faker.helpers.arrayElement(["house", "hmo", "flat"]),
          bedrooms: faker.datatype.number({ min: 1, max: 10 }),
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
        },

        personal_info: {
          //change to faker options here
          customer: new Types.ObjectId("665faebaf5bd0c37f6fa2ef5"),
          parking_options: {
            parking_cost: faker.datatype.number({ min: 5, max: 5 }),
            parking_type: faker.helpers.arrayElement([
              "paid",
              "unavailable",
              "free",
            ]),
          },
          congestion_zone: {
            zone_cost: faker.datatype.number({ min: 5, max: 20 }),
            zone_type: faker.helpers.arrayElement([
              "congestion",
              "non_congestion",
            ]),
          },
          order_notes: faker.lorem.sentences(2).substring(0, 250),
          inspection_date: faker.date.anytime(),
          inspection_time: faker.helpers.arrayElement([
            "8 AM - 12 PM",
            "12 PM - 4 PM",
            "4 PM - 8 AM",
          ]),
        },

        payment_info: {
          payment_method: faker.helpers.arrayElement([
            "credit_card",
            "cash_to_engineer",
            "bank_transfer",
          ]),
        },

        status: "payment",

        // Add more fake data for other fields as needed
      };

      // Create a new PreOrder document
      const preOrder = await PreOrder.create(fakePreOrder);

      // Generate fake data for Order
      const fakeOrder: IOrder = {
        ...preOrder.toObject(), // Spread the preOrder document
        order_status: [
          {
            status: faker.helpers.arrayElement(
              ORDER_STATUS
            ) as OrderStatusValues,
            timestamp: new Date(),
          },
        ],
        remaining_amount: faker.datatype.number({ min: 100, max: 1000 }),
        paid_amount: faker.datatype.number({ min: 10, max: 500 }),
        invoice_id: await generateInvoiceId(), // Generate the invoice ID
        order_items: preOrder.service_info.order_items.map((item) => ({
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
