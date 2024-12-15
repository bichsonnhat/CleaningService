import React from "react";
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  return (
    <div
      className="flex flex-wrap gap-3 w-full border-b border-gray-200 bg-white hover:bg-[#f4f7ff] h-auto items-start md:items-center p-2.5 cursor-pointer"
      onClick={() => router.push(`/dashboard/customer/${id}`)}
    >
      <div className="w-full md:w-[130px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224] font-semibold truncate">
          <span className="md:hidden font-bold">ID: </span>
          {id}
        </div>
      </div>

      <div className="w-full md:w-[230px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224] font-semibold">
          <span className="md:hidden font-bold">NAME: </span>
          {name}
        </div>
      </div>

      <div className="w-full md:w-[370px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
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
    </div>
  );
};

export default CustomerRow;
