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
        const isSelectService = searchParams.get('isSelectService') === undefined ? false : searchParams.get('isSelectService');
        const isStep1Completed = searchParams.get('isStep1Completed') === undefined ? false : searchParams.get('isStep1Completed');
        const isStep2Completed = searchParams.get('isStep2Completed') === undefined ? false : searchParams.get('isStep2Completed');
        const isStep3Completed = searchParams.get('isStep3Completed') === undefined ? false : searchParams.get('isStep3Completed');
        const isStep4Completed = searchParams.get('isStep4Completed') === undefined ? false : searchParams.get('isStep4Completed');
        
        console.log("Log is:", isSelectService, isStep1Completed, isStep2Completed, isStep3Completed, isStep4Completed);
        const BookingStatus = {
            isSelectService: isSelectService === "true",
            isStep1Completed: isStep1Completed === "true",
            isStep2Completed: isStep2Completed === "true",
            isStep3Completed: isStep3Completed === "true",
            isStep4Completed: isStep4Completed === "true",
        };
        const user = await currentUser();
        console.log("User is:", user);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const userId = user.id;
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