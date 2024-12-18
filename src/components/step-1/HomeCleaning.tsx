"use client";
import { bookingStore } from "@/utils/store/booking.store";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

type ServiceDetail = {
  name: string;
  price: number;
}

const HomeCleaning = () => {
  const [numberOfBed, setNumberOfBed] = useState<ServiceDetail[]>([]);
  const [numberOfBathroom, setNumberOfBathroom] = useState<ServiceDetail[]>([]);
  const [cleanTypes, setCleanTypes] = useState<ServiceDetail[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/service-detail`
        );
        const data = await response.json();

        // Number of Bedrooms
        const beds = data
          .filter((item: any) => item.serviceType.name === "Number of bedrooms")
          .map((item: any) => ({
            name: item.title,
            price: parseInt(item.additionalPrice),
          }));
        setNumberOfBed(beds);

        // Number of Bathrooms
        const bathrooms = data
          .filter(
            (item: any) => item.serviceType.name === "Number of bathrooms"
          )
          .map((item: any) => ({
            name: item.title,
            price: parseInt(item.additionalPrice),
          }));
        setNumberOfBathroom(bathrooms);

        // Clean Type
        const cleans = data
          .filter((item: any) => item.serviceType.name === "Clean type")
          .map((item: any) => ({
            name: item.title,
            price: parseInt(item.additionalPrice),
          }));
        setCleanTypes(cleans);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const [selectedNumberOfBed, setSelectedNumberOfBed] = useState<number>(0);
  const [selectedNumberOfBathroom, setSelectedNumberOfBathroom] = useState<number>(0);
  const [selectedCleanType, setSelectedCleanType] = useState<number>(0);

  const router = useRouter();
  const updateBookingData = bookingStore(
    (state: any) => state.updateBookingData
  );

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
    updateBookingData({
      bookingInfomation: [
        { name: "Number of bedrooms", value: numberOfBed[selectedNumberOfBed].name },
        { name: "Number of bathrooms", value: numberOfBathroom[selectedNumberOfBathroom].name },
        { name: "Clean type", value: cleanTypes[selectedCleanType].name },
      ],
    });
    updateBookingData({
      totalPrice: numberOfBed[selectedNumberOfBed].price + numberOfBathroom[selectedNumberOfBathroom].price + cleanTypes[selectedCleanType].price,
    })

    router.push("/booking/step-2");
  };

  const renderOptions = (
    items: ServiceDetail[],
    selectedItem: number,
    type: "bed" | "bathroom" | "cleanType"
  ) => (
    <div className="flex flex-row flex-wrap gap-2 justify-center mb-11">
    {items.map((item, index) => (
      <div
        key={index}
        onClick={() => handleSelect(index, type)}
        className="flex flex-col gap-[10px] items-center cursor-pointer"
      >
        <div
          className={`px-[38px] py-[15px] rounded-[10px] bg-white justify-center items-center border-[2px] transition ${
            selectedItem === index
              ? "border-[#1A78F2] text-[#1A78F2]"
              : "border-[#D3D8DD] text-[#4F6071] hover:border-[#1A78F2] hover:text-[#1A78F2]"
          }`}
        >
          <span className="font-Averta-Semibold text-[20px] leading-[26px]">
            {item.name}
          </span>
        </div>
        <span className="text-[#88939D] text-[14px] leading-[19px]">
          ${item.price}
        </span>
      </div>
    ))}
  </div>
  );

  return (
    <div className="w-full h-full mt-[50px]">
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
        {renderOptions(numberOfBathroom, selectedNumberOfBathroom, "bathroom")}

        <span className="font-Averta-Semibold text-[#9FA7B0] text-[14px] leading-[17px] mb-4">
          CLEAN TYPE
        </span>
        {renderOptions(cleanTypes, selectedCleanType, "cleanType")}

        <button
          className="px-16 py-2 bg-[#1b78f2] rounded-[8px] text-lg font-Averta-Semibold tracking-normal leading-loose text-center text-white hover:bg-opacity-80"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomeCleaning;
