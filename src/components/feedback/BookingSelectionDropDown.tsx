import React, { useState } from "react";
import Image from "next/image";
import { BookingCanFeedback } from "../quickpopup/QuickPopupFeedback";

// type BookingInfo = {
//   avatar: string;
//   name: string;
//   timeRange: string;
//   date: string;
//   service: string;
// };

type BookingDropdownProps = {
  bookings: BookingCanFeedback[];
  defaultBooking?: BookingCanFeedback;
  onSelectBooking?: (booking: BookingCanFeedback) => void;
  reportedBy?: boolean | false;
};

const BookingDropdown: React.FC<BookingDropdownProps> = ({
  bookings,
  defaultBooking,
  onSelectBooking,
  reportedBy,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] =
    useState<BookingCanFeedback | null>(defaultBooking || null);

  const handleBookingSelect = (booking: BookingCanFeedback) => {
    setSelectedBooking(booking);
    setIsOpen(false);
    if (onSelectBooking) {
      onSelectBooking(booking);
    }
  };

  const formatBookingTime = (
    scheduledStartTime: Date,
    scheduledEndTime: Date
  ): string => {
    const startHour = scheduledStartTime.getHours().toString().padStart(2, "0");
    const startMinute = scheduledStartTime
      .getMinutes()
      .toString()
      .padStart(2, "0");

    const endHour = scheduledEndTime.getHours().toString().padStart(2, "0");
    const endMinute = scheduledEndTime.getMinutes().toString().padStart(2, "0");

    return `${startHour}:${startMinute} - ${endHour}:${endMinute}`;
  };

  const formatBookingDate = (scheduledStartTime: Date): string => {
    const startDate = scheduledStartTime.getDate().toString().padStart(2, "0");
    const startMonth = (scheduledStartTime.getMonth() + 1)
      .toString()
      .padStart(2, "0");
    const startYear = scheduledStartTime.getFullYear();
    return `${startDate}/${startMonth}/${startYear}`;
  };

  return (
    <div className="relative w-full">
      {/* Dropdown Button */}
      <div
        className="flex flex-row h-fit justify-between p-[13px] border-[#d3d8dd] border-2 rounded-lg cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="flex flex-row gap-[10px] items-center w-full">
          {selectedBooking ? (
            <div className="flex flex-row items-center justify-between w-full">
              <div className="flex flex-row gap-[10px] w-[40%] items-center justify-start">
                <Image
                  src={"/images/About/Google.png"}
                  alt="avatar"
                  width={20}
                  height={20}
                  className=""
                />
                <p className="text-[#4f6071] text-sm xl:text-base font-Averta-Semibold leading-[23px] tracking-tight">
                  {reportedBy === false
                    ? selectedBooking.helper.user.fullName
                    : selectedBooking.customer.fullName}
                </p>
              </div>
              <div className="flex flex-col gap-1 w-[30%] h-full text-center">
                <p className="text-[#1d2c4c] opacity-50 text-xs xl:text-sm leading-[19px] tracking-tight font-Averta-Semibold relative">
                  {formatBookingTime(
                    new Date(selectedBooking.scheduledStartTime),
                    new Date(selectedBooking.scheduledEndTime)
                  )}
                  {/* <span className="absolute bottom-0 left-1/2 w-[60%] h-[2px] bg-[#d3d8dd] transform -translate-x-1/2"></span> */}
                  <span className="block w-[60%] h-[1px] bg-[#d3d8dd] mx-auto"></span>
                </p>
                <p className="text-[#1d2c4c] opacity-50 text-xs xl:text-sm leading-[19px] tracking-tight font-Averta-Semibold">
                  {formatBookingDate(
                    new Date(selectedBooking.scheduledStartTime)
                  )}
                </p>
              </div>

              <div className="flex items-center justify-end w-[30%]">
                <div className="bg-[#1a78f2] bg-opacity-20 py-2 px-3 rounded-md flex justify-center items-center">
                  <p className="text-[#1a78f2] text-xs font-bold">
                    {selectedBooking.serviceCategory.name}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-[#9ea7af] text-base font-Averta-Semibold leading-[23px] tracking-tight">
              There are no bookings available
            </p>
          )}
        </div>
      </div>

      {/* Dropdown Items */}
      {isOpen && bookings.length > 0 && (
        <div className="absolute mt-2 w-full bg-white border border-[#d3d8dd] rounded-lg shadow-lg z-10">
          {bookings.map((booking, index) => (
            <div
              key={index}
              className={`flex flex-row h-fit justify-between p-[13px] border-b last:border-none border-[#d3d8dd] cursor-pointer hover:bg-[#f0f4f8] ${
                selectedBooking?.id === booking.id ? "bg-[#e6f7ff]" : ""
              }`}
              onClick={() => handleBookingSelect(booking)}
            >
              <div className="flex flex-row gap-[10px] w-[40%] items-center justify-start">
                <Image
                  src={"/images/About/Google.png"}
                  alt="avatar"
                  width={20}
                  height={20}
                  className="max-lg:hidden"
                />
                <p className="text-[#4f6071] text-base font-Averta-Semibold leading-[23px] tracking-tight">
                  {booking.helper.user.fullName}
                </p>
              </div>
              <div className="flex flex-col gap-1 w-[30%] h-full text-center">
                <p className="text-[#1d2c4c] opacity-50 text-sm leading-[19px] tracking-tight font-Averta-Semibold relative">
                  {formatBookingTime(
                    new Date(booking.scheduledStartTime),
                    new Date(booking.scheduledEndTime)
                  )}
                  {/* <span className="absolute bottom-0 left-1/2 w-[60%] h-[2px] bg-[#d3d8dd] transform -translate-x-1/2"></span> */}
                  <span className="block w-[60%] h-[1px] bg-[#d3d8dd] mx-auto"></span>
                </p>
                <p className="text-[#1d2c4c] opacity-50 text-sm leading-[19px] tracking-tight font-Averta-Semibold">
                  {formatBookingDate(new Date(booking.scheduledStartTime))}
                </p>
              </div>

              <div className="flex items-center justify-end w-[30%]">
                <div className="bg-[#1a78f2] bg-opacity-20 py-2 px-3 rounded-md flex justify-center items-center">
                  <p className="text-[#1a78f2] text-xs font-bold">
                    {booking.serviceCategory.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingDropdown;
