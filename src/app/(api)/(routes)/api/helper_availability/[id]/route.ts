import prisma from "@/lib/db";
import { NextResponse } from "next/server";

// Get helper_availability by id
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const helperAvailability = await prisma.helperAvailability.findUnique({
      where: {
        id: params.id,
      },
      include: {
        approvedBy: {
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
      },
    });
    if (!helperAvailability) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(helperAvailability);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

// Update helper_availability by id
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  const updatedServiceCategory = await prisma.helperAvailability.update({
    where: {
      id: params.id,
    },
    data,
    include: {
      approvedBy: true,
    },
  });
  return NextResponse.json(updatedServiceCategory);
}

// DELETE helper_availability by id
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const helperAvailability = await prisma.helperAvailability.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json(helperAvailability);
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
