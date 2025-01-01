import React from "react";
import { useRouter } from "next/navigation";
import { Gender, UserStatus } from "./CustomerTable";

type CustomerRowProps = {
  index: number;
  id: string;
  name: string;
  gender: string;
  address: string;
  phone: string;
  email?: string;
  status: string;
};

const CustomerRow: React.FC<CustomerRowProps> = ({
  index,
  id,
  name,
  gender,
  address,
  phone,
  email,
  status,
}) => {
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

  const router = useRouter();
  return (
    <div
      className="flex flex-wrap gap-3 w-full border-b border-gray-200 bg-white hover:bg-[#f4f7ff] h-auto items-start md:items-center p-2.5 cursor-pointer"
      onClick={() => router.push(`/dashboard/customer/${id}`)}
    >
      <div className="lg:flex-[2] w-full lg:w-[80px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224] font-semibold truncate">
          <span className="md:hidden font-bold">ID: </span>
          {index}
        </div>
      </div>

      <div className="lg:flex-[3] w-full lg:w-[230px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224] font-semibold">
          <span className="md:hidden font-bold">NAME: </span>
          {name}
        </div>
      </div>

      <div className="lg:flex-[3] w-full lg:w-[160px] flex items-center lg:justify-center lg:py-6 mb-2 lg:mb-0 mr-2">
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

      <div className="lg:flex-[5] w-full lg:w-[270px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224] font-semibold">
          <span className="md:hidden font-bold">ADDRESS: </span>
          {address}
        </div>
      </div>

      <div className="lg:flex-[4] w-full lg:w-[170px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224cc]">
          <span className="md:hidden font-bold">PHONE: </span>
          {phone}
        </div>
      </div>

      <div className="lg:flex-[4] w-full lg:w-[220px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
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
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerRow;
