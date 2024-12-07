// app/api/services/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { serviceDetailSchema } from "./service-detail.schema";

export async function GET() {
  try {
    const serviceDetails = await prisma.serviceDetail.findMany({
      include: {
        serviceType: {
          select: { name: true },
        },
      },
    });

    return NextResponse.json(serviceDetails);
  } catch (error) {
    console.error("Error fetching service details", error);
    return NextResponse.json(
      { status: "error", error: "Failed to fetch service details" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const data = serviceDetailSchema.parse(body);

    const serviceType = await prisma.serviceType.findUnique({
      where: { id: data.serviceTypeId },
    });

    if (serviceType === null) {
      return NextResponse.json(
        {
          status: "error",
          error: "Service type not found",
        },
        { status: 404 }
      );
    }

    if (data.additionalPrice < 0) {
      return NextResponse.json(
        {
          status: "error",
          error: "Additional price must be greater than or equal to 0",
        },
        { status: 400 }
      );
    }

    if (data.multiplyPrice < 1) {
      return NextResponse.json(
        {
          status: "error",
          error: "Multiply price must be greater than or equal to 1",
        },
        { status: 400 }
      );
    }

    const serviceDetail = await prisma.serviceDetail.create({
      data: {
        serviceTypeId: data.serviceTypeId,
        title: data.title,
        additionalPrice: data.additionalPrice,
        multiplyPrice: data.multiplyPrice,
      },
    });

    return NextResponse.json(serviceDetail);
  } catch (error) {
    console.error("Error creating service detail:", error);
    return NextResponse.json(
      { status: "error", error: "Failed to create service detail" },
      { status: 500 }
    );
  }
}
