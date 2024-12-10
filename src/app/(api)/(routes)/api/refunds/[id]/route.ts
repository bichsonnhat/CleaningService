import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const refund = await prisma.refund.findUnique({
      where: {
        id: params.id,
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
    if (!refund) {
      return NextResponse.json({ error: "Refund not found" }, { status: 404 });
    }
    return NextResponse.json(refund);
  } catch (error) {
    console.error("Error fetching refund: ", error);

    return NextResponse.json(
      { error: "Failed to fetch refund" },
      { status: 500 }
    );
  }
}

// export async function PUT(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const data = await req.json();

//     const updateRefund = await prisma.refund.update({
//       where: {
//         id: params.id,
//       },
//       data,
//     });

//     return NextResponse.json(updateRefund);
//   } catch (error) {
//     console.error("Error updating refund: ", error);
//     return NextResponse.json(
//       { error: "Failed to update refund" },
//       { status: 500 }
//     );
//   }
// }
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();

    const result = await prisma.$transaction(async (tx) => {
      const updatedRefund = await tx.refund.update({
        where: {
          id: params.id,
        },
        data,
      });

      if (data.status === "refunded" || data.status === "declined") {
        const newBookingStatus =
          data.status === "refunded" ? "refunded" : "declined";

        await tx.booking.update({
          where: {
            id: updatedRefund.booking_id,
          },
          data: {
            status: newBookingStatus,
          },
        });
      }

      return updatedRefund;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating refund or booking: ", error);
    return NextResponse.json(
      { error: "Failed to update refund or booking" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const refund = await prisma.refund.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json(refund);
  } catch (error) {
    console.error("Error deleting refund:", error);
    return NextResponse.json(
      { error: "Failed to delete refund" },
      { status: 500 }
    );
  }
}
