import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
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

export async function PATCH(request: Request, { params }: { params: { id: string }}) {
    try {
      const data = await request.json();
      const service = await prisma.serviceCategory.update({
        where: {
          id: params.id,
        },
        data: {
          name: data.name,
          description: data.description,
          isActive: data.isActive,
        },
      });
      
      return NextResponse.json(service);
    } catch (error) {
      console.error('Error updating service:', error);
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
        { error: 'Failed to update service' },
        { status: 500 }
      );
    }
  }
  
  export async function DELETE(request: Request, { params }: { params: { id: string }}) {
    try {
        const deletedCategory = await prisma.serviceCategory.delete({
          where: {
            id: params.id,
          },
        });
    
        return NextResponse.json(
          {
            message: "Service category deleted successfully",
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