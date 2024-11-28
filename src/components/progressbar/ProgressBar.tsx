"use client";
import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";

interface ServiceDetails {
  step: number;
  serviceType: string;
  bedrooms?: string;
  bathrooms?: string;
  cleanType?: string;
  serviceDetail?: string;
  howLong?: string;
  scheduleDate: string;
  address: string;
  subTotal: string;
}
//Other Services | Home Cleaning
const serviceDetails: ServiceDetails = {
  step: 4,
  serviceType: "Other Services",
  bedrooms: "",
  bathrooms: "",
  cleanType: "",
  scheduleDate: "",
  address: "",
  subTotal: "",
};

const ProgressBar = () => {
  return (
    <div className="w-full h-[75px] flex flex-row sm:shadow-xl bg-white">
      <div className="max-sm:hidden h-full w-[5.2%]">
        <div
          className="h-full w-full flex justify-center items-center hover:cursor-pointer"
          onClick={() => console.log("deptrai")}
        >
          <Image
            src="/images/ProgressBar/Group.svg"
            alt="exitButton"
            width={20}
            height={20}
          />
        </div>
      </div>
      <div className="max-sm:hidden relative h-full w-[90%] flex flex-row">
        <div
          className={`h-full ${
            serviceDetails.serviceType === "Home Cleaning" ? "w-1/6" : "w-1/5"
          }`}
        >
          <div className="h-full w-full flex justify-center items-center">
            <div className="flex flex-row gap-2">
              <div>
                <Image
                  src="/images/ProgressBar/House.svg"
                  alt="serviceType"
                  width={28}
                  height={28}
                />
              </div>
              <div>
                <p className="text-[#12153a] text-xl font-Averta-Semibold leading-[25px]">{`${
                  serviceDetails.serviceType ? serviceDetails.serviceType : "-"
                }`}</p>
                <p className="text-[#9ea7af] text-xs font-Averta-Semibold uppercase leading-[14px] tracking-tight">
                  Service type
                </p>
              </div>
            </div>
          </div>
        </div>
        {serviceDetails.serviceType === "Home Cleaning" && (
          <>
            <div className="h-full w-1/6">
              <div className="h-full w-full flex justify-center items-center">
                <div className="flex flex-row gap-2">
                  <div>
                    <Image
                      src="/images/ProgressBar/Bedroom.svg"
                      alt="bedroom"
                      width={28}
                      height={28}
                    />
                  </div>
                  <div>
                    <p className="text-[#12153a] text-xl font-Averta-Semibold leading-[25px]">{`${
                      serviceDetails.bedrooms ? serviceDetails.bedrooms : "-"
                    }`}</p>
                    <p className="text-[#9ea7af] text-xs font-Averta-Semibold uppercase leading-[14px] tracking-tight">
                      Bedrooms
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-full w-1/6">
              <div className="h-full w-full flex justify-center items-center">
                <div className="flex flex-row gap-2">
                  <div>
                    <Image
                      src="/images/ProgressBar/Bathroom.svg"
                      alt="bathroom"
                      width={28}
                      height={28}
                    />
                  </div>
                  <div>
                    <p className="text-[#12153a] text-xl font-Averta-Semibold leading-[25px]">{`${
                      serviceDetails.bathrooms ? serviceDetails.bathrooms : "-"
                    }`}</p>
                    <p className="text-[#9ea7af] text-xs font-Averta-Semibold uppercase leading-[14px] tracking-tight">
                      Bathrooms
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-full w-1/6">
              <div className="h-full w-full flex justify-center items-center">
                <div className="flex flex-row gap-2">
                  <div>
                    <Image
                      src="/images/ProgressBar/Cleaner.svg"
                      alt="cleanType"
                      width={28}
                      height={28}
                    />
                  </div>
                  <div>
                    <p className="text-[#12153a] text-xl font-Averta-Semibold leading-[25px]">{`${
                      serviceDetails.cleanType ? serviceDetails.cleanType : "-"
                    }`}</p>
                    <p className="text-[#9ea7af] text-xs font-Averta-Semibold uppercase leading-[14px] tracking-tight">
                      Cleantype
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {serviceDetails.serviceType === "Other Services" && (
          <>
            <div className="h-full w-1/5">
              <div className="h-full w-full flex justify-center items-center">
                <div className="flex flex-row gap-2">
                  <div>
                    <Image
                      src="/images/ProgressBar/Layers.svg"
                      alt="bedroom"
                      width={28}
                      height={28}
                    />
                  </div>
                  <div>
                    <p className="text-[#12153a] text-xl font-Averta-Semibold leading-[25px]">{`${
                      serviceDetails.serviceDetail
                        ? serviceDetails.serviceDetail
                        : "-"
                    }`}</p>
                    <p className="text-[#9ea7af] text-xs font-Averta-Semibold uppercase leading-[14px] tracking-tight">
                      Service Detail
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-full w-1/5">
              <div className="h-full w-full flex justify-center items-center">
                <div className="flex flex-row gap-2">
                  <div>
                    <Image
                      src="/images/ProgressBar/Alarm.svg"
                      alt="bathroom"
                      width={28}
                      height={28}
                    />
                  </div>
                  <div>
                    <p className="text-[#12153a] text-xl font-Averta-Semibold leading-[25px]">{`${
                      serviceDetails.howLong ? serviceDetails.howLong : "-"
                    }`}</p>
                    <p className="text-[#9ea7af] text-xs font-Averta-Semibold uppercase leading-[14px] tracking-tight">
                      For How Long
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <div
          className={`h-full ${
            serviceDetails.serviceType === "Home Cleaning" ? "w-1/6" : "w-1/5"
          }`}
        >
          <div className="h-full w-full flex justify-center items-center">
            <div className="flex flex-row gap-2">
              <div>
                <Image
                  src="/images/ProgressBar/Calendar.svg"
                  alt="scheduleDate"
                  width={28}
                  height={28}
                />
              </div>
              <div>
                <p className="text-[#12153a] text-xl font-Averta-Semibold leading-[25px]">{`${
                  serviceDetails.scheduleDate
                    ? serviceDetails.scheduleDate
                    : "-"
                }`}</p>
                <p className="text-[#9ea7af] text-xs font-Averta-Semibold uppercase leading-[14px] tracking-tight">
                  Schedule Date
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`h-full ${
            serviceDetails.serviceType === "Home Cleaning" ? "w-1/6" : "w-1/5"
          }`}
        >
          <div className="h-full w-full flex justify-center items-center">
            <div className="flex flex-row gap-2">
              <div>
                <Image
                  src="/images/ProgressBar/Location.svg"
                  alt="location"
                  width={28}
                  height={28}
                />
              </div>
              <div>
                <p className="text-[#12153a] text-xl font-Averta-Semibold leading-[25px]">{`${
                  serviceDetails.address ? serviceDetails.address : "-"
                }`}</p>
                <p className="text-[#9ea7af] text-xs font-Averta-Semibold uppercase leading-[14px] tracking-tight">
                  Address
                </p>
              </div>
            </div>
          </div>
        </div>
        {serviceDetails.step === 1 &&
          serviceDetails.serviceType === "Home Cleaning" && (
            <div
              className={`absolute bottom-0 left-0 h-[3px] bg-[#1a78f2] w-[0.5]`}
            ></div>
          )}
        {serviceDetails.step === 2 &&
          serviceDetails.serviceType === "Home Cleaning" && (
            <div
              className={`absolute bottom-0 left-0 h-[3px] bg-[#1a78f2] w-[0.65]`}
            ></div>
          )}
        {serviceDetails.step === 3 &&
          serviceDetails.serviceType === "Home Cleaning" && (
            <div
              className={`absolute bottom-0 left-0 h-[3px] bg-[#1a78f2] w-[0.78]`}
            ></div>
          )}
        {serviceDetails.step === 1 &&
          serviceDetails.serviceType === "Other Services" && (
            <div
              className={`absolute bottom-0 left-0 h-[3px] bg-[#1a78f2] w-[0.427]`}
            ></div>
          )}
        {serviceDetails.step === 2 &&
          serviceDetails.serviceType === "Other Services" && (
            <div
              className={`absolute bottom-0 left-0 h-[3px] bg-[#1a78f2] w-[0.6]`}
            ></div>
          )}
        {serviceDetails.step === 3 &&
          serviceDetails.serviceType === "Other Services" && (
            <div
              className={`absolute bottom-0 left-0 h-[3px] bg-[#1a78f2] w-[0.75]`}
            ></div>
          )}
        {serviceDetails.step === 4 && (
          <div
            className={`absolute bottom-0 left-0 h-[3px] bg-[#1a78f2] w-full`}
          ></div>
        )}
      </div>
      <div className="h-full w-[12%] max-sm:w-[40%] bg-[#2B3641]">
        <div className="h-full w-full flex justify-center items-center">
          <div className="flex flex-col">
            <div className="flex flex-row m-auto">
              <span className="text-white text-sm font-Averta-Bold leading-[19px] tracking-tight">
                $
              </span>
              <p className="text-white text-[34px] font-Averta-Bold leading-[42px]">{`${
                serviceDetails.subTotal ? serviceDetails.subTotal : "$$$"
              }`}</p>
            </div>
            <div>
              <p className="text-[#9ea7af] text-xs font-Averta-Semibold uppercase tracking-wide text-center">
                Sub Total
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:hidden w-[60%]">
        <Button className="h-full rounded-none w-full bg-[#1A78F2] text-lg text-white font-Averta-Semibold">
          Next
        </Button>
      </div>
    </div>
  );
};

export default ProgressBar;
