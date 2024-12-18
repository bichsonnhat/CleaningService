// src/app/api/helpers/route.ts
import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { partialhelperSchema } from "./helper.schema";

// GET all helpers
export async function GET() {
  const helpers = await prisma.helper.findMany({
    include: {
      user: true,
    },
  });

  return NextResponse.json(helpers);
}

// POST a new helper
export async function POST(req: Request) {
  try {
    const body = await req.json(); // Lấy dữ liệu từ request body
    const { id } = body; // Giải nén id từ body
    
    // Kiểm tra id có tồn tại không
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json({ error: "User ID does not exist." }, { status: 404 });
    }

    const helper = await prisma.helper.create({
      data: { 
        id: user.id,
        salaryExpectation: 0
      },
    });

    console.log("Helper created successfully:", helper);
    return NextResponse.json(helper);
  } catch (error) {
    console.error("Error creating helper:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
