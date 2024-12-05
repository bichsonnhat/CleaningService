//
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
  const daysInMonth = new Date(year, month, 0).getDate();
  const startDay = new Date(year, month - 1, 1).getDay();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blankDays = Array.from({ length: startDay }, (_, i) => i);

  const today = new Date();
  const isCurrentMonth =
    today.getMonth() + 1 === month && today.getFullYear() === year;

  const currentDay = isCurrentMonth ? today.getDate() : null;

  const [selectedDay, setSelectedDay] = useState<SelectedDay | null>(null);

  if (month === 0) month = 12;

  const handleDayClick = (day: number) => {
    const selectedDate: SelectedDay = { day, month, year };

    if (
      (isCurrentMonth && currentDay !== null && day >= currentDay) ||
      (!isCurrentMonth &&
        (year > today.getFullYear() ||
          (year === today.getFullYear() && month > today.getMonth() + 1)))
    ) {
      setSelectedDay(
        selectedDay &&
          selectedDay.day === day &&
          selectedDay.month === month &&
          selectedDay.year === year
          ? null
          : selectedDate
      );
    }
  };

  return (
    <div className="grid grid-cols-7 gap-3 w-[966px] font-Averta-Regular text-[20px]">
      {blankDays.map((_, index) => (
        <div
          key={`blank-${index}`}
          className="w-[132px] h-[55px] p-2 text-center rounded-[10px] border-2 border-transparent"
        ></div>
      ))}

      {daysArray.map((day) => {
        const isPastMonth =
          year < today.getFullYear() ||
          (year === today.getFullYear() && month < today.getMonth() + 1);

        return (
          <div
            key={day}
            onClick={() => handleDayClick(day)}
            className={`w-[132px] h-[55px] p-2 text-center rounded-[10px] border-2 cursor-pointer font-Averta-Semibold pt-[10px] ${
              selectedDay?.day === day &&
              selectedDay?.month === month &&
              selectedDay?.year === year
                ? "border-blue-600 shadow-lg"
                : "border-[#DADDE1]"
            } ${
              (isCurrentMonth && currentDay !== null && day < currentDay) ||
              isPastMonth
                ? "text-gray-400 cursor-not-allowed" // Ngày của các tháng trước và ngày đã qua trong tháng hiện tại không chọn được
                : "text-[#5e6976]"
            }`}
            style={{
              pointerEvents:
                (isCurrentMonth && currentDay !== null && day < currentDay) ||
                isPastMonth
                  ? "none"
                  : "auto",
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
