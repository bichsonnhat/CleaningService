'use client'
import React, { useState } from 'react';
import LeaveRequestRow from './LeaveRequestRow';
import Pagination from '../employee/Pagination';
import SearchBarAndFilter from '../issue-history/SearchBarAndFilter';
import Image from 'next/image';
import { useEffect } from 'react';
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


export type LeaveRequest = {
    id: number;
    customerName: string;
    status: "Approved" | "Cancelled" | "Rejected" | "Pending";
    reason: string;
    scheduledStartTime: string;
    scheduledEndTime: string;
    createAt: string;
}
const leaveRequestData: LeaveRequest[] = [
    {
        id: 1,
        customerName: "Huy",
        status: "Approved",
        reason: "Get Best Advertiser In Your Side Pocket",
        scheduledStartTime: "2022-11-01",
        scheduledEndTime: "2022-11-05",
        createAt: "2022-10-15T08:13:00Z"
    },
    {
        id: 2,
        customerName: "Jullu Jalal",
        status: "Approved",
        reason: "Free Classifieds Using Them To Promote Your Stuff Online",
        scheduledStartTime: "2022-12-01",
        scheduledEndTime: "2022-12-05",
        createAt: "2022-10-15T08:13:00Z"
    },
    {
        id: 3,
        customerName: "Jullu Jalal",
        status: "Cancelled",
        reason: "Vacation Home Rental Success",
        scheduledStartTime: "2023-01-10",
        scheduledEndTime: "2023-01-15",
        createAt: "2022-10-15T08:13:00Z"
    },
    {
        id: 4,
        customerName: "Jullu Jalal",
        status: "Pending",
        reason: "Enhance Your Brand Potential With Giant Advertising Blimps",
        scheduledStartTime: "2023-03-05",
        scheduledEndTime: "2023-03-10",
        createAt: "2023-10-15T08:13:00Z"
    },
    {
        id: 5,
        customerName: "Jullu Jalal",
        status: "Cancelled",
        reason: "Always Look On The Bright Side Of Life",
        scheduledStartTime: "2023-04-15",
        scheduledEndTime: "2023-04-15",
        createAt: "2023-10-15T08:13:00Z"
    },
    {
        id: 6,
        customerName: "Jullu Jalal",
        status: "Cancelled",
        reason: "Get Best Advertiser In Your Side Pocket",
        scheduledStartTime: "2023-05-01",
        scheduledEndTime: "2023-05-05",
        createAt: "2023-10-15T08:13:00Z"
    },
    {
        id: 7,
        customerName: "Jullu Jalal",
        status: "Cancelled",
        reason: "Get Best Advertiser In Your Side Pocket",
        scheduledStartTime: "2023-06-10",
        scheduledEndTime: "2023-06-15",
        createAt: "2023-10-15T08:13:00Z"
    },
    {
        id: 8,
        customerName: "Jullu Jalal",
        status: "Cancelled",
        reason: "Get Best Advertiser In Your Side Pocket",
        scheduledStartTime: "2023-07-20",
        scheduledEndTime: "2023-07-25",
        createAt: "2023-10-15T08:13:00Z"
    },
    {
        id: 9,
        customerName: "Jullu Jalal",
        status: "Cancelled",
        reason: "Get Best Advertiser In Your Side Pocket",
        scheduledStartTime: "2023-08-01",
        scheduledEndTime: "2023-08-05",
        createAt: "2023-10-15T08:13:00Z"
    },
    {
        id: 10,
        customerName: "Jullu Jalal",
        status: "Cancelled",
        reason: "Get Best Advertiser In Your Side Pocket",
        scheduledStartTime: "2023-09-15",
        scheduledEndTime: "2023-09-20",
        createAt: "2023-10-15T08:13:00Z"
    },
    {
        id: 11,
        customerName: "Jullu Jalal",
        status: "Pending",
        reason: "Get Best Advertiser In Your Side Pocket",
        scheduledStartTime: "2023-10-10",
        scheduledEndTime: "2023-10-15",
        createAt: "2023-10-15T08:13:00Z"
    },
    {
        id: 12,
        customerName: "Jullu Jalal",
        status: "Pending",
        reason: "Get Best Advertiser In Your Side Pocket",
        scheduledStartTime: "2024-01-01",
        scheduledEndTime: "2024-01-05",
        createAt: "2024-10-15T08:13:00Z"
    },
    {
        id: 13,
        customerName: "Jullu Jalal",
        status: "Pending",
        reason: "Get Best Advertiser In Your Side Pocket",
        scheduledStartTime: "2024-02-01",
        scheduledEndTime: "2024-02-05",
        createAt: "2024-10-15T08:13:00Z"
    },
    {
        id: 14,
        customerName: "Jullu Jalal",
        status: "Pending",
        reason: "Get Best Advertiser In Your Side Pocket",
        scheduledStartTime: "2023-03-15",
        scheduledEndTime: "2023-03-20",
        createAt: "2023-10-15T08:13:00Z"
    },
    {
        id: 15,
        customerName: "Jullu Jalal",
        status: "Pending",
        reason: "Get Best Advertiser In Your Side Pocket",
        scheduledStartTime: "2023-04-01",
        scheduledEndTime: "2023-04-05",
        createAt: "2023-10-15T08:13:00Z"
    },
    {
        id: 16,
        customerName: "Jullu Jalal",
        status: "Approved",
        reason: "Get Best Advertiser In Your Side Pocket",
        scheduledStartTime: "2023-05-15",
        scheduledEndTime: "2023-05-20",
        createAt: "2023-10-15T08:13:00Z"
    }
];
export default function LeaveRequestTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("Filter by");
    const [searchBy, setSearchBy] = useState("Name");
    // filter
    const applyFilter = (data: any) => {
        switch (filter) {
            case "Newest":
                return [...data].sort((a, b) => {
                    const dateA = new Date(a.createAt);
                    const dateB = new Date(b.createAt);
                    return dateB.getTime() - dateA.getTime();
                });
            case "Oldest":
                return [...data].sort((a, b) => {
                    const dateA = new Date(a.createAt);
                    const dateB = new Date(b.createAt);
                    return dateA.getTime() - dateB.getTime();
                });
            default:
                return data;
        }
    };
    // search by
    const filteredData = leaveRequestData.filter((Request) => {
        switch (searchBy) {
            case "Customer":
                return Request.customerName.toLowerCase().includes(searchTerm.toLowerCase());
            case "Status":
                return Request.status
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            // case "Reason":
            //     return Refund.reason.toLowerCase().includes(searchTerm.toLowerCase());
            default:
                return Request.customerName.toLowerCase().includes(searchTerm.toLowerCase());
        }
    });
    const finalData = applyFilter(filteredData);

    // pagination
    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const currentData = finalData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) setCurrentPage(newPage);
    };

    useEffect(() => { }, [])
    return (
        <>
            <div className='flex flex-wrap justify-between gap-3 items-center'>

                <SearchBarAndFilter
                    setSearchTerm={setSearchTerm}
                    setSearchBy={setSearchBy}
                    onFilterChange={setFilter}
                />
                <div className='flex flex-row gap-2'>
                    <button
                        onClick={() => alert('Open popup Create LeaveRequest')}
                        className="flex flex-row gap-2 items-center justify-center px-8 h-[38px] bg-[#1b78f2] hover:bg-opacity-90 rounded-[8px] text-xs font-Averta-Bold tracking-normal leading-loose whitespace-nowrap text-center text-white">
                        <Image src="/images/icons/outline_plus.svg" alt="" width={18} height={18} />
                        Create LeaveRequest
                    </button>
                    <AlertDialog>
                        <AlertDialogTrigger>
                            <div className="flex flex-row gap-2 items-center justify-center px-10 h-[38px] bg-[#E11B1B] hover:bg-opacity-90 rounded-[8px] text-xs font-Averta-Bold tracking-normal leading-loose whitespace-nowrap text-center text-white">
                                <Image src="/images/Dashboard/Feedback/Trash.svg" alt="" width={18} height={18} />
                                Delete
                            </div>
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
                                    <button className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700">
                                        Delete
                                    </button>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>

            </div>
            <div className="flex overflow-hidden flex-col justify-center mt-3.5 w-full max-md:max-w-full">
                {currentData.map((request: LeaveRequest, index: any) => (
                    <LeaveRequestRow key={request.id} {...request} />
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalItems={filteredData.length}
                totalPages={totalPages}
                onPageChange={handlePageChange} />
        </>
    );
};