import React from "react";
import Star from "./Star";

type EmployeeRowProps = {
  id: string;
  name: string;
  address: string;
  phone: string;
  email?: string;
  completedJobs: number;
  totalJobs: number;
};

const EmployeeRow: React.FC<EmployeeRowProps> = ({
  id,
  name,
  address,
  phone,
  email,
  completedJobs,
  totalJobs,
}) => {
  // Phần trăm hoàn thành job
  const percentage = (completedJobs / totalJobs) * 100;
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
    <div className="flex gap-3 flex-wrap w-full border-b border-gray-200 bg-white hover:bg-[#f4f7ff] h-auto md:h-[80px] items-start md:items-center p-2.5 cursor-pointer">
      <div className="w-full md:w-[80px] flex items-center justify-start  md:pl-0 mb-2 md:mb-0">
        <div className="text-sm text-[#202224] font-Averta-Semibold">
          <span className="md:hidden font-bold">ID: </span>
          {id}
        </div>
      </div>

      <div className="w-full md:w-[177px] flex items-center justify-start md:pl-0 mb-2 md:mb-0">
        <div className="text-sm text-[#202224] font-Averta-Semibold">
          <span className="md:hidden font-bold">NAME: </span>
          {name}
        </div>
      </div>

      <div className="w-full md:w-[185px] flex items-center justify-start md:pl-0 mb-2 md:mb-0 mr-2">
        <div className="text-sm text-[#202224] font-Averta-Semibold">
          <span className="md:hidden font-bold">ADDRESS: </span>
          {address}
        </div>
      </div>

      <div className="w-full md:w-[185px] flex items-center justify-start md:pl-0 mb-2 md:mb-0">
        <div className="text-xs text-[#1D2C4C80] font-Averta-Semibold">
          <span className="md:hidden font-bold">EVALUATE:</span>
          {renderRating()}
          <div className="mt-1">{`${completedJobs} of ${totalJobs} jobs completed`}</div>
        </div>
      </div>

      <div className="w-full md:w-[150px] flex items-center justify-start md:pl-0 mb-2 md:mb-0">
        <div className="text-sm text-[#202224cc] font-Averta-Regular">
          <span className="md:hidden font-bold">PHONE: </span>
          {phone}
        </div>
      </div>

      <div className="w-full md:w-[220px] flex items-center justify-start md:pl-0 mb-2 md:mb-0">
        <div className="text-sm text-[#202224cc] font-Averta-Regular truncate">
          <span className="md:hidden font-bold">EMAIL: </span>
          {email}
        </div>
      </div>

      <div className="w-full md:w-[100px] flex items-center justify-end md:pl-0">
        <button className="px-4 py-1.5 bg-[#6896d1] text-[#12153a] bg-opacity-20 text-xs rounded-[4.5px] font-Averta-Semibold hover:bg-opacity-50">
          More Info
        </button>
      </div>
    </div>
  );
};

export default EmployeeRow;
