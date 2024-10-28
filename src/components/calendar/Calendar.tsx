import React, { useState } from "react";

interface CalendarProps {
    month: number;
    year?: number;
}

const Calendar: React.FC<CalendarProps> = ({
    month,
    year = new Date().getFullYear(),
}) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const startDay = new Date(year, month - 1, 1).getDay();
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blankDays = Array.from({ length: startDay }, (_, i) => i);

    const [selectedDays, setSelectedDays] = useState<number[]>([]);

    const handleDayClick = (day: number) => {
        setSelectedDays((prevSelectedDays) =>
            prevSelectedDays.includes(day)
                ? prevSelectedDays.filter((d) => d !== day)
                : [...prevSelectedDays, day]
        );
    };

    return (
        <div className="grid grid-cols-7 gap-3 w-[966px] font-Averta-Regular text-[20px]">
            {blankDays.map((_, index) => (
                <div
                    key={`blank-${index}`}
                    className="w-[132px] h-[55px] p-2 text-center rounded-[10px] border-2 border-transparent"
                ></div>
            ))}

            {daysArray.map((day) => (
                <div
                    key={day}
                    onClick={() => handleDayClick(day)}
                    className={`flex items-center justify-center w-[132px] h-[55px] p-2 text-center  rounded-[10px] border-2 cursor-pointer font-Averta-Semibold ${selectedDays.includes(day)
                        ? "border-blue-600 shadow-lg"
                        : "border-[#DADDE1]"
                        }`}
                    style={{ color: day > 15 ? "#5e6976" : "#DADDE1" }}
                >
                    {day}
                </div>
            ))}
        </div>
    );
};

export default Calendar;
