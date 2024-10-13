import Header from "@/components/header/Header";
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
            <div className="font-Averta-Bold text-center mt-[50px] text-3xl font-bold text-neutral-950">
                Book Date
            </div>
            <div className="font-Averta-Regular text-center text-neutral-500 mt-3 text-[20px]">
                Book a specific date you need to space sparkled
            </div>
            <div className="mt-[50px] flex flex-row justify-between min-w-[1002px]">
                <div className="">
                    <Image
                        src="/images/icons/arrow_back.svg"
                        alt="arrow_back"
                        height={24}
                        width={24}
                    />
                </div>
                <div className="flex flex-row gap-4 text-2xl font-Averta-Regular">
                    <div className="w-[122px] text-center text-neutral-400">
                        March
                    </div>
                    <div className="w-[122px] text-center text-neutral-950 font-Averta-Semibold">
                        April
                    </div>
                    <div className="w-[122px] text-center text-neutral-400">
                        May
                    </div>
                </div>
                <div className="">
                    <Image
                        src="/images/icons/arrow_forward.svg"
                        alt="arrow_forward"
                        height={24}
                        width={24}
                    />
                </div>
            </div>
            <div className="flex flex-col justify-center items-center mt-[50px] ">
                <div className="font-Averta-Regular text-1xl flex flex-row justify-center items-center w-[966px] text-neutral-400">
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
                <div className="mt-[10px] font-Averta-Regular text-2xl flex flex-row justify-start items-center w-[966p]">
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[9px] m-[3px] rounded-lg text-neutral-400 border-[2px] border-neutral-400">
                        1
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[9px] m-[3px] rounded-lg text-neutral-400 border-[2px] border-neutral-400">
                        2
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[9px] m-[3px] rounded-lg text-neutral-400 border-[2px] border-neutral-400">
                        3
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[9px] m-[3px] rounded-lg text-neutral-400 border-[2px] border-neutral-400">
                        4
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[9px] m-[3px] rounded-lg text-neutral-400 border-[2px] border-neutral-400">
                        5
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[9px] m-[3px] rounded-lg text-neutral-400 border-[2px] border-neutral-400">
                        6
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[9px] m-[3px] rounded-lg text-neutral-400 border-[2px] border-neutral-400">
                        7
                    </div>
                </div>
                <div className="font-Averta-Regular text-2xl flex flex-row justify-start items-center w-[966px]">
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[9px] m-[3px] rounded-lg text-neutral-400 border-[2px] border-neutral-400">
                        8
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[9px] m-[3px] rounded-lg text-neutral-400 border-[2px] border-neutral-400">
                        9
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[9px] m-[3px] rounded-lg text-neutral-400 border-[2px] border-neutral-400">
                        10
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[9px] m-[3px] rounded-lg text-neutral-400 border-[2px] border-neutral-400">
                        11
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[9px] m-[3px] rounded-lg text-neutral-400 border-[2px] border-neutral-400">
                        12
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[9px] m-[3px] rounded-lg border-[2px] border-neutral-400">
                        13
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[9px] m-[3px] rounded-lg border-[2px] border-neutral-400">
                        14
                    </div>
                </div>
                <div className="font-Averta-Regular text-2xl flex flex-row justify-start items-center w-[966px]">
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[9px] m-[3px] rounded-lg text-neutral-400 border-[2px] border-neutral-400">
                        15
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[9px] m-[3px] rounded-lg border-[2px] border-neutral-400">
                        16
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[9px] m-[3px] rounded-lg border-[3px] border-blue-600 shadow-lg">
                        17
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[9px] m-[3px] rounded-lg border-[2px] border-neutral-400">
                        18
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[9px] m-[3px] rounded-lg border-[2px] border-neutral-400">
                        19
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[9px] m-[3px] rounded-lg border-[2px] border-neutral-400">
                        20
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[9px] m-[3px] rounded-lg border-[2px] border-neutral-400">
                        21
                    </div>
                </div>
                <div className="font-Averta-Regular text-2xl flex flex-row justify-start items-center w-[966px]">
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[9px] m-[3px] rounded-lg text-neutral-400 border-[2px] border-neutral-400">
                        22
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[9px] m-[3px] rounded-lg border-[2px] border-neutral-400">
                        23
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[9px] m-[3px] rounded-lg border-[2px] border-neutral-400">
                        24
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[9px] m-[3px] rounded-lg border-[2px] border-neutral-400">
                        25
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[9px] m-[3px] rounded-lg border-[2px] border-neutral-400">
                        26
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[9px] m-[3px] rounded-lg border-[2px] border-neutral-400">
                        27
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[9px] m-[3px] rounded-lg border-[2px] border-neutral-400">
                        28
                    </div>
                </div>
                <div className="font-Averta-Regular text-2xl flex flex-row justify-start items-center w-[966px]">
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[9px] m-[3px] rounded-lg text-neutral-400 border-[2px] border-neutral-400">
                        29
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[9px] m-[3px] rounded-lg border-[2px] border-neutral-400">
                        30
                    </div>
                    <div className="w-[132px] text-center h-[55px] p-2 pt-[9px] m-[3px] rounded-lg border-[2px] border-neutral-400">
                        31
                    </div>
                </div>
            </div>
            <button className="mt-[50px] py-[20px] px-[70px] bg-blue-600 rounded-lg text-white w-[180px] h-[60px] text-center">
                Next
            </button>
        </section>
    );
};

export default page;
