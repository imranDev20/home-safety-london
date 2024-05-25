import dbConnect from "@/app/api/_lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import PreOrder from "../_models/PreOrder";

export async function GET() {
  return NextResponse.json({ name: "user" });
}
