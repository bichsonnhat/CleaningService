"use client";
import Calendar from "@/components/calendar/Calendar";
import Header from "@/components/header/Header";
import Image from "next/image";
import { useRouter } from "next/navigation";
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

    const route = useRouter();
    const handleRoute = () => {
        route.push("/booking/step-3");
    };

    return (
        <section className="flex flex-col items-center justify-center">
            <div className="font-Averta-Bold text-center mt-[50px] text-4xl font-bold text-[#151634]">
                Book Date
            </div>
            <div className="font-Averta-Regular text-center text-neutral-500 mt-3 text-[20px]">
                Book a specific date you need to space sparkled
            </div>
            <div className="mt-[50px] flex flex-row justify-between xl:w-[1000px] lg:w-[550px] sm:w-[500px] w-[390px]">
                <div className="hidden sm:block">
                    <Image
                        src="/images/icons/arrow_back.svg"
                        alt="arrow_back"
                        height={24}
                        width={24}
                        onClick={handlePrev}
                    />
                </div>
                <div
                    className={`flex flex-row sm:gap-4 gap-1 text-2xl font-Averta-Regular items-center`}
                >
                    <div
                        className="text-[20px] sm:text-[24px] w-[122px] text-center text-neutral-400 cursor-pointer"
                        onClick={handlePrev}
                    >
                        {getMonth(currentIndex - 1)}
                    </div>

                    <div
                        className="text-[20px] sm:text-[24px] w-[122px] text-center text-[#151634] font-Averta-Semibold"
                        key={currentIndex}
                    >
                        {getMonth(currentIndex)}
                    </div>

                    <div
                        className="text-[20px] sm:text-[24px] w-[122px] text-center text-neutral-400 cursor-pointer"
                        onClick={handleNext}
                    >
                        {getMonth(currentIndex + 1)}
                    </div>
                </div>
                <div className="hidden sm:block">
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
                <div className="grid grid-cols-7 gap-3 sm:w-[600px] md:w-[680px] lg:w-[966px] w-[360px] font-Averta-Regular text-[12px] items-center text-[#a6a8ab]">
                    <div className="lg:w-[132px] text-center m-[3px]">SUN</div>
                    <div className="lg:w-[132px] text-center m-[3px]">MON</div>
                    <div className="lg:w-[132px] text-center m-[3px]">TUE</div>
                    <div className="lg:w-[132px] text-center m-[3px]">WED</div>
                    <div className="lg:w-[132px] text-center m-[3px]">THU</div>
                    <div className="lg:w-[132px] text-center m-[3px]">FRI</div>
                    <div className="lg:w-[132px] text-center m-[3px]">SAT</div>
                </div>
                <Calendar month={currentIndex} />
            </div>
            <button
                className="mt-[50px] py-[20px] px-[70px] bg-blue-600 rounded-[10px] text-white w-[180px] h-[60px] text-center font-Averta-Semibold"
                onClick={handleRoute}
            >
                Next
            </button>
        </section>
    );
};

export default Step_2;
