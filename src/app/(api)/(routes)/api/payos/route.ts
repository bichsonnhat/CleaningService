import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import createPaymentLink from "@/app/(api)/(routes)/(lib)/payos-service";
import { assignHelperToBooking } from "../../(lib)/assignHelperToBooking";

// Create a new booking
export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Validate input data
    if (!data || typeof data !== "object") {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }

    const { detailIds, ...bookingData } = data;

    if (!bookingData.customerId || !bookingData.serviceCategoryId) {
      return NextResponse.json(
        { error: "Missing required booking data" },
        { status: 400 }
      );
    }

    if (!Array.isArray(detailIds) || detailIds.length === 0) {
      return NextResponse.json(
        { error: "detailIds must be a non-empty array" },
        { status: 400 }
      );
    }

    // Execute database operations in a transaction
    let newBooking: any;
    const helperId = await prisma.$transaction(async (prisma) => {
      newBooking = await prisma.booking.create({ data: bookingData });

      const helperId = await assignHelperToBooking(newBooking);
      if (!helperId) {
        throw new Error("No available helpers");
      }

      await prisma.booking.update({
        where: { id: newBooking.id },
        data: { helperId },
      });

      const bookingDetails = detailIds.map((serviceDetailId) => ({
        bookingId: newBooking.id,
        serviceDetailId,
      }));

      await prisma.bookingDetail.createMany({ data: bookingDetails });

      return helperId; // Return helperId for use outside the transaction
    });

    // Create a payment link
    const paymentLink = await createPaymentLink(newBooking.id);

    // Return the final response
    return NextResponse.json(
      {
        bookingId: newBooking.id,
        helperId,
        paymentLink,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating booking:", error);

    if (error.message === "No available helpers") {
      return NextResponse.json(
        { error: "No available helpers" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create a new booking" },
      { status: 500 }
    );
  }
}
