import React from "react";
import Star from "../employee/Star";
import Link from "next/link";

type JobHistoryRowProps = {
  id: string;
  customerName: string;
  location: string;
  scheduledStartTime: Date;
  scheduledEndTime: Date;
  helperRating?: number | null;
  totalPrice: number;
  status: "Pending" | "In Progress" | "Cancelled" | "Completed";
};
const JobHistoryRow: React.FC<JobHistoryRowProps> = ({
  id,
  customerName,
  location,
  scheduledEndTime,
  scheduledStartTime,
  helperRating,
  totalPrice,
  status,
}) => {
  const startTimeString: string = scheduledStartTime.toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const endTimeString: string = scheduledEndTime.toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const dateString: string = scheduledStartTime.toLocaleDateString("en-US");
  const statusColor =
    status === "Pending"
      ? "bg-[#FFD154] text-[#FF9500]"
      : status === "In Progress"
      ? "bg-[#1A78F2] text-[#1A78F2]"
      : status === "Cancelled"
      ? "bg-[#EF3826] text-[#EF3826]"
      : status === "Completed"
      ? "bg-[#00B69B] text-[#00B69B]"
      : "";
  // Phần trăm hoàn thành
  const percentage = (helperRating ?? 0) * 20;
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

  const formatBookingTime = (scheduledStartTime: Date, scheduledEndTime: Date): string => {
    const startHour = scheduledStartTime.getHours().toString().padStart(2, "0");
    const startMinute = scheduledStartTime.getMinutes().toString().padStart(2, "0");

    const endHour = scheduledEndTime.getHours().toString().padStart(2, "0");
    const endMinute = scheduledEndTime.getMinutes().toString().padStart(2, "0");

    

    return `${startHour}:${startMinute} - ${endHour}:${endMinute}`;
  }

  const formatBookingDate = (scheduledStartTime: Date): string => {
    const startDate = scheduledStartTime.getDate().toString().padStart(2, "0");
    const startMonth = (scheduledStartTime.getMonth() + 1).toString().padStart(2, "0");
    const startYear = scheduledStartTime.getFullYear();
    return `${startDate}/${startMonth}/${startYear}`;
  }

  return (
    <div className=" flex flex-wrap gap-3 w-full border-b border-gray-200 bg-white hover:bg-[#f4f7ff] h-auto items-start lg:items-center p-2.5 cursor-pointer">
      <div className=" lg:flex-[2] w-full lg:w-[130px] flex items-center justify-start lg:py-6 mb-2 lg:mb-0">
        <div className="text-sm text-[#202224] font-semibold">
          <span className="lg:hidden font-bold">CUSTOMER: </span>
          {customerName}
        </div>
      </div>

      <div className="lg:flex-[5] w-full lg:w-[200px] flex items-center justify-start lg:justify-center lg:py-6 mb-2 lg:mb-0">
        <div className="text-sm text-[#202224] font-semibold">
          <span className="lg:hidden font-bold">ADDRESS: </span>
          {location}
        </div>
      </div>

      <div className="lg:flex-[3] w-full lg:w-[130px] flex items-center justify-start lg:justify-center lg:pl-0 mb-2 lg:mb-0">
        <div className="flex-row flex text-xs text-[#1D2C4C80] font-semibold">
          <span className="lg:hidden font-bold text-[#202224] text-sm mr-2">TIME:  </span>

          <div className="flex flex-row lg:flex-col items-center lg:text-sm">
            <span className="text-[#677582]">
              {formatBookingTime(scheduledStartTime, scheduledEndTime)}
            </span>
            <span className="text-[#1D2C4C80] ml-2 lg:hidden">| {formatBookingDate(scheduledStartTime)}</span>
            <span className="text-[#1D2C4C80] hidden lg:block">{formatBookingDate(scheduledStartTime)}</span>
          </div>
        </div>
      </div>

      <div className="lg:flex-[3] w-full lg:w-[100px] flex items-center lg:justify-center lg:pl-0 mb-2 lg:mb-0">
        <div className="text-xs text-[#1D2C4C80] font-semibold flex lg:flex-col items-center lg:justify-center lg:text-center">
          <span className="lg:hidden font-bold text-[#202224] text-sm  mr-2">RATING:</span>
          {renderRating()}
          <div className="hidden lg:block mt-1">
            {helperRating !== null ? `${helperRating} out of 5 stars` : "N/A"}
          </div>
        </div>
      </div>

      <div className="lg:flex-[2] w-full lg:w-[90px] flex items-center lg:justify-center lg:py-6 mb-2 lg:mb-0">
        <div className="text-sm text-[#202224cc] lg:text-sm">
          <span className="lg:hidden font-bold">PRICE: </span>
          {`$${totalPrice}`}
        </div>
      </div>

      <div className="lg:flex-[3] w-full lg:w-[140px] flex items-center lg:justify-center lg:py-6 mb-2 lg:mb-0">
        <div className=" flex flex-row items-center text-sm text-[#202224cc]">
          <span className="lg:hidden font-bold mr-2">STATUS: </span>
          <div
            className={`flex relative gap-4 justify-between items-start px-4 py-1.5 min-w-28 min-h-[27px] ${statusColor}  bg-opacity-20 rounded-md`}
          >
            <div className="z-0 flex-1 shrink my-auto basis-0 font-Averta-Bold text-[13px] text-center">
              {status}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default JobHistoryRow;
