import prisma from "@/lib/db";
import { NextResponse } from "next/server";
// Get booking by id
export async function GET(
    req: Request,
    { params}: { params : {id: string}}
) {
    try {
        const booking = await prisma.booking.findUnique({
            where: {
                id: params.id,
            }
        });
        if (!booking){
            return NextResponse.json(
                { error: 'Booking not found'},
                { status: 404}
            );
        }
        return NextResponse.json(booking);
    } catch (error) {
        console.error('Error fetching booking: ', error);
        return NextResponse.json(
            { error: 'Failed to fetch booking'},
            { status: 500}
        );
    }
}
// Update booking by id
export async function PATCH(
    req: Request,
    { params}: { params: {id: string}}
) {
    try {
        const data = await req.json();
        const updatedBooking = await prisma.booking.update({
            where: {
                id: params.id,
            },
            data
        });
        return NextResponse.json(updatedBooking); 
    }
    catch (error){
        console.error('Error updating booking: ', error);
        return NextResponse.json(
            { error: 'Failed to update booking'},
            {status: 500}
        )
    }
}
// Delete booking by id
export async function DELETE(
    req: Request,
    { params}: { params: {id: string}}
) {
    try {
        const booking = await prisma.booking.delete({
            where: {
                id: params.id,
            },
        });
        return NextResponse.json(
            { message: 'Delete booking successful'},
            { status: 404}
        );
    } catch (error) {
        console.error('Error deleting booking: ', error);
        return NextResponse.json(
            { error: 'Failed to delete booking'},
            { status: 500}
        );
    }
}