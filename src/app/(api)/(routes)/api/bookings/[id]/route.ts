import prisma from "@/lib/db";
import { NextResponse } from "next/server";
// Get booking by id
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  let bookings = null;
  try {
    if (params.id === "can-feedback") {
      const customerId = "ee6efe69-71ca-4e3d-bc07-ba6e5c3e061e";
      bookings = await prisma.booking.findMany({
        orderBy: {
          scheduledStartTime: "desc",
        },
        where: {
          customerId: customerId,
          status: "completed",
          feedbacks: {
            none: {
              reportedBy: false,
            },
          },
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
          serviceCategory: {
            select: {
              name: true,
            },
          },
          // serviceType: {
          //   select: {
          //     name: true,
          //   },
          // },
        },
      });
    } else if (params.id === "can-issue") {
      const helperId = "0066dc01-cdd4-4243-9f4e-778bcfa4458f";
      bookings = await prisma.booking.findMany({
        orderBy: {
          scheduledStartTime: "desc",
        },
        where: {
          helperId: helperId,
          status: {
            notIn: ["pending", "inprogress"],
          },
          feedbacks: {
            none: {
              reportedBy: true,
            },
          },
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
          serviceCategory: {
            select: {
              name: true,
            },
          },
        },
      });
    } else if (params.id === "can-refund") {
      const customerId = "fa21339b-a224-466b-bf76-043a207ad160";
      bookings = await prisma.booking.findMany({
        orderBy: {
          scheduledStartTime: "desc",
        },
        where: {
          customerId: customerId,
          status: "completed",
          refunds: {
            none: {},
          },
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
          serviceCategory: {
            select: {
              name: true,
            },
          },
        },
      });
    } else {
      bookings = await prisma.booking.findUnique({
        where: {
          id: params.id,
        },
        include: {
          helper: {
            select: {
              user: {
                select: {
                  fullName: true,
                },
              },
              averageRating: true,
            },
          },
          customer: {
            select: {
              fullName: true,
            },
          },
          serviceCategory: {
            select: {
              name: true,
              description: true,
            },
          },
          feedbacks: {
            select: {
              id: true,
              helperRating: true,
              reportedBy: true,
            },
          },
          refunds: {
            select: {
              id: true,
            },
          },
        },
      });
    }
    if (!bookings) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching booking: ", error);
    return NextResponse.json(
      { error: "Failed to fetch booking" },
      { status: 500 }
    );
  }
}
// Update booking by id
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();
    const updatedBooking = await prisma.booking.update({
      where: {
        id: params.id,
      },
      data,
    });
    return NextResponse.json(updatedBooking);
  } catch (error) {
    console.error("Error updating booking: ", error);
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
}
// Delete booking by id
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const booking = await prisma.booking.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json(
      { message: "Delete booking successful" },
      { status: 404 }
    );
  } catch (error) {
    console.error("Error deleting booking: ", error);
    return NextResponse.json(
      { error: "Failed to delete booking" },
      { status: 500 }
    );
  }
}
