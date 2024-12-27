import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const orderCode = body.orderCode;

    const booking = await prisma.booking.findFirst({
      where: {
        orderNumber: orderCode,
      },
    });

    const updatedBooking = await prisma.booking.update({
      where: {
        id: booking?.id,
      },
      data: {
        status: "cancelled",
        paymentStatus: "pending",
      },
    });

    return NextResponse.json({
      data: updatedBooking,
    });
  } catch (error) {
    console.error("Error creating booking: ", error);
    return NextResponse.json(
      { error: "Failed to create a new booking" },
      { status: 500 }
    );
  }
}
