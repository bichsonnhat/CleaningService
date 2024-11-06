-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "userType" VARCHAR(50) NOT NULL,
    "gender" VARCHAR(10),
    "profilePicture" VARCHAR(512),
    "fullName" VARCHAR(150) NOT NULL,
    "dateOfBirth" DATE NOT NULL,
    "identifyCard" TEXT,
    "address" TEXT,
    "phoneNumber" VARCHAR(20) NOT NULL,
    "email" VARCHAR(255),
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" VARCHAR(50) NOT NULL DEFAULT 'active',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Helper" (
    "id" UUID NOT NULL,
    "experienceDescription" TEXT,
    "resumeUploaded" TEXT,
    "servicesOffered" UUID[],
    "salaryExpectation" DECIMAL(10,2) NOT NULL,
    "averageRating" DECIMAL(2,1) DEFAULT 0,
    "completedJobs" INTEGER NOT NULL DEFAULT 0,
    "cancelledJobs" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Helper_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HelperAvailability" (
    "id" UUID NOT NULL,
    "helperId" UUID NOT NULL,
    "startDatetime" TIMESTAMP NOT NULL,
    "endDatetime" TIMESTAMP NOT NULL,
    "availabilityType" VARCHAR(50) NOT NULL,
    "status" VARCHAR(50) NOT NULL DEFAULT 'pending',
    "requestReason" TEXT,
    "rejectionReason" TEXT,
    "approvedById" UUID,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HelperAvailability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceCategory" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ServiceCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceType" (
    "id" UUID NOT NULL,
    "categoryId" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "basePrice" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ServiceType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomPricing" (
    "id" UUID NOT NULL,
    "serviceTypeId" UUID NOT NULL,
    "roomType" VARCHAR(50) NOT NULL,
    "roomCount" INTEGER,
    "additionalPrice" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoomPricing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DurationPrice" (
    "id" UUID NOT NULL,
    "serviceTypeId" UUID NOT NULL,
    "durationHours" INTEGER NOT NULL,
    "priceMultiplier" DECIMAL(3,2) NOT NULL DEFAULT 1.00,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DurationPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" UUID NOT NULL,
    "customerId" UUID NOT NULL,
    "helperId" UUID,
    "serviceTypeId" UUID NOT NULL,
    "location" TEXT NOT NULL,
    "scheduledStartTime" TIMESTAMP NOT NULL,
    "scheduledEndTime" TIMESTAMP NOT NULL,
    "status" VARCHAR(50) NOT NULL DEFAULT 'pending',
    "cancellationReason" TEXT,
    "totalPrice" DECIMAL(10,2) NOT NULL,
    "paymentStatus" VARCHAR(50) NOT NULL DEFAULT 'pending',
    "paymentMethod" VARCHAR(50),
    "helperRating" DECIMAL(2,1),
    "customerFeedback" TEXT,
    "helperFeedback" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingDetail" (
    "id" UUID NOT NULL,
    "bookingId" UUID NOT NULL,
    "bedroomCount" INTEGER NOT NULL DEFAULT 0,
    "bathroomCount" INTEGER NOT NULL DEFAULT 0,
    "kitchenCount" INTEGER NOT NULL DEFAULT 0,
    "livingRoomCount" INTEGER NOT NULL DEFAULT 0,
    "specialRequirements" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookingDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contract" (
    "id" UUID NOT NULL,
    "bookingId" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Complaint" (
    "id" UUID NOT NULL,
    "bookingId" UUID NOT NULL,
    "reportedById" UUID NOT NULL,
    "reportedUserId" UUID NOT NULL,
    "reason" TEXT NOT NULL,
    "status" VARCHAR(50) NOT NULL DEFAULT 'pending',
    "resolution" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP,

    CONSTRAINT "Complaint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlacklistedUser" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "reason" TEXT NOT NULL,
    "blacklistedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "blacklistedBy" UUID NOT NULL,
    "isPermanent" BOOLEAN NOT NULL DEFAULT false,
    "expiryDate" TIMESTAMP,

    CONSTRAINT "BlacklistedUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "HelperAvailability_helperId_startDatetime_endDatetime_idx" ON "HelperAvailability"("helperId", "startDatetime", "endDatetime");

-- CreateIndex
CREATE INDEX "HelperAvailability_status_idx" ON "HelperAvailability"("status");

-- CreateIndex
CREATE UNIQUE INDEX "no_overlapping_approved_time_where_status_approved" ON "HelperAvailability"("helperId", "startDatetime", "endDatetime");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceCategory_name_key" ON "ServiceCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceType_categoryId_name_key" ON "ServiceType"("categoryId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "RoomPricing_serviceTypeId_roomType_roomCount_key" ON "RoomPricing"("serviceTypeId", "roomType", "roomCount");

-- CreateIndex
CREATE UNIQUE INDEX "DurationPrice_serviceTypeId_durationHours_key" ON "DurationPrice"("serviceTypeId", "durationHours");

-- CreateIndex
CREATE UNIQUE INDEX "BookingDetail_bookingId_key" ON "BookingDetail"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "Contract_bookingId_key" ON "Contract"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "BlacklistedUser_userId_key" ON "BlacklistedUser"("userId");

-- AddForeignKey
ALTER TABLE "Helper" ADD CONSTRAINT "Helper_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelperAvailability" ADD CONSTRAINT "HelperAvailability_helperId_fkey" FOREIGN KEY ("helperId") REFERENCES "Helper"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HelperAvailability" ADD CONSTRAINT "HelperAvailability_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceType" ADD CONSTRAINT "ServiceType_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ServiceCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomPricing" ADD CONSTRAINT "RoomPricing_serviceTypeId_fkey" FOREIGN KEY ("serviceTypeId") REFERENCES "ServiceType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DurationPrice" ADD CONSTRAINT "DurationPrice_serviceTypeId_fkey" FOREIGN KEY ("serviceTypeId") REFERENCES "ServiceType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_helperId_fkey" FOREIGN KEY ("helperId") REFERENCES "Helper"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_serviceTypeId_fkey" FOREIGN KEY ("serviceTypeId") REFERENCES "ServiceType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingDetail" ADD CONSTRAINT "BookingDetail_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Complaint" ADD CONSTRAINT "Complaint_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Complaint" ADD CONSTRAINT "Complaint_reportedById_fkey" FOREIGN KEY ("reportedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Complaint" ADD CONSTRAINT "Complaint_reportedUserId_fkey" FOREIGN KEY ("reportedUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlacklistedUser" ADD CONSTRAINT "BlacklistedUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlacklistedUser" ADD CONSTRAINT "BlacklistedUser_blacklistedBy_fkey" FOREIGN KEY ("blacklistedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
