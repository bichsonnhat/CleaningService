import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { helperAvailabilityData } from "../../../../../../prisma/mockData";
import { helperAvailabilitySchema } from "./helper_availability.shema";

// Get all helper_availability
export async function GET(req: Request) {
  const url = new URL(req.url);
  const helperId = url.searchParams.get("helperId");

  try {
    let leaveRequests;

    if (helperId) {
      leaveRequests = await prisma.helperAvailability.findMany({
        where: {
          helperId: helperId,
        },
        include: {
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
    } else {
      leaveRequests = await prisma.helperAvailability.findMany({
        include: {
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
    }

    return NextResponse.json(leaveRequests);
  } catch (error) {
    console.error("Error fetching leave requests", error);
    return NextResponse.json(
      { status: "error", error: "Failed to fetch leave requests" },
      { status: 500 } //
    );
  }
}

// Create a new helper_availability
export async function POST(req: Request) {
  try {
    const body = await req.json();
    //Get current User, tam thoi xai User cung
    const userId = "0066dc01-cdd4-4243-9f4e-778bcfa4458f";

    const data = helperAvailabilitySchema.parse(body);

    const newHelperAvailability = await prisma.helperAvailability.create({
      data: {
        helperId: userId,
        availabilityType: data.availabilityType,
        startDatetime: data.startDatetime,
        endDatetime: data.endDatetime,
        requestReason: data.requestReason,
      },
    });
    return NextResponse.json(newHelperAvailability);
  } catch (error) {
    console.error("Error creating leave request:", error);
    return NextResponse.json(
      { status: "error", error: "Failed to create leave request" },
      { status: 500 }
    );
  }
}
