"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function PaymentSuccess() {
  const router = useRouter();
  const [isCreatingBooking, setIsCreatingBooking] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const createBooking = async () => {
      try {
        // const userResponse = await fetch(
        //         `${process.env.NEXT_PUBLIC_API_URL}/api/user-info`
        //       );
        //       const userInfo = await userResponse.json();

        //       if (typeof bookingData.bookingInfomation[1].value === "number") {
        //         bookingData.bookingInfomation[1].value =
        //           bookingData.bookingInfomation[1].value.toString();
        //       }
        //       const scheduleDates = createScheduleDates(
        //         bookingData.bookingDate,
        //         bookingData.bookingTiming,
        //         bookingData.bookingInfomation[1].value
        //       );

        //       const bookingPayload = {
        //         customerId: userInfo.userId,
        //         serviceCategoryId: bookingData.serviceCategory?.id,
        //         location: bookingData.bookingAddress,
        //         scheduledStartTime: scheduleDates.scheduleDateStart,
        //         scheduledEndTime: scheduleDates.scheduleDateEnd,
        //         bookingNote: bookingData.bookingNote,
        //         totalPrice: totalPrice,
        //       };
        //       const bookingResponse = await fetch(
        //         `${process.env.NEXT_PUBLIC_API_URL}/api/bookings`,
        //         {
        //           method: "POST",
        //           headers: {
        //             "Content-Type": "application/json",
        //           },
        //           body: JSON.stringify(bookingPayload),
        //         }
        //       );

        //       if (!bookingResponse.ok) {
        //         throw new Error("Failed to create booking");
        //       }
        setIsCreatingBooking(false);
      } catch (error) {
        console.error("Error creating booking:", error);
        setError("Failed to create booking. Please contact support.");
        setIsCreatingBooking(false);
      }
    };

    createBooking();

    // Timer để redirect về home
    const timeout = setTimeout(() => {
      router.replace("/");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [router]);

  if (error) {
    return (
      <div className="flex m-auto flex-col gap-5 items-center justify-center">
        <Image
          src="/images/Header/Logo.svg"
          alt="logo"
          width={100}
          height={100}
        />
        <div className="text-center space-y-3">
          <h4 className="text-3xl font-semibold text-red-600">Oops!</h4>
          <p className="text-lg">{error}</p>
          <p className="text-sm">Redirecting to homepage shortly...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex m-auto flex-col gap-5 items-center justify-center">
      <Image
        src="/images/Header/Logo.svg"
        alt="logo"
        width={100}
        height={100}
      />

      <div className="text-center space-y-3">
        <h4 className="text-3xl font-semibold">Thank you!</h4>
        <div className="space-y-1">
          <p className="text-lg">
            Your payment has been successfully processed.
          </p>
          {isCreatingBooking ? (
            <p className="text-lg">Creating your booking...</p>
          ) : (
            <>
              <p className="text-lg">Your booking has been confirmed!</p>
              <p className="text-lg">
                If you have any questions or need assistance, feel free to
                contact us.
              </p>
              <p className="text-lg">We look forward to serving you!</p>
            </>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-sm">
            You'll be automatically redirected to the homepage shortly.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
