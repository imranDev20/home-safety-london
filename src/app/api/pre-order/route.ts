import dbConnect from "@/app/api/_lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import PreOrder from "../_models/PreOrder";
import mongoose from "mongoose";
import { formatResponse } from "@/shared/functions";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await dbConnect();
    const { status, ...data } = await req.json();

    let preOrder;
    switch (status) {
      case "service":
        // Validate and handle the customer information step
        preOrder = new PreOrder({
          service_info: data.service_info,
          status: "service",
        });
        await preOrder.save();
        break;
      case "personal":
        // Validate and handle the product information step
        if (!data._id) {
          throw new Error("Missing _id for personal step");
        }

        console.log(data);

      // Create a user or find him,

      // preOrder = await PreOrder.findById(data._id);
      // preOrder = new PreOrder({
      //   service_info: data.service_info,
      //   personal_info: data.personal_info,
      //   status: "personal",
      // });

      // await preOrder.save();
      // break;
      case "payment":
        // Find the existing pre-order by id and update with shipping information
        if (!data._id) {
          throw new Error("Missing _id for payment step");
        }

        preOrder = await PreOrder.findById(data._id);
        preOrder = new PreOrder({
          service_info: data.service_info,
          personal_info: data.personal_info,
          payment_info: data.payment_info,
          status: "payment",
        });
        await preOrder.save();
        break;
      default:
        return NextResponse.json(
          {
            success: false,
            message: "Invalid step",
          },
          { status: 400 }
        );
    }

    return NextResponse.json(
      formatResponse(true, preOrder, "Order status updated")
    );
  } catch (error: any) {
    console.log(error);

    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(formatResponse(false, null, error.message), {
        status: 400,
      });
    }

    if (error.code === "ETIMEOUT") {
      return NextResponse.json(
        formatResponse(false, null, "Couldn't connect to database"),
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(formatResponse(false, null, error.message), {
      status: 500,
    });
  }
}
