'use client'
import React from 'react'
import { FaRegTrashAlt } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { LuArrowLeft } from "react-icons/lu";
import Image from 'next/image';
import { Feedback } from '@/components/feedback/FeedbackTable';
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
} from "@/components/ui/alert-dialog"
import { useRouter } from 'next/navigation';
export type Refund = {
    id: number;
    booking_id: string;
    reason: string;
    status: "Pending" | "Refunded" | "Declined";
    create_at: string;
    resolved_at: string;
}
const RefundDetail = () => {
    const refundData: Refund = {
        id: 1,
        booking_id: "123456",
        reason: "I want to cancel my booking",
        status: "Pending",
        create_at: "OCT 15 - 8:13 AM",
        resolved_at: "OCT 15 - 8:13 AM"
    }
    const logo = [
        {
            logo: '/images/Dashboard/Feedback/Clean.svg'
        },
        {
            logo: '/images/About/UIT.svg'
        }
    ]
    const router = useRouter()
    return (
        <div className="flex flex-col justify-center mt-3.5 w-full bg-white rounded max-md:px-5 max-md:max-w-full">
            <div className="flex flex-col w-full rounded max-md:max-w-full pb-6">
                {/* Begin Title */}
                <div className='flex flex-row items-center justify-between'>
                    <div className='flex flex-row items-center justify-start'>
                        <button 
                        onClick={() => router.back()}
                        className='h-full p-6 hover:bg-slate-200 border-r-[1px] '>
                            <LuArrowLeft className='h-[19px] text-neutral-300 text-xl font-bold' />
                        </button>
                        <p className='overflow-hidden self-stretch px-3 py-5 w-full ml-5 min-h-[48px] font-Averta-Bold text-lg'>{refundData.reason}</p>
                    </div>
                    <div className='flex flex-row'>
                        {/*  */}
                        {refundData.status == 'Pending' && <div className='flex flex-row justify-center items-center gap-2'>
                            {/* Nút refund */}
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <div className='flex items-center justify-center px-8 py-2 md:w-[130px] rounded-lg font-Averta-Bold text-[13px] text-white bg-blue-600 hover:bg-blue-500'>Refund</div>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This action will accept the request and refund to customer.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction>
                                            Continue
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            {/* Nút decline */}
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <div className='flex items-center justify-center px-8 py-2 md:w-[130px] rounded-lg font-Averta-Bold text-[13px] text-white bg-red-600 hover:bg-red-500'>Decline</div>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This action will decline the refund request from customer.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction asChild>
                                            <button className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700">
                                                Continue
                                            </button>
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>}
                        {(refundData.status == 'Refunded' || refundData.status == 'Declined') &&
                            <div className="flex justify-center items-center">
                                <div className="flex justify-center items-center px-8 py-2 md:w-[130px] rounded-lg bg-neutral-500 font-Averta-Bold text-white text-[13px]">
                                    {refundData.status}
                                </div>
                            </div>}
                        <button className='h-full p-6 ml-2 hover:bg-slate-200'>
                            <FaRegTrashAlt className='h-[19px]' />
                        </button>
                    </div>
                </div>
                {/* End Title */}
                {/* Begin Sender info */}
                <div className='flex flex-row items-center justify-between py-3 px-5'>
                    <div className='flex flex-row items-center gap-2'>
                        <Image
                            src="/images/Dashboard/Header/Avatar.png"
                            alt="Avatar"
                            width={44}
                            height={44}
                            sizes='100vw'
                            style={{ width: '60px', height: 'auto' }}
                        />
                        <div className='flex flex-row self-stretch items-center mx-4'>
                            <p className=' font-bold font-Averta-Semibold text-lg mr-1'>Jullu Jalal</p>
                            <p className='text-xs font-semibold text-neutral-600 font-Averta-Regular mt-0.5'>{'<customer>'}</p>
                        </div>
                    </div>
                    <p className=" py-4 font-Averta-Regular text-sm text-gray-400">{refundData.create_at}</p>
                </div>
                {/* End Sender info */}
                {/* Begin Content */}
                <div className='flex flex-col w-full h-fit px-16 py-8'>
                    <p className='overflow-hidden self-stretch px-3 py-5 w-full ml-5 min-h-[48px] font-Averta-Bold text-2xl'> {refundData.reason}</p>
                    <p className='overflow-hidden self-stretch px-3 py-5 w-full ml-5 min-h-[48px] font-Averta-Regular'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                {/* End  Content*/}
                {/* Logo */}
                <div className='flex flex-row items-center justify-center gap-8 w-full h-[100px]'>
                    {logo.map((items) => (
                        <div key={items.logo} className='flex items-center justify-center'>
                            <div className='relative w-full h-[25px] md:h-[30px] lg:h-[40px]'>
                                <Image
                                    src={items.logo}
                                    alt='ClientLogo'
                                    width={50}
                                    height={50}
                                    style={{ height: '40px', width: 'auto' }}
                                    className='object-contain filter grayscale'
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default RefundDetail