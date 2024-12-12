import prisma from "@/lib/db";
import { NextResponse } from "next/server";
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
    if (role === "Admin") {
      bookings = await prisma.booking.findMany({
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
        },
      });
    } else if (role === "Customer") {
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
        },
      });
    } else if (role === "Helper") {
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
    const newBooking = await prisma.booking.create({
      data,
    });
    return NextResponse.json(newBooking);
  } catch (error) {
    console.error("Error creating booking: ", error);
    return NextResponse.json(
      { error: "Failed to create a new booking" },
      { status: 500 }
    );
  }
}