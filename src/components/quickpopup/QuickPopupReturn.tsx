import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BookingCanFeedback } from "./QuickPopupFeedback";
import { useToast } from "@/hooks/use-toast";
import BookingDropdown from "../feedback/BookingSelectionDropDown";
import ClipLoader from "react-spinners/ClipLoader";
import { CreateRefundDto } from "@/app/(api)/(routes)/api/refunds/refund.schema";

interface QuickPopupReturnProps {
  toggle: () => void;
  mutate?: (id: string, role: string) => void;
  defaultBookingId: string | null;
}
const QuickPopupReturn: React.FC<QuickPopupReturnProps> = ({
  toggle,
  mutate,
  defaultBookingId,
}) => {
  const [bookings, setBookings] = useState<BookingCanFeedback[] | null>(null);
  const [selectedBooking, setSelectedBooking] =
    useState<BookingCanFeedback | null>(null);
  const fetchFeedback = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/can-refund`
    );
    const data = await response.json();
    setBookings(data);
    console.log("Booking can refund response: ", data);
  };
  useEffect(() => {
    fetchFeedback();
  }, []);
  useEffect(() => {
    if (bookings && bookings.length > 0) {
      const defaultSelectedBooking =
        bookings.find((booking) => booking.id === defaultBookingId) ||
        bookings[0];
      setSelectedBooking(defaultSelectedBooking || null);
    }
    console.log("Selected booking: ", selectedBooking);
  }, [bookings]);
  const handleSelectBooking = (booking: any) => {
    console.log("Selected booking:", booking);
    setSelectedBooking(booking);
  };

  const role = "Customer"; // sau này sẽ thay bằng role của user
  const userId = "fa21339b-a224-466b-bf76-043a207ad160";
  const { toast } = useToast();

  const [reason, setReason] = useState<string>("");
  const [creating, setCreating] = useState(false);

  const handleSubmit = async () => {
    if (reason === "") {
      toast({
        variant: "destructive",
        description: "Please provide a reason.",
      });
      return;
    }

    if (!selectedBooking) {
      toast({
        variant: "destructive",
        description: "Please select a booking.",
      });
      return;
    }

    const refundData: CreateRefundDto = {
      reason: reason,
      booking_id: selectedBooking.id,
      requested_by: false,
      resolved_at: new Date(),
    };
    console.log("Create Refund DTO: ", refundData);

    setCreating(true);
    try {
      const response = await fetch(
        "${process.env.NEXT_PUBLIC_API_URL}/api/refunds",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(refundData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit refund");
      }

      toast({
        description: "Refund submitted successfully!",
      });
      if (mutate) {
        mutate(userId, role);
      }
      setTimeout(() => {
        window.location.reload();
      }, 1000);

      setReason("");
      toggle();
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to submit refund",
      });
    } finally {
      setCreating(false);
    }
  };

  if (!bookings)
    return (
      <div
        className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-[20px] md:px-[50px] md:py-[30px] w-[60%] h-[90%]"
          onClick={(e) => e.stopPropagation()}
        >
          <ClipLoader color="#1a78f2" loading={true} size={150} />
        </div>
      </div>
    );

  return (
    <div
      className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="relative flex flex-col bg-white rounded-lg shadow-lg p-[20px] md:px-[50px] md:py-[30px] w-fit xl:w-[50%] h-fit max-h-[95%] gap-[20px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-4 right-4 xl:top-8 xl:right-8 p-2 flex items-center justify-center rounded-full hover:bg-gray-200 hover:shadow-md transition duration-200 ease-in-out">
          <button onClick={toggle} className="ml-auto">
            <Image
              src="/images/ProgressBar/Group.svg"
              alt="exitButton"
              width={20}
              height={20}
            />
          </button>
        </div>
        <div className="flex flex-col justify-center items-center text-[20px] xl:text-[28px] lg:text-[32px]">
          <p className="text-[#1a78f2] font-Averta-Bold leading-[62px] self-start">
            - We’re Here to Make Things Right
          </p>
          <p className="text-[#170f49] text-base  font-Averta-Regular xl:leading-[30px] self-start max-xl:mb-4">
            “Let us know what went wrong, and we’ll work with you to resolve it
            promptly.”
          </p>
          <p className="text-[#170f49] font-Averta-Bold xl:leading-[62px]">
            Fill the form to submit your refund request
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col w-full h-fit gap-[11px] xl:px-[16px] py-[13px]">
            <p className="text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight">
              order selection
            </p>
            {/* <div className="flex flex-row h-fit justify-between p-[13px] border-[#d3d8dd] border-2 rounded-lg">
              <div className="flex flex-row gap-[10px] items-center justify-center">
                <Image
                  src="/images/About/Google.png"
                  alt="avatar"
                  width={20}
                  height={20}
                  className="max-lg:hidden"
                />
                <p className="text-[#4f6071] text-base font-Averta-Semibold leading-[23px] tracking-tight">
                  Long Nhat dep trai
                </p>
              </div>
              <div className="flex flex-col divide-y-2 h-full">
                <p className="text-[#1d2c4c] opacity-50 text-sm leading-[19px] tracking-tight font-Averta-Semibold">
                  <span className="text-[#677482]">8 AM</span> -{" "}
                  <span className="text-[#677482]">6 PM</span>
                </p>
                <p className="text-[#1d2c4c] opacity-50 text-sm leading-[19px] tracking-tight font-Averta-Semibold text-center">
                  10/29/2024
                </p>
              </div>
              <div className="bg-[#1a78f2] bg-opacity-20 py-2 px-3 rounded-md flex justify-center items-center">
                <p className="text-[#1a78f2] text-xs font-bold">
                  Home Cleaning
                </p>
              </div>
            </div> */}
            <BookingDropdown
              bookings={bookings}
              defaultBooking={
                bookings.find((booking) => booking.id === defaultBookingId) ||
                bookings[0]
              }
              onSelectBooking={handleSelectBooking}
            />
          </div>
          <div className="flex flex-col w-full h-fit gap-[11px] xl:p-[16px]">
            <p className="text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight">
              Complaint Reason
            </p>
            <textarea
              onChange={(e) => {
                setReason(e.target.value);
              }}
              placeholder="Type your complaint content"
              className="text-[#4f6071] text-base font-Averta-Semibold leading-[23px] tracking-tight border-[#d3d8dd] border-2 rounded-lg min-h-[150px] md:min-h-[200px] px-[10px] py-[16px] resize-none"
            />
          </div>
          <Button
            onClick={handleSubmit}
            className="w-[30%] h-[55px] bg-[#1A78F2] text-lg text-white font-Averta-Semibold my-3"
          >
            {creating ? (
              <ClipLoader color="#ffffff" loading={creating} size={30} />
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickPopupReturn;
