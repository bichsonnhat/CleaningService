import prisma from "@/lib/db";
import { NextResponse } from "next/server";

// Get all blacklisted users
export async function GET() {
  const blacklistedUsers = await prisma.blacklistedUser.findMany();
  return NextResponse.json(blacklistedUsers);
}

// Create a new blacklisted user
export async function POST(req: Request) {
  const data = await req.json();
  const newBlacklistedUser = await prisma.blacklistedUser.create({
    data,
  });
  return NextResponse.json(newBlacklistedUser);
}