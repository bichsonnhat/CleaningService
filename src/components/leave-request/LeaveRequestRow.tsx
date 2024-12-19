import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LeaveRequestRow: React.FC<LeaveRequestRowProps> = ({
  id,
  startDatetime,
  endDatetime,
  status,
  requestReason,
  helper,
}) => {
  const router = useRouter();

  const statusColor =
    status.toLowerCase() === "approved"
      ? "bg-[#ccf0eb] text-[#00b69b]"
      : status.toLowerCase() === "cancelled" ||
        status.toLowerCase() === "rejected"
      ? "bg-[#fcd7d4] text-[#ef3826]"
      : "bg-[#fce7af] text-[#FF9500]";

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    // const hours = date.getUTCHours().toString().padStart(2, "0");
    // const minutes = date.getUTCMinutes().toString().padStart(2, "0");

    return `${day}/${month}/${year}`;
  };

  const checkDate = (startTime: string, endTime: string): JSX.Element => {
    const start = formatDate(startTime);
    const end = formatDate(endTime);

    if (start === end) {
      return <>On {start}</>;
    }

    return (
      <>
        From {start}
        <span className="hidden lg:inline">
          <br />
        </span>
        To {end}
      </>
    );
  };

  return (
    <div
      onClick={() => router.push(`leave-request/${id}`)}
      className={`flex flex-wrap w-full border-b border-gray-200 max-md:max-w-full items-start lg:items-center h-auto py-4 px-2.5 cursor-pointer bg-white hover:bg-[#f4f7ff]`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`flex flex-col lg:flex-[1] grow shrink justify-center w-full lg:w-[66px]`}
      >
      </div>
      <div
        className={`flex flex-col lg:flex-[2] grow shrink justify-center pl-2.5 text-sm font-bold text-neutral-800 w-full lg:w-[70px]`}
      >
        <div className="overflow-hidden self-stretch px-3 lg:py-4 py-2 w-full  font-Averta-Bold text-[14px]">
          {helper?.user?.fullName}
        </div>
      </div>
      <div
        className={`flex flex-col lg:flex-[2]  shrink justify-center pl-2.5 mr-2 text-xs font-bold text-center whitespace-nowrap w-full lg:w-[125px]`}
      >
        <div className="flex overflow-hidden flex-1 ml-3 items-center size-full">
          <div className="flex flex-col self-stretch my-auto w-[93px]">
            <div
              className={`flex relative gap-4 justify-between items-start px-4 py-1.5 min-h-[27px] ${statusColor} rounded-md`}
            >
              <div className="z-0 flex-1 shrink my-auto basis-0 font-Averta-Bold text-[13px]">
                {status}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`flex flex-col lg:flex-[5] grow shrink justify-center pl-2.5 text-sm font-semibold  text-neutral-800 lg:w-[500px] w-full`}
      >
        <div className="overflow-hidden self-stretch px-3 lg:py-4 py-2 w-full lg:min-w-[200px] font-Averta-Bold text-[14px]">
          {requestReason}
        </div>
      </div>
      <div
        className={`flex flex-col lg:flex-[2] grow shrink justify-center pl-2.5 text-sm text-neutral-800 w-full lg:w-[145px]`}
      >
        <div className="overflow-hidden self-stretch lg:px-3 px-3 lg:min-w-[152px] lg:py-4 py-2 w-full font-Averta-Semibold text-[#1D2C4C80] lg:text-center text-[16px]">
          {checkDate(startDatetime, endDatetime)}
        </div>
      </div>
    </div>
  );
};
export default LeaveRequestRow;
