import React, { useState } from "react";
import { Checkbox } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { Refund, RefundStatus } from "./RefundTable";
interface RefundRowProps {
  refund: Refund;
  onCheckboxToggle?: (id: string, checked: boolean) => void;
}
const RefundRow: React.FC<RefundRowProps> = ({ refund, onCheckboxToggle }) => {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const statusColor =
    refund.status === RefundStatus.Refunded
      ? "bg-[#ccf0eb] text-[#00b69b]"
      : refund.status === RefundStatus.Declined
      ? "bg-[#fcd7d4] text-[#ef3826]"
      : "bg-[#fce7af] text-[#FF9500]";

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes} - ${day}/${month}/${year}`;
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    if (onCheckboxToggle) {
      onCheckboxToggle(refund.id, checked);
    }
  };

  return (
    <div
      onClick={() => router.push(`refund/${refund.id}`)}
      className={`flex overflow-hidden flex-col xl:flex-row flex-wrap w-full border-b px-4 border-gray-200 xl:h-[80px] cursor-pointer bg-white hover:bg-[#f4f7ff]`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative flex flex-[1] flex-col xl:justify-center `}
      >
        <div className="max-xl:absolute  flex overflow-hidden items-center justify-end xl:justify-center max-xl:mt-2 pl-px w-full min-h-[48px]">
          <Checkbox
            checked={isChecked}
            onChange={handleCheckboxChange}
            onClick={(e) => e.stopPropagation()}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            crossOrigin={undefined}
          />
        </div>
      </div>
      <div
        className={`flex flex-[3] flex-col justify-center text-sm  text-neutral-800 `}
      >
        <div className="overflow-hidden px-3 py-4 w-full min-h-[48px] font-Averta-Regular xl:font-Averta-Semibold text-[15px]">
          <span className="xl:hidden font-mono font-bold">Customer: </span>
          {refund.booking.customer.fullName}
        </div>
      </div>

      <div
        className={`flex flex-[3] flex-col shrink justify-center xl:pl-6 mr-2 text-xs font-bold text-center whitespace-nowrap w-[125px]`}
      >
        <div className="flex flex-1 items-center xl:justify-center">
          <div className="flex flex-row px-3 py-4 items-center justify-start my-auto w-fit">
            <span className="xl:hidden font-bold mr-2">STATUS: </span>
            <div
              className={`flex relative gap-4 justify-between items-start px-4 py-1.5 min-h-[27px] ${statusColor} min-w-24 rounded-md`}
            >
              <div className="z-0 flex-1 shrink my-auto basis-0 font-Averta-Bold text-[13px]">
                {refund.status}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`flex flex-[10] flex-col  justify-center  text-sm  min-w-[240px] text-neutral-800 `}
      >
        <div className="overflow-hidden self-stretch px-3 py-4 w-full min-h-[48px] max-md:max-w-full font-Averta-Regular xl:font-Averta-Semibold text-[15px]">
          <span className="xl:hidden font-mono font-semibold text-[15px]">
            Reason:{" "}
          </span>
          {refund.reason}
        </div>
      </div>

      <div
        className={`flex flex-[3] flex-col  justify-center text-sm  text-neutral-800 `}
      >
        <div className="overflow-hidden self-stretch px-3 py-4 w-full min-h-[48px] font-Averta-Regular xl:font-Averta-Semibold text-[14px]">
          <span className="xl:hidden font-mono font-semibold">Date: </span>
          {formatDate(refund.created_at)}
        </div>
      </div>

      {/* <div className="w-full md:w-[8%] flex grow justify-center items-center md:py-6">
        <button className=" min-w-[90px] px-4 py-1.5 bg-[#6896d1] text-[#12153a] bg-opacity-20 text-xs rounded-[4.5px] font-semibold hover:bg-opacity-50    ">
          {status == "Pending" ? "Handle" : "More Info"}
        </button>
      </div> */}
    </div>
  );
};
export default RefundRow;
