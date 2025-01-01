import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { WebhookDataType, WebhookType } from "@payos/node/lib/type";

export async function POST(req: Request) {
  try {
    const body: WebhookType = await req.json();

    if (body.data.description == "VQRIO123") {
      return NextResponse.json({ error: "Webhook Confirmed" }, { status: 200 });
    }

    console.log("Webhook data: ", body);

    const data = body.data as WebhookDataType;

    const booking = await prisma.booking.findFirst({
      where: {
        orderNumber: data.orderCode,
      },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    console.log("Booking found: ", booking);

    const updatedBooking = await prisma.booking.update({
      where: {
        id: booking?.id,
      },
      data: {
        status: "confirmed",
        paymentStatus: "paid",
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
