import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { partialhelperSchema } from "../helper.schema";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const helper = await prisma.helper.findUnique({
      where: {
        id: params.id,
      },
      include: {
        user: true,
      },
    });
    if (!helper) {
      return NextResponse.json({ error: "Helper not found" }, { status: 404 });
    }
    return NextResponse.json(helper);
  } catch (error) {
    console.error("Error fetching Helper:", error);
    return NextResponse.json(
      { error: "Failed to fetch Helper" },
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

    const data = partialhelperSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    const helper = await prisma.helper.findUnique({
        where: {id : id},
    })

    const address = `${data.houseNumber} - ${data.streetName} - ${data.ward} - ${data.city} - ${data.postalCode}`;

    if (user === null) {
        return NextResponse.json(
          {
            status: "error",
            error: "User-Helper not found",
          },
          { status: 404 }
        );
    }

    if (helper === null){
        return NextResponse.json(
            {
              status: "error",
              error: "Helper not found",
            },
            { status: 404 }
        );
    }

    let userUpdatedInfo
    let helperUpdatedInfo
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

    helperUpdatedInfo = await prisma.helper.update({
        where: {
            id: id
        },
        data: {
            resumeUploaded: data.resume,
            servicesOffered: data.servicesOffered,
            salaryExpectation: data.salaryExpectation
        }
    })

    return NextResponse.json({
        status: "success",
        user: userUpdatedInfo,
        helper: helperUpdatedInfo,
      });
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
    const helper = await prisma.helper.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json(helper);
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
