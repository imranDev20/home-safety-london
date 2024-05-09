import dbConnect from "@/app/api/_lib/dbConnect";

import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ name: "user" });
}

export async function POST(req: NextRequest) {
  await dbConnect();

  //   const data = await Example.find({}).exec(); // Fetch all data from the Example collection

  return NextResponse.json({ name: "data" });
}
