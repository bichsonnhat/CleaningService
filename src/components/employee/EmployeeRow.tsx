import React from "react";
import Star from "./Star";
import { useRouter } from "next/navigation";

type EmployeeRowProps = {
  id: string;
  name: string;
  address: string;
  phone: string;
  email?: string;
  averageRating: string;
  completedJobs: number;
  totalJobs: number;
};

const EmployeeRow: React.FC<EmployeeRowProps> = ({
  id,
  name,
  address,
  phone,
  email,
  averageRating,
  completedJobs,
  totalJobs,
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

  return (
    <div
      className="flex flex-wrap gap-3 w-full border-b border-gray-200 bg-white hover:bg-[#f4f7ff] h-auto items-start md:items-center p-2.5 cursor-pointer"
      onClick={() => router.push(`/dashboard/employee/${id}`)}
    >
      <div className="w-full md:w-[130px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224] font-semibold  truncate">
          <span className="md:hidden font-bold">ID: </span>
          {id}
        </div>
      </div>

      <div className="w-full md:w-[170px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224] font-semibold">
          <span className="md:hidden font-bold">NAME: </span>
          {name}
        </div>
      </div>

      <div className="w-full md:w-[300px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
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
    </div>
  );
};

export default EmployeeRow;
