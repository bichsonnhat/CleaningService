import PayOS from "@payos/node";
import { CheckoutRequestType } from "@payos/node/lib/type";
import prisma from "@/lib/db";

const payOS = new PayOS(
  process.env.PAYOS_CLIENT_ID!,
  process.env.PAYOS_API_KEY!,
  process.env.PAYOS_CHECKSUM_KEY!
);

export default async function createPaymentLink(
  id: string
): Promise<string | undefined> {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: { customer: true },
    });

    if (booking === null) {
      throw new Error("Booking not found");
    }

    const body: CheckoutRequestType = {
      orderCode: booking.orderNumber! + 7000,
      amount: Number(booking.totalPrice) * 20,
      description: `Clean Serivce Payment`,
      cancelUrl: process.env.NEXT_PUBLIC_API_URL + "/payment-cancelled",
      returnUrl: process.env.NEXT_PUBLIC_API_URL + "/payment-success",
      buyerName: `${booking.customer.fullName}`,
      buyerEmail: `${booking.customer.email}`,
      buyerPhone: `${booking.customer.phoneNumber}`,
      buyerAddress: `${booking.customer.address}`,
      expiredAt: timestamp20MinutesFromNow(),
    };

    const paymentLink = await payOS.createPaymentLink(body);

    return paymentLink.checkoutUrl;
  } catch (error) {
    console.error("Error creating payment link", error);
    return undefined;
  }
}

const timestamp20MinutesFromNow = () => {
  const now = new Date();
  const future = new Date(now.getTime() + 20 * 60 * 1000);
  return Math.floor(future.getTime() / 1000);
};
