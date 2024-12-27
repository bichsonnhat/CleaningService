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

    const orderCode = Date.now(); //Sample

    const body: CheckoutRequestType = {
      orderCode: orderCode,
      amount: Number(booking.totalPrice),
      description: `khang dat hang`,
      cancelUrl: "/payment-cancelled",
      returnUrl: "/payment-success",
      buyerName: `${booking.customer.fullName}`,
      buyerEmail: `${booking.customer.email}`,
      buyerPhone: `${booking.customer.phoneNumber}`,
      buyerAddress: `${booking.customer.address}`,
      expiredAt: timestamp20MinutesFromNow(),
    };

    const paymentLink = await payOS.createPaymentLink(body);
    console.log("Payment link 1: ", paymentLink);

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
