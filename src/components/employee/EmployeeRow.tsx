import React from "react";
import Star from "./Star";
import { useRouter } from "next/navigation";
import { UserStatus } from "../customer/CustomerTable";
import { Gender } from "@/types/enum";

type EmployeeRowProps = {
  index: number;
  id: string;
  name: string;
  gender: string;
  address: string;
  phone: string;
  email?: string;
  averageRating: string;
  completedJobs: number;
  totalJobs: number;
  status: string;
};

const EmployeeRow: React.FC<EmployeeRowProps> = ({
  index,
  id,
  name,
  gender,
  address,
  phone,
  email,
  averageRating,
  completedJobs,
  totalJobs,
  status,
}) => {
  const router = useRouter();

  const renderRating = () => {
    const rating = parseFloat(averageRating);
    const filledStars = Math.floor(rating); // Số lượng ngôi sao đầy
    const remainingPercentage = (rating % 1) * 100; // Phần trăm cho ngôi sao tiếp theo

    const starPercentages = Array.from({ length: 5 }, (_, index) => {
      if (index < filledStars) {
        return 100; // Ngôi sao đầy
      } else if (index === filledStars) {
        return remainingPercentage; // Ngôi sao một phần
      } else {
        return 0; // Ngôi sao rỗng
      }
    });

    return (
      <div className="flex items-center">
        {starPercentages.map((percent, index) => (
          <Star key={index} percentage={percent} />
        ))}
      </div>
    );
  };

  const statusColor =
    status === UserStatus.Active
      ? "bg-[#1A78F2] text-[#1A78F2]"
      : status === UserStatus.In_Active
      ? "bg-[#f5f7a7] text-[#f5f7a7]"
      : status === UserStatus.In_Active
      ? "bg-[#EF3826] text-[#EF3826]"
      : "";

  const genderColor =
    gender === Gender.Female
      ? "bg-[#fb5de0] text-[#fb5de0]"
      : gender === Gender.Male
      ? "bg-[#1A78F2] text-[#1A78F2]"
      : status === Gender.Other
      ? "bg-[#928f8e] text-[#928f8e]"
      : "";

  return (
    <div
      className="flex flex-wrap gap-3 w-full border-b border-gray-200 bg-white hover:bg-[#f4f7ff] h-auto items-start md:items-center p-2.5 cursor-pointer"
      onClick={() => router.push(`/dashboard/employee/${id}`)}
    >
      <div className="lg:flex-[2] w-full lg:w-[60px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224] font-semibold  truncate">
          <span className="md:hidden font-bold">ID: </span>
          {index}
        </div>
      </div>

      <div className="lg:flex-[3] w-full lg:w-[200px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224] font-semibold">
          <span className="md:hidden font-bold">NAME: </span>
          {name}
        </div>
      </div>

      <div className="lg:flex-[3] w-full lg:w-[140px] flex items-center lg:justify-center lg:py-6 mb-2 lg:mb-0 mr-2">
        <div className=" flex flex-row items-center text-sm text-[#202224cc]">
          <span className="lg:hidden font-bold mr-2">GENDER: </span>
          <div
            className={`flex relative gap-4 justify-between items-start px-4 py-1.5 min-w-28 min-h-[27px] ${genderColor}  bg-opacity-20 rounded-md`}
          >
            <div className="z-0 flex-1 shrink my-auto basis-0 font-Averta-Bold text-[13px] text-center">
              {gender}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:flex-[5] w-full lg:w-[240px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224] font-semibold">
          <span className="md:hidden font-bold">ADDRESS: </span>
          {address}
        </div>
      </div>

      <div className="lg:flex-[4] w-full lg:w-[182px] flex items-center justify-start md:pl-0 mb-2 md:mb-0">
        <div className="text-xs text-[#1D2C4C80] font-semibold">
          <span className="md:hidden font-bold text-[#202224]">EVALUATE:</span>
          {renderRating()}
          <div className="mt-1">{`${completedJobs} of ${totalJobs} jobs completed`}</div>
        </div>
      </div>

      <div className="lg:flex-[3] w-full lg:w-[130px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224cc]">
          <span className="md:hidden font-bold">PHONE: </span>
          {phone}
        </div>
      </div>

      <div className="lg:flex-[3] w-full lg:w-[180px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224cc] truncate">
          <span className="md:hidden font-bold">EMAIL: </span>
          {email}
        </div>
      </div>

      <div className="lg:flex-[3] w-full lg:w-[130px] flex items-center lg:justify-center lg:py-6 mb-2 lg:mb-0">
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

export default EmployeeRow;
