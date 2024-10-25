import React from "react";

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
    <div className="flex flex-wrap gap-3 w-full border-b border-gray-200 bg-white hover:bg-[#f4f7ff] h-auto md:h-[80px] items-start md:items-center p-2.5 cursor-pointer">
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

      <div className="w-full md:w-[342px] flex items-center justify-start  md:pl-0 mb-2 md:mb-0">
        <div className="text-sm text-[#202224] font-Averta-Semibold">
          <span className="md:hidden font-bold">ADDRESS: </span>
          {address}
        </div>
      </div>

      <div className="w-full md:w-[170px] flex items-center justify-start md:pl-0 mb-2 md:mb-0">
        <div className="text-sm text-[#202224cc] font-Averta-Regular">
          <span className="md:hidden font-bold">PHONE: </span>
          {phone}
        </div>
      </div>

      <div className="w-full md:w-[250px] flex items-center justify-start md:pl-0 mb-2 md:mb-0">
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

export default CustomerRow;
