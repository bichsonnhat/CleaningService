import React from "react";
import Star from "./Star";
import Link from "next/link";

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
    <div className="flex flex-wrap gap-3 w-full border-b border-gray-200 bg-white hover:bg-[#f4f7ff] h-auto items-start md:items-center p-2.5 cursor-pointer">
      <div className="w-full md:w-[98px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224] font-semibold">
          <span className="md:hidden font-bold">ID: </span>
          {id}
        </div>
      </div>

      <div className="w-full md:w-[140px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224] font-semibold">
          <span className="md:hidden font-bold">NAME: </span>
          {name}
        </div>
      </div>

      <div className="w-full md:w-[240px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224] font-semibold">
          <span className="md:hidden font-bold">ADDRESS: </span>
          {address}
        </div>
      </div>

      <div className="w-full md:w-[182px] flex items-center justify-start md:pl-0 mb-2 md:mb-0">
        <div className="text-xs text-[#1D2C4C80] font-semibold">
          <span className="md:hidden font-bold text-[#202224]">EVALUATE:</span>
          {renderRating()}
          <div className="mt-1">{`${completedJobs} of ${totalJobs} jobs completed`}</div>
        </div>
      </div>

      <div className="w-full md:w-[130px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224cc]">
          <span className="md:hidden font-bold">PHONE: </span>
          {phone}
        </div>
      </div>

      <div className="w-full md:w-[220px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224cc] truncate">
          <span className="md:hidden font-bold">EMAIL: </span>
          {email}
        </div>
      </div>

      <div className="w-full md:w-[120px] flex items-center md:py-6">
        <Link
          href={`/dashboard/employee/${id}`}
          className="ml-auto px-4 py-1.5 bg-[#6896d1] text-[#12153a] bg-opacity-20 text-xs rounded-[4.5px] font-semibold hover:bg-opacity-50"
        >
          More Info
        </Link>
      </div>
    </div>
  );
};

export default EmployeeRow;
