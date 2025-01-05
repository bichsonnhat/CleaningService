-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "orderNumber" DROP NOT NULL,
ALTER COLUMN "paymentMethod" SET DATA TYPE TEXT;
