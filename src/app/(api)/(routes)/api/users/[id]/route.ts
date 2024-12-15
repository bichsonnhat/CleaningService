import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { partialuserSchema } from "../user.schema";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: params.id,
            },
        });
        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }
        return NextResponse.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json(
            { error: 'Failed to fetch user' },
            { status: 500 }
        );
    }
}

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const body = await req.json();

    const data = partialuserSchema.parse(body);

    const user = await prisma.user.findUnique({
        where: { id: id },
    });

    const address = `${data.houseNumber} - ${data.streetName} - ${data.ward} - ${data.city} - ${data.postalCode}`;

    if (user === null) {
        return NextResponse.json(
          {
            status: "error",
            error: "User not found",
          },
          { status: 404 }
        );
    }

    let userUpdatedInfo
    if (data.email){
        userUpdatedInfo = await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                fullName: data.fullName,
                gender: data.gender,
                email: data.email,
                dateOfBirth: data.dateOfBirth,
                identifyCard: data.idCard,
                address: address,
                phoneNumber: data.phoneNumber,
            }
        })
    }
    else{
        userUpdatedInfo = await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                fullName: data.fullName,
                gender: data.gender,
                dateOfBirth: data.dateOfBirth,
                identifyCard: data.idCard,
                address: address,
                phoneNumber: data.phoneNumber,
            }
        })
    }

    return NextResponse.json(userUpdatedInfo);
  }
  catch (error) {
    // Xử lý lỗi nếu có
    console.error("Error updating customer info:", error);
    return NextResponse.json(
      { status: "error", error: "Failed to update customer info" },
      { status: 500 }
    );
  }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const user = await prisma.user.delete({
            where: {
                id: params.id,
            },
        });
        return NextResponse.json(user);
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json(
            { error: 'Failed to delete user' },
            { status: 500 }
        );
    }
}