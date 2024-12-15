"use client";
import React, { useEffect, useState } from "react";
import { LuArrowLeft } from "react-icons/lu";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { Refund, RefundStatus } from "@/components/refund/RefundTable";
import ClipLoader from "react-spinners/ClipLoader";
import { useToast } from "@/hooks/use-toast";
import { Role } from "@/components/feedback/FeedbackTable";
// export type Refund = {
//   id: number;
//   booking_id: string;
//   reason: string;
//   status: "Pending" | "Refunded" | "Declined";
//   create_at: string;
//   resolved_at: string;
// };
const RefundDetail = ({ params }: { params: { id: string } }) => {
  const { toast } = useToast();
  const router = useRouter();

  const [detail, setDetail] = useState<Refund | null>(null);
  const [fetchStatus, setFetchStatus] = useState<number>();
  const [role, setRole] = useState<string>("");
  const fetchDetail = async (id: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/refunds/${id}`
    );
    const data = await response.json();
    setDetail(data);
    // console.log("Check refund detail", data);
    // console.log("Check refund detail", response.status);
    setFetchStatus(response.status);
  };

  const fetchUserInfo = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user-info`);
    const data = await response.json();
    setRole(data.role);
  }
  useEffect(() => {
    fetchDetail(params.id);
    fetchUserInfo();
  }, [params.id]);

  const [handling, setHandling] = useState(false);

  const logo = [
    {
      logo: "/images/Dashboard/Feedback/Clean.svg",
    },
    {
      logo: "/images/About/UIT.svg",
    },
  ];
  const statusColor =
    detail?.status === RefundStatus.Refunded
      ? "bg-[#ccf0eb] text-[#00b69b]"
      : detail?.status === RefundStatus.Declined
      ? "bg-[#fcd7d4] text-[#ef3826]"
      : "bg-[#fce7af] text-[#FF9500]";

  const formatDate = (date: string) => {
    const newDate = new Date(date);

    const hours = newDate.getHours().toString().padStart(2, "0");
    const minutes = newDate.getMinutes().toString().padStart(2, "0");

    const day = newDate.getDate().toString().padStart(2, "0");
    const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
    const year = newDate.getFullYear();

    return `${hours}:${minutes} - ${day}/${month}/${year}`;
  };

  const handleRefund = async (status: string) => {
    setHandling(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/refunds/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: status, resolved_at: new Date() }),
        }
      );
      //const data = await response.json();
      fetchDetail(params.id);
      toast({
        description: "Refund submitted successfully!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to submit refund",
      });
    } finally {
      setHandling(false);
    }
  };

  if (!detail)
    return (
      <div className="flex w-full h-full items-center justify-center">
        <ClipLoader color="#2A88F5" loading={true} size={30} />
      </div>
    );
  if (fetchStatus == 404) {
    return (
      <div className="flex items-center justify-center font-Averta-Bold text-[28px] w-full h-full">
        <h1>Refund not found</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center mt-3.5 w-full bg-white rounded max-md:max-w-full">
      <div className="flex flex-col w-full rounded max-md:max-w-full pb-6">
        {/* Begin Title */}
        <div className="flex flex-col gap-2 lg:flex-row lg:pr-4 items-start lg:items-center justify-start xl:justify-between">
          <div className="flex flex-row items-center justify-start max-xl:w-full">
            <button
              onClick={() => router.back()}
              className="h-full p-6 hover:bg-slate-200 border-r-[1px] "
            >
              <LuArrowLeft className="h-[19px] text-neutral-300 text-xl font-bold" />
            </button>
            <p className="overflow-hidden self-stretch px-3 py-5 ml-5 min-h-[48px] font-Averta-Bold text-sm xl:text-lg">
              {detail.reason}
            </p>
          </div>
          <div className="flex flex-row pl-4 w-fit">
            {/*  */}
            {detail.status == "pending" && role == "admin" && (
              <div className="flex flex-row justify-end items-center gap-2">
                {/* Nút refund */}
                <AlertDialog>
                  <AlertDialogTrigger>
                    <div className="flex items-center justify-center px-8 py-2 md:w-[130px] rounded-lg font-Averta-Bold text-[13px] text-white bg-blue-600 hover:bg-blue-500">
                      {handling ? (
                        <ClipLoader color="#fff" loading={true} size={30} />
                      ) : (
                        "Refund"
                      )}
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This action will accept
                        the request and refund to customer.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleRefund("refunded")}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                {/* Nút decline */}
                <AlertDialog>
                  <AlertDialogTrigger>
                    <div className="flex items-center justify-center px-8 py-2 md:w-[130px] rounded-lg font-Averta-Bold text-[13px] text-white bg-red-600 hover:bg-red-500">
                      {handling ? (
                        <ClipLoader color="#fff" loading={true} size={30} />
                      ) : (
                        "Decline"
                      )}
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This action will decline
                        the refund request from customer.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleRefund("declined")}
                        className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700"
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
            {detail.status == "pending" && role == "customer" && (
              <div className="flex justify-center items-center">
                <div
                  className={`flex justify-center items-center px-8 py-2 md:w-[130px] rounded-lg ${statusColor} font-Averta-Bold text-[13px]`}
                >
                  {detail.status}
                </div>
              </div>
            )}
            {(detail.status == "refunded" || detail.status == "declined") && (
              <div className="flex justify-center items-center">
                <div
                  className={`flex justify-center items-center px-8 py-2 md:w-[130px] rounded-lg ${statusColor} font-Averta-Bold text-[13px]`}
                >
                  {detail.status}
                </div>
              </div>
            )}
            {/* <button className="h-full p-6 ml-2 hover:bg-slate-200">
              <FaRegTrashAlt className="h-[19px]" />
            </button> */}
          </div>
        </div>
        {/* End Title */}
        {/* Begin Sender info */}
        <div className="flex flex-row items-center justify-between py-3 px-5">
          <div className="flex flex-row items-center gap-2">
            <Image
              src="/images/Dashboard/Header/Avatar.png"
              alt="Avatar"
              width={100}
              height={100}
              className="object-contain filter h-[50px] w-auto lg:h-[60px]"
            />
            <div className="flex flex-row self-stretch items-center mx-4">
              <p className=" font-bold font-Averta-Semibold text-base lg:text-lg mr-1">
                {detail.booking.customer.fullName}
              </p>
              <p className="text-[10px] lg:text-xs font-semibold text-neutral-600 font-Averta-Regular mt-0.5">
                {"<customer>"}
              </p>
            </div>
          </div>

          <p className=" py-4 font-Averta-Regular text-sm md:text-base  text-gray-400">
            {formatDate(detail.created_at)}
          </p>
        </div>
        {/* End Sender info */}
        {/* Begin Content */}
        <div className="flex flex-col w-full h-fit lg:px-16 lg:py-8">
          <p className="overflow-hidden self-stretch px-3 py-5 w-full lg:ml-5 min-h-[48px] font-Averta-Bold text-xl lg:text-2xl">
            {" "}
            {detail.reason}
          </p>
          {/* <p className="overflow-hidden self-stretch px-3 py-5 w-full lg:ml-5 min-h-[48px] font-Averta-Regular text-sm lg:text-base">
            {detail.description}
          </p> */}
        </div>
        {/* End  Content*/}
        {/* Logo */}
        <div className="flex flex-row items-center justify-center gap-8 w-full h-[100px]">
          {logo.map((items) => (
            <div key={items.logo} className="flex items-center justify-center">
              <div className="relative flex items-center w-full h-[30px] lg:h-[50px]">
                <Image
                  src={items.logo}
                  alt="ClientLogo"
                  width={100}
                  height={100}
                  className="object-contain filter h-[30px] w-auto lg:h-[40px]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default RefundDetail;
