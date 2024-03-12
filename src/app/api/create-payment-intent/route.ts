import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// This is your test secret API key.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

function calculateTotal(numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

export async function POST(req: NextRequest) {
  try {
    const order = await req.json();

    const paymentIntent = await stripe.paymentIntents.create({
      currency: "gbp",
      amount:
        (calculateTotal([
          ...order.items.map((item: any) => item.price),
          order.zone.price,
          order.time.price,
        ]) +
          calculateTotal([
            ...order.items.map((item: any) => item.price),
            order.zone.price,
            order.time.price,
          ]) *
            0.2) *
        100,
      payment_method_types: ["link", "card", "paypal", "revolut_pay"],
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
