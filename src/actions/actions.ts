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
 