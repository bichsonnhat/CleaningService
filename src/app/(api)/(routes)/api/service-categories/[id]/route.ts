import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) { 
    try {
        const service = await prisma.serviceCategory.findUnique({
            where: {
                id: params.id,
            },
        });
        if (!service) {
            return NextResponse.json(
                { error: 'Service category not found' },
                { status: 404 }
            );
        }
        return NextResponse.json(service);
    } catch (error) {
        console.error('Error fetching service category:', error);
        return NextResponse.json(
            { error: 'Failed to fetch service category' },
            { status: 500 }
        );
    }
}