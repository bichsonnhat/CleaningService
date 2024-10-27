import Header from "@/components/header/Header";
import MonthCarousel from "@/components/month-date/Month";
import Image from "next/image";
import React from "react";
const page = () => {
    const daysOfWeek = [
        "",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
    ];

    return (
        <section className="flex flex-col items-center justify-center">
            <div className="font-Averta-Bold text-center mt-[50px] text-4xl font-bold text-neutral-950">
                Book Date
            </div>
            <div className="font-Averta-Regular text-center text-neutral-500 mt-3 text-[20px]">
                Book a specific date you need to space sparkled
            </div>
            <MonthCarousel />
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
                <div className="mt-[5px] font-Averta-Regular text-[20px] flex flex-row justify-start items-center w-[966p]">
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[11px] m-[3px] rounded-[10px] text-[#DADDE1] border-[2px] border-[#DADDE1]">
                        1
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[11px] m-[3px] rounded-[10px] text-[#DADDE1] border-[2px] border-[#DADDE1]">
                        2
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[11px] m-[3px] rounded-[10px] text-[#DADDE1] border-[2px] border-[#DADDE1]">
                        3
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[11px] m-[3px] rounded-[10px] text-[#DADDE1] border-[2px] border-[#DADDE1]">
                        4
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[11px] m-[3px] rounded-[10px] text-[#DADDE1] border-[2px] border-[#DADDE1]">
                        5
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[11px] m-[3px] rounded-[10px] text-[#DADDE1] border-[2px] border-[#DADDE1]">
                        6
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[11px] m-[3px] rounded-[10px] text-[#DADDE1] border-[2px] border-[#DADDE1]">
                        7
                    </div>
                </div>
                <div className="font-Averta-Regular text-[20px] flex flex-row justify-start items-center w-[966px]">
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[11px] m-[3px] rounded-[10px] text-[#DADDE1] border-[2px] border-[#DADDE1]">
                        8
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[11px] m-[3px] rounded-[10px] text-[#DADDE1] border-[2px] border-[#DADDE1]">
                        9
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[11px] m-[3px] rounded-[10px] text-[#DADDE1] border-[2px] border-[#DADDE1]">
                        10
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[11px] m-[3px] rounded-[10px] text-[#DADDE1] border-[2px] border-[#DADDE1]">
                        11
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[11px] m-[3px] rounded-[10px] text-[#DADDE1] border-[2px] border-[#DADDE1]">
                        12
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[11px] m-[3px] text-[#5e6976] rounded-[10px] border-[2px] border-[#DADDE1]">
                        13
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[11px] m-[3px] text-[#5e6976] rounded-[10px] border-[2px] border-[#DADDE1]">
                        14
                    </div>
                </div>
                <div className="font-Averta-Regular text-[20px] flex flex-row justify-start items-center w-[966px]">
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[11px] m-[3px] rounded-[10px] text-[#DADDE1] border-[2px] border-[#DADDE1]">
                        15
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[11px] m-[3px] text-[#5e6976] rounded-[10px] border-[2px] border-[#DADDE1]">
                        16
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[11px] m-[3px] text-[#5e6976] rounded-[10px] border-[2px] border-blue-600 shadow-lg">
                        17
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[11px] m-[3px] text-[#5e6976] rounded-[10px] border-[2px] border-[#DADDE1]">
                        18
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[11px] m-[3px] text-[#5e6976] rounded-[10px] border-[2px] border-[#DADDE1]">
                        19
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[11px] m-[3px] text-[#5e6976] rounded-[10px] border-[2px] border-[#DADDE1]">
                        20
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[11px] m-[3px] text-[#5e6976] rounded-[10px] border-[2px] border-[#DADDE1]">
                        21
                    </div>
                </div>
                <div className="font-Averta-Regular text-[20px] flex flex-row justify-start items-center w-[966px]">
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[11px] m-[3px] rounded-[10px] text-[#DADDE1] border-[2px] border-[#DADDE1]">
                        22
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[11px] m-[3px] text-[#5e6976] rounded-[10px] border-[2px] border-[#DADDE1]">
                        23
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[11px] m-[3px] text-[#5e6976] rounded-[10px] border-[2px] border-[#DADDE1]">
                        24
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[11px] m-[3px] text-[#5e6976] rounded-[10px] border-[2px] border-[#DADDE1]">
                        25
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[11px] m-[3px] text-[#5e6976] rounded-[10px] border-[2px] border-[#DADDE1]">
                        26
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[11px] m-[3px] text-[#5e6976] rounded-[10px] border-[2px] border-[#DADDE1]">
                        27
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[11px] m-[3px] text-[#5e6976] rounded-[10px] border-[2px] border-[#DADDE1]">
                        28
                    </div>
                </div>
                <div className="font-Averta-Regular text-[20px] flex flex-row justify-start items-center w-[966px]">
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[11px] m-[3px] rounded-[10px] text-[#DADDE1] border-[2px] border-[#DADDE1]">
                        29
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[11px] m-[3px] text-[#5e6976] rounded-[10px] border-[2px] border-[#DADDE1]">
                        30
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[11px] m-[3px] text-[#5e6976] rounded-[10px] border-[2px] border-[#DADDE1]">
                        31
                    </div>
                </div>
            </div>
            <button className="mt-[50px] py-[20px] px-[70px] bg-blue-600 rounded-[10px] text-white w-[180px] h-[60px] text-center">
                Next
            </button>
        </section>
    );
};

export default page;
