import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import createPaymentLink from "@/app/(api)/(routes)/(lib)/payos-service";
import { WebhookDataType, WebhookType } from "@payos/node/lib/type";

export async function POST(req: Request) {
  try {
    const body: WebhookType = await req.json();

    const data = body.data as WebhookDataType;

    const booking = await prisma.booking.findFirst({
      where: {
        orderNumber: data.orderCode,
      },
    });

    const updatedBooking = await prisma.booking.update({
      where: {
        id: booking?.id, // Ensure orderNumber is unique in the schema
      },
      data: {
        status: "confirmed", // New status value to update
        paymentStatus: "paid", // New status value to update
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
