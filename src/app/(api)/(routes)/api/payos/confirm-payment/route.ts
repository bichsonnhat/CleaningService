import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import createPaymentLink from "@/app/(api)/(routes)/(lib)/payos-service";
import { WebhookDataType, WebhookType } from "@payos/node/lib/type";

export async function POST(req: Request) {
  try {
    const body: WebhookType = await req.json();

    // waiting for the orderCode from PayOS

    return NextResponse.json({
      data: body,
    });
  } catch (error) {
    console.error("Error creating booking: ", error);
    return NextResponse.json(
      { error: "Failed to create a new booking" },
      { status: 500 }
    );
  }
}
