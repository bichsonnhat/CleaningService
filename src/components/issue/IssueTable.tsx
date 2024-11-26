import React, { useState } from 'react';
import Pagination from '../employee/Pagination';
import SearchBarAndFilter from './SearchBarAndFilter';
import IssueRow from './IssueRow';
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

export type Feedback = {
  id: number;
  name: string;
  sentiment: "Positive" | "Negative" | "Neutral";
  message: string;
  createAt: string;
}

const issueData: Feedback[] = [
  { id: 1, name: "Jullu Jalal", sentiment: "Positive" as "Positive", message: "Get Best Advertiser In Your Side Pocket", createAt: "2024-10-08T08:13:00Z" },
  { id: 2, name: "Jullu Jalal", sentiment: "Positive" as "Positive", message: "Free Classifieds Using Them To Promote Your Stuff Online", createAt: "2023-10-15T08:13:00Z" },
  { id: 3, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Vacation Home Rental Success", createAt: "2023-10-15T08:13:00Z" },
  { id: 4, name: "Jullu Jalal", sentiment: "Neutral" as "Neutral", message: "Enhance Your Brand Potential With Giant Advertising Blimps", createAt: "2023-10-15T08:13:00Z" },
  { id: 5, name: "Sepo Jalal", sentiment: "Negative" as "Negative", message: "Always Look On The Bright Side Of Life", createAt: "2023-10-15T08:13:00Z" },
  { id: 6, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Get Best Advertiser In Your Side Pocket", createAt: "2023-10-15T08:13:00Z" },
  { id: 7, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Get Best Advertiser In Your Side Pocket", createAt: "2023-10-15T08:13:00Z" },
  { id: 8, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Get Best Advertiser In Your Side Pocket", createAt: "2023-10-15T08:13:00Z" },
  { id: 9, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Get Best Advertiser In Your Side Pocket", createAt: "2023-10-15T08:13:00Z" },
  { id: 10, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Get Best Advertiser In Your Side Pocket", createAt: "2023-10-15T08:13:00Z" },
  { id: 11, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Get Best Advertiser In Your Side Pocket", createAt: "2010-10-15T08:13:00Z" },
  { id: 12, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Get Best Advertiser In Your Side Pocket", createAt: "2023-10-15T08:13:00Z" },
  { id: 13, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Get Best Advertiser In Your Side Pocket", createAt: "2023-10-15T08:13:00Z" },
  { id: 14, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Get Best Advertiser In Your Side Pocket", createAt: "2023-10-15T08:13:00Z" },
  { id: 15, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Get Best Advertiser In Your Side Pocket", createAt: "2023-10-15T08:13:00Z" },
  { id: 16, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Get Best Advertiser In Your Side Pocket", createAt: "2027-10-15T08:13:00Z" },
  { id: 17, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Get Best Advertiser In Your Side Pocket", createAt: "2023-10-15T08:13:00Z" },
  { id: 18, name: "Jullu Jalal", sentiment: "Positive" as "Positive", message: "Get Best Advertiser In Your Side Pocket", createAt: "2023-10-15T08:13:00Z" },
  { id: 19, name: "Jullu Jalal", sentiment: "Positive" as "Positive", message: "Free Classifieds Using Them To Promote Your Stuff Online", createAt: "2023-10-15T08:13:00Z" },
  { id: 20, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Vacation Home Rental Success", createAt: "2023-10-15T08:13:00Z" },
  { id: 21, name: "Jullu Jalal", sentiment: "Neutral" as "Neutral", message: "Enhance Your Brand Potential With Giant Advertising Blimps", createAt: "2023-10-15T08:13:00Z" },
  { id: 22, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Always Look On The Bright Side Of Life", createAt: "2023-10-15T08:13:00Z" },
  { id: 23, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Get Best Advertiser In Your Side Pocket", createAt: "2023-10-15T08:13:00Z" },
  { id: 24, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Get Best Advertiser In Your Side Pocket", createAt: "2023-10-15T08:13:00Z" },
  { id: 25, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Get Best Advertiser In Your Side Pocket", createAt: "2023-10-15T08:13:00Z" },
  { id: 26, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Get Best Advertiser In Your Side Pocket", createAt: "2023-10-15T08:13:00Z" },
  { id: 27, name: "Jullu Jalal", sentiment: "Negative" as "Negative", message: "Get Best Advertiser In Your Side Pocket", createAt: "2023-10-15T08:13:00Z" },
];

export default function IssueTable() {

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
  const filteredData = issueData.filter((Issue) => {
    switch (searchBy) {
      case "Helper":
        return Issue.name.toLowerCase().includes(searchTerm.toLowerCase());
      default:
        return Issue.name.toLowerCase().includes(searchTerm.toLowerCase());
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

  return (
    <>
    <div className='flex flex-row justify-between items-center'>

      <SearchBarAndFilter
        setSearchTerm={setSearchTerm}
        setSearchBy={setSearchBy}
        onFilterChange={setFilter}
      />
      <div className='flex flex-row gap-2'>
      <button 
            onClick={() => alert('Open popup Create Issue')}
            className="flex flex-row gap-2 items-center justify-center px-8 h-[38px] bg-[#1b78f2] hover:bg-opacity-90 rounded-[8px] text-xs font-Averta-Bold tracking-normal leading-loose whitespace-nowrap text-center text-white">
            <Image src="/images/icons/outline_plus.svg" alt="" width={18} height={18} />
          Create Issue
        </button>
      <AlertDialog>
                                <AlertDialogTrigger>
                                <div className="flex flex-row gap-2 items-center justify-center px-10 h-[38px] bg-[#E11B1B] hover:bg-opacity-80 rounded-[8px] text-xs font-Averta-Bold tracking-normal leading-loose whitespace-nowrap text-center text-white">
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
            {currentData.map((feedback: Feedback, index: any) => (
              <IssueRow key={feedback.id} {...feedback} />
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