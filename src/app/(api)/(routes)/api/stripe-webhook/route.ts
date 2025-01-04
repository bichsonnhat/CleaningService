import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: Request) {
    console.log('Stripe webhook received');
    const sig = request.headers.get('stripe-signature') || '';
    const body = await request.text();

    let event;

    try {
        event = stripe.webhooks.constructEvent
            (body, sig, process.env.STRIPE_SIGNING_SECRET || '');
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 });
    }
    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const paymentSession = event.data.object;
            const paymentIntent = await stripe.paymentIntents.retrieve(
                paymentSession.payment_intent as string
            );
        
            const charge = await stripe.charges.retrieve(paymentIntent.latest_charge as string);
            await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${paymentSession.metadata?.bookingId}`,
                {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ paymentStatus: "paid", paymentMethod: charge.receipt_url }),
                }
              );
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
}