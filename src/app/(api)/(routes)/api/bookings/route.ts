import prisma from "@/lib/db";
import { NextResponse } from "next/server";
//Get all bookings
export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        serviceType: true
      }
    });
    return NextResponse.json(bookings);
  }
  catch (error) {
    console.error('Error fetching bookings: ', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings'},
      { status: 500}
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
    } 
    catch (error) {
      console.error('Error creating booking: ', error);
      return NextResponse.json(
        { error: 'Failed to create a new booking'},
        { status: 500}
      )
    }
  }