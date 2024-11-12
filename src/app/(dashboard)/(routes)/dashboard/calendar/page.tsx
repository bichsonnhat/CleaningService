"use client";
import React, { useState } from "react";
import { text } from "stream/consumers";
import style from "styled-jsx/style";

interface Task {
    date: string; // Format: 'YYYY-MM-DD'
    title: string;
    startTime: string; // Format: 'HH:MM'
    endTime: string; // Format: 'HH:MM'
}

const tasks = [
    {
        date: "2024-10-02",
        title: "Home Cleaning",
        startTime: "09:00",
        endTime: "10:30",
    },
    {
        date: "2024-10-02",
        title: "Home Cleaning",
        startTime: "12:00",
        endTime: "15:30",
    },
    {
        date: "2024-10-11",
        title: "Baby-sitting",
        startTime: "15:00",
        endTime: "18:00",
    },
    {
        date: "2024-10-21",
        title: "Caretaking",
        startTime: "08:00",
        endTime: "12:00",
    },
    {
        date: "2024-10-25",
        title: "Grocery Shopping",
        startTime: "17:00",
        endTime: "18:00",
    },
    {
        date: "2024-10-28",
        title: "Doctor Appointment",
        startTime: "10:00",
        endTime: "11:00",
    },
    {
        date: "2024-10-30",
        title: "Project Meeting",
        startTime: "14:00",
        endTime: "16:00",
    },
];

