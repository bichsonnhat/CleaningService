import React from "react";

const ServiceTypeRow: React.FC<ServiceTypeRowProps> = ({
  id,
  name,
  description,
  basePrice,
  category,
  onRowClick,
}) => {
  const serviceColor =
    category?.name === "Home Cleaning"
      ? "bg-[#1A78F2] text-[#1A78F2]"
      : category?.name === "Other Services"
      ? "bg-[#00B69B] text-[#00B69B]"
      : "bg-[#9370db] text-[#171717]";

  return (
    <div
      className="flex flex-wrap gap-3 w-full border-b border-gray-200 bg-white hover:bg-[#f4f7ff] h-auto items-start md:items-center p-2.5 cursor-pointer"
      onClick={() => onRowClick(id)}
    >
      <div className="w-full md:w-[210px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        <div className="text-sm text-[#202224cc] ">
          <span className="xl:hidden font-Averta-Semibold">NAME: </span>
          {name}
        </div>
      </div>
      <div className="w-full xl:w-[600px] flex items-center justify-start xl:py-6 mb-2 xl:mb-0">
        <div className="text-sm text-[#202224cc] ">
          <span className="xl:hidden font-Averta-Semibold">DESCRIPTION: </span>
          {description}
        </div>
      </div>
      <div className="w-full xl:w-[210px] flex items-center justify-start xl:py-6 mb-2 xl:mb-0">
        <div className="text-sm text-[#202224cc] flex flex-row items-center gap-2">
          <span className="xl:hidden font-Averta-Bold">SERVICE CATEGORY: </span>
          <div
            className={`flex relative gap-4 justify-between items-start px-4 py-1.5 min-h-[27px] ${serviceColor}  bg-opacity-20 rounded-md`}
          >
            <div className="z-0 flex-1 shrink my-auto basis-0 font-Averta-Bold text-[13px]">
              {category?.name}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full  xl:w-[150px] flex items-center justify-start xl:py-6 mb-2 xl:mb-0">
        <div className="text-sm text-[#202224cc]">
          <span className="xl:hidden font-Averta-Bold">BASE PRICE: </span>
          {`$${basePrice}`}
        </div>
      </div>
    </div>
  );
};

export default ServiceTypeRow;
