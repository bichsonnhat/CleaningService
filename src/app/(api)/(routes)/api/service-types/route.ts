import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { ServiceTypeSchema } from "./service-types.schema";
import z from 'zod';
import { Prisma } from "@prisma/client";

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
      const parsedData = ServiceTypeSchema.parse(data)
      const serviceType = await prisma.serviceType.create({
        data: {
            categoryId: parsedData.categoryId,
          name: parsedData.name,
          description: parsedData.description,
          basePrice: parsedData.basePrice,
          isActive: true,
        },
      });
      
      return NextResponse.json(serviceType);
    } catch (error) {
      console.error('Error creating service:', error);
      
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { error: "Invalid input data", details: error.errors },
          { status: 400 }
        );
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          return NextResponse.json(
            { error: `Category id  not found.` },
            { status: 404 }
          );
        }
      }

      return NextResponse.json(
        { error: 'Failed to create service' },
        { status: 500 }
      );
    }
  }