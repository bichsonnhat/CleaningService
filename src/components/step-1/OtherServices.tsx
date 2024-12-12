"use client";
import { bookingStore } from "@/utils/store/booking.store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const OtherServices = () => {
  const [services, setServices] = useState([]);
  const [forHowLong, setForHowLong] = useState<
    { name: string; price: string }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/service-detail`
        );
        const data = await response.json();

        // Service details
        const services = data
          .filter((item: any) => item.serviceType.name === "Service details")
          .map((item: any) => item.title);
        setServices(services);

        // For how long?
        const howLong = data
          .filter((item: any) => item.serviceType.name === "For how long?")
          .map((item: any) => ({
            name: item.title,
            price: `$${item.additionalPrice}`,
          }));
        setForHowLong(howLong);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const [selectedService, setSelectedService] = useState<number>(0);
  const [selectedHowLong, setHowLong] = useState<number>(0);

  const router = useRouter();

  const updateBookingData = bookingStore(
    (state: any) => state.updateBookingData
  );

  const handleNext = () => {
    updateBookingData({
      bookingInfomation: [
        { name: "Service details", value: services[selectedService] },
        { name: "For how long?", value: forHowLong[selectedHowLong].name },
      ],
    });

    router.push("/booking/step-2");
  };

  const handleSelect = (index: number, type: "service" | "howLong"): void => {
    if (type === "service") setSelectedService(index);
    else setHowLong(index);
  };

  return (
    <>
      <div className="w-full h-full mt-[55px]">
        <div className="flex flex-col inset-0 items-center">
          <p className="font-Averta-Bold text-center text-[38px] mb-8">
            Customize Your Requirements
          </p>

          <span className="font-Averta-Semibold text-[#9FA7B0] text-[14px] leading-[17px] mb-4">
            SERVICE DETAILS
          </span>
          <div className="flex flex-row flex-wrap gap-2 justify-center mb-11">
            {services.map((item, index) => (
              <div
                key={index}
                onClick={() => handleSelect(index, "service")}
                className={`cursor-pointer flex px-[38px] py-[15px] rounded-[10px] bg-white justify-center items-center border-[2px] transition ${
                  selectedService === index
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

          <span className="font-Averta-Semibold text-[#9FA7B0] text-[14px] leading-[17px] mb-4">
            FOR HOW LONG?
          </span>
          <div className="flex flex-row flex-wrap gap-2 justify-center mb-11">
            {forHowLong.map((item, index) => (
              <div
                key={index}
                onClick={() => handleSelect(index, "howLong")}
                className={`flex flex-col gap-[10px] items-center cursor-pointer`}
              >
                <div
                  className={`px-[38px] py-[15px] rounded-[10px] bg-white justify-center items-center border-[2px] transition ${
                    selectedHowLong === index
                      ? "border-[#1A78F2] text-[#1A78F2]"
                      : "border-[#D3D8DD] text-[#4F6071] hover:border-[#1A78F2] hover:text-[#1A78F2]"
                  }`}
                >
                  <span className="font-Averta-Semibold text-[20px] leading-[26px]">
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
            onClick={handleNext}
            className="px-16 py-2 bg-[#1b78f2] rounded-[8px] text-lg font-Averta-Semibold tracking-normal leading-loose text-center text-white hover:bg-opacity-80"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default OtherServices;
