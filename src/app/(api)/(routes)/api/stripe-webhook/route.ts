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
                  body: JSON.stringify({ paymentStatus: "paid", paymentMethod: charge.receipt_url, paymentIntentId: paymentSession.payment_intent }),
                }
              );
            break;
        case 'refund.created':
            const paymentIntentId = event.data.object.payment_intent;
            const bookingResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings?role=admin&userId=adminID`);
            const bookings = await bookingResponse.json();
            const booking = bookings.find((booking: any) => booking.paymentIntentId === paymentIntentId);
            const refundResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/refunds?role=admin&userId=adminID`);
            const refunds = await refundResponse.json();
            const refund = refunds.find((refund: any) => refund.bookingId === booking.id);
            await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/refunds/${refund.id}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ status: "refunded", resolved_at: new Date() }),
                }
              );
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
}