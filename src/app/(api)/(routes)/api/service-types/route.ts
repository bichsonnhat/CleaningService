import prisma from "@/lib/db";
import { CreateServiceTypeSchema } from "@/types/dtos/CreateServiceTypeDTO";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const serviceTypes = await prisma.serviceType.findMany()
        console.log("Service types:", serviceTypes)
        return NextResponse.json(serviceTypes)
    } catch (error) {
        console.log("Error fetching service types:", error)
        return NextResponse.json(
            { error: "Failed to fetch service types" },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const data = CreateServiceTypeSchema.parse(body)
        const category = await prisma.serviceCategory.findUnique({
            where: {
                id: data.categoryId
            }
        })
        if (!category) {
            return NextResponse.json(
                { error: "Invalid category ID" },
                { status: 400 }
            )
        }
        const serviceType = await prisma.serviceType.create({
            data: {
                categoryId: data.categoryId,
                name: data.name,
                description: data.description,
                basePrice: data.basePrice,
            }
        })
        return NextResponse.json({
            message: "Service type created successfully",
            data: serviceType
        })
    } catch (error) {
        console.log("Error creating service type:", error)
        return NextResponse.json(
            { error: "Failed to create service type" },
            { status: 500 }
        )
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const data = await request.json()
        const category = await prisma.serviceCategory.findUnique({
            where: {
                id: data.categoryId
            }
        })
        if (!category) {
            return NextResponse.json(
                { error: "Invalid category ID" },
                { status: 400 }
            )
        }
        const serviceType = await prisma.serviceType.update({
            where: {
                id: params.id
            },
            data: {
                categoryId: data.categoryId,
                name: data.name,
                description: data.description,
                basePrice: data.basePrice,
            }
        })
        return NextResponse.json({
            message: "Service type updated successfully",
            data: serviceType
        })
    } catch (error) {
        console.log("Error updating service type:", error)
        return NextResponse.json(
            { error: "Failed to update service type" },
            { status: 500 }
        )
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.serviceType.delete({
            where: {
                id: params.id
            }
        })
        return NextResponse.json({ message: "Service type deleted" })
    } catch (error) {
        console.log("Error deleting service type:", error)
        return NextResponse.json(
            { error: "Failed to delete service type" },
            { status: 500 }
        )
    }
}