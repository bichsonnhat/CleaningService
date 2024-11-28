import prisma from "@/lib/db";
import { NextResponse } from "next/server";

// Get booking contract by id
export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const bookingContract = await prisma.bookingContract.findUnique({
            where: {
                id: params.id,
            },
        });
        if (!bookingContract) {
            return NextResponse.json(
                { error: 'Booking contract not found' },
                { status: 404 }
            );
        }
        return NextResponse.json(bookingContract);
    } catch (error) {
        console.error('Error fetching booking contract:', error);
        return NextResponse.json(
            { error: 'Failed to fetch booking contract' },
            { status: 500 }
        );
    }
}

// Update booking contract by id
export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
  const data = await req.json();
  const updatedBookingContract = await prisma.bookingContract.update({
    where: {
      id: params.id,
    },
    data,
  });
  return NextResponse.json(updatedBookingContract);
}

// DELETE booking contract by id
export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const bookingContract = await prisma.bookingContract.delete({
            where: {
                id: params.id,
            },
        });
        return NextResponse.json(bookingContract);
    } catch (error) {
        console.error('Error deleting booking contract:', error);
        return NextResponse.json(
            { error: 'Failed to delete booking contract' },
            { status: 500 }
        );
    }
}