const CalendarPage = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentDay, setCurrentDay] = useState(
        new Date(currentYear, currentMonth, 1)
    );
    const [view, setView] = useState<"month" | "day">("month");

    // Switches between month view and day view
    const toggleView = (newView: "month" | "day") => {
        setView(newView);
        if (newView === "day") {
            setCurrentDay(new Date(currentYear, currentMonth, 1)); // Set to the first day of the month initially
        }
    };

    const handleDayClick = (day: number) => {
        setCurrentDay(new Date(currentYear, currentMonth, day));
        setView("day");
    };

    // Navigates months in month view or days in day view
    const changeDate = (offset: number) => {
        if (view === "month") {
            const newDate = new Date(currentYear, currentMonth + offset, 1);
            setCurrentMonth(newDate.getMonth());
            setCurrentYear(newDate.getFullYear());
        } else if (view === "day") {
            const newDate = new Date(currentDay);
            newDate.setDate(newDate.getDate() + offset);
            setCurrentDay(newDate);
        }
    };

    const renderMonthView = () => {
        const daysInMonth = new Date(
            currentYear,
            currentMonth + 1,
            0
        ).getDate();
        const startDay = new Date(currentYear, currentMonth, 1).getDay();

        const daysInPrevMonth = new Date(
            currentYear,
            currentMonth,
            0
        ).getDate();
        const prevMonthDays = Array.from(
            { length: startDay },
            (_, i) => daysInPrevMonth - startDay + i + 1
        );

        const currentMonthDays = Array.from(
            { length: daysInMonth },
            (_, i) => i + 1
        );

        const remainingDays =
            42 - (prevMonthDays.length + currentMonthDays.length);
        const nextMonthDays = Array.from(
            { length: remainingDays },
            (_, i) => i + 1
        );

        const getTaskForDate = (day: number, isCurrentMonth: boolean) => {
            const month = isCurrentMonth
                ? currentMonth + 1
                : day <= daysInMonth
                ? currentMonth
                : currentMonth + 2;
            const year =
                month === 0
                    ? currentYear - 1
                    : month === 13
                    ? currentYear + 1
                    : currentYear;
            const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(
                day
            ).padStart(2, "0")}`;
            return tasks.find((task) => task.date === dateStr);
        };

        return (
            <div className="grid grid-cols-7 gap-2 text-center">
                {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(
                    (day) => (
                        <div
                            key={day}
                            className="text-sm font-semibold text-gray-600"
                        >
                            {day}
                        </div>
                    )
                )}

                {prevMonthDays.map((day) => (
                    <div
                        key={`prev-${day}`}
                        onClick={() => changeDate(-1)}
                        className="bg-white min-w-[164px] h-[119px] border rounded-lg p-2 relative text-gray-400 cursor-pointer"
                    >
                        <div className="mt-3 text-left text-[#202224] text-opacity-[0.5] text-[14px] font-medium">
                            {String(day).padStart(2, "0")}
                        </div>
                    </div>
                ))}

                {currentMonthDays.map((day) => {
                    const task = getTaskForDate(day, true);
                    return (
                        <div
                            key={`current-${day}`}
                            onClick={() => handleDayClick(day)}
                            className="bg-white min-w-[164px] h-[119px] border rounded-lg p-2 relative cursor-pointer"
                        >
                            <div className="mt-3 text-left text-[#202224] text-[14px] font-medium">
                                {String(day).padStart(2, "0")}
                            </div>
                            {task && (
                                <div className="absolute left-2 right-2 bg-blue-500 text-white text-[14px] rounded p-1 text-center ">
                                    {task.title}
                                </div>
                            )}
                        </div>
                    );
                })}

                {nextMonthDays.map((day) => (
                    <div
                        key={`next-${day}`}
                        onClick={() => changeDate(1)}
                        className="bg-white min-w-[164px] h-[119px] border rounded-lg p-2 relative text-gray-400 cursor-pointer"
                    >
                        <div className="mt-3 text-left text-[#202224] text-opacity-[0.5] text-[14px] font-medium">
                            {String(day).padStart(2, "0")}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderDayView = () => {
        const dayString = currentDay.toLocaleDateString("en-CA");
        const dayTasks = tasks.filter((task) => task.date === dayString);

        const formatTime = (hour: number) => {
            const period = hour >= 12 ? "PM" : "AM";
            const displayHour = hour % 12 || 12; // Convert 0 to 12 for 12 AM
            return `${displayHour} ${period}`;
        };

        const convertTo12HourFormat = (time: string) => {
            const [hour, minute] = time.split(":").map(Number);
            const period = hour >= 12 ? "PM" : "AM";
            const displayHour = hour % 12 || 12; // Convert 0 to 12 for 12 AM
            return `${displayHour}:${minute
                .toString()
                .padStart(2, "0")} ${period}`;
        };

        const hours = [...Array(23).keys()].map((i) => i + 1).concat(0); // 1 to 23, then 0 for 12 AM

        return (
            <div className="w-full">
                <div className="flex flex-row">
                    <div className="grid grid-cols-2 gap-[30px]">
                        <div className="font-semibold p-2 text-right text-[#202224] text-opacity-[0.8] text-[14px] pr-2">
                            TIME
                        </div>
                        <div className="font-semibold p-2 text-[#202224] text-opacity-[0.8] text-[14px]">
                            EVENT
                        </div>
                    </div>
                </div>
                <div className="">
                    {hours.map((hour, index) => (
                        <div
                            key={hour}
                            className={`bg-white flex items-start h-[80px] ${
                                index === 0 ? "" : "border-t"
                            }`}
                        >
                            <div className="w-16 pr-2 flex items-center justify-end h-full">
                                <span className="text-right text-[#202224] text-opacity-[0.8] text-[14px]">
                                    {formatTime(hour)}
                                </span>
                            </div>

                            <div
                                className="relative"
                                style={{ width: "1035px" }}
                            >
                                {dayTasks.map((task, index) => {
                                    const [startHour, startMin] = task.startTime
                                        .split(":")
                                        .map(Number);
                                    const [endHour, endMin] = task.endTime
                                        .split(":")
                                        .map(Number);
                                    const taskStart = startHour + startMin / 60;
                                    const taskEnd = endHour + endMin / 60;
                                    const duration = taskEnd - taskStart;

                                    if (hour === startHour) {
                                        return (
                                            <div
                                                key={index}
                                                className={`absolute bg-blue-100 text-blue-800 w-[calc(100vw-350px)] lg:w-[calc(100vw-400px)] xl:w-[calc(100vw-450px)] 2xl:w-[calc(100vw-550px)]  rounded-lg shadow-sm flex items-center`}
                                                style={{
                                                    top: `${
                                                        (startMin / 60) * 80 + 5
                                                    }px`,
                                                    height: `${
                                                        duration * 80 - 10
                                                    }px`,
                                                    left: "50px",
                                                }}
                                            >
                                                <div className="text-center ml-[30px]">
                                                    <div className="font-semibold text-[14px]">
                                                        {`${convertTo12HourFormat(
                                                            task.startTime
                                                        )} - ${convertTo12HourFormat(
                                                            task.endTime
                                                        )}`}
                                                    </div>
                                                    <div className="font-semibold text-[14px]">
                                                        {task.title}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="min-w-[1207px] min-h-[970px] p-4 bg-[#F1F4F9]">
            <div className="flex justify-between items-center mb-12">
                <div className="flex items-center space-x-2 gap-[10px]">
                    <button
                        onClick={() => {
                            setCurrentDay(new Date());
                            setView("day");
                        }}
                        className="bg-white w-[59px] text-[14px] px-[8px] py-[6px] border-[1.5px] border-[rgba(32,34,36,0.5)] text-[rgba(32,34,36,0.5)] rounded-[8px] hover:bg-gray-100"
                    >
                        Today
                    </button>

                    <div className="bg-white inline-flex items-center border-[1.5px] border-[rgba(32,34,36,0.5)] rounded-[8px] overflow-hidden divide-x divide-gray-300">
                        <button
                            onClick={() => changeDate(-1)}
                            className="w-[77px] text-[14px] px-[8.5px] py-[6px] text-[rgba(32,34,36,0.5)] hover:bg-gray-100 flex items-center"
                        >
                            <span className="mr-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </span>
                            Back
                        </button>
                        <button
                            onClick={() => changeDate(1)}
                            className="w-[77px] text-[14px] px-[8.5px] py-[6px] text-[rgba(32,34,36,0.5)] hover:bg-gray-100 flex items-center"
                        >
                            Next
                            <span className="ml-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>

                <h2 className="text-4xl font-semibold">
                    {view === "month"
                        ? `${new Date(currentYear, currentMonth).toLocaleString(
                              "en-US",
                              {
                                  month: "long",
                              }
                          )} ${currentYear}`
                        : currentDay.toLocaleDateString("en-US", {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                          })}
                </h2>

                <div className="bg-white inline-flex items-center text-center border-[1.5px] border-[rgba(32,34,36,0.5)] rounded-[8px] overflow-hidden divide-x divide-gray-300">
                    <button
                        onClick={() => toggleView("month")}
                        className={`w-[77px] text-[14px] px-[17px] py-[6px] text-[rgba(32,34,36,0.5)] hover:bg-gray-100 flex justify-center items-center`}
                    >
                        Month
                    </button>
                    <button
                        onClick={() => toggleView("day")}
                        className={`w-[77px] text-[14px] px-[17px] py-[6px] text-[rgba(32,34,36,0.5)] hover:bg-gray-100 flex justify-center items-center`}
                    >
                        Day
                    </button>
                </div>
            </div>

            {view === "month" ? renderMonthView() : renderDayView()}
        </div>
    );
};

export default CalendarPage;