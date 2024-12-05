import React, { useEffect, useState } from "react";
import Pagination from "../employee/Pagination";
import SearchBarAndFilter from "./SearchBarAndFilter";
import IssueRow from "./IssueRow";
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
import { Feedback2 } from "../feedback/FeedbackTable";
import ClipLoader from "react-spinners/ClipLoader";

export default function IssueTable() {
  const [issueData2, setIssueData2] = useState<Feedback2[]>([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      const response = await fetch(`/api/feedback`);
      const data = await response.json();
      console.log("Issue: ", data);
      setIssueData2(data);
    };

    fetchFeedback();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Filter by");
  const [searchBy, setSearchBy] = useState("Helper");

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
  const filteredData = issueData2.filter((Issue) => {
    switch (searchBy) {
      case "Helper":
        return Issue.booking.helper.user.fullName
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      default:
        return Issue.booking.helper.user.fullName
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

  if (issueData2.length === 0)
    return (
      <div className="flex justify-center items-center w-full h-[500px]">
        <ClipLoader color="#2A88F5" loading={true} size={30} />
      </div>
    );

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-center gap-4">
        <SearchBarAndFilter
          setSearchTerm={setSearchTerm}
          setSearchBy={setSearchBy}
          onFilterChange={setFilter}
        />
        <div className="flex gap-2">
          <AlertDialog>
            <AlertDialogTrigger>
              <div className="flex flex-row gap-2 items-center justify-center px-10 h-[38px] bg-[#E11B1B] hover:bg-opacity-80 rounded-[8px] text-xs font-Averta-Bold tracking-normal leading-loose whitespace-nowrap text-center text-white">
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
                  refund request.
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

      <div className="flex flex-col justify-center mt-3.5 w-full bg-white rounded max-md:max-w-full">
        <div className="flex flex-col w-full rounded max-md:max-w-full">
          <div className="flex overflow-hidden flex-col justify-center w-full rounded bg-neutral-700 max-md:max-w-full">
            {currentData.map((issue: Feedback2, index: any) => (
              <IssueRow key={issue.id} issueData={issue} />
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
