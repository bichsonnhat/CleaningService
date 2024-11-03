// src/app/api/users/route.ts
import prisma from '@/lib/db'
import { NextResponse } from 'next/server'

// GET all users
export async function GET() {
  const users = await prisma.user.findMany()
  return NextResponse.json(users)
}

// POST new user
export async function POST(req: Request) {
  const data = await req.json()
  const user = await prisma.user.create({
    data
  })
  return NextResponse.json(user)
}