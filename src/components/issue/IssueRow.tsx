import React, { useState } from "react";
import { Checkbox } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { Feedback2 } from "../feedback/FeedbackTable";

interface IssueRowProps {
  issueData: Feedback2;
  onCheckboxToggle?: (id: string, checked: boolean) => void;
}

const IssueRow: React.FC<IssueRowProps> = ({ issueData, onCheckboxToggle }) => {
  const router = useRouter();

  const [isChecked, setIsChecked] = useState(false);

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${hour}:${minute} - ${day}/${month}/${year}`;
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    if (onCheckboxToggle) {
      onCheckboxToggle(issueData.id, checked);
    }
  };

  return (
    <div
      onClick={() => router.push(`issue/${issueData.id}`)}
      className={`flex overflow-hidden flex-col xl:flex-row flex-wrap w-full border-b-2 xl:border-b px-4 border-gray-200 xl:h-[80px] cursor-pointer bg-white hover:bg-[#f4f7ff]`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative flex flex-[1] flex-col xl:justify-center `}
      >
        <div className="max-xl:absolute flex overflow-hidden items-center justify-end xl:justify-center max-xl:mt-2 pl-px w-full min-h-[48px]">
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
          <span className="xl:hidden font-mono font-bold">Helper: </span>
          {issueData.booking.helper.user.fullName}
        </div>
      </div>
      <div
        className={`flex flex-[10] flex-col  justify-center  text-sm  min-w-[240px] text-neutral-800 `}
      >
        <div className="overflow-hidden self-stretch px-3 py-4 w-full min-h-[48px] max-md:max-w-full font-Averta-Regular xl:font-Averta-Semibold text-[15px]">
          <span className="xl:hidden font-mono font-semibold text-[15px]">
            Title:{" "}
          </span>
          {issueData.title}
        </div>
      </div>
      <div
        className={`flex flex-[3] flex-col  justify-center text-sm  text-neutral-800 `}
      >
        <div className="overflow-hidden self-stretch px-3 py-4 w-full min-h-[48px] font-Averta-Regular xl:font-Averta-Semibold text-[14px]">
          <span className="xl:hidden font-mono font-semibold">Date: </span>
          {formatDate(issueData.created_at)}
        </div>
      </div>
    </div>
  );
};

export default IssueRow;
