import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const feedback = await prisma.feedback.findUnique({
      where: {
        id: params.id,
      },
      include: {
        booking: {
          select:{
            customer: {
              select:{
                fullName: true,
              }
            },
            helper: {
              select:{
                user: {
                  select:{
                    fullName: true,
                  }
                }
              }
            }
          }
        }
      }
    });
    if (!feedback) {
      return NextResponse.json(
        { error: "Feedback not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(feedback);
  } catch (error) {
    console.error("Error fetching feedback: ", error);

    return NextResponse.json(
      { error: "Failed to fetch feedback" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req : Request,
  { params }: { params: { id: string } }
) {
  try {

  const { id } = params;

  const body = await req.json();
  const resolveBy = body.resolveBy;

  const user = await prisma.feedback.findUnique({
      where: { id: id },
  });

  if (user === null) {
      return NextResponse.json(
          {
          status: "error",
          error: "Feedback not found",
          },
          { status: 404 }
      );
  }

  let feedbackUpdatedInfo

  feedbackUpdatedInfo = await prisma.feedback.update({
      where: {
          id: id,
      },
      data: {
        resolveBy: resolveBy,
      }
  })

  return NextResponse.json(feedbackUpdatedInfo);
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

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();

    const updateFeedback = await prisma.feedback.update({
      where: {
        id: params.id,
      },
      data,
    });

    return NextResponse.json(updateFeedback);
  } catch (error) {
    console.error("Error updating feedback: ", error);
    return NextResponse.json(
      { error: "Failed to update feedback" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const feedback = await prisma.feedback.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json(feedback);
  } catch (error) {
    console.error("Error deleting feedback:", error);
    return NextResponse.json(
      { error: "Failed to delete feedback" },
      { status: 500 }
    );
  }
}
