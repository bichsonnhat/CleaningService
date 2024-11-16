import prisma from "@/lib/db";
import { NextResponse } from "next/server";

// Get all helper_availability
export async function GET() {
  const helperAvailability = await prisma.helperAvailability.findMany();
  return NextResponse.json(helperAvailability);
}

// Create a new helper_availability
export async function POST(req: Request) {
  const data = await req.json();
  const newHelperAvailability = await prisma.helperAvailability.create({
    data,
  });
  return NextResponse.json(newHelperAvailability);
}