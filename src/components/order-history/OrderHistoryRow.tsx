import React, { useState } from "react";
import Star from "../employee/Star";
import Link from "next/link";
import { Booking } from "../order/OrderTable";
import { BookingStatus } from "../quickpopup/QuickPopupAdmin";
import QuickPopupCustomer from "../quickpopup/QuickPopupCustomer";
import { useRouter } from "next/navigation";

type OrderHistoryRowProps = {
  booking: Booking;
};
const OrderHistoryRow: React.FC<OrderHistoryRowProps> = ({ booking }) => {
  const statusColor =
    booking.status === BookingStatus.Pending
      ? "bg-[#FFD154] text-[#FF9500]"
      : booking.status === BookingStatus.InProgress
      ? "bg-[#1A78F2] text-[#1A78F2]"
      : booking.status === BookingStatus.Cancelled
      ? "bg-[#EF3826] text-[#EF3826]"
      : booking.status === BookingStatus.Completed
      ? "bg-[#00B69B] text-[#00B69B]"
      : booking.status === BookingStatus.Requested
      ? "bg-[#F87171] text-[#B91C1C]"
      : booking.status === BookingStatus.Refunded
      ? "bg-[#60A5FA] text-[#1D4ED8]"
      : booking.status === BookingStatus.Declined
      ? "bg-[#F97316] text-[#C2410C]"
      : "";
  const paymentColor =
    booking.paymentStatus === "paid"
      ? "bg-[#00B69B] text-[#00B69B]"
      : "bg-[#F87171] text-[#B91C1C]";

  const [toggleHelperPopup, setToggleHelperPopup] = useState(false);
  const handleToggleHelperPopup = () => {
    setToggleHelperPopup(!toggleHelperPopup);
  };

  // Phần trăm hoàn thành
  const firstValidFeedback = booking.feedbacks.find(
    (feedback) => !feedback.reportedBy
  );
  const percentage = (firstValidFeedback?.helperRating ?? 0) * 20;
  const filledStars = Math.floor(percentage / 20);
  // Hàm render ngôi sao
  const renderRating = () => {
    const remainingPercentage = (percentage % 20) / 20;
    const starPercentages = Array.from({ length: 5 }, (_, index) => {
      if (index < filledStars) {
        return 100;
      } else if (index === filledStars) {
        return remainingPercentage * 100;
      } else {
        return 0;
      }
    });
    return (
      <div className="flex items-center ">
        {starPercentages.map((percent, index) => (
          <Star key={index} percentage={percent} />
        ))}
      </div>
    );
  };

  const formatBookingTime = (
    scheduledStartTime: Date,
    scheduledEndTime: Date
  ): string => {
    const startHour = scheduledStartTime.getHours().toString().padStart(2, "0");
    const startMinute = scheduledStartTime
      .getMinutes()
      .toString()
      .padStart(2, "0");

    const endHour = scheduledEndTime.getHours().toString().padStart(2, "0");
    const endMinute = scheduledEndTime.getMinutes().toString().padStart(2, "0");

    return `${startHour}:${startMinute} - ${endHour}:${endMinute}`;
  };

  const formatBookingDate = (scheduledStartTime: Date): string => {
    const startDate = scheduledStartTime.getDate().toString().padStart(2, "0");
    const startMonth = (scheduledStartTime.getMonth() + 1)
      .toString()
      .padStart(2, "0");
    const startYear = scheduledStartTime.getFullYear();
    return `${startDate}/${startMonth}/${startYear}`;
  };

  const router = useRouter();

  const handlePaymentStatus = (booking: Booking) => async () => {
    console.log("Payment status clicked", booking.id);
    if (booking.paymentStatus === "paid" && booking.paymentMethod) {
      router.push(booking.paymentMethod);
    }
    if (booking.paymentStatus === "pending") {
      const stripeResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/stripe?unit_amount=${
          booking.totalPrice * 100
        }&booking_id=${booking.id}`,
      );

      const data = await stripeResponse.json();
      router.push(data.url);
    }
  }

  return (
    <div
      onClick={handleToggleHelperPopup}
      className=" flex flex-wrap gap-3 w-full border-b border-gray-200 bg-white hover:bg-[#f4f7ff] h-auto items-start lg:items-center p-2.5 cursor-pointer"
    >
      <div className=" lg:flex-[2] w-full lg:w-[130px] flex items-center justify-start lg:py-6 mb-2 lg:mb-0">
        <div className="text-sm text-[#202224] font-semibold">
          <span className="lg:hidden font-bold">HELPER: </span>
          {booking.helper?.user.fullName}
        </div>
      </div>

      <div className="lg:flex-[5] w-full lg:w-[200px] flex items-center justify-start lg:py-6 mb-2 lg:mb-0">
        <div className="text-sm text-[#202224] font-semibold">
          <span className="lg:hidden font-bold">ADDRESS: </span>
          {booking.location}
        </div>
      </div>

      <div className="lg:flex-[3] w-full lg:w-[130px] flex items-center justify-start lg:justify-center lg:pl-0 mb-2 lg:mb-0">
        <div className="flex-row flex text-xs text-[#1D2C4C80] font-semibold">
          <span className="lg:hidden font-bold text-[#202224] text-sm mr-2">
            TIME:{" "}
          </span>

          <div className="flex flex-row lg:flex-col items-center lg:text-sm">
            <span className="text-[#677582]">
              {formatBookingTime(
                new Date(booking.scheduledStartTime),
                new Date(booking.scheduledEndTime)
              )}
            </span>
            <span className="text-[#1D2C4C80] ml-2 lg:hidden">
              | {formatBookingDate(new Date(booking.scheduledStartTime))}
            </span>
            <span className="text-[#1D2C4C80] hidden lg:block">
              {formatBookingDate(new Date(booking.scheduledStartTime))}
            </span>
          </div>
        </div>
      </div>

      <div className="lg:flex-[3] w-full lg:w-[100px] flex items-center lg:justify-center lg:pl-0 mb-2 lg:mb-0">
        <div className="text-xs text-[#1D2C4C80] font-semibold flex lg:flex-col items-center lg:justify-center lg:text-center">
          <span className="lg:hidden font-bold text-[#202224] text-sm  mr-2">
            RATING:
          </span>
          {renderRating()}
          <div className="hidden lg:block mt-1">
            {(() => {
              const firstValidFeedback = booking.feedbacks.find(
                (feedback) => !feedback.reportedBy
              );
              return firstValidFeedback !== null &&
                firstValidFeedback !== undefined
                ? `${firstValidFeedback.helperRating} out of 5 stars`
                : "N/A";
            })()}
          </div>
        </div>
      </div>

      <div className="lg:flex-[2] w-full lg:w-[90px] flex items-center lg:justify-center lg:py-6 mb-2 lg:mb-0">
        <div className="text-sm text-[#202224cc] lg:text-sm">
          <span className="lg:hidden font-bold">PRICE: </span>
          {`${booking.totalPrice}/vnđ`}
        </div>
      </div>

      <div className="lg:flex-[3] w-full lg:w-[140px] flex items-center lg:justify-center lg:py-6 mb-2 lg:mb-0">
        <div className=" flex flex-row items-center text-sm text-[#202224cc]">
          <span className="lg:hidden font-bold mr-2">STATUS: </span>
          <div
            className={`flex relative gap-4 justify-between items-start px-4 py-1.5 min-w-28 min-h-[27px] ${statusColor}  bg-opacity-20 rounded-md`}
          >
            <div className="z-0 flex-1 shrink my-auto basis-0 font-Averta-Bold text-[13px] text-center">
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:flex-[3] w-full lg:w-[140px] flex items-center lg:justify-center lg:py-6 mb-2 lg:mb-0">
        <div className=" flex flex-row items-center text-sm text-[#202224cc]">
          <span className="lg:hidden font-bold mr-2">PAYMENT STATUS: </span>
          <div
            className={`flex relative gap-4 justify-between items-start px-4 py-1.5 min-w-28 min-h-[27px] ${paymentColor}  bg-opacity-20 rounded-md`}
          >
            <div className="z-0 flex-1 shrink my-auto basis-0 font-Averta-Bold text-[13px] text-center"
              onClick={handlePaymentStatus(booking)}>
              {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
            </div>
          </div>
        </div>
      </div>
      {toggleHelperPopup && (
        <QuickPopupCustomer
          toggle={handleToggleHelperPopup}
          bookingId={booking.id}
        />
      )}
    </div>
  );
};

export default OrderHistoryRow;
