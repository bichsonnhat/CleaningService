"use client";
import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { LuArrowLeft } from "react-icons/lu";
import Image from "next/image";
import { Feedback2 } from "@/components/feedback/FeedbackTable";
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
import ClipLoader from "react-spinners/ClipLoader";
export type Refund = {
  id: number;
  booking_id: string;
  reason: string;
  status: "Pending" | "Refunded" | "Declined";
  create_at: string;
  resolved_at: string;
};
const IssueDetail = ({ params }: { params: { id: string } }) => {
  const issueData: Refund = {
    id: 1,
    booking_id: "123456",
    reason: "I want to cancel my booking",
    status: "Pending",
    create_at: "2024-12-04T12:41:16.135Z",
    resolved_at: "2024-12-04T12:41:16.135Z",
  };
  const { id } = params;
  const router = useRouter();
  const [detail, setDetail] = useState<Feedback2 | null>(null);
  useEffect(() => {
    const fetchDetail = async (id: string) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/feedback/${id}`
      );
      const data = await response.json();
      setDetail(data);
      console.log("Check issue detail", data);
    };

    fetchDetail(id);
  }, [id]);

  const logo = [
    {
      logo: "/images/Dashboard/Feedback/Clean.svg",
    },
    {
      logo: "/images/About/UIT.svg",
    },
  ];

  const formatDate = (date: string) => {
    const newDate = new Date(date);

    const hours = newDate.getHours().toString().padStart(2, "0");
    const minutes = newDate.getMinutes().toString().padStart(2, "0");

    const day = newDate.getDate().toString().padStart(2, "0");
    const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
    const year = newDate.getFullYear();

    return `${hours}:${minutes} - ${day}/${month}/${year}`;
  };

  if (!detail)
    return (
      <div className="flex w-full h-full items-center justify-center">
        <ClipLoader color="#2A88F5" loading={true} size={30} />
      </div>
    );

  return (
    <div className="flex flex-col justify-center mt-3.5 w-full bg-white rounded max-md:max-w-full">
      <div className="flex flex-col w-full rounded max-md:max-w-full pb-6">
        {/* Begin Title */}
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center justify-start">
            <button
              onClick={() => router.back()}
              className="h-full p-6 hover:bg-slate-200 border-r-[1px]"
            >
              <LuArrowLeft className="h-[19px] text-neutral-300 text-xl font-bold" />
            </button>
          </div>

          <p className=" px-3 py-5 ml-5 min-h-[48px] w-full font-Averta-Bold text-sm md:text-base lg:text-lg">
            {detail.title}
          </p>

          <button className="h-full p-6 hover:bg-slate-200">
            <FaRegTrashAlt className="h-[19px]" />
          </button>
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
                {detail.booking.helper.user.fullName}
              </p>
              <p className="text-[10px] lg:text-xs font-semibold text-neutral-600 font-Averta-Regular mt-0.5">
                {"<helper>"}
              </p>
            </div>
          </div>

          <p className=" py-4 font-Averta-Regular text-xs lg:text-sm text-gray-400">
            {formatDate(detail.created_at)}
          </p>
        </div>
        {/* End Sender info */}

        {/* Begin Content */}
        <div className="flex flex-col w-full h-fit lg:px-16 lg:py-8">
          <p className="overflow-hidden self-stretch px-3 py-5 w-full lg:ml-5 min-h-[48px] font-Averta-Bold text-xl lg:text-2xl">
            {" "}
            {detail.title}
          </p>
          <p className="overflow-hidden self-stretch px-3 py-5 w-full lg:ml-5 min-h-[48px] font-Averta-Regular text-sm lg:text-base">
            {detail.description}
          </p>
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
export default IssueDetail;
