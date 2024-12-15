import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const unitAmount = searchParams.get('unit_amount');

        if (!unitAmount) {
            return new NextResponse("Unit amount is required", { status: 400 });
        }

        const user = await currentUser();

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const homepageUrl = `${process.env.NEXT_PUBLIC_API_URL}`;
        const stripeSession = await stripe.checkout.sessions.create({
            success_url: homepageUrl,
            cancel_url: homepageUrl,
            payment_method_types: ["card"],
            mode: "payment",
            billing_address_collection: "auto",
            line_items: [
                {
                    price_data: {
                        currency: "USD",
                        product_data: {
                            name: "Cleaning Service",
                            description: "An example product",
                        },
                        unit_amount: parseInt(unitAmount),
                    },
                    quantity: 1
                }
            ],
            metadata: {
                userId: user.id
            }
        });
        return NextResponse.json({
            url: stripeSession.url,
        }, { status: 200 });
    } catch (error) {
        console.error(error);
        return new NextResponse("Something went wrong", { status: 500 });
    }
}