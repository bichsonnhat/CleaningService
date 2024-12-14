import { bookingStore } from "@/utils/store/booking.store";
import React, { useState } from "react";

interface CalendarProps {
    month: number;
    year?: number;
}

interface SelectedDay {
    day: number;
    month: number;
    year: number;
}

const Calendar: React.FC<CalendarProps> = ({
    month,
    year = new Date().getFullYear(),
}) => {
    const bookingData = bookingStore((state: any) => state.bookingData);
    const bookingUpdate = bookingStore((state: any) => state.updateBookingData);

    const daysInMonth = new Date(year, month, 0).getDate();
    const startDay = new Date(year, month - 1, 1).getDay();
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blankDays = Array.from({ length: startDay }, (_, i) => i);

    const today = new Date();
    const currentDate = today.getDate();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();
    const isCurrentMonth = currentMonth === month && currentYear === year;

    const [selectedDay, setSelectedDay] = useState<SelectedDay | null>(null);

    if (month === 0) month = 12;

    const handleDayClick = (day: number) => {
        const selectedDate: SelectedDay = { day, month, year };
        const dateToCheck = new Date(year, month - 1, day);
        const todayDate = new Date(currentYear, currentMonth - 1, currentDate);

        // Set hours, minutes, seconds, and milliseconds to 0 for accurate date comparison
        dateToCheck.setHours(0, 0, 0, 0);
        todayDate.setHours(0, 0, 0, 0);

        const isDateSelectable = dateToCheck >= todayDate;

        if (isDateSelectable) {
            if (
                selectedDay?.day === day &&
                selectedDay?.month === month &&
                selectedDay?.year === year
            ) {
                setSelectedDay(null);
            } else {
                setSelectedDay(selectedDate);
            }
        }

        return selectedDate;
    };

    const isDateInPast = (day: number) => {
        const dateToCheck = new Date(year, month - 1, day);
        const todayDate = new Date(currentYear, currentMonth - 1, currentDate);

        dateToCheck.setHours(0, 0, 0, 0);
        todayDate.setHours(0, 0, 0, 0);

        return dateToCheck < todayDate;
    };

    return (
        <div className="grid grid-cols-7 gap-3 sm:w-[600px] md:w-[680px] lg:w-[966px] w-[360px] font-Averta-Regular text-[20px]">
            {blankDays.map((_, index) => (
                <div
                    key={`blank-${index}`}
                    className="w-[132px] h-[55px] p-2 text-center rounded-[10px] border-2 border-transparent"
                />
            ))}

            {daysArray.map((day) => {
                const isDisabled = isDateInPast(day);
                const isSelected =
                    selectedDay?.day === day &&
                    selectedDay?.month === month &&
                    selectedDay?.year === year;

                return (
                    <div
                        key={day}
                        onClick={() => {
                            const res = handleDayClick(day);
                            bookingUpdate({
                                bookingDate: `${res.year}-${res.month}-${res.day}`,
                            });
                        }}
                        className={`lg:w-[132px] lg:h-[55px] p-2 text-center rounded-[10px] border-2 cursor-pointer font-Averta-Semibold pt-[10px] ${
                            isSelected
                                ? "border-blue-600 shadow-lg"
                                : "border-[#DADDE1]"
                        } ${
                            isDisabled
                                ? "text-gray-400 cursor-not-allowed"
                                : "text-[#5e6976]"
                        }`}
                        style={{
                            pointerEvents: isDisabled ? "none" : "auto",
                        }}
                    >
                        {day}
                    </div>
                );
            })}
        </div>
    );
};

export default Calendar;
