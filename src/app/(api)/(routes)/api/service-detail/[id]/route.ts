import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { Decimal } from "@prisma/client/runtime/library";
import { UUID } from "crypto";
import {
  partialServiceDetailSchema,
  serviceDetailSchema,
} from "../service-detail.schema";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const serviceDetail = await prisma.serviceDetail.findUnique({
      where: {
        id: id,
      },
    });

    if (serviceDetail === null) {
      return NextResponse.json(serviceDetail);
    }

    return NextResponse.json(serviceDetail);
  } catch (error) {
    console.error("Error fetching service detail:", error);
    return NextResponse.json(
      { error: "Failed to fetch service detail" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const body = await request.json();

    const data = partialServiceDetailSchema.parse(body);

    const detail = await prisma.serviceDetail.findUnique({
      where: { id: id },
    });

    if (detail === null) {
      return NextResponse.json(
        {
          status: "error",
          error: "Service detail not found",
        },
        { status: 404 }
      );
    }

    if (data.serviceTypeId) {
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
    }

    if (data.additionalPrice !== undefined && data.additionalPrice < 0) {
      return NextResponse.json(
        {
          status: "error",
          error: "Additional price must be greater than or equal to 0",
        },
        { status: 400 }
      );
    }

    if (data.multiplyPrice !== undefined && data.multiplyPrice < 1) {
      return NextResponse.json(
        {
          status: "error",
          error: "Multiply price must be greater than or equal to 1",
        },
        { status: 400 }
      );
    }

    const updateValue: {
      serviceTypeId?: UUID;
      additionalPrice?: Decimal;
      multiplyPrice?: Decimal;
      title?: string;
    } = {};

    updateValue.serviceTypeId =
      data.serviceTypeId !== undefined
        ? (data.serviceTypeId as UUID)
        : (detail.serviceTypeId as UUID);
    updateValue.additionalPrice =
      data.additionalPrice !== undefined
        ? new Decimal(data.additionalPrice)
        : detail.additionalPrice;
    updateValue.multiplyPrice =
      data.multiplyPrice !== undefined
        ? new Decimal(data.multiplyPrice)
        : detail.multiplyPrice;
    updateValue.title = data.title !== undefined ? data.title : detail.title;

    const serviceDetail = await prisma.serviceDetail.update({
      where: {
        id: id,
      },
      data: {
        serviceTypeId: updateValue.serviceTypeId,
        title: updateValue.title,
        additionalPrice: updateValue.additionalPrice,
        multiplyPrice: updateValue.multiplyPrice,
      },
    });

    return NextResponse.json(serviceDetail);
  } catch (error) {
    console.error("Error updating service detail:", error);
    return NextResponse.json(
      { status: "error", error: "Failed to update service detail" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const data = await request.json();
    await prisma.serviceDetail.delete({
      where: {
        id: data.id,
      },
    });

    return NextResponse.json({
      status: "success",
      message: null,
    });
  } catch (error) {
    console.error("Error deleting service detail:", error);
    return NextResponse.json(
      { error: "Failed to delete service detail" },
      { status: 500 }
    );
  }
}
