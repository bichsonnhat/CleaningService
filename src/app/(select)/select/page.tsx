"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";

const Select = () => {
  const [selectService, setSelectService] = useState("");

  return (
    <div className="flex flex-col w-full h-full pb-8">
      <div className="w-full h-[75px]">
        <div className="w-[5%] h-full flex items-center justify-center">
          <button>
            <Image
              src="/images/BookingStep0/Arrow_Right_MD.svg"
              alt="back_icon"
              width={35}
              height={30}
            />
          </button>
        </div>
      </div>
      <div className="flex flex-col w-full h-full gap-[50px]">
        <div className="w-full h-fit">
          <h1 className="text-[#12153a] text-[58px] font-Averta-Semibold leading-[65px] text-center">
            Find the Perfect Service for You!
          </h1>
        </div>
        <div className="w-full h-fit text-center">
          <h5 className="text-[#2b3641] text-xl font-normal font-Averta-Regular leading-[25px]">
            Choose the service that suits you best.
            <br />
            What we have to offer:
          </h5>
        </div>
        <div className="w-[80%] h-fit flex flex-col sm:flex-row max-sm:justify-center max-sm:items-center max-sm:divide-y-2 sm:divide-x-2 divide-dashed m-auto border-2 rounded-2xl p-[20px] shadow-xl">
          <div
            className="w-[80%] sm:w-[50%] h-full flex flex-col items-center justify-center gap-[10px] hover:cursor-pointer max-sm:pb-5"
            onMouseEnter={() => setSelectService("Home Service")}
            onMouseLeave={() => setSelectService("")}
          >
            <Image
              src={`${
                selectService !== "Home Service"
                  ? "/images/BookingStep0/house_unselect.png"
                  : "/images/BookingStep0/house_select.png"
              }`}
              alt="home_service"
              width={200}
              height={200}
            />
            <div className="w-full h-[40%] flex flex-col items-center gap-[5px]">
              <div className="text-[#1d2c4c] text-[34px] font-Averta-Semibold leading-[42px]">
                Home Cleaning
              </div>
              <div className="text-[#12153a] text-base font-Averta-Regular leading-[23px] tracking-tight text-center">
                Professional home cleaning services take the burden off your
                shoulders,
                <br /> ensuring every corner shines while you focus on what
                matters most.
                <br />
                <span className="font-Averta-Semibold">
                  {" "}
                  It's not just cleaning; it’s peace of mind delivered.
                </span>
              </div>
            </div>
          </div>
          <div
            className="w-[80%] sm:w-[50%] h-full flex flex-col items-center justify-center gap-[10px] hover:cursor-pointer max-sm:pt-5"
            onMouseEnter={() => setSelectService("Other Service")}
            onMouseLeave={() => setSelectService("")}
          >
            <div className="relative h-[200px] w-[280px]">
              <Image
                src={`${
                  selectService !== "Other Service"
                    ? "/images/BookingStep0/other1_unselect.png"
                    : "/images/BookingStep0/other1_select.png"
                }`}
                alt="other_service_01"
                width={133.3}
                height={133.3}
                className="absolute top-0 left-0"
              />
              <Image
                src={`${
                  selectService !== "Other Service"
                    ? "/images/BookingStep0/other2_unselect.png"
                    : "/images/BookingStep0/other2_select.png"
                }`}
                alt="other_service_02"
                width={133.3}
                height={133.3}
                className="absolute bottom-0 right-0"
              />
            </div>
            <div className="w-full h-[40%] flex flex-col items-center gap-[5px]">
              <div className="text-[#1d2c4c] text-[34px] font-Averta-Semibold leading-[42px]">
                Other Services
              </div>
              <div className="text-[#12153a] text-base font-Averta-Regular leading-[23px] tracking-tight text-center">
                Services like babysitting, housekeeping, and caretaking are
                designed to
                <br /> provide care, comfort, and support exactly when you need
                it, allowing
                <br /> you to focus on your priorities.
                <br />
                <span className="font-Averta-Semibold">
                  {" "}
                  It’s not just assistance—it’s personalized care that makes
                  life easier
                  <br /> and more manageable.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Select;
