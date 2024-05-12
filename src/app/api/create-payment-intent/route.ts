import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PreOrder } from "../_models/PreOrder";

// This is your test secret API key.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

function calculateTotal(numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

export async function POST(req: NextRequest) {
  try {
    const order: PreOrder = await req.json();

    const normalizedEmail = order.email.trim().toLowerCase();
    const customers = await stripe.customers.list({ email: normalizedEmail });
    let customer;

    if (customers.data.length > 0) {
      customer = customers.data[0];
    } else {
      customer = await stripe.customers.create({
        name: order.customer_name,
        email: normalizedEmail,
        phone: order.phone_no,
        address: {
          city: order.address.city,
          postal_code: order.address.postcode,
          line1: order.address.house_street,
          country: "GB",
        },
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      customer: customer.id,
      currency: "gbp",
      amount: 12000,
      payment_method_types: ["card", "customer_balance"],
      // automatic_payment_methods: {
      //   enabled: true,
      // },
      payment_method_data: {
        type: "customer_balance",
      },
      payment_method_options: {
        customer_balance: {
          funding_type: "bank_transfer",
          bank_transfer: {
            type: "gb_bank_transfer",
          },
        },
      },
      return_url: "http://localhost:3000",
      confirm: true,
      description: "Thanks for your purchase!",
    });

    if (paymentIntent.client_secret) {
      return NextResponse.json(
        {
          clientSecret: paymentIntent.client_secret,
          orderId: paymentIntent.id,
        },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        {
          message: "Payment intent not found",
        },
        {
          status: 404,
        }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
