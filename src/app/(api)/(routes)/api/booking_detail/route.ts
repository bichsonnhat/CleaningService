// src/app/api/booking_detail/route.ts
import prisma from '@/lib/db'
import { NextResponse } from 'next/server'

// GET all booking detail
export async function GET() {
  const bookingDetail = await prisma.bookingDetail.findMany({
    include: {
      booking: true,
      serviceDetail: true,
    },
  })
  return NextResponse.json(bookingDetail)
}

// POST a new booking detail
export async function POST(req: Request) {
  const data = await req.json();
  const newBookingDetail = await prisma.bookingDetail.create({
    data,
  });
  return NextResponse.json(newBookingDetail);
}