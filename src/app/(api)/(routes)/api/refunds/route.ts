import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const refunds = await prisma.refund.findMany();
  return NextResponse.json(refunds);
}

export async function POST(req: Request) {
  const data = await req.json();
  const newFeedback = await prisma.refund.create({
    data,
  });
  return NextResponse.json(newFeedback);
}
