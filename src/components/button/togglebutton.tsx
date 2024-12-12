"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { bookingStore } from "@/utils/store/booking.store";
import { BookingData } from "@/types/booking";

interface ToggleButtonProps {
  contentText: string;
  price: number;
  imageSrc: string;
  imageSrc2: string;
  className: string;
  bookingData: BookingData;
}

export function ToggleButton({
  contentText,
  price,
  imageSrc,
  imageSrc2,
  className,
  bookingData,
}: ToggleButtonProps) {
  const bookingUpdate = bookingStore((state: any) => state.updateBookingData);
  const isIncluded = bookingData.anySpecificSpot?.includes(contentText);

  const handleToggle = () => {
    if (!isIncluded) {
      bookingUpdate({
        anySpecificSpot: [...(bookingData.anySpecificSpot || []), contentText],
      });
      bookingUpdate({
        totalPrice: bookingData.totalPrice
          ? bookingData.totalPrice + price
          : price,
      });
    } else {
      bookingUpdate({
        anySpecificSpot: bookingData.anySpecificSpot?.filter(
          (item: string) => item !== contentText
        ),
      });
      bookingUpdate({
        totalPrice: bookingData.totalPrice ? bookingData.totalPrice - price : 0,
      });
    }
  };

  return (
    <Button
      onClick={handleToggle}
      className={`${className} p-4 inline-grid items-center justify-center
             ${
               isIncluded
                 ? "border-[#1A78F2] text-[#1A78F2]"
                 : "border-[#d3d8dd] text-[#4f6071]"
             }`}
    >
      <Image
        src={isIncluded ? imageSrc2 : imageSrc}
        alt={contentText}
        width={32}
        height={32}
        className="mb-2 m-auto max-h-[56px] max-w-[56px] min-h-[16px] min-w-[16px] md:h-[4.2vw] md:w-[4.2vw]"
      />
      <span className={`text-lg`}>{contentText}</span>
      <span className="text-base font-Averta-Semibold text-[#9FA7B0] mt-1">
        ${price}
      </span>
    </Button>
  );
}
