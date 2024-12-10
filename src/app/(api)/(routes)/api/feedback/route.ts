import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const role = searchParams.get("role");
  const userId = searchParams.get("userId");
  const reportedByString = searchParams.get("reportedBy");
  const reportedBy = reportedByString === "true" ? true : false;

  //  if (!role) {
  //    return NextResponse.json({ error: "Role is required" }, { status: 400 });
  //  }

  //  if (role === "Customer" && !userId) {
  //    return NextResponse.json(
  //      { error: "userId is required for Customer role" },
  //      { status: 400 }
  //    );
  //  }

  if (!role || !userId) {
    return NextResponse.json(
      { error: "role and userId are required" },
      { status: 400 }
    );
  }
  let feedback;

  if (role === "Customer") {
    // Lấy feedback theo customerId
    feedback = await prisma.feedback.findMany({
      where: {
        booking: {
          customerId: userId, // Lọc theo customerId
        },
        reportedBy: false,
      },
      include: {
        booking: {
          select: {
            customer: {
              select: {
                fullName: true,
              },
            },
            helper: {
              select: {
                user: {
                  select: {
                    fullName: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  } else if (role === "Admin") {
    // Lấy tất cả feedback
    feedback = await prisma.feedback.findMany({
      where: {
        reportedBy: reportedBy,
      },
      include: {
        booking: {
          select: {
            customer: {
              select: {
                fullName: true,
              },
            },
            helper: {
              select: {
                user: {
                  select: {
                    fullName: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  } else if (role === "Helper") {
    // Lấy feedback theo helperId
    feedback = await prisma.feedback.findMany({
      where: {
        booking: {
          helperId: userId,
        },
        reportedBy: true,
      },
      include: {
        booking: {
          select: {
            customer: {
              select: {
                fullName: true,
              },
            },
            helper: {
              select: {
                user: {
                  select: {
                    fullName: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  } else {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  return NextResponse.json(feedback);
}

export async function POST(req: Request) {
  const data = await req.json();
  const newFeedback = await prisma.feedback.create({
    data,
  });
  return NextResponse.json(newFeedback);
}
