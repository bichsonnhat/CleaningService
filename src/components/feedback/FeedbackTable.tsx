import React, { use, useEffect, useState } from "react";
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
} from "@/components/ui/alert-dialog";
import ClipLoader from "react-spinners/ClipLoader";

export type Feedback = {
  id: number;
  customerName: string;
  sentiment: "Positive" | "Negative" | "Neutral";
  message: string;
  createdAt: string;
};

export type Feedback2 = {
  id: string;
  bookingId: string;
  reportedBy: boolean;
  helperRating: number;
  title: string;
  description?: string;
  created_at: string;
  updated_at: string;
  booking: {
    customer: {
      fullName: string;
    };
    helper: {
      user: {
        fullName: string;
      };
    };
  };
};

export default function FeedbackTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Filter by");
  const [searchBy, setSearchBy] = useState("Name");

  const [feedbacks, setFeedbacks] = useState<Feedback2[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/feedback");
      const data = await response.json();
      setFeedbacks(data);
      console.log("Feedback response: ", data);
    };

    fetchData();
  }, []);

  // filter
  const applyFilter = (data: any) => {
    switch (filter) {
      case "Newest":
        return [...data].sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA;
        });
      case "Oldest":
        return [...data].sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateA - dateB;
        });
      default:
        return data;
    }
  };

  // search by
  const filteredData = feedbacks.filter((Feedback) => {
    switch (searchBy) {
      case "Customer":
        return Feedback.booking.customer.fullName
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      case "Message":
        return Feedback.title.toLowerCase().includes(searchTerm.toLowerCase());
      case "Date":
        return Feedback.created_at
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      default:
        return Feedback.booking.customer.fullName
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
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

  if (feedbacks.length === 0)
    return (
      <div className="flex justify-center items-center w-full h-[500px]">
        <ClipLoader color="#2A88F5" loading={true} size={30} />
      </div>
    );

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
              <Image
                src="/images/Dashboard/Feedback/Trash.svg"
                alt=""
                width={18}
                height={18}
              />
              Delete
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This action will delete the
                feedback permanently.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <button
                  onClick={() => alert("Feedback deleted")}
                  className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700"
                >
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
            {currentData.map((feedback: Feedback2, index: any) => (
              <FeedbackRow key={feedback.id} feedback={feedback} />
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
