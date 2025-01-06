import prisma from "@/lib/db";
import { Helper } from "@prisma/client";

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

    let availableHelpers: Helper[] = [];
    let minJobTaken: number | null = null;
    const relevantStatuses = ["Confirmed", "InProgress"];

    console.log("Available helpers: ", availableHelpers);

    // Filter helpers blacklisted by the customer
    availableHelpers = allHelpers.filter(
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

    let helpers: Helper[] = [];

    for (const helper of availableHelpers) {
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
        helpers = [helper];
      } else if (jobCount === minJobTaken) {
        helpers.push(helper);
      }
    }

    console.log("Selected service helper: ", helpers);

    if (helpers.length === 0) {
      return null;
    }

    // Select a random helper from the most suitable ones
    const selectedHelper = helpers[Math.floor(Math.random() * helpers.length)];

    console.log("Selected helper: ", helpers);

    return selectedHelper.id;
  } catch (error) {
    console.error("Error assigning helper to booking: ", error);
    return null;
  }
}
