"use client";
import React from "react";
import { bookingStore } from "@/utils/store/booking.store";
import HomeCleaning from "@/components/step-1/HomeCleaning";
import OtherServices from "@/components/step-1/OtherServices";

const Step_1 = () => {
  const bookingData = bookingStore((state: any) => state.bookingData);
  const serviceCategoryName = bookingData?.serviceCategory?.name;

  return (
    <>
      {serviceCategoryName === "Home Cleaning" ? (
        <HomeCleaning />
      ) : (
        <OtherServices />
      )}
    </>
  );
};

export default Step_1;
