import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { UpdateServiceTypeSchema } from "../service-types.schema";
import z from 'zod';


export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) { 
    try {
        const service = await prisma.serviceType.findUnique({
            where: {
                id: params.id,
            },include: {
                serviceDetails: true, // Bao gồm thông tin serviceDetails
              }
        });
        if (!service) {
            return NextResponse.json(
                { error: 'Service type not found' },
                { status: 404 }
            );
        }
        return NextResponse.json(service);
    } catch (error) {
        console.error('Error fetching service type:', error);
        return NextResponse.json(
            { error: 'Failed to fetch service type' },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      const data = await request.json(); 

      const parsedData = UpdateServiceTypeSchema.parse(data);
  
      const updatedService = await prisma.serviceType.update({
        where: {
          id: params.id,
        },
        data,
      });
  
      return NextResponse.json(updatedService);
    } catch (error) {
      console.error("Error updating service type:", error);

      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { error: "Invalid input data", details: error.errors },
          { status: 400 }
        );
      }
  
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
            return NextResponse.json(
              { error: "Service type not found" },
              { status: 404 }
            );
          }

          if (error.code === 'P2003') {
            return NextResponse.json(
              { error: `Category id  not found.` },
              { status: 404 }
            );
          }
      }
      
      return NextResponse.json(
        { error: "Failed to update service type" },
        { status: 500 }
      );
    }
  }

  export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      const deletedService = await prisma.serviceType.delete({
        where: {
          id: params.id,
        },
      });
  
      return NextResponse.json(
        {
          message: "Service type deleted successfully",
          status: 200,
        },
        { status: 200 })
    } catch (error) {
      console.error("Error deleting service type:", error);
  
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return NextResponse.json(
          { error: "Service type not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(
        { error: "Failed to delete service type" }, 
        { status: 500 }
      );
    }
  }