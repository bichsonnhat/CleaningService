'use client'
import React, { useState } from 'react';
import RefundRow from './RefundRow';
import Pagination from '../employee/Pagination';
import SearchBarAndFilter from './SearchBarAndFilter'
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


export type Refund = {
    id: number;
    customerName: string;
    status: "Refunded" | "Declined" | "Pending";
    reason: string;
    createAt: string;
}
const refundData: Refund[] = [
    { id: 1, customerName: "Huy", status: "Refunded" as "Refunded", reason: "Get Best Advertiser In Your Side Pocket", createAt: "2022-10-15T08:13:00Z" },
    { id: 2, customerName: "Jullu Jalal", status: "Refunded" as "Refunded", reason: "Free Classifieds Using Them To Promote Your Stuff Online", createAt: "2022-10-15T08:13:00Z" },
    { id: 3, customerName: "Jullu Jalal", status: "Declined" as "Declined", reason: "Vacation Home Rental Success", createAt: "2022-10-15T08:13:00Z" },
    { id: 4, customerName: "Jullu Jalal", status: "Pending" as "Pending", reason: "Enhance Your Brand Potential With Giant Advertising Blimps", createAt: "2023-10-15T08:13:00Z" },
    { id: 5, customerName: "Jullu Jalal", status: "Declined" as "Declined", reason: "Always Look On The Bright Side Of Life", createAt: "2023-10-15T08:13:00Z" },
    { id: 6, customerName: "Jullu Jalal", status: "Declined" as "Declined", reason: "Get Best Advertiser In Your Side Pocket", createAt: "2023-10-15T08:13:00Z" },
    { id: 7, customerName: "Jullu Jalal", status: "Declined" as "Declined", reason: "Get Best Advertiser In Your Side Pocket", createAt: "2023-10-15T08:13:00Z" },
    { id: 8, customerName: "Jullu Jalal", status: "Declined" as "Declined", reason: "Get Best Advertiser In Your Side Pocket", createAt: "2023-10-15T08:13:00Z" },
    { id: 9, customerName: "Jullu Jalal", status: "Declined" as "Declined", reason: "Get Best Advertiser In Your Side Pocket", createAt: "2023-10-15T08:13:00Z" },
    { id: 10, customerName: "Jullu Jalal", status: "Declined" as "Declined", reason: "Get Best Advertiser In Your Side Pocket", createAt: "2023-10-15T08:13:00Z" },
    { id: 11, customerName: "Jullu Jalal", status: "Declined" as "Declined", reason: "Get Best Advertiser In Your Side Pocket", createAt: "2023-10-15T08:13:00Z" },
    { id: 12, customerName: "Jullu Jalal", status: "Declined" as "Declined", reason: "Get Best Advertiser In Your Side Pocket", createAt: "2024-10-15T08:13:00Z" },
    { id: 13, customerName: "Jullu Jalal", status: "Declined" as "Declined", reason: "Get Best Advertiser In Your Side Pocket", createAt: "2024-10-15T08:13:00Z" }, 
    { id: 14, customerName: "Jullu Jalal", status: "Declined" as "Declined", reason: "Get Best Advertiser In Your Side Pocket", createAt: "2023-10-15T08:13:00Z" },
    { id: 15, customerName: "Jullu Jalal", status: "Declined" as "Declined", reason: "Get Best Advertiser In Your Side Pocket", createAt: "2023-10-15T08:13:00Z" },
    { id: 16, customerName: "Jullu Jalal", status: "Declined" as "Declined", reason: "Get Best Advertiser In Your Side Pocket", createAt: "2023-10-15T08:13:00Z" },
    { id: 17, customerName: "Jullu Jalal", status: "Declined" as "Declined", reason: "Get Best Advertiser In Your Side Pocket", createAt: "2023-10-15T08:13:00Z" },
    { id: 18, customerName: "Jullu Jalal", status: "Refunded" as "Refunded", reason: "Get Best Advertiser In Your Side Pocket", createAt: "2023-10-15T08:13:00Z" },
    { id: 19, customerName: "Jullu Jalal", status: "Refunded" as "Refunded", reason: "Free Classifieds Using Them To Promote Your Stuff Online", createAt: "2023-10-15T08:13:00Z" },
    { id: 20, customerName: "Jullu Jalal", status: "Declined" as "Declined", reason: "Vacation Home Rental Success", createAt: "2023-10-15T08:13:00Z" },
    { id: 21, customerName: "Jullu Jalal", status: "Pending" as "Pending", reason: "Enhance Your Brand Potential With Giant Advertising Blimps", createAt: "2023-10-15T08:13:00Z" },
    { id: 22, customerName: "Jullu Jalal", status: "Declined" as "Declined", reason: "Always Look On The Bright Side Of Life", createAt: "2023-10-15T08:13:00Z" },
    { id: 23, customerName: "Jullu Jalal", status: "Declined" as "Declined", reason: "Get Best Advertiser In Your Side Pocket", createAt: "2023-10-15T08:13:00Z" },
    { id: 24, customerName: "Jullu Jalal", status: "Declined" as "Declined", reason: "Get Best Advertiser In Your Side Pocket", createAt: "2023-10-15T08:13:00Z" },
    { id: 25, customerName: "Jullu Jalal", status: "Declined" as "Declined", reason: "Get Best Advertiser In Your Side Pocket", createAt: "2023-10-15T08:13:00Z" },
    { id: 26, customerName: "Jullu Jalal", status: "Declined" as "Declined", reason: "Get Best Advertiser In Your Side Pocket", createAt: "2023-10-15T08:13:00Z" },
    { id: 27, customerName: "Jullu Jalal", status: "Declined" as "Declined", reason: "Get Best Advertiser In Your Side Pocket", createAt: "2023-10-15T08:13:00Z" },
];
export default function RefundTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("Filter by");
    const [searchBy, setSearchBy] = useState("Name");
    // filter
    const applyFilter = (data: any) => {
        switch (filter) {
            case "Newest":
                return [...data].sort((a, b) =>{
                    const dateA = new Date(a.createAt);
                    const dateB = new Date(b.createAt);
                    return dateB.getTime() - dateA.getTime();
                } );
            case "Oldest":
                return [...data].sort((a, b) =>{
                    const dateA = new Date(a.createAt);
                    const dateB = new Date(b.createAt);
                    return dateA.getTime() - dateB.getTime();
                } );
            default:
                return data;
        }
    };
    // search by
    const filteredData = refundData.filter((Refund) => {
        switch (searchBy) {
            case "Customer":
                return Refund.customerName.toLowerCase().includes(searchTerm.toLowerCase());
            case "Status":
                return Refund.status
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            // case "Reason":
            //     return Refund.reason.toLowerCase().includes(searchTerm.toLowerCase());
            default:
                return Refund.customerName.toLowerCase().includes(searchTerm.toLowerCase());
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

    useEffect(() => {},[])
    return (
        <>
        <div className='flex flex-row justify-between items-center'>

            <SearchBarAndFilter
                setSearchTerm={setSearchTerm}
                setSearchBy={setSearchBy}
                onFilterChange={setFilter}
            />
            <div className='flex flex-row gap-4'>
            <button 
            onClick={() => alert('Open popup Create Refund')}
            className="flex flex-row gap-2 items-center justify-center px-8 h-[38px] bg-[#1b78f2] hover:bg-opacity-90 rounded-[8px] text-xs font-Averta-Bold tracking-normal leading-loose whitespace-nowrap text-center text-white">
            <Image src="/images/icons/outline_plus.svg" alt="" width={18} height={18} />
          Create Refund
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
                                            This action cannot be undone. This action will delete the refund request.
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
            <div className="flex flex-col justify-center mt-3.5 w-full bg-white rounded max-md:px-5 max-md:max-w-full">
                <div className="flex flex-col w-full rounded max-md:max-w-full">
                    <div className="flex overflow-hidden flex-col justify-center w-full rounded bg-neutral-700 max-md:max-w-full">
                        {currentData.map((feedback: Refund, index: any) => (
                            <RefundRow key={feedback.id} {...feedback} />
                        ))}
                    </div>
                </div>
            </div>
            <Pagination
                currentPage={currentPage}
                totalItems={filteredData.length}
                totalPages={totalPages}
                onPageChange={handlePageChange} />
        </>
    );
};