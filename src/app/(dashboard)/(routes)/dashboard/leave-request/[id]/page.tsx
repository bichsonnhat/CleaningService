'use client'
import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuArrowLeft } from "react-icons/lu";
import ClipLoader from "react-spinners/ClipLoader";
import Image from 'next/image';
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
import { useQueryClient } from "@tanstack/react-query";
const LeaveRequestDetail = ({ params }: { params: { id: string } }) => {
    const [detail, setDetail] = useState<LeaveRequest | null>(null);

    let userRole = 'helper';

    const queryClient = useQueryClient();
    const [rejectionReason, setRejectionReason] = useState("");

    useEffect(() => {
        const fetchDetail = async (id: string) => {
            const response = await fetch(`/api/helper_availability/${id}`);
            const data = await response.json();
            setDetail(data);
        };

        fetchDetail(params.id);
    }, [params.id]);


    const statusColor = detail?.status === 'Approved' ? 'bg-[#ccf0eb] text-[#00b69b]' :
        detail?.status === 'Cancelled' || detail?.status === 'Rejected' ? 'bg-[#fcd7d4] text-[#ef3826]' :
            'bg-[#fce7af] text-[#FF9500]';

    const formatDate = (date: string) => {
        const newDate = new Date(date);

        const hours = newDate.getHours().toString().padStart(2, "0");
        const minutes = newDate.getMinutes().toString().padStart(2, "0");

        const day = newDate.getDate().toString().padStart(2, "0");
        const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
        const year = newDate.getFullYear();

        return `${hours}:${minutes} - ${day} /${month}/${year}`;
    };

    const handleReject = async () => {
        if (!rejectionReason.trim()) {
            alert("Please provide a rejection reason.");
            return;
        }

        try {
            const response = await fetch(`/api/helper_availability/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    status: "Rejected",
                    rejectionReason,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to reject the leave request.");
            }

            const updatedDetail = await response.json();
            setDetail(updatedDetail);
            queryClient.invalidateQueries({
                queryKey: ["leaveRequests"],
            });
            alert("Leave request has been rejected.");
        } catch (error) {
            console.error("Error rejecting leave request:", error);
            alert("Something went wrong while rejecting the leave request.");
        }
    };

    const handleApprove = async () => {
        try {
            const response = await fetch(`/api/helper_availability/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    status: "Approved",
                    //Tam thoi xai User cung
                    approvedById: "ee6efe69-71ca-4e3d-bc07-ba6e5c3e061e",
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to approve the leave request.");
            }

            const updatedDetail = await response.json();
            setDetail(updatedDetail);
            queryClient.invalidateQueries({
                queryKey: ["leaveRequests"],
            });
            alert("Leave request has been approved.");
        } catch (error) {
            console.error("Error approving leave request:", error);
            alert("Something went wrong while approving the leave request.");
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/helper_availability/${params.id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete the leave request.");
            }

            queryClient.invalidateQueries({
                queryKey: ["leaveRequests"],
            });

            alert("Leave request has been deleted successfully.");
            router.back();
        } catch (error) {
            console.error("Error deleting leave request:", error);
            alert("Something went wrong while deleting the leave request.");
        }
    };

    const handleCancel = async () => {
        try {
            const response = await fetch(`/api/helper_availability/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    status: "Cancelled",
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to cancel the leave request.");
            }

            const updatedDetail = await response.json();
            setDetail(updatedDetail);
            queryClient.invalidateQueries({
                queryKey: ["leaveRequests"],
            });
            alert("Leave request has been cancelled.");
        } catch (error) {
            console.error("Error cancelling leave request:", error);
            alert("Something went wrong while cancelling the leave request.");
        }
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

    if (!detail)
        return (
            <div className="flex w-full h-full items-center justify-center">
                <ClipLoader color="#2A88F5" loading={true} size={30} />
            </div>
        );

    return (
        <div className="flex flex-col justify-center mt-3.5 w-full bg-white rounded max-md:px-5 max-md:max-w-full">
            <div className="flex flex-col w-full rounded max-md:max-w-full pb-6">
                {/* Begin Title */}
                <div className='flex flex-wrap items-center justify-between'>
                    <div className='flex flex-row items-center justify-start'>
                        <button
                            onClick={() => router.back()}
                            className='h-full p-6 hover:bg-slate-200 border-r-[1px] '>
                            <LuArrowLeft className='h-[19px] text-neutral-300 text-xl font-bold' />
                        </button>
                        <p className='overflow-hidden self-stretch px-3 py-5 w-full ml-5 min-h-[48px] font-Averta-Bold text-lg'>{detail?.requestReason}</p>
                        <div className="flex flex-col self-stretch my-auto w-[93px]">
                            <div className={`flex relative gap-4 justify-between items-start px-4 py-1.5 min-h-[27px] ${statusColor} rounded-md`}>
                                <div className="z-0 flex-1 shrink my-auto basis-0 font-Averta-Bold text-[13px]">{detail?.status}</div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row'>
                        {userRole == 'admin' && detail?.status.toLowerCase() == 'pending' && <div className='flex flex-row justify-center items-center gap-2'>
                            {/* Nút approve */}
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <div
                                        className='flex items-center justify-center px-8 py-2 md:w-[130px] rounded-lg 
                                        font-Averta-Bold text-[13px] text-white bg-blue-600 hover:bg-blue-500'
                                    >
                                        Approve
                                    </div>
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
                                        <AlertDialogAction onClick={handleApprove}>
                                            Approve
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            {/* Nút reject */}
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <div
                                        className='flex items-center justify-center px-8 py-2 md:w-[130px] rounded-lg 
                                        font-Averta-Bold text-[13px] text-white bg-red-600 hover:bg-red-500'
                                    >
                                        Reject
                                    </div>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Rejection Reason</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Explain why the leave application is being rejected.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>

                                    <div className="">
                                        <input
                                            type="text"
                                            value={detail.rejectionReason}
                                            onChange={(e) => setRejectionReason(e.target.value)}
                                            className="w-full p-2 border rounded-lg"
                                            placeholder="Reason"
                                        />
                                    </div>

                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction asChild>
                                            <button
                                                className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700"
                                                onClick={handleReject}
                                            >
                                                Reject
                                            </button>
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>}

                        {userRole == 'helper' && detail?.status.toLowerCase() == 'pending' && <div className='flex flex-row justify-center items-center gap-2'>
                            {/* Nút cancel */}
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <div className='flex items-center justify-center px-8 py-2 md:w-[130px] rounded-lg font-Averta-Bold text-[13px] text-white bg-red-600 hover:bg-red-500'>Cancel</div>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This action will cancel the request.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>

                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction asChild>
                                            <button
                                                className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700"
                                                onClick={handleCancel}
                                            >
                                                Sure
                                            </button>
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>}

                        {/* Rejection Reason */}
                        {(detail?.status.toLowerCase() == 'rejected') &&
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <div className="flex justify-center items-center px-8 py-2 w-full rounded-lg bg-blue-600 hover:bg-blue-500 font-Averta-Bold text-white text-[13px]">
                                        Rejection Reason
                                    </div>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Rejection Reason</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            The reason why Leave Application is rejected
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>

                                    <div className="p-4 border-2 rounded-md  text-gray-700">
                                        {/* Nội dung lý do từ chối */}
                                        {detail?.rejectionReason || 'No reason provided.'}
                                    </div>
                                    <AlertDialogFooter>
                                        <AlertDialogAction>OK</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        }



                        {(detail?.status.toLowerCase() == 'approved') &&
                            <div className="flex justify-center items-center">
                                <div className="flex justify-center items-center px-8 py-2 w-full border-2 text-[#00B69B] border-[#00B69B] rounded-lg font-Averta-Bold text-[14px]">
                                    {`Approve by ${detail?.approvedBy?.fullName || "Unknown"}`}
                                </div>
                            </div>
                        }

                        {/* Delete request */}
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <button className='h-full p-6 ml-2 hover:bg-slate-200'>
                                    <FaRegTrashAlt className='h-[19px]' />
                                </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This action will delete the leave request.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction asChild>
                                        <button
                                            className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700"
                                            onClick={handleDelete}
                                        >
                                            Delete
                                        </button>
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
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
                            <p className=' font-bold font-Averta-Semibold text-lg mr-1'>{detail.helper?.user?.fullName}</p>
                            <p className='text-xs font-semibold text-neutral-600 font-Averta-Regular mt-0.5'>{'<helper>'}</p>
                        </div>
                    </div>
                    <p className=" py-4 font-Averta-Regular font-[600w] text-sm text-gray-400">{formatDate(detail.createdAt)}</p>
                </div>
                {/* End Sender info */}
                {/* Begin Content */}
                <div className='flex flex-col w-full h-fit px-16 py-8'>
                    <p className='overflow-hidden self-stretch px-3 py-5 w-full ml-5 min-h-[48px] font-Averta-Bold text-2xl'> {detail?.requestReason}</p>
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
export default LeaveRequestDetail