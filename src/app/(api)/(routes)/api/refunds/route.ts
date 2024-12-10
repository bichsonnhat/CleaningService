import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const role = searchParams.get("role");
  const userId = searchParams.get("userId");

  if (!role || !userId) {
    return NextResponse.json(
      { error: "role and userId are required" },
      { status: 400 }
    );
  }

  let refunds;

  if (role === "Admin") {
    refunds = await prisma.refund.findMany({
      orderBy: {
        created_at: "desc",
      },
      include: {
        booking: {
          select: {
            customer: {
              select: {
                fullName: true,
              },
            },
          },
        },
      },
    });
  } else if (role === "Customer") {
    refunds = await prisma.refund.findMany({
      orderBy: {
        created_at: "desc",
      },
      where: {
        booking: {
          customerId: userId,
        },
      },
      include: {
        booking: {
          select: {
            customer: {
              select: {
                fullName: true,
              },
            },
          },
        },
      },
    });
  } else {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  return NextResponse.json(refunds);
}

export async function POST(req: Request) {
  const data = await req.json();
  const newFeedback = await prisma.refund.create({
    data,
  });
  return NextResponse.json(newFeedback);
}
