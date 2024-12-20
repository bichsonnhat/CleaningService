import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const user = await currentUser();
    const role = (await auth()).sessionClaims?.metadata?.role
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ userId: user.id, role: role });
}

export async function PUT(
    request: Request,
) {
    try {
        const { searchParams } = new URL(request.url);
        const isSelectService = searchParams.get('isSelectService') ?? false;
        const isStep1Completed = searchParams.get('isStep1Completed') ?? false;
        const isStep2Completed = searchParams.get('isStep2Completed') ?? false;
        const isStep3Completed = searchParams.get('isStep3Completed') ?? false;
        const isStep4Completed = searchParams.get('isStep4Completed') ?? false;
        const userId = searchParams.get('userId') ?? "";
        
        console.log("Log is:", isSelectService, isStep1Completed, isStep2Completed, isStep3Completed, isStep4Completed);
        const BookingStatus = {
            isSelectService: isSelectService === "true",
            isStep1Completed: isStep1Completed === "true",
            isStep2Completed: isStep2Completed === "true",
            isStep3Completed: isStep3Completed === "true",
            isStep4Completed: isStep4Completed === "true",
        };
        
        const client = await clerkClient();
        await client.users.updateUserMetadata(userId, {
            publicMetadata: {
                BookingStatus,
            },
        });
        return NextResponse.json({ message: "User metadata updated" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "User metadata not updated" }, { status: 404 });
    }
}

export async function POST(request: Request){
    try{
        const { userId, role } = await request.json();
    if (!userId || !role) {
        return NextResponse.json({ message: "Missing userId or role"}, {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
    console.log(`Updating role for userId: ${userId}, role: ${role}`);

    const client = await clerkClient();
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        role,
      },
    });
    
    return NextResponse.json({ message: "Role updated successfully", data: { userId, role }}, {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
    }
    catch (error){
        console.error("Error processing request:", error);
        return NextResponse.json({ message: "Internal Server Error"}, {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}


