// src/app/api/users/route.ts
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

// GET all users
export async function GET() {
  const users = await prisma.user.findMany({
    include: {
      helper: true,
    },
  });
  return NextResponse.json(users);
}

// POST a new user
export async function POST(req: Request) {
  const payload = await req.json();
  const newUser = await prisma.user.create({
    data: {
      id: payload.data.id,
      gender: "undefined",
      fullName: payload.data.first_name + " " + payload.data.last_name,
      email: payload.data.email_addresses["0"].email_address,
      dateOfBirth: new Date(),
      identifyCard: "undefined",
      address: "undefined",
      phoneNumber: "undefined",
      status: "active",
      numberOfViolations: 0,
    }
  });
  return NextResponse.json(newUser);
}