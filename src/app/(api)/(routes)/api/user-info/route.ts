import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const user = await currentUser();
    const role = (await auth()).sessionClaims?.metadata?.role
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ userId: user.id, role: role });
}

