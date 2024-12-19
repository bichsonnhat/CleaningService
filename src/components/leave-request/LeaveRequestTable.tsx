"use client";
import React, { useState } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import LeaveRequestRow from "./LeaveRequestRow";
import Pagination from "../employee/Pagination";
import SearchBarAndFilter from "./SearchBarAndFilter";
import ClipLoader from "react-spinners/ClipLoader";
import { CreateLeaveRequestPopup } from "../popup/CreateLeaveRequestPopup";
import { userStore } from "@/utils/store/role.store";



const LeaveRequestTable = () => {

  const role = userStore((state) => state.role);
  const userId = userStore((state) => state.id);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Filter by");
  const [searchBy, setSearchBy] = useState("Name");

  const queryClient = useQueryClient();

  const fetchData = async (): Promise<LeaveRequest[]> => {
    try {
      let enpoint;
      console.log("Can create: " + role);
      console.log("Id: " + userId);
      if (role === 'helper') {
        enpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/helper_availability?helperId=${userId}`;
      } else {
        enpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/helper_availability`;
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

  // if (!data)
  //   return (
  //     <div className="flex justify-center items-center w-full h-[500px]">
  //       <ClipLoader color="#2A88F5" loading={true} size={30} />
  //     </div>
  //   );

  return (
    <>
      <div className="flex flex-wrap justify-between gap-3 items-center">
        <SearchBarAndFilter
          setSearchTerm={setSearchTerm}
          setSearchBy={setSearchBy}
          onFilterChange={setFilter}
        />
        <div className="flex flex-row gap-2">
          {role === 'helper' && <CreateLeaveRequestPopup></CreateLeaveRequestPopup>}
        </div>
      </div>
      <div className="flex overflow-hidden flex-col justify-center mt-3.5 w-full max-md:max-w-full">
        {currentData.length === 0 ? (
          <div className="flex justify-center items-center w-full h-[500px]">
            <ClipLoader color="#2A88F5" loading={true} size={30} />
          </div>
        ) : (
          currentData.map((request: LeaveRequest, index: any) => (
            <LeaveRequestRow
              key={request.id}
              {...request}
            />
          ))
        )}
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
