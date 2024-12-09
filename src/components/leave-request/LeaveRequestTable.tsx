"use client";
import React, { useState } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import LeaveRequestRow from "./LeaveRequestRow";
import Pagination from "../employee/Pagination";
import SearchBarAndFilter from "./SearchBarAndFilter";
import Image from "next/image";
import ClipLoader from "react-spinners/ClipLoader";
import { useEffect } from "react";
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
import { CreateLeaveRequestPopup } from "../popup/CreateLeaveRequestPopup";

interface LeaveRequestTableProps {
  canCreate: boolean;
  userId: string;
}

const LeaveRequestTable: React.FC<LeaveRequestTableProps> = ({
  canCreate,
  userId,
}) => {
  // const url = "http://localhost:3001/api/helper_availability";

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Filter by");
  const [searchBy, setSearchBy] = useState("Name");
  const [checkedRows, setCheckedRows] = useState<string[]>([]);

  const queryClient = useQueryClient();

  const fetchData = async (): Promise<LeaveRequest[]> => {
    try {
      let enpoint;
      if (canCreate) {
        enpoint = `/api/helper_availability?helperId=${userId}`;
      } else {
        enpoint = `/api/helper_availability`;
      }

      const response = await fetch(enpoint);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["leaveRequests"],
    queryFn: fetchData,
  });

  // filter
  const applyFilter = (data: LeaveRequest[]) => {
    if (filter === "Newest") {
      return [...data].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        console.log(a);
        return dateB.getTime() - dateA.getTime();
      });
    }
    if (filter === "Oldest") {
      return [...data].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateA.getTime() - dateB.getTime();
      });
    }
    return data;
  };

  // search by
  const filteredData = (data || []).filter((Request: any) => {
    const term = searchTerm.toLowerCase();
    if (searchBy === "Name") {
      return Request.helper?.user?.fullName.toLowerCase().includes(term);
    }
    // if (searchBy === "Status") {
    //     return Request.status.toLowerCase().includes(term);
    // }
    if (searchBy === "Reason") {
      return Request.requestReason?.toLowerCase().includes(term);
    }
    return true;
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

  const handleCheckboxToggle = (id: string, isChecked: boolean) => {
    setCheckedRows((prevCheckedRows) =>
      isChecked
        ? [...prevCheckedRows, id]
        : prevCheckedRows.filter((rowId) => rowId !== id)
    );
  };

  const handleDeleteRequests = async () => {
    if (checkedRows.length === 0) {
      console.log("Please select request to delete");
      return;
    }
    try {
      await Promise.all(
        checkedRows.map((id) => {
          fetch(`/api/helper_availability/${id}`, {
            method: "DELETE",
          });
        })
      );
      console.log("Delete requests successfully!");

      queryClient.setQueryData<LeaveRequest[] | undefined>(
        ["leaveRequests"],
        (oldData: any) =>
          (oldData || []).filter(
            (request: any) => !checkedRows.includes(request.id)
          )
      );

      setCheckedRows([]);
    } catch (error) {
      console.error(error);
    }
  };

  if (!data)
    return (
      <div className="flex justify-center items-center w-full h-[500px]">
        <ClipLoader color="#2A88F5" loading={true} size={30} />
      </div>
    );

  return (
    <>
      <div className="flex flex-wrap justify-between gap-3 items-center">
        <SearchBarAndFilter
          setSearchTerm={setSearchTerm}
          setSearchBy={setSearchBy}
          onFilterChange={setFilter}
        />
        <div className="flex flex-row gap-2">
          {canCreate && <CreateLeaveRequestPopup></CreateLeaveRequestPopup>}
          <AlertDialog>
            <AlertDialogTrigger
              disabled={checkedRows.length === 0}
              className="bg-[#E11B1B] hover:bg-opacity-90 disabled:bg-[#cccccc] rounded-[8px]"
            >
              <div className="flex flex-row gap-2 items-center justify-center px-10 h-[38px]  text-xs font-Averta-Bold tracking-normal leading-loose whitespace-nowrap text-center text-white">
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
                  This action cannot be undone. This action will delete leave
                  requests.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <button
                    className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700"
                    onClick={handleDeleteRequests}
                  >
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
          <LeaveRequestRow
            key={request.id}
            {...request}
            onCheckboxToggle={handleCheckboxToggle}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={filteredData.length}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default LeaveRequestTable;
