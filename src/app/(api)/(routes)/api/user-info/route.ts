import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const user = await currentUser();
  const role = (await auth()).sessionClaims?.metadata?.role;
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json({ userId: user.id, role: role });
}

export async function POST(request: Request) {
  try {
    const { userId, role } = await request.json();
    if (!userId || !role) {
      return NextResponse.json(
        { message: "Missing userId or role" },
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    console.log(`Updating role for userId: ${userId}, role: ${role}`);

    const client = await clerkClient();
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        role,
      },
    });

    return NextResponse.json(
      { message: "Role updated successfully", data: { userId, role } },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
