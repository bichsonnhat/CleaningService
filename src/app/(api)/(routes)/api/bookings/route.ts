import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { assignHelperToBooking } from "../../(lib)/assignHelperToBooking";
//Get all bookings
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
  let bookings;
  try {
    if (role === "admin") {
      bookings = await prisma.booking.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include: {
          serviceCategory: {
            select: {
              name: true,
            },
          },
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
          feedbacks: {
            select: {
              id: true,
              helperRating: true,
              reportedBy: true,
            },
          },
        },
      });
    } else if (role === "customer") {
      bookings = await prisma.booking.findMany({
        where: {
          customerId: userId,
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
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
          feedbacks: {
            select: {
              id: true,
              helperRating: true,
              reportedBy: true,
            },
          },
          serviceCategory: {
            select: {
              name: true,
            },
          },
        },
      });
    } else if (role === "helper") {
      bookings = await prisma.booking.findMany({
        where: {
          helperId: userId,
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
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
          feedbacks: {
            select: {
              id: true,
              helperRating: true,
              reportedBy: true,
            },
          },
          serviceCategory: {
            select: {
              name: true,
            },
          },
        },
      });
    }
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings: ", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

//Create a new booking
export async function POST(req: Request) {
  try {
    const data = await req.json();
    let bookingID;

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


    const result = await prisma.$transaction(async (prisma) => {
      try {
        const newBooking = await prisma.booking.create({
          data: bookingData,
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
    
        const bookingDetails = detailIds.map((serviceDetailId) => ({
          bookingId: newBooking.id,
          serviceDetailId: serviceDetailId,
        }));
    
        await prisma.bookingDetail.createMany({
          data: bookingDetails,
        });
    
        return newBooking;
      } catch (error) {
        console.error("Error inside transaction:", error);
        throw error; // Rethrow để transaction cuộn lại
      }
    });

    // return NextResponse.json(result, { status: 201 });
    return NextResponse.json({
      status: 201,
      result: result,
    });
  } catch (error) {
    console.error("Error processing booking request:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2002":
          return NextResponse.json(
            { error: "Duplicate entry for booking or booking detail" },
            { status: 409 }
          );
        case "P2025":
          return NextResponse.json(
            { error: "Referenced record not found" },
            { status: 404 }
          );
        default:
          return NextResponse.json(
            { error: "Database error", details: error.message },
            { status: 500 }
          );
      }
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Internal server error", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
  finally{
  }
}

// export async function POST(req: Request) {
//   try {
//     const data = await req.json();
//     const {detailIds, ...bookingData} = data;
//     const newBooking = await prisma.booking.create({
//       data: bookingData,
//     });

//     return NextResponse.json(newBooking);
//   } catch (error) {
//     console.error("Error creating booking: ", error);
//     return NextResponse.json(
//       { error: "Failed to create a new booking" },
//       { status: 500 }
//     );
//   }
// }
