import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import createPaymentLink from "@/app/(api)/(routes)/(lib)/payos-service";
import { Helper } from "@prisma/client";

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

export async function assignHelperToBooking(
  booking: any
): Promise<string | null> {
  try {
    // Get the customer details
    const customer = await prisma.user.findUnique({
      where: { id: booking.customerId },
      include: { blacklistsCreated: true }, // Assuming "blacklistedByUsers" is a relation
    });

    if (!customer) {
      throw new Error("Customer not found");
    }

    // Get the list of all helpers
    const allHelpers = await prisma.helper.findMany();

    console.log("All helpers: ", allHelpers);

    let availableHelpers: Helper[] = [];
    let minJobTaken: number | null = null;
    const relevantStatuses = ["Confirmed", "InProgress"];

    for (const helper of allHelpers) {
      // Get bookings for the current helper
      const helperBookings = await prisma.booking.findMany({
        where: {
          helperId: helper.id,
          status: { in: relevantStatuses },
        },
      });

      const jobCount = helperBookings.filter(
        (x) =>
          x.status === "Completed" ||
          x.status === "Confirmed" ||
          x.status === "InProgress"
      ).length;

      // Check if the helper is available during the requested time
      const isAvailable = helperBookings.every(
        (x) =>
          !relevantStatuses.includes(x.status) ||
          x.scheduledEndTime <= booking.scheduledStartTime ||
          x.scheduledStartTime >= booking.scheduledEndTime
      );

      // Check the helper with the least jobs taken
      if (!isAvailable) continue;

      if (minJobTaken === null || jobCount < minJobTaken) {
        minJobTaken = jobCount;
        availableHelpers = [helper];
      } else if (jobCount === minJobTaken) {
        availableHelpers.push(helper);
      }
    }

    console.log("Available helpers: ", availableHelpers);

    // Filter helpers blacklisted by the customer
    availableHelpers = availableHelpers.filter(
      (helper) =>
        !customer.blacklistsCreated.some(
          (blacklist) => blacklist.userId === helper.id
        )
    );

    console.log("Available helpers blacklisted: ", availableHelpers);

    // Filter helpers who do not offer the required service
    availableHelpers = availableHelpers.filter(
      (helper) =>
        helper.servicesOffered &&
        helper.servicesOffered.includes(booking.serviceCategoryId)
    );

    console.log("Selected service helper: ", availableHelpers);

    if (availableHelpers.length === 0) {
      return null;
    }

    // Select a random helper from the most suitable ones
    const selectedHelper =
      availableHelpers[Math.floor(Math.random() * availableHelpers.length)];

    console.log("Selected helper: ", selectedHelper);

    return selectedHelper.id;
  } catch (error) {
    console.error("Error assigning helper to booking: ", error);
    return null;
  }
}
