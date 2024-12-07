import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const user = await currentUser();

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const homepageUrl = "http://localhost:3000/";
        const stripeSession = await stripe.checkout.sessions.create({
            success_url: homepageUrl,
            cancel_url: homepageUrl,
            payment_method_types: ["card"],
            mode: "payment", // Ensure this matches the price type
            billing_address_collection: "auto",
            line_items: [
                {
                    price_data: {
                        currency: "USD",
                        product_data: {
                            name: "Cleaning Service",
                            description: "An example product",
                        },
                        unit_amount: 10_000,
                        // Removed recurring property
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