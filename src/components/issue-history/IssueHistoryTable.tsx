import React, { useEffect, useState } from 'react';
import Pagination from '../employee/Pagination';
import SearchBarAndFilter from './SearchBarAndFilter';
import IssueRow from '../issue/IssueRow';
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
import { Feedback2 } from '../feedback/FeedbackTable';
import ClipLoader from 'react-spinners/ClipLoader';

export type Issue = {
  id: number;
  name: string;
  sentiment: "Positive" | "Negative" | "Neutral";
  message: string;
  createAt: string;
}

export default function IssueHistoryTable() {
  const [issueData, setIssueData] = useState<Feedback2[]>([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      const response = await fetch(`/api/feedback`);
      const data = await response.json();
      console.log("Issue History: ", data);
      setIssueData(data);
    };

    fetchFeedback();
  }, []);

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
  const filteredData = issueData.filter((Issue) => {
    switch (searchBy) {
      case "Helper":
        return Issue.booking.helper.user.fullName.toLowerCase().includes(searchTerm.toLowerCase());
      default:
        return Issue.booking.helper.user.fullName.toLowerCase().includes(searchTerm.toLowerCase());
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

  if (issueData.length === 0)
    return (
      <div className="flex justify-center items-center w-full h-[500px]">
        <ClipLoader color="#2A88F5" loading={true} size={30} />
      </div>
    );

  return (
    <>
      <div className='flex flex-wrap justify-between gap-3  items-center'>

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

      <div className="flex overflow-hidden flex-col justify-center mt-3.5 w-full max-md:max-w-full">
        {currentData.map((issue: Feedback2, index: any) => (
          <IssueRow key={issue.id} issueData={issue} />
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