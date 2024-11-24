import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const feedback = await prisma.feedback.findMany();
  return NextResponse.json(feedback);
}

export async function POST(req: Request) {
  const data = await req.json();
  const newFeedback = await prisma.feedback.create({
    data,
  });
  return NextResponse.json(newFeedback);
}
