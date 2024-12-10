import { BookingStatus } from "@/components/quickpopup/QuickPopupAdmin";
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

// export async function POST(req: Request) {
//   const data = await req.json();
//   const newFeedback = await prisma.refund.create({
//     data,
//   });
//   return NextResponse.json(newFeedback);
// }

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.booking_id) {
      return NextResponse.json(
        { error: "Missing booking_id in request body" },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      const newRefund = await tx.refund.create({
        data,
      });

      await tx.booking.update({
        where: { id: data.booking_id },
        data: { status: "requested" },
      });

      return newRefund;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating refund:", error);
    return NextResponse.json(
      { error: "Failed to create refund" },
      { status: 500 }
    );
  }
}
