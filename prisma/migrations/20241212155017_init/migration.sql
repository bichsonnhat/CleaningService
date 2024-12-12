-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "gender" VARCHAR(10),
    "fullName" VARCHAR(150) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "dateOfBirth" DATE NOT NULL,
    "identifyCard" TEXT,
    "address" TEXT,
    "phoneNumber" VARCHAR(20) NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" VARCHAR(50) NOT NULL DEFAULT 'active',
    "numberOfViolations" INTEGER DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Helper" (
    "id" TEXT NOT NULL,
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
    "helperId" TEXT NOT NULL,
    "startDatetime" TIMESTAMP NOT NULL,
    "endDatetime" TIMESTAMP NOT NULL,
    "availabilityType" VARCHAR(50) NOT NULL,
    "status" VARCHAR(50) NOT NULL DEFAULT 'pending',
    "requestReason" TEXT,
    "rejectionReason" TEXT,
    "approvedById" TEXT,
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
CREATE TABLE "ServiceDetail" (
    "id" UUID NOT NULL,
    "serviceTypeId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "additionalPrice" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "multiplyPrice" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ServiceDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" UUID NOT NULL,
    "customerId" TEXT NOT NULL,
    "helperId" TEXT,
    "serviceCategoryId" UUID NOT NULL,
    "location" TEXT NOT NULL,
    "scheduledStartTime" TIMESTAMP NOT NULL,
    "scheduledEndTime" TIMESTAMP NOT NULL,
    "status" VARCHAR(50) NOT NULL DEFAULT 'pending',
    "bookingNote" TEXT,
    "cancellationReason" TEXT,
    "totalPrice" DECIMAL(10,2) NOT NULL,
    "paymentStatus" VARCHAR(50) NOT NULL DEFAULT 'pending',
    "paymentMethod" VARCHAR(50),
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingDetail" (
    "id" UUID NOT NULL,
    "bookingId" UUID NOT NULL,
    "serviceDetailId" UUID NOT NULL,

    CONSTRAINT "BookingDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingContract" (
    "id" UUID NOT NULL,
    "bookingId" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL,

    CONSTRAINT "BookingContract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contract" (
    "id" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "booking_id" UUID NOT NULL,
    "reportedBy" BOOLEAN NOT NULL,
    "helperRating" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Refund" (
    "id" TEXT NOT NULL,
    "booking_id" UUID NOT NULL,
    "requested_by" BOOLEAN NOT NULL,
    "reason" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolved_at" TIMESTAMP NOT NULL,

    CONSTRAINT "Refund_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlacklistedUser" (
    "id" UUID NOT NULL,
    "userId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "blacklistedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "blacklistedBy" TEXT NOT NULL,
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
CREATE UNIQUE INDEX "BookingContract_bookingId_key" ON "BookingContract"("bookingId");

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
ALTER TABLE "ServiceDetail" ADD CONSTRAINT "ServiceDetail_serviceTypeId_fkey" FOREIGN KEY ("serviceTypeId") REFERENCES "ServiceType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_helperId_fkey" FOREIGN KEY ("helperId") REFERENCES "Helper"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_serviceCategoryId_fkey" FOREIGN KEY ("serviceCategoryId") REFERENCES "ServiceCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingDetail" ADD CONSTRAINT "BookingDetail_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingDetail" ADD CONSTRAINT "BookingDetail_serviceDetailId_fkey" FOREIGN KEY ("serviceDetailId") REFERENCES "ServiceDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingContract" ADD CONSTRAINT "BookingContract_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Refund" ADD CONSTRAINT "Refund_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlacklistedUser" ADD CONSTRAINT "BlacklistedUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlacklistedUser" ADD CONSTRAINT "BlacklistedUser_blacklistedBy_fkey" FOREIGN KEY ("blacklistedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
