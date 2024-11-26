"use client";
import { addServiceCategory } from "@/actions/actions";
import React, { useState } from "react";

const HomeCleaning = () => {
  const numberOfBed: string[] = ["Studio", "1", "2", "3", "4", "5"];
  const numberOfBathroom: string[] = ["1", "2", "3", "4", "5"];
  const cleanTypes = [
    {
      name: "Standard",
      price: "2 hours / $xx",
    },
    {
      name: "Deep Clean",
      price: "2.5-3 hours / $xx",
    },
    {
      name: "Post-Party",
      price: "4-4.5 hours / $xx",
    },
    {
      name: "Post-Construction",
      price: "4.5-5 hours / $xx",
    },
  ];

  const [selectedNumberOfBed, setSelectedNumberOfBed] = useState<number>(0);
  const [selectedNumberOfBathroom, setSelectedNumberOfBathroom] =
    useState<number>(0);
  const [selectedCleanType, setSelectedCleanType] = useState<number>(0);

  const handleSelect = (
    index: number,
    type: "bed" | "bathroom" | "cleanType"
  ): void => {
    if (type === "bed") {
      setSelectedNumberOfBed(index);
    } else if (type === "bathroom") {
      setSelectedNumberOfBathroom(index);
    } else {
      setSelectedCleanType(index);
    }
  };

  const handleNext = () => {
    // addBookingDetail(selectedNumberOfBed, selectedNumberOfBathroom);
    // addServiceCategory();
  };

  const renderOptions = (
    items: string[],
    selectedItem: number,
    type: "bed" | "bathroom"
  ) => (
    <div className="flex flex-row flex-wrap gap-2 justify-center mb-11">
      {items.map((item, index) => (
        <div
          key={index}
          onClick={() => handleSelect(index, type)}
          className={`cursor-pointer flex px-[38px] py-[15px] rounded-[10px] bg-white justify-center items-center border-[2px] transition ${
            selectedItem === index
              ? "border-[#1A78F2] text-[#1A78F2]"
              : "border-[#D3D8DD] text-[#4F6071] hover:border-[#1A78F2] hover:text-[#1A78F2]"
          }`}
        >
          <span className="font-Averta-Semibold text-[20px] leading-[26px]">
            {item}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className=" w-full h-full mt-[50px]">
        <div className="flex flex-col inset-0 items-center">
          <p className="font-Averta-Bold text-center text-[38px] mb-8">
            Customize Your Requirements
          </p>

          <span className="font-Averta-Semibold text-[#9FA7B0] text-[14px] leading-[17px] mb-4">
            NUMBER OF BEDROOMS
          </span>
          {renderOptions(numberOfBed, selectedNumberOfBed, "bed")}

          <span className="font-Averta-Semibold text-[#9FA7B0] text-[14px] leading-[17px] mb-4">
            NUMBER OF BATHROOMS
          </span>
          {renderOptions(
            numberOfBathroom,
            selectedNumberOfBathroom,
            "bathroom"
          )}

          <span className="font-Averta-Semibold text-[#9FA7B0] text-[14px] leading-[17px] mb-4">
            CLEAN TYPE
          </span>
          <div className="flex flex-row flex-wrap gap-2 justify-center mb-11">
            {cleanTypes.map((item, index) => (
              <div
                key={index}
                onClick={() => handleSelect(index, "cleanType")}
                className={`flex flex-col gap-[10px] items-center cursor-pointer`}
              >
                <div
                  className={`px-[38px] py-[15px] rounded-[10px] bg-white justify-center items-center border-[2px] transition ${
                    selectedCleanType === index
                      ? "border-[#1A78F2] text-[#1A78F2]"
                      : "border-[#D3D8DD] text-[#4F6071] hover:border-[#1A78F2] hover:text-[#1A78F2]"
                  }`}
                >
                  <span className=" font-Averta-Semibold text-[20px] leading-[26px]">
                    {item.name}
                  </span>
                </div>
                <span className="text-[#88939D] text-[14px] leading-[19px]">
                  {item.price}
                </span>
              </div>
            ))}
          </div>

          <button
            className="px-16 py-2 bg-[#1b78f2] rounded-[8px] text-lg font-Averta-Semibold tracking-normal leading-loose text-center text-white"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default HomeCleaning;
