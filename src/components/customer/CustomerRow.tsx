import React from "react";
import Link from "next/link";

type CustomerRowProps = {
  id: string;
  name: string;
  address: string;
  phone: string;
  email?: string;
};

const CustomerRow: React.FC<CustomerRowProps> = ({
  id,
  name,
  address,
  phone,
  email,
}) => {
  return (
    <div className="flex flex-wrap gap-3 w-full border-b border-gray-200 bg-white hover:bg-[#f4f7ff] h-auto items-start md:items-center p-2.5 cursor-pointer">
      <div className="w-full md:w-[98px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224] font-semibold">
          <span className="md:hidden font-bold">ID: </span>
          {id}
        </div>
      </div>

      <div className="w-full md:w-[210px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224] font-semibold">
          <span className="md:hidden font-bold">NAME: </span>
          {name}
        </div>
      </div>

      <div className="w-full md:w-[315px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224] font-semibold">
          <span className="md:hidden font-bold">ADDRESS: </span>
          {address}
        </div>
      </div>

      <div className="w-full md:w-[140px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224cc]">
          <span className="md:hidden font-bold">PHONE: </span>
          {phone}
        </div>
      </div>

      <div className="w-full md:w-[250px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224cc] truncate">
          <span className="md:hidden font-bold">EMAIL: </span>
          {email}
        </div>
      </div>

      <div className="w-full md:w-[120px] flex items-center md:py-6">
        <Link
          href={`/dashboard/customer/${id}`}
          className="ml-auto px-4 py-1.5 bg-[#6896d1] text-[#12153a] bg-opacity-20 text-xs rounded-[4.5px] font-semibold hover:bg-opacity-50"
        >
          More Info
        </Link>
      </div>
    </div>
  );
};

export default CustomerRow;
