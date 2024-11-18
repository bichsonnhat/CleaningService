import prisma from "@/lib/db";
import { NextResponse } from "next/server";

// GET blacklisted user by id
export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const blacklistedUser = await prisma.blacklistedUser.findUnique({
            where: {
                id: params.id,
            },
        });
        if (!blacklistedUser) {
            return NextResponse.json(
                { error: 'Blacklisted user not found' },
                { status: 404 }
            );
        }
        return NextResponse.json(blacklistedUser);
    } catch (error) {
        console.error('Error fetching blacklisted user:', error);
        return NextResponse.json(
            { error: 'Failed to fetch blacklisted user' },
            { status: 500 }
        );
    }
}

// Update blacklisted user by id
export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
  const data = await req.json();
  const updatedBlacklistedUser = await prisma.blacklistedUser.update({
    where: {
      id: params.id,
    },
    data,
  });
  return NextResponse.json(updatedBlacklistedUser);
}


// DELETE blacklisted user by id
export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const blacklistedUser = await prisma.blacklistedUser.delete({
            where: {
                id: params.id,
            },
        });
        return NextResponse.json(blacklistedUser);
    } catch (error) {
        console.error('Error deleting blacklisted user:', error);
        return NextResponse.json(
            { error: 'Failed to delete blacklisted user' },
            { status: 500 }
        );
    }
}