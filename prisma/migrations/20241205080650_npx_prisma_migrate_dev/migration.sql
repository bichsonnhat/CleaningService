/*
  Warnings:

  - You are about to drop the column `bathroomCount` on the `BookingDetail` table. All the data in the column will be lost.
  - You are about to drop the column `bedroomCount` on the `BookingDetail` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `BookingDetail` table. All the data in the column will be lost.
  - You are about to drop the column `durationPriceId` on the `BookingDetail` table. All the data in the column will be lost.
  - You are about to drop the column `kitchenCount` on the `BookingDetail` table. All the data in the column will be lost.
  - You are about to drop the column `livingRoomCount` on the `BookingDetail` table. All the data in the column will be lost.
  - You are about to drop the column `specialRequirements` on the `BookingDetail` table. All the data in the column will be lost.
  - You are about to drop the `DurationPrice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RoomPricing` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `serviceDetailId` to the `BookingDetail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BookingDetail" DROP CONSTRAINT "BookingDetail_durationPriceId_fkey";

-- DropForeignKey
ALTER TABLE "DurationPrice" DROP CONSTRAINT "DurationPrice_serviceTypeId_fkey";

-- DropForeignKey
ALTER TABLE "RoomPricing" DROP CONSTRAINT "RoomPricing_serviceTypeId_fkey";

-- DropIndex
DROP INDEX "BookingDetail_bookingId_key";

-- DropIndex
DROP INDEX "BookingDetail_durationPriceId_key";

-- AlterTable
ALTER TABLE "BookingDetail" DROP COLUMN "bathroomCount",
DROP COLUMN "bedroomCount",
DROP COLUMN "createdAt",
DROP COLUMN "durationPriceId",
DROP COLUMN "kitchenCount",
DROP COLUMN "livingRoomCount",
DROP COLUMN "specialRequirements",
ADD COLUMN     "serviceDetailId" UUID NOT NULL;

-- DropTable
DROP TABLE "DurationPrice";

-- DropTable
DROP TABLE "RoomPricing";

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

-- AddForeignKey
ALTER TABLE "ServiceDetail" ADD CONSTRAINT "ServiceDetail_serviceTypeId_fkey" FOREIGN KEY ("serviceTypeId") REFERENCES "ServiceType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingDetail" ADD CONSTRAINT "BookingDetail_serviceDetailId_fkey" FOREIGN KEY ("serviceDetailId") REFERENCES "ServiceDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
