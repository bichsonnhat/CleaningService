"use server";
import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import exp from "constants";
import { randomUUID } from "crypto";

export async function addHelper(
  fullName: string,
  dateOfBirth: Date,
  gender: string,
  phoneNumber: string,
  email: string,
  salaryExpectation: number,
  experienceDescription: string,
  resumeUploaded: string,
  servicesOffered: string[],
  address: string,
) {
  const newHelper = await prisma.helper.create({
    data: {
      user: {
        create: {
          fullName,
          dateOfBirth,
          gender,
          phoneNumber,
          address,
        },
      },
      salaryExpectation,
      experienceDescription,
      resumeUploaded,
      servicesOffered,
    },
    include: {
      user: true,
    },
  });

  return newHelper;
}

export async function addBookingDetail(
    bedroomCount: number,
    bathroomCount: number,
) {
    const bookingDetail = await prisma.bookingDetail.create({
        data: {
            booking: {
                connect: {
                    id: randomUUID(),
                },
            },
            bedroomCount,
            bathroomCount,
            durationPrice: {
                create: {
                    id: randomUUID(),
                    durationHours: 1, // example value
                    serviceType: {
                        connect: {
                            id: "some-service-type-id", // replace with actual service type id
                        },
                    },
                },
            }
        }
    });
    console.log(bookingDetail);
}

export async function addServiceCategory(

) {
    const serviceCategory = await prisma.serviceCategory.create({
        data: {
            name: "Cleaning",
            description: "Cleaning service",
        }
    });
}

export async function Clerk(
) {
  console.log("Clerk");
  const user = await currentUser();
  console.log(user);
}
 