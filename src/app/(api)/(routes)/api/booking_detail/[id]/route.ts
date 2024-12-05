import prisma from "@/lib/db";
import { NextResponse } from "next/server";

// Get booking detail by id
export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const bookingDetail = await prisma.bookingDetail.findUnique({
            where: {
                id: params.id,
            },
            include: {
                booking: true,
                serviceDetail: true,
              },
        });
        if (!bookingDetail) {
            return NextResponse.json(
                { error: 'Booking detail not found' },
                { status: 404 }
            );
        }
        return NextResponse.json(bookingDetail);
    } catch (error) {
        console.error('Error fetching booking detail:', error);
        return NextResponse.json(
            { error: 'Failed to fetch booking detail' },
            { status: 500 }
        );
    }
}

// Update booking detail by id
export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
  const data = await req.json();
  const updatedBookingDetail = await prisma.bookingDetail.update({
    where: {
      id: params.id,
    },
    data,
  });
  return NextResponse.json(updatedBookingDetail);
}

// DELETE booking detail by id
export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const bookingDetail = await prisma.bookingDetail.delete({
            where: {
                id: params.id,
            },
        });
        return NextResponse.json(bookingDetail);
    } catch (error) {
        console.error('Error deleting booking detail:', error);
        return NextResponse.json(
            { error: 'Failed to delete booking detail' },
            { status: 500 }
        );
    }
}