"use client";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from "next/navigation";
import { ScrollArea } from "../ui/scroll-area";
import { Label } from "../ui/label";
import FileDownloadCard from "../card/FileDownloadCard";
import { useToast } from "@/hooks/use-toast";

export type Order = {
  id: string;
  customerId: string;
  helperId: string;
  serviceTypeId: string;
  location: string;
  scheduledStartTime: string;
  scheduledEndTime: string;
  status: string;
  cancellationReason?: string;
  totalPrice: number;
  paymentStatus: string;
  paymentMethod?: string;
  createdAt: string;
  updatedAt: string;
  customer: {
    fullName: string;
  };
  helper: {
    user: {
      fullName: string;
    };
    averageRating: number;
  };
  feedbacks: {
    id: string;
    reportedBy: boolean;
  }[];
  refunds: {
    id: string;
  }[];
  serviceCategory: {
    name: string;
    description: string;
  };
};

export enum BookingStatus {
  Completed = "completed",
  Cancelled = "cancelled",
  Pending = "pending",
  InProgress = "inprogress",
  Requested = "requested",
  Refunded = "refunded",
  Declined = "declined",
}

interface QuickPopupAdminProps {
  toggle: () => void;
  bookingId: string;
}
const QuickPopupAdmin: React.FC<QuickPopupAdminProps> = ({
  toggle,
  bookingId,
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const [booking, setBooking] = useState<Order | null>(null);
  const [contract, setContract] = useState<File | null>(null);

  const fetchBooking = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${bookingId}`
    );
    const data = await response.json();
    setBooking(data);
    console.log("Booking: ", data);
  };
  useEffect(() => {
    const contractUrl =
      "https://res.cloudinary.com/dk4auce82/image/upload/v1735639521/image-upload/xdsiy7nayojazkxphrbt.pdf";

    if (contractUrl) {
      fetch(contractUrl)
        .then((response) => response.blob())
        .then((blob) => {
          // Kiểm tra loại MIME của file để xác định tên và kiểu đúng
          const mimeType = blob.type;

          // Nếu là file PDF
          const file = new File([blob], "Employment Contract", {
            type: mimeType,
          });

          // Set file vào state (setIdCard sẽ nhận file)
          setContract(file);
        })
        .catch((error) =>
          console.error("Error fetching the identity card:", error)
        );
    }
    fetchBooking();
  }, []);

  const handleDownload = (file: File | null) => {
    if (!file) {
      // alert("No file selected to download.");
      toast({
        variant: "destructive",
        title: "No file selected to download.",
      });
      return;
    }

    const fileUrl = URL.createObjectURL(file);

    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = file.name;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(fileUrl);
  };

  //assume that you have booking state
  const bookingState: string = booking?.status ?? "";
  const style =
    bookingState === BookingStatus.Pending ? (
      <div className="w-[60%] h-full bg-[#ffd154] p-[13px] bg-opacity-20 rounded-lg">
        <p className="flex h-full justify-center items-center text-[#ff9400] text-xl font-bold">
          {bookingState.charAt(0).toUpperCase() + bookingState.slice(1)}
        </p>
      </div>
    ) : bookingState === BookingStatus.InProgress ? (
      <div className="w-[60%] h-full bg-[#1a78f2] p-[13px] bg-opacity-20 rounded-lg">
        <p className="flex h-full justify-center items-center text-[#1a78f2] text-xl font-bold">
          {bookingState.charAt(0).toUpperCase() + bookingState.slice(1)}
        </p>
      </div>
    ) : bookingState === BookingStatus.Completed ? (
      <div className="w-[60%] h-full bg-[#00b69b] p-[13px] bg-opacity-20 rounded-lg">
        <p className="flex h-full justify-center items-center text-[#00b69b] text-xl font-bold">
          {bookingState.charAt(0).toUpperCase() + bookingState.slice(1)}
        </p>
      </div>
    ) : bookingState === BookingStatus.Cancelled ? (
      <div className="w-[60%] h-full bg-[#e01a1a] p-[13px] bg-opacity-20 rounded-lg">
        <p className="flex h-full justify-center items-center text-[#e01a1a] text-xl font-bold">
          {bookingState.charAt(0).toUpperCase() + bookingState.slice(1)}
        </p>
      </div>
    ) : bookingState === BookingStatus.Requested ? (
      <div className="w-[60%] h-full bg-[#F87171] p-[13px] bg-opacity-20 rounded-lg">
        <p className="flex h-full justify-center items-center text-[#B91C1C] text-xl font-bold">
          {bookingState.charAt(0).toUpperCase() + bookingState.slice(1)}
        </p>
      </div>
    ) : bookingState === BookingStatus.Refunded ? (
      <div className="w-[60%] h-full bg-[#60A5FA] p-[13px] bg-opacity-20 rounded-lg">
        <p className="flex h-full justify-center items-center text-[#1D4ED8] text-xl font-bold">
          {bookingState.charAt(0).toUpperCase() + bookingState.slice(1)}
        </p>
      </div>
    ) : bookingState === BookingStatus.Declined ? (
      <div className="w-[60%] h-full bg-[#F97316] p-[13px] bg-opacity-20 rounded-lg">
        <p className="flex h-full justify-center items-center text-[#C2410C] text-xl font-bold">
          {bookingState.charAt(0).toUpperCase() + bookingState.slice(1)}
        </p>
      </div>
    ) : (
      ""
    );

  const styleBtn =
    bookingState === BookingStatus.Completed ? (
      <Button
        onClick={() => {
          const firstValidFeedback =
            booking &&
            booking.feedbacks.find((feedback) => !feedback.reportedBy);
          if (firstValidFeedback) {
            router.push(`feedback/${firstValidFeedback.id}`);
          }
        }}
        disabled={
          !booking ||
          booking.feedbacks.find((feedback) => !feedback.reportedBy) ===
            undefined
        }
        className="w-full h-[55px] bg-[#1A78F2] text-lg text-white font-Averta-Semibold"
      >
        Go to Feedback
      </Button>
    ) : bookingState === BookingStatus.Requested && booking?.refunds[0] ? (
      <Button
        onClick={() => {
          router.push(`refund/${booking.refunds[0].id}`);
        }}
        className="w-full h-[55px] bg-[#1A78F2] text-lg text-white font-Averta-Semibold"
      >
        Go to Refund
      </Button>
    ) : (
      ""
    );

  function formatSchedule(startTime: string, endTime: string): string {
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
    };
    const start = startDate.toLocaleTimeString("en-GB", options);
    const end = endDate.toLocaleTimeString("en-GB", options);

    const day = startDate.getDate().toString().padStart(2, "0");
    const month = (startDate.getMonth() + 1).toString().padStart(2, "0"); // tháng nó tính từ 0 nên +1
    const year = startDate.getFullYear();

    return `From ${start} to ${end} | ${day}/${month}/${year}`;
  }

  if (!booking)
    return (
      <div
        className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
        onClick={toggle}
      >
        <div
          className="relative flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-[20px] md:px-[50px] md:py-[30px] w-fit xl:w-[50%] h-[90%]"
          onClick={(e) => e.stopPropagation()}
        >
          <ClipLoader color="#1a78f2" loading={true} size={150} />
        </div>
      </div>
    );

  return (
    <div
      className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={toggle}
    >
      <div
        className="relative flex flex-col bg-white rounded-lg shadow-lg px-[10px] lg:px-[50px] py-[40px] w-full lg:w-[60%] h-fit max-h-[95%] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-4 right-4 lg:top-8 lg:right-8 p-2 flex items-center justify-center rounded-full hover:bg-gray-200 hover:shadow-md transition duration-200 ease-in-out">
          <button onClick={toggle} className="ml-auto">
            <Image
              src="/images/ProgressBar/Group.svg"
              alt="exitButton"
              width={20}
              height={20}
            />
          </button>
        </div>
        <div className="flex flex-col lg:flex-row w-full h-[90%] mt-5 gap-10">
          <div className="w-full lg:w-[50%] h-full flex flex-col gap-4 content-between">
            <div className="w-full h-full flex flex-col gap-[7px]">
              <p className="text-[#12153a] text-lg font-Averta-Semibold uppercase leading-snug tracking-tight">
                helper selection
              </p>
              <div className="flex flex-col px-[16px] pt-[12px] gap-[11px] rounded-lg">
                <p className="text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight">
                  helper
                </p>
                <div className="flex flex-row justify-between p-[13px] border-[#d3d8dd] border-2 rounded-lg bg-[#F4F7F9]">
                  <div className="flex flex-row h-fit gap-[10px]">
                    <Image
                      src="/images/QuickPopUp/avatar-default.png"
                      alt="avatar"
                      width={20}
                      height={20}
                      className="max-xl:hidden"
                    />
                    <p className="text-[#4f6071] text-base font-Averta-Semibold leading-[23px] tracking-tight">
                      {booking.helper?.user.fullName}
                    </p>
                  </div>
                  <div className="flex flex-row h-fit gap-[2px]">
                    <p className="text-[#88929c] text-xl font-Averta-Semibold leading-[25px]">
                      {booking.helper?.averageRating}
                    </p>
                    <Image
                      src="/images/QuickPopUp/StarRating.svg"
                      alt="avatar"
                      width={18}
                      height={18}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-full flex flex-col gap-[8px]">
              <p className="text-[#12153a] text-lg font-Averta-Semibold uppercase leading-snug tracking-tight">
                service details
              </p>
              <div className="flex flex-col h-full px-[16px] pt-[12px] rounded-lg gap-3 pb-7">
                <div className="flex flex-col w-full h-fit gap-[11px]">
                  <p className="text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight">
                    service type
                  </p>
                  <div className="flex flex-row h-fit justify-between p-[13px] border-[#d3d8dd] border-2 rounded-lg bg-[#F4F7F9]">
                    <p className="text-[#4f6071] text-base font-Averta-Semibold leading-[23px] tracking-tight">
                      {booking.serviceCategory.name}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col w-full h-fit gap-[11px]">
                  <p className="text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight">
                    Description
                  </p>
                  <div className="flex flex-col w-full h-[70px] gap-[11px] px-[13px] py-[8px] border-[#d3d8dd] border-2 rounded-lg bg-[#F4F7F9]">
                    <ScrollArea className="text-[#4f6071] text-base font-Averta-Semibold leading-[23px] tracking-tight">
                      {booking.serviceCategory.description}
                    </ScrollArea>
                  </div>
                </div>
                <div className="flex flex-col w-full h-fit gap-[11px]">
                  <Label className="text-[14px] w-fit font-Averta-Semibold text-[#9FA7B0]">
                    CONTRACT
                  </Label>
                  <FileDownloadCard
                    className="min-w-[360px] w-[25vw]"
                    canUpdate={false}
                    fileName={contract?.name}
                    fileSize={contract?.size}
                    onDownload={() => handleDownload(contract)}
                  />
                </div>
                {booking &&
                  booking.feedbacks.some((feedback) => feedback.reportedBy) && (
                    <Button
                      onClick={() => {
                        const firstValidIssue = booking.feedbacks.find(
                          (feedback) => feedback.reportedBy
                        );
                        if (firstValidIssue) {
                          router.push(`issue/${firstValidIssue.id}`);
                        }
                      }}
                      className="w-full h-[55px] bg-[#1A78F2] text-lg text-white font-Averta-Semibold"
                    >
                      Go to Issue
                    </Button>
                  )}
                {/* <div className="flex flex-col w-full h-fit gap-[11px]">
                  <p className="text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight">
                    other service type
                  </p>
                  <div className="flex flex-row h-fit justify-between p-[13px] border-[#d3d8dd] border-2 rounded-lg bg-[#F4F7F9]">
                    <p className="text-[#4f6071] text-base font-Averta-Semibold leading-[23px] tracking-tight">
                      Baby-Sitting
                    </p>
                  </div>
                </div>
                <div className="flex flex-col w-full h-fit gap-[11px]">
                  <p className="text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight">
                    duration type
                  </p>
                  <div className="flex flex-row h-fit justify-between p-[13px] border-[#d3d8dd] border-2 rounded-lg bg-[#F4F7F9]">
                    <p className="text-[#4f6071] text-base font-Averta-Semibold leading-[23px] tracking-tight">
                      1-3 hours
                    </p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[50%] h-full flex flex-col gap-[8px]">
            <p className="text-[#12153a] text-lg font-Averta-Semibold uppercase leading-snug tracking-tight">
              customer-related info
            </p>
            <div className="w-full h-full flex flex-col px-[16px] pb-[16px] pt-[12px] rounded-lg gap-[14.5px]">
              <div className="flex flex-col w-full h-fit gap-[11px]">
                <p className="text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight">
                  customer
                </p>
                <div className="flex flex-row gap-[10px] w-full h-fit p-[13px] border-[#d3d8dd] border-2 rounded-lg bg-[#F4F7F9]">
                  <Image
                    src="/images/About/Google.png"
                    alt="avatar"
                    width={20}
                    height={20}
                    className="max-xl:hidden"
                  />
                  <p className="text-[#4f6071] text-base font-Averta-Semibold leading-[23px] tracking-tight">
                    {booking.customer.fullName}
                  </p>
                </div>
              </div>
              <div className="flex flex-col w-full h-fit gap-[11px]">
                <p className="text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight">
                  Address
                </p>
                <div className="flex flex-row h-fit justify-between p-[13px] border-[#d3d8dd] border-2 rounded-lg bg-[#F4F7F9]">
                  <p className="text-[#4f6071] text-base font-Averta-Semibold leading-[23px] tracking-tight">
                    {booking.location}
                  </p>
                </div>
              </div>
              <div className="flex flex-col w-full h-fit gap-[11px]">
                <p className="text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight">
                  time
                </p>
                <div className="flex flex-row h-fit justify-between p-[13px] border-[#d3d8dd] border-2 rounded-lg bg-[#F4F7F9]">
                  <p className="text-[#4f6071] text-base font-Averta-Semibold leading-[23px] tracking-tight">
                    {formatSchedule(
                      booking.scheduledStartTime,
                      booking.scheduledEndTime
                    )}
                  </p>
                </div>
              </div>
              <div className="flex flex-col w-full h-full gap-[11px]">
                <p className="text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight">
                  price
                </p>
                <div className="flex flex-col w-full h-full gap-[16px]">
                  <div className="h-full justify-between p-[13px] border-[#d3d8dd] border-2 rounded-lg bg-[#F4F7F9]">
                    <p className="text-[#4f6071] text-base font-Averta-Semibold leading-[23px] tracking-tight">
                      {booking.totalPrice}/USD
                    </p>
                  </div>
                  {style}
                </div>
              </div>
              {styleBtn !== "" && <div className="h-[55px]">{styleBtn}</div>}
            </div>
          </div>
        </div>
        {bookingState === BookingStatus.Cancelled ? (
          <div className="h-fit w-full flex flex-col gap-[8px] mt-[10px]">
            <p className="text-[#12153a] text-lg font-Averta-Semibold uppercase leading-snug tracking-tight">
              reason
            </p>
            <div className="flex flex-col p-[16px] gap-[11px] rounded-lg">
              <p className="text-[#9ea7af] text-sm font-Averta-Semibold uppercase leading-[17px] tracking-tight">
                cancellation reason
              </p>
              <div className="flex flex-row justify-between p-[13px] border-[#d3d8dd] border-2 rounded-lg bg-[#F4F7F9] min-h-[130px]">
                <p className="text-[#4f6071] text-base font-Averta-Semibold leading-[23px] tracking-tight">
                  {booking.cancellationReason}
                </p>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default QuickPopupAdmin;
