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
  const data = await req.json();
  const newServiceCategory = await prisma.user.create({
    data,
  });
  return NextResponse.json(newServiceCategory);
}
