import React, { useState } from "react";
import FeedbackRow from "./FeedbackRow";
import Pagination from "../employee/Pagination";
import SearchBarAndFilter from "./SearchBarAndFilter";
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
} from "@/components/ui/alert-dialog"

export type Feedback = {
  id: number;
  customerName: string;
  sentiment: "Positive" | "Negative" | "Neutral";
  message: string;
  createdAt: string;
};

const feedbackData: Feedback[] = [
  {
    id: 1,
    customerName: "Khang Trung Trương Peso",
    sentiment: "Positive" as "Positive",
    message: "Get Best Advertiser In Your Side Pocket",
    createdAt: "2023-10-15T08:13:00Z",
  },
  {
    id: 2,
    customerName: "Jullu Jalal",
    sentiment: "Positive" as "Positive",
    message: "Free Classifieds Using Them To Promote Your Stuff Online",
    createdAt: "2023-10-15T08:13:00Z",
  },
  {
    id: 3,
    customerName: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Vacation Home Rental Success",
    createdAt: "2023-10-15T08:13:00Z",
  },
  {
    id: 4,
    customerName: "Jullu Jalal",
    sentiment: "Neutral" as "Neutral",
    message: "Enhance Your Brand Potential With Giant Advertising Blimps",
    createdAt: "2023-10-15T08:13:00Z",
  },
  {
    id: 5,
    customerName: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Always Look On The Bright Side Of Life",
    createdAt: "2023-10-15T08:13:00Z",
  },
  {
    id: 6,
    customerName: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Get Best Advertiser In Your Side Pocket",
    createdAt: "2023-10-15T08:13:00Z",
  },
  {
    id: 7,
    customerName: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Get Best Advertiser In Your Side Pocket",
    createdAt: "2023-10-15T08:13:00Z",
  },
  {
    id: 8,
    customerName: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Get Best Advertiser In Your Side Pocket",
    createdAt: "2023-10-15T08:13:00Z",
  },
  {
    id: 9,
    customerName: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Get Best Advertiser In Your Side Pocket",
    createdAt: "2023-10-15T08:13:00Z",
  },
  {
    id: 10,
    customerName: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Get Best Advertiser In Your Side Pocket",
    createdAt: "2023-10-15T08:13:00Z",
  },
  {
    id: 11,
    customerName: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Get Best Advertiser In Your Side Pocket",
    createdAt: "2023-10-15T08:13:00Z",
  },
  {
    id: 12,
    customerName: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Get Best Advertiser In Your Side Pocket",
    createdAt: "2023-10-15T08:13:00Z",
  },
  {
    id: 13,
    customerName: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Get Best Advertiser In Your Side Pocket",
    createdAt: "2023-10-15T08:13:00Z",
  },
  {
    id: 14,
    customerName: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Get Best Advertiser In Your Side Pocket",
    createdAt: "2023-10-15T08:13:00Z",
  },
  {
    id: 15,
    customerName: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Get Best Advertiser In Your Side Pocket",
    createdAt: "2023-10-15T08:13:00Z",
  },
  {
    id: 16,
    customerName: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Get Best Advertiser In Your Side Pocket",
    createdAt: "2023-10-15T08:13:00Z",
  },
  {
    id: 17,
    customerName: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Get Best Advertiser In Your Side Pocket",
    createdAt: "2023-10-15T08:13:00Z",
  },
  {
    id: 18,
    customerName: "Jullu Jalal",
    sentiment: "Positive" as "Positive",
    message: "Get Best Advertiser In Your Side Pocket",
    createdAt: "2023-10-15T08:13:00Z",
  },
  {
    id: 19,
    customerName: "Jullu Jalal",
    sentiment: "Positive" as "Positive",
    message: "Free Classifieds Using Them To Promote Your Stuff Online",
    createdAt: "2023-10-15T08:13:00Z",
  },
  {
    id: 20,
    customerName: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Vacation Home Rental Success",
    createdAt: "2023-10-15T08:13:00Z",
  },
  {
    id: 21,
    customerName: "Jullu Jalal",
    sentiment: "Neutral" as "Neutral",
    message: "Enhance Your Brand Potential With Giant Advertising Blimps",
    createdAt: "2023-10-15T08:13:00Z",
  },
  {
    id: 22,
    customerName: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Always Look On The Bright Side Of Life",
    createdAt: "2023-10-15T08:13:00Z",
  },
  {
    id: 23,
    customerName: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Get Best Advertiser In Your Side Pocket",
    createdAt: "2023-10-15T08:13:00Z",
  },
  {
    id: 24,
    customerName: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Get Best Advertiser In Your Side Pocket",
    createdAt: "2023-10-15T08:13:00Z",
  },
  {
    id: 25,
    customerName: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Get Best Advertiser In Your Side Pocket",
    createdAt: "2023-10-15T08:13:00Z",
  },
  {
    id: 26,
    customerName: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Get Best Advertiser In Your Side Pocket",
    createdAt: "2022-10-15T08:13:00Z",
  },
  {
    id: 27,
    customerName: "Jullu Jalal",
    sentiment: "Negative" as "Negative",
    message: "Get Best Advertiser In Your Side Pocket",
    createdAt: "2024-10-15T08:13:00Z",
  },
];

export default function FeedbackTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Filter by");
  const [searchBy, setSearchBy] = useState("Name");

  // filter
  const applyFilter = (data: any) => {
    switch (filter) {
      case "Newest":
        return [...data].sort(
          (a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return dateB - dateA;
          }
        );
      case "Oldest":
        return [...data].sort(
          (a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return dateA - dateB;
          }
        );
      default:
        return data;
    }
  };

  // search by
  const filteredData = feedbackData.filter((Feedback) => {
    switch (searchBy) {
      case "Customer":
        return Feedback.customerName.toLowerCase().includes(searchTerm.toLowerCase());
      case "Sentiment":
        const check = Feedback.sentiment
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        console.log(check);
        return Feedback.sentiment
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      case "Message":
        return Feedback.message
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      case "Date":
        return Feedback.createdAt.toLowerCase().includes(searchTerm.toLowerCase());
      default:
        return Feedback.customerName.toLowerCase().includes(searchTerm.toLowerCase());
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
    <div className="flex flex-wrap flex-row gap-2 justify-between items-center">
      <SearchBarAndFilter
        setSearchTerm={setSearchTerm}
        setSearchBy={setSearchBy}
        onFilterChange={setFilter}
      />

<AlertDialog>
                                <AlertDialogTrigger>
                                <div className="flex flex-row gap-2 items-center justify-center px-4 lg:px-10 h-[38px] bg-[#E11B1B] hover:bg-opacity-90 rounded-[8px] text-xs font-Averta-Bold tracking-normal leading-loose whitespace-nowrap text-center text-white">
        <Image src="/images/Dashboard/Feedback/Trash.svg" alt="" width={18} height={18} />
          Delete
        </div>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This action will delete the feedback permanently.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction asChild>
                                            <button 
                                            onClick={() => alert('Feedback deleted')}
                                            className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700">
                                                Delete
                                            </button>
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
    </div>

      <div className="flex flex-col justify-center mt-3.5 w-full bg-white rounded ">
        <div className="flex flex-col w-full rounded ">
          <div className="flex overflow-hidden flex-col justify-center w-full rounded bg-neutral-700 ">
            {currentData.map((feedback: Feedback, index: any) => (
              <FeedbackRow key={feedback.id} {...feedback} />
            ))}
          </div>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={filteredData.length}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
