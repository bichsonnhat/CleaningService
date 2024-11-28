import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
      const services = await prisma.serviceType.findMany();
      return NextResponse.json(services);
    } catch (error) {
      console.error('Error fetching services:', error);
      return NextResponse.json(
        { error: 'Failed to fetch services' },
        { status: 500 }
      );
    }
  }

export async function POST(request: Request) {
    try {
      const data = await request.json();
      const serviceType = await prisma.serviceType.create({
        data: {
            categoryId: data.categoryId,
          name: data.name,
          description: data.description,
          basePrice: data.basePrice,
          isActive: true,
        },
      });
      
      return NextResponse.json(serviceType);
    } catch (error) {
      console.error('Error creating service:', error);
      return NextResponse.json(
        { error: 'Failed to create service' },
        { status: 500 }
      );
    }
  }