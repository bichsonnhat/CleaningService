// src/app/api/helpers/route.ts
import prisma from '@/lib/db'
import { NextResponse } from 'next/server'

// GET all helpers
export async function GET() {
  const helpers = await prisma.helper.findMany()
  return NextResponse.json(helpers)
}

// POST a new helper
export async function POST(req: Request) {
  const data = await req.json();
  const newServiceCategory = await prisma.helper.create({
    data,
  });
  return NextResponse.json(newServiceCategory);
}