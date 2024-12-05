// src/app/api/booking_contract/route.ts
import prisma from '@/lib/db'
import { NextResponse } from 'next/server'

// GET all booking contract
export async function GET() {
  const bookingContract = await prisma.bookingContract.findMany({
    include: {
      booking: true,
    },
  })
  return NextResponse.json(bookingContract)
}

// POST a new booking contract
export async function POST(req: Request) {
  const data = await req.json();
  const newBookingContract = await prisma.bookingContract.create({
    data,
  });
  return NextResponse.json(newBookingContract);
}