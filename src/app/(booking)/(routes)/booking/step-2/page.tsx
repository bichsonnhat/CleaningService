"use client";
import Calendar from "@/components/calendar/Calendar";
import Header from "@/components/header/Header";
import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
const Step_2 = () => {
    const daysOfWeek = [
        "",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
    ];

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const today = new Date();

    const [currentIndex, setCurrentIndex] = useState(today.getMonth() + 1);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % months.length);
    };

    const handlePrev = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + months.length) % months.length
        );
    };

    const getMonth = (index: any) => {
        return months[(index + months.length - 1) % months.length];
    };

    return (
        <section className="flex flex-col items-center justify-center">
            <div className="font-Averta-Bold text-center mt-[50px] text-4xl font-bold text-[#151634]">
                Book Date
            </div>
            <div className="font-Averta-Regular text-center text-neutral-500 mt-3 text-[20px]">
                Book a specific date you need to space sparkled
            </div>
            <div className="mt-[50px] flex flex-row justify-between min-w-[1002px]">
                <div>
                    <Image
                        src="/images/icons/arrow_back.svg"
                        alt="arrow_back"
                        height={24}
                        width={24}
                        onClick={handlePrev}
                    />
                </div>
                <div
                    className={`flex flex-row gap-4 text-2xl font-Averta-Regular items-center`}
                >
                    <div
                        className="w-[122px] text-center text-neutral-400 cursor-pointer"
                        onClick={handlePrev}
                    >
                        {getMonth(currentIndex - 1)}
                    </div>

                    <div
                        className="w-[122px] text-center text-[#151634] font-Averta-Semibold"
                        key={currentIndex} // Helps React recognize each month as unique
                    >
                        {getMonth(currentIndex)}
                    </div>

                    <div
                        className="w-[122px] text-center text-neutral-400 cursor-pointer"
                        onClick={handleNext}
                    >
                        {getMonth(currentIndex + 1)}
                    </div>
                </div>
                <div>
                    <Image
                        src="/images/icons/arrow_forward.svg"
                        alt="arrow_forward"
                        height={24}
                        width={24}
                        onClick={handleNext}
                    />
                </div>
            </div>
            <div className="flex flex-col justify-center items-center mt-[50px] ">
                <div className="font-Averta-Regular text-[12px] flex flex-row justify-center items-center w-[966px] text-[#DADDE1]">
                    <div className="w-[132px] text-center m-[3px]">SUNDAY</div>
                    <div className="w-[132px] text-center m-[3px]">MONDAY</div>
                    <div className="w-[132px] text-center m-[3px]">TUESDAY</div>
                    <div className="w-[132px] text-center m-[3px]">
                        WEDNESDAY
                    </div>
                    <div className="w-[132px] text-center m-[3px]">
                        THURSDAY
                    </div>
                    <div className="w-[132px] text-center m-[3px]">FRIDAY</div>
                    <div className="w-[132px] text-center m-[3px]">
                        SATURDAY
                    </div>
                </div>
                <Calendar month={currentIndex} />
            </div>
            <button className="mt-[50px] py-[20px] px-[70px] bg-blue-600 rounded-[10px] text-white w-[180px] h-[60px] text-center font-Averta-Semibold">
                Next
            </button>
        </section>
    );
};

export default Step_2;
