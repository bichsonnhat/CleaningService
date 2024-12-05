import React from "react";
import Star from "../employee/Star";
import Link from "next/link";
import { Booking } from "../order/OrderTable";

type OrderHistoryRowProps = {
  booking: Booking;
};

const OrderHistoryRow: React.FC<OrderHistoryRowProps> = ({ booking }) => {
  const startTimeString: string = new Date(
    booking.scheduledStartTime
  ).toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const endTimeString: string = new Date(
    booking.scheduledEndTime
  ).toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const dateString: string = new Date(
    booking.scheduledStartTime
  ).toLocaleDateString("en-US");

  const statusColor =
    booking.status === "pending"
      ? "bg-[#FFD154] text-[#FF9500]"
      : booking.status === "inprogress"
      ? "bg-[#1A78F2] text-[#1A78F2]"
      : booking.status === "cancelled"
      ? "bg-[#EF3826] text-[#EF3826]"
      : booking.status === "completed"
      ? "bg-[#00B69B] text-[#00B69B]"
      : "";

  const percentage = (booking.feedbacks[0]?.helperRating ?? 0) * 20;
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

  return (
    <div className="flex flex-wrap gap-3 w-full border-b border-gray-200 bg-white hover:bg-[#f4f7ff] h-auto items-start md:items-center p-2.5 cursor-pointer">
      <div className="w-full md:w-[210px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224] font-semibold">
          <span className="md:hidden font-bold">HELPER: </span>
          {booking.helper.user.fullName}
        </div>
      </div>

      <div className="w-full md:w-[340px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224] font-semibold">
          <span className="md:hidden font-bold">ADDRESS: </span>
          {booking.location}
        </div>
      </div>

      <div className="w-full md:w-[200px] flex items-center justify-start md:pl-0 mb-2 md:mb-0">
        <div className="text-xs text-[#1D2C4C80] font-semibold">
          <span className="md:hidden font-bold text-[#202224]">TIME:</span>

          <div className="flex flex-col  md:items-center">
            <span className="text-[#677582]">
              {startTimeString}{" "}
              <span className="text-[#1D2C4C80] mx-1">to</span> {endTimeString}
            </span>
            <span className="text-[#1D2C4C80] md:ml-2">{dateString}</span>
          </div>
        </div>
      </div>

      <div className="w-full md:w-[110px] flex items-center justify-start md:pl-0 mb-2 md:mb-0 mr-10">
        <div className="text-xs text-[#1D2C4C80] font-semibold text-center">
          <span className="md:hidden font-bold text-[#202224]">RATING:</span>
          {renderRating()}
          <div className="mt-1">
            {booking.feedbacks.length !== 0 &&
            booking.feedbacks[0]?.helperRating !== null
              ? `${
                  booking.feedbacks.length !== 0 &&
                  booking.feedbacks[0]?.helperRating
                } out of 5 stars`
              : "N/A"}
          </div>
        </div>
      </div>

      <div className="w-full md:w-[120px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224cc]">
          <span className="md:hidden font-bold">PRICE: </span>
          {`${booking.totalPrice}/vnđ`}
        </div>
      </div>

      <div className="w-full md:w-[120px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224cc]">
          <span className="md:hidden font-bold">STATUS: </span>
          <div
            className={`md:w-[100px] text-center flex relative gap-4 justify-between items-start px-4 py-1.5 min-h-[27px] ${statusColor}  bg-opacity-20 rounded-md`}
          >
            <div className="z-0 flex-1 shrink my-auto basis-0 font-Averta-Bold text-[13px]">
              {booking.status}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryRow;
