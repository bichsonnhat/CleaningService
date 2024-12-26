"use client";

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const DetailServiceRow: React.FC<DetailServiceRowProps> = ({
  id,
  title,
  additionalPrice,
  multiplyPrice,
  serviceType,
  onRowClick,
  onCheckboxToggle,
  isLoading,
}) => {
  const [isChecked, setIsChecked] = useState(false);

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
            <Checkbox
              color="blue"
              checked={isChecked}
              onCheckedChange={(checked) => {
                setIsChecked(checked === true);
                if (onCheckboxToggle) {
                  onCheckboxToggle(id, checked === true);
                }
              }}
            />
          )}
        </div>
      </div>

      <div className="w-full xl:w-[210px] flex items-center justify-start xl:py-6 mb-2 xl:mb-0">
        {isLoading ? (
          <Skeleton className="h-4 w-full"></Skeleton>
        ) : (
          <div className="text-sm text-[#202224cc] ">
            <span className="xl:hidden font-Averta-Semibold">CATEGORY: </span>
            {serviceType?.name}
          </div>
        )}
      </div>
      <div className="w-full xl:w-[350px] flex items-center justify-start xl:py-6 mb-2 xl:mb-0">
        {isLoading ? (
          <Skeleton className="h-4 w-full"></Skeleton>
        ) : (
          <div className="text-sm text-[#202224cc] ">
            <span className="xl:hidden font-Averta-Semibold">Title: </span>
            {title}
          </div>
        )}
      </div>

      <div className="w-full  xl:w-[276px] flex items-center justify-start xl:py-6 mb-2 xl:mb-0">
        {isLoading ? (
          <Skeleton className="h-4 w-full"></Skeleton>
        ) : (
          <div className="text-sm text-[#202224cc]">
            <span className="xl:hidden font-Averta-Bold">MULTIPLY PRICE: </span>
            {`$${additionalPrice}`}
          </div>
        )}
      </div>
      <div className="w-full  xl:w-[276px] flex items-center justify-start xl:py-6 mb-2 xl:mb-0">
        {isLoading ? (
          <Skeleton className="h-4 w-full"></Skeleton>
        ) : (
          <div className="text-sm text-[#202224cc]">
            <span className="xl:hidden font-Averta-Bold">
              ADDITIONAL PRICE:{" "}
            </span>
            {`${multiplyPrice}x`}
          </div>
        )}
      </div>
    </div>
  );
};
export default DetailServiceRow;
