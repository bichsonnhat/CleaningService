import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import createPaymentLink from "@/app/(api)/(routes)/(lib)/payos-service";

// export async function GET() {
//   try {
//     const serviceDetails = await prisma.serviceDetail.findMany({
//       include: {
//         serviceType: {
//           select: { name: true },
//         },
//       },
//     });

//     return NextResponse.json(serviceDetails);
//   } catch (error) {
//     console.error("Error fetching service details", error);
//     return NextResponse.json(
//       { status: "error", error: "Failed to fetch service details" },
//       { status: 500 }
//     );
//   }
// }

//Create a new booking
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const newBooking = await prisma.booking.create({
      data,
    });

    const paymentLink = await createPaymentLink(newBooking.id);

    return NextResponse.json({
      paymentLink: paymentLink,
    });
  } catch (error) {
    console.error("Error creating booking: ", error);
    return NextResponse.json(
      { error: "Failed to create a new booking" },
      { status: 500 }
    );
  }
}
