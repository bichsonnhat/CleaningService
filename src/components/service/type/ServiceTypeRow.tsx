"use client";

import React, { use, useState } from "react";
import { Checkbox as MaterialCheckbox } from "@material-tailwind/react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const ServiceTypeRow: React.FC<ServiceTypeRowProps> = ({
  id,
  name,
  description,
  basePrice,
  category,
  onRowClick,
  onCheckboxToggle,
  isLoading,
}) => {
  const serviceColor =
    category?.name === "Home Cleaning"
      ? "bg-[#1A78F2] text-[#1A78F2]"
      : category?.name === "Other Services"
      ? "bg-[#00B69B] text-[#00B69B]"
      : "bg-[#9370db] text-[#171717]";

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    if (onCheckboxToggle) {
      onCheckboxToggle(id, checked);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-wrap gap-3 w-full border-b border-gray-200 bg-white h-auto items-start md:items-center p-2.5",
        isLoading
          ? "hover:bg-white cursor-default"
          : "hover:bg-[#f4f7ff]  cursor-pointer"
      )}
      onClick={() => onRowClick(id)}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <div className="flex overflow-hidden items-center pl-px w-full min-h-[48px]">
          {isLoading ? (
            <Skeleton className="h-4 w-full"></Skeleton>
          ) : (
            <MaterialCheckbox
              color="blue"
              checked={isChecked}
              onChange={handleCheckboxChange}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          )}
        </div>
      </div>

      <div className="w-full md:w-[210px] flex items-center justify-start md:py-6 mb-2 md:mb-0">
        {isLoading ? (
          <Skeleton className="h-4 w-full"></Skeleton>
        ) : (
          <div className="text-sm text-[#202224cc] ">
            <span className="xl:hidden font-Averta-Semibold">NAME: </span>
            {name}
          </div>
        )}
      </div>

      <div className="w-full xl:w-[552px] flex items-center justify-start xl:py-6 mb-2 xl:mb-0">
        {isLoading ? (
          <Skeleton className="h-4 w-full"></Skeleton>
        ) : (
          <div className="text-sm text-[#202224cc] ">
            <span className="xl:hidden font-Averta-Semibold">
              DESCRIPTION:{" "}
            </span>
            {description}
          </div>
        )}
      </div>

      <div className="w-full xl:w-[210px] flex items-center justify-start xl:py-6 mb-2 xl:mb-0">
        {isLoading ? (
          <Skeleton className="h-4 w-full"></Skeleton>
        ) : (
          <div className="text-sm text-[#202224cc] flex flex-row items-center gap-2">
            <span className="xl:hidden font-Averta-Bold">
              SERVICE CATEGORY:{" "}
            </span>
            <div
              className={`flex relative gap-4 justify-between items-start px-4 py-1.5 min-h-[27px] ${serviceColor}  bg-opacity-20 rounded-md`}
            >
              <div className="z-0 flex-1 shrink my-auto basis-0 font-Averta-Bold text-[13px]">
                {category?.name}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="w-full  xl:w-[150px] flex items-center justify-start xl:py-6 mb-2 xl:mb-0">
        {isLoading ? (
          <Skeleton className="h-4 w-full"></Skeleton>
        ) : (
          <div className="text-sm text-[#202224cc]">
            <span className="xl:hidden font-Averta-Bold">BASE PRICE: </span>
            {`$${basePrice}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceTypeRow;
