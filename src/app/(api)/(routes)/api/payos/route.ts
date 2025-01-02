import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import createPaymentLink from "@/app/(api)/(routes)/(lib)/payos-service";
import { assignHelperToBooking } from "../../(lib)/assignHelperToBooking";

//Create a new booking
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const newBooking = await prisma.booking.create({
      data,
    });

    const helperId = await assignHelperToBooking(newBooking);

    if (helperId === null) {
      return NextResponse.json(
        { error: "No available helpers" },
        { status: 404 }
      );
    }

    await prisma.booking.update({
      where: {
        id: newBooking.id,
      },
      data: {
        helperId,
      },
    });

    const paymentLink = await createPaymentLink(newBooking.id);

    console.log(
      "booking " +
        (
          await prisma.booking.findFirst({
            where: {
              id: newBooking.id,
            },
          })
        )?.helperId
    );

    return NextResponse.json({
      paymentLink: paymentLink,
    });
  } catch (error) {
    console.error("Error creating booking: ", error);
    return NextResponse.json(
      { error: "Failed to create a new booking" },
      { status: 500 }
    );
  }
}
