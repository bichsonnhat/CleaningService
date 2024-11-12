// app/api/services/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const services = await prisma.serviceCategory.findMany();
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
    const service = await prisma.serviceCategory.create({
      data: {
        name: data.name,
        description: data.description,
        isActive: true,
      },
    });
    
    return NextResponse.json(service);
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const service = await prisma.serviceCategory.update({
      where: {
        id: data.id,
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
    return NextResponse.json(
      { error: 'Failed to update service' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const data = await request.json();
    await prisma.serviceCategory.delete({
      where: {
        id: data.id,
      },
    });
    
    return NextResponse.json({ message: 'Service deleted' });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json(
      { error: 'Failed to delete service' },
      { status: 500 }
    );
  }
}