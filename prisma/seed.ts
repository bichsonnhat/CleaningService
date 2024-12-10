import { 
    blacklistedUserData,
    bookContractData,
    bookingData,
    bookingDetailData,
    contractData,
    feedbackData,
    helperAvailabilityData,
    helperData,
    refundData,
    serviceDetailData,
    serviceCategoryData,
    serviceTypeData,
    userData 
} from "./mockData";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    for (let user of userData) {
        await prisma.$executeRaw`INSERT INTO "User" ("id", "gender", "fullName", "email",
            "dateOfBirth", "identifyCard", "address", "phoneNumber", "createdAt", "updatedAt", "status", 
            "numberOfViolations") 
            VALUES (${user.id}::uuid, ${user.gender}, ${user.fullName}, ${user.email} , ${user.dateOfBirth}::timestamp, ${user.identifyCard}, ${user.address}, 
            ${user.phoneNumber}, ${user.createdAt}, ${user.updatedAt}, ${user.status}, ${user.numberOfViolations})`;
    }

    for (let serviceCategory of serviceCategoryData) {
        await prisma.$executeRaw`INSERT INTO "ServiceCategory" ("id", "name", "description", "createdAt", "isActive") 
            VALUES (${serviceCategory.id}::uuid, ${serviceCategory.name}, ${serviceCategory.description}, ${serviceCategory.createdAt}, ${serviceCategory.isActive})`;
    }

    for (let serviceType of serviceTypeData) {
        await prisma.$executeRaw`INSERT INTO "ServiceType" ("id", "categoryId", "name", 
            "description", "basePrice", "createdAt", "isActive") 
            VALUES (${serviceType.id}::uuid, ${serviceType.categoryId}::uuid, ${serviceType.name}, ${serviceType.description}, ${serviceType.basePrice}, ${serviceType.createdAt}, 
            ${serviceType.isActive})`;
    }

    for (let helper of helperData) {
        await prisma.$executeRaw`INSERT INTO "Helper" ("id", "experienceDescription", "resumeUploaded", 
            "servicesOffered", "salaryExpectation", "averageRating", "completedJobs", "cancelledJobs", "createdAt", "updatedAt") 
            VALUES (${helper.id}::uuid, ${helper.experienceDescription}, ${helper.resumeUploaded}, ${helper.servicesOffered}::uuid[], ${helper.salaryExpectation}, ${helper.averageRating}, 
            ${helper.completedJobs}, ${helper.cancelledJobs}, ${helper.createdAt}, ${helper.updatedAt})`;
    }

    for (let helperAvailability of helperAvailabilityData) {
        await prisma.$executeRaw`INSERT INTO "HelperAvailability" ("id", "helperId", "startDatetime", 
            "endDatetime", "availabilityType", "status", "requestReason", "rejectionReason", "approvedById", "createdAt", 
            "updatedAt") 
            VALUES (${helperAvailability.id}::uuid, ${helperAvailability.helperId}::uuid, ${helperAvailability.startDatetime}::timestamp, ${helperAvailability.endDatetime}::timestamp, ${helperAvailability.availabilityType}, ${helperAvailability.status}, 
            ${helperAvailability.requestReason}, ${helperAvailability.rejectionReason}, ${helperAvailability.approvedById}, ${helperAvailability.createdAt}, ${helperAvailability.updatedAt})`;
    }

    for (let booking of bookingData) {
        await prisma.$executeRaw`INSERT INTO "Booking" ("id", "customerId", "helperId", 
            "serviceCategoryId", "location", "scheduledStartTime", "scheduledEndTime", "status", "bookingNote", "cancellationReason", "totalPrice", 
            "paymentStatus", "paymentMethod", "createdAt", "updatedAt") 
            VALUES (${booking.id}::uuid, ${booking.customerId}::uuid, ${booking.helperId}::uuid, ${booking.serviceCategoryId}::uuid, ${booking.location}, ${booking.scheduledStartTime}::timestamp, 
            ${booking.scheduledEndTime}::timestamp, ${booking.status}, ${booking.bookingNote}, ${booking.cancellationReason}, ${booking.totalPrice}, ${booking.paymentStatus}, ${booking.paymentMethod}, ${booking.createdAt}, 
            ${booking.updatedAt})`;
    }

    for (let bookContract of bookContractData) {
        await prisma.$executeRaw`INSERT INTO "BookingContract" ("id", "bookingId", "content", "createdAt") 
            VALUES (${bookContract.id}::uuid, ${bookContract.bookingId}::uuid, ${bookContract.content}, ${bookContract.createdAt})`;
    }

    for (let contract of contractData) {
        await prisma.$executeRaw`INSERT INTO "Contract" ("id", "description", "createdAt", "updatedAt") 
            VALUES (${contract.id}::uuid, ${contract.description}, ${contract.createdAt}, ${contract.updatedAt})`;
    }

    for (let feedback of feedbackData) {
        await prisma.$executeRaw`INSERT INTO "Feedback" ("id", "booking_id", "reportedBy", 
            "helperRating", "title", "description", "created_at", "updated_at") 
            VALUES (${feedback.id}::uuid, ${feedback.booking_id}::uuid, ${feedback.reportedBy}, ${feedback.helperRating}, ${feedback.title}, ${feedback.description}, 
            ${feedback.created_at}, ${feedback.updated_at})`;
    }

    for (let refund of refundData) {
        await prisma.$executeRaw`INSERT INTO "Refund" ("id", "booking_id", "requested_by", 
            "reason", "status", "created_at", "resolved_at") 
            VALUES (${refund.id}::uuid, ${refund.booking_id}::uuid, ${refund.requested_by}, ${refund.reason}, ${refund.status}, ${refund.created_at}, 
            ${refund.resolved_at}::timestamp)`;
    }

    for (let serviceDetail of serviceDetailData) {
        await prisma.$executeRaw`INSERT INTO "ServiceDetail" ("id", "serviceTypeId", "title", 
            "additionalPrice", "multiplyPrice", "createdAt") 
            VALUES (${serviceDetail.id}::uuid, ${serviceDetail.serviceTypeId}::uuid, ${serviceDetail.title}, ${serviceDetail.additionalPrice}, ${serviceDetail.multiplyPrice}, ${serviceDetail.createdAt})`;
    }

    for (let bookingDetail of bookingDetailData) {
        await prisma.$executeRaw`INSERT INTO "BookingDetail" ("id", "bookingId", "serviceDetailId") 
            VALUES (${bookingDetail.id}::uuid, ${bookingDetail.bookingId}::uuid, ${bookingDetail.serviceDetailId}::uuid)`;
    }

    for (let blacklistedUser of blacklistedUserData) {
        await prisma.$executeRaw`INSERT INTO "BlacklistedUser" ("id", "userId", "reason", 
            "blacklistedAt", "blacklistedBy", "isPermanent", "expiryDate") 
            VALUES (${blacklistedUser.id}::uuid, ${blacklistedUser.userId}::uuid, ${blacklistedUser.reason}, ${blacklistedUser.blacklistedAt}, ${blacklistedUser.blacklistedBy}::uuid, ${blacklistedUser.isPermanent}, 
            ${blacklistedUser.expiryDate}::timestamp)`;
    }
}

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(() => {
    prisma.$disconnect();
});

// Run the seed script
// xem cai ben duoi va lam theo
// https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding